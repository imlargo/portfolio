import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (browser) {
	gsap.registerPlugin(ScrollTrigger, SplitText);
}

export function prefersReducedMotion() {
	return browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Posición de disparo por defecto que comparten los reveals de una sola vez. */
export const DEFAULT_REVEAL_START = 'top 85%';

/** Corre `setup` dentro de un `gsap.context` acotado a `el` y devuelve su limpieza. */
export function withScrollContext(el: Element, setup: () => void): () => void {
	const ctx = gsap.context(setup, el);
	return () => ctx.revert();
}

export { gsap, ScrollTrigger, SplitText };
