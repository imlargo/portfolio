<script lang="ts">
	import { ArrowLeft, ArrowUpRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import PixelBlast from '$lib/components/effects/pixel/PixelBlast.svelte';
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import { webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { useSplitTitle } from '$lib/attachments/split-title';

	type Props = {
		/** La lista de charlas, a donde vuelve el botón del cierre. */
		backHref: string;
	};

	const { backHref }: Props = $props();

	const { closing } = webIntroMeta;

	const HREF: Record<(typeof closing.links)[number]['key'], string> = {
		linkedin: siteContent.socials.linkedin,
		github: siteContent.socials.github,
		site: siteContent.seo.siteUrl,
		email: `mailto:${siteContent.email}`
	};
</script>

<!-- El cierre repite el montaje de la portada, con el canvas a la derecha:
     la presentación termina donde empezó. -->
<DeckSlide>
	{#snippet backdrop()}
		<div
			class="absolute top-1/2 right-0 bottom-0 left-0 md:top-0 md:left-[50%]"
			{@attach useReveal({ scale: 1.06, y: 0, duration: 1.4 })}
		>
			<PixelBlast antialias={false} maxPixelRatio={1}></PixelBlast>
		</div>
	{/snippet}

	<div
		class="relative z-10 flex flex-col gap-y-8"
		{@attach useReveal({ targets: '.closing-item', stagger: 0.12 })}
	>
		<SectionIndicator class="closing-item">{closing.eyebrow}</SectionIndicator>
		<h2 class="max-w-3xl text-4xl md:text-6xl lg:text-7xl" {@attach useSplitTitle(0.1)}>
			{closing.title}
		</h2>
		<p class="closing-item max-w-prose text-lg text-pretty text-muted-foreground">
			{closing.description}
		</p>
		<ul class="closing-item flex flex-wrap gap-2">
			{#each closing.links as link (link.key)}
				<li>
					<Button variant="outline" href={HREF[link.key]} target="_blank" rel="noopener noreferrer">
						{link.label}
						<ArrowUpRight />
					</Button>
				</li>
			{/each}
		</ul>
		<a
			href={backHref}
			class="closing-item flex w-fit items-center gap-x-2 text-sm text-white/70 transition-colors hover:text-white"
		>
			<ArrowLeft class="size-4" />
			{closing.backLabel}
		</a>
	</div>
</DeckSlide>
