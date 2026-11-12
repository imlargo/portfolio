<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';

	type Props = {
		id: string;
		label: string;
		placeholder: string;
		value: string;
		class?: string;
	};

	let { id, label, placeholder, value = $bindable(), class: className }: Props = $props();
</script>

<!-- Borde punteado y sin relleno: tiene que leerse como una hoja para anotar,
     no como un formulario que el cliente deba llenar. Es una excepción
     deliberada a usar el Textarea tal cual, decidida por diseño. -->
<div class={cn('flex flex-col gap-y-3', className)}>
	<label for={id} class="font-mono text-xs text-muted-foreground">{label}</label>
	<Textarea
		{id}
		{placeholder}
		bind:value
		class="min-h-40 flex-1 rounded-2xl border-dashed bg-transparent px-5 py-4 text-base leading-relaxed md:text-base dark:bg-transparent"
	/>
</div>
