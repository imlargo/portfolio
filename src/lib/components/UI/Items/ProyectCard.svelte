<script>
	const { title, link, repo, children } = $props();
</script>

<div class="container px-7 py-7 rounded border">
	<i class="bi bi-star text-xl"></i>

	<h5 class="font-semibold text-xl mt-3 mb-2">{title}</h5>
	<p>{@render children()}</p>

	<div class="flex justify-between mt-3">
		<a class="truncate" href={link} target="_blank">
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
