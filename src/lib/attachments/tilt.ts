import type { Attachment } from 'svelte/attachments';
import { createHoverTracker, createQuickSetter, prefersReducedMotion } from '$lib/gsap';

/**
 * Subtle 3D tilt that follows the cursor, with a soft spring back on leave.
 * Adds a "premium" hover feel to feature/process cards.
 */
export function useTilt(maxTilt = 8): Attachment {
	return (element) => {
		if (prefersReducedMotion()) return;
		const el = element as HTMLElement;

		el.style.transformStyle = 'preserve-3d';
		el.style.willChange = 'transform';

		const setTilt = createQuickSetter(el, ['rotateX', 'rotateY', 'scale'], {
			duration: 0.5,
			ease: 'power3.out'
		});

		return createHoverTracker(
			el,
			(event, rect) => {
				const px = (event.clientX - rect.left) / rect.width;
				const py = (event.clientY - rect.top) / rect.height;
				setTilt({
					rotateY: (px - 0.5) * maxTilt * 2,
					rotateX: -(py - 0.5) * maxTilt * 2,
					scale: 1.015
				});
			},
			() => setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
		);
	};
}
