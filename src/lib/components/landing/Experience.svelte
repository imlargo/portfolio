<script lang="ts">
	import type { Experience } from '$lib/content/content';
	import { getLabel } from '$lib/content/technology';
	import SkillBadge from './SkillBadge.svelte';

	type Props = {
		experience: Experience;
	};

	const { experience }: Props = $props();
</script>

<div class="items-top flex flex-col gap-y-4 py-8 lg:grid lg:grid-cols-3">
	<span class="font-mono text-sm leading-none font-medium text-muted-foreground"
		>{experience.date}</span
	>

	<div class="flex w-full flex-col gap-y-4">
		<div class="flex flex-col gap-y-1">
			<span class="text-lg font-semibold">{experience.role}</span>

			<div class="font-mono text-sm leading-none font-medium text-muted-foreground lg:hidden">
				{experience.company}
			</div>
		</div>

		<p class="w-full text-muted-foreground">
			{experience.description}
		</p>

		<div class="flex w-full flex-wrap gap-2">
			{#each experience.stack as tech}
				<SkillBadge {tech} />
			{/each}
		</div>
	</div>

	<div
		class="hidden text-end font-mono text-sm leading-none font-medium text-muted-foreground lg:block"
	>
		{experience.company}
	</div>
</div>
