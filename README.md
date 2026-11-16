# Northstar Portal

The customer-facing portal for Northstar. Customers sign in here to review their orders and manage their account.

To get started with Northstar as a customer, you should install the northstar CLI:

```sh
brew install northstar
```

Then, you can start creating an account and project with:

```sh
northstar auth create-account
northstar auth create-project
```

## Stack

- [Next.js](https://nextjs.org) (App Router, Cache Components)
- React 19
- Tailwind CSS v4
- TypeScript

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description                     |
| ------------ | ------------------------------- |
| `pnpm dev`   | Start the development server    |
| `pnpm build` | Create a production build       |
| `pnpm start` | Serve the production build      |
| `pnpm lint`  | Run ESLint                      |

## Project structure

```
src/
  app/
    (dashboard)/     # Authenticated customer pages
  components/        # Shared UI components
```
