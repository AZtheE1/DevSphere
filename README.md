# DevSphere

A unified interactive platform housing 40 fully functional web applications, built for learning and practice.

## Project Identity
- **Name**: DevSphere
- **Purpose**: Learning/practice platform — 40 apps in one monorepo
- **Tech Stack**: Next.js 14, NestJS 10, Supabase, Turborepo, pnpm

## Monorepo Structure
- `apps/platform`: Main 3D showcase website
- `apps/*`: Individual applications (Frontend + Backend)
- `packages/*`: Shared configurations and components
- `supabase/`: Database migrations

## Phase 1 Progress
- [x] Monorepo scaffold (Turborepo + pnpm workspaces)
- [x] packages/tsconfig, packages/eslint-config
- [x] packages/types (shared interfaces)
- [x] packages/auth (Supabase client, useAuth hook, AuthProvider)
- [x] packages/ui (Button component)
- [ ] apps/platform 3D shell
- [x] supabase/ migrations
- [x] Root README.md

## Getting Started
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and fill in Supabase credentials
4. Run development server: `pnpm dev`
