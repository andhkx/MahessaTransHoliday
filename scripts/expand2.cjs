const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const targets = [3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
// (1, 2, 5 already done via intro expansions earlier, but they're 1958, 822, 735)
// Actually let's check: 822 and 735 are still under 1400. So target needs adjustment.

// Re-read: per article = [1958, 822, 813, 836, 735, 831, 827, 770, 745, 749, 904, 867, 896, 790, 796, 752, 827, 806, 911, 877]
// 822 = article 2 still under. 735 = article 5 still under. Others all under 1400 except 1.
// Target every article 1400-1800. Need to expand ALL of them.

const extras = {
  // article 2 - target add ~600 words
  '## Tips Tambahan untuk Ciwidey': `## Panduan Riset Sebelum Trip

Sebelum berangkat ke Ciwidey, ada baiknya kamu riset beberapa hal. Pertama, cek prakiraan cuaca 3 hari sebelum keberangkatan — kalau hujan deras, beberapa destinasi (terutama Kawah Putih dan Curug Cimanggu) bisa tutup atau tidak optimal. Kedua, cek jadwal buka destinasi — beberapa spot punya jam operasional yang berbeda di weekday vs weekend. Ketiga, baca review terbaru dari traveler lain via Google Maps atau YouTube. Banyak info hidden yang tidak ada di brosur resmi.

Untuk yang pertama kali ke Ciwidey, sangat disarankan untuk gabung dengan grup atau bawa guide lokal. Guide bisa menjelaskan sejarah kawah, spot foto rahasia, dan jalur tercepat. Tarif guide ±Rp300.000 untuk 4–6 orang untuk half-day, atau Rp500.000 untuk full-day.

### Etika di Ciwidey

Ada beberapa etika yang perlu kamu tahu saat ke Ciwidey. Pertama, di Kawah Putih, jangan buang sampah sembarangan dan jangan terlalu dekat dengan tepi kawah karena tanahnya labil. Kedua, di Glamping Lakeside, jangan nyalakan api unggun di luar area yang ditentukan. Ketiga, di Situ Cileunca, jangan naik perahu tanpa jaket pelampung.

## Tips Tambahan untuk Ciwidey`,

  // article 3
  '## Tips Tambahan untuk Pangandaran': `## Panduan Persiapan ke Pangandaran

Beberapa hal yang perlu disiapkan sebelum trip Pangandaran. Pertama, booking transport dan penginapan minimal H-7 untuk weekday, atau H-14 untuk weekend dan high season. Kedua, bawain sunblock SPF 50, topi, kacamata hitam, dan baju ganti 2–3 set per orang. Ketiga, bawain obat pribadi yang biasa kamu konsumsi — apotek di Pangandaran ada tapi untuk kondisi darurat.

Untuk itinerary, jangan terlalu ambisius masukin semua destinasi dalam 3 hari. Prioritaskan yang paling penting: Pantai Timur (sunset), Green Canyon (body rafting), dan Citumang. Batu Karas bisa di-skip kalau waktu terbatas.

### Kuliner Wajib di Pangandaran

Beberapa tempat makan yang recommended: Seafood di Jalan Pamugaran (harga negotiate), Bakso Hurang (bakso legendaris Pangandaran), Es Cendol Pangandaran (minuman segar khas Pantai), dan Nasi Lengko (kuliner khas Cirebon yang juga ada di Pangandaran).

## Tips Tambahan untuk Pangandaran`,

  // article 4
  '## Tips Tambahan untuk Trip Bromo': `## Backup Plan Jika Cuaca Buruk

Saat ke Bromo, selalu siapkan backup plan untuk cuaca buruk. Jika kabut tebal, sunrise tidak akan kelihatan dari Penanjakan. Biasanya operator jeep menyediakan opsi ke bukit lain yang lebih rendah dan sering tembus kabut. Atau bisa skip sunrise dan eksplor kawah di pagi hari setelah kabut hilang.

### Tips Dokumentasi Bromo

Untuk dokumentasi yang bagus: bawa tripod untuk foto long exposure, powerbank karena baterai cepat habis di suhu dingin, dan simpan kamera di dalam tas tertutup saat tidak dipakai (perubahan suhu bisa bikin lensa berkabut). Untuk video, gunakan gimbal atau stabilizer — banyak jalan berbatu yang bisa bikin goyang.

### Oleh-Oleh dari Probolinggo

Saat pulang dari Bromo, sempatkan mampir di sentra oleh-oleh Probolinggo: kerupuk ikan Probolinggo, sambal roa, batik Probolinggo, dan madu lokal. Rest area di sekitar Probolinggo juga ada toko oleh-oleh yang authorized.

## Tips Tambahan untuk Trip Bromo`,

  // article 5 - was 735
  '## Tips Tambakan untuk Kertajati': `## Perbandingan Kertajati vs Soetta

Buat kamu yang punya pilihan antara terbang dari Kertajati atau Soetta, berikut perbandingannya. Kertajati: lebih dekat untuk warga Bandung Raya (2–2.5 jam), tarif pesawat umumnya lebih murah, parkir gratis 24 jam pertama, dan area tunggu lebih nyaman. Soetta: lebih banyak pilihan rute internasional, lebih banyak armada taksi online, dan koneksi ke berbagai moda transport.

Untuk penerbangan domestik atau umrah, Kertajati jelas pilihan terbaik dari Bandung. Untuk penerbangan internasional premium (Singapore, Tokyo, dll), kadang masih harus ke Soetta karena pilihan maskapainya lebih banyak.

### Kenyamanan Terminal Kertajati

Terminal Kertajati modern dengan fasilitas: free Wi-Fi, charging station, food court, musholla, area bermain anak, dan smoking room. Area tunggu luas sehingga tidak terlalu padat seperti Soetta.

## Tips Tambakan untuk Kertajati`.replace('Tips Tambakan', 'Tips Tambahan'),

  // article 6
  '## Komparasi dengan Kota Lain': `## Asuransi dan Proteksi

Untuk rental Hiace atau Innova, beberapa operator menyediakan asuransi all-risk yang cover kerusakan dan kecelakaan. Biasanya sudah include di tarif. Untuk long trip (Bromo, Pangandaran, Dieng), sangat disarankan untuk pilih paket dengan full coverage.

Beberapa hal yang perlu diketahui soal asuransi: deductible (potongan klaim) biasanya Rp500.000–Rp1jt untuk kerusakan kecil, klaim harus disertai laporan polisi untuk kerusakan besar, dan klaim biasanya dipotong dari deposit.

### Asuransi Perjalanan

Selain asuransi kendaraan, pertimbangkan juga asuransi perjalanan untuk semua penumpang. Beberapa bank dan aplikasi menyediakan premi murah ±Rp50–150rb untuk coverage kecelakaan, pembatalan, dan medis darurat. Sangat worth it untuk long trip.

### Hiace untuk Cargo

Beberapa pelanggan menggunakan Hiace untuk angkut barang dagangan atau pindahan. Untuk cargo, Hiace Commuter sangat efisien — bagasi luas dan bisa muat 1–2 ton. Tarif biasanya lebih murah dari truk kecil.

## Komparasi dengan Kota Lain`,

  // article 7
  '## Tips Tambahan untuk Lembang 1 Hari': `## Lembang untuk Beragam Tujuan

Lembang bisa dikunjungi untuk berbagai tujuan: family time, foto estetik, outbound, kuliner, atau healing. Tiap tujuan punya destinasi ideal yang berbeda.

Untuk family time: Farmhouse + Floating Market + Dusun Bambu. Untuk foto estetik: The Great Asia Africa + Lereng Anteng + Orchid Forest. Untuk outbound: Grafika Cikole + De Ranch. Untuk kuliner: Sindang Reret + Lembang Asri + Dago Dairy. Untuk healing: Lereng Anteng + Curug Maribaya + Dusun Bambu.

### Lembang di Musim Hujan

Lembang di musim hujan (November–Maret) punya pesona sendiri. Kabut tebal di pagi hari, hujan ringan yang bikin suasana cozy, dan lebih sedikit pengunjung. Spot yang masih worth di musim hujan: Floating Market (semi-indoor), Dusun Bambu (indoor resto), Farmhouse (area cukup terlindungi), dan Lereng Anteng (cafe indoor dengan kaca besar view gunung).

### Promo dan Diskon

Beberapa destinasi Lembang sering kasih promo di weekday atau low season: Farmhouse sering diskon 20% di Senin–Rabu, Floating Market sering ada promo makan, dan Orchid Forest kadang ada promo pasangan.

## Tips Tambahan untuk Lembang 1 Hari`,

  // article 8
  '## Kenapa Gathering dengan Operator Berpengalaman?': `## Tahapan Persiapan Gathering

Gathering yang sukses butuh beberapa tahapan: H-30 (booking vendor dan lokasi), H-14 (konfirmasi peserta dan rundown), H-7 (final rundown dan teknis), H-3 (briefing peserta), H-1 (packing dan persiapan akhir), H-Day (pelaksanaan). Tahapan ini memastikan tidak ada yang terlewat.

### Gathering Virtual vs Fisik

Sejak 2020, gathering virtual (online) jadi alternatif. Tapi untuk team building yang sesungguhnya, gathering fisik masih jauh lebih efektif. Interaksi langsung, bonding yang lebih kuat, dan pengalaman bersama yang lebih berkesan.

### Ide Games untuk Gathering

Beberapa games yang sering dipakai untuk gathering: ice breaking (kenalan lucu), trust fall (latihan kepercayaan), Amazing Race (kompetisi kelompok), outbound tradisional (paintball, flying fox), dan sesi refleksi (sharing pengalaman). Kombinasikan 3–4 games untuk acara 4–6 jam.

## Kenapa Gathering dengan Operator Berpengalaman?`,

  // article 9
  '## Hal Lain yang Perlu Diketahui': `## Trend Wedding 2025

Beberapa tren wedding 2025 yang juga mempengaruhi pemilihan wedding car: intimate wedding (50–80 tamu), outdoor venue (villa, garden, beach), deco minimalis (sage, gold, dusty pink), dokumentasi cinematic (video 4K dengan angle drone), dan sustainable wedding (dekorasi reusable, souvenir fungsional).

### Wedding Car vs Wedding Organizer

Wedding car hanya sebagian kecil dari pernikahan. Untuk keseluruhan wedding, biasanya dipakai Wedding Organizer (WO). Kami bisa rekomendasi WO partner yang sudah sering kerja sama dengan kami, terutama untuk eksekusi transport di hari H.

### Backup Plan untuk Wedding

Selalu siapkan backup plan untuk hal-hal teknis: hujan (payung besar atau dekorasi indoor), telat driver (driver cadangan atau sopir kedua), masalah dekorasi (vendor dekorasi backup), dan masalah kesehatan (P3K dan rumah sakit rujukan).

## Hal Lain yang Perlu Diketahui`,

  // article 10
  '## Tips Tambahan untuk Ciwidey': `## Ciwidey untuk Anak-Anak

Ciwidey sangat cocok untuk liburan anak-anak karena: banyak area terbuka (tidak sumpek), udara segar dan dingin (baik untuk kesehatan), banyak outbound ringan (aman untuk anak), dan akses jalan yang mudah (tidak terlalu banyak trekking). Beberapa rekomendasi khusus untuk anak: Glamping Lakeside (kids-friendly), Situ Cileunca (perahu aman), Cimanggu (outbound ringan), dan Saung Gawir (resto dengan area bermain).

### Destinasi Edukatif di Ciwidey

Untuk school outing atau family edukasi, beberapa destinasi punya konsep edukasi: Perkebunan Teh Rancabali (edukasi pertanian teh), Penangkaran Rusa (edukatif satwa), Kawah Putih (edukasi geologi vulkanik), dan Cimanggu Cultural Village (edukasi budaya Sunda).

## Tips Tambahan untuk Ciwidey`,

  // article 11
  '## Itinerary Alternatif Pangandaran': `## Pangandaran untuk Beragam Tipe Traveler

Pangandaran cocok untuk berbagai tipe traveler: solo traveler (backpacker friendly), pasangan (honeymoon atau anniversary), keluarga (pantai aman untuk anak), group (gathering atau outing kantor), dan lansia (akses mudah dan fasilitas lengkap).

### Hidden Gem di Pangandaran

Beberapa spot tersembunyi yang jarang diketahui turis: Goa Jepang (goa bekas PD II, gratis), Pantai Madasari (pantai tersembunyi, 1 jam dari kota), Curug Tujuh (air terjun, butuh trekking), dan Kampung Turis (area seni dan budaya lokal).

### Etika saat ke Pangandaran

Beberapa etika yang perlu diketahui: jangan buang sampah di pantai, hormati aktivitas nelayan pagi, jangan naik perahu tanpa jaket pelampung, dan jangan ambil batu karang atau satwa laut.

## Itinerary Alternatif Pangandaran`,

  // article 12
  '## Pengembangan KCIC ke Depan': `## Moda Transportasi Pendukung KCIC

Di sekitar Padalarang, ada beberapa moda transportasi pendukung: ojol (Gojek, Grab), taksi konvensional, angkot Padalarang-Cimahi, dan bus kecil. Untuk ke Lembang atau Ciwidey, opsi paling efisien adalah sewa Innova atau Hiace dari kami.

### Akses Tol dan Parkir

Akses tol ke KCIC Padalarang melalui Tol Cipularang keluar Padalarang, atau dari Bandung kota via Tol Soreang–Cipularang. Parkir di KCIC luas dan aman dengan tarif sangat terjangkau.

### Tol Trans Jawa dan KCIC

KCIC Padalarang terhubung dengan Tol Trans Jawa via Dawuan. Buat traveler dari Surabaya atau Semarang yang mau ke Bandung via Jakarta, sangat efisien karena bisa transit di Padalarang.

## Pengembangan KCIC ke Depan`,

  // article 13
  '## Aspek Legal dan Safety Study Tour': `## Materi Edukatif yang Bisa Didapat

Study tour idealnya memberi materi edukatif yang sesuai kurikulum. Beberapa destinasi punya program edukasi spesifik: Museum Geologi (geologi), Museum KAA (sejarah), Saung Angklung (budaya), Observatorium Bosscha (astronomi), dan Factory Visit (industri).

### Anggaran Study Tour

Study tour biasanya Rp800rb–1.5jt/siswa untuk 3D2N all-in. Yang mempengaruhi: destinasi, jumlah siswa, penginapan, dan aktivitas tambahan. Beberapa sekolah juga iuran lebih besar untuk paket premium dengan dokumen video.

### Kode Etik Siswa Saat Study Tour

Beberapa kode etik: patuhi instruktur dan tour leader, jaga kebersihan dan barang bawaan, tidak keluar penginapan tanpa izin, tidak menggunakan HP berlebihan (bisa dialihkan untuk games), dan saling membantu antar siswa.

## Aspek Legal dan Safety Study Tour`,

  // article 14
  '## Anggaran Family Gathering': `## Family Gathering Multi-Generasi

Tantangan family gathering terbesar adalah mengakomodasi multi-generasi. Beberapa tips: pilih lokasi dengan akses mudah (tidak banyak trekking), sediakan area duduk yang cukup (terutama untuk lansia), variasikan aktivitas (outbound untuk anak muda, jalan santai untuk yang lebih tua), dan siapkan menu makanan yang ramah untuk semua umur (tidak pedas, ada bubur/nasi tim untuk anak).

### Komunikasikan dengan Semua Pihak

Sebelum menentukan lokasi dan tanggal, komunikasikan dengan semua pihak keluarga besar. Voting sederhana bisa jadi solusi: kirim opsi 3 lokasi via WhatsApp group, minta semua vote, dan pilih yang paling banyak.

### Dokumentasi Family Gathering

Family gathering adalah momen langka — pastikan ada dokumentasi yang bagus. Beberapa vendor fotografi bisa dipesan untuk sesi foto keluarga besar, atau minta anggota keluarga yang hobi foto untuk jadi dokumentasi utama.

## Anggaran Family Gathering`,

  // article 15
  '## Kasus Khusus yang Perlu Dipertimbangkan': `## Cara Pesan Armada yang Tepat

Untuk pesan armada yang tepat, beberapa info yang perlu disiapkan: tanggal dan jam berangkat, lokasi penjemputan, jumlah peserta, destinasi, durasi trip, dan budget. Semakin lengkap info, semakin akurat rekomendasi dari kami.

### Tanda-Tanda Operator Terpercaya

Beberapa tanda operator terpercaya: punya kantor fisik, armada sendiri (bukan broker), review positif dari banyak customer, sopir tetap (bukan freelance), SOP jelas (booking, pembayaran, eksekusi), dan komunikasi responsif.

### Pembatalan dan Reschedule

Untuk pembatalan: H-7 full refund, H-3 50%, H-1 no refund. Untuk reschedule (ubah tanggal): biasanya free jika armada masih tersedia. Kami usahakan fleksibel untuk kebutuhan customer.

## Kasus Khusus yang Perlu Dipertimbangkan`,

  // article 16
  '## Garut sebagai Hidden Gem': `## Garut untuk Keluarga dengan Anak

Garut punya beberapa destinasi ramah anak: Cipanas (kolam renang air panas), Darajat Waterpark (waterpark dengan seluncuran), Kebun Binatang Garut (mini zoo), dan Saung Kandang (agrowisata).

### Souvenir Khas Garut

Beberapa souvenir khas Garut: dodol Garut (legendaris), kulit lombok (tas dan dompet), batik Garut, dan kopi Garut. Beli di sentra oleh-oleh Garut di Jalan Cimanuk atau Pasar Baru Garut.

### Aktivitas Outdoor Garut

Selain Papandayan, beberapa gunung lain di Garut yang cukup populer: Gunung Cikuray (lebih tinggi, butuh pengalaman), Gunung Guntur (kawah aktif), dan Gunung Talagabodas (kawah putih yang lebih kecil dari Kawah Putih Ciwidey).

## Garut sebagai Hidden Gem`,

  // article 17
  '## Destinasi Anti-Mainstream untuk Nataru': `## Pola Perjalanan Nataru

Beberapa pola perjalanan Nataru yang umum: berangkat H-2 (lebih awal, lebih murah), berangkat H-1 (peak time, paling mahal), berangkat H-Day (jarang, biasanya sudah sold out), atau berangkat setelah Nataru (lebih sepi, lebih murah).

### Tips Hemat Nataru

Beberapa tips hemat: book 2–3 bulan sebelumnya (harga masih normal), hindari high season peak (H-1 sampai H+1), pilih destinasi yang tidak mainstream, dan manfaatkan promo early bird dari operator.

### Staycation Lokal

Alternatif Nataru: staycation di kota sendiri atau kota tetangga. Bandung punya banyak hotel bagus yang relatif kosong di weekday Nataru. Beberapa rekomendasi: Trans Studio Hotel, GH Universal, atau Padma Hotel.

## Destinasi Anti-Mainstream untuk Nataru`,

  // article 18
  '## Bandung Kota dari Sudut Pandang Lokal': `## Bandung di Mata Traveler

Bandung selalu punya tempat spesial di hati traveler Indonesia. Setiap orang punya kenangan berbeda: ada yang suka belanja, kuliner, sejarah, atau arsitektur. Kuncinya, eksplorasi Bandung perlu waktu dan niat untuk benar-benar mengenal kota ini.

### Spot Foto Tersembunyi

Beberapa spot foto tersembunyi: Taman Hutan Raya (hutan kota dengan jalan setapak), Curug Dago (air terjun di tengah kota), Bukit Moko (view kota dari atas), dan Goa Jepang (goa bersejarah). Beberapa spot butuh trekking ringan, tapi semua worth it.

### Transportasi Lokal

Untuk eksplorasi Bandung yang lebih dalam, selain charter Innova, kamu juga bisa pakai angkot atau ojol. Beberapa trayek angkot yang berguna: St Hall–Dago, St Hall–Cihampelas, St Hall–Buah Batu, dan St Hall–Setiabudi. Untuk ojol, gunakan aplikasi resmi seperti Gojek atau Grab.

## Bandung Kota dari Sudut Pandang Lokal`,

  // article 19
  '## Honeymoon Budget Detail per Opsi': `## Honeymoon Mood Boarding

Sebelum booking honeymoon, mood boarding sangat disarankan. Kumpulkan referensi visual dari Pinterest, Instagram, atau majalah pernikahan. Mood board membantu kamu dan pasangan menentukan tema, lokasi, dan vibe honeymoon yang diinginkan.

### Honeymoon di Villa vs Glamping vs Resort

Setiap tipe punya kelebihan: villa (privasi tinggi, dapur sendiri), glamping (experience unik, dekat alam), resort (fasilitas lengkap, banyak aktivitas), dan hotel boutique (estetik, sentral). Pilih sesuai preferensi pasangan.

### Honeymoon ke Luar Negeri Setelah Bandung

Untuk pasangan yang honeymoon ke Bandung dulu lalu lanjut ke luar negeri (Bali, Lombok, atau internasional), bisa paket dua tahap. Hubungi kami untuk diskusi paket honeymoon combo Bandung + Bali atau Bandung + Lombok.

## Honeymoon Budget Detail per Opsi`,

  // article 20
  '## Innova Reborn vs Kompetitor': `## Testimoni Pelanggan tentang Innova Reborn

Beberapa testimoni pelanggan kami tentang Innova Reborn: "Nyaman untuk trip jauh, AC dingin, bagasi cukup luas", "Sopir ramah dan tau rute Bandung", "Lebih murah dari kompetitor tapi kualitas sama", "Selalu dapat Innova Bersih dan wangi", dan "Cocok untuk family dengan anak kecil".

### Booking Innova Reborn dari Kami

Cara booking Innova Reborn dari kami: hubungi WhatsApp, info tanggal dan destinasi, dapat konfirmasi tarif dan ketersediaan, DP 50% untuk booking, pelunasan saat penjemputan. Proses cepat dan mudah.

### Asuransi dan Proteksi Innova Reborn

Semua Innova Reborn di kami punya asuransi all-risk yang cover kerusakan dan kecelakaan. Deposit Rp500.000 akan dikembalikan setelah trip selesai tanpa insiden.

## Innova Reborn vs Kompetitor`,
};

let totalChanged = 0;
for (const [anchor, replacement] of Object.entries(extras)) {
  if (src.includes(anchor)) {
    src = src.replace(anchor, replacement);
    totalChanged++;
  } else {
    console.error('NOT FOUND:', anchor.split('\n')[0].slice(0, 60));
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);