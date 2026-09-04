-- Mahessa Trans Holiday — articles seed
-- Cara pakai: buka Supabase Dashboard → SQL Editor → New query → paste seluruh isi file ini → Run
-- File: 8 artikel SEO (Lembang, Ciwidey, Pangandaran, Garut, Bromo, KCIC, Kertajati, tips rental)

-- Hapus test row kalau ada
DELETE FROM articles WHERE slug = 'test-conn-3';

INSERT INTO articles (slug, title, excerpt, content, cover_image_url, category, status, meta_title, meta_description, published_at, view_count) VALUES

('10-tempat-wisata-lembang-bandung',
'10 Tempat Wisata di Lembang Bandung yang Wajib Dikunjungi',
'Panduan lengkap tempat wisata Lembang: Tangkuban Perahu, Farmhouse, Dusun Bambu, Curug Maribaya, dan lainnya. Cocok untuk liburan keluarga dan gathering.',
'<h2>10 Tempat Wisata di Lembang Bandung yang Wajib Dikunjungi</h2>
<p>Lembang adalah kawasan wisata favorit di Bandung Utara, Jawa Barat. Berada di ketinggian 1.200–1.700 mdpl, Lembang menawarkan udara sejuk, pemandangan gunung, dan berbagai atraksi keluarga yang cocok untuk liburan akhir pekan maupun <strong>liburan sekolah</strong>. Dari Cimahi, Bandung, dan Padalarang, Lembang hanya berjarak 30–60 menit menggunakan Hiace atau Innova Reborn.</p>
<h3>1. Tangkuban Perahu</h3>
<p>Gunung Tangkuban Perahu adalah ikon wisata Bandung. Kawah Ratu bisa dicapai dalam 20 menit dari pusat Lembang. Tiket masuk sekitar Rp30.000 per orang. Aktivitas: jalan kaki di bibir kawah, foto selfie, belanja oleh-oleh di area parkir.</p>
<h3>2. Farmhouse Lembang</h3>
<p>Taman bergaya Eropa dengan rumah-rumah kayu, kebun bunga, dan spot foto beruang kutub besar. Favorit keluarga dan pasangan. Buka 09.00–18.00. Tiket masuk Rp50.000.</p>
<h3>3. Dusun Bambu</h3>
<p>Taman rekreasi keluarga dengan area makan lesehan, Vila Lumbung, dan playground anak. Udara sejuk, view Gunung Burangrang. Tiket masuk Rp25.000–Rp50.000.</p>
<h3>4. Observatorium Bosscha</h3>
<p>Observatorium tertua di Indonesia. Buka untuk tur terbatas dengan reservasi. Cocok untuk wisata edukasi keluarga. Lokasi dekat Institut Teknologi Bandung.</p>
<h3>5. Curug Maribaya</h3>
<p>Air terjun setinggi 25 meter di tengah hutan pinus. Tersedia jembatan gantung dan area rappelling. Tiket masuk Rp20.000.</p>
<h3>6. Glamping Lakeside Rancabali</h3>
<p>Kombinasi kawasan Situ Cileunca dengan glamping premium. View danau dari tenda transparan. Tarif Rp1,5–3jt per malam untuk 2 orang.</p>
<h3>7. De Ranch Lembang</h3>
<p>Taman bunga dan area berkuda ala koboi. Cocok untuk anak-anak. Tiket Rp50.000 sudah termasuk berkuda keliling.</p>
<h3>8. Floating Market Lembang</h3>
<p>Pasar terapung dengan berbagai jajanan Bandung dan perahu-perahu kecil di atas danau buatan. Tiket Rp25.000.</p>
<h3>9. Kebun Begonia Lembang</h3>
<p>Kebun bunga dengan koleksi begonia, hydrangea, dan berbagai tanaman hias. Spot foto Instagrammable. Tiket Rp35.000.</p>
<h3>10. Taman Hutan Raya Ir. H. Djuanda</h3>
<p>Hutan konservasi dengan Curug Dago dan Curug Pelangi. Jalur trekking ringan, cocok untuk pemula. Tiket Rp20.000.</p>
<h2>Rekomendasi Paket Wisata Lembang dari Mahessa</h2>
<p>Kami menyediakan <strong>paket city tour Lembang 1 hari</strong> dengan Hiace All-In: mobil, driver, BBM, tol, parkir, tiket masuk. Cocok untuk keluarga, gathering kantor, dan study tour. Hubungi kami via WhatsApp untuk jadwal dan harga terbaru.</p>
<p><strong>Area layanan:</strong> Cimahi, Bandung, Padalarang, Lembang, Ciwidey, Pangalengan, Garut, Pangandaran, Jakarta, Yogyakarta, Bromo, Bali.</p>',
'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200',
'Destinasi',
'published',
'10 Tempat Wisata Lembang Bandung 2026 | Mahessa',
'Panduan tempat wisata Lembang terbaik: Tangkuban Perahu, Farmhouse, Dusun Bambu, Curug Maribaya, Floating Market. Itinerary plus harga sewa Hiace dari Cimahi Bandung.',
NOW(),
0),

