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
    <section className="bg-primary">
      <div className="container-site py-12 text-center lg:py-20">
        <h2 className="mx-auto max-w-3xl text-balance text-[28px] font-bold leading-tight text-white lg:text-h2">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-base leading-relaxed text-sky lg:text-lg">
          {text}
        </p>
        <a
          href={waGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-white btn-lg mt-8"
        >
          Konsultasi via WhatsApp
        </a>
      </div>
    </section>
  );
}
