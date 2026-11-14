<script lang="ts">
	import { ArrowLeft, ArrowRight, RotateCcw } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { trace } = programmingPart;
	const { steps } = trace;

	/** 0 es antes de empezar; del 1 en adelante, el paso que ya se ejecutó. */
	let position = $state(0);
	const step = $derived(position > 0 ? steps[position - 1] : null);
	const previous = $derived(position > 1 ? steps[position - 2] : null);
	const memory = $derived(step?.memory ?? {});
	const output = $derived(
		steps.slice(0, position).flatMap((item) => (item.output ? [item.output] : []))
	);

	/** Una caja cambió si es nueva o si su valor no es el del paso anterior. */
	const changed = (name: string) => !previous || previous.memory[name] !== memory[name];
</script>

<!-- El programa a la izquierda con la línea que se ejecuta encendida; a la
     derecha la memoria, donde cada variable es una caja cuyo valor cambia, y
     la consola. Es lo que pasa siempre, solo que normalmente no se ve. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={trace.title}
			description={trace.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="p-0 md:p-0">
				<div class="grid flex-1 grid-cols-1 lg:grid-cols-12">
					<div class="flex flex-col border-b lg:col-span-7 lg:border-r lg:border-b-0">
						<div class="flex items-center justify-between border-b px-4 py-2">
							<span class="font-mono text-xs text-muted-foreground">{trace.codeLabel}</span>
							<span class="font-mono text-xs text-muted-foreground tabular-nums">
								{trace.stepLabel(position, steps.length)}
							</span>
						</div>
						<ol class="flex flex-col py-3 font-mono text-sm">
							{#each trace.lines as line, index (index)}
								{@const active = step?.line === index + 1}
								<li
									class={cn(
										'relative flex gap-x-4 px-4 py-1 transition-colors duration-300',
										active ? 'bg-brand/15 text-foreground' : 'text-muted-foreground'
									)}
								>
									<span
										class={cn(
											'absolute inset-y-0 left-0 w-0.5 bg-brand transition-opacity duration-300',
											active ? 'opacity-100' : 'opacity-0'
										)}
										aria-hidden="true"
									></span>
									<span class="w-4 text-right text-muted-foreground/50 tabular-nums"
										>{index + 1}</span
									>
									<span class="whitespace-pre">{line}</span>
								</li>
							{/each}
						</ol>
						<div class="mt-auto flex gap-2 border-t p-4">
							<Button
								variant="outline"
								size="icon"
								aria-label={trace.previousLabel}
								disabled={position === 0}
								onclick={() => (position -= 1)}
							>
								<ArrowLeft />
							</Button>
							<Button disabled={position === steps.length} onclick={() => (position += 1)}>
								{trace.nextLabel}
								<ArrowRight />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								aria-label={trace.resetLabel}
								disabled={position === 0}
								onclick={() => (position = 0)}
							>
								<RotateCcw />
							</Button>
						</div>
					</div>

					<div class="flex flex-col lg:col-span-5">
						<div class="flex flex-col gap-y-3 p-5">
							<span class="text-xs text-muted-foreground">{trace.memoryLabel}</span>
							{#if Object.keys(memory).length === 0}
								<p class="text-sm text-muted-foreground">{trace.emptyMemory}</p>
							{:else}
								<dl class="grid grid-cols-1 gap-2">
									{#each Object.entries(memory) as [name, value] (name)}
										{@const fresh = changed(name)}
										<div
											class={cn(
												'flex items-center justify-between gap-x-4 rounded-xl border px-4 py-2.5 transition-colors duration-500',
												fresh ? 'border-brand/60 bg-brand/10' : 'bg-background'
											)}
										>
											<dt class="font-mono text-sm text-muted-foreground">{name}</dt>
											<dd class="font-mono text-lg tabular-nums">{value}</dd>
										</div>
									{/each}
								</dl>
							{/if}
						</div>
						<div
							class="mt-auto flex flex-col gap-y-2 border-t bg-neutral-950 p-5 font-mono text-sm"
						>
							<span class="text-xs text-neutral-500">{trace.outputLabel}</span>
							{#each output as line, index (index)}
								<p class="text-neutral-200">{line}</p>
							{:else}
								<p class="text-neutral-500">{trace.emptyOutput}</p>
							{/each}
						</div>
					</div>
				</div>

				{#snippet footer()}
					{#key position}
						<p
							class="animate-in px-6 py-4 text-pretty duration-500 fade-in md:px-8"
							aria-live="polite"
						>
							{step?.note ?? trace.startNote}
						</p>
					{/key}
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
