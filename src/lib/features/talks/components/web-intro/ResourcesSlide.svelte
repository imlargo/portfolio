<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { pathPart } from '$lib/content/talks/web-intro/path';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { resources } = pathPart;
	const topics = [...new Set(resources.items.map((item) => item.topic))];

	let topic = $state<string | null>(null);
	const visible = $derived(
		topic ? resources.items.filter((item) => item.topic === topic) : resources.items
	);
</script>

{#snippet filter(label: string, value: string | null)}
	<button
		type="button"
		aria-pressed={topic === value}
		onclick={() => (topic = value)}
		class={cn(
			'rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-300',
			topic === value
				? 'border-border bg-muted text-foreground'
				: 'border-transparent text-muted-foreground hover:text-foreground'
		)}
	>
		{label}
	</button>
{/snippet}

<!-- Los recursos como una retícula de enlaces, filtrable por tema con las
     mismas píldoras del blog. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.project)}
			title={resources.title}
			description={resources.description}
		/>

		<div class="flex flex-col gap-y-6" {@attach useReveal({ y: 24, delay: 0.15 })}>
			<div class="flex flex-wrap gap-2">
				{@render filter(resources.allLabel, null)}
				{#each topics as item (item)}
					{@render filter(item, item)}
				{/each}
			</div>

			<ul
				class="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border bg-border sm:grid-cols-2 lg:grid-cols-3"
			>
				{#each visible as item (item.href)}
					<li class="flex animate-in bg-background duration-500 fade-in">
						<a
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							class="group flex w-full flex-col gap-y-1.5 p-4 transition-colors duration-300 hover:bg-muted/50"
						>
							<span class="flex items-start justify-between gap-x-3">
								<span class="text-lg">{item.title}</span>
								<ArrowUpRight
									class="size-4 shrink-0 text-muted-foreground transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
								/>
							</span>
							<span class="text-sm text-pretty text-muted-foreground">{item.what}</span>
							<span class="mt-auto pt-2 font-mono text-xs text-muted-foreground">{item.topic}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</DeckSlide>
