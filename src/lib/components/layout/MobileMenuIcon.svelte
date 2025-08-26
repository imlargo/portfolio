<script lang="ts">
	type Props = {
		isOpen: boolean;
	};

	let { isOpen }: Props = $props();
</script>

<div class="hamburger" class:open={isOpen}>
	<span class="line l1"></span>
	<span class="line l2"></span>
</div>

<style>
	.hamburger {
		width: 16px;
		height: 12px;
		position: relative;
	}
	.line {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 2px;
		border-radius: 1px;
		background: oklch(0.922 0 0);
		transform-origin: center;
		transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	.l1 {
		transform: translateY(-4px) rotate(0);
	}
	.l2 {
		transform: translateY(4px) rotate(0);
	}

	.hamburger.open .l1 {
		transform: translateY(0) rotate(45deg);
	}
	.hamburger.open .l2 {
		transform: translateY(0) rotate(-45deg);
	}
</style>