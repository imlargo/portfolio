import { siteContent } from '$lib/content/site-content';
import type { RequestHandler } from './$types';

export const prerender = true;

/**
 * Ruta y no archivo en `static/` por una sola razón: la línea `Sitemap:` exige
 * una URL absoluta, y el dominio ya vive en `siteContent.seo.siteUrl`. Escrito a
 * mano quedaría un segundo lugar donde corregirlo el día que cambie.
 */
export const GET: RequestHandler = () => {
	const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteContent.seo.siteUrl}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
