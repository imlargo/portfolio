/**
 * El robot de la clase: se mueve en una cuadrícula siguiendo una lista de
 * órdenes, una tras otra, sin adivinar nada. Es la idea de programa en su
 * forma más pequeña.
 */

export const DIRECTION = { up: 'up', right: 'right', down: 'down', left: 'left' } as const;
export type Direction = (typeof DIRECTION)[keyof typeof DIRECTION];

export const ROBOT_COMMAND = { forward: 'forward', left: 'left', right: 'right' } as const;
export type RobotCommand = (typeof ROBOT_COMMAND)[keyof typeof ROBOT_COMMAND];

export const OUTCOME = {
	moving: 'moving',
	goal: 'goal',
	crash: 'crash',
	short: 'short'
} as const;
export type Outcome = (typeof OUTCOME)[keyof typeof OUTCOME];

export type Cell = { x: number; y: number };
export type Robot = Cell & { direction: Direction };
export type Level = { size: number; start: Robot; goal: Cell; walls: readonly Cell[] };
export type Frame = { robot: Robot; outcome: Outcome };

/** El sentido de las agujas del reloj, para girar. */
const CLOCKWISE: Direction[] = [DIRECTION.up, DIRECTION.right, DIRECTION.down, DIRECTION.left];
const DELTA: Record<Direction, Cell> = {
	up: { x: 0, y: -1 },
	right: { x: 1, y: 0 },
	down: { x: 0, y: 1 },
	left: { x: -1, y: 0 }
};

const turn = (direction: Direction, by: 1 | -1): Direction =>
	CLOCKWISE[(CLOCKWISE.indexOf(direction) + by + CLOCKWISE.length) % CLOCKWISE.length];

const same = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;

/** Ejecuta una orden. Chocar con un muro o con el borde deja al robot donde estaba. */
export function step(level: Level, robot: Robot, command: RobotCommand): Frame {
	if (command === ROBOT_COMMAND.left) {
		return { robot: { ...robot, direction: turn(robot.direction, -1) }, outcome: OUTCOME.moving };
	}
	if (command === ROBOT_COMMAND.right) {
		return { robot: { ...robot, direction: turn(robot.direction, 1) }, outcome: OUTCOME.moving };
	}
	const delta = DELTA[robot.direction];
	const next = { ...robot, x: robot.x + delta.x, y: robot.y + delta.y };
	const outside = next.x < 0 || next.y < 0 || next.x >= level.size || next.y >= level.size;
	if (outside || level.walls.some((wall) => same(wall, next))) {
		return { robot, outcome: OUTCOME.crash };
	}
	return { robot: next, outcome: same(next, level.goal) ? OUTCOME.goal : OUTCOME.moving };
}

/**
 * Corre el programa completo y devuelve un cuadro por orden, para animarlo.
 * Se detiene al llegar o al chocar; si se acaban las órdenes antes, el último
 * cuadro queda marcado como corto.
 */
export function runProgram(level: Level, program: readonly RobotCommand[]): Frame[] {
	const frames: Frame[] = [];
	let robot = level.start;
	for (const command of program) {
		const frame = step(level, robot, command);
		frames.push(frame);
		if (frame.outcome !== OUTCOME.moving) return frames;
		robot = frame.robot;
	}
	frames.push({ robot, outcome: OUTCOME.short });
	return frames;
}
