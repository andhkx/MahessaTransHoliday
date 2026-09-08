const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const anchor = 'A: Opsional. Untuk yang mau paham sejarah, recommended.';
const replacement = `Sebagai informasi tambahan untuk Bandung city tour, ada beberapa hal teknis yang perlu kamu tahu. Pertama, untuk city tour paling efisien, berangkat jam 8 pagi dari Cimahi supaya tiba di Braga sekitar jam 8.30 — masih sepi dan cahaya pagi bagus untuk foto. Kedua, parkir di beberapa titik heritage (Braga, Asia Afrika) terbatas, datang lebih awal supaya dapat tempat.

Ketiga, untuk museum KAA dan Museum Geologi, buka jam 9 pagi sampai 3 sore (weekday). Museum tutup di weekend atau buka dengan jam terbatas. Keempat, untuk Factory Outlet, kebanyakan buka jam 10 pagi sampai 9 malam. Beberapa FO legendaris: Heritage, Rumah Mode, dan The Secret.

Kelima, untuk makan siang, banyak opsi restoran di sekitar Braga dan Riau. Beberapa rekomendasi: Braga Permai (Sunda dengan nuansa heritage), Nyonya Susu (kopi dan roti legendaris), dan Warung Nasi Ampera (Sunda murah meriah).

Keenam, untuk yang bawa anak kecil, Gedung Sate punya taman yang luas untuk anak bermain. Masjid Raya Bandung juga punya area yang ramah untuk anak.

Ketujuh, untuk pulang, hindari jam 4–6 sore karena jalan Setiabudi macet parah. Atau pulang via Tol Pasteur untuk lebih cepat.

A: Opsional. Untuk yang mau paham sejarah, recommended.`;

if (src.includes(anchor)) {
  src = src.replace(anchor, replacement);
  fs.writeFileSync(file, src);
  console.log('OK article 18');
} else {
  console.error('NOT FOUND');
}