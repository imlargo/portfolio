<script lang="ts">
	import Nav from '$components/UI/Nav/Nav.svelte';
	import Footer from '$components/UI/Footer.svelte';
	import ProyectCard from '$src/lib/components/UI/Items/ProyectCard.svelte';
	import ExperienceCard from '$src/lib/components/UI/Items/Experience.svelte';
	import Container from '$src/lib/components/UI/Container.svelte';
	import SkillCarrousel from '$src/lib/components/UI/SkillCarrousel.svelte';
	import Cta from '$src/lib/components/UI/Cta.svelte';

	function interactiveBlob(interBubble: HTMLElement) {
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
	}
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
				<div use:interactiveBlob class="interactive"></div>
			</div>
		</div>
		<Container>
			<section class="grid grid-cols-3">
				<div class="col-span-2">
					<span class="font-mono font-light tracking-tight text-zinc-300"
						>Fullstack Developer, UI/UX Designer.</span
					>
					<div class="inline-block">
						<h1 class="text-8xl font-bold mt-4 pb-2 typing text-white">Hi, i'm largo.</h1>
					</div>

					<p class="text-base text-pretty text-zinc-200 leading-relaxed">
						Experiencia en frontend, backend, web scraping y automatización. Enfocado en el
						desarrollo web. Entre mis logros destaca la creación de proyectos personales que han
						tenido un impacto positivo significativo en la comunidad universitaria.
					</p>

					<div class="flex items-center gap-7 mt-9">
						<a
							class="inline-flex gap-1.5 items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
							href="Currículum - Juan Carlos Largo.pdf"
							target="_blank"
						>
							<i class="bi bi-code-slash"></i>
							<span>Ver Curriculum</span>
						</a>

						<div
							class="inline-block self-stretch w-px min-h-[1em] h-3/4 my-auto bg-neutral-400"
						></div>

						<a class="text-lg" target="_blank" href="https://github.com/imlargo">
							<i class="bi bi-github"></i>
						</a>

						<a class="text-lg" target="_blank" href="https://www.instagram.com/imlargo">
							<i class="bi bi-instagram"></i>
						</a>

						<a class="text-lg" target="_blank" href="https://www.linkedin.com/in/imlargo">
							<i class="bi bi-linkedin"></i>
						</a>
					</div>
				</div>
			</section>
		</Container>
	</div>
</header>

<div class="background-dots mask-radial">
	<Container>
		<section id="experiencia">
			<h3 class="text-4xl tracking-tight font-medium">Experiencia</h3>

			<p class="text-display w-9/12 mt-5 mb-7">
				Desarrollo aplicaciones web innovadoras y soluciones de software personalizadas. Creando
				experiencias atractivas, enfocándome en la escalabilidad, el rendimiento, la calidad y
				pensando siempre desde la perspectiva del usuario final.
			</p>

			<ul class="experience-list gap-12 py-2 before:absolute after:absolute">
				<ExperienceCard
					cargo="Estudiante Auxiliar / Desarrollador de software"
					fecha="Enero de 2024 - Actualidad"
					stack="Typescript, Svelte, Tailwind, Javascript, HTML, CSS, SCSS, Bootstrap, Firebase, NodeJs, APIs, Apps Script"
					lugar="Universidad Nacional de Colombia"
				>
					Colaboración con diversas áreas para adaptar soluciones a sus
					necesidades. Entre los logros destacan la estandarización de datos, reducción
					significativa del tiempo en procesos y mejora de la coordinación y experiencia de los
					usuarios.
				</ExperienceCard>

				<ExperienceCard
					cargo="Estudiante Auxiliar / Desarrollador de software"
					fecha="Noviembre de 2023 - Diciembre 2023"
					stack="Javascript, Python, Apps Script"
					lugar="Universidad Nacional de Colombia"
				>
					Identificación y resolución de problemas mediante Apps Script y Python para automatizar
					tareas repetitivas, incrementando la eficiencia operativa y reduciendo el trabajo manual.
					La automatización de procesos administrativos internos resultó en una significativa
					reducción de la carga de trabajo manual y mejora de la productividad del equipo y
					optimizando los flujos de trabajo.
				</ExperienceCard>
			</ul>
		</section>
	</Container>
