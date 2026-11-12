<script lang="ts">
	import { ShoppingBag } from '@lucide/svelte';
	import DeckChip from '$lib/features/deck/components/DeckChip.svelte';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import OptionList from '$lib/features/deck/components/OptionList.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import {
		SHOP_COMPONENT,
		componentsPart,
		type ShopComponent
	} from '$lib/content/talks/web-intro/components';
	import { useReveal } from '$lib/attachments/reveal';
	import { cn } from '$lib/utils';

	const { components } = componentsPart;
	const options = components.items.map((item) => ({
		id: item.id,
		label: item.id,
		depth: item.depth
	}));

	let selectedId = $state<string>(SHOP_COMPONENT.card);
	const selected = $derived(
		components.items.find((item) => item.id === selectedId) ?? components.items[0]
	);

	/** Marca con un contorno cada lugar donde aparece el componente elegido. */
	const frame = (id: ShopComponent) =>
		cn(
			'relative rounded-xl outline-2 outline-offset-2 transition-[outline-color] duration-300',
			selectedId === id ? 'outline-brand' : 'outline-transparent'
		);
</script>

{#snippet tag(id: ShopComponent)}
	{#if selectedId === id}
		<span
			class="absolute -top-2.5 left-2 z-10 animate-in rounded-md bg-brand px-1.5 font-mono text-[10px] leading-4 text-background duration-300 fade-in"
		>
			{id}
		</span>
	{/if}
{/snippet}

<!-- El árbol de componentes a la izquierda y la tienda a la derecha: al elegir
     una pieza se marca cada lugar donde aparece, así se ve que la misma tarjeta
     se usa tres veces. Al pie, qué recibe y qué avisa. -->
<DeckSlide>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.components)}
			title={components.title}
			description={components.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="justify-center">
				{#snippet aside()}
					<OptionList title={components.treeLabel} {options} bind:selected={selectedId} mono>
						{#snippet footer()}
							<p class="text-sm text-pretty text-muted-foreground">{components.rule}</p>
						{/snippet}
					</OptionList>
				{/snippet}

				<div class={cn(frame(SHOP_COMPONENT.app), 'rounded-2xl border bg-background')}>
					{@render tag(SHOP_COMPONENT.app)}
					<div
						class={cn(
							frame(SHOP_COMPONENT.navbar),
							'm-3 flex items-center justify-between border px-4 py-3'
						)}
					>
						{@render tag(SHOP_COMPONENT.navbar)}
						<span class="font-mono text-sm">{components.storeName}</span>
						<span
							class={cn(frame(SHOP_COMPONENT.cart), 'flex items-center gap-x-1.5 px-1.5 py-0.5')}
						>
							{@render tag(SHOP_COMPONENT.cart)}
							<ShoppingBag class="size-4" />
							<span class="font-mono text-xs">{components.cartCount}</span>
						</span>
					</div>
					<div
						class={cn(frame(SHOP_COMPONENT.grid), 'm-3 grid grid-cols-1 gap-3 p-1 sm:grid-cols-3')}
					>
						{@render tag(SHOP_COMPONENT.grid)}
						{#each components.products as product (product.name)}
							<div class={cn(frame(SHOP_COMPONENT.card), 'flex flex-col gap-y-3 border p-4')}>
								{@render tag(SHOP_COMPONENT.card)}
								<span class="aspect-video rounded-lg bg-muted"></span>
								<span class="flex flex-col">
									<span class="text-sm">{product.name}</span>
									<span class="font-mono text-xs text-muted-foreground">{product.price}</span>
								</span>
								<span
									class={cn(
										frame(SHOP_COMPONENT.button),
										'rounded-lg bg-foreground py-1.5 text-center text-xs text-background'
									)}
								>
									{@render tag(SHOP_COMPONENT.button)}
									{components.addLabel}
								</span>
							</div>
						{/each}
					</div>
				</div>

				{#snippet footer()}
					{#key selected.id}
						<div
							class="grid animate-in grid-cols-1 gap-4 px-6 py-5 duration-500 fade-in md:grid-cols-12 md:px-8"
						>
							<p class="text-pretty md:col-span-6">{selected.what}</p>
							<dl class="flex flex-col gap-y-2 text-sm md:col-span-6">
								<div class="flex flex-wrap items-center gap-2">
									<dt class="w-14 text-muted-foreground">{components.receivesLabel}</dt>
									{#each selected.receives as item (item)}
										<dd><DeckChip class="text-foreground">{item}</DeckChip></dd>
									{:else}
										<dd class="text-muted-foreground">{components.noneLabel}</dd>
									{/each}
								</div>
								<div class="flex flex-wrap items-center gap-2">
									<dt class="w-14 text-muted-foreground">{components.emitsLabel}</dt>
									{#each selected.emits as item (item)}
										<dd><DeckChip class="border-brand/50 text-brand">{item}</DeckChip></dd>
									{:else}
										<dd class="text-muted-foreground">{components.noneLabel}</dd>
									{/each}
								</div>
							</dl>
						</div>
					{/key}
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
