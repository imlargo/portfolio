<script lang="ts">
	import { Button, type ButtonSize, type ButtonVariant } from '$lib/components/ui/button';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { stylesPart } from '$lib/content/talks/web-intro/styles';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { shadcn } = stylesPart;

	let variant = $state<ButtonVariant>(shadcn.variants[0]);
	let size = $state<ButtonSize>(shadcn.sizes[1]);

	// La etiqueta tal como se escribiría: los valores por defecto no se escriben.
	const DEFAULT = 'default';
	const usage = $derived(
		[
			'<Button',
			variant !== DEFAULT ? ` variant="${variant}"` : '',
			size !== DEFAULT ? ` size="${size}"` : '',
			`>${shadcn.buttonText}</Button>`
		].join('')
	);
</script>

{#snippet segmented(
	label: string,
	values: readonly string[],
	current: string,
	pick: (value: string) => void
)}
	<div class="flex flex-col gap-y-2">
		<span class="text-xs text-muted-foreground">{label}</span>
		<div
			role="radiogroup"
			aria-label={label}
			class="flex w-fit flex-wrap gap-1 rounded-full border bg-background p-1"
		>
			{#each values as value (value)}
				<button
					type="button"
					role="radio"
					aria-checked={value === current}
					onclick={() => pick(value)}
					class={cn(
						'rounded-full px-3 py-1 font-mono text-xs transition-colors duration-300',
						value === current
							? 'bg-foreground text-background'
							: 'text-muted-foreground hover:text-foreground'
					)}
				>
					{value}
				</button>
			{/each}
		</div>
	</div>
{/snippet}

<!-- Los tres pasos a la izquierda; en el escenario el botón de shadcn de este
     mismo sitio, que cambia con la variante y el tamaño, y al pie cómo se
     escribe. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.styles)}
			title={shadcn.title}
			description={shadcn.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">
							{shadcn.stepsLabel}
						</span>
						<ol class="flex flex-col divide-y">
							{#each shadcn.steps as step, index (step.label)}
								<li class="flex gap-x-4 px-5 py-4">
									<span
										class="grid size-6 shrink-0 place-items-center rounded-full border font-mono text-xs text-brand"
									>
										{index + 1}
									</span>
									<span class="flex min-w-0 flex-col gap-y-1">
										<span>{step.label}</span>
										<code class="truncate font-mono text-xs text-muted-foreground">{step.code}</code
										>
									</span>
								</li>
							{/each}
						</ol>
						<p class="mt-auto border-t px-5 py-4 text-sm text-pretty text-muted-foreground">
							{shadcn.note}
						</p>
					</div>
				{/snippet}

				<div class="flex flex-wrap gap-6">
					{@render segmented(
						shadcn.variantLabel,
						shadcn.variants,
						variant ?? DEFAULT,
						(value) => (variant = shadcn.variants.find((item) => item === value) ?? variant)
					)}
					{@render segmented(
						shadcn.sizeLabel,
						shadcn.sizes,
						size ?? DEFAULT,
						(value) => (size = shadcn.sizes.find((item) => item === value) ?? size)
					)}
				</div>

				<div class="grid min-h-48 flex-1 place-items-center">
					<Button {variant} {size}>{shadcn.buttonText}</Button>
				</div>

				{#snippet footer()}
					<pre class="overflow-x-auto px-6 py-4 font-mono text-sm md:px-8"><code>{usage}</code
						></pre>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
