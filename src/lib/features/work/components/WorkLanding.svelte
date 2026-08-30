<script lang="ts">
	import WorkHero from './hero/WorkHero.svelte';
	import ArchiveSection from './archive/ArchiveSection.svelte';
	import SideProjectsSection from './side/SideProjectsSection.svelte';
	import { SiteCta } from '$lib/components/sections';
	import { siteContent } from '$lib/content/site-content';

	const { groups } = siteContent.workPage;
</script>

<WorkHero />

{#each groups as group (group.title)}
	<ArchiveSection {group} />
{/each}

<SideProjectsSection />

<SiteCta />
