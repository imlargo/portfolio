import { HOME_PATH, SHELL_COMMAND } from '$lib/features/talks/from-scratch-1/shell';

/** Parte 02: la terminal y las rutas. */

export const terminalPart = {
	terminal: {
		title: 'La terminal',
		description:
			'Otra forma de usar la computadora: en lugar de hacer clic, escribes órdenes. Los developers la usan todo el día porque es rápida y se puede automatizar. Esta es de práctica, no toca nada real.',
		commandsLabel: 'Comandos',
		inputLabel: 'Escribe un comando',
		placeholder: 'Escribe aquí y presiona Enter',
		welcome: 'Escribe help para ver los comandos, o elige uno de la izquierda.',
		user: 'tu-usuario',
		commands: [
			{ id: SHELL_COMMAND.pwd, what: 'Muestra en qué carpeta estás', example: 'pwd' },
			{ id: SHELL_COMMAND.ls, what: 'Lista lo que hay en la carpeta', example: 'ls' },
			{ id: SHELL_COMMAND.cd, what: 'Entra a una carpeta; cd .. sale', example: 'cd proyectos' },
			{ id: SHELL_COMMAND.mkdir, what: 'Crea una carpeta', example: 'mkdir mi-web' },
			{ id: SHELL_COMMAND.touch, what: 'Crea un archivo vacío', example: 'touch index.html' },
			{ id: SHELL_COMMAND.echo, what: 'Repite un texto', example: 'echo Hola' },
			{ id: SHELL_COMMAND.clear, what: 'Limpia la pantalla', example: 'clear' }
		]
	},

	paths: {
		title: 'Archivos, carpetas y rutas',
		description:
			'Todo lo que hay en tu computadora vive en un árbol de carpetas. Una ruta es la dirección de un archivo dentro de ese árbol.',
		treeLabel: 'Tu carpeta personal',
		fullLabel: 'Ruta completa',
		shortLabel: 'Con el atajo ~',
		home: HOME_PATH,
		note: '~ es el atajo de tu carpeta personal, y / separa una carpeta de la siguiente. La terminal y el código usan rutas todo el tiempo.',
		files: [
			{ id: 'cv', path: ['Documentos', 'hoja-de-vida.pdf'] },
			{ id: 'notes', path: ['Escritorio', 'notas.txt'] },
			{ id: 'html', path: ['proyectos', 'mi-web', 'index.html'] },
			{ id: 'css', path: ['proyectos', 'mi-web', 'styles.css'] }
		]
	}
} as const;
