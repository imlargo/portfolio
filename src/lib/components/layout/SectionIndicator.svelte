<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useScrambleReveal } from '$lib/attachments/scramble';
	import { cn } from '$lib/utils';

	type Props = {
		children: Snippet;
		/** Para secciones con fondo invertido, donde `text-muted-foreground` no contrasta. */
		class?: string;
	};

	const { children, class: className }: Props = $props();
</script>

<span class={cn('flex max-w-max items-center gap-x-2 text-muted-foreground', className)}>
	<span>/</span>
	<span {@attach useScrambleReveal()}>{@render children()}</span>
</span>
