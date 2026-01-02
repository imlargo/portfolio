<script lang="ts">
	import { onMount } from 'svelte';

	interface NoiseProps {
		patternSize?: number;
		patternScaleX?: number;
		patternScaleY?: number;
		patternRefreshInterval?: number;
		patternAlpha?: number;
	}

	let {
		patternSize = 250,
		patternScaleX = 1,
		patternScaleY = 1,
		patternRefreshInterval = 2,
		patternAlpha = 15
	}: NoiseProps = $props();

	let grainCanvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = grainCanvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		let frame = 0;
		let animationId: number;
		const canvasSize = 1024;

		const resize = () => {
			grainCanvas.width = canvasSize;
			grainCanvas.height = canvasSize;
			grainCanvas.style.width = '100vw';
			grainCanvas.style.height = '100vh';
		};

		const drawGrain = () => {
			const imageData = ctx.createImageData(canvasSize, canvasSize);
			const data = imageData.data;

			for (let i = 0; i < data.length; i += 4) {
				const value = Math.random() * 255;
				data[i] = value;
				data[i + 1] = value;
				data[i + 2] = value;
				data[i + 3] = patternAlpha;
			}

			ctx.putImageData(imageData, 0, 0);
		};

		const loop = () => {
			if (frame % patternRefreshInterval === 0) {
				drawGrain();
			}
			frame++;
			animationId = window.requestAnimationFrame(loop);
		};

		window.addEventListener('resize', resize);
		resize();
		loop();

		return () => {
			window.removeEventListener('resize', resize);
			window.cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas bind:this={grainCanvas} class="noise-overlay" style="image-rendering: pixelated;"></canvas>

<style>
	.noise-overlay {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
	}
</style>
