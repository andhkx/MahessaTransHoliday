"use client";

import { useEffect, useRef, useState } from "react";

export default function useSnapActive(threshold = 0.6): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const kids = Array.from(el.children) as HTMLElement[];
    if (!kids.length) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= threshold) {
            setActive(Math.max(0, kids.indexOf(e.target as HTMLElement)));
          }
        });
      },
      { root: el, threshold: [threshold] },
    );
    kids.forEach((k) => obs.observe(k));
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, active];
}
