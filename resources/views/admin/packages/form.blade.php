@extends('admin.layout')
@section('title', $package->exists ? 'Edit Paket' : 'Tambah Paket')
@section('page-title', $package->exists ? 'Edit Paket Tour' : 'Tambah Paket Tour')
@section('page-sub','Isi detail paket yang ditampilkan di website')

@section('content')
<div style="max-width:720px;">
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

        <div class="row g-3">
          <div class="col-md-8">
            <label class="form-label-admin">Nama Paket <span style="color:#DC2626;">*</span></label>
            <input type="text" name="title" value="{{ old('title',$package->title) }}"
                   class="form-control-admin" placeholder="Contoh: Open Trip Pangandaran 2D1N">
          </div>
          <div class="col-md-4">
            <label class="form-label-admin">Harga (Rp) <span style="color:#DC2626;">*</span></label>
            <input type="number" name="price" value="{{ old('price',$package->price) }}"
                   class="form-control-admin" placeholder="455000" min="0">
          </div>
        </div>

        <div class="row g-3 mt-1">
          <div class="col-md-6">
            <label class="form-label-admin">Jenis Layanan <span style="color:#DC2626;">*</span></label>
            <select name="service_type" class="form-select-admin" id="serviceTypeSelect">
              <option value="">-- Pilih Jenis --</option>
              @foreach($serviceTypes as $type)
              <option value="{{ $type }}" {{ old('service_type',$package->service_type)===$type ? 'selected' : '' }}>{{ $type }}</option>
              @endforeach
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label-admin">Destinasi</label>
            <input type="text" name="destination" value="{{ old('destination',$package->destination) }}"
                   class="form-control-admin" placeholder="Contoh: Bandung, Lembang, Bali" list="destinationList">
            <datalist id="destinationList">
              @foreach($destinations as $dest)
              <option value="{{ $dest }}">
              @endforeach
            </datalist>
          </div>
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label-admin">Kategori (Filter Lama) <span style="color:#DC2626;">*</span></label>
          <select name="category" class="form-select-admin">
            <option value="">-- Pilih Kategori --</option>
            @php
              $categories = ['Rental Mobil','Charter Drop','City Tour','Open Trip','Tour Lembang','Tour Ciwidey','Tour Bandung','Tour Pangandaran','Tour Jogja','Tour Bromo','Tour Bali','Drop-off / Pick-up Bandara'];
            @endphp
            @foreach($categories as $cat)
            <option value="{{ $cat }}" {{ old('category',$package->category)===$cat ? 'selected' : '' }}>{{ $cat }}</option>
            @endforeach
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Deskripsi <span style="color:#DC2626;">*</span></label>
          <textarea name="description" rows="5" class="form-control-admin"
                    placeholder="Jelaskan detail paket, fasilitas yang termasuk...">{{ old('description',$package->description) }}</textarea>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label-admin">Durasi (Hari)</label>
            <input type="number" name="duration_days" value="{{ old('duration_days',$package->duration_days ?? 1) }}"
                   class="form-control-admin" min="1" max="30">
          </div>
          <div class="col-md-4">
            <label class="form-label-admin">Min. Pax</label>
            <input type="number" name="min_pax" value="{{ old('min_pax',$package->min_pax ?? 1) }}"
                   class="form-control-admin" min="1">
          </div>
          <div class="col-md-4">
            <label class="form-label-admin">Max. Pax</label>
            <input type="number" name="max_pax" value="{{ old('max_pax',$package->max_pax ?? 10) }}"
                   class="form-control-admin" min="1">
          </div>
        </div>

        <div class="mb-3 mt-3">
          <label class="form-label-admin">Fasilitas Termasuk <small style="color:#64748B;">(pisahkan dengan Enter)</small></label>
          <textarea name="includes[]" rows="3" class="form-control-admin" placeholder="Mobil AC&#10;Driver&#10;BBM&#10;Tol & Parkir">{{ old('includes') ? implode("\n", old('includes')) : ($package->includes ? implode("\n", $package->includes) : '') }}</textarea>
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Tidak Termasuk <small style="color:#64748B;">(pisahkan dengan Enter)</small></label>
          <textarea name="excludes[]" rows="2" class="form-control-admin" placeholder="Tiket masuk wisata&#10;Makan pribadi">{{ old('excludes') ? implode("\n", old('excludes')) : ($package->excludes ? implode("\n", $package->excludes) : '') }}</textarea>
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

        <div class="mb-3">
          <label class="form-label-admin">Meta Title <small style="color:#64748B;">(SEO)</small></label>
          <input type="text" name="meta_title" value="{{ old('meta_title',$package->meta_title) }}"
                 class="form-control-admin" placeholder="Otomatis dari judul jika dikosongkan">
        </div>

        <div class="mb-3">
          <label class="form-label-admin">Meta Description <small style="color:#64748B;">(SEO)</small></label>
          <textarea name="meta_description" rows="2" class="form-control-admin"
                    placeholder="Deskripsi singkat untuk Google (max 160 karakter)">{{ old('meta_description',$package->meta_description) }}</textarea>
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
