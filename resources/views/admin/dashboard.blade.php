@extends('admin.layout')
@section('title','Dashboard')
@section('page-title','Dashboard')
@section('page-sub','Ringkasan performa Mahessa Trans Holiday')

@section('content')
<div class="row g-3 mb-4">
  <div class="col-6 col-md-4">
    <div class="stat-card">
      <div class="stat-icon" style="background:#EFF6FF;color:#2563EB;"><i class="fas fa-sack-dollar"></i></div>
      <div class="stat-badge" style="background:#EFF6FF;color:#2563EB;">Lunas</div>
      <div class="stat-value" style="font-size:1.1rem;">Rp {{ number_format($totalRevenue,0,',','.') }}</div>
      <div class="stat-label">Total Pendapatan</div>
    </div>
  </div>
  <div class="col-6 col-md-4">
    <div class="stat-card">
      <div class="stat-icon" style="background:#F5F3FF;color:#7C3AED;"><i class="fas fa-file-lines"></i></div>
      <div class="stat-badge" style="background:#F5F3FF;color:#7C3AED;">Total</div>
      <div class="stat-value">{{ $totalBookings }}</div>
      <div class="stat-label">Total Pemesanan</div>
    </div>
  </div>
  <div class="col-6 col-md-4">
    <div class="stat-card">
      <div class="stat-icon" style="background:#FFFBEB;color:#D97706;"><i class="fas fa-suitcase"></i></div>
      <div class="stat-badge" style="background:#FFFBEB;color:#D97706;">Aktif</div>
      <div class="stat-value">{{ $activePackages }}</div>
      <div class="stat-label">Paket Aktif</div>
    </div>
  </div>
</div>

<div class="row g-3">
  <div class="col-12 col-lg-7">
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title"><i class="fas fa-chart-line me-2" style="color:#2563EB;"></i>Pendapatan Bulanan {{ date('Y') }}</span>
      </div>
      <div class="admin-card-body">
        <canvas id="revenueChart" height="130"></canvas>
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-5">
    <div class="admin-card">
      <div class="admin-card-header">
        <span class="admin-card-title"><i class="fas fa-trophy me-2" style="color:#D97706;"></i>Paket Terlaris</span>
      </div>
      <div class="admin-card-body">
        <canvas id="topChart"></canvas>
      </div>
    </div>
  </div>
</div>
@endsection

@push('scripts')
<script>
fetch("{{ route('admin.dashboard.chart-data') }}")
  .then(r=>r.json())
  .then(data=>{
    new Chart(document.getElementById('revenueChart'),{
      type:'line',
      data:{
        labels:data.revenue.labels,
        datasets:[{
          label:'Pendapatan',data:data.revenue.data,
          borderColor:'#2563EB',backgroundColor:'rgba(37,99,235,0.07)',
          borderWidth:2.5,tension:0.4,fill:true,
          pointBackgroundColor:'#2563EB',pointRadius:4,pointHoverRadius:6,
        }]
      },
      options:{
        responsive:true,
        plugins:{legend:{display:false}},
        scales:{
          y:{beginAtZero:true,grid:{color:'#F1F5F9'},
            ticks:{callback:v=>'Rp '+(v/1000000).toFixed(1)+'jt',font:{size:10,family:'Montserrat'},color:'#94A3B8'}},
          x:{grid:{display:false},ticks:{font:{size:10,family:'Montserrat'},color:'#94A3B8'}}
        }
      }
    });
    new Chart(document.getElementById('topChart'),{
      type:'doughnut',
      data:{
        labels:data.top_packages.labels,
        datasets:[{
          data:data.top_packages.data,
          backgroundColor:['#2563EB','#3B82F6','#60A5FA','#93C5FD','#BFDBFE'],
          borderWidth:0,hoverOffset:5,
        }]
      },
      options:{
        responsive:true,cutout:'62%',
        plugins:{legend:{position:'bottom',labels:{font:{size:10,family:'Montserrat'},color:'#475569',padding:10,boxWidth:10}}}
      }
    });
  });
</script>
@endpush
