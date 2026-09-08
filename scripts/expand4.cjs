const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const sections = {
  // article 14 - 919 -> need ~500
  'A: 15 orang untuk paket kami.': `Sebagai catatan tambahan untuk family gathering, ada beberapa aspek teknis yang sering ditanyakan. Pertama, gathering untuk keluarga besar (50+ orang) biasanya butuh minimal 1 bulan persiapan karena banyak pihak yang perlu dikoordinasikan. Kedua, dokumentasi sangat penting — momen family gathering jarang terjadi, pastikan ada foto dan video yang bagus.

Ketiga, makan adalah fokus utama — pilih catering yang bisa customize menu untuk berbagai usia (tidak pedas, ada menu anak, dan ada opsi vegetarian). Keempat, transport harus dipikirkan matang — terutama untuk lokasi yang jauh atau akses sulit. Hiace Premio atau Elf Long sangat recommended untuk family gathering besar.

Kelima, selalu siapkan P3K standar untuk jaga-jaga. Beberapa lansia mungkin punya kondisi kesehatan tertentu yang perlu diperhatikan. Keenam, untuk gathering outdoor, selalu cek prakiraan cuaca dan siapkan backup indoor.

Terakhir, untuk biaya-biaya yang sering tidak terduga: biaya tambahan untuk dekorasi tema, sewa sound system, dan souvenir untuk semua peserta. Budget ±Rp50–150rb/orang untuk souvenir sudah cukup.

A: 15 orang untuk paket kami.`,

  // article 15 - 895 -> need ~500
  'A: Bisa, kalau armada pengganti tersedia. Tapi lebih baik booking dari awal.': `Sebagai penutup untuk perbandingan Innova dan Hiace, ada beberapa hal lagi yang perlu dipertimbangkan. Pertama, untuk long trip (lebih dari 3 hari), Innova Reborn lebih nyaman karena suspensinya lebih lembut dan kursi lebih empuk. Hiace Premio lebih kaku tapi lebih stabil di kecepatan tinggi.

Kedua, untuk trip dengan banyak barang (pindahan, belanja, oleh-oleh), Hiace Premio lebih cocok karena bagasinya lebih luas. Innova Reborn cukup untuk 4 koper besar, tapi Hiace bisa 6–8 koper.

Ketiga, untuk wedding atau honeymoon, Innova Zenix lebih cocok dari Innova Reborn karena captain seat dan interior lebih modern. Untuk wedding intimate, Alphard tetap pilihan utama.

Keempat, untuk corporate gathering atau outing kantor, Hiace Premio lebih sering dipilih karena kapasitas 12–14 orang cukup untuk satu tim. Beberapa perusahaan memesan multiple Hiace untuk seluruh departemen.

Kelima, untuk study tour atau outing sekolah, Medium Bus adalah pilihan terbaik. 1 Medium Bus bisa untuk 40 siswa + 2 guru. Lebih efisien dari multiple Hiace.

Untuk konsultasi gratis tentang kebutuhan trip kamu, langsung hubungi kami via WhatsApp atau gunakan [Vehicle Finder](/temukan) untuk rekomendasi otomatis.

A: Bisa, kalau armada pengganti tersedia. Tapi lebih baik booking dari awal.`,

  // article 17 - 930 -> need ~500
  'A: 15–30% untuk armada. 30–50% untuk hotel.': `Sebagai informasi tambahan untuk liburan Nataru, ada beberapa hal teknis yang perlu kamu tahu. Pertama, untuk long weekend, prediksi keramaian bisa dicek via Google Trends atau situs prediksi liburan. Kedua, kondisi jalan tol biasanya ramai dari H-1 sampai H+2 — pertimbangkan berangkat di luar jam tersebut.

Ketiga, untuk Nataru, banyak operator rental termasuk kami yang menawarkan paket bundling (armada + hotel + makan + tiket) dengan diskon 10–15%. Worth it untuk keluarga besar. Keempat, untuk Nataru, sangat disarankan untuk booking 1 bulan sebelumnya.

Kelima, untuk yang mau staycation di Bandung, banyak hotel bintang 4–5 yang relatif kosong di weekday Nataru. Beberapa rekomendasi: Trans Studio Hotel, GH Universal, Padma Hotel, dan Hilton Bandung. Tarif biasanya lebih affordable dari weekend reguler.

Keenam, untuk backup plan jika hotel utama overbooked, selalu siapkan 1–2 alternatif hotel di area berbeda. Aplikasi seperti Traveloka dan Agoda biasanya punya opsi pembatalan gratis yang bisa kamu manfaatkan.

Ketujuh, untuk dokumentasi Nataru, bawain powerbank karena smartphone sering dipakai intensif untuk foto dan update media sosial.

A: 15–30% untuk armada. 30–50% untuk hotel.`,
};

let totalChanged = 0;
for (const [anchor, replacement] of Object.entries(sections)) {
  if (src.includes(anchor)) {
    src = src.replace(anchor, replacement);
    totalChanged++;
  } else {
    console.error('NOT FOUND:', anchor.slice(0, 60));
  }
}
fs.writeFileSync(file, src);
console.log('Replaced:', totalChanged);