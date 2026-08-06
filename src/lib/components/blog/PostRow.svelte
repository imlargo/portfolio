<script lang="ts">
	import type { PostSummary } from '$lib/assets/content/types';
	import { formatDate } from '$lib/assets/content/blog';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { ArrowUpRight } from '@lucide/svelte';

	type Props = {
		post: PostSummary;
	};

	const { post }: Props = $props();
</script>

<a
	href="/blog/{post.slug}"
	class="group items-top flex flex-col gap-y-4 py-8 transition-opacity lg:grid lg:grid-cols-3 lg:gap-x-8"
>
	<time
		datetime={post.date}
		class="font-mono text-sm leading-none font-medium text-muted-foreground"
	>
		{formatDate(post.date)}
	</time>

	<div class="flex w-full flex-col gap-y-4">
		<div class="flex items-start justify-between gap-x-4">
			<span
				class="text-lg font-semibold transition-colors group-hover:text-foreground/70 lg:text-xl"
			>
				{post.title}
			</span>

			<ArrowUpRight
				class="mt-1 size-4 shrink-0 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
			/>
		</div>

		<p class="w-full text-pretty text-muted-foreground">
			{post.description}
		</p>

		<div class="flex w-full flex-wrap gap-2">
			{#each post.tags as tag (tag)}
				<Badge variant="outline" class="py-1 font-normal text-muted-foreground">{tag}</Badge>
			{/each}
		</div>
	</div>

	<div
		class="hidden items-center justify-end gap-x-2 font-mono text-sm leading-none font-medium text-muted-foreground lg:flex"
	>
		<span>{post.readingTime} min read</span>
		<ArrowUpRight
			class="size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
		/>
	</div>
</a>
