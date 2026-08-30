<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { Technology } from '$lib/content/technology';
	import { SkillBadge } from '$lib/components/cards';
	import { Button } from '$lib/components/ui/button';
	import SocialIcon from '$lib/components/common/SocialIcon.svelte';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { ArrowUpRight } from '@lucide/svelte';

	const { about, socials, email } = siteContent;

	// Las insignias van dentro del párrafo, no en una fila aparte: la tecnología
	// se nombra donde se está hablando de ella. Por eso esta prosa vive en el
	// componente y no en el módulo de contenido, que es solo texto plano.
	const inlineBadge = 'inline-flex rounded-md bg-muted/50 py-0.5';
</script>

<Section.Root spacing="hero">
	<div class="grid gap-x-24 gap-y-12 lg:grid-cols-2">
		<div class="flex flex-col gap-y-8">
			<h1 class="ty-h1 font-mono">{about.title}</h1>

			<div class="flex flex-col gap-y-4" {@attach useReveal({ targets: 'p', stagger: 0.08 })}>
				<p class="max-w-prose text-pretty text-muted-foreground">
					Hi, I'm <span class="text-foreground">Juan Carlos Largo</span> (<span
						class="ty-inlinecode">@imlargo</span
					>). Senior software engineer and founder of
					<span class="text-foreground">Kora Studio</span>, based in Medellín, Colombia.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					I build systems that go to production and stay there. 20+ shipped since 2023, all still
					running. Mostly
					<SkillBadge class={inlineBadge} tech={Technology.Go} />,
					<SkillBadge class={inlineBadge} tech={Technology.Typescript} /> and
					<SkillBadge class={inlineBadge} tech={Technology.Svelte} />, full-stack with architectural
					depth on both sides.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					Kora is a product and technology studio, not an agency. Software rarely fails because of
					how it was built, it fails because of what someone decided to build, so every engagement
					starts with understanding the business. 12+ systems delivered, every client by referral.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					Alongside that I lead frontend engineering at Unergy, a solar energy company. Before that
					I was the sole technical owner at Butter, a content-generation SaaS I co-founded and took
					to 1,000+ users, and the engineer behind a national gender-based-violence prevention
					platform serving 64+ universities.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					What I publish comes out of that work. If a library of mine exists, it's because I needed
					it three times first: air, coral, medusa, Web Push for Gleam. Pegaso, a course scheduling
					platform for Universidad Nacional de Colombia, grew to 6,200+ users with no advertising.
				</p>

				<p class="max-w-prose text-pretty text-muted-foreground">
					I care about small surfaces, sane defaults, and code that still reads well six months
					later. I'd rather own the whole thing than a slice of it.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-2">
				<Button href="mailto:{email}">Contact me</Button>
				<Button variant="outline" href={socials.kora} target="_blank" rel="noopener noreferrer">
					<span>Kora Studio</span>
					<ArrowUpRight class="size-4" />
				</Button>
			</div>
		</div>

		<div class="flex flex-col gap-y-4">
			<div class="relative aspect-square w-full overflow-hidden rounded-4xl border">
				<img src="/assets/pfp.jpg" alt="" class="aspect-square h-full w-full object-cover" />
			</div>

			<div class="flex flex-wrap gap-2">
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
					href={socials.instagram}
					target="_blank"
					aria-label="Instagram"
				>
					<SocialIcon platform="instagram" />
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
</Section.Root>
