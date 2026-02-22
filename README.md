<p align="center">
  <img src="https://nextjs.org/icons/next.svg" width="80" alt="Next.js Logo" />
</p>

<h1 align="center">🚀 Next.js Starter Kit</h1>

<p align="center">
  A production-ready, full-stack Next.js 16 boilerplate with authentication, database, file uploads, and type-safe APIs — all pre-configured so you can skip the setup and start building.
</p>

<p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#environment-variables">Environment Variables</a> •
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

- **56+ shadcn/ui components** pre-installed (New York style)
- **Tailwind CSS v4** with CSS variables and `tw-animate-css`
- **React Compiler** enabled for automatic memoization
- **next-themes** for dark/light mode support
- **Sonner** for toast notifications
- **Embla Carousel** for carousels
- **Vaul** for drawer components
- **Recharts** for data visualization
- **react-resizable-panels** for resizable layouts
- **react-day-picker** for date pickers
- **cmdk** for command palette
- **input-otp** for OTP inputs
- **CVA + clsx + tailwind-merge** for class utilities

### 🛠️ Custom Hooks

- `useCurrentUser()` — reactive current user state (client)
- `getSession()` — server-side session retrieval
- `useDebounce()` — debounce values
- `useMobile()` — responsive breakpoint detection

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
│   ├── (auth)/              # Auth route group (login, register)
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...all]/   # Better Auth catch-all handler
│   │   ├── trpc/[trpc]/     # tRPC API handler
│   │   └── uploadthing/     # UploadThing route handler + file router
│   ├── generated/prisma/    # Prisma generated client (git-ignored)
│   ├── globals.css          # Tailwind CSS + design tokens
│   ├── layout.tsx           # Root layout (Geist fonts)
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # 56+ shadcn/ui components
│   └── uploadthing.ts       # UploadThing component exports
├── hooks/
│   ├── get-session.ts       # Server-side session helper
│   ├── use-current-user.ts  # Client-side current user hook
│   ├── use-debounce.ts      # Debounce hook
│   └── use-mobile.ts        # Mobile breakpoint hook
├── lib/
│   ├── auth.ts              # Better Auth server config
│   ├── auth-client.ts       # Better Auth client exports
│   ├── config-env.ts        # Centralized env config
│   ├── prisma.ts            # Prisma client singleton
│   └── utils.ts             # Utility functions (cn)
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Prisma schema
├── trpc/
│   ├── client.tsx           # tRPC client provider + React Query setup
│   ├── init.ts              # tRPC procedures (base, protected, admin)
│   ├── query-client.ts      # TanStack Query client factory
│   ├── routers/
│   │   └── _app.ts          # Root tRPC router
│   └── server.tsx           # Server-side tRPC caller + prefetch helpers
├── .env.example             # Environment variable template
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Next.js config (React Compiler enabled)
├── prisma.config.ts         # Prisma config (datasource URL)
├── tailwind v4              # (configured via postcss + globals.css)
└── tsconfig.json            # TypeScript config
```

---

## Adding tRPC Routers

Create a new router in `trpc/routers/`:

```typescript
// trpc/routers/example.ts
import { z } from "zod/v4";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";

export const exampleRouter = createTRPCRouter({
  // Public query
  hello: baseProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),

  // Protected mutation (requires auth)
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
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

## License

This project is licensed under the [MIT License](LICENSE).

**Created by [Candra Wali Sanjaya](https://github.com/chndrwali)**
