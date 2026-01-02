<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
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

<div class="silk-container">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
		<SilkPlane {speed} {scale} {color} {noiseIntensity} {rotation} />
	</Canvas>
</div>

<style>
	.silk-container {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	:global(.silk-container canvas) {
		width: 100% !important;
		height: 100% !important;
	}
</style>
