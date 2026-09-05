<script lang="ts">
	import { WorkLanding } from '$lib/features/work/components';
	import { JsonLd, Seo, workSchema } from '$lib/components/seo';
	import { siteContent } from '$lib/content/site-content';

	const { title, description } = siteContent.workPage;
</script>

<Seo {title} {description} />
<JsonLd schema={workSchema()} />

<WorkLanding />
