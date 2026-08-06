import type { Post, PostBlock, PostSummary } from './types';

const posts: Post[] = [
	{
		slug: 'scaling-pegaso-to-6200-users',
		title: 'Scaling Pegaso to 6,200 users without a budget',
		description:
			'A course scheduling platform for my university went from a weekend project to campus infrastructure. Here is what broke, what held, and what I would build differently.',
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
				text: 'Within three weeks it had **6,200 active users**, entirely through organic adoption. No marketing, no institutional endorsement. Just a link that kept getting forwarded.'
			},
			{ type: 'heading', level: 2, text: 'The traffic shape nobody warns you about' },
			{
				type: 'paragraph',
				text: 'Academic tooling has the worst traffic curve imaginable. For 25 weeks of the semester the service is nearly idle. Then registration opens and every student in the faculty arrives within the same 90 minutes. Average load is meaningless; the only number that matters is the peak.'
			},
			{
				type: 'paragraph',
				text: 'That single fact drove almost every architectural decision. Autoscaling was too slow to help at that granularity, so the answer had to be making the peak cheap rather than making the system elastic.'
			},
			{ type: 'heading', level: 3, text: 'Precomputing the expensive path' },
			{
				type: 'paragraph',
				text: 'The course catalog changes a handful of times per semester and is identical for every user. The schedule permutation, on the other hand, is per-user and combinatorial. Separating those two lifetimes was the whole optimization: the catalog gets materialized into a single immutable snapshot on ingest, and the solver runs against an in-memory view of it.'
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
				text: 'Requests during the registration spike never hit Postgres for catalog reads. The database only handles writes and the occasional saved schedule, which turns a scaling problem into a memory allocation problem, and memory is far cheaper than connections.'
			},
			{ type: 'heading', level: 2, text: 'What actually broke' },
			{
				type: 'list',
				items: [
					'Connection pooling, first. The default pool size was tuned for a service that never sees 400 concurrent users, and it queued requests until they timed out.',
					'JSON serialization of the full catalog on every response, which I had assumed was negligible and was in fact the top entry in the CPU profile.',
					'My own assumption that users would explore one schedule at a time. They opened five tabs and compared, which tripled the request count per session.'
				]
			},
			{
				type: 'paragraph',
				text: 'None of these were interesting engineering problems. All of them were only findable under real load, which is the actual lesson: I could not have designed my way to them from a whiteboard.'
			},
			{
				type: 'quote',
				text: 'The architecture you validate under load is worth more than the architecture you reasoned about carefully.'
			},
			{ type: 'heading', level: 2, text: 'The part I did not expect' },
			{
				type: 'paragraph',
				text: "The university's own platform, released the following year, adopted the core interaction model Pegaso had converged on. That was a strange kind of validation, and it eventually led to formal acquisition discussions."
			},
			{
				type: 'paragraph',
				text: 'The takeaway I keep coming back to: shipping something small that solves a real problem end to end will teach you more about systems than any amount of architecture done in advance. The constraints find you.'
			}
		]
	},
	{
		slug: 'extracting-a-framework-instead-of-designing-one',
		title: 'Extracting a framework instead of designing one',
		description:
			'Medusa was not designed upfront. It was pulled out of four production Go services that had independently converged on the same structure, then deployed back into them.',
		date: '2026-03-02',
		tags: ['Go', 'Open Source', 'Architecture'],
		content: [
			{
				type: 'paragraph',
				text: 'Most frameworks are written in the wrong order. Someone imagines the applications people will build, designs abstractions for them, and then discovers those abstractions were guesses. The applications that arrive are never the ones that were imagined.'
			},
			{
				type: 'paragraph',
				text: 'Medusa went the other way. By the time I wrote the first line of it, I had shipped four production Go services for different clients across different industries. They had no shared code, but reading them side by side, they had the same skeleton.'
			},
			{ type: 'heading', level: 2, text: 'Convergence as evidence' },
			{
				type: 'paragraph',
				text: 'The interesting signal was not that the services looked similar. It was that they looked similar *without coordination*. Four codebases, written months apart under different constraints, had independently arrived at the same boundary between transport, use case, and persistence.'
			},
			{
				type: 'paragraph',
				text: 'That is much stronger evidence than my own taste. An abstraction that four unrelated systems reinvented is an abstraction the problem domain actually wants.'
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
				text: 'Extraction alone proves nothing, so every abstraction had to survive a round trip: pull it out, then deploy it back into the systems it came from. If migrating a service to the framework version made that service worse, the abstraction was wrong and got deleted.'
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
				text: 'Step four killed more candidates than the other three combined. Configurable middleware chains, a generic repository layer, and a pluggable event bus all looked elegant in isolation and all made the calling code harder to read.'
			},
			{
				type: 'quote',
				text: 'An abstraction earns its place by removing decisions, not by adding options.'
			},
			{ type: 'heading', level: 2, text: 'What the constraint bought' },
			{
				type: 'paragraph',
				text: 'The result is smaller than what I would have designed on a whiteboard, and every piece of it has a production system behind it. When someone asks why a boundary sits where it does, the answer is never aesthetic. It is that four codebases put it there before I did.'
			}
		]
	},
	{
		slug: 'migrating-vue-to-svelte-progressively',
		title: 'Migrating a Vue codebase to Svelte, one route at a time',
		description:
			'A rewrite you cannot ship is a rewrite you cannot finish. How I am moving a production platform from Vue to Svelte without a freeze, a branch, or a big-bang launch.',
		date: '2026-01-20',
		tags: ['Svelte', 'Vue', 'Frontend'],
		content: [
			{
				type: 'paragraph',
				text: 'The proposal that gets rejected, correctly, is the one that starts with "we stop shipping features for a quarter." No business accepts that trade, and they are right not to. A migration has to be a sequence of changes that each stand on their own.'
			},
			{ type: 'heading', level: 2, text: 'Route-level boundaries' },
			{
				type: 'paragraph',
				text: 'The unit of migration is the route, not the component. Routes already have a clean contract with the rest of the app: a URL, a set of query params, and whatever lives in the shared store. Components do not, which is why component-by-component migrations turn into interop nightmares.'
			},
			{
				type: 'paragraph',
				text: 'Each migrated route is deployed independently. If a route regresses, the rollback is that route, not the application.'
			},
			{ type: 'heading', level: 3, text: 'Keeping the design system in one place' },
			{
				type: 'paragraph',
				text: 'The hard dependency is the component library. Two parallel implementations means two sources of truth for every button state, and drift is guaranteed. The fix was to push the design decisions down into tokens that neither framework owns.'
			},
			{
				type: 'code',
				language: 'css',
				code: `/* Tokens are framework-agnostic, so both implementations
   render the same button without sharing a line of code. */
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
				text: 'With tokens in place, a Vue button and a Svelte button are two thin wrappers over the same visual contract. Divergence becomes a token change, reviewed once, applied everywhere.'
			},
			{ type: 'heading', level: 2, text: 'What transfers and what does not' },
			{
				type: 'list',
				items: [
					'Reactivity intuition transfers almost completely. Runes and the Composition API are the same mental model with different syntax.',
					'Store patterns transfer partially. Anything built around Vue plugin injection needs rethinking rather than porting.',
					'Build tooling transfers cleanly, since both sit on Vite.',
					'Team habits transfer the slowest, and that is the real timeline driver.'
				]
			},
			{
				type: 'quote',
				text: 'A migration is a people problem wearing a technical costume. The code is the easy half.'
			},
			{ type: 'heading', level: 2, text: 'Where it stands' },
			{
				type: 'paragraph',
				text: 'Several routes are live in Svelte, the shared token layer is the single source of truth for both frameworks, and the team ships features on the same cadence as before. No freeze, no long-lived branch, no launch day. The migration is just part of ordinary work now, which is exactly the outcome I wanted.'
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
