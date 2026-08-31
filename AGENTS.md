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

## Static export (critical)

`next.config.ts` sets `output: "export"` and `images.unoptimized: true`. The whole app is a pre-rendered static site — there is **no Node/API runtime**.

- Every dynamic route **must** define `generateStaticParams` and set `export const dynamicParams = false` (see `app/armada/[slug]/page.tsx`). Forgetting this breaks the build for new slugs.
- All images are local assets (SVGs in `/images/...`); do not rely on remote image optimization.
- Always verify with `npm run build` after adding routes or data-driven pages.

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
- Deployment target is Cloudflare Pages (static export). `CLAUDE.md` just includes `@AGENTS.md`.

## Deployment Architecture (2-branch strategy)

### Branches
- **`main`** → **Vercel** (server runtime) — `admin.mahessatransholiday.web.id`
  - Full Next.js server: middleware, dynamic routes, server components
  - Middleware protects `/admin/*` via Supabase SSR cookies
  - `app/admin/**` accessible (CRUD dashboard)
  - Auto-deploy on every push to `main`

- **`public`** → **Cloudflare Pages** (static export) — `mahessatransholiday.web.id`
  - `output: "export"`, `images.unoptimized: true`
  - **No middleware** (removed by sync script)
  - **No admin routes** — `app/admin/` renamed to `app/_admin_disabled/` (Next.js ignores `_`-prefixed folders)
  - Static-only, zero server cost
  - Updated automatically via GitHub Actions when `main` changes

### Sync Workflow (main → public)
1. **Push to `main`** triggers `.github/workflows/sync-public.yml`
2. Workflow:
   - Force-syncs `public` branch to current `main`
   - Runs `scripts/sync-public.sh`:
     - `git mv app/admin app/_admin_disabled`
     - `git rm middleware.ts`
     - `rm -rf .next out`
   - Commits & force-pushes `public` branch
3. Cloudflare Pages auto-builds `public` branch on push

### Manual sync (if needed)
```bash
git checkout public
./scripts/sync-public.sh
git add -A
git commit -m "chore(sync): transform main → public"
git push origin public
```

### Environment Variables
**Vercel (admin):**
- `NEXT_PUBLIC_SUPABASE_URL` — `https://rxhibmwhkjpfwirzvojt.supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — `sb_publishable_...`

**Cloudflare Pages (public):**
- Same Supabase vars (public anon key is safe for client-side usage)

### Adding New Admin Pages
1. Create under `app/admin/dashboard/...` in `main`
2. Push → Vercel auto-deploys
3. GitHub Actions syncs to `public` → Cloudflare rebuilds public site (admin routes stay disabled)

### Testing Admin Login
- Admin dashboard: `https://admin.mahessatransholiday.web.id`
- Login uses Supabase Auth (client-side `createClient` from `@/lib/supabase/client`)
- Middleware on `main` protects routes server-side; client-side check in dashboard redirects if session invalid
