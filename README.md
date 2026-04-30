# Dineza

A multi-role restaurant reservation platform where diners earn 25% cash back on every dining experience. Built as a full-stack portfolio project with a focus on production-grade architecture and clean code.


---

## What it does

Dineza connects three types of users on one platform:

- **Diners** — Browse partner restaurants, make reservations, report their spend, and earn 25% cash back
- **Restaurants** — Manage their profile, handle incoming bookings, and track performance
- **Admins** — Approve restaurant applications, verify spend reports, and manage payouts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| Server State | TanStack React Query |
| Client State | Zustand + Immer |
| Backend | Supabase (Auth, Database, Storage) |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |

---

## Architecture highlights

**Feature-based folder structure** — code is organised by domain (`features/auth`, `features/restaurants`, `features/reservations`) rather than by file type. Each feature owns its components, queries, services, hooks, and types.

**Two-query auth pattern** — `useAuthSession` reads from localStorage instantly for route gating, while `useAuthUser` validates the JWT server-side via `getUser()` + a database profile fetch. Guards resolve in ~0ms with no login page flash on reload.

**React Query + Supabase** — all server state lives in React Query. `staleTime`, `isPending`, and explicit `fetchQuery` calls are used intentionally, with no `PersistQueryClientProvider` for auth data since Supabase already manages session persistence.

**Role-based routing** — `RequireAuth`, `RequireGuest`, and `RequireOnboarding` guards use discriminated union types to handle four user states: unauthenticated, authenticated-but-unboarded, diner, restaurant, and admin.

---

## Project status

| Feature | Status |
|---|---|
| Authentication (email + Google OAuth) | ✅ Complete |
| Role-based onboarding | ✅ Complete |
| Landing page + public pages | ✅ Complete |
| Dashboard layouts + skeleton loading | ✅ Complete |
| Restaurant discovery (browse + search) | 🔄 In progress |
| Reservation system | 📋 Planned |
| Cash back reporting | 📋 Planned |
| Wallet + withdrawals | 📋 Planned |
| Restaurant management dashboard | 📋 Planned |
| Admin panel | 📋 Planned |

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/dineza.git
cd dineza

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase URL and anon key

# Start dev server
npm run dev
```

### Environment variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Database schema

Core tables in Supabase:

```
profiles            → base user (linked to auth.users via trigger)
diner_profiles      → diner-specific data
restaurant_profiles → restaurant data, onboarding info, approval status
locations           → reference data for city areas
reservations        → booking records (in progress)
transactions        → spend reports + cash back calculations (planned)
wallets             → diner earnings + withdrawal state (planned)
```

Row Level Security is enabled on all tables. Each role can only read and write their own data.

---

## Folder structure

```
src/
├── features/
│   ├── auth/              # Auth flows, guards, hooks, store
│   ├── landing/           # Public landing page + sections
│   ├── public/            # FAQ, About, Contact, Legal pages
│   ├── restaurants/       # Discovery, detail pages (in progress)
│   └── reservations/      # Booking system (planned)
├── shared/
│   ├── components/        # AppLoader, skeletons, layouts
│   ├── helpers/           # Utility functions
│   └── types/             # Constants, shared types
└── router/
    ├── layouts/           # RootLayout, DashboardLayout, AuthLayout
    └── routes/            # RequireAuth, RequireGuest, RoleGuard
```

---

## Author

**Ibrahim Yusuf** — Frontend Developer
Building full-stack, learning by shipping.

[GitHub](https://github.com/YOUR_USERNAME) · [LinkedIn](https://linkedin.com/in/YOUR_USERNAME)
