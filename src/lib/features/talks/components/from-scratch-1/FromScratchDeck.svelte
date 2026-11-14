<script lang="ts">
	import Deck from '$lib/features/deck/components/Deck.svelte';
	import DeckClosing from '$lib/features/deck/components/DeckClosing.svelte';
	import DeckCover from '$lib/features/deck/components/DeckCover.svelte';
	import DeckNotes from '$lib/features/deck/components/DeckNotes.svelte';
	import { setDeckCode } from '$lib/features/deck/code-snippets';
	import { fromScratchSnippets } from '$lib/content/talks/from-scratch-1/snippets';
	import {
		FROM_SCRATCH_PARTS,
		FROM_SCRATCH_SECTIONS,
		fromScratchMeta,
		partEyebrow
	} from '$lib/content/talks/from-scratch-1/meta';
	import { startPart } from '$lib/content/talks/from-scratch-1/start';
	import { talkBackLabel, talkContactLinks } from '$lib/content/talks/shared';
	import PlanSlide from './PlanSlide.svelte';
	import MethodSlide from './MethodSlide.svelte';
	import InsideSlide from './InsideSlide.svelte';
	import BinarySlide from './BinarySlide.svelte';
	import OsSlide from './OsSlide.svelte';
	import TerminalSlide from './TerminalSlide.svelte';
	import PathsSlide from './PathsSlide.svelte';
	import RobotSlide from './RobotSlide.svelte';
	import DecomposeSlide from './DecomposeSlide.svelte';
	import TraceSlide from './TraceSlide.svelte';
	import LanguageSlide from './LanguageSlide.svelte';
	import LanguagesMapSlide from './LanguagesMapSlide.svelte';
	import BasicsSlide from './BasicsSlide.svelte';
	import FirstProgramSlide from './FirstProgramSlide.svelte';
	import AppSlide from './AppSlide.svelte';
	import ToolsSlide from './ToolsSlide.svelte';
	import QualitySlide from './QualitySlide.svelte';
	import ChecklistSlide from './ChecklistSlide.svelte';
	import GlossarySlide from './GlossarySlide.svelte';

	type Props = {
		/** El HTML resaltado de cada fragmento, armado en el servidor durante el build. */
		highlighted: Record<string, string>;
		/** La lista de charlas, a donde llevan la marca y el cierre. */
		backHref: string;
	};

	const { highlighted, backHref }: Props = $props();

	// svelte-ignore state_referenced_locally
	setDeckCode({ snippets: fromScratchSnippets, highlighted });

	const { setup, homework } = startPart;
	const { storageKey } = fromScratchMeta;
	const eyebrow = partEyebrow(FROM_SCRATCH_SECTIONS.start);
</script>

<!-- Primero el camino y cómo vamos a trabajar; después la máquina, la terminal
     y qué es programar; luego hacia dónde vamos, y al final lo que queda para
     practicar. -->
<Deck label={fromScratchMeta.label} {backHref}>
	<DeckCover {...fromScratchMeta.cover} parts={FROM_SCRATCH_PARTS} />
	<PlanSlide />
	<MethodSlide />

	<InsideSlide />
	<BinarySlide />
	<OsSlide />

	<TerminalSlide />
	<PathsSlide />

	<RobotSlide />
	<DecomposeSlide />
	<LanguageSlide />
	<LanguagesMapSlide />
	<BasicsSlide />
	<TraceSlide />
	<FirstProgramSlide />

	<AppSlide />
	<ToolsSlide />
	<QualitySlide />

	<ChecklistSlide
		id={FROM_SCRATCH_SECTIONS.start}
		{eyebrow}
		title={setup.title}
		description={setup.description}
		items={setup.steps}
		storageKey="{storageKey}:setup"
		progressLabel={setup.progressLabel}
		openLabel={setup.openLabel}
	/>
	<ChecklistSlide
		{eyebrow}
		title={homework.title}
		description={homework.description}
		items={homework.tasks.map((task) => ({ id: task.id, label: task.text }))}
		storageKey="{storageKey}:homework"
		progressLabel={setup.progressLabel}
	/>
	<GlossarySlide />

	<DeckNotes copy={fromScratchMeta.questions} storageKey="{storageKey}:notes" />
	<DeckClosing
		{...fromScratchMeta.closing}
		links={talkContactLinks}
		{backHref}
		backLabel={talkBackLabel}
	/>
</Deck>
