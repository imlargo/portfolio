<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	type Props = {
		children: Snippet;
		class?: string;
	};

	const { children, class: className }: Props = $props();
</script>

<!--
	Aro de 1px con un arco de luz que gira (gradiente cónico), superficie interior
	opaca y chip a la izquierda.

	Los colores salen de los tokens y no de hex fijos: el mismo componente tiene
	que sostenerse sobre blanco y sobre negro. El aro base (`bg-foreground/12`) es
	lo que hace que el contorno exista siempre: sin él solo se vería el arco y el
	resto del borde desaparecería.
-->
<span
	class={cn(
		'relative inline-flex w-fit items-center overflow-hidden rounded-full bg-foreground/12 p-px text-xs font-medium shadow-xl shadow-muted/60',
		className
	)}
>
	<span class="arc absolute inset-[-1000%]" aria-hidden="true"></span>

	<span
		class="relative flex items-center gap-x-2 rounded-full bg-background p-1.5 backdrop-blur-3xl"
	>
		<!-- El punto es el único color de la vista: el mismo lila del canvas del
		     hero, con su halo, como lo tuvo siempre. -->
		<span
			class="ml-1 flex size-1.5 shrink-0 rounded-full bg-brand ring-2 ring-brand/40 outline-2 outline-offset-2 outline-brand/20"
			aria-hidden="true"
		></span>
		<span class="shine pr-2 font-mono">{@render children()}</span>
	</span>
</span>

<style>
	/* El arco no va de un color a otro: va de transparente a foreground y vuelve,
	   así el aro base se sigue viendo por debajo en el resto del recorrido. */
	.arc {
		background: conic-gradient(
			from 90deg at 50% 50%,
			transparent 0%,
			color-mix(in oklab, var(--color-foreground) 55%, transparent) 50%,
			transparent 100%
		);
		animation: arc 3s linear infinite;
	}

	@keyframes arc {
		to {
			transform: rotate(360deg);
		}
	}

	/* El brillo es el degradado pintado dentro de las letras. Los extremos van en
	   `muted-foreground` —no en transparente— para que el texto exista siempre y
	   solo el punto medio se aclare al pasar. */
	.shine {
		background-image: linear-gradient(
			120deg,
			var(--color-muted-foreground) 40%,
			var(--color-foreground) 50%,
			var(--color-muted-foreground) 60%
		);
		background-size: 200% 100%;
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
		-webkit-text-fill-color: transparent;
		animation: shine 3s linear infinite;
	}

	@keyframes shine {
		from {
			background-position: 200% 0;
		}
		to {
			background-position: -100% 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.arc {
			animation: none;
		}

		.shine {
			background-image: none;
			animation: none;
			color: var(--color-muted-foreground);
			-webkit-text-fill-color: var(--color-muted-foreground);
		}
	}
</style>
