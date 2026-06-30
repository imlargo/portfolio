<script lang="ts">
	import { Technology } from '$lib/assets/content/technology';
	import AnimatedBadge from '$lib/components/common/AnimatedBadge.svelte';
	import Cta from '$lib/components/common/Cta.svelte';
	import SocialIcon from '$lib/components/kit/social-icon/SocialIcon.svelte';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="max-w-wx grid gap-x-24 gap-y-12 lg:grid-cols-2">
	<div class="flex flex-col gap-y-8">
		<h2 class="ty-h1 font-mono">About me</h2>

		<div class="flex flex-col gap-y-4">
			<p class="max-w-prose text-pretty text-muted-foreground">
				Hi, I'm <span class="font-semibold text-foreground">Juan Carlos Largo</span> (<span
					class="ty-inlinecode">@imlargo</span
				>). Senior software engineer and technical lead, based in Medellín, Colombia.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I'm full-stack with architectural depth on both sides. I work primarily with
				<SkillBadge class="inline-flex rounded-md bg-muted/50 py-0.5" tech={Technology.Go} />, <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Typescript}
				/> and <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Svelte}
				/>, and I've spent the past 3+ years building and leading production systems across Go
				distributed backends, TypeScript/Vue/Svelte frontends, and AWS cloud infrastructure.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I currently lead frontend engineering at Unergy, a solar energy company, where I own all
				frontend architecture decisions, lead a team of 4+ engineers, and am directing a progressive
				migration from Vue to Svelte across the company's platforms. Before that, I was the sole
				technical owner at Butter — an international content-generation SaaS I co-founded and took
				from zero to 1,000+ active users, owning architecture, infrastructure, and production
				operations end-to-end.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I also run <span class="font-semibold text-foreground">Kora Systems</span>, an engineering
				consultancy where I've delivered 5 production systems across 4 industries — all shipped to
				full production with zero ongoing supervision required. I'm equally comfortable as the sole
				engineer on a greenfield system or as the technical lead coordinating a team, defining
				standards, and raising the quality bar.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				On the side, I build tools and open-source projects. Pegaso — a course scheduling platform
				for Universidad Nacional de Colombia — reached 6,200+ active users through entirely organic
				adoption and prompted formal acquisition discussions with the institution. I also contribute
				to open-source projects including Svelte core, Gin, and shadcn/ui, and published a webpush
				library for the Gleam ecosystem.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				If you're interested in collaborating, talking about technology, or building something
				together, I'm always open to new connections.
			</p>
		</div>
	</div>

	<div class="flex flex-col gap-y-4">
		<div class="relative aspect-square w-full overflow-hidden rounded-lg border-2">
			<img src="/assets/pfp.jpg" alt="" class="aspect-square h-full w-full object-cover" />
		</div>

		<div class="flex flex-wrap gap-2">
			<Button variant="secondary" size="icon">
				<SocialIcon platform="github" />
			</Button>

			<Button variant="secondary" size="icon">
				<SocialIcon platform="instagram" />
			</Button>

			<Button variant="secondary" size="icon">
				<SocialIcon platform="linkedin" />
			</Button>
		</div>
	</div>
</div>

<Cta />
