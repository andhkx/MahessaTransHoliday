import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  ADDRESS,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/constants';

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description: SITE_TAGLINE,
  url: SITE_URL,
  telephone: '+62895327077214',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS,
    addressLocality: 'Cimahi',
    addressRegion: 'Jawa Barat',
    addressCountry: 'ID',
  },
  areaServed: SERVICE_AREAS.map((area) => ({ '@type': 'Place', name: area })),
  priceRange: 'Rp350.000 - Rp18.000.000',
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}