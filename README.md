# imlargo.dev

Portfolio of Juan Carlos Largo (`@imlargo`) — senior software engineer, founder of
[Kora Studio](https://kora.imlargo.dev).

It shares Kora's design system on purpose: same neutral scale, same brand accent,
same spacing rhythm and the same motion vocabulary, because the studio and the person
behind it are the same. What separates the two sites is the voice — Manrope instead of
Kora's Space Grotesk, and the mono face carrying the identity in the wordmark, the page
titles and every date and stack label — and the content, which is a career, not an offer.

## Stack

| Layer     | Tool                                    |
| --------- | --------------------------------------- |
| Framework | SvelteKit 2 + Svelte 5 (runes)          |
| Language  | TypeScript (strict)                     |
| Styling   | TailwindCSS v4 + shadcn-svelte (`maia`) |
| Motion    | GSAP (ScrollTrigger, SplitText)         |
| Graphics  | three.js + postprocessing, ogl          |
| Testing   | Vitest (browser mode) + Playwright      |
| Hosting   | Cloudflare Workers                      |

## Structure

```
src/
├── lib/
│   ├── attachments/          # Svelte attachments: reveal, parallax, split-title, counter…
│   ├── components/
│   │   ├── cards/            # Shared cards: ProjectCard, RecordRow, SkillBadge
│   │   ├── common/           # Small shared pieces (SocialIcon)
│   │   ├── effects/          # Canvas/WebGL: PixelBlast, Iridescence, Noise
│   │   ├── layout/           # SiteHeader, Footer, section/ primitives
│   │   ├── sections/         # Cross-page bands: SiteCta, ClosingCta, PanelCtas
│   │   ├── seo/              # <Seo /> — every page mounts exactly one
│   │   └── ui/               # shadcn-svelte, style `maia`. Do not hand-edit; see below
│   ├── content/              # Every string and every record on the site
│   ├── features/             # Vertical slices: home, work, about, blog
│   ├── hooks/
│   ├── gsap.ts               # Plugin registration + reduced-motion / pointer helpers
│   └── utils.ts
└── routes/                   # Thin: <Seo /> + the feature's landing component
```

Two rules keep this from drifting:

- **A route file mounts a landing component and nothing else.** Markup lives in
  `features/<name>/components/`. If a page grows a section, the section is a file.
- **Content is not markup.** Every string lives in `src/lib/content/`. A component
  that hardcodes copy has to be changed to change a word. The one exception is the
  about-page prose, which carries inline `<SkillBadge>` and emphasis inside the
  sentences and would lose that if it were flattened to plain strings.
- **The closing CTA is one block, `<SiteCta />`, with one wording.** Every page ends
  the same way; only what comes above it changes.

## Design system

Tokens, rhythm and typography all live in `src/routes/layout.css`, commented in
place. The parts worth knowing before writing a component:

| Utility                       | What it is                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| `.px-layout`                  | The one horizontal margin. Sections apply it to themselves.                         |
| `.max-w-wx`                   | The content column. Backgrounds bleed past it; content doesn't.                     |
| `.py-section` / `.pb-section` | One unit of vertical rhythm (P). `pb-` for a block that continues the previous one. |
| `.py-hero` / `.py-section-lg` | First block (header already left air) / closing block.                              |
| `.p-card` / `.py-item`        | Card padding / list-row padding.                                                    |
| `.ty-h1` … `.ty-h4`           | The type scale. Hierarchy comes from size, never from weight.                       |
| `--color-brand`               | The accent, shared with Kora. Never a loose hex.                                    |
| `--ease-out-expo`             | The one hover curve, so micro-interactions match.                                   |

### Type

Hierarchy comes from **size, never from weight**. `.ty-h1` and `.ty-h2` carry no
weight class at all — they inherit the body's 400 — and `font-medium` is the
ceiling for everything else. The single exception is the giant footer wordmark,
which is a decorative mass rather than text to read. Emphasis inside a paragraph
is marked with **colour** (`text-foreground` against `text-muted-foreground`
prose), not by fattening the word.

No `uppercase` anywhere: labels stay in their natural case.

Use `<Section.Root>` (`$lib/components/layout/section`) rather than writing
`<section class="px-layout py-section">` by hand — it carries the margin, the
rhythm and the content column together.

Two families, no more: **Manrope** for everything (`--font-sans`, `--font-heading`)
and **Source Code Pro** for the mono — the wordmark, dates, stack labels and the
`ty-inlinecode` snippets. The mono is the site's signature; adding a third family
would dilute it.

Motion goes through the attachments in `src/lib/attachments/`, never inline GSAP.
All of them no-op under `prefers-reduced-motion: reduce`; keeping that in one
place is the reason they exist.

## Scripts

```sh
pnpm dev       # dev server
pnpm build     # production build
pnpm preview   # run the built worker locally
pnpm check     # svelte-check
pnpm lint      # prettier --check + eslint
pnpm format    # prettier --write
pnpm test      # vitest (browser) + playwright
```

### Updating shadcn components

`src/lib/components/ui/` is generated. To pull current versions of the configured
style, run `./update-components.sh` and re-check the diff — local edits to those
files get overwritten, so anything site-specific belongs in a wrapper, not in `ui/`.
