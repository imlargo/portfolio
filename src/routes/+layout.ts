/**
 * Todo el sitio se prerenderiza. El contenido vive en módulos de TypeScript, no
 * en una base de datos, así que no hay nada que resolver por request: cada ruta
 * puede salir del build como HTML terminado.
 *
 * Importa para el SEO por dos razones. Un rastreador recibe el documento completo
 * en la primera respuesta, sin ejecutar JavaScript ni esperar a un worker frío,
 * y esa respuesta la sirve el CDN desde el borde, lo que mantiene el LCP —que
 * Google mide como señal de ranking— en el rango bueno sin trabajo extra.
 */
export const prerender = true;
