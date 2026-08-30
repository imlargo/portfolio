<script lang="ts">
	import type { PostSummary } from '$lib/assets/content/types';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { ArrowRight } from '@lucide/svelte';
	import PostMeta from './PostMeta.svelte';

	type Props = {
		post: PostSummary;
	};

	const { post }: Props = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="featured group flex flex-col justify-between gap-y-12 rounded-xl border bg-card/50 p-6 lg:p-10"
>
	<div class="flex flex-col gap-y-4">
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
			<Badge variant="secondary" class="font-mono text-[0.65rem] tracking-wider uppercase">
				Latest
			</Badge>
			<PostMeta date={post.date} readingTime={post.readingTime} />
		</div>

		<h3 class="max-w-2xl text-3xl font-bold tracking-tight text-balance lg:text-4xl">
			{post.title}
		</h3>

		<p class="max-w-prose text-pretty text-muted-foreground">
			{post.description}
		</p>
	</div>

	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex flex-wrap gap-2">
			{#each post.tags as tag (tag)}
				<Badge variant="outline" class="py-1 font-normal text-muted-foreground">{tag}</Badge>
			{/each}
		</div>

		<span class="flex items-center gap-x-2 text-sm font-medium">
			<span>Read post</span>
			<ArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
		</span>
	</div>
</a>

<style>
	.featured {
		overflow: hidden;
		position: relative;
		transition: all 0.3s ease;

		--top: -35%;
		--right: -10%;

		&:hover {
			&::before {
				background: rgba(179, 86, 255, 0.3);
			}
		}

		&::before {
			content: '';
			position: absolute;
			top: var(--top);
			right: var(--right);
			aspect-ratio: 1/1;
			height: 140%;
			width: auto;
			z-index: -7;
			border-radius: 999%;
			filter: blur(60px);

			background: rgba(179, 86, 255, 0.2);
			transition: all 0.3s ease;
		}

		&::after {
			content: '';
			position: absolute;
			top: var(--top);
			right: var(--right);
			aspect-ratio: 1/1;
			height: 140%;
			width: auto;
			border-radius: 999%;

			background-image: url('/assets/noise.webp');
			background-size: 30%;
			mix-blend-mode: overlay;
			opacity: 0.6;
			z-index: -1;

			mask-image: radial-gradient(#fff, transparent 75%);
		}
	}
</style>
