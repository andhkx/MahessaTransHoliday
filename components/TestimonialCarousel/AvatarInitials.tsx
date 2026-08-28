export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(index: number): string {
  const colors = ["#0F4C75", "#3282B8", "#1B262C", "#005691", "#0A4B7F", "#052E5A"];
  return colors[index % colors.length];
}

type AvatarProps = {
  name: string;
  index: number;
  size?: number;
};

export default function Avatar({ name, index, size = 64 }: AvatarProps) {
  const initials = getInitials(name);
  const color = getAvatarColor(index);
  const fontSize = Math.round(size * 0.36);

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-extrabold text-white shadow-[0_4px_12px_rgba(15,76,117,0.25)]"
      style={{ width: size, height: size, backgroundColor: color, fontSize }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
