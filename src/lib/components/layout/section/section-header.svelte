<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useReveal } from '$lib/attachments/reveal';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="section-header"
	class={cn('flex flex-col gap-y-3', className)}
	{@attach useReveal()}
	{...restProps}
>
	{@render children?.()}
</div>
