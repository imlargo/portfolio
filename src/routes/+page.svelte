<script lang="ts">
	import { HomeLanding } from '$lib/features/home/components';
	import { Seo } from '$lib/components/seo';
</script>

<!-- Sin props de título ni descripción: la home es justamente lo que describen
     los valores por defecto del SEO. -->
<Seo />

<HomeLanding />
