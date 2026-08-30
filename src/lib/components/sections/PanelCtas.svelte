<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	type Cta = { label: string; href: string };

	let {
		primaryCta,
		secondaryCta,
		class: className
	}: {
		primaryCta: Cta;
		secondaryCta: Cta;
		class?: string;
	} = $props();
</script>

<!-- El par de llamados de los paneles oscuros (los tres cierres y el primer
     paso de about). Los paneles se quedan oscuros en los dos temas, así que los
     botones no pueden salir de los tokens de tema: van forzados a blanco y a
     contorno blanco. Vive acá para que esa excepción exista una sola vez.

     El `span` que envuelve cada botón no es decorativo: da una caja de bloque
     propia sobre la que animar sin arrastrar el layout del botón. -->
<div class={cn('flex flex-wrap gap-4', className)}>
	<span class="inline-block">
		<Button href={primaryCta.href} class="bg-white text-neutral-950 hover:bg-white/90">
			{primaryCta.label}
		</Button>
	</span>
	<span class="inline-block">
		<Button
			href={secondaryCta.href}
			variant="outline"
			class="border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/10 hover:text-white"
		>
			{secondaryCta.label}
		</Button>
	</span>
</div>
