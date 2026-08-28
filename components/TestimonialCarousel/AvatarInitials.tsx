import { useMemo } from "react";

const colors = ["#0F4C75", "#3282B8", "#BBE1FA", "#1B262C", "#005691"];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(index: number): string {
  return colors[index % colors.length];
}

type AvatarProps = {
  name: string;
  index: number;
  size?: number;
};

export default function Avatar({ name, index, size = 56 }: AvatarProps) {
  const initials = getInitials(name);
  const color = useMemo(() => getAvatarColor(index), [index]);
  const fontSize = Math.round(size * 0.35);

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-extrabold"
      style={{ width: size, height: size, backgroundColor: color, fontSize }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
