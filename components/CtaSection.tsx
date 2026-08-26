import { waGeneralLink } from "@/lib/whatsapp";

type CtaSectionProps = {
  title?: string;
  text?: string;
};

export default function CtaSection({
  title = "Sudah tahu mau pergi ke mana?",
  text = "Ceritakan kebutuhan perjalananmu, biar kami bantu pilihkan kendaraan dan layanan yang sesuai dengan budget dan jadwalmu.",
}: CtaSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary px-6 py-14 text-center shadow-xl sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
            {text}
          </p>
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-dark"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
