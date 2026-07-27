<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Artikel - Admin Mahessa</title>
    
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
        }
        .form-label {
            font-weight: 700;
            color: #334155;
            font-size: 0.9rem;
            margin-bottom: 8px;
        }
        .form-control, .form-select {
            border-radius: 8px;
            padding: 12px 16px;
            border: 1px solid #E2E8F0;
        }
        .form-control:focus, .form-select:focus {
            border-color: #3B82F6;
            box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
        }
        .img-preview {
            max-width: 200px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
            margin-top: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
            <h2 class="h4 fw-bold mb-1">Edit Artikel</h2>
            <p class="text-muted small mb-0">Perbarui konten atau ganti gambar artikel blog Anda.</p>
        </div>
        <a href="{{ route('posts.index') }}" class="btn btn-light border shadow-sm rounded-pill px-4 fw-bold text-secondary">
            <i class="fas fa-arrow-left me-2"></i> Kembali
        </a>
    </div>

    @if ($errors->any())
        <div class="alert alert-danger rounded-3 shadow-sm border-0 mb-4">
            <div class="fw-bold mb-2"><i class="fas fa-exclamation-triangle me-2"></i>Terdapat kesalahan:</div>
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="card p-4 p-md-5">
        <form action="{{ route('posts.update', $post->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT') <div class="row g-4">
                <div class="col-12">
                    <label class="form-label">Judul Artikel <span class="text-danger">*</span></label>
                    <input type="text" name="title" class="form-control" value="{{ old('title', $post->title) }}" required>
                </div>

                <div class="col-12">
                    <label class="form-label">Isi Artikel <span class="text-danger">*</span></label>
                    <div class="text-muted small mb-2"><i class="fas fa-info-circle me-1"></i>Anda dapat menggunakan tag HTML dasar seperti &lt;b&gt;, &lt;i&gt;, &lt;br&gt; atau &lt;p&gt; untuk merapikan teks.</div>
                    <textarea name="body" class="form-control" rows="12" required>{{ old('body', $post->body) }}</textarea>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Ganti Foto Thumbnail (Opsional)</label>
                    <input type="file" name="image" class="form-control" accept="image/jpeg,image/png,image/jpg,image/webp">
                    <div class="form-text small mt-2">Biarkan kosong jika tidak ingin mengganti foto saat ini.</div>
                    
                    @if($post->image_path)
                        <div class="mt-3">
                            <div class="text-muted small mb-1 fw-bold">Foto Saat Ini:</div>
                            <img src="{{ asset('storage/' . $post->image_path) }}" alt="Current Thumbnail" class="img-preview">
                        </div>
                    @endif
                </div>

                <div class="col-md-6">
                    <label class="form-label">Status Publikasi</label>
                    <select name="is_active" class="form-select">
                        <option value="1" {{ old('is_active', $post->is_active) == '1' ? 'selected' : '' }}>🟢 Publish (Langsung tampil di website)</option>
                        <option value="0" {{ old('is_active', $post->is_active) == '0' ? 'selected' : '' }}>⚪ Draft (Simpan dan sembunyikan dulu)</option>
                    </select>
                </div>

                <div class="col-12 mt-5 text-end border-top pt-4">
                    <button type="submit" class="btn btn-success rounded-pill px-5 py-2 fw-bold shadow-sm">
                        <i class="fas fa-save me-2"></i> Simpan Perubahan
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>