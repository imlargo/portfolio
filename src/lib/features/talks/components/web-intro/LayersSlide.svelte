<script lang="ts">
	import { Lock } from '@lucide/svelte';
	import { Switch } from '$lib/components/ui/switch';
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { getDeckCode } from '$lib/features/deck/code-snippets';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { browserPart } from '$lib/content/talks/web-intro/browser';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { layers } = browserPart;
	const [html, css, js] = layers.items;
	const { snippets } = getDeckCode();

	let cssOn = $state(false);
	let jsOn = $state(false);
	let viewing = $state<string>(html.id);
	const viewed = $derived(layers.items.find((item) => item.id === viewing) ?? html);

	// La etiqueta de cierre va armada: escrita literal, el compilador la tomaría
	// como el final del bloque de script de este componente.
	const SCRIPT = 'script';
	const srcdoc = $derived(
		[
			'<!doctype html><html lang="es"><head><meta charset="utf-8" />',
			cssOn ? `<style>${snippets[css.snippet].code}</style>` : '',
			'</head><body>',
			snippets[html.snippet].code,
			jsOn ? `<${SCRIPT}>${snippets[js.snippet].code}</${SCRIPT}>` : '',
			'</body></html>'
		].join('')
	);

	const enabled = (id: string) => id === html.id || (id === css.id ? cssOn : jsOn);
	function toggle(id: string, on: boolean) {
		if (id === css.id) cssOn = on;
		if (id === js.id) jsOn = on;
		viewing = id;
	}
</script>

<!-- Las tres capas como interruptores sobre una página real: la vista previa es
     un iframe aislado con el mismo código que se lee al lado. Sin CSS se ve el
     estilo por defecto del navegador; sin JavaScript el botón no hace nada. -->
<DeckSlide id={WEB_INTRO_SECTIONS.browser}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.browser)}
			title={layers.title}
			description={layers.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="p-0 md:p-0">
				{#snippet aside()}
					<div class="flex flex-1 flex-col divide-y">
						{#each layers.items as item (item.id)}
							{@const active = viewing === item.id}
							<div
								class={cn(
									'relative flex flex-col gap-y-1 px-5 py-4 transition-colors duration-300',
									active && 'bg-muted/50'
								)}
							>
								<span
									class={cn(
										'absolute inset-y-0 left-0 w-0.5 bg-brand transition-opacity duration-300',
										active ? 'opacity-100' : 'opacity-0'
									)}
									aria-hidden="true"
								></span>
								<div class="flex items-center justify-between gap-x-3">
									<button
										type="button"
										onclick={() => (viewing = item.id)}
										class="flex flex-1 items-baseline gap-x-3 text-left"
									>
										<span class="font-mono">{item.label}</span>
										<span class="text-sm text-muted-foreground">{item.role}</span>
									</button>
									{#if item.id === html.id}
										<Lock class="size-4 text-muted-foreground" aria-hidden="true" />
									{:else}
										<Switch
											checked={enabled(item.id)}
											onCheckedChange={(value) => toggle(item.id, value)}
											aria-label={item.label}
										/>
									{/if}
								</div>
								<p class="text-sm text-pretty text-muted-foreground">{item.what}</p>
							</div>
						{/each}
					</div>
				{/snippet}

				<div class="grid flex-1 grid-cols-1 xl:grid-cols-2">
					{#key viewed.id}
						<CodeBlock
							id={viewed.snippet}
							bare
							class="max-h-104 animate-in border-b duration-500 fade-in xl:border-r xl:border-b-0"
						/>
					{/key}
					<div class="flex flex-col gap-y-3 p-6">
						<span class="flex items-center gap-x-2 text-sm text-brand">
							<span class="size-1.5 animate-pulse rounded-full bg-brand" aria-hidden="true"></span>
							{layers.previewLabel}
						</span>
						<iframe
							title={layers.previewLabel}
							sandbox="allow-scripts"
							{srcdoc}
							class="min-h-72 w-full flex-1 rounded-2xl border bg-white"
						></iframe>
					</div>
				</div>
			</Stage>
		</div>
	</div>
</DeckSlide>
