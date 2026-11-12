<script lang="ts">
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { pathPart } from '$lib/content/talks/web-intro/path';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { project } = pathPart;
	const options = project.levels.map((level) => ({
		id: level.id,
		label: level.name,
		meta: level.label
	}));

	let selectedId = $state<string>(project.levels[0].id);
	const levelIndex = $derived(
		Math.max(
			0,
			project.levels.findIndex((level) => level.id === selectedId)
		)
	);
	const level = $derived(project.levels[levelIndex]);
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<!-- Los tres niveles a la izquierda; a la derecha los requisitos del elegido,
     cada uno con el tema de la clase que lo resuelve. La barra de arriba
     recuerda que los niveles se acumulan. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.project)}
			title={project.title}
			description={project.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={project.levelsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<span class="mb-6 flex gap-1" aria-hidden="true">
					{#each project.levels as item, index (item.id)}
						<span
							class={cn(
								'h-1.5 w-10 rounded-full transition-colors duration-500',
								index <= levelIndex ? 'bg-brand' : 'bg-muted-foreground/20'
							)}
						></span>
					{/each}
				</span>

				{#key level.id}
					<ol class="flex animate-in flex-col divide-y border-y duration-500 fade-in">
						{#each level.requirements as requirement, index (requirement.text)}
							<li class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
								<span class="font-mono text-xs text-muted-foreground tabular-nums">
									{pad(index + 1)}
								</span>
								<p class="flex-1 text-lg text-pretty">{requirement.text}</p>
								<DeckChip>{requirement.topic}</DeckChip>
							</li>
						{/each}
					</ol>
				{/key}
			</Stage>
		</div>
	</div>
</DeckSlide>
