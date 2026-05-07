import { KontaktClient } from './KontaktClient';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Kontakt & Anfrage | VPTrokkenbau Dresden',
  description: 'Kontaktieren Sie Ihren Spezialisten für Trockenbau, Spachtelarbeiten und Brandschutz in Dresden. Fordern Sie jetzt ein unverbindliches Angebot an. E-Mail: info@vptrokenbau.de, perevalovvasilii@gmail.com, Tel: +4915161559335',
  alternates: {
    canonical: 'https://vptrokkenbau.de/kontakt',
  },
  openGraph: {
    title: 'Kontakt aufnehmen | VPTrokkenbau',
    description: 'Fordern Sie ein kostenloses Angebot für Ihr Trockenbau-Projekt in Dresden an.',
    url: 'https://vptrokkenbau.de/kontakt',
  },
};

export default function Kontakt() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'mainEntity': {
      '@type': 'LocalBusiness',
      'name': 'VPTrokkenbau GmbH',
      'image': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'telephone': '+4915161559335',
      'email': ['info@vptrokenbau.de', 'perevalovvasilii@gmail.com'],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Baustraße 123',
        'addressLocality': 'Dresden',
        'postalCode': '01067',
        'addressCountry': 'DE'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 51.0504,
        'longitude': 13.7373
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
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <KontaktClient />
    </>
  );
}
