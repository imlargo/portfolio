import { Technology } from './technology';
import type { Project, WorkGroup } from './types';

/** Los repos y productos propios que abren la home. */
export const projects: Project[] = [
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
			'Batteries-included Go framework for modern backends, extracted from production systems and deployed back into them, so the abstractions had to survive somewhere real first.',
		technologies: [Technology.Go, Technology.Gin, Technology.Postgres]
	},
	{
		github: 'https://github.com/imlargo/coral',
		url: 'https://github.com/imlargo/coral',
		title: 'coral',
		description:
			'A Svelte component layer on top of shadcn that ships composed patterns instead of primitives. The pieces I rebuild on every frontend, packaged once.',
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

/** El archivo completo de /work, agrupado por tipo de encargo. */
export const workGroups: WorkGroup[] = [
	{
		title: 'Product & platform',
		description:
			'Systems where I own the architecture, the infrastructure and whatever happens in production.',
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
		description: 'Institutional work. The hard part is almost never the code.',
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
					'Built on our own foundation instead of a template, shaped around how the client actually sells, so it can grow without a rewrite.',
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

/** Librerías, plantillas y experimentos: el fondo del catálogo. */
export const sideProjects: Project[] = [
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
			'CPM engine in TypeScript, pure functions and zero dependencies. Written for construction scheduling; it works for any plan with dependencies and a deadline.',
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
