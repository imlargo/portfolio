<script>
	const { title, link, repo, stack, children } = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>

<div class="container project-card px-8 py-8 rounded-lg">
	<a
		class="font-semibold text-lg hover:underline hover:decoration-dotted hover:underline-offset-4 hover:decoration-zinc-500"
		href={link} target="_blank">{title}</a
	>

	<p class="text-base text-pretty text-zinc-400 mt-2 mb-6">
		{@render children()}
	</p>

	<div class="flex gap-2 flex-wrap">
		{#each stack.split(',') as item}
			<Skill icon={item.trim()} />
		{/each}
	</div>

	<div class="flex justify-between mt-6">
		<a class="truncate text-zinc-400 w-5/6" href={link} target="_blank">
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
		transition: all 0.5s ease;
		border: 1px rgba(121, 121, 121, 0.2) solid;
		background: rgb(255, 255, 255, 0.01) radial-gradient(rgb(255, 255, 255, 0.05) 10%, transparent 1%);
		background-size: 7px 7px;
	}
</style>
