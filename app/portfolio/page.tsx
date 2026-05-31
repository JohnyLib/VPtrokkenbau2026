import { PortfolioClient } from './PortfolioClient';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Referenzen & Trockenbau-Projekte Dresden | VpTrockenbau',
  description: 'Entdecken Sie unsere abgeschlossenen Trockenbau-Projekte in Dresden: Bürokomplexe, Wohnbau und Altbausanierung mit Q3- und Q4-Spachtelqualität. Referenzen ansehen.',
  keywords: ['Trockenbau Referenzen Dresden', 'Portfolio Innenausbau', 'Spachtelarbeiten Projekte', 'Gipskarton Referenzen', 'Q4 Spachtelung Beispiele', 'Trockenbau Bilder'],
  alternates: {
    canonical: 'https://vptrockenbau.de/portfolio',
  },
  openGraph: {
    title: 'Referenzen & Portfolio | VpTrockenbau Dresden',
    description: 'Hochwertige Trockenbau-Projekte in Dresden. Überzeugen Sie sich von Qualitätsstufe Q4 und professionellem Innenausbau.',
    url: 'https://vptrockenbau.de/portfolio',
    images: [
      {
        url: 'https://vptrockenbau.de/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VpTrockenbau Referenzen & Portfolio Dresden',
      },
    ],
  },
};

export default function Portfolio() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Startseite', 'item': 'https://vptrockenbau.de' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Portfolio', 'item': 'https://vptrockenbau.de/portfolio' }
    ]
  };

  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PortfolioClient />
    </>
  );
}
