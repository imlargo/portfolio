<script lang="ts">
	import { AboutLanding } from '$lib/features/about/components';
	import { Seo } from '$lib/components/seo';
	import { siteContent } from '$lib/content/site-content';

	const { title, description } = siteContent.about;
</script>

<Seo {title} {description} />

<AboutLanding />
