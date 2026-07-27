<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Pengaturan Paginator Tailwind
        Paginator::useTailwind();

        // Pengaturan HTTPS untuk Cloudflare
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}