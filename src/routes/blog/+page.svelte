<script lang="ts">
	import { BlogLanding } from '$lib/features/blog/components';
	import { Seo } from '$lib/components/seo';
	import { siteContent } from '$lib/content/site-content';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { title, description } = siteContent.blog;
</script>

<Seo {title} {description} />

<BlogLanding posts={data.posts} tags={data.tags} />
