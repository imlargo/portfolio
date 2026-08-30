import * as THREE from 'three';
import type { EffectComposer, Effect } from 'postprocessing';

export type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

export interface TouchPoint {
	x: number;
	y: number;
	vx: number;
	vy: number;
	force: number;
	age: number;
}

export interface TouchTexture {
	canvas: HTMLCanvasElement;
	texture: THREE.Texture;
	addTouch: (norm: { x: number; y: number }) => void;
	update: () => void;
	radiusScale: number;
	size: number;
}

export interface ReinitConfig {
	antialias: boolean;
	liquid: boolean;
	noiseAmount: number;
	maxPixelRatio: number;
}

export interface ThreeContext {
	renderer: THREE.WebGLRenderer;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	material: THREE.ShaderMaterial;
	clock: THREE.Clock;
	clickIx: number;
	uniforms: {
		uResolution: { value: THREE.Vector2 };
		uTime: { value: number };
		uColor: { value: THREE.Color };
		uClickPos: { value: THREE.Vector2[] };
		uClickTimes: { value: Float32Array };
		uShapeType: { value: number };
		uPixelSize: { value: number };
		uScale: { value: number };
		uDensity: { value: number };
		uPixelJitter: { value: number };
		uEnableRipples: { value: number };
		uRippleSpeed: { value: number };
		uRippleThickness: { value: number };
		uRippleIntensity: { value: number };
		uEdgeFade: { value: number };
	};
	resizeObserver?: ResizeObserver;
	intersectionObserver?: IntersectionObserver;
	raf?: number;
	quad?: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
	timeOffset?: number;
	composer?: EffectComposer;
	touch?: TouchTexture;
	liquidEffect?: Effect;
}
