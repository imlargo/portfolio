import { getPosts } from '$lib/content/blog';
import { absolute } from '$lib/components/seo/structured-data';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * `changefreq` y `priority` no van: Google los ignora desde hace años y Bing los
 * trata como pista, no como dato. `lastmod` sí lo usan, y solo por eso aparece
 * —y solo donde hay una fecha real detrás. Un `lastmod` inventado, o puesto en
 * la fecha del build para todas las URLs, es la forma más rápida de que un
 * rastreador deje de creerle al archivo completo.
 */
const STATIC_PATHS = ['/', '/work', '/blog', '/about'];

function entry(path: string, lastmod?: string): string {
	const loc = `<loc>${absolute(path)}</loc>`;
	return `<url>${loc}${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}

export const GET: RequestHandler = () => {
	const posts = getPosts();

	// El índice del blog cambia cuando se publica una entrada, así que su fecha es
	// la de la más reciente. Las demás páginas estáticas no tienen una fecha
	// verificable y se quedan sin `lastmod`.
	const latest = posts[0]?.date;

	const urls = [
		...STATIC_PATHS.map((path) => entry(path, path === '/blog' ? latest : undefined)),
		...posts.map((post) => entry(`/blog/${post.slug}`, post.date))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
