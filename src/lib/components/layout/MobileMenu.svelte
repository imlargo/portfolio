<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import MobileMenuIcon from './MobileMenuIcon.svelte';

	let isOpen = $state(false);
</script>

<Popover.Root bind:open={isOpen}>
	<Popover.Trigger class="flex items-center justify-center md:hidden">
		<MobileMenuIcon {isOpen} />
	</Popover.Trigger>
	<Popover.Content
		sideOffset={24}
		class="glass z-40 h-dvh w-screen overflow-hidden rounded-none border-0 border-t px-6 py-8"
		preventScroll={true}
	>
		<div class="flex flex-col gap-y-8">
			<div class="flex flex-col gap-y-5">
				<span class="text-muted-foreground text-sm font-medium">Product</span>
				<div class="flex flex-col gap-y-3 text-2xl font-medium">
					<a href="/" data-sveltekit-reload>Home</a>
					<a href="/solutions" data-sveltekit-reload>Solutions</a>
					<a href="/pricing" data-sveltekit-reload>Pricing</a>
				</div>
			</div>
			<div class="flex flex-col gap-y-5">
				<span class="text-muted-foreground text-sm font-medium">Industries</span>
				<div class="flex flex-col gap-y-3 text-2xl font-medium">
					<a href="/agencies" data-sveltekit-reload>Agencies</a>
					<a href="/creators" data-sveltekit-reload>Creators</a>
					<a href="/ecommerce" data-sveltekit-reload>Ecommerce</a>
					<a href="/clippers" data-sveltekit-reload>Clippers</a>
					<a href="/info-products" data-sveltekit-reload>Info-Product</a>
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
