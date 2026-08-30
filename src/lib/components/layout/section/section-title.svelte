<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLHeadingElement>> = $props();
</script>

<h2
	bind:this={ref}
	data-slot="section-title"
	class={cn('max-w-2xl text-3xl tracking-tight text-balance md:text-4xl', className)}
	{...restProps}
>
	{@render children?.()}
</h2>
