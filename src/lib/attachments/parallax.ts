import type { Attachment } from 'svelte/attachments';
import { gsap, prefersReducedMotion, withScrollContext } from '$lib/gsap';

/**
 * Scrubbed vertical parallax: the element drifts by `distance` px
 * as its container crosses the viewport.
 */
export function useParallax(distance = 80): Attachment {
	return (element) => {
		if (prefersReducedMotion()) return;
		const el = element as HTMLElement;

		return withScrollContext(el, () => {
			gsap.fromTo(
				el,
				{ y: distance },
				{
					y: -distance,
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);
		});
	};
}
