<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Props = {
		/** La columna de opciones: qué se elige. Sin ella el escenario ocupa todo el marco. */
		aside?: Snippet;
		/** Barra fija al pie del escenario, para el código o el dato que acompaña lo elegido. */
		footer?: Snippet;
		children: Snippet;
		class?: string;
		stageClass?: string;
	};

	const { aside, footer, children, class: className, stageClass }: Props = $props();
</script>

<!-- El patrón de todas las diapositivas interactivas: un solo marco, las
     opciones a la izquierda y lo que muestran a la derecha, sobre una retícula
     de puntos que se desvanece hacia los bordes. Una forma para toda la clase,
     así el público aprende a leerla una vez. -->
<div
	class={cn(
		'grid grid-cols-1 overflow-hidden rounded-3xl border bg-background lg:grid-cols-12',
		className
	)}
>
	{#if aside}
		<div class="flex flex-col border-b lg:col-span-4 lg:border-r lg:border-b-0">
			{@render aside()}
		</div>
	{/if}

	<div class={cn('relative flex min-w-0 flex-col', aside ? 'lg:col-span-8' : 'lg:col-span-12')}>
		<div class="dots pointer-events-none absolute inset-0" aria-hidden="true"></div>
		<div class={cn('relative flex flex-1 flex-col p-6 md:p-8', stageClass)}>
			{@render children()}
		</div>
		{#if footer}
			<div class="relative border-t bg-muted/30">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>

<style>
	.dots {
		background-image: radial-gradient(
			color-mix(in oklab, var(--color-foreground) 14%, transparent) 1px,
			transparent 1px
		);
		background-size: 18px 18px;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
	}
</style>
