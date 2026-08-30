<script lang="ts">
	import { siteContent } from '$lib/content/site-content';
	import { useHyperText } from '$lib/attachments/text-encrypt';
	import { useReveal } from '$lib/attachments/reveal';
	import { useParallax } from '$lib/attachments/parallax';
	import { ArrowUpRight } from '@lucide/svelte';

	const { footer, name } = siteContent;
</script>

{#snippet LinkItem(label: string, href: string, external: boolean = false)}
	<a
		class="flex w-full items-center gap-x-2 text-muted-foreground hover:text-primary"
		{href}
		target={external ? '_blank' : '_self'}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		<span>{label}</span>
		{#if external || href.startsWith('http')}
			<ArrowUpRight class="size-4" />
		{/if}
	</a>
{/snippet}

<div class="overflow-hidden pt-18 md:pt-28 lg:pt-56">
	<div class="relative bg-background">
		<!-- El handle enorme detrás del footer, con parallax: el mismo recurso que
		     cierra Kora, pero acá la palabra es el nombre y va en mono. -->
		<div
			class="absolute -top-20 -z-20 flex w-full items-center justify-center md:-top-35 lg:-top-60"
		>
			<p
				class="line-clamp-none align-bottom font-mono text-[8rem] leading-none font-extrabold tracking-wider text-secondary/50 md:text-[14rem] lg:text-[24rem]"
				aria-hidden="true"
				{@attach useParallax(60)}
			>
				{name}
			</p>
		</div>

		<div class="z-10">
			<div class="flex items-center justify-center">
				<div class="footer-gradient h-px w-full border-none"></div>
			</div>

			<footer
				class="px-layout flex w-full flex-col gap-y-6 bg-secondary/25 py-12"
				{@attach useReveal({ targets: '.footer-item', stagger: 0.1, y: 24 })}
			>
				<div class="footer-item flex flex-col gap-y-8 md:flex-row md:justify-between">
					<div class="space-y-2">
						<p class="font-mono text-4xl font-bold" data-value={name} {@attach useHyperText}>
							{name}
						</p>
						<p class="max-w-sm text-muted-foreground">{footer.subtitle}</p>
					</div>

					<nav
						class="flex flex-col gap-x-24 gap-y-12 md:flex-row md:justify-end"
						aria-label="Footer"
					>
						{#each footer.linkGroups as group (group.title)}
							<div class="flex flex-col gap-y-4">
								<h3 class="font-semibold">{group.title}</h3>
								<ul class="flex flex-col gap-y-1.5">
									{#each group.links as link (link.href)}
										<li>{@render LinkItem(link.label, link.href, link.external)}</li>
									{/each}
								</ul>
							</div>
						{/each}
					</nav>
				</div>

				<div class="footer-item mt-8 flex items-center justify-between">
					<span class="hidden font-mono text-sm text-muted-foreground md:inline-flex">
						{footer.credits}
					</span>
				</div>
			</footer>
		</div>
	</div>
</div>

<style>
	.footer-gradient {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.25) 50%,
			rgba(255, 255, 255, 0) 100%
		);
	}
</style>
