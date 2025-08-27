<script>
	import { experience } from '$lib/constants/content';
	import Experience from '../kit/Experience.svelte';
</script>

<div class="relative">
	<div class="gap-y-18 flex flex-col pl-8">
		{#each experience as exp}
			<Experience experience={exp} />
		{/each}
	</div>

	<div class="bg-muted line absolute left-0 top-2 h-full w-0.5 rounded-full"></div>
</div>

<style>
	.line {
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
	}
</style>