('panduan-liburan-ciwidey-1-hari',
'Panduan Liburan ke Ciwidey 1 Hari: Kawah Putih, Ranca Upas, Rancabali',
'Itinerary Ciwidey 1 hari: Kawah Putih, Situ Patenggang, Ranca Upas. Estimasi biaya sewa Hiace All-In dari Bandung.',
'<h2>Panduan Liburan ke Ciwidey 1 Hari: Kawah Putih, Ranca Upas, Rancabali</h2>
<p>Ciwidey adalah kawasan wisata Bandung Selatan yang terkenal dengan kawah vulkanik, bumi perkemahan, dan Situ Patenggang. Berjarak 2 jam dari Cimahi atau Bandung, Ciwidey adalah destinasi ideal untuk <strong>liburan keluarga</strong>, honeymoon, dan gathering. Berikut itinerary 1 hari yang kami rekomendasikan untuk pelanggan Mahessa Trans Holiday.</p>
<h3>Itinerary Ciwidey 1 Hari (08.00–19.00)</h3>
<h4>08.00 — Penjemputan dari Cimahi/Bandung</h4>
<p>Driver kami jemput di hotel, rumah, atau meeting point. Unit Hiace Premio atau Innova Reborn sesuai jumlah penumpang. Snack box sudah disiapkan untuk semua peserta.</p>
<h4>09.30 — Kawah Putih</h4>
<p>Berfoto di bibir kawah dengan latar belakang air berwarna putih kehijauan. Ketinggian 2.430 mdpl, udara dingin. Tiket Rp75.000 weekdays / Rp100.000 weekend. Tersedia sewa jaket Rp10.000.</p>
<h4>12.00 — Makan Siang di Resto Saung Dawuan</h4>
<p>Resto Sunda dengan view kebun teh. Menu andalan: gurame bakar, ayam kahuripan, nasi timbel. Budget Rp75.000–125.000 per orang.</p>
<h4>13.30 — Glamping Lakeside Rancabali / Situ Patenggang</h4>
<p>Naik perahu keliling Situ Patenggang, spot foto Pulau Asmara, dan glamping lakeside. Tiket masuk Rp35.000, perahu Rp75.000 per 6 orang.</p>
<h4>15.30 — Bumi Perkemahan Ranca Upas</h4>
<p>Interaksi dengan rusa, jalan kaki di hutan, area camping. Tiket Rp30.000 per orang, parkir Rp10.000.</p>
<h4>17.00 — Strawberry Farm dan Oleh-oleh</h4>
<p>Petik stroberi langsung dari kebun, beli keripik dan dodol Ciwidey sebagai oleh-oleh.</p>
<h4>19.00 — Kembali ke Cimahi atau Bandung</h4>
<h2>Estimasi Biaya Paket Ciwidey 1 Hari</h2>
<ul><li>Hiace Premio (15 orang): mulai Rp. 1.500.000</li><li>Innova Reborn (7 orang): mulai Rp. 1.300.000</li><li>Avanza (6 orang): mulai Rp. 750.000</li></ul>
<p>Harga sudah termasuk mobil, driver, BBM, tol, parkir, snack box, dan air mineral. Hubungi kami via WhatsApp untuk booking.</p>
<p><strong>Layanan utama:</strong> Paket City Tour Bandung, Paket Lembang, Paket Ciwidey, Paket Pangalengan, Paket Garut, Paket Pangandaran, Charter Hiace, Sewa Innova, Sewa Avanza, Rental Mobil dengan Driver, antar jemput Bandara Kertajati, KCIC Padalarang.</p>',
'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200',
'Destinasi',
'published',
'Itinerary Ciwidey 1 Hari: Kawah Putih dan Ranca Upas 2026 | Mahessa',
'Panduan liburan Ciwidey 1 hari lengkap: Kawah Putih, Ranca Upas, Situ Patenggang. Estimasi biaya Hiace All-In dari Bandung.',
NOW(),
0),

