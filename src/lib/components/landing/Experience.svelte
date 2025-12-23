<script lang="ts">
	import type { Experience } from '$lib/content/content';
	import { getLabel } from '$lib/content/technology';
	import SkillBadge from './SkillBadge.svelte';

	type Props = {
		experience: Experience;
	};

	const { experience }: Props = $props();
</script>

<div class="relative flex flex-col gap-y-4 pl-8">
	<span class="font-mono text-sm leading-none font-medium text-muted-foreground"
		>{experience.date}</span
	>

	<div class="flex flex-col gap-y-1">
		<span class="text-lg font-semibold">{experience.role}</span>
		<span class="font-medium text-muted-foreground">{experience.company}</span>
	</div>

	<p class="max-w-2xl text-muted-foreground">
		{experience.description}
	</p>

	<div class="flex max-w-2xl flex-wrap gap-2">
		{#each experience.stack as tech}
			<SkillBadge {tech} />
		{/each}
	</div>

	<div
		class="absolute top-1 left-0 z-10 size-2.5 rounded-full bg-muted ring-4 ring-background"
	></div>
</div>
