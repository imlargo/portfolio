import type { Attachment } from 'svelte/attachments';
import { DEFAULT_REVEAL_START, gsap, prefersReducedMotion, withScrollContext } from '$lib/gsap';

/**
 * Counts up to the numeric portion of `value` when it scrolls into view,
 * keeping any non-numeric prefix/suffix static (e.g. "+12", "100%", "24/7").
 */
export function useCounter(value: string, duration = 1.4): Attachment {
	return (element) => {
		const el = element as HTMLElement;
		el.textContent = value;

		if (prefersReducedMotion()) return;

		const match = value.match(/^(\D*)(\d+)(.*)$/);
		if (!match) return;

		const [, prefix, numberStr, suffix] = match;
		const target = parseInt(numberStr, 10);
		const counter = { value: 0 };
		el.textContent = `${prefix}0${suffix}`;

		return withScrollContext(el, () => {
			gsap.to(counter, {
				value: target,
				duration,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: DEFAULT_REVEAL_START,
					once: true
				},
				onUpdate: () => {
					el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
				}
			});
		});
	};
}
