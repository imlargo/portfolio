<script lang="ts">
	import Grainient from '$lib/components/effects/grainient/Grainient.svelte';
	import { cn } from '$lib/utils';

	type Props = {
		/** Color propio del post; de él salen las tres capas del degradado. */
		accent: string;
		class?: string;
	};

	const { accent, class: className }: Props = $props();

	function mix(hex: string, target: [number, number, number], amount: number): string {
		const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!m) return hex;
		const channels = [1, 2, 3].map((i) => parseInt(m[i], 16));
		return (
			'#' +
			channels
				.map((c, i) => Math.round(c + (target[i] - c) * amount))
				.map((c) => c.toString(16).padStart(2, '0'))
				.join('')
		);
	}

	// El post define un solo color y de ahí salen las tres capas que pide el
	// shader: una clara, el acento puro y una profunda. Así cada portada es
	// inconfundible pero todas comparten la misma construcción, y agregar un post
	// es elegir un hex y nada más.
	const light = $derived(mix(accent, [255, 255, 255], 0.55));
	const deep = $derived(mix(accent, [9, 9, 11], 0.72));
</script>

<div class={cn('relative overflow-hidden rounded-2xl border bg-neutral-950', className)}>
	<Grainient
		color1={light}
		color2={accent}
		color3={deep}
		timeSpeed={0.12}
		grainAmount={0.14}
		contrast={1.25}
		saturation={0.9}
		zoom={0.8}
		class="absolute inset-0"
	/>
</div>
