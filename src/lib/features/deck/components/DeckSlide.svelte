<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { cn } from '$lib/utils';

	type Props = {
		children: Snippet;
		/**
		 * `padded` es la diapositiva normal, con el aire del marco fijo arriba y
		 * abajo. `bleed` la deja sin relleno, para piezas del sitio que ya traen el
		 * suyo, como la banda del proceso.
		 */
		variant?: 'padded' | 'bleed';
		/**
		 * Fondo a sangre de la diapositiva entera, normalmente un shader. Con él la
		 * diapositiva se queda oscura en los dos temas: es una imagen, no interfaz.
		 */
		backdrop?: Snippet;
		/** Ancla para saltar a la diapositiva desde la agenda de la portada. */
		id?: string;
		class?: string;
	};

	const { children, variant = 'padded', backdrop, id, class: className }: Props = $props();

	// Los fondos son WebGL y la presentación tiene varios. Montarlos todos al
	// abrir la página crea varios contextos a la vez y retrasa la portada; cada
	// uno se monta cuando su diapositiva queda a una pantalla de distancia y ya
	// no se desmonta, para no reiniciar la animación al volver.
	let nearViewport = $state(false);

	const watchProximity: Attachment<HTMLElement> = (section) => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				nearViewport = true;
				observer.disconnect();
			},
			{ rootMargin: '100% 0px' }
		);
		observer.observe(section);
		return () => observer.disconnect();
	};
</script>

<section
	{id}
	data-slide
	class={cn(
		'relative flex min-h-dvh w-full snap-start flex-col justify-center',
		variant === 'padded' && 'px-layout py-20 md:py-24',
		backdrop && 'overflow-hidden bg-neutral-950 text-white',
		className
	)}
	{@attach backdrop && watchProximity}
>
	{#if backdrop}
		<div class="absolute inset-0" aria-hidden="true">
			{#if nearViewport}
				{@render backdrop()}
			{/if}
		</div>
	{/if}

	<div class="relative flex w-full flex-col">
		{@render children()}
	</div>
</section>
