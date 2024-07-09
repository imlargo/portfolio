<script>
    const string = "Svelte, Javascript, Python, Java, Golang, MongoDb, NodeJs, Firebase, Astro, HTML, CSS, SCSS, Tailwind, Bootstrap, Git, GitHub, Github Actions, Figma, API REST, Apps Script";
    const skills = string.split(',').map(item => item.trim());


	import Skill from '$lib/components/UI/Items/Skill.svelte';
</script>


<div>
    <div class="flex flex-wrap gap-x-3 gap-y-2">
        {#each skills as item}
            <Skill icon={item} />
        {/each}
    </div>
</div>

