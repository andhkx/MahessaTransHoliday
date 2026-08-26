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
    <section className="py-12 lg:py-20">
      <div className="container-site">
        <div className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-12 text-center shadow-elevated lg:px-12 lg:py-16">
          <h2 className="mx-auto max-w-2xl text-[26px] font-extrabold leading-8 tracking-[-0.3px] text-white md:text-h2 md:leading-[44px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
            {text}
          </p>
          <a
            href={waGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg mt-8"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
