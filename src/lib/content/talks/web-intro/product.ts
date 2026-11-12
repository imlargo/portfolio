/** Parte 01: qué es una aplicación, cómo se hace software, qué decidir antes de construir y en qué plataforma. */

export const PLATFORM = {
	web: 'web',
	pwa: 'pwa',
	native: 'native'
} as const;

export type Platform = (typeof PLATFORM)[keyof typeof PLATFORM];

export const PLATFORM_NEED = {
	offline: 'offline',
	push: 'push',
	store: 'store',
	hardware: 'hardware'
} as const;

export type PlatformNeed = (typeof PLATFORM_NEED)[keyof typeof PLATFORM_NEED];

/** Qué tan bien cubre cada plataforma un criterio de la tabla. */
export const SUPPORT = {
	yes: 'yes',
	partial: 'partial',
	no: 'no'
} as const;

export type Support = (typeof SUPPORT)[keyof typeof SUPPORT];

/**
 * La regla de la diapositiva, de lo más exigente a lo más simple: la tienda de
 * apps o el hardware piden nativa; sin conexión o notificaciones, una PWA; si
 * no, alcanza con la web.
 */
export function recommendPlatform(needs: readonly PlatformNeed[]): Platform {
	if (needs.includes(PLATFORM_NEED.store) || needs.includes(PLATFORM_NEED.hardware)) {
		return PLATFORM.native;
	}
	if (needs.includes(PLATFORM_NEED.offline) || needs.includes(PLATFORM_NEED.push)) {
		return PLATFORM.pwa;
	}
	return PLATFORM.web;
}

