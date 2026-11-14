<script lang="ts">
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';

	const { basics } = programmingPart;
	const options = basics.concepts.map((concept) => ({
		id: concept.id,
		label: concept.label,
		hint: concept.what
	}));

	let selectedId = $state<string>(basics.concepts[0].id);
	const selected = $derived(
		basics.concepts.find((concept) => concept.id === selectedId) ?? basics.concepts[0]
	);
</script>

<!-- Cinco ideas, cada una con el código más corto que la muestra y lo que ese
     código imprime, como se vería en una consola. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={basics.title}
			description={basics.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="p-0 md:p-0">
				{#snippet aside()}
					<OptionList title={basics.conceptsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				{#key selected.id}
					<div class="flex flex-1 animate-in flex-col duration-500 fade-in">
						<CodeBlock id={selected.snippet} bare class="flex-1" />
						<div class="flex flex-col gap-y-2 border-t bg-neutral-950 px-6 py-4 md:px-8">
							<span class="text-xs text-neutral-500">{basics.outputLabel}</span>
							<pre class="font-mono text-sm text-neutral-200">{selected.output}</pre>
						</div>
					</div>
				{/key}
			</Stage>
		</div>
	</div>
</DeckSlide>
