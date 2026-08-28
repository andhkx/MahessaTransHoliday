import type { Vehicle } from "@/lib/types";
import { SERVICE_AREAS } from "@/lib/constants";

export const vehicles: Vehicle[] = [
  {
    id: "toyota-agya",
    slug: "toyota-agya",
    name: "Toyota Agya G AT",
    category: "entry",
    transmission: "Automatic",
    capacity: 5,
    fuelType: "Bensin",
    image: "/images/vehicles/toyota-agya.webp",
    gallery: [
      "/images/vehicles/toyota-agya.webp",
      "/images/vehicles/toyota-agya-2.webp",
    ],
    pricing: {
      startingPrice: 340000,
    },
    description: [
      "Toyota Agya adalah city car yang lincah dan irit. Cocok untuk perjalanan singkat dalam kota, jemput kerabat dari stasiun, atau kebutuhan mobilitas harian.",
      "Ukurannya mungil tapi tetap nyaman untuk 4 penumpang dewasa dengan bagasi kecil.",
    ],
    suitableFor: [
      "Perjalanan dalam kota",
      "Antar-jemput stasiun/bandara",
      "Kebutuhan harian",
      "City tour singkat",
    ],
    features: [
      "AC Dingin",
      "Audio System",
      "Power Steering",
      "Kursi Nyaman",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "5 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Cukup untuk 2 koper kecil" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Agya Cimahi & Bandung",
      description:
        "Sewa Toyota Agya automatic di Cimahi, Bandung dan Padalarang mulai Rp340.000/ 12 jam. Unit terawat, siap dipakai. Mahessa Trans Holiday.",
      keywords: ["rental agya", "sewa agya bandung", "rental murah cimahi"],
    },
  },
  {
    id: "toyota-calya",
    slug: "toyota-calya",
    name: "Toyota Calya G MT",
    category: "entry",
    transmission: "Manual",
    capacity: 7,
    fuelType: "Bensin",
    image: "/images/vehicles/toyota-calya.webp",
    gallery: [
      "/images/vehicles/toyota-calya.webp",
      "/images/vehicles/toyota-calya-2.webp",
    ],
    pricing: {
      startingPrice: 400000,
    },
    description: [
      "Toyota Calya adalah MPV 7 penumpang paling ekonomis di kelasnya. Pilihan tepat untuk keluarga kecil yang butuh kapasitas lebih tanpa harus keluar budget besar.",
      "Konsumsi BBM irit untuk ukuran 7-seater, dan tetap mudah dikendarai di jalanan kota maupun perjalanan luar kota jarak dekat.",
    ],
    suitableFor: [
      "Perjalanan keluarga",
      "Wisata kelompok kecil",
      "Mudik dan homecoming",
      "Perjalanan dinas rombongan kecil",
    ],
    features: [
      "AC Dingin",
      "Audio System",
      "Power Steering",
      "Kursi Nyaman",
      "Bagasi Luas",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Manual" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Calya Cimahi & Bandung",
      description:
        "Sewa Toyota Calya 7 penumpang di Cimahi, Bandung dan Padalarang mulai Rp400.000/ 12 jam. Ekonomis untuk keluarga. Mahessa Trans Holiday.",
      keywords: ["rental calya", "sewa calya bandung", "rental 7 penumpang murah"],
    },
  },
  {
    id: "daihatsu-terios",
    slug: "daihatsu-terios",
    name: "Daihatsu Terios X Deluxe AT",
    category: "midrange",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Bensin",
    image: "/images/vehicles/daihatsu-terios.webp",
    gallery: [
      "/images/vehicles/daihatsu-terios.webp",
      "/images/vehicles/daihatsu-terios-2.webp",
    ],
    pricing: {
      startingPrice: 550000,
    },
    description: [
      "Daihatsu Terios adalah SUV ringkas yang nyaman untuk berbagai medan. Ground clearance tingginya membuat percaya diri melewati jalanan menuju wisata alam seperti Ciwidey atau Lembang.",
      "Kabin lega untuk 7 penumpang dengan posisi duduk yang nyaman untuk perjalanan menengah sampai jauh.",
    ],
    suitableFor: [
      "Wisata alam",
      "Perjalanan keluarga",
      "Perjalanan dinas",
      "Perjalanan luar kota",
    ],
    features: [
      "AC Dingin",
      "Audio System",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Nyaman",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Daihatsu Terios Cimahi & Bandung",
      description:
        "Sewa Daihatsu Terios di Cimahi, Bandung dan Padalarang mulai Rp550.000/ 12 jam. SUV nyaman untuk wisata alam. Mahessa Trans Holiday.",
      keywords: ["rental terios", "sewa terios bandung", "rental suv bandung"],
    },
  },
  {
    id: "toyota-avanza",
    slug: "toyota-avanza",
    name: "Toyota Avanza New TSS G",
    badge: "Populer",
    category: "midrange",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Bensin",
    image: "/images/vehicles/toyota-avanza.webp",
    gallery: [
      "/images/vehicles/toyota-avanza.webp",
      "/images/vehicles/toyota-avanza-2.webp",
    ],
    pricing: {
      startingPrice: 450000,
    },
    description: [
      "Toyota Avanza adalah pilihan tepat untuk keluarga atau rombongan kecil. Dengan kapasitas 7 penumpang dan konsumsi bahan bakar yang irit, Avanza cocok untuk perjalanan dalam kota maupun luar kota.",
      "Mobil ini terawat, bersih, dan siap untuk petualangan Anda — dari city tour Bandung hingga perjalanan dinas antar kota.",
    ],
    suitableFor: [
      "Perjalanan keluarga",
      "Wisata kelompok kecil",
      "Perjalanan dinas",
      "Airport transfer",
    ],
    features: [
      "AC Dingin",
      "Audio System",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Nyaman",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Avanza Cimahi & Bandung",
      description:
        "Rental Toyota Avanza di Cimahi, Bandung, dan Padalarang untuk kebutuhan keluarga, wisata, perjalanan dinas, maupun transfer. Mulai Rp450.000/ 12 jam.",
      keywords: ["rental avanza", "sewa avanza cimahi", "avanza bandung"],
    },
  },
  {
    id: "toyota-rush",
    slug: "toyota-rush",
    name: "Toyota Rush GR Sport AT",
    category: "midrange",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Bensin",
    image: "/images/vehicles/toyota-rush.webp",
    gallery: [
      "/images/vehicles/toyota-rush.webp",
      "/images/vehicles/toyota-rush-2.webp",
    ],
    pricing: {
      startingPrice: 550000,
    },
    description: [
      "Toyota Rush GR Sport menggabungkan tampilan SUV yang stylish dengan kenyamanan 7 penumpang. Cocok untuk kamu yang ingin tampil beda saat berkendara.",
      "Performanya stabil di jalan tol maupun jalanan menanjak menuju destinasi wisata highland Bandung.",
    ],
    suitableFor: [
      "Wisata keluarga",
      "Perjalanan luar kota",
      "Wisata alam dan highland",
      "Perjalanan dinas",
    ],
    features: [
      "AC Dingin",
      "Audio System",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Nyaman",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Rush Cimahi & Bandung",
      description:
        "Sewa Toyota Rush GR Sport di Cimahi, Bandung dan Padalarang mulai Rp550.000/ 12 jam. SUV stylish untuk keluarga. Mahessa Trans Holiday.",
      keywords: ["rental rush", "sewa rush bandung", "rush gr sport rental"],
    },
  },
  {
    id: "honda-city-hatchback",
    slug: "honda-city-hatchback",
    name: "Honda City Hatchback RS AT",
    category: "midrange",
    transmission: "Automatic",
    capacity: 5,
    fuelType: "Bensin",
    image: "/images/vehicles/honda-city-hatchback.webp",
    gallery: [
      "/images/vehicles/honda-city-hatchback.webp",
      "/images/vehicles/honda-city-hatchback-2.webp",
    ],
    pricing: {
      startingPrice: 550000,
    },
    description: [
      "Honda City Hatchback RS menawarkan pengalaman berkendara modern dengan desain sporty dan fitur lengkap. Nyaman untuk perjalanan dalam kota maupun jarak menengah.",
      "Kabinnya senyap dan fitur keselamatan Honda Sensing membuat perjalanan terasa lebih tenang.",
    ],
    suitableFor: [
      "Perjalanan dinas",
      "City tour",
      "Pasangan kecil",
      "Airport transfer",
    ],
    features: [
      "AC Dingin",
      "Audio System",
      "Power Steering",
      "Kursi Nyaman",
      "Window/Kaca Tinted",
      "Fitur Keselamatan Lengkap",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "5 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Cukup untuk 3 koper sedang" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Honda City Hatchback Bandung",
      description:
        "Sewa Honda City Hatchback RS di Cimahi, Bandung dan Padalarang mulai Rp500.000/ 12 jam. Modern, sporty, nyaman. Mahessa Trans Holiday.",
      keywords: ["rental honda city", "sewa city hatchback bandung"],
    },
  },
  {
    id: "toyota-innova-reborn",
    slug: "toyota-innova-reborn",
    name: "Toyota Innova Reborn V Diesel",
    category: "premium",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Diesel",
    image: "/images/vehicles/toyota-innova-reborn.webp",
    gallery: [
      "/images/vehicles/toyota-innova-reborn.webp",
      "/images/vehicles/toyota-innova-reborn-2.webp",
    ],
    pricing: {
      startingPrice: 1300000,
    },
    description: [
      "Toyota Innova Reborn adalah standar kenyamanan kelas premium mid. Kabin senyap, kursi empuk, dan suspensi yang halus membuat perjalanan jauh terasa ringan.",
      "Pilihan favorit untuk perjalanan dinas eksekutif, wisata keluarga besar, serta antar-jemput tamu penting.",
    ],
    suitableFor: [
      "Perjalanan dinas eksekutif",
      "Wisata keluarga",
      "Antar-jemput tamu",
      "Perjalanan luar kota",
    ],
    features: [
      "AC Double Blower",
      "Audio System",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Kulit Nyaman",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Diesel" },
      { label: "AC", value: "Double Blower" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Innova Reborn Bandung",
      description:
        "Sewa Toyota Innova Reborn diesel di Cimahi, Bandung dan Padalarang mulai Rp1.300.000/ 12 jam. Premium dan nyaman. Mahessa Trans Holiday.",
      keywords: ["rental innova reborn", "sewa innova bandung", "innova diesel rental"],
    },
  },
  {
    id: "toyota-innova-zenix",
    slug: "toyota-innova-zenix",
    name: "Toyota Innova Zenix Hybrid",
    category: "premium",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Bensin Hybrid",
    image: "/images/vehicles/toyota-innova-zenix.webp",
    gallery: [
      "/images/vehicles/toyota-innova-zenix.webp",
      "/images/vehicles/toyota-innova-zenix-2.webp",
    ],
    pricing: {
      startingPrice: 1500000,
    },
    description: [
      "Toyota Innova Zenix Hybrid adalah MPV generasi terbaru dengan teknologi hybrid yang halus dan efisien. Desain interior modern memberi kesan premium sejak duduk.",
      "Pilihan terbaik untuk perjalanan bisnis, acara pernikahan, atau wisata premium bersama keluarga.",
    ],
    suitableFor: [
      "Perjalanan bisnis",
      "Acara pernikahan",
      "Wisata premium",
      "Antar-jemput tamu VIP",
    ],
    features: [
      "AC Dual Zone",
      "Audio System Premium",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Premium",
      "Sunroof",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic CVT" },
      { label: "Bahan Bakar", value: "Bensin Hybrid" },
      { label: "AC", value: "Dual Zone" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Innova Zenix Hybrid Bandung",
      description:
        "Sewa Toyota Innova Zenix Hybrid di Cimahi, Bandung dan Padalarang mulai Rp1.500.000/ 12 jam. MPV premium modern. Mahessa Trans Holiday.",
      keywords: ["rental zenix", "sewa innova zenix bandung", "rental hybrid bandung"],
    },
  },
  {
    id: "mitsubishi-pajero-sport",
    slug: "mitsubishi-pajero-sport",
    name: "Mitsubishi Pajero Sport Dakar",
    category: "premium",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Diesel",
    image: "/images/vehicles/mitsubishi-pajero-sport.webp",
    gallery: [
      "/images/vehicles/mitsubishi-pajero-sport.webp",
      "/images/vehicles/mitsubishi-pajero-sport-2.webp",
    ],
    pricing: {
      startingPrice: 1200000,
    },
    description: [
      "Mitsubishi Pajero Sport Dakar adalah SUV tangguh untuk segala medan. Sangat cocok untuk perjalanan wisata ke destinasi dengan jalanan menantang seperti Bromo atau Kawah Ijen.",
      "Kabinnya luas dan bertenaga besar, membuat perjalanan jauh terasa aman dan mantap.",
    ],
    suitableFor: [
      "Wisata adventure",
      "Perjalanan Bromo/Ijen",
      "Perjalanan luar kota jauh",
      "Perjalanan dinas lapangan",
    ],
    features: [
      "AC Double Blower",
      "Audio System",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Tinggi Nyaman",
      "Ground Clearance Tinggi",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Diesel" },
      { label: "AC", value: "Double Blower" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Mitsubishi Pajero Sport Bandung",
      description:
        "Sewa Mitsubishi Pajero Sport Dakar di Cimahi, Bandung dan Padalarang mulai Rp1.200.000/ 12 jam. Tangguh untuk semua medan. Mahessa Trans Holiday.",
      keywords: ["rental pajero", "sewa pajero sport bandung", "rental jeep bandung"],
    },
  },
  {
    id: "toyota-fortuner",
    slug: "toyota-fortuner",
    name: "Toyota Fortuner VRZ",
    category: "premium",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Diesel",
    image: "/images/vehicles/toyota-fortuner.webp",
    gallery: [
      "/images/vehicles/toyota-fortuner.webp",
      "/images/vehicles/toyota-fortuner-2.webp",
    ],
    pricing: {
      startingPrice: 1100000,
    },
    description: [
      "Toyota Fortuner VRZ menghadirkan keseimbangan sempurna antara kemewahan dan ketangguhan. Interior premium dengan posisi duduk tinggi yang nyaman.",
      "Ideal untuk perjalanan dinas pejabat, wisata keluarga besar, maupun road trip jauh yang menuntut kenyamanan.",
    ],
    suitableFor: [
      "Perjalanan dinas pejabat",
      "Road trip jauh",
      "Wisata keluarga besar",
      "Antar-jemput tamu",
    ],
    features: [
      "AC Double Blower",
      "Audio System",
      "Power Steering",
      "Bagasi Luas",
      "Kursi Premium",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Diesel" },
      { label: "AC", value: "Double Blower" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Fortuner Bandung",
      description:
        "Sewa Toyota Fortuner VRZ di Cimahi, Bandung dan Padalarang mulai Rp1.100.000/ 12 jam. Mewah dan tangguh. Mahessa Trans Holiday.",
      keywords: ["rental fortuner", "sewa fortuner bandung"],
    },
  },
  {
    id: "toyota-alphard",
    slug: "toyota-alphard",
    name: "Toyota Alphard",
    badge: "Luxury",
    category: "luxury",
    transmission: "Automatic",
    capacity: 7,
    fuelType: "Bensin",
    image: "/images/vehicles/toyota-alphard.webp",
    gallery: [
      "/images/vehicles/toyota-alphard.webp",
      "/images/vehicles/toyota-alphard-2.webp",
    ],
    pricing: {
      startingPrice: 2500000,
    },
    description: [
      "Toyota Alphard adalah ikon kemewahan MPV. Kursi captain seat yang melapangkan, kabin senyap, dan fitur hiburan lengkap menjadikan setiap perjalanan terasa istimewa.",
      "Pilihan utama untuk wedding car, antar-jemput tamu VIP, maupun perjalanan eksekutif yang mengutamakan prestise.",
    ],
    suitableFor: [
      "Wedding car",
      "Antar-jemput tamu VIP",
      "Perjalanan eksekutif",
      "Wisata premium",
    ],
    features: [
      "Captain Seat Premium",
      "AC Dual Zone",
      "Audio & Video System",
      "Power Sliding Door",
      "Kabin Senyap",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "7 orang" },
      { label: "Transmisi", value: "Automatic" },
      { label: "Bahan Bakar", value: "Bensin" },
      { label: "AC", value: "Dual Zone" },
      { label: "Bagasi", value: "Luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Rental Toyota Alphard Bandung & Cimahi",
      description:
        "Sewa Toyota Alphard di Cimahi, Bandung dan Padalarang mulai Rp2.500.000/ 12 jam. Untuk wedding, VIP, dan perjalanan eksekutif. Mahessa Trans Holiday.",
      keywords: ["rental alphard", "sewa alphard bandung", "rental mobil wedding bandung"],
    },
  },
  {
    id: "toyota-hiace-premio",
    slug: "toyota-hiace-premio",
    name: "Toyota Hiace Premio",
    badge: "Populer",
    category: "group",
    transmission: "Manual",
    capacity: 15,
    fuelType: "Diesel",
    image: "/images/vehicles/toyota-hiace-premio.webp",
    gallery: [
      "/images/vehicles/toyota-hiace-premio.webp",
      "/images/vehicles/toyota-hiace-premio-2.webp",
    ],
    pricing: {
      startingPrice: 1800000,
    },
    description: [
      "Toyota Hiace Premio adalah kendaraan andalan untuk rombongan. Kapasitas 14â€“15 penumpang dengan kabin tinggi yang memungkinkan gerakan bebas selama perjalanan.",
      "Hanya tersedia dengan driver berpengalaman, sehingga kamu cukup duduk dan nikmati perjalanan â€” dalam kota maupun antar kota.",
    ],
    suitableFor: [
      "Rombongan keluarga",
      "Trip komunitas",
      "Perjalanan dinas grup",
      "Team outing",
    ],
    features: [
      "AC Dingin Merata",
      "Audio System",
      "Reclining Seat",
      "Bagasi Kapasitas Besar",
      "Kabin Tinggi",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "14-15 orang" },
      { label: "Transmisi", value: "Manual" },
      { label: "Bahan Bakar", value: "Diesel" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Sangat luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Sewa Hiace Premio Bandung & Cimahi",
      description:
        "Charter Toyota Hiace Premio 15 penumpang dengan driver di Cimahi, Bandung dan Padalarang mulai Rp1.800.000. Mahessa Trans Holiday.",
      keywords: ["sewa hiace premio", "hiace bandung", "rental hiace cimahi"],
    },
  },
  {
    id: "toyota-hiace-commuter",
    slug: "toyota-hiace-commuter",
    name: "Toyota Hiace Commuter",
    category: "group",
    transmission: "Manual",
    capacity: 16,
    fuelType: "Diesel",
    image: "/images/vehicles/toyota-hiace-commuter.webp",
    gallery: [
      "/images/vehicles/toyota-hiace-commuter.webp",
      "/images/vehicles/toyota-hiace-commuter-2.webp",
    ],
    pricing: {
      startingPrice: 1500000,
    },
    description: [
      "Toyota Hiace Commuter adalah pilihan ekonomis untuk angkutan rombongan besar. Kapasitas hingga 16 penumpang dengan konfigurasi kursi efisien.",
      "Cocok untuk shuttle event, ziarah, atau perjalanan wisata grup dengan budget terkendali â€” selalu dengan driver profesional Mahessa.",
    ],
    suitableFor: [
      "Shuttle event",
      "Ziarah dan religi",
      "Wisata grup besar",
      "Angkutan karyawan",
    ],
    features: [
      "AC Dingin Merata",
      "Audio System",
      "Kursi Jok Empuk",
      "Bagasi Rak Bagasi",
      "Kabin Tinggi",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "16 orang" },
      { label: "Transmisi", value: "Manual" },
      { label: "Bahan Bakar", value: "Diesel" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Sangat luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Sewa Hiace Commuter Bandung & Cimahi",
      description:
        "Charter Toyota Hiace Commuter 16 penumpang dengan driver di Cimahi, Bandung dan Padalarang mulai Rp1.500.000. Mahessa Trans Holiday.",
      keywords: ["sewa hiace commuter", "rental hiace bandung", "bus kecil bandung"],
    },
  },
  {
    id: "isuzu-elf",
    slug: "isuzu-elf",
    name: "Isuzu Elf Long",
    category: "group",
    transmission: "Manual",
    capacity: 16,
    fuelType: "Diesel",
    image: "/images/vehicles/isuzu-elf.webp",
    gallery: [
      "/images/vehicles/isuzu-elf.webp",
      "/images/vehicles/isuzu-elf-2.webp",
    ],
    pricing: {
      startingPrice: 1800000,
    },
    description: [
      "Isuzu Elf Long adalah microbus tangguh untuk rombongan besar. Kapasitas hingga 16 penumpang dengan ruang bagasi luas untuk perlengkapan perjalanan.",
      "Hanya tersedia dengan driver berpengalaman. Pilihan ekonomis untuk trip grup, shuttle acara, dan perjalanan antar kota.",
    ],
    suitableFor: [
      "Rombongan keluarga",
      "Shuttle event",
      "Trip komunitas",
      "Perjalanan dinas grup",
    ],
    features: [
      "AC Dingin Merata",
      "Audio System",
      "Kursi Jok Empuk",
      "Bagasi Kapasitas Besar",
      "Kabin Tinggi",
      "Window/Kaca Tinted",
    ],
    specs: [
      { label: "Kapasitas Penumpang", value: "16 orang" },
      { label: "Transmisi", value: "Manual" },
      { label: "Bahan Bakar", value: "Diesel" },
      { label: "AC", value: "Full AC" },
      { label: "Bagasi", value: "Sangat luas" },
    ],
    serviceAreas: SERVICE_AREAS,
    seo: {
      title: "Sewa Elf Long Bandung & Cimahi",
      description:
        "Charter Isuzu Elf Long 16 penumpang dengan driver di Cimahi, Bandung dan Padalarang mulai Rp1.800.000. Mahessa Trans Holiday.",
      keywords: ["sewa elf bandung", "rental elf long cimahi", "microbus bandung"],
    },
  },
];

export const featuredVehicleSlugs = [
  "toyota-avanza",
  "toyota-innova-reborn",
  "toyota-alphard",
  "toyota-hiace-premio",
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(): Vehicle[] {
  return featuredVehicleSlugs
    .map((slug) => getVehicleBySlug(slug))
    .filter((v): v is Vehicle => Boolean(v));
}

export function getRelatedVehicles(slug: string, limit = 3): Vehicle[] {
  const current = getVehicleBySlug(slug);
  if (!current) return vehicles.slice(0, limit);
  const sameCategory = vehicles.filter(
    (v) => v.slug !== slug && v.category === current.category,
  );
  const others = vehicles.filter(
    (v) => v.slug !== slug && v.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
