export type Testimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  reply: string;
  time: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Pak Dani",
    role: "Perjalanan dinas",
    message:
      "Mobilnya bersih banget, dingin AC nya, dan driver ramah. Perjalanan Bandung-Jakarta lancar tanpa kendala.",
    reply: "Terima kasih pak, ditunggu perjalanan berikutnya!",
    time: "09.41",
  },
  {
    id: "t2",
    name: "Bu Rina",
    role: "Wisata keluarga",
    message:
      "Sewa Hiace buat acara keluarga ke Pangalengan. Semua serba gampang, harga sesuai kesepakatan, nggak ada biaya siluman.",
    reply: "Senang bisa membantu bu!",
    time: "13.07",
  },
  {
    id: "t3",
    name: "Agus K.",
    role: "Antar-jemput KCIC",
    message:
      "Datang telat malam dari stasiun Padalarang, ternyata driver udah nungguin dengan nama tertera. Profesional.",
    reply: "Siap, amanah itu standar kami.",
    time: "21.15",
  },
  {
    id: "t4",
    name: "Komunitas Motor R",
    role: "Trip rombongan",
    message:
      "Charter Hiace buat 16 orang ke Bromo. Nyaman semua, bagasi muat, driver hafal rute dan spot sunrise-nya.",
    reply: "Mantap, sampai jumpa di trip selanjutnya!",
    time: "06.52",
  },
  {
    id: "t5",
    name: "Sinta",
    role: "Rental lepas kunci",
    message:
      "Ambil Avanza lepas kunci 24 jam. Proses cepat, unit mulus, deposit dikembalikan penuh. Recommended.",
    reply: "Terima kasih sinta, next lagi ya!",
    time: "17.33",
  },
];
