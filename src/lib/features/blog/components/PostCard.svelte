<script lang="ts">
	import type { PostSummary } from '$lib/content/types';
	import { formatDate } from '$lib/content/blog';
	import PostCover from './PostCover.svelte';
	import { ChevronRight } from '@lucide/svelte';

	type Props = {
		post: PostSummary;
		/** Las dos primeras entradas van a mayor escala en la retícula de dos columnas. */
		featured?: boolean;
	};

	const { post, featured = false }: Props = $props();
</script>

<!-- La tarjeta entera es clicable con un solo enlace: el del título se estira
     sobre el artículo con `after:absolute inset-0`. Por eso el pie no lleva un
     `<a>` ni un `<button>` de verdad (anidar interactivos dentro de un enlace es
     marcado inválido) sino un `span` con forma de botón que reacciona al hover
     del grupo. -->
<article class="post-card group relative flex h-full flex-col gap-y-5">
	<PostCover
		slug={post.slug}
		accent={post.accent}
		class="{featured
			? 'aspect-16/9'
			: 'aspect-3/2'} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
	/>

	<div class="flex flex-1 flex-col gap-y-3">
		<time datetime={post.date} class="font-mono text-sm text-muted-foreground">
			{formatDate(post.date)}
		</time>

		<h3 class="text-pretty {featured ? 'text-xl font-medium md:text-2xl' : 'font-medium'}">
			<a
				href="/blog/{post.slug}"
				class="transition-colors duration-500 group-hover:text-foreground/70 after:absolute after:inset-0"
			>
				{post.title}
			</a>
		</h3>

		<p class="flex-1 text-pretty text-muted-foreground">
			{post.description}
		</p>

		<div class="mt-2 flex items-center justify-between gap-x-4">
			<span class="font-mono text-sm text-muted-foreground">{post.readingTime} min read</span>

			<span
				class="inline-flex items-center gap-x-1 rounded-lg border border-foreground/15 px-3 py-1.5 text-sm font-medium transition-colors duration-500 group-hover:border-foreground/35 group-hover:bg-foreground/5"
			>
				Read
				<ChevronRight
					class="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
				/>
			</span>
		</div>
	</div>
</article>
