<script lang="ts">
	import { Seo } from '$lib/components/seo';
	import { SiteCta } from '$lib/components/sections';
	import * as Section from '$lib/components/layout/section';
	import { PostContent, PostMeta, TableOfContents } from '$lib/features/blog/components';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { ArrowLeft, ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const post = $derived(data.post);
</script>

<Seo title={post.title} description={post.description} type="article" />

<svelte:head>
	<meta property="article:published_time" content={post.date} />
</svelte:head>

<div class="reading-progress" aria-hidden="true"></div>

<Section.Root spacing="hero">
	<article class="flex w-full flex-col gap-y-12">
		<div class="flex flex-col gap-y-8" {@attach useReveal()}>
			<a
				href="/blog"
				class="link-underline flex max-w-max items-center gap-x-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft class="size-4" />
				<span>All posts</span>
			</a>

			<div class="flex flex-col gap-y-6">
				<div class="flex flex-col gap-y-4">
					<PostMeta date={post.date} readingTime={data.readingTime} />

					<h1 class="ty-h1 max-w-4xl">{post.title}</h1>

					<p class="ty-lead max-w-prose text-pretty">{post.description}</p>
				</div>

				<p class="flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted-foreground">
					{#each post.tags as tag, i (tag)}
						{#if i > 0}<span class="text-muted-foreground/40" aria-hidden="true">·</span>{/if}
						<span>{tag}</span>
					{/each}
				</p>
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
				<span class="text-muted-foreground">Written by {siteContent.name}</span>

				<Button
					variant="link"
					class="px-0 text-muted-foreground"
					href={siteContent.socials.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>Get in touch</span>
					<ArrowUpRight class="size-4" />
				</Button>
			</div>

			{#if data.previous || data.next}
				<!-- Dos columnas separadas por un filete, no dos tarjetas: son la
				     continuación del índice, y una caja las convertiría en piezas
				     sueltas. -->
				<nav class="grid gap-x-8 gap-y-8 border-t pt-8 sm:grid-cols-2" aria-label="More posts">
					{#if data.previous}
						<a href="/blog/{data.previous.slug}" class="group/nav flex flex-col gap-y-2">
							<span class="flex items-center gap-x-2 font-mono text-sm text-muted-foreground">
								<ArrowLeft
									class="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/nav:-translate-x-1"
								/>
								Newer
							</span>
							<span
								class="text-pretty transition-colors duration-500 group-hover/nav:text-foreground/70"
							>
								{data.previous.title}
							</span>
						</a>
					{:else}
						<span class="hidden sm:block"></span>
					{/if}

					{#if data.next}
						<a
							href="/blog/{data.next.slug}"
							class="group/nav flex flex-col items-start gap-y-2 sm:items-end sm:text-right"
						>
							<span class="flex items-center gap-x-2 font-mono text-sm text-muted-foreground">
								Older
								<ArrowRight
									class="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/nav:translate-x-1"
								/>
							</span>
							<span
								class="text-pretty transition-colors duration-500 group-hover/nav:text-foreground/70"
							>
								{data.next.title}
							</span>
						</a>
					{/if}
				</nav>
			{/if}
		</footer>
	</article>
</Section.Root>

<SiteCta />

<style>
	/* La barra de progreso va atada al scroll con `animation-timeline`, sin
	   listener ni estado: el navegador la mueve solo. El `@supports` la deja
	   fuera donde no exista, que es exactamente donde un fallback en JS costaría
	   más de lo que aporta. */
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
			background: linear-gradient(
				90deg,
				color-mix(in oklab, var(--color-brand) 60%, transparent),
				var(--color-brand)
			);
			animation: reading-progress linear both;
			animation-timeline: scroll();
		}
	}
</style>