('itinerary-pangandaran-2-hari-1-malam',
'Itinerary Pangandaran 2 Hari 1 Malam: Green Canyon dan Pantai Batu Karas',
'Paket Pangandaran 2D1N dari Bandung: itinerary lengkap Green Canyon, Pantai Barat, Batu Karas, dan estimasi biaya Hiace all-in.',
'<h2>Itinerary Pangandaran 2 Hari 1 Malam: Green Canyon dan Pantai Batu Karas</h2>
<p>Pangandaran adalah destinasi wisata favorit di Jawa Barat bagian selatan, berjarak 6–7 jam dari Bandung. Paket <strong>Pangandaran 2 hari 1 malam</strong> cocok untuk long weekend, liburan sekolah, atau family gathering. Artikel ini memuat itinerary lengkap yang biasa kami rekomendasikan untuk pelanggan.</p>
<h3>Itinerary Hari 1 (Berangkat Pagi)</h3>
<h4>06.00 — Penjemputan dari Cimahi/Bandung/Padalarang</h4>
<p>Hiace Premio jemput di meeting point. Snack box + air mineral sudah disiapkan. Estimasi perjalanan via Tol Cileunyi-Nagrek sekitar 6–7 jam.</p>
<h4>12.00 — Makan Siang di Resto Lokal Tasikmalaya</h4>
<p>Resto ikan bakar di sepanjang jalan. Menu andalan: ikan mas bakar, lalapan, sambal terasi. Budget Rp50.000 per orang.</p>
<h4>15.00 — Check-in Hotel di Pantai Barat Pangandaran</h4>
<p>Hotel rekomendasi: Hotel Century, Hotel Palma, atau homestay keluarga. View langsung Pantai Barat. Tarif Rp400.000–800.000 per kamar per malam.</p>
<h4>17.00 — Sunset di Pantai Barat Pangandaran</h4>
<p>Salah satu sunset terbaik di Indonesia. Aktivitas: jalan kaki di sepanjang pantai, main layang-layang, jajan kelapa muda.</p>
<h4>19.00 — Makan Malam Seafood</h4>
<p>Menu: cumi bakar, udang saus padang, ikan kakap asam manis. Resto legendaris: Seafood H. Acil, RM Pasir Putih. Budget Rp100.000 per orang.</p>
<h3>Itinerary Hari 2 (Green Canyon dan Batu Karas)</h3>
<h4>07.00 — Sarapan di Hotel</h4>
<h4>08.30 — Body Rafting Green Canyon</h4>
<p>Body rafting di sungai dengan tebing hijau yang ikonik. Durasi 1,5 jam. Tiket + guide + pelampung Rp200.000 per orang.</p>
<h4>11.00 — Pantai Batu Karas</h4>
<p>Pantai tersembunyi di balik bukit. Pasir putih, ombak tenang, cocok untuk berenang dan snorkeling ringan. 30 menit dari Green Canyon.</p>
<h4>13.00 — Makan Siang di Batu Karas</h4>
<p>Resto seafood pinggir pantai. Menu andalan: ikan bakar, cumi goreng tepung, plecing kangkung.</p>
<h4>15.00 — Oleh-oleh Dodol Garut dan Batik Pangandaran</h4>
<h4>16.00 — Kembali ke Bandung</h4>
<h2>Estimasi Biaya Paket Pangandaran 2D1N</h2>
<p>Paket all-in Hiace Premio: mulai Rp. 4.250.000 untuk 10–15 orang. Sudah termasuk: Hiace, driver, BBM, tol, parkir, tiket body rafting, hotel 1 malam (sharing), dan air mineral. Tambahan: makan personal, tiket masuk wisata.</p>
<p>Hubungi kami via WhatsApp untuk reservasi dan itinerary custom.</p>',
'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200',
'Paket Wisata',
'published',
'Paket Pangandaran 2 Hari 1 Malam dari Bandung 2026 | Mahessa',
'Itinerary Pangandaran 2 hari 1 malam dari Bandung: Green Canyon body rafting, Pantai Barat, Batu Karas. Paket Hiace all-in mulai Rp. 4.250.000.',
NOW(),
0),

