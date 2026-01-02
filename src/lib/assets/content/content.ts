import { Technology } from '$lib/assets/content/technology';
import type { Content, Experience, Project } from './types';

const projects: Project[] = [
	{
		url: 'https://pegaso.imlargo.dev',
		github: 'https://github.com/imlargo/pegaso',
		title: 'Pegaso',
		description:
			'Una aplicación diseñada para la creación de horarios y enfocada en brindar información esencial con el objetivo de mejorar la experiencia de los estudiantes de la sede Medellín.',
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
			'Aplicación web impulsada por IA para analizar, calificar y optimizar el copywriting tu página web, proporcionando análisis profundos y detallados con recomendaciones adaptadas a tus necesidades específicas.',
		technologies: [Technology.Svelte, Technology.Typescript, Technology.Tailwind, Technology.Scss]
	},
	{
		url: 'https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles',
		title: 'MinasBot',
		description:
			'ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a preguntas frecuentes, distribuir información y gestionar procesos administrativos.',
		technologies: [Technology.NodeJs, Technology.Javascript]
	},
	{
		url: 'https://odpiobservatorio.vercel.app',
		github: 'https://github.com/odpiobservatorio/odpiobservatorio.github.io',
		title: 'ODPI Observatorio.',
		description:
			'Contribuí al desarrollo del backend para un sistema de información web que visibiliza el estado de los hechos de violencia contra los pueblos indígenas de Colombia.',
		technologies: [
			Technology.Javascript,
			Technology.Html,
			Technology.Css,
			Technology.Firebase,
			Technology.Leaflet
		]
	},
	{
		github: 'https://github.com/imlargo/proyecto-vectorial',
		title: 'Plataforma de enseñanza',
		description:
			'En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar a conceptos de geometría vectorial a través de animaciones.',
		technologies: [Technology.Astro, Technology.Tailwind, Technology.Python, Technology.Markdown]
	}
];

const experience: Experience[] = [
	{
		role: 'CTO & Lead Developer',
		date: 'Diciembre de 2024 - Actualidad',
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
			'Responsable técnico total de una plataforma SaaS internacional. Diseño, desarrollo y operación de la arquitectura completa del sistema.'
	},
	{
		role: 'Freelance Software Engineer',
		date: 'Julio de 2024 - Actualidad',
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
		description: 'Diseño y desarrollo de aplicaciones web full stack a medida.'
	},
	{
		role: 'Ingeniero de Software / Estudiante Auxiliar',
		date: 'Noviembre de 2023 - Diciembre de 2025',
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
			'Líder y responsable del desarrollo full stack de múltiples aplicativos internos en producción.'
	},
	{
		role: 'Frontend Developer',
		date: 'Noviembre de 2024 - Mayo de 2025',
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
			'Desarrollador frontend en Vue y TypeScript para plataforma interna de gestión del ciclo de vida completo de minigranjas solares.'
	}
];

export const content: Content = {
	name: 'imlargo',

	hero: {
		badge: 'Available for freelance',
		title: "Hi, i'm largo",
		description:
			'Ingeniero de Software Full Stack (Mid-Level) con experiencia solida desarollando y liderando el ciclo completo de desarrollo de productos de software escalables.'
	},

	experience: {
		title: 'Mi experiencia',
		description:
			'Especialista en Golang, Svelte y TypeScript, he diseñado, puesto en producción y operado arquitecturas de alto rendimiento en multiples sectores.',

		items: experience
	},

	work: {
		title: 'Proyectos seleccionados',
		description:
			'Me destaco por mi visión integral del producto desde arquitectura e infraestructura hasta UX y mi habilidad para traducir problemas técnicos complejos en soluciones claras y de alto impacto',

		projects: projects,
		work: []
	},

	skills: {
		title: 'Habilidades y Tecnologias',
		description:
			'Amplia experiencia en desarrollo full stack con énfasis en backend con Go y frontend con Svelte/TypeScript. Habilidades sólidas en diseño de arquitecturas escalables, optimización de performance, integración de APIs y gestión de infraestructura en la nube.',
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
		subtitle: 'Ingeniero de Software Full Stack',
		credits: 'Designed & Built by Imlargo'
	}
};
