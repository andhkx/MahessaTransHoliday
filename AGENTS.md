# Mahessa Trans Holiday - Laravel 12 Project

**Status**: Phase 1-4 Complete ✅ | Frontend Refactored to Tailwind CSS | SEO Landing Pages Added

## Commands

| Task | Command |
|------|---------|
| Start dev server (all services) | `composer dev` |
| PHP server only | `php artisan serve` |
| Queue worker | `php artisan queue:listen --tries=1` |
| Logs (pail) | `php artisan pail --timeout=0` |
| Vite dev server | `npm run dev` |
| Build assets | `npm run build` |
| Run tests | `./vendor/bin/phpunit` |
| Run single test | `./vendor/bin/phpunit --filter TestName` |
| Lint (Pint) | `./vendor/bin/pint` |
| Clear all caches | `php artisan optimize:clear` |
| Migrate DB | `php artisan migrate` |
| Fresh migrate + seed | `php artisan migrate:fresh --seed` |

## Project Structure

- **app/Http/Controllers** - Controllers (Frontend, Blog, Admin namespace, Landing pages)
- **app/Models** - Eloquent models: User, Package, Post, Transaction
- **routes/web.php** - All routes (no api.php), includes 12 SEO landing pages
- **resources/views/frontend** - Blade templates (Tailwind CSS refactored)
  - `index.blade.php` - Homepage with service filter
  - `package-detail.blade.php` - Package detail page with FAQ, includes/excludes
  - `landing.blade.php` - Template for all SEO landing pages
  - `blog-index.blade.php` - Blog listing
- **resources/css/app.css** - Tailwind CSS with custom animations
- **resources/js/app.js** - Vite entry point
- **tailwind.config.js** - Tailwind configuration
- **tests/Feature**, **tests/Unit** - PHPUnit tests

## Database Schema (Package Model)

**New Fields Added**:
- `service_type` enum: Rental Mobil, Charter Drop, City Tour, Open Trip, Tour Paket, Custom/Door-to-Door
- `destination` string: Location-based targeting (Cimahi, Bandung, Padalarang, Lembang, Ciwidey, Bali, dll)
- `includes` JSON: Facilities included in package
- `excludes` JSON: What's not included
- `duration_days` int: Trip duration
- `min_pax` int: Minimum passengers
- `max_pax` int: Maximum passengers
- `meta_title` & `meta_description` for SEO

## Key Routes

**Homepage & Main Pages**:
- `/` - Homepage with service filter (Tailwind refactored)
- `/paket-wisata/{slug}` - Package detail page (Tailwind refactored)
- `/blog` & `/blog/{slug}` - Blog pages
- `/admin` - Admin panel (auth required)

**SEO Landing Pages** (Priority: Cimahi, Bandung, Padalarang):
- `/sewa-mobil-cimahi` - Sewa Mobil Cimahi
- `/sewa-mobil-bandung` - Sewa Mobil Bandung
- `/sewa-mobil-padalarang` - Stasiun KCIC Padalarang
- `/tour-lembang` - Paket Tour Lembang
- `/tour-ciwidey` - Paket Tour Ciwidey
- `/paket-bandung-bali` - Bandung to Bali (Door to Door)
- `/paket-bandung-jogja` - Bandung to Yogyakarta
- `/paket-bandung-bromo` - Bandung to Bromo
- `/paket-bandung-pangandaran` - Bandung to Pangandaran
- `/paket-cimahi-pangandaran` - Cimahi to Pangandaran
- `/charter-drop-bandara-soetta` - Bandara Soetta Drop-off/Pick-up
- `/rental-innova-reborn` - Innova Reborn Rental

**Admin Routes**:
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard
- `/admin/packages` - Package CRUD (updated with new fields)
- `/admin/transactions` - Transaction CRUD
- `/admin/posts` - Post CRUD

## Environment