('paket-wisata-garut-1-hari',
'Rekomendasi Paket Wisata Garut 1 Hari: Kawah Kamojang, Situ Bagendit, Pantai Santolo',
'Paket Garut 1 hari dari Bandung: Kawah Kamojang, Situ Bagendit, Pantai Santolo. Itinerary plus estimasi biaya Hiace all-in.',
'<h2>Rekomendasi Paket Wisata Garut 1 Hari: Kawah Kamojang, Situ Bagendit, Pantai Santolo</h2>
<p>Garut adalah kabupaten di Jawa Barat yang punya berbagai destinasi ikonik: vulkanik Kawah Kamojang, danau Situ Bagendit, dan Pantai Santolo di pesisir selatan. Berjarak 3–4 jam dari Bandung, Garut cocok untuk <strong>paket 1 hari</strong> dengan Hiace Premio atau Innova Reborn.</p>
<h3>Destinasi Wajib di Garut</h3>
<h4>1. Kawah Kamojang</h4>
<p>Kawah aktif dengan aktivitas geotermal yang masih berfungsi sebagai PLTP. Udara panas, fumarol, dan jalur tracking ringan. Tiket Rp30.000, parkir Rp10.000. 2,5 jam dari Garut kota.</p>
<h4>2. Situ Bagendit</h4>
<p>Danau buatan dengan view Gunung Guntur. Cocok untuk naik perahu, memancing, atau piknik keluarga. Tiket Rp25.000, perahu Rp75.000. 20 menit dari Garut kota.</p>
<h4>3. Pantai Santolo</h4>
<p>Pantai pasir hitam dengan ombak tenang. View selat Panaitan. Cocok untuk berenang, bersantai, dan makan seafood. 1,5 jam dari Garut kota.</p>
<h4>4. Curug Citiis</h4>
<p>Air terjun 25 meter dengan kolam alami di bawahnya. Tiket Rp15.000. Cocok untuk keluarga dan fotografi.</p>
<h4>5. Kampung Adat Dukuh</h4>
<p>Desa adat dengan rumah tradisional dan aktivitas budaya Sunda. 30 menit dari Garut kota.</p>
<h3>Itinerary Garut 1 Hari</h3>
<ul><li><strong>06.00</strong> Penjemputan dari Cimahi/Bandung</li><li><strong>09.30</strong> Tiba di Situ Bagendit, jalan kaki + perahu</li><li><strong>12.00</strong> Makan siang di RM Sindang Reret atau resto lokal</li><li><strong>14.00</strong> Kawah Kamojang (tracking ringan)</li><li><strong>17.00</strong> Pantai Santolo sunset</li><li><strong>19.00</strong> Makan malam seafood</li><li><strong>21.00</strong> Kembali ke Bandung (tiba sekitar 01.00)</li></ul>
<h3>Estimasi Biaya Paket Garut 1 Hari</h3>
<ul><li>Hiace Premio (15 orang): mulai Rp. 1.500.000</li><li>Innova Reborn (7 orang): mulai Rp. 1.300.000</li></ul>
<p>Termasuk mobil, driver, BBM, tol, parkir. Hubungi kami untuk paket multi-hari Garut-Pangandaran sekaligus.</p>',
'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=1200',
'Paket Wisata',
'published',
'Paket Wisata Garut 1 Hari dari Bandung 2026 | Mahessa',
'Paket Garut 1 hari dari Bandung: Kawah Kamojang, Situ Bagendit, Pantai Santolo, Curug Citiis. Itinerary lengkap dan biaya Hiace all-in mulai Rp. 1.300.000.',
NOW(),
0),

