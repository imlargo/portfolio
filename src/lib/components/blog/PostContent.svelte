<script lang="ts">
	import type { PostBlock } from '$lib/assets/content/types';
	import { slugify } from '$lib/assets/content/blog';
	import CodeBlock from './CodeBlock.svelte';
	import InlineText from './InlineText.svelte';

	type Props = {
		content: PostBlock[];
	};

	const { content }: Props = $props();
</script>

<div class="flex max-w-prose flex-col gap-y-6">
	{#each content as block, index (index)}
		{#if block.type === 'heading'}
			{#if block.level === 2}
				<h2 id={slugify(block.text)} class="ty-h3 mt-6 scroll-mt-28 first:mt-0">
					{block.text}
				</h2>
			{:else}
				<h3 id={slugify(block.text)} class="ty-h4 mt-4 scroll-mt-28 text-muted-foreground">
					{block.text}
				</h3>
			{/if}
		{:else if block.type === 'paragraph'}
			<p class="text-pretty text-muted-foreground">
				<InlineText text={block.text} />
			</p>
		{:else if block.type === 'code'}
			<CodeBlock language={block.language} code={block.code} />
		{:else if block.type === 'list'}
			{#if block.ordered}
				<ol class="flex flex-col gap-y-3 pl-1">
					{#each block.items as item, index (index)}
						<li class="flex gap-x-3 text-pretty text-muted-foreground">
							<span class="pt-0.5 font-mono text-sm text-foreground/60 tabular-nums">
								{String(index + 1).padStart(2, '0')}
							</span>
							<span><InlineText text={item} /></span>
						</li>
					{/each}
				</ol>
			{:else}
				<ul class="flex flex-col gap-y-3 pl-1">
					{#each block.items as item, index (index)}
						<li class="flex gap-x-3 text-pretty text-muted-foreground">
							<span class="mt-2.5 size-1 shrink-0 rounded-full bg-foreground/40"></span>
							<span><InlineText text={item} /></span>
						</li>
					{/each}
				</ul>
			{/if}
		{:else if block.type === 'quote'}
			<blockquote class="my-2 border-l-2 border-foreground/20 pl-6">
				<p class="text-lg text-pretty text-foreground/90 italic">
					<InlineText text={block.text} />
				</p>
				{#if block.cite}
					<footer class="mt-2 font-mono text-sm text-muted-foreground">— {block.cite}</footer>
				{/if}
			</blockquote>
		{/if}
	{/each}
</div>
