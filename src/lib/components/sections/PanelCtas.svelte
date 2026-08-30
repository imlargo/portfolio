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

<!-- El par de llamados de los paneles oscuros. Los paneles se quedan oscuros en
     los dos temas, así que los botones no pueden salir de los tokens de tema:
     van forzados a blanco y a contorno blanco. Vive acá para que esa excepción
     exista una sola vez. -->
<div class={cn('flex flex-wrap gap-4', className)}>
	<Button href={primaryCta.href} class="bg-white text-neutral-950 hover:bg-white/90">
		{primaryCta.label}
	</Button>
	<Button
		href={secondaryCta.href}
		variant="outline"
		class="border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/10 hover:text-white"
	>
		{secondaryCta.label}
	</Button>
</div>
