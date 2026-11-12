<script lang="ts">
	import { onMount } from 'svelte';
	import { createQuickSetter, gsap, prefersFinePointer, prefersReducedMotion } from '$lib/gsap';

	let dot: HTMLDivElement | undefined = $state();
	let ring: HTMLDivElement | undefined = $state();
	let active = $state(false);
	let hovering = $state(false);
	// Both elements start parked at 0,0, so they must stay hidden until the first
	// real pointer position arrives | otherwise the ring flashes in the top-left
	// corner on load and never moves for a visitor who scrolls without a mouse.
	let hasPointerPosition = $state(false);

	onMount(() => {
		if (prefersReducedMotion() || !prefersFinePointer()) return;
		if (!dot || !ring) return;

		active = true;

		gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

		const setDot = createQuickSetter(dot, ['x', 'y'], { duration: 0.08, ease: 'power3.out' });
		const setRing = createQuickSetter(ring, ['x', 'y'], { duration: 0.45, ease: 'power3.out' });

		const handleMove = (event: MouseEvent) => {
			if (!hasPointerPosition) {
				// Jump both elements to the pointer before revealing them, so they
				// fade in where the cursor already is instead of sliding from 0,0.
				gsap.set([dot!, ring!], { x: event.clientX, y: event.clientY });
				hasPointerPosition = true;
				// Only this component touches the body cursor, and only once there is
				// a custom cursor to replace it; restored in the cleanup below.
				document.body.style.cursor = 'none';
			}
			setDot({ x: event.clientX, y: event.clientY });
			setRing({ x: event.clientX, y: event.clientY });
		};

		const handleOver = (event: MouseEvent) => {
			hovering = !!(event.target as HTMLElement)?.closest(
				'a, button, [data-cursor-hover], input, textarea, [role="button"]'
			);
		};

		const handleLeaveWindow = () => {
			gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
		};
		const handleEnterWindow = () => {
			gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
		};

		window.addEventListener('mousemove', handleMove);
		window.addEventListener('mouseover', handleOver);
		document.documentElement.addEventListener('mouseleave', handleLeaveWindow);
		document.documentElement.addEventListener('mouseenter', handleEnterWindow);

		return () => {
			window.removeEventListener('mousemove', handleMove);
			window.removeEventListener('mouseover', handleOver);
			document.documentElement.removeEventListener('mouseleave', handleLeaveWindow);
			document.documentElement.removeEventListener('mouseenter', handleEnterWindow);
			document.body.style.cursor = '';
		};
	});
</script>

<div
	bind:this={dot}
	class="pointer-events-none fixed top-0 left-0 z-9999 size-2 rounded-full bg-white mix-blend-difference"
	class:opacity-0={!active || !hasPointerPosition}
></div>
<div
	bind:this={ring}
	class="pointer-events-none fixed top-0 left-0 z-9999 rounded-full border border-white mix-blend-difference transition-[width,height,opacity] duration-300 ease-out"
	class:opacity-0={!active || !hasPointerPosition}
	style:width={hovering ? '56px' : '32px'}
	style:height={hovering ? '56px' : '32px'}
></div>
