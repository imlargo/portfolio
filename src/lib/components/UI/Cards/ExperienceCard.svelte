<li class="relative pl-7 before:absolute">
	<div class="flex flex-col flex-1 gap-2">
		<h3 class="font-semibold mb-1">Titulo</h3>
		<span class="font-light text-sm font-mono"
			>Noviembre de 2023 - Diciembre 2023. (Medellín, Colombia)</span
		>
		<p class="my-2 text-justify text-slate-800">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident.
		</p>
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
			box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
				rgb(255 255 255);
		}
	}
</style>
