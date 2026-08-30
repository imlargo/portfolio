<script lang="ts">
	import { Check, Copy } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		language: string;
		code: string;
		/** HTML ya resaltado por Shiki, calculado en el servidor al cargar la página. */
		html?: string;
	};

	const { language, code, html }: Props = $props();

	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			toast.error('Could not copy to clipboard');
		}
	}
</script>

<figure class="group relative overflow-hidden rounded-2xl border bg-muted/40">
	<figcaption
		class="flex items-center justify-between border-b bg-muted/30 py-2 pr-2 pl-4 font-mono text-xs text-muted-foreground"
	>
		<span>{language}</span>

		<button
			type="button"
			onclick={copy}
			aria-label="Copy code"
			class="flex items-center gap-x-1.5 rounded-md px-2 py-1 opacity-0 transition-all group-hover:opacity-100 hover:bg-muted focus-visible:opacity-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
		>
			{#if copied}
				<Check class="size-3.5 text-success" />
				<span>Copied</span>
			{:else}
				<Copy class="size-3.5" />
				<span>Copy</span>
			{/if}
		</button>
	</figcaption>

	<!-- El `<pre><code>` de Shiki trae su propio fondo (el de Catppuccin Mocha)
	     y el color por token inline; acá solo se anulan fondo y márgenes para que
	     la superficie sea la tarjeta (`bg-muted/40`) y no una caja dentro de otra.
	     Sin `html` (content todavía no pasó por el resaltador) cae al texto
	     plano, para que el bloque nunca se quede vacío. -->
	<div class="code-block overflow-x-auto p-4 font-mono text-sm leading-relaxed">
		{#if html}
			<!-- El HTML lo genera Shiki en el servidor a partir del contenido propio
			     del sitio (`src/lib/content/blog.ts`), nunca de datos externos ni de
			     usuarios: no hay superficie de XSS que este `{@html}` esté abriendo. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html html}
		{:else}
			<pre><code>{code}</code></pre>
		{/if}
	</div>
</figure>

<style>
	.code-block :global(pre) {
		background: transparent !important;
		margin: 0;
	}
</style>
