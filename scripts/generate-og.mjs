/**
 * Genera las imágenes de Open Graph del sitio: la tarjeta por defecto y una por
 * cada post publicado.
 *
 * Se generan como archivos estáticos y se versionan en el repositorio, en vez de
 * renderizarse por request. El sitio entero se prerenderiza y el contenido vive
 * en módulos de TypeScript, así que una imagen por post es un archivo que solo
 * cambia cuando cambia el post; hacerlo en el borde costaría un runtime de
 * Satori y un tiempo de respuesta peor justo en la petición que hace el
 * rastreador. Después de escribir o retitular un post: `pnpm og`.
 *
 * El contenido se lee con Vite, no con un `import` directo: los módulos de
 * `src/lib/content` son TypeScript con imports sin extensión y un `enum`, que
 * Node no resuelve solo.
 */
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const OUT = path.join(root, 'static/assets/og');
const FONTS = path.join(root, 'node_modules/@fontsource-variable');
const PFP = path.join(root, 'static/assets/pfp.jpg');

const BG = 'oklch(0.141 0.005 285.823)';
const FG = 'oklch(0.985 0 0)';
const MUTED = 'oklch(0.705 0.015 286.067)';
const BRAND = 'oklch(0.76 0.12 295)';

/** El acento de cada post ya viene en hex desde el contenido; el del sitio es el lila de marca. */
const shell = (accent, body) => `<!doctype html>
<html><head><meta charset="utf-8" /><style>
  @font-face { font-family: 'Manrope'; font-weight: 200 800;
    src: url('file://${FONTS}/manrope/files/manrope-latin-wght-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Geist Mono'; font-weight: 100 900;
    src: url('file://${FONTS}/geist-mono/files/geist-mono-latin-wght-normal.woff2') format('woff2'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${BG}; color: ${FG};
    font-family: 'Manrope', sans-serif; overflow: hidden; position: relative; }
  .glow { position: absolute; left: -180px; top: -220px; width: 780px; height: 780px;
    border-radius: 50%; background: radial-gradient(circle, ${accent}33 0%, transparent 62%); }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(${FG.replace(')', ' / 0.035)')} 1px, transparent 1px),
      linear-gradient(90deg, ${FG.replace(')', ' / 0.035)')} 1px, transparent 1px);
    background-size: 64px 64px; mask-image: linear-gradient(105deg, #000 0%, transparent 68%); }
  .eyebrow { font-family: 'Geist Mono', monospace; font-size: 21px; letter-spacing: 0.16em;
    text-transform: uppercase; color: ${accent}; display: flex; align-items: center; gap: 14px; }
  .eyebrow::before { content: ''; width: 34px; height: 2px; background: ${accent}; flex: none; }
  .domain { font-family: 'Geist Mono', monospace; font-size: 24px; letter-spacing: -0.01em; }
  .meta { font-family: 'Geist Mono', monospace; font-size: 20px; color: ${MUTED};
    display: flex; align-items: center; gap: 12px; }
  .dot { color: ${FG.replace(')', ' / 0.28)')}; }
  /* Filete de acento al pie: es lo que hace que dos tarjetas del mismo sitio se
     distingan de un vistazo en un feed. */
  .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 6px; z-index: 3;
    background: linear-gradient(90deg, ${accent}, transparent); }
  ${body.css}
</style></head><body>
  <div class="glow"></div><div class="grid"></div>
  ${body.html}
  <div class="bar"></div>
</body></html>`;

