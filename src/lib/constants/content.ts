import { Technology } from '$lib/types/technology';

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
}

export const projects: Project[] = [
	{
		url: "https://pegaso.imlargo.dev",
		github: "https://github.com/imlargo/pegaso",
		title: "Pegaso",
		description:
			"Una aplicación diseñada para la creación de horarios y enfocada en brindar información esencial con el objetivo de mejorar la experiencia de los estudiantes de la sede Medellín.",
		technologies: [
			Technology.Svelte,
			Technology.Go,
			Technology.Typescript,
			Technology.MongoDB,
			Technology.Tailwind
		]
	},
	{
		url: "https://copywhisper.imlargo.dev",
		github: "https://github.com/imlargo/CopyWhisper",
		title: "CopyWhisper",
		description:
			"Aplicación web impulsada por IA para analizar, calificar y optimizar el copywriting tu página web, proporcionando análisis profundos y detallados con recomendaciones adaptadas a tus necesidades específicas.",
		technologies: [
			Technology.Svelte,
			Technology.Typescript,
			Technology.Tailwind,
			Technology.Scss
		]
	},
	{
		url: "https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles",
		title: "MinasBot",
		description:
			"ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a preguntas frecuentes, distribuir información y gestionar procesos administrativos.",
		technologies: [
			Technology.NodeJs,
			Technology.Javascript
		]
	},
	{
		url: "https://odpiobservatorio.vercel.app",
		github: "https://github.com/odpiobservatorio/odpiobservatorio.github.io",
		title: "ODPI Observatorio.",
		description:
			"Contribuí al desarrollo del backend para un sistema de información web que visibiliza el estado de los hechos de violencia contra los pueblos indígenas de Colombia.",
		technologies: [
			Technology.Javascript,
			Technology.Html,
			Technology.Css,
			Technology.Firebase,
			Technology.Leaflet
		]
	},
	{
		github: "https://github.com/imlargo/proyecto-vectorial",
		title: "Plataforma de enseñanza",
		description:
			"En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar a conceptos de geometría vectorial a través de animaciones.",
		technologies: [
			Technology.Astro,
			Technology.Tailwind,
			Technology.Python,
			Technology.Markdown
		]
	}
];

export const experience: Experience[] = [
	{
		role: 'Estudiante Auxiliar, Desarrollador de software',
		date: 'Enero de 2024 - Actualidad',
		stack: [
			Technology.Typescript,
			Technology.Svelte,
			Technology.Tailwind,
			Technology.Javascript,
			Technology.Html,
			Technology.Css,
			Technology.Scss,
			Technology.Bootstrap,
			Technology.Firebase,
			Technology.NodeJs,
			Technology.AppsScript
		],
		company: 'Universidad Nacional de Colombia',
		description:
			'Colaboración con diversas áreas para adaptar soluciones a sus necesidades. Entre los logros destacan la estandarización de datos, reducción significativa del tiempo en procesos y mejora de la coordinación y experiencia de los usuarios.'
	},
	{
		role: 'Estudiante Auxiliar',
		date: 'Noviembre de 2023 - Diciembre 2023',
		stack: [
			Technology.Typescript,
			Technology.Javascript,
			Technology.NodeJs,
			Technology.Python,
			Technology.AppsScript
		],
		company: 'Universidad Nacional de Colombia',
		description:
			'Identificación y resolución de problemas mediante Apps Script y Python para automatizar tareas repetitivas, incrementando la eficiencia operativa y reduciendo el trabajo manual. La automatización de procesos administrativos internos resultó en una significativa reducción de la carga de trabajo manual y mejora de la productividad del equipo y optimizando los flujos de trabajo.'
	}
];
