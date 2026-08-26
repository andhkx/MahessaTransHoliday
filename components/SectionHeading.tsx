import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "primary" | "navy";
};

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  tone = "primary",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 max-w-2xl lg:mb-10",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <h2
        className={cn(
          "text-balance text-[28px] font-bold leading-tight tracking-[-0.5px] md:text-h2",
          tone === "navy" ? "text-navy" : "text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed text-body-text md:text-base",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
