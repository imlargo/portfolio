<script lang="ts">
	import { content } from '$lib/assets/content/content';
	import Cta from '$lib/components/common/Cta.svelte';
	import * as Section from '$lib/components/kit/section';
	import FeaturedPost from '$lib/components/blog/FeaturedPost.svelte';
	import PostRow from '$lib/components/blog/PostRow.svelte';
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';
	import { CircleAlert } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let activeTag = $state<string | null>(null);

	const featured = $derived(data.posts[0]);

	const visible = $derived.by(() => {
		const tag = activeTag;
		if (!tag) return data.posts.slice(1);

		return data.posts.filter((post) => post.tags.includes(tag));
	});

	function toggle(tag: string) {
		activeTag = activeTag === tag ? null : tag;
	}
</script>

<svelte:head>
	<title>{content.blog.title} | {content.name}</title>
	<meta name="description" content={content.blog.description} />
</svelte:head>

<Section.Root class="max-w-wx pt-8">
	<Section.Header>
		<h1 class="ty-h1 font-mono">{content.blog.title}</h1>
		<Section.Description>{content.blog.description}</Section.Description>
	</Section.Header>

	{#if data.posts.length === 0}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<CircleAlert />
				</Empty.Media>
				<Empty.Title>Nothing published yet</Empty.Title>
				<Empty.Description>
					I'm writing the first posts. Check back soon for updates!
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
					{#each data.tags as tag (tag)}
						<button
							type="button"
							onclick={() => toggle(tag)}
							aria-pressed={activeTag === tag}
							class={cn(
								'rounded-full border px-3 py-1 font-mono text-xs transition-colors',
								activeTag === tag
									? 'border-transparent bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
				<div class="flex flex-col divide-y border-y">
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

<Cta />
