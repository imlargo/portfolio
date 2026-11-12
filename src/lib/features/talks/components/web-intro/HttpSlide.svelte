<script lang="ts">
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { webPart } from '$lib/content/talks/web-intro/web';
	import { useReveal } from '$lib/attachments/reveal';

	const { http } = webPart;
	const options = http.methods.map((item) => ({
		id: item.method,
		label: item.purpose,
		meta: item.method
	}));

	let selectedId = $state<string>(http.methods[0].method);
	const selected = $derived(
		http.methods.find((item) => item.method === selectedId) ?? http.methods[0]
	);
</script>

<!-- Un método a la vez: el código que se escribe en el frontend y, al lado, lo
     que de verdad viaja por la red. Al pie, las cuatro familias de códigos. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.web)}
			title={http.title}
			description={http.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={http.methodsLabel} {options} bind:selected={selectedId} />
				{/snippet}

				{#key selected.method}
					<div class="grid flex-1 animate-in grid-cols-1 gap-4 duration-500 fade-in xl:grid-cols-2">
						<div class="flex min-w-0 flex-col gap-y-2">
							<span class="text-sm text-muted-foreground">{http.writeLabel}</span>
							<CodeBlock id={selected.write} class="flex-1 bg-background" />
						</div>
						<div class="flex min-w-0 flex-col gap-y-2">
							<span class="text-sm text-brand">{http.wireLabel}</span>
							<CodeBlock id={selected.wire} class="flex-1 bg-background" />
						</div>
					</div>
				{/key}

				{#snippet footer()}
					<dl class="grid grid-cols-2 divide-x md:grid-cols-4" aria-label={http.codesLabel}>
						{#each http.codes as code (code.range)}
							<div class="flex flex-col gap-y-0.5 px-6 py-4">
								<dt class="font-mono text-sm">{code.range}</dt>
								<dd class="text-sm text-muted-foreground">{code.label}</dd>
							</div>
						{/each}
					</dl>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
