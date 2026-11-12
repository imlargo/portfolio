/** Parte 04: Tailwind y shadcn/ui. */

export const stylesPart = {
	tailwind: {
		title: 'Tailwind CSS',
		description:
			'En lugar de escribir CSS en otro archivo, pones clases pequeñas directo en el HTML. Cada clase hace una sola cosa, y todas usan la misma escala de espacios, colores y tamaños.',
		classesLabel: 'Clases',
		cssLabel: 'El CSS de esa clase',
		resultLabel: 'Resultado',
		buttonText: 'Inscribirme',
		/**
		 * Las clases van escritas completas: Tailwind encuentra las clases leyendo
		 * el código fuente, y una clase armada por partes no la generaría.
		 */
		utilities: [
			{
				id: 'spacing',
				label: 'Espacio',
				classes: 'px-5 py-2.5',
				css: 'padding: 0.625rem 1.25rem;'
			},
			{
				id: 'shape',
				label: 'Forma',
				classes: 'rounded-full',
				css: 'border-radius: 9999px;'
			},
			{
				id: 'color',
				label: 'Color',
				classes: 'bg-brand text-background',
				css: 'background-color: var(--color-brand);\ncolor: var(--color-background);'
			},
			{
				id: 'type',
				label: 'Texto',
				classes: 'text-sm font-medium',
				css: 'font-size: 0.875rem;\nfont-weight: 500;'
			},
			{
				id: 'shadow',
				label: 'Sombra',
				classes: 'shadow-lg shadow-brand/30',
				css: 'box-shadow: 0 10px 15px -3px\n  color-mix(in oklab, var(--color-brand) 30%, transparent);'
			},
			{
				id: 'hover',
				label: 'Hover',
				classes: 'transition-opacity hover:opacity-80',
				css: ':hover { opacity: 0.8; }'
			}
		]
	},

	shadcn: {
		title: 'shadcn/ui',
		description:
			'Una colección de componentes que copias a tu proyecto con un comando. El código queda en tu repositorio y lo puedes cambiar como quieras.',
		stepsLabel: 'Cómo se usa',
		steps: [
			{ label: 'Lo agregas', code: 'npx shadcn@latest add button' },
			{ label: 'Queda en tu proyecto', code: 'components/ui/button' },
			{ label: 'Lo usas', code: '<Button>Guardar</Button>' }
		],
		variantLabel: 'Variante',
		sizeLabel: 'Tamaño',
		buttonText: 'Guardar',
		variants: ['default', 'outline', 'ghost', 'destructive'],
		sizes: ['sm', 'default', 'lg'],
		note: 'Existe para React y, con shadcn-svelte, para Svelte. Los componentes ya funcionan con teclado y lectores de pantalla.'
	}
} as const;
