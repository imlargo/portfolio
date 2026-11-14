<script lang="ts">
	import { File, Folder } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { FROM_SCRATCH_SECTIONS, partEyebrow } from '$lib/content/talks/from-scratch-1/meta';
	import { terminalPart } from '$lib/content/talks/from-scratch-1/terminal';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { paths } = terminalPart;
	const HOME = '~';
	const options = paths.files.map((file) => ({
		id: file.id,
		label: file.path.at(-1) ?? '',
		meta: file.path.slice(0, -1).join('/')
	}));

	/** El árbol a partir de las rutas: cada carpeta y archivo una vez, con su profundidad. */
	type TreeRow = { key: string; name: string; depth: number; isFile: boolean };
	const rows: TreeRow[] = [];
	for (const file of paths.files) {
		file.path.forEach((name, index) => {
			const key = file.path.slice(0, index + 1).join('/');
			if (rows.some((row) => row.key === key)) return;
			rows.push({ key, name, depth: index + 1, isFile: index === file.path.length - 1 });
		});
	}
	rows.sort((a, b) => a.key.localeCompare(b.key));

	let selectedId = $state<string>(paths.files[2].id);
	const selected = $derived(paths.files.find((file) => file.id === selectedId) ?? paths.files[0]);
	const onPath = (key: string) => {
		const path = selected.path.join('/');
		return path === key || path.startsWith(`${key}/`);
	};
</script>

<!-- El árbol de la carpeta personal con el camino del archivo elegido
     encendido, y abajo la misma dirección escrita de dos formas. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(FROM_SCRATCH_SECTIONS.terminal)}
			title={paths.title}
			description={paths.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage>
				{#snippet aside()}
					<OptionList title={paths.treeLabel} {options} bind:selected={selectedId} mono />
				{/snippet}

				<ul class="flex flex-col gap-y-1 font-mono text-sm">
					<li class="flex items-center gap-x-2 text-brand">
						<Folder class="size-4" />
						{HOME}
					</li>
					{#each rows as row (row.key)}
						{@const lit = onPath(row.key)}
						<li
							style:padding-left="{row.depth * 1.5}rem"
							class={cn(
								'flex items-center gap-x-2 transition-colors duration-500',
								lit ? 'text-foreground' : 'text-muted-foreground/60'
							)}
						>
							{#if row.isFile}
								<File class={cn('size-4', lit && 'text-brand')} />
							{:else}
								<Folder class={cn('size-4', lit && 'text-brand')} />
							{/if}
							{row.name}
						</li>
					{/each}
				</ul>

				{#snippet footer()}
					<div class="flex flex-col divide-y">
						<dl class="grid grid-cols-1 divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
							<div class="flex flex-col gap-y-1 px-6 py-3 md:px-8">
								<dt class="text-xs text-muted-foreground">{paths.fullLabel}</dt>
								<dd class="font-mono text-sm break-all">
									{[paths.home, ...selected.path].join('/')}
								</dd>
							</div>
							<div class="flex flex-col gap-y-1 px-6 py-3 md:px-8">
								<dt class="text-xs text-muted-foreground">{paths.shortLabel}</dt>
								<dd class="font-mono text-sm text-brand">{[HOME, ...selected.path].join('/')}</dd>
							</div>
						</dl>
						<p class="px-6 py-3 text-sm text-pretty text-muted-foreground md:px-8">{paths.note}</p>
					</div>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
