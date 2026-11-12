import { snippet } from './snippets';

/** Parte 01: las piezas de una app, qué pasa al abrir una página y cómo se habla con el servidor. */

export const webPart = {
	map: {
		title: 'Las piezas de una aplicación web',
		description:
			'Hoy nos quedamos casi todo el tiempo en el frontend. El backend lo vemos como idea: qué hace y cómo le hablas.',
		focusLabel: 'Hoy',
		doesLabel: 'Qué hace',
		techLabel: 'Con qué se hace',
		nodes: [
			{
				id: 'frontend',
				label: 'Frontend',
				place: 'Corre en el navegador',
				role: 'Lo que el usuario ve y usa: pantallas, formularios, botones.',
				does: ['Muestra la información', 'Reacciona a clics y teclas', 'Le pide datos al backend'],
				tech: ['HTML', 'CSS', 'JavaScript', 'Svelte', 'React', 'Tailwind'],
				focus: true
			},
			{
				id: 'backend',
				label: 'Backend',
				place: 'Corre en un servidor',
				role: 'Recibe lo que pide el frontend, revisa permisos y aplica las reglas del negocio.',
				does: [
					'Decide quién puede hacer qué',
					'Valida los datos antes de guardarlos',
					'Habla con la base de datos'
				],
				tech: ['Node.js', 'Go', 'Python'],
				focus: false
			},
			{
				id: 'database',
				label: 'Base de datos',
				place: 'Detrás del backend',
				role: 'Guarda la información para que siga ahí mañana.',
				does: [
					'Guarda usuarios, pedidos, mensajes',
					'Responde consultas',
					'Solo la consulta el backend, nunca el navegador'
				],
				tech: ['PostgreSQL', 'MySQL', 'MongoDB'],
				focus: false
			}
		],
		/** Lo que viaja entre cada par de piezas, en orden. */
		links: ['HTTP', 'SQL'],
		shortcut: {
			title: 'Supabase',
			text: 'Te da el backend, la base de datos y el inicio de sesión ya hechos. Con él puedes tener una aplicación completa escribiendo solo el frontend.'
		}
	},

	journey: {
		title: 'Qué pasa cuando abres una página',
		description:
			'Desde que presionas Enter hasta que puedes hacer clic pasan seis pasos. Casi siempre ocurren en menos de un segundo.',
		previousLabel: 'Paso anterior',
		nextLabel: 'Paso siguiente',
		stepsLabel: 'Pasos',
		urlLabel: 'La dirección',
		url: [
			{ text: 'https://', name: 'Protocolo' },
			{ text: 'imlargo.dev', name: 'Dominio' },
			{ text: '/blog', name: 'Ruta' }
		],
		steps: [
			{
				id: 'url',
				title: 'Escribes la dirección',
				actor: 'Navegador',
				happens:
					'El navegador separa la dirección en partes: el protocolo, el dominio y la ruta que quieres ver.',
				focus: [0, 1, 2],
				detail: 'protocolo  https\ndominio    imlargo.dev\nruta       /blog'
			},
			{
				id: 'dns',
				title: 'Encuentra el servidor',
				actor: 'DNS',
				happens:
					'El dominio es un nombre para personas. El DNS lo traduce a la dirección IP del servidor, como una agenda de contactos.',
				focus: [1],
				detail: '$ dig +short imlargo.dev\n203.0.113.10'
			},
			{
				id: 'connect',
				title: 'Abre una conexión segura',
				actor: 'Red',
				happens:
					'El navegador y el servidor se conectan y acuerdan cómo cifrar todo lo que se envíen. Por eso la dirección empieza con https.',
				focus: [0],
				detail:
					'Conectando a 203.0.113.10:443…\nCertificado válido para imlargo.dev\nConexión cifrada'
			},
			{
				id: 'request',
				title: 'Pide la página',
				actor: 'Navegador',
				happens: 'Envía una petición HTTP: qué quiere (la ruta) y qué tipo de respuesta acepta.',
				focus: [2],
				detail: 'GET /blog HTTP/1.1\nHost: imlargo.dev\nAccept: text/html'
			},
			{
				id: 'response',
				title: 'El servidor responde',
				actor: 'Servidor',
				happens:
					'Devuelve un código que dice cómo salió todo, unas cabeceras y el contenido: en este caso, un documento HTML.',
				focus: [],
				detail: 'HTTP/1.1 200 OK\nContent-Type: text/html\n\n<!doctype html>\n<html lang="es">…'
			},
			{
				id: 'render',
				title: 'Dibuja la página',
				actor: 'Navegador',
				happens:
					'Lee el HTML, descarga el CSS y el JavaScript que encuentra, pinta la página y la deja lista para usar.',
				focus: [],
				detail: 'HTML       → estructura\nCSS        → estilos\nJavaScript → interacción'
			}
		]
	},

	http: {
		title: 'Cómo se hablan el frontend y el backend',
		description:
			'Con HTTP. El frontend envía una petición con un método y una ruta, y el backend devuelve una respuesta con un código y datos.',
		methodsLabel: 'Método',
		writeLabel: 'Lo que escribes',
		wireLabel: 'Lo que viaja por la red',
		methods: [
			{
				method: 'GET',
				purpose: 'Pedir datos',
				write: snippet('fetchGet'),
				wire: snippet('wireGet')
			},
			{
				method: 'POST',
				purpose: 'Crear algo nuevo',
				write: snippet('fetchPost'),
				wire: snippet('wirePost')
			},
			{
				method: 'PATCH',
				purpose: 'Cambiar algo que ya existe',
				write: snippet('fetchPatch'),
				wire: snippet('wirePatch')
			},
			{
				method: 'DELETE',
				purpose: 'Borrar algo',
				write: snippet('fetchDelete'),
				wire: snippet('wireDelete')
			}
		],
		codesLabel: 'Códigos de respuesta',
		codes: [
			{ range: '2xx', label: 'Salió bien' },
			{ range: '3xx', label: 'Está en otra dirección' },
			{ range: '4xx', label: 'La petición tiene un error' },
			{ range: '5xx', label: 'El servidor falló' }
		]
	}
} as const;

export type MapNode = (typeof webPart.map.nodes)[number];
