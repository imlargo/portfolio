<script lang="ts" module>
	type Token =
		| { kind: 'text'; value: string }
		| { kind: 'strong'; value: string }
		| { kind: 'em'; value: string }
		| { kind: 'code'; value: string }
		| { kind: 'link'; value: string; href: string };

	const PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
	const LINK = /^\[([^\]]+)\]\(([^)]+)\)$/;

	function tokenize(text: string): Token[] {
		return text
			.split(PATTERN)
			.filter(Boolean)
			.map((chunk): Token => {
				if (chunk.startsWith('**') && chunk.endsWith('**')) {
					return { kind: 'strong', value: chunk.slice(2, -2) };
				}

				if (chunk.startsWith('`') && chunk.endsWith('`')) {
					return { kind: 'code', value: chunk.slice(1, -1) };
				}

				const link = LINK.exec(chunk);
				if (link) {
					return { kind: 'link', value: link[1], href: link[2] };
				}

				if (chunk.startsWith('*') && chunk.endsWith('*') && chunk.length > 2) {
					return { kind: 'em', value: chunk.slice(1, -1) };
				}

				return { kind: 'text', value: chunk };
			});
	}
</script>

<script lang="ts">
	type Props = {
		text: string;
	};

	const { text }: Props = $props();

	const tokens = $derived(tokenize(text));
</script>

{#each tokens as token, index (index)}
	{#if token.kind === 'strong'}
		<strong class="font-medium text-foreground">{token.value}</strong>
	{:else if token.kind === 'em'}
		<em class="italic">{token.value}</em>
	{:else if token.kind === 'code'}
		<code class="ty-inlinecode text-foreground">{token.value}</code>
	{:else if token.kind === 'link'}
		<a
			href={token.href}
			target={token.href.startsWith('http') ? '_blank' : undefined}
			rel={token.href.startsWith('http') ? 'noreferrer' : undefined}
			class="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
			>{token.value}</a
		>
	{:else}{token.value}{/if}
{/each}
