<script lang="ts">
	import { tick } from 'svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { Shell } from '$lib/features/talks/from-scratch-1/shell';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { terminalPart } from '$lib/content/talks/from-scratch-1/terminal';
	import { useReveal } from '$lib/attachments/reveal';

	const { terminal } = terminalPart;
	const shell = new Shell();

	type Line = { id: number; prompt?: string; text: string };

	let lines = $state<Line[]>([{ id: 0, text: terminal.welcome }]);
	let input = $state('');
	let location = $state(shell.location);
	let nextId = 1;
	let screen: HTMLDivElement | undefined = $state();

	const prompt = (where: string) => `${terminal.user} ${where} %`;

	async function run(command: string) {
		const result = shell.run(command);
		const echoed: Line = { id: nextId++, prompt: prompt(location), text: command };
		lines = result.clear
			? []
			: [...lines, echoed, ...result.output.map((text) => ({ id: nextId++, text }))];
		location = shell.location;
		input = '';
		await tick();
		screen?.scrollTo({ top: screen.scrollHeight });
	}

	function submit(event: SubmitEvent) {
		event.preventDefault();
		run(input);
	}
</script>

<!-- Una terminal de verdad en lo que hace, de juguete en lo que toca: se escribe
     o se elige un comando de la izquierda, y el resultado queda en pantalla. -->
<DeckSlide id={FROM_SCRATCH_SECTIONS.terminal}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.terminal)}
			title={terminal.title}
			description={terminal.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="p-0 md:p-0">
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">
							{terminal.commandsLabel}
						</span>
						<div class="flex flex-col divide-y">
							{#each terminal.commands as command (command.id)}
								<button
									type="button"
									onclick={() => run(command.example)}
									class="flex items-baseline justify-between gap-x-3 px-5 py-2.5 text-left transition-colors duration-300 hover:bg-muted/40"
								>
									<span class="font-mono text-sm">{command.id}</span>
									<span class="text-right text-xs text-muted-foreground">{command.what}</span>
								</button>
							{/each}
						</div>
					</div>
				{/snippet}

				<div
					class="flex min-h-80 flex-1 flex-col bg-neutral-950 font-mono text-sm text-neutral-200"
				>
					<div class="flex gap-1.5 border-b border-white/10 px-4 py-3" aria-hidden="true">
						<span class="size-2.5 rounded-full bg-white/20"></span>
						<span class="size-2.5 rounded-full bg-white/20"></span>
						<span class="size-2.5 rounded-full bg-white/20"></span>
					</div>
					<div
						bind:this={screen}
						class="flex max-h-72 flex-1 flex-col gap-y-1 overflow-y-auto px-5 py-4"
						aria-live="polite"
					>
						{#each lines as line (line.id)}
							<p class="break-words whitespace-pre-wrap">
								{#if line.prompt}<span class="mr-2 text-brand">{line.prompt}</span>{/if}{line.text}
							</p>
						{/each}
						<form onsubmit={submit} class="flex items-center gap-x-2">
							<label for="terminal-input" class="shrink-0 text-brand">{prompt(location)}</label>
							<input
								id="terminal-input"
								bind:value={input}
								autocomplete="off"
								autocapitalize="off"
								spellcheck="false"
								placeholder={terminal.placeholder}
								aria-label={terminal.inputLabel}
								class="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-sm outline-none placeholder:text-neutral-600 focus:ring-0"
							/>
						</form>
					</div>
				</div>
			</Stage>
		</div>
	</div>
</DeckSlide>
