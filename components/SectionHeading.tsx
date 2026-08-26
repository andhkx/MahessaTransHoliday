import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 max-w-2xl lg:mb-10",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={cn("h-heading text-balance text-accent")}>{title}</h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm font-bold leading-relaxed tracking-[-0.35px] text-body-text",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
