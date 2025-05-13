<script>
	const { id, titulo, descripcion } = $props();
</script>

<section class="py-20" {id}>
	<h3 class="mb-5 text-5xl font-bold tracking-tight text-slate-800">{titulo}</h3>
	<p>{descripcion}</p>

	<div class="mt-5"></div>
</section>
