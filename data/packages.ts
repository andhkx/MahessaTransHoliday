import type { TravelPackage } from "@/lib/types";
import { SERVICE_AREAS } from "@/lib/constants";

const baseIncluded = [
  "Mobil Toyota Hiace",
  "Driver berpengalaman",
  "BBM",
  "Tol",
  "Parkir",
];

const ferryIncluded = [...baseIncluded, "Tiket Penyeberangan"];

const baseExcluded = [
  "Retribusi Wisata / Tiket Masuk Atraksi",
  "Makan-minum selama perjalanan",
  "Overtime (per jam tambahan)",
];

const multiDayExcluded = [
  ...baseExcluded,
  "Akomodasi & makan driver (multi-hari)",
];

const packageFaq = [
  {
    q: "Apakah pickup dari lokasi saya?",
    a: "Ya, kami akan pickup Anda dari lokasi yang disepakati di area Cimahi, Bandung, atau Padalarang.",
  },
  {
    q: "Berapa jam perjalanannya?",
    a: "Durasi dihitung mulai dari waktu pickup. Jika membutuhkan waktu lebih, overtime dapat ditambahkan dengan tarif per jam.",
  },
  {
    q: "Boleh ganti rute/tempat tujuan?",
    a: "Bisa, selama masih dalam area coverage dan durasi paket. Diskusikan langsung dengan driver kami.",
  },
  {
    q: "Apakah bisa ditambah jam?",
    a: "Bisa. Tambahan jam dihitung per jam dan dikonfirmasi sebelum perjalanan dimulai.",
  },
];

