# AGENTS.md - AI Coding Agent Instructions

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

- **Project**: the-shipping-bible
- **Framework**: Astro 5.x (static site generator)
- **Package Manager**: Bun
- **Language**: TypeScript (strict mode)
- **Module System**: ES Modules

## Build/Lint/Test Commands

### Development

```bash
# Start development server (localhost:4321)
bun dev

# Build for production (outputs to ./dist/)
bun build

# Preview production build locally
bun preview

# Run Astro CLI commands
bun astro <command>
```

### Testing

No test framework is currently configured. If tests are added:

```bash
# Expected pattern for running all tests
bun test

# Expected pattern for running a single test file
bun test <path/to/test.ts>

# Expected pattern for running tests matching a pattern
bun test --grep "pattern"
```

### Linting/Formatting

No linter or formatter is currently configured. Consider adding:
- Biome, ESLint, or Prettier for code quality
- Run `bun astro check` for Astro-specific type checking

## Directory Structure

```
/
├── public/              # Static assets (served as-is, not processed)
│   └── favicon.svg
├── src/
│   ├── assets/          # Assets processed/optimized by Astro
│   ├── components/      # Reusable Astro components (.astro)
│   ├── layouts/         # Page layout components
│   └── pages/           # File-based routing (each file = route)
├── astro.config.mjs     # Astro configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Code Style Guidelines

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Welcome.astro`, `NavBar.astro` |
| Layouts | PascalCase | `Layout.astro`, `BaseLayout.astro` |
| Pages | lowercase | `index.astro`, `about.astro` |
| Assets | lowercase | `logo.svg`, `background.png` |
| Config files | lowercase | `astro.config.mjs` |

### Import Conventions

```typescript
// Use single quotes for imports
import { defineConfig } from 'astro/config';

// Use relative paths for local imports
import Layout from '../layouts/Layout.astro';
import Welcome from '../components/Welcome.astro';

// Import assets from src/assets/
import logo from '../assets/logo.svg';
```

### Formatting Rules

- **Indentation**: Tabs
- **Quotes**: Single quotes in JavaScript/TypeScript, double quotes in HTML attributes
- **Semicolons**: Always use semicolons
- **Line length**: No strict limit, but keep reasonable (~100-120 chars)

### Astro Component Structure

```astro
---
// 1. Imports first
import Layout from '../layouts/Layout.astro';
import Button from '../components/Button.astro';

// 2. Props interface (if applicable)
interface Props {
  title: string;
  description?: string;
}

// 3. Destructure props
const { title, description = 'Default description' } = Astro.props;

// 4. Component logic
const formattedTitle = title.toUpperCase();
---

<!-- 5. Template markup -->
<Layout title={title}>
  <main>
    <h1>{formattedTitle}</h1>
    {description && <p>{description}</p>}
  </main>
</Layout>

<!-- 6. Scoped styles -->
<style>
  main {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
```

### TypeScript Guidelines

- TypeScript strict mode is enabled via `astro/tsconfigs/strict`
- Always define prop interfaces for components
- Use proper type annotations for variables and functions
- Avoid `any` type - prefer `unknown` with type guards

```typescript
// Good
interface Props {
  items: string[];
  count: number;
}

// Avoid
interface Props {
  items: any;
  count: any;
}
```

### CSS Conventions

- Use scoped `<style>` blocks within Astro components
- Prefer class selectors over ID selectors for reusability
- Use kebab-case for class names
- Place responsive styles using media queries

```astro
<style>
  .hero-section {
    padding: 2rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    .hero-title {
      font-size: 1.5rem;
    }
  }
</style>
```

### Variable Naming

- **Variables/Functions**: camelCase (`userName`, `handleClick`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants (`MAX_ITEMS`)
- **Interfaces/Types**: PascalCase (`UserProfile`, `Props`)
- **CSS Classes**: kebab-case (`nav-bar`, `hero-section`)

## Error Handling

- Wrap async operations in try-catch blocks
- Provide meaningful error messages
- Use Astro's built-in error handling for pages

```typescript
try {
  const data = await fetchData();
} catch (error) {
  console.error('Failed to fetch data:', error);
  // Handle gracefully
}
```

## Astro-Specific Patterns

### Static vs Dynamic Assets

```astro
---
// Assets in src/assets/ - processed by Astro (optimized)
import optimizedImage from '../assets/hero.png';

// Assets in public/ - served as-is (use absolute paths)
// <img src="/favicon.svg" />
---
```

### Page Routing

- Files in `src/pages/` automatically become routes
- `src/pages/index.astro` -> `/`
- `src/pages/about.astro` -> `/about`
- `src/pages/blog/[slug].astro` -> `/blog/:slug` (dynamic route)

### Layouts

- Always wrap pages in a Layout component
- Pass page-specific data (title, description) as props

## Common Pitfalls to Avoid

1. **Don't use `node_modules` imports without installing packages first**
2. **Don't put processed assets in `public/`** - use `src/assets/`
3. **Don't forget the frontmatter fence (`---`)** in Astro components
4. **Don't use client-side JavaScript without `client:*` directives**
5. **Don't commit `.astro/` or `dist/` directories**

## Environment Variables

- `.env` - Local development variables
- `.env.production` - Production variables
- Access via `import.meta.env.VARIABLE_NAME`
- Prefix public variables with `PUBLIC_`

```typescript
// Server-side only
const apiKey = import.meta.env.API_KEY;

// Available client-side (must be prefixed)
const publicUrl = import.meta.env.PUBLIC_SITE_URL;
```
