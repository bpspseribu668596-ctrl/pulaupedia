<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Pulau Pedia BPS3101 - Inisialisasi Proyek

## Tech Stack

### Core Framework
- **Next.js 16.3.0** - React framework dengan App Router
- **React 19.2.8** - Library UI
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing dengan @tailwindcss/postcss

### Development Tools
- **ESLint 9** - Linting dengan eslint-config-next
- **TypeScript Config** - Strict mode enabled, path aliases (@/*)

## Struktur Proyek

```
pulau-pedia-bps3101/
├── src/
│   └── app/              # App Router directory
│       ├── layout.tsx    # Root layout
│       ├── page.tsx      # Homepage
│       ├── globals.css   # Global styles
│       └── favicon.ico   # Site icon
├── public/               # Static assets
├── .next/                # Next.js build output
├── node_modules/         # Dependencies
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
├── postcss.config.mjs    # PostCSS configuration
└── package.json          # Project dependencies & scripts

```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

### TypeScript
- Target: ES2017
- Strict mode: enabled
- Path alias: `@/*` → `./src/*`
- JSX: react-jsx

### ESLint
- Next.js core web vitals rules
- TypeScript support
- Ignores: .next/, out/, build/, next-env.d.ts

### Tailwind CSS
- Version 4 dengan PostCSS plugin
- Global styles di src/app/globals.css

## Development Environment
- Platform: Windows (Laragon)
- Shell: PowerShell
- Node.js package manager: npm
