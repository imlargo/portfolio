import { Technology } from '$lib/assets/content/technology';
import type { Content, Experience, Project, WorkGroup } from './types';

const projects: Project[] = [
	{
		url: 'https://pegaso.imlargo.dev',
		github: 'https://github.com/imlargo/pegaso',
		title: 'Pegaso',
		description:
			"Course scheduling and discovery platform for Universidad Nacional de Colombia. Scaled to 6,200+ active users through entirely organic adoption, the university's subsequent official platform adopted its core design decisions, and the project prompted formal acquisition discussions.",
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
			'A tiny HTTP client for TypeScript built on native fetch. Around 300 lines, zero runtime dependencies, ~2 kB over the wire. I had rewritten the same fetch wrapper in every project, so I wrote it once properly and published it.',
		technologies: [Technology.Typescript]
	},
	{
		github: 'https://github.com/imlargo/medusa-template',
		url: 'https://github.com/imlargo/medusa-template',
		title: 'Medusa',
		description:
			'Batteries-included Go framework for modern backends, extracted from production patterns across multiple client systems and deployed back into those same environments, validating the abstractions under real constraints, not in isolation.',
		technologies: [Technology.Go, Technology.Gin, Technology.Postgres]
	},
	{
		github: 'https://github.com/imlargo/coral',
		url: 'https://github.com/imlargo/coral',
		title: 'coral',
		description:
			'A Svelte component layer on top of shadcn that ships composed, ready-to-use patterns instead of primitives. The pieces I ended up rebuilding on every frontend, packaged so the next project starts where the last one finished.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind]
	},
	{
		github: 'https://github.com/imlargo/sse',
		url: 'https://github.com/imlargo/sse',
		title: 'sse',
		description:
			'Server-Sent Events for Go. Connection handling, broadcasting and per-client fan-out behind a small surface, pulled out of a production system that needed streaming updates and kept needing them.',
		technologies: [Technology.Go]
	},
	{
		github: 'https://github.com/imlargo/gleam-webpush',
		url: 'https://hexdocs.pm/webpush/index.html',
		title: 'Gleam WebPush',
		description:
			'Web Push for the Gleam ecosystem, following RFC 8291 and 8292. No external dependencies, only OTP crypto. There was no Web Push library for Gleam, so I wrote it, and v2 is complete and production-ready.',
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
			'Leading frontend engineering at a solar energy company, owning architecture and delivery for the platform that manages the complete solar mini-farm project lifecycle. Lead a team of 4 engineers, architected a Vue + TypeScript component library standardized across every company application, led a structural refactor of 6 core modules that cut bundle size and load times by 25%, and am directing a progressive, module-by-module migration from Vue to Svelte with test coverage backing every step.'
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
			'Founded and run a product and technology studio in Medellín. Every engagement starts with understanding the business, not with a backlog: I run the first conversation, decide what is actually worth building, and stay accountable through architecture, implementation, deployment and handoff. 12+ systems delivered across construction, education, retail and the public sector. All of them still in production, every client arrived by referral, and we have never advertised.'
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
			"Engaged as sole engineer by the Colombian Association of Universities (operating jointly with Colombia's Ministry of Education) to redesign a national gender-based-violence prevention platform end-to-end, with security and compliance held to a higher bar for sensitive citizen data. Rewrote a legacy Node.js backend into a layered architecture, rebuilt 3 product surfaces, and shipped a conversational assistant with an interactive map of Colombia serving 64+ universities."
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
			"Joined when the product was an idea and stayed the sole technical owner across architecture, implementation, infrastructure and production operations for an international content-generation SaaS, taken from zero to 1,000+ active users. Built the AI pipeline that was the product's differentiator, multi-model LLM integration with cost and latency tradeoffs, FFmpeg processing and GPU scheduling, running 2,000+ jobs/day at ~2.4 min median latency, plus Stripe billing, a multi-vendor marketplace and observability sustaining 99.9% uptime."
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
			"Technical lead and full-stack engineer for mission-critical administrative systems at the Faculty of Engineering, accountable from requirements through long-term maintenance. Delivered a field-trip management platform that cut approval cycles from 2 weeks to 20 minutes across 200+ requests per semester, a real-time air-quality monitoring platform accurate enough for a research lab's publishable data, and an educational platform with an integrated code judge that the Faculty formally approved as an institutional tool."
	}
];

