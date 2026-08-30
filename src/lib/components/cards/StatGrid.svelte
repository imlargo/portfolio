<script lang="ts">
	import type { Stat } from '$lib/content/types';
	import { useReveal } from '$lib/attachments/reveal';
	import { useCounter } from '$lib/attachments/counter';
	import { cn } from '$lib/utils';

	const { stats, class: className }: { stats: Stat[]; class?: string } = $props();
</script>

<!-- Las cifras cuentan hacia arriba al entrar en pantalla: es el único
     movimiento del bloque, y por eso se lleva la atención. -->
<dl
	class={cn('grid grid-cols-3 gap-6 border-y py-8', className)}
	{@attach useReveal({ targets: '.stat', stagger: 0.1 })}
>
	{#each stats as stat (stat.label)}
		<div class="stat flex flex-col gap-y-2">
			<dt class="sr-only">{stat.label}</dt>
			<dd class="flex flex-col gap-y-2">
				<span class="text-3xl font-bold tracking-tight" {@attach useCounter(stat.value)}>
					{stat.value}
				</span>
				<span class="text-sm text-pretty text-muted-foreground">{stat.label}</span>
			</dd>
		</div>
	{/each}
</dl>
