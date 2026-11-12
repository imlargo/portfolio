<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { productPart } from '$lib/content/talks/web-intro/product';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { process } = productPart;
	const { steps } = process;
	const pad = (n: number) => String(n).padStart(2, '0');
	const options = steps.map((step, index) => ({
		id: step.id,
		label: step.label,
		meta: pad(index + 1)
	}));

	// Las etapas van sobre un círculo, empezando arriba y en el sentido del reloj.
	const SIZE = 240;
	const RADIUS = 92;
	const center = SIZE / 2;
	const points = steps.map((step, index) => {
		const angle = (index / steps.length) * Math.PI * 2 - Math.PI / 2;
		return {
			id: step.id,
			x: center + RADIUS * Math.cos(angle),
			y: center + RADIUS * Math.sin(angle)
		};
	});

	let selectedId = $state<string>(steps[0].id);
	const index = $derived(
		Math.max(
			0,
			steps.findIndex((step) => step.id === selectedId)
		)
	);
	const step = $derived(steps[index]);
</script>

<!-- Las siete etapas a la izquierda y, en el escenario, el ciclo dibujado como
     un círculo: se ve que publicar no es el final. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.product)}
			title={process.title}
			description={process.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={process.stepsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<div class="grid flex-1 grid-cols-1 items-center gap-8 md:grid-cols-2">
					<svg viewBox="0 0 {SIZE} {SIZE}" class="mx-auto w-full max-w-64" aria-hidden="true">
						<circle
							cx={center}
							cy={center}
							r={RADIUS}
							class="fill-none stroke-border"
							stroke-width="1"
						/>
						{#each points as point, pointIndex (point.id)}
							{@const active = pointIndex === index}
							<g>
								<circle
									cx={point.x}
									cy={point.y}
									r={active ? 14 : 10}
									class={cn(
										'stroke-background transition-all duration-500',
										active ? 'fill-brand' : pointIndex < index ? 'fill-brand/40' : 'fill-muted'
									)}
									stroke-width="3"
								/>
								<text
									x={point.x}
									y={point.y}
									dy="0.35em"
									text-anchor="middle"
									class={cn(
										'font-mono text-[8px]',
										active ? 'fill-background' : 'fill-muted-foreground'
									)}
								>
									{pointIndex + 1}
								</text>
							</g>
						{/each}
						<text
							x={center}
							y={center}
							dy="0.35em"
							text-anchor="middle"
							class="fill-foreground text-[14px]"
						>
							{step.label}
						</text>
					</svg>

					{#key step.id}
						<div class="flex animate-in flex-col gap-y-4 duration-500 fade-in">
							<span class="font-mono text-xs text-muted-foreground">
								{pad(index + 1)} / {pad(steps.length)}
							</span>
							<p class="text-xl text-pretty">{step.what}</p>
							<p class="border-t pt-4 text-pretty text-muted-foreground">
								<span class="text-brand">{process.outputLabel}:</span>
								{step.output}
							</p>
						</div>
					{/key}
				</div>

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-muted-foreground md:px-8">{process.loopNote}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
