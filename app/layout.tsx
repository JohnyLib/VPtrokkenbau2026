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
  description: 'Ihr Spezialist für gewerbliche Spachtelarbeiten, Gipskartonmontage, Akustikbau und Dachausbau in Dresden. Höchste Qualitätsstufen bis Q4.',
  keywords: ['Trockenbau Dresden', 'Innenausbau Dresden', 'Spachtelarbeiten', 'Gipskartonmontage', 'Akustikbau', 'Decken', 'Wände', 'Handwerker Sachsen', 'Fugenverspachtelung', 'Q4 Spachtelung', 'Objektbau'],
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
    title: 'VpTrockenbau | Trockenbau & Innenausbau Dresden',
    description: 'Ihr Spezialist für gewerbliche Spachtelarbeiten, Gipskartonmontage und Akustikbau in Dresden.',
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
  '@type': 'DrywallContractor',
  'name': 'VpTrockenbau',
  'alternateName': 'VpTrockenbau Dresden',
  'image': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'description': 'Ihr Spezialist für Trockenbau, gewerbliche Spachtelarbeiten (Q1-Q4), präzise Gipskartonmontage, Akustikbau und Dachausbau in Dresden und ganz Sachsen.',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Königsbrücker Landstraße 54',
    'addressLocality': 'Dresden',
    'postalCode': '01109',
    'addressCountry': 'DE'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 51.0504,
    'longitude': 13.7373
  },
  'url': 'https://vptrockenbau.de',
  'telephone': '+4915161559335',
  'email': 'info@vptrockenbau.de',
  'priceRange': '$$',
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '07:00',
      'closes': '18:00'
    }
  ],
  'areaServed': [
    { '@type': 'AdministrativeArea', 'name': 'Dresden' },
    { '@type': 'AdministrativeArea', 'name': 'Radebeul' },
    { '@type': 'AdministrativeArea', 'name': 'Freital' },
    { '@type': 'AdministrativeArea', 'name': 'Pirna' },
    { '@type': 'AdministrativeArea', 'name': 'Meißen' },
    { '@type': 'AdministrativeArea', 'name': 'Radeberg' },
    { '@type': 'AdministrativeArea', 'name': 'Sachsen' }
  ],
  'knowsAbout': [
    'Trockenbau',
    'Spachtelarbeiten',
    'Q4 Spachtelung',
    'Gipskartonmontage',
    'Akustikbau',
    'Dachgeschossausbau',
    'Fugenverspachtelung'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CKJ957FF5W"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKJ957FF5W');
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-[#fbf8fa] text-[#1b1b1d] selection:bg-[#fd761a] selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
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
