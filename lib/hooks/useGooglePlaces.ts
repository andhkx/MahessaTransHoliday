"use client";

import { useEffect, useState } from "react";

const SCRIPT_ID = "google-maps-places";

type PlacesAutocomplete = {
  addListener: (event: "place_changed", handler: () => void) => void;
  getPlace: () => {
    place_id?: string;
    name?: string;
    formatted_address?: string;
  };
};

type GoogleMapsNamespace = {
  maps: {
    places?: {
      Autocomplete: new (
        input: HTMLInputElement,
        options?: {
          fields?: string[];
          componentRestrictions?: { country: string };
        },
      ) => PlacesAutocomplete;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
    __gmapsLoading?: Promise<void>;
  }
}

function loadScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.google?.maps?.places) return Promise.resolve();
  if (window.__gmapsLoading) return window.__gmapsLoading;

  window.__gmapsLoading = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    const onLoad = () => resolve();
    const onError = () => reject(new Error("Gagal memuat Google Maps."));

    if (existing) {
      if (window.google?.maps?.places) resolve();
      else existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    s.async = true;
    s.defer = true;
    s.addEventListener("load", onLoad, { once: true });
    s.addEventListener("error", onError, { once: true });
    document.head.appendChild(s);
  });

  return window.__gmapsLoading;
}

export function getGoogleMapsKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
}

export function useGooglePlaces(): { ready: boolean; error: string | null } {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const key = getGoogleMapsKey();
    if (!key) {
      setError("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY belum diisi.");
      return;
    }
    let cancelled = false;
    loadScript(key)
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || "Gagal memuat Google Maps.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, error };
}
