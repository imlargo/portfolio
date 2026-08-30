export enum Technology {
	Svelte,
	Typescript,
	Tailwind,
	Javascript,
	Bootstrap,
	Firebase,
	NodeJs,
	AppsScript,
	Python,
	Java,
	Go,
	Gleam,
	Astro,
	Html,
	Css,
	Scss,
	Git,
	Github,
	Githubactions,
	Figma,
	MongoDB,
	Leaflet,
	Markdown,
	React,
	Vue,
	Postgres,
	Redis,
	Docker,
	Aws,
	CiCd,
	Gin,
	RabbitMQ,
	Nginx,
	Grafana,
	Prometheus,
	Vitest,
	Playwright,
	Kubernetes,
	Terraform
}

export function getLabel(technology: Technology): string {
	switch (technology) {
		case Technology.Svelte:
			return 'Svelte';
		case Technology.Tailwind:
			return 'Tailwind';
		case Technology.Javascript:
			return 'JavaScript';
		case Technology.Html:
			return 'HTML';
		case Technology.Css:
			return 'CSS';
		case Technology.Scss:
			return 'SCSS';
		case Technology.Bootstrap:
			return 'Bootstrap';
		case Technology.Firebase:
			return 'Firebase';
		case Technology.NodeJs:
			return 'Node.js';
		case Technology.AppsScript:
			return 'Google Apps Script';
		case Technology.Python:
			return 'Python';
		case Technology.Typescript:
			return 'TypeScript';
		case Technology.MongoDB:
			return 'MongoDB';
		case Technology.Leaflet:
			return 'Leaflet';
		case Technology.Markdown:
			return 'Markdown';
		case Technology.Go:
			return 'Go';
		case Technology.Gleam:
			return 'Gleam';
		case Technology.Java:
			return 'Java';
		case Technology.Astro:
			return 'Astro';
		case Technology.Git:
			return 'Git';
		case Technology.Github:
			return 'GitHub';
		case Technology.Githubactions:
			return 'GitHub Actions';
		case Technology.Figma:
			return 'Figma';
		case Technology.React:
			return 'React';
		case Technology.Vue:
			return 'Vue.js';
		case Technology.Postgres:
			return 'PostgreSQL';
		case Technology.Redis:
			return 'Redis';
		case Technology.Docker:
			return 'Docker';
		case Technology.Aws:
			return 'AWS';
		case Technology.CiCd:
			return 'CI/CD';
		case Technology.Gin:
			return 'Gin';
		case Technology.RabbitMQ:
			return 'RabbitMQ';
		case Technology.Nginx:
			return 'Nginx';
		case Technology.Grafana:
			return 'Grafana';
		case Technology.Prometheus:
			return 'Prometheus';
		case Technology.Vitest:
			return 'Vitest';
		case Technology.Playwright:
			return 'Playwright';
		case Technology.Kubernetes:
			return 'Kubernetes';
		case Technology.Terraform:
			return 'Terraform';
		default:
			return 'Unknown';
	}
}

export function getColor(technology: Technology) {
	switch (technology) {
		case Technology.Typescript:
			return '#3178c6';
		case Technology.Javascript:
			return '#f0db4f';
		case Technology.Python:
			return '#366f9f';
		case Technology.Java:
			return '#f58219';
		case Technology.Go:
			return '#00b4e0';
		case Technology.Gleam:
			return '#ffaff3';
		case Technology.NodeJs:
			return '#81cd39';
		case Technology.Firebase:
			return '#ffcc30';
		case Technology.Svelte:
			return '#ff3e00';
		case Technology.Astro:
			return '#ff5904';
		case Technology.Html:
			return '#e14e1d';
		case Technology.Css:
			return '#0277bd';
		case Technology.Scss:
			return '#cd6799';
		case Technology.Tailwind:
			return '#29b8be';
		case Technology.Bootstrap:
			return '#7511f7';
		case Technology.Git:
			return '#f03c2e';
		case Technology.Github:
			return '#242938';
		case Technology.Githubactions:
			return '#2084f5';
		case Technology.Figma:
			return '#000000';
		case Technology.MongoDB:
			return '#10aa50';
		case Technology.Leaflet:
			return '#4caf50';
		case Technology.Markdown:
			return '#6f42c1';
		case Technology.React:
			return '#61dafb';
		case Technology.Vue:
			return '#42b883';
		case Technology.Postgres:
			return '#336791';
		case Technology.Redis:
			return '#dc382d';
		case Technology.Docker:
			return '#2496ed';
		case Technology.Aws:
			return '#ff9900';
		case Technology.Gin:
			return '#008ecf';
		case Technology.RabbitMQ:
			return '#ff6600';
		case Technology.Nginx:
			return '#009639';
		case Technology.Grafana:
			return '#f46800';
		case Technology.Prometheus:
			return '#e6522c';
		case Technology.Vitest:
			return '#fcc72b';
		case Technology.Playwright:
			return '#2ead33';
		case Technology.Kubernetes:
			return '#326ce5';
		case Technology.Terraform:
			return '#7b42bc';
		default:
			return '#4b4b4b';
	}
}
