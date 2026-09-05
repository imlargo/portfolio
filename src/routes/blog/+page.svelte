<script lang="ts">
	import { BlogLanding } from '$lib/features/blog/components';
	import { Seo, blogSchema } from '$lib/components/seo';
	import { siteContent } from '$lib/content/site-content';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { metaTitle, description } = siteContent.blog;
</script>

<Seo title={metaTitle} {description} schema={blogSchema(data.posts)} />

<BlogLanding posts={data.posts} tags={data.tags} />
