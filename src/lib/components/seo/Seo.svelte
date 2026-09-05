<script lang="ts">
	import { page } from '$app/state';
	import { siteContent } from '$lib/content/site-content';
	import { plainText } from '$lib/content/inline-markdown';

	type Props = {
		/** Page title without the suffix. Omit on the home page to use the default. */
		title?: string;
		description?: string;
		/** Path to a 1200x630 card. Falls back to the site's own. */
		image?: string;
		imageAlt?: string;
		/** Overrides the canonical URL. Defaults to the current path. */
		canonical?: string;
		/** Keeps the page out of search results (errors, drafts). */
		noindex?: boolean;
		/** Articles only; its presence is what turns this into an `og:type=article`. */
		article?: { published: string; modified?: string; tags?: string[] };
		/** The page's JSON-LD graph, as built by `structured-data.ts`. */
		schema?: string;
	};

	const { title, description, image, imageAlt, canonical, noindex, article, schema }: Props =
		$props();

	const seo = siteContent.seo;

	// Titles come from the template only when a page supplies its own; the home
	// page passes nothing and gets the full default title verbatim.
	//
	// Both title and description run through `plainText`: the content carries
	// inline markdown that the page turns into `<code>` or `<strong>`, and a
	// crawler would print it literally instead — backticks and asterisks included,
	// right there in the search result.
	const resolvedTitle = $derived(
		plainText(title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle)
	);
	const resolvedDescription = $derived(plainText(description ?? seo.defaultDescription));

	// Everything a crawler reads resolves against the production origin, never
	// against the request's. A preview deploy on `*.workers.dev` is byte-identical
	// to production, so self-canonicals there would put two hosts in the index
	// competing for the same content; pointing them home is what consolidates the
	// ranking on the real domain.
	const origin = seo.siteUrl;
	const resolvedCanonical = $derived(new URL(canonical ?? page.url.pathname, origin).href);

	// Every card in the repo measures `imageWidth × imageHeight` — `pnpm og` makes
	// them that way — so the size is a constant here instead of a prop each caller
	// repeats and can get wrong. Declaring a size the file does not have makes the
	// platform re-crop it, or drop the preview entirely.
	const resolvedImage = $derived(new URL(image ?? seo.defaultImage, origin).href);
	const resolvedImageAlt = $derived(image ? (imageAlt ?? resolvedTitle) : seo.defaultImageAlt);

	// El grafo sale con `{@html}` porque JSON-LD va, por especificación, dentro de
	// un bloque de script, y una etiqueta escrita literal la tomaría el compilador
	// como código del componente; el nombre va interpolado por lo mismo. Todo `<`
	// se escapa antes: el contenido sale de `src/lib/content` y no de entrada del
	// usuario, pero una etiqueta de cierre dentro de un título cortaría el bloque,
	// y `\u003c` es un escape válido de JSON que el buscador lee igual.
	const TAG = 'script';
	const jsonLd = $derived(
		schema && `<${TAG} type="application/ld+json">${schema.replace(/</g, '\\u003c')}</${TAG}>`
	);
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
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:url" content={resolvedCanonical} />
	<meta property="og:locale" content={seo.locale} />
	<meta property="og:image" content={resolvedImage} />
	<meta property="og:image:alt" content={resolvedImageAlt} />
	<meta property="og:image:width" content={String(seo.imageWidth)} />
	<meta property="og:image:height" content={String(seo.imageHeight)} />

	{#if article}
		<meta property="article:author" content={siteContent.fullName} />
		<meta property="article:published_time" content={article.published} />
		<meta property="article:modified_time" content={article.modified ?? article.published} />
		{#each article.tags ?? [] as tag (tag)}
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

	{#if jsonLd}
		<!-- La regla es correcta en general y acá no aplica: no hay entrada de
		     usuario en el grafo y lo único que podría cerrar la etiqueta ya viene
		     escapado. Es la única forma de emitir JSON-LD desde un componente. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html jsonLd}
	{/if}
</svelte:head>