- **PHP**: 8.2+
- **DB**: SQLite (local), configurable via `.env`
- **Queue**: Database (default), sync in tests
- **Cache/Session**: Database
- **Mail**: Log driver
- **Frontend**: Tailwind CSS 4.0 + Vite 6
- **Animations**: CSS-based (no JS, mobile-friendly)

## Frontend Features

**Tailwind CSS Refactored**:
- Removed Bootstrap CDN (500+ lines inline styles → Tailwind utilities)
- Custom animations: `animate-gradient`, `animate-float` (CSS keyframes, no JS overhead)
- Mobile-first responsive design
- Dark mode ready (color variables in tailwind.config.js)

**Components**:
- Navbar with fixed positioning & blur backdrop
- Hero section with animated gradient background
- Service cards with hover animations
- Destination cards with image overlays
- Package cards with WhatsApp CTA
- Filter pills (desktop) + select dropdown (mobile)
- Sticky sidebar on detail page
- Mobile bottom CTA bar
- WhatsApp floating button with pulse animation

**SEO Features**:
- All pages have meta titles, descriptions, keywords
- Schema.org markup (Product, BreadcrumbList, LocalBusiness)
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data for rich snippets

## Testing

- Bootstrap: `vendor/autoload.php`
- Env: `APP_ENV=testing`, SQLite in-memory
- Run: `./vendor/bin/phpunit`
- Format: PSR-12 via Pint

## Code Style

- **Laravel Pint** (PSR-12)
- **EditorConfig**: 4 spaces, LF, UTF-8
- **Tailwind**: Utility-first approach
- No inline styles (all in CSS)
- Run `./vendor/bin/pint` before committing

## Recent Changes (Phases 1-4)

**Phase 1 (Complete)**: Database migration
- Added `service_type`, `destination`, `includes/excludes`, `duration_days`, `min_pax`, `max_pax` to packages table
- Updated Package model with casts for JSON fields
- Seeded 10 packages with new structure

**Phase 2 (Complete)**: Admin CRUD Updates
- Updated PackageController with new field validation
- Enhanced admin form with service type dropdown, destination autocomplete, includes/excludes textarea
- Added meta title/description fields for SEO

**Phase 3 (Complete)**: SEO Landing Pages
- Created 12 landing pages for priority locations: Cimahi, Bandung, Padalarang, Lembang, Ciwidey, Bali, Jogja, Bromo, Pangandaran, Soetta, Innova Reborn
- Landing pages use reusable `landing.blade.php` template
- Each page has unique meta tags, keywords, descriptions
- Dynamic package filtering per landing page

**Phase 4 (Complete)**: Tailwind CSS Refactoring
- Migrated `index.blade.php` (homepage) to Tailwind
- Migrated `package-detail.blade.php` to Tailwind
- Created comprehensive CSS component library in `app.css`
- Removed 1200+ lines of inline Bootstrap CSS
- Added CSS animations: gradient, float, pulse-glow (low overhead for mobile)
- Vite build: 50KB CSS (8.4KB gzipped), 48KB JS (18.6KB gzipped)

## Next Steps (Not Started Yet)

- **Phase 5**: Blog pages refactor to Tailwind (blog-index.blade.php, blog-detail.blade.php)
- **Phase 6**: Admin panel refactor to Tailwind (admin layout, CRUD forms)
- **Phase 7**: Add inquiry form & testimonials
- **Phase 8**: Implement blog content with SEO-rich articles
- **Phase 9**: Setup Google Search Console & Analytics
- **Phase 10**: Performance optimization (lazy-load images, minify, compression)

## Important Notes

- **Filter System**: Desktop shows 12 filter pills, mobile shows select dropdown (responsive)
- **Service Types**: New 6-type system replaces old 13-enum category (more flexible)
- **Landing Pages**: All use same template but different meta/content for SEO targeting
- **Animations**: CSS-only (no Framer Motion or JS libraries) to keep bundle light for mobile
- **GitHub**: All changes pushed to `https://github.com/andhkx/MahessaTransHoliday`
- **Database**: Using SQLite for development (portable, no setup needed)