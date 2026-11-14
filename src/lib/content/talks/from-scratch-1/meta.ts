import {
	PIXEL_ICON_BUILD,
	PIXEL_ICON_CHIP,
	PIXEL_ICON_CODE,
	PIXEL_ICON_FLAG,
	PIXEL_ICON_TERMINAL
} from '$lib/components/effects/pixel/pixelIcons';

/**
 * "Programar desde cero", clase 1: el comienzo de una mentoría para aprender a
 * hacer aplicaciones web completas partiendo de cero. Esta clase es de
 * conceptos: la computadora, la terminal, qué es programar y hacia dónde vamos.
 */

export const FROM_SCRATCH_SECTIONS = {
	computer: 'la-computadora',
	terminal: 'la-terminal',
	programming: 'programar',
	building: 'lo-que-vamos-a-construir',
	start: 'manos-a-la-obra'
} as const;

export type FromScratchSection = (typeof FROM_SCRATCH_SECTIONS)[keyof typeof FROM_SCRATCH_SECTIONS];

export const FROM_SCRATCH_PARTS = [
	{
		id: FROM_SCRATCH_SECTIONS.computer,
		index: '01',
		label: 'La computadora',
		icon: PIXEL_ICON_CHIP
	},
	{
		id: FROM_SCRATCH_SECTIONS.terminal,
		index: '02',
		label: 'La terminal',
		icon: PIXEL_ICON_TERMINAL
	},
	{ id: FROM_SCRATCH_SECTIONS.programming, index: '03', label: 'Programar', icon: PIXEL_ICON_CODE },
	{
		id: FROM_SCRATCH_SECTIONS.building,
		index: '04',
		label: 'Lo que vamos a construir',
		icon: PIXEL_ICON_BUILD
	},
	{ id: FROM_SCRATCH_SECTIONS.start, index: '05', label: 'Manos a la obra', icon: PIXEL_ICON_FLAG }
] as const;

/** Rótulo de cada parte para el encabezado de sus diapositivas: "01 · La computadora". */
export const partEyebrow = (id: FromScratchSection) => {
	const part = FROM_SCRATCH_PARTS.find((item) => item.id === id);
	return part ? `${part.index} · ${part.label}` : '';
};

export const fromScratchMeta = {
	seo: {
		title: 'Programar desde cero · Clase 1',
		description:
			'Primera clase de una mentoría para aprender a programar desde cero: cómo funciona una computadora, la terminal y qué es programar.'
	},
	label: 'Programar desde cero · Clase 1',
	/** Prefijo de lo que la presentación guarda en el navegador (notas, listas). */
	storageKey: 'imlargo:talk:from-scratch-1',

	cover: {
		badge: 'Mentoría · Clase 1',
		title: 'Programar desde cero',
		description:
			'Cómo funciona una computadora, qué es la terminal, qué es programar y hacia dónde vamos. Hoy no hay que saber nada: solo tener curiosidad.'
	},

	plan: {
		eyebrow: 'El camino',
		title: 'De cero a construir aplicaciones web',
		description:
			'Esto toma meses, y está bien. Vamos por fases; cada una termina en algo que funciona y que puedes mostrar.',
		phasesLabel: 'Fases',
		nowLabel: 'Hoy',
		learnLabel: 'Lo que aprendes',
		buildLabel: 'Lo que vas a poder hacer',
		goal: 'La meta: que puedas construir una aplicación web completa, de la idea a internet, con el cuidado de un equipo profesional.',
		phases: [
			{
				id: 'fundamentals',
				label: 'Fundamentos',
				learn: 'Cómo funciona una computadora, la terminal y qué es programar.',
				build: 'Tus primeros programas, en la terminal y en el navegador.'
			},
			{
				id: 'web',
				label: 'HTML y CSS',
				learn: 'Cómo se arma una página y cómo se le da estilo.',
				build: 'Tu primera página, publicada en internet.'
			},
			{
				id: 'javascript',
				label: 'JavaScript',
				learn: 'Variables, funciones, listas, objetos y cómo cambiar una página con código.',
				build: 'Páginas que reaccionan: una calculadora, una lista de tareas.'
			},
			{
				id: 'tools',
				label: 'Herramientas',
				learn: 'Git, GitHub, TypeScript y cómo trabaja un equipo.',
				build: 'Tu código guardado y con historial, como en cualquier empresa.'
			},
			{
				id: 'frameworks',
				label: 'Frameworks',
				learn: 'Componentes, estado y estilos con un framework y Tailwind.',
				build: 'Aplicaciones con varias pantallas.'
			},
			{
				id: 'backend',
				label: 'Backend y datos',
				learn: 'Servidores, bases de datos, usuarios y permisos.',
				build: 'Aplicaciones con cuentas y datos que se guardan.'
			},
			{
				id: 'production',
				label: 'Calidad y producción',
				learn: 'Pruebas, despliegue y las prácticas de un equipo profesional.',
				build: 'Un proyecto completo en internet, para tu portafolio.'
			}
		]
	},

	method: {
		eyebrow: 'Cómo vamos a aprender',
		title: 'Cinco reglas para estas clases',
		description: 'Aprender a programar se parece más a aprender un idioma que a memorizar.',
		rules: [
			{
				title: 'Primero la idea',
				text: 'Entender qué pasa y por qué, antes de aprender la herramienta.'
			},
			{
				title: 'Tú escribes el código',
				text: 'Aunque al principio copies, que pase por tus manos. Leer no es lo mismo que escribir.'
			},
			{
				title: 'Siempre hay un proyecto',
				text: 'Cada fase termina en algo que funciona. Así se nota el avance.'
			},
			{
				title: 'Preguntar es parte del trabajo',
				text: 'Los mejores developers preguntan todo el tiempo. No hay preguntas tontas.'
			},
			{
				title: 'Los errores son información',
				text: 'Un mensaje de error te dice qué arreglar. Vas a ver miles, y cada uno enseña algo.'
			}
		]
	},

	questions: {
		eyebrow: 'Preguntas',
		title: 'Preguntas y notas',
		description:
			'Lo que quede en el aire lo anotamos aquí para la próxima clase. Se guarda solo en este navegador.',
		notesLabel: 'Notas de la clase',
		notesPlaceholder: 'Una pregunta o una idea por línea…',
		copyLabel: 'Copiar notas',
		copiedMessage: 'Notas copiadas',
		copyError: 'No se pudo copiar'
	},

	closing: {
		eyebrow: 'Fin de la clase 1',
		title: 'Ya empezaste',
		description:
			'La próxima clase escribimos la primera página web. Esta presentación se queda aquí para que vuelvas a ella cuando quieras.'
	}
} as const;
