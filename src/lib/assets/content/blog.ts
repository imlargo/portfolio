import type { Post, PostBlock, PostSummary } from './types';

const posts: Post[] = [
	{
		slug: 'building-air-from-empty-repo-to-npm',
		title: 'Building air, from an empty repo to a published package',
		description:
			'I wrote a 300-line fetch wrapper and published it to npm. Most of the work happened after it already worked: three bugs the test suite could not see, and two features I removed instead of fixing.',
		date: '2026-08-06',
		tags: ['TypeScript', 'Open Source', 'API Design'],
		content: [
			{
				type: 'paragraph',
				text: 'Every project I work on eventually grows the same file. Something called `api.ts` or `http.ts` that wraps `fetch`, parses the response, throws when the status is not 2xx, joins a base URL, and serializes a body. None of that is difficult, and I had rewritten it from scratch every time because copying it over felt worse than retyping it.'
			},
			{
				type: 'paragraph',
				text: 'So I wrote it once properly. The result is air: around 300 lines, zero runtime dependencies, roughly 2 kB over the wire. That part took an afternoon. The weeks after it worked are where everything interesting happened.'
			},
			{ type: 'heading', level: 2, text: 'Writing the constraints down first' },
			{
				type: 'paragraph',
				text: 'Before any code I put the philosophy in the repo as its own document, with an explicit list of things the library is not allowed to become: no interceptor chains, no plugin system, no caching layer, no Node-specific escape hatches that break in a browser.'
			},
			{
				type: 'paragraph',
				text: 'That is a lot of ceremony for a 300-line package and I still think it earned its place. Pressure to add features does not come from users on day one. It comes from me at 11 p.m. thinking a small option would be convenient. Once the rule is written down I have to argue with it before I can break it.'
			},
			{ type: 'heading', level: 2, text: 'One decision shaped the API' },
			{
				type: 'paragraph',
				text: 'air had to work two ways: as a direct wrapper you call with `air.get(url)`, and as a factory that produces configured clients with `air.create({ baseURL })`. Implement that the obvious way and you get two code paths, a default instance and a constructor, which drift as options get added to one and forgotten in the other.'
			},
			{
				type: 'paragraph',
				text: 'The fix was to stop treating the root export as special. `air` is a client created with empty defaults. There is one implementation, so there is nothing to keep in sync.'
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
				text: 'The rest fell into seven flat files: `url`, `body`, `parse`, `error`, `client`, `types`, `index`. None of them is longer than about a hundred lines. No directory tree, no barrel files.'
			},
			{ type: 'heading', level: 2, text: 'Three bugs the tests could not see' },
			{
				type: 'paragraph',
				text: 'The first version passed everything I had written for it. It was still wrong in three places, and the suite could not have caught any of them, because it imported the source and mocked `fetch`, which is where the bugs actually were.'
			},
			{
				type: 'paragraph',
				text: "The worst one was `timeout`. I implemented it the obvious way: an `AbortController`, a timer that aborts it, the caller's own signal forwarded in, and a `finally` that cleans both up when the request finishes. But `fetch()` resolves when the headers arrive, not when the body has been read, so that cleanup disarmed the timer right as the download started. Pointed at an endpoint that trickles its body over ten seconds, with a 500 ms timeout and an explicit abort fired at 50 ms, the request hung forever."
			},
			{
				type: 'paragraph',
				text: "The second was `isAirError`, which used `instanceof`. An application can end up with two copies of a package loaded, either two versions in the tree or a bundled copy beside a resolved one, and each copy brings its own class, so `instanceof` returns false across them. It now checks a `Symbol.for('air.error')` brand, since the symbol registry is global and every copy agrees on it."
			},
			{
				type: 'paragraph',
				text: "The third was a dead end rather than a bug. Auto-parsing responses is convenient until you need a header: `Link` for pagination, `ETag` for caching, anything about rate limits. There was no way to reach the `Response` on a successful call. A rule like 'less is better' will justify any omission you like, and the cost of what you left out never shows up in the issue tracker."
			},
			{ type: 'heading', level: 2, text: 'Deleting features instead of fixing them' },
			{
				type: 'paragraph',
				text: "The fix for the timeout bug was to remove the option. `AbortSignal.timeout(ms)` is native, `AbortSignal.any([...])` composes it with the caller's own signal, and air now forwards `signal` straight to `fetch`. There is no bridge left to tear down."
			},
			{
				type: 'paragraph',
				text: 'That went well enough that I did the same to `retry` and pulled it into a standalone helper. The helper had a bug of its own. A retry loop needs to tell a transient failure apart from a request the caller cancelled deliberately, and mine did it by checking the error\'s `name` for `AbortError`. That holds until someone calls `controller.abort(new Error("user navigated away"))`. Now the name is `Error`, the check says transient, and it makes three attempts at a request that was explicitly cancelled. I measured it doing exactly that.'
			},
			{
				type: 'paragraph',
				text: 'The predicate could not be fixed where it was. The reliable source of truth for whether something was cancelled on purpose is the `AbortSignal`, and a generic helper that receives a callback and an error never has the signal in scope. I had moved the decision out of the library and left the information it needed behind. Retry came out completely. Written in userland the same loop is five lines and the signal is right there.'
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
				text: 'Once the design settled I cloned `ofetch` and read all 800 lines of it. A mature library in the same problem space has already met the edge cases I had not reached yet, and its choices tell you something whether you agree with them or not.'
			},
			{
				type: 'list',
				items: [
					"Took: trimming the library's own frames from thrown stack traces, so an error points at the caller instead of at internals. One line, and every error the library throws gets quieter.",
					'Took: accepting a `URL` object as a request target. Native `fetch` already does, and my signature was narrower than the thing it wraps for no reason I could defend.',
					'Refused: lifecycle hooks. Seeing what they cost in a real implementation, a context object threaded through four optional slots, settled the question.',
					'Refused: silently `JSON.stringify`-ing nested query values. My `Query` type rejects them at compile time, so a `Date` is an error you see immediately instead of a locale-dependent string you find in production.'
				]
			},
			{ type: 'heading', level: 2, text: 'Shipping was its own project' },
			{
				type: 'paragraph',
				text: 'The last stretch had nothing to do with HTTP. `dist/` was gitignored while `files` pointed at it, so publishing from a clean checkout would have shipped a package with no code in it. I caught that by running `npm publish --dry-run` in a fresh clone instead of trusting the config. The name `air` was already taken on npm, so it went out scoped. npm had removed the 2FA-bypass tokens CI used to rely on, so the release workflow authenticates through OIDC trusted publishing, with no stored credential at all.'
			},
			{
				type: 'paragraph',
				text: 'Then GitHub Actions had a major outage on release day, the first publish went out manually behind a passkey, and the registry took 144 seconds to propagate metadata while the package page was already rendering.'
			},
			{
				type: 'paragraph',
				text: 'What is left is 70 tests, seven modules, and a contributing guide that records why each removal happened, including one change I made, tested, and reverted within the hour when a new test proved it wrong. A missing feature leaves no trace in the code, so without that file the next person to read it, probably me, would put it back.'
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
		featured: true,
		content: [
			{
				type: 'paragraph',
				text: 'Pegaso started as a personal annoyance. Every semester, thousands of students at Universidad Nacional de Colombia opened a dozen browser tabs to reconcile course times by hand. I wrote a scheduler that did it in one pass, deployed it on the cheapest infrastructure I could find, and shared the link in a couple of group chats.'
			},
			{
				type: 'paragraph',
				text: 'Within three weeks it had 6,200 active users, all organic. No marketing, no institutional endorsement, just a link that kept getting forwarded.'
			},
			{ type: 'heading', level: 2, text: 'The traffic shape' },
			{
				type: 'paragraph',
				text: 'Academic tooling has a brutal traffic curve. For most of the semester the service sits nearly idle. Then registration opens and every student in the faculty arrives inside the same 90 minutes. Average load tells you nothing; the peak is the only number worth designing for.'
			},
			{
				type: 'paragraph',
				text: 'That drove most of the architecture. Autoscaling reacts too slowly to help at that granularity, so I optimized for making the peak cheap to serve.'
			},
			{ type: 'heading', level: 3, text: 'Precomputing the expensive path' },
			{
				type: 'paragraph',
				text: 'The course catalog changes a handful of times per semester and is identical for every user. Schedule permutation is per-user and combinatorial. Splitting those two lifetimes was the whole optimization: the catalog is materialized into an immutable snapshot on ingest, and the solver runs against an in-memory view of it.'
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
				text: 'During the registration spike, requests never hit Postgres for catalog reads. The database handles writes and the occasional saved schedule. That turns a scaling problem into a memory allocation problem, and memory is cheaper than connections.'
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
				text: 'None of that was hard to fix once I could see it. I just could not have found any of it without real traffic on the thing.'
			},
			{ type: 'heading', level: 2, text: 'Afterwards' },
			{
				type: 'paragraph',
				text: "The university's own platform, released the following year, adopted the core interaction model Pegaso had converged on. That eventually led to formal acquisition discussions. I had not planned for any of it. I wanted my own schedule to stop taking an afternoon."
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
		content: [
			{
				type: 'paragraph',
				text: 'Most frameworks get written in the wrong order. Someone imagines the applications people will build, designs abstractions for them, and finds out later that the abstractions were guesses.'
			},
			{
				type: 'paragraph',
				text: 'Medusa went the other way around. By the time I wrote the first line of it I had shipped four production Go services for different clients in different industries. They shared no code, but reading them side by side they had the same skeleton.'
			},
			{ type: 'heading', level: 2, text: 'Repetition across codebases' },
			{
				type: 'paragraph',
				text: 'What made it worth extracting was that the similarity happened without coordination. Four codebases written months apart under different constraints had landed on the same boundary between transport, use case, and persistence. That is better evidence than my own preference.'
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
				text: 'Extraction on its own proves nothing, so every abstraction had to make a round trip: pull it out, then deploy it back into the systems it came from. If moving a service onto the framework version made that service worse, the abstraction was wrong and got deleted.'
			},
			{
				type: 'list',
				ordered: true,
				items: [
					'Identify a pattern that appears in at least three of the four services.',
					'Extract the smallest version of it that covers all three call sites.',
					'Migrate one service to it and measure the diff in real code, not in principle.',
					'If the migration adds indirection without removing decisions, discard it.'
				]
			},
			{
				type: 'paragraph',
				text: 'Step four killed more candidates than the rest combined. Configurable middleware chains, a generic repository layer, a pluggable event bus: all fine in isolation, all of them made the calling code harder to read.'
			},
			{ type: 'heading', level: 2, text: 'Where it landed' },
			{
				type: 'paragraph',
				text: 'The result is smaller than what I would have designed on a whiteboard, and every piece of it has a production system behind it. When someone asks why a boundary sits where it does, the answer is that four codebases put it there before I did.'
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
		content: [
			{
				type: 'paragraph',
				text: 'The proposal that gets rejected, correctly, is the one that opens with "we stop shipping features for a quarter." No business takes that trade. So the migration had to be a sequence of changes that each ship on their own.'
			},
			{ type: 'heading', level: 2, text: 'Route-level boundaries' },
			{
				type: 'paragraph',
				text: 'The unit of migration is the route, not the component. A route already has a clean contract with the rest of the app: a URL, some query params, and whatever lives in the shared store. Components do not, which is why going component by component turns into an interop problem.'
			},
			{
				type: 'paragraph',
				text: 'Each migrated route deploys on its own. If one regresses, the rollback is that route.'
			},
			{ type: 'heading', level: 3, text: 'Keeping the design system in one place' },
			{
				type: 'paragraph',
				text: 'The component library is the hard dependency. Two implementations means two sources of truth for every button state, and they will drift. I pushed the design decisions down into tokens that neither framework owns.'
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
				text: 'With tokens in place, the Vue button and the Svelte button are thin wrappers over the same values. A visual change is a token change, reviewed once.'
			},
			{ type: 'heading', level: 2, text: 'What transfers and what does not' },
			{
				type: 'list',
				items: [
					'Reactivity intuition transfers almost completely. Runes and the Composition API are the same mental model with different syntax.',
					'Store patterns transfer partially. Anything built around Vue plugin injection needs rethinking rather than porting.',
					'Build tooling transfers cleanly, since both sit on Vite.',
					'Team habits transfer slowest, and they set the actual timeline.'
				]
			},
			{ type: 'heading', level: 2, text: 'Where it stands' },
			{
				type: 'paragraph',
				text: 'Several routes are live in Svelte, the token layer is shared by both frameworks, and the team ships at the same cadence as before. There was no freeze and no long-lived branch, and there will not be a launch day.'
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
