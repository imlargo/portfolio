<script>
	import Nav from '$components/UI/Nav/Nav.svelte';
	import Footer from '$components/UI/Footer.svelte';

	import ProyectCard from '$src/lib/components/UI/Items/ProyectCard.svelte';
	import ExperienceCard from '$src/lib/components/UI/Items/Experience.svelte';
	import EducationItem from '$src/lib/components/UI/Items/Education.svelte';
	import Blob from '$src/lib/components/UI/Blob.svelte';
	import Container from '$src/lib/components/UI/Container.svelte';
	import SkillCarrousel from '$src/lib/components/UI/SkillCarrousel.svelte';
	import Cta from '$src/lib/components/UI/Cta.svelte';
	

	import { onMount } from 'svelte';

	onMount(() => {
		const interBubble = document.querySelector('.interactive');
		let curX = 0;
		let curY = 0;
		let tgX = 0;
		let tgY = 0;

		function move() {
			curX += (tgX - curX) / 20;
			curY += (tgY - curY) / 20;
			interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
			requestAnimationFrame(() => {
				move();
			});
		}

		window.addEventListener('mousemove', (event) => {
			tgX = event.clientX;
			tgY = event.clientY;
		});

		move();
	});

</script>

<svelte:head>
	<title>imlargo</title>
</svelte:head>



<header class="relative">
	<div class="glass">
		<Container>
			<Nav />
		</Container>
	</div>

	<div class="background-dots p-52">
		<div class="gradient-bg mask">
			<svg xmlns="http://www.w3.org/2000/svg">
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
							result="goo"
						/>
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>
			<div class="gradients-container">
				<div class="g1"></div>
				<div class="g2"></div>
				<div class="g3"></div>
				<div class="g4"></div>
				<div class="g5"></div>
				<div class="interactive"></div>
			</div>
		</div>
		<Container>
			<section class="grid grid-cols-3">
				<div class="col-span-2">
					<span class="font-mono tracking-tight text-zinc-400"
						>Software Developer, UI/UX Designer.</span
					>
					<h1 class="text-7xl font-bold mt-2">Hi, <span class="subrayado">imlargo</span>!</h1>
	
					<p class="mt-7 text-base text-pretty text-zinc-100 leading-relaxed">
						Experiencia en frontend, backend, web scraping y automatización. Enfocado en el desarrollo
						web. Entre mis logros destaca la creación de proyectos personales que han tenido un
						impacto positivo significativo en la comunidad universitaria.
					</p>
	
					<div class="flex items-center gap-7 mt-7">
						<a
							class="items-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black ring-1 ring-inset ring-purple-700/10"
							href="/"
						>
							<span>Ver Curriculum</span>
						</a>
	
						<div
							class="inline-block self-stretch w-px min-h-[1em] h-3/4 my-auto bg-neutral-200"
						></div>
	
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
				</div>
	
				<div class="col-span-1">
					<Blob />
				</div>
			</section>
		</Container>
	</div>
</header>






