import type { Post, PostBlock, PostSummary } from './types';

const posts: Post[] = [
	{
		slug: 'building-air-from-empty-repo-to-npm',
		title: 'The fetch wrapper I had rewritten in every project',
		description:
			'air is the `api.ts` I had retyped from scratch in every app, written once as a package instead. Most of the work was deciding what belonged in it: the rules I wrote before the code, and the reason behind each of the eight options that survived.',
		date: '2026-08-19',
		tags: ['TypeScript', 'Open Source', 'API Design'],
		// azul cristal: una librería mínima y precisa, sin peso de más
		accent: '#3b82f6',
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'Every project I work on eventually grows the same file. `api.ts` or `http.ts`, wrapping `fetch`: join a base URL, serialize a body, parse the response, throw when the status is not 2xx. None of it is hard. I wrote it from scratch every time anyway, because copying the old one over always felt worse than retyping it.'
			},
			{
				type: 'paragraph',
				text: 'That file is never finished, either. It gets a token header when the app grows auth, a `Content-Type` exception the first time someone uploads a file, a second branch when the framework hands me its own `fetch` on the server. By then it is a small library living inside an application, with no tests and no name of its own.'
			},
			{
				type: 'paragraph',
				text: 'So I wrote it once, on purpose, as a package. air is seven files and about 580 lines of TypeScript with no runtime dependencies, and it does four things: build a URL, detect a body, parse a response, and throw an error that carries the response with it.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `const api = air.create({ baseURL: 'https://api.example.com' })

const user = await api.get<User>('/users/1')
const page = await api.get<Page<User>>('/users', { query: { page: 2, active: true } })
const created = await api.post<User>('/users', { body: { name: 'Ada' } })`
			},
			{ type: 'heading', level: 2, text: 'Why not one of the existing ones' },
			{
				type: 'paragraph',
				text: 'Before writing anything I read the three clients people compare it to, and measured them instead of trusting the impression each one leaves. Bundled and minified with esbuild, then gzipped: `axios` is 18.6 kB in the browser and 64.9 kB on the server, `ky` 7.3 kB, `ofetch` 4 kB in the browser and 36.8 kB on the server.'
			},
			{
				type: 'list',
				items: [
					'`axios` comes from before `fetch` was universal, which explains most of it: its own adapter layer over XHR and Node `http`, an interceptor system, CJS support. It is still the default answer in most of the ecosystem.',
					'`ky` is the closest sibling: `fetch`-only, zero dependencies, ESM-only, the taste of one author applied consistently. It makes the opposite call on batteries. Retry, timeout and hooks ship with it, and out of the box it times out at 10 s and retries twice.',
					'`ofetch` has almost exactly the ergonomics I wanted, and pays for Node compatibility to get there: three runtime dependencies and a polyfill that accounts for most of its cost on the server. It also retries GET and HEAD once, silently.'
				]
			},
			{
				type: 'paragraph',
				text: 'None of that is wrong. It is a different bet, and the difference is mostly about who owns the decisions. `ky` returns a response you call `.json<User>()` on. `axios` gives you a `data` property to unwrap on every call. And two of the three retry on their own, which means a request I believe I sent once may have been sent twice.'
			},
			{
				type: 'paragraph',
				text: "My bet is that an HTTP client's whole job is those four things, and that everything else is a function the caller already knows how to write. air bundles to 1.94 kB gzipped, the same figure in the browser and on the server, because there is no second transport for the server to need."
			},
			{
				type: 'paragraph',
				text: 'The same document carries the unflattering half. Those three have years of resolved edge cases behind them and 131 million weekly downloads between them; air has one author, a test suite, and 47. I wrote that comparison into the repo myself so I would not be tempted to frame it better later.'
			},
			{ type: 'heading', level: 2, text: 'The rules came before the code' },
			{
				type: 'paragraph',
				text: 'The first commit that mattered was a document, not code: less code is better, zero runtime dependencies ever, native `fetch` only with no polyfill and no second transport, ESM only, predictable over clever, types are the docs. Then a list of things air is not allowed to become: interceptor chains, a plugin system, retries or timeouts in any form, caching, request deduplication, Node-only features that break in a browser.'
			},
			{
				type: 'paragraph',
				text: 'That is a lot of ceremony for a package this size, and it earned its place anyway. On day one the pressure to add a feature does not come from users, because there are none. It comes from me at 11 p.m., deciding that one small option would be convenient. With the rule written down I have to go argue with the document first, and I lose that argument more often than I win it.'
			},
			{
				type: 'paragraph',
				text: 'The rule that needed a counterweight is the first one. "Less code is better" can justify any omission, because the cost of a feature you shipped shows up in the diff and the cost of one you did not ship shows up nowhere. So every review asks a second question next to *what can we remove*: what can a user not do at all?'
			},
			{
				type: 'paragraph',
				text: 'That question is where the gaps were. Auto-parsing the response is the entire point of a wrapper like this, right up until you want something that lives on the response rather than in it: a `Link` header, an `ETag`, `201` versus `200`, the final URL after a redirect. On a successful call none of it was reachable, and nobody was ever going to file an issue about it; they would have dropped down to `fetch` for that one endpoint and moved on. Every client carries a `raw` twin now, with the same seven methods, resolving to `{ data, response }` instead of the body.'
			},
			{ type: 'heading', level: 2, text: 'One implementation, not two' },
			{
				type: 'paragraph',
				text: 'air had to work two ways: as a direct wrapper you call with `air.get(url)`, and as a factory producing configured clients with `air.create({ baseURL })`. The obvious implementation gives you two code paths, a default instance and a constructor, and they drift the first time an option lands in one and not the other.'
			},
			{
				type: 'paragraph',
				text: 'So the root export is just another client, created with empty defaults. That leaves exactly one implementation to keep correct.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `export const air = create()`
			},
			{
				type: 'paragraph',
				text: 'The same idea decided the rest of the internals. The seven verbs are listed in one helper that both the plain client and the raw one are built from, so a method cannot be added to one and forgotten in the other. Both clients project from a single `request()` that always resolves to both halves, because a second path through a request is where the two would start disagreeing about what a request is. The whole thing is seven flat files (`url`, `body`, `parse`, `error`, `client`, `types`, `index`), with no directory tree and no barrel file except the entry point.'
			},
			{ type: 'heading', level: 2, text: 'Eight options, and what each one had to prove' },
			{
				type: 'paragraph',
				text: 'The options table is the part I rewrote most. Every option on it is permanent: something a user has to learn, and something I have to keep true in every future version. A few of the decisions behind the current eight.'
			},
			{
				type: 'paragraph',
				text: '`baseURL` joins as strings rather than resolving as URLs. Standard URL resolution treats a leading slash as origin-root, so `https://api.test/v1` plus `/users` would drop the `/v1`, which breaks any API mounted under a path. For the same reason a leading `//` is read as a path and not as a protocol-relative URL: stray double slashes from string building are far more common than the intentional case, which is deprecated anyway. I changed that rule once and reverted it when a test showed `///users` resolving to `https://users/`.'
			},
			{
				type: 'paragraph',
				text: '`query` refuses to guess. Values are primitives or arrays of primitives, and the type enforces it, so an object or a `Date` is a compile error instead of an `[object Object]` or a locale-dependent string you find in production. `undefined` and `null` are dropped while `false`, `0` and the empty string are kept, which is the same bug I have written by hand in a dozen of those `api.ts` files.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `await api.get('/search', { query: { tags: ['a', 'b'], page: 2, draft: false } })
// ?tags=a&tags=b&page=2&draft=false

await api.get('/search', { query: { since: new Date() } })
// compile error: serialize it yourself, so the format stays your decision`
			},
			{
				type: 'paragraph',
				text: 'Body detection never re-serializes something that is already a valid `fetch` body: plain objects and arrays become JSON with a `Content-Type`, and `FormData`, `Blob`, `URLSearchParams`, typed arrays and strings pass through untouched. `FormData` is the one place air overrides the caller instead of deferring to them, deleting a `Content-Type` even when it was set explicitly, because the multipart boundary is generated at send time and no literal value a caller could write is ever correct. That is the most common bug in wrappers like this one.'
			},
			{
				type: 'paragraph',
				text: 'And errors, which are the reason people wrap `fetch` in the first place. A non-2xx throws an `AirError` carrying the status, the parsed error body, the response, and the request as it went out, resolved headers included. `options.headers` may still be an unevaluated function, which is useless when you are holding a 401 and want to know which token was sent.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `try {
  await api.post('/users', { body: input })
} catch (error) {
  if (isAirError(error) && error.status === 422) {
    return error.data as ValidationProblem
  }
  throw error
}`
			},
			{ type: 'heading', level: 2, text: 'Two options that take a function' },
			{
				type: 'paragraph',
				text: 'The first user-facing bug was a client that kept sending an expired token. A `headers` object passed to `create()` is evaluated once, at `create()` time, and frozen in the closure from then on, so every request made after a refresh sends the stale one. A long-lived client and a rotating token are the normal case, not the exotic one.'
			},
			{
				type: 'paragraph',
				text: 'The fix stayed inside the existing option instead of growing a new one: `headers` may be a function, called once per request. Header sources also merge lazily, so a chain of `create()` calls nests closures and nothing is resolved until the request that needs it. Resolving eagerly at merge time would reintroduce the frozen token one layer down.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `const api = air.create({
  baseURL: 'https://api.example.com',
  headers: () => ({ Authorization: \`Bearer \${getToken()}\` }),
  signal: () => AbortSignal.timeout(5000)
})`
			},
			{
				type: 'paragraph',
				text: '`signal` later took the same shape for the same reason, and the pattern has a name now: an option may be a function when its correct value is only knowable per request. Which is not a licence to make everything a thunk. `baseURL` and `parse` cannot go stale between requests of the same client, and a function there would buy nothing but a call.'
			},
			{ type: 'heading', level: 2, text: 'What I decided not to build' },
			{
				type: 'paragraph',
				text: "`timeout` and `retry` both existed, and both came out. The timeout was built the obvious way: an `AbortController` inside the client, a timer that aborts it, the caller's signal forwarded in, and a `finally` that tears both down. But `fetch()` resolves when the headers arrive, not when the body has been read, so that cleanup disarmed the timer exactly as the download started. Against an endpoint that drips its body over ten seconds, a 500 ms timeout and an explicit abort at 50 ms both did nothing, and the request hung forever. `AbortSignal.timeout(ms)` and `AbortSignal.any([...])` are native, so deleting the option meant deleting the bridge where that bug lived. air forwards `signal` to `fetch` untouched."
			},
			{
				type: 'paragraph',
				text: "Retry went for a subtler reason. A retry loop has to tell a transient failure apart from a request the caller cancelled on purpose, and the only reliable source for that is the `AbortSignal` itself: `abort(reason)` lets the caller supply any reason, so sniffing the error's `name` for `AbortError` misclassifies a deliberate cancellation as transient. Mine retried cancelled requests three times, and there was no fixing it where it sat, because a generic helper that receives a callback and an error never has the signal in scope. In the caller's own code the loop is five lines and the signal is right there."
			},
			{
				type: 'paragraph',
				text: 'The rule that came out of that generalizes past retries: moving a decision out of the client only works if the information behind it moves out too. Before extracting anything into a helper, check which of the two it needs.'
			},
			{ type: 'heading', level: 2, text: 'What the tests could not tell me' },
			{
				type: 'paragraph',
				text: 'All three bugs air has shipped got through a fully green test run: a streaming request body that threw at the transport, a shared signal that permanently broke a client after five seconds, and a `null` header that went out as the string `"null"`. That is the shape of the tool rather than a coverage gap. The suite mocks `fetch`, and a mock agrees with whatever its author already believed.'
			},
			{
				type: 'paragraph',
				text: "Real `fetch` refuses a `ReadableStream` body without `duplex: 'half'`, rejects an already-fired signal before sending, and stringifies a `null` header instead of deleting the key. A hand-written double does none of that unless you already knew about the bug. So `examples/` became the integration lane: seven files, each one a recipe from the README made executable against a local server and the real `fetch`, asserting what it demonstrates. CI runs them on every supported Node, and all three shipped bugs are pinned there."
			},
			{ type: 'heading', level: 2, text: 'What it cost to publish' },
			{
				type: 'paragraph',
				text: 'The last stretch had nothing to do with HTTP. `dist/` was gitignored while `files` pointed at it, so publishing from a clean checkout would have shipped a package with no code in it. `npm publish --dry-run` in a fresh clone caught it, and that is now the thing I do before every release. The name `air` was taken on npm, so it went out as `@korastd/air`, and CI publishes through OIDC trusted publishing rather than a stored token.'
			},
			{
				type: 'paragraph',
				text: 'What is left is 122 tests, seven modules, 7.6 kB of JavaScript, and a contributing guide that records why each decision went the way it did, including the ones that removed something.'
			},
			{
				type: 'paragraph',
				text: 'That guide is the part I would keep if I had to throw the rest away. A feature that is present is documented by the code that implements it. A feature that was considered and rejected leaves no trace at all, and without somewhere to write down why, I would eventually put every one of them back.'
			}
		]
	}
	/*
	 * Pegaso y Medusa quedan escritos pero fuera de circulación: no aparecen en
	 * /blog, no generan su ruta, y un enlace viejo a cualquiera de las dos da
	 * 404 como cualquier slug que no existe. El contenido se conserva completo
	 * (nada se borró) para poder reactivarlos descomentando este bloque.
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
		// Go", y es esa asociación (no el lenguaje) la que le da personalidad
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
