<script lang="ts">
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';

	const { language } = programmingPart;
	const options = language.levels.map((level) => ({
		id: level.id,
		label: level.label,
		meta: level.meta
	}));

	let selectedId = $state<string>(language.levels[0].id);
	const selected = $derived(
		language.levels.find((level) => level.id === selectedId) ?? language.levels[0]
	);
</script>

<!-- La misma suma bajando de nivel, de lo que escribe una persona a los bytes
     que ejecuta el procesador. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={language.title}
			description={language.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-6">
				{#snippet aside()}
					<OptionList title={language.levelsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				{#key selected.id}
					<div class="flex animate-in flex-col gap-y-6 duration-500 fade-in">
						<p class="max-w-xl text-2xl text-pretty">{selected.what}</p>
						<CodeBlock id={selected.snippet} class="bg-background" />
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-pretty text-muted-foreground md:px-8">{language.note}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
