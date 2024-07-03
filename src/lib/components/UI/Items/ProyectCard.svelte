<script>
	const { title, link, repo, stack, children } = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>

<div class="container project-card px-7 py-7 rounded-lg">

	<h5 class="font-semibold text-lg">{title}</h5>

	<p class="text-base text-pretty text-slate-600 mt-2 mb-5">
		{@render children()}
	</p>

	<div class="flex gap-2 flex-wrap">
		{#each stack.split(",") as item}
			<Skill icon="{item.trim()}" />
		{/each}
	</div>

	<div class="flex justify-between mt-5">
		<a class="truncate text-slate-600 w-5/6" href={link} target="_blank">
			<i class="bi bi-link-45deg"></i>
			<span>{link.replace('https://', '')}</span>
		</a>

		{#if repo}
			<a href={repo} target="_blank">
				<i class="bi bi-github"></i>
			</a>
		{/if}
	</div>
</div>

<style lang="scss">
	.project-card {
		border: 1px #ffffff00 solid;
		transition: all 0.5s ease;

		border: 1px #ecd0ffcb solid;

		
		background: rgba(255, 255, 255, 0.904)
        radial-gradient(rgba(245, 203, 255, 0.712) 10%, transparent 1%);
    
      background-size: 7px 7px;
	}
</style>
