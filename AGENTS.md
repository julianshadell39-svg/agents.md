# AGENTS Guidelines for This Repository

This repository contains a Next.js application located in the root of this repository. When
working on the project interactively with an agent (e.g. the Codex CLI) please follow
the guidelines below so that the development experience – in particular Hot Module
Replacement (HMR) – continues to work smoothly.

## 1. Use the Development Server, **not** `npm run build`

* **Always use `npm run dev` (or `pnpm dev`, `yarn dev`, etc.)** while iterating on the
  application.  This starts Next.js in development mode with hot-reload enabled.
* **Do _not_ run `npm run build` inside the agent session.**  Running the production
  build command switches the `.next` folder to production assets which disables hot
  reload and can leave the development server in an inconsistent state.  If a
  production build is required, do it outside of the interactive agent workflow.

## 2. Keep Dependencies in Sync

If you add or update dependencies remember to:

1. Update the appropriate lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`).
2. Re-start the development server so that Next.js picks up the changes.

## 3. Coding Conventions

* Prefer TypeScript (`.tsx`/`.ts`) for new components and utilities.
* Co-locate component-specific styles in the same folder as the component when
  practical.

## 4. Linting

Run ESLint before committing or submitting changes:

```bash
npm run lint
# or
pnpm lint
```

Fix any reported errors or warnings before pushing. Linting checks TypeScript types and
code style across the project.

## 5. Testing

If a test suite is present, run it to verify your changes don't break existing behaviour:

```bash
npm run test
# or
pnpm test
```

* Add or update tests for any code you change.
* All tests must pass before merging.

## 6. Branch Naming

Use descriptive, lowercase, hyphen-separated branch names that reflect the scope of
work:

```
<type>/<short-description>
```

Examples:
* `feat/add-faq-section`
* `fix/hero-layout-mobile`
* `docs/update-agents-md`
* `chore/update-dependencies`

## 7. Useful Commands Recap

| Command            | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the Next.js dev server with HMR.             |
| `npm run lint`     | Run ESLint checks.                                 |
| `npm run test`     | Execute the test suite (if present).               |
| `npm run build`    | **Production build – _do not run during agent sessions_** |
| `pnpm install`     | Install / sync dependencies.                       |

---

Following these practices ensures that the agent-assisted development workflow stays
fast and dependable.  When in doubt, restart the dev server rather than running the
production build.
