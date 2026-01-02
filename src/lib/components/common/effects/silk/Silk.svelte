<script lang="ts">
	import { Canvas } from '@threlte/core';
	import SilkPlane from './SilkPlane.svelte';

	export interface SilkProps {
		speed?: number;
		scale?: number;
		color?: string;
		noiseIntensity?: number;
		rotation?: number;
	}

	let {
		speed = 5,
		scale = 1,
		color = '#7B7481',
		noiseIntensity = 1.5,
		rotation = 0
	}: SilkProps = $props();
</script>

<Canvas class="w-full h-full">
	<SilkPlane {speed} {scale} {color} {noiseIntensity} {rotation} />
</Canvas>

<style>
	:global(canvas) {
		width: 100%;
		height: 100%;
	}
</style>
