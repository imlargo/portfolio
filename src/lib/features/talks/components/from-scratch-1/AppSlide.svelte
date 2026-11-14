<script lang="ts">
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { buildingPart } from '$lib/content/talks/from-scratch-1/building';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { app } = buildingPart;
	const options = app.parts.map((part) => ({ id: part.id, label: part.label, meta: part.phase }));

	let selectedId = $state<string>(app.parts[0].id);
	const selected = $derived(app.parts.find((part) => part.id === selectedId) ?? app.parts[0]);
</script>

<!-- Las tres partes en fila, como se hablan entre ellas; la elegida se enciende
     y debajo aparece lo que vas a aprender para hacerla. -->
<DeckSlide id={FROM_SCRATCH_SECTIONS.building}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.building)}
			title={app.title}
			description={app.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-8">
				{#snippet aside()}
					<OptionList title={app.partsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<ol class="flex flex-col gap-2 md:flex-row md:items-center">
					{#each app.parts as part, index (part.id)}
						<li class="contents">
							<button
								type="button"
								onclick={() => (selectedId = part.id)}
								class={cn(
									'flex flex-1 flex-col gap-y-1 rounded-2xl border bg-background p-5 text-left transition-[border-color,box-shadow] duration-300',
									part.id === selectedId
										? 'border-brand/60 shadow-lg shadow-brand/10'
										: 'hover:border-foreground/30'
								)}
							>
								<span class="text-xl">{part.label}</span>
								<span class="text-sm text-pretty text-muted-foreground">{part.what}</span>
							</button>
							{#if index < app.parts.length - 1}
								<span class="hidden h-px w-8 shrink-0 bg-border md:block" aria-hidden="true"></span>
							{/if}
						</li>
					{/each}
				</ol>

				{#key selected.id}
					<div class="flex animate-in flex-col gap-y-3 duration-500 fade-in">
						<span class="text-sm text-muted-foreground">{app.learnLabel}</span>
						<ul class="flex flex-wrap gap-2">
							{#each selected.learn as item (item)}
								<li><DeckChip class="text-foreground">{item}</DeckChip></li>
							{/each}
						</ul>
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-pretty text-muted-foreground md:px-8">{app.example}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
