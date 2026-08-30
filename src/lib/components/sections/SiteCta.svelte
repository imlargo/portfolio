<script lang="ts">
	import ClosingCta from './ClosingCta.svelte';
	import { siteContent } from '$lib/content/site-content';

	const { cta } = siteContent;
</script>

<!-- El cierre de las cuatro páginas. Un solo llamado y una sola redacción, como
     siempre lo tuvo el sitio: lo que cambia entre vistas es lo que va arriba,
     no el remate. -->
<ClosingCta
	title={cta.title}
	description={cta.description}
	primaryCta={cta.primaryCta}
	secondaryCta={cta.secondaryCta}
/>
