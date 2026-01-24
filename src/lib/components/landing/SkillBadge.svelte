<script lang="ts">
	import { getColor, getLabel, Technology } from '$lib/assets/content/technology';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils';
	type Props = {
		tech: Technology;
		class?: string;
	};

	const { tech, class: className }: Props = $props();
</script>

<Badge variant="outline" class={cn('flex items-center justify-center gap-x-2 py-1', className)}>
	<span class="flex size-2.5 rounded-full border" style:border-color="{getColor(tech)}!important"
	></span>
	<span class="text-center font-semibold text-muted-foreground">{getLabel(tech)}</span>
</Badge>
