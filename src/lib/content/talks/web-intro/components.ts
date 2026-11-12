import { snippet } from './snippets';

/** Parte 03: reactividad, componentes y para qué sirve un framework. */

/** Las piezas de la tienda de ejemplo en la diapositiva de componentes. */
export const SHOP_COMPONENT = {
	app: 'App',
	navbar: 'Navbar',
	cart: 'CartBadge',
	grid: 'ProductGrid',
	card: 'ProductCard',
	button: 'Button'
} as const;

export type ShopComponent = (typeof SHOP_COMPONENT)[keyof typeof SHOP_COMPONENT];

export const componentsPart = {
	reactivity: {
		title: 'Reactividad',
		description:
			'En lugar de decirle al navegador qué cambiar, describes cómo se ve la interfaz en cada estado. Cuando el estado cambia, el framework actualiza la pantalla.',
		formula: 'interfaz = f(estado)',
		stateLabel: 'Estado',
		uiLabel: 'Interfaz',
		sessionLabel: 'Sesión iniciada',
		cartLabel: 'Productos en el carrito',
		decreaseLabel: 'Quitar un producto',
		increaseLabel: 'Agregar un producto',
		/** Las llaves del estado tal como se muestran en la columna de la izquierda. */
		stateKeys: { user: 'usuario', cart: 'carrito' },
		userName: 'Ana',
		storeName: 'Tienda',
		greeting: (name: string) => `Hola, ${name}`,
		signIn: 'Iniciar sesión',
		emptyCart: 'Tu carrito está vacío.',
		cartSummary: (count: number) =>
			count === 1 ? 'Tienes 1 producto en el carrito.' : `Tienes ${count} productos en el carrito.`,
		checkout: 'Pagar',
		note: 'Fíjate que nunca tocas la interfaz. Solo cambias el estado.'
	},

	components: {
		title: 'Componentes',
		description:
			'Una interfaz se divide en piezas pequeñas que se pueden reutilizar. Cada pieza recibe datos y avisa cuando pasa algo.',
		treeLabel: 'Componentes',
		receivesLabel: 'Recibe',
		emitsLabel: 'Avisa',
		noneLabel: 'Nada',
		rule: 'Los datos bajan de padres a hijos. Los avisos suben de hijos a padres.',
		products: [
			{ name: 'Café de origen', price: '$32.000' },
			{ name: 'Taza de cerámica', price: '$45.000' },
			{ name: 'Prensa francesa', price: '$98.000' }
		],
		addLabel: 'Agregar',
		storeName: 'Tienda',
		cartCount: 2,
		/** Profundidad de cada pieza en el árbol, para la sangría. */
		items: [
			{
				id: SHOP_COMPONENT.app,
				depth: 0,
				what: 'La raíz. Guarda el estado que comparten las demás piezas, como el carrito.',
				receives: [],
				emits: []
			},
			{
				id: SHOP_COMPONENT.navbar,
				depth: 1,
				what: 'La barra de arriba. Se repite igual en todas las páginas.',
				receives: ['cantidad en el carrito'],
				emits: []
			},
			{
				id: SHOP_COMPONENT.cart,
				depth: 2,
				what: 'Muestra cuántos productos hay. No sabe nada más.',
				receives: ['cantidad'],
				emits: []
			},
			{
				id: SHOP_COMPONENT.grid,
				depth: 1,
				what: 'Recibe la lista de productos y dibuja una tarjeta por cada uno.',
				receives: ['productos'],
				emits: ['agregar al carrito']
			},
			{
				id: SHOP_COMPONENT.card,
				depth: 2,
				what: 'Un producto. El mismo componente se usa tres veces con datos distintos.',
				receives: ['nombre', 'precio'],
				emits: ['agregar']
			},
			{
				id: SHOP_COMPONENT.button,
				depth: 3,
				what: 'Un botón genérico. Lo puedes usar en cualquier parte de la aplicación.',
				receives: ['texto', 'variante'],
				emits: ['clic']
			}
		]
	},

	frameworks: {
		title: 'El mismo contador, tres veces',
		description:
			'Con JavaScript solo, tú actualizas la pantalla cada vez que algo cambia. Con un framework, cambias el estado y él se encarga del resto.',
		tryLabel: 'Pruébalo',
		counterLabel: (count: number) => `Clics: ${count}`,
		howLabel: 'Quién actualiza la pantalla',
		variants: [
			{
				id: 'vanilla',
				label: 'JavaScript',
				snippet: snippet('counterVanilla'),
				how: 'Tú. Cada vez que cambia el estado tienes que llamar a render(). Con varios estados es fácil olvidar uno.'
			},
			{
				id: 'svelte',
				label: 'Svelte',
				snippet: snippet('counterSvelte'),
				how: 'Svelte. Sabe qué partes de la pantalla dependen de count y actualiza solo esas.'
			},
			{
				id: 'react',
				label: 'React',
				snippet: snippet('counterReact'),
				how: 'React. Vuelve a ejecutar el componente con el nuevo estado y aplica solo las diferencias.'
			}
		]
	}
} as const;
