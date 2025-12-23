<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		text?: string;
		children?: Snippet;
	};

	const { children, class: className = '', text = '' }: Props = $props();
</script>

<div
	class={cn(
		'relative flex max-w-max items-center justify-center gap-2 overflow-hidden rounded-full p-[1px] text-xs font-medium shadow-xl shadow-muted/60 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none',
		className
	)}
>
	<span
		class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a1a1a180_0%,#262626_50%,#a1a1a180_100%)]"
	></span>

	<div
		class="flex h-full w-full items-center justify-center rounded-full bg-background text-center backdrop-blur-3xl"
	>
		<div
			class="flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary/50 px-3 py-1.5"
		>
			{@render children?.()}
			<span class="shine-text bg-clip-text text-muted-foreground">{text}</span>
		</div>
	</div>
</div>

<style>
	@keyframes shine {
		0% {
			background-position: 100%;
		}
		100% {
			background-position: -100%;
		}
	}

	.shine-text {
		--animation-duration: 2s;
		background-image: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0) 40%,
			rgba(255, 255, 255, 1) 50%,
			rgba(255, 255, 255, 0) 60%
		);
		background-size: 200% 100%;
		-webkit-background-clip: text;
		background-clip: text;
		animation-duration: var(--animation-duration);
		animation: shine var(--animation-duration) linear infinite;
	}
</style>
