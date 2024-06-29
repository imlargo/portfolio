<script>
	import ProyectCard from '$src/lib/components/UI/Items/ProyectCard.svelte';
	import ExperienceCard from '$src/lib/components/UI/Items/Experience.svelte';
	import EducationItem from '$src/lib/components/UI/Items/Education.svelte';
	import Skill from '$src/lib/components/UI/Items/Skill.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<section class="my-20 py-20">
	<h1 class="text-7xl font-bold mb-4">Hi, <span class="subrayado">imlargo</span>!</h1>
	<span class="font-mono text-slate-800">Software Developer, UI/UX Designer</span>

	<p class="mt-4 text-sm">
		Experiencia en frontend, backend, web scraping y automatización. Enfocado en el desarrollo web.
	</p>

	<div class="flex items-center gap-7 mt-4">
		<a
			class="block w-50 items-center rounded-full bg-purple-50 px-3 py-2 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-700/10"
		>
			<span>Descargar CV</span>
		</a>

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
		<ExperienceCard
			cargo="Universidad Nacional de Colombia, Estudiante Auxiliar."
			fecha="Enero de 2024 - Actualidad. (Medellín, Colombia)"
		>
			Diseñar y desarrollar una aplicación web para la Vicedecanatura de la Facultad de Minas, con
			el objetivo de optimizar el registro y la gestión de prácticas de campo en toda la facultad.
			Algunas de las funcionalidades incluyen inicio de sesión, gestión de usuarios, bases de datos
			NoSQL, generación de reportes, automatización de informes y envío de correos.
		</ExperienceCard>

		<ExperienceCard
			cargo="Universidad Nacional de Colombia, Estudiante Auxiliar."
			fecha="Noviembre de 2023 - Diciembre 2023. (Medellín, Colombia)"
		>
			Identificación y resolución de problemas a través de soluciones con Apps Script y Python para
			la automatización de tareas repetitivas, enfocadas en incrementar la eficiencia operativa y
			reducir el trabajo manual.
		</ExperienceCard>
	</ul>
</section>

<section class="py-20" id="proyectos">
	<h3 class="text-3xl font-semibold mb-2">Proyectos</h3>

	<p>
		Algunos de los proyectos en los que he estado trabajando. Realmente disfruto creando nuevos
		proyectos y desarrollando nuevas ideas. Siempre estoy trabajando en algo nuevo, ¡así que vuelve
		a menudo para ver las novedades!
	</p>

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
			repo="https://github.com/imlargo/pegaso"
			title="MinasBot"
		>
			ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a
			preguntas frecuentes, distribuir información y gestionar procesos administrativos.
		</ProyectCard>

		<ProyectCard
			link="https://odpiobservatorio.vercel.app"
			repo="https://github.com/imlargo/pegaso"
			title="ODPI Observatorio."
		>
			Contribuí voluntariamente al desarrollo de un sistema de información web que visibiliza el
			estado de los hechos de violencia contra los pueblos indígenas de Colombia.
		</ProyectCard>

		<ProyectCard
			link="https://vectorial.imlargo.dev"
			repo="https://github.com/imlargo/pegaso"
			title="Plataforma de enseñanza"
		>
			En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar a
			conceptos de geometría vectorial a través de animaciones creadas con Python y Manim.
		</ProyectCard>
	</div>
</section>

<section class="py-20" id="habilidades">
	<h3 class="text-3xl font-semibold mb-2">Habilidades y tecnologias</h3>

	<div class="grid gap-4 grid-cols-2 lg:grid-cols-3 mt-5">
		<Skill>JavaScript</Skill>
		<Skill>Python</Skill>
		<Skill>Java</Skill>
		<Skill>Golang</Skill>
		<Skill>MongoDB</Skill>
		<Skill>NodeJs</Skill>
		<Skill>Firebase</Skill>
		<Skill>Svelte</Skill>
		<Skill>Astro</Skill>
		<Skill>HTML</Skill>
		<Skill>CSS</Skill>
		<Skill>SCSS</Skill>
		<Skill>Tailwind</Skill>
		<Skill>Bootstrap</Skill>
		<Skill>Google Apps Scripts</Skill>
		<Skill>Git</Skill>
		<Skill>GitHub</Skill>
		<Skill>GitHub Actions</Skill>
		<Skill>SCRUM</Skill>
		<Skill>Trabajo en equipo</Skill>
		<Skill>Metodologías Ágiles</Skill>
	</div>
</section>

<section class="py-20" id="educacion">
	<h3 class="text-3xl font-semibold mb-2">Formacion</h3>
	<ul class="experience-list gap-12 py-2 before:absolute after:absolute">
		<EducationItem />

		<EducationItem />
	</ul>
</section>

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

	.subrayado {
		position: relative;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			bottom: 0rem;
			left: 0;
			height: 1.5rem;
			z-index: -1;

			background-color: #edc7ff;
		}
	}
</style>