('panduan-sewa-hiace-rombongan',
'Panduan Sewa Hiace untuk Rombongan: Pilih Hiace Premio atau Commuter?',
'Panduan lengkap memilih Hiace Premio atau Commuter untuk rombongan: perbandingan kapasitas, harga, dan kapan pilih yang mana.',
'<h2>Panduan Sewa Hiace untuk Rombongan: Pilih Hiace Premio atau Commuter?</h2>
<p>Untuk perjalanan rombongan besar dari Cimahi, Bandung, dan Padalarang, Toyota Hiace adalah pilihan paling populer. Ada dua varian yang biasa kami sewakan: <strong>Hiace Premio</strong> (premium) dan <strong>Hiace Commuter</strong> (standar). Berikut perbandingan lengkap untuk membantu Anda memilih unit yang sesuai.</p>
<h3>Hiace Premio — Premium 14 Kursi</h3>
<ul><li>Kapasitas: 14 penumpang (lebih lega karena captain seat)</li><li>Interior: captain seat, AC double blower, leg room lebih luas</li><li>Suspensi: lebih nyaman untuk perjalanan jauh</li><li>Tahun: 2019+</li><li>Tarif Mahessa: mulai Rp. 1.800.000 / 12 jam</li><li>Cocok untuk: wisata keluarga besar, honeymoon, eksekutif, tamu perusahaan</li></ul>
<h3>Hiace Commuter — Standar 16 Kursi</h3>
<ul><li>Kapasitas: 16 penumpang (kapasitas lebih besar)</li><li>Interior: bench seat 2-2-2-2, AC double blower</li><li>Tarif Mahessa: mulai Rp. 1.500.000 / 12 jam</li><li>Cocok untuk: study tour, ziarah, gathering, liburan sekolah</li></ul>
<h3>Kapan Pilih Hiace Premio vs Commuter?</h3>
<table><thead><tr><th>Kebutuhan</th><th>Rekomendasi</th></tr></thead><tbody><tr><td>14 orang + barang banyak</td><td>Hiace Premio (lebih lega)</td></tr><tr><td>15–16 orang</td><td>Hiace Commuter (kapasitas lebih besar)</td></tr><tr><td>Perjalanan jauh (Bromo atau Bali 4 hari)</td><td>Hiace Premio (lebih nyaman)</td></tr><tr><td>Study tour sekolah</td><td>Hiace Commuter (hemat)</td></tr><tr><td>Wedding atau tamu VIP</td><td>Hiace Premio (premium)</td></tr><tr><td>Gathering perusahaan</td><td>Hiace Commuter (ekonomis)</td></tr></tbody></table>
<h3>Unit Pendamping yang Kami Sediakan</h3>
<p>Untuk rombongan lebih besar dari 16 orang, kami bisa menyediakan beberapa unit Hiace sekaligus, atau kombinasi Hiace + Elf Long (19 kursi). Kami juga melayani paket Hiace + Innova Reborn untuk kombinasi VIP dan peserta biasa.</p>
<h3>Cara Pesan Hiace dari Mahessa</h3>
<ol><li>Kirim detail via WhatsApp: tanggal, rute, jumlah penumpang, jam jemput</li><li>Tim kami cek ketersediaan dan konfirmasi harga</li><li>DP minimal 30% untuk lock jadwal</li><li>Pelunasan saat penjemputan atau transfer sebelumnya</li></ol>
<p>Tarif sudah all-in: driver profesional, BBM, tol, parkir. Tidak ada biaya tersembunyi.</p>',
'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
'Tips Rental',
'published',
'Sewa Hiace Premio vs Commuter untuk Rombongan | Mahessa',
'Panduan sewa Hiace untuk rombongan: perbandingan Hiace Premio (14 kursi) dan Hiace Commuter (16 kursi). Tarif, kapasitas, dan kapan pilih masing-masing.',
NOW(),
0),

