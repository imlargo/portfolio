import type { Post, PostBlock, PostSummary } from './types';

const posts: Post[] = [
	{
		slug: 'building-air-from-empty-repo-to-npm',
		title: 'Building air, and the two features I deleted',
		description:
			'A fetch wrapper I published to npm. It worked in an afternoon; the two weeks after went into deciding what it was not allowed to become, and into the class of bug a green test suite is structurally unable to see.',
		date: '2026-08-19',
		tags: ['TypeScript', 'Open Source', 'API Design'],
		// azul cristal: una librería mínima y precisa, sin peso de más
		accent: '#3b82f6',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'Every project I work on eventually grows the same file. `api.ts` or `http.ts`, wrapping `fetch`: parse the response, throw when the status is not 2xx, join a base URL, serialize a body. None of it is hard, and I had still written it from scratch every time, because copying the old one over always felt worse than retyping it.'
			},
			{
				type: 'paragraph',
				text: 'So I wrote it once properly. air is 371 lines across seven files, zero runtime dependencies, 2.6 kB gzipped on the wire, and the first working version took an afternoon. Then I spent two weeks and seventy-seven commits on something that already worked.'
			},
			{
				type: 'paragraph',
				text: 'Almost none of that time went into HTTP.'
			},
			{ type: 'heading', level: 2, text: 'Writing the constraints down first' },
			{
				type: 'paragraph',
				text: 'Before writing any code I put the philosophy in the repo as its own document. Most of it is a list of things air is not allowed to become: interceptor chains, a plugin system, retries or timeouts in any form, caching, request deduplication, Node-only escape hatches that break in a browser.'
			},
			{
				type: 'paragraph',
				text: 'That is a lot of ceremony for a package this small. It earned its place anyway. On day one the pressure to add a feature does not come from users — it comes from me at 11 p.m., deciding that one small option would be convenient. Having written the rule down, I have to go argue with the document before I add anything.'
			},
			{ type: 'heading', level: 2, text: 'The question that keeps "less is better" honest' },
			{
				type: 'paragraph',
				text: '*Less code is better* is the first rule in that document, and it is the one that needed a counterweight. It can justify any omission, because the cost of a feature you shipped is visible in the diff and the cost of one you did not ship is invisible everywhere. So every review asks a second question next to *what can we remove?* — **what can a user not do at all?** The first has an obvious answer. The second is where the real defects were.'
			},
			{
				type: 'paragraph',
				text: 'The raw client came out of that. Auto-parsing the response is the entire point of a wrapper like this, right up until you want something that lives on the response rather than in it: a `Link` header, an `ETag`, a rate-limit budget, `201` versus `200`, the final URL after a redirect. On a successful call, none of it was reachable. Minimalism had justified the omission, and nobody was ever going to file an issue about it — they would have dropped down to `fetch` for that one endpoint and moved on.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `const { data, response } = await api.raw.get<User[]>('/users')

data[0].name
response.headers.get('link')`
			},
			{
				type: 'paragraph',
				text: 'A second client rather than a `raw: true` option, because an option that rewrites the return type has to be read back out with a conditional type. Both clients project from the same `request()`, which always resolves to both halves — two code paths through a request is how they drift apart.'
			},
			{ type: 'heading', level: 2, text: 'One decision shaped the whole API' },
			{
				type: 'paragraph',
				text: 'air had to work two ways: as a direct wrapper you call with `air.get(url)`, and as a factory producing configured clients with `air.create({ baseURL })`. The obvious implementation gives you two code paths, a default instance and a constructor, and they drift the first time an option lands in one and not the other.'
			},
			{
				type: 'paragraph',
				text: 'The fix was to stop treating the root export as special. `air` is a client created with empty defaults, so there is exactly one implementation.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `export function create(defaults: AirOptions = {}): AirClient {
  const settle = (options?: AnyOptions, method?: string): AnyOptions =>
    method ? { ...merge(defaults, options), method } : merge(defaults, options)

  const call = <T>(url: AirURL, options?: AnyOptions): Promise<T> =>
    request(url, settle(options)).then((result) => result.data as T)

  const shortcut =
    (method: string) =>
    <T>(url: AirURL, options?: AnyOptions): Promise<T> =>
      request(url, settle(options, method)).then((result) => result.data as T)

  return Object.assign(call, verbs(shortcut), {
    raw: Object.assign(rawCall, verbs(rawShortcut)),
    create: (options?: AirOptions) => create(merge(defaults, options) as AirOptions)
  })
}

export const air = create()`
			},
			{
				type: 'paragraph',
				text: 'The seven verbs are listed in exactly one place too, in that `verbs()` helper, which both the plain client and the raw one are built from — for the same reason. A method cannot be added to one client and forgotten in the other if there is only one list. The rest fell into seven flat files: `url`, `body`, `parse`, `error`, `client`, `types`, `index` — the largest of them 233 lines, comments included. No directory tree, and no barrel file except the entry point.'
			},
			{ type: 'heading', level: 2, text: 'The bug that never failed' },
			{
				type: 'paragraph',
				text: 'The worst defect this library shipped never produced an error. air picks a parse mode from the response `Content-Type`: JSON for `application/json`, text for anything under `text/`, a `Blob` for the rest. `text/event-stream` matches that `text/` prefix, so a server-sent-events endpoint was read as text — and every parse mode but one reads the body to completion.'
			},
			{
				type: 'paragraph',
				text: 'An SSE endpoint is designed never to close. So the request succeeded, the bytes kept arriving, and the promise never settled. Not a failure you could catch: no status to inspect, no error to log, nothing on fire. Just a call that never came back.'
			},
			{
				type: 'paragraph',
				text: '`text/event-stream`, `application/x-ndjson` and `application/jsonl` are now checked before the `text/` rule and handed back unread, as a `ReadableStream`. The fix has a cost: that list is something I maintain now, and adding to it is a breaking change for anyone parsing one of those types today. `application/octet-stream` is deliberately not on it, despite the name — a binary download ends, and buffering one is what `Blob` is for.'
			},
			{ type: 'heading', level: 2, text: 'Deleting features instead of fixing them' },
			{
				type: 'paragraph',
				text: "The first `timeout` option was built the obvious way: an `AbortController` inside the client, a timer that aborts it, the caller's own signal forwarded in, and a `finally` that tears both down when the request finishes. But `fetch()` resolves when the headers arrive, not when the body has been read, so that cleanup disarmed the timer exactly as the download started. I pointed it at an endpoint that drips its body over ten seconds, set a 500 ms timeout, fired an explicit abort at 50 ms, and watched the request hang forever."
			},
			{
				type: 'paragraph',
				text: "The fix was to delete the option. `AbortSignal.timeout(ms)` is native, `AbortSignal.any([...])` composes it with the caller's own signal, and air forwards `signal` to `fetch` untouched — so there is no bridge left to tear down at the wrong moment."
			},
			{
				type: 'paragraph',
				text: "That went well enough that I did the same to `retry`, pulling it out into a standalone helper. The helper turned out to have a bug of its own. A retry loop has to tell a transient failure apart from a request the caller cancelled on purpose, and mine did it by checking the error's `name` for `AbortError`. Which holds until someone writes `controller.abort(new Error('user navigated away'))`. Now the name is `Error`, the check says transient, and the helper makes three attempts at a request that was explicitly cancelled. I watched it do that in a test."
			},
			{
				type: 'paragraph',
				text: 'There was no fixing the predicate where it sat. The only reliable answer to whether something was cancelled on purpose is the `AbortSignal` itself, and a generic helper that receives a callback and an error never has the signal in scope. So retry came out completely. In userland the same loop is five lines, and the signal is right there.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `// The caller has the signal in scope, so the loop checks it directly
// instead of interrogating an error the caller controls.
async function withRetry(fn, signal, attempts = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt >= attempts || signal.aborted || !transient(error)) throw error
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 100))
    }
  }
}`
			},
			{
				type: 'paragraph',
				text: "Reading `ofetch` afterwards, I found its retry loop making the same `error.name === 'AbortError'` check for the same decision — which is the outside confirmation I did not have when I deleted mine. The rule that came out of it generalizes past retries: **moving a decision out of the client only works if the information behind it moves out too.** Before extracting anything into a helper, check which of the two it actually needs."
			},
			{ type: 'heading', level: 2, text: 'What the deletion cost' },
			{
				type: 'paragraph',
				text: 'Removing `timeout` left a hole, and it took a user-facing bug to see it. Pointing people at `AbortSignal.timeout(ms)` works per request; it gives them no way to express a budget as a client default. Written into `create()`, a signal is a single instance shared by every request that client will ever make, with its clock started at `create()` time.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `// Wrong: one signal for every request this client will ever make. It works
