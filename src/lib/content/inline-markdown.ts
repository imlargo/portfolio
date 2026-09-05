/**
 * La sintaxis en línea que acepta la prosa del contenido: `**fuerte**`,
 * `*énfasis*`, `` `código` `` y `[texto](url)`.
 *
 * Vive acá, y no dentro del componente que la pinta, porque hay tres consumidores
 * con necesidades distintas: la pantalla la convierte en etiquetas, el feed en
 * HTML sin clases, y los metadatos la tienen que borrar. Un buscador no
 * interpreta markdown, así que una descripción con acentos graves sale tal cual
 * en el resultado —acentos incluidos— y eso es lo que ve quien decide si entra.
 */

/** Cada marca, con lo que deja en texto plano y lo que deja en HTML. */
const RULES = [
	{ pattern: /\[([^\]]+)\]\(([^)]+)\)/g, plain: '$1', html: '<a href="$2">$1</a>' },
	{ pattern: /\*\*([^*]+)\*\*/g, plain: '$1', html: '<strong>$1</strong>' },
	{ pattern: /`([^`]+)`/g, plain: '$1', html: '<code>$1</code>' },
	{ pattern: /\*([^*]+)\*/g, plain: '$1', html: '<em>$1</em>' }
];

/**
 * El patrón del tokenizador. Va aparte de `RULES` porque `String.prototype.split`
 * devuelve también los grupos de captura, así que este necesita las alternativas
 * sin capturar por dentro y una sola captura por fuera.
 */
export const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

/** El mismo texto sin marcas: lo que se ve en pantalla, en una sola línea. */
export function plainText(text: string): string {
	return RULES.reduce((value, rule) => value.replace(rule.pattern, rule.plain), text)
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Las marcas convertidas a HTML, para consumidores que muestran HTML pero no
 * comparten el CSS del sitio (hoy, el feed RSS).
 *
 * Espera el texto con las entidades XML ya escapadas: escapar después convertiría
 * en literales las etiquetas que esta función acaba de abrir.
 */
export function inlineHtml(escaped: string): string {
	return RULES.reduce((value, rule) => value.replace(rule.pattern, rule.html), escaped);
}
