<script lang="ts">
	import type { Technology } from '$lib/content/technology';
	import SkillBadge from './SkillBadge.svelte';
	import { ArrowUpRight } from '@lucide/svelte';

	type Props = {
		/** Columna izquierda: el rango de fechas. */
		period: string;
		title: string;
		/** Columna derecha: dónde pasó (empresa, cliente, institución). */
		context: string;
		description: string;
		technologies: Technology[];
		url?: string;
	};

	const { period, title, context, description, technologies, url }: Props = $props();
</script>

<!-- La fila del historial: la misma pieza para la experiencia de la home y para
     el archivo de /work, que solo se diferenciaban en cómo llamaban a sus
     campos. Tres columnas en escritorio (cuándo · qué · dónde) y una sola
     columna en móvil, donde el "dónde" se sube junto al título. -->
<div
	class="record-row group/row items-top py-item flex flex-col gap-y-4 lg:grid lg:grid-cols-3 lg:gap-x-8"
>
	<span
		class="font-mono text-sm text-muted-foreground transition-colors duration-500 group-hover/row:text-foreground"
	>
		{period}
	</span>

	<div class="flex w-full flex-col gap-y-4">
		<div class="flex flex-col gap-y-1">
			{#if url}
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					class="group/title flex items-center gap-x-1.5 text-lg font-medium hover:text-primary"
				>
					<span>{title}</span>
					<ArrowUpRight
						class="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5"
					/>
				</a>
			{:else}
				<span class="text-lg font-medium">{title}</span>
			{/if}

			<span class="font-mono text-sm text-muted-foreground lg:hidden">{context}</span>
		</div>

		<p class="w-full text-pretty text-muted-foreground">{description}</p>

		<div class="flex w-full flex-wrap gap-2">
			{#each technologies as tech (tech)}
				<SkillBadge {tech} />
			{/each}
		</div>
	</div>

	<span
		class="hidden text-end font-mono text-sm text-muted-foreground transition-colors duration-500 group-hover/row:text-foreground lg:block"
	>
		{context}
	</span>
</div>
