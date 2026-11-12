<script lang="ts">
	import { Minus, Plus, ShoppingBag } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch';
	import DeckSlide from '$lib/features/deck/components/DeckSlide.svelte';
	import SlideHeader from '$lib/features/deck/components/SlideHeader.svelte';
	import Stage from '$lib/features/deck/components/Stage.svelte';
	import { WEB_INTRO_SECTIONS, partEyebrow } from '$lib/content/talks/web-intro/meta';
	import { componentsPart } from '$lib/content/talks/web-intro/components';
	import { useReveal } from '$lib/attachments/reveal';

	const { reactivity } = componentsPart;
	const MAX_CART = 9;

	let signedIn = $state(true);
	let cart = $state(2);

	// El estado tal como lo vería el código: es lo único que se toca.
	const stateText = $derived(
		JSON.stringify(
			{
				[reactivity.stateKeys.user]: signedIn ? reactivity.userName : null,
				[reactivity.stateKeys.cart]: cart
			},
			null,
			2
		)
	);
</script>

<!-- A la izquierda se cambia el estado y se ve como dato; a la derecha la
     interfaz que sale de ese estado. Nunca se toca la interfaz directamente,
     que es justo la idea. -->
<DeckSlide id={WEB_INTRO_SECTIONS.components}>
	<div class="flex flex-col gap-y-10">
		<SlideHeader
			eyebrow={partEyebrow(WEB_INTRO_SECTIONS.components)}
			title={reactivity.title}
			description={reactivity.description}
		/>

		<div {@attach useReveal({ y: 24, delay: 0.15 })}>
			<Stage stageClass="items-center justify-center">
				{#snippet aside()}
					<div class="flex flex-1 flex-col">
						<span class="border-b px-5 py-3 font-mono text-xs text-muted-foreground">
							{reactivity.stateLabel}
						</span>
						<div class="flex flex-col divide-y">
							<label class="flex items-center justify-between gap-x-3 px-5 py-4">
								<span>{reactivity.sessionLabel}</span>
								<Switch bind:checked={signedIn} />
							</label>
							<div class="flex items-center justify-between gap-x-3 px-5 py-4">
								<span>{reactivity.cartLabel}</span>
								<span class="flex items-center gap-x-2">
									<Button
										variant="outline"
										size="icon-xs"
										aria-label={reactivity.decreaseLabel}
										disabled={cart === 0}
										onclick={() => (cart -= 1)}
									>
										<Minus />
									</Button>
									<span class="w-4 text-center font-mono tabular-nums">{cart}</span>
									<Button
										variant="outline"
										size="icon-xs"
										aria-label={reactivity.increaseLabel}
										disabled={cart === MAX_CART}
										onclick={() => (cart += 1)}
									>
										<Plus />
									</Button>
								</span>
							</div>
						</div>
						<pre
							class="mt-auto border-t bg-muted/30 px-5 py-4 font-mono text-sm leading-relaxed text-muted-foreground"><code
								>{stateText}</code
							></pre>
					</div>
				{/snippet}

				<span
					class="mb-6 rounded-full border bg-background px-4 py-1.5 font-mono text-sm text-brand"
				>
					{reactivity.formula}
				</span>

				<!-- La interfaz de ejemplo: una tienda mínima que se arma solo con el estado. -->
				<div class="w-full max-w-md overflow-hidden rounded-2xl border bg-background shadow-xl">
					<div class="flex items-center justify-between border-b px-5 py-3">
						<span class="font-mono text-sm">{reactivity.storeName}</span>
						<span class="flex items-center gap-x-3">
							{#if signedIn}
								<span class="animate-in text-sm duration-300 fade-in">
									{reactivity.greeting(reactivity.userName)}
								</span>
							{:else}
								<Button size="xs" class="animate-in duration-300 fade-in"
									>{reactivity.signIn}</Button
								>
							{/if}
							<span class="relative">
								<ShoppingBag class="size-5" />
								{#if cart > 0}
									<span
										class="absolute -top-1.5 -right-2 grid size-4 animate-in place-items-center rounded-full bg-brand font-mono text-[10px] text-background duration-300 zoom-in"
									>
										{cart}
									</span>
								{/if}
							</span>
						</span>
					</div>
					<div class="flex flex-col gap-y-4 p-5">
						<p class="text-muted-foreground">
							{cart === 0 ? reactivity.emptyCart : reactivity.cartSummary(cart)}
						</p>
						<Button disabled={cart === 0 || !signedIn} class="w-full">{reactivity.checkout}</Button>
					</div>
				</div>

				{#snippet footer()}
					<p class="px-6 py-4 text-sm text-muted-foreground md:px-8">{reactivity.note}</p>
				{/snippet}
			</Stage>
		</div>
	</div>
</DeckSlide>
