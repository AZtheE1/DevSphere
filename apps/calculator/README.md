# Calculator | DevSphere

A premium, scientific calculator with history tracking. Part of the DevSphere Tools category.

## Features
- Basic and scientific arithmetic operations
- Glassmorphic UI with smooth Framer Motion animations
- Calculation history stored in Supabase
- Responsive design for mobile and desktop

## Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion, mathjs
- **Backend**: NestJS 10, Supabase (PostgreSQL)
- **Shared**: @devsphere/ui, @devsphere/auth, @devsphere/types

## Database Schema (calculator schema)
### Table: `history`
| Column | Type | Description |
| --- | --- | --- |
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| expression | TEXT | The calculation expression |
| result | TEXT | The result of the calculation |
| created_at | TIMESTAMPTZ | Timestamp of the calculation |

### RLS Policies
- `Users can view their own calculator history`
- `Users can insert their own calculator history`
- `Users can delete their own calculator history`

## API Endpoints
| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/calculator/history` | Yes | Retrieve user's calculation history |
| POST | `/calculator/history` | Yes | Save a new calculation to history |
| DELETE | `/calculator/history` | Yes | Clear all calculations for the user |

## Local Setup
1. Backend: `cd apps/calculator/backend && pnpm run start:dev`
2. Frontend: `cd apps/calculator/frontend && pnpm run dev`
