import type { Post, PostBlock, PostSummary } from './types';

const posts: Post[] = [
	{
		slug: 'building-air-from-empty-repo-to-npm',
		title: 'Building air, from an empty repo to a published package',
		description:
			'I wrote a 300-line fetch wrapper and published it to npm. Most of the work happened after it already worked: three bugs the test suite could not see, and two features I removed instead of fixing.',
		date: '2026-08-06',
		tags: ['TypeScript', 'Open Source', 'API Design'],
		// cian frío: una librería mínima, sin peso — el tono acompaña el tamaño
		accent: '#22d3ee',
		content: [
			{
				type: 'paragraph',
				text: 'Every project I work on eventually grows the same file. `api.ts` or `http.ts`, wrapping `fetch`: parse the response, throw when the status is not 2xx, join a base URL, serialize a body. None of it is hard, and I had still written it from scratch every time, because copying the old one over always felt worse than retyping it.'
			},
			{
				type: 'paragraph',
				text: 'So I wrote it once properly. air is around 300 lines, zero runtime dependencies, roughly 2 kB over the wire, and it took an afternoon. Then I spent a few weeks on it anyway.'
			},
			{ type: 'heading', level: 2, text: 'Writing the constraints down first' },
			{
				type: 'paragraph',
				text: 'Before writing any code I put the philosophy in the repo as its own document. Most of it is a list of things the library is not allowed to become: interceptor chains, a plugin system, a caching layer, Node-specific escape hatches that break in a browser.'
			},
			{
				type: 'paragraph',
				text: 'That is a lot of ceremony for a 300-line package. It earned its place anyway. On day one the pressure to add features does not come from users, it comes from me at 11 p.m. deciding that a small option would be convenient. Having written the rule down, I have to go argue with the document before I add anything.'
			},
			{ type: 'heading', level: 2, text: 'One decision shaped the API' },
			{
				type: 'paragraph',
				text: 'air had to work two ways: as a direct wrapper you call with `air.get(url)`, and as a factory that produces configured clients with `air.create({ baseURL })`. The obvious implementation gives you two code paths, a default instance and a constructor, and they drift the first time an option lands in one and not the other.'
			},
			{
				type: 'paragraph',
				text: 'The fix was to stop treating the root export as special. `air` is just a client created with empty defaults, so there is only one implementation.'
			},
			{
				type: 'code',
				language: 'ts',
				code: `// The root export is a client built with empty defaults,
// so both entry points run through the same implementation.
export function create(defaults: AirOptions = {}): AirClient {
  const call = <T>(url: AirURL, options?: AirOptions) =>
    request<T>(url, merge(defaults, options))

  const shortcut =
    (method: string) =>
    <T>(url: AirURL, options?: AirOptions) =>
      request<T>(url, { ...merge(defaults, options), method })

  return Object.assign(call, {
    get: shortcut('GET'),
    post: shortcut('POST'),
    // ...the rest of the verbs
    create: (options?: AirOptions) => create(merge(defaults, options))
  })
}

export const air = create()`
			},
			{
				type: 'paragraph',
				text: 'The rest fell into seven flat files: `url`, `body`, `parse`, `error`, `client`, `types`, `index`, none longer than about a hundred lines. No directory tree, no barrel files.'
			},
			{ type: 'heading', level: 2, text: 'Three bugs the tests could not see' },
			{
				type: 'paragraph',
				text: 'The first version passed every test I had written for it and was wrong in three places. The suite could not have caught any of them: it imported the source and mocked `fetch`, and `fetch` was where the bugs were.'
			},
			{
				type: 'paragraph',
				text: "The worst one was `timeout`. I implemented it the obvious way: an `AbortController`, a timer that aborts it, the caller's own signal forwarded in, and a `finally` that cleans both up when the request finishes. But `fetch()` resolves when the headers arrive, not when the body has been read, so that cleanup disarmed the timer right as the download started. I pointed it at an endpoint that trickles its body over ten seconds, set a 500 ms timeout, fired an explicit abort at 50 ms, and the request hung forever."
			},
			{
				type: 'paragraph',
				text: "The second was `isAirError`, which used `instanceof`. An application can end up with two copies of a package loaded, two versions in the tree or a bundled copy beside a resolved one, and each copy brings its own class, so `instanceof` comes back false across them. It checks a `Symbol.for('air.error')` brand now. The symbol registry is global, so every copy agrees."
			},
			{
				type: 'paragraph',
				text: "The third was a dead end rather than a bug. Auto-parsing the response is convenient until you want a header off it, `Link` or `ETag` or anything about rate limits, and there was no way to reach the `Response` on a successful call. 'Less is better' had justified that omission, and nobody was ever going to file an issue about it."
			},
			{ type: 'heading', level: 2, text: 'Deleting features instead of fixing them' },
			{
				type: 'paragraph',
				text: "The fix for the timeout bug was to delete the option. `AbortSignal.timeout(ms)` is native, `AbortSignal.any([...])` composes it with the caller's own signal, and air forwards `signal` straight to `fetch`, so there is no bridge left to tear down."
			},
			{
				type: 'paragraph',
				text: 'It went well enough that I did the same to `retry`, pulling it into a standalone helper, and the helper turned out to have a bug of its own. A retry loop has to tell a transient failure apart from a request the caller cancelled on purpose, and mine did it by checking the error\'s `name` for `AbortError`. That holds until someone calls `controller.abort(new Error("user navigated away"))`. Now the name is `Error`, the check says transient, and the helper makes three attempts at a request that was explicitly cancelled. I watched it do that in a test.'
			},
			{
				type: 'paragraph',
				text: 'There was no fixing the predicate where it sat. The only reliable answer to whether something was cancelled on purpose is the `AbortSignal` itself, and a generic helper that receives a callback and an error never has the signal in scope. So retry came out completely. In userland the same loop is five lines and the signal is right there.'
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
			{ type: 'heading', level: 2, text: 'Reading ofetch' },
			{
				type: 'paragraph',
				text: 'Once the design settled I cloned `ofetch` and read all 800 lines of it. It has been in the same problem space for years and has already met edge cases I had not reached.'
			},
			{
				type: 'list',
				items: [
					"Took: trimming the library's own frames off thrown stack traces. One line, and every error points at the caller instead of at air's internals.",
					'Took: accepting a `URL` object as a request target. Native `fetch` does, and my signature had been narrower than the thing it wraps.',
					'Refused: lifecycle hooks. In a real implementation they cost a context object threaded through four optional slots.',
					'Refused: quietly `JSON.stringify`-ing nested query values. The `Query` type rejects them at compile time, so passing a `Date` is an error you see immediately rather than a locale-dependent string you find in production.'
				]
			},
			{ type: 'heading', level: 2, text: 'Shipping was its own project' },
			{
				type: 'paragraph',
				text: 'The last stretch had nothing to do with HTTP. `dist/` was gitignored while `files` pointed at it, so publishing from a clean checkout would have shipped a package with no code in it. I caught that running `npm publish --dry-run` in a fresh clone. The name `air` was taken on npm, so it went out as `@korastd/air`. And npm had removed the 2FA-bypass tokens CI used to rely on, so the release workflow authenticates through OIDC trusted publishing instead, with no stored credential.'
			},
			{
				type: 'paragraph',
				text: 'Then GitHub Actions had a major outage on release day, the first publish went out manually behind a passkey, and the registry took 144 seconds to propagate metadata while the package page was already rendering.'
			},
			{
				type: 'paragraph',
				text: 'What is left is 70 tests, seven modules, and a contributing guide recording why each removal happened, including one change I made, tested and reverted inside an hour when a new test proved it wrong. A missing feature leaves no trace in the code. Without that file I would eventually put all of it back.'
			}
		]
	},
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
		// azul: el framework extraído de servicios Go, frío y estructural
		accent: '#3b82f6',
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
	},
	{
		slug: 'migrating-vue-to-svelte-progressively',
		title: 'Migrating a Vue codebase to Svelte, one route at a time',
		description:
			'Moving a production platform from Vue to Svelte without a feature freeze or a long-lived branch, and what the framework switch actually costs a team.',
		date: '2026-01-20',
		tags: ['Svelte', 'Vue', 'Frontend'],
		// Svelte: es el destino de la migración
		accent: '#ff3e00',
		content: [
			{
				type: 'paragraph',
				text: 'Any proposal that opens with "we stop shipping features for a quarter" gets rejected, and it should. So the migration had to be a sequence of changes that each ship on their own.'
			},
			{ type: 'heading', level: 2, text: 'Route-level boundaries' },
			{
				type: 'paragraph',
				text: 'We move a route at a time, not a component at a time. A route already has a clean contract with the rest of the app: a URL, some query params, whatever lives in the shared store. Components have no such boundary, so going component by component turns the whole thing into an interop problem.'
			},
			{
				type: 'paragraph',
				text: 'Each migrated route deploys on its own. If one regresses, the rollback is that route.'
			},
			{ type: 'heading', level: 3, text: 'Keeping the design system in one place' },
			{
				type: 'paragraph',
				text: 'The component library is the hard dependency. Two implementations means two sources of truth for every button state, and they drift. So the design decisions moved down into tokens that neither framework owns.'
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Tokens are framework-agnostic, so both implementations
   render the same button without sharing code. */
:root {
	--control-height: 2.25rem;
	--control-radius: 0.5rem;
	--control-padding-inline: 0.875rem;
	--control-bg: var(--primary);
	--control-fg: var(--primary-foreground);
}`
			},
			{
				type: 'paragraph',
				text: 'With tokens in place the Vue button and the Svelte button are thin wrappers over the same values, and a visual change is a token change reviewed once.'
			},
			{ type: 'heading', level: 2, text: 'What transfers and what does not' },
			{
				type: 'list',
				items: [
					'Reactivity intuition transfers almost completely. Runes and the Composition API are the same mental model with different syntax.',
					"Store patterns only half transfer. Anything built around Vue's plugin injection has to be rethought rather than ported.",
					'Build tooling is a non-issue, since both sit on Vite.',
					'Team habits are the slow part, and they set the real timeline.'
				]
			},
			{ type: 'heading', level: 2, text: 'Where it stands' },
			{
				type: 'paragraph',
				text: 'Several routes are live in Svelte, both frameworks read the same token layer, and the team ships at the same cadence as before. There was no freeze and no long-lived branch, and there will not be a launch day either.'
			}
		]
	}
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
