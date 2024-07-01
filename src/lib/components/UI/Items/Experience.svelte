<script>
	const { cargo, fecha, stack, children } = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>


<li class="relative pl-7 before:absolute">
	<div class="flex flex-col flex-1 gap-2">
		<h3 class="font-semibold mb-1">{cargo}</h3>
		<span class="font-light text-sm font-mono">{fecha}</span
		>
		<div class="my-2 text-justify text-base text-slate-800">
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
			background-color: #b820ff;
			box-shadow: var(--tw-ring-inset) 0 0 0 calc(0.2rem + var(--tw-ring-offset-width))
				rgb(255 255 255);
		}
	}
</style>
