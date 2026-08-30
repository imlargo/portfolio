<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { SiteCta } from '$lib/components/sections';
	import FeaturedPost from './FeaturedPost.svelte';
	import PostRow from './PostRow.svelte';
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button';
	import { siteContent } from '$lib/content/site-content';
	import type { PostSummary } from '$lib/content/types';
	import { useReveal } from '$lib/attachments/reveal';
	import { useSplitTitle } from '$lib/attachments/split-title';
	import { cn } from '$lib/utils';
	import { CircleAlert } from '@lucide/svelte';

	const { posts, tags }: { posts: PostSummary[]; tags: string[] } = $props();

	const { title, description } = siteContent.blog;

	let activeTag = $state<string | null>(null);

	const featured = $derived(posts[0]);

	// Sin filtro, el destacado ya está arriba y no se repite en la lista. Con
	// filtro se busca sobre el total, porque el destacado también puede llevarlo.
	const visible = $derived(
		activeTag ? posts.filter((p) => p.tags.includes(activeTag!)) : posts.slice(1)
	);

	function toggle(tag: string) {
		activeTag = activeTag === tag ? null : tag;
	}
</script>

<Section.Root spacing="hero">
	<div class="flex flex-col gap-y-3">
		<h1 class="ty-h1 font-mono" {@attach useSplitTitle()}>{title}</h1>
		<p class="ty-lead max-w-prose text-pretty" {@attach useReveal({ delay: 0.25 })}>
			{description}
		</p>
	</div>

	{#if posts.length === 0}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<CircleAlert />
				</Empty.Media>
				<Empty.Title>Nothing published yet</Empty.Title>
				<Empty.Description>
					I'm writing the first posts. Check back soon for updates.
				</Empty.Description>
			</Empty.Header>
		</Empty.Root>
	{:else}
		{#if !activeTag}
			<FeaturedPost post={featured} />
		{/if}

		<div class="flex flex-col gap-y-8">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<span class="text-muted-foreground">
					{#if activeTag}
						{visible.length}
						{visible.length === 1 ? 'post' : 'posts'} tagged
						<span class="font-medium text-foreground">{activeTag}</span>
					{:else}
						All posts
					{/if}
				</span>

				<div class="flex flex-wrap gap-2">
					{#each tags as tag (tag)}
						<button
							type="button"
							onclick={() => toggle(tag)}
							aria-pressed={activeTag === tag}
							class={cn(
								'rounded-lg border px-3 py-1 font-mono text-xs transition-colors',
								activeTag === tag
									? 'border-transparent bg-primary text-primary-foreground'
									: 'border-foreground/25 text-muted-foreground hover:border-foreground/45 hover:text-foreground'
							)}
						>
							{tag}
						</button>
					{/each}
				</div>
			</div>

			{#if visible.length === 0}
				<p class="py-8 text-muted-foreground">No posts under this tag yet.</p>
			{:else}
				<div
					class="flex flex-col divide-y border-y"
					{@attach useReveal({ targets: '.post-row', stagger: 0.08 })}
				>
					{#each visible as post (post.slug)}
						<PostRow {post} />
					{/each}
				</div>
			{/if}

			{#if activeTag}
				<Button
					variant="link"
					class="max-w-max px-0 text-muted-foreground"
					onclick={() => (activeTag = null)}
				>
					Clear filter
				</Button>
			{/if}
		</div>
	{/if}
</Section.Root>

<SiteCta />
