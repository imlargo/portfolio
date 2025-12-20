<script lang="ts">
	import type { Experience } from '$lib/content/content';
	import { getLabel } from '$lib/content/technology';
	import SkillBadge from './SkillBadge.svelte';

	type Props = {
		experience: Experience;
	};

	const { experience }: Props = $props();
</script>

<div class="relative flex flex-col gap-y-4">
	<span class="text-muted-foreground font-mono text-sm leading-none font-medium">{experience.date}</span>

	<div class="flex flex-col gap-y-1">
		<span class="text-lg font-semibold">{experience.role}</span>
		<span class="text-muted-foreground font-medium">{experience.company}</span>
	</div>

	<p class="text-muted-foreground max-w-2xl">
		{experience.description}
	</p>

	<div class="flex max-w-2xl flex-wrap gap-2">
		{#each experience.stack as tech}
			<SkillBadge {tech} />
		{/each}
	</div>

	<div
		class="bg-muted ring-background absolute -left-[2.25rem] top-1 z-10 size-2.5 rounded-full ring-4"
	></div>
</div>