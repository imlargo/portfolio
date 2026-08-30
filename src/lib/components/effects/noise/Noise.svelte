<script lang="ts">
	// Props con valores por defecto
	let {
		patternSize = 250,
		patternScaleX = 1,
		patternScaleY = 1,
		patternRefreshInterval = 2,
		patternAlpha = 15,
		class: className = ''
	}: {
		/** Tamaño en px del tile de grano que se repite. */
		patternSize?: number;
		/** Escala del tile en el eje X. */
		patternScaleX?: number;
		/** Escala del tile en el eje Y. */
		patternScaleY?: number;
		/** Cantidad de frames entre cada regeneración del grano. */
		patternRefreshInterval?: number;
		/** Opacidad del grano, de 0 a 255. */
		patternAlpha?: number;
		class?: string;
	} = $props();

	let canvasEl = $state<HTMLCanvasElement>();

	$effect(() => {
		const canvas = canvasEl;
		if (!canvas) return;

		const ctx = canvas.getContext('2d', { alpha: true });
		if (!ctx) return;

		// Leer las props acá las registra como dependencias: el efecto se
		// re-ejecuta con limpieza previa cuando cambia cualquiera, igual que el
		// array de dependencias del useEffect original.
		const size = Math.max(1, Math.floor(patternSize));
		const scaleX = patternScaleX;
		const scaleY = patternScaleY;
		const refreshInterval = Math.max(1, Math.floor(patternRefreshInterval));
		const alpha = patternAlpha;

		// El grano se genera una sola vez por frame sobre un tile de patternSize y
		// se repite sobre el canvas, en vez de rellenar píxel por píxel toda la
		// superficie visible.
		const patternCanvas = document.createElement('canvas');
		patternCanvas.width = size;
		patternCanvas.height = size;
		const patternCtx = patternCanvas.getContext('2d');
		if (!patternCtx) return;

		const patternData = patternCtx.createImageData(size, size);
		const data = patternData.data;

		const resize = () => {
			const parent = canvas.parentElement;
			canvas.width = parent?.clientWidth || window.innerWidth;
			canvas.height = parent?.clientHeight || window.innerHeight;
			// Cambiar el tamaño del canvas resetea la transform, así que se vuelve
			// a aplicar la escala del patrón.
			ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
		};

		const drawGrain = () => {
			for (let i = 0; i < data.length; i += 4) {
				const value = Math.random() * 255;
				data[i] = value;
				data[i + 1] = value;
				data[i + 2] = value;
				data[i + 3] = alpha;
			}
			patternCtx.putImageData(patternData, 0, 0);

			// El pattern se recrea por frame: modificar el canvas fuente después
			// de createPattern no está definido por spec y no se refleja en todos
			// los navegadores.
			const pattern = ctx.createPattern(patternCanvas, 'repeat');
			if (!pattern) return;

			// El grano es semitransparente: sin limpiar, cada frame se suma al
			// anterior y la opacidad se acumula hasta saturar.
			const w = canvas.width / scaleX;
			const h = canvas.height / scaleY;
			ctx.clearRect(0, 0, w, h);
			ctx.fillStyle = pattern;
			ctx.fillRect(0, 0, w, h);
		};

		resize();
		window.addEventListener('resize', resize);
		const ro = new ResizeObserver(resize);
		if (canvas.parentElement) ro.observe(canvas.parentElement);

		let frame = 0;
		let animationId = 0;

		const loop = () => {
			if (frame % refreshInterval === 0) drawGrain();
			frame++;
			animationId = requestAnimationFrame(loop);
		};

		// Grano estático cuando el sistema pide menos movimiento: el efecto se ve
		// igual, pero deja de titilar.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			drawGrain();
		} else {
			loop();
		}

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			ro.disconnect();
		};
	});
</script>

<canvas bind:this={canvasEl} class="noise-canvas {className}"></canvas>

<style>
	.noise-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		image-rendering: pixelated;
	}
</style>
