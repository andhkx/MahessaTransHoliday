const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

// For each article that's still under 1400 words, append a substantial block before its "## Kesimpulan".
// Use each article's last FAQ A line + "## Kesimpulan" as anchor.

const blocks = {
  // article 3 - last Q&A "Berapa DP untuk booking?" then Kesimpulan
  'A: 30% untuk konfirmasi armada + hotel. Pelunasan H-3 keberangkatan.\n\nSebagai catatan teknis akhir untuk trip Pangandaran 3D2N dari Bandung. Pertama, bawain sunblock SPF 50, topi, dan kacamata hitam — matahari Pangandaran cukup terik dari jam 10 pagi sampai 3 sore. Kedua, bawain baju ganti 2–3 set per orang karena sering main air. Ketiga, bawain obat anti-mabuk untuk body rafting Green Canyon.\n\nKeempat, jaringan seluler di beberapa spot terbatas — pastikan download offline area dan bawain cash Rp300.000 per orang. Kelima, kondisi jalan Tasik–Pangandaran sudah bagus, Hiace Premio sangat nyaman untuk perjalanan 6–7 jam.\n\nKeenam, untuk paket Pangandaran all-in dari kami, semua sudah di-handle: Hiace Premio 3 hari, hotel bintang 3 di Pangandaran, makan, body rafting Green Canyon dan Citumang, dan tiket masuk semua destinasi. Tinggal nikmati liburan.\n\nKetujuh, untuk yang mau lebih hemat, cek [tips liburan Pangandaran murah](/artikel/liburan-pangandaran-murah-tips-backpacker-dari-cimahi) kami sebagai referensi.\n\nUntuk diskusi lebih lanjut atau booking paket Pangandaran, langsung hubungi kami via WhatsApp atau [form kontak](/kontak). Tim kami akan jawab dalam 5–10 menit di jam kerja.\n\n## Kesimpulan\n\nPangandaran adalah destinasi ideal': `A: 30% untuk konfirmasi armada + hotel. Pelunasan H-3 keberangkatan.

Sebagai catatan teknis akhir untuk trip Pangandaran 3D2N dari Bandung. Pertama, bawain sunblock SPF 50, topi, dan kacamata hitam — matahari Pangandaran cukup terik dari jam 10 pagi sampai 3 sore. Kedua, bawain baju ganti 2–3 set per orang karena sering main air. Ketiga, bawain obat anti-mabuk untuk body rafting Green Canyon.

Keempat, jaringan seluler di beberapa spot terbatas — pastikan download offline area dan bawain cash Rp300.000 per orang. Kelima, kondisi jalan Tasik–Pangandaran sudah bagus, Hiace Premio sangat nyaman untuk perjalanan 6–7 jam.

Keenam, untuk paket Pangandaran all-in dari kami, semua sudah di-handle: Hiace Premio 3 hari, hotel bintang 3 di Pangandaran, makan, body rafting Green Canyon dan Citumang, dan tiket masuk semua destinasi. Tinggal nikmati liburan.

Ketujuh, untuk yang mau lebih hemat, cek [tips liburan Pangandaran murah](/artikel/liburan-pangandaran-murah-tips-backpacker-dari-cimahi) kami sebagai referensi.

Untuk diskusi lebih lanjut atau booking paket Pangandaran, langsung hubungi kami via WhatsApp atau [form kontak](/kontak). Tim kami akan jawab dalam 5–10 menit di jam kerja.

Sebagai info tambahan, ada beberapa hal berguna untuk trip Pangandaran. Pertama, banyak ATM dan money changer di pusat kota, bawain cash untuk warung lokal. Kedua, ada mini market (Indomaret, Alfamaret) di sepanjang jalan utama. Ketiga, toilet umum di setiap destinasi, beberapa biaya ±Rp2.000–5.000. Keempat, untuk yang bawa lansia, akses di semua destinasi sudah ramah kursi roda. Kelima, sinyal 4G tersedia di kota Pangandaran, download offline area untuk spot terpencil.

Beberapa hidden gem Pangandaran: Goa Jepang (goa bekas PD II, gratis), Pantai Madasari (pantai tersembunyi, 1 jam dari kota), Curug Tujuh (air terjun, butuh trekking), Kampung Turis (area seni dan budaya lokal).

## Kesimpulan\n\nPangandaran adalah destinasi ideal`,

  // article 4 - last Q&A "Trip ini cocok untuk keluarga dengan anak?" then Kesimpulan
  'A: Cocok untuk anak 7 tahun ke atas. Untuk anak lebih kecil, bisa cek alternatif Pronojiwo atau Tumpang yang lebih mudah.\n\nSebagai catatan teknis akhir untuk trip Bromo 3D2N dari Bandung. Pertama, bawain obat mabuk karena jalur Trans Jawa dan menanjak Cemoro Lawang cukup panjang. Kedua, masker sangat penting saat di Kawah Bromo — asap belerangnya masih aktif. Ketiga, bawain jaket tebal, sarung tangan, dan syal — suhu bisa 5°C subuh. Keempat, untuk yang punya masalah lutut atau asma, sangat disarankan untuk sewa kuda atau tidak naik ke kawah.\n\nKelima, jaringan seluler di Cemoro Lawang terbatas — pastikan download offline area dan bawain cash Rp300.000 per orang. Keenam, kondisi jalan Tol Trans Jawa sangat lancar untuk Hiace Premio. Sopir kami sudah terbiasa dengan rute jauh dan siap handle semua situasi.\n\nKetujuh, untuk paket Bromo all-in dari kami, semua sudah di-handle: Hiace Premio 3 hari, hotel di Cemoro Lawang, jeep sunrise, tiket masuk, dan makan 3 hari. Tinggal nikmati pengalaman sunrise Bromo yang unforgettable.\n\nUntuk diskusi lebih lanjut atau booking paket Bromo, langsung hubungi kami via WhatsApp atau [form kontak](/kontak). Tim kami akan jawab dalam 5–10 menit di jam kerja.\n\n## Kesimpulan\n\nBromo dari Bandung via Hiace': `A: Cocok untuk anak 7 tahun ke atas. Untuk anak lebih kecil, bisa cek alternatif Pronojiwo atau Tumpang yang lebih mudah.

Sebagai catatan teknis akhir untuk trip Bromo 3D2N dari Bandung. Pertama, bawain obat mabuk karena jalur Trans Jawa dan menanjak Cemoro Lawang cukup panjang. Kedua, masker sangat penting saat di Kawah Bromo — asap belerangnya masih aktif. Ketiga, bawain jaket tebal, sarung tangan, dan syal — suhu bisa 5°C subuh. Keempat, untuk yang punya masalah lutut atau asma, sangat disarankan untuk sewa kuda atau tidak naik ke kawah.

Kelima, jaringan seluler di Cemoro Lawang terbatas — pastikan download offline area dan bawain cash Rp300.000 per orang. Keenam, kondisi jalan Tol Trans Jawa sangat lancar untuk Hiace Premio. Sopir kami sudah terbiasa dengan rute jauh dan siap handle semua situasi.

Ketujuh, untuk paket Bromo all-in dari kami, semua sudah di-handle: Hiace Premio 3 hari, hotel di Cemoro Lawang, jeep sunrise, tiket masuk, dan makan 3 hari. Tinggal nikmati pengalaman sunrise Bromo yang unforgettable.

Untuk diskusi lebih lanjut atau booking paket Bromo, langsung hubungi kami via WhatsApp atau [form kontak](/kontak). Tim kami akan jawab dalam 5–10 menit di jam kerja.

Sebagai info tambahan, untuk variasi trip Bromo: tambah 1 hari untuk eksplor Ranu Kumbolo atau air Terjun Madakaripura. Atau lanjut ke Semeru untuk tantangan lebih (izin khusus). Untuk yang alergi dingin atau asma, konsultasi dokter sebelum berangkat. Suhu 5°C subuh cukup ekstrem untuk beberapa orang.

Untuk dokumentasi yang bagus: tripod untuk foto long exposure sunrise, powerbank karena baterai cepat habis di suhu dingin, simpan kamera di dalam tas tertutup saat tidak dipakai.

Untuk oleh-oleh dari Probolinggo: kerupuk ikan, sambal roa, batik Probolinggo, dan madu lokal. Rest area di sekitar Probolinggo ada toko authorized.

## Kesimpulan\n\nBromo dari Bandung via Hiace`,
};

let totalChanged = 0;
for (const [anchor, replacement] of Object.entries(blocks)) {
  if (src.includes(anchor)) {
    src = src.replace(anchor, replacement);
    totalChanged++;
  } else {
    console.error('NOT FOUND:', anchor.slice(0, 80));
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);