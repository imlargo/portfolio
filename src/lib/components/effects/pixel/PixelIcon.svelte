<script lang="ts">
	import type { PixelIconMatrix } from './pixelIcons';

	let {
		matrix,
		class: className = ''
	}: {
		matrix: PixelIconMatrix;
		class?: string;
	} = $props();

	const gap = 0.16;

	const size = $derived(matrix[0]?.length ?? 0);
	const cells = $derived(
		matrix.flatMap((row, y) => [...row].flatMap((char, x) => (char === '1' ? [{ x, y }] : [])))
	);
</script>

<svg
	viewBox="0 0 {size} {size}"
	class={className}
	fill="currentColor"
	shape-rendering="crispEdges"
	aria-hidden="true"
>
	{#each cells as cell (`${cell.x}-${cell.y}`)}
		<rect x={cell.x + gap / 2} y={cell.y + gap / 2} width={1 - gap} height={1 - gap} />
	{/each}
</svg>
