<script lang="ts">
	import AnimatedBadge from '$lib/components/common/AnimatedBadge.svelte';
	import Cta from '$lib/components/common/Cta.svelte';
	import DotBackground from '$lib/components/kit/dot-background/DotBackground.svelte';
	import Experience from '$lib/components/landing/Experience.svelte';
	import Project from '$lib/components/landing/Project.svelte';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import * as Section from '$lib/components/kit/section';
	import { Button } from '$lib/components/ui/button';
	import { content } from '$lib/assets/content/content';
	import type { PageProps } from './$types';

	import { getLabel } from '$lib/assets/content/technology';
	import { ArrowRight, ArrowUpRight, Download } from '@lucide/svelte';
	import FeaturedProject from '$lib/components/landing/FeaturedProject.svelte';
	import SocialIcon from '$lib/components/kit/social-icon/SocialIcon.svelte';
	import Silk from '$lib/components/common/effects/silk/Silk.svelte';

	let { data }: PageProps = $props();
</script>

<div class="relative flex w-full items-center justify-center">
	<div
		class="pixel-canvas absolute h-full w-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-50"
	>
		<pixel-canvas
			data-gap="15"
			data-noanimate="1"
			data-speed="15"
			data-colors="#9810fa, #ad46ff, #dab2ff"
		></pixel-canvas>
	</div>

	<div class="max-w-wx z-10 flex w-full flex-col gap-y-12 py-24">
		<img src="/assets/pfp.jpg" alt="" class="size-18 rounded-full object-cover" />

		<div class="flex flex-col gap-y-4">
			<AnimatedBadge text={content.hero.badge}>
				<span
					class="size-1.5 shrink-0 rounded-full bg-purple-500 leading-0 ring-2 ring-purple-800 outline-2 outline-offset-2 outline-purple-900/50"
				></span>
			</AnimatedBadge>

			<h1 class="scroll-m-20 text-5xl font-extrabold tracking-tight text-balance">
				{content.hero.title}
			</h1>

			<p class="max-w-prose text-xl text-muted-foreground">
				{content.hero.description}
			</p>
		</div>

		<div class="flex items-center gap-x-2">
			<Button>Contactame</Button>

			<div class="mx-2 h-5 w-0.5 bg-muted"></div>

			<Button variant="secondary" size="icon">
				<SocialIcon platform="github" />
			</Button>

			<Button variant="secondary" size="icon">
				<SocialIcon platform="linkedin" />
			</Button>
		</div>
	</div>
</div>

<Section.Root class="max-w-wx relative">
	<div class="flex flex-col justify-between gap-x-2 gap-y-4 lg:flex-row lg:items-end">
		<Section.Header>
			<Section.Title>{content.experience.title}</Section.Title>
			<Section.Description>{content.experience.description}</Section.Description>
		</Section.Header>

		<Button class="max-w-max">
			<span>Curriculum</span>
			<Download class="size-4" />
		</Button>
	</div>

	<div class="flex flex-col divide-y border-b">
		{#each content.experience.items as experience}
			<Experience {experience} />
		{/each}
	</div>
</Section.Root>

<Section.Root class="max-w-wx relative">
	<div
		class="absolute inset-0 -z-50 h-full w-full [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]"
	>
		<Silk speed={5} scale={1} color={'#9810fa'} noiseIntensity={1.5} rotation={0} />
	</div>

	<Section.Header>
		<Section.Title>{content.work.title}</Section.Title>
		<Section.Description>{content.work.description}</Section.Description>
	</Section.Header>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		<div class="flex w-full items-center justify-between lg:col-span-2">
			<span class="w-full text-muted-foreground">Experimentos</span>
			<Button href="/work" variant="link" class="text-muted-foreground">
				<span>Ver todo</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		{#each content.work.projects as project}
			<Project {project} />
		{/each}
	</div>

	{#if content.work.work.length > 0}
		<div class="flex flex-col">
			<span class="w-full pb-4 text-muted-foreground">Mi trabajo</span>
			<div class="grid grid-cols-2 gap-x-8 gap-y-12">
				{#each content.work.work as project}
					<FeaturedProject {project} />
				{/each}
			</div>
		</div>
	{/if}
</Section.Root>

<Section.Root class="max-w-wx">
	<Section.Header>
		<Section.Title>{content.skills.title}</Section.Title>
		<Section.Description>{content.skills.description}</Section.Description>
	</Section.Header>

	<div class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-y-4">
			{#each Object.entries(content.skills.skills) as [category, skills]}
				<h3 class="text-muted-foreground">{category}</h3>
				<div class="flex flex-wrap gap-2">
					{#each skills as skill}
						<SkillBadge tech={skill} />
					{/each}
				</div>
			{/each}
		</div>
	</div>
</Section.Root>

<Cta />

<style>
	.line {
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
	}

	@keyframes beam {
		from {
			height: 0%;
		}

		to {
			height: 100%;
		}

		0% {
			height: 0%;
		}

		85% {
			height: 100%;
		}

		100% {
			height: 100%;
		}
	}

	.timeline {
		&::before {
			position: absolute;
			height: 100%;
			animation: beam ease both;
			animation-timeline: scroll();
			transition: all 0.3s ease;
			mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 95%, rgba(255, 255, 255, 0) 100%);
		}
	}
</style>
