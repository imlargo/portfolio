import { getSummaries, getTags } from '$lib/assets/content/blog';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	return {
		posts: getSummaries(),
		tags: getTags()
	};
};
