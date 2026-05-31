import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyCTA } from '@/components/layout/StickyCTA';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#091426',
};

export const metadata: Metadata = {
  title: {
    default: 'VpTrockenbau | Trockenbau & Innenausbau Dresden',
    template: '%s | VpTrockenbau Dresden',
  },
  description: 'Ihr Spezialist für Trockenbau, Spachtelarbeiten (Q1–Q4), Gipskartonmontage und Akustikbau in Dresden & Sachsen. Jetzt kostenloses Angebot anfordern!',
  keywords: [
    'Trockenbau Dresden',
    'Innenausbau Dresden',
    'Spachtelarbeiten',
    'Gipskartonmontage',
    'Akustikbau',
    'Decken',
    'Wände',
    'Handwerker Sachsen',
    'Fugenverspachtelung',
    'Q4 Spachtelung',
    'Objektbau',
    'Innenausbau Firma',
    'Trockenbau Firma',
    'Innenausbau Trockenbau',
    'Trockenbau Unternehmen',
    'Trockenbau Ausschreibung',
    'Trockenbau Innenausbau',
    'Firma Trockenbau',
    'Trockenbau Firma',
    'Ausschreibung Trockenbau',
    'Brandschutz Trockenbau',
    'Trockenbau Brandschutz',
    'Trockenbau Angebot',
    'Kalkulation Trockenbau',
    'Innenausbau Trockenbau in der Nähe',
    'Trockenbau Kalkulation',
    'Dachausbau Trockenbau',
    'Firma für Innenausbau',
    'Angebot Trockenbau',
    'Innenausbau Unternehmen',
    'Innenausbau Trockenbau Firmen',
    'Trockenbau Leistungen',
    'Kostenvoranschlag Trockenbau',
    'Innenausbau und Trockenbau',
    'Trockenbau und Innenausbau'
  ],
  authors: [{ name: 'VpTrockenbau' }],
  creator: 'VpTrockenbau',
  publisher: 'VpTrockenbau',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://vptrockenbau.de',
  },
  icons: {
    icon: '/Ico.ico',
    shortcut: '/Ico.ico',
    apple: '/Ico.ico',
  },
  verification: {
    google: 'google-site-verification-token',
  },
  openGraph: {
    title: 'VpTrockenbau | Präzision im Trockenbau Dresden',
    description: 'Hochwertiger Trockenbau in Dresden für Architekten, Bauherren und das Gewerbe.',
    url: 'https://vptrockenbau.de',
    siteName: 'VpTrockenbau',
    images: [
      {
        url: 'https://vptrockenbau.de/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VpTrockenbau - Trockenbau & Innenausbau Dresden',
      },
    ],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vptrockenbau',
    title: 'VpTrockenbau | Trockenbau & Innenausbau Dresden',
    description: 'Ihr Spezialist für Trockenbau, Spachtelarbeiten (Q1–Q4), Gipskartonmontage und Akustikbau in Dresden & Sachsen.',
    images: ['https://vptrockenbau.de/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  'name': 'VpTrockenbau',
  'alternateName': 'VpTrockenbau Dresden',
  'image': 'https://vptrockenbau.de/og-image.png',
  'logo': 'https://vptrockenbau.de/Ico.ico',
  'description': 'Ihr Spezialist für Trockenbau, gewerbliche Spachtelarbeiten (Q1–Q4), präzise Gipskartonmontage, Akustikbau und Dachausbau in Dresden und ganz Sachsen.',
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
  'url': 'https://vptrockenbau.de',
  'telephone': '+4915161559335',
  'email': 'info@vptrockenbau.de',
  'sameAs': [
    'https://vptrockenbau.de'
  ],
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '07:00',
      'closes': '18:00'
    }
  ],
  'areaServed': [
    { '@type': 'City', 'name': 'Dresden' },
    { '@type': 'City', 'name': 'Radebeul' },
    { '@type': 'City', 'name': 'Freital' },
    { '@type': 'City', 'name': 'Pirna' },
    { '@type': 'City', 'name': 'Meißen' },
    { '@type': 'City', 'name': 'Radeberg' },
    { '@type': 'AdministrativeArea', 'name': 'Sachsen' }
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Trockenbau Leistungen',
    'itemListElement': [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Spachtelarbeiten Q1–Q4' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Gipskartonmontage' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Akustikbau' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Dachausbau' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Fugenverspachtelung' } }
    ]
  },
  'knowsAbout': [
    'Trockenbau',
    'Spachtelarbeiten',
    'Q4 Spachtelung',
    'Gipskartonmontage',
    'Akustikbau',
    'Dachgeschossausbau',
    'Fugenverspachtelung',
    'Brandschutz Trockenbau',
    'Innenausbau'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CKJ957FF5W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKJ957FF5W');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-[#fbf8fa] text-[#1b1b1d] selection:bg-[#2563eb] selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-grow pt-24 pb-16">{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
