import { highlightSnippets } from '$lib/features/deck/highlight.server';
import { webIntroSnippets } from '$lib/content/talks/web-intro/snippets';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => ({
	highlighted: await highlightSnippets(webIntroSnippets),
	// La presentación trae su propio marco: sin el header ni el footer del sitio.
	bare: true
});
