import type { Attachment } from 'svelte/attachments';

const DEFAULT_CHARSET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?';
const LOWERCASE_CHARSET = 'abcdefghijklmnopqrstuvwxyz';

function DispatchHyperTextEffect(element: HTMLElement) {
	let interval: any = null;
	const letters = LOWERCASE_CHARSET;

	let iteration = 0;
	clearInterval(interval);
	interval = setInterval(() => {
		const elementValue: any = element.dataset.value;

		element.innerText = element.innerText
			.split('')
			.map((letter, index) => {
				if (index < iteration) {
					return elementValue[index];
				}

				return letters[Math.floor(Math.random() * 26)];
			})
			.join('');

		if (iteration >= elementValue.length) {
			clearInterval(interval);
		}

		iteration += 1 / 3;
	}, 30);
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