('tips-memilih-rental-mobil-terpercaya-bandung',
'Tips Memilih Rental Mobil Terpercaya di Bandung dan Cimahi',
'Tips memilih rental mobil terpercaya di Bandung: cek izin, kondisi mobil, lisensi driver, transparansi harga, dan track record. Hindari penipuan rental.',
'<h2>Tips Memilih Rental Mobil Terpercaya di Bandung dan Cimahi</h2>
<p>Industri rental mobil di Bandung dan Cimahi sangat ramai, mulai dari業者 kecil hingga agen besar. Memilih rental yang tepat akan menentukan keamanan dan kenyamanan perjalanan Anda. Berikut tips dari tim Mahessa berdasarkan pengalaman melayani ratusan pelanggan.</p>
<h3>1. Pastikan Rental Punya Izin Usaha Lengkap</h3>
<p>Rental profesional memiliki NIB (Nomor Induk Berusaha), izin транспортasi, dan terdaftar di DINAS соответствующего. Tanyakan fotokopi izin sebelum deal.</p>
<h3>2. Cek Kondisi Mobil Langsung</h3>
<p>Jangan hanya percaya foto di Instagram atau website. Minta lihat unit langsung di pool, atau minta foto terkini (bukan katalog lama). Cek:</p>
<ul><li>Kondisi ban (apakah masih layak, bukan botak)</li><li>AC dingin di semua baris kursi</li><li>Body tidak penyok atau karat</li><li>Interior bersih, tidak berbau rokok</li><li>STNK masih hidup, pajak aktif</li></ul>
<h3>3. Driver Berlisensi</h3>
<p>Pastikan driver memiliki SIM A yang masih aktif dan pengalaman minimal 3 tahun untuk rute Bandung–Jabodetabek, atau 5 tahun untuk rute luar Jawa. Driver profesional dari Mahessa:</p>
<ul><li>SIM A aktif, pernah di-verifikasi</li><li>Penguasaan rute Bandung, Lembang, Ciwidey, Pangandaran, Tol Trans Jawa</li><li>Berseragam rapi, ramah, tidak mabuk saat kerja</li></ul>
<h3>4. Transparansi Harga</h3>
<p>Rental terpercaya mencantumkan harga <strong>all-in</strong>: sudah termasuk driver, BBM, tol, parkir. Tidak ada tambahan diam-diam di akhir perjalanan. Mahessa secara eksplisit menulis:</p>
<ul><li>Tarif sudah termasuk driver</li><li>Tarif sudah termasuk BBM dalam kota 12 jam (lebih dari 12 jam: charge overtime)</li><li>Tidak ada biaya tersembunyi untuk toll, parkir dalam radius normal</li></ul>
<h3>5. Asuransi Kendaraan</h3>
<p>Tanyakan apakah unit memiliki asuransi all risk atau TLO. Mahessa mendaftarkan seluruh armada dengan asuransi comprehensive untuk ketenangan pelanggan.</p>
<h3>6. Responsif dan Tersedia 24 Jam</h3>
<p>Rental profesional punya admin standby 24 jam, terutama untuk kebutuhan mendadak (koper tertinggal di airport, perjamuan yang berubah, dsb). Mahessa merespons WhatsApp rata-rata dalam 5 menit.</p>
<h3>7. Track Record dan Review</h3>
<p>Cek Google Reviews, testimoni pelanggan, atau portofolio perjalanan. Mahessa sudah melayani ratusan perjalanan ke berbagai kota dengan rating rata-rata 5/5 di Google Business Profile.</p>
<h3>Tanda Rental yang Harus Dihindari</h3>
<ul><li>Tidak mau menunjukkan STNK</li><li>Tarif terlalu murah (di bawah Rp400rb/12 jam) — biasanya ada biaya siluman</li><li>Driver tidak punya SIM</li><li>Mobil tidak di-pool tapi di pinggir jalan (tidak ada alamat tetap)</li></ul>
<p>Mahessa Trans Holiday beralamat di Cimahi dengan pool kendaraan di Bandung dan Padalarang. Hubungi kami via WhatsApp untuk konsultasi gratis.</p>',
'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200',
'Tips Rental',
'published',
'Tips Memilih Rental Mobil Terpercaya Bandung dan Cimahi | Mahessa',
'Panduan memilih rental mobil terpercaya di Bandung dan Cimahi: cek izin usaha, kondisi unit, lisensi driver, transparansi harga, dan review.',
NOW(),
0),

