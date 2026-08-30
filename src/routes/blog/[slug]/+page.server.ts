import { getPost, getSiblings, posts, readingTime } from '$lib/content/blog';
import { error } from '@sveltejs/kit';
import { codeToHtml } from 'shiki';
import type { PostBlock } from '$lib/content/types';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

/**
 * El resaltado corre acá y no en el componente: como `+page.server.ts` solo se
 * ejecuta en el servidor (en este sitio, solo durante el build, porque la ruta
 * está prerenderizada), Shiki nunca viaja al navegador. Lo que llega al cliente
 * es el HTML ya coloreado, tokens y estilos inline incluidos.
 */
async function highlight(content: PostBlock[]): Promise<PostBlock[]> {
	return Promise.all(
		content.map(async (block) => {
			if (block.type !== 'code') return block;
			const html = await codeToHtml(block.code, {
				lang: block.language,
				theme: 'catppuccin-mocha'
			});
			return { ...block, html };
		})
	);
}

export const load: PageServerLoad = async ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		error(404, `No post found for "${params.slug}"`);
	}

	return {
		post: { ...post, content: await highlight(post.content) },
		readingTime: readingTime(post),
		...getSiblings(post.slug)
	};
};
