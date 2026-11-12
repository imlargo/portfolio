<script lang="ts">
	import { ArrowUpRight, FileUser } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import { webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { useCounter } from '$lib/attachments/counter';

	const { speaker } = webIntroMeta;
	const { socials } = siteContent;
	// La hoja de vida es la misma del hero de la home.
	const resume = siteContent.home.hero.secondaryCta.href;
</script>

<!-- Dos columnas y nada más: a la izquierda quién soy, a la derecha tres
     números que lo respaldan. -->
<DeckSlide>
	<div class="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-end">
		<div
			class="flex flex-col gap-y-6 lg:col-span-7"
			{@attach useReveal({ targets: '.speaker-item', stagger: 0.1 })}
		>
			<!-- El reveal anima el filtro del elemento que entra, así que el gris va en la imagen de adentro. -->
			<span class="speaker-item">
				<img
					src={speaker.portrait}
					alt={siteContent.fullName}
					class="size-20 rounded-2xl object-cover grayscale"
				/>
			</span>
			<div class="speaker-item flex flex-col gap-y-3">
				<SectionIndicator>{speaker.eyebrow}</SectionIndicator>
				<h2 class="text-4xl text-balance md:text-6xl">{siteContent.fullName}</h2>
				<span class="font-mono text-muted-foreground">@{siteContent.name}</span>
			</div>
			<p class="speaker-item max-w-xl text-lg text-pretty text-muted-foreground">{speaker.bio}</p>
			<div class="speaker-item flex flex-wrap gap-2">
				<Button href={socials.linkedin} target="_blank" rel="noopener">
					{speaker.linkedinLabel}
					<ArrowUpRight />
				</Button>
				<Button variant="outline" href={socials.github} target="_blank" rel="noopener">
					{speaker.githubLabel}
					<ArrowUpRight />
				</Button>
				<Button variant="ghost" href={resume} target="_blank" rel="noopener">
					<FileUser />
					{speaker.resumeLabel}
				</Button>
			</div>
		</div>

		<dl
			class="flex flex-col divide-y border-y lg:col-span-4 lg:col-start-9"
			{@attach useReveal({ targets: '.speaker-fact', stagger: 0.1, y: 16, delay: 0.2 })}
		>
			{#each speaker.facts as fact (fact.label)}
				<div class="speaker-fact flex flex-col gap-y-1 py-6">
					<dd class="text-5xl tabular-nums" {@attach useCounter(fact.value)}>{fact.value}</dd>
					<dt class="text-pretty text-muted-foreground">{fact.label}</dt>
				</div>
			{/each}
		</dl>
	</div>
</DeckSlide>
