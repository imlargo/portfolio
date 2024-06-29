<script>
	import ProyectCard from '$src/lib/components/UI/Cards/ProyectCard.svelte';
	import ExperienceCard from '$src/lib/components/UI/Cards/ExperienceCard.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<section class="my-20">
	<h1 class="text-7xl font-bold mb-2">Hi, imlargo!</h1>
	<span class="font-mono text-slate-800">Software Developer, UI/UX Designer</span>

	<p class="mt-4 text-sm">
		Experiencia en frontend, backend, web scraping y automatización. Enfocado en el desarrollo web.
	</p>

	<div class="flex gap-5 mt-4">
		<a href="https://github.com/imlargo">
			<i class="bi bi-github"></i>
		</a>

		<a href="https://www.instagram.com/imlargo">
			<i class="bi bi-instagram"></i>
		</a>

		<a href="https://www.linkedin.com/in/imlargo">
			<i class="bi bi-linkedin"></i>
		</a>
	</div>
</section>

<section id="experiencia py-20 my-20">
	<h3 class="text-3xl font-semibold mb-2">Experiencia</h3>
	<ul class="experience-list gap-12 py-2 before:absolute after:absolute">
		<ExperienceCard />
		<ExperienceCard />
	</ul>
</section>

<section class="my-20" id="proyectos">
	<h3 class="text-3xl font-semibold mb-2">Proyectos</h3>

	<p>Hola hola hola</p>

	<div class="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-5">
		<ProyectCard
			link="https://pegaso.imlargo.dev"
			repo="https://github.com/imlargo/pegaso"
			title="Pegaso"
		>
			Una aplicación diseñada para la creación de horarios y enfocada en brindar información
			esencial con el objetivo de mejorar la experiencia de los estudiantes de la sede Medellín.
		</ProyectCard>

		<ProyectCard
			link="https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles"
			repo=""
			title="MinasBot"
		>
			ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a
			preguntas frecuentes, distribuir información y gestionar procesos administrativos.
		</ProyectCard>

		<ProyectCard link="https://odpiobservatorio.vercel.app" repo="" title="ODPI Observatorio.">
			Contribuí voluntariamente al desarrollo de un sistema de información web que visibiliza el
			estado de los hechos de violencia contra los pueblos indígenas de Colombia.
		</ProyectCard>

		<ProyectCard link="https://vectorial.imlargo.dev" repo="" title="Plataforma de enseñanza">
			En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar a
			conceptos de geometría vectorial a través de animaciones creadas con Python y Manim.
		</ProyectCard>
	</div>
</section>

<section id="habilidades"></section>

<section id="educacion"></section>

<section id="certificados"></section>

<style lang="scss">
	.experience-list {
		display: flex;
		position: relative;
		flex-direction: column;

		&::before {
			position: absolute;
			top: 0px;
			height: 100%;
			transform: translateX(-50%);

			border-width: 1px;
			border-color: #f6d4ff;
			border-style: dashed;
		}

		&::after {
			position: absolute;
			top: 1.5rem;
			bottom: 1.5rem;
			transform: translateX(-50%);
			border-width: 1px;
			border-color: #f6d4ff;
		}
	}
</style>
