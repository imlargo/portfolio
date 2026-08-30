<script lang="ts">
	import { SiteCta } from '$lib/components/sections';
	import PostCard from './PostCard.svelte';
	import { siteContent } from '$lib/content/site-content';
	import type { PostSummary } from '$lib/content/types';
	import { useReveal } from '$lib/attachments/reveal';
	import { prefersReducedMotion } from '$lib/gsap';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { cn } from '$lib/utils';

	const { posts, tags }: { posts: PostSummary[]; tags: string[] } = $props();

	const { eyebrow, title, titleAccent } = siteContent.blog;

	let activeTag = $state<string | null>(null);

	const visible = $derived(
		activeTag ? posts.filter((post) => post.tags.includes(activeTag!)) : posts
	);

	// Sin filtro, las dos entradas más recientes encabezan a mayor escala y el
	// resto va debajo. Con filtro no hay "más recientes" que destacar: se muestra
	// una sola retícula pareja, porque el criterio pasó a ser el tag.
	const featured = $derived(activeTag ? [] : visible.slice(0, 2));
	const rest = $derived(activeTag ? visible : visible.slice(2));

	const motion = $derived(prefersReducedMotion() ? 0 : 1);
</script>

<section class="px-layout py-hero flex w-full flex-col items-center">
	<div class="max-w-wx flex w-full flex-col gap-y-12">
		<div class="flex flex-col gap-y-4" {@attach useReveal()}>
			<span class="font-mono text-sm text-muted-foreground">{eyebrow}</span>

			<!-- Titular a dos tonos: el planteo queda en gris y el remate en blanco.
			     Es una sola frase, y el contraste marca dónde está el punto. -->
			<h1 class="ty-h1 max-w-3xl text-muted-foreground">
				{title}
				<span class="text-foreground">{titleAccent}</span>
			</h1>
		</div>

		{#if posts.length === 0}
			<p class="border-t pt-8 text-muted-foreground">
				Nothing published yet. The first posts are being written.
			</p>
		{:else}
			<div class="flex flex-wrap items-center gap-2 font-mono text-sm">
				<button
					type="button"
					onclick={() => (activeTag = null)}
					aria-pressed={activeTag === null}
					class={cn(
						'rounded-full border px-3 py-1 transition-colors duration-300',
						activeTag === null
							? 'border-border bg-muted text-foreground'
							: 'border-transparent text-muted-foreground hover:text-foreground'
					)}
				>
					All
				</button>

				{#each tags as tag (tag)}
					<button
						type="button"
						onclick={() => (activeTag = activeTag === tag ? null : tag)}
						aria-pressed={activeTag === tag}
						class={cn(
							'rounded-full border px-3 py-1 transition-colors duration-300',
							activeTag === tag
								? 'border-border bg-muted text-foreground'
								: 'border-transparent text-muted-foreground hover:text-foreground'
						)}
					>
						{tag}
					</button>
				{/each}
			</div>

			{#if visible.length === 0}
				<p class="text-muted-foreground">No posts under this tag yet.</p>
			{:else}
				{#if featured.length > 0}
					<ul
						class="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
						{@attach useReveal({ targets: '.post-card', stagger: 0.1, y: 32 })}
					>
						{#each featured as post (post.slug)}
							<li animate:flip={{ duration: 320 * motion }}>
								<PostCard {post} featured />
							</li>
						{/each}
					</ul>
				{/if}

				{#if rest.length > 0}
					<div class="mt-4 flex flex-col gap-y-8">
						{#if featured.length > 0}
							<h2 class="ty-h3">More posts</h2>
						{/if}

						<ul
							class="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
							{@attach useReveal({ targets: '.post-card', stagger: 0.08, y: 28 })}
						>
							{#each rest as post (post.slug)}
								<li animate:flip={{ duration: 320 * motion }} in:fade={{ duration: 240 * motion }}>
									<PostCard {post} />
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/if}
		{/if}
	</div>
</section>

<SiteCta />
