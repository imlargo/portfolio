<script lang="ts">
	import type { PageProps } from './$types';
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowUpRight, CircleAlert } from '@lucide/svelte';

	let { data }: PageProps = $props();
</script>

<Empty.Root>
	<Empty.Header>
		<Empty.Media variant="icon">
			<CircleAlert />
		</Empty.Media>
		<Empty.Title>Page under construction</Empty.Title>
		<Empty.Description>
			I'm working on this section. Check back soon for updates!
		</Empty.Description>
	</Empty.Header>
	<Button variant="link" class="text-muted-foreground" size="sm">
		<a href="/">
			Home <ArrowUpRight class="inline" />
		</a>
	</Button>
</Empty.Root>
