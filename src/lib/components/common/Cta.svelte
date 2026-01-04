<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Iridescence from '$lib/components/common/effects/Iridescence.svelte';
	import Noise from '$lib/components/common/effects/Noise.svelte';
	import * as Section from '$lib/components/kit/section';
	import { ArrowUpRight } from '@lucide/svelte';
</script>

<Section.Root class="max-w-wx relative w-full gap-y-4 overflow-hidden rounded-xl border-2 p-12">
	<div class="absolute inset-0 -z-10 h-full w-full">
		<Iridescence mouseReact={false} color={[0.6, 0.4, 1]} speed={0.15} />
	</div>

	<div class="flex h-full w-full flex-col gap-y-24">
		<div class="flex flex-col gap-y-4">
			<h3 class="scroll-m-20 text-6xl font-bold tracking-tight text-balance">
				Qué te parece si creamos algo increíble juntos?
			</h3>

			<p class="text-xl">Estoy disponible para proyectos freelance y colaboraciones.</p>
		</div>

		<div class="flex justify-end">
			<Button size="lg" class="max-w-max">
				<span>Contactame</span>
				<ArrowUpRight class="size-4" />
			</Button>
		</div>
	</div>
</Section.Root>
