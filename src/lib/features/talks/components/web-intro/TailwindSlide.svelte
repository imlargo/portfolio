<script lang="ts">
	import { Check } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { stylesPart } from '$lib/content/talks/web-intro/styles';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { tailwind } = stylesPart;

	let active = $state<string[]>([]);
	let last = $state<string | null>(null);

	const applied = $derived(tailwind.utilities.filter((item) => active.includes(item.id)));
	const classes = $derived(applied.map((item) => item.classes).join(' '));
	const lastUtility = $derived(tailwind.utilities.find((item) => item.id === last));

	function toggle(id: string) {
		const on = active.includes(id);
		active = on ? active.filter((item) => item !== id) : [...active, id];
		last = on ? null : id;
	}
</script>

<!-- Se van sumando clases a un botón real. A la izquierda cada grupo de clases,
     en el escenario el botón, y al pie la etiqueta tal como quedó escrita y el
     CSS que reemplaza la última clase activada. -->
<DeckSlide id={WEB_INTRO_SECTIONS.styles}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.styles)}
			title={tailwind.title}
			description={tailwind.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="items-center justify-center min-h-64">
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">
							{tailwind.classesLabel}
						</span>
						<div class="flex flex-col divide-y">
							{#each tailwind.utilities as utility (utility.id)}
								{@const on = active.includes(utility.id)}
								<button
									type="button"
									role="checkbox"
									aria-checked={on}
									onclick={() => toggle(utility.id)}
									class={cn(
										'flex items-center gap-x-3 px-5 py-3 text-left transition-colors duration-300',
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
									<span class="flex flex-1 items-center justify-between gap-x-3">
										<span class={on ? 'text-foreground' : 'text-muted-foreground'}>
											{utility.label}
										</span>
										<span class="font-mono text-xs text-muted-foreground">{utility.classes}</span>
									</span>
								</button>
							{/each}
						</div>
					</div>
				{/snippet}

				<span class="mb-4 text-sm text-muted-foreground">{tailwind.resultLabel}</span>
				<button type="button" class={classes}>{tailwind.buttonText}</button>

				{#snippet footer()}
					<div class="flex flex-col divide-y">
						<pre
							class="px-6 py-4 font-mono text-sm leading-relaxed whitespace-pre-wrap md:px-8"><code
								><span class="text-muted-foreground">&lt;button class="</span><span
									class="text-brand">{classes}</span
								><span class="text-muted-foreground">"&gt;</span></code
							></pre>
						<div class="flex flex-col gap-y-1 px-6 py-4 md:px-8">
							<span class="text-xs text-muted-foreground">{tailwind.cssLabel}</span>
							{#key last}
								<pre class="animate-in font-mono text-sm leading-relaxed duration-500 fade-in"><code
										>{lastUtility?.css ?? '—'}</code
									></pre>
							{/key}
						</div>
					</div>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
