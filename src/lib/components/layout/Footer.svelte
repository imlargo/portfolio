<script lang="ts">
	import BackgroundDots from '../kit/BackgroundDots.svelte';

	interface Link {
		label: string;
		href: string;
	}

	interface LinkGroup {
		title: string;
		links: Link[];
	}

	const links = $derived<LinkGroup[]>([
		{
			title: 'Links',
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'About', href: '/about' },
				{ label: 'Blog', href: '/blog' },
				{ label: 'Resume', href: '/blog' },
				{ label: 'Contact', href: '/contact' }
			]
		},
		{
			title: 'Social',
			links: [
				{ label: 'Instagram', href: '/' },
				{ label: 'GitHub', href: '/blog' },
				{ label: 'LinkedIn', href: '/contact' }
			]
		}
	]);
</script>

{#snippet LinkItem(label: string, href: string)}
	<a class="text-muted-foreground hover:text-primary w-full" {href}>{label}</a>
{/snippet}

<div class="pt-18 overflow-hidden md:pt-28 lg:pt-56">
	<div class="bg-background relative">
		<BackgroundDots class="opacity-20" />
		<div
			class="md:-top-35 lg:-top-70 absolute -top-20 -z-20 flex w-full items-center justify-center font-mono"
		>
			<h1
				class="text-secondary/50 line-clamp-none align-bottom text-[8rem] font-extrabold leading-none tracking-wider md:text-[14rem] lg:text-[24rem]"
			>
				imlargo
			</h1>
		</div>

		<div class="z-10">
			<div class="flex items-center justify-center">
				<div class="footer-gradient h-[1px] w-full border-none"></div>
			</div>

			<footer class="bg-secondary/25 px-horizontal flex w-full flex-col gap-y-6 py-12">
				<div class="flex flex-col gap-y-8 md:flex-row md:justify-between">
					<div class="space-y-2">
						<h2 class="font-mono text-4xl font-bold">imlargo</h2>
						<p class="text-muted-foreground">Software engineer.</p>
					</div>

					<div class="flex flex-col gap-x-24 gap-y-12 md:flex-row md:justify-end">
						{#each links as group}
							<div class="flex flex-col gap-y-4">
								<h3 class="font-semibold">{group.title}</h3>
								<div class="flex flex-col gap-y-1.5">
									{#each group.links as link}
										{@render LinkItem(link.label, link.href)}
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-8 flex items-center justify-between">
					<span class="text-muted-foreground hidden text-sm md:inline-flex"
						>© 2025 imlargo. All rights reserved</span
					>
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
