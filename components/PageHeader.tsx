type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/30 blur-3xl"
      />
      <div className="container-site relative pb-10 pt-12 lg:pb-14 lg:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-balance text-[32px] font-extrabold leading-[1.15] tracking-[-0.5px] text-primary md:text-h3 lg:text-h2">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-body-text lg:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
