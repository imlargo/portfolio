<script lang="ts">
	import { HomeLanding } from '$lib/features/home/components';
	import { JsonLd, Seo, homeSchema } from '$lib/components/seo';
</script>

<!-- Sin props de título ni descripción: la home es justamente lo que describen
     los valores por defecto del SEO. -->
<Seo />

<!-- La home es la que declara `Person` y `WebSite`; el resto del sitio los
     referencia por `@id` en vez de repetirlos. -->
<JsonLd schema={homeSchema()} />

<HomeLanding />