// for five seconds, then fails all of them instantly, without sending one.
const api = air.create({ signal: AbortSignal.timeout(5000) })

// Right: called once per request, so each request gets its own budget.
const api = air.create({ signal: () => AbortSignal.timeout(5000) })`
			},
			{
				type: 'paragraph',
				text: 'A fired signal stays fired, and `fetch` rejects an already-aborted one before it sends anything — so the client worked for five seconds and was then permanently broken. Same trap as a static `Authorization` header baked into a long-lived client, and the same fix.'
			},
			{
				type: 'paragraph',
				text: 'That function is narrower than it looks. There is still no `AbortController` inside the client, no bridging and no composing of signals; it only decides *which* signal gets forwarded, and forwarding is still untouched — the bug that got `timeout` deleted stays fixed. Two options now take a function for the same reason, so the pattern earned a name: **an option whose correct value is only knowable per request may be a function.** Which is not a licence to make everything a thunk. `baseURL` cannot go stale between requests, and a function there would buy nothing but a call.'
			},
			{ type: 'heading', level: 2, text: 'A type that could not lie' },
			{
				type: 'paragraph',
				text: "`parse: 'stream'` hands the body back unread. It is also the one parse mode whose type air already knows, which is what made this compile:"
			},
			{
				type: 'code',
				language: 'ts',
				code: `const user = await api.get<User>('/download', { parse: 'stream' })
