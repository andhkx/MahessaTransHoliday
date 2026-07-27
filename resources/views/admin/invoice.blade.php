<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Invoice {{ $transaction->invoice_number }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 11px;
            color: #0F172A;
            background: #ffffff;
            padding: 32px;
        }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
        .logo-block { }
        .logo-name { font-size: 18px; font-weight: 800; color: #2563EB; letter-spacing: -0.5px; }
        .logo-sub { font-size: 9px; color: #94A3B8; margin-top: 2px; letter-spacing: 0.5px; text-transform: uppercase; }
        .invoice-meta { text-align: right; }
        .invoice-label { font-size: 22px; font-weight: 800; color: #0F172A; letter-spacing: -0.5px; }
        .invoice-number { font-size: 11px; color: #2563EB; font-weight: 600; margin-top: 4px; }
        .invoice-date { font-size: 10px; color: #94A3B8; margin-top: 2px; }
        .divider { height: 1px; background: #E2E8F0; margin: 20px 0; }
        .section-grid { display: flex; gap: 24px; margin-bottom: 24px; }
        .section-box { flex: 1; }
        .section-label { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; margin-bottom: 6px; }
        .section-value { font-size: 12px; font-weight: 600; color: #0F172A; }
        .section-sub { font-size: 10px; color: #64748B; margin-top: 2px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table thead tr { background: #F8FAFC; }
        .table th { text-align: left; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #94A3B8; padding: 8px 10px; border-bottom: 1px solid #E2E8F0; }
        .table th:last-child, .table td:last-child { text-align: right; }
        .table td { padding: 10px 10px; font-size: 11px; color: #0F172A; border-bottom: 1px solid #F1F5F9; }
        .table td .desc { font-size: 9.5px; color: #94A3B8; margin-top: 2px; }
        .total-row { display: flex; justify-content: flex-end; margin-top: 12px; }
        .total-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 14px 20px; min-width: 200px; }
        .total-label { font-size: 9px; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; font-weight: 700; }
        .total-value { font-size: 20px; font-weight: 800; color: #2563EB; margin-top: 3px; }
        .status-watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-35deg);
            font-size: 60px;
            font-weight: 900;
            opacity: 0.035;
            letter-spacing: 4px;
            pointer-events: none;
        }
        .status-watermark.lunas { color: #16a34a; }
        .status-watermark.dp { color: #2563EB; }
        .status-badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .status-badge.lunas { background: #DCFCE7; color: #16a34a; }
        .status-badge.dp { background: #DBEAFE; color: #2563EB; }
        .footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: flex-end; }
        .footer-note { font-size: 9px; color: #94A3B8; max-width: 260px; line-height: 1.5; }
        .footer-brand { text-align: right; font-size: 9px; color: #CBD5E1; }
        .blue-bar { height: 4px; background: #2563EB; border-radius: 2px; margin-bottom: 28px; }
    </style>
</head>
<body>
    <div style="position:relative;">
        <div class="status-watermark {{ strtolower($transaction->status) }}">
            {{ strtoupper($transaction->status) }}
        </div>

        <div class="blue-bar"></div>

        <div class="header">
            <div class="logo-block">
                <div class="logo-name">Mahessa Trans</div>
                <div class="logo-name" style="font-size:14px;color:#0F172A;font-weight:600;">Holiday</div>
                <div class="logo-sub">Travel & Tour Agency · Bandung</div>
            </div>
            <div class="invoice-meta">
                <div class="invoice-label">INVOICE</div>
                <div class="invoice-number">{{ $transaction->invoice_number }}</div>
                <div class="invoice-date">Diterbitkan: {{ $transaction->created_at->format('d F Y') }}</div>
                <div style="margin-top:6px;">
                    <span class="status-badge {{ strtolower($transaction->status) }}">{{ $transaction->status }}</span>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="section-grid">
            <div class="section-box">
                <div class="section-label">Ditagihkan Kepada</div>
                <div class="section-value">{{ $transaction->customer_name }}</div>
                <div class="section-sub">📱 {{ $transaction->customer_phone }}</div>
            </div>
            <div class="section-box">
                <div class="section-label">Tanggal Keberangkatan</div>
                <div class="section-value">{{ $transaction->booking_date->format('d F Y') }}</div>
            </div>
            <div class="section-box" style="text-align:right;">
                <div class="section-label">Kontak Kami</div>
                <div class="section-value">+62 812-3456-7890</div>
                <div class="section-sub">mahessatransholiday@gmail.com</div>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th style="width:50%;">Deskripsi Paket</th>
                    <th>Kategori</th>
                    <th>Harga Paket</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>{{ $transaction->package->title ?? 'Paket Wisata' }}</strong>
                        <div class="desc">1 paket perjalanan wisata lengkap</div>
                    </td>
                    <td style="color:#64748B;">{{ $transaction->package->category ?? '—' }}</td>
                    <td>Rp {{ number_format($transaction->final_price, 0, ',', '.') }}</td>
                    <td><strong>Rp {{ number_format($transaction->final_price, 0, ',', '.') }}</strong></td>
                </tr>
            </tbody>
        </table>

        <div class="total-row">
            <div class="total-box">
                <div class="total-label">Total Pembayaran</div>
                <div class="total-value">Rp {{ number_format($transaction->final_price, 0, ',', '.') }}</div>
                <div style="font-size:9px;color:#94A3B8;margin-top:4px;">
                    Status: <strong style="color:{{ $transaction->status === 'Lunas' ? '#16a34a' : '#2563EB' }};">{{ $transaction->status }}</strong>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="footer-note">
                <strong style="color:#0F172A;">Catatan Pembayaran:</strong><br>
                Transfer ke rekening BCA 1234567890 a/n Mahessa Trans Holiday.<br>
                Harap konfirmasi pembayaran via WhatsApp setelah transfer.<br>
                Invoice ini sah tanpa tanda tangan basah.
            </div>
            <div class="footer-brand">
                <div style="font-size:11px;font-weight:700;color:#2563EB;">Mahessa Trans Holiday</div>
                <div>Bandung, Jawa Barat</div>
                <div>wa.me/6281234567890</div>
            </div>
        </div>
    </div>
</body>
</html>
