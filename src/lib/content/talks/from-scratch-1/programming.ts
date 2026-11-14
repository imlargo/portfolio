import {
	DIRECTION,
	OUTCOME,
	ROBOT_COMMAND,
	type Level,
	type Outcome,
	type RobotCommand
} from '$lib/features/talks/from-scratch-1/robot';
import { snippet } from './snippets';

/** Un paso del recorrido: la línea que se ejecuta (desde 1), cómo queda la memoria y qué se imprimió. */
export type TraceStep = {
	line: number;
	memory: Record<string, string>;
	output?: string;
	note: string;
};

/** Tipa los pasos sin que `as const` convierta cada memoria en un tipo distinto. */
const traceSteps = (steps: TraceStep[]): readonly TraceStep[] => steps;

/** Parte 03: qué es programar, qué es un lenguaje, cuáles hay, sus piezas y un primer programa. */

export const programmingPart = {
	robot: {
		title: 'Qué es programar',
		description:
			'Darle a la computadora instrucciones exactas. Hace justo lo que le dices, ni más ni menos, y no adivina lo que quisiste decir. Programa al robot para que llegue a la meta.',
		commandsLabel: 'Órdenes',
		programLabel: 'Tu programa',
		levelLabel: 'Nivel',
		runLabel: 'Ejecutar',
		undoLabel: 'Quitar la última',
		clearLabel: 'Borrar todo',
		emptyProgram: 'Todavía no hay órdenes.',
		maxCommands: 20,
		commands: {
			[ROBOT_COMMAND.forward]: 'Avanzar',
			[ROBOT_COMMAND.left]: 'Girar a la izquierda',
			[ROBOT_COMMAND.right]: 'Girar a la derecha'
		} satisfies Record<RobotCommand, string>,
		outcomes: {
			[OUTCOME.moving]: 'Ejecutando…',
			[OUTCOME.goal]: 'Llegó. Tu programa funciona.',
			[OUTCOME.crash]:
				'Chocó. La orden que lo hizo chocar es un bug: arréglala y vuelve a ejecutar.',
			[OUTCOME.short]: 'Se quedó a mitad de camino. Faltan órdenes.'
		} satisfies Record<Outcome, string>,
		idle: 'Agrega órdenes y presiona Ejecutar.',
		levels: [
			{
				id: 'one',
				label: '1',
				level: {
					size: 5,
					start: { x: 0, y: 4, direction: DIRECTION.up },
					goal: { x: 3, y: 1 },
					walls: []
				}
			},
			{
				id: 'two',
				label: '2',
				level: {
					size: 5,
					start: { x: 0, y: 4, direction: DIRECTION.up },
					goal: { x: 4, y: 0 },
					walls: [
						{ x: 1, y: 0 },
						{ x: 1, y: 1 },
						{ x: 1, y: 2 },
						{ x: 1, y: 3 },
						{ x: 3, y: 1 },
						{ x: 3, y: 2 },
						{ x: 3, y: 3 },
						{ x: 3, y: 4 }
					]
				}
			}
		] satisfies readonly { id: string; label: string; level: Level }[]
	},

	language: {
		title: 'Qué es un lenguaje de programación',
		description:
			'Una forma de escribir instrucciones que una persona puede leer y que se puede traducir a lo único que entiende el procesador: ceros y unos. La misma suma, en cuatro niveles.',
		levelsLabel: 'Del más humano al más cercano a la máquina',
		note: 'Un compilador o un intérprete hace la traducción por ti. Casi siempre vas a escribir en el nivel más alto.',
		levels: [
			{
				id: 'js',
				label: 'JavaScript',
				meta: 'Alto nivel',
				what: 'Se lee casi como una frase. Es el que vamos a usar.',
				snippet: snippet('sumJs')
			},
			{
				id: 'c',
				label: 'C',
				meta: 'Nivel medio',
				what: 'Más cerca de la máquina: tienes que decir de qué tipo es cada dato.',
				snippet: snippet('sumC')
			},
			{
				id: 'asm',
				label: 'Ensamblador',
				meta: 'Bajo nivel',
				what: 'Las instrucciones del procesador, una por una, con nombres cortos.',
				snippet: snippet('sumAsm')
			},
			{
				id: 'machine',
				label: 'Código máquina',
				meta: 'Binario',
				what: 'Lo que de verdad ejecuta el procesador: esas mismas dos instrucciones, en bytes.',
				snippet: snippet('sumMachine')
			}
		]
	},

	map: {
		title: 'Cada lenguaje tiene su terreno',
		description:
			'Hay cientos de lenguajes, pero unos pocos hacen casi todo. Se eligen según lo que quieres construir.',
		areasLabel: 'Para construir',
		ourPickLabel: 'Por qué empezamos con JavaScript',
		ourPick:
			'Corre en el navegador y también en el servidor. Con un solo lenguaje puedes hacer una aplicación web completa.',
		areas: [
			{
				id: 'web',
				label: 'Páginas y aplicaciones web',
				languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
				where: 'Todo lo que abres en un navegador.',
				ours: true
			},
			{
				id: 'backend',
				label: 'Servidores',
				languages: ['JavaScript', 'Go', 'Python', 'Java'],
				where: 'Lo que responde detrás de cada aplicación.',
				ours: true
			},
			{
				id: 'mobile',
				label: 'Aplicaciones móviles',
				languages: ['Swift', 'Kotlin', 'Dart'],
				where: 'Las apps que descargas de la tienda.',
				ours: false
			},
			{
				id: 'data',
				label: 'Datos e inteligencia artificial',
				languages: ['Python', 'SQL', 'R'],
				where: 'Análisis, estadística y modelos de IA.',
				ours: false
			},
			{
				id: 'systems',
				label: 'Sistemas y videojuegos',
				languages: ['C', 'C++', 'Rust', 'C#'],
				where: 'Sistemas operativos, motores de juegos, programas muy rápidos.',
				ours: false
			}
		]
	},

	basics: {
		title: 'Las piezas de cualquier lenguaje',
		description:
			'Cambian las palabras, pero estas cinco ideas están en todos. Hoy solo las presentamos; las vemos a fondo en las próximas clases.',
		conceptsLabel: 'Ideas',
		outputLabel: 'Lo que imprime',
		concepts: [
			{
				id: 'variable',
				label: 'Variables',
				what: 'Una caja con nombre donde guardas un dato para usarlo después.',
				snippet: snippet('basicVariable'),
				output: 'Ada\n28'
			},
			{
				id: 'types',
				label: 'Tipos de datos',
				what: 'Cada dato es de un tipo: texto, número, verdadero o falso, una lista.',
				snippet: snippet('basicTypes'),
				output: 'string\nnumber\nboolean\nobject'
			},
			{
				id: 'conditional',
				label: 'Condicionales',
				what: 'Hacer algo solo si se cumple una condición.',
				snippet: snippet('basicConditional'),
				output: 'Lleva sombrilla'
			},
			{
				id: 'loop',
				label: 'Bucles',
				what: 'Repetir algo varias veces sin escribirlo varias veces.',
				snippet: snippet('basicLoop'),
				output: 'Vuelta 1\nVuelta 2\nVuelta 3'
			},
			{
				id: 'function',
				label: 'Funciones',
				what: 'Un grupo de instrucciones con nombre que usas cuando lo necesitas.',
				snippet: snippet('basicFunction'),
				output: 'Hola, Ada\nHola, Alan'
			}
		]
	},

	decompose: {
		title: 'Pensar antes de escribir',
		description:
			'Programar es sobre todo partir un problema en pasos pequeños. El código es lo último. Así se va de una pregunta en palabras a un programa.',
		stagesLabel: 'De la idea al código',
		problem:
			'Cuatro amigos comparten una cuenta de $120.000 y quieren dejar 10 % de propina. ¿Cuánto paga cada uno?',
		stages: [
			{
				id: 'problem',
				label: 'Entender el problema',
				hint: 'Antes de nada, tres preguntas.',
				questions: [
					{
						ask: '¿Qué datos tengo?',
						answer: 'El total, el porcentaje de propina y cuántas personas son.'
					},
					{ ask: '¿Qué quiero obtener?', answer: 'Lo que paga cada persona.' },
					{ ask: '¿Qué pasos los conectan?', answer: 'Eso es lo que falta pensar.' }
				]
			},
			{
				id: 'steps',
				label: 'Partirlo en pasos',
				hint: 'En español, pequeños y en orden.',
				steps: [
					'Tomar el total de la cuenta.',
					'Calcular la propina: el 10 % del total.',
					'Sumar la propina al total.',
					'Dividir entre las cuatro personas.',
					'Mostrar cuánto paga cada una.'
				]
			},
			{
				id: 'pseudocode',
				label: 'Pseudocódigo',
				hint: 'Los mismos pasos, casi como código, sin preocuparse por la sintaxis.',
				snippet: snippet('splitPseudocode')
			},
			{
				id: 'code',
				label: 'Código',
				hint: 'Ahora sí, en JavaScript. Cada línea es uno de los pasos.',
				snippet: snippet('splitCode')
			}
		],
		note: 'Si te bloqueas escribiendo código, casi siempre es porque falta un paso de los anteriores.'
	},

	trace: {
		title: 'Cómo se ejecuta un programa',
		description:
			'La computadora lee una línea, hace lo que dice, y pasa a la siguiente. Cada variable es una caja en la memoria cuyo valor cambia. Avanza paso a paso.',
		codeLabel: 'compra.js',
		memoryLabel: 'Memoria',
		outputLabel: 'Consola',
		emptyMemory: 'Vacía',
		emptyOutput: 'Nada todavía',
		previousLabel: 'Paso anterior',
		nextLabel: 'Siguiente paso',
		resetLabel: 'Volver al inicio',
		stepLabel: (step: number, total: number) => `Paso ${step} de ${total}`,
		startNote: 'Todavía no se ha ejecutado nada. Presiona Siguiente paso.',
		lines: [
			'let total = 0;',
			'const precios = [12, 30, 8];',
			'for (const precio of precios) {',
			'  total = total + precio;',
			'}',
			'if (total > 40) {',
			"  console.log('Envío gratis');",
			'}',
			"console.log('Total: ' + total);"
		],
		steps: traceSteps([
			{ line: 1, memory: { total: '0' }, note: 'Se crea la caja total con un 0 adentro.' },
			{
				line: 2,
				memory: { total: '0', precios: '[12, 30, 8]' },
				note: 'Se crea una lista con tres precios.'
			},
			{
				line: 3,
				memory: { total: '0', precios: '[12, 30, 8]', precio: '12' },
				note: 'Empieza el bucle: precio toma el primer valor de la lista.'
			},
			{
				line: 4,
				memory: { total: '12', precios: '[12, 30, 8]', precio: '12' },
				note: 'Se lee total (0), se le suma precio (12) y el resultado se guarda otra vez en total.'
			},
			{
				line: 3,
				memory: { total: '12', precios: '[12, 30, 8]', precio: '30' },
				note: 'Segunda vuelta: precio toma el siguiente valor.'
			},
			{
				line: 4,
				memory: { total: '42', precios: '[12, 30, 8]', precio: '30' },
				note: '12 + 30 = 42. La caja total cambia de valor.'
			},
			{
				line: 3,
				memory: { total: '42', precios: '[12, 30, 8]', precio: '8' },
				note: 'Tercera y última vuelta.'
			},
			{
				line: 4,
				memory: { total: '50', precios: '[12, 30, 8]', precio: '8' },
				note: '42 + 8 = 50. Ya no quedan precios: el bucle termina y precio deja de existir.'
			},
			{
				line: 6,
				memory: { total: '50', precios: '[12, 30, 8]' },
				note: 'Se revisa la condición: ¿50 es mayor que 40? Sí, así que entra.'
			},
			{
				line: 7,
				memory: { total: '50', precios: '[12, 30, 8]' },
				output: 'Envío gratis',
				note: 'Se imprime el mensaje en la consola.'
			},
			{
				line: 9,
				memory: { total: '50', precios: '[12, 30, 8]' },
				output: 'Total: 50',
				note: 'La última línea. El programa termina.'
			}
		])
	},

	firstProgram: {
		title: 'Tu primer programa',
		description:
			'Esto es JavaScript de verdad, corriendo en tu navegador. Cambia lo que quieras y presiona Ejecutar; si algo falla, el error aparece abajo.',
		editorLabel: 'programa.js',
		runLabel: 'Ejecutar',
		resetLabel: 'Restaurar',
		consoleLabel: 'Consola',
		emptyConsole: 'Presiona Ejecutar para ver lo que imprime.',
		errorPrefix: 'Error',
		code: `const nombre = 'tu nombre';
console.log('Hola, ' + nombre);

for (let vuelta = 1; vuelta <= 3; vuelta++) {
  console.log('Vuelta número ' + vuelta);
}

const edad = 25;
if (edad >= 18) {
  console.log('Eres mayor de edad');
}`
	}
} as const;
