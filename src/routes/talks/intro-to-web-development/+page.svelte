<script lang="ts">
	import { Seo } from '$lib/components/seo';
	import { WebIntroDeck } from '$lib/features/talks/components';
	import { webIntroMeta } from '$lib/content/talks/web-intro/meta';
	import { TALKS_PATH, TALK_SLUGS, TALK_STATUS, talks } from '$lib/content/talks';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	const talk = talks.find((item) => item.slug === TALK_SLUGS.webIntro);
	// Un borrador se puede abrir por su enlace, pero no se indexa.
	const noindex = talk?.status !== TALK_STATUS.published;
</script>

<Seo title={webIntroMeta.seo.title} description={webIntroMeta.seo.description} {noindex} />

<WebIntroDeck highlighted={data.highlighted} backHref={TALKS_PATH} />
