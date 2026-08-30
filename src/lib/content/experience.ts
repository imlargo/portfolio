import { Technology } from './technology';
import type { Experience } from './types';

export const experience: Experience[] = [
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
			"Own frontend architecture for the platform running the company's solar mini-farm business, leading a team of 4. Shipped a Vue + TypeScript component library used across every application, refactored 6 core modules for 25% smaller bundles, and am migrating the platform to Svelte one module at a time."
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
