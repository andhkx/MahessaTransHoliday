@extends('admin.layout')
@section('title', $package->exists ? 'Edit Paket' : 'Tambah Paket')
@section('page-title', $package->exists ? 'Edit Paket Tour' : 'Tambah Paket Tour')
@section('page-sub','Isi detail paket yang ditampilkan di website')

@section('content')
<div style="max-width:580px;">
  <div class="admin-card">
    <div class="admin-card-header">
      <span class="admin-card-title">
        <i class="fas fa-suitcase me-2" style="color:#2563EB;"></i>
        {{ $package->exists ? 'Edit Paket' : 'Paket Baru' }}
      </span>
    </div>
    <div class="admin-card-body">

      @if($errors->any())
      <div style="background:#FEF2F2;border:1px solid #FECACA;color:#DC2626;border-radius:10px;padding:10px 14px;font-size:0.78rem;margin-bottom:18px;">
        <i class="fas fa-circle-exclamation me-2"></i>
        @foreach($errors->all() as $e) {{ $e }}<br> @endforeach
      </div>
      @endif

      <form action="{{ $package->exists ? route('admin.packages.update',$package) : route('admin.packages.store') }}"
            method="POST" enctype="multipart/form-data">
        @csrf
        @if($package->exists) @method('PUT') @endif

        <div class="mb-3">
          <label class="form-label-admin">Nama Paket <span style="color:#DC2626;">*</span></label>
          <input type="text" name="title" value="{{ old('title',$package->title) }}"
                 class="form-control-admin" placeholder="Contoh: Open Trip Pangandaran 2D1N">
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Kategori <span style="color:#DC2626;">*</span></label>
          <select name="category" class="form-select-admin">
            <option value="">-- Pilih Kategori --</option>
            @foreach($categories as $cat)
            <option value="{{ $cat }}" {{ old('category',$package->category)===$cat ? 'selected' : '' }}>{{ $cat }}</option>
            @endforeach
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Deskripsi <span style="color:#DC2626;">*</span></label>
          <textarea name="description" rows="4" class="form-control-admin"
                    placeholder="Jelaskan detail paket, fasilitas yang termasuk...">{{ old('description',$package->description) }}</textarea>
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Harga (Rp) <span style="color:#DC2626;">*</span></label>
          <input type="number" name="price" value="{{ old('price',$package->price) }}"
                 class="form-control-admin" placeholder="455000" min="0">
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Foto Paket</label>
          @if($package->exists && $package->image_path)
          <div class="mb-2">
            <img src="{{ $package->image_url }}" style="height:80px;border-radius:10px;object-fit:cover;">
            <div style="font-size:0.72rem;color:#94A3B8;margin-top:4px;">Upload baru untuk mengganti.</div>
          </div>
          @endif
          <input type="file" name="image" accept="image/*" class="form-control-admin" style="padding:7px;">
          <div style="font-size:0.72rem;color:#94A3B8;margin-top:4px;">JPG, PNG, WEBP. Maks 5MB.</div>
        </div>

        <div class="mb-4 d-flex align-items-center gap-2">
          <input type="checkbox" id="is_active" name="is_active" value="1"
                 {{ old('is_active',$package->is_active??true) ? 'checked' : '' }}
                 style="width:16px;height:16px;accent-color:#2563EB;">
          <label for="is_active" style="font-size:0.82rem;color:#374151;font-weight:600;cursor:pointer;">Tampilkan di website (aktif)</label>
        </div>

        <div class="d-flex align-items-center gap-3">
          <button type="submit" class="btn-admin-primary">
            <i class="fas fa-floppy-disk"></i>
            {{ $package->exists ? 'Simpan Perubahan' : 'Tambah Paket' }}
          </button>
          <a href="{{ route('admin.packages.index') }}" style="font-size:0.8rem;color:#64748B;text-decoration:none;">Batal</a>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection
