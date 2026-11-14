<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { fromScratchMeta } from '$lib/content/talks/from-scratch-1/meta';
	import { useReveal } from '$lib/attachments/reveal';

	const { method } = fromScratchMeta;
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<!-- Cinco reglas en una retícula de filetes, sin cajas: se leen como un
     acuerdo, no como una lista de tareas. -->
<DeckSlide>
	<div class="flex flex-col gap-y-12">
		<SlideHeader eyebrow={method.eyebrow} title={method.title} description={method.description} />

		<ol
			class="grid grid-cols-1 gap-x-12 md:grid-cols-2 lg:grid-cols-3"
			{@attach useReveal({ targets: '.rule', stagger: 0.08, y: 16 })}
		>
			{#each method.rules as rule, index (rule.title)}
				<li class="rule flex flex-col gap-y-2 border-t py-6">
					<span class="font-mono text-xs text-brand tabular-nums">{pad(index + 1)}</span>
					<h3 class="text-xl">{rule.title}</h3>
					<p class="text-pretty text-muted-foreground">{rule.text}</p>
				</li>
			{/each}
		</ol>
	</div>
</DeckSlide>
