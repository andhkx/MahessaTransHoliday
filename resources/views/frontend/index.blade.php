<!DOCTYPE html>
<html lang="id">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PK2M02FXQ7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PK2M02FXQ7');
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mahessa Trans Holiday — Travel & Tour Bandung</title>
  <meta name="description" content="Mahessa Trans Holiday - Layanan Sewa Mobil, Charter Drop, Tour Antar Kota dari Cimahi, Bandung, dan Padalarang.">
  <link rel="icon" href="{{ asset('images/favicon.jpg') }}" type="image/jpeg">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Custom CSS dari app.css (ditulis manual) */
    @keyframes gradient {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .animate-gradient { animation: gradient 8s ease infinite; background-size: 200% 200%; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    
    /* Component classes */
    .nav-link { @apply text-sm font-semibold text-gray-900 px-3 py-2 rounded-lg transition-colors hover:text-blue-700 hover:bg-blue-50; }
    .btn-primary { @apply inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white font-bold text-sm rounded-full transition-all hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5; }
    .btn-outline { @apply inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-white font-semibold text-sm rounded-full border-2 border-white/40 transition-all hover:bg-white/10 hover:border-white; }
    .service-card { @apply bg-white rounded-2xl border border-gray-200 p-6 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-200; }
    .service-icon { @apply w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-xl text-blue-700 mx-auto mb-4 transition-all; }
    .service-card:hover .service-icon { @apply bg-blue-700 text-white; }
    .dest-card { @apply bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100; }
    .pkg-card { @apply bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-200; }
    .pkg-badge { @apply absolute top-3 left-3 bg-white/95 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10; }
    .wa-float { @apply fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl z-50 shadow-lg hover:bg-green-600 hover:scale-110 transition-all; }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #1D4ED8; }
    
    html { scroll-behavior: smooth; }
  </style>
</head>
<body class="font-sans text-brand-text bg-brand-bg overflow-x-hidden">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-brand-border shadow-sm transition-all duration-300">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <a href="{{ route('home') }}" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="{{ asset('images/logo.png') }}" alt="Logo Mahessa" class="h-8 w-auto" onerror="this.style.display='none'">
          <span class="font-bold text-brand-blue text-lg">Mahessa Trans <span class="text-brand-text">Holiday</span></span>
        </a>
        <button class="md:hidden text-brand-blue" onclick="mobileMenuToggle()">
          <i class="fas fa-bars text-2xl"></i>
        </button>
        <div class="hidden md:flex items-center gap-1" id="navbarMenu">
          <a href="#beranda" class="nav-link">Beranda</a>
          <a href="#layanan" class="nav-link">Layanan</a>
          <a href="#destinasi" class="nav-link">Destinasi</a>
          <a href="#paket" class="nav-link">Paket</a>
          <a href="https://wa.me/62895327077214" target="_blank" class="btn-primary">
            <i class="fab fa-whatsapp me-1"></i> WhatsApp
          </a>
        </div>
        <div class="hidden md:block" id="mobileMenu">
          <a href="#beranda" class="nav-link">Beranda</a>
          <a href="#layanan" class="nav-link">Layanan</a>
          <a href="#destinasi" class="nav-link">Destinasi</a>
          <a href="#paket" class="nav-link">Paket</a>
          <a href="https://wa.me/62895327077214" target="_blank" class="btn-primary">WhatsApp</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-text via-brand-dark-blue to-brand-blue overflow-hidden">
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-blue/40 to-transparent animate-gradient"></div>
      <div class="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-brand-blue/30 to-transparent animate-gradient" style="animation-delay: 2s"></div>
    </div>
    <div class="relative z-10 container mx-auto px-4 text-center pt-24 pb-16">
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/85 px-4 py-2 rounded-full mb-6 animate-float">
        <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        Travel Agency Terpercaya — Cimahi, Bandung
      </div>
      <h1 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
        Destinasi Impian<br><span class="text-blue-300">Harga Nyaman</span>
      </h1>
      <p class="text-lg text-white/80 max-w-xl mx-auto mb-10">
        Mahessa Trans Holiday melayani Tour Wisata, Rental Mobil, Charter Drop, City Tour & Open Trip dari Bandung ke seluruh destinasi favorit Indonesia.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#paket" class="btn-primary">
          <i class="fas fa-suitcase-rolling"></i> Lihat Paket Tour
        </a>
        <a href="https://wa.me/62895327077214?text=Halo+Mahessa+Trans+Holiday%2C+saya+ingin+konsultasi+paket+wisata." target="_blank" class="btn-outline">
          <i class="fab fa-whatsapp"></i> Konsultasi Gratis
        </a>
      </div>
      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <div class="bg-white/10 border border-white/15 text-white px-4 py-2 rounded-full text-sm font-medium"><i class="fas fa-users me-2"></i> 500+ Pelanggan</div>
        <div class="bg-white/10 border border-white/15 text-white px-4 py-2 rounded-full text-sm font-medium"><i class="fas fa-map-pin me-2"></i> 7 Destinasi</div>
        <div class="bg-white/10 border border-white/15 text-white px-4 py-2 rounded-full text-sm font-medium"><i class="fas fa-star me-2"></i> Rating 5★</div>
        <div class="bg-white/10 border border-white/15 text-white px-4 py-2 rounded-full text-sm font-medium"><i class="fas fa-clock me-2"></i> 24/7 Siap</div>
      </div>
    </div>
  </section>

  <!-- LAYANAN -->
  <section id="layanan" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Jenis Layanan</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Layanan Kami</h3>
        <p class="text-brand-muted max-w-2xl mx-auto">Kami melayani berbagai kebutuhan perjalanan Anda dengan armada nyaman dan harga bersahabat</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-car"></i></div>
          <h4 class="font-bold text-base mb-2">Rental Mobil</h4>
          <p class="text-sm text-brand-muted">Sewa mobil harian dengan atau tanpa driver. Berbagai pilihan armada tersedia.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-route"></i></div>
          <h4 class="font-bold text-base mb-2">Charter Drop</h4>
          <p class="text-sm text-brand-muted">Layanan antar-jemput point to point, termasuk Drop Bandung – Bandara Soetta.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-city"></i></div>
          <h4 class="font-bold text-base mb-2">City Tour</h4>
          <p class="text-sm text-brand-muted">Wisata keliling kota dengan paket customizable sesuai waktu dan budget Anda.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-users"></i></div>
          <h4 class="font-bold text-base mb-2">Open Trip</h4>
          <p class="text-sm text-brand-muted">Gabung bersama traveler lain dalam trip seru ke destinasi pilihan. Hemat & asik!</p>
        </div>
      </div>
    </div>
  </section>

  <!-- DESTINASI -->
  <section id="destinasi" class="py-20 bg-brand-bg">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Tujuan Wisata</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Destinasi Unggulan</h3>
        <p class="text-brand-muted max-w-2xl mx-auto">Dari Bandung, kami antar ke destinasi wisata terfavorit di Jawa dan Bali</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        @php
        $dests = [
          ['lembang.jpg', 'Lembang', 'Kebun teh, Dusun Bambu, Farm House & wisata alam sejuk.'],
          ['ciwidey.jpg', 'Ciwidey', 'Kawah Putih, Situ Patenggang & kebun strawberry eksotis.'],
          ['bandung.jpg', 'Bandung', 'City tour Braga, Gedung Sate, kuliner & wisata belanja.'],
          ['pangandaran.jpg', 'Pangandaran', 'Pantai eksotis, Green Canyon & wisata bahari memukau.'],
          ['jogja.jpg', 'Jogja', 'Borobudur, Prambanan, Keraton & wisata budaya Jawa.'],
          ['bromo.jpg', 'Bromo', 'Sunrise spektakuler, lautan pasir & kawah Bromo ikonik.'],
          ['bali.jpg', 'Bali', 'Pura, pantai, rice terrace & budaya Pulau Dewata.'],
          ['soetta.jpg', 'Bandara Soetta', 'Drop-off & Pick-up Bandara Soekarno-Hatta, on time!'],
        ];
        @endphp
        @foreach($dests as $d)
        <div class="dest-card">
          <img src="{{ asset('images/' . $d[0]) }}" alt="Wisata {{ $d[1] }}" class="dest-img">
          <div class="dest-content">
            <h4 class="font-bold text-dark mb-2">{{ $d[1] }}</h4>
            <p class="text-muted mb-0 text-sm">{{ $d[2] }}</p>
          </div>
        </div>
        @endforeach
      </div>
    </div>
  </section>

  <!-- PAKET TOUR -->
  <section id="paket" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Pilihan Terbaik</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Paket Tour Tersedia</h3>
        <p class="text-brand-muted max-w-2xl mx-auto">Semua paket sudah termasuk armada, driver, dan dukungan perjalanan penuh</p>
      </div>

      <div class="mb-8 text-center md:hidden">
        <select id="filterSelectMobile" class="filter-select" onchange="filterPackages(this.value)">
          <option value="semua">🗂 Semua Kategori</option>
          @foreach(['Rental Mobil','Charter Drop','City Tour','Open Trip','Tour Lembang','Tour Ciwidey','Tour Bandung','Tour Pangandaran','Tour Jogja','Tour Bromo','Tour Bali','Drop-off / Pick-up Bandara'] as $cat)
          <option value="{{ $cat }}">{{ $cat }}</option>
          @endforeach
        </select>
      </div>

      <div class="hidden md:flex justify-center gap-2 mb-8 flex-wrap" id="filterPillsDesktop">
        <button onclick="filterPackages('semua')" class="filter-pill active" data-cat="semua">Semua</button>
        @foreach(['Rental Mobil','Charter Drop','City Tour','Open Trip','Tour Lembang','Tour Ciwidey','Tour Bandung','Tour Pangandaran','Tour Jogja','Tour Bromo','Tour Bali','Drop-off / Pick-up Bandara'] as $cat)
        <button onclick="filterPackages('{{ $cat }}')" class="filter-pill" data-cat="{{ $cat }}">{{ $cat }}</button>
        @endforeach
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="packagesGrid">
        @foreach($packages as $i => $package)
        @php
          $emoji = match(true) {
            str_contains($package->category,'Lembang') => '🌿',
            str_contains($package->category,'Ciwidey') => '🌸',
            str_contains($package->category,'Bandung') => '🏙️',
            str_contains($package->category,'Pangandaran') => '🌊',
            str_contains($package->category,'Jogja') => '🏛️',
            str_contains($package->category,'Bromo') => '🌋',
            str_contains($package->category,'Bali') => '🏝️',
            str_contains($package->category,'Bandara') => '✈️',
            str_contains($package->category,'Open') => '👥',
            str_contains($package->category,'City') => '🏙️',
            str_contains($package->category,'Charter') => '🚐',
            str_contains($package->category,'Rental') => '🚗',
            default => '🗺️'
          };
        @endphp
        <div class="pkg-card" data-category="{{ $package->category }}" style="animation-delay: {{ ($i % 3) * 0.1 }}s">
          <a href="{{ route('package.show', $package->slug) }}" class="stretched-link"></a>
          <div class="pkg-img">
            @if($package->image_path)
            <img src="{{ $package->image_url }}" alt="{{ $package->title }}" class="pkg-image">
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

      @if($packages->count() > 6)
      <div class="text-center mt-10">
        <button id="btnShowMore" class="btn-secondary" onclick="togglePackages()">
          <i class="fas fa-chevron-down"></i>
          Tampilkan Lebih Banyak
        </button>
      </div>
      @endif
    </div>
  </section>

  <!-- KEUNGGULAN -->
  <section class="py-20 bg-brand-bg">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-sm font-bold text-brand-blue tracking-widest mb-2 uppercase">Kenapa Kami?</h2>
        <h3 class="text-3xl md:text-4xl font-black text-brand-text mb-4">Mengapa Pilih Mahessa Trans Holiday?</h3>
        <p class="text-brand-muted max-w-2xl mx-auto">Kepercayaan Anda adalah prioritas utama kami</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-money-bill-wave"></i></div>
          <h4 class="font-bold text-base mb-2">Harga Terjangkau</h4>
          <p class="text-sm text-brand-muted">Paket kompetitif tanpa biaya tersembunyi, sesuai budget semua kalangan.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-van-shuttle"></i></div>
          <h4 class="font-bold text-base mb-2">Armada Lengkap</h4>
          <p class="text-sm text-brand-muted">HiAce, Innova, Avanza & berbagai pilihan armada terawat dan nyaman.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-user-tie"></i></div>
          <h4 class="font-bold text-base mb-2">Driver Profesional</h4>
          <p class="text-sm text-brand-muted">Driver berpengalaman, ramah, dan hafal rute terbaik ke semua destinasi.</p>
        </div>
        <div class="service-card">
          <div class="service-icon"><i class="fas fa-shield-halved"></i></div>
          <h4 class="font-bold text-base mb-2">Perjalanan Aman</h4>
          <p class="text-sm text-brand-muted">Kendaraan bergaransi, diasuransikan, dan selalu dalam kondisi prima.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section id="kontak" class="py-20 bg-gradient-to-br from-brand-blue to-blue-600 text-white text-center">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-black mb-4">Siap Berangkat Liburan?</h2>
      <p class="text-blue-100 mb-8 max-w-2xl mx-auto">Hubungi kami sekarang untuk penawaran terbaik!</p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="https://wa.me/62895327077214?text=Halo+Mahessa+Trans+Holiday%2C+saya+ingin+pesan+paket+wisata." target="_blank" class="btn-outline text-white border-white hover:bg-white hover:text-brand-blue">
          <i class="fab fa-whatsapp"></i> Chat WhatsApp
        </a>
        <a href="#paket" class="btn-outline text-white border-white hover:bg-white hover:text-brand-blue">
          <i class="fas fa-suitcase"></i> Lihat Paket
        </a>
      </div>
      <div class="mt-8 text-blue-200">
        <i class="fas fa-phone me-2"></i>0895-3270-77214
        <span class="mx-2">•</span>
        <i class="fas fa-clock me-2"></i>Buka 24 Jam / 7 Hari
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-brand-text text-white/65 py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-plane-departure text-brand-blue text-xl"></i>
            <span class="font-bold text-lg">Mahessa Trans Holiday</span>
          </div>
          <p class="text-sm mb-4">Travel agency terpercaya dari Cimahi, Bandung. Melayani rental mobil, charter drop, city tour, open trip & paket wisata ke seluruh Indonesia.</p>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 rounded-lg bg-white/8 text-white flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/62895327077214" target="_blank" class="w-9 h-9 rounded-lg bg-white/8 text-white flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"><i class="fab fa-whatsapp"></i></a>
            <a href="#" class="w-9 h-9 rounded-lg bg-white/8 text-white flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="w-9 h-9 rounded-lg bg-white/8 text-white flex items-center justify-center hover:bg-black hover:text-white transition-all"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div>
          <h5 class="font-bold mb-4">Menu</h5>
          <ul class="space-y-2 text-sm">
            <li><a href="#beranda" class="hover:text-brand-blue transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i>Beranda</a></li>
            <li><a href="#layanan" class="hover:text-brand-blue transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i>Layanan</a></li>
            <li><a href="#destinasi" class="hover:text-brand-blue transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i>Destinasi</a></li>
            <li><a href="#paket" class="hover:text-brand-blue transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i>Paket Tour</a></li>
            <li><a href="#kontak" class="hover:text-brand-blue transition-colors flex items-center gap-2"><i class="fas fa-angle-right text-xs"></i>Kontak</a></li>
          </ul>
        </div>
        <div>
          <h5 class="font-bold mb-4">Kontak</h5>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2"><i class="fas fa-phone text-brand-blue"></i>0895-3270-77214</li>
            <li class="flex items-center gap-2"><i class="fab fa-whatsapp text-green-500"></i>0895-3270-77214</li>
            <li class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-brand-blue"></i>Cimahi, Jawa Barat</li>
          </ul>
          <div class="mt-4 rounded-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15844.854754735714!2d107.5431658!3d-6.8649766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e50071748999%3A0xf0a12b6c8c0ff58e!2sMahessa%20Rental%20Mobil%20Cimahi!5e0!3m2!1sid!2sid!4v1759636571506!5m2!1sid!2sid" width="100%" height="120" style="border:0;filter:brightness(0.8);" loading="lazy"></iframe>
          </div>
        </div>
      </div>
      <hr class="border-white/10 mb-6">
      <div class="flex flex-wrap justify-between items-center gap-4 text-xs text-white/45">
        <p>&copy; {{ date('Y') }} Mahessa Trans Holiday. All Rights Reserved.</p>
        <a href="{{ route('admin.login') }}" class="hover:text-white/65 transition-colors">Admin</a>
      </div>
    </div>
  </footer>

  <!-- WA FLOAT -->
  <a href="https://wa.me/62895327077214?text=Halo+Mahessa+Trans+Holiday%2C+saya+ingin+bertanya." target="_blank" class="wa-float">
    <i class="fab fa-whatsapp"></i>
  </a>

  @vite('resources/js/app.js')
  <script>
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.08, rootMargin:'0px 0px -30px 0px' });

    document.querySelectorAll('.show-on-scroll').forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if(href === '#') return;
        const t = document.querySelector(href);
        if(t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 70, behavior:'smooth' }); }
      });
    });

    var activeFilter = 'semua';

    function filterPackages(cat){
      activeFilter = cat;
      var allCols = document.querySelectorAll('.pkg-card');
      var showMoreBtn = document.getElementById('btnShowMore');

      if(cat === 'semua'){
        allCols.forEach(function(col){ col.style.display = ''; col.classList.remove('hidden'); });
        if(showMoreBtn && allCols.length > 6) {
          showMoreBtn.style.display = '';
          var hidden = allCols.slice(6);
          hidden.forEach(function(col){ col.classList.add('hidden'); });
        }
      } else {
        allCols.forEach(function(col){
          col.style.display = col.getAttribute('data-category') === cat ? '' : 'none';
        });
        if(showMoreBtn) showMoreBtn.style.display = 'none';
      }

      document.querySelectorAll('.filter-pill').forEach(function(btn){
        btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
      });

      var sel = document.getElementById('filterSelectMobile');
      if(sel) sel.value = cat;
    }

    function togglePackages(){
      var hidden = document.querySelectorAll('.pkg-card.hidden');
      var allCols = document.querySelectorAll('.pkg-card');
      var btn = document.getElementById('btnShowMore');

      if(hidden.length > 0){
        hidden.forEach(function(col){ col.classList.remove('hidden'); col.style.display = ''; });
        btn.classList.remove('expanded');
        btn.innerHTML = '<i class="fas fa-chevron-down"></i> Tampilkan Lebih Banyak';
      } else {
        allCols.forEach(function(col, idx){ if(idx >= 6) col.classList.add('hidden'); });
        btn.classList.add('expanded');
        btn.innerHTML = '<i class="fas fa-chevron-up"></i> Tampilkan Lebih Sedikit';
      }
    }

    document.querySelectorAll('.service-card, .dest-card, .pkg-card').forEach(el => el.classList.add('show-on-scroll'));
  </script>
</body>
</html>
