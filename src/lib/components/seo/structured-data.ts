import { siteContent } from '$lib/content/site-content';
import { plainText } from '$lib/content/inline-markdown';
import { getLabel } from '$lib/content/technology';
import type { Post, PostSummary } from '$lib/content/types';

/**
 * El JSON-LD del sitio, armado desde el mismo `siteContent` que pinta las
 * páginas. La regla es que nada acá se escriba dos veces: si un dato ya vive en
 * el contenido, esto lo lee; si no vive en ninguna parte, va al contenido y no
 * acá. Un dato estructurado que contradice lo que se ve en pantalla es peor que
 * no tenerlo.
 */

const { seo, socials, skills } = siteContent;
const SITE = seo.siteUrl;
const LANG = 'en';

/**
 * Identificadores estables. Los nodos que se repiten entre páginas se declaran
 * una vez y el resto los referencia por `@id`, que es como un buscador reconoce
 * que el autor de un post y el dueño del sitio son la misma persona.
 */
const PERSON = `${SITE}/#person`;
const WEBSITE = `${SITE}/#website`;
const BLOG = `${SITE}/blog#blog`;

type Node = Record<string, unknown>;

const ref = (id: string) => ({ '@id': id });

export function absolute(path: string): string {
	return new URL(path, SITE).href;
}

/**
 * La tarjeta para compartir propia de un post, generada por `pnpm og`. El nombre
 * sale del slug, así que la ruta se deriva sin guardarla en el contenido.
 */
export function postImage(slug: string): string {
	return `/assets/og/${slug}.jpg`;
}

/** Una fecha `YYYY-MM-DD` como instante ISO; los buscadores esperan zona horaria. */
const isoDate = (date: string) => new Date(`${date}T00:00:00Z`).toISOString();

/** El autor, y de paso la entidad que el sitio representa. */
const person = (): Node => ({
	'@type': 'Person',
	'@id': PERSON,
	name: siteContent.fullName,
	alternateName: siteContent.name,
	url: SITE,
	image: absolute(seo.defaultImage),
	jobTitle: siteContent.jobTitle,
	description: seo.defaultDescription,
	email: `mailto:${siteContent.email}`,
	knowsAbout: [...new Set(Object.values(skills.groups).flat().map(getLabel))],
	worksFor: { '@type': 'Organization', name: 'Kora Studio', url: socials.kora },
	address: {
		'@type': 'PostalAddress',
		addressLocality: seo.locality,
		addressRegion: seo.region,
		addressCountry: seo.country
	},
	// `sameAs` es lo que permite unir este sitio con los perfiles de la misma
	// persona en otras plataformas.
	sameAs: [socials.github, socials.linkedin, socials.instagram, socials.kora]
});

const website = (): Node => ({
	'@type': 'WebSite',
	'@id': WEBSITE,
	url: SITE,
	name: seo.siteName,
	description: seo.defaultDescription,
	inLanguage: LANG,
	publisher: ref(PERSON),
	copyrightHolder: ref(PERSON)
});

type Crumb = { name: string; path: string };

/** Home siempre encabeza; la página actual cierra. */
const breadcrumb = (trail: Crumb[]): Node => ({
	'@type': 'BreadcrumbList',
	itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, position) => ({
		'@type': 'ListItem',
		position: position + 1,
		name: crumb.name,
		item: absolute(crumb.path)
	}))
});

type PageSpec = {
	type: string;
	path: string;
	name: string;
	description: string;
	/** Fragmento del `@id`, para distinguir este nodo de otros en la misma URL. */
	fragment?: string;
	/** Migas después de Home. La home no lleva. */
	trail?: Crumb[];
	/** Campos propios del tipo; se aplican al final, así que pueden pisar los comunes. */
	extra?: Node;
	/** Nodos sueltos del grafo, aparte de la persona y la propia página. */
	nodes?: Node[];
};

/**
 * El grafo de una página. La persona va en todas y no solo en la home: cada
 * documento tiene que entenderse por sí solo, porque un buscador puede llegar a
 * cualquier URL sin haber visto las demás.
 */
