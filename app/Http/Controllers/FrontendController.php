<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    // Method untuk Homepage
    public function index()
    {
        $packages = Package::where('is_active', 1)->latest()->get();
        return view('frontend.index', compact('packages'));
    }

    // Method BARU untuk Halaman Detail SEO
    public function show($slug)
    {
        $package = Package::where('slug', $slug)
                          ->where('is_active', 1)
                          ->firstOrFail();

        return view('frontend.package-detail', compact('package'));
    }

    public function filter(Request $request)
    {
        $keyword = $request->input('category') ?? $request->input('search') ?? $request->input('q');

        $query = \App\Models\Package::where('is_active', 1);

        if ($keyword) {
            $query->where(function($q) use ($keyword) {
                $q->where('category', 'LIKE', "%{$keyword}%")
                  ->orWhere('title', 'LIKE', "%{$keyword}%");
            });
        }

        $packages = $query->latest()->get();

        return view('frontend.index', compact('packages'));
    }

    // ========================================================
    // SEO LANDING PAGES
    // ========================================================

    private function getPackagesForLanding($filters)
    {
        return Package::where('is_active', 1)
            ->when(isset($filters['service_type']), function($q) use ($filters) {
                $q->where('service_type', $filters['service_type']);
            })
            ->when(isset($filters['destination']), function($q) use ($filters) {
                $q->where('destination', 'LIKE', "%{$filters['destination']}%");
            })
            ->when(isset($filters['category']), function($q) use ($filters) {
                $q->where('category', $filters['category']);
            })
            ->when(isset($filters['title_contains']), function($q) use ($filters) {
                $q->where('title', 'LIKE', "%{$filters['title_contains']}%");
            })
            ->latest()->get();
    }

    // Cimahi - Prioritas Utama
    public function cimahi()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Cimahi']);
        $meta = [
            'title' => 'Sewa Mobil Cimahi Murah | Rental Mobil Cimahi Driver | Mahessa Trans Holiday',
            'description' => 'Sewa mobil di Cimahi harga bersahabat mulai Rp 150.000/hari. Pilihan Innova Reborn, Avanza, Xenia dengan driver profesional. Gratis antar-jemput di area Cimahi & Bandung. Hubungi 0895-3270-77214.',
            'keywords' => 'sewa mobil cimahi, rental mobil cimahi, rental mobil cimahi murah, sewa mobil cimahi driver, sewa innova cimahi, sewa avanza cimahi'
        ];
        $pageTitle = 'Cimahi';
        $pageDescription = 'Sewa mobil Cimahi harga terjangkau mulai Rp 150.000/jam (minimum 5 jam). Innova Reborn, Avanza, Xenia tersedia. Include driver, BBM, tol & parkir. Siap jemput di hotel, stasiun, bandara.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin sewa mobil di Cimahi. Bisa minta penawaran terbaik?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Bandung - Prioritas Utama
    public function bandung()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Bandung']);
        $meta = [
            'title' => 'Sewa Mobil Bandung Murah | Rental Mobil Bandung Driver | Mahessa Trans Holiday',
            'description' => 'Sewa mobil Bandung terpercaya. Armada: Innova Reborn, Hiace, Elf, Avanza, Xenia. Harga mulai Rp 150.000/hari include driver, BBM, tol, parkir. Layanan 24 jam. Hubungi 0895-3270-77214.',
            'keywords' => 'sewa mobil bandung, rental mobil bandung, sewa mobil bandung murah, sewa innova bandung, sewa hiace bandung, rental mobil bandung driver'
        ];
        $pageTitle = 'Bandung';
        $pageDescription = 'Sewa mobil Bandung harga kompetitif dengan armada lengkap: Innova Reborn, Hiace, Avanza, Xenia. Include driver, BBM, tol & parkir. Cocok untuk city tour, rental harian/mingguan, atau perjalanan antar kota.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin sewa mobil di Bandung. Bisa minta list harga dan ketersediaan unit?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Padalarang - Prioritas Utama (Stasiun KCIC)
    public function padalarang()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Padalarang']);
        $meta = [
            'title' => 'Sewa Mobil Padalarang | Drop Stasiun KCIC Padalarang | Mahessa Trans Holiday',
            'description' => 'Layanan charter drop ke Stasiun KCIC Padalarang. Drop-off/Pick-up dari Bandung, Cimahi, Lembang. Harga mulai Rp 200.000. Mobil Innova/Avanza full AC, driver hafal rute tol. Hubungi 0895-3270-77214.',
            'keywords' => 'sewa mobil padalarang, drop stasiun kcic padalarang, charter padalarang, antar jemput stasiun padalarang, sewa mobil ke stasiun padalarang'
        ];
        $pageTitle = 'Padalarang (Stasiun KCIC)';
        $pageDescription = 'Layanan charter drop & antar-jemput Stasiun KCIC Padalarang dari Bandung, Cimahi, Lembang, Sukabumi. Harga terjangkau mulai Rp 200.000. Mobil Innova/Avanza full AC, driver on-time, monitoring jadwal kereta.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin drop ke Stasiun KCIC Padalarang. Berapa harganya dan kapan bisa jemput?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Lembang
    public function lembang()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Lembang']);
        $meta = [
            'title' => 'Paket Tour Lembang Bandung | Sewa Mobil ke Lembang | Mahessa Trans Holiday',
            'description' => 'Paket wisata Lembang Bandung: Farm House, Floating Market, Dusun Bambu, Orchid Forest. Sewa mobil ke Lembang include driver, BBM, tol, parkir. Harga terjangkau. Hubungi 0895-3270-77214.',
            'keywords' => 'paket tour lembang, sewa mobil ke lembang, wisata lembang bandung, tour lembang 1 hari, rental mobil lembang bandung'
        ];
        $pageTitle = 'Lembang';
        $pageDescription = 'Paket wisata Lembang Bandung 1-2 hari: Orchid Forest Cikole, Farm House Susu, Floating Market, Dusun Bambu, Kawah Tangkuban Perahu. Sewa mobil include driver, BBM, tol & parkir.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin paket tour ke Lembang. Tersedia kapan dan berapa harganya?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Ciwidey
    public function ciwidey()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Ciwidey']);
        $meta = [
            'title' => 'Paket Tour Ciwidey | Sewa Mobil ke Ciwidey Kawah Putih | Mahessa Trans Holiday',
            'description' => 'Paket tour Ciwidey: Kawah Putih, Situ Patenggang, Ranca Upas, Glamping Lakeside. Sewa mobil Bandung-Ciwidey include driver, BBM, tol, parkir. Harga bersahabat. Hubungi 0895-3270-77214.',
            'keywords' => 'paket tour ciwidey, sewa mobil ke ciwidey, wisata ciwidey bandung, tour kawah putih, rental mobil ciwidey bandung'
        ];
        $pageTitle = 'Ciwidey';
        $pageDescription = 'Paket tour Ciwidey Bandung: Kawah Putih, Situ Patenggang, Ranca Upas, Glamping Lakeside. Perjalanan 1-2 hari include mobil, driver, BBM, tol & parkir.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin paket tour ke Ciwidey. Berapa harganya untuk 2 orang?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Bandung - Bali (Door to Door)
    public function bandungBali()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Bandung - Bali']);
        $meta = [
            'title' => 'Charter Drop Bandung Bali | Sewa Mobil Door to Door | Mahessa Trans Holiday',
            'description' => 'Sewa mobil Bandung ke Bali door to door. Paket 7-10 hari include mobil, driver, BBM, tol, parkir, tiket ferry. Harga mulai Rp 12.000.000. Innova Reborn/Hiace nyaman. Hubungi 0895-3270-77214.',
            'keywords' => 'sewa mobil bandung bali, charter bandung bali, drop bandung bali, antar jemput bandung bali, rental mobil bandung ke bali door to door'
        ];
        $pageTitle = 'Bandung ke Bali';
        $pageDescription = 'Sewa mobil door to door Bandung ke Bali 7-10 hari. Include Innova Reborn/Hiace, driver, BBM, tol, parkir, tiket ferry. Harga mulai Rp 12.000.000.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin charter door to door Bandung ke Bali. Berapa harganya dan kapan bisa berangkat?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Bandung - Jogja
    public function bandungJogja()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Bandung - Jogja']);
        $meta = [
            'title' => 'Charter Drop Bandung Jogja | Sewa Mobil Door to Door | Mahessa Trans Holiday',
            'description' => 'Sewa mobil Bandung ke Jogja door to door. Paket 3-4 hari include mobil, driver, BBM, tol, parkir. Kunjungi Borobudur, Prambanan, Malioboro. Harga mulai Rp 4.500.000. Hubungi 0895-3270-77214.',
            'keywords' => 'sewa mobil bandung jogja, charter bandung jogja, drop bandung jogja, antar jemput bandung jogja, rental mobil bandung ke jogja'
        ];
        $pageTitle = 'Bandung ke Yogyakarta';
        $pageDescription = 'Sewa mobil door to door Bandung ke Yogyakarta 3-4 hari. Include Innova/Hiace, driver, BBM, tol & parkir. Kunjungi Borobudur, Prambanan, Malioboro, Keraton.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin charter door to door Bandung ke Jogja. Berapa harganya untuk 6 orang?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Bandung - Bromo
    public function bandungBromo()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Bandung - Bromo']);
        $meta = [
            'title' => 'Paket Tour Bandung Bromo | Sewa Mobil ke Bromo | Mahessa Trans Holiday',
            'description' => 'Paket tour Bandung ke Bromo 5-6 hari. Include mobil, driver, BBM, tol, parkir, hotel. Sunrise Bromo, Whispering Sands, Savana. Harga mulai Rp 8.000.000. Hubungi 0895-3270-77214.',
            'keywords' => 'paket tour bandung bromo, sewa mobil bandung bromo, tour bromo dari bandung, wisata bromo dari bandung, rental mobil bandung ke bromo'
        ];
        $pageTitle = 'Bandung ke Bromo';
        $pageDescription = 'Paket tour Bandung ke Bromo 5-6 hari. Sunrise spektakuler, Whispering Sands, Kawah Bromo, Savana. Include mobil, driver, BBM, tol, parkir & hotel.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin paket tour Bandung ke Bromo. Berapa harganya dan kapan bisa keberangkatan?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Bandung - Pangandaran
    public function bandungPangandaran()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Bandung - Pangandaran']);
        $meta = [
            'title' => 'Paket Tour Bandung Pangandaran | Sewa Mobil ke Pangandaran | Mahessa Trans Holiday',
            'description' => 'Paket tour Bandung ke Pangandaran 3-4 hari. Include mobil, driver, BBM, tol, parkir. Green Canyon, Pantai Batu Karas, Cagar Alam. Harga mulai Rp 3.500.000. Hubungi 0895-3270-77214.',
            'keywords' => 'paket tour bandung pangandaran, sewa mobil bandung pangandaran, tour pangandaran dari bandung, wisata pangandaran dari bandung, rental mobil bandung ke pangandaran'
        ];
        $pageTitle = 'Bandung ke Pangandaran';
        $pageDescription = 'Paket tour Bandung ke Pangandaran 3-4 hari. Green Canyon, Pantai Batukaras, Cagar Alam Pangandaran, Pantai Madasari. Include mobil, driver, BBM, tol & parkir.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin paket tour Bandung ke Pangandaran. Harga untuk rombongan 10 orang berapa?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Cimahi - Pangandaran
    public function cimahiPangandaran()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Cimahi - Pangandaran']);
        $meta = [
            'title' => 'Paket Tour Cimahi Pangandaran | Sewa Mobil Cimahi ke Pangandaran | Mahessa Trans Holiday',
            'description' => 'Paket tour Cimahi ke Pangandaran. Include mobil, driver, BBM, tol, parkir, hotel. Green Canyon, Pantai Batukaras, Madasari. Harga terjangkau. Hubungi 0895-3270-77214.',
            'keywords' => 'paket tour cimahi pangandaran, sewa mobil cimahi pangandaran, tour pangandaran dari cimahi, wisata pangandaran dari cimahi'
        ];
        $pageTitle = 'Cimahi ke Pangandaran';
        $pageDescription = 'Paket tour Cimahi ke Pangandaran. Green Canyon Body Rafting, Pantai Batukaras, Pantai Madasari, Cagar Alam. Include mobil, driver, BBM, tol & parkir.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin open trip dari Cimahi ke Pangandaran. Berapa harganya per orang?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Bandara Soetta
    public function soetta()
    {
        $packages = $this->getPackagesForLanding(['destination' => 'Bandara Soetta']);
        $meta = [
            'title' => 'Charter Drop Bandara Soetta | Antar Jemput Bandara Jakarta | Mahessa Trans Holiday',
            'description' => 'Layanan drop-off & pick-up Bandara Soekarno-Hatta dari Bandung, Cimahi, Lembang, Padalarang. Harga mulai Rp 500.000. Mobil nyaman, driver on-time, monitoring penerbangan. Hubungi 0895-3270-77214.',
            'keywords' => 'antar jemput bandara soetta, drop bandara soetta bandung, charter bandara soekarno hatta, sewa mobil ke bandara soetta, pickup bandara soetta'
        ];
        $pageTitle = 'Bandara Soetta';
        $pageDescription = 'Layanan antar-jemput Bandara Soekarno-Hatta dari Bandung, Cimahi, Lembang, Padalarang. Harga mulai Rp 500.000. Mobil nyaman, driver hafal rute, monitoring jadwal penerbangan.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin jemput/drop ke Bandara Soetta. Berapa harganya dan seberapa lama perjalanannya?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }

    // Innova Reborn Rental
    public function innovaReborn()
    {
        $packages = $this->getPackagesForLanding(['title_contains' => 'Innova']);
        $meta = [
            'title' => 'Sewa Innova Reborn Bandung Cimahi | Rental Mobil Innova Driver | Mahessa Trans Holiday',
            'description' => 'Sewa Toyota Innova Reborn 2023/2024 di Bandung & Cimahi. Harga 1 jam Rp 150.000 (min 5 jam), 10 jam Rp 1.500.000 bonus 2 jam. Include mobil, driver, BBM, tol, parkir. Unit bersih, full AC. Hubungi 0895-3270-77214.',
            'keywords' => 'sewa innova reborn bandung, rental innova reborn cimahi, sewa mobil innova bandung, harga sewa innova reborn, rental innova reborn driver'
        ];
        $pageTitle = 'Innova Reborn Bandung & Cimahi';
        $pageDescription = 'Sewa Toyota Innova Reborn 2023/2024 terbaru. Harga jam-jaman: 1 jam Rp 150.000 (min 5 jam), 10 jam Rp 1.500.000 + bonus 2 jam. Include driver, BBM, tol & parkir. Unit bersih, full AC, GPS.';
        $waMessage = 'Halo Mahessa Trans Holiday, saya ingin sewa Innova Reborn. Berapa harga per jam atau per hari?';
        return view('frontend.landing', compact('packages', 'meta', 'pageTitle', 'pageDescription', 'waMessage'));
    }
}
