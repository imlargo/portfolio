<script lang="ts">
	import { Check, Copy } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { getDeckCode } from '../code-snippets';
	import { cn } from '$lib/utils';

	type Props = {
		/** Id del fragmento en el contenido de la presentación. */
		id: string;
		/** Sin borde ni fondo propios, para cuando el bloque ya vive dentro de un marco. */
		bare?: boolean;
		class?: string;
	};

	const { id, bare = false, class: className }: Props = $props();

	const code = getDeckCode();
	const snippet = $derived(code.snippets[id]);
	const html = $derived(code.highlighted[id]);

	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(snippet.code);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			toast.error('No se pudo copiar el código');
		}
	}
</script>

<!-- La misma pieza que los bloques del blog, con el rótulo en mono arriba. El
     botón de copiar siempre visible: en una charla nadie hace hover. -->
<figure
	class={cn(
		'flex min-w-0 flex-col overflow-hidden',
		bare ? 'bg-transparent' : 'rounded-2xl border bg-muted/40',
		className
	)}
>
	<figcaption
		class={cn(
			'flex items-center justify-between border-b py-1.5 pr-1.5 pl-4 font-mono text-xs text-muted-foreground',
			!bare && 'bg-muted/30'
		)}
	>
		<span>{snippet.label ?? snippet.language}</span>
		<button
			type="button"
			onclick={copy}
			aria-label="Copiar código"
			class="flex items-center gap-x-1.5 rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
		>
			{#if copied}
				<Check class="size-3.5 text-success" />
			{:else}
				<Copy class="size-3.5" />
			{/if}
		</button>
	</figcaption>

	<div class="code-block flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed">
		{#if html}
			<!-- Lo genera Shiki durante el build a partir del contenido propio de la
			     presentación, nunca de datos de usuarios: no abre una superficie de XSS. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html html}
		{:else}
			<pre><code>{snippet.code}</code></pre>
		{/if}
	</div>
</figure>

<style>
	.code-block :global(pre) {
		background: transparent !important;
		margin: 0;
	}
</style>
