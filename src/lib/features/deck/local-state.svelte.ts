/**
 * Un valor que sobrevive a recargar la página, guardado en el navegador de
 * quien la abre. Sirve para lo que se anota en vivo durante una charla y para
 * el progreso de quien vuelve a la presentación después; nunca sale del equipo.
 */
export class LocalState<T> {
	value = $state() as T;

	#key: string;
	#initial: T;
	#isValid: (value: unknown) => value is T;
	// Hasta leer lo guardado no se escribe: si no, el primer guardado pisaría lo
	// de la sesión anterior con el valor inicial.
	#loaded = false;

	constructor(key: string, initial: T, isValid: (value: unknown) => value is T) {
		this.#key = key;
		this.#initial = initial;
		this.#isValid = isValid;
		this.value = initial;
	}

	/** Lee lo guardado. Va en `onMount`: en el servidor no hay almacenamiento. */
	load() {
		try {
			const saved = localStorage.getItem(this.#key);
			const parsed: unknown = saved ? JSON.parse(saved) : null;
			if (this.#isValid(parsed)) this.value = parsed;
		} catch {
			// Almacenamiento bloqueado o JSON corrupto: se arranca con el valor inicial.
		}
		this.#loaded = true;
	}

	/** Pensado para correr dentro de un `$effect`: lee el valor, así se vuelve a guardar con cada cambio. */
	persist() {
		const snapshot = JSON.stringify(this.value);
		if (!this.#loaded) return;
		try {
			localStorage.setItem(this.#key, snapshot);
		} catch {
			// Sin almacenamiento el valor vive solo en la pestaña abierta.
		}
	}

	reset() {
		this.value = this.#initial;
	}
}

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every(isString);
