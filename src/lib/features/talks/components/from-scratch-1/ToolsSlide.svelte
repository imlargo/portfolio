<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { TOOL_WHEN, buildingPart } from '$lib/content/talks/from-scratch-1/building';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { tools } = buildingPart;
</script>

<!-- Una retícula de herramientas con filetes; las que se instalan hoy llevan el
     acento, las de más adelante quedan en gris. -->
<DeckSlide>
	<div class="flex flex-col gap-y-12">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.building)}
			title={tools.title}
			description={tools.description}
		/>

		<ul
			class="grid grid-cols-1 overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-4"
			{@attach useReveal({ targets: '.tool', stagger: 0.05, y: 16 })}
		>
			{#each tools.tools as tool (tool.label)}
				{@const now = tool.when === TOOL_WHEN.now}
				<li class="tool -mt-px -ml-px flex flex-col gap-y-3 border-t border-l p-6">
					<span
						class={cn(
							'flex items-center gap-x-2 text-xs',
							now ? 'text-brand' : 'text-muted-foreground'
						)}
					>
						<span class={cn('size-1.5 rounded-full', now ? 'bg-brand' : 'bg-muted-foreground/40')}
						></span>
						{tools.whenLabels[tool.when]}
					</span>
					<span class="text-xl">{tool.label}</span>
					<span class="text-sm text-pretty text-muted-foreground">{tool.what}</span>
				</li>
			{/each}
		</ul>
	</div>
</DeckSlide>
