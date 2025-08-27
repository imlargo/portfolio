<script lang="ts">
	import type { Project } from '$lib/constants/content';
	import SkillBadge from './SkillBadge.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Link, Github } from '@lucide/svelte';

	type Props = {
		project: Project;
	};
	const { project }: Props = $props();
</script>

<div class="bg-card/50 flex flex-col justify-between gap-y-8 rounded-lg border p-6">
	<div class="flex flex-col gap-y-2">
		<h5 class="font-semibold">{project.title}</h5>
		<p class="text-muted-foreground text-pretty">
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
					class="flex max-w-max items-center justify-center gap-2 truncate px-0 text-zinc-400"
					variant="link"
					href={project.url}
					target="_blank"
				>
					<Link class="size-4" />
					<span>{project.url.replace('https://', '')}</span>
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
