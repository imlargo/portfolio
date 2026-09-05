/**
 * La sintaxis en línea que acepta la prosa del contenido: `**fuerte**`, `*énfasis*`,
 * `` `código` `` y `[texto](url)`.
 *
 * El patrón vive acá, y no dentro del componente que lo pinta, porque hay dos
 * consumidores con necesidades opuestas: la pantalla lo convierte en etiquetas y
 * los metadatos lo tienen que borrar. Un buscador no interpreta markdown, así
 * que una descripción con acentos graves sale tal cual en el resultado —con los
 * acentos incluidos— y eso es lo que ve quien decide si entra o no.
 */
export const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

const LINK = /\[([^\]]+)\]\([^)]+\)/g;

/** El mismo texto sin marcas: lo que se ve en pantalla, en una sola línea. */
export function plainText(text: string): string {
	return text
		.replace(LINK, '$1')
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Las mismas marcas convertidas a HTML, para consumidores que muestran HTML pero
 * no comparten el CSS del sitio (hoy, el feed RSS).
 *
 * Espera texto con las entidades XML ya escapadas: escapar después convertiría en
 * literales las etiquetas que esta función acaba de abrir.
 */
export function inlineHtml(escaped: string): string {
	return escaped
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
		.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
		.replace(/`([^`]+)`/g, '<code>$1</code>')
		.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
