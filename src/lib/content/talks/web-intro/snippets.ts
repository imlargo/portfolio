import type { CodeSnippet } from '$lib/features/deck/code-snippets';

/**
 * Todo el código de la masterclass, por id. Se resalta una sola vez durante el
 * build; el contenido de cada diapositiva lo referencia con `snippet()`, que no
 * compila si el id no existe.
 */
export const webIntroSnippets = {
	fetchGet: {
		language: 'js',
		code: `const response = await fetch('/api/tasks/42');
const task = await response.json();`
	},
	wireGet: {
		language: 'http',
		code: `GET /api/tasks/42

200 OK
{
  "id": 42,
  "title": "Preparar la clase",
  "done": false
}`
	},
	fetchPost: {
		language: 'js',
		code: `await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Grabar la clase' })
});`
	},
	wirePost: {
		language: 'http',
		code: `POST /api/tasks
{ "title": "Grabar la clase" }

201 Created
{
  "id": 43,
  "title": "Grabar la clase",
  "done": false
}`
	},
	fetchPatch: {
		language: 'js',
		code: `await fetch('/api/tasks/43', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ done: true })
});`
	},
	wirePatch: {
		language: 'http',
		code: `PATCH /api/tasks/43
{ "done": true }

200 OK
{
  "id": 43,
  "title": "Grabar la clase",
  "done": true
}`
	},
	fetchDelete: {
		language: 'js',
		code: `await fetch('/api/tasks/43', { method: 'DELETE' });`
	},
	wireDelete: {
		language: 'http',
		code: `DELETE /api/tasks/43

204 No Content`
	},

	layerHtml: {
		language: 'html',
		label: 'index.html',
		code: `<article class="card">
  <h2>Desarrollo web</h2>
  <p>Masterclass de introducción.</p>
  <button id="like">
    ♥ Me gusta <span id="count">0</span>
  </button>
</article>`
	},
	layerCss: {
		language: 'css',
		label: 'styles.css',
		code: `body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #09090b;
  color: #fafafa;
}

.card {
  padding: 1.5rem;
  border: 1px solid #27272a;
  border-radius: 1rem;
  background: #18181b;
}

.card p { color: #a1a1aa; }

#like {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 999px;
  background: #fafafa;
  cursor: pointer;
}

#like.liked { background: #c4b5fd; }`
	},
	layerJs: {
		language: 'js',
		label: 'script.js',
		code: `const button = document.querySelector('#like');
const count = document.querySelector('#count');

button.addEventListener('click', () => {
  count.textContent = Number(count.textContent) + 1;
  button.classList.add('liked');
});`
	},

	counterVanilla: {
		language: 'js',
		label: 'counter.js',
		code: `let count = 0;
const button = document.querySelector('button');

function render() {
  button.textContent = \`Clics: \${count}\`;
}

button.addEventListener('click', () => {
  count += 1;
  render();
});

render();`
	},
	counterSvelte: {
		language: 'svelte',
		label: 'Counter.svelte',
		code: `<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>
  Clics: {count}
</button>`
	},
	counterReact: {
		language: 'tsx',
		label: 'Counter.tsx',
		code: `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clics: {count}
    </button>
  );
}`
	},

	serviceTasks: {
		language: 'ts',
		label: 'services/tasks.ts',
		code: `import { supabase } from './supabase';

export async function getTasks() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) throw error;
  return data;
}`
	}
} as const satisfies Record<string, CodeSnippet>;

export type WebIntroSnippetId = keyof typeof webIntroSnippets;

/** Referencia a un fragmento desde el contenido. Existe solo para que un id mal escrito no compile. */
export const snippet = (id: WebIntroSnippetId) => id;
