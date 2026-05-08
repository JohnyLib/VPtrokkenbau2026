import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Impressum | VpTrockenbau Dresden',
  description: 'Anbieterkennzeichnung und rechtliche Hinweise der VpTrockenbau für unseren Trockenbau-Fachbetrieb in Dresden.',
  alternates: {
    canonical: 'https://vptrokenbau.de/impressum',
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function Impressum() {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-8">
      {/* Back Button */}
      <Link href="/" className="self-start text-[#091426] font-bold uppercase text-xs tracking-wider flex items-center gap-2 group hover:text-[#fd761a] transition-colors border border-[#091426] px-4 py-2 bg-white shadow-[2px_2px_0px_0px_#091426] hover:shadow-[4px_4px_0px_0px_#091426] hover:-translate-y-0.5 active:translate-y-0 transition-all">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 border-b-2 border-[#091426] pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Impressum</h1>
        <p className="text-sm text-[#45474c] uppercase font-mono tracking-widest">
          Rechtliche Informationen gemäß § 5 TMG (Telemediengesetz)
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* Angaben gemäß § 5 TMG */}
        <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3">
            <Shield className="w-5 h-5 text-[#fd761a]" />
            <h2 className="text-lg font-bold text-[#091426] uppercase">Anbieterkennzeichnung</h2>
          </div>
          <div className="text-[#45474c] text-sm space-y-3">
            <p className="font-bold text-base text-[#091426]">VpTrockenbau GmbH</p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#fd761a] mt-0.5 shrink-0" />
              <span>
                Königsbrücker Landstraße 54<br />
                01109 Dresden<br />
                Deutschland
              </span>
            </p>
            <p className="pt-2">
              <strong>Vertreten durch den Geschäftsführer:</strong><br />
              Vasilii Perevalov
            </p>
          </div>
        </div>

        {/* Kontakt */}
        <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3">
            <Phone className="w-5 h-5 text-[#fd761a]" />
            <h2 className="text-lg font-bold text-[#091426] uppercase">Kontaktmöglichkeiten</h2>
          </div>
          <div className="text-[#45474c] text-sm space-y-3">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#fd761a] shrink-0" />
              <a href="tel:+4915161559335" className="hover:text-[#fd761a] font-semibold transition-colors">+49 (0) 151 61559335</a>
            </p>
            <p className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-[#fd761a] mt-0.5 shrink-0" />
              <span className="flex flex-col">
                <a href="mailto:info@vptrokenbau.de" className="hover:text-[#fd761a] font-semibold transition-colors">info@vptrokenbau.de</a>
                <a href="mailto:perevalovvasilii@gmail.com" className="text-xs text-[#8c8e96] hover:text-[#fd761a] transition-colors mt-1">perevalovvasilii@gmail.com</a>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Weitere Pflichtangaben */}
      <div className="bg-[#f5f3f4] border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426] flex flex-col gap-6 text-sm text-[#45474c] leading-relaxed">
        {/* Registereintrag */}
        <div>
          <h3 className="font-bold text-[#091426] uppercase text-base border-b border-[#091426] pb-1 mb-2">Registereintrag</h3>
          <p>
            Eintragung im Handelsregister.<br />
            <strong>Registergericht:</strong> Amtsgericht Dresden<br />
            <strong>Registernummer:</strong> HRB 123456 <span className="text-[#fd761a] text-xs font-semibold">(Muster-Eintragung)</span>
          </p>
        </div>

        {/* Umsatzsteuer-ID */}
        <div>
          <h3 className="font-bold text-[#091426] uppercase text-base border-b border-[#091426] pb-1 mb-2">Umsatzsteuer-Identifikationsnummer</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            <strong>USt-IdNr.:</strong> DE 123456789 <span className="text-[#fd761a] text-xs font-semibold">(Muster-ID)</span>
          </p>
        </div>

        {/* Redaktionell Verantwortlicher */}
        <div>
          <h3 className="font-bold text-[#091426] uppercase text-base border-b border-[#091426] pb-1 mb-2">Verantwortlich für den Inhalt</h3>
          <p>
            Gemäß § 18 Abs. 2 MStV (Medienstaatsvertrag):<br />
            <strong>Vasilii Perevalov</strong><br />
            Königsbrücker Landstraße 54, 01109 Dresden
          </p>
        </div>

        {/* EU-Streitschlichtung */}
        <div>
          <h3 className="font-bold text-[#091426] uppercase text-base border-b border-[#091426] pb-1 mb-2">EU-Streitschlichtung</h3>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#fd761a] hover:underline font-semibold">
              https://ec.europa.eu/consumers/odr/
            </a>
            .<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
        </div>

        {/* Verbraucherstreitbeilegung */}
        <div>
          <h3 className="font-bold text-[#091426] uppercase text-base border-b border-[#091426] pb-1 mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h3>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </div>
  );
}
