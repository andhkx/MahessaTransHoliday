<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mahessa Trans Holiday

Static marketing site (Next.js 16 App Router + Tailwind v4) for an Indonesian car-rental / travel business. Rebuild replaces an old Laravel site; UI copy, URLs, and metadata are all in **Bahasa Indonesia**.

## Commands

- `npm run dev` — dev server
- `npm run build` — next build
- `npm run start` — serve the build
- `npm run lint` — `eslint` (only lint; there is **no test suite and no typecheck script**). `npx tsc --noEmit` for type errors.

## Server runtime on Vercel

The project runs as a full Next.js server on Vercel — `next.config.ts` does NOT set `output: "export"` anymore.

- `app/admin/**` uses dynamic routes (e.g. `app/admin/dashboard/armada/[id]/page.tsx`) that need a server runtime.
- `middleware.ts` protects `/admin/*` via Supabase SSR cookies — middleware requires a server runtime.
- All marketing pages still pre-render fine; Vercel's CDN caches the static work.

If you add a new dynamic route, you do **not** need `generateStaticParams` — but keep it if you want pre-rendered SSG.

## Next.js 16 typed-route generics

Pages/params use Next's typed-routes types: e.g. `PageProps<"/armada/[slug]">` and `LayoutProps<"/">` (check `node_modules/next` docs if unfamiliar). In App Router pages the `params` object is **async** — `const { slug } = await params;`.

## Conventions to follow

- **All content is data-driven.** Vehicles/packages/galleries/FAQs/services live in `data/*.ts`. Types are defined in `lib/types.ts`; new entries must satisfy those types (including per-item `seo: SeoInfo` and a unique `slug`).
- **Design tokens are custom.** Colors, shadows, fonts, and `--color-*` / `--shadow-*` utilities are defined in `app/globals.css` under `@theme` (Tailwind v4, NOT a tailwind.config file). Use existing names like `text-heading`, `bg-wa-surface`, `border-line`, `text-muted`; there is no `primary` etc. via config. Fonts: Plus Jakarta Sans (`--font-jakarta`) + DM Mono (`--font-mono`), loaded via `next/font` in `app/layout.tsx`.
- **WhatsApp is the only conversion path** — no payment gateway, no booking forms. The kontakt page redirects to WhatsApp. Use the helpers in `lib/whatsapp.ts` (`waVehicleLink`, `waPackageLink`, ...) and edit the number/display/constants in `lib/constants.ts`, never hardcode.
- **SEO is manual** — `robots.ts`, `sitemap.ts`, per-page `generateMetadata`, and `JsonLd` (`components/JsonLd.tsx`) all pull from `lib/constants.ts` (`SITE_URL = https://mahessaholiday.my.id`). New public pages should supply metadata + canonical + JSON-LD.

## Reference docs (root)

- `mahessa-design-v2.md` — design system / palette / typography spec
- `mahessa-website-prompt.md` — project brief (target audience, SEO & conversion goals)
- `CLAUDE.md` just includes `@AGENTS.md`.

## Deployment

Single host: **Vercel** serves both the public marketing site and the admin dashboard from the same `main` branch.

- Public site: `https://mahessatransholiday.web.id` (or `https://<project>.vercel.app`)
- Admin dashboard: `https://mahessatransholiday.web.id/admin/login`

Auto-deploy on every push to `main`.

### Environment Variables (Vercel)
Set in Vercel → Settings → Environment Variables (apply to Production / Preview / Development):
- `NEXT_PUBLIC_SUPABASE_URL` — `https://rxhibmwhkjpfwirzvojt.supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — Supabase publishable/anon key

The `NEXT_PUBLIC_*` prefix is correct here — Supabase anon keys are designed to be public, and Vercel automatically inlines them into the client bundle. Use Type **Plain Text** (Sensitive hides the value in the UI but the prefix already signals it's public).

### Admin Login
- Create a user in Supabase: Authentication → Users → Add user → Create new user (enable **Auto Confirm User**)
- Visit `/admin/login` and sign in with those credentials
- Middleware on the server side redirects unauthenticated `/admin/*` requests to `/admin/login` (HTTP 307 — visible in Vercel logs as expected, not an error)
- The dashboard pages do a client-side `supabase.auth.getUser()` check and also redirect if the session is invalid
