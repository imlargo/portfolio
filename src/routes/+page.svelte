<script>
	import ProyectCard from '$src/lib/components/UI/Items/ProyectCard.svelte';
	import ExperienceCard from '$src/lib/components/UI/Items/Experience.svelte';
	import EducationItem from '$src/lib/components/UI/Items/Education.svelte';
	import Skill from '$src/lib/components/UI/Items/Skill.svelte';
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<section class="mb-32 py-20">
	<span class="font-mono tracking-tight text-slate-800">Software Developer, UI/UX Designer.</span>
	<h1 class="text-7xl font-bold mt-2">Hi, <span class="subrayado">imlargo</span>!</h1>

	<p class="mt-6 text-display w-2/3">
		Experiencia en frontend, backend, web scraping y automatización. Enfocado en el desarrollo web.
		Entre mis logros destaca la creación de proyectos personales que han tenido un impacto positivo
		significativo en la comunidad universitaria.
	</p>

	<div class="flex items-center gap-7 mt-4">
		<a
			class="items-center rounded-full bg-purple-50 px-4 py-1.5 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-700/10"
			href="/"
		>
			<span>Descargar CV</span>
		</a>

		<div class="inline-block self-stretch w-px min-h-[1em] h-3/4 my-auto bg-neutral-200"></div>

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
	<h3 class="text-4xl tracking-tight font-bold text-slate-800 mb-5">Experiencia</h3>

	<p class="text-display">
		Take a look below at some of my featured work for clients from the past few years.
	</p>

	<ul class="experience-list gap-12 py-2 before:absolute after:absolute mt-5">
		<ExperienceCard
			cargo="Universidad Nacional de Colombia, Estudiante Auxiliar."
			fecha="Enero de 2024 - Actualidad. (Medellín, Colombia)"
			stack="Javascript, HTML, CSS, Bootstrap, Firebase"
		>
			<span>
				Diseñar y desarrollar una aplicación web para la Vicedecanatura de la Facultad de Minas, con
				el objetivo de optimizar el registro y la gestión de prácticas de campo en toda la facultad.
				Algunas de las funcionalidades incluyen inicio de sesión, gestión de usuarios, bases de
				datos NoSQL, generación de reportes, automatización de informes y envío de correos.
			</span>
		</ExperienceCard>

		<ExperienceCard
			cargo="Universidad Nacional de Colombia, Estudiante Auxiliar."
			fecha="Noviembre de 2023 - Diciembre 2023. (Medellín, Colombia)"
			stack="Javascript, Python, Apps Script"
		>
			<span>
				Identificación y resolución de problemas a través de soluciones con Apps Script y Python
				para la automatización de tareas repetitivas, enfocadas en incrementar la eficiencia
				operativa y reducir el trabajo manual.
			</span>
		</ExperienceCard>
	</ul>
</section>

<section class="py-20" id="proyectos">
	<h3 class="text-4xl tracking-tight font-bold text-slate-800 mb-5">Proyectos</h3>

	<p class="text-display w-2/3">
		Algunos de los proyectos personales en los que he estoy o he estado trabajando.
	</p>

	<div class="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-5">
		<ProyectCard
			link="https://pegaso.imlargo.dev"
			repo="https://github.com/imlargo/pegaso"
			title="Pegaso"
			stack="Svelte, Tailwind, MongoDB, NodeJs, Javascript"
		>
			<span>
				Una aplicación diseñada para la creación de horarios y enfocada en brindar información
				esencial con el objetivo de mejorar la experiencia de los estudiantes de la sede Medellín.
			</span>
		</ProyectCard>

		<ProyectCard
			link="https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles"
			repo="https://github.com/imlargo/pegaso"
			title="MinasBot"
			stack="NodeJs, Javascript"
		>
			<span>
				ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a
				preguntas frecuentes, distribuir información y gestionar procesos administrativos.
			</span>
		</ProyectCard>

		<ProyectCard
			link="https://odpiobservatorio.vercel.app"
			repo="https://github.com/imlargo/pegaso"
			title="ODPI Observatorio."
			stack="HTML, CSS, Javascript, Firebase, Leaflet"
		>
			<span>
				Contribuí voluntariamente al desarrollo de un sistema de información web que visibiliza el
				estado de los hechos de violencia contra los pueblos indígenas de Colombia.
			</span>
		</ProyectCard>

		<ProyectCard
			link="https://vectorial.imlargo.dev"
			repo="https://github.com/imlargo/pegaso"
			title="Plataforma de enseñanza"
			stack="Astro, Tailwind, Python, Markdown"
		>
			<span>
				En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar a
				conceptos de geometría vectorial a través de animaciones.
			</span>
		</ProyectCard>
	</div>
</section>

<section class="py-20" id="habilidades">
	<h3 class="text-4xl tracking-tight font-bold text-slate-800 mb-5">Habilidades y tecnologias</h3>
	<img src="https://skillicons.dev/icons?i=js,py,go,java,svelte,astro,html,css,sass,bootstrap,tailwind,nodejs,firebase,mongodb,figma,latex,githubactions&theme=dark" />
</section>

<section class="py-20" id="educacion">
	<h3 class="text-4xl tracking-tight font-bold text-slate-800 mb-5">Formacion</h3>
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
			top: 1.5rem;
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
