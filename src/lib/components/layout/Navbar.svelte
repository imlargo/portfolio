<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import MobileMenu from './MobileMenu.svelte';

	type Link = {
		href: string;
		label: string;
	};

	const links: Link[] = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' }
	];
</script>

<header class="relative z-50 w-full py-6 md:py-12">
	<nav class="grid w-full grid-cols-2 md:grid-cols-3">
		<div class="flex items-center">
			<a href="/" class="flex items-center justify-center gap-3 font-mono">
				<span class="text-xl font-bold">imlargo</span></a
			>
		</div>
		<div class="hidden justify-center gap-x-0 md:flex">
			{#each links as link}
				<Button
					variant="link"
					href={link.href}
					class="text-muted-foreground {page.url.pathname === link.href ? 'text-primary' : ''}"
					>{link.label}</Button
				>
			{/each}
		</div>
		<div class="flex justify-end gap-x-4">
			<div class="flex items-center justify-center gap-x-2">
				<Button class="rounded-full" href="https://app.hellobutter.io/signup">Contact</Button>
			</div>

			<MobileMenu />
		</div>
	</nav>
</header>
