# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React visualization demo application showcasing charts, maps, and data visualization components. Built for government data visualization projects (河北发改, 河北政务办, 石家庄项目). Uses ECharts for charts, Ant Design for UI components, and Tailwind CSS for styling.

## Commands

```bash
# Development (Vite - preferred)
pnpm dev

# Development (Webpack alternative)
pnpm dev:webpack

# Build for production
pnpm build

# Type checking
pnpm tsc

# Linting
pnpm lint

# Install dependencies
pnpm install
```

Dev server runs on port 8083.

## Architecture

### Tech Stack
- **React 18** with TypeScript
- **Vite** (primary) or Webpack for bundling
- **Zustand** for global state management
- **React Router v6** with HashRouter (supports qiankun micro-frontend)
- **ECharts** for visualizations with custom themes
- **Ant Design** with DeepBlueTheme wrapper
- **Tailwind CSS** + styled-components
- **fl-hooks** middleware pattern for API calls

### Directory Structure

```
src/
├── components/        # Reusable UI components
│   ├── BaseAntd/      # Ant Design themed wrappers
│   ├── BaseEchars/    # ECharts wrappers and theme provider
│   ├── EchartMapGeo/  # Geographic map components
│   ├── Indicator/     # Data indicator components (Flr, Fcm, etc.)
│   ├── layout/        # Main layout with ResizeScaleBody
│   └── nav/           # Navigation components
├── pages/
│   └── 00-demo/       # Demo pages for each component category
├── routes/            # Route definitions (routerDemo.ts, routerSx.ts)
├── service/
│   ├── hooksMiddleware/  # API middleware pattern
│   ├── request.ts     # Axios instance with auth
│   └── useEcApi.ts    # API hooks (useEcApiPost, useEcApiGet)
├── store/             # Zustand store (echartsTheme, userAuthMenu)
├── hooks/             # Custom React hooks
├── hocs/              # Higher-order components (withAuth)
└── utils/             # Utility functions
```

### Key Patterns

**API Calls**: Use `useEcApiPost` / `useEcApiGet` from `@/service`. These wrap the middleware pattern with automatic loading states.

```tsx
const [result, getResult] = useEcApiPost('/api/path');
// Call: getResult({ param: value })
```

**Global State**: Zustand store at `@/store`:
- `echartsTheme` - Current ECharts theme name
- `userAuthMenu` - Auth menu with `getAuthMenuByPath()`

**Route Structure**: Routes in `src/routes/`:
- `routerDemo.ts` - Development-only demo routes
- `routerSx.ts` - Main application routes
- `routerBase.ts` - Base routes (login, home)
- Routes use lazy loading with dynamic imports

**Layout Components**:
- `ResizeScaleBody` - Responsive scaling container
- `DeepBlueTheme` - Ant Design theme wrapper
- `EcharsThemeProvider` - ECharts theme context

**Path Aliases** (configured in vite.config.mts):
- `@/` → `src/`
- `@images/` → `assets/images/`
- `@svg/` → `assets/svg/`

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route entry in `src/routes/routerDemo.ts` (dev) or `routerSx.ts` (production)
3. Route format: `{ path: '/path', name: 'Name', component: true }`
