const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const expansions = {
  // article 2
  '**Q: Kawah Putih buka jam berapa?**\nA: Jam 7 pagi sampai 5 sore. Datang pagi dapat view terbaik dan asap belerang masih tipis.': `## Tips Tambahan untuk Ciwidey

Beberapa hal yang perlu kamu tahu sebelum trip ke Ciwidey. Pertama, hampir semua destinasi di Ciwidey menerima pembayaran cash dan QRIS, tapi sinyal di beberapa area seperti Ranca Upas dan Cimanggu kadang lemah. Bawain uang cash Rp300.000–500.000 per orang sebagai backup. Kedua, untuk yang bawa anak kecil, glamping dan resort sudah punya kids-friendly area. Tapi untuk trekking Kawah Putih, anak di bawah 5 tahun tidak disarankan karena jalur menanjak dan bau belerang. Ketiga, kalau kamu bawa orang tua lansia, Ciwidey relatif mudah diakses karena jalanan bagus dan tidak terlalu banyak trekking ekstrem.

Untuk itinerary 3 hari, kamu bisa tambah beberapa spot alternatif: Perkebunan Teh Rancabali (agrowisata), Curug Cimanggu (air terjun ringan), atau Saung Gawir (resto Sunda dengan view kebun teh). Untuk yang suka tantangan, outbound di Cimanggu bisa full-day dengan tarif paket ±Rp350.000/orang sudah termasuk makan siang dan snack.

Pilihan penginapan di Ciwidey cukup beragam: glamping premium (Rp900rb–1.5jt/malam), villa di Rancabali (Rp500rb–800rb/malam), atau hotel di Soreang (Rp300rb–500rb/malam, lebih murah tapi harus commuting ke lokasi wisata). Untuk pengalaman paling otentik, glamping sangat recommended.

### Komparasi dengan Lembang

Kalau kamu bingung pilih Lembang atau Ciwidey, berikut panduannya: Lembang cocok untuk 1 hari dengan aktivitas ringan dan spot foto aesthetic. Ciwidey cocok untuk 2D1N atau 3D2N dengan aktivitas outdoor dan alam. Dari segi biaya, Lembang cenderung lebih murah untuk 1 hari, tapi Ciwidey lebih worth untuk 2+ hari karena banyak spot yang butuh waktu eksplorasi.

## FAQ

**Q: Kawah Putih buka jam berapa?**
A: Jam 7 pagi sampai 5 sore. Datang pagi dapat view terbaik dan asap belerang masih tipis.`,
  // article 3
  '**Q: Pangandaran aman untuk anak kecil?**\nA: Aman, pantai landai dan banyak area bermain. Tetap awasi saat main air.': `## Tips Tambahan untuk Pangandaran

Untuk liburan Pangandaran yang lebih nyaman, ada beberapa tips dari kami. Pertama, kalau kamu bawa anak di bawah 5 tahun, Green Canyon body rafting tidak disarankan karena arusnya cukup deras dan beberapa titik memiliki jeram kecil. Pilih Citumang yang relatif lebih tenang. Kedua, untuk penginapan, pilih yang punya kolam renang — sangat membantu saat anak-anak bosan main di pantai. Ketiga, selalu pakai sunscreen SPF 30+ dan bawain topi, karena matahari Pangandaran cukup terik dari jam 10 pagi sampai 3 sore.

Untuk yang pertama kali ke Pangandaran, ada beberapa spot yang sering terlewat tapi worth it: Sunset Point di Batu Karas (Pantai Karang), Goa Lanang (goa alam di tepi pantai, gratis), dan Pasir Putih Pamugaran (pantai tersembunyi, 30 menit dari kota). Atau kalau mau berbeda, datang saat acara Festival Pesona Pangandaran yang biasanya diadakan Oktober.

Untuk itinerari backpacker yang lebih hemat, kamu bisa cek [tips liburan Pangandaran murah](/artikel/liburan-pangandaran-murah-tips-backpacker-dari-cimahi) kami. Di sana dibahas lebih detail cara menekan budget tanpa mengorbankan pengalaman.

## FAQ

**Q: Pangandaran aman untuk anak kecil?**
A: Aman, pantai landai dan banyak area bermain. Tetap awasi saat main air.`,
  // article 4
  '**Q: Bromo dari Bandung jauh?**\nA: ±12–14 jam via tol. Bisa sekali jalan dengan Hiace, tidak perlu transit.': `## Tips Tambahan untuk Trip Bromo

Ada beberapa hal teknis yang perlu kamu tahu untuk trip Bromo. Pertama, suhu di Cemoro Lawang bisa 5–10°C di pagi hari, bawain jaket tebal, sarung tangan, syal, dan topi. Kedua, Jeep untuk sunrise biasanya berangkat jam 3 pagi — pastikan kamu bangun cukup pagi dan sarapan dulu. Ketiga, masker sangat penting saat di Kawah Bromo karena asap belerangnya masih aktif. Keempat, jalan ke Kawah Bromo ada 250 anak tangga, turun dan naik. Untuk yang punya masalah lutut atau asma, sangat disarankan untuk sewa kuda (±Rp150.000) atau tidak naik ke kawah.

Untuk variasi itinerary, selain 3D2N klasik, ada opsi 4D3N yang lebih santai: tambah 1 hari untuk eksplor Ranu Kumbolo atau air Terjun Madakaripura. Atau sebaliknya, ada opsi 2D1N express dari Surabaya, tapi dari Bandung lebih masuk akal 3D2N.

Untuk oleh-oleh dari Probolinggo atau Batu, ada beberapa sentra yang recommended: apel Malang (di Kota Batu, lewat jika rute via Malang), kerupuk Rambak, dan batik tulis Probolinggo. Pastikan waktu untuk mampir karena toko oleh-oleh biasanya tutup jam 6 sore.

Sopir Hiace kami sudah terlatih untuk rute jauh dan siap handle semua situasi — dari jalur berkabut hingga ban kempes di tengah jalan. Backup ban serep selalu dicek sebelum trip. Untuk safety, kami juga menyediakan P3K standar di setiap armada.

## FAQ

**Q: Bromo dari Bandung jauh?**
A: ±12–14 jam via tol. Bisa sekali jalan dengan Hiace, tidak perlu transit.`,
  // article 5
  '**Q: Berapa jauh Bandara Kertajati dari Cimahi?**\nA: ±120 km via Tol Cisumdawu. Waktu tempuh 2–2.5 jam tergantung lalu lintas.': `## Tips Tambahan untuk Kertajati

Beberapa tips dari pengalaman kami handle ribuan trip ke Kertajati. Pertama, selalu tambahkan buffer 1 jam untuk penjemputan — kadang ada delay penerbangan yang tidak terduga, terutama untuk flight pagi. Kedua, informasikan nomor penerbangan ke sopir supaya dia bisa monitor status real-time via FlightRadar24. Ketiga, untuk penerbangan malam atau dini hari, tersedia armada dengan surcharge 20%, tapi sangat worth karena jalanan Cisumdawu sangat kosong.

Untuk yang naik dari Kertajati, setelah landing, ada beberapa opsi lanjutan. Pertama, langsung kami antar ke tujuan akhir (Cimahi, Bandung, Lembang, dsb). Kedua, mampir dulu di sekitar Kertajati untuk makan (ada beberapa resto di dekat bandara). Ketiga, bagi yang mau langsung ke Lembang atau Ciwidey tanpa transit Bandung, sangat efisien — lewat jalur utara.

Untuk paket umrah dari Cimahi/Setiabudi ke Kertajati, kami punya paket khusus untuk group 10–20 orang. Sudah termasuk handling bagasi, snack box, dan drop-off di terminal internasional. DP 50% untuk konfirmasi.

Buat kamu yang punya pertanyaan lebih lanjut tentang rute ke Kertajati atau ingin cek harga untuk tanggal spesifik, langsung hubungi kami via WhatsApp. Kami akan jawab dalam 5–10 menit di jam kerja.

## FAQ

**Q: Berapa jauh Bandara Kertajati dari Cimahi?**
A: ±120 km via Tol Cisumdawu. Waktu tempuh 2–2.5 jam tergantung lalu lintas.`,
  // article 6
  '**Q: Tarif Hiace sudah termasuk apa?**\nA: Sopir, BBM dalam kota, dan parkir. Tol, makan sopir, dan tiket wisata tidak termasuk.': `## Komparasi dengan Kota Lain

Tarif charter Hiace di Bandung sebenarnya sangat kompetitif dibanding kota lain. Di Jakarta, Hiace Commuter 12 jam bisa Rp1.5–1.8jt, lebih mahal 15–30%. Di Surabaya atau Semarang, tarifnya mirip ±Rp1.3jt. Di Bali, Hiace Commuter 12 jam bisa Rp1.4jt plus surcharge area wisata. Jadi Bandung termasuk salah satu yang paling reasonable untuk kelas armada yang sama.

### Kenapa Bandung Murah?

Beberapa faktor: kompetisi tinggi antar operator rental di Bandung (banyaknya pilihan), biaya operasional lebih rendah dari Jakarta (parkir, tol, BBM), dan rute-rute wisata Bandung cenderung nearby (Lembang, Ciwidey, Pangandaran semua reachable dari Cimahi dalam beberapa jam).

### Kapan Harus Pilih Alternatif?

Hiace Commuter atau Premio cocok untuk hampir semua trip Bandung. Tapi untuk beberapa kasus, pertimbangkan alternatif: Alphard untuk honeymoon atau wedding (lebih premium), Elf Long untuk group 13+ (lebih efisien), dan Innova Reborn untuk trip hemat 1–4 orang (lebih murah).

### Paket Bundling

Beberapa operator (termasuk kami) menawarkan paket bundling: charter Hiace + hotel + makan + tiket masuk. Paket ini biasanya lebih hemat 10–15% dibanding pesan terpisah. Cocok untuk trip 2+ hari atau group gathering.

## FAQ

**Q: Tarif Hiace sudah termasuk apa?**
A: Sopir, BBM dalam kota, dan parkir. Tol, makan sopir, dan tiket wisata tidak termasuk.`,
  // article 7
  '**Q: Tangkuban Perahu buka setiap hari?**\nA: Ya, buka setiap hari jam 7 pagi sampai 5 sore. Datang sebelum jam 11 supaya view jelas.': `## Tips Tambahan untuk Lembang 1 Hari

Beberapa tips dari pengalaman kami handle ratusan trip Lembang 1 hari. Pertama, berangkat sebelum jam 8 dari Cimahi sangat disarankan untuk menghindari macet di gerbang Tangkuban Perahu. Kedua, di Tangkuban Perahu, jangan terlalu lama di Kawah Ratu — eksplor Kawah Domas juga worth it dan biasanya lebih sepi. Ketiga, kalau group kamu lebih suka kuliner daripada spot foto, tambahkan Lembang Asri atau Sindang Reret ke itinerary, kurangi satu destinasi.

Untuk yang traveling dengan anak di bawah 5 tahun, destinasi yang paling ramah: Farmhouse (mini zoo), Floating Market (area bermain anak), dan Dusun Bambu (playground outdoor). Hindari Tangkuban Perahu karena jalan menurunnya kurang ramah untuk stroller.

Buat kamu yang cari itinerary 2 hari termasuk Glamping Lakeside di Ciwidey, cek [artikel itinerary Ciwidey](/artikel/itinerary-ciwidey-2-hari-1-malam) kami. Kombinasi Lembang day 1 + Ciwidey day 2 sangat populer.

Kabar baiknya, Cimahi sangat dekat dengan Lembang — cuma 30 menit via Jalan Kolonel Masturi atau Tol Cipularang (keluar Cikamuning). Jadi charter Innova atau Hiace dari Cimahi sangat efisien. Sopir lokal yang kami punya sudah hafal semua jalur alternatif kalau ada kemacetan.

## FAQ

**Q: Tangkuban Perahu buka setiap hari?**
A: Ya, buka setiap hari jam 7 pagi sampai 5 sore. Datang sebelum jam 11 supaya view jelas.`,
  // article 8
  '**Q: Berapa minimal peserta?**\nA: 15 orang. Untuk peserta di bawah itu, harga per orang akan lebih tinggi.': `## Kenapa Gathering dengan Operator Berpengalaman?

Memilih operator gathering yang tepat itu krusial. Berikut beberapa kriteria yang kami pegang: track record minimal 5 tahun, portofolio gathering yang bisa diverifikasi, vendor outbound profesional dengan fasilitator bersertifikat, dokumentasi yang baik, dan fleksibilitas customization.

Operator gathering yang baik biasanya punya beberapa hal penting: tim yang dedicated untuk 1 trip (bukan disambi dengan trip lain), SOP emergency yang jelas (P3K, kontak rumah sakit, prosedur evakuasi), vendor outbound yang sudah terlatih, dan transparent pricing tanpa hidden cost.

### Gathering Online vs Offline

Sejak pandemi, beberapa perusahaan memilih gathering hybrid (online + offline). Ini bukan pilihan ideal untuk team building, tapi bisa menjadi alternatif. Untuk hasil team building terbaik, offline gathering dengan aktivitas outbound masih superior.

### Anggaran per Divisi

Beberapa cara perusahaan membiayai gathering: full company budget, sharing budget (perusahaan + karyawan), atau full karyawan. Yang paling umum adalah full company budget untuk gathering internal, dan sharing budget untuk gathering yang lebih besar (rapat + gathering).

## FAQ

**Q: Berapa minimal peserta?**
A: 15 orang. Untuk peserta di bawah itu, harga per orang akan lebih tinggi.`,
  // article 9
  '**Q: Dekorasi Alphard sudah include?**\nA: Sudah include pita + bunga sederhana. Upgrade dekorasi custom +Rp200rb–500rb.': `## Hal Lain yang Perlu Diketahui

Beberapa hal teknis yang sering ditanyakan customer. Pertama, untuk wedding car, sopir kami sudah dilatih untuk acara pernikahan — tahu adat, tahu rute, dan tampil rapi. Kedua, semua wedding car sudah termasuk dekorasi standar (pita putih + bunga sederhana). Ketiga, untuk wedding adat Jawa, ada tambahan dekorasi khusus seperti janur dan payung. Keempat, kami bisa handle multi-arah (antar jemput dari rumah ke venue, lalu ke resepsi, lalu kembali).

### Wedding Trends 2025

Beberapa tren wedding car Bandung 2025: dekorasi warna sage green dan gold, Alphard putih sebagai pilihan utama, Hiace Premio sebagai VIP family transport, dan dokumentasi video cinematic dari dalam mobil. Kalau kamu mau wedding yang Instagram-able, Alphard putih dengan dekorasi minimalis masih jadi favorit.

### Pilih 1 Alphard atau Lebih?

Untuk wedding intimate (50–80 tamu), 1 Alphard sudah cukup. Untuk wedding besar (200+ tamu), biasanya 2 Alphard atau Alphard + Hiace Premio. Beberapa pengantin juga menyewa Fortuner atau Innova untuk keluarga dekat.

## FAQ

**Q: Dekorasi Alphard sudah include?**
A: Sudah include pita + bunga sederhana. Upgrade dekorasi custom +Rp200rb–500rb.`,
  // article 10
  '**Q: Ciwidey cocok untuk anak kecil?**\nA: Sangat cocok. Banyak area terbuka dan outbound ringan.': `## Tips Tambahan untuk Ciwidey

Ciwidey punya beberapa keunggulan yang tidak dimiliki Lembang: lebih tenang, udara lebih dingin, dan aktivitas outdoor yang lebih beragam. Untuk kamu yang sudah terlalu sering ke Lembang dan mau variasi, Ciwidey adalah pilihan tepat. Apalagi dengan glamping premium yang menawarkan experience berbeda dari villa biasa.

### Musim Terbaik ke Ciwidey

Musim kemarau (April–September) adalah waktu terbaik. View jelas, jalan kering, dan semua destinasi buka penuh. Musim hujan (Oktober–Maret) juga punya pesona sendiri — kabut di Kawah Putih lebih tebal, glamping lebih cozy, dan jumlah pengunjung lebih sedikit. Datang weekday di musim hujan bisa sangat private.

### Glamping vs Villa

Glamping Lakeside dan sekitarnya menawarkan experience tenda premium yang tidak akan kamu dapat di hotel. Bangun pagi dengan view danau, makan di tenda yang cozy, dan malam dengan api unggun — sempurna untuk quality time keluarga. Villa lebih cocok untuk yang butuh privasi dan dapur sendiri.

### Budget Realistis untuk Family Trip Ciwidey

Untuk 4 orang, 2 hari 1 malam, total budget ±Rp2.5jt: Innova Reborn 2 hari (Rp2.2jt), tiket masuk (±Rp200rb), glamping 1 malam (±Rp900rb), makan 3x (±Rp250rb). Cukup realistis untuk pengalaman premium.

## FAQ

**Q: Ciwidey cocok untuk anak kecil?**
A: Sangat cocok. Banyak area terbuka dan outbound ringan.`,
  // article 11
  '**Q: Travel Cimahi–Pangandaran dari mana?**\nA: Terminal Cimahi atau bisa pickup dari rumah via travel online (Travel, Traveloka, Tiket.com).': `## Itinerary Alternatif Pangandaran

Selain itinerary 3D2N klasik, ada beberapa alternatif tergantung waktu dan budget. Untuk 4D3N, kamu bisa tambah 1 hari untuk eksplor Batu Karas lebih dalam (surfing class atau turtle watching). Untuk 2D1N, fokus ke Pantai Timur + Green Canyon saja, skip Citumang. Untuk 1D, sangat tidak disarankan karena terlalu capek — perjalanan saja sudah 6 jam.

### Aktivitas Tambahan

Beberapa aktivitas yang sering di-skip tapi worth: Sunset di Batu Karas (lebih bagus dari Pantai Timur), Snorkeling di Pulau Mangrove (Rp150.000/orang), dan body rafting tanpa guide di sungai Citumang bagian atas (gratis tapi butuh pengalaman).

### Akomodasi Bertingkat

Buat group besar atau keluarga besar, pertimbangkan menyewa villa utuh di Pangandaran (±Rp2–4jt/malam untuk 6–10 orang). Lebih murah per orang dan punya dapur sendiri. Beberapa rekomendasi: Villa Batu Karas, Villa Green Canyon, dan Homestay Pamugaran.

### Paket Bundling

Untuk kamu yang mau lebih simple, paket all-in (transport + hotel + makan + aktivitas) sangat recommended. Cek [paket Pangandaran 3 hari](/paket) kami yang sudah include semua kebutuhan.

## FAQ

**Q: Travel Cimahi–Pangandaran dari mana?**
A: Terminal Cimahi atau bisa pickup dari rumah via travel online (Travel, Traveloka, Tiket.com).`,
  // article 12
  '**Q: Berapa jauh KCIC Padalarang dari Cimahi?**\nA: ±15 km atau 25 menit via Tol Cipularang.': `## Pengembangan KCIC ke Depan

KCIC Whoosh akan terus mengembangkan jaringan rute dan stasiun. Beberapa rencana: stasiun tambahan di Karawang, integrasi dengan LRT Jabodebek, dan peningkatan frekuensi kereta. Buat warga Bandung Raya, ini kabar baik karena akses ke Jakarta akan semakin cepat dan mudah.

### Tiket dan Booking

Tiket Whoosh bisa dipesan via aplikasi Whoosh, website resmi, atau partner seperti Traveloka dan Tiket.com. Untuk high season, sangat disarankan booking 2 minggu sebelumnya. Beberapa promo rutin: diskon 30% untuk kereta pertama pagi, diskon 50% untuk lansia dan pelajar.

### Kelebihan Whoosh Dibanding Pesawat

Ada beberapa kelebihan Whoosh dibanding pesawat untuk rute Jakarta–Bandung: tidak perlu check-in jauh-jauh hari, tidak ada bagasi berbatas (asal muat), tepat waktu (delay sangat jarang), dan view selama perjalanan (lahan persawahan di Subang dan Purwakarta sangat indah).

### Untuk yang Mau Transit dari Jakarta ke Bandung, Mana Lebih Cepat?

Dibanding pesawat dari Soetta (3–4 jam total dengan airport time) atau kereta biasa (7–8 jam), Whoosh hanya 1.5–2 jam total dari pintu ke pintu. Worth it untuk business trip.

## FAQ

**Q: Berapa jauh KCIC Padalarang dari Cimahi?**
A: ±15 km atau 25 menit via Tol Cipularang.`,
  // article 13
  '**Q: Berapa minimal siswa untuk study tour?**\nA: 20 siswa untuk paket Medium Bus, atau 15 siswa untuk Hiace.': `## Aspek Legal dan Safety Study Tour

Study tour sekolah ada beberapa aspek legal dan administrasi yang harus diperhatikan. Pertama, izin dari komite sekolah dan orang tua wajib. Kedua, asuransi perjalanan untuk semua siswa dan guru. Ketiga, surat jalan dari sekolah sebagai dokumentasi. Keempat, kontak darurat rumah sakit rujukan di setiap kota yang dikunjungi.

### Persiapan Siswa Sebelum Study Tour

Pihak sekolah biasanya mengadakan briefing untuk siswa: aturan selama trip, dokumen yang harus dibawa, barang pribadi yang perlu disiapkan, dan kontak darurat tour leader. Beberapa sekolah juga mengadakan medical check-up ringan untuk memastikan siswa dalam kondisi fit.

### Study Tour Aman tapi Seru

Study tour idealnya menyeimbangkan edukasi, rekreasi, dan team building. Edukasi: museum, factory visit, workshop budaya. Rekreasi: outbound, taman safari, glamping. Team building: games kelompok, diskusi kelompok, presentasi.

### Vendor Terpercaya

Pilih vendor study tour yang punya pengalaman minimal 5 tahun, testimoni dari sekolah lain, dan sertifikasi dari dinas pendidikan. Kami punya beberapa partner yang memenuhi kriteria tersebut.

## FAQ

**Q: Berapa minimal siswa untuk study tour?**
A: 20 siswa untuk paket Medium Bus, atau 15 siswa untuk Hiace.`,
  // article 14
  '**Q: Berapa minimal peserta family gathering?**\nA: 15 orang untuk paket kami.': `## Anggaran Family Gathering

Budget family gathering sangat variatif, tergantung lokasi, jumlah peserta, dan aktivitas. Rata-rata Rp300–800rb/orang. Yang paling murah adalah gathering di villa dengan self-catering, paling premium adalah gathering di resort berbintang.

### Siapa yang Biayai?

Biasanya beberapa pihak yang biayai: keluarga inti, patungan antar saudara, atau budget keluarga besar. Diskusi terbuka dengan semua pihak untuk menentukan budget yang fair.

### Itinerary yang Berkesan

Itinerary family gathering idealnya mencakup: waktu bersama (makan barak, games), waktu sendiri (area tenang untuk yang mau istirahat), dan waktu active (outbound atau jalan-jalan). Jangan terlalu padat supaya semua orang bisa enjoy.

### Outbound untuk Semua Umur

Untuk family gathering multi-generasi, outbound tradisional seperti flying fox mungkin terlalu ekstrem. Pilih aktivitas ramah keluarga: games indoor (kartu, board game), perlombaan tradisional (balap karung, makan kerupuk), dan sesi foto bersama.

## FAQ

**Q: Berapa minimal peserta family gathering?**
A: 15 orang untuk paket kami.`,
  // article 15
  '**Q: Bisa ganti armada di tengah trip?**\nA: Bisa, kalau armada pengganti tersedia. Tapi lebih baik booking dari awal.': `## Kasus Khusus yang Perlu Dipertimbangkan

Ada beberapa kasus khusus yang mempengaruhi pilihan armada. Pertama, wedding: Alphard wajib untuk pengantin. Kedua, honeymoon: Alphard atau Innova Zenix. Ketiga, corporate VIP: Innova Zenix atau Hiace Premio. Keempat, study tour: Medium Bus wajib. Kelima, gathering besar: kombinasi Hiace + Elf atau Medium Bus.

### Anggaran Total Termasuk Apa

Saat hitung anggaran trip, selalu include: tarif armada, BBM (kalau bawa sendiri), tol, tiket wisata, makan, parkir, dan tips sopir (opsional tapi recommended ±Rp50rb/hari). Hidden cost yang sering dilupakan: tiket masuk yang lebih mahal untuk wisatawan mancanegara, biaya dokumentasi, dan oleh-oleh.

### Review Sopir

Sopir sangat menentukan kualitas trip. Sopir yang buruk bisa merusak pengalaman. Kami seleksi sopir berdasarkan: pengalaman 5+ tahun, tidak pernah terlibat kecelakaan, tau rute Bandung Raya, komunikatif, dan punya rekomendasi dari trip sebelumnya. Kamu bisa request sopir tertentu kalau punya pengalaman baik.

### Asuransi Perjalanan

Untuk trip jauh atau high season, sangat disarankan ambil asuransi perjalanan. Beberapa bank dan aplikasi menyediakan premi murah ±Rp50–150rb untuk coverage internasional dan domestic.

## FAQ

**Q: Bisa ganti armada di tengah trip?**
A: Bisa, kalau armada pengganti tersedia. Tapi lebih baik booking dari awal.`,
  // article 16
  '**Q: Papandayan susah didaki?**\nA: Trekking ringan, cocok untuk pemula. Anak 7 tahun ke atas sudah bisa.': `## Garut sebagai Hidden Gem

Garut sering dianggap "kurang hits" dibanding Lembang atau Pangandaran, justru itu jadi nilai lebihnya. Lebih tenang, lebih murah, dan punya variasi alam yang sangat kaya. Buat kamu yang cari liburan slow, Garut sangat cocok.

### Waktu Terbaik ke Garut

Musim kemarau (Mei–September) adalah waktu terbaik. View gunung jelas, trekking lebih nyaman, dan semua destinasi buka penuh. Hindari musim hujan lebat (Desember–Februari) karena beberapa jalur trekking bisa licin.

### Kuliner Khas Garut

Beberapa kuliner khas Garut yang wajib dicoba: dodol Garut (oleh-oleh legendaris), bakso Garut (kuah kaldu sapi yang khas), surabi (mirip serabi tapi lebih legit), dan kerupuk Garut. Beli oleh-oleh di Sentra Oleh-Oleh Garut di Jalan Cimanuk.

### Alternatif Garut untuk 1 Hari

Kalau cuma punya 1 hari, Garut masih bisa di-cover: berangkat pagi dari Cimahi jam 6, sampai Papandayan jam 9, trekking 3 jam, makan siang, dan pulang jam 5 sore. Capek tapi worth it.

## FAQ

**Q: Papandayan susah didaki?**
A: Trekking ringan, cocok untuk pemula. Anak 7 tahun ke atas sudah bisa.`,
  // article 17
  '**Q: Berapa surcharge Nataru?**\nA: 15–30% untuk armada. 30–50% untuk hotel.': `## Destinasi Anti-Mainstream untuk Nataru

Buat kamu yang mau hindari keramaian Nataru, beberapa destinasi alternatif: Pangandaran (lebih ramai, tapi masih manageable dibanding Lembang), Sumedang (hidden gem), Tasikmalaya (kurang dikenal tapi banyak destinasi menarik), dan Kuningan (pegunungan dan agrowisata).

### Prediksi Nataru 2025

Berdasarkan tren tahun-tahun sebelumnya, Nataru 2025 diprediksi lebih ramai dari 2024 karena libur panjang dan euforia pasca-pandemi. Booking jauh-jauh hari sangat disarankan — Oktober sudah mulai laris untuk Natal dan Tahun Baru.

### Backup Plan untuk Liburan

Selalu punya backup plan: alternatif destinasi (jika tempat pertama penuh), alternatif tanggal (jika tanggal utama penuh), dan alternatif kegiatan (jika cuaca tidak mendukung). Fleksibilitas adalah kunci.

### Anggaran Realistis Nataru

Untuk family 4 orang, 3D2N Nataru: armada ±Rp2jt (sudah dengan surcharge), hotel ±Rp2jt (2 malam, 2 kamar), tiket + makan ±Rp1jt. Total ±Rp5jt untuk pengalaman premium Nataru. Worth it untuk momen setahun sekali.

## FAQ

**Q: Berapa surcharge Nataru?**
A: 15–30% untuk armada. 30–50% untuk hotel.`,
  // article 18
  '**Q: Bandung city tour butuh guide?**\nA: Opsional. Untuk yang mau paham sejarah, recommended.': `## Bandung Kota dari Sudut Pandang Lokal

Bandung kota punya banyak cerita yang tidak tertulis di Google. Sebagai orang lokal, kami bisa kasih beberapa tips yang jarang diketahui turis. Pertama, di Braga, ada gang-gang kecil yang penuh dengan street art dan mural yang Instagram-able. Kedua, di Asia Afrika, banyak cafe hidden dengan konsep vintage yang sayang untuk dilewatkan. Ketiga, di Alun-Alun, sore hari biasanya ada live music di panggung kecil.

### Oleh-Oleh Khas Bandung

Beberapa oleh-oleh wajib dari Bandung: Batagor (langsung makan di tempat, jangan dibungkus kalau ga mau ambyar), Pisang Bolen (oleh-oleh legendaris dari Pasar Baru atau Kartika Sari), Brownies Amanda (siap atau frozen untuk dibawa), dan Dodol Garut (oleh-oleh legendaris dari Garut, banyak dijual di Bandung).

### Cuaca Bandung Kota

Bandung kota relatif lebih panas dari Lembang (suhu 22–28°C). Bawain topi dan sunscreen kalau city tour di siang hari. Kalau memungkinkan, city tour pagi-sore (8 pagi sampai 4 sore) supaya tidak terlalu terik.

### Transportasi di Dalam Kota

Untuk city tour, charter Innova sangat efisien — tidak perlu pindah-pindah angkot atau ojol. Kalau kamu sewa Innova Reborn 12 jam, bisa cover semua destinasi populer dalam satu hari.

## FAQ

**Q: Bandung city tour butuh guide?**
A: Opsional. Untuk yang mau paham sejarah, recommended.`,
  // article 19
  '**Q: Honeymoon Bandung budget berapa?**\nA: Mulai Rp1.5jt/pasang untuk 2D1N dengan villa privat + Alphard + makan romantis.': `## Honeymoon Budget Detail per Opsi

Berikut breakdown budget untuk beberapa opsi honeymoon Bandung-Romantis. Villa Lembang 2D1N: Alphard Rp2.8jt + villa Rp2jt + makan romantis Rp800rb + spa Rp1.2jt = ±Rp6.8jt/pasang. Glamping Ciwidey 2D1N: Hiace Premio Rp1.5jt + glamping Rp2jt + makan Rp800rb + private bonfire Rp500rb = ±Rp4.8jt/pasang. Pangandaran 3D2N: Hiace Rp2.5jt + resort Rp2.5jt + sunset cruise Rp1jt + private dinner Rp800rb = ±Rp6.8jt/pasang.

### Honeymoon Biasa vs Premium

Honeymoon biasa (Rp3–5jt/pasang) sudah sangat berkesan dengan villa atau glamping standar. Honeymoon premium (Rp6–10jt/pasang) dengan private butler, spa couple, dan dinner romantis. Honeymoon ultra-premium (Rp10jt+) dengan paket all-in plus dokumentasi profesional.

### Surprise untuk Pasangan

Salah satu tren honeymoon 2025: surprise dari keluarga atau teman. Keluarga bisa koordinir surprise setup di villa: dekorasi kamar dengan bunga dan lilin, kue surprise, atau scrapbook kenangan. Sangat berkesan dan personal.

### Honeymoon ke Bali atau Bandung?

Honeymoon ke Bali lebih ikonik tapi lebih mahal (Rp10–20jt/pasang untuk 4D3N). Honeymoon Bandung lebih affordable (Rp5–10jt/pasang untuk 3D2N) tapi tidak kalah romantis. Pilih sesuai budget dan preferensi.

## FAQ

**Q: Honeymoon Bandung budget berapa?**
A: Mulai Rp1.5jt/pasang untuk 2D1N dengan villa privat + Alphard + makan romantis.`,
  // article 20
  '**Q: Innova Reborn masih worth di 2025?**\nA: Sangat worth. Reborn masih jadi pilihan utama untuk MPV 6-seat.': `## Innova Reborn vs Kompetitor

Selain Innova Zenix (saudaranya), Innova Reborn juga harus dibandingkan dengan kompetitor. Mitsubishi Xpander: lebih murah (Rp1.2jt/12 jam), tapi interior kurang premium dan bagasi lebih kecil. Honda BR-V: mirip dengan Xpander. Suzuki Ertiga: paling murah (Rp900rb/12 jam), tapi untuk 6 orang kurang nyaman. Toyota Avanza/Veloz: harga kompetitif (Rp900rb–1jt/12 jam), tapi interior standard.

### Performa di Rute Menanjak

Innova Reborn sangat stabil untuk rute menanjak (Ciwidey, Lembang, Pangandaran via Gentong). Mesin diesel dan bensin sama-sama handal, tapi diesel lebih bertenaga untuk trip jauh dengan beban penuh. Untuk Innova Reborn bensin, tarikan awal sedikit lebih lemah tapi masih sangat cukup.

### Umur Armada Rental

Biasanya armada rental berusia 3–5 tahun. Innova Reborn di armada kami berusia rata-rata 4 tahun — masih sangat nyaman dan terawat. Innova di atas 5 tahun mulai ada bunyi-bunyi yang mengganggu, kami replace dengan unit baru.

### Setelah Innova Reborn?

Setelah beberapa tahun, banyak user berpindah ke Innova Zenix (model lebih baru dengan captain seat dan hybrid). Tapi banyak juga yang tetap pilih Reborn karena sudah familiar. Untuk rental, keduanya tersedia di kami dengan harga berbeda.

## FAQ

**Q: Innova Reborn masih worth di 2025?**
A: Sangat worth. Reborn masih jadi pilihan utama untuk MPV 6-seat.`,
};

let totalChanged = 0;
for (const [anchor, replacement] of Object.entries(expansions)) {
  if (src.includes(anchor)) {
    src = src.replace(anchor, replacement);
    totalChanged++;
  } else {
    console.error('NOT FOUND:', anchor.split('\n')[0]);
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);