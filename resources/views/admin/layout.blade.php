<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title','Dashboard') — Admin MTH</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    :root{
      --blue:#2563EB;--dark-blue:#1D4ED8;--light-blue:#EFF6FF;
      --bg:#F8FAFC;--white:#fff;
      --text:#0F172A;--muted:#64748B;--border:#E2E8F0;
      --sidebar-w:230px;
    }
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Montserrat',sans-serif;background:var(--bg);color:var(--text);display:flex;min-height:100vh;}

    /* SIDEBAR */
    .sidebar{
      width:var(--sidebar-w);flex-shrink:0;
      background:#fff;border-right:1px solid var(--border);
      display:flex;flex-direction:column;
      position:fixed;top:0;left:0;height:100vh;
      z-index:200;transition:transform 0.3s;
    }
    .sidebar-header{
      height:60px;padding:0 20px;
      display:flex;align-items:center;gap:10px;
      border-bottom:1px solid var(--border);flex-shrink:0;
    }
    .sidebar-logo{
      height:30px;
    }
    .sidebar-brand{font-size:0.82rem;font-weight:800;color:var(--blue);letter-spacing:-0.3px;line-height:1.2;}
    .sidebar-brand span{color:var(--text);}
    .sidebar-nav{flex:1;overflow-y:auto;padding:12px 10px;}
    .nav-section-label{
      font-size:0.62rem;font-weight:700;color:var(--muted);
      text-transform:uppercase;letter-spacing:1.5px;
      padding:14px 10px 6px;
    }
    .sidebar-link{
      display:flex;align-items:center;gap:10px;
      padding:9px 12px;border-radius:10px;
      font-size:0.82rem;font-weight:600;color:var(--muted);
      text-decoration:none;transition:all 0.2s;
      margin-bottom:2px;
    }
    .sidebar-link i{width:16px;text-align:center;font-size:0.85rem;}
    .sidebar-link:hover{background:var(--light-blue);color:var(--blue);}
    .sidebar-link.active{background:var(--light-blue);color:var(--blue);}
    .sidebar-link.active i{color:var(--blue);}
    .sidebar-footer{
      padding:14px 16px;border-top:1px solid var(--border);flex-shrink:0;
    }
    .user-info{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
    .user-avatar{
      width:32px;height:32px;border-radius:10px;
      background:var(--light-blue);color:var(--blue);
      display:flex;align-items:center;justify-content:center;
      font-size:0.8rem;font-weight:800;flex-shrink:0;
    }
    .user-name{font-size:0.78rem;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .user-email{font-size:0.68rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    .btn-logout{
      width:100%;background:#FEF2F2;color:#DC2626;
      border:none;border-radius:8px;padding:7px;
      font-size:0.75rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      cursor:pointer;transition:all 0.2s;
      display:flex;align-items:center;justify-content:center;gap:6px;
    }
    .btn-logout:hover{background:#FEE2E2;}

    /* MAIN */
    .main-wrap{margin-left:var(--sidebar-w);flex:1;display:flex;flex-direction:column;min-height:100vh;}
    .topbar{
      height:60px;background:#fff;border-bottom:1px solid var(--border);
      display:flex;align-items:center;padding:0 24px;
      position:sticky;top:0;z-index:100;gap:12px;
    }
    .topbar-toggle{
      display:none;background:none;border:none;
      color:var(--muted);font-size:1rem;cursor:pointer;padding:4px;
    }
    .page-title-wrap .page-title{font-size:0.95rem;font-weight:800;color:var(--text);}
    .page-title-wrap .page-sub{font-size:0.72rem;color:var(--muted);}
    .topbar-right{margin-left:auto;display:flex;align-items:center;gap:10px;}
    .btn-view-web{
      background:var(--light-blue);color:var(--blue);
      border:none;border-radius:8px;padding:6px 14px;
      font-size:0.75rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      text-decoration:none;display:flex;align-items:center;gap:5px;
    }
    .btn-view-web:hover{background:var(--blue);color:#fff;}
    .main-content{padding:24px;flex:1;}

    /* ALERT */
    .alert-success-custom{
      background:#F0FDF4;border:1px solid #BBF7D0;
      color:#15803D;border-radius:12px;
      padding:12px 16px;font-size:0.82rem;font-weight:600;
      display:flex;align-items:center;gap:8px;margin-bottom:20px;
    }

    /* CARD */
    .admin-card{
      background:#fff;border-radius:16px;
      border:1px solid var(--border);
      overflow:hidden;
    }
    .admin-card-header{
      padding:16px 20px;border-bottom:1px solid var(--border);
      display:flex;align-items:center;justify-content:between;gap:12px;
    }
    .admin-card-title{font-size:0.88rem;font-weight:800;color:var(--text);}
    .admin-card-body{padding:20px;}

    /* STAT CARDS */
    .stat-card{
      background:#fff;border-radius:16px;
      border:1px solid var(--border);
      padding:20px;transition:box-shadow 0.2s;
    }
    .stat-card:hover{box-shadow:0 4px 20px rgba(37,99,235,0.08);}
    .stat-icon{
      width:44px;height:44px;border-radius:12px;
      display:flex;align-items:center;justify-content:center;
      font-size:1.1rem;margin-bottom:14px;
    }
    .stat-value{font-size:1.5rem;font-weight:800;color:var(--text);letter-spacing:-0.5px;}
    .stat-label{font-size:0.75rem;color:var(--muted);font-weight:500;margin-top:2px;}
    .stat-badge{
      font-size:0.68rem;font-weight:700;padding:3px 8px;
      border-radius:50px;margin-bottom:12px;display:inline-block;
    }

    /* TABLE */
    .admin-table{width:100%;border-collapse:collapse;}
    .admin-table thead tr{background:var(--bg);}
    .admin-table th{
      text-align:left;font-size:0.7rem;font-weight:700;
      color:var(--muted);text-transform:uppercase;letter-spacing:0.8px;
      padding:10px 14px;border-bottom:1px solid var(--border);white-space:nowrap;
    }
    .admin-table td{
      padding:12px 14px;font-size:0.82rem;color:var(--text);
      border-bottom:1px solid #F8FAFC;vertical-align:middle;
    }
    .admin-table tbody tr:hover{background:#FAFBFC;}
    .admin-table tbody tr:last-child td{border-bottom:none;}

    /* BADGE */
    .badge-active{background:#F0FDF4;color:#15803D;font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:50px;}
    .badge-inactive{background:#F1F5F9;color:#64748B;font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:50px;}
    .badge-lunas{background:#F0FDF4;color:#15803D;font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:50px;}
    .badge-dp{background:#EFF6FF;color:#2563EB;font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:50px;}
    .badge-cat{background:var(--light-blue);color:var(--blue);font-size:0.65rem;font-weight:700;padding:3px 9px;border-radius:50px;white-space:nowrap;}

    /* BUTTONS */
    .btn-admin-primary{
      background:var(--blue);color:#fff;border:none;
      border-radius:10px;padding:9px 18px;
      font-size:0.8rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      text-decoration:none;display:inline-flex;align-items:center;gap:6px;
      transition:all 0.2s;
    }
    .btn-admin-primary:hover{background:var(--dark-blue);color:#fff;transform:translateY(-1px);}
    .btn-sm-edit{
      background:#F1F5F9;color:#475569;border:none;border-radius:7px;
      padding:5px 12px;font-size:0.72rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      text-decoration:none;display:inline-flex;align-items:center;gap:4px;
      transition:all 0.2s;cursor:pointer;
    }
    .btn-sm-edit:hover{background:var(--light-blue);color:var(--blue);}
    .btn-sm-del{
      background:#FEF2F2;color:#DC2626;border:none;border-radius:7px;
      padding:5px 12px;font-size:0.72rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      display:inline-flex;align-items:center;gap:4px;
      transition:all 0.2s;cursor:pointer;
    }
    .btn-sm-del:hover{background:#FEE2E2;}
    .btn-sm-invoice{
      background:var(--light-blue);color:var(--blue);border:none;border-radius:7px;
      padding:5px 12px;font-size:0.72rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      text-decoration:none;display:inline-flex;align-items:center;gap:4px;
      transition:all 0.2s;
    }
    .btn-sm-invoice:hover{background:var(--blue);color:#fff;}

    /* FORM */
    .form-label-admin{font-size:0.75rem;font-weight:700;color:#374151;margin-bottom:5px;display:block;}
    .form-control-admin{
      width:100%;border:1.5px solid var(--border);border-radius:10px;
      padding:9px 13px;font-size:0.83rem;
      font-family:'Montserrat',sans-serif;color:var(--text);
      transition:border-color 0.2s,box-shadow 0.2s;background:#fff;
    }
    .form-control-admin:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,0.08);outline:none;}
    .form-select-admin{
      width:100%;border:1.5px solid var(--border);border-radius:10px;
      padding:9px 13px;font-size:0.83rem;
      font-family:'Montserrat',sans-serif;color:var(--text);
      transition:border-color 0.2s;background:#fff;cursor:pointer;
      appearance:none;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%2364748B' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
      background-repeat:no-repeat;background-position:right 12px center;
    }
    .form-select-admin:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,0.08);outline:none;}
    .form-error{font-size:0.72rem;color:#DC2626;margin-top:4px;}

    /* SEARCH BAR */
    .search-input{
      border:1.5px solid var(--border);border-radius:10px;
      padding:8px 14px;font-size:0.8rem;
      font-family:'Montserrat',sans-serif;
      width:220px;transition:border-color 0.2s;
    }
    .search-input:focus{border-color:var(--blue);outline:none;}
    .btn-search{
      background:var(--bg);color:var(--muted);border:1.5px solid var(--border);
      border-left:none;border-radius:0 10px 10px 0;
      padding:8px 13px;cursor:pointer;transition:all 0.2s;
      font-size:0.8rem;
    }
    .btn-search:hover{background:var(--light-blue);color:var(--blue);}

    /* THUMBNAIL */
    .pkg-thumb{
      width:38px;height:38px;border-radius:8px;
      background:var(--bg);overflow:hidden;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;font-size:1.2rem;
    }
    .pkg-thumb img{width:100%;height:100%;object-fit:cover;}

    /* PAGINATION */
    .pagination .page-link{
      font-family:'Montserrat',sans-serif;font-size:0.78rem;font-weight:600;
      color:var(--blue);border-color:var(--border);border-radius:8px;margin:0 2px;
    }
    .pagination .page-item.active .page-link{background:var(--blue);border-color:var(--blue);}

    /* OVERLAY */
    .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:199;}

    @media(max-width:768px){
      .sidebar{transform:translateX(-100%);}
      .sidebar.open{transform:translateX(0);}
      .sidebar-overlay.open{display:block;}
      .main-wrap{margin-left:0;}
      .topbar-toggle{display:block;}
      .stat-value{font-size:1.2rem;}
      .search-input{width:150px;}
      .admin-table th:nth-child(n+4),
      .admin-table td:nth-child(n+4){display:none;}
    }
  </style>
  @stack('styles')
</head>
<body>

<div class="sidebar-overlay" id="overlay" onclick="closeSidebar()"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <img src="{{ asset('images/logo.png') }}" class="sidebar-logo" alt="Logo"
         onerror="this.style.display='none'">
    <div>
      <div class="sidebar-brand">MTH <span>Admin</span></div>
    </div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-section-label">Menu Utama</div>
    <a href="{{ route('admin.dashboard') }}"
       class="sidebar-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
      <i class="fas fa-chart-pie"></i> Dashboard
    </a>
    <a href="{{ route('admin.packages.index') }}"
       class="sidebar-link {{ request()->routeIs('admin.packages.*') ? 'active' : '' }}">
      <i class="fas fa-suitcase"></i> Paket Tour
    </a>
    <a href="{{ route('admin.transactions.index') }}"
       class="sidebar-link {{ request()->routeIs('admin.transactions.*') ? 'active' : '' }}">
      <i class="fas fa-file-invoice-dollar"></i> Transaksi
    </a>
  </nav>

  <div class="sidebar-footer">
    <div class="user-info">
      <div class="user-avatar">{{ strtoupper(substr(auth()->user()->name,0,1)) }}</div>
      <div style="min-width:0;">
        <div class="user-name">{{ auth()->user()->name }}</div>
        <div class="user-email">{{ auth()->user()->email }}</div>
      </div>
    </div>
    <form action="{{ route('admin.logout') }}" method="POST">
      @csrf
      <button type="submit" class="btn-logout">
        <i class="fas fa-right-from-bracket"></i> Keluar
      </button>
    </form>
  </div>
</aside>

<!-- MAIN -->
<div class="main-wrap">
  <header class="topbar">
    <button class="topbar-toggle" onclick="openSidebar()"><i class="fas fa-bars"></i></button>
    <div class="page-title-wrap">
      <div class="page-title">@yield('page-title','Dashboard')</div>
      <div class="page-sub">@yield('page-sub','Mahessa Trans Holiday')</div>
    </div>
    <div class="topbar-right">
      <a href="{{ route('home') }}" target="_blank" class="btn-view-web">
        <i class="fas fa-arrow-up-right-from-square"></i>
        <span class="d-none d-sm-inline">Lihat Website</span>
      </a>
    </div>
  </header>

  <div class="main-content">
    @if(session('success'))
    <div class="alert-success-custom">
      <i class="fas fa-circle-check"></i> {{ session('success') }}
    </div>
    @endif
    @yield('content')
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script>
  function openSidebar(){
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('open');
  }
  function closeSidebar(){
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  }
</script>
@stack('scripts')
</body>
</html>
