<script lang="ts">
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	type Props = {
		eyebrow: string;
		title: string;
		description?: string;
		class?: string;
	};

	const { eyebrow, title, description, class: className }: Props = $props();
</script>

<!-- Encabezado de las diapositivas de contenido: título a la izquierda y bajada
     a la derecha, alineada abajo. Una sola forma para que la presentación se lea
     como una serie. -->
<div
	class={cn('grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-12', className)}
	{@attach useReveal({ targets: '.slide-head', stagger: 0.1 })}
>
	<div class="slide-head flex flex-col gap-y-4 lg:col-span-7">
		<SectionIndicator>{eyebrow}</SectionIndicator>
		<h2 class="max-w-3xl text-3xl text-balance md:text-5xl">{title}</h2>
	</div>
	{#if description}
		<p
			class="slide-head max-w-prose self-end text-pretty text-muted-foreground lg:col-span-4 lg:col-start-9"
		>
			{description}
		</p>
	{/if}
</div>
