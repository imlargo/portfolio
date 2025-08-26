<script>
	import Hero from '$lib/components/home/Hero.svelte';
	import Experience from '$lib/components/kit/Experience.svelte';
	import { experience } from '$lib/constants/content';
</script>

<Hero />

<section class="flex flex-col gap-y-6">
	<h1 class="text-4xl font-semibold">Experiencia</h1>

	{#each experience as exp}
		<Experience experience={exp} />
	{/each}
</section>
