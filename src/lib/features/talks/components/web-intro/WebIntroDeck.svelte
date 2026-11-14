<script lang="ts">
	import Deck from '$lib/features/deck/components/Deck.svelte';
	import DeckClosing from '$lib/features/deck/components/DeckClosing.svelte';
	import DeckCover from '$lib/features/deck/components/DeckCover.svelte';
	import DeckNotes from '$lib/features/deck/components/DeckNotes.svelte';
	import { setDeckCode } from '$lib/features/deck/code-snippets';
	import { webIntroSnippets } from '$lib/content/talks/web-intro/snippets';
	import { WEB_INTRO_PARTS, webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { talkBackLabel, talkContactLinks } from '$lib/content/talks/shared';
	import SpeakerSlide from './SpeakerSlide.svelte';
	import GoalsSlide from './GoalsSlide.svelte';
	import WhatIsSlide from './WhatIsSlide.svelte';
	import ProcessSlide from './ProcessSlide.svelte';
	import DecideSlide from './DecideSlide.svelte';
	import PlatformsSlide from './PlatformsSlide.svelte';
	import MapSlide from './MapSlide.svelte';
	import JourneySlide from './JourneySlide.svelte';
	import HttpSlide from './HttpSlide.svelte';
	import LayersSlide from './LayersSlide.svelte';
	import DomSlide from './DomSlide.svelte';
	import StrategiesSlide from './StrategiesSlide.svelte';
	import ReactivitySlide from './ReactivitySlide.svelte';
	import ComponentsSlide from './ComponentsSlide.svelte';
	import FrameworksSlide from './FrameworksSlide.svelte';
	import TailwindSlide from './TailwindSlide.svelte';
	import ShadcnSlide from './ShadcnSlide.svelte';
	import ArchitectureSlide from './ArchitectureSlide.svelte';
	import RoadmapSlide from './RoadmapSlide.svelte';
	import ProjectSlide from './ProjectSlide.svelte';
	import ResourcesSlide from './ResourcesSlide.svelte';

	type Props = {
		/** El HTML resaltado de cada fragmento, armado en el servidor durante el build. */
		highlighted: Record<string, string>;
		/** La lista de charlas, a donde llevan la marca y el cierre. */
		backHref: string;
	};

	const { highlighted, backHref }: Props = $props();

	// Los fragmentos no cambian después de cargar la página: basta con publicarlos una vez.
	// svelte-ignore state_referenced_locally
	setDeckCode({ snippets: webIntroSnippets, highlighted });
</script>

<!-- Seis partes que van de qué es una aplicación y cómo se decide, a cómo
     funciona la web y cómo se arma y se ordena un frontend; cada parte abre con la diapositiva que lleva su ancla. -->
<Deck label={webIntroMeta.label} {backHref}>
	<DeckCover {...webIntroMeta.cover} parts={WEB_INTRO_PARTS} />
	<SpeakerSlide />
	<GoalsSlide />

	<WhatIsSlide />
	<ProcessSlide />
	<DecideSlide />
	<PlatformsSlide />

	<MapSlide />
	<JourneySlide />
	<HttpSlide />

	<LayersSlide />
	<DomSlide />
	<StrategiesSlide />

	<ReactivitySlide />
	<ComponentsSlide />
	<FrameworksSlide />

	<TailwindSlide />
	<ShadcnSlide />

	<ArchitectureSlide />
	<RoadmapSlide />
	<ProjectSlide />
	<ResourcesSlide />
	<DeckNotes copy={webIntroMeta.questions} storageKey="{webIntroMeta.storageKey}:questions" />
	<DeckClosing
		{...webIntroMeta.closing}
		links={talkContactLinks}
		{backHref}
		backLabel={talkBackLabel}
	/>
</Deck>
