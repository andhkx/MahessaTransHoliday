<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mahessa Trans Holiday

Next.js 16 App Router + Tailwind v4 marketing site + admin dashboard for an Indonesian car-rental / travel business. UI copy, URLs, and metadata are all in **Bahasa Indonesia**.

- **Live**: <https://mahessatransholiday.web.id>
- **Admin**: <https://mahessatransholiday.web.id/admin/login>
- **Domain**: `.web.id` via Cloudflare (proxied + WAF + Bot Fight Mode free)
- **Host**: Vercel (auto-deploy `main`)
- **Backend**: Supabase (Postgres + Storage + Auth)
- **Captcha**: Cloudflare Turnstile on login

## Commands

```bash
npm run dev              # dev server (http://localhost:3000)
npm run build            # next build
npm run start            # serve the build
npm run lint             # eslint
npx tsc --noEmit         # typecheck
npm run upload:images    # one-time bulk upload to Supabase Storage
```

## Architecture

**Single repo, single Vercel project, single Supabase project.**

- **Public site** — `app/(public)/**` route group. Server components read from Supabase via `lib/data/supabase/*`. All pages use `export const dynamic = 'force-dynamic'`. If Supabase returns empty → empty state (no static fallback).
- **Admin dashboard** — `app/admin/**` behind `/admin/*` middleware. `AdminDashboardLayout` provides floating-pill glass navbar + PageHero-style sub-header.
- **Data layer** — `lib/data/supabase/*` is source of truth. Legacy `data/*.ts` retained only for sitemap slugs and the VehicleFinder wizard config (no images from there).
- **Image optimization** — `next.config.ts` has `images.unoptimized: false` + `minimumCacheTTL: 1y` + AVIF/WebP. Vercel CDN compresses Supabase Storage URLs.
- **Bundle** — `optimizePackageImports: ['lucide-react', 'motion/react']` for tree-shake. Motion used for animations (Framer Motion v13+ `motion/react`).
- **PWA / Analytics** — Vercel Analytics + Speed Insights via `@vercel/analytics` + `@vercel/speed-insights` (root layout).

## Supabase

- Project ref: `rxhibmwhkjpfwirzvojt`
- Storage buckets: `vehicles`, `packages`, `articles`, `gallery` — all Public
- Migrations: `supabase/migrations/001..010` (run via Supabase SQL editor or CLI `db push`)

### Migrations (apply in order)

| # | File | Purpose |
|---|------|---------|
| 001 | `001_create_tables_and_seed.sql` | Base tables (vehicles, packages, articles, testimonials, faq_items) |
| 002 | `002_full_schema_and_seed.sql` | Adds columns (badge, gallery[], description[], specs, suitable_for, service_areas, seo, fuel_type_extra) + seed 12 vehicles, 10 packages, 8 testimonials, 13 FAQ |
| 003 | `003_gallery_and_storage.sql` | `gallery_items` table + storage policies |
| 004 | `004_storage_policies.sql` | Storage RLS (4 policies per bucket: anon read + auth insert/update/delete) |
| 005 | `005_ensure_rls_policies.sql` | Drop+recreate public read policies safely |
| 006 | `006_fix_rls_policies.sql` | Drop bad policies that query `auth.users` (42501 on anon) |
| 007 | `007_nuclear_rls_fix.sql` | Full RLS reset + `is_featured` column on vehicles/packages |
| 008 | `008_activity_logs.sql` | `activity_logs` table + 18 trigger functions for CRUD audit log |
| 009 | `009_fix_activity_triggers.sql` | Fix `NEW.title` bug in `gallery_log` + remove `to_jsonb(NEW) - to_jsonb(OLD)` (jsonb-jsonb error) + add `toStringArray` helper for pseudo-JSON-array format |
| 010 | `010_security_hardening.sql` | `SET search_path = public` on all trigger fns + `REVOKE EXECUTE` from PUBLIC/anon/authenticated on SECURITY DEFINER functions |

Reference exports for manual data restore: `vehicles_rows.sql`, `packages_rows.sql`, `testimonials_rows.sql`, `faq_items_rows.sql`.

### RLS rules (running, verified)

- `vehicles_select`, `packages_select`, `articles_select`, `testimonials_select`, `faqs_select`, `gallery_select` — all `TO anon, authenticated USING (true)` (full public read)
- `*_modify` — `TO authenticated USING (true) WITH CHECK (true)` (admin full access)
- **DO NOT** add policies that query `auth.users` — anon role doesn't have SELECT on that table → 42501 error
- **Activity log functions** (`fn_log_activity`, `trg_*_log`) are `SECURITY DEFINER` but `EXECUTE` is revoked from PUBLIC — they run via trigger only

