<script lang="ts">
	import type { PostBlock } from '$lib/content/types';
	import { slugify } from '$lib/content/blog';
	import { cn } from '$lib/utils';

	type Props = {
		content: PostBlock[];
	};

	const { content }: Props = $props();

	const headings = $derived(
		content
			.filter((block) => block.type === 'heading')
			.map((block) => ({ id: slugify(block.text), text: block.text, level: block.level }))
	);

	let active = $state('');

	$effect(() => {
		const targets = headings
			.map(({ id }) => document.getElementById(id))
			.filter((element): element is HTMLElement => element !== null);

		if (targets.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((entry) => entry.isIntersecting);
				if (visible.length > 0) {
					active = visible[0].target.id;
				}
			},
			{ rootMargin: '-100px 0px -70% 0px', threshold: 0 }
		);

		targets.forEach((target) => observer.observe(target));
		return () => observer.disconnect();
	});
</script>

{#if headings.length > 1}
	<nav aria-label="Table of contents" class="flex flex-col gap-y-4">
		<span class="font-mono text-xs tracking-wider text-muted-foreground uppercase">
			On this page
		</span>

		<ul class="flex flex-col gap-y-1 border-l">
			{#each headings as heading (heading.id)}
				<li>
					<a
						href="#{heading.id}"
						class={cn(
							'-ml-px block border-l py-1.5 text-sm text-pretty transition-colors',
							heading.level === 3 ? 'pl-8' : 'pl-4',
							active === heading.id
								? 'border-foreground text-foreground'
								: 'border-transparent text-muted-foreground hover:text-foreground'
						)}
					>
						{heading.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
