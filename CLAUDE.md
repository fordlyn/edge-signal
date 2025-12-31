# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**霓虹广播 (Neon Broadcast)** - An industrial cyberpunk blog system built with Next.js 16 App Router, TypeScript, and Tailwind CSS v4. The project features a distinctive "Neon Broadcast" design language with glitch aesthetics, holographic grids, and neon-accented UI elements.

## Essential Commands

### Development
```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build (includes TypeScript checking)
npm run start        # Run production server (after build)
npm run lint         # Run ESLint on all files
npx tsc --noEmit     # Type-check without emitting files
```

### Linting Specific Files
```bash
npx eslint app/page.tsx              # Lint single file
npx eslint app/ --fix                # Lint and auto-fix directory
npm run lint -- app/page.tsx --fix  # Using npm script
```

### Package Management
- **Use npm** (package-lock.json is present)
- `npm ci` for CI/reproducible builds
- `npm install` for local development

## Architecture Overview

### Route Structure (Route Groups)

The application uses Next.js route groups to organize pages into logical sections:

```
app/
├── (public)/           # Public-facing pages (no auth required)
│   ├── page.tsx        # Home page - dashboard with post grid
│   ├── post/[slug]/    # Dynamic MDX post pages
│   ├── tags/[tag]/     # Tag filtering pages
│   ├── categories/     # Category pages
│   ├── archive/        # Post archive
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   └── search/         # Search functionality
├── (auth)/             # Authentication pages
│   └── login/          # Login page (client component)
├── dashboard/          # Admin dashboard (protected)
│   ├── layout.tsx      # Dashboard layout
│   ├── page.tsx        # Dashboard home
│   ├── editor/         # MDX post editor
│   ├── posts/          # Post management
│   ├── comments/       # Comment management
│   └── settings/       # Settings
├── maintenance/        # Maintenance mode page
├── layout.tsx          # Root layout (fonts, metadata)
├── globals.css         # Global styles (design system)
├── error.tsx           # Error boundary
└── not-found.tsx       # 404 page with glitch effects
```

**Key Architectural Decisions:**
- Route groups `(public)` and `(auth)` organize pages without affecting URL structure
- Default to Server Components; use `"use client"` only when needed (interactivity, hooks)
- Small client boundaries: isolate interactive pieces (e.g., Navbar path highlighting, Login form)

### MDX Content System

Posts are stored as `.mdx` files in `content/posts/` with:
- **Frontmatter**: exported as `metadata` object (title, date, excerpt, tags, category, source)
- **Custom Components**: DataPanel, SignalAlert, TerminalBlock, HoloImage, SystemMetric, SignalQuote
- **Dynamic Import**: `lib/posts.ts` handles metadata extraction and post loading
- **Type Safety**: All metadata validated with TypeScript type guards

**Working with Posts:**
1. Read `lib/posts.ts` to understand post loading logic
2. Check `mdx-components.tsx` for available MDX components and styling
3. MDX components are in `components/mdx/`
4. Example post structure in `content/posts/silicon-life.mdx`

### Component Organization

```
components/
├── cyberpunk/          # Core reusable UI components
│   ├── CyberCard.tsx   # Angled card with clip-path styling
│   ├── CyberButton.tsx # Neon-styled buttons (cyan/magenta/ghost)
│   └── GlitchText.tsx  # Animated glitch effect text
├── mdx/                # MDX-specific components
│   ├── DataPanel.tsx   # Info panels with colored borders
│   ├── SignalAlert.tsx # Alert boxes (info/warning/error)
│   ├── SignalQuote.tsx # Styled blockquotes
│   ├── TerminalBlock.tsx # Code blocks with terminal styling
│   ├── HoloImage.tsx   # Images with holographic borders
│   └── SystemMetric.tsx # Stat displays
├── Navbar.tsx          # Top navigation (client component for active links)
└── Footer.tsx          # System log footer
```

### Design System: Neon Broadcast

**Core Concept:** Industrial cyberpunk aesthetic where the blog is a "Node" broadcasting signals to the outer grid. Visitors are "Accessors", admins are "Operators".

**Color System (CSS Variables in `app/globals.css`):**
```css
--bg-core: #03050d           /* Deep space background */
--accent-cyan: #19f7ff       /* Primary accent (links, buttons) */
--accent-magenta: #ff4fd8    /* Secondary accent (warnings) */
--accent-amber: #ffc857      /* Tertiary accent (progress bars) */
--text-bright: #f4ffff       /* Highlighted text */
--text-soft: #9fbcd6         /* Body text (blue-gray) */
```

