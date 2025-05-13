<script>
	import { page } from '$app/stores';
	import NavLink from '$components/UI/Nav/NavLink.svelte';
	import NavSocial from '$components/UI/Nav/NavSocial.svelte';
	import { textEffectAction } from '$src/lib/actions/textAction';
</script>

<nav class="flex items-center justify-between py-4">
	<div class="align-center flex basis-1/3">
		<a
			use:textEffectAction
			data-value="imlargo"
			class="select-none font-mono text-3xl font-light"
			href="/">imlargo</a
		>
	</div>

	<div class="flex basis-1/3 items-center justify-center gap-10">
		<NavLink currentPath={$page.url.pathname} href="/">Inicio</NavLink>
		<NavLink currentPath={$page.url.pathname} href="/about">About</NavLink>
	</div>

	<div class="flex basis-1/3 items-center justify-end gap-7">
		<NavSocial icon="bi bi-github" href="https://github.com/imlargo" />
		<NavSocial icon="bi bi-instagram" href="https://www.instagram.com/imlargo" />
		<NavSocial icon="bi bi-linkedin" href="https://www.linkedin.com/in/imlargo" />
	</div>
</nav>

<style lang="scss">
</style>
