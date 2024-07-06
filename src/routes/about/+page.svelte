<script>
	import Nav from '$components/UI/Nav/Nav.svelte';
	import Footer from '$components/UI/Footer.svelte';
	import Container from '$src/lib/components/UI/Container.svelte';
	import Cta from '$src/lib/components/UI/Cta.svelte';
</script>

<svelte:head>
	<title>imlargo - About</title>
</svelte:head>

<Container>
	<Nav />
</Container>

<section class="background-dots py-32">
	<Container>
		<main class="grid grid-cols-5">
			<section class="col-span-3">
				<h1 class="text-7xl font-bold tracking-tight subrayado max-w-max">Acerca de mi</h1>
				<div class="mt-6 space-y-7 text-base text-pretty text-zinc-400 leading-relaxed w-10/12">
					<p>
						¡Hola! Soy Juan Carlos Largo, aunque quiza me conozcas como <span class="font-mono"
							>@imlargo</span
						>. Soy un desarrollador de software, pero antes que nada, soy una persona con intereses
						y experiencias que van más allá de la programacion. Bienvenido a mi espacio personal!,
						donde comparto más sobre mi.
					</p>
					<p>
						Además del desarrollo de software, tengo una variedad de intereses que me apasionan.
						Intento siempre encontrar tiempo para nadar, lo cual me mantiene motivado y energizado.
						Me encanta escuchar música, comer pizza, ver atardeceres y salir a caminar para
						relajarme y distraerme. Estas actividades me ayudan a mantener el equilibrio y a
						inspirarme para mis proyectos profesionales mientras disfruto aprendiendo cosas nuevas.
					</p>
					<p>
						Siempre he pensado que saber de programación es cómo hacer magia en el mundo moderno, y
						es por eso que me encanta usar esta “magia” para crear soluciones que sean útiles y,
						sobre todo, que aporten un verdadero valor. En los próximos años, espero seguir
						aprendiendo, creciendo tanto personal como profesionalmente y sobre todo creando.
					</p>

					<p>
						Y finalmente gracias por tomarte el tiempo de leer un poco sobre mí. Si quieres saber
						más o simplemente charlar, no dudes en contactarme. ¡Estoy siempre abierto a nuevas
						conexiones y oportunidades!
					</p>
				</div>
			</section>

			<section class="col-span-2">
				<div class="">
					<img
						src="https://media.licdn.com/dms/image/D4E03AQH8qCs5Z5PqaA/profile-displayphoto-shrink_800_800/0/1697915419824?e=1724889600&v=beta&t=11qxae0A7GBis-cdKjuA-WWnfweJ59mh2Up1kNg6PAs"
						alt="imlargo"
						class="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
					/>
				</div>

				<div class="flex flex-col gap-4 mt-8">
					<a
						class="flex gap-3 max-w-fit text-zinc-400"
						target="_blank"
						href="https://github.com/imlargo"
					>
						<i class="bi bi-github"></i>
						<span class="">Seguir en GitHub</span>
					</a>

					<a
						class="flex gap-3 max-w-fit text-zinc-400"
						target="_blank"
						href="https://www.instagram.com/imlargo"
					>
						<i class="bi bi-instagram"></i>
						<span class="">Seguir en Instagram</span>
					</a>

					<a
						class="flex gap-3 max-w-fit text-zinc-400"
						target="_blank"
						href="https://www.linkedin.com/in/imlargo"
					>
						<i class="bi bi-linkedin"></i>
						<span class="">Seguir en Linkedin</span>
					</a>

					<hr class="my-2" />

					<a
						class="flex gap-3 max-w-fit text-zinc-400"
						target="_blank"
						href="mailto:jclargob@gmail.com"
					>
						<i class="bi bi-envelope"></i>
						<span class="">jclargob@gmail.com</span>
					</a>
				</div>
			</section>
		</main>

		<section class="mt-5">
			<Cta />
		</section>
	</Container>
</section>

<Container>
	<Footer />
</Container>

<style lang="scss">
</style>
