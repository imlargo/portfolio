import { Technology } from '$lib/assets/content/technology';
import type { Content, Experience, Project, WorkGroup } from './types';

const projects: Project[] = [
	{
		url: 'https://pegaso.imlargo.dev',
		github: 'https://github.com/imlargo/pegaso',
		title: 'Pegaso',
		description:
			"Course scheduling platform for Universidad Nacional de Colombia. 6,200+ users through organic adoption, no advertising. The university's official platform later adopted its core design decisions.",
		technologies: [
			Technology.Svelte,
			Technology.Go,
			Technology.Typescript,
			Technology.Postgres,
			Technology.Tailwind
		]
	},
	{
		url: 'https://www.npmjs.com/package/@korastd/air',
		github: 'https://github.com/imlargo/air',
		title: 'air',
		description:
			'A tiny HTTP client for TypeScript built on native fetch. 300 lines, zero dependencies, ~2 kB. I had rewritten the same wrapper in every project, so I wrote it once properly.',
		technologies: [Technology.Typescript]
	},
	{
		github: 'https://github.com/imlargo/medusa-template',
		url: 'https://github.com/imlargo/medusa-template',
		title: 'Medusa',
		description:
			'Batteries-included Go framework for modern backends, extracted from production systems and deployed back into them. Validated under real constraints, not in isolation.',
		technologies: [Technology.Go, Technology.Gin, Technology.Postgres]
	},
	{
		github: 'https://github.com/imlargo/coral',
		url: 'https://github.com/imlargo/coral',
		title: 'coral',
		description:
			'A Svelte component layer on top of shadcn that ships composed patterns instead of primitives, so the next project starts where the last one finished.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind]
	},
	{
		github: 'https://github.com/imlargo/sse',
		url: 'https://github.com/imlargo/sse',
		title: 'sse',
		description:
			'Server-Sent Events for Go. Connections, broadcasting and per-client fan-out behind a small surface.',
		technologies: [Technology.Go]
	},
	{
		github: 'https://github.com/imlargo/gleam-webpush',
		url: 'https://hexdocs.pm/webpush/index.html',
		title: 'Gleam WebPush',
		description:
			'Web Push for Gleam, following RFC 8291 and 8292. No external dependencies, only OTP crypto. There was no library for it, so I wrote one.',
		technologies: [Technology.Gleam]
	}
];

const experience: Experience[] = [
	{
		role: 'Lead Frontend Engineer',
		date: 'Feb 2026 - Present',
		stack: [
			Technology.Vue,
			Technology.Svelte,
			Technology.Typescript,
			Technology.Tailwind,
			Technology.Vitest,
			Technology.Playwright
		],
		company: 'Unergy',
		description:
			'Own frontend architecture for the platform running the company solar mini-farm business, leading a team of 4. Shipped a Vue + TypeScript component library used across every application, refactored 6 core modules for 25% smaller bundles, and am migrating the platform to Svelte one module at a time.'
	},
	{
		role: 'Founder & Lead Engineer',
		date: 'Jan 2024 - Present',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Svelte,
			Technology.Vue,
			Technology.NodeJs,
			Technology.Postgres,
			Technology.Docker,
			Technology.Aws
		],
		company: 'Kora Studio',
		description:
			'Product and technology studio in Medellín. Every engagement starts with understanding the business, and the first conversation is with the person who writes the code. 12+ systems across construction, education, retail and the public sector, all still in production, every client by referral.'
	},
	{
		role: 'Senior Software Engineer',
		date: 'Nov 2025 - Feb 2026',
		stack: [
			Technology.Typescript,
			Technology.React,
			Technology.NodeJs,
			Technology.Postgres,
			Technology.Leaflet
		],
		company: 'ASCUN',
		description:
			"Sole engineer on a national gender-based-violence prevention platform, built with Colombia's Ministry of Education for 64+ universities. Rebuilt a legacy Node.js backend into a layered architecture under a higher compliance bar, rewrote 3 product surfaces, and shipped a conversational assistant with an interactive map."
	},
	{
		role: 'Lead Software Engineer & Technical Co-Founder',
		date: 'Jan 2025 - Jan 2026',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Svelte,
			Technology.Postgres,
			Technology.Redis,
			Technology.Docker,
			Technology.Aws,
			Technology.Grafana
		],
		company: 'Butter',
		description:
			'Sole technical owner of an international content-generation SaaS, from idea to 1,000+ users. Built the AI pipeline that differentiated it (multi-model LLMs, FFmpeg, GPU scheduling) running 2,000+ jobs/day at ~2.4 min median, plus Stripe billing, a marketplace and the observability behind 99.9% uptime.'
	},
	{
		role: 'Senior Software Engineer',
		date: 'Nov 2023 - Nov 2025',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Svelte,
			Technology.NodeJs,
			Technology.Python,
			Technology.Postgres,
			Technology.Firebase
		],
		company: 'Universidad Nacional de Colombia',
		description:
			'Technical lead for administrative systems at the Faculty of Engineering. Built a field-trip platform that cut approval cycles from 2 weeks to 20 minutes over 200+ requests a semester, a real-time air-quality platform accurate enough to publish from, and a learning platform with a code judge the Faculty approved as an institutional tool.'
	}
];

