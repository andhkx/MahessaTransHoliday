"use client";

import { useEffect, useRef } from "react";
import { Map as MlMap, Marker, NavigationControl, AttributionControl, LngLatBounds } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster" as const,
      source: "osm",
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

type Pin = { lat: number; lon: number; color?: string; label?: string };

type Props = {
  pins: Pin[];
  center?: [number, number];
  zoom?: number;
  fitPadding?: number;
  className?: string;
};

export default function RouteMap({
  pins,
  center,
  zoom = 11,
  fitPadding = 60,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const map = useRef<MlMap | null>(null);
  const markers = useRef<Marker[]>([]);

  useEffect(() => {
    if (!ref.current || map.current) return;
    const firstValid = pins.find(
      (p) => Number.isFinite(p.lat) && Number.isFinite(p.lon),
    );
    const initial: [number, number] = center
      ? center
      : firstValid
        ? [firstValid.lon, firstValid.lat]
        : [106.8456, -6.2088];
    const m = new MlMap({
      container: ref.current,
      style: STYLE,
      center: initial,
      zoom,
      attributionControl: false,
      fadeDuration: 0,
      transformRequest: (url) => {
        if (url.includes("openstreetmap.org")) {
          return {
            url,
            headers: { Referer: "https://mahessatransholiday.web.id" },
          };
        }
        return { url };
      },
    });
    m.on("error", (e) => {
      console.warn("[RouteMap]", e?.error?.message || e);
    });
    m.addControl(new NavigationControl({ showCompass: false }), "top-right");
    m.addControl(
      new AttributionControl({ compact: true }),
      "bottom-right",
    );
    map.current = m;
    return () => {
      m.remove();
      map.current = null;
    };
  }, [center, zoom, pins]);

  useEffect(() => {
    const m = map.current;
    if (!m) return;
    markers.current.forEach((mk) => mk.remove());
    markers.current = pins
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lon))
      .map((p) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 28px; height: 28px; border-radius: 9999px;
          background: ${p.color ?? "#005691"}; color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; border: 2px solid white;
          box-shadow: 0 4px 10px -2px rgba(0,0,0,0.3);
        `;
        el.textContent = p.label ?? "";
        return new Marker({ element: el })
          .setLngLat([p.lon, p.lat])
          .addTo(m);
      });

    const valid = pins.filter(
      (p) => Number.isFinite(p.lat) && Number.isFinite(p.lon),
    );
    if (valid.length === 0) return;
    if (valid.length === 1) {
      m.flyTo({ center: [valid[0].lon, valid[0].lat], zoom: 13, duration: 600 });
      return;
    }
    const bounds = new LngLatBounds();
    valid.forEach((p) => bounds.extend([p.lon, p.lat]));
    m.fitBounds(bounds, { padding: fitPadding, duration: 600, maxZoom: 14 });
  }, [pins, fitPadding]);

  return <div ref={ref} className={className} style={{ minHeight: 280 }} />;
}
