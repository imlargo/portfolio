<script>
	import '$styles/app.css';
	import Seo from '$src/lib/components/Seo.svelte';
	import { analytics } from '$src/lib/client/firebase';
</script>

<Seo />

<slot />
