<script lang="ts">
	import type { Experience } from '$lib/constants/content';
	import { getLabel } from '$lib/types/technology';
	import SkillBadge from './SkillBadge.svelte';

	type Props = {
		experience: Experience;
	};

	const { experience }: Props = $props();
</script>

<div class="flex flex-col gap-y-4 relative">
	<span class="text-muted-foreground font-mono text-sm font-light">{experience.date}</span>

	<div class="flex flex-col gap-y-1">
		<span class="font-semibold">{experience.role}</span>
		<span class="text-muted-foreground text-sm font-medium">{experience.company}</span>
	</div>

	<p class="text-muted-foreground max-w-2xl">
		{experience.description}
	</p>

	<div class="flex max-w-2xl flex-wrap gap-2">
		{#each experience.stack as tech}
			<SkillBadge {tech} />
		{/each}
	</div>


	<div class="absolute rounded-full size-2.5 bg-muted top-1 -left-[2.25rem] z-10 ring-4 ring-background">

	</div>
</div>
