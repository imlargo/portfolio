<li class="relative pl-7 before:absolute">
	<div class="flex flex-1 flex-col gap-2">
		<h3 class="mb-1 font-semibold">
			Ingeniería de Sistemas e Informática, Universidad Nacional de Colombia.
		</h3>
		<span class="font-mono text-sm font-light">Noviembre de 2023 - Diciembre de 2023</span>
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
