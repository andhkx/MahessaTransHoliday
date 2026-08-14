<!DOCTYPE html>
<html lang="id">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PK2M02FXQ7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PK2M02FXQ7');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ $meta['title'] }}</title>
  <meta name="description" content="{{ $meta['description'] }}">
  <meta name="keywords" content="{{ $meta['keywords'] }}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{{ request()->url() }}">

  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ request()->url() }}">
  <meta property="og:title" content="{{ $meta['title'] }}">
  <meta property="og:description" content="{{ $meta['description'] }}">
  <meta property="og:site_name" content="Mahessa Trans Holiday">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $meta['title'] }}">
  <meta name="twitter:description" content="{{ $meta['description'] }}">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    .animate-gradient { animation: gradient 8s ease infinite; background-size: 200% 200%; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .nav-link { @apply text-sm font-semibold text-gray-900 px-3 py-2 rounded-lg transition-colors hover:text-blue-700 hover:bg-blue-50; }
    .btn-primary { @apply inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-bold text-sm rounded-full transition-all hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5; }
    .btn-outline { @apply inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-white font-semibold text-sm rounded-full border-2 border-white/40 transition-all hover:bg-white/10 hover:border-white; }
    .service-card { @apply bg-white rounded-2xl border border-gray-200 p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200; }
    .service-icon { @apply w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-xl text-blue-700 mx-auto mb-4 transition-all; }
    .service-card:hover .service-icon { @apply bg-blue-700 text-white; }
    .dest-card { @apply bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200; }
    .pkg-card { @apply bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl; }
    .pkg-badge { @apply absolute top-3 left-3 bg-white/95 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10; }
    .wa-float { @apply fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl z-50 shadow-lg hover:bg-green-600 hover:scale-110 transition-all; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #1D4ED8; }
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="font-sans text-brand-text bg-brand-bg">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-brand-border shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <a href="{{ route('home') }}" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="{{ asset('images/logo.png') }}" alt="Logo Mahessa" class="h-8 w-auto" onerror="this.style.display='none'">
          <span class="font-bold text-brand-blue text-lg">Mahessa Trans <span class="text-brand-text">Holiday</span></span>
        </a>
        <div class="flex items-center gap-2">
          <a href="{{ route('home') }}" class="nav-link"><i class="fas fa-home me-1"></i>Beranda</a>
          <a href="{{ route('home') }}#paket" class="nav-link"><i class="fas fa-suitcase me-1"></i>Paket</a>
          <a href="https://wa.me/62895327077214" target="_blank" class="btn-primary">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="relative bg-gradient-to-br from-brand-text via-brand-dark-blue to-brand-blue pt-28 pb-16 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-blue/40 to-transparent animate-gradient"></div>
    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/85 px-4 py-2 rounded-full mb-4 animate-float">
        <i class="fas fa-map-marker-alt"></i> Layanan di {{ $pageTitle }}
      </div>
      <h1 class="text-3xl md:text-5xl font-black mb-4 leading-tight">{{ $pageTitle }}</h1>
      <p class="text-lg text-white/80 max-w-2xl mx-auto mb-8">{{ $pageDescription }}</p>
      <a href="https://wa.me/62895327077214?text={{ urlencode($waMessage) }}" target="_blank" class="btn-primary text-lg px-8 py-3">
        <i class="fab fa-whatsapp me-2"></i> Pesan via WhatsApp
      </a>
    </div>
  </section>

  <!-- WHY CHOOSE US -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Mengapa Mahessa Trans?</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Keunggulan Layanan Kami</h3>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-money-bill-wave"></i></div>
          <h4 class="font-bold text-base mb-2">Harga Transparan</h4>
          <p class="text-sm text-brand-muted">Tanpa biaya tersembunyi. Harga sudah include driver, BBM, tol & parkir.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-car"></i></div>
          <h4 class="font-bold text-base mb-2">Armada Baru & Nyaman</h4>
          <p class="text-sm text-brand-muted">Innova Reborn 2023/24, Hiace Commuter, Avanza, Xenia - full AC & bersih.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-user-tie"></i></div>
          <h4 class="font-bold text-base mb-2">Driver Profesional</h4>
          <p class="text-sm text-brand-muted">Berpengalaman, ramah, hafal rute, safety first. Bisa jadi guide.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-clock"></i></div>
          <h4 class="font-bold text-base mb-2">Layanan 24/7</h4>
          <p class="text-sm text-brand-muted">Bisa booking kapan saja. Antar-jemput ke hotel, stasiun, bandara.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PAKET TERSEDIA -->
  <section class="py-16 bg-brand-bg">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Paket Tersedia</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Pilihan Paket untuk {{ $pageTitle }}</h3>
        <p class="text-brand-muted max-w-2xl mx-auto">Berikut paket yang cocok untuk kebutuhan perjalanan Anda</p>
      </div>

      @if($packages->isEmpty())
      <div class="text-center py-12 bg-white rounded-2xl border border-brand-border">
        <div class="text-6xl mb-4">����</div>
        <h3 class="text-xl font-bold text-brand-text mb-2">Belum Ada Paket Spesifik</h3>
        <p class="text-brand-muted mb-6">Paket khusus untuk {{ $pageTitle }} sedang disiapkan.</p>
        <a href="{{ route('home') }}#paket" class="btn-primary">Lihat Semua Paket</a>
      </div>
      @else
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach($packages as $package)
        <div class="pkg-card">
          <a href="{{ route('package.show', $package->slug) }}" class="stretched-link"></a>
          <div class="pkg-img">
            @if($package->image_path)
            <img src="{{ $package->image_url }}" alt="{{ $package->title }}" class="pkg-image">
            @else
            <span class="text-5xl">�������</span>
            @endif
            <span class="pkg-badge">{{ Str::limit($package->category, 20) }}</span>
          </div>
          <div class="pkg-body">
            <h5 class="font-bold text-lg mb-2">{{ $package->title }}</h5>
            <p class="text-sm text-brand-muted mb-4 line-clamp-2">{{ Str::limit($package->description, 80) }}</p>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-brand-muted font-medium mb-1">Mulai dari</div>
                <div class="text-xl font-black text-brand-blue">{{ $package->formatted_price }}</div>
              </div>
              <a href="https://wa.me/62895327077214?text={{ urlencode("Halo Mahessa Trans Holiday, saya ingin bertanya/memesan paket {$package->title} dengan harga {$package->formatted_price}. Bagaimana prosedur selanjutnya?") }}" target="_blank" class="btn-whatsapp">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        @endforeach
      </div>
      @endif
    </div>
  </section>

  <!-- POPULAR DESTINATIONS -->
  @if(isset($popularDestinations))
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Destinasi Populer</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Tujuan Lainnya dari {{ $pageTitle }}</h3>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @foreach($popularDestinations as $dest)
        <a href="{{ route('landing.' . $dest['slug']) }}" class="dest-card hover:scale-105 transition-transform">
          <img src="{{ asset('images/' . $dest['image']) }}" alt="{{ $dest['title'] }}" class="dest-img">
          <div class="dest-content">
            <h4 class="font-bold text-dark mb-2">{{ $dest['title'] }}</h4>
            <p class="text-muted mb-0 text-sm">{{ $dest['desc'] }}</p>
          </div>
        </a>
        @endforeach
      </div>
    </div>
  </section>
  @endif

  <!-- CTA -->
  <section class="py-16 bg-gradient-to-br from-brand-blue to-blue-600 text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-black mb-4">Siap Berangkat?</h2>
      <p class="text-blue-100 mb-8 max-w-2xl mx-auto">Dapatkan penawaran terbaik dan konsultasi gratis untuk perjalanan Anda.</p>
      <a href="https://wa.me/62895327077214?text={{ urlencode($waMessage) }}" target="_blank" class="btn-outline text-white border-white hover:bg-white hover:text-brand-blue text-lg px-8 py-3">
        <i class="fab fa-whatsapp me-2"></i> Chat WhatsApp Sekarang
      </a>
      <div class="mt-8 text-blue-200">
        <i class="fas fa-phone me-2"></i>0895-3270-77214
        <span class="mx-2">•</span>
        <i class="fas fa-clock me-2"></i>Buka 24 Jam / 7 Hari
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-brand-text text-white/65 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-plane-departure text-brand-blue text-xl"></i>
            <span class="font-bold text-lg text-white">Mahessa Trans Holiday</span>
          </div>
          <p class="text-sm">Travel agency terpercaya dari Cimahi, Bandung. Melayani rental mobil, charter drop, city tour, open trip & paket wisata ke seluruh Indonesia.</p>
        </div>
        <div>
          <h5 class="font-bold text-white mb-4">Menu</h5>
          <ul class="space-y-2 text-sm">
            <li><a href="{{ route('home') }}" class="hover:text-brand-blue transition-colors"><i class="fas fa-angle-right me-2 text-brand-blue"></i>Beranda</a></li>
            <li><a href="{{ route('home') }}#paket" class="hover:text-brand-blue transition-colors"><i class="fas fa-angle-right me-2 text-brand-blue"></i>Paket Tour</a></li>
            <li><a href="{{ route('blog.index') }}" class="hover:text-brand-blue transition-colors"><i class="fas fa-angle-right me-2 text-brand-blue"></i>Blog</a></li>
          </ul>
        </div>
        <div>
          <h5 class="font-bold text-white mb-4">Hubungi Kami</h5>
          <ul class="space-y-2 text-sm">
            <li><i class="fas fa-phone me-2 text-brand-blue"></i>0895-3270-77214</li>
            <li><i class="fab fa-whatsapp me-2 text-green-500"></i>0895-3270-77214</li>
            <li><i class="fas fa-clock me-2 text-brand-blue"></i>Buka 24 Jam / 7 Hari</li>
          </ul>
        </div>
      </div>
      <hr class="border-white/10 mb-6">
      <div class="flex justify-between items-center text-xs text-white/45">
        <p>&copy; {{ date('Y') }} Mahessa Trans Holiday. All Rights Reserved.</p>
        <a href="{{ route('admin.login') }}" class="hover:text-white/65">Admin</a>
      </div>
    </div>
  </footer>

  <!-- WA FLOAT -->
  <a href="https://wa.me/62895327077214?text={{ urlencode($waMessage) }}" target="_blank" class="wa-float">
    <i class="fab fa-whatsapp"></i>
  </a>

  @vite('resources/js/app.js')
</body>
</html>