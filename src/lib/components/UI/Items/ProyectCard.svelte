<script>
	
	
	const { title, link, repo, children } = $props();
</script>

<div class="container px-7 py-7 rounded border">

	<i class="bi bi-star"></i>

	<h5 class="font-semibold text-lg mb-2 mt-4">{title}</h5>

	<div class="text-sm text-pretty text-slate-600 mb-5">
		{@render children()}
	</div>

	<div class="flex justify-between">
		<a class="truncate text-slate-500 w-5/6" href={link} target="_blank">
			<i class="bi bi-link-45deg"></i>
			<span>{link.replace('https://', '')}</span>
		</a>

		{#if repo}
			<a href={repo} target="_blank">
				<i class="bi bi-github"></i>
			</a>
		{/if}
	</div>
</div>
