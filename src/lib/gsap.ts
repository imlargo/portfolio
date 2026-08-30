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

/** Cursor-follow effects (magnetic buttons, tilt, custom cursor) only make sense with a mouse. */
export function prefersFinePointer() {
	return browser && window.matchMedia('(pointer: fine)').matches;
}

/** Default ScrollTrigger start position shared by the once-off reveal attachments. */
export const DEFAULT_REVEAL_START = 'top 85%';

/** Runs `setup` inside a `gsap.context` scoped to `el` and returns the matching cleanup. */
export function withScrollContext(el: Element, setup: () => void): () => void {
	const ctx = gsap.context(setup, el);
	return () => ctx.revert();
}

/**
 * Creates one `gsap.quickTo` tween per property and returns a single setter,
 * so cursor/hover-follow effects can update several properties (x/y,
 * rotateX/rotateY/scale, ...) through one call instead of wiring up each
 * `quickTo` individually.
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

/**
 * Wires up mouseenter/mousemove/mouseleave for a cursor-follow effect: the
 * element's rect is cached on enter (not re-read on every move, since it
 * doesn't change mid-hover), then `onMove` fires with the cached rect on
 * every move and `onLeave` on leave. Returns the cleanup.
 */
export function createHoverTracker(
	el: HTMLElement,
	onMove: (event: MouseEvent, rect: DOMRect) => void,
	onLeave: () => void
): () => void {
	let rect = el.getBoundingClientRect();
	const handleEnter = () => {
		rect = el.getBoundingClientRect();
	};
	const handleMove = (event: MouseEvent) => onMove(event, rect);

	el.addEventListener('mouseenter', handleEnter);
	el.addEventListener('mousemove', handleMove);
	el.addEventListener('mouseleave', onLeave);

	return () => {
		el.removeEventListener('mouseenter', handleEnter);
		el.removeEventListener('mousemove', handleMove);
		el.removeEventListener('mouseleave', onLeave);
	};
}

export { gsap, ScrollTrigger, SplitText };
