<script lang="ts">
	import { getLabel, Technology } from "$lib/types/technology";
import { Badge } from "$lib/components/ui/badge/index.js";
    type Props = {
        tech: Technology;
    };

    const { tech }: Props = $props();
</script>

<Badge variant="outline" class="flex gap-x-2 items-center justify-center py-1">
    <span class="flex size-3 rounded-full border-2"></span>
    <span class="text-center font-semibold">{getLabel(tech)}</span>
</Badge>