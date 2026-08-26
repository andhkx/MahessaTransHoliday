import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
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
      <h2 className="text-[26px] font-bold leading-8 tracking-[-0.3px] text-primary md:text-h2 md:leading-[44px]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-sm leading-5 text-body-text md:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
