<script lang="ts">
	type Props = {
		title: string;
		link?: string;
		repo?: string;
		stack: string;
		children: any;
	};
	const { title, link, repo, stack, children }: Props = $props();
	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>

<div class="project-card container flex flex-col justify-between rounded-xl px-8 py-8">
	<div>
		<h5 class="text-lg font-semibold">{title}</h5>

		<p class="mt-2 text-pretty text-base text-zinc-400">
			{@render children()}
		</p>
	</div>

	<div>
		<div class="my-7 flex flex-wrap gap-2">
			{#each stack.split(',') as item}
				<Skill icon={item.trim()} />
			{/each}
		</div>

		<div class="flex items-center justify-between">
			{#if link}
				<a
					class="flex w-9/12 items-center gap-1 truncate text-zinc-400"
					href={link}
					target="_blank"
				>
					<i class="bi bi-link-45deg"></i>
					<span
						class="hover:underline hover:decoration-zinc-400 hover:decoration-dotted hover:underline-offset-4"
						>{link.replace('https://', '')}</span
					>
				</a>
			{:else}
				<span></span>
			{/if}

			{#if repo}
				<a href={repo} target="_blank" class="text-lg">
					<i class="bi bi-github"></i>
				</a>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.project-card {
		overflow: hidden;
		position: relative;
		transition: all 0.3s ease;
		border: 1px rgba(121, 121, 121, 0.2) solid;

		--dots: radial-gradient(rgb(255, 255, 255, 0.04) 10%, transparent 1%);
		--dots-size: 7px;

		--top: -25%;
		--right: -20%;

		background: rgb(255, 255, 255, 0.01) var(--dots);
		background-size: var(--dots-size) var(--dots-size);

		&:hover {
			border: 1px rgba(121, 121, 121, 0.5) solid;
			background: rgb(255, 255, 255, 0.02) var(--dots);
			background-size: var(--dots-size) var(--dots-size);

			&::before {
				background: rgba(179, 86, 255, 0.3);
			}
		}

		&::before {
			content: '';
			position: absolute;
			top: var(--top);
			right: var(--right);
			aspect-ratio: 1/1;
			height: 100%;
			width: auto;
			z-index: -7;
			border-radius: 999%;
			filter: blur(45px);

			background: rgba(179, 86, 255, 0.2);
			transition: all 0.3s ease;
		}

		&::after {
			content: '';
			position: absolute;
			top: var(--top);
			right: var(--right);
			aspect-ratio: 1/1;
			height: 100%;
			width: auto;
			border-radius: 999%;

			background-image: url('$lib/assets/noise.webp');
			background-size: 30%;
			mix-blend-mode: overlay;
			opacity: 0.6;
			z-index: -1;

			mask-image: radial-gradient(#fff, transparent 75%);
		}
	}
</style>