export const packages: TravelPackage[] = [
  {
    id: "hiace-bandung",
    slug: "hiace-bandung",
    destination: "Bandung",
    badge: "Best Seller",
    duration: "1 Hari",
    durationHours: 9,
    price: 1300000,
    image: "/images/packages/hiace-bandung.svg",
    description: [
      "Paket ini dirancang untuk perjalanan city tour atau wisata dalam Kota Bandung. Dengan durasi 1 hari (8-10 jam), Anda dapat mengunjungi berbagai tempat menarik seperti Taman Hutan Raya Ir. Djuanda, kawasan Braga, atau pabrik-pabrik kerajinan.",
      "Termasuk pickup dari lokasi Anda, driver yang ramah dan tahu tempat-tempat menarik, serta perjalanan sesuai itinerary yang kamu inginkan.",
    ],
    included: baseIncluded,
    excluded: baseExcluded,
    suitableFor: [
      "Wisata keluarga",
      "Rombongan / Group",
      "Perjalanan dinas",
      "Team outing",
      "City tour",
    ],
    itinerary: null,
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Bandung 1 Hari Mulai Rp1,3 Juta",
      description:
        "Paket Hiace Bandung 1 hari mulai Rp1.300.000. Sudah termasuk mobil, driver, BBM, tol, dan parkir. City tour Bandung tanpa ribet.",
      keywords: ["hiace bandung", "sewa hiace", "city tour bandung"],
    },
  },
  {
    id: "hiace-garut",
    slug: "hiace-garut",
    destination: "Garut",
    duration: "1 Hari",
    durationHours: 10,
    price: 1500000,
    image: "/images/packages/hiace-garut.svg",
    description: [
      "Garut menyimpan banyak destinasi favorit: Kawah Kamojang, Situ Bagendit, Pantai Santolo, hingga kuliner legendaris Burayang Dapanget. Paket 1 hari ini cukup untuk menjelajahi spot-spot terbaiknya.",
      "Berangkat pagi dari Bandung/Cimahi, pulang malam dengan perjalanan aman bersama driver berpengalaman rute Garut.",
    ],
    included: baseIncluded,
    excluded: baseExcluded,
    suitableFor: [
      "Wisata keluarga",
      "Wisata alam",
      "Rombongan / Group",
      "Kulineran",
    ],
    itinerary: null,
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Garut 1 Hari Mulai Rp1,5 Juta",
      description:
        "Paket Hiace Garut 1 hari mulai Rp1.500.000. All-in: mobil, driver, BBM, tol, parkir. Jelajahi Kawah Kamojang hingga pantai selatan Garut.",
      keywords: ["hiace garut", "paket wisata garut", "sewa hiace garut"],
    },
  },
  {
    id: "hiace-jakarta",
    slug: "hiace-jakarta",
    destination: "Jakarta",
    duration: "1 Hari",
    durationHours: 12,
    price: 1850000,
    image: "/images/packages/hiace-jakarta.svg",
    description: [
      "Perjalanan Bandungâ€“Jakarta bolak-balik dalam sehari jadi mudah dengan paket ini. Cocok untuk keperluan dinas, acara keluarga, hingga city tour Jakarta seperti Kota Tua, Monas, atau Ancol.",
      "Durasi hingga 12 jam memberi waktu cukup untuk urusan di Jakarta tanpa harus menginap.",
    ],
    included: baseIncluded,
    excluded: baseExcluded,
    suitableFor: [
      "Perjalanan dinas",
      "City tour Jakarta",
      "Acara keluarga",
      "Antar-jemput bandara",
    ],
    itinerary: null,
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Jakarta PP 1 Hari Mulai Rp1,85 Juta",
      description:
        "Paket Hiace Jakarta pulang-pergi mulai Rp1.850.000. Termasuk mobil, driver, BBM, tol, parkir. Nyaman untuk dinas maupun wisata.",
      keywords: ["hiace jakarta", "sewa hiace jakarta", "bandung jakarta rental"],
    },
  },
  {
    id: "hiace-ciwidey",
    slug: "hiace-ciwidey",
    destination: "Ciwidey",
    duration: "1 Hari",
    durationHours: 9,
    price: 1350000,
    image: "/images/packages/hiace-ciwidey.svg",
    description: [
      "Kawah Putih, Ranca Upas, Rancabali, dan kebun stroberi adalah ikon Ciwidey. Paket 1 hari ini membawa rombonganmu menyusuri jalur selatan Bandung yang sejuk.",
      "Cocok untuk keluarga besar atau komunitas yang ingin wisata alam tanpa perencanaan rumit.",
    ],
    included: baseIncluded,
    excluded: baseExcluded,
    suitableFor: [
      "Wisata alam",
      "Wisata keluarga",
      "Rombongan / Group",
      "Team outing",
    ],
    itinerary: null,
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Ciwidey 1 Hari Mulai Rp1,35 Juta",
      description:
        "Paket Hiace Ciwidey 1 hari mulai Rp1.350.000. Kunjungi Kawah Putih, Ranca Upas, dan Rancabali. All-in: mobil, driver, BBM, tol, parkir.",
      keywords: ["hiace ciwidey", "kawah putih trip", "paket wisata ciwidey"],
    },
  },
  {
    id: "hiace-pangalengan",
    slug: "hiace-pangalengan",
    destination: "Pangalengan",
    duration: "1 Hari",
    durationHours: 10,
    price: 1450000,
    image: "/images/packages/hiace-pangalengan.svg",
    description: [
      "Pangalengan menawarkan udara pegunungan, kebun teh lebar, dan danau yang tenang seperti Situ Cileunca. Rute ini juga populer untuk camping ground dan agrowisata.",
      "Paket 1 hari dengan Hiace membuat rombonganmu bisa fokus menikmati suasana tanpa mikir perjalanan.",
    ],
    included: baseIncluded,
    excluded: baseExcluded,
    suitableFor: [
      "Wisata alam",
      "Team outing",
      "Agrowisata",
      "Rombongan / Group",
    ],
    itinerary: null,
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Pangalengan 1 Hari Mulai Rp1,45 Juta",
      description:
        "Paket Hiace Pangalengan 1 hari mulai Rp1.450.000. Jelajahi kebun teh, Situ Cileunca, dan udara sejuk Pangalengan. All-in dengan driver.",
      keywords: ["hiace pangalengan", "paket wisata pangalengan"],
    },
  },
  {
    id: "hiace-pangandaran",
    slug: "hiace-pangandaran",
    destination: "Pangandaran",
    duration: "2 Hari 1 Malam",
    durationHours: 30,
    price: 4250000,
    image: "/images/packages/hiace-pangandaran.svg",
    description: [
      "Dua hari satu malam di Pangandaran: Pantai Pasir Putih dan Barat, Green Canyon (Cukang Taneuh), Batu Karas, hingga sunset di karang Naga. Pantai timur untuk sunrise, pantai barat untuk sunset.",
      "Paket sudah termasuk tiket penyeberangan untuk rute alternatif, sehingga perjalanan lebih efisien.",
    ],
    included: ferryIncluded,
    excluded: multiDayExcluded,
    suitableFor: [
      "Wisata pantai",
      "Wisata keluarga",
      "Rombongan / Group",
      "Team outing",
    ],
    itinerary: [
      {
        day: "Hari 1",
        activities: [
          "Pickup pagi dari Cimahi/Bandung/Padalarang",
          "Perjalanan menuju Pangandaran",
          "Green Canyon & Batu Karas",
          "Check-in hotel, istirahat",
        ],
      },
      {
        day: "Hari 2",
        activities: [
          "Sunrise di Pantai Timur",
          "Pantai Pasir Putih & konservasi penyu",
          "Souvenir & kuliner lokal",
          "Kembali ke Bandung/Cimahi",
        ],
      },
    ],
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Pangandaran 2D1N Mulai Rp4,25 Juta",
      description:
        "Paket Hiace Pangandaran 2 hari 1 malam mulai Rp4.250.000. Green Canyon, Batu Karas, sunset Pantai Barat. All-in dengan driver.",
      keywords: ["hiace pangandaran", "paket wisata pangandaran"],
    },
  },
  {
    id: "hiace-bromo",
    slug: "hiace-bromo",
    destination: "Bromo",
    duration: "2 Hari 1 Malam",
    durationHours: 48,
    price: 3750000,
    image: "/images/packages/hiace-bromo.svg",
    description: [
      "Sunrise di Penanjakan, lautan pasir, dan kawah Gunung Bromo adalah pengalaman wajib sekali seumur hidup. Perjalanan dari Bandung ditempuh nyaman dengan Hiace via tol trans-Jawa.",
      "Driver kami hafal timing terbaik agar rombonganmu tiba tepat sebelum matahari terbit.",
    ],
    included: baseIncluded,
    excluded: multiDayExcluded,
    suitableFor: [
      "Wisata adventure",
      "Wisata keluarga",
      "Rombongan / Group",
      "Photography trip",
    ],
    itinerary: [
      {
        day: "Hari 1",
        activities: [
          "Pickup malam/malam dini dari Cimahi/Bandung",
          "Perjalanan malam menuju Probolinggo via tol",
          "Tiba di area Bromo, istirahat singkat",
        ],
      },
      {
        day: "Hari 2",
        activities: [
          "Jeep menuju Penanjakan untuk sunrise",
          "Lautan pasir & kawah Bromo",
          "Savana Savana & Bukit Teletubbies (opsional)",
          "Perjalanan kembali ke Bandung/Cimahi",
        ],
      },
    ],
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Bromo 2D1N Mulai Rp3,75 Juta",
      description:
        "Paket Hiace Bromo 2 hari 1 malam mulai Rp3.750.000. Sunrise Penanjakan, lautan pasir, kawah Bromo. Berangkat dari Bandung all-in.",
      keywords: ["hiace bromo", "open trip bromo bandung", "paket bromo"],
    },
  },
  {
    id: "hiace-semarang",
    slug: "hiace-semarang",
    destination: "Semarang",
    duration: "2 Hari 1 Malam",
    durationHours: 34,
    price: 4500000,
    image: "/images/packages/hiace-semarang.svg",
    description: [
      "Semarang punya Kota Lama yang instagramable, Sam Poo Kong, Lawang Sewu, hingga kuliner lumpia legendaris. Dua hari cukup untuk menjelajah santai.",
      "Ideal juga untuk perjalanan dinas rombongan ke kota ini.",
    ],
    included: baseIncluded,
    excluded: multiDayExcluded,
    suitableFor: [
      "Wisata keluarga",
      "Perjalanan dinas",
      "Kulineran",
      "Rombongan / Group",
    ],
    itinerary: null,
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Semarang 2D1N Mulai Rp4,5 Juta",
      description:
        "Paket Hiace Semarang 2 hari 1 malam mulai Rp4.500.000. Kota Lama, Sam Poo Kong, Lawang Sewu. All-in dari Bandung.",
      keywords: ["hiace semarang", "paket wisata semarang"],
    },
  },
  {
    id: "hiace-yogyakarta",
    slug: "hiace-yogyakarta",
    destination: "Yogyakarta",
    duration: "3 Hari 2 Malam",
    durationHours: 66,
    price: 5500000,
    image: "/images/packages/hiace-yogyakarta.svg",
    description: [
      "Tiga hari dua malam menjelajah Jogja: Candi Prambanan, Keraton, Malioboro, hingga Pantai Parangtritis dan kaki Gunung Merapi. Waktu cukup longgar untuk kulineran juga.",
      "Itinerary fleksibel sesuai request rombonganmu, dengan driver yang paham rute dan spot terbaik.",
    ],
    included: baseIncluded,
    excluded: multiDayExcluded,
    suitableFor: [
      "Wisata keluarga",
      "School trip",
      "Rombongan / Group",
      "Kulineran",
    ],
    itinerary: [
      {
        day: "Hari 1",
        activities: [
          "Pickup pagi dari Cimahi/Bandung/Padalarang",
          "Perjalanan menuju Yogyakarta via tol",
          "Malioboro sore & kuliner malam",
        ],
      },
      {
        day: "Hari 2",
        activities: [
          "Candi Prambanan & Keraton Yogyakarta",
          "Pantai Parangtritis",
          "Bakmi Jogja untuk makan malam",
        ],
      },
      {
        day: "Hari 3",
        activities: [
          "Kalder Merapi / Museum Ullen Sentalu (opsional)",
          "Belanja oleh-oleh",
          "Perjalanan kembali ke Bandung/Cimahi",
        ],
      },
    ],
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Yogyakarta 3D2N Mulai Rp5,5 Juta",
      description:
        "Paket Hiace Yogyakarta 3 hari 2 malam mulai Rp5.500.000. Prambanan, Malioboro, Parangtritis. All-in dari Bandung dengan driver.",
      keywords: ["hiace jogja", "paket wisata jogja", "sewa hiace yogyakarta"],
    },
  },
  {
    id: "hiace-bali",
    slug: "hiace-bali",
    destination: "Bali",
    badge: "Premium",
    duration: "4 Hari 3 Malam",
    durationHours: 90,
    price: 12750000,
    image: "/images/packages/hiace-bali.svg",
    description: [
      "Paket premium Bali 4 hari 3 malam: dari pantai Kuta, Uluwatu, Tanah Lot, hingga Ubud dan Bedugul. Tiket penyeberangan Ketapangâ€“Gilimanuk sudah termasuk.",
      "Perjalanan darat dengan Hiace membuat rombonganmu tetap satu kendaraan dari Bandung sampai Bali â€” hemat biaya dan praktis.",
    ],
    included: ferryIncluded,
    excluded: multiDayExcluded,
    suitableFor: [
      "Wisata premium",
      "Rombongan / Group",
      "Family gathering",
      "Honeymoon group",
    ],
    itinerary: [
      {
        day: "Hari 1",
        activities: [
          "Pickup dini hari dari Cimahi/Bandung",
          "Perjalanan menuju Ketapang, seberang ke Gilimanuk",
          "Check-in area Kuta/Seminyak, istirahat",
        ],
      },
      {
        day: "Hari 2",
        activities: [
          "Uluwatu & pantai selatan",
          "Kecak dance sunset (opsional)",
          "Kuliner seafood Jimbaran",
        ],
      },
      {
        day: "Hari 3",
        activities: [
          "Ubud: Monkey Forest, Tegallalang rice terrace",
          "Bedugul & Beratan Lake",
          "Tanah Lot sunset",
        ],
      },
      {
        day: "Hari 4",
        activities: [
          "Belanja oleh-oleh",
          "Penyeberangan kembali ke Jawa",
          "Perjalanan kembali ke Bandung/Cimahi",
        ],
      },
    ],
    serviceAreas: SERVICE_AREAS,
    faq: packageFaq,
    seo: {
      title: "Sewa Hiace Bali 4D3N Mulai Rp12,75 Juta",
      description:
        "Paket Hiace Bali 4 hari 3 malam mulai Rp12.750.000. Kuta, Uluwatu, Ubud, Tanah Lot. Termasuk tiket penyeberangan. Berangkat dari Bandung.",
      keywords: ["hiace bali", "paket wisata bali dari bandung", "sewa hiace bali"],
    },
  },
];

export function getPackageBySlug(slug: string): TravelPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function getFeaturedPackages(): TravelPackage[] {
  const featuredSlugs = [
    "hiace-bandung",
    "hiace-garut",
    "hiace-jakarta",
    "hiace-bali",
  ];
  return featuredSlugs
    .map((slug) => getPackageBySlug(slug))
    .filter((p): p is TravelPackage => Boolean(p));
}

export function getRelatedPackages(slug: string, limit = 3): TravelPackage[] {
  const current = getPackageBySlug(slug);
  if (!current) return packages.slice(0, limit);
  const sameDurationType = packages.filter(
    (p) =>
      p.slug !== slug && p.duration.split(" ")[0] === current.duration.split(" ")[0],
  );
  const others = packages.filter(
    (p) => p.slug !== slug && !sameDurationType.includes(p),
  );
  return [...sameDurationType, ...others].slice(0, limit);
}
