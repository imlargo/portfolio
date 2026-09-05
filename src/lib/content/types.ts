import type { Technology } from './technology';

export type Experience = {
	role: string;
	date: string;
	stack: Technology[];
	company: string;
	description: string;
};

export type WorkItem = {
	title: string;
	context: string;
	period: string;
	description: string;
	technologies: Technology[];
	url?: string;
};

export type WorkGroup = {
	title: string;
	description: string;
	items: WorkItem[];
};

export type Stat = {
	value: string;
	label: string;
};

export type Project = {
	image?: string;
	title: string;
	description: string;
	technologies: Technology[];
	url?: string;
	github?: string;
};

export type PostBlock =
	| { type: 'paragraph'; text: string }
	| { type: 'heading'; level: 2 | 3; text: string }
	| { type: 'code'; language: string; code: string; html?: string }
	| { type: 'list'; ordered?: boolean; items: string[] }
	| { type: 'quote'; text: string; cite?: string };

export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	/**
	 * Solo cuando el post se editó después de publicarse. Alimenta el
	 * `dateModified` del JSON-LD y el `lastmod` del sitemap, que es como un
	 * buscador sabe que vale la pena volver a rastrear una URL que ya conoce.
	 */
	updated?: string;
	tags: string[];
	/**
	 * Color de la portada. Es el de la tecnología que protagoniza el post; donde
	 * dos entradas comparten lenguaje manda lo que las diferencia, y las que van
	 * sobre herramientas propias llevan el lila de marca.
	 */
	accent: string;
	/** Va en la retícula grande del índice, sin importar qué tan reciente sea. */
	featured?: boolean;
	content: PostBlock[];
};

export type PostSummary = Omit<Post, 'content'> & {
	readingTime: number;
};
