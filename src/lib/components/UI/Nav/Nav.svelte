<script>
	import { page } from '$app/stores';
	import NavLink from '$components/UI/Nav/NavLink.svelte';
	import NavSocial from '$components/UI/Nav/NavSocial.svelte';
	import { textEffectAction } from '$src/lib/actions/textAction';
</script>

<nav class="flex py-4 justify-between items-center">
	<div class="flex basis-1/3 align-center">
		<a use:textEffectAction data-value="imlargo" class="font-mono text-3xl select-none font-light " href="/">imlargo</a>
	</div>

	<div class="flex basis-1/3 justify-center items-center gap-10">
		<NavLink currentPath={$page.url.pathname} href="/">Home</NavLink>
		<NavLink currentPath={$page.url.pathname} href="/about">About</NavLink>
	</div>

	<div class="flex basis-1/3 justify-end items-center gap-7">
		<NavSocial icon="bi bi-github" href="https://github.com/imlargo" />
		<NavSocial icon="bi bi-instagram" href="https://www.instagram.com/imlargo" />
		<NavSocial icon="bi bi-linkedin" href="https://www.linkedin.com/in/imlargo" />
	</div>
</nav>

<style lang="scss">
	
</style>
