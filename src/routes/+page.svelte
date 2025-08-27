<script>
	import Hero from '$lib/components/home/Hero.svelte';
	import Experience from '$lib/components/kit/Experience.svelte';
	import { experience } from '$lib/constants/content';
</script>

<Hero />

<section class="flex flex-col gap-y-6">
	<h1 class="text-4xl font-semibold">Experiencia</h1>

	<div class="relative">
		<div class="flex flex-col gap-y-18 pl-8">
			{#each experience as exp}
			<Experience experience={exp} />
		{/each}
		</div>

		<div class="absolute h-full w-0.5 bg-muted rounded-full top-2 left-0">
		</div>
	</div>
</section>
