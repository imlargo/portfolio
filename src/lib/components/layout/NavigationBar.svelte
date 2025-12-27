<script lang="ts">
	import { page } from '$app/state';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { useHyperText } from '$lib/attachments/text-encrypt';

	type Link = {
		href: string;
		label: string;
	};

	const links: Link[] = [
		{ href: '/', label: 'Home' },
		{ href: '/work', label: 'Work' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/about', label: 'About' }
	];

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string;
	};

	let isOpen = $state(false);
</script>

<header class="relative z-50 w-full py-6 md:py-12">
	<nav class="grid w-full grid-cols-2 md:grid-cols-3">
		<div class="flex items-center">
			<a href="/" class="flex items-center justify-center gap-3">
				<span class="font-mono text-xl font-semibold" data-value="imlargo" {@attach useHyperText}
					>imlargo</span
				></a
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
				<Button variant="secondary" href="/">Resume</Button>
				<Button href="/">Contact</Button>
			</div>

			<Popover.Root bind:open={isOpen}>
				<Popover.Trigger class="flex items-center justify-center md:hidden">
					<div class="hamburger" class:open={isOpen}>
						<span class="line l1"></span>
						<span class="line l2"></span>
					</div>
				</Popover.Trigger>
				<Popover.Content
					sideOffset={24}
					class="glass z-40 h-dvh w-screen overflow-hidden rounded-none border-0 border-t px-6 py-8"
					preventScroll={true}
				>
					<div class="flex flex-col gap-y-8">
						<div class="flex flex-col gap-y-5">
							<span class="text-sm font-medium text-muted-foreground">Navegacion</span>
							<div class="flex flex-col gap-y-3 text-2xl font-medium">
								{#each links as link}
									<a href={link.href} data-sveltekit-reload>{link.label}</a>
								{/each}
							</div>
						</div>
						<div class="flex flex-col gap-y-5">
							<span class="text-sm font-medium text-muted-foreground">Redes</span>
							<div class="flex flex-col gap-y-3 text-2xl font-medium">
								<a href="#" data-sveltekit-reload>GitHub</a>
								<a href="#" data-sveltekit-reload>LinkedIn</a>
							</div>
						</div>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</nav>
</header>

{#snippet ListItem({ title, content, href, class: className, ...restProps }: ListItemProps)}
	<NavigationMenu.Link>
		{#snippet child()}
			<a
				{href}
				class={cn(
					'block space-y-1 rounded-md p-4 no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
					className
				)}
				{...restProps}
			>
				<div class="text-sm font-medium">{title}</div>
				<p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
					{content}
				</p>
			</a>
		{/snippet}
	</NavigationMenu.Link>
{/snippet}

<style>
	.hamburger {
		width: 16px;
		height: 12px;
		position: relative;
	}
	.line {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 2px;
		border-radius: 1px;
		background: oklch(0.922 0 0);
		transform-origin: center;
		transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	.l1 {
		transform: translateY(-4px) rotate(0);
	}
	.l2 {
		transform: translateY(4px) rotate(0);
	}

	.hamburger.open .l1 {
		transform: translateY(0) rotate(45deg);
	}
	.hamburger.open .l2 {
		transform: translateY(0) rotate(-45deg);
	}
</style>
