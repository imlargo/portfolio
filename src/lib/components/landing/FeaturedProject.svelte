<script lang="ts">
	import type { Project } from '$lib/content/content';
	import SkillBadge from './SkillBadge.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Link, Github } from '@lucide/svelte';

	type Props = {
		project: Project;
	};
	const { project }: Props = $props();
</script>

<div class="grid grid-cols-12 gap-x-8">
	<img src="/images/pegaso.png" alt="" class="object-cover rounded-lg col-span-6 aspect-video" />

	<div class="flex flex-col justify-between gap-y-8 col-span-6">
		<div class="flex flex-col gap-y-2">
			<h5 class="font-semibold">{project.title}</h5>
			<p class="text-pretty text-muted-foreground">
				{project.description}
			</p>

            <div class="flex flex-wrap gap-2">
				{#each project.technologies as item}
					<SkillBadge tech={item} />
				{/each}
			</div>
		</div>

		<div class="flex flex-col gap-y-4">
			<div class="flex w-full items-center justify-between overflow-hidden">
				{#if project.url}
					<Button
						class="flex max-w-max items-center justify-center gap-2 truncate px-0 text-zinc-400 has-[>svg]:px-0"
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
</div>
