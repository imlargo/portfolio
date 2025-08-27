<script>
	import { Technology } from '$lib/types/technology';
	import SkillBadge from '../kit/SkillBadge.svelte';
</script>

<section class="flex flex-col gap-y-6">
	<h1 class="text-4xl font-semibold">Tecnologias y Habilidades</h1>

	<div class="flex flex-wrap gap-2">
		{#each Object.values(Technology).filter((v) => typeof v === 'number') as tech}
			<span>
				<SkillBadge {tech} />
			</span>
		{/each}
	</div>
</section>
