<script lang="ts">
	import { Check, Minus, X } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import {
		SUPPORT,
		productPart,
		recommendPlatform,
		type PlatformNeed
	} from '$lib/content/talks/web-intro/product';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { platforms } = productPart;

	let needs = $state<PlatformNeed[]>([]);
	const recommended = $derived(recommendPlatform(needs));
	const option = $derived(
		platforms.options.find((item) => item.id === recommended) ?? platforms.options[0]
	);

	function toggle(id: PlatformNeed) {
		needs = needs.includes(id) ? needs.filter((item) => item !== id) : [...needs, id];
	}
</script>

<!-- Se marca lo que necesita el proyecto y la columna que conviene se enciende
     en la tabla. Arriba, por qué esa y ejemplos conocidos. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.product)}
			title={platforms.title}
			description={platforms.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">
							{platforms.needsLabel}
						</span>
						<div class="flex flex-col divide-y">
							{#each platforms.needs as need (need.id)}
								{@const on = needs.includes(need.id)}
								<button
									type="button"
									role="checkbox"
									aria-checked={on}
									onclick={() => toggle(need.id)}
									class={cn(
										'flex items-center gap-x-3 px-5 py-3.5 text-left transition-colors duration-300',
										on ? 'bg-muted/50' : 'hover:bg-muted/30'
									)}
								>
									<span
										class={cn(
											'grid size-4 shrink-0 place-items-center rounded border transition-colors duration-300',
											on ? 'border-brand bg-brand text-background' : 'border-muted-foreground/40'
										)}
									>
										{#if on}<Check class="size-3" />{/if}
									</span>
									<span class={cn('text-pretty', !on && 'text-muted-foreground')}>{need.label}</span
									>
								</button>
							{/each}
						</div>
					</div>
				{/snippet}

				{#key option.id}
					<div class="flex animate-in flex-col gap-y-2 duration-500 fade-in">
						<span class="text-sm text-muted-foreground">{platforms.recommendLabel}</span>
						<p class="text-3xl">{option.label}</p>
						<p class="max-w-2xl text-pretty text-muted-foreground">{option.what}</p>
						<p class="font-mono text-xs text-muted-foreground">
							{platforms.examplesLabel}: {option.examples}
						</p>
					</div>
				{/key}

				<table class="mt-6 w-full text-left text-sm">
					<thead>
						<tr class="border-b">
							<th class="py-2 pr-4 font-normal"
								><span class="sr-only">{platforms.recommendLabel}</span></th
							>
							{#each platforms.options as item (item.id)}
								<th
									class={cn(
										'w-24 py-2 text-center font-normal transition-colors duration-500',
										item.id === recommended ? 'text-brand' : 'text-muted-foreground'
									)}
								>
									{item.label}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y">
						{#each platforms.criteria as criterion (criterion.label)}
							<tr>
								<td class="py-2 pr-4">
									{criterion.label}
									{#if 'note' in criterion}
										<span class="block text-xs text-muted-foreground">{criterion.note}</span>
									{/if}
								</td>
								{#each platforms.options as item (item.id)}
									{@const value = criterion.support[item.id]}
									<td
										class={cn(
											'py-2 transition-colors duration-500',
											item.id === recommended && 'bg-brand/10'
										)}
									>
										<span class="flex justify-center">
											{#if value === SUPPORT.yes}
												<Check class="size-4 text-brand" />
											{:else if value === SUPPORT.partial}
												<Minus class="size-4 text-warning" />
											{:else}
												<X class="size-4 text-muted-foreground/50" />
											{/if}
										</span>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</Stage>
		</div>
	</div>
</DeckSlide>
