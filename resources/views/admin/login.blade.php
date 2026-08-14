<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Admin — Mahessa Trans Holiday</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{
      font-family:'Montserrat',sans-serif;
      min-height:100vh;
      background:linear-gradient(160deg,#0F172A 0%,#1E3A5F 50%,#1D4ED8 100%);
      display:flex;align-items:center;justify-content:center;
      padding:20px; position:relative; overflow:hidden;
    }
    body::before{
      content:'';position:absolute;
      width:500px;height:500px;border-radius:50%;
      background:radial-gradient(circle,rgba(37,99,235,0.25) 0%,transparent 70%);
      top:-100px;right:-100px;
    }
    body::after{
      content:'';position:absolute;
      width:350px;height:350px;border-radius:50%;
      background:radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%);
      bottom:-80px;left:-60px;
    }
    .login-wrap{position:relative;z-index:2;width:100%;max-width:400px;}
    .brand-top{text-align:center;margin-bottom:28px;}
    .brand-top img{height:52px;margin-bottom:10px;}
    .brand-top .brand-name{
      font-size:1.15rem;font-weight:800;color:#fff;letter-spacing:-0.3px;
    }
    .brand-top .brand-sub{font-size:0.78rem;color:rgba(255,255,255,0.5);margin-top:2px;}
    .login-card{
      background:#fff;border-radius:20px;
      padding:32px 28px;
      box-shadow:0 24px 64px rgba(0,0,0,0.25);
    }
    .login-card h5{font-size:1rem;font-weight:800;color:#0F172A;margin-bottom:4px;}
    .login-card .sub{font-size:0.8rem;color:#64748B;margin-bottom:24px;}
    .form-label{font-size:0.78rem;font-weight:700;color:#374151;margin-bottom:5px;}
    .form-control{
      border:1.5px solid #E2E8F0;border-radius:12px;
      padding:10px 14px;font-size:0.85rem;
      font-family:'Montserrat',sans-serif;
      transition:border-color 0.2s,box-shadow 0.2s;
    }
    .form-control:focus{
      border-color:#2563EB;
      box-shadow:0 0 0 3px rgba(37,99,235,0.1);
      outline:none;
    }
    .input-group .form-control{border-radius:12px 0 0 12px !important;}
    .btn-toggle-pw{
      border:1.5px solid #E2E8F0;border-left:none;
      border-radius:0 12px 12px 0;
      background:#F8FAFC;color:#64748B;
      padding:10px 14px;cursor:pointer;
      transition:all 0.2s;
    }
    .btn-toggle-pw:hover{background:#EFF6FF;color:#2563EB;}
    .btn-login{
      width:100%;background:#2563EB;color:#fff;
      border:none;border-radius:12px;
      padding:12px;font-size:0.9rem;font-weight:700;
      font-family:'Montserrat',sans-serif;
      transition:all 0.3s;
      box-shadow:0 4px 16px rgba(37,99,235,0.35);
    }
    .btn-login:hover{background:#1D4ED8;transform:translateY(-1px);}
    .alert-error{
      background:#FEF2F2;border:1px solid #FECACA;
      color:#DC2626;border-radius:10px;
      padding:10px 14px;font-size:0.8rem;
      display:flex;align-items:center;gap:8px;
      margin-bottom:18px;
    }
    .form-check-input:checked{background-color:#2563EB;border-color:#2563EB;}
    .form-check-label{font-size:0.78rem;color:#64748B;}
    .back-link{
      display:block;text-align:center;margin-top:20px;
      font-size:0.78rem;color:rgba(255,255,255,0.5);
      text-decoration:none;transition:color 0.2s;
    }
    .back-link:hover{color:rgba(255,255,255,0.85);}
  </style>
</head>
<body>
  <div class="login-wrap">
    <div class="brand-top">
      <img src="{{ asset('images/logo.png') }}" alt="Logo"
           onerror="this.style.display='none'">
      <div class="brand-name">Mahessa Trans Holiday</div>
      <div class="brand-sub">Admin Dashboard</div>
    </div>

    <div class="login-card">
      <h5>Selamat Datang 👋</h5>
      <p class="sub">Masuk ke panel admin untuk mengelola paket & transaksi</p>

      @if($errors->any())
      <div class="alert-error">
        <i class="fas fa-circle-exclamation"></i>
        {{ $errors->first() }}
      </div>
      @endif

      <form action="{{ route('admin.login.submit') }}" method="POST">
        @csrf
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" name="email" value="{{ old('email') }}"
                 class="form-control" placeholder="admin@mahessatrans.com" required autofocus>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <div class="input-group">
            <input type="password" name="password" id="pw"
                   class="form-control" placeholder="••••••••" required>
            <button type="button" class="btn-toggle-pw" onclick="togglePw()">
              <i class="fas fa-eye" id="pw-icon"></i>
            </button>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mb-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="remember" id="remember">
            <label class="form-check-label" for="remember">Ingat saya</label>
          </div>
        </div>
        <button type="submit" class="btn-login">
          <i class="fas fa-right-to-bracket me-2"></i>Masuk ke Dashboard
        </button>
      </form>
    </div>

    <a href="{{ route('home') }}" class="back-link">
      <i class="fas fa-arrow-left me-1"></i> Kembali ke Website
    </a>
  </div>

  <script>
    function togglePw(){
      const pw = document.getElementById('pw');
      const ic = document.getElementById('pw-icon');
      pw.type = pw.type === 'password' ? 'text' : 'password';
      ic.className = pw.type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    }
  </script>
</body>
</html>
