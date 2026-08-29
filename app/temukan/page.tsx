import type { Metadata } from "next";
import { seoMetadata } from "@/data/seo";
import VehicleFinder from "@/components/VehicleFinder/VehicleFinder";

export const metadata: Metadata = {
  title: seoMetadata.temukan.title,
  description: seoMetadata.temukan.description,
  keywords: seoMetadata.temukan.keywords,
  alternates: { canonical: "/temukan" },
};

export default function TemukanPage() {
  return <VehicleFinder />;
}
