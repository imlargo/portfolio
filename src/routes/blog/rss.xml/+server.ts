import { getPosts } from '$lib/content/blog';
import { absolute } from '$lib/components/seo/structured-data';
import { siteContent } from '$lib/content/site-content';
import type { PostBlock } from '$lib/content/types';
import type { RequestHandler } from './$types';

export const prerender = true;

const { seo, fullName, email } = siteContent;

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/**
 * Los bloques van a HTML plano, sin las clases ni los atributos que usa el sitio:
 * un lector de feeds descarta el CSS de todos modos y lo que sobra estorba. El
 * código sale como `<pre><code>` crudo, no con el resaltado de Shiki, porque el
 * HTML de Shiki depende de estilos inline que el feed no arrastra.
 */
function blockToHtml(block: PostBlock): string {
	switch (block.type) {
		case 'paragraph':
			return `<p>${escapeXml(block.text)}</p>`;
		case 'heading':
			return `<h${block.level}>${escapeXml(block.text)}</h${block.level}>`;
		case 'code':
			return `<pre><code>${escapeXml(block.code)}</code></pre>`;
		case 'list': {
			const tag = block.ordered ? 'ol' : 'ul';
			const items = block.items.map((item) => `<li>${escapeXml(item)}</li>`).join('');
			return `<${tag}>${items}</${tag}>`;
		}
		case 'quote': {
			const cite = block.cite ? `<footer>${escapeXml(block.cite)}</footer>` : '';
			return `<blockquote><p>${escapeXml(block.text)}</p>${cite}</blockquote>`;
		}
	}
}

/** RFC 822, que es el formato de fecha que exige RSS 2.0. */
function rfc822(date: string): string {
	return new Date(`${date}T00:00:00Z`).toUTCString();
}

export const GET: RequestHandler = () => {
	const posts = getPosts();
	const feedUrl = `${seo.siteUrl}/blog/rss.xml`;

	const items = posts
		.map((post) => {
			const url = absolute(`/blog/${post.slug}`);
			const content = post.content.map(blockToHtml).join('');
			const categories = post.tags
				.map((tag) => `<category>${escapeXml(tag)}</category>`)
				.join('');

			return `<item>
<title>${escapeXml(post.title)}</title>
<link>${url}</link>
<guid isPermaLink="true">${url}</guid>
<pubDate>${rfc822(post.date)}</pubDate>
<dc:creator>${escapeXml(fullName)}</dc:creator>
<description>${escapeXml(post.description)}</description>
${categories}
<content:encoded><![CDATA[${content}]]></content:encoded>
</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
<title>${escapeXml(`${seo.siteName} · Writing`)}</title>
<link>${seo.siteUrl}/blog</link>
<description>${escapeXml(siteContent.blog.description)}</description>
<language>en</language>
<managingEditor>${escapeXml(`${email} (${fullName})`)}</managingEditor>
<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${posts[0] ? `<lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>` : ''}
${items}
</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/rss+xml; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600'
		}
	});
};
