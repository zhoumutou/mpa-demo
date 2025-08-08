# mpa-demo (Multi-Page App Demo)

> A Vite-based Multi-Page Application (MPA) demo showcasing how to combine custom plugins ([@zhoumutou/vite-plugin-mpa](https://github.com/zhoumutou/vite-plugin-mpa) & [@zhoumutou/vite-plugin-inline](https://github.com/zhoumutou/vite-plugin-inline)) to achieve multi-entry development, build-time page splitting, and critical resource inlining.

[中文](./README.md) | English

## Table of Contents

- [mpa-demo (Multi-Page App Demo)](#mpa-demo-multi-page-app-demo)
  - [Table of Contents](#table-of-contents)
  - [Goals](#goals)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Quick Start](#quick-start)
  - [Scripts](#scripts)
  - [Environment Variables](#environment-variables)
  - [Multi-Page Strategy](#multi-page-strategy)
  - [Inline Optimization](#inline-optimization)
  - [Development Tips](#development-tips)
  - [FAQ](#faq)
  - [Related Links](#related-links)
  - [License](#license)

## Goals

1. Multiple HTML entry points with isolated JS/CSS build outputs.
2. Per-page resource pruning to avoid oversized bundles.
3. Lightweight inlining of critical first-screen script/style via custom plugin.

## Features

- Vite + PNPM workflow
- Minimum Node version: >= 22
- Automatic multi-page discovery (`@zhoumutou/vite-plugin-mpa`)
- Optional critical resource inlining (`@zhoumutou/vite-plugin-inline`)
- Environment-specific `.env` separation (dev / build)
- Unified linting (`pnpm lint`)

## Requirements

| Component       | Version / Note          |
| --------------- | ----------------------- |
| Node            | >= 22                   |
| Package Manager | pnpm                    |
| OS              | macOS / Linux / Windows |

## Quick Start

```bash
# Clone
git clone https://github.com/zhoumutou/mpa-demo.git
cd mpa-demo

# Env template
cp .env.example .env

# Install deps
pnpm i

# Start dev server (auto multi-page HMR)
pnpm dev
```

Open the printed page URLs in terminal output.

## Scripts

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `pnpm dev`   | Development server (multi-page)    |
| `pnpm check` | Quality checks (types / etc.)      |
| `pnpm lint`  | Lint & style checks                |
| `pnpm build` | Production build                   |
| `pnpm debug` | Debug mode (may enable extra logs) |

## Environment Variables

```bash
# .env.example (copy to .env then adjust)
# Example:
# VITE_API_BASE_URL=https://api.example.com
# VITE_INLINE_THRESHOLD=1024
```

Recommendations:

- Shared constants → `.env`
- Local secrets/diffs → `.env.local` (if enabled)
- Use `MODE` + `import.meta.env` for build variants

## Multi-Page Strategy

Powered by `@zhoumutou/vite-plugin-mpa`:

- Auto scans a convention path (e.g. `src/pages/*/index.html`, actual pattern per plugin config)
- Generates an independent entry + asset graph per page
- Only truly shared dependencies (e.g. runtime) are deduplicated

## Inline Optimization

Using `@zhoumutou/vite-plugin-inline`:

- Inline tiny or critical first-paint CSS/JS directly into HTML
- Reduce request overhead and improve initial rendering
- Supports size threshold or explicit match rules

Typical approach:

1. Inline minimal `runtime` / `manifest` chunks
2. Inline above-the-fold critical CSS
3. Keep the rest as cache-friendly external assets

## Development Tips

- New pages appear without restart (if hot discovery supported)
- Inspect per-page network panel / coverage in DevTools
- After production build verify:
  - Expected inline blocks exist
  - No oversized JS chunks
  - Request count & transferred size are reasonable

## FAQ

| Question                         | Hint                                              |
| -------------------------------- | ------------------------------------------------- |
| New page not showing             | Check directory naming matches plugin conventions |
| HTML too large (too much inline) | Lower threshold or switch back to external assets |
| Too many output artifacts        | Merge low-traffic pages or prune unused ones      |

## Related Links

- Multi-page plugin: [@zhoumutou/vite-plugin-mpa](https://github.com/zhoumutou/vite-plugin-mpa)
- Inline plugin: [@zhoumutou/vite-plugin-inline](https://github.com/zhoumutou/vite-plugin-inline)

## License

MIT
