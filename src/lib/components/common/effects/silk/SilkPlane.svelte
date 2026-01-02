<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { useTask } from '@threlte/core';
	import { Color, type Mesh, type ShaderMaterial } from 'three';

	type NormalizedRGB = [number, number, number];

	const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
		const clean = hex.replace('#', '');
		const r = parseInt(clean.slice(0, 2), 16) / 255;
		const g = parseInt(clean.slice(2, 4), 16) / 255;
		const b = parseInt(clean.slice(4, 6), 16) / 255;
		return [r, g, b];
	};

	interface SilkProps {
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

	const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

	const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
const float e = 2.71828182845904523536;
float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}
vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}
void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

	let meshRef: Mesh;
	const { size } = useThrelte();

	const uniforms = $derived({
		uSpeed: { value: speed },
		uScale: { value: scale },
		uNoiseIntensity: { value: noiseIntensity },
		uColor: { value: new Color(...hexToNormalizedRGB(color)) },
		uRotation: { value: rotation },
		uTime: { value: 0 }
	});

	// Update mesh scale based on viewport
	$effect(() => {
		if (meshRef && $size) {
			const aspect = $size.width / $size.height;
			meshRef.scale.set($size.width / 100, $size.height / 100, 1);
		}
	});

	// Animation loop using useTask
	useTask((delta) => {
		if (meshRef) {
			const material = meshRef.material as ShaderMaterial & {
				uniforms: typeof uniforms;
			};
			material.uniforms.uTime.value += 0.1 * delta;
		}
	});
</script>

<T.Mesh bind:ref={meshRef}>
	<T.PlaneGeometry args={[1, 1, 1, 1]} />
	<T.ShaderMaterial {uniforms} {vertexShader} {fragmentShader} />
</T.Mesh>
