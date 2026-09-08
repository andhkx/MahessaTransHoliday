const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const sections = {
  // article 2 - 1269 -> need +200
  'Tim kami akan jawab dalam 5–10 menit di jam kerja.\n\n## Kesimpulan\n\nItinerary Ciwidey 2D1N': `Tim kami akan jawab dalam 5–10 menit di jam kerja.

Untuk variasi aktivitas, kamu juga bisa tambahkan stop di Cimanggu untuk outbound ringan atau ke Perkebunan Teh Rancabali. Glamping Lakeside juga punya beberapa aktivitas tambahan: naik perahu gratis untuk tamu, bonfire malam, dan BBQ package untuk makan malam spesial. Untuk sunrise atau sunset, area glamping punya spot terbaik dengan view danau dan gunung.

Untuk info lebih lengkap dan diskusi paket Ciwidey sesuai kebutuhan trip kamu, langsung hubungi kami via WhatsApp [62895327077214](https://wa.me/62895327077214).

## Kesimpulan

Itinerary Ciwidey 2D1N`,

  // article 3 - 1102 -> need +300
  'Tim kami akan jawab dalam 5–10 menit di jam kerja.\n\n## Kesimpulan\n\nPangandaran adalah destinasi ideal': `Tim kami akan jawab dalam 5–10 menit di jam kerja.

Untuk variasi itinerary Pangandaran, kamu bisa tambah beberapa spot tersembunyi seperti Goa Lanang, Pantai Madasari, atau snorkeling di Pulau Mangrove. Atau untuk yang suka tantangan, body rafting di sungai bagian atas Citumang tanpa guide — gratis tapi butuh pengalaman.

Untuk kamu yang membawa anak kecil, Pantai Timur relatif lebih aman dengan ombak tenang dan pasir landai. Body rafting bisa di-skip dan ganti dengan aktivitas yang lebih ringan seperti naik perahu di sekitar pantai.

Untuk paket backpacker yang lebih hemat, cek [tips liburan Pangandaran murah](/artikel/liburan-pangandaran-murah-tips-backpacker-dari-cimahi) kami sebagai referensi tambahan.

## Kesimpulan

Pangandaran adalah destinasi ideal`,

  // article 4 - 1144 -> need +300
  'Tim kami akan jawab dalam 5–10 menit di jam kerja.\n\n## Kesimpulan\n\nBromo dari Bandung via Hiace': `Tim kami akan jawab dalam 5–10 menit di jam kerja.

Untuk variasi trip Bromo, kamu juga bisa tambah 1 hari untuk eksplor Ranu Kumbolo atau air Terjun Madakaripura yang legendaris. Atau untuk yang suka tantangan lebih, lanjut ke Semeru (tetap butuh ijasah dan guide khusus).

Untuk yang punya alergi dingin atau asma, sangat disarankan untuk konsultasi dokter sebelum berangkat. Suhu 5°C subuh di Bromo cukup ekstrem untuk beberapa orang. Selalu bawain inhaler atau obat pribadi.

Untuk dokumentasi yang bagus, bawain tripod untuk foto long exposure di sunrise, powerbank karena baterai cepat habis di suhu dingin, dan simpan kamera di dalam tas tertutup saat tidak dipakai.

## Kesimpulan

Bromo dari Bandung via Hiace`,
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