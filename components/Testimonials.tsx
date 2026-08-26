import type { Testimonial } from "@/lib/testimonials";

function Avatar({ name }: { name: string }) {
  const initials = name
    .replace(/^(Pak|Bu)\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/25 text-sm font-extrabold text-accent">
      {initials}
    </span>
  );
}

export function TestimonialBubble({ item }: { item: Testimonial }) {
  return (
    <article className="card card-lift flex h-full flex-col p-5">
      <header className="flex items-center gap-3 border-b border-line pb-3">
        <Avatar name={item.name} />
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-accent">
            {item.name}
          </p>
          <p className="flex items-center gap-1.5 truncate text-[11px] font-bold text-primary">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-success"
            />
            online · {item.role}
          </p>
        </div>
      </header>

      <div className="mt-4 flex flex-col gap-2">
        <div className="max-w-[92%] self-end rounded-[16px] rounded-br-sm bg-primary/15 px-4 py-3">
          <p className="text-sm font-semibold leading-relaxed tracking-[-0.2px] text-body-text">
            {item.message}
          </p>
          <p className="mt-1 text-right text-[10px] font-bold text-body-text/50">
            {item.time} ✓✓
          </p>
        </div>
        <div className="max-w-[85%] self-start rounded-[16px] rounded-bl-sm bg-wa-surface px-4 py-3">
          <p className="text-sm font-semibold leading-relaxed tracking-[-0.2px] text-body-text">
            {item.reply}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials({
  items,
}: {
  items: Testimonial[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => (
        <TestimonialBubble key={item.id} item={item} />
      ))}
    </div>
  );
}
