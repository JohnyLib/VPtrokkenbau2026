import Image from 'next/image';
import { PaintRoller, Hammer, Volume2, Home } from 'lucide-react';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Trockenbau Leistungen & Spachtelarbeiten | VpTrockenbau Dresden',
  description: 'Unsere Expertise umfasst hochwertigen Trockenbau, Spachtelarbeiten (Q1-Q4), professionelle Gipskartonmontage, Fugenverspachtelung und Akustikbau für Dresden und Region.',
  keywords: ['Trockenbau Leistungen', 'Spachtelarbeiten Q4', 'Gipskartonmontage', 'Akustikbau Fachbetrieb', 'Dresden Bau', 'VpTrockenbau Leistungen'],
  alternates: {
    canonical: 'https://vptrockenbau.de/leistungen',
  },
  openGraph: {
    title: 'Unsere Leistungen im Trockenbau | VpTrockenbau',
    description: 'Expertise in Trockenbau, Spachtelarbeiten Q1-Q4, Gipskartonmontage und Akustikbau.',
    url: 'https://vptrockenbau.de/leistungen',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Trockenbau Leistungen VpTrockenbau',
      },
    ],
  },
};

export default function Leistungen() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@type': 'Service',
          'name': 'Spachtelarbeiten (Q1-Q4)',
          'description': 'Höchste Oberflächenqualität für anspruchsvolle Raumkonzepte. Wir realisieren Verspachtelungen bis zur Qualitätsstufe Q4 für makellose, streiflichtfreie Ergebnisse.',
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'VpTrockenbau',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': 'Königsbrücker Landstraße 54',
              'addressLocality': 'Dresden',
              'postalCode': '01109',
              'addressCountry': 'DE'
            }
          }
        }
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@type': 'Service',
          'name': 'Gipskartonmontage',
          'description': 'Professionelle Montage von Gipskartonplatten auf Metallständerwerken. Wir errichten Trennwände, Deckenbekleidungen und raumbildende Sonderkonstruktionen malerfertig.',
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'VpTrockenbau'
          }
        }
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'item': {
          '@type': 'Service',
          'name': 'Akustikbau',
          'description': 'Optimierung der Raumakustik durch hochwirksame Schallabsorber und Akustikdecken. Reduzierung von Nachhallzeiten und Verbesserung der Sprachverständlichkeit für Büros, Foyers und Veranstaltungsräume.',
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'VpTrockenbau'
          }
        }
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'item': {
          '@type': 'Service',
          'name': 'Dachausbau',
          'description': 'Effiziente Transformation ungenutzter Dachgeschosse in hochwertigen Wohn- oder Gewerberaum. Inklusive fachgerechter Dämmung, Dampfsperren und präziser Beplankung komplexer Dachschrägen.',
          'provider': {
            '@type': 'LocalBusiness',
            'name': 'VpTrockenbau'
          }
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Script
        id="services-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-6">
          <div className="inline-block bg-[#eae7e9] px-3 py-1 border border-[#091426] font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#091426]">Fachexpertise</div>
          <h1 className="text-5xl font-extrabold text-[#091426] uppercase tracking-tight leading-none">Technische<br/>Trockenbau<br/>Leistungen</h1>
          <p className="text-lg text-[#45474c] max-w-lg">Präzision in jedem Detail. Wir bieten spezialisierte Trockenbaulösungen für komplexe gewerbliche und industrielle Bauvorhaben. Von Q4-Spachtelarbeiten bis hin zu fachgerechter Gipskartonmontage.</p>
        </div>
        <div className="md:col-span-6 relative h-[400px]">
          <Image src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" fill sizes="(max-width: 768px) 100vw, 50vw" priority alt="Technical" className="object-cover border border-[#091426] shadow-[4px_4px_0px_0px_#091426] grayscale" />
        </div>
      </section>

      <section className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12">
         <h2 className="text-3xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-4 mb-12 inline-block">Unsere Spezialisierungen</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spachtelarbeiten */}
            <div className="bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 flex flex-col group hover:bg-[#f5f3f4] transition-colors">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#091426] uppercase">Spachtelarbeiten (Q1-Q4)</h3>
                <PaintRoller className="w-8 h-8 text-[#2563eb] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[#45474c] mb-6">Höchste Oberflächenqualität für anspruchsvolle Raumkonzepte. Wir realisieren Verspachtelungen bis zur Qualitätsstufe Q4 für makellose, streiflichtfreie Ergebnisse.</p>
              <table className="w-full text-left border-collapse mt-auto">
                <thead><tr className="bg-[#eae7e9] text-[#091426] font-bold uppercase text-xs">
                  <th className="border border-[#c5c6cd] p-2">Stufe</th><th className="border border-[#c5c6cd] p-2">Anwendung</th>
                </tr></thead>
                <tbody className="text-sm text-[#45474c]">
                  <tr><td className="border border-[#c5c6cd] p-2 font-bold text-[#091426]">Q1</td><td className="border border-[#c5c6cd] p-2">Grundspachtelung</td></tr>
                  <tr><td className="border border-[#c5c6cd] p-2 font-bold text-[#091426]">Q2</td><td className="border border-[#c5c6cd] p-2">Standardverspachtelung</td></tr>
                  <tr><td className="border border-[#c5c6cd] p-2 font-bold text-[#091426]">Q3</td><td className="border border-[#c5c6cd] p-2">Sonderverspachtelung</td></tr>
                  <tr><td className="border border-[#c5c6cd] p-2 font-bold text-[#091426]">Q4</td><td className="border border-[#c5c6cd] p-2">Vollflächenverspachtelung</td></tr>
                </tbody>
              </table>
            </div>

            {/* Gipskartonmontage */}
            <div className="bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 flex flex-col group hover:bg-[#f5f3f4] transition-colors">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#091426] uppercase">Gipskartonmontage</h3>
                <Hammer className="w-8 h-8 text-[#2563eb] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[#45474c] mb-6 flex-grow">Professionelle und passgenaue Montage von Gipsplatten für Wände, Decken und raumbildende Konstruktionen. Wir errichten stabile Metallständerwerke, verlegen hochwertige Platten und bereiten alles malerfertig vor.</p>
              <div className="relative h-40 border border-[#091426] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80" fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" alt="Gipskartonmontage" className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div className="absolute inset-0 bg-[#091426]/10 mix-blend-multiply"></div>
              </div>
            </div>

            {/* Akustikbau */}
            <div className="bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 flex flex-col group hover:bg-[#f5f3f4] transition-colors">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#091426] uppercase">Akustikbau</h3>
                <Volume2 className="w-8 h-8 text-[#2563eb] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[#45474c] mb-6 flex-grow">Optimierung der Raumakustik durch hochwirksame Schallabsorber und Akustikdecken. Reduzierung von Nachhallzeiten und Verbesserung der Sprachverständlichkeit für Büros, Foyers und Veranstaltungsräume.</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-[#white] border border-[#091426] px-3 py-1 text-xs font-bold text-[#091426] uppercase shadow-[2px_2px_0px_0px_#091426]">Akustikdecken</span>
                <span className="bg-[#white] border border-[#091426] px-3 py-1 text-xs font-bold text-[#091426] uppercase shadow-[2px_2px_0px_0px_#091426]">Schallabsorber</span>
                <span className="bg-[#white] border border-[#091426] px-3 py-1 text-xs font-bold text-[#091426] uppercase shadow-[2px_2px_0px_0px_#091426]">Lochplatten</span>
              </div>
            </div>

            {/* Dachausbau */}
            <div className="bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 flex flex-col group hover:bg-[#f5f3f4] transition-colors">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-[#091426] uppercase">Dachausbau</h3>
                <Home className="w-8 h-8 text-[#2563eb] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[#45474c] mb-6 flex-grow">Effiziente Transformation ungenutzter Dachgeschosse in hochwertigen Wohn- oder Gewerberaum. Inklusive fachgerechter Dämmung, Dampfsperren und präziser Beplankung komplexer Dachschrägen.</p>
              <div className="relative h-40 border border-[#091426] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" alt="Dachausbau" className="object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#eae7e9] border-t border-b border-[#091426] py-24 mt-8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight mb-4">Projekt<br/>Planen.</h2>
               <p className="text-lg text-[#45474c]">Kontaktieren Sie uns für eine detaillierte technische Beratung und ein maßgeschneidertes Angebot für Ihr nächstes Bauvorhaben.</p>
            </div>
            <div className="w-full max-w-md bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8">
               <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#091426] uppercase mb-1">Firma / Name</label>
                    <input type="text" className="w-full bg-white border border-[#091426] p-3 focus:outline-none focus:border-[#2563eb] focus:border-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#091426] uppercase mb-1">E-Mail Adresse</label>
                    <input type="email" className="w-full bg-white border border-[#091426] p-3 focus:outline-none focus:border-[#2563eb] focus:border-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#091426] uppercase mb-1">Gewerke</label>
                    <select className="w-full bg-white border border-[#091426] p-3 focus:outline-none focus:border-[#2563eb] focus:border-2 rounded-none">
                        <option>Spachtelarbeiten (Q1-Q4)</option>
                        <option>Gipskartonmontage</option>
                        <option>Akustikbau</option>
                        <option>Dachausbau</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#091426] text-white font-bold uppercase py-4 border border-[#091426] hover:bg-[#2563eb] active:translate-y-1 transition-all mt-4">Angebot Anfordern</button>
               </form>
            </div>
        </div>
      </section>
    </div>
  )
}
