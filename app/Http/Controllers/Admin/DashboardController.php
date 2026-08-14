<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $totalRevenue   = Transaction::where('status', 'Lunas')->sum('final_price');
        $totalBookings  = Transaction::count();
        $activePackages = Package::where('is_active', true)->count();

        return view('admin.dashboard', compact('totalRevenue', 'totalBookings', 'activePackages'));
    }

    public function chartData()
    {
        $monthly = Transaction::where('status', 'Lunas')
            ->selectRaw('MONTH(created_at) as month, YEAR(created_at) as year, SUM(final_price) as total')
            ->whereYear('created_at', now()->year)
            ->groupByRaw('YEAR(created_at), MONTH(created_at)')
            ->orderByRaw('MONTH(created_at)')
            ->get();

        $labels   = [];
        $revenues = [];
        $monthNames = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

        for ($m = 1; $m <= 12; $m++) {
            $labels[]   = $monthNames[$m - 1];
            $found      = $monthly->firstWhere('month', $m);
            $revenues[] = $found ? (int) $found->total : 0;
        }

        $topPackages = Transaction::select('package_id', DB::raw('COUNT(*) as total'))
            ->with('package:id,title')
            ->groupBy('package_id')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return response()->json([
            'revenue' => [
                'labels' => $labels,
                'data'   => $revenues,
            ],
            'top_packages' => [
                'labels' => $topPackages->map(fn($t) => $t->package->title ?? 'Dihapus')->values(),
                'data'   => $topPackages->pluck('total')->values(),
            ],
        ]);
    }
}
