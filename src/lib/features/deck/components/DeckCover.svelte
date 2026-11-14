<script lang="ts">
	import PixelBlast from '$lib/components/effects/pixel/PixelBlast.svelte';
	import PixelIcon from '$lib/components/effects/pixel/PixelIcon.svelte';
	import HeroBadge from '$lib/features/home/components/hero/HeroBadge.svelte';
	import DeckSlide from './DeckSlide.svelte';
	import type { PixelIconMatrix } from '$lib/components/effects/pixel/pixelIcons';
	import { useReveal } from '$lib/attachments/reveal';
	import { useSplitTitle } from '$lib/attachments/split-title';

	type Props = {
		badge: string;
		title: string;
		description: string;
		/** Las partes de la presentación: la agenda de la portada salta a cada una. */
		parts: readonly { id: string; index: string; label: string; icon: PixelIconMatrix }[];
	};

	const { badge, title, description, parts }: Props = $props();
</script>

<!-- El mismo montaje que la portada de Kora: el canvas ocupa solo la zona que
     el texto no usa, y la agenda es también el índice de la presentación. -->
<DeckSlide>
	{#snippet backdrop()}
		<div
			class="absolute top-1/2 right-0 bottom-0 left-0 md:top-0 md:left-[45%]"
			{@attach useReveal({ scale: 1.06, y: 0, duration: 1.4 })}
		>
			<PixelBlast antialias={false} maxPixelRatio={1}></PixelBlast>
		</div>
	{/snippet}

	<div
		class="relative z-10 flex flex-col gap-y-8"
		{@attach useReveal({ targets: '.cover-item', stagger: 0.12 })}
	>
		<HeroBadge class="cover-item">{badge}</HeroBadge>

		<h1 class="max-w-4xl text-4xl md:text-6xl" {@attach useSplitTitle(0.15)}>
			{title}
		</h1>

		<p class="cover-item max-w-prose text-lg text-pretty text-muted-foreground">
			{description}
		</p>

		<ol class="cover-item mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t pt-6 md:max-w-2xl">
			{#each parts as part (part.id)}
				<li>
					<a
						href="#{part.id}"
						class="group flex items-center gap-x-3 text-white/80 transition-colors duration-300 hover:text-white"
					>
						<PixelIcon matrix={part.icon} class="size-4" />
						<span class="underline-offset-4 group-hover:underline">{part.label}</span>
						<span class="font-mono text-xs text-muted-foreground">{part.index}</span>
					</a>
				</li>
			{/each}
		</ol>
	</div>
</DeckSlide>
