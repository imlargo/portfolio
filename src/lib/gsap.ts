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

/** Los efectos que siguen al puntero (el cursor de las presentaciones) solo tienen sentido con mouse. */
export function prefersFinePointer() {
	return browser && window.matchMedia('(pointer: fine)').matches;
}

/** Posición de disparo por defecto que comparten los reveals de una sola vez. */
export const DEFAULT_REVEAL_START = 'top 85%';

/** Corre `setup` dentro de un `gsap.context` acotado a `el` y devuelve su limpieza. */
export function withScrollContext(el: Element, setup: () => void): () => void {
	const ctx = gsap.context(setup, el);
	return () => ctx.revert();
}

export { gsap, ScrollTrigger, SplitText };

/**
 * Un `gsap.quickTo` por propiedad detrás de un solo setter, para que un efecto
 * que sigue al puntero actualice varias propiedades en una llamada.
 */
export function createQuickSetter<P extends string>(
	el: Element,
	props: P[],
	vars: gsap.TweenVars
): (values: Partial<Record<P, number>>) => void {
	const setters = Object.fromEntries(
		props.map((prop) => [prop, gsap.quickTo(el, prop, vars)])
	) as unknown as Record<P, (value: number) => void>;

	return (values) => {
		for (const prop in values) {
			const value = values[prop];
			if (value !== undefined) setters[prop](value);
		}
	};
}
