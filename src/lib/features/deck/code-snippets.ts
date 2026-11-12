import { createContext } from 'svelte';

/** Un fragmento de código de una presentación, tal como se escribe en su contenido. */
export type CodeSnippet = {
	/** Lenguaje para Shiki y para el rótulo del bloque. */
	language: string;
	/** Nombre de archivo o contexto que se muestra en el rótulo, si ayuda. */
	label?: string;
	code: string;
};

export type DeckCode = {
	snippets: Record<string, CodeSnippet>;
	/**
	 * El HTML ya resaltado de cada fragmento, por id. Lo arma el `load` del
	 * servidor durante el build, así Shiki nunca viaja al navegador.
	 */
	highlighted: Record<string, string>;
};

/** La presentación publica sus fragmentos una vez y cada bloque de código los lee por id. */
export const [getDeckCode, setDeckCode] = createContext<DeckCode>();
