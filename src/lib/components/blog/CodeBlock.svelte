<script lang="ts">
	import { Check, Copy } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		language: string;
		code: string;
	};

	const { language, code }: Props = $props();

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

<figure class="group relative overflow-hidden rounded-lg border bg-card/50">
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

	<pre class="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground/90"><code
			>{code}</code
		></pre>
</figure>
