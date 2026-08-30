import { Technology } from './technology';
import { experience } from './experience';
import { projects, sideProjects, workGroups } from './projects';
import type { Experience, Project, Stat, WorkGroup } from './types';

type Cta = { label: string; href: string };

export type SiteContent = {
	/** Cómo firmo: el handle es el nombre de marca, el legal solo aparece en prosa. */
	name: string;
	fullName: string;
	email: string;

	seo: {
		siteName: string;
		defaultTitle: string;
		/** `%s` se reemplaza con el título propio de cada página. */
		titleTemplate: string;
		defaultDescription: string;
		defaultImage: string;
		locale: string;
		twitterHandle?: string;
	};

	navigation: {
		links: { href: string; label: string }[];
		contactCta: string;
		socials: { label: string; href: string }[];
	};

	/** El cierre es el mismo en las cuatro páginas: un solo llamado, una sola redacción. */
	cta: { title: string; description: string; primaryCta: Cta; secondaryCta: Cta };

	home: {
		hero: {
			badge: string;
			title: string;
			description: string;
			primaryCta: Cta;
			secondaryCta: Cta;
		};
		experience: { title: string; description: string; cta: Cta };
		work: { title: string; description: string; cta: Cta };
	};

	workPage: {
		title: string;
		description: string;
		stats: Stat[];
		groups: WorkGroup[];
		side: { title: string; description: string; projects: Project[] };
	};

	about: {
		title: string;
		description: string;
	};

	blog: {
		title: string;
		description: string;
	};

	skills: { title: string; description: string; groups: Record<string, Technology[]> };

	socials: { github: string; linkedin: string; instagram: string; kora: string };

	footer: { subtitle: string; credits: string; linkGroups: LinkGroup[] };
};

export type LinkGroup = {
	title: string;
	links: { label: string; href: string; external?: boolean }[];
};

const RESUME = '/files/resume.pdf';
const KORA = 'https://kora.imlargo.dev';
const EMAIL = 'jclargob@gmail.com';

/** El llamado principal, tanto en el hero como en el cierre. */
const contactCta: Cta = { label: 'Contact me', href: `mailto:${EMAIL}` };

export const siteContent: SiteContent = {
	name: 'imlargo',
	fullName: 'Juan Carlos Largo',
	email: EMAIL,

	seo: {
		siteName: 'imlargo',
		defaultTitle: 'imlargo · Senior Software Engineer',
		titleTemplate: '%s · imlargo',
		defaultDescription:
			'Juan Carlos Largo (@imlargo). Senior Software Engineer and founder of Kora Studio. Go on the backend, TypeScript and Svelte on the frontend, architecture through deployment. 20+ systems shipped, all still running.',
		defaultImage: '/assets/pfp.jpg',
		locale: 'en_US'
	},

	navigation: {
		links: [
			{ href: '/', label: 'Home' },
			{ href: '/work', label: 'Work' },
			{ href: '/blog', label: 'Writing' },
			{ href: '/about', label: 'About' }
		],
		contactCta: 'Contact me',
		socials: [
			{ label: 'GitHub', href: 'https://github.com/imlargo' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/imlargo/' },
			{ label: 'Instagram', href: 'https://instagram.com/imlargo' },
			{ label: 'Kora Studio', href: KORA }
		]
	},

	cta: {
		title: 'What if we build something amazing together?',
		description:
			'Open to remote roles, and taking on a couple of client projects at a time through Kora Studio.',
		primaryCta: contactCta,
		secondaryCta: { label: 'Kora Studio', href: KORA }
	},

	home: {
		hero: {
			badge: 'Open to remote',
			title: "Hi, I'm largo",
			description:
				'Senior Software Engineer and founder of Kora Studio. Go on the backend, TypeScript and Svelte on the frontend, architecture through deployment. 20+ systems shipped, all still running.',
			primaryCta: contactCta,
			secondaryCta: { label: 'Kora Studio', href: KORA }
		},

		experience: {
			title: 'My experience',
			description: 'Full technical ownership across several industries and team sizes.',
			cta: { label: 'Resume', href: RESUME }
		},

		work: {
			title: 'Selected projects',
			description:
				'Open source and side projects. Most exist because I needed the same thing three times first.',
			cta: { label: 'See all my work', href: '/work' }
		}
	},

	workPage: {
		title: 'Work',
		description:
			'20+ production systems built from scratch since 2023, for companies, universities and government-linked institutions. Most are private, so this is what I can say without opening the repository.',
		stats: [
			{ value: '20+', label: 'Systems shipped to production' },
			{ value: '4', label: 'Industries' },
			{ value: '100%', label: 'Still running' }
		],
		groups: workGroups,
		side: {
			title: 'Open source & side projects',
			description:
				'Libraries, templates and experiments, most of them patterns pulled out of the systems above.',
			projects: sideProjects
		}
	},

	about: {
		title: 'About me',
		description:
			'Juan Carlos Largo (@imlargo), senior software engineer and founder of Kora Studio, based in Medellín, Colombia.'
	},

	blog: {
		title: 'Writing',
		description: 'Things I have built, the decisions behind them and the parts I got wrong.'
	},

	skills: {
		title: 'Skills & Technologies',
		description:
			'Go and Gin on the backend, Svelte and TypeScript on the frontend, plus multi-model LLM integration taken all the way to production monitoring.',
		groups: {
			Frontend: [
				Technology.Svelte,
				Technology.Vue,
				Technology.Typescript,
				Technology.React,
				Technology.Tailwind,
				Technology.Html,
				Technology.Css
			],
			Backend: [
				Technology.Go,
				Technology.Gin,
				Technology.NodeJs,
				Technology.Python,
				Technology.Gleam
			],
			Data: [Technology.Postgres, Technology.Redis, Technology.MongoDB, Technology.RabbitMQ],
			'Infrastructure & Observability': [
				Technology.Docker,
				Technology.Aws,
				Technology.Nginx,
				Technology.Githubactions,
				Technology.CiCd,
				Technology.Grafana,
				Technology.Prometheus
			],
			Testing: [Technology.Vitest, Technology.Playwright]
		}
	},

	socials: {
		github: 'https://github.com/imlargo',
		linkedin: 'https://www.linkedin.com/in/imlargo/',
		instagram: 'https://instagram.com/imlargo',
		kora: KORA
	},

	footer: {
		subtitle: 'Senior Software Engineer · Founder at Kora Studio',
		credits: 'Designed & built by imlargo',
		linkGroups: [
			{
				title: 'Navigation',
				links: [
					{ label: 'Home', href: '/' },
					{ label: 'Work', href: '/work' },
					{ label: 'Writing', href: '/blog' },
					{ label: 'About', href: '/about' }
				]
			},
			{
				title: 'Elsewhere',
				links: [
					{ label: 'GitHub', href: 'https://github.com/imlargo', external: true },
					{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/imlargo/', external: true },
					{ label: 'Instagram', href: 'https://instagram.com/imlargo', external: true },
					{ label: 'Kora Studio', href: KORA, external: true },
					{ label: 'Resume', href: RESUME, external: true }
				]
			}
		]
	}
};

/** Reexportados para que las vistas importen todo el contenido desde un solo módulo. */
export { experience, projects, sideProjects, workGroups };
export type { Experience, Project, Stat, WorkGroup };
