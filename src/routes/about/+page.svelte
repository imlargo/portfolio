<script lang="ts">
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

<div class="max-w-wx grid grid-cols-2 gap-x-24">
	<div class="flex flex-col gap-y-8">
		<h2 class="ty-h1 font-mono">Acerca de mi</h2>

		<div class="flex flex-col gap-y-4">
			<p class="max-w-prose text-pretty text-muted-foreground">
				¡Hola! me llamo <span>Juan Carlos Largo</span>, aunque quiza me conozcas como @imlargo. Soy un
				desarrollador de software, pero antes que nada, soy una persona con intereses y experiencias
				que van más allá de la programacion. Bienvenido a mi espacio personal!, donde comparto más
				sobre mi.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Además del desarrollo de software, tengo una variedad de intereses que me apasionan. Intento
				siempre encontrar tiempo para nadar, lo cual me mantiene motivado y energizado. Me encanta
				escuchar música, comer pizza, ver atardeceres y salir a caminar para relajarme y distraerme.
				Estas actividades me ayudan a mantener el equilibrio y a inspirarme para mis proyectos
				profesionales mientras disfruto aprendiendo cosas nuevas.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Siempre he pensado que saber de programación es cómo hacer magia en el mundo moderno, y es
				por eso que me encanta usar esta “magia” para crear soluciones que sean útiles y, sobre
				todo, que aporten un verdadero valor. En los próximos años, espero seguir aprendiendo,
				creciendo tanto personal como profesionalmente y sobre todo creando.
			</p>

			<p class="max-w-prose text-pretty text-muted-foreground">
				Y finalmente gracias por tomarte el tiempo de leer un poco sobre mí. Si quieres saber más o
				simplemente charlar, no dudes en contactarme. ¡Estoy siempre abierto a nuevas conexiones y
				oportunidades!
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