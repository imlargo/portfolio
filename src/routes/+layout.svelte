<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />

<ModeWatcher defaultTheme="dark" defaultMode={'dark'} track={false} />

<div class="flex w-full flex-col gap-y-6 px-4 pt-12 pb-24 md:px-12 md:pb-12 xl:px-24">
	{@render children?.()}
</div>
