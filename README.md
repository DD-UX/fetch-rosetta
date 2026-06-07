# fetch-rosetta

Same app, many data layers. A comparison matrix of React data-fetching and
state architectures: the same features implemented across Redux, RTK Query,
Zustand + TanStack Query, SWR, and RSC + Server Actions, so the trade-offs
can be felt instead of read about.

## Structure

```
fetch-rosetta/
├── apps/
│   └── web/                  # Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
│       └── src/
│           ├── app/          # Routes
│           └── features/     # Feature modules (components, hooks, contexts, helpers, types)
├── packages/
│   ├── sdk/                  # Typed HTTP client, entity models, fake JWT auth
│   └── ui-kit/               # Shared base components (see below)
├── pnpm-workspace.yaml
└── turbo.json                # Turborepo task pipeline
```

## Requirements

- Node.js >= 22
- pnpm (enforced — `npm install` / `yarn` are blocked by a preinstall guard)

## Getting started

```bash
pnpm install
pnpm dev        # turbo dev → next dev for apps/web
```

## Commands

| Command          | What it does                          |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Run dev servers across the workspace  |
| `pnpm build`     | Production build (Turborepo pipeline) |
| `pnpm lint`      | ESLint across all packages            |
| `pnpm typecheck` | Strict TypeScript across the repo     |
| `pnpm format`    | Prettier over the repo                |

Each package also exposes its own `lint` and `typecheck`, runnable with
`pnpm --filter <package> <script>`.

## Packages

### `@fetch-rosetta/sdk`

Every matrix cell consumes the same SDK so comparisons stay honest:

- `createHttpClient` — typed fetch wrapper (query params, JSON bodies, Bearer token injection, typed `HttpError`)
- `createFakeJwt` / `decodeFakeJwt` / `isExpired` — structurally valid but cryptographically fake JWTs to exercise auth flows without an identity provider
- `models` — shared entity types (e.g. `Paginated<T>`)

### `@fetch-rosetta/ui-kit`

Shared base components so every matrix cell renders the exact same UI — any
difference you feel between variants is architecture, not styling.

Button, Input, Textarea, Select, Checkbox, Card (with Header/Title/
Description/Content/Footer), Badge, Alert, Avatar, Spinner, Skeleton, and an
accessible Tabs (controlled or uncontrolled).

Design notes:

- Zero runtime dependencies; a tiny `cn` join util instead of clsx
- React 19 idioms: ref-as-prop (no `forwardRef`), named type imports (no `React.` namespace)
- Tree-shakeable: ESM source exports + `"sideEffects": false`
- Only `Tabs` ships `"use client"`; everything else is server-component friendly
- Tailwind 4 aware: `cursor-pointer` applied explicitly to actionable elements
  (v4 Preflight no longer does), and consumers must `@source` the kit since
  Tailwind doesn't scan `node_modules`

## Code style

- TypeScript strict mode everywhere (`tsconfig.base.json`)
- ESLint flat configs per package (`typescript-eslint` recommended; Next.js rules in `apps/web`)
- Prettier (defaults) across the repo — `pnpm format`

## Data sources (planned)

- [DummyJSON](https://dummyjson.com) — REST with JWT auth, filters, and simulated CRUD (for mutations / optimistic updates)
- [Rick and Morty API](https://rickandmortyapi.com) — REST + GraphQL with query filters (for the GraphQL variant)
