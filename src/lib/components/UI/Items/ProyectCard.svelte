<script>
	const { title, link, repo, stack, children } = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>

<div class="container project-card px-8 py-8 rounded-xl">

	<h5 class="font-semibold text-lg">{title}</h5>

	<p class="text-base text-pretty text-zinc-400 mt-2">
		{@render children()}
	</p>

	<div class="flex gap-2 flex-wrap my-7">
		{#each stack.split(',') as item}
			<Skill icon={item.trim()} />
		{/each}
	</div>

	<div class="flex justify-between">
		<a class="truncate text-zinc-400 w-9/12 " href={link} target="_blank">
			<i class="bi bi-link-45deg"></i>
			<span class="hover:underline hover:decoration-dotted hover:underline-offset-4 hover:decoration-zinc-400">{link.replace('https://', '')}</span>
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
		transition: all 0.3s ease;
		border: 1px rgba(121, 121, 121, 0.2) solid;
		background: rgb(255, 255, 255, 0.01)
			radial-gradient(rgb(255, 255, 255, 0.03) 10%, transparent 1%);
		background-size: 7px 7px;

		&:hover {
			border: 1px rgba(121, 121, 121, 0.5) solid;
			background: rgb(255, 255, 255, 0.05)
				radial-gradient(rgb(255, 255, 255, 0.03) 10%, transparent 1%);
			background-size: 7px 7px;
		}
	}
</style>
