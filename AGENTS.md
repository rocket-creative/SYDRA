# Agent Instructions

## Read the installed Next.js docs before writing code
This project's Next.js version ships version-matched documentation at `node_modules/next/dist/docs/`.

Read the relevant guide there before writing or changing anything touching Next.js APIs: routing, caching, `'use cache'`, metadata, Server Actions, middleware, or `next.config.ts`.

Major versions carry breaking changes. The installed docs are correct for the installed version. Training data is not. When they disagree, the installed docs win.

Check the installed version first:
```bash
node -p "require('next/package.json').version"
```

## Project rules
Behavioral, stack, design, SEO, security, and git rules live in `.cursor/rules/*.mdc`. `core.mdc` and `git.mdc` apply to every request.