</div>

<div class="background-dots mask-radial">
	<Container>
		<section class="py-32" id="proyectos">
			<h3 class="text-4xl tracking-tight font-medium">Proyectos</h3>

			<p class="text-display w-9/12 mt-5 mb-7">
				Me apasiona construir soluciones que resuelvan problemas y generen valor. Te invito a
				conocer algunos de mis proyectos personales en los que estoy o he estado trabajando, los
				cuales llevan mi dedicación, cariño y esfuerzo.
			</p>

			<div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
				<ProyectCard
					link="https://pegaso.imlargo.dev"
					repo="https://github.com/imlargo/pegaso"
					title="Pegaso"
					stack="Svelte, Go, TypeScript, MongoDB, Tailwind"
				>
					Una aplicación diseñada para la creación de horarios y enfocada en brindar información
					esencial con el objetivo de mejorar la experiencia de los estudiantes de la sede Medellín.
				</ProyectCard>

				<ProyectCard
					link="https://copywhisper.imlargo.dev"
					repo="https://github.com/imlargo/CopyWhisper"
					title="CopyWhisper"
					stack="Svelte, Typescript, Tailwind, SCSS"
				>
				Aplicación web impulsada por IA para analizar, calificar y optimizar el copywriting tu página web, proporcionando análisis profundos y detallados con recomendaciones adaptadas a tus necesidades específicas.
				</ProyectCard>

				<ProyectCard
					link="https://minas.medellin.unal.edu.co/noticias/facultad/5569-con-inteligencia-artificial-estudiantes-optimizan-las-solicitudes-estudiantiles"
					title="MinasBot"
					stack="NodeJs, Javascript"
				>
					ChatBot de WhatsApp desarrollado en Node.js con el objetivo de automatizar respuestas a
					preguntas frecuentes, distribuir información y gestionar procesos administrativos.
				</ProyectCard>

				<ProyectCard
					link="https://odpiobservatorio.vercel.app"
					repo="https://github.com/odpiobservatorio/odpiobservatorio.github.io"
					title="ODPI Observatorio."
					stack="Javascript, HTML, CSS, Firebase, Leaflet"
				>
					Contribuí al desarrollo del backend para un sistema de información web que visibiliza el
					estado de los hechos de violencia contra los pueblos indígenas de Colombia.
				</ProyectCard>

				<ProyectCard
					repo="https://github.com/imlargo/proyecto-vectorial"
					title="Plataforma de enseñanza"
					stack="Astro, Tailwind, Python, Markdown"
				>
					En mi tiempo libre me dedico a trabajar en una plataforma educativa diseñada para enseñar
					a conceptos de geometría vectorial a través de animaciones.
				</ProyectCard>
			</div>
		</section>
	</Container>
</div>

<Container>
	<div class="pb-32">
		<h3 class="text-4xl tracking-tight font-medium mb-5">Habilidades y tecnologias</h3>

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
	@keyframes beam {
		from {
			height: 0%;
		}

		to {
			height: 100%;
		}

		0% {
			height: 0%;
		}

		85% {
			height: 100%;
		}

		100% {
			height: 100%;
		}
	}

	.experience-list {
		display: flex;
		position: relative;
		flex-direction: column;
		--mask-percentaje: 90%;

		&::before {
			position: absolute;
			top: 1.5rem;
			height: 100%;
			transform: translateX(-50%);
			width: 1px;

			z-index: 1;
			background: linear-gradient(180deg, rgba(243, 126, 255, 1) 0%, rgba(161, 37, 255, 1) 100%);
			mask-image: linear-gradient(
				180deg,
				rgba(0, 0, 0, 1) var(--mask-percentaje),
				rgba(161, 37, 255, 0) 100%
			);

			animation: beam ease both;
			animation-timeline: scroll();
		}

		&::after {
			position: absolute;
			top: 1.5rem;
			bottom: 1.5rem;
			transform: translateX(-50%);
			border-width: 1px;
			border-color: #2b2b2b;
			mask-image: linear-gradient(
				180deg,
				rgba(0, 0, 0, 1) var(--mask-percentaje),
				rgba(161, 37, 255, 0) 100%
			);
		}
	}

	.glass {
		/* From https://css.glass */

		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
</style>
