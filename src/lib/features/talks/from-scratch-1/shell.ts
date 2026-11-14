/**
 * Una terminal de juguete para la clase: un sistema de archivos en memoria y
 * los ocho comandos que se ven el primer día. No toca nada real; lo que se
 * crea vive solo mientras la diapositiva está abierta.
 */

export const SHELL_COMMAND = {
	help: 'help',
	pwd: 'pwd',
	ls: 'ls',
	cd: 'cd',
	mkdir: 'mkdir',
	touch: 'touch',
	echo: 'echo',
	clear: 'clear'
} as const;

export type ShellCommand = (typeof SHELL_COMMAND)[keyof typeof SHELL_COMMAND];

/** La carpeta personal, como se ve en macOS. `~` es su atajo. */
export const HOME_PATH = '/Users/tu-usuario';
const HOME_ALIAS = '~';
const PARENT = '..';

const MESSAGES = {
	help: `Comandos: ${Object.values(SHELL_COMMAND).join(', ')}`,
	notFound: (name: string) => `comando no encontrado: ${name}`,
	noDir: (name: string) => `cd: no existe la carpeta: ${name}`,
	exists: (name: string) => `mkdir: ya existe: ${name}`,
	missingName: (command: string) => `${command}: falta el nombre`
};

type Dir = { kind: 'dir'; children: Map<string, Node> };
type File = { kind: 'file' };
type Node = Dir | File;

export type ShellResult = { output: string[]; clear: boolean };

const dir = (entries: Record<string, Node> = {}): Dir => ({
	kind: 'dir',
	children: new Map(Object.entries(entries))
});
const file = (): File => ({ kind: 'file' });

export class Shell {
	#home: Dir;
	/** La carpeta actual, como lista de nombres desde la carpeta personal. */
	#cwd: string[] = [];

	constructor() {
		this.#home = dir({
			Documentos: dir(),
			Descargas: dir(),
			Escritorio: dir({ 'notas.txt': file() }),
			proyectos: dir()
		});
	}

	/** Cómo se ve la carpeta actual en el prompt: `~` o `~/proyectos`. */
	get location(): string {
		return [HOME_ALIAS, ...this.#cwd].join('/');
	}

	run(line: string): ShellResult {
		const [name = '', ...args] = line.trim().split(/\s+/);
		const arg = args[0];
		const result = (output: string[] = [], clear = false): ShellResult => ({ output, clear });

		switch (name) {
			case '':
				return result();
			case SHELL_COMMAND.help:
				return result([MESSAGES.help]);
			case SHELL_COMMAND.pwd:
				return result([[HOME_PATH, ...this.#cwd].join('/')]);
			case SHELL_COMMAND.ls:
				return result(this.#list());
			case SHELL_COMMAND.cd:
				return result(this.#cd(arg));
			case SHELL_COMMAND.mkdir:
			case SHELL_COMMAND.touch:
				return result(this.#create(name, arg));
			case SHELL_COMMAND.echo:
				return result([args.join(' ')]);
			case SHELL_COMMAND.clear:
				return result([], true);
			default:
				return result([MESSAGES.notFound(name)]);
		}
	}

	#current(): Dir {
		let node = this.#home;
		for (const name of this.#cwd) {
			const child = node.children.get(name);
			if (child?.kind !== 'dir') break;
			node = child;
		}
		return node;
	}

	#list(): string[] {
		const entries = [...this.#current().children].sort(([a], [b]) => a.localeCompare(b));
		if (entries.length === 0) return [];
		return [entries.map(([name, node]) => (node.kind === 'dir' ? `${name}/` : name)).join('  ')];
	}

	#cd(target: string | undefined): string[] {
		if (!target || target === HOME_ALIAS) {
			this.#cwd = [];
			return [];
		}
		const next = [...this.#cwd];
		for (const part of target.split('/').filter(Boolean)) {
			if (part === PARENT) {
				// No se sube más allá de la carpeta personal: es todo lo que existe acá.
				next.pop();
				continue;
			}
			let node = this.#home;
			for (const name of next) node = node.children.get(name) as Dir;
			if (node.children.get(part)?.kind !== 'dir') return [MESSAGES.noDir(target)];
			next.push(part);
		}
		this.#cwd = next;
		return [];
	}

	#create(command: string, target: string | undefined): string[] {
		if (!target) return [MESSAGES.missingName(command)];
		const current = this.#current();
		if (current.children.has(target)) {
			// Como en una terminal real: `touch` sobre algo que existe no avisa nada.
			return command === SHELL_COMMAND.mkdir ? [MESSAGES.exists(target)] : [];
		}
		current.children.set(target, command === SHELL_COMMAND.mkdir ? dir() : file());
		return [];
	}
}
