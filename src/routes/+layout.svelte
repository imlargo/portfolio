<script lang="ts">
	import '$styles/app.css';
	import favicon from '$lib/assets/favicon.png';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="dark" defaultTheme="dark" />

<div data-sveltekit-reload>
	<div class="bg-background px-horizontal relative z-50 flex w-full flex-col items-center">
		<div class="w-full max-w-screen-xl">
			<Navbar />
		</div>
	</div>

	<div class="px-horizontal flex w-full flex-col items-center">
		<div class="flex w-full max-w-screen-xl flex-col gap-y-24 py-2">
			{@render children?.()}
		</div>
	</div>

	<Footer />
</div>
