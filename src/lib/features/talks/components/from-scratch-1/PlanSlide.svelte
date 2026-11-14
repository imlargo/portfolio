<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { fromScratchMeta } from '$lib/content/talks/from-scratch-1/meta';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { plan } = fromScratchMeta;
	const pad = (n: number) => String(n).padStart(2, '0');
	const options = plan.phases.map((phase, index) => ({
		id: phase.id,
		label: phase.label,
		meta: index === 0 ? plan.nowLabel : pad(index + 1)
	}));

	let selectedId = $state<string>(plan.phases[0].id);
	const index = $derived(
		Math.max(
			0,
			plan.phases.findIndex((phase) => phase.id === selectedId)
		)
	);
	const phase = $derived(plan.phases[index]);
</script>

<!-- El camino completo antes de dar el primer paso: las siete fases a la
     izquierda y, en el escenario, una barra que muestra dónde cae cada una. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader eyebrow={plan.eyebrow} title={plan.title} description={plan.description} />

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-10">
				{#snippet aside()}
					<OptionList title={plan.phasesLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<ol class="flex gap-1.5" aria-hidden="true">
					{#each plan.phases as item, itemIndex (item.id)}
						<li
							class={cn(
								'h-2 flex-1 rounded-full transition-colors duration-500',
								itemIndex === 0 && 'bg-brand',
								itemIndex !== 0 && itemIndex <= index && 'bg-brand/40',
								itemIndex > index && 'bg-muted'
							)}
						></li>
					{/each}
				</ol>

				{#key phase.id}
					<div class="grid animate-in grid-cols-1 gap-8 duration-500 fade-in md:grid-cols-2">
						<div class="flex flex-col gap-y-2">
							<span class="font-mono text-xs text-muted-foreground">
								{pad(index + 1)} / {pad(plan.phases.length)}
							</span>
							<h3 class="text-3xl">{phase.label}</h3>
						</div>
						<dl class="flex flex-col gap-y-5">
							<div class="flex flex-col gap-y-1">
								<dt class="text-sm text-muted-foreground">{plan.learnLabel}</dt>
								<dd class="text-lg text-pretty">{phase.learn}</dd>
							</div>
							<div class="flex flex-col gap-y-1 border-t pt-5">
								<dt class="text-sm text-brand">{plan.buildLabel}</dt>
								<dd class="text-pretty">{phase.build}</dd>
							</div>
						</dl>
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-pretty md:px-8">{plan.goal}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
