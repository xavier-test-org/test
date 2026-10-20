# Northstar Portal

The customer-facing portal for Northstar. Customers sign in here to review their orders and manage their account.

## Stack

- [Next.js](https://nextjs.org) (App Router, Cache Components)
- React 19
- Tailwind CSS v4
- TypeScript
- [Drizzle ORM](https://orm.drizzle.team) with [PGlite](https://pglite.dev) (embedded Postgres)
- [Zod](https://zod.dev) for request and form validation

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `pnpm dev`         | Start the development server                 |
| `pnpm build`       | Create a production build                    |
| `pnpm start`       | Serve the production build                   |
| `pnpm lint`        | Run ESLint                                   |
| `pnpm db:generate` | Generate a migration from `src/db/schema.ts` |
| `pnpm db:studio`   | Browse the database with Drizzle Studio      |

## Database

The schema lives in `src/db/schema.ts` and migrations in `drizzle/`. Migrations run automatically on first database access, and a sample customer is seeded so the portal works out of the box.

Locally the database runs in memory, so changes are reset when the server restarts.

## Project structure

```
src/
  app/
    (dashboard)/     # Authenticated customer pages
      settings/      # Account settings (profile)
    api/             # Route handlers
  components/        # Shared UI components
  db/                # Drizzle schema, client, and seed data
  lib/               # Domain logic and validation
drizzle/             # SQL migrations
```
