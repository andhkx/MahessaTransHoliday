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
  <title>{{ $package->meta_title ?? $package->title }} | Mahessa Trans Holiday</title>
  <meta name="description" content="{{ $package->meta_description ?? Str::limit(strip_tags($package->description), 155) }}">
  <meta name="keywords" content="{{ $package->category }}, tour wisata, travel bandung, paket tour">
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

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    :root {
      --blue: #2563EB;
      --dark-blue: #1D4ED8;
      --light-blue: #EFF6FF;
      --bg: #F8FAFC;
      --white: #FFFFFF;
      --text: #0F172A;
      --muted: #64748B;
      --border: #E2E8F0;
      --success: #22C55E;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { overflow-x: hidden; scroll-behavior: smooth; }
    body { font-family: 'Montserrat', sans-serif; color: var(--text); background: var(--bg); }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      z-index: 1000;
      padding: 0.6rem 0;
      transition: all 0.3s;
    }
    .navbar.scrolled {
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
      background: rgba(255,255,255,0.97);
    }
    .navbar-brand {
      font-size: 1rem;
      font-weight: 800;
      color: var(--blue) !important;
      letter-spacing: -0.3px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .navbar-brand img {
      height: 32px;
      width: auto;
    }
    .navbar-brand span { color: var(--blue); }
    .navbar-toggler { border: none; padding: 4px 8px; }
    .navbar-toggler:focus { box-shadow: none; }
    .navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2837,99,235,1%29' stroke-width='2' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text) !important;
      padding: 6px 10px !important;
      transition: color 0.2s;
    }
    .nav-link:hover { color: var(--blue) !important; }
    .btn-nav { background: var(--blue); color: #fff !important; border-radius: 50px; padding: 7px 18px !important; font-size: 0.8rem; font-weight: 700; }
    .btn-nav:hover { background: var(--dark-blue); }

    .detail-hero {
      background: linear-gradient(160deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%);
      color: #fff;
      padding: 120px 0 60px;
      margin-top: 60px;
      position: relative;
      overflow: hidden;
    }
    .detail-hero::before {
      content: '';
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%);
      top: -100px;
      right: -100px;
    }
    .detail-hero .container { position: relative; z-index: 2; }
    .detail-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.85);
      font-size: 0.72rem;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 50px;
      letter-spacing: 0.5px;
      margin-bottom: 1.2rem;
    }
    .detail-hero h1 {
      font-size: clamp(1.8rem, 5vw, 3rem);
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 1rem;
      letter-spacing: -1px;
    }
    .detail-breadcrumb {
      color: rgba(255,255,255,0.65);
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .detail-breadcrumb a {
      color: rgba(255,255,255,0.85);
      text-decoration: none;
      transition: color 0.2s;
    }
    .detail-breadcrumb a:hover { color: #fff; }

    .detail-container { padding: 40px 0; }
    .detail-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid var(--border);
      padding: 24px;
      margin-bottom: 24px;
      transition: box-shadow 0.3s;
    }
    .detail-card:hover { box-shadow: 0 8px 24px rgba(37,99,235,0.1); }
    .detail-card h3 {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .detail-card h3 i { color: var(--blue); font-size: 1.3rem; }

    .detail-gallery {
      height: 400px;
      background: var(--bg);
      border-radius: 20px;
      border: 1px solid var(--border);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      position: relative;
    }
    .detail-gallery img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .detail-gallery-placeholder {
      font-size: 5rem;
      color: var(--muted);
    }
    .detail-gallery-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: var(--blue);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 6px 14px;
      border-radius: 50px;
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 1;
    }

    .highlight-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .highlight-item {
      background: var(--light-blue);
      border-radius: 16px;
      padding: 16px 12px;
      text-align: center;
      border: 1px solid rgba(37,99,235,0.2);
    }
    .highlight-item-icon {
      font-size: 1.6rem;
      color: var(--blue);
      margin-bottom: 6px;
    }
    .highlight-item-label {
      font-size: 0.68rem;
      color: var(--muted);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .highlight-item-value {
      font-size: 0.88rem;
      color: var(--text);
      font-weight: 700;
      margin-top: 4px;
    }

    .accordion-item {
      border: 1px solid var(--border);
      border-radius: 12px !important;
      margin-bottom: 10px;
      overflow: hidden;
      background: #fff;
    }
    .accordion-button {
      font-weight: 700;
      font-size: 0.92rem;
      padding: 16px 18px;
      background: #fff;
      box-shadow: none !important;
      color: var(--text);
      transition: all 0.2s;
    }
    .accordion-button:hover { background: var(--light-blue); color: var(--blue); }
    .accordion-button:not(.collapsed) {
      background: var(--light-blue);
      color: var(--blue);
      box-shadow: none;
    }
    .accordion-button::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%2837,99,235,1%29' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    }
    .accordion-body {
      padding: 16px 18px;
      color: var(--muted);
      font-size: 0.88rem;
      line-height: 1.7;
      border-top: 1px solid var(--border);
    }

    .inc-exc-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .inc-exc-list li {
      padding: 10px 0;
      border-bottom: 1px dashed var(--border);
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.85rem;
      color: var(--muted);
      line-height: 1.6;
    }
    .inc-exc-list li:last-child { border-bottom: none; }
    .inc-exc-list i { flex-shrink: 0; font-size: 1rem; margin-top: 2px; }
    .text-inc { color: var(--success); }
    .text-exc { color: #EF4444; }

    .detail-sidebar {
      position: sticky;
      top: 90px;
    }
    .price-card {
      background: linear-gradient(135deg, var(--light-blue) 0%, rgba(37,99,235,0.05) 100%);
      border-radius: 16px;
      border: 1px solid rgba(37,99,235,0.2);
      padding: 24px;
      text-align: center;
    }
    .price-label {
      font-size: 0.75rem;
      color: var(--muted);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    .price-value {
      font-size: 2rem;
      font-weight: 900;
      color: var(--blue);
      letter-spacing: -0.5px;
      margin-bottom: 16px;
    }
    .price-benefits {
      text-align: left;
      margin-bottom: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(37,99,235,0.2);
      list-style: none;
      padding-left: 0;
    }
    .price-benefits li {
      padding: 6px 0;
      font-size: 0.82rem;
      color: var(--muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .price-benefits i { color: var(--success); font-size: 0.9rem; }
    .btn-pesan-cta {
      width: 100%;
      background: var(--blue);
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 14px 20px;
      font-weight: 700;
      font-size: 0.92rem;
      font-family: 'Montserrat', sans-serif;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s;
      box-shadow: 0 4px 16px rgba(37,99,235,0.3);
    }
    .btn-pesan-cta:hover {
      background: var(--dark-blue);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37,99,235,0.4);
    }

    .faq-section {
      background: var(--white);
      border-radius: 20px;
      border: 1px solid var(--border);
      padding: 28px;
    }
    .faq-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .faq-header h3 {
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .faq-header p {
      font-size: 0.85rem;
      color: var(--muted);
    }

    .mobile-cta {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid var(--border);
      padding: 12px 16px;
      display: none;
      justify-content: space-between;
      align-items: center;
      z-index: 999;
      gap: 10px;
    }
    .mobile-cta-price {
      flex: 1;
    }
    .mobile-cta-label {
      font-size: 0.65rem;
      color: var(--muted);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .mobile-cta-value {
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--blue);
    }
    .btn-pesan-mobile {
      background: var(--success);
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 10px 20px;
      font-weight: 700;
      font-size: 0.8rem;
      font-family: 'Montserrat', sans-serif;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-pesan-mobile:hover {
      background: #16A34A;
      color: #fff;
      transform: translateY(-1px);
    }

    .footer {
      background: #0F172A;
      color: rgba(255,255,255,0.65);
      padding: 40px 0 20px;
      margin-top: 60px;
    }
    .footer h6 {
      color: #fff;
      font-weight: 700;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    .footer p, .footer li, .footer a {
      font-size: 0.82rem;
      line-height: 1.8;
    }
    .footer a {
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer a:hover { color: #93C5FD; }
    .footer ul {
      list-style: none;
      padding: 0;
    }
    .footer ul li i {
      color: var(--blue);
      margin-right: 7px;
      font-size: 0.7rem;
    }

    .anim {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .anim.show {
      opacity: 1;
      transform: translateY(0);
    }
    .d1 { transition-delay: 0.08s; }
    .d2 { transition-delay: 0.16s; }
    .d3 { transition-delay: 0.24s; }
    .d4 { transition-delay: 0.32s; }

    @media (max-width: 768px) {
      .detail-hero { padding: 100px 0 40px; }
      .detail-hero h1 { font-size: 1.6rem; }
      .detail-gallery { height: 250px; }
      .mobile-cta { display: flex; }
      body { padding-bottom: 70px; }
      .detail-sidebar { position: static; }
      .highlight-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>

<nav class="navbar navbar-expand-lg" id="navbar">
  <div class="container">
    <a class="navbar-brand" href="{{ route('home') }}">
      <img src="{{ asset('images/logo.png') }}" alt="Logo" onerror="this.style.display='none'">
      <span>Mahessa Trans <span style="color:#0F172A;">Holiday</span></span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nav">
      <ul class="navbar-nav ms-auto align-items-center gap-1">
        <li class="nav-item"><a class="nav-link" href="{{ route('home') }}"><i class="fas fa-home me-1"></i>Beranda</a></li>
        <li class="nav-item"><a class="nav-link" href="{{ route('home') }}#paket"><i class="fas fa-suitcase me-1"></i>Paket</a></li>
        <li class="nav-item ms-1">
          <a href="https://wa.me/62895327077214" target="_blank" class="nav-link btn-nav">
            <i class="fab fa-whatsapp me-1"></i>WhatsApp
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<section class="detail-hero">
  <div class="container">
    <div class="detail-badge">
      <i class="fas fa-tag"></i> {{ $package->category }}
    </div>
    <h1>{{ $package->title }}</h1>
    <div class="detail-breadcrumb">
      <a href="{{ route('home') }}"><i class="fas fa-home" style="font-size:0.8rem;"></i> Beranda</a>
      <span>/</span>
      <a href="{{ route('home') }}#paket">Paket Tour</a>
      <span>/</span>
      <span>{{ $package->category }}</span>
    </div>
  </div>
</section>

<section class="detail-container">
  <div class="container">
    <div class="row g-4">

      <div class="col-lg-8">

        <div class="detail-gallery anim">
          @if($package->image_path)
            <img src="{{ $package->image_url }}" alt="{{ $package->title }}">
          @else
            <div class="detail-gallery-placeholder">🗺️</div>
          @endif
          <div class="detail-gallery-badge">
            <i class="fas fa-map-pin"></i> {{ Str::limit($package->category, 22) }}
          </div>
        </div>

        <div class="detail-card anim d1">
          <h3><i class="fas fa-star"></i> Keunggulan Paket</h3>
          <div class="highlight-grid">
            <div class="highlight-item">
              <div class="highlight-item-icon"><i class="fas fa-headset"></i></div>
              <div class="highlight-item-label">Layanan</div>
              <div class="highlight-item-value">24/7</div>
            </div>
            <div class="highlight-item">
              <div class="highlight-item-icon"><i class="fas fa-car"></i></div>
              <div class="highlight-item-label">Armada</div>
              <div class="highlight-item-value">Premium</div>
            </div>
            <div class="highlight-item">
              <div class="highlight-item-icon"><i class="fas fa-user-tie"></i></div>
              <div class="highlight-item-label">Driver</div>
              <div class="highlight-item-value">Profesional</div>
            </div>
            <div class="highlight-item">
              <div class="highlight-item-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="highlight-item-label">Asuransi</div>
              <div class="highlight-item-value">Lengkap</div>
            </div>
          </div>
        </div>

        <div class="detail-card anim d2">
          <h3><i class="fas fa-info-circle"></i> Deskripsi Paket</h3>
          <div style="color:var(--muted);font-size:0.9rem;line-height:1.7;">
            {!! nl2br(e($package->description)) !!}
          </div>
        </div>

        <div class="row g-3 mb-4">

          @if(!str_contains($package->category, 'Rental'))
          <div class="col-lg-6">
            <div class="detail-card anim d3">
              <h3><i class="fas fa-route"></i> Itinerary</h3>
              <div class="accordion" id="itineraryAccordion">
                <div class="accordion-item">
                  <h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#itinerary1">Hari 1: Keberangkatan & Perjalanan</button></h2>
                  <div id="itinerary1" class="accordion-collapse collapse show"><div class="accordion-body">
                    Penjemputan di titik kumpul yang telah disepakati. Persiapan keberangkatan menuju destinasi utama menggunakan armada premium yang nyaman, ber-AC, dan memenuhi standar keselamatan tinggi bersama driver profesional kami.
                  </div></div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#itinerary2">Hari 2: Eksplorasi & Aktivitas</button></h2>
                  <div id="itinerary2" class="accordion-collapse collapse"><div class="accordion-body">
                    Menikmati berbagai spot wisata menarik, berfoto di lokasi instagramable, mencicipi kuliner lokal, serta aktivitas seru sesuai paket yang dipilih. Dipandu oleh tour guide berpengalaman yang memahami setiap destinasi.
                  </div></div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#itinerary3">Hari 3: Kepulangan</button></h2>
                  <div id="itinerary3" class="accordion-collapse collapse"><div class="accordion-body">
                    Persiapan kepulangan dan perjalanan kembali ke titik awal dengan aman dan nyaman. Tiba di tujuan dengan membawa kenangan indah, foto-foto berharga, dan pengalaman tak terlupakan bersama Mahessa Trans Holiday.
                  </div></div>
                </div>
              </div>
            </div>
          </div>
          @endif

          <div class="{{ str_contains($package->category, 'Rental') ? 'col-12' : 'col-lg-6' }}">
            <div class="detail-card anim d4">
              <h3><i class="fas fa-check-circle"></i> Fasilitas</h3>

              @if(str_contains($package->category, 'Rental'))

              <div style="margin-bottom:18px;">
                <div style="font-size:0.75rem;font-weight:700;color:var(--success);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">
                  <i class="fas fa-check me-1"></i> Sudah Termasuk
                </div>
                <ul class="inc-exc-list">
                  <li><i class="fas fa-check text-inc"></i> <span>Unit kendaraan bersih, terawat, full AC, dan siap jalan sesuai standar kelayakan kami.</span></li>
                  <li><i class="fas fa-check text-inc"></i> <span><strong>Paket dengan driver:</strong> sudah termasuk jasa pengemudi profesional dan bahan bakar untuk area dalam kota.</span></li>
                  <li><i class="fas fa-check text-inc"></i> <span>Asuransi kendaraan aktif selama masa sewa berlangsung.</span></li>
                  <li><i class="fas fa-check text-inc"></i> <span>Customer service siap dihubungi <strong>24 jam / 7 hari</strong> untuk kebutuhan Anda.</span></li>
                </ul>
              </div>
              <div>
                <div style="font-size:0.75rem;font-weight:700;color:#EF4444;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">
                  <i class="fas fa-times me-1"></i> Tidak Termasuk
                </div>
                <ul class="inc-exc-list">
                  <li><i class="fas fa-times text-exc"></i> <span>Biaya tol, parkir, dan pengeluaran di luar rute atau area kota yang disepakati.</span></li>
                  <li><i class="fas fa-times text-exc"></i> <span>Biaya <em>overtime</em> jika durasi pemakaian melebihi batas waktu yang telah disepakati.</span></li>
                  <li><i class="fas fa-times text-exc"></i> <span>Bahan bakar untuk sewa lepas kunci (tanpa driver) menjadi tanggung jawab penyewa sepenuhnya.</span></li>
                </ul>
              </div>

              @else

              <div style="margin-bottom:18px;">
                <div style="font-size:0.75rem;font-weight:700;color:var(--success);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">
                  <i class="fas fa-check me-1"></i> Sudah Termasuk
                </div>
                <ul class="inc-exc-list">
                  <li><i class="fas fa-check text-inc"></i> <span>Unit kendaraan nyaman, full AC, dan bersih sesuai kapasitas rombongan.</span></li>
                  <li><i class="fas fa-check text-inc"></i> <span><strong>Driver profesional</strong> berpengalaman yang menguasai rute dan mendampingi selama perjalanan.</span></li>
                  <li><i class="fas fa-check text-inc"></i> <span>Bahan bakar, biaya tol, dan parkir untuk seluruh rute perjalanan sesuai itinerary.</span></li>
                  <li><i class="fas fa-check text-inc"></i> <span><strong>Tour guide</strong> berpengalaman yang siap memberikan informasi setiap destinasi.</span></li>
                </ul>
              </div>
              <div>
                <div style="font-size:0.75rem;font-weight:700;color:#EF4444;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">
                  <i class="fas fa-times me-1"></i> Tidak Termasuk
                </div>
                <ul class="inc-exc-list">
                  <li><i class="fas fa-times text-exc"></i> <span>Retribusi dan tiket masuk objek wisata di setiap destinasi yang dikunjungi.</span></li>
                  <li><i class="fas fa-times text-exc"></i> <span>Konsumsi, makanan, dan minuman pribadi peserta selama perjalanan berlangsung.</span></li>
                  <li><i class="fas fa-times text-exc"></i> <span>Penginapan driver untuk paket perjalanan lebih dari 1 hari (multi-day trip).</span></li>
                  <li><i class="fas fa-times text-exc"></i> <span>Aktivitas atau atraksi tambahan di luar rundown paket yang disepakati.</span></li>
                </ul>
              </div>

              @endif

            </div>
          </div>

        </div>

        <div class="faq-section anim">
          <div class="faq-header">
            <h3><i class="fas fa-question-circle me-2" style="color:var(--blue);"></i>Pertanyaan Umum</h3>
            <p>Jawaban untuk pertanyaan yang sering diajukan calon pelanggan</p>
          </div>
          
          <div class="accordion" id="faqAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">Bagaimana cara melakukan pemesanan?</button></h2>
              <div id="faq1" class="accordion-collapse collapse show"><div class="accordion-body">
                Pemesanan dapat dilakukan melalui WhatsApp ke nomor kami. Hubungi CS kami untuk menjelaskan kebutuhan Anda, dan kami akan membantu proses pemesanan dengan detail lengkap serta konfirmasi jadwal dan harga.
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">Berapa penumpang minimum untuk tour?</button></h2>
              <div id="faq2" class="accordion-collapse collapse"><div class="accordion-body">
                Paket bisa untuk pribadi, keluarga, atau group. Untuk group, minimum 4 orang. Untuk pribadi/pasangan juga bisa dengan harga yang disesuaikan. Hubungi kami untuk penawaran khusus.
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">Apa yang harus disiapkan sebelum perjalanan?</button></h2>
              <div id="faq3" class="accordion-collapse collapse"><div class="accordion-body">
                Siapkan dokumen pribadi (KTP/SIM), pakaian nyaman, obat-obatan pribadi jika ada, asuransi jiwa (opsional), dan uang tunai untuk pengeluaran di tempat wisata seperti tiket dan makanan.
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">Apakah ada kebijakan pembatalan?</button></h2>
              <div id="faq4" class="accordion-collapse collapse"><div class="accordion-body">
                Ada kebijakan pembatalan dengan rincian: Pembatalan 7 hari sebelum keberangkatan = pengembalian 80%, 3-7 hari = 50%, kurang dari 3 hari tidak ada pengembalian. Hubungi CS untuk detail lengkap.
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">Bagaimana jika ada perubahan jadwal?</button></h2>
              <div id="faq5" class="accordion-collapse collapse"><div class="accordion-body">
                Anda dapat menghubungi kami minimal 5 hari sebelumnya untuk perubahan jadwal. Kami akan membantu menyesuaikan dengan ketersediaan armada dan guide. Biaya tambahan mungkin berlaku jika ada perbedaan tarif.
              </div></div>
            </div>
          </div>
        </div>

        <div class="detail-card anim mt-4">
          <h3><i class="fas fa-file-contract"></i> Syarat &amp; Ketentuan</h3>

          @if(str_contains($package->category, 'Rental'))

          <div class="accordion" id="sktAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#skt1">Ketentuan Harga &amp; Paket</button></h2>
              <div id="skt1" class="accordion-collapse collapse show"><div class="accordion-body">
                <ul class="inc-exc-list">
                  <li><i class="fas fa-circle-check text-inc"></i> <span><strong>Harga Lepas Kunci</strong> berlaku untuk durasi sewa <strong>24 jam penuh</strong> (1 hari = 1 x 24 jam). Keterlambatan pengembalian akan dikenakan biaya <em>overtime</em>.</span></li>
                  <li><i class="fas fa-circle-check text-inc"></i> <span><strong>Harga All-In (Dengan Driver)</strong> telah mencakup unit kendaraan, jasa pengemudi profesional, dan bahan bakar untuk perjalanan di dalam kota.</span></li>
                  <li><i class="fas fa-circle-xmark text-exc"></i> <span>Biaya tol, parkir, dan pengeluaran di luar area kota <strong>tidak termasuk</strong> dalam harga paket dan menjadi tanggung jawab penyewa.</span></li>
                </ul>
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skt2">Syarat Sewa Lepas Kunci (Tanpa Driver)</button></h2>
              <div id="skt2" class="accordion-collapse collapse"><div class="accordion-body">
                <ul class="inc-exc-list">
                  <li><i class="fas fa-circle-check text-inc"></i> Penyewa wajib menyerahkan <strong>KTP (Kartu Tanda Penduduk)</strong> yang masih berlaku sebagai dokumen identitas resmi.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Penyewa wajib memiliki dan menyerahkan <strong>SIM A</strong> yang masih berlaku sebagai bukti kecakapan berkendara.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Penyewa dapat diminta untuk menyerahkan <strong>data pendukung tambahan</strong> (seperti kartu keluarga atau data pekerjaan) sesuai kebijakan kami.</li>
                  <li><i class="fas fa-circle-xmark text-exc"></i> Sewa lepas kunci <strong>tidak diperkenankan</strong> untuk pengemudi yang baru memiliki SIM atau tidak memiliki pengalaman berkendara yang cukup.</li>
                </ul>
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skt3">Kondisi Kendaraan &amp; Reservasi</button></h2>
              <div id="skt3" class="accordion-collapse collapse"><div class="accordion-body">
                <ul class="inc-exc-list">
                  <li><i class="fas fa-circle-check text-inc"></i> Setiap unit kendaraan kami <strong>bersih, terawat secara berkala, dan siap jalan</strong> sesuai standar kelayakan. Kondisi kendaraan dapat diverifikasi sebelum penyewaan.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Pemesanan resmi hanya dilayani melalui <strong>Mahessa Trans Holiday</strong>. Pastikan Anda berkomunikasi hanya dengan kontak resmi kami untuk menghindari penipuan.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Konfirmasi pemesanan dilakukan setelah kesepakatan jadwal dan pembayaran <em>down payment</em> (DP).</li>
                </ul>
              </div></div>
            </div>
          </div>

          @else

          <div class="accordion" id="sktAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#skt1">Yang Sudah Termasuk dalam Harga</button></h2>
              <div id="skt1" class="accordion-collapse collapse show"><div class="accordion-body">
                <ul class="inc-exc-list">
                  <li><i class="fas fa-circle-check text-inc"></i> <strong>Kendaraan (unit)</strong> yang representatif, ber-AC, bersih, dan nyaman sesuai kapasitas rombongan.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> <strong>Jasa Driver Profesional</strong> yang berpengalaman, menguasai rute, dan siap mendampingi perjalanan Anda.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> <strong>Bahan Bakar Minyak (BBM)</strong> untuk seluruh rute perjalanan sesuai itinerary yang disepakati.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> <strong>Biaya Tol &amp; Parkir</strong> selama perjalanan berlangsung sesuai rute yang telah ditentukan.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> <strong>Tiket Penyeberangan</strong> (jika rute perjalanan memerlukan kapal feri atau penyeberangan resmi).</li>
                </ul>
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skt2">Yang Belum Termasuk dalam Harga</button></h2>
              <div id="skt2" class="accordion-collapse collapse"><div class="accordion-body">
                <ul class="inc-exc-list">
                  <li><i class="fas fa-circle-xmark text-exc"></i> <strong>Retribusi &amp; Tiket Masuk Objek Wisata</strong> di setiap destinasi yang dikunjungi.</li>
                  <li><i class="fas fa-circle-xmark text-exc"></i> <strong>Penginapan Driver</strong> untuk paket perjalanan yang berlangsung lebih dari 1 hari (multi-day trip).</li>
                  <li><i class="fas fa-circle-xmark text-exc"></i> Konsumsi dan akomodasi pribadi peserta selama perjalanan.</li>
                </ul>
              </div></div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#skt3">Ketentuan Durasi &amp; Reservasi</button></h2>
              <div id="skt3" class="accordion-collapse collapse"><div class="accordion-body">
                <ul class="inc-exc-list">
                  <li><i class="fas fa-circle-check text-inc"></i> Harga berlaku sesuai <strong>durasi dan itinerary paket</strong> yang telah disepakati pada saat pemesanan.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Penambahan hari, perubahan rute, atau permintaan di luar paket akan dikenakan <strong>biaya tambahan</strong> sesuai kesepakatan.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Setiap unit kendaraan kami <strong>bersih, nyaman, full-AC, dan siap jalan</strong> dengan standar keselamatan terpenuhi.</li>
                  <li><i class="fas fa-circle-check text-inc"></i> Pemesanan resmi hanya melalui <strong>Mahessa Trans Holiday</strong>. Konfirmasi booking dilakukan setelah pembayaran DP.</li>
                </ul>
              </div></div>
            </div>
          </div>

          @endif
        </div>

      </div>

      <div class="col-lg-4">
        <div class="detail-sidebar anim d1">
          <div class="price-card">
            <div class="price-label">Harga Estimasi</div>
            <div class="price-value">{{ $package->formatted_price }}</div>
            
            <ul class="price-benefits">
              <li><i class="fas fa-check"></i> Armada Premium Terawat</li>
              <li><i class="fas fa-check"></i> Driver Profesional & Berpengalaman</li>
              <li><i class="fas fa-check"></i> Asuransi Perjalanan</li>
              <li><i class="fas fa-check"></i> Customer Service 24/7</li>
              <li><i class="fas fa-check"></i> Harga Transparan Tanpa Biaya Tersembunyi</li>
            </ul>

            @php
            $waMsg = urlencode("Halo Mahessa Trans Holiday, saya ingin bertanya/memesan paket *{$package->title}* dengan harga *{$package->formatted_price}*. Bagaimana prosedur selanjutnya?");
            $waUrl = "https://wa.me/62895327077214?text={$waMsg}";
            @endphp

            <a href="{{ $waUrl }}" target="_blank" class="btn-pesan-cta">
              <i class="fab fa-whatsapp fs-5"></i> Pesan Sekarang
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<div class="mobile-cta">
  <div class="mobile-cta-price">
    <div class="mobile-cta-label">Mulai dari</div>
    <div class="mobile-cta-value">{{ $package->formatted_price }}</div>
  </div>
  <a href="{{ $waUrl }}" target="_blank" class="btn-pesan-mobile">
    <i class="fab fa-whatsapp"></i> Pesan
  </a>
</div>

<footer class="footer">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <h6><i class="fas fa-plane-departure me-2" style="color:#3B82F6;"></i>Mahessa Trans Holiday</h6>
        <p>Travel agency terpercaya dari Cimahi, Bandung. Melayani rental mobil, charter drop, city tour, open trip & paket wisata ke seluruh destinasi favorit Indonesia.</p>
      </div>
      <div class="col-md-4">
        <h6><i class="fas fa-link me-2" style="color:#3B82F6;"></i>Menu</h6>
        <ul>
          <li><a href="{{ route('home') }}"><i class="fas fa-angle-right"></i>Beranda</a></li>
          <li><a href="{{ route('home') }}#layanan"><i class="fas fa-angle-right"></i>Layanan</a></li>
          <li><a href="{{ route('home') }}#paket"><i class="fas fa-angle-right"></i>Paket Tour</a></li>
          <li><a href="{{ route('home') }}#kontak"><i class="fas fa-angle-right"></i>Kontak</a></li>
        </ul>
      </div>
      <div class="col-md-4">
        <h6><i class="fas fa-phone me-2" style="color:#3B82F6;"></i>Hubungi Kami</h6>
        <p><i class="fas fa-phone me-2"></i>0895-3270-77214</p>
        <p><i class="fab fa-whatsapp me-2" style="color:#22C55E;"></i>0895-3270-77214</p>
        <p><i class="fas fa-clock me-2"></i>Buka 24 Jam / 7 Hari</p>
      </div>
    </div>
    <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0 16px;">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <p style="margin:0;font-size:0.78rem;">&copy; {{ date('Y') }} Mahessa Trans Holiday. All Rights Reserved.</p>
      <a href="{{ route('admin.login') }}" style="font-size:0.72rem;color:rgba(255,255,255,0.15);">Admin</a>
    </div>
  </div>
</footer>

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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
  window.addEventListener('scroll', function(){
    document.getElementById('navbar').classList.toggle('scrolled', scrollY > 50);
  });

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.anim').forEach(function(el){
    observer.observe(el);
  });
</script>
</body>
</html>