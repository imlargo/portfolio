<script lang="ts">
	import './layout.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { SiteHeader, Footer } from '$lib/components/layout';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	// Fundido entre páginas con la View Transitions API del navegador. No hay
	// librería ni estado detrás: se le entrega la navegación al navegador y él
	// interpola el antes y el después.
	//
	// Donde la API no existe, el `return` temprano deja la navegación normal, sin
	// fallback que mantener. La duración y el respeto por `prefers-reduced-motion`
	// se resuelven en el CSS, sobre los pseudo-elementos `::view-transition-*`.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<!-- `modeStorageKey` propio: la clave por defecto puede traer un 'light' guardado
     de antes de esta decisión, y el script que mode-watcher inyecta en el head lo
     aplicaría antes de que hidrate nada. Con clave nueva no hay nada guardado y
     el modo por defecto —oscuro— gana desde el arranque. -->
<ModeWatcher defaultMode="dark" track={false} modeStorageKey="imlargo-mode" />
<Toaster />

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-ring"
>
	Skip to main content
</a>

<SiteHeader />

<!-- Sin `px-layout` ni `gap` acá: el margen lateral y el ritmo vertical los pone
     cada sección sobre sí misma, así una banda puede sangrar a pantalla completa
     sin pelear con este contenedor. -->
<main id="main-content" class="relative flex w-full flex-col items-center">
	{@render children()}
</main>

<Footer />
