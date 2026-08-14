<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'title' => 'Trip Cimahi - Pantai Batukaras - Pantai Madasari',
                'slug' => 'trip-cimahi-pantai-batukaras-pantai-madasari',
                'category' => 'Tour Pangandaran',
                'service_type' => 'Tour Paket',
                'destination' => 'Pangandaran (Batukaras, Madasari)',
                'description' => 'Open Trip Pangandaran dari Cimahi bersama Mahessa Trans Holiday cocok untuk Anda yang ingin menikmati liburan santai tanpa repot urusan perjalanan.

Perjalanan akan mengunjungi Pantai Batukaras yang terkenal dengan suasana tenang dan pemandangan laut yang indah, lalu dilanjutkan ke Pantai Madasari dengan view sunset dan batu karang khas yang menjadi favorit wisatawan.

**Fasilitas:**
- Transportasi PP nyaman
- Mobil full AC & nyaman
- Driver profesional dan ramah
- BBM & tol perjalanan
- Tiket masuk wisata
- Dokumentasi perjalanan
- Makan selama trip
- Penginapan / homestay
- Pendamping perjalanan
- Free banner & games seru

**Cocok Untuk:**
- Healing & refreshing
- Liburan akhir pekan
- Hunting foto & sunset
- Quality time bersama orang terdekat

Nikmati pengalaman liburan yang lebih nyaman, aman, dan berkesan bersama Mahessa Trans Holiday.',
                'price' => 455000,
                'image_path' => 'packages/F6tiTRVvOTimItoa3wAQ4Cqh7UALGVUDYXMXiHvS.jpg',
                'is_active' => true,
                'includes' => ['Transportasi PP', 'Mobil full AC', 'Driver profesional', 'BBM & tol', 'Tiket masuk wisata', 'Dokumentasi perjalanan', 'Makan selama trip', 'Penginapan', 'Pendamping perjalanan', 'Free banner & games'],
                'excludes' => ['Pengeluaran pribadi', 'Tiket masuk tambahan di luar paket'],
                'duration_days' => 2,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Dalam Kota Bandung (1 Hari)',
                'slug' => 'open-trip-hiace-dalam-kota-bandung',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Bandung',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Dalam Kota Bandung selama 1 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver. Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 1300000,
                'image_path' => 'packages/4EZ8i6QfqhWE2HaHRaZPOQqIFSnLTPvwsUl6ryOC.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 1,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Garut (1 Hari)',
                'slug' => 'open-trip-hiace-garut',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Garut',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Garut selama 1 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver. Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 1500000,
                'image_path' => 'packages/w4J011iTZgzs2zHgrPABMA5UmZId1B9qUpxiCZqC.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 1,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Purwakarta (1 Hari)',
                'slug' => 'open-trip-hiace-purwakarta',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Purwakarta',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Purwakarta selama 1 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver. Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 1500000,
                'image_path' => 'packages/LfuKCVXstEKURbi7aYcs3YPFQ9YWfvWLulcoKMbR.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 1,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Jakarta & Sekitarnya (1 Hari)',
                'slug' => 'open-trip-hiace-jakarta',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Jakarta',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Jakarta & Sekitarnya selama 1 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver. Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 1850000,
                'image_path' => 'packages/vK3V761SPPbbsmxiwvfovIaWFqO7eFrV515JQQus.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 1,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Bogor & Sekitarnya (1 Hari)',
                'slug' => 'open-trip-hiace-bogor',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Bogor',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Bogor & Sekitarnya selama 1 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver. Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 1650000,
                'image_path' => 'packages/H3YzTaLiCCag83HmCA35fFI524BsVWA06S55fvYb.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 1,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Cilegon & Sekitarnya (1 Hari)',
                'slug' => 'open-trip-hiace-cilegon',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Cilegon',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Cilegon & Sekitarnya selama 1 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver. Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 2400000,
                'image_path' => 'packages/eNrS9G4JI1JZOHR947v7LKBieH26MxdF5fWfm5fM.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 1,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Pangandaran (2 Hari)',
                'slug' => 'open-trip-hiace-pangandaran',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Pangandaran',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Pangandaran selama 2 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver (perjalanan multi hari). Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 3500000,
                'image_path' => 'packages/z8MJjTXFUe86RgxnLjniQh3dbQqmyu5UUX3YARJC.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 2,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Yogyakarta (3 Hari)',
                'slug' => 'open-trip-hiace-yogyakarta',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Yogyakarta',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Yogyakarta selama 3 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver (perjalanan multi hari). Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 5000000,
                'image_path' => 'packages/c1HYWs387yaWmvxgJd7tF7Ra3tPMUe31GuNLmU70.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 3,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Bromo (5 Hari)',
                'slug' => 'open-trip-hiace-bromo',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Bromo',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Bromo selama 5 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver (perjalanan multi hari). Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 8000000,
                'image_path' => 'packages/dMH0iFzfcGDxMLB96NPDfnQdxcpSxd83oS0mekFV.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 5,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
            [
                'title' => 'Open Trip Hiace - Bali (7 Hari)',
                'slug' => 'open-trip-hiace-bali',
                'category' => 'Open Trip',
                'service_type' => 'Open Trip',
                'destination' => 'Bali',
                'description' => 'Paket Open Trip All In Toyota Hiace Commuter Euro 4 tujuan Bali selama 7 Hari. Harga sudah termasuk Mobil, Driver, BBM, Tol, Parkir, dan Tiket Penyeberangan. Belum termasuk Retribusi Wisata & Penginapan Driver (perjalanan multi hari). Unit bersih, nyaman, full AC, dan siap jalan.',
                'price' => 12750000,
                'image_path' => 'packages/rOgtSkcBWGbh0bF1eK5lsIcE5QandJ80PfgJ0Vva.jpg',
                'is_active' => true,
                'includes' => ['Mobil Toyota Hiace', 'Driver profesional', 'BBM', 'Tol & Parkir', 'Tiket Penyeberangan'],
                'excludes' => ['Retribusi Wisata', 'Penginapan Driver', 'Makan pribadi'],
                'duration_days' => 7,
                'min_pax' => 1,
                'max_pax' => 10,
            ],
        ];

        foreach ($packages as $package) {
            \App\Models\Package::updateOrCreate(
                ['slug' => $package['slug']],
                $package
            );
        }
    }
}
