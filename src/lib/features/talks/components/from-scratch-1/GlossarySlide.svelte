<script lang="ts">
	import { Search } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { startPart } from '$lib/content/talks/from-scratch-1/start';
	import { useReveal } from '$lib/attachments/reveal';

	const { glossary } = startPart;

	let query = $state('');
	/** Se busca sin tildes ni mayúsculas: "programacion" encuentra "programación". */
	const normalize = (text: string) =>
		text
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.toLowerCase();
	const visible = $derived(
		glossary.terms.filter((item) =>
			normalize(`${item.term} ${item.meaning}`).includes(normalize(query.trim()))
		)
	);
</script>

<!-- El glosario de la clase como una retícula que se filtra al escribir. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.start)}
			title={glossary.title}
			description={glossary.description}
		/>

		<div class="flex flex-col gap-y-5" {@attach useReveal({ y: 24, delay: 0.15 })}>
			<label class="flex w-full max-w-sm items-center gap-x-3 rounded-full border px-4 py-2.5">
				<Search class="size-4 shrink-0 text-muted-foreground" />
				<span class="sr-only">{glossary.searchLabel}</span>
				<input
					bind:value={query}
					placeholder={glossary.searchPlaceholder}
					class="min-w-0 flex-1 border-0 bg-transparent p-0 outline-none placeholder:text-muted-foreground focus:ring-0"
				/>
			</label>

			{#if visible.length === 0}
				<p class="text-muted-foreground">{glossary.empty}</p>
			{:else}
				<dl
					class="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-4"
				>
					{#each visible as item (item.term)}
						<div class="flex animate-in flex-col gap-y-1 bg-background p-4 duration-300 fade-in">
							<dt>{item.term}</dt>
							<dd class="text-sm text-pretty text-muted-foreground">{item.meaning}</dd>
						</div>
					{/each}
				</dl>
			{/if}
		</div>
	</div>
</DeckSlide>
