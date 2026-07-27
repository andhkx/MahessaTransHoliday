<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    // Method untuk Homepage (Sudah ada, kita pastikan eager loading)
    public function index()
    {
        // Ambil paket yang aktif saja
        $packages = Package::where('is_active', 1)->latest()->get();
        return view('frontend.index', compact('packages'));
    }

    // Method BARU untuk Halaman Detail SEO
    public function show($slug)
    {
        // Cari paket berdasarkan slug, jika tidak ada tampilkan 404
        $package = Package::where('slug', $slug)
                          ->where('is_active', 1)
                          ->firstOrFail();

        return view('frontend.package-detail', compact('package'));
    }
    public function filter(Request $request)
    {
        // Tangkap kata kunci yang diklik/dikirim oleh pengunjung
        // Bisa dari parameter 'category', 'kategori', atau 'search'
        $keyword = $request->input('category') ?? $request->input('search') ?? $request->input('q');

        // Mulai pencarian pada paket yang statusnya aktif
        $query = \App\Models\Package::where('is_active', 1);

        // Jika ada kata kunci, saring berdasarkan Kategori atau Nama Paket
        if ($keyword) {
            $query->where(function($q) use ($keyword) {
                $q->where('category', 'LIKE', "%{$keyword}%")
                  ->orWhere('title', 'LIKE', "%{$keyword}%");
            });
        }

        // Ambil hasil saringannya
        $packages = $query->latest()->get();

        // Kembalikan ke halaman utama (index) dengan membawa data yang sudah disaring
        return view('frontend.index', compact('packages'));
    }

}
