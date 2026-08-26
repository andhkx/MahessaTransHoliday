type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-white pt-28 pb-10 md:pt-32 md:pb-12">
      <div className="mx-auto w-full max-w-[1300px] px-5 text-center sm:px-8 md:px-12">
        {eyebrow && (
          <span className="mb-2 inline-block font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </span>
        )}
        <h1 className="mx-auto mb-3 max-w-3xl text-balance text-[clamp(26px,4vw,36px)] font-extrabold leading-[1.15] tracking-tight text-heading">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-body-text md:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
