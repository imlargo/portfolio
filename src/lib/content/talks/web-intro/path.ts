import { snippet } from './snippets';

/** Parte 05: cómo ordenar el código, qué aprender después, un proyecto y recursos. */

export const pathPart = {
	architecture: {
		title: 'Cómo ordenar el proyecto',
		description:
			'No hay una única forma correcta. Lo importante es que cada archivo tenga un lugar obvio, para que cualquiera lo encuentre rápido.',
		filesLabel: 'Adentro',
		ruleLabel: 'La regla',
		root: 'src/',
		folders: [
			{
				id: 'pages',
				path: 'pages/',
				what: 'Las páginas de la aplicación, una por dirección.',
				rule: 'Una página junta piezas y casi no tiene lógica propia.',
				files: ['inicio', 'tareas', 'perfil']
			},
			{
				id: 'ui',
				path: 'components/ui/',
				what: 'Componentes genéricos: botón, campo de texto, diálogo. Aquí caen los de shadcn/ui.',
				rule: 'No saben nada de tu aplicación. Sirven en cualquier proyecto.',
				files: ['button', 'input', 'dialog']
			},
			{
				id: 'features',
				path: 'features/',
				what: 'Una carpeta por funcionalidad, con sus componentes y su estado juntos.',
				rule: 'Si borras una funcionalidad, borras una carpeta.',
				files: ['tareas/TaskList', 'tareas/TaskItem', 'tareas/tasks-state']
			},
			{
				id: 'services',
				path: 'services/',
				what: 'Lo único que habla con el backend. Aquí vive la conexión con Supabase.',
				rule: 'Los componentes piden datos a un servicio, nunca directo a la API.',
				files: ['supabase', 'tasks'],
				snippet: snippet('serviceTasks')
			},
			{
				id: 'utils',
				path: 'utils/',
				what: 'Funciones pequeñas que se usan en muchas partes: formatear fechas, unir clases.',
				rule: 'Funciones puras: misma entrada, misma salida.',
				files: ['format-date', 'cn']
			}
		]
	},

	roadmap: {
		title: 'Qué aprender, y en qué orden',
		description:
			'Marca lo que ya sabes. El progreso se guarda en tu navegador, así que puedes volver a esta página cuando quieras.',
		progressLabel: (done: number, total: number) => `${done} de ${total}`,
		resetLabel: 'Empezar de cero',
		stages: [
			{
				id: 'fundamentals',
				label: 'Fundamentos',
				items: [
					'HTML semántico',
					'CSS: flexbox y grid',
					'JavaScript y el DOM',
					'Las DevTools del navegador'
				]
			},
			{
				id: 'tools',
				label: 'Herramientas',
				items: ['Git y GitHub', 'La terminal', 'npm o pnpm', 'TypeScript']
			},
			{
				id: 'framework',
				label: 'Un framework',
				items: ['Componentes', 'Estado y reactividad', 'Rutas', 'Formularios']
			},
			{
				id: 'styles',
				label: 'Estilos',
				items: ['Tailwind CSS', 'Diseño responsive', 'shadcn/ui', 'Accesibilidad básica']
			},
			{
				id: 'data',
				label: 'Datos',
				items: [
					'fetch y APIs',
					'Estados de carga y error',
					'Supabase: base de datos',
					'Supabase: inicio de sesión'
				]
			},
			{
				id: 'publish',
				label: 'Publicar',
				items: [
					'Desplegar en Vercel o Netlify',
					'Un dominio propio',
					'Variables de entorno',
					'Revisar el rendimiento'
				]
			}
		]
	},

	project: {
		levelsLabel: 'Niveles',
		title: 'Un proyecto para practicar',
		description:
			'Una lista de tareas. Es pequeña a propósito, y cada nivel usa algo de lo que vimos hoy.',
		levels: [
			{
				id: 'browser',
				label: 'Nivel 1',
				name: 'Solo HTML, CSS y JavaScript',
				requirements: [
					{ text: 'Agregar, completar y borrar tareas.', topic: 'DOM' },
					{
						text: 'Guardar las tareas en localStorage para que no se pierdan al recargar.',
						topic: 'Navegador'
					},
					{ text: 'Que funcione bien en un teléfono.', topic: 'CSS' }
				]
			},
			{
				id: 'framework',
				label: 'Nivel 2',
				name: 'Con un framework',
				requirements: [
					{ text: 'Rehacerla en Svelte o React, dividida en componentes.', topic: 'Componentes' },
					{
						text: 'Los estilos con Tailwind y los botones y campos de shadcn/ui.',
						topic: 'Estilos'
					},
					{ text: 'Las carpetas ordenadas como vimos.', topic: 'Arquitectura' }
				]
			},
			{
				id: 'data',
				label: 'Nivel 3',
				name: 'Con datos reales',
				requirements: [
					{ text: 'Guardar las tareas en Supabase en lugar de localStorage.', topic: 'HTTP' },
					{ text: 'Inicio de sesión, y que cada persona vea solo sus tareas.', topic: 'Supabase' },
					{ text: 'Publicarla en internet con su propia dirección.', topic: 'Publicar' }
				]
			}
		]
	},

	resources: {
		title: 'Para seguir aprendiendo',
		description: 'Todos son gratis. Si solo vas a abrir uno, que sea MDN.',
		allLabel: 'Todos',
		items: [
			{
				title: 'MDN Web Docs',
				what: 'La referencia de HTML, CSS y JavaScript. En español.',
				href: 'https://developer.mozilla.org/es/',
				topic: 'Fundamentos'
			},
			{
				title: 'web.dev Learn',
				what: 'Cursos de HTML, CSS y accesibilidad.',
				href: 'https://web.dev/learn',
				topic: 'Fundamentos'
			},
			{
				title: 'Cómo funcionan los navegadores',
				what: 'Todo el recorrido, de la dirección a los píxeles.',
				href: 'https://web.dev/articles/howbrowserswork',
				topic: 'Navegador'
			},
			{
				title: 'Tutorial de Svelte',
				what: 'Interactivo, en el navegador.',
				href: 'https://svelte.dev/tutorial',
				topic: 'Frameworks'
			},
			{
				title: 'React',
				what: 'La documentación oficial, con ejercicios.',
				href: 'https://react.dev/learn',
				topic: 'Frameworks'
			},
			{
				title: 'Tailwind CSS',
				what: 'La documentación, con buscador de clases.',
				href: 'https://tailwindcss.com/docs',
				topic: 'Estilos'
			},
			{
				title: 'shadcn/ui',
				what: 'Los componentes y cómo instalarlos en React.',
				href: 'https://ui.shadcn.com',
				topic: 'Estilos'
			},
			{
				title: 'shadcn-svelte',
				what: 'Los mismos componentes, para Svelte.',
				href: 'https://shadcn-svelte.com',
				topic: 'Estilos'
			},
			{
				title: 'Supabase',
				what: 'Guías para conectar tu frontend a una base de datos.',
				href: 'https://supabase.com/docs',
				topic: 'Datos'
			},
			{
				title: 'roadmap.sh',
				what: 'Un mapa de qué aprender para frontend.',
				href: 'https://roadmap.sh/frontend',
				topic: 'Ruta'
			},
			{
				title: 'The Odin Project',
				what: 'Un currículo completo, con proyectos.',
				href: 'https://www.theodinproject.com',
				topic: 'Ruta'
			}
		]
	}
} as const;
