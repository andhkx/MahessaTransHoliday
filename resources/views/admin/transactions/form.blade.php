@extends('admin.layout')
@section('title', $transaction->exists ? 'Edit Transaksi' : 'Input Transaksi')
@section('page-title', $transaction->exists ? 'Edit Transaksi' : 'Input Transaksi Baru')
@section('page-sub','Input manual pemesanan yang masuk via WhatsApp')

@section('content')
<div style="max-width:580px;">
  <div class="admin-card">
    <div class="admin-card-header">
      <span class="admin-card-title">
        <i class="fas fa-file-invoice-dollar me-2" style="color:#2563EB;"></i>
        {{ $transaction->exists ? 'Edit Transaksi' : 'Transaksi Baru' }}
      </span>
    </div>
    <div class="admin-card-body">

      @if($errors->any())
      <div style="background:#FEF2F2;border:1px solid #FECACA;color:#DC2626;border-radius:10px;padding:10px 14px;font-size:0.78rem;margin-bottom:18px;">
        <i class="fas fa-circle-exclamation me-2"></i>
        @foreach($errors->all() as $e) {{ $e }}<br> @endforeach
      </div>
      @endif

      <form action="{{ $transaction->exists ? route('admin.transactions.update',$transaction) : route('admin.transactions.store') }}"
            method="POST">
        @csrf
        @if($transaction->exists) @method('PUT') @endif

        <div class="mb-3">
          <label class="form-label-admin">Paket Tour <span style="color:#DC2626;">*</span></label>
          <select name="package_id" class="form-select-admin">
            <option value="">-- Pilih Paket --</option>
            @foreach($packages as $pkg)
            <option value="{{ $pkg->id }}" {{ old('package_id',$transaction->package_id)==$pkg->id ? 'selected' : '' }}>
              {{ $pkg->title }} — {{ $pkg->formatted_price }}
            </option>
            @endforeach
          </select>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-12 col-sm-6">
            <label class="form-label-admin">Nama Pelanggan <span style="color:#DC2626;">*</span></label>
            <input type="text" name="customer_name" value="{{ old('customer_name',$transaction->customer_name) }}"
                   class="form-control-admin" placeholder="Nama lengkap">
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label-admin">No. WhatsApp <span style="color:#DC2626;">*</span></label>
            <input type="text" name="customer_phone" value="{{ old('customer_phone',$transaction->customer_phone) }}"
                   class="form-control-admin" placeholder="0895xxxxxxx">
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-12 col-sm-6">
            <label class="form-label-admin">Tanggal Booking <span style="color:#DC2626;">*</span></label>
            <input type="date" name="booking_date"
                   value="{{ old('booking_date', $transaction->exists ? $transaction->booking_date->format('Y-m-d') : '') }}"
                   class="form-control-admin">
          </div>
          <div class="col-12 col-sm-6">
            <label class="form-label-admin">Harga Final (Rp) <span style="color:#DC2626;">*</span></label>
            <input type="number" name="final_price" value="{{ old('final_price',$transaction->final_price) }}"
                   class="form-control-admin" placeholder="455000" min="0">
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label-admin">Status Pembayaran <span style="color:#DC2626;">*</span></label>
          <div class="d-flex gap-4">
            <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:0.82rem;font-weight:600;">
              <input type="radio" name="status" value="DP"
                     {{ old('status',$transaction->status??'DP')==='DP' ? 'checked' : '' }}
                     style="accent-color:#2563EB;width:16px;height:16px;">
              <span class="badge-dp" style="padding:5px 14px;">DP</span>
            </label>
            <label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:0.82rem;font-weight:600;">
              <input type="radio" name="status" value="Lunas"
                     {{ old('status',$transaction->status)==='Lunas' ? 'checked' : '' }}
                     style="accent-color:#2563EB;width:16px;height:16px;">
              <span class="badge-lunas" style="padding:5px 14px;">Lunas</span>
            </label>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
          <button type="submit" class="btn-admin-primary">
            <i class="fas fa-floppy-disk"></i>
            {{ $transaction->exists ? 'Simpan Perubahan' : 'Simpan Transaksi' }}
          </button>
          <a href="{{ route('admin.transactions.index') }}" style="font-size:0.8rem;color:#64748B;text-decoration:none;">Batal</a>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection
