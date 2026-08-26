import { waGeneralLink } from "@/lib/whatsapp";

type CtaSectionProps = {
  title?: string;
  text?: string;
};

export default function CtaSection({
  title = "Siap berangkat bersama Mahessa?",
  text = "Ceritakan kebutuhan perjalananmu. Kami bantu siapkan kendaraan dan layanan yang sesuai target dan anggaran.",
}: CtaSectionProps) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="rounded-[24px] bg-accent px-6 py-12 text-center lg:px-12 lg:py-16">
          <span className="eyebrow !text-primary">Konsultasi gratis</span>
          <h2 className="mx-auto max-w-2xl text-balance text-[26px] font-extrabold leading-tight tracking-[-0.75px] text-white lg:h-heading lg:text-white">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-bold leading-relaxed tracking-[-0.35px] text-white/70 lg:text-base">
            {text}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-white btn-md"
            >
              Mulai Konsultasi
            </a>
            <a
              href={waGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-md border-2 border-white/25 text-white hover:border-primary hover:text-primary"
            >
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
