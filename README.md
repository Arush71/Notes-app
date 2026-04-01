# Notly — Full-Stack Notes App
A full-stack Next.js notes application with authentication, real PostgreSQL persistence, and a responsive editor experience.
Built with App Router patterns (server components + hydration) and an end-to-end auth/data layer.

## Live Demo
Deployment URL: `<add-your-live-demo-link>`

## Features
- Email/password authentication (sign up + sign in) via Better Auth.
- Continue as Guest flow (creates a real guest account/session).
- Auth-gated notes workspace.
- Notes create and edit flows persisted to PostgreSQL.
- Shared notes state between sidebar and editor via TanStack Query cache.
- Optimistic UI updates for add/edit note actions.
- Responsive notes UI with sidebar + editor layout and mobile back navigation.

Current scope notes:
- Delete-note backend helper exists, but there is no complete delete-note UI flow yet.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- Better Auth
- TanStack Query
- Tailwind CSS + reusable UI primitives

## Architecture & Data Flow
1. Server components handle auth gating and prefetch notes:
   - `src/app/notes/page.tsx` validates session and prefetches notes query data.
2. Server-prefetched data is dehydrated and passed through `HydrationBoundary`.
3. Client components consume hydrated cache using hooks:
   - `useNotes` reads from React Query cache (hydration-first strategy).
4. User mutations run through server actions:
   - Add/edit note hooks call server actions in `src/app/notes/action.ts`.
5. Server actions call DB-layer functions in `src/app/data/notes/*`.
6. Hooks apply optimistic cache updates so UI responds immediately while persistence completes.

## Authentication
- Uses Better Auth with Drizzle adapter (`src/lib/auth.ts`).
- Auth API handler is exposed at `src/app/api/auth/[...all]/route.ts`.
- Session handling is cookie-based.
- Routes/pages validate session server-side before rendering protected content.
- Middleware provides optimistic route protection, while authoritative checks remain in server components.

## Database & Persistence
- Database access is through Drizzle ORM + Neon Postgres.
- Schema includes Better Auth tables (`user`, `session`, `account`, etc.) and app notes table.
- Notes are relationally tied to users through `authorId`.
- App data is persisted in PostgreSQL (not localStorage).

## Key Engineering Decisions
- SSR prefetch + hydration for faster, session-aware initial load.
- Optimistic updates for responsive note editing UX.
- Separation of concerns:
  - UI components (`src/app/notes/_components/*`)
  - client hooks (`src/hooks/*`)
  - server actions (`src/app/notes/action.ts`)
  - DB/data functions (`src/app/data/notes/*`, `src/drizzle/*`)

## Limitations / Known Gaps
- No complete delete-note UI flow yet.
- No automated test suite currently configured.
- Some legacy/cleanup work remains in parts of the codebase.
- Not fully production hardened yet (e.g., broader operational hardening and test coverage).

## Getting Started (Local Setup)
### 1) Install dependencies
```bash
pnpm install
```

### 2) Configure environment variables
Create a `.env` file and set:
```bash
DATABASE_URL=...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=...
```

### 3) Push schema to database
```bash
pnpm db:push
```

### 4) Run the app
```bash
pnpm dev
```

App runs at `http://localhost:3000`.

## Deployment
- Recommended platform: Vercel.
- Ensure all required environment variables are set in deployment settings:
  - `DATABASE_URL`
  - `BETTER_AUTH_SECRET`
  - `BETTER_AUTH_URL`

## Future Improvements
- Add complete delete-note UI flow.
- Introduce automated tests (unit/integration/e2e).
- Improve validation/error boundaries and production hardening.
- Continue cleanup/refactoring of legacy code paths.
