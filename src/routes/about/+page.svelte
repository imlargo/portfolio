<script lang="ts">
	import AnimatedBadge from '$lib/components/common/AnimatedBadge.svelte';
	import SkillBadge from '$lib/components/landing/SkillBadge.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="max-w-wx grid grid-cols-2 gap-x-24">
	<div class="flex flex-col gap-y-4">
		<h2 class="scroll-m-20 pb-2 font-mono text-3xl font-semibold tracking-tight first:mt-0">
			Acerca de mi
		</h2>

		<div class="flex flex-col gap-y-4">
			<p class="text-muted-foreground">
				¡Hola! me llamo Juan Carlos Largo, aunque quiza me conozcas como @imlargo. Soy un
				desarrollador de software, pero antes que nada, soy una persona con intereses y experiencias
				que van más allá de la programacion. Bienvenido a mi espacio personal!, donde comparto más
				sobre mi.
			</p>

			<p class="text-muted-foreground">
				Además del desarrollo de software, tengo una variedad de intereses que me apasionan. Intento
				siempre encontrar tiempo para nadar, lo cual me mantiene motivado y energizado. Me encanta
				escuchar música, comer pizza, ver atardeceres y salir a caminar para relajarme y distraerme.
				Estas actividades me ayudan a mantener el equilibrio y a inspirarme para mis proyectos
				profesionales mientras disfruto aprendiendo cosas nuevas.
			</p>

			<p class="text-muted-foreground">
				Siempre he pensado que saber de programación es cómo hacer magia en el mundo moderno, y es
				por eso que me encanta usar esta “magia” para crear soluciones que sean útiles y, sobre
				todo, que aporten un verdadero valor. En los próximos años, espero seguir aprendiendo,
				creciendo tanto personal como profesionalmente y sobre todo creando.
			</p>

			<p class="text-muted-foreground">
				Y finalmente gracias por tomarte el tiempo de leer un poco sobre mí. Si quieres saber más o
				simplemente charlar, no dudes en contactarme. ¡Estoy siempre abierto a nuevas conexiones y
				oportunidades!
			</p>
		</div>
	</div>

	<div class="flex flex-col gap-y-4">
		<img src="/assets/pfp.jpg" alt="" class="aspect-square w-full rounded-lg object-cover" />

		<div class="flex flex-wrap gap-2">
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
</div>
