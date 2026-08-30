<script lang="ts">
	import * as Section from '$lib/components/layout/section';
	import { StatGrid } from '$lib/components/cards';
	import { siteContent } from '$lib/content/site-content';
	import { useReveal } from '$lib/attachments/reveal';
	import { useSplitTitle } from '$lib/attachments/split-title';

	const { title, description, stats } = siteContent.workPage;
</script>

<Section.Root spacing="hero">
	<div class="flex flex-col gap-y-3">
		<h1 class="ty-h1 font-mono" {@attach useSplitTitle()}>{title}</h1>
		<p class="ty-lead max-w-prose text-pretty" {@attach useReveal({ delay: 0.25 })}>
			{description}
		</p>
	</div>

	<StatGrid {stats} class="grid-cols-1 sm:grid-cols-3" />
</Section.Root>
