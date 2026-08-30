<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import Iridescence from './Iridescence.svelte';
	import Noise from '$lib/components/effects/noise/Noise.svelte';

	let {
		grain = 16,
		grainInterval = 4,
		vignette = true
	}: {
		/** Opacidad del grano, 0-255. */
		grain?: number;
		/** Cada cuántos frames se redibuja el grano. */
		grainInterval?: number;
		vignette?: boolean;
	} = $props();

	// El plasma se congela (speed 0 detiene la fase del shader) en vez de
	// desmontarse cuando el sistema pide menos movimiento: la pieza se sigue
	// viendo igual, solo deja de moverse.
	const reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	const speed = $derived(reducedMotion.current ? 0 : 0.25);
</script>

<!--
	El tratamiento "imagen, no interfaz" que comparten los paneles oscuros:
	plasma en monocromo, velo plano, viñeta y grano. Estaba copiado en el cierre
	de la home, el de /services y la visual de about.

	El orden de las capas es el que importa y por eso vive acá: el velo y la
	viñeta bajan la luminancia media del plasma (sin recortar un parche detrás
	del contenido) y el grano va al final, encima de las dos.

	Se posiciona solo (`absolute inset-0`), así que el contenedor tiene que ser
	`relative` y `overflow-hidden`.
-->
<div class="iridescence-mono absolute inset-0" aria-hidden="true">
	<Iridescence color={[1, 1, 1]} {speed} amplitude={0.08} />
</div>

<div class="pointer-events-none absolute inset-0 bg-black/30" aria-hidden="true"></div>

{#if vignette}
	<div class="vignette pointer-events-none absolute inset-0" aria-hidden="true"></div>
{/if}

<Noise patternAlpha={grain} patternRefreshInterval={grainInterval} />
