export const ALPHANUMERIC_CHARSET =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

type ScrambleOptions = {
	charset: string;
	intervalMs: number;
	/** Fraction of a character revealed per tick (e.g. 1/3 reveals one letter every 3 ticks). */
	increment: number;
	preserveSpaces?: boolean;
};

/**
 * Shared "hacker terminal" character-cycling loop: repeatedly rewrites
 * `setText` with an increasingly-revealed scramble of whatever `getTarget()`
 * currently returns, until fully resolved. Returns a stop function.
 */
export function createScrambler(
	getTarget: () => string,
	setText: (text: string) => void,
	options: ScrambleOptions
): () => void {
	const { charset, intervalMs, increment, preserveSpaces = false } = options;

	let iteration = 0;
	const interval = setInterval(() => {
		const target = getTarget();

		setText(
			target
				.split('')
				.map((char, index) => {
					if (index < iteration) return char;
					if (preserveSpaces && char === ' ') return ' ';
					return charset[Math.floor(Math.random() * charset.length)];
				})
				.join('')
		);

		if (iteration >= target.length) clearInterval(interval);
		iteration += increment;
	}, intervalMs);

	return () => clearInterval(interval);
}
