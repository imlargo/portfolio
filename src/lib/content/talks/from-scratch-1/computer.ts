/** Parte 01: qué hay dentro de una computadora, el binario y el sistema operativo. */

export const computerPart = {
	inside: {
		title: 'Qué hay dentro de una computadora',
		description:
			'Cuatro piezas hacen casi todo el trabajo. Para entenderlas sirve pensar en la cocina de un restaurante.',
		partsLabel: 'Piezas',
		analogyLabel: 'En la cocina',
		exampleLabel: 'En tu portátil',
		note: 'Un programa es la receta: le dice al cocinero qué hacer, paso por paso.',
		parts: [
			{
				id: 'cpu',
				label: 'Procesador',
				short: 'CPU',
				analogy: 'El cocinero',
				what: 'Ejecuta las instrucciones, una tras otra, a una velocidad enorme.',
				example: 'Uno de 3 GHz hace unos 3.000 millones de ciclos por segundo.'
			},
			{
				id: 'ram',
				label: 'Memoria',
				short: 'RAM',
				analogy: 'El mesón',
				what: 'Donde está lo que se usa en este momento. Es muy rápida, pero se borra al apagar.',
				example: 'Entre 8 y 16 GB.'
			},
			{
				id: 'storage',
				label: 'Almacenamiento',
				short: 'Disco',
				analogy: 'La despensa',
				what: 'Donde se guardan tus archivos y programas aunque apagues el equipo. Es más lento que la RAM.',
				example: 'Entre 256 GB y 1 TB.'
			},
			{
				id: 'io',
				label: 'Entrada y salida',
				short: 'E/S',
				analogy: 'Los pedidos y los platos',
				what: 'Por donde entran las órdenes y salen los resultados.',
				example: 'Teclado, mouse y wifi entran; pantalla y parlantes salen.'
			}
		]
	},

	binary: {
		title: 'Todo son ceros y unos',
		description:
			'Por dentro, una computadora solo distingue dos estados: hay corriente o no hay. Con muchos de esos interruptores juntos se puede guardar cualquier cosa.',
		bitsLabel: 'Un byte: ocho bits',
		bitHint: 'Toca cada bit para prenderlo o apagarlo',
		numberLabel: 'Como número',
		letterLabel: 'Como letra',
		noLetter: 'No es una letra',
		initial: 65,
		note: 'Cada letra que escribes se guarda como un número. La A es el 65, la B el 66. Una foto, una canción o un video también son números, solo que muchísimos.',
		units: [
			{ label: '1 byte', what: 'Una letra' },
			{ label: '1 KB', what: 'Unas mil letras: media página' },
			{ label: '1 MB', what: 'Una foto pequeña' },
			{ label: '1 GB', what: 'Una película corta' }
		]
	},

	os: {
		title: 'El sistema operativo',
		description:
			'El programa que administra a todos los demás. Reparte el procesador y la memoria entre las aplicaciones y les da acceso a los archivos, la red y la pantalla.',
		layersLabel: 'Capas',
		layers: [
			{
				id: 'apps',
				label: 'Aplicaciones',
				what: 'Lo que usas todos los días. Cada una le pide cosas al sistema operativo.',
				examples: ['Navegador', 'Spotify', 'WhatsApp', 'VS Code']
			},
			{
				id: 'os',
				label: 'Sistema operativo',
				what: 'Hace de intermediario: ninguna aplicación toca el hardware directamente.',
				examples: ['macOS', 'Windows', 'Linux', 'iOS', 'Android']
			},
			{
				id: 'hardware',
				label: 'Hardware',
				what: 'Las piezas físicas que vimos: procesador, memoria, disco, pantalla.',
				examples: ['CPU', 'RAM', 'Disco', 'Pantalla']
			}
		],
		note: 'Los programas que vamos a escribir también le piden cosas al sistema operativo, o al navegador, que a su vez se las pide al sistema operativo.'
	}
} as const;