const workGroups: WorkGroup[] = [
	{
		title: 'Product & platform',
		description: 'Systems I own end-to-end: architecture, infrastructure and production behaviour.',
		items: [
			{
				title: 'Solar project lifecycle platform',
				context: 'Unergy',
				period: '2025 - Present',
				description:
					'Runs the solar mini-farm business from origination through construction and operation. Migrating it from Vue to Svelte module by module while it keeps shipping features.',
				technologies: [
					Technology.Vue,
					Technology.Svelte,
					Technology.Typescript,
					Technology.Tailwind
				]
			},
			{
				title: 'Internal component library and templates',
				context: 'Unergy',
				period: '2026',
				description:
					'Vue + TypeScript components, project templates and shared foundations used across every application. New projects go from days of setup to hours.',
				technologies: [
					Technology.Vue,
					Technology.Typescript,
					Technology.Tailwind,
					Technology.Vitest
				]
			},
			{
				title: 'Butter, content-generation SaaS',
				context: 'Own product, international',
				period: '2025 - 2026',
				description:
					'Distributed Go system built from zero: job queues, Postgres and Redis, AWS, a multi-model AI pipeline, Stripe subscriptions and a marketplace. 1,000+ users, 2,000+ jobs a day, one engineer.',
				technologies: [
					Technology.Go,
					Technology.Svelte,
					Technology.Postgres,
					Technology.Redis,
					Technology.Aws,
					Technology.Grafana
				]
			},
			{
				title: 'Construction operations system',
				context: 'ING, via Kora Studio',
				period: '2026',
				description:
					'Contracts, service orders, work plans and budgets across every project, with field constraints feeding straight back into the schedule.',
				technologies: [Technology.Go, Technology.Svelte, Technology.Typescript, Technology.Postgres]
			}
		]
	},
	{
		title: 'Public sector & education',
		description:
			'Institutional work, where the constraint is rarely the technology and almost always the process.',
		items: [
			{
				title: 'National GBV prevention and response platform',
				context: "ASCUN & Colombia's Ministry of Education",
				period: '2025 - 2026',
				description:
					'Rebuilt end-to-end for 64+ universities: a layered Node.js backend handling sensitive citizen data, three product surfaces, and a conversational assistant with an interactive map of Colombia.',
				technologies: [
					Technology.NodeJs,
					Technology.React,
					Technology.Typescript,
					Technology.Leaflet
				],
				url: 'https://dyvbg-ascun.com.co'
			},
			{
				title: 'Care-route criteria calculator',
				context: "Colombia's Ministry of Education",
				period: '2025',
				description:
					'Takes the components of a gender-based-violence case and returns the applicable procedure immediately, designed for people using it during a crisis.',
				technologies: [Technology.Typescript, Technology.React]
			},
			{
				title: 'Field trip management platform',
				context: 'Universidad Nacional de Colombia',
				period: '2024 - 2025',
				description:
					'Replaced a manual administrative and financial process with automated workflows, cutting each trip from 1-2 weeks to under 20 minutes across 200+ requests a semester.',
				technologies: [Technology.Go, Technology.Svelte, Technology.Postgres, Technology.Typescript]
			},
			{
				title: 'Real-time air quality monitoring',
				context: 'Research lab, Universidad Nacional de Colombia',
				period: '2024',
				description:
					'Continuous sensor ingestion, dashboards and automated reports, accurate enough for the lab to publish from.',
				technologies: [
					Technology.NodeJs,
					Technology.Javascript,
					Technology.Firebase,
					Technology.Python
				]
			},
			{
				title: 'Learning platform with integrated code judge',
				context: 'Universidad Nacional de Colombia',
				period: '2024',
				description:
					'Course management with an automated judge for programming assessments, formally approved by the Faculty as an institutional tool.',
				technologies: [
					Technology.Svelte,
					Technology.NodeJs,
					Technology.Typescript,
					Technology.Docker
				]
			},
			{
				title: 'CNRE training platform for student representatives',
				context: 'Universidad Nacional de Colombia',
				period: '2025',
				description:
					'Courses, materials, assessments, attendance and eligibility for student representatives across every campus.',
				technologies: [
					Technology.Svelte,
					Technology.Typescript,
					Technology.NodeJs,
					Technology.Postgres
				]
			},
			{
				title: 'Course content management',
				context: 'Facultad de Minas',
				period: '2024',
				description:
					'Coordinates subject content updates across multiple stakeholders, replacing a document-and-email workflow nobody could audit.',
				technologies: [Technology.Svelte, Technology.NodeJs, Technology.Firebase]
			},
			{
				title: 'MinasBot, WhatsApp assistant',
				context: 'Facultad de Minas',
				period: '2023 - 2024',
				description:
					'Answers frequent student questions and routes administrative requests, covered by the Faculty as one of its student-facing AI initiatives.',
				technologies: [Technology.NodeJs, Technology.Javascript],
				url: 'https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles'
			},
			{
				title: 'Automations for the Vice-Dean office',
				context: 'Facultad de Minas',
				period: '2023 - 2024',
				description:
					'Apps Script and Python automations that removed high-volume manual work from an office doing it by hand every week.',
				technologies: [Technology.AppsScript, Technology.Python, Technology.Javascript]
			}
		]
	},
	{
		title: 'Commerce & business systems',
		description:
			'Client work through Kora Studio: businesses running on spreadsheets and WhatsApp that needed software built around how they operate.',
		items: [
			{
				title: 'ScholarKit, school kit e-commerce',
				context: 'Education retail, via Kora Studio',
				period: '2025',
				description:
					'Families buy the kit and uniform for their exact grade and group, with orders organized the way the school distributes them.',
				technologies: [Technology.Svelte, Technology.Typescript, Technology.Postgres, Technology.Go]
			},
			{
				title: 'Custom e-commerce platform',
				context: 'Retail client, via Kora Studio',
				period: '2025',
				description:
					'Built on our own foundation instead of a template, shaped around the client operation so growth does not mean a redesign a year later.',
				technologies: [Technology.Svelte, Technology.Go, Technology.Postgres, Technology.Docker]
			},
			{
				title: 'Venue reservation marketplace',
				context: 'Nightlife & events startup, via Kora Studio',
				period: '2024 - 2025',
				description:
					'Reservations and online payments for venues and events, where I helped define the product scope alongside the architecture.',
				technologies: [Technology.Svelte, Technology.Go, Technology.Postgres, Technology.Typescript]
			},
			{
				title: 'Due-diligence agent',
				context: 'Client engagement, via Kora Studio',
				period: '2026',
				description:
					'LLM agent with token-cost optimization and human-in-the-loop verification, taking a due-diligence run from millions of Colombian pesos to a few hundred.',
				technologies: [Technology.Go, Technology.Typescript, Technology.Postgres]
			},
			{
				title: 'Multi-tenant microsite system',
				context: 'Client engagement, via Kora Studio',
				period: '2024',
				description:
					'One system serving many independently branded sites, so publishing a new one is a configuration change.',
				technologies: [Technology.Svelte, Technology.Typescript, Technology.NodeJs]
			},
			{
				title: 'Process automation tooling',
				context: 'Client engagements, via Kora Studio',
				period: '2024 - 2026',
				description:
					'Internal tools that took recurring operations out of spreadsheets and inboxes: scheduled jobs, integrations, alerts and reminders.',
				technologies: [Technology.Go, Technology.Typescript, Technology.Postgres, Technology.Docker]
			}
		]
	}
];

