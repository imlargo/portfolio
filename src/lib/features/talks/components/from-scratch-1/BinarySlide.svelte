<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { computerPart } from '$lib/content/talks/from-scratch-1/computer';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { binary } = computerPart;
	const BITS = 8;
	// En ASCII, los caracteres visibles van del 33 al 126 (el 32 es el espacio).
	const PRINTABLE = { from: 33, to: 126 };
	const places = Array.from({ length: BITS }, (_, index) => 2 ** (BITS - 1 - index));

	let value = $state<number>(binary.initial);
	const letter = $derived(
		value >= PRINTABLE.from && value <= PRINTABLE.to ? String.fromCharCode(value) : null
	);

	const toggle = (place: number) => (value ^= place);
</script>

<!-- Ocho interruptores grandes que se prenden con un toque. Cada uno vale el
     doble del de su derecha; el número y la letra salen de sumar los prendidos. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.computer)}
			title={binary.title}
			description={binary.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="gap-y-8">
				<div class="flex flex-col gap-y-3">
					<span class="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
						<span>{binary.bitsLabel}</span>
						<span>{binary.bitHint}</span>
					</span>
					<div class="grid grid-cols-8 gap-1.5 md:gap-3">
						{#each places as place (place)}
							{@const on = (value & place) !== 0}
							<button
								type="button"
								role="switch"
								aria-checked={on}
								aria-label={String(place)}
								onclick={() => toggle(place)}
								class="flex flex-col items-center gap-y-2"
							>
								<span
									class={cn(
										'grid aspect-square w-full place-items-center rounded-2xl border font-mono text-2xl transition-colors duration-300 md:text-4xl',
										on
											? 'border-brand bg-brand text-background'
											: 'bg-background text-muted-foreground'
									)}
								>
									{on ? 1 : 0}
								</span>
								<span class="font-mono text-xs text-muted-foreground tabular-nums">{place}</span>
							</button>
						{/each}
					</div>
				</div>

				<dl class="grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-y-1 rounded-2xl border bg-background p-5">
						<dt class="text-sm text-muted-foreground">{binary.numberLabel}</dt>
						<dd class="font-mono text-5xl tabular-nums">{value}</dd>
					</div>
					<div class="flex flex-col gap-y-1 rounded-2xl border bg-background p-5">
						<dt class="text-sm text-muted-foreground">{binary.letterLabel}</dt>
						<dd class={cn('font-mono text-5xl', !letter && 'text-2xl text-muted-foreground')}>
							{letter ?? binary.noLetter}
						</dd>
					</div>
				</dl>

				<p class="max-w-3xl text-pretty text-muted-foreground">{binary.note}</p>

				{#snippet footer()}
					<dl class="grid grid-cols-2 divide-x md:grid-cols-4">
						{#each binary.units as unit (unit.label)}
							<div class="flex flex-col gap-y-0.5 px-6 py-4">
								<dt class="font-mono text-sm">{unit.label}</dt>
								<dd class="text-sm text-muted-foreground">{unit.what}</dd>
							</div>
						{/each}
					</dl>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
