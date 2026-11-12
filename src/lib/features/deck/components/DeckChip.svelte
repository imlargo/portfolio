<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Icon } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type Props = {
		children: Snippet;
		icon?: typeof Icon;
		class?: string;
	};

	const { children, icon: ChipIcon, class: className }: Props = $props();
</script>

<!-- Píldora mono de borde fino para los datos sueltos de la presentación
     (precio fijo, posición, punto de partida, conteos). Una sola forma para
     todos, en vez de mezclarla con los badges de la interfaz. -->
<span
	class={cn(
		'inline-flex w-fit items-center gap-x-1.5 rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground',
		className
	)}
>
	{#if ChipIcon}
		<ChipIcon class="size-3.5" />
	{/if}
	{@render children()}
</span>
