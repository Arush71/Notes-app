# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project snapshot
- Stack: Next.js 15 (App Router), React 19, TypeScript, Better Auth, Drizzle ORM (Postgres/Neon), TanStack Query, Tailwind CSS.
- Package manager: `pnpm` (see `packageManager` in `package.json`).
- Main app purpose: authenticated notes editor with sidebar list + live editable note content.

## Core development commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build for production: `pnpm build`
- Start production server: `pnpm start`
- Build + start in one command: `pnpm preview`
- Lint: `pnpm lint`
- Lint (auto-fix): `pnpm lint:fix`
- Typecheck: `pnpm typecheck`
- Combined lint + typecheck: `pnpm check`
- Prettier check: `pnpm format:check`
- Prettier write: `pnpm format:write`
- Push Drizzle schema to DB: `pnpm db:push`

## Tests
- There is currently no test runner script configured in `package.json` and no `*.test.*`/`*.spec.*` test suite in the repo.
- `src/data/test.ts` is a utility module (despite its name), not an automated test file.
- A “run single test” command does not exist yet in this repository’s current setup.

## Required environment configuration
- Environment validation is defined in `src/env.ts`.
- Required server env vars:
  - `BETTER_AUTH_SECRET`
  - `BETTER_AUTH_URL`
  - `DATABASE_URL`
- `next.config.js` imports `src/env.ts`, so env validation runs with app startup/build unless `SKIP_ENV_VALIDATION` is set.

## High-level architecture

### Routing and auth gating
- Root route `src/app/page.tsx` is a server component that checks session and redirects to `/sign-up` or `/notes`.
- Auth pages live under `src/app/(auth)/sign-in` and `src/app/(auth)/sign-up`.
- Better Auth route handler is exposed at `src/app/api/auth/[...all]/route.ts`.
- `src/middleware.ts` applies optimistic cookie-based protection to `/notes`, but authoritative auth checks are still performed in server components.

### Data/auth backend layer
- Better Auth server config: `src/lib/auth.ts` (Drizzle adapter + Next cookies plugin).
- Better Auth client for browser calls: `src/lib/auth-client.ts`.
- DB connection: `src/drizzle/db.ts` using `drizzle-orm/neon-http` and `env.DATABASE_URL`.
- Schema barrel: `src/drizzle/schema.ts`, composed from:
  - `src/drizzle/schemas/auth-schema.ts` (Better Auth tables + user relations)
  - `src/drizzle/schemas/notes-schema.ts` (notes table keyed by `authorId`)
- Drizzle kit config: `drizzle.config.ts` (schema path and migrations output).

### Notes feature data flow (important)
1. `src/app/notes/page.tsx` (server component) verifies session and prefetches notes with `getAllNotes`.
2. Prefetched query (`queryKey: ["notes"]`) is dehydrated server-side and passed through `HydrationBoundary`.
3. Client UI root `NotesMain` (`src/app/notes/_components/Notes.tsx`) reads notes via `useNotes`.
4. `useNotes` (`src/hooks/useNotes.tsx`) is hydration-only (`enabled: false`); it expects SSR-prefetched cache.
5. Mutations:
   - Add note: `useAddNote` -> server action `addNoteA` -> data fn `addNotes`.
   - Edit note: `useEditNote` -> server action `editNoteFn` -> data fn `editNote`.
6. Both mutation hooks update the React Query cache optimistically; editor and sidebar consume the same cached notes state.

### UI composition
- Global providers are wired in `src/app/layout.tsx`: theme provider, React Query provider, and Sonner toaster.
- Notes page UI split:
  - Sidebar list/search: `src/app/notes/_components/NotesSidebar.tsx`
  - Editor pane + debounced persistence: `src/app/notes/_components/NoteEdit.tsx`
- Shared UI primitives live in `src/components/ui/*`.

## Repo-specific implementation notes
- Path alias `~/*` maps to `src/*` (`tsconfig.json`); prefer alias imports over deep relative paths.
- `next.config.js` currently ignores TypeScript and ESLint errors during production builds (`ignoreBuildErrors`, `ignoreDuringBuilds`). Do not assume a successful `pnpm build` implies lint/type health; run `pnpm check` explicitly.
