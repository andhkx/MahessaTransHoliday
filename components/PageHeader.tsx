type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-surface pb-10 pt-[104px] lg:pb-14 lg:pt-[134px]">
      <div className="container-site">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span
              aria-hidden="true"
              className="inline-block w-8 border-t-2 border-dashed border-accent"
            />
            Mahessa Trans Holiday
          </span>
          <h1 className="mt-3 text-[28px] font-bold leading-9 tracking-[-0.3px] text-primary md:text-h2 md:leading-[44px]">
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
