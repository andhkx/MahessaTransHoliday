<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mahessa Trans Holiday

Next.js 16 App Router + Tailwind v4 marketing site + admin dashboard for an Indonesian car-rental / travel business. UI copy, URLs, and metadata are all in **Bahasa Indonesia**.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — next build
- `npm run start` — serve the build
- `npm run lint` — `eslint`
- `npm run upload:images` — bulk upload images to Supabase Storage + update DB (one-time, after migration 002)
- `npx tsc --noEmit` — typecheck

## Architecture

**Single repo, single Vercel project, single Supabase project.**

- **Public site** — Next.js server components, `app/(public)/**` route group. Reads from Supabase via `lib/data/supabase/*`. All pages use `export const dynamic = 'force-dynamic'`. Static fallback (`data/*.ts`) was removed; if Supabase returns empty, page renders empty state.
- **Admin dashboard** — `app/admin/**`. Uses `AdminDashboardLayout` component (top navbar, no sidebar). Middleware protects `/admin/*`.
- **Data layer** — server components call `lib/data/supabase/{vehicles,packages,faq,articles,testimonials,gallery}.ts` which create a Supabase client with `auth.persistSession: false` and query directly. No `unstable_cache`, no `revalidate` — every request is fresh.
- **Image optimization** — `next.config.ts` has `images.unoptimized: true` (we serve images directly from Supabase Storage without Vercel Image Optimization). `next/image` still used for sizing/lazy-loading.

## Supabase

- Project ref: `rxhibmwhkjpfwirzvojt`
- Public site + admin use the same project (anon key + authenticated user)
- Storage buckets: `vehicles`, `packages`, `articles`, `gallery` — all Public
- All data lives in tables managed via migrations in `supabase/migrations/`
  - `001_create_tables_and_seed.sql` — base tables
  - `002_full_schema_and_seed.sql` — adds columns (badge, gallery[], description[], specs, suitable_for, service_areas, seo, fuel_type_extra) + seed 12 vehicles, 10 packages, 8 testimonials, 13 FAQ
  - `003_gallery_and_storage.sql` — adds `gallery_items` table
  - `004_storage_policies.sql` — Storage RLS (4 policies per bucket: anon read + auth insert/update/delete)
  - `005_ensure_rls_policies.sql` — drop+recreate public read policies safely
  - `006_fix_rls_policies.sql` — drop bad policies that query `auth.users` (causes 42501 on anon)
  - `007_nuclear_rls_fix.sql` — full RLS reset + adds `is_featured` column on vehicles/packages
  - `vehicles_rows.sql`, `packages_rows.sql`, `testimonials_rows.sql`, `faq_items_rows.sql` — data exports for reference

### RLS rules (running, verified)

- `vehicles_select`, `packages_select`, `articles_select`, `testimonials_select`, `faqs_select`, `gallery_select` — all `TO anon, authenticated USING (true)` (full public read)
- `*_modify` — `TO authenticated USING (true) WITH CHECK (true)` (admin full access)
- **DO NOT** add policies that query `auth.users` — anon role doesn't have SELECT on that table → 42501 error

