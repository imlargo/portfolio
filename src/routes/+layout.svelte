<script>
	import '$styles/app.css';
	import Seo from '$src/lib/components/Seo.svelte';
	import { analytics } from '$src/lib/client/firebase';
	let { children } = $props();
</script>

<Seo />

{@render children()}
