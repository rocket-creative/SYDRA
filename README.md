# Sydra

Next.js app at the repository root. Use `npm run build` from this directory.

## Branches

| Branch  | Role |
|---------|------|
| `main`  | Production (merge here when ready to ship) |
| `dev`   | Integration and staging; open pull requests into `main` when stable |

After creating a new GitHub repository, set **Settings → General → Default branch** to `main`. Push both branches (`git push -u origin main`, `git push -u origin dev`).

## Vercel

Configure in the Vercel project dashboard (these are not stored in Git):

1. **Root Directory:** leave **empty** (repository root). [`vercel.json`](vercel.json) uses `npm install` and `npm run build` here.
2. **Production Branch:** `main`.
3. **Previews:** leave Git integration previews enabled. Pushes to `dev` and pull requests get preview deployments.

## Local production build

Requires **Node.js** 20.9 or newer (see `package.json` `engines`).

```bash
npm install
npm run build
```

Smoke test the production bundle:

```bash
npm run start
```

## Stack in this repository

Shipped today: **Next.js** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Zod** on API routes (for example `src/app/api/demo/route.ts`). **PostgreSQL** is not connected; there is no database client or schema here. Adding a data layer is a separate change (connection string in server only, migrations, and validation).

Environment: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for your domain.
