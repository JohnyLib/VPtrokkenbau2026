import { KontaktClient } from './KontaktClient';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Kontakt & Anfrage | VpTrockenbau Dresden',
  description: 'Kontaktieren Sie Ihren Trockenbau-Spezialisten in Dresden. Kostenlose Beratung & Angebot für Spachtelarbeiten, Gipskartonmontage und Innenausbau. Tel: +4915161559335',
  alternates: {
    canonical: 'https://vptrockenbau.de/kontakt',
  },
  openGraph: {
    title: 'Kontakt aufnehmen | VpTrockenbau',
    description: 'Fordern Sie ein kostenloses Angebot für Ihr Trockenbau-Projekt in Dresden an.',
    url: 'https://vptrockenbau.de/kontakt',
    images: [{ url: 'https://vptrockenbau.de/og-image.png', width: 1200, height: 630, alt: 'VpTrockenbau Kontakt Dresden' }],
  },
};

export default function Kontakt() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Startseite', 'item': 'https://vptrockenbau.de' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Kontakt', 'item': 'https://vptrockenbau.de/kontakt' }
    ]
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'mainEntity': {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      'name': 'VpTrockenbau',
      'image': 'https://vptrockenbau.de/og-image.png',
      'telephone': '+4915161559335',
      'email': 'info@vptrockenbau.de',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Königsbrücker Landstraße 54',
        'addressLocality': 'Dresden',
        'postalCode': '01109',
        'addressRegion': 'Sachsen',
        'addressCountry': 'DE'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 51.1076,
        'longitude': 13.7709
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '07:00',
          'closes': '18:00'
        }
      ]
    }
  };

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <KontaktClient />
    </>
  );
}
