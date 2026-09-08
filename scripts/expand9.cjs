const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const sections = {
  // article 3 - 1278 -> need ~200
  'Untuk komunikasi, sinyal 4G tersedia di kota Pangandaran dan sebagian besar destinasi wisata. Tapi untuk spot terpencil seperti Pantai Madasari, sinyal bisa hilang. Download offline area sebelum berangkat.\n\n## Kesimpulan\n\nPangandaran adalah destinasi ideal': `Untuk komunikasi, sinyal 4G tersedia di kota Pangandaran dan sebagian besar destinasi wisata. Tapi untuk spot terpencil seperti Pantai Madasari, sinyal bisa hilang. Download offline area sebelum berangkat.

Beberapa hidden gem Pangandaran yang jarang diketahui: Goa Jepang (goa bekas PD II, gratis), Pantai Madasari (pantai tersembunyi, 1 jam dari kota), Curug Tujuh (air terjun, butuh trekking), dan Kampung Turis (area seni dan budaya lokal). Spot-spot ini bisa dimasukkan ke itinerary kalau kamu punya waktu lebih.

Untuk anak-anak, beberapa aktivitas ramah anak di Pangandaran: naik perahu di Pantai Timur, snorkeling ringan di Pulau Mangrove, memberi makan ikan di Pelabuhan, dan bermain pasir di Pantai Barat. Semua relatif aman dengan pengawasan orang tua.

Untuk orang tua yang membawa anak di bawah 5 tahun, body rafting sangat tidak disarankan. Pilih Citumang yang relatif lebih tenang atau skip body rafting dan ganti dengan aktivitas keluarga.

## Kesimpulan\n\nPangandaran adalah destinasi ideal`,

  // article 4 - 1317 -> need ~100
  'Untuk oleh-oleh dari Probolinggo, sempatkan mampir di sentra oleh-oleh: kerupuk ikan Probolinggo, sambal roa, batik Probolinggo, dan madu lokal. Rest area di sekitar Probolinggo juga ada toko yang authorized.\n\n## Kesimpulan\n\nBromo dari Bandung via Hiace': `Untuk oleh-oleh dari Probolinggo, sempatkan mampir di sentra oleh-oleh: kerupuk ikan Probolinggo, sambal roa, batik Probolinggo, dan madu lokal. Rest area di sekitar Probolinggo juga ada toko yang authorized.

Untuk yang punya alergi dingin atau asma, konsultasi dokter sebelum berangkat sangat disarankan. Suhu 5°C subuh di Bromo cukup ekstrem untuk beberapa orang. Bawain inhaler atau obat pribadi sebagai backup.

Untuk variasi trip Bromo, kamu bisa tambah 1 hari untuk eksplor Ranu Kumbolo atau air Terjun Madakaripura yang legendaris. Atau lanjut ke Semeru untuk yang suka tantangan lebih (tetap butuh izin khusus).

## Kesimpulan\n\nBromo dari Bandung via Hiace`,

  // article 20 - 1070 -> need ~400
  'Cara booking Innova Reborn dari kami: hubungi WhatsApp, info tanggal dan destinasi, dapat konfirmasi tarif dan ketersediaan, DP 50% untuk booking, pelunasan saat penjemputan. Proses cepat dan mudah.': `Cara booking Innova Reborn dari kami: hubungi WhatsApp, info tanggal dan destinasi, dapat konfirmasi tarif dan ketersediaan, DP 50% untuk booking, pelunasan saat penjemputan. Proses cepat dan mudah.

### Performa Innova Reborn di Berbagai Medan

Innova Reborn sangat versatile untuk berbagai medan: tol Trans Jawa (sangat nyaman), pegunungan Lembang/Ciwidey (stabil di tanjakan), jalur menanjak Papandayan (cukup handal untuk diesel), jalur perkotaan Cimahi-Bandung (irit BBM), dan jalur panjang Pangandaran (nyaman untuk trip jauh).

### Kapasitas Penumpang Realistis

Kapasitas ideal Innova Reborn: 4 dewasa + 2 anak, atau 5 dewasa dengan bagasi terbatas, atau 6 dewasa dengan bagasi sangat terbatas. Untuk group lebih dari 4 dewasa dengan banyak barang, pertimbangkan Innova Zenix atau Hiace Commuter.

### Maintenance Armada

Semua Innova Reborn di kami menjalani maintenance rutin: service berkala setiap 5.000 km, cek rem dan suspensi setiap 10.000 km, ganti oli setiap 7.500 km, dan rotasi ban setiap 10.000 km. Armada kami relatif muda (3–5 tahun) untuk memastikan kenyamanan dan keamanan.

### Booking Innova Reborn di High Season

Untuk high season (Nataru, Lebaran, long weekend), booking Innova Reborn 2 minggu sebelumnya sangat disarankan. Kami punya beberapa unit, tapi untuk high season biasanya kehabisan. Atau kami tawarkan alternatif Innova Zenix atau Hiace Commuter.

### Innova Reborn untuk Wedding dan Honeymoon

Innova Reborn bisa juga untuk wedding car dengan dekorasi standar (pita + bunga sederhana). Tarif ±Rp1.3jt untuk 6 jam. Atau upgrade ke Alphard untuk kesan lebih premium.

### Kesimpulan tentang Innova Reborn

Innova Reborn tetap jadi pilihan utama rental di Bandung karena tarif kompetitif, kapasitas 6 orang ideal, bagasi cukup luas, dan spare part mudah. Untuk 2025, masih sangat worth dipertimbangkan untuk trip keluarga atau bisnis.`,
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