('panduan-perjalanan-bandung-bromo-2-hari-1-malam',
'Panduan Perjalanan Bandung - Bromo 2 Hari 1 Malam',
'Paket Bromo 2D1N dari Bandung: itinerary sunrise Penanjakan, lautan pasir, kawah Bromo. Estimasi biaya Hiace all-in mulai Rp. 10 juta.',
'<h2>Panduan Perjalanan Bandung - Bromo 2 Hari 1 Malam</h2>
<p>Gunung Bromo adalah salah satu destinasi paling ikonik di Indonesia, terkenal dengan sunrise di Penanjakan, lautan pasir, dan kawah yang masih aktif. Berangkat dari Bandung (Cimahi, Padalarang), paket <strong>Bromo 2 hari 1 malam</strong> adalah pilihan paling efisien untuk keluarga, honeymoon, atau gathering.</p>
<h3>Itinerary Bromo 2 Hari 1 Malam</h3>
<h4>Hari 1 — Bandung ke Probolinggo (Sabtu)</h4>
<ul><li><strong>06.00</strong> Penjemputan dari Cimahi/Bandung/Padalarang dengan Hiace Premio</li><li><strong>06.00–17.00</strong> Perjalanan via Tol Trans Jawa (Cileunyi–Nagrek–Cipali–Pejagan–Pandaan–Probolinggo). Estimasi 11 jam termasuk istirahat dan makan</li><li><strong>12.00</strong> Makan siang di Resto Area Tol Pejagan atau setara</li><li><strong>17.30</strong> Tiba di Hotel Probolinggo, check-in dan istirahat</li><li><strong>19.00</strong> Makan malam di hotel, briefing sunrise tour</li></ul>
<h4>Hari 2 — Sunrise Bromo ke Bandung (Minggu)</h4>
<ul><li><strong>02.30</strong> Bangun, persiapan</li><li><strong>03.00</strong> Berangkat ke Sunrise View Point Penanjakan (1,5 jam via Jeep 4WD)</li><li><strong>05.30</strong> Tiba di Penanjakan, menunggu sunrise</li><li><strong>06.00</strong> Sunrise, foto-foto</li><li><strong>07.30</strong> Turun ke Lautan Pasir</li><li><strong>08.30</strong> Naik ke Kawah Bromo (300 anak tangga)</li><li><strong>10.00</strong> Kembali ke hotel, sarapan dan mandi</li><li><strong>11.00</strong> Check-out, perjalanan kembali ke Bandung</li><li><strong>22.00</strong> Tiba di Bandung</li></ul>
<h3>Yang Termasuk dalam Paket Bromo 2D1N</h3>
<ul><li>Hiace Premio (atau Commuter untuk lebih dari 15 orang)</li><li>Driver profesional berpengalaman rute Bromo</li><li>BBM, tol, parkir</li><li>Hotel 1 malam di Probolinggo (standar) atau Lava View Lodge (premium)</li><li>Jeep 4WD untuk sunrise + kawah Bromo</li><li>Tiket masuk Taman Nasional Bromo Tengger Semeru</li></ul>
<h3>Estimasi Biaya</h3>
<p>Paket all-in mulai Rp. 10.000.000 untuk Hiace Premio (maks 14 orang). Tambahan: makan personal, sewa jaket, kuda di lautan pasir, dokumentasi.</p>
<h3>Tips Penting</h3>
<ul><li>Bawa jaket tebal atau pinjam di base camp (suhu 5–10°C saat sunrise)</li><li>Pakai sepatu kets anti-selip untuk naik kawah</li><li>Jangan berangkat pada puncak musim hujan (Januari–Februari, jalan licin)</li><li>Bawa masker untuk躲避 abu vulkanik</li></ul>
<p>Hubungi kami via WhatsApp untuk paket Bromo 2D1N dari Bandung, termasuk opsi upgrade hotel dan paket honeymoon.</p>',
'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200',
'Paket Wisata',
'published',
'Paket Bromo 2 Hari 1 Malam dari Bandung 2026 | Mahessa',
'Panduan perjalanan Bandung Bromo 2 hari 1 malam: itinerary sunrise Penanjakan, lautan pasir, kawah Bromo. Paket Hiace all-in mulai Rp. 10.000.000 termasuk Jeep 4WD.',
NOW(),
0),

