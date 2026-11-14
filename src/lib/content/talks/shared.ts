import { siteContent } from '$lib/content/site-content';

/** Los enlaces de contacto con los que cierran todas las presentaciones. */
export const talkContactLinks = [
	{ label: 'LinkedIn', href: siteContent.socials.linkedin },
	{ label: 'GitHub', href: siteContent.socials.github },
	{ label: 'imlargo.dev', href: siteContent.seo.siteUrl },
	{ label: 'Escríbeme', href: `mailto:${siteContent.email}` }
] as const;

/** Rótulo del enlace de vuelta a la lista de charlas. */
export const talkBackLabel = 'Más charlas';
