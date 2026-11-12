<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, RotateCcw } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { LocalState, isStringArray } from '$lib/features/deck/local-state.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow, webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { pathPart } from '$lib/content/talks/web-intro/path';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { roadmap } = pathPart;

	/** Cada punto se identifica por su etapa y su texto, que no se repiten. */
	const keyOf = (stageId: string, item: string) => `${stageId}:${item}`;
	const total = roadmap.stages.reduce((sum, stage) => sum + stage.items.length, 0);

	const done = new LocalState<string[]>(`${webIntroMeta.storageKey}:roadmap`, [], isStringArray);
	onMount(() => done.load());
	$effect(() => done.persist());

	const checked = $derived(new Set(done.value));
	const progress = $derived((checked.size / total) * 100);

	function toggle(key: string) {
		done.value = checked.has(key)
			? done.value.filter((item) => item !== key)
			: [...done.value, key];
	}
</script>

<!-- La ruta como seis columnas en orden, cada una con su lista para marcar.
     El progreso vive en el navegador de quien la abre: sirve en la sesión y
     sirve después, cuando alguien vuelve a la presentación por su cuenta. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.project)}
			title={roadmap.title}
			description={roadmap.description}
		/>

		<div class="flex flex-col gap-y-6" {@attach useReveal({ y: 24, delay: 0.15 })}>
			<div class="flex items-center gap-x-4">
				<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
					<div
						class="h-full rounded-full bg-brand transition-[width] duration-700 ease-(--ease-out-expo)"
						style:width="{progress}%"
					></div>
				</div>
				<span class="font-mono text-xs text-muted-foreground tabular-nums">
					{roadmap.progressLabel(checked.size, total)}
				</span>
				<Button
					variant="ghost"
					size="sm"
					onclick={() => done.reset()}
					disabled={checked.size === 0}
				>
					<RotateCcw />
					{roadmap.resetLabel}
				</Button>
			</div>

			<ol class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#each roadmap.stages as stage, index (stage.id)}
					{@const stageDone = stage.items.every((item) => checked.has(keyOf(stage.id, item)))}
					<li
						class={cn(
							'flex flex-col gap-y-3 rounded-3xl border p-5 transition-colors duration-500',
							stageDone && 'border-brand/50 bg-brand/5'
						)}
					>
						<span class="flex items-center justify-between gap-x-3">
							<span class="flex items-baseline gap-x-3">
								<span class="font-mono text-xs text-muted-foreground tabular-nums">
									{String(index + 1).padStart(2, '0')}
								</span>
								<span class="text-lg">{stage.label}</span>
							</span>
							{#if stageDone}
								<Check class="size-4 animate-in text-brand duration-500 zoom-in" />
							{/if}
						</span>
						<ul class="flex flex-col">
							{#each stage.items as item (item)}
								{@const key = keyOf(stage.id, item)}
								{@const on = checked.has(key)}
								<li>
									<button
										type="button"
										role="checkbox"
										aria-checked={on}
										onclick={() => toggle(key)}
										class="flex w-full items-center gap-x-3 rounded-xl py-1.5 text-left"
									>
										<span
											class={cn(
												'grid size-4 shrink-0 place-items-center rounded border transition-colors duration-300',
												on ? 'border-brand bg-brand text-background' : 'border-muted-foreground/40'
											)}
										>
											{#if on}<Check class="size-3" />{/if}
										</span>
										<span
											class={cn(
												'text-sm text-pretty transition-colors',
												on ? 'text-muted-foreground line-through' : 'text-foreground'
											)}
										>
											{item}
										</span>
									</button>
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</DeckSlide>
