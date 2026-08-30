<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { ProjectCard } from '$lib/components/cards';
	import { Button } from '$lib/components/ui/button';
	import { siteContent, projects } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { ArrowRight } from '@lucide/svelte';

	const block = siteContent.home.work;
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{block.title}</Section.Title>
		<Section.Description>{block.description}</Section.Description>
	</Section.Header>

	<div class="flex flex-col gap-4">
		<div class="flex w-full items-center justify-between">
			<span class="w-full text-muted-foreground">My projects</span>
			<Button href={block.cta.href} variant="link" class="text-muted-foreground">
				<span>{block.cta.label}</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>

		<ul
			class="grid grid-cols-1 gap-4 lg:grid-cols-2"
			{@attach useReveal({ targets: '.project', stagger: 0.09, y: 32 })}
		>
			{#each projects as project (project.title)}
				<li class="h-full"><ProjectCard {project} /></li>
			{/each}
		</ul>
	</div>
</Section.Root>
