<script lang="ts">
	import type { Project } from '$lib/assets/content/types';
	import SkillBadge from './SkillBadge.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Link, Github } from '@lucide/svelte';

	type Props = {
		project: Project;
	};
	const { project }: Props = $props();
</script>

<div class="project flex flex-col justify-between gap-y-8 rounded-lg border bg-card/50 p-6">
	<div class="flex flex-col gap-y-2">
		<h5 class="font-semibold">{project.title}</h5>
		<p class="text-pretty text-muted-foreground">
			{project.description}
		</p>
	</div>

	<div class="flex flex-col gap-y-4">
		<div class="flex flex-wrap gap-2">
			{#each project.technologies as item}
				<SkillBadge tech={item} />
			{/each}
		</div>

		<div class="flex w-full items-center justify-between overflow-hidden">
			{#if project.url}
				<Button
					class="flex items-center justify-start gap-2 px-0 text-zinc-400 has-[>svg]:px-0 max-w-xs"
					variant="link"
					href={project.url}
					target="_blank"
				>
					<Link class="size-4" />
					<span class="truncate">{project.url.replace('https://', '')}</span>
				</Button>
			{:else}
				<span></span>
			{/if}

			{#if project.github}
				<Button href={project.github} target="_blank" variant="outline" size="icon">
					<Github class="size-4" />
				</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	.project {
		overflow: hidden;
		position: relative;
		transition: all 0.3s ease;

		--top: -25%;
		--right: -20%;

		&:hover {
			&::before {
				background: rgba(179, 86, 255, 0.3);
			}
		}

		&::before {
			content: '';
			position: absolute;
			top: var(--top);
			right: var(--right);
			aspect-ratio: 1/1;
			height: 100%;
			width: auto;
			z-index: -7;
			border-radius: 999%;
			filter: blur(45px);

			background: rgba(179, 86, 255, 0.2);
			transition: all 0.3s ease;
		}

		&::after {
			content: '';
			position: absolute;
			top: var(--top);
			right: var(--right);
			aspect-ratio: 1/1;
			height: 100%;
			width: auto;
			border-radius: 999%;

			background-image: url('/assets/noise.webp');
			background-size: 30%;
			mix-blend-mode: overlay;
			opacity: 0.6;
			z-index: -1;

			mask-image: radial-gradient(#fff, transparent 75%);
		}
	}
</style>
