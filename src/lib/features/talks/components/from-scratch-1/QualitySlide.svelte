<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { buildingPart } from '$lib/content/talks/from-scratch-1/building';
	import { useReveal } from '$lib/attachments/reveal';

	const { quality } = buildingPart;
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<!-- Seis hábitos en tres columnas de filetes: el mismo lenguaje visual de las
     reglas de la clase, porque son su continuación. -->
<DeckSlide>
	<div class="flex flex-col gap-y-12">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.building)}
			title={quality.title}
			description={quality.description}
		/>

		<ol
			class="grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:grid-cols-3"
			{@attach useReveal({ targets: '.habit', stagger: 0.08, y: 16 })}
		>
			{#each quality.habits as habit, index (habit.title)}
				<li class="habit flex flex-col gap-y-2 border-t py-6">
					<span class="font-mono text-xs text-brand tabular-nums">{pad(index + 1)}</span>
					<h3 class="text-xl">{habit.title}</h3>
					<p class="text-pretty text-muted-foreground">{habit.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</DeckSlide>
