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
  <title>{{ $package->meta_title ?? $package->title }} | Mahessa Trans Holiday</title>
  <meta name="description" content="{{ $package->meta_description ?? Str::limit(strip_tags($package->description), 155) }}">
  <meta name="keywords" content="{{ $package->category }}, tour wisata, travel bandung, paket tour, sewa mobil bandung, rental mobil cimahi">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{{ request()->url() }}">
  
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ request()->url() }}">
  <meta property="og:title" content="{{ $package->meta_title ?? $package->title }}">
  <meta property="og:description" content="{{ $package->meta_description ?? Str::limit(strip_tags($package->description), 155) }}">
  <meta property="og:image" content="{{ $package->image_url }}">
  <meta property="og:site_name" content="Mahessa Trans Holiday">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $package->meta_title ?? $package->title }}">
  <meta name="twitter:description" content="{{ $package->meta_description ?? Str::limit(strip_tags($package->description), 155) }}">
  <meta name="twitter:image" content="{{ $package->image_url }}">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans text-brand-text bg-brand-bg">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-brand-border shadow-sm transition-all duration-300">
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
  <section class="relative bg-gradient-to-br from-brand-text via-brand-dark-blue to-brand-blue pt-24 pb-16 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-30">
      <div class="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-brand-blue/40 to-transparent animate-gradient"></div>
    </div>
    <div class="relative container mx-auto px-4">
      <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/85 px-4 py-2 rounded-full mb-4">
        <i class="fas fa-tag"></i> {{ $package->category }}
      </div>
      <h1 class="text-3xl md:text-5xl font-black mb-4 leading-tight">{{ $package->title }}</h1>
      <div class="flex items-center gap-2 text-sm text-white/65">
        <a href="{{ route('home') }}" class="text-white/85 hover:text-white"><i class="fas fa-home text-xs"></i> Beranda</a>
        <span>/</span>
        <a href="{{ route('home') }}#paket" class="text-white/85 hover:text-white">Paket Tour</a>
        <span>/</span>
        <span>{{ $package->category }}</span>
      </div>
    </div>
  </section>

  <!-- CONTENT -->
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- MAIN -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- GALLERY -->
          <div class="relative h-64 md:h-96 bg-white rounded-2xl border border-brand-border overflow-hidden">
            @if($package->image_path)
            <img src="{{ $package->image_url }}" alt="{{ $package->title }}" class="w-full h-full object-cover">
            @else
            <div class="w-full h-full flex items-center justify-center text-6xl text-brand-muted">🗺️</div>
            @endif
            <div class="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-2">
              <i class="fas fa-map-pin"></i> {{ Str::limit($package->category, 22) }}
            </div>
          </div>

          <!-- HIGHLIGHTS -->
          <div class="bg-white rounded-2xl border border-brand-border p-6">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <i class="fas fa-star text-brand-blue"></i> Keunggulan Paket
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-brand-light-blue rounded-2xl p-4 text-center border border-brand-blue/20">
                <div class="text-2xl text-brand-blue mb-2"><i class="fas fa-headset"></i></div>
                <div class="text-xs font-bold text-brand-muted uppercase tracking-wide mb-1">Layanan</div>
                <div class="font-bold">24/7</div>
              </div>
              <div class="bg-brand-light-blue rounded-2xl p-4 text-center border border-brand-blue/20">
                <div class="text-2xl text-brand-blue mb-2"><i class="fas fa-car"></i></div>
                <div class="text-xs font-bold text-brand-muted uppercase tracking-wide mb-1">Armada</div>
                <div class="font-bold">Premium</div>
              </div>
              <div class="bg-brand-light-blue rounded-2xl p-4 text-center border border-brand-blue/20">
                <div class="text-2xl text-brand-blue mb-2"><i class="fas fa-user-tie"></i></div>
                <div class="text-xs font-bold text-brand-muted uppercase tracking-wide mb-1">Driver</div>
                <div class="font-bold">Profesional</div>
              </div>
              <div class="bg-brand-light-blue rounded-2xl p-4 text-center border border-brand-blue/20">
                <div class="text-2xl text-brand-blue mb-2"><i class="fas fa-shield-alt"></i></div>
                <div class="text-xs font-bold text-brand-muted uppercase tracking-wide mb-1">Asuransi</div>
                <div class="font-bold">Lengkap</div>
              </div>
            </div>
          </div>

          <!-- DESCRIPTION -->
          <div class="bg-white rounded-2xl border border-brand-border p-6">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <i class="fas fa-info-circle text-brand-blue"></i> Deskripsi Paket
            </h3>
            <div class="prose prose-sm max-w-none text-brand-muted leading-relaxed whitespace-pre-line">{!! $package->description !!}</div>
          </div>

          <!-- INCLUDES/EXCLUDES -->
          <div class="bg-white rounded-2xl border border-brand-border p-6">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <i class="fas fa-check-circle text-brand-blue"></i> Fasilitas
            </h3>
            
            @php
              $includes = $package->includes ?? [];
              $excludes = $package->excludes ?? [];
            @endphp

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div class="text-xs font-bold text-green-600 uppercase tracking-wider mb-3">
                  <i class="fas fa-check me-1"></i> Sudah Termasuk
                </div>
                <ul class="space-y-2">
                  @forelse($includes as $item)
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border last:border-0">
                    <i class="fas fa-check text-green-500 mt-0.5"></i>
                    <span>{{ $item }}</span>
                  </li>
                  @empty
                  @if(!str_contains($package->category, 'Rental'))
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border">
                    <i class="fas fa-check text-green-500 mt-0.5"></i>
                    <span>Unit kendaraan nyaman, full AC, dan bersih</span>
                  </li>
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border">
                    <i class="fas fa-check text-green-500 mt-0.5"></i>
                    <span><strong>Driver profesional</strong> berpengalaman</span>
                  </li>
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border">
                    <i class="fas fa-check text-green-500 mt-0.5"></i>
                    <span>BBM, tol, dan parkir</span>
                  </li>
                  @endif
                  @endforelse
                </ul>
              </div>
              <div>
                <div class="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">
                  <i class="fas fa-times me-1"></i> Tidak Termasuk
                </div>
                <ul class="space-y-2">
                  @forelse($excludes as $item)
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border last:border-0">
                    <i class="fas fa-times text-red-500 mt-0.5"></i>
                    <span>{{ $item }}</span>
                  </li>
                  @empty
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border">
                    <i class="fas fa-times text-red-500 mt-0.5"></i>
                    <span>Tiket masuk objek wisata</span>
                  </li>
                  <li class="flex items-start gap-2 text-sm text-brand-muted py-2 border-b border-dashed border-brand-border">
                    <i class="fas fa-times text-red-500 mt-0.5"></i>
                    <span>Konsumsi dan pengeluaran pribadi</span>
                  </li>
                  @endforelse
                </ul>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div class="bg-white rounded-2xl border border-brand-border p-6">
            <div class="text-center mb-6">
              <h3 class="font-bold text-lg flex items-center justify-center gap-2">
                <i class="fas fa-question-circle text-brand-blue"></i> Pertanyaan Umum
              </h3>
              <p class="text-sm text-brand-muted">Jawaban untuk pertanyaan yang sering diajukan</p>
            </div>
            <div class="space-y-3">
              <details class="group bg-white border border-brand-border rounded-xl overflow-hidden">
                <summary class="flex items-center justify-between p-4 cursor-pointer font-semibold text-sm hover:bg-brand-light-blue transition-colors">
                  Bagaimana cara melakukan pemesanan?
                  <i class="fas fa-chevron-down text-brand-blue transition-transform group-open:rotate-180"></i>
                </summary>
                <div class="px-4 pb-4 text-sm text-brand-muted border-t border-brand-border pt-3">
                  Pemesanan dapat dilakukan melalui WhatsApp ke nomor kami. Hubungi CS kami untuk menjelaskan kebutuhan Anda, dan kami akan membantu proses pemesanan dengan detail lengkap serta konfirmasi jadwal dan harga.
                </div>
              </details>
              <details class="group bg-white border border-brand-border rounded-xl overflow-hidden">
                <summary class="flex items-center justify-between p-4 cursor-pointer font-semibold text-sm hover:bg-brand-light-blue transition-colors">
                  Berapa penumpang minimum untuk tour?
                  <i class="fas fa-chevron-down text-brand-blue transition-transform group-open:rotate-180"></i>
                </summary>
                <div class="px-4 pb-4 text-sm text-brand-muted border-t border-brand-border pt-3">
                  Paket bisa untuk pribadi, keluarga, atau group. Untuk group, minimum 4 orang. Untuk pribadi/pasangan juga bisa dengan harga yang disesuaikan. Hubungi kami untuk penawaran khusus.
                </div>
              </details>
              <details class="group bg-white border border-brand-border rounded-xl overflow-hidden">
                <summary class="flex items-center justify-between p-4 cursor-pointer font-semibold text-sm hover:bg-brand-light-blue transition-colors">
                  Apa yang harus disiapkan sebelum perjalanan?
                  <i class="fas fa-chevron-down text-brand-blue transition-transform group-open:rotate-180"></i>
                </summary>
                <div class="px-4 pb-4 text-sm text-brand-muted border-t border-brand-border pt-3">
                  Siapkan dokumen pribadi (KTP/SIM), pakaian nyaman, obat-obatan pribadi jika ada, asuransi jiwa (opsional), dan uang tunai untuk pengeluaran di tempat wisata seperti tiket dan makanan.
                </div>
              </details>
            </div>
          </div>

        </div>

        <!-- SIDEBAR -->
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            
            <!-- PRICE CARD -->
            <div class="bg-gradient-to-br from-brand-light-blue to-blue-50 rounded-2xl border border-brand-blue/20 p-6 text-center">
              <div class="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Harga Estimasi</div>
              <div class="text-3xl font-black text-brand-blue mb-4">{{ $package->formatted_price }}</div>
              
              @if($package->duration_days || $package->min_pax)
              <div class="flex justify-center gap-4 text-sm text-brand-muted mb-4">
                @if($package->duration_days)
                <span><i class="fas fa-clock me-1"></i> {{ $package->duration_days }} Hari</span>
                @endif
                @if($package->min_pax)
                <span><i class="fas fa-users me-1"></i> Min. {{ $package->min_pax }} Pax</span>
                @endif
              </div>
              @endif

              <ul class="text-left text-sm space-y-2 mb-6 pt-4 border-t border-brand-blue/20">
                <li class="flex items-center gap-2 text-brand-muted"><i class="fas fa-check text-green-500"></i> Armada Premium Terawat</li>
                <li class="flex items-center gap-2 text-brand-muted"><i class="fas fa-check text-green-500"></i> Driver Profesional</li>
                <li class="flex items-center gap-2 text-brand-muted"><i class="fas fa-check text-green-500"></i> Asuransi Perjalanan</li>
                <li class="flex items-center gap-2 text-brand-muted"><i class="fas fa-check text-green-500"></i> CS 24/7</li>
              </ul>

              @php
              $waMsg = urlencode("Halo Mahessa Trans Holiday, saya ingin bertanya/memesan paket *{$package->title}* dengan harga *{$package->formatted_price}*. Bagaimana prosedur selanjutnya?");
              $waUrl = "https://wa.me/62895327077214?text={$waMsg}";
              @endphp

              <a href="{{ $waUrl }}" target="_blank" class="btn-primary w-full justify-center">
                <i class="fab fa-whatsapp text-lg"></i> Pesan Sekarang
              </a>
            </div>

            <!-- CONTACT -->
            <div class="bg-white rounded-2xl border border-brand-border p-6">
              <h4 class="font-bold text-base mb-4">Hubungi Kami</h4>
              <ul class="space-y-3 text-sm">
                <li class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-blue">
                    <i class="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <div class="font-semibold">WhatsApp</div>
                    <div class="text-brand-muted">0895-3270-77214</div>
                  </div>
                </li>
                <li class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-blue">
                    <i class="fas fa-clock"></i>
                  </div>
                  <div>
                    <div class="font-semibold">Jam Operasional</div>
                    <div class="text-brand-muted">24 Jam / 7 Hari</div>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- MOBILE CTA -->
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-4 flex items-center justify-between gap-4 z-50 lg:hidden">
    <div>
      <div class="text-xs font-bold text-brand-muted uppercase tracking-wider">Mulai dari</div>
      <div class="text-xl font-black text-brand-blue">{{ $package->formatted_price }}</div>
    </div>
    <a href="{{ $waUrl }}" target="_blank" class="btn-whatsapp px-6 py-3">
      <i class="fab fa-whatsapp"></i> Pesan
    </a>
  </div>

  <!-- FOOTER -->
  <footer class="bg-brand-text text-white/65 py-12 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-plane-departure text-brand-blue text-xl"></i>
            <span class="font-bold text-lg text-white">Mahessa Trans Holiday</span>
          </div>
          <p class="text-sm">Travel agency terpercaya dari Cimahi, Bandung. Melayani rental mobil, charter drop, city tour, open trip & paket wisata ke seluruh destinasi favorit Indonesia.</p>
        </div>
        <div>
          <h5 class="font-bold text-white mb-4">Menu</h5>
          <ul class="space-y-2 text-sm">
            <li><a href="{{ route('home') }}" class="hover:text-brand-blue transition-colors"><i class="fas fa-angle-right me-2 text-brand-blue"></i>Beranda</a></li>
            <li><a href="{{ route('home') }}#paket" class="hover:text-brand-blue transition-colors"><i class="fas fa-angle-right me-2 text-brand-blue"></i>Paket Tour</a></li>
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

  <!-- STRUCTURED DATA -->
  <script type="application/ld+json">
  {
    "@@context": "https://schema.org/",
    "@@type": "Product",
    "name": "{{ $package->title }}",
    "description": "{{ Str::limit(strip_tags($package->description), 200) }}",
    "image": "{{ $package->image_url }}",
    "brand": {
      "@@type": "Brand",
      "name": "Mahessa Trans Holiday"
    },
    "offers": {
      "@@type": "Offer",
      "url": "{{ request()->url() }}",
      "priceCurrency": "IDR",
      "price": "{{ $package->price }}",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "100"
    }
  }
  </script>

  <script type="application/ld+json">
  {
    "@@context": "https://schema.org",
    "@@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "{{ route('home') }}"
      },
      {
        "@@type": "ListItem",
        "position": 2,
        "name": "Paket Tour",
        "item": "{{ route('home') }}#paket"
      },
      {
        "@@type": "ListItem",
        "position": 3,
        "name": "{{ $package->title }}",
        "item": "{{ request()->url() }}"
      }
    ]
  }
  </script>

  @vite('resources/js/app.js')
  <script>
    document.querySelectorAll('details').forEach(detail => {
      detail.addEventListener('toggle', () => {
        if (detail.open) {
          document.querySelectorAll('details[open]').forEach(other => {
            if (other !== detail) other.open = false;
          });
        }
      });
    });
  </script>
</body>
</html>
