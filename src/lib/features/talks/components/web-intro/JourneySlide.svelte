<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { webPart } from '$lib/content/talks/web-intro/web';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { journey } = webPart;
	const { steps } = journey;
	const pad = (n: number) => String(n).padStart(2, '0');
	const options = steps.map((step, index) => ({
		id: step.id,
		label: step.title,
		meta: pad(index + 1)
	}));

	let selectedId = $state<string>(steps[0].id);
	const index = $derived(
		Math.max(
			0,
			steps.findIndex((step) => step.id === selectedId)
		)
	);
	const step = $derived(steps[index]);
	const focused = $derived<readonly number[]>(step.focus);
</script>

<!-- Los seis pasos como lista a la izquierda; a la derecha la dirección con la
     parte que usa ese paso encendida, qué pasa y cómo se ve por dentro. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.web)}
			title={journey.title}
			description={journey.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={journey.stepsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<div class="flex flex-1 flex-col gap-y-8">
					<p class="flex flex-wrap font-mono text-2xl md:text-4xl" aria-label={journey.urlLabel}>
						{#each journey.url as part, partIndex (part.name)}
							<span class="flex flex-col gap-y-2">
								<span
									class={cn(
										'border-b-2 pb-1 transition-colors duration-500',
										focused.includes(partIndex)
											? 'border-brand text-foreground'
											: 'border-transparent text-muted-foreground/60'
									)}
								>
									{part.text}
								</span>
								<span class="font-sans text-xs text-muted-foreground">{part.name}</span>
							</span>
						{/each}
					</p>

					{#key step.id}
						<div class="flex animate-in flex-col gap-y-3 duration-500 fade-in">
							<DeckChip class="border-brand/50 text-brand">{step.actor}</DeckChip>
							<h3 class="text-2xl text-balance md:text-3xl">{step.title}</h3>
							<p class="max-w-xl text-lg text-pretty text-muted-foreground">{step.happens}</p>
						</div>
					{/key}

					<div class="mt-auto flex gap-2">
						<Button
							variant="outline"
							size="icon"
							aria-label={journey.previousLabel}
							disabled={index === 0}
							onclick={() => (selectedId = steps[index - 1].id)}
						>
							<ArrowLeft />
						</Button>
						<Button
							variant="outline"
							size="icon"
							aria-label={journey.nextLabel}
							disabled={index === steps.length - 1}
							onclick={() => (selectedId = steps[index + 1].id)}
						>
							<ArrowRight />
						</Button>
					</div>
				</div>

				{#snippet footer()}
					{#key step.id}
						<pre
							class="animate-in overflow-x-auto px-6 py-5 font-mono text-sm leading-relaxed text-muted-foreground duration-500 fade-in md:px-8"><code
								>{step.detail}</code
							></pre>
					{/key}
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
