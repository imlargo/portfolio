import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

// La página monta `<Seo />`, que lee `page.url` para armar la canónica. Fuera de
// una navegación real ese estado no existe, así que se sustituye por una URL
// cualquiera: lo que se está probando es que la vista renderiza, no el SEO.
vi.mock('$app/state', () => ({
	page: { url: new URL('http://localhost/'), status: 200, error: null, params: {} }
}));

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page);

		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});
});
