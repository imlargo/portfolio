import { snippet } from './snippets';

/** Parte 02: los tres lenguajes, el DOM y dónde se arma el HTML. */

/** Lo que pasa en cada tramo de la línea de tiempo de una forma de renderizar. */
export const TIMELINE_KIND = {
	server: 'server',
	network: 'network',
	blank: 'blank',
	visible: 'visible',
	interactive: 'interactive'
} as const;

export type TimelineKind = (typeof TIMELINE_KIND)[keyof typeof TIMELINE_KIND];

export const DOM_ACTION = {
	add: 'add',
	rename: 'rename',
	remove: 'remove'
} as const;

export type DomAction = (typeof DOM_ACTION)[keyof typeof DOM_ACTION];

export const browserPart = {
	layers: {
		title: 'HTML, CSS y JavaScript',
		description:
			'Cada uno tiene un trabajo distinto. Activa las capas y mira cómo cambia la misma tarjeta; la vista previa es una página real.',
		previewLabel: 'Vista previa',
		items: [
			{
				id: 'html',
				label: 'HTML',
				role: 'Estructura',
				what: 'Dice qué es cada cosa: un título, un párrafo, un botón.',
				snippet: snippet('layerHtml')
			},
			{
				id: 'css',
				label: 'CSS',
				role: 'Estilo',
				what: 'Dice cómo se ve: colores, tamaños y espacios.',
				snippet: snippet('layerCss')
			},
			{
				id: 'js',
				label: 'JavaScript',
				role: 'Comportamiento',
				what: 'Dice qué pasa cuando el usuario hace algo. Aquí cuenta los me gusta.',
				snippet: snippet('layerJs')
			}
		]
	},

	dom: {
		title: 'El DOM',
		description:
			'El navegador convierte el HTML en un árbol de objetos. JavaScript puede cambiar ese árbol, y la pantalla se actualiza sola.',
		actionsLabel: 'Prueba',
		treeLabel: 'El árbol',
		screenLabel: 'La pantalla',
		codeLabel: 'Lo que se ejecutó',
		resetLabel: 'Volver a empezar',
		initialTitle: 'Tareas',
		renamedTitle: 'Mis pendientes',
		initialItems: ['Comprar café', 'Leer sobre el DOM'],
		itemLabel: (n: number) => `Tarea ${n}`,
		idleCode: '// Elige una acción',
		actions: [
			{ id: DOM_ACTION.add, label: 'Agregar una tarea' },
			{ id: DOM_ACTION.rename, label: 'Cambiar el título' },
			{ id: DOM_ACTION.remove, label: 'Quitar la última' }
		],
		code: {
			[DOM_ACTION.add]: (text: string) =>
				`const li = document.createElement('li');\nli.textContent = '${text}';\nlist.append(li);`,
			[DOM_ACTION.rename]: (text: string) => `title.textContent = '${text}';`,
			[DOM_ACTION.remove]: () => 'list.lastElementChild.remove();'
		} satisfies Record<DomAction, (text: string) => string>
	},

	strategies: {
		title: 'Dónde se arma el HTML',
		description:
			'Hay tres formas de llevar una página al navegador. Cambia quién hace el trabajo y en qué momento el usuario ve algo.',
		optionsLabel: 'Tres formas',
		timelineLabel: 'Lo que ve el usuario desde que pide la página',
		legend: [
			{ kind: TIMELINE_KIND.server, label: 'El servidor trabaja' },
			{ kind: TIMELINE_KIND.network, label: 'Viaja por la red' },
			{ kind: TIMELINE_KIND.blank, label: 'Pantalla en blanco' },
			{ kind: TIMELINE_KIND.visible, label: 'Se ve' },
			{ kind: TIMELINE_KIND.interactive, label: 'Se ve y responde' }
		],
		bestForLabel: 'Sirve para',
		items: [
			{
				id: 'csr',
				label: 'CSR',
				name: 'En el navegador',
				how: 'El servidor envía una página casi vacía y un archivo de JavaScript. El navegador lo ejecuta, pide los datos y arma la página.',
				timeline: [
					{ kind: TIMELINE_KIND.network, units: 1 },
					{ kind: TIMELINE_KIND.blank, units: 4 },
					{ kind: TIMELINE_KIND.interactive, units: 3 }
				],
				bestFor: 'Paneles y herramientas detrás de un inicio de sesión.'
			},
			{
				id: 'ssr',
				label: 'SSR',
				name: 'En el servidor',
				how: 'El servidor arma la página completa en cada visita. El navegador la muestra de una vez y después el JavaScript la vuelve interactiva.',
				timeline: [
					{ kind: TIMELINE_KIND.server, units: 2 },
					{ kind: TIMELINE_KIND.network, units: 1 },
					{ kind: TIMELINE_KIND.visible, units: 2 },
					{ kind: TIMELINE_KIND.interactive, units: 3 }
				],
				bestFor: 'Páginas con datos que cambian seguido y que deben aparecer en Google.'
			},
			{
				id: 'ssg',
				label: 'SSG',
				name: 'Al compilar',
				how: 'La página se arma una sola vez, antes de publicar, y se sirve como un archivo. Nadie la vuelve a armar en cada visita.',
				timeline: [
					{ kind: TIMELINE_KIND.network, units: 1 },
					{ kind: TIMELINE_KIND.visible, units: 2 },
					{ kind: TIMELINE_KIND.interactive, units: 5 }
				],
				bestFor: 'Blogs, documentación y sitios que cambian poco. Esta presentación es SSG.'
			}
		],
		note: 'Frameworks como SvelteKit, Next.js o Nuxt permiten elegir una forma distinta para cada página.'
	}
} as const;
