import { describe, expect, it } from 'vitest';
import { DIRECTION, OUTCOME, ROBOT_COMMAND, runProgram, type Level } from './robot';

const { forward: F, left: L, right: R } = ROBOT_COMMAND;

const level: Level = {
	size: 3,
	start: { x: 0, y: 2, direction: DIRECTION.up },
	goal: { x: 2, y: 0 },
	walls: [{ x: 1, y: 1 }]
};

describe('runProgram', () => {
	it('reaches the goal and stops there', () => {
		const frames = runProgram(level, [F, F, R, F, F, F]);
		expect(frames.at(-1)).toEqual({
			robot: { x: 2, y: 0, direction: DIRECTION.right },
			outcome: OUTCOME.goal
		});
		expect(frames).toHaveLength(5);
	});

	it('stops when it hits a wall or the edge', () => {
		expect(runProgram(level, [F, R, F]).at(-1)?.outcome).toBe(OUTCOME.crash);
		expect(runProgram(level, [L, F]).at(-1)?.outcome).toBe(OUTCOME.crash);
	});

	it('marks a program that ends before the goal as short', () => {
		const frames = runProgram(level, [F]);
		expect(frames.at(-1)).toEqual({
			robot: { x: 0, y: 1, direction: DIRECTION.up },
			outcome: OUTCOME.short
		});
	});
});
