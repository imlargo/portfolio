import type { Attachment } from 'svelte/attachments';
import { DEFAULT_REVEAL_START, gsap, prefersReducedMotion, withScrollContext } from '$lib/gsap';

type RevealOptions = {
	/** Selector for children to animate individually. If omitted, the element itself animates. */
	targets?: string;
	/** Per-index offset function only makes sense for x (e.g. alternating left/right rows). */
	x?: number | ((index: number) => number);
	y?: number;
	scale?: number;
	rotate?: number;
	duration?: number;
	delay?: number;
	/** ScrollTrigger `start` position relative to the attached element. */
	start?: string;
	stagger?: number;
	blur?: boolean;
};

/**
 * Fade/slide-in reveal, triggered once the element scrolls into view.
 * Elements already in the viewport on load (e.g. the hero) animate immediately.
 */
export function useReveal(options: RevealOptions = {}): Attachment {
	return (element) => {
		const el = element as HTMLElement;

		const {
			targets,
			x = 0,
			y = 28,
			scale = 1,
			rotate = 0,
			duration = 0.9,
			delay = 0,
			start = DEFAULT_REVEAL_START,
			stagger = 0.1,
			blur = true
		} = options;

		if (prefersReducedMotion()) {
			gsap.set(targets ? el.querySelectorAll(targets) : el, { clearProps: 'all' });
			return;
		}

		const items = targets ? el.querySelectorAll(targets) : el;

		return withScrollContext(el, () => {
			gsap.fromTo(
				items,
				{
					x,
					y,
					scale,
					rotate,
					opacity: 0,
					filter: blur ? 'blur(8px)' : 'none'
				},
				{
					x: 0,
					y: 0,
					scale: 1,
					rotate: 0,
					opacity: 1,
					filter: 'blur(0px)',
					duration,
					delay,
					ease: 'power3.out',
					stagger,
					scrollTrigger: {
						trigger: el,
						start,
						once: true
					}
				}
			);
		});
	};
}
