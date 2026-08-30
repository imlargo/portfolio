<script lang="ts">
	import { WorkLanding } from '$lib/features/work/components';
	import { Seo } from '$lib/components/seo';
	import { siteContent } from '$lib/content/site-content';

	const { title, description } = siteContent.workPage;
</script>

<Seo {title} {description} />

<WorkLanding />
