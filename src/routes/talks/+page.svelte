<script lang="ts">
	import { TalksLanding } from '$lib/features/talks/components';
	import { Seo } from '$lib/components/seo';
	import { talksPage } from '$lib/content/talks';
</script>

<Seo title={talksPage.metaTitle} description={talksPage.description} />

<TalksLanding />
