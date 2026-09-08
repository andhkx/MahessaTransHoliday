const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'scripts', 'seed-articles.ts');
let src = fs.readFileSync(file, 'utf8');

const sections = {
  // article 2 (920 -> need +500)
  'A: Jam 7 pagi sampai 5 sore. Datang pagi dapat view terbaik dan asap belerang masih tipis.': `Sebagai penutup, beberapa hal yang perlu kamu tahu untuk memastikan trip Ciwidey 2 hari 1 malam kamu lancar dan berkesan. Pertama, selalu cek prakiraan cuaca 3 hari sebelum keberangkatan. Kawah Putih bisa berbahaya saat hujan deras karena jalur licin dan kabut tebal. Kedua, bawain masker atau kacamata pelindung saat ke Kawah Putih karena bau belerangnya bisa membuat mata perih. Ketiga, jangan terlalu banyak bawa barang — glamping sudah menyediakan semua kebutuhan dasar.

Untuk variasi itinerary, kamu juga bisa tambahkan stop di Situ Cileunca untuk naik perahu sore hari. Atau mampir ke Perkebunan Teh Rancabali untuk edukasi teh. Glamping Lakeside punya beberapa aktivitas tambahan seperti naik perahu gratis untuk tamu, bonfire malam, dan BBQ package. Anak-anak biasanya suka memberi makan rusa di Ranca Upas dengan wortel seharga Rp5.000 per pack.

Untuk keluarga dengan bayi, Ciwidey cukup ramah. Glamping Lakeside punya family tent dengan extra bed, Kawah Putih bisa di-skip dan ganti Situ Cileunca, dan Ranca Upas aman untuk anak karena ada area terbuka yang luas. Bawain stroller dan carrier sebagai backup.

Sebagai catatan tambahan, semua destinasi di Ciwidey sudah menerima pembayaran QRIS dan cash. Sinyal di beberapa area terbatas, bawain download offline area dan uang cash Rp300.000 per orang sebagai backup. Untuk paket all-in, cek [paket Ciwidey 2 hari](/paket) kami yang sudah include transport, glamping, makan, dan semua tiket masuk.

A: Jam 7 pagi sampai 5 sore. Datang pagi dapat view terbaik dan asap belerang masih tipis.`,

  // article 5 (893 -> need +500)
  'A: ±120 km via Tol Cisumdawu. Waktu tempuh 2–2.5 jam tergantung lalu lintas.': `Sebagai informasi tambahan untuk perjalanan ke Kertajati, ada beberapa hal teknis yang berguna. Pertama, Tol Cisumdawu sudah fully operational dan mempersingkat waktu tempuh dari Bandung atau Cimahi ke Kertajati. Kedua, untuk perjalanan malam atau dini hari, jalanan Cisumdawu relatif sepi, tapi tetap hati-hati karena beberapa titik masih ada perbaikan.

Untuk penumpang yang bawa banyak koper, kami sangat menyarankan Elf Long karena bagasinya jauh lebih luas dari Innova. Untuk Hiace Premio, bagasi cukup untuk 6–8 koper besar. Sopir kami sudah terbiasa dengan penanganan bagasi penumpang pesawat, jadi biasanya tidak ada masalah.

Untuk penumpang difabel, Hiace Premio dan Elf Long kami sudah wheelchair-accessible. Sopir terlatih untuk assist naik-turun kursi roda. Informasikan kebutuhan khusus saat booking supaya kami bisa siapkan kendaraan yang sesuai.

Untuk corporate trip atau incentive trip dari Bandung ke Kertajati, kami punya paket khusus. Sudah termasuk handling bagasi, snack box, dan drop-off di terminal. Cocok untuk karyawan perusahaan yang terbang umrah bersama atau business trip. Cek [paket corporate Kertajati](/paket) kami untuk info lebih lanjut.

A: ±120 km via Tol Cisumdawu. Waktu tempuh 2–2.5 jam tergantung lalu lintas.`,

  // article 8 (889 -> need +500)
  'A: 15 orang. Untuk peserta di bawah itu, harga per orang akan lebih tinggi.': `Untuk informasi lebih lanjut tentang gathering, ada beberapa aspek teknis yang perlu kamu tahu. Pertama, paket gathering biasanya sudah termasuk transportasi, penginapan (jika multiday), makan, tiket masuk, dan outbound. Kedua, dokumentasi biasanya opsional — bisa ditambahkan dengan biaya ±Rp500rb–1.5jt untuk foto dan video 4 jam.

Ketiga, banyak operator gathering termasuk kami yang bisa customize itinerary sesuai kebutuhan. Misalnya, kamu mau gathering dengan tema tertentu (adventure, culinary, culture), bisa di-custom. Keempat, untuk perusahaan besar, kami bisa handle multiple gathering dalam satu tahun dengan kontrak khusus.

Kelima, pembayaran gathering biasanya DP 30% untuk konfirmasi, dan pelunasan H-7. Pembatalan H-7 full refund, H-3 50%, H-1 no refund. Kami usahakan fleksibel untuk kebutuhan reschedule.

Terakhir, untuk gathering dengan budget terbatas, kami punya opsi gathering hemat yang tetap berkesan. Lokasi Cimahi Waterfall atau Bukit Panenjoan bisa menjadi opsi gathering outdoor dengan budget ±Rp250–350rb/orang. Atau gathering di villa dengan self-catering.

Untuk info lebih lengkap dan diskusi paket gathering sesuai kebutuhan tim kamu, langsung hubungi kami via WhatsApp atau [form kontak](/kontak). Kami akan jawab dalam 5–10 menit di jam kerja.

A: 15 orang. Untuk peserta di bawah itu, harga per orang akan lebih tinggi.`,

  // article 9 (866 -> need +500)
  'A: Sudah include pita + bunga sederhana. Upgrade dekorasi custom +Rp200rb–500rb.': `Untuk informasi tambahan tentang wedding car, ada beberapa hal yang perlu diketahui. Pertama, untuk wedding adat Jawa, biasanya ada tambahan dekorasi berupa janur, payung, dan rangkaian bunga khusus. Kedua, untuk wedding Sunda, ada dekorasi special berupa payung geulis dan kain batik. Ketiga, untuk wedding Tionghoa, biasanya ada dekorasi warna merah dan emas.

Untuk wedding Muslim, biasanya ada dekorasi special dengan motif Arab. Beberapa pengantin juga minta mobil dalam kondisi tertentu, seperti Alphard putih dengan dekorasi bunga pink pastel untuk kesan feminin, atau Innova hitam dengan dekorasi klasik untuk kesan maskulin.

Untuk wedding outdoor, dekorasi mobil biasanya lebih simple karena fokus utama adalah venue. Cukup pita putih dan rangkaian bunga sederhana di kap mobil. Untuk wedding indoor di hotel, dekorasi bisa lebih lengkap karena mobil masuk ke area ballroom.

Untuk wedding photo session, mobil menjadi backdrop yang penting. Beberapa fotografer wedding sangat memperhatikan detail mobil — dari posisi pita, bunga, hingga plate nama pengantin. Biasanya dilakukan beberapa kali take foto: saat pengantin masuk mobil, saat pengantin keluar di venue, dan saat pengantin turun dari mobil di resepsi.

Terakhir, untuk honeymoon langsung setelah akad nikah, kami juga menyediakan paket honeymoon car — Alphard dari venue ke villa atau hotel honeymoon. Tarif ±Rp2.8jt untuk 12 jam. Sangat romantis untuk memulai perjalanan baru.

A: Sudah include pita + bunga sederhana. Upgrade dekorasi custom +Rp200rb–500rb.`,

  // article 16 (852 -> need +500)
  'A: Trekking ringan, cocok untuk pemula. Anak 7 tahun ke atas sudah bisa.': `Sebagai informasi tambahan untuk trip Garut, ada beberapa hal teknis yang perlu kamu tahu. Pertama, jalur ke Papandayan dari Cimahi via Tol Limbangan sangat lancar, kecuali saat musim liburan panjang. Kedua, parkir di Papandayan luas dan aman, tapi saat high season bisa penuh. Ketiga, untuk sunrise di Papandayan, kamu bisa booking jeep tour dari basecamp.

Keempat, di Cipanas Garut, ada beberapa hotel dan villa dengan private hot spring yang sangat recommended untuk honeymoon atau quality time. Tarif mulai Rp500rb/malam untuk kamar standar dengan private hot spring. Beberapa rekomendasi: Hotel Tirta Merta, Kampung Sumber Alam, dan Garut Plaza Hotel.

Kelima, untuk yang suka wisata kuliner, Garut punya beberapa tempat makan legendaris: Rumah Makan Haji Acong (Sunda legendaris), Warung Nasi Ampera, dan Batagor R.E (Batagor khas Garut). Semuanya sudah teruji oleh waktu.

Terakhir, untuk yang bawa anak kecil, Garut ramah untuk anak. Cipanas waterpark punya area khusus anak, Kebun Binatang Garut cocok untuk edukasi, dan Papandayan punya jalur pendek yang aman untuk anak 7+ tahun.

Untuk diskusi lebih lanjut atau booking paket Garut 2D1N, hubungi kami via WhatsApp atau [form kontak](/kontak). Kami akan jawab dalam 5–10 menit di jam kerja.

A: Trekking ringan, cocok untuk pemula. Anak 7 tahun ke atas sudah bisa.`,
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