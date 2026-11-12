<script lang="ts">
	import { Check, Minus } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { productPart } from '$lib/content/talks/web-intro/product';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { whatIs } = productPart;
	const options = whatIs.examples.map((example) => ({ id: example.id, label: example.label }));

	let selectedId = $state<string>(whatIs.examples[0].id);
	const selected = $derived(
		whatIs.examples.find((example) => example.id === selectedId) ?? whatIs.examples[0]
	);
	const has = (trait: string) => (selected.traits as readonly string[]).includes(trait);
</script>

<!-- Una escala de sitio a aplicación con cuatro ejemplos conocidos. Al elegir
     uno, el marcador se mueve y se encienden las cosas que lo vuelven más
     aplicación que sitio. -->
<DeckSlide id={WEB_INTRO_SECTIONS.product}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.product)}
			title={whatIs.title}
			description={whatIs.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center gap-y-10">
				{#snippet aside()}
					<OptionList title={whatIs.examplesLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<div class="flex flex-col gap-y-3">
					<div class="relative h-12">
						<div
							class="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-linear-to-r from-muted to-brand/60"
						></div>
						{#each whatIs.examples as example (example.id)}
							{@const active = example.id === selectedId}
							<button
								type="button"
								aria-label={example.label}
								onclick={() => (selectedId = example.id)}
								style:left="{example.position}%"
								class={cn(
									'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background transition-all duration-500',
									active ? 'size-6 bg-brand ring-4 ring-brand/20' : 'size-3 bg-muted-foreground'
								)}
							></button>
						{/each}
					</div>
					<div class="flex justify-between text-sm text-muted-foreground">
						<span>{whatIs.siteLabel}</span>
						<span>{whatIs.appLabel}</span>
					</div>
				</div>

				{#key selected.id}
					<div class="grid animate-in grid-cols-1 gap-8 duration-500 fade-in md:grid-cols-2">
						<div class="flex flex-col gap-y-2">
							<h3 class="text-3xl">{selected.label}</h3>
							<p class="text-lg text-pretty text-muted-foreground">{selected.what}</p>
						</div>
						<ul class="flex flex-col divide-y border-y">
							{#each whatIs.traits as trait (trait.id)}
								{@const on = has(trait.id)}
								<li class={cn('flex items-center gap-x-3 py-2.5', !on && 'text-muted-foreground')}>
									{#if on}
										<Check class="size-4 shrink-0 text-brand" />
									{:else}
										<Minus class="size-4 shrink-0" />
									{/if}
									{trait.label}
								</li>
							{/each}
						</ul>
					</div>
				{/key}
			</Stage>
		</div>
	</div>
</DeckSlide>
