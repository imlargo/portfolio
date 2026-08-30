<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		/** `false` para el bloque que continúa al anterior sin corte: solo respira abajo. */
		spacing = 'default',
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		spacing?: 'default' | 'continued' | 'hero' | 'none';
	} = $props();

	const spacingClass = {
		default: 'py-section',
		continued: 'pb-section',
		hero: 'py-hero',
		none: ''
	};
</script>

<!-- Una sección se posiciona sola: pone su propio margen lateral y su propio
     ritmo vertical en vez de heredarlos del layout. Así toda frontera entre dos
     secciones mide lo mismo en todas las vistas, y una banda puede sangrar a
     pantalla completa sin pelear con un contenedor padre.

     La columna interior es la que se limita a `max-w-wx`: el fondo llega hasta
     el borde de la pantalla, el contenido no. -->
<section
	bind:this={ref}
	data-slot="section"
	class={cn('px-layout flex w-full flex-col items-center', spacingClass[spacing], className)}
	{...restProps}
>
	<div class="max-w-wx flex w-full flex-col gap-12">
		{@render children?.()}
	</div>
</section>