function graph({ type, path, name, description, fragment, trail, extra, nodes }: PageSpec): string {
	const url = absolute(path);

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			person(),
			...(nodes ?? []),
			{
				'@type': type,
				'@id': `${url}#${fragment ?? 'webpage'}`,
				url,
				name: plainText(name),
				description: plainText(description),
				isPartOf: ref(WEBSITE),
				inLanguage: LANG,
				...(trail && { breadcrumb: breadcrumb(trail) }),
				...extra
			}
		]
	});
}

/**
 * Home. Es la única que declara el `WebSite`, y la que Google mira para decidir
 * si esto merece un panel de conocimiento.
 */
export const homeSchema = (): string =>
	graph({
		type: 'ProfilePage',
		path: '/',
		name: seo.defaultTitle,
		description: seo.defaultDescription,
		nodes: [website()],
		extra: { about: ref(PERSON), mainEntity: ref(PERSON) }
	});

export const aboutSchema = (): string =>
	graph({
		type: 'AboutPage',
		path: '/about',
		name: siteContent.about.title,
		description: siteContent.about.description,
		trail: [{ name: 'About', path: '/about' }],
		extra: { about: ref(PERSON), mainEntity: ref(PERSON) }
	});

/**
 * Work: los proyectos como `ItemList`. Cada uno entra como `CreativeWork` y solo
 * lleva `url` cuando existe una pública: la mayoría de estos sistemas son
 * privados, y una URL inventada es justo lo que un buscador puede verificar.
 */
export const workSchema = (): string => {
	const { workPage } = siteContent;
	const projects = [...workPage.groups.flatMap((group) => group.items), ...workPage.side.projects];

	return graph({
		type: 'CollectionPage',
		path: '/work',
		name: workPage.title,
		description: workPage.description,
		trail: [{ name: 'Work', path: '/work' }],
		extra: {
			about: ref(PERSON),
			mainEntity: {
				'@type': 'ItemList',
				numberOfItems: projects.length,
				itemListElement: projects.map((project, position) => ({
					'@type': 'ListItem',
					position: position + 1,
					item: {
						'@type': 'CreativeWork',
						name: plainText(project.title),
						description: plainText(project.description),
						creator: ref(PERSON),
						...(project.url && { url: project.url })
					}
				}))
			}
		}
	});
};

/**
 * Índice del blog. Las entradas van con lo justo para identificarlas: el `@id`
 * es el mismo que declara la página del post, así que el buscador une las dos
 * mitades solo y acá no hay una segunda copia de los metadatos que mantener.
 */
export const blogSchema = (posts: PostSummary[]): string =>
	graph({
		type: 'Blog',
		path: '/blog',
		fragment: 'blog',
		name: siteContent.blog.metaTitle,
		description: siteContent.blog.description,
		trail: [{ name: 'Writing', path: '/blog' }],
		extra: {
			author: ref(PERSON),
			publisher: ref(PERSON),
			blogPost: posts.map((post) => ({
				'@type': 'BlogPosting',
				'@id': `${absolute(`/blog/${post.slug}`)}#article`,
				url: absolute(`/blog/${post.slug}`),
				headline: plainText(post.title),
				datePublished: isoDate(post.date)
			}))
		}
	});

/**
 * Un post. `mainEntityOfPage` es lo que ata el artículo a su URL; sin él Google
 * lo trata como una cita suelta y no como el contenido de la página.
 */
export const postSchema = (post: Post, words: number, readingTime: number): string =>
	graph({
		type: 'BlogPosting',
		path: `/blog/${post.slug}`,
		fragment: 'article',
		name: post.title,
		description: post.description,
		trail: [
			{ name: 'Writing', path: '/blog' },
			{ name: plainText(post.title), path: `/blog/${post.slug}` }
		],
		extra: {
			mainEntityOfPage: ref(absolute(`/blog/${post.slug}`)),
			headline: plainText(post.title),
			image: absolute(postImage(post.slug)),
			datePublished: isoDate(post.date),
			dateModified: isoDate(post.updated ?? post.date),
			author: ref(PERSON),
			publisher: ref(PERSON),
			isPartOf: ref(BLOG),
			keywords: post.tags,
			articleSection: post.tags[0],
			wordCount: words,
			timeRequired: `PT${readingTime}M`
		}
	});