### Environment variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://rxhibmwhkjpfwirzvojt.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # for bulk-upload script
```

Set same in Vercel dashboard (Project → Settings → Environment Variables).

## Data shapes

`lib/types.ts` defines:
- `Vehicle { id, slug, name, category, transmission, capacity, fuelType, image, gallery, badge?, pricing.startingPrice, description[], suitableFor[], features[], specs[{label,value}], serviceAreas[], seo }`
- `TravelPackage { id, slug, destination, badge?, duration, durationHours, price, image, description[], included[], excluded[], suitableFor[], itinerary?[{day,activities[]}], serviceAreas[], faq[{q,a}], seo }`
- `FaqItem { id, question, answer }`
- `Spec { label, value }`

Vehicle categories: `entry | midrange | premium | luxury | group`

## File layout

```
app/
├── (public)/              # route group — public website
│   ├── layout.tsx → renders <Navbar/> <main> {children} <Footer/> <JsonLd/>
│   ├── page.tsx           # homepage
│   ├── armada/[slug]/     # vehicle detail
│   ├── paket/[slug]/      # package detail
│   ├── artikel/[slug]/    # article detail
│   ├── faq/, galeri/, kontak/, temukan/
│   └── ArmadaListClient.tsx, PaketListClient.tsx, GaleriPageClient.tsx, FaqPageClient.tsx
├── admin/                 # admin dashboard
│   ├── layout.tsx         # simple pass-through
│   ├── login/
│   └── dashboard/         # all CRUD pages (armada, paket, artikel, galeri, testimoni, faq)
├── layout.tsx             # root: <html><body> {children} </body></html> — no Navbar here
components/
├── Navbar.tsx, Footer.tsx, Hero.tsx, Stats.tsx
├── PageHero.tsx           # shared hero with eyebrow + title + subtitle + accent gradient blur
├── ServiceCards.tsx, VehicleCards.tsx, PackageCards.tsx
├── VehicleFinder/VehicleFinder.tsx (client wizard)
├── TestimonialCarousel/, admin/ImageUpload.tsx
lib/
├── data/
│   ├── seo.ts, gallery.ts (static assets)
│   ├── finder.ts           # wizard config (BUDGET_TIERS, JOURNEY_TYPES)
│   ├── vehicles.ts, packages.ts, testimonials.ts, faq.ts, services.ts (legacy static data — kept for sitemap/finder)
│   └── supabase/           # server-side Supabase data layer (PRIMARY source)
├── supabase/
│   ├── server.ts (createClient with cookies — admin)
│   ├── client.ts (createClient browser)
│   └── middleware.ts
├── types.ts, constants.ts, whatsapp.ts, format.ts, cn.ts
middleware.ts                # protects /admin/*
```

## Conventions

- **All content is Supabase-driven.** `lib/data/supabase/*` is source of truth. Legacy `data/*.ts` exists only for sitemap slugs & VehicleFinder wizard config (no images from there).
- **No static fallback** in public pages. If Supabase returns empty, page shows empty state. Earlier we had `if (supabaseVehicles.length > 0 ? supabaseVehicles : staticVehicles)` — this is removed because it hid RLS issues. If you re-add fallback, it must NOT include image paths to local `/images/` (those don't exist).
- **Design tokens** in `app/globals.css` under `@theme`. Use `text-heading`, `bg-wa-surface`, `border-line`, `text-muted`, `bg-accent`, `shadow-card`, `shadow-elevated`. No `primary` etc. via config.
- **WhatsApp only** for conversion — `waGeneralLink()`, `waVehicleLink()`, `waPackageLink()` in `lib/whatsapp.ts`. Constants in `lib/constants.ts`: `WHATSAPP_NUMBER = "62895327077214"`, `EMAIL_ADDRESS = "mahessatransholiday@gmail.com"`.
- **SEO is manual** — `robots.ts`, `sitemap.ts`, per-page `generateMetadata`, `JsonLd` component.
- **PageHero** — shared hero component for all inner pages. Use it for visual consistency.
- **Image URLs** — must be full Supabase Storage URLs (e.g. `https://rxhibmwhkjpfwirzvojt.supabase.co/storage/v1/object/public/vehicles/...`). Do NOT use local `/images/` paths — they don't exist (we removed local images).

## Data layer pattern (every file in `lib/data/supabase/`)

```ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function getPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

function toArray(value: any): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    try { const parsed = JSON.parse(value); if (Array.isArray(parsed)) return parsed; } catch {}
    return [value];
  }
  return [];
}

function mapSupabaseVehicle(v: any): Vehicle { /* normalize fields, use toArray for text[]/jsonb */ }

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase.from('vehicles').select('*').eq('is_active', true).order('category').order('price_per_day');
  if (error) { console.error('Error:', error); return []; }
  return (data || []).map(mapSupabaseVehicle);
}
```

**Important**: `toArray()` helper needed because Supabase `text[]` columns can return as string or array depending on column type/encoding. Also for `jsonb` columns like `specs`, `itinerary`, `faq`, `seo` — parse with `JSON.parse` if string.

## Admin CRUD pattern

Each entity has 4 pages:
- `app/admin/dashboard/{entity}/page.tsx` — list with table + filter
- `app/admin/dashboard/{entity}/new/page.tsx` — create form (use `AdminForm` component with sticky save bar)
- `app/admin/dashboard/{entity}/[id]/page.tsx` — edit form
- Components use Supabase `client` (browser-side) for auth-aware writes

## Admin navigation (sidebar)

`components/admin/AdminDashboardLayout.tsx` has top nav (no sidebar) with: Brand, nav items (Armada, Paket, Artikel, Galeri, Testimoni, FAQ), "Lihat Web" link, notification bell, user menu. Mobile: hamburger → drawer from right.

## Deployment

- **Single Vercel project** — public site + admin
- Production URL: `https://mahessatransholiday.web.id` (or `<project>.vercel.app`)
- Admin: `https://mahessatransholiday.web.id/admin/login`
- Auto-deploy on push to `main` (Vercel GitHub integration)
- Latest commit: `a25477d` (FAQ distribute by index, artikel/temukan PageHero konsistensi)

### After deploy — Vercel edge cache

If user reports old data, ask them to:
1. Vercel Dashboard → Deployments → "..." → "Redeploy" with **uncheck "Use existing Build Cache"**

### Known runtime issues (already fixed)

- ~~`force-dynamic` placed BEFORE imports in `[slug]/page.tsx`~~ — moved after imports
- ~~`unstable_cache` returned stale data after DB changes~~ — removed entirely
- ~~`/armada/toyota-avanza` 404~~ — caused by RLS 42501 on `auth.users`; fixed in migration 006/007
- ~~`/_next/image?url=...` 400 Bad Request~~ — fixed by `unoptimized: true` in next.config.ts
- ~~FAQ categories 0~~ — UUID filter issue; fixed by slice-based distribution
- ~~`itinerary.map` 500~~ — itinerary is `jsonb` string; fixed by `parseItinerary()` helper
- ~~`s.description.map` 500~~ — description is `text[]`; fixed by `toArray()` helper

## Session continuation notes

If user pastes previous conversation log or screenshots, refer to known issues above. Common user requests:
- "kenapa X 404" → usually RLS policy missing or 42501 → check migration 005/006/007 applied
- "image gaada" → check `image_url` column in DB is full Supabase URL, not `/images/` path
- "lag berat" → `force-dynamic` queries Supabase every request; can add `unstable_cache` later for production
- "tambah menu Y" → update `NAV_LINKS` in `lib/constants.ts` for public, `NAV_ITEMS` in `AdminDashboardLayout.tsx` for admin
- "fix typo di X" → use Grep to find file, edit, commit, push

## Reference docs

- `supabase/migrations/*.sql` — schema + seed history
- `lib/data/supabase/*.ts` — source of truth for runtime data
- `components/admin/AdminForm.tsx` — shared form with sticky save bar (mobile floating)
- `components/PageHero.tsx` — shared hero component (use for consistency)