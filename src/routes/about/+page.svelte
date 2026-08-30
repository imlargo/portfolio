<script lang="ts">
	import { Technology } from '$lib/assets/content/technology';
	import Cta from '$lib/components/common/Cta.svelte';
	import SocialIcon from '$lib/components/kit/social-icon/SocialIcon.svelte';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { content } from '$lib/assets/content/content';
	import { ArrowUpRight } from '@lucide/svelte';
</script>

<svelte:head>
	<title>About | {content.name}</title>
	<meta
		name="description"
		content="Juan Carlos Largo (@imlargo), senior software engineer and founder of Kora Studio, based in Medellín, Colombia."
	/>
</svelte:head>

<div class="max-w-wx grid gap-x-24 gap-y-12 lg:grid-cols-2">
	<div class="flex flex-col gap-y-8">
		<h2 class="ty-h1 font-mono">About me</h2>

		<div class="flex flex-col gap-y-4">
			<p class="max-w-prose text-pretty text-muted-foreground">
				Hi, I'm <span class="font-semibold text-foreground">Juan Carlos Largo</span> (<span
					class="ty-inlinecode">@imlargo</span
				>). Senior software engineer and founder of
				<span class="font-semibold text-foreground">Kora Studio</span>, based in Medellín, Colombia.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I build systems that go to production and stay there. 20+ shipped since 2023, all still
				running. I'm full-stack with architectural depth on both sides, working primarily with
				<SkillBadge class="inline-flex rounded-md bg-muted/50 py-0.5" tech={Technology.Go} />, <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Typescript}
				/> and <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Svelte}
				/>, across Go distributed backends, TypeScript frontends and AWS infrastructure.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Kora is a product and technology studio, not a software factory and not an agency. The
				conviction behind it is that software rarely fails because of how it was built, it fails
				because of what someone decided to build. So every engagement starts with understanding the
				business, and the first conversation is with the person who will write the code. 12+ systems
				delivered across construction, education, retail and the public sector, every client through
				referral, and we have never advertised.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Alongside that I lead frontend engineering at Unergy, a solar energy company, where I own
				the frontend architecture, lead a team of 4 engineers and am directing a progressive
				migration from Vue to Svelte. Before that I was the sole technical owner at Butter, an
				international content-generation SaaS I co-founded and took from zero to 1,000+ users, and
				the engineer behind a national gender-based-violence prevention platform serving 64+
				universities with Colombia's Ministry of Education.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				What I publish on GitHub comes out of that work: patterns pulled from real systems, cleaned
				up, and put back into the ones that needed them. If a library of mine exists, it's because I
				needed it three times first. That's where air, coral, medusa and a Web Push library for
				Gleam came from. Pegaso, a course scheduling platform for Universidad Nacional de Colombia,
				grew to 6,200+ users through entirely organic adoption and prompted formal acquisition
				discussions with the institution.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I care about small surfaces, sane defaults, and code that still reads well six months later.
				I'd rather own the whole thing than a slice of it. If you want to collaborate, talk about
				technology, or build something together, I'm always open to new connections.
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<Button href="mailto:{content.email}">Contact me</Button>
			<Button variant="secondary" href="https://kora.imlargo.dev" target="_blank">
				<span>Kora Studio</span>
				<ArrowUpRight class="size-4" />
			</Button>
		</div>
	</div>

	<div class="flex flex-col gap-y-4">
		<div class="relative aspect-square w-full overflow-hidden rounded-lg border-2">
			<img src="/assets/pfp.jpg" alt="" class="aspect-square h-full w-full object-cover" />
		</div>

		<div class="flex flex-wrap gap-2">
			<Button variant="secondary" size="icon" href={content.socials?.github} target="_blank">
				<SocialIcon platform="github" />
			</Button>

			<Button variant="secondary" size="icon" href={content.socials?.instagram} target="_blank">
				<SocialIcon platform="instagram" />
			</Button>

			<Button variant="secondary" size="icon" href={content.socials?.linkedin} target="_blank">
				<SocialIcon platform="linkedin" />
			</Button>
		</div>
	</div>
</div>

<Cta />
