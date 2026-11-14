/** Parte 04: qué es una aplicación web, las herramientas y qué hace a un buen developer. */

export const TOOL_WHEN = {
	now: 'now',
	later: 'later'
} as const;

export type ToolWhen = (typeof TOOL_WHEN)[keyof typeof TOOL_WHEN];

export const buildingPart = {
	app: {
		title: 'Lo que vas a poder construir',
		description:
			'Una aplicación web tiene tres partes. Al final del camino vas a saber hacer las tres.',
		partsLabel: 'Partes',
		learnLabel: 'Lo que vas a aprender',
		phaseLabel: 'Cuándo',
		example:
			'Por ejemplo, una app para reservar citas: el frontend muestra los horarios, el backend revisa que el cupo esté libre y la base de datos guarda la reserva.',
		parts: [
			{
				id: 'frontend',
				label: 'Frontend',
				what: 'Lo que se ve y se usa, en el navegador.',
				learn: ['HTML', 'CSS', 'JavaScript', 'Un framework'],
				phase: 'Fases 2, 3 y 5'
			},
			{
				id: 'backend',
				label: 'Backend',
				what: 'Las reglas y la lógica, en un servidor.',
				learn: ['Node.js', 'APIs', 'Usuarios y permisos'],
				phase: 'Fase 6'
			},
			{
				id: 'database',
				label: 'Base de datos',
				what: 'Donde se guarda la información para que siga ahí mañana.',
				learn: ['SQL', 'PostgreSQL', 'Supabase'],
				phase: 'Fase 6'
			}
		]
	},

	tools: {
		title: 'Las herramientas de un developer',
		description:
			'Las mismas que se usan en cualquier empresa. Las primeras las instalamos hoy; las demás llegan con su fase.',
		whenLabels: {
			[TOOL_WHEN.now]: 'Desde hoy',
			[TOOL_WHEN.later]: 'Más adelante'
		} satisfies Record<ToolWhen, string>,
		tools: [
			{ label: 'VS Code', what: 'El editor donde escribes el código.', when: TOOL_WHEN.now },
			{ label: 'La terminal', what: 'Donde corres comandos y programas.', when: TOOL_WHEN.now },
			{
				label: 'El navegador',
				what: 'Donde ves lo que construyes, con sus herramientas para revisarlo.',
				when: TOOL_WHEN.now
			},
			{ label: 'Node.js', what: 'Corre JavaScript fuera del navegador.', when: TOOL_WHEN.now },
			{ label: 'Git', what: 'Guarda cada versión de tu código.', when: TOOL_WHEN.later },
			{
				label: 'GitHub',
				what: 'Tu código en internet, para compartirlo y trabajar con otros.',
				when: TOOL_WHEN.later
			},
			{
				label: 'Un asistente de IA',
				what: 'Para preguntar y revisar. No para pensar por ti.',
				when: TOOL_WHEN.later
			}
		]
	},

	quality: {
		title: 'Lo que hace a un buen developer',
		description:
			'Escribir código que funciona es el comienzo. Lo que marca la diferencia es todo lo demás, y se practica desde el primer día.',
		habits: [
			{
				title: 'Entiende el problema',
				text: 'Antes de escribir, sabe qué tiene que resolver y para quién.'
			},
			{
				title: 'Escribe para personas',
				text: 'Código claro, con buenos nombres, que otro puede leer sin preguntar.'
			},
			{
				title: 'Prueba lo que hace',
				text: 'No da algo por terminado sin verlo funcionar.'
			},
			{
				title: 'Lee errores y documentación',
				text: 'Busca la respuesta en la fuente antes de adivinar.'
			},
			{
				title: 'Pide revisión',
				text: 'Muestra su trabajo y recibe los comentarios sin tomarlos personal.'
			},
			{
				title: 'Sigue aprendiendo',
				text: 'Las herramientas cambian. Las bases y la curiosidad quedan.'
			}
		]
	}
} as const;