### Environment variables (.env.local + Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://rxhibmwhkjpfwirzvojt.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # for bulk-upload script only
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAElc0pMsz_IJ6dhA   # optional, has fallback
```

## Data shapes

`lib/types.ts` defines:

- `Vehicle { id, slug, name, category, transmission, capacity, fuelType, image, gallery, badge?, pricing.startingPrice, description[], suitableFor[], features[], specs[{label,value}], serviceAreas[], seo, is_active, is_featured }`
- `TravelPackage { id, slug, destination, badge?, duration, durationHours, price, image, description[], included[], excluded[], suitableFor[], itinerary?[{day,activities[]}], serviceAreas[], faq[{q,a}], seo, is_active, is_featured }`
- `FaqItem { id, question, answer, group_name, display_order, is_active }`
- `Article { id, title, slug, excerpt, content, cover_image_url, category, status, meta_title, meta_description, view_count, published_at, is_active }`
- `Spec { label, value }`
- `ActivityLog { id, user_email, action, entity_type, description, metadata, created_at }`

Vehicle categories: `entry | midrange | premium | luxury | group`

## File layout

```
app/
├── (public)/                 # route group — public website
│   ├── layout.tsx           # Navbar, main, Footer, JsonLd
│   ├── page.tsx             # homepage (Hero, Stats, Advantages, FeaturedArmada, FeaturedPackages, Process, Gallery, FAQ, TestimonialCarousel)
│   ├── armada/[slug]/       # vehicle detail
│   ├── paket/[slug]/        # package detail (with itinerary + WhatsApp CTA)
│   ├── artikel/[slug]/      # article detail
│   ├── faq/, galeri/, kontak/, temukan/
│   ├── ArmadaListClient.tsx # featured armada carousel
│   ├── PaketListClient.tsx  # featured packages carousel
│   ├── GaleriPageClient.tsx  # gallery grid + filter
│   ├── FaqPageClient.tsx     # FAQ accordion
│   └── loading.tsx           # public route spinner
├── admin/
│   ├── layout.tsx           # simple pass-through
│   ├── login/               # Cloudflare Turnstile captcha + Supabase auth
│   ├── dashboard/
│   │   ├── error.tsx        # error boundary
│   │   ├── loading.tsx      # admin route spinner
│   │   ├── armada/, paket/, artikel/, galeri/, testimoni/, faq/, log/
│   │   └── {entity}/        # list + new + [id] edit
│   └── ...
├── api/
│   ├── og/route.tsx         # @vercel/og dynamic OG image generator
│   └── contact-options/      # vehicles + packages for /kontak picker
├── layout.tsx               # root <html><body> + Analytics + SpeedInsights
middleware.ts                # protects /admin/*
components/
├── Navbar.tsx, Footer.tsx, Hero.tsx, Stats.tsx, CtaSection.tsx
├── PageHero.tsx             # shared hero (eyebrow + title + subtitle + gradient blur)
├── ServiceCards.tsx, VehicleCards.tsx, PackageCards.tsx
├── ProcessSection.tsx, SectionHeading.tsx, FaqAccordion.tsx
├── JsonLd.tsx, useSnapActive.ts, useSnapActive.ts
├── TestimonialCarousel/     # client carousel
├── VehicleFinder/           # /temukan 4-step wizard
│   ├── VehicleFinder.tsx
│   ├── Step1Budget.tsx
│   ├── Step2People.tsx
│   ├── Step3Journey.tsx
│   ├── Step4Result.tsx
│   ├── ProgressIndicator.tsx
│   ├── finder.ts             # wizard logic
│   └── index.ts
└── admin/
    ├── AdminDashboardLayout.tsx  # floating glass navbar + sub-hero
    ├── AdminForm.tsx              # shared form + sticky save bar
    ├── ImageUpload.tsx            # single image upload to bucket
    ├── MultiImageUpload.tsx       # multi-image gallery uploader
    ├── ConfirmDelete.tsx
    ├── ActivityChart.tsx          # recharts area chart, 7-day buckets
    └── badge.tsx                  # Badge + Button + ToggleField helpers
