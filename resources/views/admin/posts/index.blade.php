<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Blog - Admin Mahessa Trans Holiday</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        body { 
            background-color: #F8FAFC; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        }
        .admin-header { 
            background: #0F172A; 
            color: white; 
            padding: 15px 0; 
            margin-bottom: 30px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .card { 
            border: none; 
            border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.03); 
            overflow: hidden;
        }
        .table > :not(caption) > * > * {
            vertical-align: middle;
            padding: 1rem;
        }
        .btn-action {
            width: 32px;
            height: 32px;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
        }
    </style>
</head>
<body>

<div class="admin-header">
    <div class="container d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold">
            <i class="fas fa-plane-departure me-2" style="color: #3B82F6;"></i> Admin Panel
        </h5>
        <a href="{{ route('home') }}" class="btn btn-outline-light btn-sm rounded-pill px-3" target="_blank">
            <i class="fas fa-globe me-1"></i> Lihat Website
        </a>
    </div>
</div>

<div class="container pb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h2 class="h4 fw-bold mb-1">Kelola Artikel Blog</h2>
            <p class="text-muted small mb-0">Tulis, edit, dan kelola postingan blog untuk pengunjung website Anda.</p>
        </div>
        <a href="{{ route('posts.create') }}" class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">
            <i class="fas fa-plus me-2"></i> Tulis Artikel Baru
        </a>
    </div>

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm rounded-3" role="alert">
            <i class="fas fa-check-circle me-2"></i> {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <div class="card">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="px-4 text-secondary" style="width: 5%;">No</th>
                        <th class="text-secondary" style="width: 15%;">Thumbnail</th>
                        <th class="text-secondary" style="width: 35%;">Judul Artikel</th>
                        <th class="text-secondary" style="width: 10%;">Status</th>
                        <th class="text-secondary" style="width: 15%;">Tanggal</th>
                        <th class="px-4 text-end text-secondary" style="width: 20%;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($posts as $index => $post)
                    <tr>
                        <td class="px-4 text-muted">{{ $posts->firstItem() + $index }}</td>
                        <td>
                            @if($post->image_path)
                                <img src="{{ asset('storage/' . $post->image_path) }}" alt="Gambar" style="width: 80px; height: 50px; object-fit: cover; border-radius: 6px;">
                            @else
                                <div class="bg-light text-muted d-flex align-items-center justify-content-center border" style="width: 80px; height: 50px; border-radius: 6px; font-size: 0.7rem;">
                                    <i class="fas fa-image me-1"></i> Kosong
                                </div>
                            @endif
                        </td>
                        <td>
                            <div class="fw-bold text-dark">{{ $post->title }}</div>
                            <a href="{{ route('blog.show', $post->slug) }}" target="_blank" class="text-primary small text-decoration-none">
                                <i class="fas fa-external-link-alt me-1"></i> Lihat Publik
                            </a>
                        </td>
                        <td>
                            @if($post->is_active)
                                <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2 py-1">Di-publish</span>
                            @else
                                <span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 px-2 py-1">Draft</span>
                            @endif
                        </td>
                        <td class="text-muted small">
                            {{ $post->created_at->format('d M Y') }}
                        </td>
                        <td class="px-4 text-end">
                            <a href="{{ route('posts.edit', $post->id) }}" class="btn btn-light btn-action text-primary border shadow-sm" title="Edit Artikel">
                                <i class="fas fa-pen"></i>
                            </a>
                            <form action="{{ route('posts.destroy', $post->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Apakah Anda yakin ingin menghapus artikel ini secara permanen?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-light btn-action text-danger border shadow-sm ms-1" title="Hapus Artikel">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="text-center py-5">
                            <div class="text-muted mb-3">
                                <i class="fas fa-folder-open fa-3x opacity-50"></i>
                            </div>
                            <h5 class="text-dark">Belum ada artikel</h5>
                            <p class="text-muted small mb-0">Silakan klik tombol "Tulis Artikel Baru" untuk mulai mempublikasikan konten.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        
        @if($posts->hasPages())
        <div class="card-footer bg-white border-top py-3">
            {{ $posts->links('pagination::bootstrap-5') }}
        </div>
        @endif
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>