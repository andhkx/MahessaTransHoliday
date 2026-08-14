<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog & Artikel Wisata | Mahessa Trans Holiday</title>
  <meta name="description" content="Kumpulan artikel, tips wisata, dan informasi destinasi liburan terbaik dari Mahessa Trans Holiday.">
  <meta name="keywords" content="blog wisata, tips liburan, travel bandung, artikel wisata, destinasi wisata">
  <meta name="robots" content="index, follow">

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

    /* HERO BLOG */
    .blog-hero {
      background: linear-gradient(160deg, #0F172A 0%, #1E3A5F 50%, #1D4ED8 100%);
      color: #fff;
      padding: 120px 0 60px;
      margin-top: 60px;
      position: relative;
      text-align: center;
    }
    .blog-hero h1 { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; margin-bottom: 1rem; }
    .blog-hero p { color: rgba(255,255,255,0.8); font-size: 1rem; max-width: 600px; margin: 0 auto; }

    /* BLOG GRID */
    .blog-container { padding: 60px 0; }
    .blog-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid var(--border);
      overflow: hidden;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(37,99,235,0.1);
    }
    .blog-img {
      height: 220px;
      width: 100%;
      object-fit: cover;
    }
    .blog-content {
      padding: 24px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .blog-date {
      font-size: 0.75rem;
      color: var(--blue);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .blog-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 12px;
      line-height: 1.4;
      text-decoration: none;
    }
    .blog-title:hover { color: var(--blue); }
    .blog-excerpt {
      font-size: 0.88rem;
      color: var(--muted);
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .blog-read-more {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--blue);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .blog-read-more i { transition: transform 0.2s; }
    .blog-read-more:hover i { transform: translateX(4px); }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: #fff;
      border-radius: 20px;
      border: 1px dashed var(--border);
    }
    .empty-state i { font-size: 3rem; color: var(--muted); margin-bottom: 1rem; }

    /* FOOTER */
    .footer { background: #0F172A; color: rgba(255,255,255,0.65); padding: 40px 0 20px; margin-top: 40px; }
    .footer h6 { color: #fff; font-weight: 700; font-size: 0.9rem; margin-bottom: 1rem; }
    .footer p, .footer li, .footer a { font-size: 0.82rem; line-height: 1.8; text-decoration: none; color: inherit; }
    .footer a:hover { color: #93C5FD; }
    .footer ul { list-style: none; padding: 0; }
    .footer ul li i { color: var(--blue); margin-right: 7px; font-size: 0.7rem; }
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

<section class="blog-hero">
  <div class="container">
    <h1>Blog & Artikel</h1>
    <p>Temukan inspirasi perjalanan, tips liburan, dan informasi destinasi wisata menarik dari kami.</p>
  </div>
</section>

<section class="blog-container">
  <div class="container">
    <div class="row g-4">
      
      @forelse($posts as $post)
      <div class="col-md-6 col-lg-4">
        <div class="blog-card">
          @if($post->image_path)
            <img src="{{ asset('storage/' . $post->image_path) }}" alt="{{ $post->title }}" class="blog-img">
          @else
            <div class="blog-img d-flex align-items-center justify-content-center" style="background:#E2E8F0;">
              <i class="fas fa-image fa-3x" style="color:#94A3B8;"></i>
            </div>
          @endif
          
          <div class="blog-content">
            <div class="blog-date"><i class="far fa-calendar-alt me-1"></i> {{ $post->created_at->format('d M Y') }}</div>
            <a href="{{ route('blog.show', $post->slug) }}" class="blog-title">{{ $post->title }}</a>
            <p class="blog-excerpt">{{ Str::limit(strip_tags($post->body), 110) }}</p>
            <div>
              <a href="{{ route('blog.show', $post->slug) }}" class="blog-read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
      @empty
      <div class="col-12">
        <div class="empty-state">
          <i class="fas fa-newspaper"></i>
          <h4>Belum ada artikel</h4>
          <p class="text-muted">Nantikan artikel dan tips wisata menarik dari kami segera.</p>
        </div>
      </div>
      @endforelse

    </div>

    <div class="d-flex justify-content-center mt-5">
      {{ $posts->links('pagination::bootstrap-5') ?? '' }}
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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
  window.addEventListener('scroll', function(){
    document.getElementById('navbar').classList.toggle('scrolled', scrollY > 50);
  });
</script>
</body>
</html>