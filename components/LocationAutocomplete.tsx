"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type LocationResult = {
  description: string;
  lat: number;
  lon: number;
};

type Suggestion = {
  displayName: string;
  lat: number;
  lon: number;
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  coords?: { lat: number; lon: number } | null;
  onChange: (v: string) => void;
  onPlace?: (r: LocationResult) => void;
  error?: string;
  required?: boolean;
  iconColor?: string;
  className?: string;
};

export default function LocationAutocomplete({
  name,
  label,
  placeholder,
  value,
  onChange,
  onPlace,
  error,
  required,
  iconColor,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const lastQ = useRef("");
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    const q = value.trim();
    if (q.length < 3) {
      setItems([]);
      setLoading(false);
      return;
    }
    if (q === lastQ.current) return;
    setLoading(true);
    debounce.current = setTimeout(() => {
      lastQ.current = q;
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&countrycodes=id&addressdetails=0`,
        { headers: { Accept: "application/json" } },
      )
        .then((r) => r.json())
        .then((data: Array<{ display_name: string; lat: string; lon: string }>) => {
          setItems(
            data.map((d) => ({
              displayName: d.display_name,
              lat: parseFloat(d.lat),
              lon: parseFloat(d.lon),
            })),
          );
          setLoading(false);
          setActiveIdx(-1);
        })
        .catch(() => {
          setItems([]);
          setLoading(false);
        });
    }, 350);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [value]);

  const pick = (s: Suggestion) => {
    onChange(s.displayName);
    onPlace?.({ description: s.displayName, lat: s.lat, lon: s.lon });
    setItems([]);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      pick(items[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const baseInput =
    "w-full rounded-xl border bg-white pl-9 pr-9 py-2.5 text-[13px] font-bold text-body-text outline-none transition-all placeholder:font-normal placeholder:text-muted focus:ring-2";
  const borderClass = error
    ? "border-error focus:border-error focus:ring-error/20"
    : open
      ? "border-accent ring-2 ring-accent/15"
      : "border-line";

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
          {label}
          {required && <span className="ml-1 text-accent">*</span>}
        </span>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            style={iconColor ? { color: iconColor } : undefined}
          >
            <MapPin size={14} />
          </span>
          <input
            name={name}
            type="text"
            required={required}
            autoComplete="off"
            placeholder={placeholder}
            aria-invalid={error ? "true" : undefined}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className={cn(baseInput, borderClass)}
          />
          {value && (
            <button
              type="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange("");
                onPlace?.({ description: "", lat: 0, lon: 0 });
                setItems([]);
              }}
              aria-label="Hapus"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-heading"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </label>

      {open && (loading || items.length > 0) && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-line bg-white shadow-elevated">
          {loading && items.length === 0 && (
            <div className="px-3.5 py-2.5 text-[12px] text-muted">Mencari…</div>
          )}
          {items.map((s, i) => (
            <button
              key={`${s.lat}-${s.lon}-${i}`}
              type="button"
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => pick(s)}
              className={cn(
                "flex w-full items-start gap-2 border-b border-line/50 px-3.5 py-2.5 text-left text-[12px] last:border-b-0 transition",
                i === activeIdx ? "bg-accent/5" : "hover:bg-surface",
              )}
            >
              <MapPin size={12} className="mt-0.5 shrink-0 text-accent" />
              <span className="line-clamp-2 text-body-text">{s.displayName}</span>
            </button>
          ))}
        </div>
      )}

      {error && (
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-error">
          {error}
        </span>
      )}
    </div>
  );
}
