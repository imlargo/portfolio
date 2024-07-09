<script>
	const { id, titulo, descripcion } = $props();
</script>

<section class="py-20" {id}>
	<h3 class="text-5xl tracking-tight font-bold text-slate-800 mb-5">{titulo}</h3>
	<p>{descripcion}</p>

	<div class="mt-5"></div>
</section>