<Container>
	<section id="experiencia" class="">
		<h3 class="text-4xl tracking-tight font-bold mb-5">Experiencia</h3>

		<p class="text-display">
			Take a look below at some of my featured work for clients from the past few years.
		</p>

		<ul class="experience-list gap-12 py-2 before:absolute after:absolute mt-5">
			<ExperienceCard
				cargo="Estudiante Auxiliar"
				fecha="Enero de 2024 - Actualidad. (Medellín, Colombia)"
				stack="Javascript, HTML, CSS, Bootstrap, Firebase"
				lugar="Universidad Nacional de Colombia"
			>
				<h5 class="font-medium mb-1">Responsabilidades</h5>

				<ul class="list-disc ps-4">
					<li>
						Diseñar y desarrollar una aplicación web para la Vicedecanatura de la Facultad de Minas,
						con el objetivo de optimizar el registro y la gestión de prácticas de campo en toda la
						facultad. Algunas de las funcionalidades incluyen inicio de sesión, gestión de usuarios,
						bases de datos NoSQL, generación de reportes, automatización de informes y envío de
						correos.
					</li>
					<li>
						Colaborar estrechamente con diferentes áreas de la Vicedecanatura para comprender sus
						requerimientos específicos y diseñar soluciones adaptadas a sus necesidades mediante la
						implementación de funcionalidades en la aplicación.
					</li>
				</ul>

				<h5 class="font-medium mb-1 mt-3">Logros</h5>

				<ul class="list-disc ps-4">
					<li>
						Estandarización de datos de prácticas de campo, permitiendo un análisis eficiente y
						contribuyendo a decisiones informadas, evitando gastos innecesarios y permitiendo
						identificar posibles mejoras en el ahorro de recursos financieros.
					</li>
					<li>
						Reducción significativa del tiempo empleado en los procesos asociados al registro y
						gestión de prácticas de campo, disminuyendo días de trabajo y mejorando la coordinación
						entre diferentes áreas, además de una mejora notable de la experiencia general de los
						usuarios.
					</li>
				</ul>
			</ExperienceCard>

			<ExperienceCard
				cargo="Estudiante Auxiliar"
				fecha="Noviembre de 2023 - Diciembre 2023. (Medellín, Colombia)"
				stack="Javascript, Python, Apps Script"
				lugar="Universidad Nacional de Colombia"
			>
				<h5 class="font-medium mb-1">Responsabilidades</h5>

				<ul class="list-disc ps-4">
					<li>
						Identificación y resolución de problemas a través de soluciones con Apps Script y Python
						para la automatización de tareas repetitivas, enfocadas en incrementar la eficiencia
						operativa y reducir el trabajo manual.
					</li>
				</ul>

				<h5 class="font-medium mb-1 mt-3">Logros</h5>

				<ul class="list-disc ps-4">
					<li>
						Reducción significativa de la carga de trabajo manual en procesos administrativos
						internos gracias a la automatización de tareas rutinarias.
					</li>
					<li>
						Integración exitosa de diversas herramientas digitales, logrando una mejora en la
						productividad del equipo y optimizando los flujos de trabajo.
					</li>
				</ul>
			</ExperienceCard>
		</ul>
	</section>
</Container>

<Container>
	<section class="py-32" id="proyectos">
		<h3 class="text-4xl tracking-tight font-bold mb-5">Proyectos</h3>

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
				Una aplicación diseñada para la creación de horarios y enfocada en brindar información
				esencial con el objetivo de mejorar la experiencia de los estudiantes de la sede Medellín.
			</ProyectCard>

			<ProyectCard
				link="https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles"
				repo="https://github.com/imlargo/pegaso"
				title="MinasBot"
				stack="NodeJs, Javascript"
			>
				ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a
				preguntas frecuentes, distribuir información y gestionar procesos administrativos.
			</ProyectCard>

			<ProyectCard
				link="https://odpiobservatorio.vercel.app"
				repo="https://github.com/imlargo/pegaso"
				title="ODPI Observatorio."
				stack="Javascript, HTML, CSS, Firebase, Leaflet"
			>
				Contribuí voluntariamente al desarrollo de un sistema de información web que visibiliza el
				estado de los hechos de violencia contra los pueblos indígenas de Colombia.
			</ProyectCard>

			<ProyectCard
				link="https://vectorial.imlargo.dev"
				repo="https://github.com/imlargo/pegaso"
				title="Plataforma de enseñanza"
				stack="Astro, Tailwind, Python, Markdown"
			>
				En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar a
				conceptos de geometría vectorial a través de animaciones.
			</ProyectCard>
		</div>
	</section>
</Container>

<Container>
	<div class="pb-32">
		<h3 class="text-4xl tracking-tight font-bold mb-5">Habilidades y tecnologias</h3>

		<SkillCarrousel />
	</div>
</Container>

<Container>
	<section class="mb-32">
		<Cta />
	</section>
</Container>

<Container>
	<Footer />
</Container>

<!--
<section class="py-20" id="habilidades">
	<h3 class="text-4xl tracking-tight font-bold text-slate-800 mb-5">Habilidades y tecnologias</h3>
	<img
		src="https://skillicons.dev/icons?i=js,py,go,java,svelte,astro,html,css,sass,bootstrap,tailwind,nodejs,firebase,mongodb,figma,latex,githubactions&theme=dark"
	/>
</section>

<section class="py-20" id="educacion">
	<h3 class="text-4xl tracking-tight font-bold text-slate-800 mb-5">Formacion</h3>
	<ul class="experience-list gap-12 py-2 before:absolute after:absolute">
		<EducationItem />

		<EducationItem />
	</ul>
</section>
-->

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
			border-color: #2b2b2b;
			border-style: dashed;
		}

		&::after {
			position: absolute;
			top: 1.5rem;
			bottom: 1.5rem;
			transform: translateX(-50%);
			border-width: 1px;
			border-color: #2b2b2b;
		}
	}

	.glass {
		/* From https://css.glass */
	
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
</style>
