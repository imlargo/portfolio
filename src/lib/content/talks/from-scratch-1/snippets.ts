import type { CodeSnippet } from '$lib/features/deck/code-snippets';

/**
 * Todo el código de la clase, por id. Se resalta una sola vez durante el
 * build; el contenido lo referencia con `snippet()`, que no compila si el id
 * no existe.
 */
export const fromScratchSnippets = {
	sumJs: {
		language: 'js',
		label: 'JavaScript',
		code: `const a = 2;
const b = 3;
const resultado = a + b;`
	},
	sumC: {
		language: 'c',
		label: 'C',
		code: `int a = 2;
int b = 3;
int resultado = a + b;`
	},
	sumAsm: {
		language: 'asm',
		label: 'Ensamblador x86',
		code: `mov eax, 2   ; guarda 2 en el registro eax
add eax, 3   ; súmale 3`
	},
	sumMachine: {
		language: 'text',
		label: 'Código máquina x86',
		code: `10111000 00000010 00000000 00000000 00000000   mov eax, 2
10000011 11000000 00000011                     add eax, 3`
	},

	basicVariable: {
		language: 'js',
		code: `const nombre = 'Ada';
let edad = 27;
edad = edad + 1;

console.log(nombre);
console.log(edad);`
	},
	basicTypes: {
		language: 'js',
		code: `console.log(typeof 'Hola');
console.log(typeof 42);
console.log(typeof true);
console.log(typeof ['a', 'b']);`
	},
	basicConditional: {
		language: 'js',
		code: `const vaALlover = true;

if (vaALlover) {
  console.log('Lleva sombrilla');
} else {
  console.log('Deja la sombrilla en casa');
}`
	},
	basicLoop: {
		language: 'js',
		code: `for (let vuelta = 1; vuelta <= 3; vuelta++) {
  console.log('Vuelta ' + vuelta);
}`
	},
	basicFunction: {
		language: 'js',
		code: `function saludar(nombre) {
  console.log('Hola, ' + nombre);
}

saludar('Ada');
saludar('Alan');`
	}
} as const satisfies Record<string, CodeSnippet>;

export type FromScratchSnippetId = keyof typeof fromScratchSnippets;

/** Referencia a un fragmento desde el contenido. Existe solo para que un id mal escrito no compile. */
export const snippet = (id: FromScratchSnippetId) => id;
