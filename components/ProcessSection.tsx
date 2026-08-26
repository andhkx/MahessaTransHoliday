"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { waGeneralLink } from "@/lib/whatsapp";

const EASE = [0.4, 0, 0.2, 1] as const;

const STEPS = [
  {
    step: "01",
    title: "Ceritain",
    time: "< 5 menit",
    desc: "Chat admin: tanggal, tujuan, jumlah orang, dan mau lepas kunci atau pakai driver.",
  },
  {
    step: "02",
    title: "Kita Pilih-in",
    time: "10â€“30 menit",
    desc: "Tim kami rekomendasikan unit & harga terbaik sesuai budget dan jadwalmu.",
  },
  {
    step: "03",
    title: "Deal & Jadwal",
    time: "Hari-H",
    desc: "Unit disiapkan bersih dan full tangki. Serah terima kunci atau driver siap di titik jemput.",
  },
  {
    step: "04",
    title: "Berangkat!",
    time: "Selama sewa",
    desc: "Nikmati perjalanan. Support admin tetap standby selama masa sewa.",
  },
];

export default function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1300px] px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8 text-center"
      >
        <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
          Cara Reservasi
        </span>
        <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-heading sm:text-3xl md:text-4xl">
          Gampang, cepat, dan transparan.
        </h2>
        <p className="mx-auto max-w-xl px-2 text-sm leading-relaxed text-body-text md:text-base">
          Empat langkah dari chat sampai jalan.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((p, i) => (
          <motion.article
            key={p.step}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            className="relative overflow-hidden rounded-[24px] border border-line bg-white p-6 shadow-card"
          >
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-4 select-none text-[64px] font-extrabold leading-none text-accent/[0.07]"
            >
              {p.step}
            </span>
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-[12px] font-extrabold text-primary">
              {p.step}
            </span>
            <h3 className="mb-2 text-[18px] font-extrabold text-heading">{p.title}</h3>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {p.time}
            </p>
            <p className="text-sm leading-relaxed text-body-text">{p.desc}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Respon Cepat", "Admin balas di jam operasional, rata-rata di bawah 10 menit."],
          ["Harga Jelas", "Semua biaya dikonfirmasi di awal â€” tanpa biaya siluman."],
          ["Unit Terjaga", "Bersih, terawat, dan dicek sebelum setiap penyerahan."],
          ["Support Selama Sewa", "Kendala di jalan? Admin dan tim bengkel siap bantu."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-[18px] border border-line bg-white/60 p-4 transition-colors duration-300 hover:border-primary/40"
          >
            <p className="mb-1 text-sm font-extrabold text-heading">{title}</p>
            <p className="text-[13px] leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={waGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-extrabold text-white shadow-card transition-all hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]"
        >
          <MessageCircle size={17} aria-hidden="true" />
          Mulai Chat dengan Admin
        </a>
      </div>
    </section>
  );
}
