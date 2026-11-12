<script lang="ts">
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { webPart } from '$lib/content/talks/web-intro/web';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { map } = webPart;

	let selectedIndex = $state(0);
	const selected = $derived(map.nodes[selectedIndex]);
</script>

<!-- Las tres piezas en fila dentro del escenario, con lo que viaja entre ellas.
     Al pie, el detalle de la elegida. El atajo de Supabase solo aparece cuando
     se habla del backend o de los datos, que es donde aplica. -->
<DeckSlide id={WEB_INTRO_SECTIONS.web}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.web)}
			title={map.title}
			description={map.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center py-10 md:py-14">
				<ol class="flex flex-col items-stretch md:flex-row md:items-center">
					{#each map.nodes as node, index (node.id)}
						{@const active = index === selectedIndex}
						<li class="contents">
							<button
								type="button"
								aria-pressed={active}
								onclick={() => (selectedIndex = index)}
								class={cn(
									'relative flex flex-1 flex-col items-start gap-y-1 rounded-2xl border bg-background p-5 text-left transition-[border-color,box-shadow] duration-300',
									active
										? 'border-brand/60 shadow-lg shadow-brand/10'
										: 'hover:border-foreground/30'
								)}
							>
								{#if node.focus}
									<DeckChip
										class="absolute -top-3 right-4 border-brand/50 bg-background text-brand"
									>
										{map.focusLabel}
									</DeckChip>
								{/if}
								<span class="text-xl">{node.label}</span>
								<span class="text-sm text-muted-foreground">{node.place}</span>
							</button>
							{#if index < map.links.length}
								<div
									class="relative flex h-12 shrink-0 items-center justify-center md:h-auto md:w-28"
									aria-hidden="true"
								>
									<span class="h-full w-px bg-border md:h-px md:w-full"></span>
									<span class="packet absolute size-1.5 rounded-full bg-brand"></span>
									<span
										class="absolute left-1/2 ml-4 font-mono text-xs text-muted-foreground md:top-1/2 md:left-1/2 md:ml-0 md:-translate-x-1/2 md:translate-y-2"
									>
										{map.links[index]}
									</span>
								</div>
							{/if}
						</li>
					{/each}
				</ol>

				{#snippet footer()}
					{#key selected.id}
						<div
							class="grid animate-in grid-cols-1 gap-6 p-6 duration-500 fade-in md:grid-cols-12 md:p-8"
						>
							<div class="flex flex-col gap-y-3 md:col-span-5">
								<p class="text-lg text-pretty">{selected.role}</p>
								<ul class="flex flex-wrap gap-2">
									{#each selected.tech as item (item)}
										<li><DeckChip class="text-foreground">{item}</DeckChip></li>
									{/each}
								</ul>
							</div>
							<div class="flex flex-col gap-y-2 md:col-span-7">
								<span class="text-sm text-muted-foreground">{map.doesLabel}</span>
								<ul class="flex flex-col gap-y-1.5">
									{#each selected.does as item (item)}
										<li class="flex gap-x-3 text-pretty">
											<span class="mt-2.5 size-1 shrink-0 rounded-full bg-brand"></span>
											{item}
										</li>
									{/each}
								</ul>
								{#if !selected.focus}
									<p class="mt-3 border-t pt-3 text-sm text-pretty text-muted-foreground">
										<span class="text-foreground">{map.shortcut.title}.</span>
										{map.shortcut.text}
									</p>
								{/if}
							</div>
						</div>
					{/key}
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>

<style>
	.packet {
		animation: packet-y 2.4s var(--ease-out-expo) infinite alternate;
	}

	@media (min-width: 48rem) {
		.packet {
			animation-name: packet-x;
		}
	}

	@keyframes packet-y {
		from {
			transform: translateY(-1rem);
		}
		to {
			transform: translateY(1rem);
		}
	}

	@keyframes packet-x {
		from {
			transform: translateX(-3rem);
		}
		to {
			transform: translateX(3rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.packet {
			animation: none;
		}
	}
</style>
