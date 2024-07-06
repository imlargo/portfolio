<script>
	import '$styles/app.css';
	import Seo from '$src/lib/components/Seo.svelte';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) {
			console.log('ups');
			return;
		}

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Seo />

<slot />