const workGroups: WorkGroup[] = [
	{
		title: 'Product & platform',
		description:
			'Systems I own end-to-end, where the architecture, the infrastructure and the production behaviour are all mine to answer for.',
		items: [
			{
				title: 'Solar project lifecycle platform',
				context: 'Unergy',
				period: '2025 - Present',
				description:
					"The system that runs Unergy's solar mini-farm business, from project origination through construction and operation. I own the frontend architecture, and I am migrating it from Vue to Svelte one module at a time while the platform keeps shipping features.",
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
					'A Vue + TypeScript component library, project templates and shared foundations standardized across every application in the company. New features ship 20% faster and a new project goes from days of setup to hours.',
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
					'Distributed Go system built from zero: async job queues, PostgreSQL and Redis, containerized AWS infrastructure, a multi-model AI pipeline with FFmpeg and GPU scheduling, Stripe subscriptions and a multi-vendor marketplace. 1,000+ users, 2,000+ jobs a day, 99.9% uptime, one engineer.',
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
					'The core system for a construction company: contracts, service orders, work plans and budgets across every project, with field teams logging constraints that feed straight back into schedule adjustments.',
				technologies: [Technology.Go, Technology.Svelte, Technology.Typescript, Technology.Postgres]
			}
		]
	},
	{
		title: 'Public sector & education',
		description:
			'Institutional work, where the constraint is rarely the technology and almost always the process the software has to survive.',
		items: [
			{
				title: 'National GBV prevention and response platform',
				context: "ASCUN & Colombia's Ministry of Education",
				period: '2025 - 2026',
				description:
					'A national platform serving 64+ universities, rebuilt end-to-end: a layered Node.js backend meeting an elevated compliance bar for sensitive citizen data, three distinct product surfaces, and a conversational assistant with an interactive map of Colombia for protocol navigation.',
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
					'A tool that takes the components of a gender-based-violence case and returns the applicable response procedure immediately, designed for people using it during a crisis rather than at a desk.',
				technologies: [Technology.Typescript, Technology.React]
			},
			{
				title: 'Field trip management platform',
				context: 'Universidad Nacional de Colombia',
				period: '2024 - 2025',
				description:
					'Replaced a fully manual administrative and financial process with automated workflows, cutting the per-trip cycle from 1-2 weeks to under 20 minutes across 200+ requests per semester. Still the highest-impact system I have built for the Faculty.',
				technologies: [Technology.Go, Technology.Svelte, Technology.Postgres, Technology.Typescript]
			},
			{
				title: 'Real-time air quality monitoring',
				context: 'Research lab, Universidad Nacional de Colombia',
				period: '2024',
				description:
					'Continuous ingestion from sensor networks with analytics dashboards and automated report export, accurate enough for the lab to publish from it.',
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
					'Course and module management with an automated code-judge engine for programming assessments, reviewed and formally approved by the Faculty as a viable institutional tool.',
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
					'Centralized courses, materials, assessments, attendance and eligibility for student representatives across every campus of the university.',
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
					'Internal system coordinating subject content updates across multiple stakeholders, replacing a document-and-email workflow that nobody could audit.',
				technologies: [Technology.Svelte, Technology.NodeJs, Technology.Firebase]
			},
			{
				title: 'MinasBot, WhatsApp assistant',
				context: 'Facultad de Minas',
				period: '2023 - 2024',
				description:
					'WhatsApp chatbot automating answers to frequent student questions and routing administrative requests, covered by the Faculty as one of its student-facing AI initiatives.',
				technologies: [Technology.NodeJs, Technology.Javascript],
				url: 'https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles'
			},
			{
				title: 'Automations for the Vice-Dean office',
				context: 'Facultad de Minas',
				period: '2023 - 2024',
				description:
					'Apps Script and Python automations that removed high-volume manual work from an office that was doing it by hand every week.',
				technologies: [Technology.AppsScript, Technology.Python, Technology.Javascript]
			}
		]
	},
	{
		title: 'Commerce & business systems',
		description:
			'Client work through Kora Studio: businesses running on spreadsheets, email and WhatsApp that needed software built around how they actually operate.',
		items: [
			{
				title: 'ScholarKit, school kit e-commerce',
				context: 'Education retail, via Kora Studio',
				period: '2025',
				description:
					'An online store where families buy the kit and uniform for their exact grade and group, with order management organized the way the school actually distributes them.',
				technologies: [Technology.Svelte, Technology.Typescript, Technology.Postgres, Technology.Go]
			},
			{
				title: 'Custom e-commerce platform',
				context: 'Retail client, via Kora Studio',
				period: '2025',
				description:
					'Built on our own foundation rather than a template, shaped around the client operation so growth does not mean redesigning the system a year later.',
				technologies: [Technology.Svelte, Technology.Go, Technology.Postgres, Technology.Docker]
			},
			{
				title: 'Venue reservation marketplace',
				context: 'Nightlife & events startup, via Kora Studio',
				period: '2024 - 2025',
				description:
					'Reservation marketplace for venues and events with online payments, where I helped define the product scope alongside the technical architecture.',
				technologies: [Technology.Svelte, Technology.Go, Technology.Postgres, Technology.Typescript]
			},
			{
				title: 'Due-diligence agent',
				context: 'Client engagement, via Kora Studio',
				period: '2026',
				description:
					'An LLM agent for business due diligence combining token-cost optimization with human-in-the-loop verification, taking the cost of a single run from millions of Colombian pesos to a few hundred without giving up reliability.',
				technologies: [Technology.Go, Technology.Typescript, Technology.Postgres]
			},
			{
				title: 'Multi-tenant microsite system',
				context: 'Client engagement, via Kora Studio',
				period: '2024',
				description:
					'One system serving many independently branded sites, so publishing a new one is a configuration change instead of a new deployment.',
				technologies: [Technology.Svelte, Technology.Typescript, Technology.NodeJs]
			},
			{
				title: 'Process automation tooling',
				context: 'Client engagements, via Kora Studio',
				period: '2024 - 2026',
				description:
					'Internal tools that took recurring manual operations out of spreadsheets and inboxes: scheduled jobs, integrations between systems that did not talk to each other, alerts and reminders.',
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
			'A production-ready Svelte 5 starter with a layered architecture, the same structure I use to start real projects instead of rediscovering it every time.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind]
	},
	{
		github: 'https://github.com/imlargo/ratelimit',
		url: 'https://github.com/imlargo/ratelimit',
		title: 'ratelimit',
		description:
			'Rate limiting for Go services, with the strategies and storage backends I kept reimplementing across backends, behind one small interface.',
		technologies: [Technology.Go, Technology.Redis]
	},
	{
		github: 'https://github.com/imlargo/cpm',
		url: 'https://www.npmjs.com/package/@korastd/critical-path-method',
		title: 'Critical Path Method',
		description:
			'A Critical Path Method engine in TypeScript: pure functions, zero runtime dependencies. Written for construction scheduling, useful anywhere a plan has dependencies and a deadline.',
		technologies: [Technology.Typescript]
	},
	{
		url: 'https://odpiobservatorio.vercel.app',
		github: 'https://github.com/odpiobservatorio/odpiobservatorio.github.io',
		title: 'ODPI Observatorio',
		description:
			'Contributed to a human rights data platform that surfaces the state of violence against indigenous peoples in Colombia. Its outputs are cited in official UN Special Rapporteur reports.',
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
			'AI-powered tool that analyzes, scores and rewrites the copy of a landing page. Built for a Vercel and midudev hackathon, where it was named one of the featured projects.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind, Technology.Scss]
	},
	{
		github: 'https://github.com/imlargo/janus',
		url: 'https://github.com/imlargo/janus',
		title: 'janus',
		description:
			'Plug-and-play authentication for Go, covering the flows that are tedious to get right and dangerous to get wrong: sessions, refresh tokens, and the boundaries between them.',
		technologies: [Technology.Go, Technology.Postgres, Technology.Redis]
	}
];

export const content: Content = {
	name: 'imlargo',
	email: 'jclargob@gmail.com',

	hero: {
		badge: 'Open to remote',
		title: "Hi, i'm largo",
		description:
			'Senior Software Engineer and founder of Kora Studio. I build systems that go to production and stay there, from architecture to deployment: Go on the backend, TypeScript and Svelte on the frontend. 20+ shipped, all still running.'
	},

	experience: {
		title: 'My experience',
		description:
			'Leading frontend architecture at a solar energy company, running my own product and technology studio, and taking a distributed Go SaaS from zero to production. Full technical ownership across several industries and team sizes.',

		items: experience
	},

	work: {
		title: 'Selected projects',
		description:
			'Open-source libraries and products I build in my own time. Most of them exist because I needed the same thing three times first, and the ones that made it here are the ones I kept using afterwards.',

		projects: projects,
		work: []
	},

	workPage: {
		title: 'Work',
		description:
			'20+ production systems built from scratch since 2023, for companies, universities and government-linked institutions. Most of them are private, so this is what I can say about each without opening the repository.',
		stats: [
			{ value: '20+', label: 'Systems shipped to production' },
			{ value: '4', label: 'Industries' },
			{ value: '100%', label: 'Still running' }
		],
		groups: workGroups,
		side: {
			title: 'Open source & side projects',
			description:
				'Libraries, templates and experiments. Some are patterns pulled out of the systems above, cleaned up and put back into the ones that needed them.',
			projects: sideProjects
		}
	},

	skills: {
		title: 'Skills & Technologies',
		description:
			'Full-stack with architectural depth on both sides. Go and Gin on the backend, Svelte and TypeScript on the frontend, plus multi-model LLM integration, agents and tool calling taken all the way to production monitoring for quality, latency and cost.',
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
		description:
			'Notes on things I have built, the decisions behind them and the parts I got wrong.'
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
