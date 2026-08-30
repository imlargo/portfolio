<script lang="ts">
	import PixelBlast from '$lib/components/effects/pixel/PixelBlast.svelte';
	import { Button } from '$lib/components/ui/button';
	import SocialIcon from '$lib/components/common/SocialIcon.svelte';
	import HeroBadge from './HeroBadge.svelte';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { useSplitTitle } from '$lib/attachments/split-title';
	import { ArrowUpRight } from '@lucide/svelte';

	const { hero } = siteContent.home;
	const { socials, fullName } = siteContent;
</script>

<section class="px-layout py-hero relative flex w-full flex-col items-center">
	<!-- El canvas se confina al área que el texto no usa —la mitad de abajo en
	     móvil, la mitad derecha desde md— en vez de cubrir el hero y taparse con
	     una máscara encima. Todo lo que se pinta sobre un canvas que se redibuja
	     cada frame hay que volver a mezclarlo cada frame; sacarlo de debajo del
	     texto elimina ese costo y ahorra la mitad de los fragmentos. -->
	<div
		class="absolute top-1/2 right-0 bottom-0 left-0 md:top-0 md:left-[45%]"
		aria-hidden="true"
		{@attach useReveal({ scale: 1.06, y: 0, duration: 1.4 })}
	>
		<PixelBlast antialias={false} maxPixelRatio={1}></PixelBlast>
	</div>

	<div class="max-w-wx relative z-10 flex w-full flex-col">
		<div
			class="flex flex-col gap-y-12"
			{@attach useReveal({ targets: '.hero-item', stagger: 0.12 })}
		>
			<img
				src="/assets/pfp.jpg"
				alt={fullName}
				class="hero-item size-18 rounded-full object-cover"
			/>

			<div class="flex flex-col gap-y-4">
				<HeroBadge class="hero-item">{hero.badge}</HeroBadge>

				<h1 class="ty-h1 max-w-3xl text-5xl" {@attach useSplitTitle(0.15)}>
					{hero.title}
				</h1>

				<p class="hero-item max-w-prose text-xl text-pretty text-muted-foreground">
					{hero.description}
				</p>
			</div>

			<div class="hero-item flex flex-wrap items-center gap-x-2 gap-y-3">
				<Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>

				<Button
					variant="outline"
					href={hero.secondaryCta.href}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span>{hero.secondaryCta.label}</span>
					<ArrowUpRight class="size-4" />
				</Button>

				<div class="mx-2 h-5 w-px bg-border"></div>

				<Button
					variant="outline"
					size="icon"
					href={socials.instagram}
					target="_blank"
					aria-label="Instagram"
				>
					<SocialIcon platform="instagram" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					href={socials.github}
					target="_blank"
					aria-label="GitHub"
				>
					<SocialIcon platform="github" />
				</Button>

				<Button
					variant="outline"
					size="icon"
					href={socials.linkedin}
					target="_blank"
					aria-label="LinkedIn"
				>
					<SocialIcon platform="linkedin" />
				</Button>
			</div>
		</div>
	</div>
</section>
