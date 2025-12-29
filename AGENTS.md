# Agent Guide (edge-signal)

This repository is a Next.js (App Router) + TypeScript + Tailwind CSS v4 project.
Use this file as the source of truth for commands and coding conventions when
working as an agent.

## Repo layout

- `app/`: Next.js App Router routes (`page.tsx`, `layout.tsx`, etc.)
- `public/`: static assets served from `/`
- `demo/`: static HTML mock pages (not part of Next build)
- `.opencode/`: local tooling state for this environment (ignore in app logic)
- `eslint.config.mjs`: ESLint flat config (Next core-web-vitals + TS)
- `tsconfig.json`: TypeScript strict config + `@/*` path alias

## Package manager

- Use `npm` (a `package-lock.json` is present).
- Install deps:
  - `npm ci` (preferred for CI/repro)
  - `npm install` (ok for local iteration)

## Build / dev / start

- Dev server (http://localhost:3000): `npm run dev`
- Production build: `npm run build`
- Run production server (after build): `npm run start`

Notes:
- `next.config.ts` exists but is currently empty.
- `npm run build` (Next.js) performs TypeScript checking by default; treat it as
  the closest thing to a "full CI" command in this repo.

## Linting

The repo uses ESLint 9 flat config via `eslint.config.mjs`.

- Lint everything (configured script): `npm run lint`
- Lint the whole repo explicitly: `npx eslint .`
- Lint a single file: `npx eslint app/page.tsx`
- Lint a single file (via npm script): `npm run lint -- app/page.tsx`
- Lint + auto-fix: `npx eslint . --fix`
- Lint + auto-fix (via npm script): `npm run lint -- --fix`

If you add new directories that should be ignored by ESLint, update
`eslint.config.mjs` (it already overrides some Next default ignores).

## Type checking

TypeScript is configured with `"strict": true` in `tsconfig.json`.
There is no dedicated `typecheck` script yet.

- Typecheck (no emit): `npx tsc -p tsconfig.json --noEmit`

## Tests

No test runner is configured yet (`package.json` has no `test` script and there
are no project tests outside `node_modules`).

If/when tests are added, prefer one of these common setups:

- Unit tests (recommended): Vitest
  - Run all tests: `npx vitest run`
  - Run a single file: `npx vitest run path/to/foo.test.ts`
  - Run a single test by name: `npx vitest run -t "my test name"`
- Alternative unit tests: Jest
  - Run all tests: `npx jest`
  - Run a single file: `npx jest path/to/foo.test.ts`
  - Run a single test by name: `npx jest -t "my test name"`
- E2E tests (recommended): Playwright
  - Run all tests: `npx playwright test`
  - Run a single file: `npx playwright test tests/foo.spec.ts`
  - Run a single test by title: `npx playwright test -g "user can login"`

When adding tests, also add `npm run test` and keep single-test ergonomics.

## Cursor / Copilot rules

- No Cursor rules found in `.cursor/rules/` or `.cursorrules`.
- No Copilot instructions found in `.github/copilot-instructions.md`.

If these files are added later, treat them as authoritative and mirror their
requirements here.

## Code style (TypeScript / React / Next.js)

### Formatting

- Indentation: 2 spaces.
- Quotes: double quotes (`"..."`) in TS/JS.
- Semicolons: use semicolons.
- Prefer trailing commas where the formatter/linter expects them.
- There is no Prettier config in this repo; do not introduce formatting tools
  unless explicitly requested.

### Imports

- Prefer `import type { ... } from "..."` for type-only imports.
- Order imports (grouped with blank lines):
  1. Node built-ins (rare in app code)
  2. Next.js/React (`next/...`, `react`)
  3. Third-party libraries
  4. Absolute internal imports using the alias `@/` (configured in `tsconfig.json`)
  5. Relative imports (`./...`, `../...`)
  6. Side-effect imports (e.g. `"./globals.css"`) last

### Components and files

- Next.js App Router conventions:
  - Routes: `app/**/page.tsx`
  - Layouts: `app/**/layout.tsx`
  - Use Server Components by default; add `"use client"` only when required.
  - Keep client boundaries small: move state/effects/event handlers into leaf
    components rather than marking entire routes as client components.
  - Don’t import server-only code (env secrets, filesystem, Node-only APIs) into
    client components.
- Component naming:
  - React components: `PascalCase` functions/components.
  - Hooks: `useSomething`.
  - Utility functions: `camelCase`.
  - Constants: `SCREAMING_SNAKE_CASE`.
- Filenames:
  - Next special files must follow Next naming.
  - For new components/utilities, prefer `kebab-case.ts(x)` or mirror existing
    conventions within the folder (be consistent).

### TypeScript guidelines

- Avoid `any`; prefer `unknown` + narrowing.
- Prefer explicit return types for exported functions when the signature isn’t
  obvious or when it’s part of a public module surface.
- Use `satisfies` for object literals when you want validation without widening.
- Prefer discriminated unions over boolean flag combinations.
- Keep types close to usage; avoid “global types” unless truly shared.

### Data fetching and server code

- Always check `Response.ok` for `fetch` calls and surface meaningful errors.
- Prefer throwing errors (and letting Next error boundaries handle them) over
  silently returning partial data.
- Do not leak secrets into client components; keep tokens/credentials server-side.

### Error handling

- Prefer early returns / guard clauses.
- If you catch an error, either:
  - rethrow with context (preserving the original error as `cause` when useful), or
  - convert to a typed, user-facing error state.
- Avoid swallowing errors with empty `catch` blocks.

### CSS / Tailwind

- Global styles live in `app/globals.css`.
- Tailwind v4 is used via `@import "tailwindcss";` and CSS variables via `@theme`.
- Prefer Tailwind utility classes for component styling; only add custom CSS when:
  - it’s truly global, or
  - utilities become unreadable/duplicative.

## Agent workflow expectations

- Keep changes minimal and scoped to the task.
- Run the narrowest verification you can:
  - `npx eslint <touched files>` for quick checks.
  - `npx tsc -p tsconfig.json --noEmit` when types could be affected.
- Do not commit or push unless explicitly asked.

## Design System: Neon Broadcast (工业赛博朋克)

This project follows the "Neon Broadcast" design language. Refer to `demo/README.md`
for full specifications. Key points summarized below:

### Core Concept

- **Style**: Industrial Cyberpunk / High-Tech Interface
- **Metaphor**: The blog is a "Node" broadcasting signals to the outer grid.
- **Users**: Visitors are "Accessors", admins are "Operators".
- **Glitch Aesthetics**: Embrace scanlines, noise, and glitch effects as visual features.

### Color Palette (CSS Variables)

| Variable            | Value                      | Usage                              |
| :------------------ | :------------------------- | :--------------------------------- |
| `--bg-core`         | `#03050d`                  | Core background (near-black blue)  |
| `--bg-horizon`      | `#0a0f24`                  | Distant gradient color             |
| `--bg-panel`        | `rgba(4, 12, 24, 0.85)`    | Frosted panel background           |
| `--accent-cyan`     | `#19f7ff`                  | **Primary accent** (links, buttons)|
| `--accent-magenta`  | `#ff4fd8`                  | **Secondary accent** (warnings)    |
| `--accent-amber`    | `#ffc857`                  | **Tertiary accent** (progress bars)|
| `--text-bright`     | `#f4ffff`                  | Highlighted text                   |
| `--text-soft`       | `#9fbcd6`                  | Body text (blue-gray for comfort)  |

### Typography

| Category    | Variable          | Font Stack                              | Style             |
| :---------- | :---------------- | :-------------------------------------- | :---------------- |
| **Display** | `--font-display`  | `Orbitron` + `ZCOOL QingKe HuangYou`    | Industrial/Bold   |
| **Body**    | `--font-body`     | `Noto Sans SC` + `sans-serif`           | Modern/Clear      |
| **Mono**    | `--font-mono`     | `Share Tech Mono` + `Noto Sans SC`      | Mechanical/Terminal |

### Key UI Characteristics

1.  **Angled Containers (切角容器)**:
    Use `clip-path` instead of `border-radius` to simulate armor plates or chip housings.
    ```css
    clip-path: polygon(
        20px 0, 100% 0,
        100% calc(100% - 20px), calc(100% - 20px) 100%,
        0 100%, 0 20px
    );
    ```

2.  **Holographic Grid (全息网格)**:
    Use CSS `linear-gradient` + `perspective` transforms to create a 3D floor grid with depth.

3.  **Scanlines (扫描线)**:
    Overlay subtle horizontal stripes and occasional sweeping light bands to simulate
    CRT monitors or legacy data terminals.

4.  **Glitch Effects (故障效果)**:
    Use CSS animations with `clip-path` and color offsets for error states (e.g., 404 page).

### Design Principles for New Components

- Prefer sharp edges and cut corners over rounded corners.
- Use `backdrop-blur` for glassmorphism effects on panels.
- Add subtle glow (`box-shadow`) to accent-colored elements.
- Include decorative corner markers (small border segments) on key containers.
- Use `font-display` for headings, `font-body` for paragraphs, `font-mono` for data/code.
- Animate with `transition` for hover states; use keyframe animations sparingly for
  ambient effects (spinning borders, pulsing indicators).
