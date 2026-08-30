import type { Attachment } from 'svelte/attachments';
import { gsap, SplitText, prefersReducedMotion, withScrollContext } from '$lib/gsap';

/**
 * Splits a heading into words and reveals them with a staggered
 * upward wipe | the signature "hero title" entrance used across
 * agency/product sites.
 */
export function useSplitTitle(delay = 0): Attachment {
	return (element) => {
		const el = element as HTMLElement;

		if (prefersReducedMotion()) return;

		let split: SplitText | null = null;

		const revertContext = withScrollContext(el, () => {
			split = SplitText.create(el, {
				type: 'words,lines',
				linesClass: 'split-line',
				autoSplit: true,
				mask: 'lines',
				onSplit(self) {
					return gsap.from(self.words, {
						yPercent: 110,
						opacity: 0,
						duration: 0.9,
						ease: 'power4.out',
						stagger: 0.045,
						delay
					});
				}
			});
		});

		return () => {
			revertContext();
			split?.revert();
		};
	};
}
