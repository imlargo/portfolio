import { codeToHtml } from 'shiki';
import type { CodeSnippet } from './code-snippets';

/** El mismo tema que los bloques de código del blog. */
const THEME = 'catppuccin-mocha';

/** Resalta todos los fragmentos de una presentación y devuelve su HTML por id. */
export async function highlightSnippets(
	snippets: Record<string, CodeSnippet>
): Promise<Record<string, string>> {
	const entries = await Promise.all(
		Object.entries(snippets).map(async ([id, snippet]) => {
			const html = await codeToHtml(snippet.code, { lang: snippet.language, theme: THEME });
			return [id, html] as const;
		})
	);
	return Object.fromEntries(entries);
}
