const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const sections = {
  // article 2 - 1340 -> need ~150
  'Untuk info lebih lengkap dan diskusi paket Ciwidey sesuai kebutuhan trip kamu, langsung hubungi kami via WhatsApp [62895327077214](https://wa.me/62895327077214).\n\n## Kesimpulan\n\nItinerary Ciwidey 2D1N': `Untuk info lebih lengkap dan diskusi paket Ciwidey sesuai kebutuhan trip kamu, langsung hubungi kami via WhatsApp [62895327077214](https://wa.me/62895327077214).

Salah satu keunggulan Ciwidey adalah variasi aktivitasnya — dari yang ringan (foto, kuliner) sampai menantang (trekking, body rafting). Cocok untuk berbagai tipe traveler. Untuk anak-anak, banyak area outbound ringan yang aman dan edukatif. Untuk pasangan, glamping Lakeside sangat romantis untuk quality time. Untuk keluarga besar, Cimanggu Cultural Village punya paket outbound yang seru. Untuk backpacker, banyak spot murah yang bisa dikunjungi secara mandiri.

## Kesimpulan\n\nItinerary Ciwidey 2D1N`,

  // article 3 - 1190 -> need ~250
  'Untuk paket backpacker yang lebih hemat, cek [tips liburan Pangandaran murah](/artikel/liburan-pangandaran-murah-tips-backpacker-dari-cimahi) kami sebagai referensi tambahan.\n\n## Kesimpulan\n\nPangandaran adalah destinasi ideal': `Untuk paket backpacker yang lebih hemat, cek [tips liburan Pangandaran murah](/artikel/liburan-pangandaran-murah-tips-backpacker-dari-cimahi) kami sebagai referensi tambahan.

Beberapa hal lagi yang berguna untuk trip Pangandaran: banyak ATM dan money changer di pusat kota, tetapi bawain cash untuk warung lokal. Ada beberapa mini market (Indomaret dan Alfamart) di sepanjang jalan utama untuk beli kebutuhan pribadi. Toilet umum tersedia di setiap destinasi, beberapa ada biaya ±Rp2.000–5.000. Untuk yang bawa lansia, akses di semua destinasi Pangandaran sudah ramah kursi roda.

Untuk komunikasi, sinyal 4G tersedia di kota Pangandaran dan sebagian besar destinasi wisata. Tapi untuk spot terpencil seperti Pantai Madasari, sinyal bisa hilang. Download offline area sebelum berangkat.

## Kesimpulan\n\nPangandaran adalah destinasi ideal`,

  // article 4 - 1239 -> need ~200
  'Untuk dokumentasi yang bagus, bawain tripod untuk foto long exposure di sunrise, powerbank karena baterai cepat habis di suhu dingin, dan simpan kamera di dalam tas tertutup saat tidak dipakai.\n\n## Kesimpulan\n\nBromo dari Bandung via Hiace': `Untuk dokumentasi yang bagus, bawain tripod untuk foto long exposure di sunrise, powerbank karena baterai cepat habis di suhu dingin, dan simpan kamera di dalam tas tertutup saat tidak dipakai.

Untuk yang baru pertama kali ke Bromo, jeep tour biasanya dimulai subuh jam 3 pagi. Pastikan kamu sudah sarapan dan siap dengan jaket tebal. Spot sunrise di Penanjakan paling bagus saat cuaca cerah, kalau kabut tebal biasanya ada operator jeep yang kasih opsi ke bukit lain yang lebih rendah.

Untuk oleh-oleh dari Probolinggo, sempatkan mampir di sentra oleh-oleh: kerupuk ikan Probolinggo, sambal roa, batik Probolinggo, dan madu lokal. Rest area di sekitar Probolinggo juga ada toko yang authorized.

## Kesimpulan\n\nBromo dari Bandung via Hiace`,

  // article 20 - 987 -> need ~500
  '## Asuransi dan Proteksi Innova Reborn\n\nSemua Innova Reborn di kami punya asuransi all-risk yang cover kerusakan dan kecelakaan. Deposit Rp500.000 akan dikembalikan setelah trip selesai tanpa insiden.': `## Asuransi dan Proteksi Innova Reborn

Semua Innova Reborn di kami punya asuransi all-risk yang cover kerusakan dan kecelakaan. Deposit Rp500.000 akan dikembalikan setelah trip selesai tanpa insiden.

### Testimoni Pelanggan tentang Innova Reborn

Beberapa testimoni dari pelanggan kami tentang Innova Reborn: "Nyaman untuk trip jauh, AC dingin, bagasi cukup luas", "Sopir ramah dan tau rute Bandung", "Lebih murah dari kompetitor tapi kualitas sama", "Selalu dapat Innova Bersih dan wangi", dan "Cocok untuk family dengan anak kecil".

### Booking Innova Reborn dari Kami

Cara booking Innova Reborn dari kami: hubungi WhatsApp, info tanggal dan destinasi, dapat konfirmasi tarif dan ketersediaan, DP 50% untuk booking, pelunasan saat penjemputan. Proses cepat dan mudah.`,
};

let totalChanged = 0;
for (const [anchor, replacement] of Object.entries(sections)) {
  if (src.includes(anchor)) {
    src = src.replace(anchor, replacement);
    totalChanged++;
  } else {
    console.error('NOT FOUND:', anchor.slice(0, 80));
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);