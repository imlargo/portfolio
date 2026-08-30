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

<!-- Una tarjeta: portada, fecha, título, resumen y un pie con el tiempo de
     lectura a la izquierda y el enlace a la derecha. La misma pieza sirve para
     la retícula destacada y para la de abajo; solo cambia la escala del título
     y el alto de la portada. -->
<article class="post-card group flex h-full flex-col">
	<a href="/blog/{post.slug}" class="flex h-full flex-col gap-y-5">
		<PostCover
			slug={post.slug}
			class="{featured
				? 'aspect-16/9'
				: 'aspect-3/2'} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
		/>

		<div class="flex flex-1 flex-col gap-y-3">
			<time datetime={post.date} class="font-mono text-sm text-muted-foreground">
				{formatDate(post.date)}
			</time>

			<h3
				class="text-pretty transition-colors duration-500 group-hover:text-foreground/70 {featured
					? 'text-xl font-medium md:text-2xl'
					: 'font-medium'}"
			>
				{post.title}
			</h3>

			<p class="flex-1 text-pretty text-muted-foreground">
				{post.description}
			</p>

			<div class="mt-2 flex items-center justify-between gap-x-4 border-t pt-4">
				<span class="font-mono text-sm text-muted-foreground">{post.readingTime} min read</span>

				<span class="flex items-center gap-x-1 text-sm font-medium text-brand">
					Read
					<ChevronRight
						class="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
					/>
				</span>
			</div>
		</div>
	</a>
</article>