**Typography:**
- Display: `--font-display` (Orbitron + ZCOOL QingKe HuangYou) - headings
- Body: `--font-body` (Noto Sans SC) - paragraphs
- Mono: `--font-mono` (Share Tech Mono) - code/data

**Key Visual Patterns:**
1. **Angled Containers**: Use `clip-path: polygon(...)` instead of `border-radius` for armor-plate aesthetics
2. **Holographic Grid**: 3D perspective grid background (`.grid-floor` in globals.css)
3. **Scanlines**: CRT-style overlay effects (`.scan-overlay`)
4. **Glitch Effects**: Color separation and clip-path animations for errors/404

**When Creating New Components:**
- Sharp edges over rounded corners
- `backdrop-blur` for glassmorphism on panels
- Subtle glow (`box-shadow`) on accent colors
- Corner markers (small border segments) on containers
- Use existing cyberpunk components as templates

### Type System

**TypeScript Configuration:**
- Strict mode enabled (`tsconfig.json`)
- Path alias: `@/*` maps to project root
- MDX types included via `@types/mdx`

**Key Types:**
- `PostMetadata` (lib/posts.ts): title, date, excerpt, tags, category, source
- `PostListItem`: slug + metadata
- MDX component props follow standard React types

## Code Style Guidelines

### Imports Order
1. Node built-ins (rare)
2. Next.js/React (`next/...`, `react`)
3. Third-party libraries
4. Absolute imports via `@/...`
5. Relative imports (`./...`)
6. Side-effect imports (CSS) last

### Component Patterns
- Server Components by default
- Add `"use client"` only when:
  - Using hooks (useState, useEffect, etc.)
  - Using browser APIs
  - Handling events (onClick, onChange)
- Keep client boundaries small (push to leaf components)
- Don't import server-only code into client components

### File Naming
- Next.js special files: `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`
- Components: `PascalCase.tsx` or `kebab-case.tsx` (match existing folder conventions)
- Utilities: `kebab-case.ts`

### TypeScript Best Practices
- Avoid `any`; prefer `unknown` + type narrowing
- Explicit return types for exported functions
- Use `satisfies` for type validation without widening
- Type guards for runtime validation (see `isValidMetadata` in lib/posts.ts)

### Styling
- Prefer Tailwind utility classes
- Custom CSS only for:
  - Global design system variables
  - Complex animations (keyframes in globals.css)
  - Patterns that would be unreadable as utilities
- Use CSS variables for theme colors: `var(--accent-cyan)`, etc.

## Working with This Codebase

### Adding a New Blog Post
1. Create `content/posts/your-slug.mdx`
2. Export metadata object:
   ```tsx
   export const metadata = {
     title: "Your Title",
     date: "2025-01-01", // YYYY-MM-DD
     excerpt: "Brief description",
     tags: ["tag1", "tag2"],
     category: "Your Category",
     source: "Source Name",
   };
   ```
3. Use available MDX components: DataPanel, SignalAlert, TerminalBlock, etc.
4. Post will automatically appear on home page (sorted by date)

### Adding a New MDX Component
1. Create component in `components/mdx/YourComponent.tsx`
2. Export from `components/mdx/index.ts`
3. Import in `mdx-components.tsx` and add to components object
4. Follow cyberpunk design patterns (angled containers, neon accents)

### Modifying the Design System
- Colors: Update CSS variables in `app/globals.css` `:root` section
- Fonts: Modify imports in `app/layout.tsx`
- Global animations: Add/edit keyframes in `app/globals.css`
- Component defaults: Check `components/cyberpunk/` for reusable patterns

### Testing Changes
```bash
# Quick validation
npx eslint path/to/changed-file.tsx
npx tsc --noEmit

# Full validation (recommended before commits)
npm run build
```

## Important Notes

- **No test runner configured yet** - if adding tests, prefer Vitest for units, Playwright for E2E
- **No Prettier config** - maintain existing formatting style (2 spaces, double quotes, semicolons)
- **MDX hydration**: `mdx-components.tsx` includes special logic to prevent `<p>` wrapping block elements (see `hasBlockLevelChild`)
- **Font loading**: Chinese fonts use `preload: false` to avoid blocking
- **Route groups**: `(public)` and `(auth)` don't affect URLs but organize code
- **Build as CI**: `npm run build` performs both build and type checking

## References

- Full design specs: `demo/README.md` (if exists)
- Migration notes: `MIGRATION_COMPLETE.md`
- Agent conventions: `AGENTS.md` (contains detailed code style rules)
