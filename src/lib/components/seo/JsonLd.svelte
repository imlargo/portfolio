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
</script>

<svelte:head>
	<!-- El `{@html}` es la única forma de emitir un bloque de script desde
	     `svelte:head`: escrito como etiqueta literal, el compilador lo tomaría
	     como código del componente. -->
	{@html `<script type="application/ld+json">${payload}</script>`}
</svelte:head>