const escape = (s) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Tarjeta del sitio: retrato a la derecha, identidad a la izquierda. */
function siteCard(content) {
	const stack = ['Go', 'TypeScript', 'Svelte', 'Postgres', 'AWS'];

	return shell(BRAND, {
		css: `
  .wrap { position: relative; display: flex; height: 100%; }
  .left { flex: 1; padding: 76px 0 76px 76px; display: flex; flex-direction: column;
    justify-content: center; gap: 34px; }
  h1 { font-family: 'Geist Mono', monospace; font-size: 96px; font-weight: 500;
    letter-spacing: -0.045em; line-height: 1; margin-bottom: 20px; }
  .role { font-size: 33px; font-weight: 500; line-height: 1.32; max-width: 21ch; }
  .role em { font-style: normal; color: ${MUTED}; }
  .right { position: relative; width: 430px; }
  .right img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
    object-position: 46% 30%; filter: grayscale(1) contrast(1.02) brightness(1.35); }
  /* La foto se disuelve en el fondo por los cuatro lados en vez de quedar como un
     recorte rectangular pegado al borde. */
  .right::after { content: ''; position: absolute; inset: 0; z-index: 2; background:
    linear-gradient(90deg, ${BG} 0%, transparent 58%),
    linear-gradient(0deg, ${BG} 0%, transparent 34%),
    linear-gradient(180deg, ${BG} 0%, transparent 22%), ${BRAND.replace(')', ' / 0.13)')}; }`,
		html: `<div class="wrap">
    <div class="left">
      <div class="eyebrow">${escape(content.jobTitle)}</div>
      <div>
        <h1>${escape(content.name)}</h1>
        <div class="role">Go, TypeScript and Svelte — <em>architecture through deployment.</em></div>
      </div>
      <div>
        <div class="meta">${stack.map(escape).join('<span class="dot">/</span>')}</div>
        <div class="domain" style="margin-top:16px">${escape(host)}</div>
      </div>
    </div>
    <div class="right"><img src="file://${PFP}" /></div>
  </div>`
	});
}

/**
 * Tarjeta de un post: el título ocupa la tarjeta entera. El tamaño baja por
 * tramos según el largo, porque un titular de 90 caracteres a 68px se desborda y
 * uno de 30 a 44px deja la mitad de la tarjeta vacía.
 */
function postCard(post, readingTime) {
	// El título va sin markdown: en la tarjeta no hay quién lo interprete.
	const title = plainText(post.title);
	const size = title.length > 78 ? 54 : title.length > 52 ? 62 : 72;

	return shell(post.accent, {
		css: `
  .wrap { position: relative; height: 100%; padding: 76px; display: flex;
    flex-direction: column; justify-content: space-between; }
  h1 { font-size: ${size}px; font-weight: 600; line-height: 1.14; letter-spacing: -0.03em;
    max-width: 17ch; text-wrap: balance; }
  .foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; }
  .byline { font-size: 22px; color: ${MUTED}; margin-top: 14px; }`,
		html: `<div class="wrap">
    <div class="eyebrow">${escape(post.tags.slice(0, 3).join(' · '))}</div>
    <h1>${escape(title)}</h1>
    <div class="foot">
      <div>
        <div class="meta">
          <span>${post.date.replaceAll('-', '.')}</span>
          <span class="dot">/</span>
          <span>${readingTime} min read</span>
        </div>
        <div class="byline">${escape(host)}</div>
      </div>
      <div class="domain">${escape(content.name)}</div>
    </div>
  </div>`
	});
}

// --- ejecución -------------------------------------------------------------

const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' });
const { siteContent } = await vite.ssrLoadModule('/src/lib/content/site-content.ts');
const { getPosts, readingTime } = await vite.ssrLoadModule('/src/lib/content/blog.ts');
const { plainText } = await vite.ssrLoadModule('/src/lib/content/inline-markdown.ts');

const content = siteContent;
const host = new URL(siteContent.seo.siteUrl).host;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

/** El archivo se escribe con el tamaño exacto que los `og:image:*` declaran. */
async function render(html, file) {
	const tmp = path.join(OUT, '.render.html');
	await writeFile(tmp, html);
	await page.goto(`file://${tmp}`);
	await page.evaluate(() => document.fonts.ready);
	await page.screenshot({ path: file, type: 'jpeg', quality: 90 });
	await rm(tmp);
	console.log('  ✓', path.relative(root, file));
}

await mkdir(OUT, { recursive: true });

console.log('Open Graph:');
await render(siteCard(siteContent), path.join(root, 'static/assets/og.jpg'));

for (const post of getPosts()) {
	await render(postCard(post, readingTime(post)), path.join(OUT, `${post.slug}.jpg`));
}

await browser.close();
await vite.close();
