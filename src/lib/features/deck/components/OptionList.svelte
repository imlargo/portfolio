<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Option = {
		id: string;
		label: string;
		/** Segunda línea que solo se abre en la opción elegida. */
		hint?: string;
		/** Dato corto a la derecha: un número, un método, un tamaño. */
		meta?: string;
		/** Sangría, para listas que son un árbol. */
		depth?: number;
	};

	type Props = {
		/** Rótulo de la columna; también nombra el grupo para lectores de pantalla. */
		title: string;
		options: readonly Option[];
		selected: string;
		/** Para rótulos de código: rutas, clases, métodos. */
		mono?: boolean;
		/** Lo que va al pie de la columna, debajo de las opciones. */
		footer?: Snippet;
	};

	let { title, options, selected = $bindable(), mono = false, footer }: Props = $props();
</script>

<!-- La columna de opciones del escenario: filas separadas por un filete, la
     elegida con una barra de acento a la izquierda y su segunda línea abierta. -->
<div class="flex flex-1 flex-col">
	<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">{title}</span>
	<div role="radiogroup" aria-label={title} class="flex flex-col divide-y">
		{#each options as option (option.id)}
			{@const active = option.id === selected}
			<button
				type="button"
				role="radio"
				aria-checked={active}
				onclick={() => (selected = option.id)}
				style:padding-left={option.depth ? `${1.25 + option.depth}rem` : undefined}
				class={cn(
					'relative flex flex-col gap-y-1 px-5 py-3.5 text-left transition-colors duration-300',
					active ? 'bg-muted/50 text-foreground' : 'text-muted-foreground hover:text-foreground'
				)}
			>
				<span
					class={cn(
						'absolute inset-y-0 left-0 w-0.5 bg-brand transition-opacity duration-300',
						active ? 'opacity-100' : 'opacity-0'
					)}
					aria-hidden="true"
				></span>
				<span class="flex items-center justify-between gap-x-3">
					<span class={cn('text-pretty', mono && 'font-mono text-sm')}>{option.label}</span>
					{#if option.meta}
						<span class="font-mono text-xs text-muted-foreground">{option.meta}</span>
					{/if}
				</span>
				{#if active && option.hint}
					<span class="animate-in text-sm text-pretty text-muted-foreground duration-500 fade-in">
						{option.hint}
					</span>
				{/if}
			</button>
		{/each}
	</div>
	{#if footer}
		<div class="mt-auto border-t p-5">{@render footer()}</div>
	{/if}
</div>
