<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import NavigationBar from '$lib/components/layout/NavigationBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<Toaster />

<ModeWatcher defaultTheme="dark" defaultMode={'dark'} track={false} />

<svelte:head>
	<link rel="icon" href={favicon} />
	<script type="module" src="/webcomponent/pixel-canvas/pixel-canvas.js"></script>
</svelte:head>

<div class="px-layout relative z-50 flex w-full flex-col items-center bg-background">
	<div class="max-w-wx w-full">
		<NavigationBar />
	</div>
</div>

<div class="px-layout flex w-full flex-col items-center gap-y-24 py-2">
	{@render children()}
</div>

<Footer />