('antar-jemput-bandara-kertajati-kcic-padalarang',
'Antar Jemput Bandara Kertajati dan KCIC Padalarang: Panduan Lengkap',
'Tarif antar jemput Bandara Kertajati dari Bandung, plus layanan KCIC Padalarang Whoosh. Panduan lengkap untuk traveler dari Cimahi, Bandung, dan Padalarang.',
'<h2>Antar Jemput Bandara Kertajati dan KCIC Padalarang: Panduan Lengkap</h2>
<p>Dengan dibukanya Bandara Internasional Kertajati (Majalengka) dan Stasiun KCIC Padalarang (Kereta Cepat Whoosh), rute transport dari Bandung dan Cimahi makin berkembang. Berikut panduan lengkap untuk antar jemput ke dua hub baru ini.</p>
<h3>1. Antar Jemput Bandara Kertajati (KJT)</h3>
<p>Bandara Kertajati berjarak sekitar 100 km dari Bandung (sekitar 2 jam via Tol Cisumdawu). Cocok untuk penerbangan internasional dan rute Asia Tenggara.</p>
<h4>Tarif Mahessa</h4>
<ul><li>Avanza atau Calya (4 orang): Rp. 1.300.000 / one-way</li><li>Innova Reborn (6–7 orang): Rp. 1.800.000 / one-way</li><li>Hiace Premio (10–14 orang): Rp. 2.500.000 / one-way</li></ul>
<h4>Yang Termasuk</h4>
<ul><li>Penjemputan di Cimahi, Bandung, Padalarang, atau Lembang</li><li>Driver standby di area kedatangan (max 60 menit setelah landing)</li><li>BBM, tol Cisumdawu, parkir bandara</li><li>Bantuan koper</li></ul>
<h3>2. Antar Jemput Stasiun KCIC Padalarang (Whoosh)</h3>
<p>KCIC Padalarang (Stasiun Kereta Cepat) menghubungkan Bandung–Jakarta dalam 30–45 menit. Dari Cimahi atau Bandung kota ke Padalarang hanya 20–40 menit. Sangat cocok untuk perjalanan bisnis yang efisien.</p>
<h4>Tarif Mahessa</h4>
<ul><li>Avanza (4 orang): Rp. 250.000 / one-way (radius Cimahi–Padalarang)</li><li>Innova Reborn (6 orang): Rp. 350.000 / one-way</li></ul>
<h4>Keuntungan Sewa Mobil ke KCIC Dibanding Taksi Online</h4>
<ul><li>Tarif fixed, tidak kena surge pricing di jam sibuk</li><li>Driver standby sesuai jadwal kereta</li><li>Bisa bawa banyak barang atau oleh-oleh</li><li>Pakai Innova Reborn untuk keluarga lebih nyaman</li></ul>
<h3>3. Kombinasi: KCIC + Sewa Mobil di Jakarta</h3>
<p>Untuk perjalanan bisnis, Anda bisa naik Whoosh ke Jakarta (30 menit), lalu lanjut sewa mobil dari kami di Jakarta. Hubungi WhatsApp untuk paket multi-kota.</p>
<h3>Cara Pesan</h3>
<ol><li>Kirim jadwal pesawat atau kereta, jumlah penumpang, alamat jemput</li><li>Tim kami konfirmasi tarif dan ketersediaan</li><li>Driver standby 15 menit sebelum jadwal</li><li>Bayar cash atau transfer setelah penjemputan</li></ol>
<p>Mahessa Trans Holiday melayani antar jemput Bandara Kertajati, Bandara Soekarno-Hatta, Bandara Husein Sastranegara, dan semua stasiun kereta di Jawa Barat.</p>',
'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200',
'Antar Jemput',
'published',
'Antar Jemput Bandara Kertajati dan KCIC Padalarang 2026 | Mahessa',
'Tarif antar jemput Bandara Kertajati dari Cimahi Bandung mulai Rp. 1.3 juta, plus KCIC Padalarang Whoosh dari Rp. 250rb. Panduan lengkap plus cara pesan.',
NOW(),
0);

-- Total: 8 artikel ter-insert
-- Verifikasi:
-- SELECT slug, title, category, status, published_at FROM articles WHERE status = 'published' ORDER BY published_at DESC;