const sideProjects: Project[] = [
	{
		github: 'https://github.com/imlargo/svelte-template',
		url: 'https://github.com/imlargo/svelte-template',
		title: 'svelte-template',
		description:
			'Production-ready Svelte 5 starter with a layered architecture, the structure I use to start real projects.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind]
	},
	{
		github: 'https://github.com/imlargo/ratelimit',
		url: 'https://github.com/imlargo/ratelimit',
		title: 'ratelimit',
		description:
			'Rate limiting for Go services. The strategies and storage backends I kept reimplementing, behind one interface.',
		technologies: [Technology.Go, Technology.Redis]
	},
	{
		github: 'https://github.com/imlargo/cpm',
		url: 'https://www.npmjs.com/package/@korastd/critical-path-method',
		title: 'Critical Path Method',
		description:
			'CPM engine in TypeScript, pure functions and zero dependencies. Written for construction scheduling, useful for any plan with dependencies and a deadline.',
		technologies: [Technology.Typescript]
	},
	{
		github: 'https://github.com/imlargo/janus',
		url: 'https://github.com/imlargo/janus',
		title: 'janus',
		description:
			'Plug-and-play authentication for Go: sessions, refresh tokens and the boundaries between them.',
		technologies: [Technology.Go, Technology.Postgres, Technology.Redis]
	},
	{
		url: 'https://odpiobservatorio.vercel.app',
		github: 'https://github.com/odpiobservatorio/odpiobservatorio.github.io',
		title: 'ODPI Observatorio',
		description:
			'Human rights data platform on violence against indigenous peoples in Colombia. Its outputs are cited in official UN Special Rapporteur reports.',
		technologies: [
			Technology.Javascript,
			Technology.Html,
			Technology.Css,
			Technology.Firebase,
			Technology.Leaflet
		]
	},
	{
		url: 'https://copywhisper.imlargo.dev',
		github: 'https://github.com/imlargo/CopyWhisper',
		title: 'CopyWhisper',
		description:
			'Analyzes, scores and rewrites the copy of a landing page. Built for a Vercel and midudev hackathon, where it was one of the featured projects.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind, Technology.Scss]
	}
];

