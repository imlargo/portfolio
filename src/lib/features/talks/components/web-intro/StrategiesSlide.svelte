<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import {
		TIMELINE_KIND,
		browserPart,
		type TimelineKind
	} from '$lib/content/talks/web-intro/browser';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { strategies } = browserPart;
	const options = strategies.items.map((item) => ({
		id: item.id,
		label: item.name,
		meta: item.label
	}));

	/** El acento queda para cuando la página ya responde: es lo que el usuario espera. */
	const FILL: Record<TimelineKind, string> = {
		[TIMELINE_KIND.server]: 'bg-foreground/25',
		[TIMELINE_KIND.network]: 'bg-foreground/10',
		[TIMELINE_KIND.blank]: 'border border-dashed border-foreground/20',
		[TIMELINE_KIND.visible]: 'bg-brand/35',
		[TIMELINE_KIND.interactive]: 'bg-brand'
	};

	let selectedId = $state<string>(strategies.items[1].id);
	const selected = $derived(
		strategies.items.find((item) => item.id === selectedId) ?? strategies.items[0]
	);
</script>

<!-- Las tres líneas de tiempo juntas, para comparar a simple vista cuándo
     aparece algo; la elegida queda encendida y debajo se explica. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.browser)}
			title={strategies.title}
			description={strategies.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={strategies.optionsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<span class="mb-4 text-sm text-muted-foreground">{strategies.timelineLabel}</span>
				<div class="flex flex-col gap-y-3">
					{#each strategies.items as item (item.id)}
						<div
							class={cn(
								'grid grid-cols-[3rem_1fr] items-center gap-x-4 transition-opacity duration-500',
								item.id !== selectedId && 'opacity-35'
							)}
						>
							<span class="font-mono text-sm">{item.label}</span>
							<span class="flex h-6 gap-1">
								{#each item.timeline as segment, index (index)}
									<span
										style:flex-grow={segment.units}
										class={cn('basis-0 rounded-md', FILL[segment.kind])}
									></span>
								{/each}
							</span>
						</div>
					{/each}
				</div>

				<ul class="mt-5 flex flex-wrap gap-x-5 gap-y-2">
					{#each strategies.legend as item (item.kind)}
						<li class="flex items-center gap-x-2 text-xs text-muted-foreground">
							<span class={cn('size-3 rounded-sm', FILL[item.kind])}></span>
							{item.label}
						</li>
					{/each}
				</ul>

				{#key selected.id}
					<div class="mt-auto flex animate-in flex-col gap-y-3 pt-8 duration-500 fade-in">
						<p class="max-w-2xl text-lg text-pretty">{selected.how}</p>
						<p class="text-pretty text-muted-foreground">
							<span class="text-brand">{strategies.bestForLabel}:</span>
							{selected.bestFor}
						</p>
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-pretty text-muted-foreground md:px-8">
						{strategies.note}
					</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
