<script lang="ts">
	import { RotateCcw } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { DOM_ACTION, browserPart, type DomAction } from '$lib/content/talks/web-intro/browser';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { dom } = browserPart;
	/** El nodo que cambió con la última acción, para resaltarlo en el árbol. */
	const TITLE_NODE = 'title';

	let title = $state<string>(dom.initialTitle);
	let items = $state<string[]>([...dom.initialItems]);
	let added = $state(0);
	let code = $state<string>(dom.idleCode);
	let changed = $state<string | null>(null);

	function run(action: DomAction) {
		if (action === DOM_ACTION.add) {
			added += 1;
			const text = dom.itemLabel(dom.initialItems.length + added);
			items.push(text);
			code = dom.code[action](text);
			changed = text;
		} else if (action === DOM_ACTION.rename) {
			title = title === dom.initialTitle ? dom.renamedTitle : dom.initialTitle;
			code = dom.code[action](title);
			changed = TITLE_NODE;
		} else if (items.length > 0) {
			items.pop();
			code = dom.code[action]();
			changed = null;
		}
	}

	function reset() {
		title = dom.initialTitle;
		items = [...dom.initialItems];
		added = 0;
		code = dom.idleCode;
		changed = null;
	}
</script>

{#snippet node(tag: string, text: string | null, depth: number, highlighted = false)}
	<li
		style:padding-left="{depth * 1.25}rem"
		class={cn(
			'flex items-baseline gap-x-2 rounded-md py-0.5 transition-colors duration-700',
			highlighted && 'bg-brand/15'
		)}
	>
		<span class="text-brand">&lt;{tag}&gt;</span>
		{#if text}<span class="truncate text-muted-foreground">{text}</span>{/if}
	</li>
{/snippet}

<!-- Tres botones que ejecutan JavaScript de verdad sobre un estado: a la
     izquierda del escenario el árbol, a la derecha la pantalla, y al pie la
     línea que se ejecutó. El nodo que cambió se ilumina en el árbol. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.browser)}
			title={dom.title}
			description={dom.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">
							{dom.actionsLabel}
						</span>
						<div class="flex flex-col gap-2 p-5">
							{#each dom.actions as action (action.id)}
								<Button variant="outline" class="justify-start" onclick={() => run(action.id)}>
									{action.label}
								</Button>
							{/each}
						</div>
						<div class="mt-auto border-t p-5">
							<Button variant="ghost" size="sm" onclick={reset}>
								<RotateCcw />
								{dom.resetLabel}
							</Button>
						</div>
					</div>
				{/snippet}

				<div class="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
					<div class="flex flex-col gap-y-3">
						<span class="text-sm text-muted-foreground">{dom.treeLabel}</span>
						<ul class="flex flex-col font-mono text-sm">
							{@render node('body', null, 0)}
							{@render node('h1', title, 1, changed === TITLE_NODE)}
							{@render node('ul', null, 1)}
							{#each items as item (item)}
								{@render node('li', item, 2, changed === item)}
							{/each}
						</ul>
					</div>

					<div class="flex flex-col gap-y-3">
						<span class="text-sm text-muted-foreground">{dom.screenLabel}</span>
						<div class="flex flex-1 flex-col overflow-hidden rounded-2xl border bg-background">
							<div class="flex gap-1.5 border-b px-4 py-3" aria-hidden="true">
								<span class="size-2 rounded-full bg-muted-foreground/30"></span>
								<span class="size-2 rounded-full bg-muted-foreground/30"></span>
								<span class="size-2 rounded-full bg-muted-foreground/30"></span>
							</div>
							<div class="flex flex-col gap-y-3 p-5">
								<p class="text-2xl">{title}</p>
								<ul class="flex list-disc flex-col gap-y-1 pl-5 text-muted-foreground">
									{#each items as item (item)}
										<li class="animate-in duration-500 fade-in slide-in-from-left-2">{item}</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{#snippet footer()}
					<div class="flex flex-col gap-y-2 px-6 py-4 md:px-8">
						<span class="text-xs text-muted-foreground">{dom.codeLabel}</span>
						{#key code}
							<pre class="animate-in font-mono text-sm leading-relaxed duration-500 fade-in"><code
									>{code}</code
								></pre>
						{/key}
					</div>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
