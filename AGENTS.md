# Mahessa Trans Holiday - Laravel 12 Project

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

- **app/Http/Controllers** - Controllers (Frontend, Blog, Admin namespace)
- **app/Models** - Eloquent models: User, Package, Post, Transaction
- **routes/web.php** - All routes (no api.php)
- **resources/css/app.css**, **resources/js/app.js** - Vite entry points
- **tests/Feature**, **tests/Unit** - PHPUnit tests

## Key Routes

- `/` - Homepage (FrontendController)
- `/paket-wisata/{slug}` - Package detail
- `/blog` & `/blog/{slug}` - Blog
- `/admin` - Admin panel (auth required)
  - `/admin/login` - Admin login
  - `/admin/dashboard` - Dashboard
  - `/admin/packages` - Package CRUD
  - `/admin/transactions` - Transaction CRUD + invoice download
  - `/admin/posts` - Post CRUD

## Environment

- **PHP**: 8.2+
- **DB**: SQLite (default), configurable via `.env`
- **Queue**: Database (default), sync in tests
- **Cache/Session**: Database
- **Mail**: Log driver

## Testing

- Bootstrap: `vendor/autoload.php`
- Env: `APP_ENV=testing`, SQLite in-memory (commented in phpunit.xml)
- Run: `./vendor/bin/phpunit` (or `php artisan test` if pest installed)

## Code Style

- Laravel Pint (PSR-12)
- EditorConfig: 4 spaces, LF, UTF-8
- Run `./vendor/bin/pint` before committing