import type { Attachment } from 'svelte/attachments';
import { ScrollTrigger, prefersReducedMotion } from '$lib/gsap';
import { ALPHANUMERIC_CHARSET, createScrambler } from './scramble-core';

/**
 * Decrypt/scramble text-reveal, triggered once when the element scrolls
 * into view. Reuses the same "hacker terminal" character-cycling idea as
 * the footer wordmark, but tied to scroll instead of hover/interval.
 */
export function useScrambleReveal(): Attachment {
	return (element) => {
		const el = element as HTMLElement;
		const original = el.textContent ?? '';

		if (prefersReducedMotion() || !original.trim()) return;

		let stopScramble: (() => void) | null = null;

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: 'top 90%',
			once: true,
			onEnter: () => {
				stopScramble = createScrambler(
					() => original,
					(text) => (el.textContent = text),
					{ charset: ALPHANUMERIC_CHARSET, intervalMs: 28, increment: 1 / 2, preserveSpaces: true }
				);
			}
		});

		return () => {
			trigger.kill();
			stopScramble?.();
		};
	};
}
