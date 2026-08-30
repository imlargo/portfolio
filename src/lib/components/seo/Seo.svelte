<script lang="ts">
	import { page } from '$app/state';
	import { siteContent } from '$lib/content/site-content';

	type Props = {
		/** Page title without the suffix. Omit on the home page to use the default. */
		title?: string;
		description?: string;
		/** Absolute path to a 1200x630 image. Falls back to the configured default. */
		image?: string;
		/** Overrides the canonical URL. Defaults to the current path. */
		canonical?: string;
		/** Keeps the page out of search results (drafts, under-construction pages). */
		noindex?: boolean;
		type?: 'website' | 'article';
	};

	const {
		title,
		description,
		image,
		canonical,
		noindex = false,
		type = 'website'
	}: Props = $props();

	const seo = siteContent.seo;

	// Titles are built from the template only when a page supplies its own; the
	// home page passes nothing and gets the full default title verbatim.
	const resolvedTitle = $derived(title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle);
	const resolvedDescription = $derived(description ?? seo.defaultDescription);

	// Origin comes from the request, so nothing hardcodes the domain and previews
	// keep working across localhost, preview deploys and production alike.
	const origin = $derived(page.url.origin);
	const resolvedCanonical = $derived(new URL(canonical ?? page.url.pathname, origin).href);
	const resolvedImage = $derived.by(() => {
		const path = image ?? seo.defaultImage;
		return path ? new URL(path, origin).href : null;
	});
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<link rel="canonical" href={resolvedCanonical} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<meta property="og:site_name" content={seo.siteName} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:url" content={resolvedCanonical} />
	<meta property="og:locale" content={seo.locale} />
	{#if resolvedImage}
		<meta property="og:image" content={resolvedImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}

	<meta name="twitter:card" content={resolvedImage ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	{#if resolvedImage}
		<meta name="twitter:image" content={resolvedImage} />
	{/if}
	{#if seo.twitterHandle}
		<meta name="twitter:site" content={seo.twitterHandle} />
	{/if}
</svelte:head>
