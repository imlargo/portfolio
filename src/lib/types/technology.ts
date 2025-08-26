export enum Technology {
	Svelte,
	Tailwind,
	Javascript,
	Bootstrap,
	Firebase,
	NodeJs,
	AppsScript,
	Python,
	Typescript,
	Java,
	Golang,
	Go,
	Mongodb,
	Astro,
	Html,
	Css,
	Scss,
	Git,
	Github,
	Githubactions,
	Figma
}

export function getLabel(technology: Technology): string {
	switch (technology) {
		case Technology.Svelte:
			return 'Svelte';
		case Technology.Tailwind:
			return 'Tailwind CSS';
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
		case Technology.Golang:
			return '#00b4e0';
		case Technology.Go:
			return '#00b4e0';
		case Technology.Mongodb:
			return '#10aa50';
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
		default:
			return '#4b4b4b';
	}
}
