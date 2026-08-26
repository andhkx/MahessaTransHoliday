type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-site pb-8 pt-10 lg:pb-12 lg:pt-14">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="h-display text-balance text-accent">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm font-bold leading-relaxed tracking-[-0.35px] text-body-text lg:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
