<script>
	import '$styles/app.css';
	import Nav from '$src/lib/components/UI/Nav/Nav.svelte';
	import Footer from '$components/UI/Footer.svelte';
	import Seo from '$src/lib/components/Seo.svelte';
</script>

<Seo />

<section class="mx-auto w-full md:max-w-screen-sm lg:max-w-screen-lg">
	<Nav />

	<main class="py-20">
		<slot />
	</main>

	<Footer />
</section>

<style lang="scss">
</style>
