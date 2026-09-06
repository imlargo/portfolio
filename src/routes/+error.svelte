<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { Seo } from '$lib/components/seo';
</script>

<!-- Una página de error nunca debe entrar al índice: si Google la guarda, la URL
     rota queda en los resultados con este contenido. -->
<Seo
	title={page.status === 404 ? 'Page not found' : 'Something went wrong'}
	description="This page does not exist."
	noindex
/>

<div
	class="px-layout flex min-h-svh w-full flex-col items-center justify-center gap-y-6 text-center"
>
	<p class="font-mono text-6xl text-muted-foreground">{page.status}</p>

	<h1 class="text-2xl font-medium">
		{#if page.status === 404}
			This page does not exist
		{:else}
			Something went wrong
		{/if}
	</h1>

	<p class="max-w-sm text-pretty text-muted-foreground">
		{page.error?.message ?? 'An unexpected error occurred. Please try again.'}
	</p>

	<Button href="/">Go home</Button>
</div>
