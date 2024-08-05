<section class="bg-white px-16 py-16 rounded-xl">
	<div class="flex justify-between">
		<div>
			<h2 class="font-semibold tracking-tight text-black text-4xl leading-tight">
				Tienes una idea en mente?<br />
			</h2>
			<p class="mt-7 md:text-lg leading-relaxed text-black max-w-2xl">
				Estoy abierto a escuchar sobre nuevas oportunidades. ¡No dudes en ponerte en contacto
				conmigo si tienes alguna pregunta o si quieres saludarme! Estoy seguro de que puedo ayudarte
				en lo que necesites.
			</p>
		</div>

		<div class="flex justify-end items-center">
			<a
				class="inline-flex items-center gap-1 rounded-full ring-offset-gray-900 bg-gray-50 text-gray-950 shadow-xl shadow-black/20 ring-gray-300 text-base font-medium px-5 py-2.5 w-full justify-center"
				target="_blank"
				href="https://wa.me/573136566689"
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
