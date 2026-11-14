<script lang="ts">
	import { Seo } from '$lib/components/seo';
	import { FromScratchDeck } from '$lib/features/talks/components';
	import { fromScratchMeta } from '$lib/content/talks/from-scratch-1/meta';
	import { TALKS_PATH, TALK_SLUGS, TALK_STATUS, talks } from '$lib/content/talks';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const talk = talks.find((item) => item.slug === TALK_SLUGS.fromScratch1);
	// Un borrador se puede abrir por su enlace, pero no se indexa.
	const noindex = talk?.status !== TALK_STATUS.published;
</script>

<Seo title={fromScratchMeta.seo.title} description={fromScratchMeta.seo.description} {noindex} />

<FromScratchDeck highlighted={data.highlighted} backHref={TALKS_PATH} />
