<script lang="ts">
	import type { Experience } from '$lib/constants/content';
	import { getLabel } from '$lib/types/technology';
	import SkillBadge from './SkillBadge.svelte';

	type Props = {
		experience: Experience;
	};

	const { experience }: Props = $props();
</script>

<div class="flex flex-col gap-y-4">
	<span class="text-muted-foreground font-mono font-light text-sm">{experience.date}</span>

	<div class="flex flex-col gap-y-1">
		<span class="font-semibold">{experience.role}</span>
		<span class="text-muted-foreground text-sm font-medium">{experience.company}</span>
	</div>

	<p class="max-w-2xl text-muted-foreground">
		{experience.description}
	</p>

	<div class="flex max-w-2xl flex-wrap gap-2">
		{#each experience.stack as tech}
			<SkillBadge {tech} />
		{/each}
	</div>
</div>
