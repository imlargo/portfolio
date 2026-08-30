<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { SkillBadge } from '$lib/components/cards';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';

	const { skills } = siteContent;
</script>

<Section.Root>
	<Section.Header>
		<Section.Title>{skills.title}</Section.Title>
		<Section.Description>{skills.description}</Section.Description>
	</Section.Header>

	<div
		class="flex flex-col gap-y-4"
		{@attach useReveal({ targets: '.skill-group', stagger: 0.08 })}
	>
		{#each Object.entries(skills.groups) as [category, items] (category)}
			<div class="skill-group flex flex-col gap-y-4">
				<h3
					class="font-mono text-sm tracking-[var(--tracking-mono)] text-muted-foreground uppercase"
				>
					{category}
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each items as tech (tech)}
						<SkillBadge {tech} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Section.Root>
