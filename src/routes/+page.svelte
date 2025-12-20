<script lang="ts">
	import AnimatedBadge from '$lib/components/common/AnimatedBadge.svelte';
	import Experience from '$lib/components/landing/Experience.svelte';
	import Project from '$lib/components/landing/Project.svelte';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { experience, projects } from '$lib/content/content';
	import { Technology } from '$lib/content/technology';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-col gap-y-12 py-10">
	<img src="/assets/pfp.jpg" alt="" class="size-24 rounded-full" />

	<div class="flex flex-col gap-y-4">
		<AnimatedBadge text="Available for freelance">
			<span
				class="size-1.5 shrink-0 rounded-full bg-purple-500 leading-0 ring-2 ring-purple-800 outline-2 outline-offset-2 outline-purple-900/50"
			></span>
		</AnimatedBadge>

		<h1 class="scroll-m-20 text-5xl font-extrabold tracking-tight text-balance">Hi, i'm largo</h1>

		<p class="max-w-prose text-xl text-muted-foreground">
			Ingeniero de Software Full Stack (Mid-Level) con experiencia solida desarollando y liderando
			el ciclo completo de desarrollo de productos de software escalables.
		</p>
	</div>

	<div class="flex items-center gap-x-2">
		<Button variant="secondary">Curriculum</Button>
		<Button>Contactame</Button>

		<div class="mx-4 h-5 w-0.5 bg-muted"></div>

		<Button variant="ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-github"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
				/>
			</svg>
		</Button>

		<Button variant="ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-linkedin"
				viewBox="0 0 16 16"
			>
				<path
					d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
				/>
			</svg>
		</Button>
	</div>
</div>

<hr />

<div class="relative grid grid-cols-2 gap-12">
	<div class="sticky top-10 flex flex-col gap-y-4 self-start">
		<span class="max-w-prose text-xl text-muted-foreground">2.</span>
		<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">Mi experiencia</h2>

		<p class="max-w-prose text-xl text-muted-foreground">
			Especialista en Golang, Svelte y TypeScript, he diseñado, puesto en producción y operado
			arquitecturas de alto rendimiento en multiples sectores.
		</p>

		<div class="mt-8 flex items-center gap-x-2">
			<Button>Contacto</Button>
		</div>
	</div>

	<div class="relative">
		<div class="flex flex-col gap-y-18 pl-8">
			{#each experience as exp}
				<Experience experience={exp} />
			{/each}
		</div>

		<div class="line absolute top-2 left-0 h-full w-0.5 rounded-full bg-muted"></div>
	</div>
</div>

<hr />

<div class="relative flex flex-col gap-12">
	<div class="flex flex-col gap-y-4">
		<span class="max-w-prose text-xl text-muted-foreground">3.</span>
		<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">Proyectos</h2>

		<p class="max-w-prose text-xl text-muted-foreground">
			Me destaco por mi visión integral del producto desde arquitectura e infraestructura hasta UX y
			estrategia, con fuerte ownership, capacidad para gestionar integraciones complejas, resolver
			incidentes en producción y traducir problemas técnicos complejos en soluciones claras y de
			alto impacto
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project}
			<Project {project} />
		{/each}
	</div>
</div>

<div class="relative flex flex-col gap-12">
	<div class="flex flex-col gap-y-4">
		<span class="max-w-prose text-xl text-muted-foreground">4.</span>
		<h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">Habilidades y Tecnologias</h2>

		<p class="max-w-prose text-xl text-muted-foreground">
			Amplia experiencia en desarrollo full stack con énfasis en backend con Go y frontend con
			Svelte/TypeScript. Habilidades sólidas en diseño de arquitecturas escalables, optimización de
			performance, integración de APIs y gestión de infraestructura en la nube.
		</p>
	</div>

	<div class="flex flex-col gap-y-4">
		<div class="flex flex-col gap-y-4">
			<h3 class="text-2xl font-semibold">Frontend</h3>
			<div class="flex flex-wrap gap-2">
				<SkillBadge tech={Technology.Svelte} />
				<SkillBadge tech={Technology.Typescript} />
				<SkillBadge tech={Technology.Tailwind} />
				<SkillBadge tech={Technology.Astro} />
				<SkillBadge tech={Technology.React} />
				<SkillBadge tech={Technology.Html} />
				<SkillBadge tech={Technology.Css} />
			</div>

			<h3 class="text-2xl font-semibold">Backend</h3>
			<div class="flex flex-wrap gap-2">
				<SkillBadge tech={Technology.Go} />
				<SkillBadge tech={Technology.NodeJs} />
				<SkillBadge tech={Technology.Python} />
				<SkillBadge tech={Technology.Postgres} />
				<SkillBadge tech={Technology.Redis} />
			</div>

			<h3 class="text-2xl font-semibold">DevOps</h3>
			<div class="flex flex-wrap gap-2">
				<SkillBadge tech={Technology.Docker} />
				<SkillBadge tech={Technology.CiCd} />
				<SkillBadge tech={Technology.Aws} />
				<SkillBadge tech={Technology.Git} />
				<SkillBadge tech={Technology.Github} />
				<SkillBadge tech={Technology.Githubactions} />
			</div>
		</div>
	</div>
</div>

<style>
	.line {
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 75%, rgba(255, 255, 255, 0) 100%);
	}
</style>
