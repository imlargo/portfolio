import { describe, expect, it } from 'vitest';
import { HOME_PATH, Shell } from './shell';

describe('Shell', () => {
	it('starts at home and lists folders with a trailing slash', () => {
		const shell = new Shell();
		expect(shell.run('pwd').output).toEqual([HOME_PATH]);
		expect(shell.run('ls').output).toEqual(['Descargas/  Documentos/  Escritorio/  proyectos/']);
	});

	it('moves between folders and back', () => {
		const shell = new Shell();
		shell.run('cd Escritorio');
		expect(shell.location).toBe('~/Escritorio');
		expect(shell.run('ls').output).toEqual(['notas.txt']);
		shell.run('cd ..');
		expect(shell.location).toBe('~');
	});

	it('creates folders and files where you are', () => {
		const shell = new Shell();
		shell.run('cd proyectos');
		shell.run('mkdir mi-web');
		shell.run('cd mi-web');
		shell.run('touch index.html');
		expect(shell.run('pwd').output).toEqual([`${HOME_PATH}/proyectos/mi-web`]);
		expect(shell.run('ls').output).toEqual(['index.html']);
		expect(shell.run('mkdir index.html').output).toEqual(['mkdir: ya existe: index.html']);
	});

	it('reports what it cannot do', () => {
		const shell = new Shell();
		expect(shell.run('cd nada').output).toEqual(['cd: no existe la carpeta: nada']);
		expect(shell.run('cd Escritorio/notas.txt').output).toEqual([
			'cd: no existe la carpeta: Escritorio/notas.txt'
		]);
		expect(shell.location).toBe('~');
		expect(shell.run('borrar todo').output).toEqual(['comando no encontrado: borrar']);
		expect(shell.run('clear').clear).toBe(true);
	});
});
