<script lang="ts">
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';

	const { map } = programmingPart;
	const options = map.areas.map((area) => ({ id: area.id, label: area.label }));

	let selectedId = $state<string>(map.areas[0].id);
	const selected = $derived(map.areas.find((area) => area.id === selectedId) ?? map.areas[0]);
</script>

<!-- Los terrenos a la izquierda y sus lenguajes en grande; los dos donde vamos
     a trabajar llevan la marca de que son nuestros. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={map.title}
			description={map.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-6">
				{#snippet aside()}
					<OptionList title={map.areasLabel} {options} bind:selected={selectedId} />
				{/snippet}

				{#key selected.id}
					<div class="flex animate-in flex-col gap-y-6 duration-500 fade-in">
						<ul class="flex flex-wrap gap-3">
							{#each selected.languages as item (item)}
								<li
									class="rounded-2xl border bg-background px-5 py-3 font-mono text-xl md:text-2xl"
								>
									{item}
								</li>
							{/each}
						</ul>
						<p class="text-lg text-pretty text-muted-foreground">{selected.where}</p>
						{#if selected.ours}
							<DeckChip class="border-brand/50 text-brand">{map.ourPickLabel}</DeckChip>
						{/if}
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-pretty md:px-8">
						<span class="text-muted-foreground">{map.ourPickLabel}:</span>
						{map.ourPick}
					</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
