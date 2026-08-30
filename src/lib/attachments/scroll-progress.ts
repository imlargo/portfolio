import type { Attachment } from 'svelte/attachments';
import { gsap, prefersReducedMotion, withScrollContext } from '$lib/gsap';

/**
 * Descubre una línea de arriba abajo a medida que su contenedor cruza el
 * viewport.
 *
 * A diferencia de los reveals, que disparan una vez, este va atado al scroll
 * (`scrub`): la línea avanza y retrocede con la lectura, así que marca en qué
 * punto de la secuencia va quien lee. Se usa en la línea de tiempo del proceso.
 *
 * Recorta con `clip-path` y no con `scaleY` porque el raíl no es solo un rectángulo:
 * lleva un tramo curvo en SVG, y escalarlo en vertical lo deformaría. Recortar
 * revela el trazo tal cual está dibujado, curva incluida.
 *
 * El elemento debe cubrir el recorrido completo (normalmente `absolute inset-0`)
 * y estar dentro del contenedor que lo define, que es lo que se usa de disparador.
 */
export function useScrollProgress(): Attachment {
	return (element) => {
		const el = element as HTMLElement;

		// Sin movimiento la línea se queda completa: es un elemento gráfico de la
		// composición, no solo un indicador, y a media asta se vería como un error.
		if (prefersReducedMotion()) {
			el.style.clipPath = 'inset(0% 0% 0% 0%)';
			return;
		}

		const trigger = el.parentElement ?? el;

		return withScrollContext(el, () => {
			gsap.fromTo(
				el,
				{ clipPath: 'inset(0% 0% 100% 0%)' },
				{
					clipPath: 'inset(0% 0% 0% 0%)',
					ease: 'none',
					scrollTrigger: {
						trigger,
						start: 'top 80%',
						end: 'bottom 65%',
						scrub: 0.6
					}
				}
			);
		});
	};
}
