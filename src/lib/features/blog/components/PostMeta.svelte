<script lang="ts">
	import { formatDate } from '$lib/content/blog';
	import { cn } from '$lib/utils';

	type Props = {
		date: string;
		readingTime?: number;
		class?: string;
	};

	const { date, readingTime, class: className }: Props = $props();
</script>

<div
	class={cn(
		'flex items-center gap-x-2 font-mono text-sm leading-none font-medium text-muted-foreground',
		className
	)}
>
	<time datetime={date}>{formatDate(date)}</time>

	{#if readingTime}
		<span class="size-1 rounded-full bg-muted-foreground/50"></span>
		<span>{readingTime} min read</span>
	{/if}
</div>
