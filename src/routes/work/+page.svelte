<script lang="ts">
	import { content } from '$lib/assets/content/content';
	import Cta from '$lib/components/common/Cta.svelte';
	import * as Section from '$lib/components/kit/section';
	import Project from '$lib/components/landing/Project.svelte';
	import WorkRow from '$lib/components/work/WorkRow.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowUpRight } from '@lucide/svelte';

	const { title, description, stats, groups, side } = content.workPage;
</script>

<svelte:head>
	<title>{title} | {content.name}</title>
	<meta name="description" content={description} />
</svelte:head>

<Section.Root class="max-w-wx pt-8">
	<Section.Header>
		<h1 class="ty-h1 font-mono">{title}</h1>
		<Section.Description>{description}</Section.Description>
	</Section.Header>

	<div class="grid grid-cols-1 gap-6 border-y py-8 sm:grid-cols-3">
		{#each stats as stat}
			<div class="flex flex-col gap-y-1">
				<span class="text-3xl font-bold tracking-tight">{stat.value}</span>
				<span class="text-sm text-muted-foreground">{stat.label}</span>
			</div>
		{/each}
	</div>
</Section.Root>

{#each groups as group}
	<Section.Root class="max-w-wx">
		<Section.Header>
			<Section.Title>{group.title}</Section.Title>
			<Section.Description>{group.description}</Section.Description>
		</Section.Header>

		<div class="flex flex-col divide-y border-b">
			{#each group.items as item}
				<WorkRow {item} />
			{/each}
		</div>
	</Section.Root>
{/each}

<Section.Root class="max-w-wx">
	<Section.Header>
		<Section.Title>{side.title}</Section.Title>
		<Section.Description>{side.description}</Section.Description>
	</Section.Header>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		{#each side.projects as project}
			<Project {project} />
		{/each}
	</div>

	<div class="flex justify-start">
		<Button variant="secondary" href={content.socials?.github} target="_blank">
			<span>More on GitHub</span>
			<ArrowUpRight class="size-4" />
		</Button>
	</div>
</Section.Root>

<Cta />
