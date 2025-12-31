<script lang="ts">
	import { useHyperText } from '$lib/attachments/text-encrypt';
	import { ArrowUpRight } from '@lucide/svelte';

	interface Link {
		label: string;
		href: string;
		external?: boolean;
	}

	interface LinkGroup {
		title: string;
		links: Link[];
	}

	const links = $derived<LinkGroup[]>([
		{
			title: 'Navegacion',
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' },
				{ label: 'Work', href: '/work' },
				{ label: 'Blog', href: '/blog' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'GitHub', href: 'https://github.com/imlargo', external: true },
				{ label: 'Linkedin', href: 'https://github.com/imlargo', external: true }
			]
		}
	]);
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
		<div
			class="absolute -top-20 -z-20 flex w-full items-center justify-center md:-top-35 lg:-top-60"
		>
			<h1
				class="line-clamp-none align-bottom text-[8rem] leading-none font-extrabold tracking-wider text-secondary/50 md:text-[14rem] lg:text-[24rem]"
			>
				imlargo
			</h1>
		</div>

		<div class="z-10">
			<div class="flex items-center justify-center">
				<div class="footer-gradient h-[1px] w-full border-none"></div>
			</div>

			<footer
				class="flex w-full flex-col gap-y-6 bg-secondary/25 px-6 py-12 lg:px-12 xl:px-24 2xl:px-72"
			>
				<div class="flex flex-col gap-y-8 md:flex-row md:justify-between">
					<div class="space-y-2">
						<h2 class="font-mono text-4xl font-bold" data-value="imlargo" {@attach useHyperText}>
							imlargo
						</h2>
						<p class="text-muted-foreground">Ingeniero de Software Full Stack.</p>
					</div>

					<div class="flex flex-col gap-x-24 gap-y-12 md:flex-row md:justify-end">
						{#each links as group}
							<div class="flex flex-col gap-y-4">
								<h3 class="font-semibold">{group.title}</h3>
								<div class="flex flex-col gap-y-1.5">
									{#each group.links as link}
										{@render LinkItem(link.label, link.href, link.external)}
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-8 flex items-center justify-between">
					<span class="hidden font-mono text-sm text-muted-foreground md:inline-flex"
						>© 2025 imlargo. All rights reserved</span
					>

					<!--
					<div class="flex items-center gap-x-4">
						<a href="/privacy-policy" class="text-sm">Privacy Policy</a>
						<a href="/terms-conditions" class="text-sm">Terms of Service</a>
					</div>
                    -->
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