user.id // typechecks. it is a ReadableStream.`
			},
			{
				type: 'paragraph',
				text: "Every other mode's type is the caller's assertion, because only they know what the endpoint returns. For this one the compiler was endorsing an answer it could see was wrong — the single class of defect here that corrupts a program rather than annoying a developer, and the second time that exact hole opened: an earlier `parse: 'response'` had it first, and its replacement reopened it."
			},
			{
				type: 'paragraph',
				text: 'Four designs went through the compiler before one held. Overloads alone do not close it: an explicit `<T>` makes TypeScript discard every overload without type parameters and fall through to the generic one. What shipped is the fourth attempt — `stream` is excluded from the options type entirely, and reachable only through an overload that has no `<T>` to contradict.'
			},
			{
				type: 'paragraph',
				text: 'Client defaults are the one place no signature can reach, so `air.create({ parse: \'stream\' })` is a compile error rather than a documented footgun. A client sends requests to many endpoints, and "every response here is an unread stream" was never a thing to mean.'
			},
			{ type: 'heading', level: 2, text: 'Reading ofetch' },
			{
				type: 'paragraph',
				text: 'Once the design settled I cloned `ofetch` and read all 800 lines of it. It has been in this problem space for years and has already met edge cases I had not reached. Two things went in; the rest went into a written rejected list, so the next person who reads that source does not re-propose them from scratch.'
			},
			{
				type: 'list',
				items: [
					"Took: trimming the library's own frames off thrown stack traces. One guarded call to `Error.captureStackTrace`, and every error points at the caller's line instead of at air's internals.",
					'Took: accepting a `URL` object as a request target. Native `fetch` does, and my signature had been narrower than the thing it wraps.',
					'Refused: lifecycle hooks. Seen in a real implementation they cost a context object threaded through four optional slots. The concrete request behind the ask is almost always "refresh the token on a 401", which a wrapper around the injected `fetch` answers on its own — so the README answers it there, once, instead of the library carrying the general case forever.',
					'Refused: quietly `JSON.stringify`-ing nested query values. Objects and `Date`s are a compile error instead, so passing one is something you see immediately rather than a locale-dependent string you find in production.'
				]
			},
			{ type: 'heading', level: 2, text: 'The test suite was never the gate' },
			{
				type: 'paragraph',
				text: 'All three bugs air has shipped got through a fully green test run. A streaming request body that threw at the transport, the shared signal above, and a `null` header that went out as the string `"null"` on one code path. That is the shape of the tool, not a coverage gap: the suite mocks `fetch`, and a mock agrees with whatever its author already believed.'
			},
			{
				type: 'paragraph',
				text: "Real `fetch` refuses a `ReadableStream` body unless you tell it `duplex: 'half'`. Real `fetch` rejects an already-fired signal before sending. The `Headers` constructor stringifies a `null` instead of deleting the key. A hand-written double does none of that unless you already knew to make it — which is to say, unless you already knew about the bug."
			},
			{
				type: 'paragraph',
				text: 'So `examples/` became the integration lane. Seven files, each one a recipe from the README made executable: it starts a local HTTP server, exercises the built package over real `fetch`, and asserts what it demonstrates. CI runs them on every supported Node, and all three shipped bugs are pinned there now. Each file is a recipe *and* a test, in that order — setup above a `--- the recipe ---` marker so the part a reader copies is obvious, assertions below a `--- what it proves ---` one. If a recipe cannot be asserted, it is not understood well enough to publish.'
			},
			{
				type: 'quote',
				text: 'When the mock and the platform disagree, the mock is wrong.',
				cite: 'CONTRIBUTING.md'
			},
			{ type: 'heading', level: 2, text: 'Shipping was its own project' },
			{
				type: 'paragraph',
				text: 'The last stretch had nothing to do with HTTP. `dist/` was gitignored while `files` pointed at it, so publishing from a clean checkout would have shipped a package with no code in it — caught by running `npm publish --dry-run` in a fresh clone, which is now the thing I do before every release. The name `air` was taken on npm, so it went out as `@korastd/air`. And npm had removed the 2FA-bypass tokens automation used to rely on, so a stored token in CI now just earns a 403; the release workflow authenticates through OIDC trusted publishing instead, with no long-lived credential anywhere.'
			},
			{
				type: 'paragraph',
				text: 'Then GitHub Actions had a major outage on release day, the first publish went out by hand behind a passkey, and the registry took 144 seconds to propagate metadata while the package page was already rendering.'
			},
			{
				type: 'paragraph',
				text: "One more thing changes the moment code lands in somebody else's dependency tree. An app can end up holding two copies of a package — two versions resolved, or a bundled copy beside an installed one — and each copy brings its own classes. `isAirError` used `instanceof`, so across that boundary it would have quietly answered `false` on an error air itself had thrown. It checks a `Symbol.for('air.error')` brand now; the symbol registry is global, so every copy agrees."
			},
			{
				type: 'paragraph',
				text: 'What is left is 122 tests, seven modules, 7.6 kB of JavaScript, and a contributing guide that records why each removal happened — including one change I made, tested and then reverted when a new test showed `///users` resolving to `https://users/`.'
			},
			{
				type: 'paragraph',
				text: 'That guide is the part I would keep if I had to throw the rest away. A feature that is present is documented by the code that implements it. A feature that was removed leaves no trace at all, and without somewhere to write down why, I would eventually put every one of them back.'
			}
		]
	}
	/*
	 * Pegaso y Medusa quedan escritos pero fuera de circulación: no aparecen en
	 * /blog, no generan su ruta, y un enlace viejo a cualquiera de las dos da
	 * 404 como cualquier slug que no existe. El contenido se conserva completo
	 * —nada se borró— para poder reactivarlos descomentando este bloque.
	 */
	/*
	{
		slug: 'scaling-pegaso-to-6200-users',
		title: 'Scaling Pegaso to 6,200 users without a budget',
		description:
			'A course scheduling platform for my university went from a weekend project to something 6,200 students depended on. The traffic found problems I would not have predicted.',
		date: '2026-05-18',
		tags: ['Architecture', 'Go', 'Postgres'],
		// violeta: la identidad visual de Pegaso, la plataforma que escala
		accent: '#8b5cf6',
		content: [
			{
				type: 'paragraph',
				text: 'Pegaso started as a personal annoyance. Every semester, thousands of students at Universidad Nacional de Colombia opened a dozen browser tabs to reconcile course times by hand. I wrote a scheduler that did it in one pass, deployed it on the cheapest infrastructure I could find, and shared the link in a couple of group chats.'
			},
			{
				type: 'paragraph',
				text: 'Within three weeks it had 6,200 active users. No marketing and no institutional endorsement, just a link that kept getting forwarded.'
			},
			{ type: 'heading', level: 2, text: 'The traffic shape' },
			{
				type: 'paragraph',
				text: 'Academic tooling has a brutal traffic curve. For most of the semester the service sits nearly idle, and then registration opens and every student in the faculty arrives inside the same 90 minutes. There is no point looking at average load.'
			},
			{
				type: 'paragraph',
				text: 'Autoscaling reacts too slowly to help at that granularity, so most of the architecture went into making the peak cheap to serve.'
			},
			{ type: 'heading', level: 3, text: 'Precomputing the expensive path' },
			{
				type: 'paragraph',
				text: 'The course catalog changes a handful of times a semester and is identical for every user, while schedule permutation is per-user and combinatorial. Splitting those two lifetimes was most of the optimization: the catalog is materialized into an immutable snapshot on ingest, and the solver runs against an in-memory view of it.'
			},
			{
				type: 'code',
				language: 'go',
				code: `// The catalog is rebuilt on ingest, never per request.
// Readers get a consistent snapshot without touching the database.
type Catalog struct {
	snapshot atomic.Pointer[Snapshot]
}

func (c *Catalog) Load() *Snapshot {
	return c.snapshot.Load()
}

func (c *Catalog) Rebuild(ctx context.Context, db *pgxpool.Pool) error {
	next, err := buildSnapshot(ctx, db)
	if err != nil {
		return fmt.Errorf("build snapshot: %w", err)
	}

	c.snapshot.Store(next)
	return nil
}`
			},
			{
				type: 'paragraph',
				text: 'During the registration spike, requests never hit Postgres for catalog reads. The database only handles writes and the occasional saved schedule. Allocating more memory turned out to be cheaper than finding more connections.'
			},
			{ type: 'heading', level: 2, text: 'What actually broke' },
			{
				type: 'list',
				items: [
					'Connection pooling, first. The default pool size was tuned for a service that never sees 400 concurrent users, and it queued requests until they timed out.',
					'JSON serialization of the full catalog on every response, which I had assumed was negligible and turned out to be the top entry in the CPU profile.',
					'My own assumption that users would explore one schedule at a time. They opened five tabs and compared, which tripled the request count per session.'
				]
			},
			{
				type: 'paragraph',
				text: 'None of it was hard to fix once I could see it, and none of it was going to show up without real traffic on the thing.'
			},
			{ type: 'heading', level: 2, text: 'Afterwards' },
			{
				type: 'paragraph',
				text: "The university's own platform, released the following year, adopted the interaction model Pegaso had landed on, and there were eventually formal acquisition conversations. None of that was the plan. I wanted my own schedule to stop taking an afternoon."
			}
		]
	},
	{
		slug: 'extracting-a-framework-instead-of-designing-one',
		title: 'Extracting a framework instead of designing one',
		description:
			'Medusa came out of four production Go services that had ended up with the same structure. I pulled the shared parts into a framework, then put it back into the services it came from.',
		date: '2026-03-02',
		tags: ['Go', 'Open Source', 'Architecture'],
		// Medusa es medusa: en español, el nombre ya es una criatura marina. El
		// teal bioluminiscente lee más "aguaviva de profundidad" que "framework de
		// Go", y es esa asociación —no el lenguaje— la que le da personalidad
		// propia frente al resto de los acentos, todos elegidos por tecnología.
		accent: '#0891b2',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'Most frameworks get written in the wrong order: someone imagines the applications people will build, designs abstractions for them, and finds out later which ones were guesses.'
			},
			{
				type: 'paragraph',
				text: 'Medusa went the other way around. By the time I wrote the first line of it I had shipped four production Go services for different clients in different industries. They shared no code. Read side by side, they had the same skeleton.'
			},
			{ type: 'heading', level: 2, text: 'Repetition across codebases' },
			{
				type: 'paragraph',
				text: 'What made it worth extracting is that the similarity happened without coordination. Four codebases written months apart, under different constraints, had landed on the same boundary between transport, use case and persistence.'
			},
			{
				type: 'code',
				language: 'go',
				code: `// The handler knows about HTTP. The service does not.
// This boundary survived every codebase it was extracted from.
type Service interface {
	Create(ctx context.Context, input CreateInput) (*Resource, error)
}

func Handle(svc Service) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		input, err := decode[CreateInput](r)
		if err != nil {
			respond.Error(w, http.StatusBadRequest, err)
			return
		}

		resource, err := svc.Create(r.Context(), input)
		if err != nil {
			respond.Error(w, statusFor(err), err)
			return
		}

		respond.JSON(w, http.StatusCreated, resource)
	}
}`
			},
			{ type: 'heading', level: 2, text: 'The validation loop' },
			{
				type: 'paragraph',
				text: 'Extraction on its own proves nothing, so every abstraction had to make the round trip: pull it out, then put it back into the systems it came from. If moving a service onto the framework version made that service worse, the abstraction was wrong and got deleted.'
			},
			{
				type: 'list',
				ordered: true,
				items: [
					'Identify a pattern that appears in at least three of the four services.',
					'Extract the smallest version of it that covers all three call sites.',
					'Migrate one service onto it and read the resulting diff.',
					'If the migration adds indirection without removing decisions, discard it.'
				]
			},
			{
				type: 'paragraph',
				text: 'Step four killed more candidates than the rest combined. Configurable middleware chains, a generic repository layer, a pluggable event bus. Each one was fine on its own, and each one made the calling code harder to read.'
			},
			{ type: 'heading', level: 2, text: 'Where it landed' },
			{
				type: 'paragraph',
				text: 'What is left is smaller than what I would have designed on a whiteboard, and every piece of it has a production system behind it. When someone asks why a boundary sits where it does, I can point at four codebases that put it there before I did.'
			}
		]
	}
	*/
];

