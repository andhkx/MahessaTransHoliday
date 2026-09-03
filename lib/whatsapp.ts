import { SITE_NAME, WHATSAPP_NUMBER } from "./constants";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function waGeneralLink(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}

export function waContactLink(): string {
  return "/kontak";
}

export function waVehicleLink(vehicleName: string): string {
  return waLink(
    `Halo ${SITE_NAME}, saya ingin menanyakan ketersediaan ${vehicleName} untuk rental.`,
  );
}

export function waPackageLink(packageName: string, price: number): string {
  return waLink(
    `Halo ${SITE_NAME}, saya tertarik dengan Paket ${packageName} mulai Rp${price.toLocaleString("id-ID")}.`,
  );
}