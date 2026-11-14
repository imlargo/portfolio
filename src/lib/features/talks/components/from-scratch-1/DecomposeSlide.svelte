<script lang="ts">
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';

	const { decompose } = programmingPart;
	const pad = (n: number) => String(n).padStart(2, '0');
	const options = decompose.stages.map((stage, index) => ({
		id: stage.id,
		label: stage.label,
		meta: pad(index + 1)
	}));

	let selectedId = $state<string>(decompose.stages[0].id);
	const stage = $derived(
		decompose.stages.find((item) => item.id === selectedId) ?? decompose.stages[0]
	);
</script>

<!-- El mismo problema en cuatro estados: en palabras, en pasos, en
     pseudocódigo y en código. El problema queda fijo arriba para que se vea
     que nunca cambia, solo la forma de escribirlo. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={decompose.title}
			description={decompose.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="gap-y-6">
				{#snippet aside()}
					<OptionList title={decompose.stagesLabel} {options} bind:selected={selectedId} />
				{/snippet}

				<p class="max-w-2xl text-xl text-pretty md:text-2xl">{decompose.problem}</p>

				{#key stage.id}
					<div class="flex animate-in flex-col gap-y-4 duration-500 fade-in">
						<span class="text-sm text-brand">{stage.hint}</span>

						{#if 'questions' in stage}
							<dl class="flex flex-col divide-y border-y">
								{#each stage.questions as question (question.ask)}
									<div class="grid grid-cols-1 gap-x-6 gap-y-1 py-3 sm:grid-cols-[14rem_1fr]">
										<dt>{question.ask}</dt>
										<dd class="text-muted-foreground">{question.answer}</dd>
									</div>
								{/each}
							</dl>
						{:else if 'steps' in stage}
							<ol class="flex flex-col divide-y border-y">
								{#each stage.steps as step, index (step)}
									<li class="flex gap-x-4 py-3">
										<span class="font-mono text-xs leading-6 text-muted-foreground tabular-nums">
											{pad(index + 1)}
										</span>
										<span class="text-pretty">{step}</span>
									</li>
								{/each}
							</ol>
						{:else if 'snippet' in stage}
							<CodeBlock id={stage.snippet} class="bg-background" />
						{/if}
					</div>
				{/key}

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-pretty text-muted-foreground md:px-8">
						{decompose.note}
					</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
