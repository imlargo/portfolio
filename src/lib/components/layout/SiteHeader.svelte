<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { ArrowUpRight } from '@lucide/svelte';
	import { siteContent } from '$lib/content/site-content';
	import { useHyperText } from '$lib/attachments/text-encrypt';
	import { useReveal } from '$lib/attachments/reveal';

	const { navigation, name, email } = siteContent;

	let isOpen = $state(false);
</script>

<!-- Misma retícula de tres columnas que Kora, pero la marca no es un logo: es el
     handle en mono, descifrándose. Es lo primero que distingue este sitio del
     estudio, y por eso se queda en el mismo lugar donde allá va el símbolo. -->
<header class="relative z-50 w-full pt-6 pb-3 md:pt-12 md:pb-6">
	<nav
		class="grid w-full grid-cols-2 md:grid-cols-3"
		{@attach useReveal({ y: -16, duration: 0.7, start: 'top 100%' })}
	>
		<div class="flex items-center">
			<a href="/" class="font-mono text-xl font-medium" data-value={name} {@attach useHyperText}>
				{name}
			</a>
		</div>

		<ul class="hidden justify-center gap-x-0 md:flex">
			{#each navigation.links as link (link.href)}
				<li>
					<Button
						variant="link"
						href={link.href}
						class="text-muted-foreground {page.url.pathname === link.href ? 'text-primary' : ''}"
					>
						{link.label}
					</Button>
				</li>
			{/each}
		</ul>

		<div class="flex justify-end gap-x-4">
			<div class="flex items-center justify-center gap-x-2">
				<Button
					variant="outline"
					class="hidden sm:inline-flex"
					target="_blank"
					href="/files/resume.pdf"
				>
					Resume
				</Button>
				<Button href="mailto:{email}">{navigation.contactCta}</Button>
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
					class="z-40 h-dvh w-screen overflow-hidden rounded-none border-0 border-t px-6 py-8"
					preventScroll={true}
				>
					<div class="flex flex-col gap-y-8">
						<div class="flex flex-col gap-y-5">
							<span class="text-sm font-medium text-muted-foreground">Navigation</span>
							<ul class="flex flex-col gap-y-3 text-2xl font-medium">
								{#each navigation.links as link (link.href)}
									<li><a href={link.href} data-sveltekit-reload>{link.label}</a></li>
								{/each}
							</ul>
						</div>
						<div class="flex flex-col gap-y-5">
							<span class="text-sm font-medium text-muted-foreground">Elsewhere</span>
							<ul class="flex flex-col gap-y-3 text-2xl font-medium">
								{#each navigation.socials as social (social.href)}
									<li>
										<a
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											data-sveltekit-reload
											class="flex items-center gap-x-2"
										>
											<span>{social.label}</span>
											<ArrowUpRight />
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</nav>
</header>

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
		background: oklch(0.92 0.004 286.32);
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
