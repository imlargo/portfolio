<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import CustomCursor from '$lib/components/effects/cursor/CustomCursor.svelte';
	import { prefersReducedMotion } from '$lib/gsap';
	import { siteContent } from '$lib/content/site-content';

	type Props = {
		/** Rótulo fijo de la esquina superior derecha: de qué trata la presentación. */
		label: string;
		/** A dónde lleva la marca de la esquina: la lista de la que salió la presentación. */
		backHref: string;
		children: Snippet;
	};

	const { label, backHref, children }: Props = $props();

	const NEXT_KEYS = ['ArrowDown', 'ArrowRight', 'PageDown', ' '];
	const PREVIOUS_KEYS = ['ArrowUp', 'ArrowLeft', 'PageUp'];
	const FULLSCREEN_KEY = 'f';
	// Ajuste de scroll por diapositiva, solo desde tablet: en un teléfono pueden
	// ser más altas que la pantalla y el ajuste obligatorio impediría leerlas.
	const SNAP_CLASSES = ['md:snap-y', 'md:snap-mandatory'];

	let slides: HTMLElement[] = [];
	let current = $state(0);
	let total = $state(0);

	const pad = (n: number) => String(n).padStart(2, '0');

	// Cada diapositiva es una sección de la página y se avanza con el scroll de
	// la ventana, no con un carrusel. Así los reveals de GSAP del sitio, que van
	// atados al scroll, funcionan tal cual sin una versión aparte para la
	// presentación.
	const trackSlides: Attachment<HTMLElement> = (root) => {
		const html = document.documentElement;
		html.classList.add(...SNAP_CLASSES);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) current = slides.indexOf(entry.target as HTMLElement);
				}
			},
			// La activa es la que cruza la línea media de la pantalla. Un umbral de
			// área fallaría con diapositivas más altas que la ventana.
			{ rootMargin: '-50% 0px -50% 0px' }
		);

		// Si una presentación agrega o quita diapositivas en vivo, la lista se
		// rehace cada vez que cambian los hijos directos del contenedor.
		const scan = () => {
			observer.disconnect();
			slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
			total = slides.length;
			slides.forEach((slide) => observer.observe(slide));
		};
		scan();

		const mutations = new MutationObserver(scan);
		mutations.observe(root, { childList: true });

		return () => {
			mutations.disconnect();
			observer.disconnect();
			html.classList.remove(...SNAP_CLASSES);
		};
	};

	function goTo(index: number) {
		const target = slides[Math.max(0, Math.min(total - 1, index))];
		target?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	}

	function handleKeydown(event: KeyboardEvent) {
		// Mientras el foco esté en un campo (notas, sliders), las flechas y el
		// espacio son del campo, no de la presentación.
		const target = event.target as HTMLElement;
		if (target.closest('input, textarea, [contenteditable="true"], [role="alertdialog"]')) return;
		if (event.metaKey || event.ctrlKey || event.altKey) return;

		if (NEXT_KEYS.includes(event.key)) {
			event.preventDefault();
			goTo(current + 1);
		} else if (PREVIOUS_KEYS.includes(event.key)) {
			event.preventDefault();
			goTo(current - 1);
		} else if (event.key === 'Home') {
			event.preventDefault();
			goTo(0);
		} else if (event.key === 'End') {
			event.preventDefault();
			goTo(total - 1);
		} else if (event.key === FULLSCREEN_KEY) {
			if (document.fullscreenElement) document.exitFullscreen();
			else document.documentElement.requestFullscreen();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<CustomCursor />

<!-- El marco va fijo y en `mix-blend-difference`, igual que el cursor: pasa
     sobre diapositivas oscuras y claras sin tener que saber en cuál está. -->
<div
	class="px-layout pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between pt-6 text-white mix-blend-difference md:pt-8"
>
	<!-- Donde Kora pone su símbolo, acá va el handle en mono: es la marca del sitio. -->
	<a href={backHref} class="pointer-events-auto font-mono text-sm">{siteContent.name}</a>
	<span class="text-sm text-white/70">{label}</span>
</div>

<div
	class="px-layout pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-end justify-between pb-6 text-white mix-blend-difference md:pb-8"
>
	<div class="h-px w-32 bg-white/20" aria-hidden="true">
		<div
			class="h-px bg-white transition-[width] duration-700 ease-(--ease-out-expo)"
			style:width="{total ? ((current + 1) / total) * 100 : 0}%"
		></div>
	</div>
	<span class="font-mono text-xs text-white/70 tabular-nums" aria-live="polite">
		{pad(current + 1)} / {pad(total)}
	</span>
</div>

<main id="main-content" class="w-full" {@attach trackSlides}>
	{@render children()}
</main>
