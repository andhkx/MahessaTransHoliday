<?php
use App\Http\Controllers\BlogController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth; // <-- Tambahan wajib
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\PostController;


Route::get('/bersihkan-cache', function() {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    return "MANTAP! Semua cache rute dan view berhasil dibersihkan.";
});
Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/packages/filter', [FrontendController::class, 'filter'])->name('packages.filter');

// Rute SEO Halaman Detail Paket
Route::get('/paket-wisata/{slug}', [FrontendController::class, 'show'])->name('package.show');

// ========================================================
// SEO Landing Pages - Priority: Cimahi, Bandung, Padalarang
// ========================================================
Route::get('/sewa-mobil-cimahi', [FrontendController::class, 'cimahi'])->name('landing.cimahi');
Route::get('/sewa-mobil-bandung', [FrontendController::class, 'bandung'])->name('landing.bandung');
Route::get('/sewa-mobil-padalarang', [FrontendController::class, 'padalarang'])->name('landing.padalarang');
Route::get('/tour-lembang', [FrontendController::class, 'lembang'])->name('landing.lembang');
Route::get('/tour-ciwidey', [FrontendController::class, 'ciwidey'])->name('landing.ciwidey');
Route::get('/paket-bandung-bali', [FrontendController::class, 'bandungBali'])->name('landing.bandung-bali');
Route::get('/paket-bandung-jogja', [FrontendController::class, 'bandungJogja'])->name('landing.bandung-jogja');
Route::get('/paket-bandung-bromo', [FrontendController::class, 'bandungBromo'])->name('landing.bandung-bromo');
Route::get('/paket-bandung-pangandaran', [FrontendController::class, 'bandungPangandaran'])->name('landing.bandung-pangandaran');
Route::get('/paket-cimahi-pangandaran', [FrontendController::class, 'cimahiPangandaran'])->name('landing.cimahi-pangandaran');
Route::get('/charter-drop-bandara-soetta', [FrontendController::class, 'soetta'])->name('landing.soetta');
Route::get('/rental-innova-reborn', [FrontendController::class, 'innovaReborn'])->name('landing.innova-reborn');

// ========================================================
// Rute Pintar /admin 
// ========================================================
Route::get('/admin', function () {
    // Jika admin sudah login, langsung lempar ke Dashboard
    if (Auth::check()) {
        return redirect()->route('admin.dashboard');
    }
    // Jika belum login, lempar ke halaman Login
    return redirect()->route('admin.login');
});

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::resource('posts', PostController::class);
Route::prefix('admin')->group(function () {
    Route::resource('posts', PostController::class);
});
Route::get('/jalankan-migrasi-blog', function() {
    \Artisan::call('migrate');
    return "Selamat! Tabel blog berhasil dibuat di database.";
});
Route::get('/jalankan-migrasi', function() {
    try {
        \Artisan::call('migrate', ['--force' => true]);
        return "Tabel blog berhasil dibuat di database!";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});
Route::middleware('guest')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
});

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/chart-data', [DashboardController::class, 'chartData'])->name('dashboard.chart-data');

    Route::resource('packages', PackageController::class)->except(['show']);
    Route::resource('transactions', TransactionController::class)->except(['show']);
    Route::get('/transactions/{transaction}/invoice', [InvoiceController::class, 'download'])
        ->name('transactions.invoice');
});
