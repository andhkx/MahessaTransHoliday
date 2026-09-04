"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useGooglePlaces } from "@/lib/hooks/useGooglePlaces";

export type LocationResult = {
  description: string;
  placeId: string;
};

export type LocationAutocompleteHandle = {
  clear: () => void;
  focus: () => void;
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onPlace?: (r: LocationResult) => void;
  error?: string;
  required?: boolean;
  iconColor?: string;
};

const LocationAutocomplete = forwardRef<LocationAutocompleteHandle, Props>(function LocationAutocomplete(
  { name, label, placeholder, value, onChange, onPlace, error, required, iconColor },
  ref,
) {
  const { ready, error: gmapsError } = useGooglePlaces();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const acRef = useRef<{
    addListener: (e: "place_changed", h: () => void) => void;
    getPlace: () => { place_id?: string; name?: string; formatted_address?: string };
  } | null>(null);
  const [focused, setFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    clear: () => {
      onChange("");
      onPlace?.({ description: "", placeId: "" });
      inputRef.current?.focus();
    },
    focus: () => inputRef.current?.focus(),
  }));

  useEffect(() => {
    if (!ready || !inputRef.current) return;
    if (acRef.current) return;

    const Ctor = window.google?.maps?.places?.Autocomplete;
    if (!Ctor) return;
    const ac = new Ctor(inputRef.current, {
      fields: ["place_id", "name", "formatted_address"],
      componentRestrictions: { country: "id" },
    });
    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      const description = place.formatted_address || place.name || "";
      if (!description) return;
      onChange(description);
      onPlace?.({ description, placeId: place.place_id || "" });
    });
    acRef.current = ac;

    return () => {
      acRef.current = null;
    };
  }, [ready, onChange, onPlace]);

  const baseInput =
    "w-full rounded-xl border bg-white pl-9 pr-9 py-2.5 text-[13px] font-bold text-body-text outline-none transition-all placeholder:font-normal placeholder:text-muted focus:ring-2";
  const borderClass = error
    ? "border-error focus:border-error focus:ring-error/20"
    : focused
      ? "border-accent ring-2 ring-accent/15"
      : "border-line";

  return (
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
          ref={inputRef}
          name={name}
          type="text"
          required={required}
          autoComplete="off"
          placeholder={placeholder}
          aria-invalid={error ? "true" : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(baseInput, borderClass)}
        />
        {value && (
          <button
            type="button"
            tabIndex={-1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onChange("");
              onPlace?.({ description: "", placeId: "" });
              inputRef.current?.focus();
            }}
            aria-label="Hapus"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-muted hover:bg-surface hover:text-heading"
          >
            <X size={12} />
          </button>
        )}
      </div>
      {error && (
        <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-error">
          {error}
        </span>
      )}
      {gmapsError && !value && (
        <span className="mt-1.5 block text-[11px] font-bold text-muted">
          {gmapsError} Set <code className="rounded bg-surface px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> di .env.local.
        </span>
      )}
    </label>
  );
});

export default LocationAutocomplete;
