<script lang="ts">
	import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
	import { untrack } from 'svelte';

	// Props con valores por defecto
	let {
		color = [1, 1, 1],
		speed = 1.0,
		amplitude = 0.1,
		mouseReact = true,
		autoPauseOffscreen = true,
		class: className = '',
		style = ''
	}: {
		/** Color base como RGB, cada canal entre 0 y 1. */
		color?: [number, number, number];
		/** Multiplicador de velocidad de la animación. */
		speed?: number;
		/** Amplitud del desplazamiento provocado por el mouse. */
		amplitude?: number;
		/** Habilita la interacción del mouse con el shader. */
		mouseReact?: boolean;
		/** Detiene el render loop mientras el contenedor está fuera de viewport. */
		autoPauseOffscreen?: boolean;
		class?: string;
		style?: string;
	} = $props();

	const vertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

	const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

	let containerEl = $state<HTMLDivElement>();
	let program = $state.raw<Program>();

	// Setup de WebGL: sólo depende del contenedor, así que el contexto se crea
	// una vez. Los cambios de props se propagan por los efectos de abajo, que
	// escriben directo sobre los uniforms sin recrear el renderer.
	$effect(() => {
		const ctn = containerEl;
		if (!ctn) return;

		const renderer = new Renderer();
		const gl = renderer.gl;
		gl.clearColor(1, 1, 1, 1);

		const geometry = new Triangle(gl);
		const prog = new Program(gl, {
			vertex: vertexShader,
			fragment: fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: new Color(...untrack(() => color)) },
				uResolution: { value: new Color(1, 1, 1) },
				uMouse: { value: new Float32Array([0.5, 0.5]) },
				uAmplitude: { value: untrack(() => amplitude) },
				uSpeed: { value: untrack(() => speed) }
			}
		});
		const mesh = new Mesh(gl, { geometry, program: prog });

		const resize = () => {
			renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
			prog.uniforms.uResolution.value = new Color(
				gl.canvas.width,
				gl.canvas.height,
				gl.canvas.width / gl.canvas.height
			);
		};
		resize();

		window.addEventListener('resize', resize, false);
		const ro = new ResizeObserver(resize);
		ro.observe(ctn);

		let animateId = 0;
		let running = false;

		const update = (t: number) => {
			animateId = requestAnimationFrame(update);
			prog.uniforms.uTime.value = t * 0.001;
			renderer.render({ scene: mesh });
		};

		const start = () => {
			if (running) return;
			running = true;
			animateId = requestAnimationFrame(update);
		};
		const stop = () => {
			if (!running) return;
			running = false;
			cancelAnimationFrame(animateId);
		};

		let io: IntersectionObserver | undefined;
		if (untrack(() => autoPauseOffscreen)) {
			io = new IntersectionObserver((entries) => {
				if (entries.some((entry) => entry.isIntersecting)) start();
				else stop();
			});
			io.observe(ctn);
		} else {
			start();
		}

		// El canvas lo crea y lo destruye ogl; Svelte nunca lo referencia, así
		// que insertarlo a mano no puede desincronizar el DOM del componente.
		ctn.appendChild(gl.canvas);
		program = prog;

		return () => {
			stop();
			io?.disconnect();
			ro.disconnect();
			window.removeEventListener('resize', resize);
			program = undefined;
			gl.canvas.remove();
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		};
	});

	// Sincronización de uniforms con las props.
	$effect(() => {
		program?.uniforms.uColor.value.set(color[0], color[1], color[2]);
	});

	$effect(() => {
		if (program) program.uniforms.uAmplitude.value = amplitude;
	});

	$effect(() => {
		if (program) program.uniforms.uSpeed.value = speed;
	});

	$effect(() => {
		const ctn = containerEl;
		const prog = program;
		if (!mouseReact || !ctn || !prog) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = ctn.getBoundingClientRect();
			prog.uniforms.uMouse.value[0] = (e.clientX - rect.left) / rect.width;
			prog.uniforms.uMouse.value[1] = 1.0 - (e.clientY - rect.top) / rect.height;
		};

		ctn.addEventListener('mousemove', handleMouseMove);
		return () => ctn.removeEventListener('mousemove', handleMouseMove);
	});
</script>

<div bind:this={containerEl} class="iridescence-container {className}" {style}></div>

<style>
	.iridescence-container {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
</style>
