import { siteContent } from '$lib/content/site-content';
import { getLabel } from '$lib/content/technology';
import type { Post, PostSummary } from '$lib/content/types';

/**
 * El JSON-LD del sitio, armado desde el mismo `siteContent` que pinta las
 * páginas. La regla es que nada acá se escriba dos veces: si un dato ya vive en
 * el contenido, esto lo lee; si no vive en ninguna parte, va al contenido, no
 * acá. Un dato estructurado que contradice lo que se ve en pantalla es peor que
 * no tenerlo.
 */

const { seo, socials, skills } = siteContent;

const SITE = seo.siteUrl;

/**
 * Identificadores estables. Los nodos que se repiten entre páginas —la persona,
 * el sitio— se declaran una sola vez y el resto los referencia por `@id`, que es
 * como Google reconoce que el autor de un post y el dueño del sitio son el mismo.
 */
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;
export const BLOG_ID = `${SITE}/blog#blog`;

export function absolute(path: string): string {
	return new URL(path, SITE).href;
}

/** Una fecha `YYYY-MM-DD` como instante ISO; los buscadores esperan zona horaria. */
function isoDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toISOString();
}

type Node = Record<string, unknown>;

/** El autor, y de paso la entidad que el sitio representa. */
function person(): Node {
	return {
		'@type': 'Person',
		'@id': PERSON_ID,
		name: siteContent.fullName,
		alternateName: siteContent.name,
		url: SITE,
		image: absolute(seo.defaultImage),
		jobTitle: siteContent.jobTitle,
		description: seo.defaultDescription,
		email: `mailto:${siteContent.email}`,
		knowsAbout: Object.values(skills.groups)
			.flat()
			.map(getLabel)
			.filter((label, i, all) => all.indexOf(label) === i),
		worksFor: {
			'@type': 'Organization',
			name: 'Kora Studio',
			url: socials.kora
		},
		address: {
			'@type': 'PostalAddress',
			addressLocality: seo.locality,
			addressRegion: seo.region,
			addressCountry: seo.country
		},
		// `sameAs` es lo que le permite a un buscador unir este sitio con los
		// perfiles de la misma persona en otras plataformas.
		sameAs: [socials.github, socials.linkedin, socials.instagram, socials.kora]
	};
}

function website(): Node {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: SITE,
		name: seo.siteName,
		description: seo.defaultDescription,
		inLanguage: 'en',
		publisher: { '@id': PERSON_ID },
		copyrightHolder: { '@id': PERSON_ID }
	};
}

function breadcrumbs(trail: { name: string; path: string }[]): Node {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: absolute(crumb.path)
		}))
	};
}

function graph(...nodes: Node[]): string {
	return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

/**
 * Home: la persona y el sitio. Es la única página que declara el `WebSite`, y
 * la que Google usa para decidir si esto merece un panel de conocimiento.
 */
export function homeSchema(): string {
	return graph(person(), website(), {
		'@type': 'ProfilePage',
		'@id': `${SITE}/#webpage`,
		url: SITE,
		name: seo.defaultTitle,
		description: seo.defaultDescription,
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },
		mainEntity: { '@id': PERSON_ID },
		inLanguage: 'en'
	});
}

export function aboutSchema(): string {
	return graph(person(), {
		'@type': 'AboutPage',
		'@id': `${SITE}/about#webpage`,
		url: absolute('/about'),
		name: siteContent.about.title,
		description: siteContent.about.description,
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },
		mainEntity: { '@id': PERSON_ID },
		inLanguage: 'en',
		breadcrumb: breadcrumbs([{ name: 'About', path: '/about' }])
	});
}

/**
 * Work: la colección de proyectos como `ItemList`. Cada proyecto con URL propia
 * se declara como `SoftwareSourceCode` o `CreativeWork` según tenga repositorio
 * o no, que es la diferencia que un buscador puede verificar.
 */
export function workSchema(): string {
	const { workPage } = siteContent;
	const projects = [...workPage.groups.flatMap((group) => group.items), ...workPage.side.projects];

	return graph(person(), {
		'@type': 'CollectionPage',
		'@id': `${SITE}/work#webpage`,
		url: absolute('/work'),
		name: workPage.title,
		description: workPage.description,
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': PERSON_ID },
		inLanguage: 'en',
		breadcrumb: breadcrumbs([{ name: 'Work', path: '/work' }]),
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: projects.length,
			itemListElement: projects.map((project, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				item: {
					'@type': 'CreativeWork',
					name: project.title,
					description: project.description,
					creator: { '@id': PERSON_ID },
					...(project.url ? { url: project.url } : {})
				}
			}))
		}
	});
}

/** Índice del blog: el `Blog` y la lista de entradas, para los enlaces de sitio. */
export function blogSchema(posts: PostSummary[]): string {
	return graph(person(), {
		'@type': 'Blog',
		'@id': BLOG_ID,
		url: absolute('/blog'),
		name: siteContent.blog.metaTitle,
		description: siteContent.blog.description,
		isPartOf: { '@id': WEBSITE_ID },
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		inLanguage: 'en',
		breadcrumb: breadcrumbs([{ name: 'Writing', path: '/blog' }]),
		blogPost: posts.map((post) => ({
			'@type': 'BlogPosting',
			'@id': `${absolute(`/blog/${post.slug}`)}#article`,
			headline: post.title,
			description: post.description,
			url: absolute(`/blog/${post.slug}`),
			datePublished: isoDate(post.date),
			keywords: post.tags,
			author: { '@id': PERSON_ID }
		}))
	});
}

/**
 * Un post. `mainEntityOfPage` es lo que ata el artículo a su URL, y sin él
 * Google trata el `BlogPosting` como una cita suelta en vez de como el contenido
 * de la página.
 */
export function postSchema(post: Post, meta: { readingTime: number; words: number }): string {
	const url = absolute(`/blog/${post.slug}`);

	return graph(person(), {
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		url,
		headline: post.title,
		description: post.description,
		image: absolute(seo.defaultImage),
		datePublished: isoDate(post.date),
		dateModified: isoDate(post.date),
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		isPartOf: { '@id': BLOG_ID },
		keywords: post.tags,
		articleSection: post.tags[0],
		wordCount: meta.words,
		timeRequired: `PT${meta.readingTime}M`,
		inLanguage: 'en',
		breadcrumb: breadcrumbs([
			{ name: 'Writing', path: '/blog' },
			{ name: post.title, path: `/blog/${post.slug}` }
		])
	});
}
