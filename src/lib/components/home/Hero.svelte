<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowUpRight, ArrowRight } from '@lucide/svelte';

</script>

<div class="py-44">
	<div class="flex flex-col gap-y-4">
		<span>Software Engineer</span>

		<h1 class="text-5xl font-bold">Hi, i'm largo.</h1>
		<p class="max-w-prose text-lg">
			I'm a software engineer with a passion for building web applications. 2+ years of experience
			in full-stack development.
		</p>

		<div class="flex gap-x-4 pt-6">
			<Button class="max-w-max rounded-full flex items-center justify-center gap-x-2">
				<span>Resume</span>
				<ArrowUpRight class="size-4" />
			</Button>
			<Button variant="link" class="max-w-max rounded-full flex items-center justify-center gap-x-2">
				<span>Read more</span>
				<ArrowRight class="size-4" />
			</Button>
		</div>
	</div>
</div>