lib/
├── data/
│   ├── seo.ts, gallery.ts (static), finder.ts (wizard config)
│   ├── vehicles.ts, packages.ts, testimonials.ts, faq.ts, services.ts  # LEGACY
│   └── supabase/           # PRIMARY data layer
├── supabase/
│   ├── server.ts (admin, with cookies)
│   ├── client.ts (browser)
│   └── middleware.ts
├── types.ts, constants.ts, whatsapp.ts, format.ts, cn.ts
public/
├── images/                  # static assets (logo_mahessa.png, services/*)
```

## Conventions

- **All content is Supabase-driven.** `lib/data/supabase/*` is source of truth. Legacy `data/*.ts` only for sitemap slugs and VehicleFinder wizard config. No images from legacy.
- **No static fallback** in public pages. Empty Supabase → empty state.
- **Design tokens** in `app/globals.css` under `@theme`: `text-heading`, `bg-wa-surface`, `border-line`, `text-muted`, `bg-accent`, `shadow-card`, `shadow-elevated`.
- **WhatsApp only** for conversion — `waGeneralLink()`, `waVehicleLink()`, `waPackageLink()` in `lib/whatsapp.ts`. Number: `62895327077214`. Email: `mahessatransholiday@gmail.com`.
- **CTA pattern**: Armada/paket detail WhatsApp link uses **vehicle/package name only** (no date placeholder). Date selection lives at `/kontak` form (date picker, optional pickup/tujuan with Google Maps directions link).
- **Image URLs** must be full Supabase Storage URLs (e.g. `https://rxhibmwhkjpfwirzvojt.supabase.co/storage/v1/object/public/vehicles/...`). No local `/images/` paths in runtime code (only static `public/`).
- **Hero pattern** — share `PageHero` for inner pages (eyebrow + title + subtitle + gradient blur).
- **SEO** — manual per page via `generateMetadata`, `JsonLd`, `robots.ts`, `sitemap.ts`. Per-route `<title>` and `description`.

## Data layer pattern (`lib/data/supabase/*`)

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
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string');
    } catch {}
    // Fallback: legacy seed format "{\"a\",\"b\"}"
    const pseudo = value.match(/"((?:[^"\\]|\\.)*)"/g);
    if (pseudo && pseudo.length > 0) {
      return pseudo.map((s) => s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
    }
    return [value];
  }
  return [];
}

function mapSupabaseVehicle(v: any): Vehicle { /* normalize fields, use toArray for text[]/jsonb */ }

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from('vehicles').select('*').eq('is_active', true)
    .order('category').order('price_per_day');
  if (error) { console.error('Error:', error); return []; }
  return (data || []).map(mapSupabaseVehicle);
}
```

**Important**: `toArray()` handles both real JSON array `["a","b"]` and pseudo-JSON-array `'{"a","b"}'` (legacy seed data). Also use `JSON.parse` for jsonb columns (`specs`, `itinerary`, `faq`, `seo`) when string.

## Image fallback

When `image_url` is null (e.g. legacy data, baru di-upload), mapper returns inline SVG data URL. Defined in:
- `lib/data/supabase/vehicles.ts` — `PLACEHOLDER_IMG`
- `lib/data/supabase/packages.ts` — `PLACEHOLDER_IMG`
- `lib/gallery.ts` — `placeholder(label)` per item
- `lib/data/supabase/images.ts` — `FALLBACK_IMG`
- `components/VehicleFinder/Step1Budget.tsx` — local `FALLBACK_IMG`

No 404 untuk gambar kosong.

## Admin CRUD pattern

Each entity (armada, paket, artikel, galeri, testimoni, faq) has 4 pages:
- `app/admin/dashboard/{entity}/page.tsx` — list with status filter (Aktif/Nonaktif/Semua) + search + sort
- `app/admin/dashboard/{entity}/new/page.tsx` — create form
- `app/admin/dashboard/{entity}/[id]/page.tsx` — edit form

Components use Supabase `client` (browser-side) for auth-aware writes. `AdminForm` provides sticky save bar (mobile floating). Use `Badge`/`Button`/`ToggleField` from `components/admin/badge.tsx` for consistency.

Toggle fields: `is_active` (visible on /armada or /paket route) + `is_featured` (visible on homepage). Both default to true/true on create. Toggle in list page for quick access.

## Admin navigation (top navbar)

`components/admin/AdminDashboardLayout.tsx` has floating glass pill navbar with: Brand, nav items (Armada, Paket, Artikel, Galeri, Testimoni, FAQ, Log), "Lihat Web" link, user menu. Mobile: hamburger → drawer from right. New item → add to `NAV_ITEMS` array.

## Activity log

Every CRUD write (vehicles, packages, articles, testimonials, faq_items, gallery_items) is logged via Postgres triggers to `activity_logs` table. Logs are visible at `/admin/dashboard/log` with filter by action (create/update/delete) and entity. Dashboard widget shows last 8 entries + 7-day recharts area chart.

## Performance

- `next/image` with Supabase Storage URLs (AVIF/WebP, 1y cache)
- `optimizePackageImports` for tree-shake (lucide-react, motion/react)
- `force-dynamic` on all data pages (Supabase queried per request; can add `unstable_cache` later)
- `loading.tsx` per route for instant spinner

## Deployment

- **Vercel** — single project, auto-deploy on `main`
- Production URL: `https://mahessatransholiday.web.id`
- Admin: `https://mahessatransholiday.web.id/admin/login`
- **Cloudflare DNS** — domain is **proxied** (orange cloud) for free WAF + DDoS + Bot Fight Mode; SSL mode **Full (Strict)**; Vercel issues cert
- Auto-deploy on push to `main` (Vercel GitHub integration)

