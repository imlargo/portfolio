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
		<Empty.Title>Página en construcción</Empty.Title>
		<Empty.Description>
			Estoy trabajando en esta sección. Vuelve pronto para ver las actualizaciones!
		</Empty.Description>
	</Empty.Header>
	<Button variant="link" class="text-muted-foreground" size="sm">
		<a href="/">
			Inicio <ArrowUpRight class="inline" />
		</a>
	</Button>
</Empty.Root>
