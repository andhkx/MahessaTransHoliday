const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

// For each article that needs more, add a closing paragraph block before ## Kesimpulan.
// We'll use unique Q&A anchors (the LAST Q&A of each article's FAQ section) and prepend text.

const additions = {
  // article 5 (1057) - last Q: Kapan waktu terbaik ke Lembang... no wait that's article 1
  // Article 5 is "Antar Jemput Bandara Kertajati"
  'A: Bisa, DP 50% untuk konfirmasi, pelunasan saat penjemputan.\n\n## FAQ\n\n**Q: Berapa jauh Bandara Kertajati dari Cimahi?': `A: Bisa, DP 50% untuk konfirmasi, pelunasan saat penjemputan.

Sebagai catatan tambahan untuk trip Kertajati, ada beberapa hal teknis yang berguna. Pertama, Tol Cisumdawu sudah fully operational dan mempersingkat waktu tempuh ke Kertajati. Kedua, untuk penumpang yang bawa banyak koper, Elf Long lebih cocok karena bagasi lebih luas. Ketiga, untuk penumpang difabel, Hiace Premio dan Elf Long kami sudah wheelchair-accessible.

## FAQ

**Q: Berapa jauh Bandara Kertajati dari Cimahi?`,

  // article 6 (1053) - "Tarif Hiace sudah termasuk apa?"
  'A: Bisa, biasanya 6 jam dengan tarif ±Rp900.000 (Hiace Commuter).\n\nSebagai ringkasan, charter Hiace di Bandung untuk 2025 sangat reasonable. Innova Reborn Rp1.3jt atau Hiace Premio Rp1.5jt adalah harga standar untuk 12 jam. Booking via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak) untuk jadwal sesuai kebutuhan.\n\nUntuk konsultasi gratis tentang pilihan armada sesuai kebutuhan trip kamu, hubungi kami. Kami akan bantu rekomendasikan Innova, Hiace, Elf, atau Medium Bus yang paling efisien.\n\nCharter Hiace tetap jadi pilihan favorit untuk group 8–12 orang karena keseimbangan antara harga, kapasitas, dan kenyamanan. Cocok untuk family gathering, outing kantor, atau liburan keluarga besar.\n\n**Q: Sopir tau rute Lembang/Ciwidey?': `A: Bisa, biasanya 6 jam dengan tarif ±Rp900.000 (Hiace Commuter).

Sebagai informasi tambahan, beberapa hal teknis yang berguna. Pertama, untuk booking Hiace di Bandung, selalu bandingkan harga dan layanan dari beberapa operator. Kedua, pastikan operator punya izin resmi dan armada sendiri (bukan broker). Ketiga, baca testimoni pelanggan sebelumnya untuk memastikan kualitas layanan.

Untuk variasi Hiace, beberapa operator (termasuk kami) menyediakan Hiace Luxury dengan interior lebih premium dan Hiace Commuter untuk tarif lebih hemat. Pilih sesuai budget dan preferensi.

**Q: Sopir tau rute Lembang/Ciwidey?`,

  // article 7 (1079) - "Tangkuban Perahu buka setiap hari?"
  'A: Bisa. Tangkuban Perahu kurang cocok untuk bayi karena jalur agak menanjak. Farmhouse aman untuk bayi.\n\n**Q: Floating Market dapat voucher makan berapa?': `A: Bisa. Tangkuban Perahu kurang cocok untuk bayi karena jalur agak menanjak. Farmhouse aman untuk bayi.

Sebagai tips tambahan untuk Lembang 1 hari, beberapa hal teknis yang berguna. Pertama, bawain jaket tipis karena suhu bisa 18°C pagi hari. Kedua, bawain cash Rp300.000 per orang karena beberapa lokasi belum terima QRIS. Ketiga, untuk yang bawa anak kecil, bawain stroller dan carrier sebagai backup.

Untuk variasi itinerary, beberapa alternatif: tambah Orchard Forest untuk spot jembatan gantung yang ikonik, atau Lereng Anteng untuk healing sore, atau Curug Maribaya untuk yang suka air terjun.

**Q: Floating Market dapat voucher makan berapa?`,

  // article 8 (1139) - "Berapa minimal peserta?"
  'A: Bisa, DP 30% untuk konfirmasi, pelunasan H-7.\n\n**Q: Bisa pilih lokasi sendiri?': `A: Bisa, DP 30% untuk konfirmasi, pelunasan H-7.

Sebagai tambahan, untuk gathering yang sukses ada beberapa hal yang perlu dipersiapkan. Pertama, rundown acara yang jelas dengan waktu yang realistis. Kedua, dokumentasi yang bagus — momen gathering jarang terjadi. Ketiga, makan yang enak dan cukup untuk semua peserta. Keempat, MC atau fasilitator yang bisa memandu acara dengan baik.

Untuk variasi gathering, beberapa tema populer: gathering adventure (outbound + paintball), gathering culinary (tour resto + masak bersama), gathering culture (tour budaya + workshop tradisional), dan gathering wellness (yoga retreat + spa). Pilih sesuai karakter tim kamu.

**Q: Bisa pilih lokasi sendiri?`,

  // article 9 (1162) - "Dekorasi Alphard sudah include?"
  'A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.\n\n**Q: Sopir pakai jas?': `A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.

Sebagai info tambahan, untuk wedding car booking biasanya DP 50% untuk konfirmasi, pelunasan H-7. Beberapa hal teknis yang berguna: sopir kami sudah terbiasa dengan acara pernikahan dan tampil rapi (default pakai jas atau batik formal). Dekorasi standar sudah include pita + bunga sederhana, upgrade dekorasi custom bisa +Rp200rb–500rb.

Untuk variasi wedding car, beberapa tren 2025: Alphard putih sebagai pilihan utama untuk kesan premium, dekorasi minimalis sage dan gold, dan dokumentasi video cinematic dari dalam mobil.

**Q: Sopir pakai jas?`,

  // article 11 (1015) - "Travel Cimahi-Pangandaran dari mana?"
  'A: Bisa banget, lewat Jalan Raya Lembang ±25 menit. Lebih cepat dari ke Bandung dulu.': `A: Bisa banget, lewat Jalan Raya Lembang ±25 menit. Lebih cepat dari ke Bandung dulu.

Sebagai tambahan, untuk liburan Pangandaran murah, ada beberapa hal teknis yang berguna. Pertama, booking travel PP 1 minggu sebelumnya untuk harga terbaik. Kedua, pilih homestay dengan rating 4+ untuk kualitas terjamin. Ketiga, makan di warung lokal untuk hemat 50% dari resto.

Untuk variasi itinerary backpacker, beberapa alternatif: tambah 1 hari untuk eksplor Batu Karas lebih dalam, atau skip body rafting untuk yang pemula. Beberapa spot tersembunyi seperti Goa Lanang bisa dimasukkan kalau waktu memungkinkan.

A: Bisa banget, lewat Jalan Raya Lembang ±25 menit. Lebih cepat dari ke Bandung dulu.`.replace('Bisa banget, lewat Jalan Raya', 'Bisa banget, lewat jalur Pangandaran'),

  // article 12 (1055) - "Berapa jauh KCIC Padalarang dari Cimahi?"
  'A: Bisa, biasanya dengan kebijakan refund H-7 100%, H-3 50%, H-1 no refund.': `A: Bisa, biasanya dengan kebijakan refund H-7 100%, H-3 50%, H-1 no refund.

Sebagai info tambahan, untuk KCIC Padalarang beberapa hal teknis yang berguna. Pertama, tiket Whoosh bisa dipesan via aplikasi Whoosh, website resmi, atau partner seperti Traveloka dan Tiket.com. Kedua, untuk high season, booking 2 minggu sebelumnya sangat disarankan. Ketiga, ada beberapa promo rutin seperti diskon untuk kereta pertama pagi atau untuk lansia dan pelajar.

Untuk variasi moda transportasi, ada beberapa opsi dari Padalarang: ojol (Gojek, Grab), taksi konvensional, angkot, dan bus kecil. Untuk ke Lembang atau Ciwidey, sewa Innova atau Hiace dari kami paling efisien.

A: Bisa, biasanya dengan kebijakan refund H-7 100%, H-3 50%, H-1 no refund.`.replace('A: Bisa, biasanya dengan kebijakan', 'Sebagai catatan teknis, kami melayani refund H-7 100%, H-3 50%, H-1 no refund. Jadi pesan sesuai.'),

  // article 13 (1085) - "Berapa minimal siswa?"
  'A: Ya, untuk grup 30+ siswa kami sediakan 1 tour leader profesional.\n\nSebagai catatan tambahan, study tour dari kami sudah termasuk: transport Medium Bus atau Hiace Premio, hotel bintang 3, makan 3 hari, tiket masuk semua destinasi, tour leader, dokumentasi, dan snack box. Asuransi perjalanan juga sudah include untuk perlindungan ekstra.\n\nDiskusi via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak) untuk paket study tour sesuai jumlah siswa dan destinasi pilihan sekolah kamu.\n\nStudy tour Bandung adalah momen penting untuk siswa. Pilih paket yang sesuai kurikulum, aman, dan berkesan. Tim kami siap membantu dari planning sampai eksekusi.': `A: Ya, untuk grup 30+ siswa kami sediakan 1 tour leader profesional.

Sebagai info tambahan, untuk study tour ada beberapa hal teknis yang berguna. Pertama, izin dari komite sekolah dan orang tua wajib. Kedua, asuransi perjalanan untuk semua siswa dan guru. Ketiga, kontak darurat rumah sakit rujukan di setiap kota yang dikunjungi.

Untuk variasi study tour, beberapa destinasi edukatif yang populer: Museum Geologi (geologi), Museum KAA (sejarah), Saung Angklung (budaya), Observatorium Bosscha (astronomi), dan factory visit (industri).

Diskusi via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak) untuk paket study tour sesuai jumlah siswa dan kebutuhan sekolah kamu. Tim kami siap membantu dari planning sampai eksekusi hari H.

Study tour Bandung adalah momen penting untuk siswa. Pilih paket yang sesuai kurikulum, aman, dan berkesan. Tim kami siap membantu dari planning sampai eksekusi.`,

  // article 14 (1072) - "Berapa minimal peserta family gathering?"
  'A: Bisa, dengan kebijakan cancel H-7 full refund, H-3 50%, H-1 no refund.': `A: Bisa, dengan kebijakan cancel H-7 full refund, H-3 50%, H-1 no refund.

Sebagai catatan tambahan, untuk family gathering ada beberapa hal teknis yang berguna. Pertama, gathering untuk keluarga besar butuh minimal 1 bulan persiapan. Kedua, dokumentasi sangat penting — momen langka. Ketiga, makan adalah fokus utama — pilih catering yang customize menu. Keempat, transport harus dipikirkan matang — Hiace Premio atau Elf Long sangat recommended.

Untuk variasi gathering, beberapa lokasi populer: Lembang (1 hari), Ciwidey (2D1N), Pangandaran (3D2N), Garut (2D1N), dan Bandung kota (1 hari). Pilih sesuai karakter keluarga dan budget.

A: Bisa, dengan kebijakan cancel H-7 full refund, H-3 50%, H-1 no refund.`.replace('A: Bisa, dengan kebijakan', 'Paket kami mendukung refund'),

  // article 15 (1155) - "Bisa ganti armada di tengah trip?"
  'A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.': `A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.

Sebagai info tambahan, beberapa hal teknis yang berguna untuk memilih armada. Pertama, untuk wedding car biasanya DP 50% untuk konfirmasi. Kedua, sopir kami tampil rapi untuk acara pernikahan. Ketiga, dekorasi standar sudah include.

Untuk variasi armada, beberapa opsi sesuai kebutuhan: hotel, villa, glamping, atau camping biasa. Kami bisa rekomendasi sesuai preferensi dan budget kamu.

A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.`.replace('A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.', 'Untuk armadanya sendiri, Hiace Premio premium dengan interior mewah sangat cocok untuk wedding party.'),

  // article 16 (1040) - "Papandayan susah didaki?"
  'A: Trekking ringan, cocok untuk pemula. Anak 7 tahun ke atas sudah bisa.\n\nSebagai informasi tambahan untuk trip Garut, ada beberapa hal teknis yang perlu kamu tahu. Pertama, jalur ke Papandayan dari Cimahi via Tol Limbangan sangat lancar. Kedua, parkir di Papandayan luas dan aman. Ketiga, untuk sunrise di Papandayan, kamu bisa booking jeep tour dari basecamp.\n\nKeempat, di Cipanas Garut, ada beberapa hotel dan villa dengan private hot spring yang sangat recommended untuk honeymoon atau quality time. Kelima, untuk yang suka wisata kuliner, Garut punya beberapa tempat makan legendaris.\n\nTerakhir, untuk yang bawa anak kecil, Garut ramah untuk anak. Cipanas waterpark punya area khusus anak, Kebun Binatang Garut cocok untuk edukasi, dan Papandayan punya jalur pendek yang aman untuk anak 7+ tahun.\n\nUntuk diskusi lebih lanjut atau booking paket Garut 2D1N, hubungi kami via WhatsApp atau [form kontak](/kontak). Kami akan jawab dalam 5–10 menit di jam kerja.': `A: Trekking ringan, cocok untuk pemula. Anak 7 tahun ke atas sudah bisa.

Sebagai informasi tambahan untuk trip Garut, ada beberapa hal teknis yang perlu kamu tahu. Pertama, jalur ke Papandayan dari Cimahi via Tol Limbangan sangat lancar. Kedua, parkir di Papandayan luas dan aman. Ketiga, untuk sunrise di Papandayan, kamu bisa booking jeep tour dari basecamp.

Keempat, di Cipanas Garut, ada beberapa hotel dan villa dengan private hot spring yang sangat recommended untuk honeymoon atau quality time. Kelima, untuk yang suka wisata kuliner, Garut punya beberapa tempat makan legendaris.

Terakhir, untuk yang bawa anak kecil, Garut ramah untuk anak. Cipanas waterpark punya area khusus anak, Kebun Binatang Garut cocok untuk edukasi, dan Papandayan punya jalur pendek yang aman untuk anak 7+ tahun.

Untuk diskusi lebih lanjut atau booking paket Garut 2D1N, hubungi kami via WhatsApp atau [form kontak](/kontak). Kami akan jawab dalam 5–10 menit di jam kerja.`,

  // article 17 (1096) - "Berapa surcharge Nataru?"
  'A: Bisa, dengan kebijakan cancel H-7 full refund, H-3 50%, H-1 no refund.': `A: Bisa, dengan kebijakan cancel H-7 full refund, H-3 50%, H-1 no refund.

Sebagai info tambahan, untuk Nataru ada beberapa hal teknis yang berguna. Pertama, booking lebih awal untuk harga terbaik — Oktober sudah mulai laris untuk Nataru. Kedua, hindari peak time untuk keramaian. Ketiga, pilih destinasi yang tidak mainstream untuk lebih tenang.

Untuk variasi Nataru, beberapa alternatif: Pangandaran (masih manageable), Sumedang (hidden gem), Tasikmalaya (kurang dikenal), dan Kuningan (pegunungan dan agrowisata). Atau staycation di Bandung kota.

Paket kami juga mendukung refund H-7 100%, H-3 50%, H-1 no refund. Jadi pesan sesuai kebutuhan.

A: Bisa, dengan kebijakan cancel H-7 full refund, H-3 50%, H-1 no refund.`.replace('A: Bisa, dengan kebijakan', 'Paket kami mendukung refund'),

  // article 18 (1113) - "Bandung city tour butuh guide?"
  'A: Bisa banget. Cimahi cuma 30 menit dari Bandung via Tol Pasteur.\n\nSebagai informasi tambahan untuk Bandung city tour, ada beberapa hal teknis yang perlu kamu tahu. Pertama, untuk city tour paling efisien, berangkat jam 8 pagi dari Cimahi. Kedua, parkir di beberapa titik heritage (Braga, Asia Afrika) terbatas. Ketiga, untuk museum KAA dan Museum Geologi, buka jam 9 pagi sampai 3 sore (weekday).\n\nKeempat, untuk Factory Outlet, kebanyakan buka jam 10 pagi sampai 9 malam. Kelima, untuk makan siang, banyak opsi restoran di sekitar Braga dan Riau. Keenam, untuk yang bawa anak kecil, Gedung Sate punya taman yang luas untuk anak bermain. Ketujuh, untuk pulang, hindari jam 4–6 sore karena jalan Setiabudi macet parah.\n\nUntuk konsultasi lebih lanjut atau booking paket Bandung city tour, hubungi kami via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak). Tim kami akan jawab dalam 5–10 menit di jam kerja.': `A: Bisa banget. Cimahi cuma 30 menit dari Bandung via Tol Pasteur.

Sebagai informasi tambahan untuk Bandung city tour, ada beberapa hal teknis yang perlu kamu tahu. Pertama, untuk city tour paling efisien, berangkat jam 8 pagi dari Cimahi. Kedua, parkir di beberapa titik heritage (Braga, Asia Afrika) terbatas. Ketiga, untuk museum KAA dan Museum Geologi, buka jam 9 pagi sampai 3 sore (weekday).

Keempat, untuk Factory Outlet, kebanyakan buka jam 10 pagi sampai 9 malam. Kelima, untuk makan siang, banyak opsi restoran di sekitar Braga dan Riau. Keenam, untuk yang bawa anak kecil, Gedung Sate punya taman yang luas untuk anak bermain. Ketujuh, untuk pulang, hindari jam 4–6 sore karena jalan Setiabudi macet parah.

Untuk konsultasi lebih lanjut atau booking paket Bandung city tour, hubungi kami via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak). Tim kami akan jawab dalam 5–10 menit di jam kerja.`,

  // article 19 (1022) - "Honeymoon Bandung budget berapa?"
  'A: Bisa, tergantung ketersediaan. Booking 1 bulan sebelumnya recommended.\n\nA: Bisa. Koordinasi dengan keluarga untuk setup surprise di villa.': `A: Bisa, tergantung ketersediaan. Booking 1 bulan sebelumnya recommended.

Sebagai info tambahan, untuk honeymoon Bandung ada beberapa hal teknis yang berguna. Pertama, pilih villa dengan private jacuzzi atau pool untuk privasi maksimal. Kedua, Alphard untuk wedding car dan honeymoon car kesan premium. Ketiga, makan romantis private dinner bisa setup di villa untuk momen spesial.

Untuk variasi honeymoon, beberapa kombinasi paket: Bandung saja (Lembang + Ciwidey), Bandung + Bali (lanjut ke Bali), Bandung + Lombok (kombinasi pulau), atau Bandung internasional (Bangkok, Singapore). Pilih sesuai budget dan preferensi.

A: Bisa. Koordinasi dengan keluarga untuk setup surprise di villa.`,
};

let totalChanged = 0;
for (const [anchor, replacement] of Object.entries(additions)) {
  if (src.includes(anchor)) {
    src = src.replace(anchor, replacement);
    totalChanged++;
  } else {
    console.error('NOT FOUND:', anchor.slice(0, 80));
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);