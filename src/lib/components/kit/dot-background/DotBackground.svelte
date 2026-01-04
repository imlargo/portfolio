<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		class?: string;
	};

	const { class: className }: Props = $props();
</script>

<div
	class={cn(
		'absolute inset-0',
		'[background-size:20px_20px]',
		'[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
		'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]',
		className
	)}
></div>
