import { SITE_NAME, WHATSAPP_NUMBER } from "./constants";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function waGeneralLink(): string {
  return waLink(
    `Halo ${SITE_NAME}, saya ingin konsultasi kebutuhan perjalanan saya.`,
  );
}

export function waVehicleLink(vehicleName: string): string {
  return waLink(
    `Halo ${SITE_NAME}, saya ingin menanyakan ketersediaan ${vehicleName} untuk rental. Saya ingin sewa [12/ 12 jam] pada tanggal [XX Bulan YYYY]. Berapa harganya?`,
  );
}

export function waPackageLink(packageName: string, price: number): string {
  return waLink(
    `Halo ${SITE_NAME}, saya tertarik dengan Paket ${packageName} mulai Rp${price.toLocaleString("id-ID")}. Saya ingin menanyakan ketersediaan untuk tanggal [XX Bulan YYYY]. Bagaimana prosesnya?`,
  );
}
