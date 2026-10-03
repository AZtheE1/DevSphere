# DevSphere (Doodle Land Micro-Apps Suite)

[![Design System: Google Stitch](https://img.shields.io/badge/Design_System-Google_Stitch-FFD93D?style=for-the-badge&logo=google&logoColor=1E1B4B)](./DESIGN.md)
[📄 Read the Full Design Specifications (DESIGN.md)](./DESIGN.md)

![Doodle Land App Preview](https://lh3.googleusercontent.com/aida/AEtjO1XlCzxJ7SxElAzBcMTw3b9VVk5P0AVV431TdzCSNVcotFf2fvORIBMFcsf_9z982a7_GOq0Tv24EO-GUarBPe2JCX8JxzOEIN3C6huMTYAqNNquyOUBT6NerxSqZGt1Rirmzkm9VBaLpkX-Lt3Sb2Ph31467gWaAV2jfwTIsryJaoYrIkd1l-B2qoB96YqFKRQlK0rwXU97rs4s3MrA5rSbCQywt-BTpP5h-JuwgQzG0vSR83HLfUwuuBo)

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
