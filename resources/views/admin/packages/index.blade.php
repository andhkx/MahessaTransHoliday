@extends('admin.layout')
@section('title','Paket Tour')
@section('page-title','Manajemen Paket Tour')
@section('page-sub','Kelola semua paket wisata')

@section('content')
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <form action="{{ route('admin.packages.index') }}" method="GET" style="display:flex;">
    <input type="text" name="search" value="{{ request('search') }}"
           class="search-input" placeholder="Cari paket..." style="border-radius:10px 0 0 10px;">
    <button type="submit" class="btn-search"><i class="fas fa-search"></i></button>
  </form>
  <a href="{{ route('admin.packages.create') }}" class="btn-admin-primary">
    <i class="fas fa-plus"></i> Tambah Paket
  </a>
</div>

<div class="admin-card">
  <div class="table-responsive">
    <table class="admin-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Paket</th>
          <th>Kategori</th>
          <th>Harga</th>
          <th>Status</th>
          <th style="text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        @forelse($packages as $pkg)
        <tr>
          <td style="color:#94A3B8;font-size:0.75rem;">{{ $packages->firstItem()+$loop->index }}</td>
          <td>
            <div class="d-flex align-items-center gap-10" style="gap:10px;">
              <div class="pkg-thumb">
                @if($pkg->image_path)
                  <img src="{{ $pkg->image_url }}" alt="">
                @else
                  {{ match(true){
                    str_contains($pkg->category,'Lembang')=>'🌿',
                    str_contains($pkg->category,'Ciwidey')=>'🌸',
                    str_contains($pkg->category,'Bandung')=>'🏙️',
                    str_contains($pkg->category,'Pangandaran')=>'🌊',
                    str_contains($pkg->category,'Jogja')=>'🏛️',
                    str_contains($pkg->category,'Bromo')=>'🌋',
                    str_contains($pkg->category,'Bali')=>'🏝️',
                    str_contains($pkg->category,'Bandara')=>'✈️',
                    str_contains($pkg->category,'Rental')=>'🚗',
                    str_contains($pkg->category,'Charter')=>'🚐',
                    str_contains($pkg->category,'Open')=>'👥',
                    default=>'🏙️'
                  } }}
                @endif
              </div>
              <div>
                <div style="font-weight:700;font-size:0.82rem;">{{ $pkg->title }}</div>
                <div style="font-size:0.72rem;color:#94A3B8;">{{ Str::limit($pkg->description,45) }}</div>
              </div>
            </div>
          </td>
          <td><span class="badge-cat">{{ $pkg->category }}</span></td>
          <td style="font-weight:700;font-size:0.82rem;">{{ $pkg->formatted_price }}</td>
          <td>
            @if($pkg->is_active)
              <span class="badge-active">Aktif</span>
            @else
              <span class="badge-inactive">Nonaktif</span>
            @endif
          </td>
          <td>
            <div class="d-flex justify-content-end gap-1">
              <a href="{{ route('admin.packages.edit',$pkg) }}" class="btn-sm-edit">
                <i class="fas fa-pen"></i> Edit
              </a>
              <form action="{{ route('admin.packages.destroy',$pkg) }}" method="POST"
                    onsubmit="return confirm('Hapus paket ini?')">
                @csrf @method('DELETE')
                <button type="submit" class="btn-sm-del"><i class="fas fa-trash"></i></button>
              </form>
            </div>
          </td>
        </tr>
        @empty
        <tr>
          <td colspan="6" style="text-align:center;padding:40px;color:#94A3B8;font-size:0.82rem;">
            Belum ada paket. <a href="{{ route('admin.packages.create') }}" style="color:#2563EB;">Tambah sekarang</a>
          </td>
        </tr>
        @endforelse
      </tbody>
    </table>
  </div>
  @if($packages->hasPages())
  <div style="padding:14px 20px;border-top:1px solid #F1F5F9;">
    {{ $packages->links() }}
  </div>
  @endif
</div>
@endsection