const WORDS_PER_MINUTE = 210;

function blockText(block: PostBlock): string {
	switch (block.type) {
		case 'paragraph':
		case 'heading':
			return block.text;
		case 'quote':
			return `${block.text} ${block.cite ?? ''}`;
		case 'list':
			return block.items.join(' ');
		case 'code':
			return block.code;
	}
}

export function readingTime(post: Post): number {
	const words = post.content.map(blockText).join(' ').trim().split(/\s+/).filter(Boolean).length;

	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Fecha numérica para el índice: alineada, del mismo ancho en todas las filas y
 * ordenable a ojo. En una lista, `2026.08.06` se compara de un vistazo con la
 * de abajo; `Aug 6, 2026` no.
 */
export function formatDateIndex(date: string): string {
	return date.replaceAll('-', '.');
}

export function formatDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

export function toSummary(post: Post): PostSummary {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { content, ...meta } = post;
	return { ...meta, readingTime: readingTime(post) };
}

function byDateDesc(a: Post, b: Post): number {
	return b.date.localeCompare(a.date);
}

export function getPosts(): Post[] {
	return [...posts].sort(byDateDesc);
}

export function getSummaries(): PostSummary[] {
	return getPosts().map(toSummary);
}

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getTags(): string[] {
	return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}

export function getSiblings(slug: string): {
	previous: PostSummary | null;
	next: PostSummary | null;
} {
	const sorted = getPosts();
	const index = sorted.findIndex((post) => post.slug === slug);

	return {
		previous: index > 0 ? toSummary(sorted[index - 1]) : null,
		next: index >= 0 && index < sorted.length - 1 ? toSummary(sorted[index + 1]) : null
	};
}

export { posts };
