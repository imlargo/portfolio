<script lang="ts">
	import type { WorkItem } from '$lib/assets/content/types';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { ArrowUpRight } from '@lucide/svelte';

	type Props = {
		item: WorkItem;
	};

	const { item }: Props = $props();
</script>

<div class="items-top flex flex-col gap-y-4 py-8 lg:grid lg:grid-cols-3">
	<span class="font-mono text-sm leading-none font-medium text-muted-foreground">
		{item.period}
	</span>

	<div class="flex w-full flex-col gap-y-4">
		<div class="flex flex-col gap-y-1">
			{#if item.url}
				<a
					href={item.url}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-x-1.5 text-lg font-semibold hover:text-primary"
				>
					<span>{item.title}</span>
					<ArrowUpRight class="size-4" />
				</a>
			{:else}
				<span class="text-lg font-semibold">{item.title}</span>
			{/if}

			<div class="font-mono text-sm leading-none font-medium text-muted-foreground lg:hidden">
				{item.context}
			</div>
		</div>

		<p class="w-full text-muted-foreground">
			{item.description}
		</p>

		<div class="flex w-full flex-wrap gap-2">
			{#each item.technologies as tech}
				<SkillBadge {tech} />
			{/each}
		</div>
	</div>

	<div
		class="hidden text-end font-mono text-sm leading-none font-medium text-muted-foreground lg:block"
	>
		{item.context}
	</div>
</div>