export const productPart = {
	whatIs: {
		title: 'Qué es una aplicación',
		description:
			'Un programa que ayuda a alguien a hacer una tarea. Una aplicación web es lo mismo, pero se usa desde el navegador: no hay que instalarla y funciona en cualquier dispositivo con internet.',
		examplesLabel: 'Ejemplos',
		siteLabel: 'Sitio: se lee',
		appLabel: 'Aplicación: se usa',
		traits: [
			{ id: 'account', label: 'Tienes una cuenta' },
			{ id: 'ownData', label: 'Ves tus propios datos' },
			{ id: 'create', label: 'Creas o cambias cosas' },
			{ id: 'together', label: 'Trabajas con otros al mismo tiempo' }
		],
		examples: [
			{
				id: 'blog',
				label: 'Un blog',
				position: 8,
				what: 'Lo lees y ya. Todos ven exactamente lo mismo.',
				traits: []
			},
			{
				id: 'store',
				label: 'Una tienda en línea',
				position: 42,
				what: 'Buscas, comparas y compras. Ya tiene cuenta, carrito y pedidos.',
				traits: ['account', 'ownData', 'create']
			},
			{
				id: 'mail',
				label: 'Gmail',
				position: 70,
				what: 'Lees, escribes y organizas tu correo. Cada persona ve algo distinto.',
				traits: ['account', 'ownData', 'create']
			},
			{
				id: 'design',
				label: 'Figma',
				position: 94,
				what: 'Diseñas con otras personas en tiempo real. Es un programa completo dentro del navegador.',
				traits: ['account', 'ownData', 'create', 'together']
			}
		]
	},

	process: {
		title: 'Cómo se hace software',
		description:
			'Escribir código es solo una parte. Antes hay que entender el problema, y después hay que cuidar lo que se publicó.',
		stepsLabel: 'Etapas',
		outputLabel: 'Lo que deja',
		loopNote: 'No es una línea recta: lo que aprendes al publicar vuelve a empezar el ciclo.',
		steps: [
			{
				id: 'understand',
				label: 'Entender',
				what: 'Hablar con quien tiene el problema: qué hace hoy, qué le cuesta, qué cambiaría.',
				output: 'Una descripción clara del problema'
			},
			{
				id: 'define',
				label: 'Definir',
				what: 'Decidir qué se construye primero y qué queda para después. Lo que no entra también se escribe.',
				output: 'El alcance y los requisitos'
			},
			{
				id: 'design',
				label: 'Diseñar',
				what: 'Cómo se ve y cómo se usa, y cómo se organiza por dentro.',
				output: 'Las pantallas y las decisiones técnicas'
			},
			{
				id: 'build',
				label: 'Construir',
				what: 'Escribir el código en partes pequeñas que se puedan revisar y probar.',
				output: 'Código que funciona'
			},
			{
				id: 'test',
				label: 'Probar',
				what: 'Revisar que hace lo que debe, con pruebas automáticas y con personas reales.',
				output: 'Errores encontrados antes que el usuario'
			},
			{
				id: 'ship',
				label: 'Publicar',
				what: 'Ponerla en internet para que la gente la use.',
				output: 'Una dirección que funciona'
			},
			{
				id: 'maintain',
				label: 'Mantener',
				what: 'Corregir errores, mejorar con lo que dicen los usuarios y mantener todo al día. Es la etapa más larga.',
				output: 'Un producto que sigue sirviendo'
			}
		]
	},

	decide: {
		title: 'Antes de escribir código',
		description:
			'Cuatro preguntas que conviene responder antes de empezar. Las respondemos con un ejemplo: una aplicación para reservar clases en un gimnasio.',
		questionsLabel: 'Preguntas',
		nowLabel: 'Primera versión',
		laterLabel: 'Después',
		questions: [
			{
				id: 'who',
				label: '¿Para quién es?',
				answer:
					'Para los socios del gimnasio. La usan casi siempre desde el celular, un rato antes de salir de casa.'
			},
			{
				id: 'problem',
				label: '¿Qué problema resuelve?',
				answer:
					'Hoy reservan por WhatsApp, y en recepción se pierden horas confirmando cupos a mano.'
			},
			{
				id: 'scope',
				label: '¿Qué es lo mínimo que sirve?',
				answer: 'Lo justo para dejar de usar WhatsApp. Lo demás espera.',
				now: ['Ver el horario de clases', 'Reservar y cancelar un cupo', 'Iniciar sesión'],
				later: ['Pagos en línea', 'Recordatorios', 'Reportes para el gimnasio']
			},
			{
				id: 'success',
				label: '¿Cómo sabemos que funciona?',
				answer:
					'Si en un mes la mayoría de las reservas llegan por la aplicación y no por WhatsApp.'
			}
		]
	},

	platforms: {
		title: 'Web, PWA o nativa',
		description:
			'Tres formas de llevar una aplicación al usuario. Marca lo que necesita tu proyecto y mira cuál conviene.',
		needsLabel: 'Tu proyecto necesita',
		recommendLabel: 'Te conviene',
		needs: [
			{ id: PLATFORM_NEED.offline, label: 'Funcionar sin internet' },
			{ id: PLATFORM_NEED.push, label: 'Enviar notificaciones' },
			{ id: PLATFORM_NEED.store, label: 'Estar en App Store y Google Play' },
			{ id: PLATFORM_NEED.hardware, label: 'Bluetooth, sensores o trabajar en segundo plano' }
		],
		options: [
			{
				id: PLATFORM.web,
				label: 'Web',
				what: 'Se abre en el navegador con un enlace. Un solo código para todos los dispositivos.',
				examples: 'Gmail, Notion, Figma'
			},
			{
				id: PLATFORM.pwa,
				label: 'PWA',
				what: 'Una aplicación web que además se instala en la pantalla de inicio, funciona sin conexión y puede enviar notificaciones.',
				examples: 'Starbucks, Pinterest'
			},
			{
				id: PLATFORM.native,
				label: 'Nativa',
				what: 'Se hace para iOS y Android y se descarga de las tiendas. Tiene acceso completo al teléfono. React Native o Flutter permiten un solo código para las dos.',
				examples: 'WhatsApp, Instagram, Uber'
			}
		],
		examplesLabel: 'Ejemplos',
		criteria: [
			{
				label: 'Se abre con un enlace',
				support: { web: SUPPORT.yes, pwa: SUPPORT.yes, native: SUPPORT.no }
			},
			{
				label: 'Se instala',
				support: { web: SUPPORT.no, pwa: SUPPORT.yes, native: SUPPORT.yes }
			},
			{
				label: 'Funciona sin internet',
				support: { web: SUPPORT.no, pwa: SUPPORT.yes, native: SUPPORT.yes }
			},
			{
				label: 'Notificaciones',
				note: 'En iPhone, una PWA solo puede enviarlas si está instalada.',
				support: { web: SUPPORT.partial, pwa: SUPPORT.yes, native: SUPPORT.yes }
			},
			{
				label: 'Acceso completo al teléfono',
				support: { web: SUPPORT.no, pwa: SUPPORT.partial, native: SUPPORT.yes }
			},
			{
				label: 'Actualizar sin pasar por una tienda',
				support: { web: SUPPORT.yes, pwa: SUPPORT.yes, native: SUPPORT.no }
			}
		] satisfies readonly { label: string; note?: string; support: Record<Platform, Support> }[]
	}
} as const;
