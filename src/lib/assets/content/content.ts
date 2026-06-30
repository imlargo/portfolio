import { Technology } from '$lib/assets/content/technology';
import type { Content, Experience, Project } from './types';

const projects: Project[] = [
	{
		url: 'https://pegaso.imlargo.dev',
		github: 'https://github.com/imlargo/pegaso',
		title: 'Pegaso',
		description:
			'An application designed for schedule creation, focused on providing essential information to improve the experience of students at the Medellín campus.',
		technologies: [
			Technology.Svelte,
			Technology.Go,
			Technology.Typescript,
			Technology.MongoDB,
			Technology.Tailwind
		]
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
		github: 'https://github.com/imlargo/medusa',
		url: 'https://github.com/imlargo/medusa',
		title: 'Medusa Framework',
		description: 'A batteries-included Go framework for building modern, scalable backends',
		technologies: [Technology.Go]
	},
	{
		github: 'https://github.com/imlargo/gleam-webpush',
		url: 'https://hexdocs.pm/webpush/index.html',
		title: 'Gleam WebPush',
		description:
			'Gleam library for managing subscriptions and sending web push notifications using the Web Push standard.',
		technologies: [Technology.Gleam]
	},
	{
		url: 'https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles',
		title: 'MinasBot',
		description:
			'WhatsApp chatbot built with Node.js to automate responses to frequently asked questions, distribute information, and manage administrative processes.',
		technologies: [Technology.NodeJs, Technology.Javascript]
	},
	{
		url: 'https://odpiobservatorio.vercel.app',
		github: 'https://github.com/odpiobservatorio/odpiobservatorio.github.io',
		title: 'ODPI Observatorio.',
		description:
			'Contributed to backend development for a web information system that surfaces the state of violence against indigenous peoples in Colombia.',
		technologies: [
			Technology.Javascript,
			Technology.Html,
			Technology.Css,
			Technology.Firebase,
			Technology.Leaflet
		]
	}
];

const experience: Experience[] = [
	{
		role: 'CTO & Lead Developer',
		date: 'December 2024 - Present',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Svelte,
			Technology.NodeJs,
			Technology.Postgres,
			Technology.Redis,
			Technology.Docker,
			Technology.Aws
		],
		company: 'Butter',
		description:
			'Full technical ownership of an international SaaS platform. Design, development, and operation of the complete system architecture.'
	},
	{
		role: 'Freelance Software Engineer',
		date: 'July 2024 - Present',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Javascript,
			Technology.Svelte,
			Technology.React,
			Technology.Vue,
			Technology.NodeJs,
			Technology.Postgres,
			Technology.MongoDB,
			Technology.Docker
		],
		company: 'Freelance',
		description: 'Design and development of custom full-stack web applications.'
	},
	{
		role: 'Software Developer',
		date: 'November 2025 - January 2026',
		stack: [Technology.Typescript, Technology.Javascript, Technology.Svelte, Technology.NodeJs],
		company: 'Asociación Colombiana de Universidades (ASCUN)',
		description:
			'Software engineer contracted as an independent consultant for the management, migration, and evolution of an institutional platform, including the development of an interactive map to clearly visualize GBV routes and protocols of HEIs in Colombia.'
	},
	{
		role: 'Software Engineer / Student Assistant',
		date: 'November 2023 - December 2025',
		stack: [
			Technology.Go,
			Technology.Typescript,
			Technology.Javascript,
			Technology.Svelte,
			Technology.NodeJs,
			Technology.Firebase,
			Technology.AppsScript,
			Technology.Postgres
		],
		company: 'Universidad Nacional de Colombia',
		description:
			'Lead developer responsible for full-stack development of multiple internal production applications.'
	},
	{
		role: 'Frontend Developer',
		date: 'November 2024 - May 2025',
		stack: [
			Technology.Vue,
			Technology.Typescript,
			Technology.Javascript,
			Technology.Html,
			Technology.Css,
			Technology.Tailwind
		],
		company: 'Unergy',
		description:
			'Frontend developer in Vue and TypeScript for an internal platform managing the complete lifecycle of solar mini-farms.'
	}
];

export const content: Content = {
	name: 'imlargo',
	email: 'jclargob@gmail.com',

	hero: {
		badge: 'Available for freelance',
		title: "Hi, i'm largo",
		description:
			'Full Stack Software Engineer (Mid-Level) with solid experience developing and leading the complete development lifecycle of scalable software products.'
	},

	experience: {
		title: 'My experience',
		description:
			'Specialist in Golang, Svelte, and TypeScript, I have designed, deployed, and operated high-performance architectures across multiple industries.',

		items: experience
	},

	work: {
		title: 'Selected projects',
		description:
			'I stand out for my holistic product vision — from architecture and infrastructure to UX — and my ability to translate complex technical problems into clear, high-impact solutions',

		projects: projects,
		work: []
	},

	skills: {
		title: 'Skills & Technologies',
		description:
			'Extensive experience in full-stack development with emphasis on backend with Go and frontend with Svelte/TypeScript. Strong skills in scalable architecture design, performance optimization, API integration, and cloud infrastructure management.',
		skills: {
			Frontend: [
				Technology.Svelte,
				Technology.Typescript,
				Technology.Tailwind,
				Technology.Astro,
				Technology.React,
				Technology.Html,
				Technology.Css
			],
			Backend: [
				Technology.Go,
				Technology.NodeJs,
				Technology.Python,
				Technology.Postgres,
				Technology.Redis
			],
			'DevOps & Cloud': [
				Technology.Docker,
				Technology.CiCd,
				Technology.Aws,
				Technology.Git,
				Technology.Github,
				Technology.Githubactions
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
		subtitle: 'Full Stack Software Engineer',
		credits: 'Designed & Built by Imlargo'
	}
};
