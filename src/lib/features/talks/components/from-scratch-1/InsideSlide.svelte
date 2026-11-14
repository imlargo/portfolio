<script lang="ts">
	import { ArrowLeftRight, ArrowRight } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { computerPart } from '$lib/content/talks/from-scratch-1/computer';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { inside } = computerPart;
	const [cpu, ram, storage, io] = inside.parts;
	const options = inside.parts.map((part) => ({
		id: part.id,
		label: part.label,
		meta: part.short
	}));

	let selectedId = $state<string>(cpu.id);
	const selected = $derived(inside.parts.find((part) => part.id === selectedId) ?? cpu);
</script>

{#snippet box(part: (typeof inside.parts)[number], label: string)}
	<button
		type="button"
		onclick={() => (selectedId = part.id)}
		class={cn(
			'flex flex-1 flex-col items-center justify-center rounded-2xl border bg-background px-3 py-4 text-center transition-[border-color,box-shadow] duration-300',
			selectedId === part.id
				? 'border-brand/60 shadow-lg shadow-brand/10'
				: 'hover:border-foreground/30'
		)}
	>
		<span class="font-mono text-sm">{label}</span>
	</button>
{/snippet}

<!-- Las piezas como un recorrido: lo que entra, el procesador que trabaja con
     la memoria y el disco, y lo que sale. Abajo, la analogía de la cocina. -->
<DeckSlide id={FROM_SCRATCH_SECTIONS.computer}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.computer)}
			title={inside.title}
			description={inside.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-8">
				{#snippet aside()}
					<OptionList title={inside.partsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<div class="flex items-stretch gap-2 text-muted-foreground" aria-hidden="true">
					{@render box(io, io.short)}
					<ArrowRight class="size-4 shrink-0 self-center" />
					{@render box(cpu, cpu.short)}
					<ArrowLeftRight class="size-4 shrink-0 self-center" />
					{@render box(ram, ram.short)}
					<ArrowLeftRight class="size-4 shrink-0 self-center" />
					{@render box(storage, storage.short)}
				</div>

				{#key selected.id}
					<div class="grid animate-in grid-cols-1 gap-8 duration-500 fade-in md:grid-cols-2">
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-brand">{inside.analogyLabel}</span>
							<p class="text-3xl">{selected.analogy}</p>
						</div>
						<div class="flex flex-col gap-y-4">
							<p class="text-lg text-pretty">{selected.what}</p>
							<p class="border-t pt-4 text-pretty text-muted-foreground">
								<span class="text-foreground">{inside.exampleLabel}:</span>
								{selected.example}
							</p>
						</div>
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-muted-foreground md:px-8">{inside.note}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
