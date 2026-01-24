<script lang="ts">
	import { Technology } from '$lib/assets/content/technology';
	import AnimatedBadge from '$lib/components/common/AnimatedBadge.svelte';
	import Cta from '$lib/components/common/Cta.svelte';
	import SocialIcon from '$lib/components/kit/social-icon/SocialIcon.svelte';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="max-w-wx grid gap-x-24 gap-y-12 lg:grid-cols-2">
	<div class="flex flex-col gap-y-8">
		<h2 class="ty-h1 font-mono">Acerca de mi</h2>

		<div class="flex flex-col gap-y-4">
			<p class="max-w-prose text-pretty text-muted-foreground">
				Hola, soy <span class="font-semibold text-foreground">Juan Carlos Largo</span> (<span
					class="ty-inlinecode">@imlargo</span
				>). ingeniero de software full stack y constructor de productos digitales.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Me especializo en diseñar, desarrollar y operar aplicaciones web escalables de principio a
				fin: desde la arquitectura y la infraestructura, pasando por el backend y el frontend, hasta
				llegar a la experiencia de usuario y la lógica de negocio. Trabajo principalmente con
				<SkillBadge class="inline-flex rounded-md bg-muted/50 py-0.5" tech={Technology.Go} />, <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Typescript}
				/> y <SkillBadge
					class="inline-flex rounded-md bg-muted/50 py-0.5"
					tech={Technology.Svelte}
				/>, y disfruto construir sistemas que no solo funcionan bien, sino que resuelven problemas
				reales de forma clara y sostenible.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				A lo largo de mi experiencia he liderado el ciclo completo de desarrollo de productos en
				distintos contextos: desde plataformas SaaS de alcance internacional, hasta sistemas
				internos de misión crítica para la Universidad Nacional de Colombia, además de proyectos
				freelance y colaboraciones con startups. Me siento cómodo tomando ownership técnico,
				gestionando integraciones complejas, resolviendo incidentes en producción y traduciendo
				necesidades de negocio en soluciones técnicas bien pensadas y escalables
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				También dedico una parte importante de mi tiempo a crear side projects y herramientas open
				source. Entre ellos destaca Pegaso, una plataforma utilizada por miles de estudiantes para
				facilitar la creación de horarios académicos, y CopyWhisper, una aplicación impulsada por IA
				para analizar y mejorar el copywriting de páginas web, reconocida como proyecto destacado en
				una hackathon de Vercel/Midudev. Suelo construir librerías, templates y herramientas a
				partir de necesidades reales que encuentro en mi día a día como desarrollador, con el
				objetivo de aprender y aportar a la comunidad.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Más allá del código, creo firmemente que el desarrollo de software es una forma moderna de
				“hacer magia”: convertir ideas abstractas en sistemas que generan impacto. Me interesa
				entender el producto como un todo, colaborar de cerca con equipos de negocio y mantener
				siempre un enfoque práctico, claro y orientado a valor.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Si te interesa colaborar, charlar sobre tecnología o construir algo juntos, siempre estoy
				abierto a nuevas conexiones.
			</p>
		</div>
	</div>

	<div class="flex flex-col gap-y-4">
		<div class="relative aspect-square w-full overflow-hidden rounded-lg border-2">
			<img src="/assets/pfp.jpg" alt="" class="aspect-square h-full w-full object-cover" />
		</div>

		<div class="flex flex-wrap gap-2">
			<Button variant="secondary" size="icon">
				<SocialIcon platform="github" />
			</Button>

			<Button variant="secondary" size="icon">
				<SocialIcon platform="instagram" />
			</Button>

			<Button variant="secondary" size="icon">
				<SocialIcon platform="linkedin" />
			</Button>
		</div>
	</div>
</div>

<Cta />
