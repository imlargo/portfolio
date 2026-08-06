<script lang="ts">
	import { content } from '$lib/assets/content/content';
	import Cta from '$lib/components/common/Cta.svelte';
	import PostContent from '$lib/components/blog/PostContent.svelte';
	import PostMeta from '$lib/components/blog/PostMeta.svelte';
	import TableOfContents from '$lib/components/blog/TableOfContents.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { ArrowLeft, ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} — {content.name}</title>
	<meta name="description" content={post.description} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="article:published_time" content={post.date} />
</svelte:head>

<div class="reading-progress" aria-hidden="true"></div>

<article class="max-w-wx flex w-full flex-col gap-y-12 pt-8">
	<div class="flex flex-col gap-y-8">
		<a
			href="/blog"
			class="flex max-w-max items-center gap-x-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeft class="size-4" />
			<span>All posts</span>
		</a>

		<div class="flex flex-col gap-y-6">
			<div class="flex flex-col gap-y-4">
				<PostMeta date={post.date} readingTime={data.readingTime} />

				<h1
					class="max-w-4xl scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl"
				>
					{post.title}
				</h1>

				<p class="ty-lead max-w-prose text-pretty">{post.description}</p>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag (tag)}
					<Badge variant="outline" class="py-1 font-normal text-muted-foreground">{tag}</Badge>
				{/each}
			</div>
		</div>
	</div>

	<Separator />

	<div class="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,44rem)_minmax(0,1fr)]">
		<PostContent content={post.content} />

		<aside class="hidden lg:block">
			<div class="lg:sticky lg:top-12">
				<TableOfContents content={post.content} />
			</div>
		</aside>
	</div>

	<Separator />

	<footer class="flex flex-col gap-y-8">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<span class="text-muted-foreground">Written by {content.name}</span>

			<Button
				variant="link"
				class="px-0 text-muted-foreground"
				href={content.socials?.linkedin}
				target="_blank"
			>
				<span>Let's talk about it</span>
				<ArrowUpRight class="size-4" />
			</Button>
		</div>

		{#if data.previous || data.next}
			<nav class="grid gap-4 lg:grid-cols-2">
				{#if data.previous}
					<a
						href="/blog/{data.previous.slug}"
						class="group flex flex-col gap-y-2 rounded-lg border bg-card/50 p-6 transition-colors hover:bg-card"
					>
						<span
							class="flex items-center gap-x-2 font-mono text-xs tracking-wider text-muted-foreground uppercase"
						>
							<ArrowLeft class="size-3 transition-transform group-hover:-translate-x-1" />
							Newer
						</span>
						<span class="font-semibold text-pretty">{data.previous.title}</span>
					</a>
				{:else}
					<span class="hidden lg:block"></span>
				{/if}

				{#if data.next}
					<a
						href="/blog/{data.next.slug}"
						class="group flex flex-col items-end gap-y-2 rounded-lg border bg-card/50 p-6 text-right transition-colors hover:bg-card"
					>
						<span
							class="flex items-center gap-x-2 font-mono text-xs tracking-wider text-muted-foreground uppercase"
						>
							Older
							<ArrowRight class="size-3 transition-transform group-hover:translate-x-1" />
						</span>
						<span class="font-semibold text-pretty">{data.next.title}</span>
					</a>
				{/if}
			</nav>
		{/if}
	</footer>
</article>

<Cta />

<style>
	@supports (animation-timeline: scroll()) {
		@keyframes reading-progress {
			from {
				transform: scaleX(0);
			}
			to {
				transform: scaleX(1);
			}
		}

		.reading-progress {
			position: fixed;
			inset: 0 0 auto 0;
			z-index: 60;
			height: 2px;
			transform-origin: 0 50%;
			background: linear-gradient(90deg, rgba(152, 16, 250, 0.6), rgba(218, 178, 255, 0.9));
			animation: reading-progress linear both;
			animation-timeline: scroll();
		}
	}
</style>
