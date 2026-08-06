import { getPost, getSiblings, posts, readingTime } from '$lib/assets/content/blog';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		error(404, `No post found for "${params.slug}"`);
	}

	return {
		post,
		readingTime: readingTime(post),
		...getSiblings(post.slug)
	};
};
