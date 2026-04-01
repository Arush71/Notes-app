# 📝 Notly — Full-Stack Notes Application

A modern, full-stack notes application built with **Next.js App Router**, featuring real authentication, database persistence, and a responsive editor experience.

Designed to demonstrate **end-to-end data flow**, **modern React architecture**, and **production-style patterns** like SSR hydration and optimistic updates.

---

## 🚀 Live Demo

👉 https://<your-deployment-link>

---

## ✨ Features

* 🔐 **Authentication**

  * Email/password login & signup (Better Auth)
  * Guest access with real persisted user sessions

* 🗒️ **Notes Management**

  * Create and edit notes with real-time UI updates
  * Persistent storage in PostgreSQL (Neon)
  * Shared state between sidebar and editor

* ⚡ **User Experience**

  * Optimistic updates for instant feedback
  * Responsive layout (sidebar + editor)
  * Mobile-friendly navigation

---

## 🧱 Tech Stack

* **Frontend:** Next.js 15 (App Router), React 19, TypeScript
* **Backend:** Server Actions + API routes
* **Database:** PostgreSQL (Neon)
* **ORM:** Drizzle
* **Auth:** Better Auth
* **State Management:** TanStack Query
* **Styling:** Tailwind CSS + custom UI components

---

## 🏗️ Architecture & Data Flow

The application follows a **modern SSR + hydration pattern**:

1. **Server Components**

   * Validate user session
   * Prefetch notes data

2. **Hydration**

   * Data is dehydrated and passed to the client via `HydrationBoundary`

3. **Client Layer**

   * Hooks (`useNotes`, etc.) read from hydrated cache
   * UI updates instantly using optimistic updates

4. **Mutations**

   * Triggered via **server actions**
   * Routed through a structured data layer → database

👉 This enables:

* fast initial loads
* consistent state across components
* minimal client-server round trips

---

## 🔐 Authentication

* Implemented using **Better Auth** with Drizzle adapter
* Cookie-based session handling
* Server-side session validation (secure pattern)
* Middleware provides early route protection, with final checks on server

---

## 🗄️ Database & Persistence

* PostgreSQL (Neon) with Drizzle ORM

* Relational schema:

  * `User` (auth)
  * `Notes` (linked via `authorId`)

* All note data is **persisted in the database** (not localStorage)

---

## 🧠 Key Engineering Decisions

* **SSR + Hydration**

  * Enables session-aware initial rendering

* **Optimistic UI Updates**

  * Improves responsiveness without waiting for server confirmation

* **Separation of Concerns**

  * UI components
  * client hooks
  * server actions
  * database layer

👉 Keeps the codebase modular and maintainable

---

## ⚠️ Limitations

* Delete-note UI flow not fully implemented
* No automated tests yet
* Some minor code cleanup remains
* Not fully production-hardened (expected for project scope)

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL=...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=...
```

### 3. Push schema

```bash
pnpm db:push
```

### 4. Run locally

```bash
pnpm dev
```

App runs at: http://localhost:3000

---

## 🚀 Deployment

Recommended platform: **Vercel**

Make sure to configure:

* `DATABASE_URL`
* `BETTER_AUTH_SECRET`
* `BETTER_AUTH_URL`

---

## 🔮 Future Improvements

* Complete delete-note UX
* Add test coverage (unit + integration)
* Improve error handling and validation
* Further refine UI/UX

---

## 🏁 Final Note

This project focuses on **real-world full-stack patterns**, including authentication, database integration, and modern React architecture — going beyond simple CRUD applications.
