<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { RecordRow } from '$lib/components/cards';
	import { Button } from '$lib/components/ui/button';
	import { siteContent, experience } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { ArrowUpRight } from '@lucide/svelte';

	const block = siteContent.home.experience;
</script>

<Section.Root>
	<div class="flex flex-col justify-between gap-x-2 gap-y-4 lg:flex-row lg:items-end">
		<Section.Header>
			<Section.Title>{block.title}</Section.Title>
			<Section.Description>{block.description}</Section.Description>
		</Section.Header>

		<Button class="max-w-max" target="_blank" href={block.cta.href}>
			<span>{block.cta.label}</span>
			<ArrowUpRight class="size-4" />
		</Button>
	</div>

	<div
		class="flex flex-col divide-y border-b"
		{@attach useReveal({ targets: '.record-row', stagger: 0.08 })}
	>
		{#each experience as item (item.company + item.date)}
			<RecordRow
				period={item.date}
				title={item.role}
				context={item.company}
				description={item.description}
				technologies={item.stack}
			/>
		{/each}
	</div>
</Section.Root>
