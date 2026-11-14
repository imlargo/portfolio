<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUpRight, Check } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { LocalState, isStringArray } from '$lib/features/deck/local-state.svelte';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	type Item = { id: string; label: string; detail?: string; code?: string; href?: string };

	type Props = {
		id?: string;
		eyebrow: string;
		title: string;
		description: string;
		items: readonly Item[];
		/** Dónde se guarda lo marcado en el navegador; una clave por lista. */
		storageKey: string;
		progressLabel: (done: number, total: number) => string;
		openLabel?: string;
	};

	const { id, eyebrow, title, description, items, storageKey, progressLabel, openLabel }: Props =
		$props();

	// svelte-ignore state_referenced_locally
	const done = new LocalState<string[]>(storageKey, [], isStringArray);
	onMount(() => done.load());
	$effect(() => done.persist());

	const checked = $derived(new Set(done.value));
	const progress = $derived((checked.size / items.length) * 100);

	function toggle(itemId: string) {
		done.value = checked.has(itemId)
			? done.value.filter((item) => item !== itemId)
			: [...done.value, itemId];
	}
</script>

<!-- Una lista para marcar que se guarda en el navegador: sirve en la clase y
     sirve después, cuando se vuelve a la presentación para seguir. -->
<DeckSlide {id}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader {eyebrow} {title} {description} />

		<div class="flex flex-col gap-y-5" {@attach useReveal({ y: 24, delay: 0.15 })}>
			<div class="flex items-center gap-x-4">
				<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
					<div
						class="h-full rounded-full bg-brand transition-[width] duration-700 ease-(--ease-out-expo)"
						style:width="{progress}%"
					></div>
				</div>
				<span class="font-mono text-xs text-muted-foreground tabular-nums">
					{progressLabel(checked.size, items.length)}
				</span>
			</div>

			<ol class="flex flex-col divide-y overflow-hidden rounded-3xl border">
				{#each items as item (item.id)}
					{@const on = checked.has(item.id)}
					<li class="flex items-center gap-x-4 px-5 py-4">
						<button
							type="button"
							role="checkbox"
							aria-checked={on}
							onclick={() => toggle(item.id)}
							class="flex flex-1 items-start gap-x-4 text-left"
						>
							<span
								class={cn(
									'mt-1 grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-300',
									on ? 'border-brand bg-brand text-background' : 'border-muted-foreground/40'
								)}
							>
								{#if on}<Check class="size-3.5" />{/if}
							</span>
							<span class="flex flex-col gap-y-0.5">
								<span
									class={cn(
										'text-lg text-pretty transition-colors',
										on && 'text-muted-foreground line-through'
									)}
								>
									{item.label}
								</span>
								{#if item.detail}
									<span class="text-sm text-muted-foreground">{item.detail}</span>
								{/if}
								{#if item.code}
									<code class="w-fit rounded-md border px-2 py-0.5 font-mono text-sm"
										>{item.code}</code
									>
								{/if}
							</span>
						</button>
						{#if item.href && openLabel}
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								class="flex shrink-0 items-center gap-x-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
							>
								{openLabel}
								<ArrowUpRight class="size-3.5" />
							</a>
						{/if}
					</li>
				{/each}
			</ol>
		</div>
	</div>
</DeckSlide>
