<div id="blob"></div>

<style lang="scss">
	@keyframes rotate {
		from {
			rotate: 0deg;
		}

		50% {
			scale: 1 1.5;
		}

		to {
			rotate: 360deg;
		}
	}

	#blob {
		width: 100%;
        height: 100%;
        border-radius: 50%;
		background: linear-gradient(to right, rgb(172, 142, 255), rgb(239, 117, 255));
		opacity: 0.3;
		animation: rotate 10s infinite linear;

		filter: blur(70px);

		z-index: -1;
	}
</style>