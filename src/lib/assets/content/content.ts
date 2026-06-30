import { Technology } from '$lib/assets/content/technology';
import type { Content, Experience, Project } from './types';

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
		github: 'https://github.com/imlargo/medusa',
		url: 'https://github.com/imlargo/medusa',
		title: 'Medusa Framework',
		description:
			'Open-source Go framework built around clean architecture principles, extracted from production patterns across multiple client systems and deployed back into those same environments, validating the abstractions under real constraints, not in isolation.',
		technologies: [Technology.Go]
	},
	{
		url: 'https://copywhisper.imlargo.dev',
		github: 'https://github.com/imlargo/CopyWhisper',
		title: 'CopyWhisper',
		description:
			'AI-powered web application to analyze, score, and optimize the copywriting of your website, providing in-depth analysis with recommendations tailored to your specific needs.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind, Technology.Scss]
	},
	{
		github: 'https://github.com/imlargo/gleam-webpush',
		url: 'https://hexdocs.pm/webpush/index.html',
		title: 'Gleam WebPush',
		description:
			'Published webpush notification library for the Gleam ecosystem. Manages subscriptions and sends web push notifications using the Web Push standard.',
		technologies: [Technology.Gleam]
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
		url: 'https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles',
		title: 'MinasBot',
		description:
			'WhatsApp chatbot built with Node.js to automate responses to frequently asked questions, distribute information, and manage administrative processes at the Faculty of Engineering.',
		technologies: [Technology.NodeJs, Technology.Javascript]
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
			Technology.Javascript,
			Technology.Tailwind
		],
		company: 'Unergy',
		description:
			'Leading frontend engineering at a solar energy company, owning architecture and delivery for the platform that manages the complete solar mini-farm project lifecycle. Architected a Vue + TypeScript component library standardized across all company applications, led a structural refactor across 6 core modules, and am directing a progressive migration from Vue to Svelte.'
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
			Technology.Aws
		],
		company: 'Butter',
		description:
			'Sole technical owner across architecture, implementation, infrastructure, and production operations for an international content-generation SaaS, taken from zero to 1,000+ active users. Engineered the core content-generation pipeline (FFmpeg, GPU scheduling, multi-model AI), a Stripe-based subscription and marketplace system, and full-stack observability sustaining 99.9% uptime.'
	},
	{
		role: 'Founder & Lead Engineer',
		date: 'Jan 2024 - Present',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Javascript,
			Technology.Svelte,
			Technology.Vue,
			Technology.Postgres,
			Technology.MongoDB,
			Technology.Docker
		],
		company: 'Kora Systems',
		description:
			'Founded and operate an engineering consultancy delivering production systems across 4 industries. Delivered 5 production systems (venue-reservation marketplace, e-commerce, multi-tenant microsites, process-automation tooling), each shipped to full production with zero ongoing supervision required. Sole architect and technical lead on every engagement, directing teams of 4+ engineers.'
	},
	{
		role: 'Senior Software Engineer',
		date: 'Jan 2026 - Feb 2026',
		stack: [Technology.Typescript, Technology.Javascript, Technology.Svelte, Technology.NodeJs],
		company: 'ASCUN',
		description:
			"Engaged as sole engineer by the Colombian Association of Universities (operating jointly with Colombia's Ministry of Education) to redesign a national gender-based-violence prevention platform end-to-end. Rewrote 3 product surfaces, built a conversational chatbot with an interactive map for GBV protocol navigation across 64+ universities, and shipped with complete technical documentation."
	},
	{
		role: 'Lead Software Engineer',
		date: 'Nov 2023 - Dec 2025',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Javascript,
			Technology.Svelte,
			Technology.NodeJs,
			Technology.Firebase,
			Technology.Postgres
		],
		company: 'Universidad Nacional de Colombia',
		description:
			'Technical lead and full-stack engineer for mission-critical administrative systems at the Faculty of Engineering. Delivered a field-trip management platform that cut approval cycles from 1–2 weeks to 20–30 minutes, a real-time air-quality monitoring platform for a publishable-data research lab, and an internal LMS, 4+ critical systems maintained in active production post-handoff.'
	}
];

export const content: Content = {
	name: 'imlargo',
	email: 'jclargob@gmail.com',

	hero: {
		badge: 'Open to remote',
		title: "Hi, i'm largo",
		description:
			'Senior Software Engineer with 3+ years of production ownership across Go distributed systems, TypeScript/Vue/Svelte frontends, and AWS cloud infrastructure. I build things end-to-end, from architecture to deployment, and lead the engineers around me.'
	},

	experience: {
		title: 'My experience',
		description:
			'From leading distributed systems at scale to frontend architecture at a solar energy company, full technical ownership across multiple industries and team sizes.',

		items: experience
	},

	work: {
		title: 'Selected projects',
		description:
			'Side projects, open-source tools, and experiments, built to solve real problems, learn in public, and contribute back to the community.',

		projects: projects,
		work: []
	},

	skills: {
		title: 'Skills & Technologies',
		description:
			'Full-stack with architectural depth on both sides. Primary stack is Go on the backend and Svelte/TypeScript on the frontend, with strong experience across cloud infrastructure, observability, and distributed systems design.',
		skills: {
			Frontend: [
				Technology.Svelte,
				Technology.Vue,
				Technology.Typescript,
				Technology.Tailwind,
				Technology.React,
				Technology.Html,
				Technology.Css
			],
			Backend: [
				Technology.Go,
				Technology.NodeJs,
				Technology.Python,
				Technology.Postgres,
				Technology.Redis,
				Technology.MongoDB
			],
			'DevOps & Cloud': [
				Technology.Docker,
				Technology.Aws,
				Technology.CiCd,
				Technology.Githubactions,
				Technology.Git,
				Technology.Github
			]
		}
	},

	socials: {
		github: 'https://github.com/imlargo',
		linkedin: 'https://www.linkedin.com/in/imlargo/',
		instagram: 'https://instagram.com/imlargo'
	},

	footer: {
		title: 'imlargo',
		subtitle: 'Senior Software Engineer',
		credits: 'Designed & Built by Imlargo'
	}
};
