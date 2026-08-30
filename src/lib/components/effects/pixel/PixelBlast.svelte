<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';
	import { createTouchTexture, createLiquidEffect } from './pixelBlastUtils';
	import type { PixelBlastVariant, ThreeContext, ReinitConfig } from './pixelBlastTypes';

	// Props con valores por defecto
	let {
		variant = 'square' as PixelBlastVariant,
		pixelSize = 3,
		color = '#B19EEF',
		class: className = '',
		style = '',
		antialias = true,
		patternScale = 2,
		patternDensity = 1,
		liquid = false,
		liquidStrength = 0.1,
		liquidRadius = 1,
		pixelSizeJitter = 0,
		enableRipples = true,
		rippleIntensityScale = 1,
		rippleThickness = 0.1,
		rippleSpeed = 0.3,
		liquidWobbleSpeed = 4.5,
		autoPauseOffscreen = true,
		speed = 0.5,
		transparent = true,
		edgeFade = 0.5,
		noiseAmount = 0,
		maxPixelRatio = 2
	}: {
		variant?: PixelBlastVariant;
		pixelSize?: number;
		color?: string;
		class?: string;
		style?: string;
		antialias?: boolean;
		patternScale?: number;
		patternDensity?: number;
		liquid?: boolean;
		liquidStrength?: number;
		liquidRadius?: number;
		pixelSizeJitter?: number;
		enableRipples?: boolean;
		rippleIntensityScale?: number;
		rippleThickness?: number;
		rippleSpeed?: number;
		liquidWobbleSpeed?: number;
		autoPauseOffscreen?: boolean;
		speed?: number;
		transparent?: boolean;
		edgeFade?: number;
		noiseAmount?: number;
		/** Caps the render resolution. The effect is quantised into blocks anyway,
		 *  so 1 keeps the same on-screen block size for a quarter of the fragments. */
		maxPixelRatio?: number;
	} = $props();

	const SHAPE_MAP: Record<PixelBlastVariant, number> = {
		square: 0,
		circle: 1,
		triangle: 2,
		diamond: 3
	};

	const MAX_CLICKS = 10;

	const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

	const FRAGMENT_SRC = `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;

  // sRGB gamma correction - convert linear to sRGB for accurate color output
  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`;

	let containerEl: HTMLDivElement;
	let threeContext: ThreeContext | null = null;
	let prevConfig: ReinitConfig | null = null;
	let visibilityState = { visible: true };
	// Read from inside the rAF loop, which runs outside any reactive scope.
	const speedRef = $derived(speed);

	const randomFloat = (): number => {
		if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
			const u32 = new Uint32Array(1);
			window.crypto.getRandomValues(u32);
			return u32[0] / 0xffffffff;
		}
		return Math.random();
	};

	const initThreeScene = () => {
		if (!containerEl) return;

		const needsReinitKeys: (keyof ReinitConfig)[] = [
			'antialias',
			'liquid',
			'noiseAmount',
			'maxPixelRatio'
		];
		const cfg: ReinitConfig = { antialias, liquid, noiseAmount, maxPixelRatio };
		let mustReinit = false;

		if (!threeContext) {
			mustReinit = true;
		} else if (prevConfig) {
			for (const k of needsReinitKeys) {
				if (prevConfig[k] !== cfg[k]) {
					mustReinit = true;
					break;
				}
			}
		}

		if (mustReinit) {
			// Cleanup existing context
			if (threeContext) {
				cleanup();
			}

			// Create new renderer
			const canvas = document.createElement('canvas');
			const renderer = new THREE.WebGLRenderer({
				canvas,
				antialias,
				alpha: true,
				powerPreference: 'high-performance'
			});

			renderer.domElement.style.width = '100%';
			renderer.domElement.style.height = '100%';
			renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
			// The WebGL canvas is created and owned by three.js, so it is never part
			// of the DOM tree Svelte renders and cannot desync from it.
			// eslint-disable-next-line svelte/no-dom-manipulating
			containerEl.appendChild(renderer.domElement);

			if (transparent) renderer.setClearAlpha(0);
			else renderer.setClearColor(0x000000, 1);

			// Create uniforms
			const uniforms = {
				uResolution: { value: new THREE.Vector2(0, 0) },
				uTime: { value: 0 },
				uColor: { value: new THREE.Color(color) },
				uClickPos: {
					value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1))
				},
				uClickTimes: { value: new Float32Array(MAX_CLICKS) },
				uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
				uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
				uScale: { value: patternScale },
				uDensity: { value: patternDensity },
				uPixelJitter: { value: pixelSizeJitter },
				uEnableRipples: { value: enableRipples ? 1 : 0 },
				uRippleSpeed: { value: rippleSpeed },
				uRippleThickness: { value: rippleThickness },
				uRippleIntensity: { value: rippleIntensityScale },
				uEdgeFade: { value: edgeFade }
			};

			const scene = new THREE.Scene();
			const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
			const material = new THREE.ShaderMaterial({
				vertexShader: VERTEX_SRC,
				fragmentShader: FRAGMENT_SRC,
				uniforms,
				transparent: true,
				depthTest: false,
				depthWrite: false,
				glslVersion: THREE.GLSL3
			});

			const quadGeom = new THREE.PlaneGeometry(2, 2);
			const quad = new THREE.Mesh(quadGeom, material);
			scene.add(quad);

			const clock = new THREE.Clock();

			const setSize = () => {
				const w = containerEl.clientWidth || 1;
				const h = containerEl.clientHeight || 1;
				renderer.setSize(w, h, false);
				uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
				if (threeContext?.composer) {
					threeContext.composer.setSize(renderer.domElement.width, renderer.domElement.height);
				}
				uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
			};

			setSize();
			const ro = new ResizeObserver(setSize);
			ro.observe(containerEl);

			// Drives the `autoPauseOffscreen` check in the render loop. Without it
			// `visibilityState.visible` stays true forever and the shader keeps
			// rendering at 60fps for the whole page, long after the hero is gone.
			// The margin resumes rendering just before the canvas scrolls back in.
			const io = new IntersectionObserver(
				(entries) => {
					visibilityState.visible = entries.some((entry) => entry.isIntersecting);
				},
				{ rootMargin: '200px' }
			);
			io.observe(containerEl);

			const timeOffset = randomFloat() * 1000;

			let composer: EffectComposer | undefined;
			let touch: ReturnType<typeof createTouchTexture> | undefined;
			let liquidEffect: Effect | undefined;

			if (liquid) {
				touch = createTouchTexture();
				touch.radiusScale = liquidRadius;
				composer = new EffectComposer(renderer);
				const renderPass = new RenderPass(scene, camera);
				liquidEffect = createLiquidEffect(touch.texture, {
					strength: liquidStrength,
					freq: liquidWobbleSpeed
				});
				const effectPass = new EffectPass(camera, liquidEffect);
				effectPass.renderToScreen = true;
				composer.addPass(renderPass);
				composer.addPass(effectPass);
			}

			if (noiseAmount > 0) {
				if (!composer) {
					composer = new EffectComposer(renderer);
					composer.addPass(new RenderPass(scene, camera));
				}
				const noiseEffect = new Effect(
					'NoiseEffect',
					`uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} `,
					{
						uniforms: new Map<string, THREE.Uniform>([
							['uTime', new THREE.Uniform(0)],
							['uAmount', new THREE.Uniform(noiseAmount)]
						])
					}
				);
				const noisePass = new EffectPass(camera, noiseEffect);
				noisePass.renderToScreen = true;
				if (composer && composer.passes.length > 0) {
					composer.passes.forEach((p) => {
						const pass = p as { renderToScreen?: boolean };
						pass.renderToScreen = false;
					});
				}
				composer.addPass(noisePass);
			}

			if (composer) {
				composer.setSize(renderer.domElement.width, renderer.domElement.height);
			}

			// Event handlers
			const mapToPixels = (e: PointerEvent) => {
				const rect = renderer.domElement.getBoundingClientRect();
				const scaleX = renderer.domElement.width / rect.width;
				const scaleY = renderer.domElement.height / rect.height;
				const fx = (e.clientX - rect.left) * scaleX;
				const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
				return { fx, fy, w: renderer.domElement.width, h: renderer.domElement.height };
			};

			const onPointerDown = (e: PointerEvent) => {
				const { fx, fy } = mapToPixels(e);
				const ix = threeContext?.clickIx ?? 0;
				uniforms.uClickPos.value[ix].set(fx, fy);
				uniforms.uClickTimes.value[ix] = uniforms.uTime.value;
				if (threeContext) threeContext.clickIx = (ix + 1) % MAX_CLICKS;
			};

			const onPointerMove = (e: PointerEvent) => {
				if (!touch) return;
				const { fx, fy, w, h } = mapToPixels(e);
				touch.addTouch({ x: fx / w, y: fy / h });
			};

			renderer.domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
			renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });

			// Animation loop
			let raf: number;
			const animate = () => {
				if (autoPauseOffscreen && !visibilityState.visible) {
					raf = requestAnimationFrame(animate);
					return;
				}

				uniforms.uTime.value = timeOffset + clock.getElapsedTime() * speedRef;

				if (liquidEffect) {
					const liqEffect = liquidEffect as Effect & { uniforms: Map<string, THREE.Uniform> };
					const timeUniform = liqEffect.uniforms.get('uTime');
					if (timeUniform) timeUniform.value = uniforms.uTime.value;
				}

				if (composer) {
					if (touch) touch.update();
					composer.passes.forEach((p) => {
						const pass = p as {
							effects?: Array<Effect & { uniforms: Map<string, THREE.Uniform> }>;
						};
						if (pass.effects) {
							pass.effects.forEach((eff) => {
								const timeUniform = eff.uniforms?.get('uTime');
								if (timeUniform) timeUniform.value = uniforms.uTime.value;
							});
						}
					});
					composer.render();
				} else {
					renderer.render(scene, camera);
				}

				raf = requestAnimationFrame(animate);
			};

			raf = requestAnimationFrame(animate);

			threeContext = {
				renderer,
				scene,
				camera,
				material,
				clock,
				clickIx: 0,
				uniforms,
				resizeObserver: ro,
				intersectionObserver: io,
				raf,
				quad,
				timeOffset,
				composer,
				touch,
				liquidEffect
			};
		} else {
			// Update existing context
			const t = threeContext!;
			t.uniforms.uShapeType.value = SHAPE_MAP[variant] ?? 0;
			t.uniforms.uPixelSize.value = pixelSize * t.renderer.getPixelRatio();
			t.uniforms.uColor.value.set(color);
			t.uniforms.uScale.value = patternScale;
			t.uniforms.uDensity.value = patternDensity;
			t.uniforms.uPixelJitter.value = pixelSizeJitter;
			t.uniforms.uEnableRipples.value = enableRipples ? 1 : 0;
			t.uniforms.uRippleIntensity.value = rippleIntensityScale;
			t.uniforms.uRippleThickness.value = rippleThickness;
			t.uniforms.uRippleSpeed.value = rippleSpeed;
			t.uniforms.uEdgeFade.value = edgeFade;

			if (transparent) t.renderer.setClearAlpha(0);
			else t.renderer.setClearColor(0x000000, 1);

			if (t.liquidEffect) {
				const liqEffect = t.liquidEffect as Effect & { uniforms: Map<string, THREE.Uniform> };
				const uStrength = liqEffect.uniforms.get('uStrength');
				if (uStrength) uStrength.value = liquidStrength;
				const uFreq = liqEffect.uniforms.get('uFreq');
				if (uFreq) uFreq.value = liquidWobbleSpeed;
			}

			if (t.touch) t.touch.radiusScale = liquidRadius;
		}

		prevConfig = cfg;
	};

	const cleanup = () => {
		if (!threeContext) return;
		const t = threeContext;
		t.resizeObserver?.disconnect();
		t.intersectionObserver?.disconnect();
		if (t.raf) cancelAnimationFrame(t.raf);
		t.quad?.geometry.dispose();
		t.material.dispose();
		t.composer?.dispose();
		t.renderer.dispose();
		if (t.renderer.domElement.parentElement === containerEl) {
			// Removes the same three.js-owned canvas appended above; Svelte never
			// tracked it, so this cannot desync its DOM.
			// eslint-disable-next-line svelte/no-dom-manipulating
			containerEl.removeChild(t.renderer.domElement);
		}
		threeContext = null;
	};

	onMount(() => {
		initThreeScene();
	});

	$effect(() => {
		// React to prop changes
		if (threeContext) {
			initThreeScene();
		}
	});

	onDestroy(() => {
		cleanup();
	});
</script>

<div
	bind:this={containerEl}
	class="pixel-blast-container {className}"
	{style}
	aria-label="PixelBlast interactive background"
></div>

<style>
	.pixel-blast-container {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		background-color: var(--background);
	}
</style>
