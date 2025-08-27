<script>
	import { projects } from "$lib/constants/content";
	import Project from "../kit/Project.svelte";

</script>
<section class="flex flex-col gap-y-6">
	<h1 class="text-4xl font-semibold">Proyectos</h1>
    <p class="max-w-2xl text-muted-foreground">
        Me apasiona construir soluciones que resuelvan problemas y generen valor. Te invito a conocer algunos de mis proyectos personales en los que estoy o he estado trabajando, los cuales llevan mi dedicación, cariño y esfuerzo.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each projects as project}
        <Project project={project}        />
        {/each}

    </div>

</section>