### After deploy — Vercel edge cache

If user reports old data: Vercel Dashboard → Deployments → "..." → "Redeploy" with **uncheck "Use existing Build Cache"**.

## Known issues (already fixed)

- ~~`force-dynamic` placed BEFORE imports in `[slug]/page.tsx`~~ — moved after imports
- ~~`unstable_cache` returned stale data after DB changes~~ — removed entirely
- ~~`/armada/toyota-avanza` 404~~ — caused by RLS 42501 on `auth.users`; fixed in migration 006/007
- ~~`/_next/image?url=...` 400 Bad Request~~ — fixed by `images.unoptimized: false` + Supabase CDN
- ~~FAQ categories 0~~ — UUID filter issue; fixed by slice-based distribution
- ~~`itinerary.map` 500~~ — itinerary is `jsonb` string; fixed by `parseItinerary()` helper
- ~~`s.description.map` 500~~ — description is `text[]`; fixed by `toArray()` helper
- ~~PATCH vehicles → 404 + `jsonb - jsonb` error~~ — `to_jsonb(NEW) - to_jsonb(OLD)` in trigger failed; removed diff, use `jsonb_build_object` (migration 009)
- ~~INSERT gallery → `no field title`~~ — `trg_gallery_log` referenced `NEW.title` but column is `caption`; fixed in migration 009
- ~~Paket edit → `.join is not a function`~~ — `description` came as string; `toStringArray` handles both (migration 009 + client fix)
- ~~SECURITY DEFINER functions callable by anon~~ — `REVOKE EXECUTE` from PUBLIC on all trigger functions
- ~~`/images/vehicles/placeholder.webp` 404~~ — replaced with inline SVG data URL
- ~~Hardcoded `/images/*.webp` in `data/vehicles.ts` etc. (92 refs)~~ — replaced with Supabase Storage URLs
- ~~"10â€"30 menit" mojibake~~ — fixed en-dash
- ~~"14?`15" corrupted bytes in Hiace description~~ — fixed
- ~~"Toyota Calya..." raw JSON in detail page~~ — `toArray()` pseudo-JSON parser
- ~~Paket/armada hanya 2 di homepage~~ — `ArmadaShowcaseClient` had hardcoded slug filter
- ~~Login 500 'captcha protection: request disallowed'~~ — Turnstile integration
- ~~Admin "couldn't load" infinite loop on edit~~ — `error.tsx` boundary

## Session continuation notes

If user pastes previous conversation log or screenshots, refer to known issues above. Common user requests:
- "kenapa X 404" → RLS policy missing or 42501 → check migration 005/006/007 applied
- "image gaada" → check `image_url` in DB is full Supabase URL, not `/images/` path
- "lag berat" → `force-dynamic` queries Supabase per request; can add `unstable_cache` later
- "tambah menu Y" → update `NAV_LINKS` in `lib/constants.ts` (public) or `NAV_ITEMS` in `AdminDashboardLayout.tsx` (admin)
- "fix typo di X" → grep → edit → commit → push
- "kok featured cuma 2?" → check `is_featured=true` in admin; toggle from list page
- "login captcha error" → verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` matches Cloudflare widget
- "CLS/LCP jelek" → check if local `/images/` paths leaking in (use Supabase CDN instead)

## Reference docs

- `supabase/migrations/*.sql` — schema + seed history (apply via SQL editor or `supabase db push`)
- `lib/data/supabase/*.ts` — source of truth for runtime data
- `components/admin/AdminForm.tsx` — shared form with sticky save bar
- `components/PageHero.tsx` — shared hero component
- `components/admin/badge.tsx` — Badge + Button + ToggleField primitives
- `.agents/skills/supabase/` — Supabase best practices (RLS, migrations, advisors)
- `.agents/skills/vercel-react-best-practices/` — Next.js performance guide
