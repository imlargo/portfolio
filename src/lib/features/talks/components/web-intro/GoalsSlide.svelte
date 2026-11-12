<script lang="ts">
	import PixelIcon from '$lib/components/effects/pixel/PixelIcon.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { WEB_INTRO_PARTS, webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { useReveal } from '$lib/attachments/reveal';

	const { goals } = webIntroMeta;
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<!-- Arriba la agenda como una fila de cinco partes con su tiempo; cada una
     salta a su sección. Abajo, lo que se entiende al final, en dos columnas. -->
<DeckSlide>
	<div class="flex flex-col gap-y-12">
		<SlideHeader eyebrow={goals.eyebrow} title={goals.title} description={goals.description} />

		<ol
			class="grid grid-cols-2 overflow-hidden rounded-3xl border md:grid-cols-5"
			{@attach useReveal({ targets: '.agenda-item', stagger: 0.06, y: 16 })}
		>
			{#each WEB_INTRO_PARTS as part (part.id)}
				<li class="agenda-item border-r border-b last:border-r-0 md:border-b-0">
					<a
						href="#{part.id}"
						class="group flex h-full flex-col gap-y-8 p-5 transition-colors duration-300 hover:bg-muted/40"
					>
						<span class="flex items-center justify-between">
							<PixelIcon matrix={part.icon} class="size-4 text-brand" />
							<span class="font-mono text-xs text-muted-foreground">{part.index}</span>
						</span>
						<span class="flex flex-col gap-y-1">
							<span class="text-lg">{part.label}</span>
							<span class="font-mono text-xs text-muted-foreground tabular-nums">
								{goals.minutesLabel(part.minutes)}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ol>

		<div class="flex flex-col gap-y-4" {@attach useReveal({ y: 16, delay: 0.2 })}>
			<span class="text-sm text-muted-foreground">{goals.outcomesLabel}</span>
			<ol class="grid grid-cols-1 gap-x-12 md:grid-cols-2">
				{#each goals.outcomes as outcome, index (outcome)}
					<li class="flex gap-x-4 border-t py-4">
						<span class="font-mono text-xs leading-7 text-muted-foreground tabular-nums">
							{pad(index + 1)}
						</span>
						<p class="text-lg text-pretty">{outcome}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</DeckSlide>
