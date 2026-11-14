<script lang="ts">
	import { Play, RotateCcw } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { programmingPart } from '$lib/content/talks/from-scratch-1/programming';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { firstProgram } = programmingPart;
	/** Marca los mensajes del iframe, para no confundirlos con otros del navegador. */
	const CHANNEL = 'deck-runner';
	const LINE = { log: 'log', error: 'error' } as const;
	type LineKind = (typeof LINE)[keyof typeof LINE];

	let code = $state<string>(firstProgram.code);
	let output = $state<{ kind: LineKind; text: string }[]>([]);
	let run = $state(0);
	let frame: HTMLIFrameElement | undefined = $state();

	// El código corre en un iframe aislado (sin acceso a esta página) y devuelve
	// lo que imprime por `postMessage`. Las etiquetas van armadas para que el
	// compilador no las tome como el final del script de este componente.
	const SCRIPT = 'script';
	const srcdoc = $derived.by(() => {
		if (run === 0) return '';
		const safe = code.replaceAll('</', '<\\/');
		return `<!doctype html><${SCRIPT}>
const send = (kind, text) => parent.postMessage({ channel: '${CHANNEL}', run: ${run}, kind, text }, '*');
const show = (value) => (typeof value === 'string' ? value : JSON.stringify(value));
console.log = (...values) => send('${LINE.log}', values.map(show).join(' '));
window.onerror = (message) => send('${LINE.error}', String(message));
</${SCRIPT}><${SCRIPT}>${safe}</${SCRIPT}>`;
	});

	function execute() {
		output = [];
		run += 1;
	}

	function restore() {
		code = firstProgram.code;
		output = [];
	}

	$effect(() => {
		const receive = (event: MessageEvent) => {
			const data = event.data as { channel?: string; run?: number; kind?: LineKind; text?: string };
			if (event.source !== frame?.contentWindow || data?.channel !== CHANNEL || data.run !== run)
				return;
			if (!data.kind || typeof data.text !== 'string') return;
			output = [...output, { kind: data.kind, text: data.text }];
		};
		window.addEventListener('message', receive);
		return () => window.removeEventListener('message', receive);
	});
</script>

<!-- Un editor y una consola: el primer programa que se escribe, se corre y se
     rompe a propósito para ver un error de verdad. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.programming)}
			title={firstProgram.title}
			description={firstProgram.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="p-0 md:p-0">
				<div class="grid flex-1 grid-cols-1 lg:grid-cols-2">
					<div class="flex flex-col border-b lg:border-r lg:border-b-0">
						<div class="flex items-center justify-between border-b px-4 py-2">
							<label for="first-program" class="font-mono text-xs text-muted-foreground">
								{firstProgram.editorLabel}
							</label>
							<div class="flex gap-1">
								<Button variant="ghost" size="sm" onclick={restore}>
									<RotateCcw />
									{firstProgram.resetLabel}
								</Button>
								<Button size="sm" onclick={execute}>
									<Play />
									{firstProgram.runLabel}
								</Button>
							</div>
						</div>
						<textarea
							id="first-program"
							bind:value={code}
							spellcheck="false"
							autocapitalize="off"
							class="min-h-80 flex-1 resize-none border-0 bg-transparent p-5 font-mono text-sm leading-relaxed outline-none focus:ring-0"
						></textarea>
					</div>

					<div class="flex flex-col bg-neutral-950 font-mono text-sm">
						<span class="border-b border-white/10 px-4 py-3 text-xs text-neutral-500">
							{firstProgram.consoleLabel}
						</span>
						<div class="flex flex-1 flex-col gap-y-1 p-5" aria-live="polite">
							{#each output as line, index (index)}
								<p
									class={cn(
										'break-words whitespace-pre-wrap',
										line.kind === LINE.error ? 'text-destructive' : 'text-neutral-200'
									)}
								>
									{line.kind === LINE.error
										? `${firstProgram.errorPrefix}: ${line.text}`
										: line.text}
								</p>
							{:else}
								<p class="text-neutral-500">{firstProgram.emptyConsole}</p>
							{/each}
						</div>
					</div>
				</div>
				<iframe
					bind:this={frame}
					title={firstProgram.consoleLabel}
					sandbox="allow-scripts"
					{srcdoc}
					class="hidden"
				></iframe>
			</Stage>
		</div>
	</div>
</DeckSlide>
