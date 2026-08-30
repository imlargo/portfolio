<script lang="ts">
	import type { Snippet } from 'svelte';
	import MonoPlasma from '$lib/components/effects/iridescence/MonoPlasma.svelte';
	import PanelCtas from './PanelCtas.svelte';
	import { useReveal } from '$lib/attachments/reveal';

	type Cta = { label: string; href: string };

	let {
		title,
		description,
		primaryCta,
		secondaryCta,
		backdrop
	}: {
		title: string;
		description: string;
		primaryCta: Cta;
		secondaryCta: Cta;
		/** Fondo del panel. Sin él va el plasma monocromo por defecto. */
		backdrop?: Snippet;
	} = $props();
</script>

<!-- El cierre de todas las páginas: una sola banda oscura a escala grande con el
     mismo llamado. Se queda oscura en los dos temas porque es el remate de la
     página y tiene que pesar.

     Lo único que varía entre vistas es el fondo, y por eso entra como snippet:
     el resto (escala, retícula, tipografía y el par de botones) es idéntico y
     debe seguir siéndolo, para que las cuatro piezas se lean como la misma. -->
<section class="px-layout py-section-lg flex w-full flex-col items-center">
	<div
		class="max-w-wx relative flex w-full flex-col items-start gap-10 overflow-hidden rounded-4xl border bg-neutral-950 px-6 py-20 text-white md:px-12 md:py-28 lg:px-16 lg:py-32"
		{@attach useReveal({ scale: 0.94, y: 0, duration: 1.1 })}
	>
		{#if backdrop}
			{@render backdrop()}
		{:else}
			<MonoPlasma />
		{/if}

		<div class="relative flex flex-col gap-y-5">
			<h2 class="max-w-2xl text-4xl text-balance md:text-5xl lg:text-6xl">
				{title}
			</h2>
			<p class="max-w-prose text-lg text-pretty text-white/70">
				{description}
			</p>
		</div>

		<PanelCtas class="relative" {primaryCta} {secondaryCta} />
	</div>
</section>
