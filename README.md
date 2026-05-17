<h1 align="center">🚀 Next.js Starter Kit T3 Stack + shadcn/ui</h1>

<p align="center">
  A production-ready, full-stack Next.js 16 boilerplate with authentication, admin dashboard, database, file uploads, and type-safe APIs — all pre-configured so you can skip the setup and start building.
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/chndrwali/nextjs-starter-kit?style=flat-square&color=6366f1" alt="License" />
  <img src="https://img.shields.io/github/stars/chndrwali/nextjs-starter-kit?style=flat-square&color=6366f1" alt="Stars" />
  <img src="https://img.shields.io/github/forks/chndrwali/nextjs-starter-kit?style=flat-square&color=6366f1" alt="Forks" />
</p>

<p align="center">
  <a href="PRD.md">📋 PRD Prompt Template</a> •
  <a href="PRD-EXAMPLE.md">📄 PRD Example</a>
</p>

<p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#trpc-usage">tRPC Usage</a> •
  <a href="#customization">Customization</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#special-thanks">Special Thanks</a> •
  <a href="#prd-generator">PRD Generator</a> •
  <a href="#license">License</a>
</p>

---

## Tech Stack

| Category           | Technology                                                              | Version |
| ------------------ | ----------------------------------------------------------------------- | ------- |
| **Framework**      | [Next.js](https://nextjs.org)                                           | 16      |
| **Language**       | [TypeScript](https://typescriptlang.org)                                | 5       |
| **UI Runtime**     | [React](https://react.dev) + React Compiler                             | 19      |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com)                                 | 4       |
| **UI Components**  | [shadcn/ui](https://ui.shadcn.com) (New York)                           | Latest  |
| **Authentication** | [Better Auth](https://www.better-auth.com)                              | 1.x     |
| **Database ORM**   | [Prisma](https://prisma.io)                                             | 7       |
| **Database**       | [PostgreSQL](https://www.postgresql.org) (Neon recommended)             | —       |
| **API Layer**      | [tRPC](https://trpc.io)                                                 | 11      |
| **Data Fetching**  | [TanStack React Query](https://tanstack.com/query)                      | 5       |
| **File Uploads**   | [UploadThing](https://uploadthing.com)                                  | 7       |
| **Form Handling**  | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Latest  |
| **Charts**         | [Recharts](https://recharts.org)                                        | 2       |
| **Animations**     | [GSAP](https://gsap.com)                                                | 3       |
| **Email**          | [Resend](https://resend.com) (pre-configured, commented)                | —       |
| **Icons**          | [Lucide React](https://lucide.dev)                                      | Latest  |
| **Fonts**          | Geist Sans & Geist Mono                                                 | —       |

## Features

### 🔐 Authentication (Better Auth)

- **Email & Password** authentication with configurable password policy
- **Admin plugin** — role-based access control out of the box
- **Rate limiting** — brute-force and spam protection on auth endpoints
- **Secure cookies** — `httpOnly`, `sameSite`, `secure` in production
- **Session management** — cookie caching, configurable expiry
- **Password reset** flow (Resend email template included, commented out)
- **Forgot password** flow with email-based reset link
- Pre-built client exports: `signIn`, `signUp`, `signOut`, `useSession`, `changePassword`, `resetPassword`, `admin`

### 🗄️ Database (Prisma + PostgreSQL)

- **Prisma 7** with the new `PrismaPg` driver adapter for connection pooling
- Pre-defined schema: `User`, `Account`, `Credential`, `Session`, `Verification`
- Admin fields: `role`, `banned`, `banReason`, `banExpires`
- Generated client output to `app/generated/prisma` (git-ignored)
- Migration-ready setup

### ⚡ Type-Safe API (tRPC v11)

- `baseProcedure` — public endpoints
- `protectedProcedure` — requires authentication (auto-injects user session)
- `adminProcedure` — requires `admin` role
- **Server-side prefetching** with `HydrationBoundary` for zero-waterfall SSR
- **SuperJSON** transformer for Date, Map, Set serialization
- Configured `TRPCReactProvider` with singleton query client

### 📁 File Uploads (UploadThing)

- 4 pre-configured file routes:
    - `productImage` — single image (4MB, auth required)
    - `productImages` — multiple images up to 5 (4MB each, auth required)
    - `pdfUploader` — single PDF (4MB, auth required)
    - `publicImage` — single image (4MB, no auth)
- Ready-to-use components: `UploadButton`, `UploadDropzone`, `useUploadThing`

### 🎨 UI & UX

- **56 shadcn/ui components** pre-installed (New York style)
- **12 custom components** — password input, image/file upload, toast, alert dialog, theme toggle, user avatar, responsive modal, page container, icons, heading, login account info
- **Tailwind CSS v4** with CSS variables and `tw-animate-css`
- **React Compiler** enabled for automatic memoization
- **next-themes** for dark/light mode support (dark by default)
- **Sonner** for toast notifications
- **Embla Carousel** for carousels
- **Vaul** for drawer components
- **Recharts** for data visualization
- **react-resizable-panels** for resizable layouts
- **react-day-picker** for date pickers
- **cmdk** for command palette
- **input-otp** for OTP inputs
- **CVA + clsx + tailwind-merge** for class utilities
- **GSAP** animated 404 page with glitch effect, floating particles, and scanline animation

### 📱 Admin Dashboard

- **Collapsible sidebar** navigation with icon-based and expanded modes
- **RBAC-based navigation** filtering — show/hide items based on `role`, `permission`, `plan`, `feature`, or `requireOrg`
- **Breadcrumbs** with auto-generated items based on the current route
- **Search (Cmd+K)** command palette for quick navigation
- **Notification dropdown** component
- **Sign-out button** with confirmation dialog
- **User avatar profile** with role badge
- Pre-configured nav items: Dashboard, Inbox, Workspaces (Portfolio, Resume), Tracker

### 🛠️ Custom Hooks

- `useCurrentUser()` — reactive current user state (client)
- `getSession()` — server-side session retrieval
- `useFilteredNavItems()` — RBAC-based navigation filtering (client-side, no server calls)
- `useBreadcrumbs()` — dynamic breadcrumb generation from URL segments
- `useDebounce()` — debounce values
- `useMobile()` — responsive breakpoint detection

### 🔒 Auth Pages

- **Login** — email/password with "Remember me" and "Forgot password" link, includes demo account info
- **Register** — email/password/name with password strength indicator and rules
- **Forgot Password** — email-based reset link request
- **Reset Password** — set new password from email link
- Beautiful auth layout with animated gradient background

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm**, **pnpm**, or **yarn**
- A PostgreSQL database (we recommend [Neon](https://neon.com/) — free tier available)
- An [UploadThing](https://uploadthing.com/) account (for file uploads)

### 1. Clone & Install

```bash
git clone https://github.com/chndrwali/nextjs-starter-kit.git
cd nextjs-starter-kit
npm install
```

### 2. Set Up Prisma

Initialize Prisma client and run migrations:

```bash
npx prisma init --db --output ../app/generated/prisma
npx prisma generate
npx prisma migrate dev
```

### 3. Generate Better Auth Secret

```bash
npx @better-auth/cli@latest secret
```

Copy the generated secret into your `.env` file.

### 4. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

```env
# Auth Secret (generated in step 3)
BETTER_AUTH_SECRET=your_generated_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Resend (for emails — optional)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Public URL
NEXT_PUBLIC_URL=http://localhost:3000

# Database (get this from https://neon.com/)
DATABASE_URL="postgresql://user:password@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require"

# UploadThing (get this from https://uploadthing.com/)
UPLOADTHING_TOKEN='your_uploadthing_token'
```

#### Where to get each value:

| Variable             | Source                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET` | Run `npx @better-auth/cli@latest secret`                                                |
| `DATABASE_URL`       | Create a free database at [neon.com](https://neon.com/) → copy the connection string    |
| `UPLOADTHING_TOKEN`  | Sign up at [uploadthing.com](https://uploadthing.com/) → create an app → copy the token |
| `RESEND_API_KEY`     | Sign up at [resend.com](https://resend.com/) → API Keys → create key _(optional)_       |

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## Project Structure

```
.
├── app/
│   ├── (admin)/              # Admin dashboard route group
│   │   ├── admin/            # Admin pages (dashboard, inbox, etc.)
│   │   └── layout.tsx        # Admin layout with session guard
│   ├── (auth)/               # Auth route group
│   │   ├── login/            # Login page with demo account info
│   │   ├── register/         # Registration page
│   │   ├── forgot-password/  # Forgot password page
│   │   ├── reset-password/   # Reset password page
│   │   └── layout.tsx        # Auth layout with redirect if logged in
│   ├── (public)/             # Public route group
│   │   └── page.tsx          # Home page (redirects to /login)
│   ├── api/
│   │   ├── auth/[...all]/    # Better Auth catch-all handler
│   │   ├── trpc/[trpc]/      # tRPC API handler
│   │   └── uploadthing/      # UploadThing route handler + file router
│   ├── generated/prisma/     # Prisma generated client (git-ignored)
│   ├── globals.css           # Tailwind CSS + design tokens
│   ├── layout.tsx            # Root layout (Geist fonts, providers)
│   └── not-found.tsx         # Animated 404 page (GSAP)
├── components/
│   ├── custom/               # 12 custom reusable components
│   │   ├── alert-dialog-custom.tsx
│   │   ├── app-toast.tsx
│   │   ├── file-upload.tsx
│   │   ├── heading.tsx
│   │   ├── icons.tsx
│   │   ├── image-upload.tsx
│   │   ├── login-account-info.tsx
│   │   ├── page-container.tsx
│   │   ├── password-input.tsx
│   │   ├── responsive-modal.tsx
│   │   ├── theme-mode-toggle.tsx
│   │   └── user-avatar-profile.tsx
│   ├── ui/                   # 56 shadcn/ui components
│   ├── theme-provider.tsx    # next-themes provider
│   └── uploadthing.ts        # UploadThing component exports
├── hooks/
│   ├── get-session.ts        # Server-side session helper
│   ├── use-breadcrumbs.ts    # Dynamic breadcrumb hook
│   ├── use-current-user.ts   # Client-side current user hook
│   ├── use-debounce.ts       # Debounce hook
│   ├── use-mobile.ts         # Mobile breakpoint hook
│   └── use-nav.ts            # RBAC-based nav filtering hook
├── lib/
│   ├── auth.ts               # Better Auth server config
│   ├── auth-client.ts        # Better Auth client exports
│   ├── config-env.ts         # Centralized env config
│   ├── form-schema.ts        # Zod schemas (login, register, etc.)
│   ├── prisma.ts             # Prisma client singleton
│   └── utils.ts              # Utility functions (cn, formatters)
├── modules/
│   ├── admin/ui/
│   │   ├── components/       # Breadcrumbs, notifications, search, signout
│   │   ├── config/           # Nav config, search config (RBAC)
│   │   └── layout/           # Admin layout, app sidebar, header
│   └── auth/ui/
│       ├── form/             # Login, register, forgot & reset password forms
│       └── layout/           # Auth layout (animated gradient bg)
├── prisma/
│   ├── migrations/           # Database migrations
│   └── schema.prisma         # Prisma schema
├── trpc/
│   ├── client.tsx            # tRPC client provider + React Query setup
│   ├── init.ts               # tRPC procedures (base, protected, admin)
│   ├── query-client.ts       # TanStack Query client factory
│   ├── routers/
│   │   └── _app.ts           # Root tRPC router
│   └── server.tsx            # Server-side tRPC caller + prefetch helpers
├── types/
│   └── index.ts              # NavItem, PermissionCheck types
├── .env.example              # Environment variable template
├── components.json           # shadcn/ui configuration
├── next.config.ts            # Next.js config (React Compiler enabled)
├── prisma.config.ts          # Prisma config (datasource URL)
└── tsconfig.json             # TypeScript config
```

---

## Adding tRPC Routers

Create a new router in `trpc/routers/`:

```typescript
// trpc/routers/example.ts
import { z } from "zod/v4";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";

export const exampleRouter = createTRPCRouter({
    // Public query
    hello: baseProcedure.input(z.object({ name: z.string() })).query(({ input }) => {
        return { greeting: `Hello, ${input.name}!` };
    }),

    // Protected mutation (requires auth)
    create: protectedProcedure.input(z.object({ title: z.string() })).mutation(({ ctx, input }) => {
        // ctx.auth contains the user session
        console.log("User:", ctx.auth.user.id);
        return { success: true };
    }),
});
```

Register it in `trpc/routers/_app.ts`:

```typescript
import { createTRPCRouter } from "@/trpc/init";
import { exampleRouter } from "./example";

export const appRouter = createTRPCRouter({
    example: exampleRouter,
});

export type AppRouter = typeof appRouter;
```

---

## tRPC Usage

After creating a router, you can use it in client components with the **TanStack React Query** integration.

📖 **Full documentation**: [tRPC + TanStack React Query Usage](https://trpc.io/docs/client/tanstack-react-query/usage)

Example usage in a client component:

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function ExampleComponent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Query
  const { data, isLoading } = useQuery(
    trpc.example.hello.queryOptions({ name: "World" })
  );

  // Mutation
  const createMutation = useMutation(
    trpc.example.create.mutationOptions({
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(trpc.example.hello.queryFilter());
      },
    })
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <p>{data?.greeting}</p>
      <button onClick={() => createMutation.mutate({ title: "New Item" })}>
        Create
      </button>
    </div>
  );
}
```

Example server-side prefetching (SSR) in a server component:

```typescript
import { trpc, HydrateClient, prefetch } from "@/trpc/server";

export default async function Page() {
  // Prefetch on server — zero waterfall
  await prefetch(trpc.example.hello.queryOptions({ name: "World" }));

  return (
    <HydrateClient>
      <ExampleComponent />
    </HydrateClient>
  );
}
```

> 💡 For more details on `useQuery`, `useMutation`, `useSuspenseQuery`, `useInfiniteQuery`, and more, visit the [official tRPC documentation](https://trpc.io/docs/client/tanstack-react-query/usage).

---

## Customization

### Enabling Email (Resend)

1. Uncomment the Resend import and email logic in `lib/auth.ts`
2. Add your `RESEND_API_KEY` to `.env`
3. Set `requireEmailVerification: true` in the auth config

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

### Adding New File Upload Routes

Edit `app/api/uploadthing/core.ts` to add new file routes following the existing pattern.

---

## Deployment

This starter is optimized for deployment on [Vercel](https://vercel.com):

1. Push your repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_URL` to your production domain
5. Deploy 🚀

---

## Special Thanks

This project was made possible by the following amazing open-source projects, tools, and resources:

### Core Framework & Libraries

| Library                                  | Description                          |
| ---------------------------------------- | ------------------------------------ |
| [Next.js](https://nextjs.org)            | The React framework for the web      |
| [React](https://react.dev)               | Library for building user interfaces |
| [TypeScript](https://typescriptlang.org) | Typed JavaScript at any scale        |
| [Tailwind CSS](https://tailwindcss.com)  | Utility-first CSS framework          |
| [shadcn/ui](https://ui.shadcn.com)       | Beautiful, accessible UI components  |
| [Radix UI](https://www.radix-ui.com)     | Unstyled, accessible UI primitives   |

### Backend & Data

| Library                                                   | Description                        |
| --------------------------------------------------------- | ---------------------------------- |
| [Better Auth](https://www.better-auth.com)                | Authentication library for Next.js |
| [Prisma](https://prisma.io)                               | Next-generation ORM for Node.js    |
| [tRPC](https://trpc.io)                                   | End-to-end type-safe APIs          |
| [TanStack React Query](https://tanstack.com/query)        | Powerful data synchronization      |
| [UploadThing](https://uploadthing.com)                    | File uploads made easy             |
| [Resend](https://resend.com)                              | Modern email sending API           |
| [Zod](https://zod.dev)                                    | TypeScript-first schema validation |
| [SuperJSON](https://github.com/flightcontrolhq/superjson) | Serialization for complex types    |

### UI & Animation

| Library                                                                     | Description                           |
| --------------------------------------------------------------------------- | ------------------------------------- |
| [GSAP](https://gsap.com)                                                    | Professional-grade animation library  |
| [Recharts](https://recharts.org)                                            | Composable charting library for React |
| [Lucide React](https://lucide.dev)                                          | Beautiful & consistent icon toolkit   |
| [Sonner](https://sonner.emilkowal.dev)                                      | Opinionated toast notifications       |
| [Embla Carousel](https://www.embla-carousel.com)                            | Lightweight carousel library          |
| [Vaul](https://vaul.emilkowal.dev)                                          | Drawer component for React            |
| [cmdk](https://cmdk.paco.me)                                                | Command palette component             |
| [next-themes](https://github.com/pacocoursey/next-themes)                   | Theme management for Next.js          |
| [React Hook Form](https://react-hook-form.com)                              | Performant form handling              |
| [react-day-picker](https://react-day-picker.js.org)                         | Date picker component                 |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Resizable panel layouts               |
| [input-otp](https://input-otp.rodz.dev)                                     | One-time password input component     |

### Sidebar Inspiration

> The admin sidebar implementation in this project is inspired by and credits go to:
>
> 🔗 **[next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)** by [Kiranism](https://github.com/Kiranism)
>
> A beautifully crafted admin dashboard starter with shadcn/ui and Next.js.

### Useful Tools & Resources

| Resource                                    | Description                                                     |
| ------------------------------------------- | --------------------------------------------------------------- |
| [favicon.io](https://favicon.io/)           | Generate favicons from text, image, or emoji                    |
| [tweakcn](https://tweakcn.com/editor/theme) | Visual theme editor for shadcn/ui — customize colors and styles |
| [Aceternity UI](https://ui.aceternity.com/) | Beautiful animated components for React & Tailwind CSS          |

---

## PRD Generator

Starter kit ini menyertakan file **[`PRD.md`](PRD.md)** yang berisi prompt template untuk generate **Product Requirements Document** yang lengkap dan implementation-ready.

### Cara Penggunaan

1. Buka file [`PRD.md`](PRD.md)
2. Copy seluruh isi file tersebut
3. Paste ke AI tool favoritmu (ChatGPT, Claude, Gemini, dll.)
4. Isi bagian **Project Input** dengan detail proyekmu — ganti semua `{{placeholder}}` dengan informasi yang sesuai
5. AI akan generate PRD lengkap dengan struktur:
    - Overview, User Personas & Stories
    - Functional & Non-Functional Requirements (MoSCoW)
    - Core Features dengan Acceptance Criteria
    - User Flows (Mermaid flowchart)
    - System Architecture & Sequence Diagram
    - Database Schema & ER Diagram
    - API Design, Tech Stack, Development Phases
    - Testing Strategy

> 💡 **Tip**: Semakin detail input yang kamu berikan, semakin akurat dan actionable PRD yang dihasilkan.

📄 **Contoh hasil PRD**: Lihat [`PRD-EXAMPLE.md`](PRD-EXAMPLE.md) untuk contoh PRD yang sudah di-generate menggunakan prompt template ini.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## ☕ Support

If you find this starter kit helpful, consider supporting me:

<p align="center">
  <a href="https://ko-fi.com/chndrwali">
    <img src="https://img.shields.io/badge/Ko--fi-Support%20Me-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi" />
  </a>
  <a href="https://trakteer.id/candra_wali_sanjaya/tip">
    <img src="https://img.shields.io/badge/Trakteer-Tip%20Me-C02433?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=&logoColor=white" alt="Trakteer" />
  </a>
</p>

---

**Created by [Candra Wali Sanjaya](https://github.com/chndrwali)**
