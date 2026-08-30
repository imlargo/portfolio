<script lang="ts">
	import type { Project } from '$lib/content/types';
	import SkillBadge from './SkillBadge.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import SocialIcon from '$lib/components/common/SocialIcon.svelte';
	import { ArrowUpRight } from '@lucide/svelte';

	type Props = {
		project: Project;
	};

	const { project }: Props = $props();
</script>

<!-- Misma gramática de tarjeta que Kora: esquina 4xl, relleno `p-card` y peso
     por superficie (`bg-muted/40`) en vez de por borde. El halo lila que se
     enciende al pasar sale del token de marca, así que es el mismo acento del
     hero y del rótulo de sección, no un morado suelto. -->
<article
	class="project p-card group relative flex h-full flex-col justify-between gap-y-8 overflow-hidden rounded-4xl border bg-muted/40 transition-colors duration-500 hover:bg-muted/60"
>
	<div class="relative flex flex-col gap-y-2">
		<h3 class="font-medium">{project.title}</h3>
		<p class="text-pretty text-muted-foreground">
			{project.description}
		</p>
	</div>

	<div class="relative flex flex-col gap-y-6">
		<div class="flex flex-wrap gap-2">
			{#each project.technologies as tech (tech)}
				<SkillBadge {tech} />
			{/each}
		</div>

		<div class="flex w-full items-center justify-between gap-x-4 overflow-hidden">
			{#if project.url}
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					class="link-underline flex min-w-0 items-center gap-x-1.5 font-mono text-sm text-muted-foreground hover:text-foreground"
				>
					<span class="truncate">{project.url.replace('https://', '')}</span>
					<ArrowUpRight class="size-4 shrink-0" />
				</a>
			{:else}
				<span></span>
			{/if}

			{#if project.github}
				<Button
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					variant="outline"
					size="icon-sm"
					aria-label="{project.title} on GitHub"
				>
					<SocialIcon platform="github" />
				</Button>
			{/if}
		</div>
	</div>
</article>

<style>
	/* El halo va detrás del contenido y no en un elemento propio: un
	   pseudo-elemento no necesita marcado ni puede recibir foco, y el difuminado
	   solo se recalcula cuando cambia su color, no en cada frame. */
	.project::before {
		content: '';
		position: absolute;
		top: -25%;
		right: -20%;
		aspect-ratio: 1 / 1;
		height: 100%;
		border-radius: 50%;
		filter: blur(45px);
		background: color-mix(in oklab, var(--color-brand) 20%, transparent);
		transition: background 0.5s var(--ease-out-expo);
	}

	.project:hover::before {
		background: color-mix(in oklab, var(--color-brand) 32%, transparent);
	}

	/* El grano encima del halo es lo que evita que se lea como un degradado de
	   plantilla: le da textura a la esquina sin agregar una capa animada. */
	.project::after {
		content: '';
		position: absolute;
		top: -25%;
		right: -20%;
		aspect-ratio: 1 / 1;
		height: 100%;
		border-radius: 50%;
		background-image: url('/assets/noise.webp');
		background-size: 30%;
		mix-blend-mode: overlay;
		opacity: 0.6;
		mask-image: radial-gradient(#fff, transparent 75%);
	}
</style>
