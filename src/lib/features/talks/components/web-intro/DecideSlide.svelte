<script lang="ts">
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { productPart } from '$lib/content/talks/web-intro/product';
	import { useReveal } from '$lib/attachments/reveal';

	const { decide } = productPart;
	const options = decide.questions.map((question) => ({ id: question.id, label: question.label }));

	let selectedId = $state<string>(decide.questions[0].id);
	const question = $derived(
		decide.questions.find((item) => item.id === selectedId) ?? decide.questions[0]
	);
</script>

<!-- Las cuatro preguntas a la izquierda y la respuesta del ejemplo a la derecha.
     La del alcance se abre en dos columnas: lo que entra ahora y lo que espera. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.product)}
			title={decide.title}
			description={decide.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center">
				{#snippet aside()}
					<OptionList title={decide.questionsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				{#key question.id}
					<div class="flex animate-in flex-col gap-y-8 duration-500 fade-in">
						<p class="max-w-2xl text-2xl text-pretty md:text-3xl">{question.answer}</p>

						{#if 'now' in question}
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div
									class="flex flex-col gap-y-3 rounded-2xl border border-brand/40 bg-background p-5"
								>
									<span class="text-sm text-brand">{decide.nowLabel}</span>
									<ul class="flex flex-col gap-y-2">
										{#each question.now as item (item)}
											<li class="flex gap-x-3">
												<span class="mt-2.5 size-1 shrink-0 rounded-full bg-brand"></span>
												{item}
											</li>
										{/each}
									</ul>
								</div>
								<div class="flex flex-col gap-y-3 rounded-2xl border border-dashed p-5">
									<span class="text-sm text-muted-foreground">{decide.laterLabel}</span>
									<ul class="flex flex-col gap-y-2 text-muted-foreground">
										{#each question.later as item (item)}
											<li class="flex gap-x-3">
												<span class="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground/50"
												></span>
												{item}
											</li>
										{/each}
									</ul>
								</div>
							</div>
						{/if}
					</div>
				{/key}
			</Stage>
		</div>
	</div>
</DeckSlide>
