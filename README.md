# Mahessa Trans Holiday

> **Rental mobil & paket wisata** — Cimahi, Bandung, Padalarang, dan se-Jawa.
> Marketing site + admin dashboard built with Next.js 16, Tailwind v4, and Supabase.

🌐 **Live**: [mahessatransholiday.web.id](https://mahessatransholiday.web.id)
🔐 **Admin**: [mahessatransholiday.web.id/admin/login](https://mahessatransholiday.web.id/admin/login)
📞 **WhatsApp**: [+62 895-3270-77214](https://wa.me/62895327077214)

---

## ✨ What's inside

A complete business platform for an Indonesian car-rental and travel agency:

### Public site
- 🏠 **Homepage** — hero, stats, advantages, featured armada & packages, process, gallery, FAQ, testimonials
- 🚐 **Armada** — full vehicle catalog with category filters (City Car / MPV / SUV / Luxury / Group)
- 🗺️ **Paket** — travel packages with itineraries, inclusions, pricing
- 📰 **Artikel** — blog posts (SEO-optimized)
- 🔍 **Temukan** — 4-step vehicle finder wizard (budget → people → journey → recommendation)
- 📞 **Kontak** — multi-topic form (Sewa / Paket / Antar Jemput / Lainnya) with:
  - Single-card swipe picker for armada & paket (state-based, prev/next + dot nav)
  - Google Places autocomplete for pick-up & destination
  - MapLibre map preview with markers A → B + auto-fit bounds
- ❓ **FAQ / Galeri** — accordion + photo grid with category filter
- 📱 **Fully responsive** — mobile-first, optimized for Lighthouse 90+

### Admin dashboard
- 🚐 **CRUD Armada** — vehicles with main + interior gallery, badge, featured toggle
- 🗺️ **CRUD Paket** — packages with itinerary, inclusions, pricing
- 📰 **CRUD Artikel** — blog with status workflow (draft/published/archived)
- 🖼️ **CRUD Galeri** — photo gallery by category & location
- ⭐ **CRUD Testimoni** — customer reviews with rating
- ❓ **CRUD FAQ** — main/extra groups with display order
- 📊 **Dashboard** — 7-day activity chart, log audit, status overview
- 📜 **Activity log** — auto-tracked every CRUD write via Postgres triggers
- 🔐 **Cloudflare Turnstile** — bot protection on login

---

## 🛠 Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, RSC) |
| Styling | [Tailwind v4](https://tailwindcss.org) + custom `@theme` tokens |
| Animation | [Framer Motion v13+](https://motion.dev) (`motion/react`) |
| Icons | [Lucide React](https://lucide.dev) |
| Database | [Supabase Postgres](https://supabase.com) |
| Storage | Supabase Storage (4 public buckets: vehicles, packages, articles, gallery) |
| Auth | Supabase Auth + Cloudflare Turnstile |
| Maps | [MapLibre GL](https://maplibre.org) + OpenStreetMap raster tiles (no API key) |
| Places | [Google Places API (New)](https://developers.google.com/maps/documentation/places/web-service/place-autocomplete) — server-proxied via `/api/places/*` |
| Charts | [Recharts](https://recharts.org) |
| OG image | [@vercel/og](https://vercel.com/docs/functions/og-image-generation) |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | Vercel (auto-deploy on `main`) |
| DNS | Cloudflare (proxied for free WAF + DDoS + Bot Fight) |
| Domain | `.web.id` |

---

## 🚀 Quick start

### Prerequisites
- Node.js 20+
- A Supabase project (free tier works)
- (Optional) Google Cloud project with **Places API (New)** enabled, for the `/kontak` autocomplete

### Local development

```bash
# 1. Clone
git clone https://github.com/andhkx/MahessaTransHoliday.git
cd MahessaTransHoliday

# 2. Install
npm install

# 3. Configure env (see below)
cp .env.local .env.local   # then edit values

# 4. Run migrations in Supabase SQL editor (in order: 001..010)

# 5. Dev
npm run dev  # http://localhost:3000
```

### Build & deploy

```bash
npm run build      # production build
npm run start      # serve locally
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check
npm run upload:images   # one-time bulk upload to Supabase Storage
```

Push to `main` → Vercel auto-deploys.

---

## 🗂 Project structure

```
app/
├── (public)/                 # public website (route group)
│   ├── armada/[slug]/       # vehicle detail
│   ├── paket/[slug]/        # package detail
│   ├── artikel/[slug]/      # blog post
│   ├── temukan/             # vehicle finder wizard
│   └── kontak/              # contact form (multi-topic + Places + Map)
├── admin/dashboard/         # admin CRUD pages
│   ├── armada/ paket/ artikel/ galeri/ testimoni/ faq/
│   └── log/                  # activity log viewer
├── api/
│   ├── og/                   # dynamic OG image generator
│   ├── contact-options/      # JSON endpoint for /kontak form
│   └── places/               # Google Places proxy (autocomplete + details)
components/                   # UI components
├── VehicleFinder/            # 4-step wizard
├── LocationAutocomplete.tsx   # Google Places search input + dropdown
├── RouteMap.tsx              # MapLibre map with A/B markers
├── admin/                    # admin-specific (layout, form, badge)
lib/data/supabase/           # PRIMARY data layer
supabase/migrations/          # 10 SQL migrations
public/images/               # static logo + service icons
```

For deep dives, see [`AGENTS.md`](./AGENTS.md) — agent context, conventions, known issues, and continuation notes.

---

## 🗄 Database schema

10 migrations applied in order via Supabase SQL editor:

| # | Migration | Purpose |
|---|-----------|---------|
| 1 | `001_create_tables_and_seed.sql` | Base tables + initial seed |
| 2 | `002_full_schema_and_seed.sql` | Extended columns (gallery, specs, seo, etc.) |
| 3 | `003_gallery_and_storage.sql` | Gallery table + storage policies |
| 4 | `004_storage_policies.sql` | Storage RLS |
| 5-7 | `005..007_*rls*.sql` | RLS policy iterations |
| 8 | `008_activity_logs.sql` | Auto audit log on every CRUD |
| 9 | `009_fix_activity_triggers.sql` | Bug fixes for triggers + jsonb handling |
| 10 | `010_security_hardening.sql` | search_path + REVOKE on trigger functions |

**Key RLS rules**:
- Public read (`SELECT`): `TO anon, authenticated USING (true)`
- Admin write (`*_modify`): `TO authenticated USING (true) WITH CHECK (true)`
- ⚠️ Never write policies that query `auth.users` — causes 42501 on anon

---

## 🌍 Environment variables

```bash
# Public (Vercel-safe, exposed to browser)
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAA...        # Cloudflare Turnstile

# Server-only (NEVER prefix with NEXT_PUBLIC_)
SUPABASE_SERVICE_ROLE_KEY=eyJ...                 # for bulk-upload script only
GOOGLE_MAPS_API_KEY=AIza...                      # for /api/places/* proxy (server-side)
```

**Setup Google Places**:
1. https://console.cloud.google.com/ → create/select project
2. Enable **Places API (New)**
3. APIs & Services → Credentials → Create API key
4. Restrict: API restrictions = "Places API (New)" only
5. Set billing (free $200/month credit ≈ 70k requests)

Set all in **Vercel Dashboard → Project → Settings → Environment Variables**. For Google key, mark as **Production + Preview**, NOT public.

---

## 🗺 Maps & places

The `/kontak` form (topik **Antar Jemput**) integrates two services:

- **Autocomplete** — Google Places API (New) for pick-up & destination search. Server-proxied via `app/api/places/{autocomplete,details}/route.ts` so the key never reaches the browser. Session token batches autocomplete+details as a single billable session.
- **Map preview** — MapLibre GL + OpenStreetMap raster tiles. Free, no API key, attribution kept on the map. Markers A (pickup, blue) and B (destination, red) auto-fit bounds.

**Cloudflare note**: Bot Fight Mode is on. If tiles return `403` on some visits, whitelist `*.tile.openstreetmap.org` in Cloudflare WAF → Tools → IP Access Rules.

---

## 📊 Performance

Optimized for **Lighthouse 90+** on mobile and desktop:

- ✅ Next.js Image Optimization (AVIF/WebP, 1y CDN cache, responsive sizes)
- ✅ Hero image: `fetchpriority="high"`, `priority` preload
- ✅ Bundle tree-shaking: `optimizePackageImports: ['lucide-react', 'motion/react']`
- ✅ All Supabase pages use `force-dynamic` (no stale data, no stale cache)
- ✅ Per-route `loading.tsx` for instant spinner feedback
- ✅ Inline SVG fallback images (no 404s)
- ✅ Custom security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- ✅ Sitemap dynamically rebuilt from Supabase (armada + paket + published artikel)

---

## 🆕 Recent changes

- `/kontak` form rebuilt: multi-topic form, single-card swipe picker for armada/paket, Google Places autocomplete + MapLibre map preview for Antar Jemput
- Sitemap migrated from legacy static data to live Supabase (armada + paket + published artikel)
- Activity log triggers hardened (security definer functions revoked from PUBLIC)
- Storage RLS: anon read + auth modify, no `auth.users` joins

---

## 🤝 Contributing

Issues & PRs welcome. For business inquiries, contact [WhatsApp](https://wa.me/62895327077214).

---

## 📄 License

© 2026 Mahessa Trans Holiday. All rights reserved.
Created by [hitou.my.id](https://hitou.my.id).
