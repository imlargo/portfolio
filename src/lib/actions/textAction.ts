function dispatchTextEffect(element: HTMLElement) {
	let interval: any = null;
	const letters = 'abcdefghijklmnopqrstuvwxyz';

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

export function textEffectAction(element: HTMLElement) {
	element.addEventListener('mouseover', (event: MouseEvent) => {
		dispatchTextEffect(event.target as HTMLElement);
	});

	setTimeout(() => {
		dispatchTextEffect(element);
	}, 2000);

	// Repetir cada 5 segundos
	setInterval(() => {
		dispatchTextEffect(element);
	}, 7000);
}
