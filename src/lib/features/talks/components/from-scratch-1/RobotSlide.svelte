<script lang="ts">
	import { ArrowUp, Flag, Play, RotateCcw, RotateCw, Undo2, Trash2 } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import {
		DIRECTION,
		OUTCOME,
		ROBOT_COMMAND,
		runProgram,
		type Direction,
		type Outcome,
		type Robot,
		type RobotCommand
	} from '$lib/features/talks/from-scratch-1/robot';
	import { prefersReducedMotion } from '$lib/gsap';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { robot: copy } = programmingPart;
	const STEP_MS = 450;
	const ROTATION: Record<Direction, number> = {
		[DIRECTION.up]: 0,
		[DIRECTION.right]: 90,
		[DIRECTION.down]: 180,
		[DIRECTION.left]: 270
	};
	const ICON = {
		[ROBOT_COMMAND.forward]: ArrowUp,
		[ROBOT_COMMAND.left]: RotateCcw,
		[ROBOT_COMMAND.right]: RotateCw
	} satisfies Record<RobotCommand, unknown>;
	const COMMANDS = Object.values(ROBOT_COMMAND);

	let levelIndex = $state(0);
	const level = $derived(copy.levels[levelIndex].level);
	let program = $state<RobotCommand[]>([]);
	let robot = $state<Robot>(copy.levels[0].level.start);
	let outcome = $state<Outcome | null>(null);
	/** Qué orden se está ejecutando, para resaltarla en la lista. */
	let current = $state<number | null>(null);
	let running = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const cells = $derived(
		Array.from({ length: level.size * level.size }, (_, index) => ({
			x: index % level.size,
			y: Math.floor(index / level.size)
		}))
	);
	const isWall = (x: number, y: number) => level.walls.some((wall) => wall.x === x && wall.y === y);

	function stop() {
		clearTimeout(timer);
		running = false;
	}

	function reset() {
		stop();
		robot = level.start;
		outcome = null;
		current = null;
	}

	function pickLevel(index: number) {
		levelIndex = index;
		program = [];
		reset();
	}

	function edit(change: () => void) {
		reset();
		change();
	}

	function run() {
		reset();
		const frames = runProgram(level, program);
		running = true;
		const delay = prefersReducedMotion() ? 0 : STEP_MS;
		const play = (index: number) => {
			const frame = frames[index];
			robot = frame.robot;
			current = Math.min(index, program.length - 1);
			if (index === frames.length - 1) {
				outcome = frame.outcome;
				running = false;
				return;
			}
			timer = setTimeout(() => play(index + 1), delay);
		};
		timer = setTimeout(() => play(0), delay);
	}

	$effect(() => () => clearTimeout(timer));

	const status = $derived(
		outcome ? copy.outcomes[outcome] : running ? copy.outcomes.moving : copy.idle
	);
</script>

<!-- Programar en su forma más pequeña: tres órdenes, una cuadrícula y un robot
     que hace exactamente lo que dice la lista. Si choca, la orden que falló
     queda marcada: el primer bug. -->
<DeckSlide id={FROM_SCRATCH_SECTIONS.programming}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={copy.title}
			description={copy.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="items-center justify-center">
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<div class="flex items-center justify-between border-b px-5 py-3">
							<span class="font-mono text-xs text-muted-foreground">{copy.commandsLabel}</span>
							<span class="flex items-center gap-1">
								<span class="mr-1 text-xs text-muted-foreground">{copy.levelLabel}</span>
								{#each copy.levels as item, index (item.id)}
									<button
										type="button"
										aria-pressed={index === levelIndex}
										onclick={() => pickLevel(index)}
										class={cn(
											'size-6 rounded-md font-mono text-xs transition-colors',
											index === levelIndex
												? 'bg-foreground text-background'
												: 'text-muted-foreground hover:text-foreground'
										)}
									>
										{item.label}
									</button>
								{/each}
							</span>
						</div>
						<div class="flex flex-col gap-2 p-5">
							{#each COMMANDS as command (command)}
								{@const Icon = ICON[command]}
								<Button
									variant="outline"
									class="justify-start"
									disabled={program.length >= copy.maxCommands}
									onclick={() => edit(() => program.push(command))}
								>
									<Icon />
									{copy.commands[command]}
								</Button>
							{/each}
						</div>
						<div class="flex flex-1 flex-col gap-y-3 border-t p-5">
							<span class="flex items-center justify-between text-xs text-muted-foreground">
								<span>{copy.programLabel}</span>
								<span class="font-mono tabular-nums">{program.length}/{copy.maxCommands}</span>
							</span>
							{#if program.length === 0}
								<p class="text-sm text-muted-foreground">{copy.emptyProgram}</p>
							{:else}
								<ol class="flex flex-wrap gap-1">
									{#each program as command, index (index)}
										{@const Icon = ICON[command]}
										<li
											class={cn(
												'grid size-7 place-items-center rounded-md border transition-colors duration-200',
												current === index && 'border-brand bg-brand/20 text-brand',
												current === index &&
													outcome === OUTCOME.crash &&
													'border-destructive bg-destructive/20 text-destructive'
											)}
											title={copy.commands[command]}
										>
											<Icon class="size-3.5" />
										</li>
									{/each}
								</ol>
							{/if}
							<div class="mt-auto flex flex-wrap gap-2">
								<Button onclick={run} disabled={program.length === 0 || running}>
									<Play />
									{copy.runLabel}
								</Button>
								<Button
									variant="ghost"
									size="icon"
									aria-label={copy.undoLabel}
									disabled={program.length === 0}
									onclick={() => edit(() => program.pop())}
								>
									<Undo2 />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									aria-label={copy.clearLabel}
									disabled={program.length === 0}
									onclick={() => edit(() => (program = []))}
								>
									<Trash2 />
								</Button>
							</div>
						</div>
					</div>
				{/snippet}

				<div
					class="grid aspect-square w-full max-w-sm gap-1.5"
					style:grid-template-columns="repeat({level.size}, minmax(0, 1fr))"
				>
					{#each cells as cell (`${cell.x}-${cell.y}`)}
						{@const wall = isWall(cell.x, cell.y)}
						{@const goal = cell.x === level.goal.x && cell.y === level.goal.y}
						{@const here = cell.x === robot.x && cell.y === robot.y}
						<div
							class={cn(
								'relative grid place-items-center rounded-lg border',
								wall ? 'border-transparent bg-muted-foreground/30' : 'bg-background',
								goal && 'border-brand/60'
							)}
						>
							{#if goal}
								<Flag
									class={cn('size-4', outcome === OUTCOME.goal ? 'text-brand' : 'text-brand/60')}
								/>
							{/if}
							{#if here}
								<span
									class={cn(
										'absolute inset-1 grid place-items-center rounded-md transition-[rotate] duration-300',
										outcome === OUTCOME.crash
											? 'bg-destructive text-background'
											: 'bg-brand text-background'
									)}
									style:rotate="{ROTATION[robot.direction]}deg"
								>
									<ArrowUp class="size-5" />
								</span>
							{/if}
						</div>
					{/each}
				</div>

				{#snippet footer()}
					<p
						class={cn(
							'px-6 py-4 text-sm text-pretty md:px-8',
							outcome === OUTCOME.goal && 'text-brand',
							outcome === OUTCOME.crash && 'text-destructive',
							!outcome && 'text-muted-foreground'
						)}
						aria-live="polite"
					>
						{status}
					</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
