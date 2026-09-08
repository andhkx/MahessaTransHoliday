const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

// Find each "## Kesimpulan" line and prepend a closing note paragraph right after.
// We need to do this per-article to keep content varied. Identify each by the line just before "## Kesimpulan".

// Strategy: for each article, append right before its "## Kesimpulan" a few sentences.
// Find each unique Q&A pair that immediately precedes "## Kesimpulan" and use that as anchor.

const articlesToExpand = [
  // Article 2 - 1139
  { before: 'A: Bisa banget, berangkat subuh jam 5, sampai Bandung jam 8. Tapi lebih enak 2 hari 1 malam.', text: `Untuk rekomendasi itinerary 2D1N dan 3D2N Ciwidey lebih lengkap, kamu bisa cek [paket Ciwidey all-in](/paket) kami yang sudah include semua kebutuhan. Atau diskusi langsung via WhatsApp untuk itinerary custom.

Sebagai catatan akhir, semua destinasi di Ciwidey bisa dicapai dengan Hiace Premio atau Innova Reborn dari Cimahi. Sopir kami sudah berpengalaman dan tahu semua spot parking terbaik. Bawain jaket, masker untuk Kawah Putih, dan kacamata hitam untuk aktivitas outdoor. Selamat menikmati liburan Ciwidey!` },
  // Article 3 - 944
  { before: 'A: Bisa, kami bisa paket dari penjemputan di bandara atau stasiun.', text: `Untuk paket Pangandaran 3 hari 2 malam all-in dari kami, cek [paket Pangandaran](/paket) yang sudah include Hiace Premio, hotel, makan, dan semua tiket masuk. DP 30% untuk konfirmasi, pelunasan H-3.

Sebagai informasi tambahan, untuk musim terbaik ke Pangandaran adalah April–Oktober. Hindari Desember–Februari karena ombak besar dan hujan. Kalau tetap mau datang di musim hujan, bawain jas hujan dan sandal yang aman untuk licin.

Pangandaran tetap jadi pilihan utama untuk liburan keluarga karena kombinasi pantai, outbound, dan seafood yang lengkap. Booking lebih awal untuk high season supaya dapat hotel dan Hiace Premio yang sesuai.` },
  // Article 4 - 976
  { before: 'A: Bisa. Booking jauh-jauh hari terutama di wedding season.', text: `Untuk paket Bromo dari Bandung all-in, kamu bisa cek [paket Bromo kami](/paket) yang sudah include Hiace Premio 3 hari, hotel di Cemoro Lawang, jeep sunrise, tiket masuk, dan makan 3 hari. DP 30% untuk konfirmasi.

Sebagai catatan teknis, kondisi jalan Tol Trans Jawa sangat lancar untuk Hiace Premio. Sopir kami sudah terbiasa dengan rute jauh dan siap handle semua situasi. Bawain obat mabuk untuk yang sensitif, jaket tebal, sarung tangan, masker untuk Kawah Bromo, dan sepatu gunung untuk trekking.

Bromo dari Bandung via Hiace adalah pengalaman yang sangat berkesan. Sunrise di Penjangan dengan view lautan pasir dan gunung-gunung di kejauhan adalah momen yang akan kamu ingat selamanya.` },
  // Article 6 - 967
  { before: 'A: Hiace Commuter 6 jam dengan tarif ±Rp900.000.', text: `Sebagai ringkasan, charter Hiace di Bandung untuk 2025 sangat reasonable. Innova Reborn Rp1.3jt atau Hiace Premio Rp1.5jt adalah harga standar untuk 12 jam. Booking via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak) untuk jadwal sesuai kebutuhan.

Untuk konsultasi gratis tentang pilihan armada sesuai kebutuhan trip kamu, hubungi kami. Kami akan bantu rekomendasikan Innova, Hiace, Elf, atau Medium Bus yang paling efisien.

Charter Hiace tetap jadi pilihan favorit untuk group 8–12 orang karena keseimbangan antara harga, kapasitas, dan kenyamanan. Cocok untuk family gathering, outing kantor, atau liburan keluarga besar.` },
  // Article 7 - 993
  { before: 'A: 30 menit via Jalan Kolonel Masturi atau Tol Cipularang keluar Cikamuning.', text: `Sebagai ringkasan, Lembang 1 hari dengan itinerary 3 destinasi utama sudah cukup. Tambahkan 1–2 spot foto atau kuliner jika waktu memungkinkan. Booking Hiace atau Innova dari Cimahi via WhatsApp [62895327077214](https://wa.me/62895327077214) supaya lebih efisien.

Untuk itinerary 2 hari termasuk Glamping Lakeside di Ciwidey, cek [artikel itinerary Ciwidey](/artikel/itinerary-ciwidey-2-hari-1-malam) kami. Kombinasi Lembang day 1 + Ciwidey day 2 sangat populer.

Lembang selalu jadi pilihan utama untuk one-day trip dari Bandung karena kombinasi alam, rekreasi keluarga, dan kuliner. Kami siap handle charter Hiace atau Innova dari Cimahi untuk trip kamu.` },
  // Article 8 - 1062
  { before: 'A: Bisa. Kami partner dengan beberapa vendor outbound terpercaya di Bandung. Bisa disesuaikan budget dan kebutuhan.', text: `Sebagai informasi tambahan, untuk paket gathering yang sudah kami handle, beberapa lokasi populer: Lembang, Ciwidey, Pangandaran, Garut, dan Bandung kota. Setiap lokasi punya karakter berbeda — tim kami akan bantu pilih yang sesuai kebutuhan tim kamu.

Diskusi langsung via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak) untuk paket gathering custom sesuai budget dan jumlah peserta.

Gathering yang sukses butuh persiapan yang matang, vendor yang tepat, dan itinerary yang sesuai. Tim kami siap bantu dari planning sampai eksekusi hari H.` },
  // Article 9 - 1075
  { before: 'A: Bisa. Hiace Premio cocok untuk keluarga besar pengantin atau untuk wedding party.', text: `Sebagai catatan, semua wedding car kami sudah termasuk sopir profesional, dekorasi standar, dan bensin. Tambahan biaya hanya untuk tol, makan sopir, dan parkir di venue. Untuk wedding car booking, biasanya DP 50% dan pelunasan H-7.

Diskusi via WhatsApp [62895327077214](https://wa.me/62895327077214) untuk wedding car booking atau paket wedding all-in termasuk WO partner. Kami akan bantu rekomendasi sesuai tema dan budget wedding kamu.

Wedding car adalah bagian penting dari dokumentasi dan dekorasi pernikahan. Pilih armada yang sesuai tema, Alphard untuk kesan premium, Innova untuk favorit, Hiace Premio untuk keluarga besar.` },
  // Article 12 - 971
  { before: 'A: Belum ada travel reguler. Best option: charter Innova dari kami, atau naik travel online.', text: `Sebagai informasi tambahan, beberapa maskapai yang terbang dari Halim (Jakarta) ke Padalarang via Whoosh: KCIC sebagai operator tunggal. Tiket bisa dipesan via aplikasi Whoosh, website resmi, atau partner seperti Traveloka. Booking 1–2 minggu sebelumnya untuk harga terbaik.

Untuk diskusi lebih lanjut atau booking transport lanjutan dari Padalarang, hubungi kami via WhatsApp atau [form kontak](/kontak). Kami siap standby di titik jemput sesuai kebutuhan.

Stasiun KCIC Padalarang adalah game changer untuk akses Jakarta–Bandung. Dengan waktu tempuh 45 menit, perjalanan bisnis atau liburan jadi jauh lebih efisien.` },
  // Article 13 - 1003
  { before: 'A: Ya, untuk grup 30+ siswa kami sediakan satu tour leader profesional.', text: `Sebagai catatan tambahan, study tour dari kami sudah termasuk: transport Medium Bus atau Hiace Premio, hotel bintang 3, makan 3 hari, tiket masuk semua destinasi, tour leader, dokumentasi, dan snack box. Asuransi perjalanan juga sudah include untuk perlindungan ekstra.

Diskusi via WhatsApp [62895327077214](https://wa.me/62895327077214) atau [form kontak](/kontak) untuk paket study tour sesuai jumlah siswa dan destinasi pilihan sekolah kamu.

Study tour Bandung adalah momen penting untuk siswa. Pilih paket yang sesuai kurikulum, aman, dan berkesan. Tim kami siap membantu dari planning sampai eksekusi.` },
];

let totalChanged = 0;
for (const { before, text } of articlesToExpand) {
  if (src.includes(before)) {
    src = src.replace(before + '\n\n## Kesimpulan', before + '\n\n' + text + '\n\n## Kesimpulan');
    totalChanged++;
  } else {
    console.error('NOT FOUND:', before.slice(0, 60));
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);