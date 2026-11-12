/**
 * Charlas, masterclasses y mentorías. Cada una con presentación tiene su propia
 * ruta bajo `/talks/<slug>`, armada como las de Kora: una página interactiva
 * que se proyecta y que queda publicada para quien asistió.
 */

export const TALK_KIND = {
	talk: 'talk',
	masterclass: 'masterclass',
	mentoring: 'mentoring'
} as const;

export type TalkKind = (typeof TALK_KIND)[keyof typeof TALK_KIND];

export const TALK_STATUS = {
	/** Se puede abrir por su enlace, pero no se indexa ni entra al sitemap. */
	draft: 'draft',
	published: 'published'
} as const;

export type TalkStatus = (typeof TALK_STATUS)[keyof typeof TALK_STATUS];

export const TALK_LANGUAGE = { es: 'es', en: 'en' } as const;

export type TalkLanguage = (typeof TALK_LANGUAGE)[keyof typeof TALK_LANGUAGE];

/** Las rutas de cada presentación. Cada una es un componente propio, no una plantilla. */
export const TALK_SLUGS = {
	webIntro: 'intro-to-web-development'
} as const;

export type TalkSlug = (typeof TALK_SLUGS)[keyof typeof TALK_SLUGS];

export type Talk = {
	slug: TalkSlug;
	kind: TalkKind;
	status: TalkStatus;
	/** El título en el idioma en que se da. */
	title: string;
	/** Resumen en inglés, para la lista del sitio. */
	description: string;
	language: TalkLanguage;
	audience: string;
	/** Duración prevista en minutos. */
	minutes: number;
	topics: string[];
};

export const talks: Talk[] = [
	{
		slug: TALK_SLUGS.webIntro,
		kind: TALK_KIND.masterclass,
		status: TALK_STATUS.draft,
		title: 'Introducción al desarrollo de aplicaciones web',
		description:
			'What a web app is and how to decide what to build, then how the web works and how a frontend is built: HTTP, the DOM, reactivity, components, Tailwind, shadcn/ui and project structure. Interactive, with live examples.',
		language: TALK_LANGUAGE.es,
		audience: 'Developers new to the web',
		minutes: 120,
		topics: [
			'Product',
			'Web vs native',
			'HTTP',
			'DOM',
			'Reactivity',
			'Components',
			'Tailwind',
			'shadcn/ui'
		]
	}
];

export const TALKS_PATH = '/talks';

export const talkPath = (slug: TalkSlug) => `${TALKS_PATH}/${slug}`;

export const talksPage = {
	eyebrow: 'Talks',
	title: 'Talks, masterclasses and mentoring.',
	titleAccent: 'What I have learned shipping, explained live.',
	metaTitle: 'Talks',
	description:
		'Talks, masterclasses and mentoring by Juan Carlos Largo (@imlargo). Every session comes with its own interactive presentation, published here.',
	kindLabels: {
		[TALK_KIND.talk]: 'Talk',
		[TALK_KIND.masterclass]: 'Masterclass',
		[TALK_KIND.mentoring]: 'Mentoring'
	} satisfies Record<TalkKind, string>,
	languageLabels: {
		[TALK_LANGUAGE.es]: 'Spanish',
		[TALK_LANGUAGE.en]: 'English'
	} satisfies Record<TalkLanguage, string>,
	draftLabel: 'Draft',
	minutesLabel: (minutes: number) => `${minutes} min`,
	openLabel: 'Open presentation',
	empty: 'Nothing here yet. The first sessions are being prepared.',
	mentoring: {
		title: 'Mentoring',
		description:
			'I also do one-on-one mentoring sessions with developers. If you want one, write to me.',
		cta: 'Get in touch'
	}
};
