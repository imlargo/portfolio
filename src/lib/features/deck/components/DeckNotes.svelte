<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Copy } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import PixelIcon from '$lib/components/effects/pixel/PixelIcon.svelte';
	import { PIXEL_ICON_DIRECT } from '$lib/components/effects/pixel/pixelIcons';
	import SectionIndicator from '$lib/components/layout/SectionIndicator.svelte';
	import DeckSlide from './DeckSlide.svelte';
	import NotesField from './NotesField.svelte';
	import { LocalState, isString } from '../local-state.svelte';
	import { useReveal } from '$lib/attachments/reveal';

	type Props = {
		/** Los textos de la diapositiva. */
		copy: {
			eyebrow: string;
			title: string;
			description: string;
			notesLabel: string;
			notesPlaceholder: string;
			copyLabel: string;
			copiedMessage: string;
			copyError: string;
		};
		/** Dónde se guardan las notas en el navegador; una clave por presentación. */
		storageKey: string;
	};

	const { copy, storageKey }: Props = $props();

	// svelte-ignore state_referenced_locally
	const notes = new LocalState<string>(storageKey, '', isString);
	onMount(() => notes.load());
	$effect(() => notes.persist());

	async function copyNotes() {
		try {
			await navigator.clipboard.writeText(notes.value);
			toast.success(copy.copiedMessage);
		} catch {
			toast.error(copy.copyError);
		}
	}
</script>

<!-- La hoja de notas de la reunión de Kora, para cualquier presentación: título a la izquierda, hoja
     punteada a la derecha, y lo que se anota se ve proyectado. -->
<DeckSlide>
	<div class="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-12">
		<div
			class="flex flex-col gap-y-6 lg:col-span-5"
			{@attach useReveal({ targets: '.question-item', stagger: 0.1 })}
		>
			<div class="question-item flex items-center gap-x-3">
				<PixelIcon matrix={PIXEL_ICON_DIRECT} class="size-4 text-brand" />
				<SectionIndicator>{copy.eyebrow}</SectionIndicator>
			</div>
			<h2 class="question-item max-w-xl text-3xl text-balance md:text-5xl">{copy.title}</h2>
			<p class="question-item max-w-prose text-pretty text-muted-foreground">
				{copy.description}
			</p>
			<span class="question-item">
				<Button variant="outline" onclick={copyNotes} disabled={!notes.value.trim()}>
					<Copy />
					{copy.copyLabel}
				</Button>
			</span>
		</div>

		<div class="flex lg:col-span-7" {@attach useReveal({ y: 24, delay: 0.2 })}>
			<NotesField
				id="deck-notes"
				label={copy.notesLabel}
				placeholder={copy.notesPlaceholder}
				bind:value={notes.value}
				class="min-h-96 w-full"
			/>
		</div>
	</div>
</DeckSlide>
