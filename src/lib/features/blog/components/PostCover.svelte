<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		/** Semilla: el mismo post da siempre la misma portada. */
		slug: string;
		class?: string;
	};

	const { slug, class: className }: Props = $props();

	// Los posts no traen imagen, y la retícula de tarjetas necesita una pieza
	// visual con peso. En vez de inventar fotos, cada entrada recibe una portada
	// abstracta derivada de su slug: es estable entre recargas y entre despliegues
	// —el mismo texto da siempre los mismos números— y no hay archivos que
	// mantener. Cuando un post tenga imagen propia, se reemplaza acá.
	function hash(value: string): number {
		let h = 2166136261;
		for (let i = 0; i < value.length; i++) {
			h ^= value.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		return Math.abs(h);
	}

	// Cada mancha toma su tono de una ventana angosta alrededor del lila de marca
	// (295). Angosta a propósito: las portadas se distinguen entre sí, pero todas
	// siguen perteneciendo a la paleta del sitio en vez de parecer stock.
	const blobs = $derived.by(() => {
		const seed = hash(slug);
		return [0, 1, 2].map((i) => {
			const n = (seed >> (i * 7)) & 0x7f;
			const m = (seed >> (i * 5 + 3)) & 0x7f;
			return {
				hue: 262 + ((n * 13 + i * 29) % 78),
				x: 12 + ((n * 7) % 76),
				y: 10 + ((m * 11) % 70),
				size: 52 + ((m * 3) % 34)
			};
		});
	});
</script>

<div
	class={cn('relative w-full overflow-hidden rounded-2xl border bg-neutral-950', className)}
	aria-hidden="true"
>
	{#each blobs as blob, i (i)}
		<div
			class="absolute inset-0"
			style:background="radial-gradient({blob.size}% {blob.size}% at {blob.x}% {blob.y}%, oklch(0.72
			0.15 {blob.hue}) 0%, transparent 68%)"
			style:opacity={0.85 - i * 0.18}
		></div>
	{/each}

	<!-- Velo y grano: bajan la saturación a un nivel que convive con el resto de
	     la página y le quitan el aspecto de degradado de plantilla. -->
	<div class="absolute inset-0 bg-neutral-950/25"></div>
	<div class="noise absolute inset-0"></div>
</div>

<style>
	.noise {
		background-image: url('/assets/noise.webp');
		background-size: 26%;
		mix-blend-mode: overlay;
		opacity: 0.5;
	}
</style>
