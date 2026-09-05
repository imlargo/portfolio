<script lang="ts">
	import { page } from '$app/state';
	import { siteContent } from '$lib/content/site-content';

	type Props = {
		/** Page title without the suffix. Omit on the home page to use the default. */
		title?: string;
		description?: string;
		/** Absolute path to the share image. Falls back to the configured default. */
		image?: string;
		/** Only needed alongside `image`: the default one carries its own size. */
		imageWidth?: number;
		imageHeight?: number;
		imageAlt?: string;
		/** Overrides the canonical URL. Defaults to the current path. */
		canonical?: string;
		/** Keeps the page out of search results (drafts, under-construction pages). */
		noindex?: boolean;
		type?: 'website' | 'article';
		/** Article-only, ignored on `type="website"`. */
		published?: string;
		modified?: string;
		tags?: string[];
	};

	const {
		title,
		description,
		image,
		imageWidth,
		imageHeight,
		imageAlt,
		canonical,
		noindex = false,
		type = 'website',
		published,
		modified,
		tags = []
	}: Props = $props();

	const seo = siteContent.seo;

	// Titles are built from the template only when a page supplies its own; the
	// home page passes nothing and gets the full default title verbatim.
	const resolvedTitle = $derived(title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle);
	const resolvedDescription = $derived(description ?? seo.defaultDescription);

	// Everything a crawler reads resolves against the production origin, never
	// against the request's. A preview deploy on `*.workers.dev` is byte-identical
	// to production, so self-canonicals there would put two hosts in the index
	// competing for the same content; pointing them home is what consolidates the
	// ranking on the real domain.
	const origin = seo.siteUrl;
	const resolvedCanonical = $derived(new URL(canonical ?? page.url.pathname, origin).href);

	// The dimensions travel with the image so the tags describe the file that is
	// actually served. Declaring a size the file does not have makes the crawler
	// re-crop it, and some platforms drop the preview altogether.
	const resolvedImage = $derived(new URL(image ?? seo.defaultImage, origin).href);
	const resolvedImageWidth = $derived(image ? imageWidth : seo.defaultImageWidth);
	const resolvedImageHeight = $derived(image ? imageHeight : seo.defaultImageHeight);
	const resolvedImageAlt = $derived(imageAlt ?? (image ? resolvedTitle : seo.defaultImageAlt));

	const isArticle = $derived(type === 'article');
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<link rel="canonical" href={resolvedCanonical} />
	<meta name="author" content={siteContent.fullName} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<!-- `max-image-preview:large` es lo que habilita la miniatura grande en
		     Discover y en resultados; sin él Google se queda con la chica. -->
		<meta
			name="robots"
			content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
		/>
	{/if}

	<meta property="og:site_name" content={seo.siteName} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:url" content={resolvedCanonical} />
	<meta property="og:locale" content={seo.locale} />
	<meta property="og:image" content={resolvedImage} />
	<meta property="og:image:alt" content={resolvedImageAlt} />
	{#if resolvedImageWidth && resolvedImageHeight}
		<meta property="og:image:width" content={String(resolvedImageWidth)} />
		<meta property="og:image:height" content={String(resolvedImageHeight)} />
	{/if}

	{#if isArticle}
		<meta property="article:author" content={siteContent.fullName} />
		{#if published}
			<meta property="article:published_time" content={published} />
		{/if}
		{#if modified ?? published}
			<meta property="article:modified_time" content={modified ?? published} />
		{/if}
		{#each tags as tag (tag)}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={resolvedImage} />
	<meta name="twitter:image:alt" content={resolvedImageAlt} />
	{#if seo.twitterHandle}
		<meta name="twitter:site" content={seo.twitterHandle} />
		<meta name="twitter:creator" content={seo.twitterHandle} />
	{/if}

	<!-- El feed se anuncia en todas las páginas, no solo en el blog: es donde los
	     lectores y los agregadores lo buscan. -->
	<link
		rel="alternate"
		type="application/rss+xml"
		title="{seo.siteName} · Writing"
		href="{origin}/blog/rss.xml"
	/>
	<link rel="sitemap" type="application/xml" href="{origin}/sitemap.xml" />
</svelte:head>
