<script>
	const { cargo, fecha, stack, children } = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>


<li class="relative pl-7 before:absolute">
	<div class="flex flex-col flex-1 gap-2">
		<h5 class="font-semibold">{cargo}</h5>
		<span class="text-sm text-gray-500 font-mono">{fecha}</span>
		<div class="mt-1 mb-4 text-pretty text-base text-slate-800">
			{@render children()}
		</div>
		
		<div class="flex gap-2">
			{#each stack.split(",") as item}
				<Skill icon="{item.trim()}" />
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
			background-color: rgb(192, 55, 255);
			box-shadow: var(--tw-ring-inset) 0 0 0 calc(0.2rem + var(--tw-ring-offset-width))
				rgb(255 255 255);
		}
	}
</style>
