<script>
	import { experience } from "$lib/constants/content";
	import Experience from "../kit/Experience.svelte";

</script>
<div class="relative">
		<div class="flex flex-col gap-y-18 pl-8">
			{#each experience as exp}
			<Experience experience={exp} />
		{/each}
		</div>

		<div class="absolute h-full w-0.5 bg-muted rounded-full top-2 left-0 line">
		</div>
	</div>


<style>
	.line {
		mask-image: linear-gradient(180deg,rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
	}
</style>