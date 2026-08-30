import type { Attachment } from 'svelte/attachments';
import { createScrambler } from './scramble-core';

const LOWERCASE_CHARSET = 'abcdefghijklmnopqrstuvwxyz';

function DispatchHyperTextEffect(element: HTMLElement) {
	createScrambler(
		() => element.dataset.value ?? '',
		(text) => (element.innerText = text),
		{ charset: LOWERCASE_CHARSET, intervalMs: 30, increment: 1 / 3 }
	);
}

export const useHyperText: Attachment = (element) => {
	let interval = null;
	const el = element as HTMLElement;

	const hoverHandler = (event: MouseEvent) => {
		DispatchHyperTextEffect(event.target as HTMLElement);
	};

	el.addEventListener('mouseover', hoverHandler);

	setTimeout(() => {
		DispatchHyperTextEffect(el);
	}, 2000);

	// Repetir cada 5 segundos
	interval = setInterval(() => {
		DispatchHyperTextEffect(el);
	}, 7000);

	// Cleanup
	return () => {
		el.removeEventListener('mouseover', hoverHandler);
		clearInterval(interval);
	};
};
