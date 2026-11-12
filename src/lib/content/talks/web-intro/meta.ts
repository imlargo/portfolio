import {
	PIXEL_ICON_BROWSER,
	PIXEL_ICON_BUILD,
	PIXEL_ICON_DEFINE,
	PIXEL_ICON_FLAG,
	PIXEL_ICON_GLOBE,
	PIXEL_ICON_PALETTE
} from '$lib/components/effects/pixel/pixelIcons';

/**
 * Masterclass "Introducción al desarrollo de aplicaciones web": portada, quién
 * la da, la agenda, las preguntas y el cierre. Cada parte de la clase vive en
 * su propio archivo de esta carpeta.
 */

/** Anclas de las seis partes. La agenda de la portada salta a cada una. */
export const WEB_INTRO_SECTIONS = {
	product: 'producto',
	web: 'la-web',
	browser: 'navegador',
	components: 'componentes',
	styles: 'estilos',
	project: 'tu-proyecto'
} as const;

export type WebIntroSection = (typeof WEB_INTRO_SECTIONS)[keyof typeof WEB_INTRO_SECTIONS];

/** Las seis partes en orden, con el tiempo que se les reserva. */
export const WEB_INTRO_PARTS = [
	{
		id: WEB_INTRO_SECTIONS.product,
		index: '01',
		label: 'El producto',
		icon: PIXEL_ICON_DEFINE,
		minutes: 20
	},
	{
		id: WEB_INTRO_SECTIONS.web,
		index: '02',
		label: 'La web',
		icon: PIXEL_ICON_GLOBE,
		minutes: 15
	},
	{
		id: WEB_INTRO_SECTIONS.browser,
		index: '03',
		label: 'El navegador',
		icon: PIXEL_ICON_BROWSER,
		minutes: 20
	},
	{
		id: WEB_INTRO_SECTIONS.components,
		index: '04',
		label: 'Componentes',
		icon: PIXEL_ICON_BUILD,
		minutes: 30
	},
	{
		id: WEB_INTRO_SECTIONS.styles,
		index: '05',
		label: 'Estilos',
		icon: PIXEL_ICON_PALETTE,
		minutes: 15
	},
	{
		id: WEB_INTRO_SECTIONS.project,
		index: '06',
		label: 'Tu proyecto',
		icon: PIXEL_ICON_FLAG,
		minutes: 20
	}
] as const;

/** Rótulo de cada parte para el encabezado de sus diapositivas: "01 · La web". */
export const partEyebrow = (id: WebIntroSection) => {
	const part = WEB_INTRO_PARTS.find((item) => item.id === id);
	return part ? `${part.index} · ${part.label}` : '';
};

export const webIntroMeta = {
	seo: {
		title: 'Introducción al desarrollo de aplicaciones web',
		description:
			'Masterclass de Juan Carlos Largo (@imlargo) sobre cómo funciona la web y cómo se construye el frontend de una aplicación.'
	},
	label: 'Masterclass · Desarrollo web',
	/** Prefijo de lo que la presentación guarda en el navegador (preguntas, progreso). */
	storageKey: 'imlargo:talk:web-intro',

	cover: {
		badge: 'Masterclass · Desarrollo web',
		title: 'Introducción al desarrollo de aplicaciones web',
		description:
			'Cómo funciona la web, cómo se construye una interfaz moderna y cómo organizar un proyecto de frontend desde el primer día.'
	},

	speaker: {
		eyebrow: 'Quién soy',
		portrait: '/assets/pfp.jpg',
		bio: 'Soy Senior Frontend Engineer. He liderado el frontend de una plataforma empresarial, construí desde cero un SaaS que llegó a 1.500 usuarios activos y reconstruí una plataforma nacional que usan más de 64 universidades del país.',
		facts: [
			{ value: '20+', label: 'Sistemas en producción desde 2023' },
			{ value: '1.500', label: 'Usuarios activos en el SaaS que construí' },
			{ value: '64+', label: 'Universidades en una plataforma nacional' }
		],
		linkedinLabel: 'LinkedIn',
		githubLabel: 'GitHub',
		resumeLabel: 'Hoja de vida'
	},

	goals: {
		eyebrow: 'La sesión',
		title: 'Lo que vamos a ver',
		description:
			'Dos horas en seis partes. Solo necesitas saber programar en algún lenguaje; no hace falta experiencia en web.',
		outcomesLabel: 'Al final vas a entender',
		outcomes: [
			'Qué es una aplicación web y cuándo conviene una web, una PWA o una nativa.',
			'Qué pasa desde que escribes una URL hasta que ves la página.',
			'Qué es el DOM y cómo lo cambia JavaScript.',
			'Para qué sirve un framework y qué es la reactividad.',
			'Cómo dividir una interfaz en componentes.',
			'Cómo dar estilo con Tailwind y shadcn/ui, y cómo ordenar un proyecto.'
		],
		agendaLabel: 'Agenda',
		minutesLabel: (minutes: number) => `${minutes} min`
	},

	questions: {
		eyebrow: 'Preguntas',
		title: 'Preguntas',
		description:
			'Las anoto aquí para responderlas al final o después de la clase. Se quedan guardadas solo en este navegador.',
		notesLabel: 'Preguntas del público',
		notesPlaceholder: 'Una pregunta por línea…',
		copyLabel: 'Copiar preguntas',
		copiedMessage: 'Preguntas copiadas',
		copyError: 'No se pudo copiar'
	},

	closing: {
		eyebrow: 'Gracias',
		title: 'Gracias por venir',
		description:
			'Esta presentación se queda publicada en esta misma dirección, con todo el código. Si te queda alguna duda, escríbeme.',
		links: [
			{ label: 'LinkedIn', key: 'linkedin' },
			{ label: 'GitHub', key: 'github' },
			{ label: 'imlargo.dev', key: 'site' },
			{ label: 'Escríbeme', key: 'email' }
		],
		backLabel: 'Más charlas'
	}
} as const;
