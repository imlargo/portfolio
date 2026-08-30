<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { ProjectCard } from '$lib/components/cards';
	import { Button } from '$lib/components/ui/button';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { ArrowUpRight } from '@lucide/svelte';

	const { side } = siteContent.workPage;
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{side.title}</Section.Title>
		<Section.Description>{side.description}</Section.Description>
	</Section.Header>

	<ul
		class="grid grid-cols-1 gap-2 lg:grid-cols-2"
		{@attach useReveal({ targets: '.project', stagger: 0.09, y: 32 })}
	>
		{#each side.projects as project (project.title)}
			<li class="h-full"><ProjectCard {project} /></li>
		{/each}
	</ul>

	<div class="flex justify-start">
		<Button
			variant="outline"
			href={siteContent.socials.github}
			target="_blank"
			rel="noopener noreferrer"
		>
			<span>More on GitHub</span>
			<ArrowUpRight class="size-4" />
		</Button>
	</div>
</Section.Root>
