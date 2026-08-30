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

	// El header flota sobre el contenido, así que en cuanto la página se mueve
	// necesita separarse de lo que pasa por debajo. Se resuelve con un velo y una
	// línea que aparecen al primer scroll, en vez de dejarlo siempre opaco: en lo
	// alto de la página el hero se ve entero y sin una barra encima.
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- Misma retícula de tres columnas que Kora, pero la marca no es un logo: es el
     handle en mono, descifrándose. Es lo primero que distingue este sitio del
     estudio, y por eso se queda en el mismo lugar donde allá va el símbolo.

     Arriba del todo el header es transparente y el hero se ve entero. Al primer
     scroll aparecen el velo y la línea, que es lo que lo separa de lo que pasa
     por debajo, y el alto se encoge un poco para devolver algo de pantalla en
     cuanto se empieza a leer. Si en algún momento estorba, quitarle
     `sticky top-0` al contenedor lo devuelve al flujo. -->
<div
	class="px-layout sticky top-0 z-50 flex w-full flex-col items-center transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] {scrolled
		? 'border-b bg-background/80 backdrop-blur-md'
		: 'border-b border-transparent bg-transparent'}"
>
	<header
		class="max-w-wx w-full transition-[padding] duration-500 ease-[var(--ease-out-expo)] {scrolled
			? 'pt-4 pb-4 md:pt-5 md:pb-5'
			: 'pt-6 pb-3 md:pt-12 md:pb-6'}"
	>
		<nav
			class="grid w-full grid-cols-2 md:grid-cols-3"
			{@attach useReveal({ y: -16, duration: 0.7, start: 'top 100%' })}
		>
			<div class="flex items-center">
				<a href="/" class="font-mono text-xl font-medium" data-value={name} {@attach useHyperText}>
					{name}
				</a>
			</div>

			<ul class="hidden items-center justify-center gap-x-6 md:flex">
				{#each navigation.links as link (link.href)}
					{@const active = page.url.pathname === link.href}
					<li>
						<a
							href={link.href}
							aria-current={active ? 'page' : undefined}
							class="link-underline text-sm transition-colors duration-300 {active
								? 'text-foreground'
								: 'text-muted-foreground hover:text-foreground'}"
						>
							{link.label}
						</a>
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
</div>

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
