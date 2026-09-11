# imlargo — Portfolio content

Juan Carlos Largo (@imlargo) · Senior Software Engineer · Medellín, Colombia
jclargob@gmail.com

- Site name: imlargo
- Default title: imlargo · Senior Software Engineer
- Title template: `%s · imlargo`
- Default description: Juan Carlos Largo (@imlargo). Senior Software Engineer in Medellín, Colombia. Frontend tech lead at Unergy, previously founding engineer at Butter. TypeScript, Svelte and React on the frontend, Go and Node.js on the backend. 20+ systems shipped, all still running.
- Locale: en_US

Navigation: Home · Work · Writing · About
Header socials: [GitHub](https://github.com/imlargo) · [LinkedIn](https://www.linkedin.com/in/imlargo/) · [Instagram](https://instagram.com/imlargo)
Footer — Elsewhere: [GitHub](https://github.com/imlargo) · [LinkedIn](https://www.linkedin.com/in/imlargo/) · [Instagram](https://instagram.com/imlargo) · [Kora Studio](https://kora.imlargo.dev) · [Resume](/files/resume.pdf)

---

# Home

## Hero

**Open to remote**

# Hi, I'm largo

Senior Software Engineer, 4 years. Frontend tech lead in an 11-engineer product organization, and before that the founding engineer who took an international SaaS from idea to production alone. TypeScript and Svelte on the frontend, Go and Node.js on the backend. 20+ systems shipped, all still running.

- Primary CTA: Contact me → `mailto:jclargob@gmail.com`
- Secondary CTA: Resume → `/files/resume.pdf`

## My experience

Full technical ownership across several industries and team sizes.

CTA: Resume → `/files/resume.pdf`

### Frontend Tech Lead — Unergy

_Feb 2026 - Present_

Technical lead for frontend in an 11-engineer product organization at a solar energy company, on an enterprise platform of 20+ modules serving 200+ internal users and 100+ investors. Originated Gandalf, a headless design system shipped as an internal npm package and now standard across 4 applications, refactored 6 core modules for 20% smaller bundles and load times, and lead a module-by-module Vue-to-Svelte migration that has held zero regressions.

Stack: Vue · Svelte · TypeScript · Tailwind · Vitest · Playwright

### Senior Software Engineer — ASCUN

_Dec 2025 - Feb 2026_

Sole engineer rebuilding a national gender-based-violence prevention platform for Colombia's association of universities and its Ministry of Education, serving 64+ universities under strict compliance requirements for citizen data. Rewrote 3 product surfaces in React and TypeScript, redesigned a legacy Node.js backend into a layered architecture with ~70 documented API routes, and took a data-heavy Leaflet map of Colombia out of a severe rendering bottleneck.

Stack: TypeScript · React · Node.js · Postgres · Leaflet

### Founding Engineer — Butter

_Jan 2025 - Jan 2026_

Sole technical owner of a US-founded content-generation SaaS, from idea to 1,500 active users, and technical lead for 3 full-stack engineers as the team grew. Built the AI pipeline that differentiated it (multi-model LLM selection, FFmpeg, GPU scheduling) running 2,000+ jobs/day at ~2.4 min median, plus Stripe billing, a multi-vendor marketplace and the observability behind 99.9% uptime.

Stack: Go · TypeScript · Svelte · Postgres · Redis · Docker · AWS · Grafana

### Independent Software Consultant — Kora Studio

_Jan 2024 - Jan 2026_

Independent practice run part-time alongside full-time roles, delivering production systems across education, public sector, construction and retail. 15+ systems as sole architect and engineer, from the core information system of a construction firm operating in Cartagena, Bogotá and Miami to LLM-powered agents, leading delivery with a recurring team of 4 freelance engineers. Every client by referral.

Stack: Go · TypeScript · Svelte · Vue · Node.js · Postgres · Docker · AWS

### Software Engineer — Universidad Nacional de Colombia

_Nov 2023 - Dec 2025_

Only technical person on staff at the Faculty of Engineering, building mission-critical internal systems in daily production use. A field-trip platform that cut approval cycles from 1-2 weeks to under 30 minutes across 200+ trips a semester, a real-time air-quality platform ingesting a sensor network across Medellín accurate enough to publish research from, and a learning platform with an integrated code judge. 4+ systems handed off, still running independently.

Stack: Go · TypeScript · Svelte · Node.js · Python · Postgres · Firebase

## Selected projects

Open source and side projects. Most exist because I needed the same thing three times first.

CTA: See all my work → `/work`

### Pegaso

Multi-constraint schedule builder for Universidad Nacional de Colombia, grown to 6,200+ active users through entirely organic adoption. The university's later official platform adopted its core design decisions, and the institution explored acquiring it.

Stack: Svelte · Go · TypeScript · Postgres · Tailwind
Links: https://pegaso.imlargo.dev · https://github.com/imlargo/pegaso

### air

HTTP client for TypeScript built on native fetch: 300 lines, zero dependencies, ~2 kB. I had rewritten the same wrapper in every project, so I wrote it once properly. Runs in production across company and client systems.

Stack: TypeScript
Links: https://www.npmjs.com/package/@imlargo/air · https://github.com/imlargo/air

### Medusa

Go framework on Gin: auth, Postgres, Redis, S3 storage, SSE and Prometheus already wired. Extracted from production systems and deployed back into them, so the abstractions had to survive somewhere real first.

Stack: Go · Gin · Postgres
Links: https://github.com/imlargo/medusa-template

### coral

A Svelte component layer on top of shadcn that ships composed patterns instead of primitives. The pieces I rebuild on every frontend, packaged once.

Stack: Svelte · TypeScript · Tailwind
Links: https://github.com/imlargo/coral

### sse

Server-Sent Events for Go. Connections, broadcasting and per-client fan-out behind a small surface.

Stack: Go
Links: https://github.com/imlargo/sse

### Gleam WebPush

Web Push for Gleam, following RFC 8291 and 8292. No external dependencies, only OTP crypto. There was no library for it, so I wrote one.

Stack: Gleam
Links: https://hexdocs.pm/webpush/index.html · https://github.com/imlargo/gleam-webpush

## Skills & Technologies

Svelte, React and TypeScript on the frontend, with design systems and real-time interfaces on top; Go and Gin on the backend, all the way through to production monitoring.

- **Frontend:** Svelte, React, Vue.js, TypeScript, Astro, Tailwind, HTML, CSS, SCSS
- **Backend:** Go, Gin, Node.js, Python
- **Data:** PostgreSQL, Redis, MongoDB
- **Infrastructure & Observability:** Docker, AWS, GitHub Actions, CI/CD, Grafana, Prometheus
- **Testing:** Vitest, Playwright
- **Design & Tooling:** Figma, Git, GitHub

## Closing CTA

### Tell me what you're building.

Open to remote roles.

- Primary CTA: Contact me → `mailto:jclargob@gmail.com`
- Secondary CTA: GitHub → https://github.com/imlargo

---

# About

## About me

> Juan Carlos Largo (@imlargo), senior software engineer based in Medellín, Colombia. Frontend tech lead at Unergy, previously founding engineer at Butter.

Hi, I'm **Juan Carlos Largo** (`@imlargo`). Senior software engineer, 4 years, based in Medellín, Colombia.

I build systems that go to production and stay there. 20+ shipped since 2023, all still running. Mostly `TypeScript`, `Svelte` and `Go`, full-stack with architectural depth on both sides. I design the APIs I consume, so integration is a strength rather than a handoff.

Right now I lead frontend at **Unergy**, a solar energy company, inside an 11-engineer product organization. The platform runs the business: 20+ modules, 200+ internal users, forms rendered from backend schemas. I started Gandalf, the headless design system that is now standard across 4 applications, and I'm migrating the platform from `Vue` to `Svelte` module by module, with zero regressions so far.

Before that I was the founding engineer at **Butter**, a US-founded content-generation SaaS I took from idea to 1,500 users alone, and the sole engineer behind a national gender-based-violence prevention platform for 64+ universities, built with Colombia's Ministry of Education.

For two years, alongside those roles, I ran an independent practice under the name **Kora Studio**: 15+ production systems across education, public sector, construction and retail, as sole architect and engineer, every client by referral.

What I publish comes out of that work. If a library of mine exists, it's because I needed it three times first: air, coral, medusa, Web Push for `Gleam`. Pegaso, a course scheduling platform for Universidad Nacional de Colombia, grew to 6,200+ users with no advertising.

I care about small surfaces, sane defaults, and code that still reads well six months later. I'd rather own the whole thing than a slice of it.

- Primary CTA: Contact me → `mailto:jclargob@gmail.com`
- Secondary CTA: Resume → `/files/resume.pdf`
- Socials: GitHub · Instagram · LinkedIn

## Closing CTA

### Tell me what you're building.

Open to remote roles.

---

# Blog

**Blog**

## Things I have built, the decisions behind them _and the parts I got wrong._

Meta title: Writing
Description: Things I have built, the decisions behind them and the parts I got wrong.

---

## The fetch wrapper I had rewritten in every project

_2026-09-05 · TypeScript, Open Source, API Design · featured_

> The `api.ts` I had retyped from scratch in every app, written once as a package. Most of the work was deciding what belonged in it: the rules that came before the code, and the reason behind each of the eight options that survived.

Every project grows the same file. `api.ts` or `http.ts`, wrapping `fetch`: join a base URL, serialize a body, parse the response, throw on a non-2xx. None of it is hard. I retyped it every time anyway, because copying the old one over felt worse.

It is never finished, either. It grows a token header when the app adds auth, a `Content-Type` exception the first time someone uploads a file, a second branch when the framework hands me its own `fetch`. By then it is a small library living inside an application, untested and unnamed.

So I wrote it once, on purpose, as a package. The client in air is seven files, about 380 lines of code, no dependencies. It builds a URL, detects a body, parses a response, and throws an error that carries the response with it.

```ts
const api = air.create({ baseURL: 'https://api.example.com' });

const user = await api.get<User>('/users/1');
const page = await api.get<Page<User>>('/users', { query: { page: 2, active: true } });
const created = await api.post<User>('/users', { body: { name: 'Ada' } });
```

### Why not one of the existing ones

I read the three clients people compare it to first, and measured them rather than trust the impression each one leaves. Bundled, minified and gzipped: `axios` 19.2 kB in the browser and 65 kB on the server, `ky` 8.8 kB, `ofetch` 4 kB and 36 kB.

- `axios` predates universal `fetch`, which explains most of it: an adapter layer over XHR and Node `http`, interceptors, CJS. Still the default answer in most of the ecosystem.
- `ky` is the closest sibling: `fetch`-only, zero dependencies, ESM-only, one author's taste applied consistently. It makes the opposite call on batteries, and out of the box times out at 10 s and retries twice.
- `ofetch` has almost the ergonomics I wanted and pays for Node compatibility to get there: three dependencies and a polyfill that is most of its server cost. It also retries GET and HEAD once, silently.

None of that is wrong. It is a different bet about who owns the decisions. `ky` hands back a response you call `.json<User>()` on; `axios`, a `data` property to unwrap on every call. Two of the three retry on their own, so a request I believe I sent once may have been sent twice. My bet is that those four things are the whole job. air is 1.9 kB gzipped, the same in the browser and on the server, because there is no second transport.

The same document carries the unflattering half: those three have years of resolved edge cases and about 160 million weekly downloads between them; air has one author, a test suite, and the four systems of mine that run it. I wrote it into the repo so I would not be tempted to frame it better later.

### The rules came before the code

The first commit that mattered was a document, not code: less code is better, zero dependencies ever, native `fetch` with no polyfill and no second transport, ESM only, predictable over clever, types are the docs. Then a list of what air is not allowed to become: interceptor chains, plugins, retries or timeouts in any form, caching, deduplication, Node-only features that break in a browser.

A lot of ceremony for a package this size, and it earned its place. On day one the pressure to add a feature does not come from users; there are none. It comes from me at 11 p.m., deciding one small option would be convenient. With the rule written down I have to argue with the document first, and I lose more often than I win.

The first rule needed a counterweight. "Less code is better" justifies any omission: the cost of a feature you shipped shows up in the diff, the cost of one you did not shows up nowhere. So every review asks a second question next to _what can we remove_: what can a user not do at all?

That question found the gaps. Auto-parsing is the point of a wrapper like this, right up until you want something that lives on the response rather than in it: a `Link` header, an `ETag`, `201` versus `200`, the final URL after a redirect. None of it was reachable on a successful call, and nobody would have filed an issue; they would have dropped to `fetch` and moved on. Every client carries a `raw` twin now, same seven methods, resolving to `{ data, response }`.

### One implementation, not two

air had to work two ways: called directly, `air.get(url)`, and as a factory, `air.create({ baseURL })`. The obvious implementation gives you two code paths, a default instance and a constructor, and they drift the first time an option lands in one and not the other.

So the root export is just another client, created with empty defaults. One implementation to keep correct.

```ts
export const air = create();
```

The same idea decided the internals. One helper lists the seven verbs and builds both the plain client and the raw one, so a method cannot be added to one and forgotten in the other. Both project from a single `request()` that resolves to both halves; a second path is where they would start disagreeing about what a request is. Seven flat files, no directory tree, no barrel except the entry point.

### Eight options, and what each one had to prove

The options table is the part I rewrote most. Every option is permanent: something a user has to learn, something I keep true in every version after this one.

`baseURL` joins as strings rather than resolving as URLs. Standard resolution treats a leading slash as origin-root, so `https://api.test/v1` plus `/users` drops the `/v1` and breaks any API mounted under a path. A leading `//` is read as a path for the same reason: stray double slashes are far more common than the protocol-relative case, which is deprecated anyway. I changed that rule once and reverted it when a test showed `///users` resolving to `https://users/`.

`query` refuses to guess. Values are primitives or arrays of primitives, enforced by the type, so a `Date` or a nested object is a compile error instead of an `[object Object]` you find in production. `undefined` and `null` are dropped; `false`, `0` and the empty string are kept. That is the same bug I have written by hand in a dozen of those `api.ts` files.

```ts
await api.get('/search', { query: { tags: ['a', 'b'], page: 2, draft: false } });
// ?tags=a&tags=b&page=2&draft=false

await api.get('/search', { query: { since: new Date() } });
// compile error: serialize it yourself, so the format stays your decision
```

Body detection never re-serializes a valid `fetch` body: objects and arrays become JSON with a `Content-Type`, while `FormData`, `Blob`, `URLSearchParams`, typed arrays and strings pass through untouched. `FormData` is the one place air overrides the caller, deleting a `Content-Type` even when it was set explicitly: the multipart boundary is generated at send time, so no literal value a caller could write is ever correct. It is the most common bug in wrappers like this.

Then errors, the reason people wrap `fetch` in the first place. A non-2xx throws an `AirError` carrying the status, the parsed body, the response, and the request as it went out, resolved headers included. `options.headers` may still be an unevaluated function, useless when you are holding a 401 and want to know which token went with it.

```ts
try {
	await api.post('/users', { body: input });
} catch (error) {
	if (isAirError(error) && error.status === 422) {
		return error.data as ValidationProblem;
	}
	throw error;
}
```

### Two options that take a function

The first user-facing bug was a client that kept sending an expired token. A `headers` object passed to `create()` is evaluated once and frozen in the closure, so every request after a refresh sends the stale one. A long-lived client and a rotating token are the normal case, not the exotic one.

The fix stayed inside the existing option: `headers` may be a function, called once per request. Header sources merge lazily too, so a chain of `create()` calls nests closures and nothing resolves until the request that needs it. Merging eagerly would reintroduce the frozen token one layer down.

```ts
const api = air.create({
	baseURL: 'https://api.example.com',
	headers: () => ({ Authorization: `Bearer ${getToken()}` }),
	signal: () => AbortSignal.timeout(5000)
});
```

`signal` later took the same shape for the same reason, so the pattern has a name: an option may be a function when its correct value is only knowable per request. Which is not a licence to make everything a thunk: `baseURL` and `parse` cannot go stale between requests.

### What I decided not to build

`timeout` and `retry` both existed, and both came out. The timeout was built the obvious way: an `AbortController` in the client, a timer that aborts it, the caller's signal forwarded in, a `finally` that tears both down. But `fetch()` resolves when the headers arrive, not when the body has been read, so the cleanup disarmed the timer exactly as the download started. Against a server that drips its body over ten seconds, the request hung forever despite a 500 ms timeout and an abort at 50 ms. `AbortSignal.timeout(ms)` and `AbortSignal.any([...])` are native, so deleting the option deleted the bridge the bug lived in. `signal` goes to `fetch` untouched.

Retry went for a subtler reason. A retry loop has to tell a transient failure from a request the caller cancelled on purpose, and the only reliable source is the `AbortSignal` itself: `abort(reason)` takes any reason, so sniffing the error's `name` for `AbortError` reads a deliberate cancellation as transient. Mine retried cancelled requests three times, and it could not be fixed where it sat: a generic helper that receives a callback and an error never has the signal in scope. In the caller's own code the loop is five lines and the signal is right there.

The rule generalizes past retries: moving a decision out of the client only works if the information behind it moves out too. Before extracting anything, check which of the two it needs.

### What the tests could not tell me

All three bugs air has shipped got through a green test run: a streaming request body that threw at the transport, a shared signal that broke a client permanently after five seconds, a `null` header that went out as the string `"null"`. That is the shape of the tool rather than a coverage gap. The suite mocks `fetch`, and a mock agrees with whatever its author already believed.

Real `fetch` refuses a `ReadableStream` body without `duplex: 'half'`, rejects an already-fired signal before sending, and stringifies a `null` header instead of deleting the key. A hand-written double does none of that unless you already knew about the bug. So `examples/` became the integration lane: eight files, each a README recipe made executable against a local server and real `fetch`, asserting what it demonstrates. They are TypeScript that Node runs directly, type-checked against the built package, so a recipe cannot drift from the types it shows. CI runs them on every supported Node, and all three bugs are pinned there.

### What it cost to publish

The last stretch had nothing to do with HTTP. `dist/` was gitignored while `files` pointed at it, so publishing from a clean checkout would have shipped a package with no code in it; `npm publish --dry-run` in a fresh clone caught it, and that is now the thing I do before every release. The name `air` was taken, so it went out as `@korastd/air`, under a studio scope, and moved to `@imlargo/air` at 2.0 once it was clear this was a personal project; the old name is deprecated and points at the new one. CI publishes through OIDC rather than a stored token.

### What a month in production changed

Four of my own systems moved onto air the week it shipped. A month of running it there, and of measuring it against the other three clients, changed it more than the design document had. Two of the changes broke 1.0, which is why the current version is 2.1 rather than 1.3.

One was a type that lied. A `204`, or any empty body, had always resolved to `null`; the signature promised `T`. I had written that compromise down as acceptable, because `T | null` puts a null check on every caller for a case most of them never hit. Rereading it a month later, it was a lie the compiler was helping me tell. Every call now resolves to `T | null`, and the cost is one `if (!user)` per endpoint that can answer empty, which is where the check belonged all along.

The other widened the list of content types handed back unread, from three to nine, so a `stream+json` or `json-seq` endpoint is a stream on the first request rather than a promise that never settles.

The 2.1 change was the retry rule, and it came from the same lesson that removed retries in the first place. A generic helper never had the caller's signal in scope. A wrapper around `fetch` does: it receives `init.signal` and can refuse to retry anything already aborted without guessing from the error's name. So the rule went from no retries in any form to none inside the client, and `retry` ships as a function you hand to the `fetch` option, next to token refresh, download progress and two serializers, each under its own import path. Importing one loads one file. The client is still 2 kB.

```ts
import { retry } from '@imlargo/air/retry';
import { refresh } from '@imlargo/air/refresh';

const api = air.create({
	baseURL: 'https://api.example.com',
	headers: () => ({ Authorization: `Bearer ${session.token}` }),
	fetch: retry({ attempts: 3, fetch: refresh({ headers: renewToken }) })
});
```

The review that found the bugs asked how each utility could be misused, not how it worked. Sending the renewal request through the client that carries `refresh` would deadlock it, waiting on the refresh it was part of, so `refresh` now hands your function the unwrapped `fetch` to call the renewal with. A lowercase `methods: ['post']` never matched anything. Both are tests now, and the misuse pass is a rule in the contributing guide, because I did not run it the first time.

The comparison numbers at the top no longer come from a table I measured once. `pnpm bench` runs every client in a fresh process, in random order, five rounds, with the server in its own process, and the same workflow runs from the Actions tab so anyone can reproduce the report with a button. It also retired a sentence I had been saying: on my laptop, air was indistinguishable from raw `fetch`; on a four-thread CI runner with small payloads it costs about 15 %, ofetch 18 %, ky 35 %, axios half. With large bodies every client disappears into the parsing. The version that survives both machines is that air and ofetch sit in the lowest-overhead group, so that is what the README says.

The same run recorded what each client does with the same request. `ky` throws `SyntaxError` on a 204 if you call `.json()`. `ky` and `axios` hang on an endpoint that never closes. `axios` sends a multipart body labelled `application/x-www-form-urlencoded`. None of those show up in a speed table, and they are the bugs a user meets in production.

What is left is 183 tests, a 3 kB client, five utilities that never touch it, and a contributing guide that records why each decision went the way it did, including the ones that removed something and the one that put something back.

That guide is the part I would keep if I had to throw the rest away. A feature that shipped is documented by the code that implements it. A feature that was considered and rejected leaves no trace, and without somewhere to write down why, I would eventually put every one of them back.
