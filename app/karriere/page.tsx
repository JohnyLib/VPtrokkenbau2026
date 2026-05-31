import { KarriereClient } from './KarriereClient';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Trockenbau Jobs & Karriere Dresden | VpTrockenbau',
  description: 'Werden Sie Teil unseres Teams! VpTrockenbau sucht Trockenbauer, Vorarbeiter und Poliere in Dresden. Faire Bezahlung, Weiterbildung & langfristige Perspektive.',
  keywords: ['Trockenbauer Stelle Dresden', 'Trockenbau Jobs', 'Polier Sachsen', 'Gipskarton Handwerker Stelle', 'Innenausbau Mitarbeiter', 'Stellenangebot Trockenbau'],
  alternates: {
    canonical: 'https://vptrockenbau.de/karriere',
  },
  openGraph: {
    title: 'Karriere & Jobs | VpTrockenbau Dresden',
    description: 'Bewerben Sie sich jetzt. VpTrockenbau in Dresden sucht Verstärkung — faire Konditionen & Entwicklungsperspektiven.',
    url: 'https://vptrockenbau.de/karriere',
    images: [
      {
        url: 'https://vptrockenbau.de/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VpTrockenbau Karriere & Jobs Dresden',
      },
    ],
  },
};

export default function Karriere() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Startseite', 'item': 'https://vptrockenbau.de' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Karriere', 'item': 'https://vptrockenbau.de/karriere' }
    ]
  };

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <KarriereClient />
    </>
  );
}
