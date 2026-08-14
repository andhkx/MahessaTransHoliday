<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ $post->meta_title ?? $post->title }} | Mahessa Trans Holiday</title>
  <meta name="description" content="{{ $post->meta_description ?? Str::limit(strip_tags($post->body), 155) }}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{{ request()->url() }}">
  
  <meta property="og:type" content="article">
  <meta property="og:url" content="{{ request()->url() }}">
  <meta property="og:title" content="{{ $post->meta_title ?? $post->title }}">
  <meta property="og:description" content="{{ $post->meta_description ?? Str::limit(strip_tags($post->body), 155) }}">
  <meta property="og:image" content="{{ $post->image_path ? asset('storage/' . $post->image_path) : asset('images/logo.png') }}">
  <meta property="og:site_name" content="Mahessa Trans Holiday">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ $post->meta_title ?? $post->title }}">
  <meta name="twitter:description" content="{{ $post->meta_description ?? Str::limit(strip_tags($post->body), 155) }}">
  <meta name="twitter:image" content="{{ $post->image_path ? asset('storage/' . $post->image_path) : asset('images/logo.png') }}">

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

    /* NAVBAR KONSISTEN */
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      z-index: 1000; padding: 0.6rem 0; transition: all 0.3s;
    }
    .navbar.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.1); background: rgba(255,255,255,0.97); }
    .navbar-brand { font-size: 1rem; font-weight: 800; color: var(--blue) !important; display: flex; align-items: center; gap: 8px; }
    .navbar-brand img { height: 32px; width: auto; }
    .navbar-brand span { color: var(--text); }
    .nav-link { font-size: 0.82rem; font-weight: 600; color: var(--text) !important; padding: 6px 10px !important; transition: color 0.2s; }
    .nav-link:hover { color: var(--blue) !important; }
    .btn-nav { background: var(--blue); color: #fff !important; border-radius: 50px; padding: 7px 18px !important; font-size: 0.8rem; font-weight: 700; }
    .btn-nav:hover { background: var(--dark-blue); }

    /* HERO ARTIKEL */
    .article-hero {
      background: linear-gradient(160deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%);
      color: #fff;
      padding: 120px 0 60px;
      margin-top: 60px;
      position: relative;
    }
    .article-hero h1 {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 900;
      line-height: 1.3;
      margin-bottom: 1rem;
    }
    .article-meta {
      color: rgba(255,255,255,0.8);
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    .article-meta span { display: flex; align-items: center; gap: 6px; }

    /* BREADCRUMB */
    .detail-breadcrumb {
      color: rgba(255,255,255,0.65);
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .detail-breadcrumb a { color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }
    .detail-breadcrumb a:hover { color: #fff; }

    /* KONTEN ARTIKEL */
    .article-container { padding: 40px 0; }
    .article-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid var(--border);
      padding: 30px;
      margin-bottom: 24px;
    }
    .article-image {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    
    /* TYPOGRAPHY KONTEN */
    .article-body {
      font-size: 1.05rem;
      line-height: 1.8;
      color: #334155;
    }
    .article-body h2, .article-body h3, .article-body h4 {
      color: var(--text);
      font-weight: 800;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .article-body img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      margin: 1.5rem 0;
    }
    .article-body a { color: var(--blue); text-decoration: none; font-weight: 600; }
    .article-body a:hover { text-decoration: underline; }
    .article-body ul, .article-body ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
    .article-body li { margin-bottom: 0.5rem; }

    /* SIDEBAR CTA */
    .sidebar-sticky { position: sticky; top: 90px; }
    .promo-card {
      background: linear-gradient(135deg, var(--light-blue) 0%, rgba(37,99,235,0.05) 100%);
      border-radius: 16px;
      border: 1px solid rgba(37,99,235,0.2);
      padding: 24px;
      text-align: center;
    }
    .promo-icon {
      font-size: 2.5rem;
      color: var(--blue);
      margin-bottom: 15px;
    }
    .promo-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 10px;
    }
    .promo-desc {
      font-size: 0.85rem;
      color: var(--muted);
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .btn-promo {
      width: 100%;
      background: var(--blue);
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 12px;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.3s;
    }
    .btn-promo:hover { background: var(--dark-blue); color: #fff; transform: translateY(-2px); }

    /* FOOTER */
    .footer { background: #0F172A; color: rgba(255,255,255,0.65); padding: 40px 0 20px; margin-top: 60px; }
    .footer h6 { color: #fff; font-weight: 700; font-size: 0.9rem; margin-bottom: 1rem; }
    .footer p, .footer li, .footer a { font-size: 0.82rem; line-height: 1.8; text-decoration: none; color: inherit; }
    .footer a:hover { color: #93C5FD; }
    .footer ul { list-style: none; padding: 0; }
    .footer ul li i { color: var(--blue); margin-right: 7px; font-size: 0.7rem; }

    @media (max-width: 768px) {
      .article-hero { padding: 100px 0 40px; }
      .article-hero h1 { font-size: 1.6rem; }
      .article-card { padding: 20px; }
      .sidebar-sticky { position: static; margin-top: 2rem; }
    }
  </style>
</head>
<body>

<nav class="navbar navbar-expand-lg" id="navbar">
  <div class="container">
    <a class="navbar-brand" href="{{ route('home') }}">
      <img src="{{ asset('images/logo.png') }}" alt="Logo" onerror="this.style.display='none'">
      <span>Mahessa Trans <span>Holiday</span></span>
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

<section class="article-hero">
  <div class="container">
    <div class="detail-breadcrumb">
      <a href="{{ route('home') }}"><i class="fas fa-home"></i> Beranda</a>
      <span>/</span>
      <a href="{{ route('blog.index') ?? '#' }}">Blog</a>
      <span>/</span>
      <span class="text-white-50">Membaca Artikel</span>
    </div>
    <h1>{{ $post->title }}</h1>
    <div class="article-meta">
      <span><i class="far fa-calendar-alt"></i> {{ $post->created_at->format('d M Y') }}</span>
      <span><i class="far fa-user"></i> Admin Mahessa</span>
    </div>
  </div>
</section>

<section class="article-container">
  <div class="container">
    <div class="row g-4">

      <div class="col-lg-8">
        <div class="article-card">
          @if($post->image_path)
            <img src="{{ asset('storage/' . $post->image_path) }}" alt="{{ $post->title }}" class="article-image">
          @endif
          
          <div class="article-body">
            {!! $post->body !!}
          </div>
          
          <hr class="mt-5 mb-4 text-muted">
          <div class="d-flex justify-content-between align-items-center">
            <a href="{{ route('blog.index') ?? '#' }}" class="btn btn-light rounded-pill px-4 fw-bold text-dark border">
              <i class="fas fa-arrow-left me-2"></i> Kembali ke Blog
            </a>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sidebar-sticky">
          <div class="promo-card">
            <div class="promo-icon"><i class="fas fa-car-side"></i></div>
            <h3 class="promo-title">Rencanakan Liburan Anda</h3>
            <p class="promo-desc">Dapatkan pengalaman liburan tak terlupakan bersama Mahessa Trans Holiday. Armada premium, driver profesional, harga bersahabat.</p>
            
            @php
            $waMsg = urlencode("Halo Mahessa Trans Holiday, saya membaca artikel di blog dan tertarik untuk menanyakan paket wisata.");
            $waUrl = "https://wa.me/62895327077214?text={$waMsg}";
            @endphp
            
            <a href="{{ $waUrl }}" target="_blank" class="btn-promo">
              <i class="fab fa-whatsapp fs-5"></i> Tanya Paket Tour
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

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
          <li><a href="{{ route('home') }}#paket"><i class="fas fa-angle-right"></i>Paket Tour</a></li>
          <li><a href="{{ route('blog.index') ?? '#' }}"><i class="fas fa-angle-right"></i>Blog</a></li>
        </ul>
      </div>
      <div class="col-md-4">
        <h6><i class="fas fa-phone me-2" style="color:#3B82F6;"></i>Hubungi Kami</h6>
        <p><i class="fab fa-whatsapp me-2" style="color:#22C55E;"></i>0895-3270-77214</p>
        <p><i class="fas fa-clock me-2"></i>Buka 24 Jam / 7 Hari</p>
      </div>
    </div>
    <hr style="border-color:rgba(255,255,255,0.1);margin:24px 0 16px;">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
      <p style="margin:0;font-size:0.78rem;">&copy; {{ date('Y') }} Mahessa Trans Holiday. All Rights Reserved.</p>
      <a href="{{ route('admin.login') ?? '/login' }}" style="font-size:0.72rem;color:rgba(255,255,255,0.15);">Admin</a>
    </div>
  </div>
</footer>

<script type="application/ld+json">
{
  "@@context": "https://schema.org",
  "@@type": "Article",
  "mainEntityOfPage": {
    "@@type": "WebPage",
    "@@id": "{{ request()->url() }}"
  },
  "headline": "{{ $post->title }}",
  "image": "{{ $post->image_path ? asset('storage/' . $post->image_path) : asset('images/logo.png') }}",
  "datePublished": "{{ $post->created_at->toIso8601String() }}",
  "dateModified": "{{ $post->updated_at->toIso8601String() }}",
  "author": {
    "@@type": "Organization",
    "name": "Mahessa Trans Holiday",
    "url": "{{ route('home') }}"
  },
  "publisher": {
    "@@type": "Organization",
    "name": "Mahessa Trans Holiday",
    "logo": {
      "@@type": "ImageObject",
      "url": "{{ asset('images/logo.png') }}"
    }
  }
}
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
  window.addEventListener('scroll', function(){
    document.getElementById('navbar').classList.toggle('scrolled', scrollY > 50);
  });
</script>
</body>
</html>