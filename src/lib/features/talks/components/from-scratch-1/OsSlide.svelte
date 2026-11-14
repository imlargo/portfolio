<script lang="ts">
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { computerPart } from '$lib/content/talks/from-scratch-1/computer';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { os } = computerPart;
	const options = os.layers.map((layer) => ({ id: layer.id, label: layer.label }));

	let selectedId = $state<string>(os.layers[1].id);
	const selected = $derived(os.layers.find((layer) => layer.id === selectedId) ?? os.layers[0]);
</script>

<!-- Las tres capas apiladas como en un diagrama de libro: la elegida se
     enciende y debajo aparecen ejemplos que ya conoces. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.computer)}
			title={os.title}
			description={os.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-8">
				{#snippet aside()}
					<OptionList title={os.layersLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<ol class="mx-auto flex w-full max-w-lg flex-col gap-1.5">
					{#each os.layers as layer (layer.id)}
						<li>
							<button
								type="button"
								onclick={() => (selectedId = layer.id)}
								class={cn(
									'w-full rounded-2xl border px-5 py-4 text-center transition-colors duration-300',
									layer.id === selectedId
										? 'border-brand/60 bg-brand/15 text-foreground'
										: 'bg-background text-muted-foreground hover:text-foreground'
								)}
							>
								{layer.label}
							</button>
						</li>
					{/each}
				</ol>

				{#key selected.id}
					<div
						class="flex animate-in flex-col items-center gap-y-4 text-center duration-500 fade-in"
					>
						<p class="max-w-xl text-lg text-pretty">{selected.what}</p>
						<ul class="flex flex-wrap justify-center gap-2">
							{#each selected.examples as example (example)}
								<li><DeckChip class="text-foreground">{example}</DeckChip></li>
							{/each}
						</ul>
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-pretty text-muted-foreground md:px-8">{os.note}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
