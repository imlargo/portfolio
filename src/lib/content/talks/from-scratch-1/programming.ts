import {
	DIRECTION,
	OUTCOME,
	ROBOT_COMMAND,
	type Level,
	type Outcome,
	type RobotCommand
} from '$lib/features/talks/from-scratch-1/robot';
import { snippet } from './snippets';

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
