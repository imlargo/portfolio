<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { componentsPart } from '$lib/content/talks/web-intro/components';
	import { useReveal } from '$lib/attachments/reveal';

	const { frameworks } = componentsPart;
	const options = frameworks.variants.map((variant) => ({
		id: variant.id,
		label: variant.label,
		hint: variant.how
	}));

	let selectedId = $state<string>(frameworks.variants[0].id);
	const selected = $derived(
		frameworks.variants.find((variant) => variant.id === selectedId) ?? frameworks.variants[0]
	);
	// El contador de la diapositiva es Svelte de verdad: el mismo código de la segunda opción.
	let count = $state(0);
</script>

<!-- Las tres versiones a la izquierda, con quién actualiza la pantalla en cada
     una; el código ocupa el escenario. Al pie de la lista, el contador real. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.components)}
			title={frameworks.title}
			description={frameworks.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="p-0 md:p-0">
				{#snippet aside()}
					<OptionList title={frameworks.howLabel} {options} bind:selected={selectedId}>
						{#snippet footer()}
							<div class="flex items-center justify-between gap-4">
								<span class="flex items-center gap-x-2 text-sm text-brand">
									<span class="size-1.5 rounded-full bg-brand" aria-hidden="true"></span>
									{frameworks.tryLabel}
								</span>
								<Button onclick={() => count++} class="font-mono tabular-nums">
									{frameworks.counterLabel(count)}
								</Button>
							</div>
						{/snippet}
					</OptionList>
				{/snippet}

				{#key selected.id}
					<CodeBlock id={selected.snippet} bare class="flex-1 animate-in duration-500 fade-in" />
				{/key}
			</Stage>
		</div>
	</div>
</DeckSlide>
