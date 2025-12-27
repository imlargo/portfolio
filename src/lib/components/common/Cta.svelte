<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div
	class="relative flex w-full flex-col items-center justify-center rounded-lg py-12 md:py-24 lg:py-32"
>
	<div class="pixel-canvas absolute h-full w-full rounded-xl opacity-50">
		<pixel-canvas
			data-gap="15"
			data-noanimate="1"
			data-speed="15"
			data-colors="#9810fa, #ad46ff, #dab2ff"
		></pixel-canvas>
	</div>

	<div class="flex max-w-lg flex-col items-center justify-center gap-7">
		<div class="flex flex-col gap-5">
			<h2 class="ganimate-fade-in text-center text-4xl font-semibold lg:text-5xl">
				¡Trabajemos juntos!
			</h2>
			<span class="ganimate-fade-in text-center text-muted-foreground">
				Actualmente estoy abierto a nuevas oportunidades. Ya sea que tengas una pregunta o solo
				quieras saludar, mi bandeja de entrada siempre está abierta.
			</span>
		</div>
		<Button target="_blank" class="ganimate-fade-in max-w-max">Contáctame</Button>
	</div>
</div>

<style>
	.pixel-canvas {
		mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 5%, rgba(255, 255, 255, 0) 40%);
	}
</style>
