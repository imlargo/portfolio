<script lang="ts">
	import type { PostSummary } from '$lib/content/types';
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
	class="featured group relative flex flex-col justify-between gap-y-12 overflow-hidden rounded-4xl border bg-muted/40 p-6 transition-colors duration-500 hover:bg-muted/60 md:p-10"
>
	<div class="relative flex flex-col gap-y-4">
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
			<Badge variant="secondary" class="font-mono tracking-[var(--tracking-mono)] uppercase">
				Latest
			</Badge>
			<PostMeta date={post.date} readingTime={post.readingTime} />
		</div>

		<h3 class="relative max-w-2xl text-3xl tracking-tight text-balance lg:text-4xl">
			{post.title}
		</h3>

		<p class="max-w-prose text-pretty text-muted-foreground">
			{post.description}
		</p>
	</div>

	<div class="relative flex flex-wrap items-center justify-between gap-4">
		<div class="flex flex-wrap gap-2">
			{#each post.tags as tag (tag)}
				<Badge variant="outline" class="font-mono font-normal text-muted-foreground">{tag}</Badge>
			{/each}
		</div>

		<span class="flex items-center gap-x-2 text-sm font-medium">
			<span>Read post</span>
			<ArrowRight
				class="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
			/>
		</span>
	</div>
</a>

<style>
	/* Mismo halo de la tarjeta de proyecto, un poco más grande porque la pieza
	   lo es: el color sale del token de marca, no de un morado suelto, así que
	   los dos se mueven juntos si alguna vez cambia el acento. */
	.featured::before,
	.featured::after {
		content: '';
		position: absolute;
		top: -35%;
		right: -10%;
		aspect-ratio: 1 / 1;
		height: 140%;
		border-radius: 50%;
	}

	.featured::before {
		filter: blur(60px);
		background: color-mix(in oklab, var(--color-brand) 20%, transparent);
		transition: background 0.5s var(--ease-out-expo);
	}

	.featured:hover::before {
		background: color-mix(in oklab, var(--color-brand) 32%, transparent);
	}

	.featured::after {
		background-image: url('/assets/noise.webp');
		background-size: 30%;
		mix-blend-mode: overlay;
		opacity: 0.6;
		mask-image: radial-gradient(#fff, transparent 75%);
	}
</style>
