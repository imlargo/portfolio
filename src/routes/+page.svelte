<script lang="ts">
	import { HomeLanding } from '$lib/features/home/components';
	import { Seo, homeSchema } from '$lib/components/seo';
</script>

<!-- Sin título ni descripción: la home es justamente lo que describen los valores
     por defecto del SEO. Es también la única que declara `WebSite` en el grafo. -->
<Seo schema={homeSchema()} />

<HomeLanding />
