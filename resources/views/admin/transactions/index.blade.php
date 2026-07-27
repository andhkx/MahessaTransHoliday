@extends('admin.layout')
@section('title','Transaksi')
@section('page-title','Manajemen Transaksi')
@section('page-sub','Input dan pantau semua pemesanan via WhatsApp')

@section('content')
<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
  <form action="{{ route('admin.transactions.index') }}" method="GET" style="display:flex;">
    <input type="text" name="search" value="{{ request('search') }}"
           class="search-input" placeholder="Cari nama / invoice..." style="border-radius:10px 0 0 10px;">
    <button type="submit" class="btn-search"><i class="fas fa-search"></i></button>
  </form>
  <a href="{{ route('admin.transactions.create') }}" class="btn-admin-primary">
    <i class="fas fa-plus"></i> Input Transaksi
  </a>
</div>

<div class="admin-card">
  <div class="table-responsive">
    <table class="admin-table">
      <thead>
        <tr>
          <th>Invoice</th>
          <th>Pelanggan</th>
          <th>Paket</th>
          <th>Tgl Booking</th>
          <th>Harga</th>
          <th>Status</th>
          <th style="text-align:right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        @forelse($transactions as $trx)
        <tr>
          <td>
            <div style="font-family:monospace;font-size:0.75rem;font-weight:700;color:#2563EB;">{{ $trx->invoice_number }}</div>
            <div style="font-size:0.68rem;color:#94A3B8;">{{ $trx->created_at->format('d M Y') }}</div>
          </td>
          <td>
            <div style="font-weight:700;font-size:0.82rem;">{{ $trx->customer_name }}</div>
            <div style="font-size:0.72rem;color:#94A3B8;">{{ $trx->customer_phone }}</div>
          </td>
          <td style="font-size:0.8rem;max-width:140px;">{{ Str::limit($trx->package->title ?? '—', 30) }}</td>
          <td style="font-size:0.8rem;white-space:nowrap;">{{ $trx->booking_date->format('d M Y') }}</td>
          <td style="font-weight:700;font-size:0.82rem;">{{ $trx->formatted_price }}</td>
          <td>
            @if($trx->status === 'Lunas')
              <span class="badge-lunas">Lunas</span>
            @else
              <span class="badge-dp">DP</span>
            @endif
          </td>
          <td>
            <div class="d-flex justify-content-end gap-1 flex-wrap">
              <a href="{{ route('admin.transactions.invoice',$trx) }}" class="btn-sm-invoice">
                <i class="fas fa-file-pdf"></i> <span class="d-none d-md-inline">Invoice</span>
              </a>
              <a href="{{ route('admin.transactions.edit',$trx) }}" class="btn-sm-edit">
                <i class="fas fa-pen"></i>
              </a>
              <form action="{{ route('admin.transactions.destroy',$trx) }}" method="POST"
                    onsubmit="return confirm('Hapus transaksi ini?')">
                @csrf @method('DELETE')
                <button type="submit" class="btn-sm-del"><i class="fas fa-trash"></i></button>
              </form>
            </div>
          </td>
        </tr>
        @empty
        <tr>
          <td colspan="7" style="text-align:center;padding:40px;color:#94A3B8;font-size:0.82rem;">
            Belum ada transaksi. <a href="{{ route('admin.transactions.create') }}" style="color:#2563EB;">Input sekarang</a>
          </td>
        </tr>
        @endforelse
      </tbody>
    </table>
  </div>
  @if($transactions->hasPages())
  <div style="padding:14px 20px;border-top:1px solid #F1F5F9;">
    {{ $transactions->links() }}
  </div>
  @endif
</div>
@endsection
