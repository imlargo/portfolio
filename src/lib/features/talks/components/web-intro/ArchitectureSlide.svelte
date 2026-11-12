<script lang="ts">
	import { FileCode } from '@lucide/svelte';
	import CodeBlock from '$lib/features/deck/components/CodeBlock.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { pathPart } from '$lib/content/talks/web-intro/path';
	import { useReveal } from '$lib/attachments/reveal';

	const { architecture } = pathPart;
	const options = architecture.folders.map((folder) => ({
		id: folder.id,
		label: folder.path,
		depth: 1
	}));

	let selectedId = $state<string>(architecture.folders[0].id);
	const selected = $derived(
		architecture.folders.find((folder) => folder.id === selectedId) ?? architecture.folders[0]
	);
</script>

<!-- El árbol de carpetas a la izquierda, como se ve en el editor; a la derecha
     qué va en la elegida, su regla y lo que hay adentro. Los servicios traen
     el ejemplo de Supabase, que es donde el frontend toca el backend. -->
<DeckSlide id={WEB_INTRO_SECTIONS.project}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.project)}
			title={architecture.title}
			description={architecture.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={architecture.root} {options} bind:selected={selectedId} mono />
				{/snippet}

				{#key selected.id}
					<div class="flex flex-1 animate-in flex-col gap-y-6 duration-500 fade-in">
						<div class="flex flex-col gap-y-2">
							<span class="font-mono text-sm text-brand">{architecture.root}{selected.path}</span>
							<p class="max-w-xl text-2xl text-pretty">{selected.what}</p>
						</div>

						<ul class="flex flex-wrap gap-2" aria-label={architecture.filesLabel}>
							{#each selected.files as file (file)}
								<li
									class="flex items-center gap-x-2 rounded-lg border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground"
								>
									<FileCode class="size-3.5" />
									{file}
								</li>
							{/each}
						</ul>

						{#if 'snippet' in selected}
							<CodeBlock id={selected.snippet} class="bg-background" />
						{/if}
					</div>
				{/key}

				{#snippet footer()}
					{#key selected.id}
						<p class="animate-in px-6 py-4 text-pretty duration-500 fade-in md:px-8">
							<span class="text-muted-foreground">{architecture.ruleLabel}:</span>
							{selected.rule}
						</p>
					{/key}
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
