// data/seo.ts
// SEO metadata untuk semua routes — mudah update tanpa edit page.tsx

export const seoMetadata = {
  homepage: {
    title: "Rental Mobil Cimahi, Bandung & Padalarang | Mahessa Trans Holiday",
    description:
      "Sewa mobil dengan driver profesional. 12+ unit terawat mulai Rp650rb/12 jam. Avanza, Innova, Hiace, Alphard, dan lainnya. Booking 24/7 via WhatsApp.",
    keywords:
      "sewa mobil bandung, rental mobil driver cimahi, charter mobil bandung, sewa hiace bandung, mahessa trans holiday",
  },

  armada: {
    title:
      "Armada Rental Mobil Bandung: Avanza, Innova, Hiace, Alphard | Mahessa",
    description:
      "13 unit kendaraan rental berkualitas. MPV keluarga, SUV premium, hingga Hiace untuk rombongan. Dengan driver profesional, bersih & terawat.",
    keywords:
      "rental avanza bandung, sewa innova reborn cimahi, hiace rental bandung, rental alphard, sewa mobil cimahi",
  },

  paket: {
    title:
      "Paket Wisata & Tour Hiace All-In: Bandung, Garut, Jakarta, Yogya, Bali",
    description:
      "Paket perjalanan all-in: mobil, driver, BBM. Berangkat dari Cimahi, Bandung & Padalarang. Mulai Rp1.3jt untuk city tour Bandung.",
    keywords:
      "paket tour bandung, sewa hiace wisata, charter hiace pangandaran, paket wisata garut, tour bali dari bandung",
  },

  temukan: {
    title:
      "Temukan Mobil Cocok untuk Perjalananmu | Simulator Rental Mahessa",
    description:
      "Input budget, jumlah orang, dan jenis perjalanan — kami rekomendasikan mobil + paket terbaik. Gratis, tanpa komitmen, hasil instan.",
    keywords:
      "kalkulator rental mobil, simulator sewa mobil, rekomendasi kendaraan bandung, pilih mobil rental",
  },

  galeri: {
    title:
      "Galeri Perjalanan Pelanggan Mahessa Trans Holiday | Dokumentasi Real",
    description:
      "Lihat momen nyata perjalanan pelanggan kami ke Malaysia, Toli-Toli, Manado, dan destinasi lainnya. Bukti kepuasan pelanggan Mahessa.",
    keywords:
      "galeri rental mobil, dokumentasi perjalanan, pengalaman pelanggan, foto wisata mahessa",
  },

  faq: {
    title:
      "FAQ Rental Mobil & Paket Wisata | Tanya Jawab Mahessa Trans Holiday",
    description:
      "Jawaban lengkap seputar sewa mobil dengan driver, charter, paket wisata, pembayaran, dan area layanan Cimahi, Bandung, Padalarang.",
    keywords:
      "pertanyaan sewa mobil, faq rental mobil bandung, tanya jawab charter, syarat rental mobil cimahi",
  },

  kontak: {
    title:
      "Hubungi Mahessa Trans Holiday via WhatsApp | Chat Admin 24/7",
    description:
      "Konsultasi gratis kebutuhan perjalananmu. Respon cepat di bawah 10 menit, harga transparan. Chat via WhatsApp sekarang!",
    keywords:
      "hubungi mahessa trans, contact rental mobil bandung, whatsapp mahessa, reservasi sewa mobil cimahi",
  },
};

export type SeoRoute = keyof typeof seoMetadata;
