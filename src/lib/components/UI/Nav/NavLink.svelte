<script>
	const { children, href, currentPath } = $props();
</script>

<a
	class:nav-link-active={href === currentPath}
	class="select-none font-medium"
	data-sveltekit-reload
	{href}
>
	{@render children()}
</a>

<style lang="scss">
	a {
		position: relative;
		&:hover {
			color: #9335ff;
		}
	}

	.nav-link-active:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 0.1rem;
		bottom: -0.1rem;
		left: 0;
		background-color: #bc81ff;
		transform-origin: bottom right;
		transform-origin: bottom left;
	}
</style>
