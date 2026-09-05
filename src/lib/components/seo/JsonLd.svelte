<script lang="ts">
	type Props = {
		/** Un grafo JSON-LD ya serializado, tal como lo devuelve `structured-data.ts`. */
		schema: string;
	};

	const { schema }: Props = $props();

	// Todo `<` se escapa antes de entrar al `{@html}`. El contenido sale de datos
	// propios, no de entrada del usuario, pero una etiqueta de cierre de script
	// escrita dentro de un título o una descripción cortaría el bloque e
	// inyectaría el resto en el documento. `<` es un escape válido de JSON,
	// así que el parser del buscador lee exactamente el mismo grafo.
	const payload = $derived(schema.replace(/</g, '\\u003c'));

	// El nombre de la etiqueta va interpolado y no escrito literal: emitir un
	// bloque de script desde un componente exige que ni el compilador de Svelte ni
	// el analizador de ESLint vean la etiqueta abrirse o cerrarse en el archivo.
	const TAG = 'script';
	const tag = $derived(`<${TAG} type="application/ld+json">${payload}</${TAG}>`);
</script>

<svelte:head>
	<!-- La regla es correcta en general y acá no aplica: no hay entrada de usuario
	     en el grafo —sale de `src/lib/content`— y lo único que podría cerrar la
	     etiqueta, el `<`, ya viene escapado desde `payload`. Es la única forma de
	     emitir JSON-LD, que por especificación va dentro de un bloque de script. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html tag}
</svelte:head>
