import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
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
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-12">
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Kontaktieren Sie uns</h1>
        <p className="text-lg text-[#45474c]">
          Wir sind Ihr zuverlässiger Partner für Trockenbau-Projekte in Dresden und Ostsachsen. Nutzen Sie unser Kontaktformular oder rufen Sie uns direkt an.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2">Standort Dresden</h3>
            
            <div className="flex gap-4 items-start">
              <MapPin className="w-6 h-6 text-[#fd761a] shrink-0" />
              <div>
                <strong className="block text-[#091426] uppercase text-sm">Adresse</strong>
                <span className="text-[#45474c]">Baustraße 123<br />01067 Dresden<br />Deutschland</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="w-6 h-6 text-[#fd761a] shrink-0" />
              <div>
                <strong className="block text-[#091426] uppercase text-sm">Telefon</strong>
                <a href="tel:+4915161559335" className="text-[#45474c] hover:text-[#fd761a] transition-colors">+49 (0) 151 61559335</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="w-6 h-6 text-[#fd761a] shrink-0" />
              <div className="flex flex-col gap-1">
                <strong className="block text-[#091426] uppercase text-sm">E-Mail</strong>
                <a href="mailto:info@vptrokenbau.de" className="text-[#45474c] hover:text-[#fd761a] transition-colors">info@vptrokenbau.de</a>
                <a href="mailto:perevalovvasilii@gmail.com" className="text-xs text-[#45474c] font-semibold hover:text-[#fd761a] transition-colors lowercase">perevalovvasilii@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-[#fd761a] shrink-0" />
              <div>
                <strong className="block text-[#091426] uppercase text-sm">Öffnungszeiten</strong>
                <span className="text-[#45474c]">Mo. - Fr.: 07:00 - 18:00 Uhr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 md:p-12">
          <h2 className="text-2xl font-bold text-[#091426] uppercase mb-6">Schreiben Sie uns</h2>
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="name">Name / Firma *</label>
                <input id="name" required className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="email">E-Mail *</label>
                <input id="email" required className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none" type="email" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="phone">Telefon</label>
                <input id="phone" className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none" type="tel" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="service">Gewerk</label>
                <select id="service" className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none appearance-none rounded-none">
                  <option>Trockenbau</option>
                  <option>Spachtelarbeiten (Q1-Q4)</option>
                  <option>Brandschutz</option>
                  <option>Akustikbau</option>
                  <option>Dachausbau</option>
                  <option>Sonstiges</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="message">Ihre Nachricht *</label>
              <textarea id="message" required className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none min-h-[150px] resize-y"></textarea>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" id="privacy" required className="mt-1 w-4 h-4 accent-[#fd761a]" />
              <label htmlFor="privacy" className="text-sm text-[#45474c]">
                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert und verarbeitet werden dürfen. *
              </label>
            </div>

            <button type="button" className="bg-[#1e293b] text-white font-bold uppercase py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#fd761a] active:translate-y-1 transition-all mt-4 w-full md:w-auto md:px-12 self-start">
              Nachricht Senden
            </button>
          </form>
        </div>
      </div>
      
      <div className="w-full h-[400px] border border-[#091426] shadow-[4px_4px_0px_0px_#091426] bg-[#eae7e9] flex items-center justify-center p-8 text-center text-[#45474c]">
         <p>Hier könnte eine interaktive Karte von Dresden (z.B. Google Maps) eingebunden werden.<br/>Aus Datenschutzgründen derzeit als statischer Platzhalter.</p>
      </div>
    </div>
  );
}
