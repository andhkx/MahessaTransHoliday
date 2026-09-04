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
- ❓ **FAQ / Galeri / Kontak** — contact form with date picker + Google Maps directions
- 📱 **Fully responsive** — mobile-first, optimized for Lighthouse 90+

### Admin dashboard
- 🚐 **CRUD Armada** — vehicles with main + interior gallery, badge, featured toggle
- 🗺️ **CRUD Paket** — packages with itinerary, inclusions, pricing
- 📰 **CRUD Artikel** — blog with status workflow (draft/published/archived)
- 🖼️ **CRUD Galeri** — photo gallery by category & location
- ⭐ **CRUD Testimoni** — customer reviews with rating
- ❓ **CRUD FAQ** — main/extra groups with display order
- 📊 **Dashboard** — 7-day activity chart, log audit, status overview
- 📜 **Activity log** — auto-tracked every CRUD write
- 🔐 **Cloudflare Turnstile** — bot protection on login

---

## 🛠 Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, RSC) |
| Styling | [Tailwind v4](https://tailwindcss.com) + custom `@theme` tokens |
| Animation | [Framer Motion v13+](https://motion.dev) (`motion/react`) |
| Icons | [Lucide React](https://lucide.dev) |
| Database | [Supabase Postgres](https://supabase.com) |
| Storage | Supabase Storage (4 public buckets) |
| Auth | Supabase Auth + Cloudflare Turnstile |
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

### Local development

```bash
# 1. Clone
git clone https://github.com/andhkx/MahessaTransHoliday.git
cd MahessaTransHoliday

# 2. Install
npm install

# 3. Configure env (see below)
cp .env.example .env.local

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
│   └── temukan/             # vehicle finder wizard
├── admin/dashboard/         # admin CRUD pages
│   ├── armada/ paket/ artikel/ galeri/ testimoni/ faq/
│   └── log/                  # activity log viewer
├── api/
│   ├── og/                   # dynamic OG image generator
│   └── contact-options/      # JSON endpoint for /kontak form
components/                   # UI components
├── VehicleFinder/            # 4-step wizard
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
# Public (Vercel-safe)
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAA...   # Cloudflare Turnstile

# Server-only (NEVER expose)
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # for bulk-upload script
```

Set in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## 📊 Performance

Optimized for **Lighthouse 90+** on mobile and desktop:

- ✅ Next.js Image Optimization (AVIF/WebP, 1y CDN cache, responsive sizes)
- ✅ Hero image: `fetchpriority="high"`, `priority` preload
- ✅ Bundle tree-shaking: `optimizePackageImports: ['lucide-react', 'motion/react']`
- ✅ All Supabase pages use `force-dynamic` (no stale data)
- ✅ Per-route `loading.tsx` for instant spinner feedback
- ✅ Inline SVG fallback images (no 404s)
- ✅ Custom security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

---

## 🤝 Contributing

Issues & PRs welcome. For business inquiries, contact [WhatsApp](https://wa.me/62895327077214).

---

## 📄 License

© 2026 Mahessa Trans Holiday. All rights reserved.
Created by [hitou.my.id](https://hitou.my.id).