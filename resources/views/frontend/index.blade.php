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
  <meta name="description" content="Mahessa Trans Holiday - Layanan Sewa Mobil, Charter Drop, Tour Antar Kota.">
  <link rel="icon" href="{{ asset('images/favicon.jpg') }}" type="image/jpeg">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</script>
  <style>
    :root {
      --blue: #2563EB;
      --dark-blue: #1D4ED8;
      --light-blue: #EFF6FF;
      --gold: #F59E0B;
      --bg: #F8FAFC;
      --white: #FFFFFF;
      --text: #0F172A;
      --muted: #64748B;
      --border: #E2E8F0;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body { overflow-x:hidden; scroll-behavior:smooth; }
    body { font-family:'Montserrat',sans-serif; color:var(--text); background:var(--bg); }

    /* ===== NAVBAR ===== */
    .navbar {
      position:fixed; top:0; left:0; width:100%;
      background:rgba(255,255,255,0.92) !important;
      backdrop-filter:blur(20px);
      border-bottom:1px solid var(--border);
      box-shadow:0 2px 20px rgba(0,0,0,0.06);
      padding:0.6rem 0; z-index:1000;
      transition:all 0.3s;
    }
    .navbar.scrolled { box-shadow:0 4px 24px rgba(0,0,0,0.1); }
    .navbar-brand img { height:38px; }
    .navbar-brand span { font-size:1rem; font-weight:800; color:var(--blue); letter-spacing:-0.3px; }
    .nav-link { font-size:0.82rem; font-weight:600; color:var(--text) !important; padding:6px 10px !important; transition:color 0.2s; }
    .nav-link:hover, .nav-link.active { color:var(--blue) !important; }
    .navbar-toggler { border:none; padding:4px 8px; }
    .navbar-toggler:focus { box-shadow:none; }
    .navbar-toggler-icon { background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2837,99,235,1%29' stroke-width='2' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
    .btn-nav-wa { background:var(--blue); color:#fff !important; border-radius:50px; padding:7px 18px !important; font-size:0.8rem; font-weight:700; }
    .btn-nav-wa:hover { background:var(--dark-blue); }

    /* ===== HERO ===== */
    .hero {
      min-height:100svh;
      background:linear-gradient(160deg,#0F172A 0%,#1E3A5F 50%,#1D4ED8 100%);
      display:flex; align-items:center;
      padding:90px 0 50px;
      position:relative; overflow:hidden;
      text-align:center;
    }
    .hero::before {
      content:''; position:absolute;
      width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle,rgba(37,99,235,0.3) 0%,transparent 70%);
      top:-100px; right:-100px;
    }
    .hero::after {
      content:''; position:absolute;
      width:300px; height:300px; border-radius:50%;
      background:radial-gradient(circle,rgba(59,130,246,0.2) 0%,transparent 70%);
      bottom:-60px; left:-60px;
    }
    .hero .container { position:relative; z-index:2; }
    .hero-badge {
      display:inline-flex; align-items:center; gap:7px;
      background:rgba(255,255,255,0.1);
      border:1px solid rgba(255,255,255,0.2);
      color:rgba(255,255,255,0.85);
      font-size:0.72rem; font-weight:600;
      padding:5px 14px; border-radius:50px;
      letter-spacing:0.5px; margin-bottom:1.2rem;
    }
    .hero-badge .dot { width:6px; height:6px; background:#34D399; border-radius:50%; flex-shrink:0; }
    .hero h1 {
      font-size:clamp(1.9rem, 6vw, 3.5rem);
      font-weight:900; color:#fff;
      line-height:1.15; margin-bottom:1rem;
      letter-spacing:-1px;
    }
    .hero h1 span { color:#93C5FD; }
    .hero p {
      font-size:0.92rem; color:rgba(255,255,255,0.65);
      line-height:1.7; margin:0 auto 2rem;
      max-width:480px; font-weight:400;
    }
    .hero-btns { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; }
    .btn-hero-primary {
      background:var(--blue); color:#fff;
      padding:12px 30px; border-radius:50px;
      font-weight:700; font-size:0.88rem;
      border:none; text-decoration:none;
      display:inline-flex; align-items:center; gap:7px;
      box-shadow:0 4px 20px rgba(37,99,235,0.4);
      transition:all 0.3s; white-space:nowrap;
    }
    .btn-hero-primary:hover { background:var(--dark-blue); color:#fff; transform:translateY(-2px); }
    .btn-hero-outline {
      background:transparent; color:#fff;
      padding:11px 28px; border-radius:50px;
      font-weight:600; font-size:0.88rem;
      border:2px solid rgba(255,255,255,0.4);
      text-decoration:none;
      display:inline-flex; align-items:center; gap:7px;
      transition:all 0.3s; white-space:nowrap;
    }
    .btn-hero-outline:hover { background:rgba(255,255,255,0.12); color:#fff; border-color:#fff; }
    .hero-stats {
      display:flex; justify-content:center; flex-wrap:wrap;
      gap:8px; margin-top:2.5rem;
    }
    .hero-stat-pill {
      background:rgba(255,255,255,0.1);
      border:1px solid rgba(255,255,255,0.15);
      color:#fff; border-radius:50px;
      padding:7px 16px; font-size:0.78rem; font-weight:600;
      display:flex; align-items:center; gap:6px;
    }
    .hero-stat-pill i { color:#93C5FD; }

    /* ===== LAYANAN SECTION ===== */
    .section-label { font-size:0.7rem; font-weight:700; color:var(--blue); text-transform:uppercase; letter-spacing:2px; text-align:center; }
    .section-title { font-size:clamp(1.5rem,4vw,2.2rem); font-weight:800; color:var(--text); text-align:center; letter-spacing:-0.5px; }
    .section-sub { font-size:0.88rem; color:var(--muted); text-align:center; max-width:480px; margin:0.5rem auto 0; }

    /* SERVICE CARDS */
    .service-card {
      background:#fff; border-radius:18px;
      border:1px solid var(--border);
      padding:24px 20px; text-align:center;
      transition:all 0.3s; height:100%;
    }
    .service-card:hover { transform:translateY(-5px); box-shadow:0 12px 30px rgba(37,99,235,0.12); border-color:var(--blue); }
    .service-icon {
      width:56px; height:56px; border-radius:16px;
      background:var(--light-blue); margin:0 auto 14px;
      display:flex; align-items:center; justify-content:center;
      font-size:1.4rem; color:var(--blue); transition:all 0.3s;
    }
    .service-card:hover .service-icon { background:var(--blue); color:#fff; }
    .service-card h6 { font-weight:700; font-size:0.92rem; margin-bottom:6px; color:var(--text); }
    .service-card p { font-size:0.8rem; color:var(--muted); margin:0; line-height:1.55; }

    /* DESTINASI */
    .dest-card {
      background:#fff; border-radius:18px;
      border:1px solid var(--border);
      overflow:hidden; transition:all 0.3s; height:100%;
    }
    .dest-card:hover { transform:translateY(-5px); box-shadow:0 12px 30px rgba(37,99,235,0.12); }
    .dest-emoji { font-size:2.8rem; height:110px; display:flex; align-items:center; justify-content:center; }
    .dest-card-body { padding:14px 16px 18px; }
    .dest-card h6 { font-weight:700; font-size:0.88rem; color:var(--text); margin-bottom:4px; }
    .dest-card p { font-size:0.77rem; color:var(--muted); margin:0; line-height:1.45; }

    /* PACKAGE CARDS */
    .pkg-card {
      background:#fff; border-radius:18px;
      border:1px solid var(--border);
      overflow:hidden; transition:all 0.3s; height:100%;
    }
    .pkg-card:hover { transform:translateY(-5px); box-shadow:0 16px 36px rgba(37,99,235,0.13); border-color:transparent; }
    .pkg-img {
      height:180px; background:var(--bg);
      display:flex; align-items:center; justify-content:center;
      font-size:3.5rem; position:relative; overflow:hidden;
    }
    .pkg-img img { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
    .pkg-badge {
      position:absolute; top:10px; left:10px;
      background:rgba(255,255,255,0.92);
      color:var(--blue); font-size:0.65rem; font-weight:700;
      text-transform:uppercase; letter-spacing:0.6px;
      padding:3px 10px; border-radius:50px;
    }
    .pkg-body { padding:16px; }
    .pkg-body h6 { font-weight:700; font-size:0.92rem; color:var(--text); margin-bottom:5px; }
    .pkg-body p { font-size:0.8rem; color:var(--muted); line-height:1.5; margin-bottom:14px; }
    .pkg-price-label { font-size:0.68rem; color:var(--muted); font-weight:500; }
    .pkg-price { font-size:1.1rem; font-weight:800; color:var(--blue); letter-spacing:-0.3px; white-space:nowrap; }
    @media(max-width:576px) { .pkg-price { font-size:0.82rem; letter-spacing:-0.2px; } }

    /* SHOW MORE */
    .pkg-hidden { display:none; }
    .btn-show-more {
      display:flex; align-items:center; justify-content:center; gap:8px;
      margin:32px auto 0;
      background:#fff; color:var(--blue);
      border:2px solid var(--blue);
      border-radius:50px; padding:12px 36px;
      font-size:0.88rem; font-weight:700;
      font-family:'Montserrat',sans-serif;
      cursor:pointer; transition:all 0.3s;
      box-shadow:0 4px 16px rgba(37,99,235,0.1);
    }
    .btn-show-more:hover { background:var(--blue); color:#fff; transform:translateY(-2px); box-shadow:0 8px 24px rgba(37,99,235,0.25); }
    .btn-show-more i { transition:transform 0.3s; }
    .btn-show-more.expanded i { transform:rotate(180deg); }
    .btn-wa {
      background:#22C55E; color:#fff;
      padding:8px 16px; border-radius:50px;
      font-size:0.78rem; font-weight:700;
      text-decoration:none; border:none;
      display:inline-flex; align-items:center; gap:5px;
      transition:all 0.3s; white-space:nowrap;
    }
    .btn-wa:hover { background:#16A34A; color:#fff; transform:translateY(-1px); }

    /* FILTER — mobile friendly */
    .filter-wrap {
      display:flex; flex-wrap:wrap; justify-content:center; gap:7px;
    }
    .filter-pill {
      padding:6px 14px; border-radius:50px;
      font-size:0.75rem; font-weight:600;
      border:1.5px solid var(--border);
      color:var(--muted); background:#fff;
      text-decoration:none; transition:all 0.25s;
      white-space:nowrap; cursor:pointer;
      font-family:'Montserrat',sans-serif;
    }
    .filter-pill:hover { border-color:var(--blue); color:var(--blue); }
    .filter-pill.active { background:var(--blue); color:#fff; border-color:var(--blue); box-shadow:0 3px 10px rgba(37,99,235,0.25); }
    /* Mobile: select dropdown untuk filter */
    .filter-select {
      width:100%; padding:10px 16px; border-radius:12px;
      border:1.5px solid var(--border); background:#fff;
      font-family:'Montserrat',sans-serif; font-size:0.85rem;
      font-weight:600; color:var(--text); cursor:pointer;
      appearance:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2364748B' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat:no-repeat; background-position:right 14px center;
    }
    .filter-select:focus { outline:none; border-color:var(--blue); }

    /* CTA */
    .cta-section {
      background:linear-gradient(135deg,#1D4ED8 0%,#2563EB 60%,#3B82F6 100%);
      position:relative; overflow:hidden;
    }
    .cta-section::before {
      content:''; position:absolute;
      width:400px; height:400px; border-radius:50%;
      background:rgba(255,255,255,0.05);
      top:-100px; right:-50px;
    }

    /* FOOTER */
    .footer { background:#0F172A; color:rgba(255,255,255,0.65); padding:50px 0 20px; }
    .footer h6 { color:#fff; font-weight:700; font-size:0.9rem; margin-bottom:1rem; }
    .footer p, .footer li, .footer a { font-size:0.82rem; line-height:1.8; }
    .footer a { color:rgba(255,255,255,0.55); text-decoration:none; transition:color 0.2s; }
    .footer a:hover { color:#93C5FD; }
    .footer ul { list-style:none; padding:0; }
    .footer ul li i { color:var(--blue); margin-right:7px; font-size:0.7rem; }
    .social-links { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
    .social-links a {
      width:34px; height:34px; border-radius:9px;
      background:rgba(255,255,255,0.08);
      display:flex; align-items:center; justify-content:center;
      font-size:0.82rem; transition:all 0.2s;
    }
    .social-links a:hover { background:var(--blue); color:#fff; }

    /* WA FLOAT */
    .wa-float {
      position:fixed; bottom:22px; right:22px;
      width:54px; height:54px; border-radius:50%;
      background:#22C55E; color:#fff;
      display:flex; align-items:center; justify-content:center;
      font-size:1.5rem; text-decoration:none; z-index:999;
      box-shadow:0 4px 18px rgba(34,197,94,0.5);
      animation:wa-pulse 2.5s infinite;
      transition:transform 0.2s;
    }
    .wa-float:hover { color:#fff; transform:scale(1.1); }
    @keyframes wa-pulse {
      0%   { box-shadow:0 0 0 0 rgba(34,197,94,0.5); }
      70%  { box-shadow:0 0 0 12px rgba(34,197,94,0); }
      100% { box-shadow:0 0 0 0 rgba(34,197,94,0); }
    }

    /* SCROLL ANIM */
    .anim { opacity:0; transition:opacity 0.55s ease, transform 0.55s ease; }
    .anim-up { transform:translateY(24px); }
    .anim-left { transform:translateX(-24px); }
    .anim-right { transform:translateX(24px); }
    .anim-scale { transform:scale(0.93); }
    .anim.show { opacity:1; transform:translate(0) scale(1); }
    .d1 { transition-delay:0.08s; }
    .d2 { transition-delay:0.16s; }
    .d3 { transition-delay:0.24s; }
    .d4 { transition-delay:0.32s; }
    .d5 { transition-delay:0.40s; }
    .d6 { transition-delay:0.48s; }
    .d7 { transition-delay:0.56s; }

    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-thumb { background:var(--blue); border-radius:3px; }

    @media(max-width:576px) {
      .hero { padding:85px 0 40px; }
      .hero h1 { font-size:1.75rem; letter-spacing:-0.5px; }
      .hero p { font-size:0.85rem; }
      .btn-hero-primary, .btn-hero-outline { font-size:0.82rem; padding:11px 24px; }
    }
  </style>
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar navbar-expand-lg" id="navbar">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2" href="{{ route('home') }}">
        <img src="{{ asset('images/logo.png') }}" alt="Logo">
        <span>Mahessa Trans <span style="color:#0F172A;">Holiday</span></span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav">
        <ul class="navbar-nav ms-auto align-items-center gap-1">
          <li class="nav-item"><a class="nav-link" href="#beranda"><i class="fas fa-home me-1"></i>Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="#layanan"><i class="fas fa-th-large me-1"></i>Layanan</a></li>
          <li class="nav-item"><a class="nav-link" href="#destinasi"><i class="fas fa-map-pin me-1"></i>Destinasi</a></li>
          <li class="nav-item"><a class="nav-link" href="#paket"><i class="fas fa-suitcase me-1"></i>Paket</a></li>
          <li class="nav-item ms-1">
            <a href="https://wa.me/62895327077214" target="_blank" class="nav-link btn-nav-wa">
              <i class="fab fa-whatsapp me-1"></i>WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero" id="beranda">
    <div class="container">
      <div class="hero-badge">
        <div class="dot"></div>
        Travel Agency Terpercaya — Cimahi, Bandung
      </div>
      <h1>Destinasi Impian<br><span>Harga Nyaman</span></h1>
      <p>Mahessa Trans Holiday melayani Tour Wisata, Rental Mobil, Charter Drop, City Tour & Open Trip dari Bandung ke seluruh destinasi favorit Indonesia.</p>
      <div class="hero-btns">
        <a href="#paket" class="btn-hero-primary">
          <i class="fas fa-suitcase-rolling"></i> Lihat Paket Tour
        </a>
        <a href="https://wa.me/62895327077214?text=Halo+Mahessa+Trans+Holiday%2C+saya+ingin+konsultasi+paket+wisata." target="_blank" class="btn-hero-outline">
          <i class="fab fa-whatsapp"></i> Konsultasi Gratis
        </a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat-pill"><i class="fas fa-users"></i> 500+ Pelanggan</div>
        <div class="hero-stat-pill"><i class="fas fa-map-pin"></i> 7 Destinasi</div>
        <div class="hero-stat-pill"><i class="fas fa-star"></i> Rating 5★</div>
        <div class="hero-stat-pill"><i class="fas fa-clock"></i> 24/7 Siap</div>
      </div>
    </div>
  </section>

  <!-- LAYANAN -->
  <section class="py-5" id="layanan" style="background:#fff;">
    <div class="container">
      <div class="section-label anim anim-up mb-1">Jenis Layanan</div>
      <h2 class="section-title anim anim-up d1 mb-2">Layanan Kami</h2>
      <p class="section-sub anim anim-up d2 mb-5">Kami melayani berbagai kebutuhan perjalanan Anda dengan armada nyaman dan harga bersahabat</p>
      <div class="row g-3">
        @php
        $services = [
          ['fa-car','Rental Mobil','Sewa mobil harian dengan atau tanpa driver. Berbagai pilihan armada tersedia.','#EFF6FF'],
          ['fa-route','Charter Drop','Layanan antar-jemput point to point, termasuk Drop Bandung – Bandara Soetta.','#F0FDF4'],
          ['fa-city','City Tour','Wisata keliling kota dengan paket customizable sesuai waktu dan budget Anda.','#FFF7ED'],
          ['fa-users','Open Trip','Gabung bersama traveler lain dalam trip seru ke destinasi pilihan. Hemat & asik!','#F5F3FF'],
        ];
        @endphp
        @foreach($services as $i => $s)
        <div class="col-6 col-md-3">
          <div class="service-card anim anim-up d{{ $i+1 }}">
            <div class="service-icon" style="background:{{ $s[3] }};"><i class="fas {{ $s[0] }}"></i></div>
            <h6>{{ $s[1] }}</h6>
            <p>{{ $s[2] }}</p>
          </div>
        </div>
        @endforeach
      </div>
    </div>
  </section>

  <!-- DESTINASI -->
  <section class="py-5" id="destinasi" style="background:var(--bg);">
    <div class="container">
      <div class="section-label anim anim-up mb-1">Tujuan Wisata</div>
      <h2 class="section-title anim anim-up d1 mb-2">Destinasi Unggulan</h2>
      <p class="section-sub anim anim-up d2 mb-5">Dari Bandung, kami antar ke destinasi wisata terfavorit di Jawa dan Bali</p>
      
      <div class="row g-3">
        @php
        // Format Baru: ['Nama_File_Foto', 'Judul', 'Deskripsi']
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
        
        @foreach($dests as $i => $d)
        <div class="col-6 col-sm-4 col-md-3">
          <div class="dest-card anim anim-scale d{{ ($i%4)+1 }}" style="padding: 0; overflow: hidden; background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.03); height: 100%; display: flex; flex-direction: column;">
            
            <img src="{{ asset('images/' . $d[0]) }}" alt="Wisata {{ $d[1] }}" style="height: 140px; width: 100%; object-fit: cover;">
            
            <div class="dest-card-body" style="padding: 1.25rem; flex: 1;">
              <h6 class="fw-bold mb-2 text-dark">{{ $d[1] }}</h6>
              <p class="text-muted mb-0" style="font-size: 0.85rem; line-height: 1.5;">{{ $d[2] }}</p>
            </div>
            
          </div>
        </div>
        @endforeach
      </div>
      
    </div>
  </section>

  <!-- PAKET TOUR -->
  <section class="py-5" id="paket" style="background:#fff;">
    <div class="container">
      <div class="section-label anim anim-up mb-1">Pilihan Terbaik</div>
      <h2 class="section-title anim anim-up d1 mb-2">Paket Tour Tersedia</h2>
      <p class="section-sub anim anim-up d2 mb-4">Semua paket sudah termasuk armada, driver, dan dukungan perjalanan penuh</p>

      {{-- FILTER MOBILE: select --}}
      <div class="d-block d-md-none mb-4 anim anim-up d3">
        <select class="filter-select" id="filterSelectMobile" onchange="filterPackages(this.value)">
          <option value="semua">🗂 Semua Kategori</option>
          @foreach(['Rental Mobil','Charter Drop','City Tour','Open Trip','Tour Lembang','Tour Ciwidey','Tour Bandung','Tour Pangandaran','Tour Jogja','Tour Bromo','Tour Bali','Drop-off / Pick-up Bandara'] as $cat)
          <option value="{{ $cat }}">{{ $cat }}</option>
          @endforeach
        </select>
      </div>

      {{-- FILTER DESKTOP: pills --}}
      <div class="d-none d-md-flex filter-wrap mb-5 anim anim-up d3" id="filterPillsDesktop">
        <button onclick="filterPackages('semua')" class="filter-pill active" data-cat="semua">Semua</button>
        @foreach(['Rental Mobil','Charter Drop','City Tour','Open Trip','Tour Lembang','Tour Ciwidey','Tour Bandung','Tour Pangandaran','Tour Jogja','Tour Bromo','Tour Bali','Drop-off / Pick-up Bandara'] as $cat)
        <button onclick="filterPackages('{{ $cat }}')" class="filter-pill" data-cat="{{ $cat }}">{{ $cat }}</button>
        @endforeach
      </div>

      @if($packages->isEmpty())
      <div class="text-center py-5">
        <div style="font-size:3rem;">🗺️</div>
        <p class="mt-3" style="color:var(--muted);">Belum ada paket untuk kategori ini.</p>
        <a href="{{ route('home') }}" class="filter-pill active mt-2 d-inline-block">Lihat Semua</a>
      </div>
      @else
      <div class="row g-3">
        @foreach($packages as $i => $package)
        @php
          $waMsg = urlencode("Halo Mahessa Trans Holiday, saya ingin bertanya/memesan paket *{$package->title}* dengan harga *{$package->formatted_price}*. Bagaimana prosedur selanjutnya?");
          $waUrl = "https://wa.me/62895327077214?text={$waMsg}";
          $emoji = match(true) {
            str_contains($package->category,'Lembang')    => '🌿',
            str_contains($package->category,'Ciwidey')    => '🌸',
            str_contains($package->category,'Bandung')    => '🏙️',
            str_contains($package->category,'Pangandaran')=> '🌊',
            str_contains($package->category,'Jogja')      => '🏛️',
            str_contains($package->category,'Bromo')      => '🌋',
            str_contains($package->category,'Bali')       => '🏝️',
            str_contains($package->category,'Bandara')    => '✈️',
            str_contains($package->category,'Open')       => '👥',
            str_contains($package->category,'City')       => '🏙️',
            str_contains($package->category,'Charter')    => '🚐',
            str_contains($package->category,'Rental')     => '🚗',
            default => '🗺️'
          };
        @endphp
        
        <div class="col-6 col-lg-4 pkg-col {{ $i >= 6 ? 'pkg-hidden' : '' }}" data-category="{{ $package->category }}">
          <div class="pkg-card anim anim-scale d{{ ($i%3)+1 }}" style="position: relative;">
            
            <a href="{{ route('package.show', $package->slug) }}" class="stretched-link text-decoration-none"></a>

            <div class="pkg-img">
              @if($package->image_path)
              <img src="{{ $package->image_url }}" alt="{{ $package->title }}">
              @else
              <span>{{ $emoji }}</span>
              @endif
              <div class="pkg-badge">{{ Str::limit($package->category, 20) }}</div>
            </div>
            
            <div class="pkg-body">
              <h6>{{ $package->title }}</h6>
              <p class="d-none d-sm-block">{{ Str::limit($package->description, 80) }}</p>
              
              <div class="d-flex justify-content-between align-items-center gap-2">
                <div>
                  <div class="pkg-price-label">Mulai dari</div>
                  <div class="pkg-price">{{ $package->formatted_price }}</div>
                </div>
                
                <a href="{{ $waUrl }}" target="_blank" class="btn-wa" style="position: relative; z-index: 2;">
                  <i class="fab fa-whatsapp"></i>
                  <span class="d-none d-sm-inline">Pesan</span>
                </a>
              </div>
            </div>
            
          </div>
        </div>
        @endforeach
      </div>

      @php $totalPackages = $packages->count(); @endphp
      @if($totalPackages > 6)
      <div style="text-align:center;">
        <button class="btn-show-more" id="btnShowMore" onclick="togglePackages()">
          <i class="fas fa-chevron-down"></i>
          Tampilkan Lebih Banyak <span id="showMoreCount">({{ $totalPackages - 6 }} paket lainnya)</span>
        </button>
      </div>
      @endif

      @endif
    </div>
  </section>

  <!-- KEUNGGULAN -->
  <section class="py-5" style="background:var(--bg);">
    <div class="container">
      <div class="section-label anim anim-up mb-1">Kenapa Kami?</div>
      <h2 class="section-title anim anim-up d1 mb-2">Mengapa Pilih Mahessa Trans Holiday?</h2>
      <p class="section-sub anim anim-up d2 mb-5">Kepercayaan Anda adalah prioritas utama kami</p>
      <div class="row g-3">
        @foreach([
          ['fa-money-bill-wave','Harga Terjangkau','Paket kompetitif tanpa biaya tersembunyi, sesuai budget semua kalangan.'],
          ['fa-van-shuttle','Armada Lengkap','HiAce, Innova, Avanza & berbagai pilihan armada terawat dan nyaman.'],
          ['fa-user-tie','Driver Profesional','Driver berpengalaman, ramah, dan hafal rute terbaik ke semua destinasi.'],
          ['fa-shield-halved','Perjalanan Aman','Kendaraan bergaransi, diasuransikan, dan selalu dalam kondisi prima.'],
        ] as $i => $f)
        <div class="col-6 col-md-3">
          <div class="service-card anim anim-up d{{ $i+1 }}">
            <div class="service-icon"><i class="fas {{ $f[0] }}"></i></div>
            <h6>{{ $f[1] }}</h6>
            <p>{{ $f[2] }}</p>
          </div>
        </div>
        @endforeach
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section py-5" id="kontak">
    <div class="container text-center position-relative" style="z-index:1;">
      <h2 class="anim anim-up" style="font-size:clamp(1.5rem,4vw,2rem);font-weight:800;color:#fff;margin-bottom:0.6rem;">
        Siap Berangkat Liburan?
      </h2>
      <p class="anim anim-up d1" style="color:rgba(255,255,255,0.7);margin-bottom:1.8rem;font-size:0.9rem;">
        Hubungi kami sekarang untuk penawaran terbaik!
      </p>
      <div class="d-flex justify-content-center flex-wrap gap-3 anim anim-up d2">
        <a href="https://wa.me/62895327077214?text=Halo+Mahessa+Trans+Holiday%2C+saya+ingin+pesan+paket+wisata." target="_blank"
           class="btn-hero-outline">
          <i class="fab fa-whatsapp"></i> Chat WhatsApp
        </a>
        <a href="#paket" class="btn-hero-outline">
          <i class="fas fa-suitcase"></i> Lihat Paket
        </a>
      </div>
      <div class="anim anim-up d3 mt-4" style="color:rgba(255,255,255,0.45);font-size:0.8rem;">
        <i class="fas fa-phone me-2"></i>0895-3270-77214
        &nbsp;•&nbsp;
        <i class="fas fa-clock me-2"></i>Buka 24 Jam / 7 Hari
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-12 col-md-4">
          <h6><i class="fas fa-plane-departure me-2" style="color:#3B82F6;"></i>Mahessa Trans Holiday</h6>
          <p>Travel agency terpercaya dari Cimahi, Bandung. Melayani rental mobil, charter drop, city tour, open trip & paket wisata ke seluruh Indonesia.</p>
          <div class="social-links">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/62895327077214" target="_blank"><i class="fab fa-whatsapp"></i></a>
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div class="col-6 col-md-4">
          <h6><i class="fas fa-link me-2" style="color:#3B82F6;"></i>Menu</h6>
          <ul>
            <li><a href="#beranda"><i class="fas fa-angle-right"></i>Beranda</a></li>
            <li><a href="#layanan"><i class="fas fa-angle-right"></i>Layanan</a></li>
            <li><a href="#destinasi"><i class="fas fa-angle-right"></i>Destinasi</a></li>
            <li><a href="#paket"><i class="fas fa-angle-right"></i>Paket Tour</a></li>
            <li><a href="#kontak"><i class="fas fa-angle-right"></i>Kontak</a></li>
          </ul>
        </div>
        <div class="col-6 col-md-4">
          <h6><i class="fas fa-headset me-2" style="color:#3B82F6;"></i>Kontak</h6>
          <p><i class="fas fa-phone me-2" style="color:#3B82F6;"></i>0895-3270-77214</p>
          <p><i class="fab fa-whatsapp me-2" style="color:#22C55E;"></i>0895-3270-77214</p>
          <p><i class="fas fa-map-marker-alt me-2" style="color:#3B82F6;"></i>Cimahi, Jawa Barat</p>
          <div class="mt-3">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15844.854754735714!2d107.5431658!3d-6.8649766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e50071748999%3A0xf0a12b6c8c0ff58e!2sMahessa%20Rental%20Mobil%20Cimahi!5e0!3m2!1sid!2sid!4v1759636571506!5m2!1sid!2sid"
              width="100%" height="120" style="border:0;border-radius:10px;filter:brightness(0.8);" loading="lazy"></iframe>
          </div>
        </div>
      </div>
      <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0 16px;">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <p style="margin:0;font-size:0.78rem;">&copy; {{ date('Y') }} Mahessa Trans Holiday. All Rights Reserved.</p>
        <a href="{{ route('admin.login') }}" style="font-size:0.72rem;color:rgba(255,255,255,0.15);">Admin</a>
      </div>
    </div>
  </footer>

  <a href="https://wa.me/62895327077214?text=Halo+Mahessa+Trans+Holiday%2C+saya+ingin+bertanya." target="_blank" class="wa-float">
    <i class="fab fa-whatsapp"></i>
  </a>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.08, rootMargin:'0px 0px -30px 0px' });
    document.querySelectorAll('.anim').forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if(href === '#') return;
        const t = document.querySelector(href);
        if(t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 68, behavior:'smooth' }); }
      });
    });

    var activeFilter = 'semua';

    function filterPackages(cat){
      activeFilter = cat;
      var allCols = document.querySelectorAll('.pkg-col');
      var showMoreBtn = document.getElementById('btnShowMore');

      allCols.forEach(function(col){
        col.classList.remove('pkg-hidden');
        col.style.display = '';
      });

      if(cat === 'semua'){
        var visible = 0;
        allCols.forEach(function(col){
          if(visible < 6){ visible++; }
          else { col.style.display = 'none'; col.classList.add('pkg-hidden'); }
        });
        if(showMoreBtn){
          var total = allCols.length;
          if(total > 6){
            showMoreBtn.style.display = '';
            showMoreBtn.classList.remove('expanded');
            showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Tampilkan Lebih Banyak <span>('+(total-6)+' paket lainnya)</span>';
          } else { showMoreBtn.style.display = 'none'; }
        }
      } else {
        var matched = [];
        allCols.forEach(function(col){
          if(col.getAttribute('data-category') === cat){ matched.push(col); }
          else { col.style.display = 'none'; }
        });
        if(showMoreBtn) showMoreBtn.style.display = 'none';
      }

      document.querySelectorAll('.filter-pill').forEach(function(btn){
        btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
      });
      var sel = document.getElementById('filterSelectMobile');
      if(sel) sel.value = cat;

      var emptyMsg = document.getElementById('emptyMsg');
      var filtered = document.querySelectorAll('.pkg-col:not([style*="display: none"])');
      if(emptyMsg) emptyMsg.style.display = filtered.length === 0 ? 'block' : 'none';
    }

    function togglePackages(){
      var hidden = document.querySelectorAll('.pkg-col.pkg-hidden');
      var btn = document.getElementById('btnShowMore');
      var isExpanded = btn.classList.contains('expanded');
      var allCols = document.querySelectorAll('.pkg-col');

      if(isExpanded){
        var visible = 0;
        allCols.forEach(function(col){
          if(visible < 6){ col.style.display = ''; visible++; }
          else { col.style.display = 'none'; col.classList.add('pkg-hidden'); }
        });
        btn.classList.remove('expanded');
        btn.innerHTML = '<i class="fas fa-chevron-down"></i> Tampilkan Lebih Banyak <span>('+(allCols.length-6)+' paket lainnya)</span>';
        window.scrollTo({ top: document.getElementById('paket').offsetTop - 80, behavior:'smooth' });
      } else {
        allCols.forEach(function(col){
          col.style.display = '';
          col.classList.remove('pkg-hidden');
          col.classList.add('show');
        });
        btn.classList.add('expanded');
        btn.innerHTML = '<i class="fas fa-chevron-down"></i> Tampilkan Lebih Sedikit';
      }
    }
  </script>
</body>
</html>
