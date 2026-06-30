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
				>). Full stack software engineer and digital product builder.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I specialize in designing, developing, and operating scalable web applications end-to-end:
				from architecture and infrastructure, through backend and frontend, all the way to user
				experience and business logic. I work primarily with
				<SkillBadge class="inline-flex rounded-md bg-muted/50 py-0.5" tech={Technology.Go} />, <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Typescript}
				/> and <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Svelte}
				/>, and I enjoy building systems that not only work well, but solve real problems in a clear
				and sustainable way.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Throughout my career I have led the complete product development cycle in different contexts:
				from internationally-reaching SaaS platforms, to mission-critical internal systems for the
				Universidad Nacional de Colombia, as well as freelance projects and startup collaborations. I
				feel comfortable taking technical ownership, managing complex integrations, resolving
				production incidents, and translating business needs into well-thought-out, scalable
				technical solutions.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				I also dedicate a significant portion of my time to building side projects and open-source
				tools. Among them, Pegaso stands out — a platform used by thousands of students to ease the
				creation of academic schedules — and CopyWhisper, an AI-powered application to analyze and
				improve the copywriting of web pages, recognized as a featured project at a Vercel/Midudev
				hackathon. I often build libraries, templates, and tools based on real needs I encounter in
				my day-to-day work as a developer, with the goal of learning and contributing to the
				community.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Beyond code, I firmly believe that software development is a modern form of "making magic":
				turning abstract ideas into systems that create impact. I'm interested in understanding the
				product as a whole, collaborating closely with business teams, and always maintaining a
				practical, clear, and value-oriented approach.
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
