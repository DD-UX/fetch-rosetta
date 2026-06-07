# fetch-rosetta

Same app, many data layers. A comparison matrix of React data-fetching and
state architectures: the same features implemented across Redux, RTK Query,
Zustand + TanStack Query, SWR, and RSC + Server Actions, so the trade-offs
can be felt instead of read about.

## Structure

```
fetch-rosetta/
├── apps/
│   └── web/          # Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
├── packages/
│   └── sdk/          # Shared SDK: typed HTTP client, entity models, fake JWT auth
├── pnpm-workspace.yaml
└── turbo.json        # Turborepo task pipeline
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
| `pnpm lint`      | Lint all packages                     |
| `pnpm typecheck` | Strict TypeScript across the repo     |
| `pnpm format`    | Prettier over the repo                |

## The SDK (`@fetch-rosetta/sdk`)

Every matrix cell consumes the same SDK so comparisons stay honest:

- `createHttpClient` — typed fetch wrapper (query params, JSON bodies, Bearer token injection, typed `HttpError`)
- `createFakeJwt` / `decodeFakeJwt` / `isExpired` — structurally valid but cryptographically fake JWTs to exercise auth flows without an identity provider
- `models` — shared entity types (e.g. `Paginated<T>`)

## Data sources (planned)

- [DummyJSON](https://dummyjson.com) — REST with JWT auth, filters, and simulated CRUD (for mutations / optimistic updates)
- [Rick and Morty API](https://rickandmortyapi.com) — REST + GraphQL with query filters (for the GraphQL variant)
