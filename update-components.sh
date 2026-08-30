#!/usr/bin/env sh
# Re-adds every shadcn component the project already has, pulling the current
# version of the configured style (`maia`) from the registry. Run it after
# bumping `shadcn-svelte`; `components.json` is what decides style and tokens.
pnpm exec shadcn-svelte add $(ls src/lib/components/ui/ | tr '\n' ' ') -y --overwrite
