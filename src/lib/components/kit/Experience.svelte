<script lang="ts">
	import type { Experience } from '$lib/constants/content';
	import { getLabel } from '$lib/types/technology';
	import SkillBadge from './SkillBadge.svelte';

	type Props = {
		experience: Experience;
	};

	const { experience }: Props = $props();
</script>

<div class="flex flex-col gap-y-4 border-y py-4">
	<span class="font-mono text-muted-foreground text-sm">{experience.date}</span>

	<div class="flex flex-col gap-y-2">
		<span class="font-semibold">{experience.role}</span>
		<span class="font-medium text-sm text-muted-foreground">{experience.company}</span>
	</div>

	<p class="max-w-prose">
		{experience.description}
	</p>

	<div class="flex flex-wrap gap-2 max-w-xl">
		{#each experience.stack as tech}
			<SkillBadge {tech} />
		{/each}
	</div>
</div>
