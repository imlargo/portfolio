import type { Technology } from './technology';

export type Experience = {
	role: string;
	date: string;
	stack: Technology[];
	company: string;
	description: string;
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
	| { type: 'code'; language: string; code: string }
	| { type: 'list'; ordered?: boolean; items: string[] }
	| { type: 'quote'; text: string; cite?: string };

export type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	featured?: boolean;
	content: PostBlock[];
};

export type PostSummary = Omit<Post, 'content'> & {
	readingTime: number;
};

export type Content = {
	name: string;
	email: string;

	hero: {
		badge: string;
		title: string;
		description: string;
	};

	experience: {
		title: string;
		description: string;

		items: Experience[];
	};

	work: {
		title: string;
		description: string;

		projects: Project[];
		work: Project[];
	};

	skills: {
		title: string;
		description: string;
		skills: Record<string, Technology[]>;
	};

	blog: {
		title: string;
		description: string;
	};

	socials?: {
		github?: string;
		linkedin?: string;
		instagram?: string;
		twitter?: string;
	};

	footer: {
		title: string;
		subtitle: string;
		credits: string;
	};
};
