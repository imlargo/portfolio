/** Parte 05: preparar la computadora, la tarea y las palabras de la clase. */

export const startPart = {
	setup: {
		title: 'Prepara tu computadora',
		description:
			'Antes de la próxima clase, instala esto. Marca cada paso cuando lo tengas; queda guardado en este navegador.',
		progressLabel: (done: number, total: number) => `${done} de ${total}`,
		openLabel: 'Abrir',
		steps: [
			{
				id: 'vscode',
				label: 'Instala VS Code',
				detail: 'El editor de código.',
				href: 'https://code.visualstudio.com'
			},
			{
				id: 'node',
				label: 'Instala Node.js, la versión LTS',
				detail: 'Para correr JavaScript en la terminal.',
				href: 'https://nodejs.org'
			},
			{
				id: 'git',
				label: 'Instala Git',
				detail: 'En Mac puede que ya venga instalado.',
				href: 'https://git-scm.com/downloads'
			},
			{
				id: 'github',
				label: 'Crea una cuenta en GitHub',
				detail: 'Ahí va a vivir tu código.',
				href: 'https://github.com/signup'
			},
			{
				id: 'check',
				label: 'Comprueba que Node quedó instalado',
				detail: 'En la terminal escribe esto; si responde con un número, quedó listo.',
				code: 'node --version'
			}
		]
	},

	homework: {
		title: 'Para practicar',
		description:
			'Nada de esto tiene nota. La idea es que te sientas cómoda con la terminal y con la idea de dar instrucciones exactas.',
		tasks: [
			{
				id: 'folders',
				text: 'En la terminal de verdad, crea una carpeta proyectos y adentro otra llamada clase-1.'
			},
			{
				id: 'file',
				text: 'Adentro de clase-1 crea un archivo hola.js que imprima tu nombre con console.log.'
			},
			{ id: 'run', text: 'Córrelo con node hola.js y mira lo que aparece.' },
			{
				id: 'robot',
				text: 'Resuelve los dos niveles del robot con la menor cantidad de órdenes que puedas.'
			},
			{
				id: 'explain',
				text: 'Explica con tus palabras qué es la RAM, qué es un bit y qué es un lenguaje de programación.'
			}
		]
	},

	glossary: {
		title: 'Las palabras de hoy',
		description: 'Vas a escucharlas todo el tiempo. Vuelve aquí cuando alguna no te suene.',
		searchLabel: 'Buscar una palabra',
		searchPlaceholder: 'Buscar…',
		empty: 'Ninguna palabra coincide.',
		terms: [
			{ term: 'Bit', meaning: 'La unidad más pequeña de información: un 0 o un 1.' },
			{ term: 'Byte', meaning: 'Ocho bits juntos. Alcanza para guardar una letra.' },
			{ term: 'CPU', meaning: 'El procesador. Ejecuta las instrucciones de los programas.' },
			{ term: 'RAM', meaning: 'La memoria de trabajo. Rápida, pero se borra al apagar.' },
			{ term: 'Almacenamiento', meaning: 'El disco. Guarda archivos aunque apagues el equipo.' },
			{
				term: 'Sistema operativo',
				meaning: 'El programa que administra a los demás: macOS, Windows, Linux.'
			},
			{ term: 'Terminal', meaning: 'Un programa para darle órdenes a la computadora escribiendo.' },
			{ term: 'Comando', meaning: 'Una orden que escribes en la terminal, como ls o cd.' },
			{ term: 'Ruta', meaning: 'La dirección de un archivo dentro del árbol de carpetas.' },
			{ term: 'Programa', meaning: 'Una lista de instrucciones que la computadora ejecuta.' },
			{ term: 'Algoritmo', meaning: 'Los pasos exactos para resolver un problema.' },
			{ term: 'Bug', meaning: 'Un error en un programa: hace algo distinto a lo que querías.' },
			{
				term: 'Lenguaje de programación',
				meaning: 'Una forma de escribir instrucciones que se puede traducir a código máquina.'
			},
			{ term: 'Compilador', meaning: 'Traduce tu código a algo que la máquina puede ejecutar.' },
			{ term: 'Variable', meaning: 'Un nombre que guarda un dato para usarlo después.' },
			{ term: 'Función', meaning: 'Un grupo de instrucciones con nombre que puedes reutilizar.' }
		]
	}
} as const;
