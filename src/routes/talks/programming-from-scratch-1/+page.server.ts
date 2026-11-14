import { highlightSnippets } from '$lib/features/deck/highlight.server';
import { fromScratchSnippets } from '$lib/content/talks/from-scratch-1/snippets';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => ({
	highlighted: await highlightSnippets(fromScratchSnippets),
	// La presentación trae su propio marco: sin el header ni el footer del sitio.
	bare: true
});
