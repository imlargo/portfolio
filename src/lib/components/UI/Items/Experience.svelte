<script>
	const { cargo, fecha, lugar, stack, children } = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>

<li class="relative pl-7 before:absolute">
	<div class="flex flex-1 flex-col">
		<span class="font-mono text-sm text-zinc-500">{fecha}</span>

		<h5 class="mt-3 font-medium text-zinc-200">{cargo}</h5>
		<span class="text-sm text-zinc-500">{lugar}</span>

		<div class="my-4 text-pretty text-base text-zinc-400">
			{@render children()}
		</div>

		<div class="flex gap-2">
			{#each stack.split(',') as item}
				<Skill icon={item.trim()} />
			{/each}
		</div>
	</div>
</li>

<style lang="scss">
	li {
		&::before {
			position: absolute;
			z-index: 10;
			left: 0px;
			top: 0.5rem;
			height: 0.5rem;
			width: 0.5rem;
			transform: translateX(-50%);
			border-radius: 9999px;
			background-color: #2b2b2b;
			box-shadow: var(--tw-ring-inset) 0 0 0 calc(0.3rem + var(--tw-ring-offset-width)) #171719;
		}
	}
</style>
