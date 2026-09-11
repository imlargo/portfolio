import { Technology } from './technology';
import type { Experience } from './types';

/**
 * Ordenado por fecha de inicio descendente, igual que el CV. Kora aparece
 * cerrada (Jan 2026) porque fue una práctica independiente en paralelo a los
 * roles de tiempo completo, no un empleo actual.
 */
export const experience: Experience[] = [
	{
		role: 'Frontend Tech Lead',
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
			'Technical lead for frontend in an 11-engineer product organization at a solar energy company, on an enterprise platform of 20+ modules serving 200+ internal users and 100+ investors. Originated Gandalf, a headless design system shipped as an internal npm package and now standard across 4 applications, refactored 6 core modules for 20% smaller bundles and load times, and lead a module-by-module Vue-to-Svelte migration that has held zero regressions.'
	},
	{
		role: 'Senior Software Engineer',
		date: 'Dec 2025 - Feb 2026',
		stack: [
			Technology.Typescript,
			Technology.React,
			Technology.NodeJs,
			Technology.Postgres,
			Technology.Leaflet
		],
		company: 'ASCUN',
		description:
			"Sole engineer rebuilding a national gender-based-violence prevention platform for Colombia's association of universities and its Ministry of Education, serving 64+ universities under strict compliance requirements for citizen data. Rewrote 3 product surfaces in React and TypeScript, redesigned a legacy Node.js backend into a layered architecture with ~70 documented API routes, and took a data-heavy Leaflet map of Colombia out of a severe rendering bottleneck."
	},
	{
		role: 'Founding Engineer',
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
			'Sole technical owner of a US-founded content-generation SaaS, from idea to 1,500 active users, and technical lead for 3 full-stack engineers as the team grew. Built the AI pipeline that differentiated it (multi-model LLM selection, FFmpeg, GPU scheduling) running 2,000+ jobs/day at ~2.4 min median, plus Stripe billing, a multi-vendor marketplace and the observability behind 99.9% uptime.'
	},
	{
		role: 'Independent Software Consultant',
		date: 'Jan 2024 - Jan 2026',
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
			'Independent practice run part-time alongside full-time roles, delivering production systems across education, public sector, construction and retail. 15+ systems as sole architect and engineer, from the core information system of a construction firm operating in Cartagena, Bogotá and Miami to LLM-powered agents, leading delivery with a recurring team of 4 freelance engineers. Every client by referral.'
	},
	{
		role: 'Software Engineer',
		date: 'Nov 2023 - Dec 2025',
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
			'Only technical person on staff at the Faculty of Engineering, building mission-critical internal systems in daily production use. A field-trip platform that cut approval cycles from 1-2 weeks to under 30 minutes across 200+ trips a semester, a real-time air-quality platform ingesting a sensor network across Medellín accurate enough to publish research from, and a learning platform with an integrated code judge. 4+ systems handed off, still running independently.'
	}
];
