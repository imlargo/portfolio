<script lang="ts">
	import { AboutLanding } from '$lib/features/about/components';
	import { Seo, aboutSchema } from '$lib/components/seo';
	import { siteContent } from '$lib/content/site-content';

	const { title, description } = siteContent.about;
</script>

<Seo {title} {description} schema={aboutSchema()} />

<AboutLanding />
