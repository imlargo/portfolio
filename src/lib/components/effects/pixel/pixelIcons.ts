export type PixelIconMatrix = string[];

/**
 * Íconos en una retícula de 8×8, el mismo idioma de Kora: axiales, simétricos
 * cuando se puede y con trazo de uno o dos píxeles. Solo están los que usa el
 * sitio; los demás viven en Kora.
 */

/** Globo con meridiano y ecuador: la web como red. */
export const PIXEL_ICON_GLOBE: PixelIconMatrix = [
	'..1111..',
	'.1.11.1.',
	'1..11..1',
	'11111111',
	'1..11..1',
	'1..11..1',
	'.1.11.1.',
	'..1111..'
];

/** Ventana con barra de pestañas: el navegador. */
export const PIXEL_ICON_BROWSER: PixelIconMatrix = [
	'11111111',
	'1.1.1..1',
	'11111111',
	'1......1',
	'1.11...1',
	'1......1',
	'1.1111.1',
	'11111111'
];

/** Dos unidades apiladas de un rack: el servidor. */
export const PIXEL_ICON_SERVER: PixelIconMatrix = [
	'11111111',
	'1.....11',
	'11111111',
	'........',
	'11111111',
	'1.....11',
	'11111111',
	'........'
];

/** Flecha que sube desde una base: un cambio que sale a producción. */
export const PIXEL_ICON_DEPLOY: PixelIconMatrix = [
	'...11...',
	'..1111..',
	'.111111.',
	'...11...',
	'...11...',
	'...11...',
	'........',
	'11111111'
];

/** Bandera en un asta: un punto de partida o una meta. */
export const PIXEL_ICON_FLAG: PixelIconMatrix = [
	'11......',
	'1111....',
	'111111..',
	'1111....',
	'11......',
	'1.......',
	'1.......',
	'1.......'
];

/** Discos apilados: datos guardados. */
export const PIXEL_ICON_DATA: PixelIconMatrix = [
	'.111111.',
	'1......1',
	'.111111.',
	'1......1',
	'.111111.',
	'1......1',
	'.111111.',
	'........'
];

/** Escudo: proteger algo. */
export const PIXEL_ICON_SHIELD: PixelIconMatrix = [
	'11111111',
	'11....11',
	'11....11',
	'11....11',
	'.11..11.',
	'.11..11.',
	'..1111..',
	'...11...'
];

/** Visto: una prueba o un criterio que pasa. */
export const PIXEL_ICON_CHECK: PixelIconMatrix = [
	'.......1',
	'......11',
	'.....11.',
	'1...11..',
	'11.11...',
	'.111....',
	'..1.....',
	'........'
];

/** Barras que suben sobre una base: algo que se mide. */
export const PIXEL_ICON_CHART: PixelIconMatrix = [
	'......11',
	'......11',
	'...11.11',
	'...11.11',
	'11.11.11',
	'11.11.11',
	'........',
	'11111111'
];

/** Candado: algo que solo alcanza su dueño. */
export const PIXEL_ICON_LOCK: PixelIconMatrix = [
	'..1111..',
	'.11..11.',
	'.1....1.',
	'11111111',
	'11111111',
	'111..111',
	'111..111',
	'11111111'
];

/** Globo de diálogo: una conversación o una pregunta. */
export const PIXEL_ICON_DIRECT: PixelIconMatrix = [
	'.111111.',
	'1......1',
	'1......1',
	'1......1',
	'1......1',
	'.111111.',
	'..11....',
	'.11.....'
];

/** Bloques apilados: construir por capas. */
export const PIXEL_ICON_BUILD: PixelIconMatrix = [
	'...11...',
	'...11...',
	'..1111..',
	'..1111..',
	'.111111.',
	'.111111.',
	'11111111',
	'11111111'
];

/** Pincel en diagonal: los estilos. */
export const PIXEL_ICON_PALETTE: PixelIconMatrix = [
	'......11',
	'.....111',
	'....111.',
	'...111..',
	'..111...',
	'.11.....',
	'111.....',
	'11......'
];

/** Diana: entender y definir el problema. */
export const PIXEL_ICON_DEFINE: PixelIconMatrix = [
	'..1111..',
	'.1....1.',
	'1..11..1',
	'1.1..1.1',
	'1.1..1.1',
	'1..11..1',
	'.1....1.',
	'..1111..'
];
