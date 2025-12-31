<script lang="ts">
	import type { Project } from '$lib/content/content';
	import SkillBadge from './SkillBadge.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Link, Github } from '@lucide/svelte';

	type Props = {
		project: Project;
	};
	const { project }: Props = $props();
</script>

<div class="flex flex-col gap-y-4">
	<img src="/images/pegaso.png" alt="" class="aspect-video w-full rounded-lg object-cover" />

	<div class="flex flex-col gap-y-2">
		<h5 class="font-semibold">{project.title}</h5>
		<p class="text-pretty text-muted-foreground">
			{project.description}
		</p>
	</div>
</div>