export const content: Content = {
	name: 'imlargo',
	email: 'jclargob@gmail.com',

	hero: {
		badge: 'Open to remote',
		title: "Hi, i'm largo",
		description:
			'Senior Software Engineer and founder of Kora Studio. Go on the backend, TypeScript and Svelte on the frontend, architecture through deployment. 20+ systems shipped, all still running.'
	},

	experience: {
		title: 'My experience',
		description: 'Full technical ownership across several industries and team sizes.',

		items: experience
	},

	work: {
		title: 'Selected projects',
		description:
			'Open source and side projects. Most exist because I needed the same thing three times first.',

		projects: projects,
		work: []
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

	skills: {
		title: 'Skills & Technologies',
		description:
			'Go and Gin on the backend, Svelte and TypeScript on the frontend, plus multi-model LLM integration taken all the way to production monitoring.',
		skills: {
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

	blog: {
		title: 'Writing',
		description: 'Things I have built, the decisions behind them and the parts I got wrong.'
	},

	socials: {
		github: 'https://github.com/imlargo',
		linkedin: 'https://www.linkedin.com/in/imlargo/',
		instagram: 'https://instagram.com/imlargo'
	},

	footer: {
		title: 'imlargo',
		subtitle: 'Senior Software Engineer · Founder at Kora Studio',
		credits: 'Designed & Built by Imlargo'
	}
};
