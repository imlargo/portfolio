<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Copy } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import PixelIcon from '$lib/components/effects/pixel/PixelIcon.svelte';
	import { PIXEL_ICON_DIRECT } from '$lib/components/effects/pixel/pixelIcons';
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import NotesField from '$lib/features/deck/components/NotesField.svelte';
	import { LocalState, isString } from '$lib/features/deck/local-state.svelte';
	import { webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { useReveal } from '$lib/attachments/reveal';

	const { questions, storageKey } = webIntroMeta;

	const notes = new LocalState<string>(`${storageKey}:questions`, '', isString);
	onMount(() => notes.load());
	$effect(() => notes.persist());

	async function copy() {
		try {
			await navigator.clipboard.writeText(notes.value);
			toast.success(questions.copiedMessage);
		} catch {
			toast.error(questions.copyError);
		}
	}
</script>

<!-- La misma hoja de notas de la reunión de Kora: título a la izquierda, hoja
     punteada a la derecha, y lo que se anota se ve proyectado. -->
<DeckSlide>
	<div class="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
		<div
			class="flex flex-col gap-y-6 lg:col-span-5"
			{@attach useReveal({ targets: '.question-item', stagger: 0.1 })}
		>
			<div class="question-item flex items-center gap-x-3">
				<PixelIcon matrix={PIXEL_ICON_DIRECT} class="size-4 text-brand" />
				<SectionIndicator>{questions.eyebrow}</SectionIndicator>
			</div>
			<h2 class="question-item max-w-xl text-3xl text-balance md:text-5xl">{questions.title}</h2>
			<p class="question-item max-w-prose text-pretty text-muted-foreground">
				{questions.description}
			</p>
			<span class="question-item">
				<Button variant="outline" onclick={copy} disabled={!notes.value.trim()}>
					<Copy />
					{questions.copyLabel}
				</Button>
			</span>
		</div>

		<div class="flex lg:col-span-7" {@attach useReveal({ y: 24, delay: 0.2 })}>
			<NotesField
				id="talk-questions"
				label={questions.notesLabel}
				placeholder={questions.notesPlaceholder}
				bind:value={notes.value}
				class="min-h-96 w-full"
			/>
		</div>
	</div>
</DeckSlide>
