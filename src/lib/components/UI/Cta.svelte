<section class="rounded-xl bg-white px-16 py-16">
	<div class="flex justify-between">
		<div>
			<h2 class="text-4xl font-semibold leading-tight tracking-tight text-black">
				Tienes una idea en mente?<br />
			</h2>
			<p class="mt-7 max-w-2xl leading-relaxed text-black md:text-lg">
				Estoy abierto a escuchar sobre nuevas oportunidades. ¡No dudes en ponerte en contacto
				conmigo si tienes alguna pregunta o si quieres saludarme! Estoy seguro de que puedo ayudarte
				en lo que necesites.
			</p>
		</div>

		<div class="flex items-center justify-end">
			<a
				class="inline-flex w-full items-center justify-center gap-1 rounded-full bg-gray-50 px-5 py-2.5 text-base font-medium text-gray-950 shadow-xl shadow-black/20 ring-gray-300 ring-offset-gray-900"
				target="_blank"
				href="mailto:jclargob@gmail.com"
			>
				<span>Contactame</span>
				<i class="bi bi-arrow-right"></i>
			</a>
		</div>
	</div>
</section>

<style lang="scss">
	a {
		z-index: 1;
		position: relative;
		-webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
		box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
		transition: all 200ms;
		overflow: hidden;
		color: #e8e8e8;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;

			border-radius: 999px;
			background-color: #212121;
			z-index: -1;
			-webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
			box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
			transition: all 250ms;
		}

		&:hover {
			color: #e8e8e8;
			&::before {
				width: 100%;
			}
		}

		&:active {
			color: #e8e8e8;
			transform: scale(0.8);
		}
	}
</style>
