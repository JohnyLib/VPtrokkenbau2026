import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#091426] border-t-2 border-[#1e293b] mt-auto w-full text-slate-300">
      {/* Hauptbereich */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Spalte 1: Brand & SEO */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-black tracking-tighter text-white uppercase">
            Vp<span className="text-[#fd761a]">Trockenbau</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Ihr professioneller Fachbetrieb für Trockenbau, präzise Spachtelarbeiten (Q1-Q4), Brandschutz und Akustikbau im Großraum Dresden und ganz Sachsen.
          </p>
          <div className="text-xs text-slate-400 uppercase tracking-wider mt-2">
            Zertifizierte Meisterqualität
          </div>
        </div>

        {/* Spalte 2: Leistungen Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Unsere Leistungen
          </h3>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/leistungen" className="hover:text-[#fd761a] transition-colors">Trockenbau & Trennwände</Link>
            <Link href="/leistungen" className="hover:text-[#fd761a] transition-colors">Spachtelarbeiten Q1-Q4</Link>
            <Link href="/leistungen" className="hover:text-[#fd761a] transition-colors">Fugenverspachtelung</Link>
            <Link href="/leistungen" className="hover:text-[#fd761a] transition-colors">Baulicher Brandschutz</Link>
            <Link href="/leistungen" className="hover:text-[#fd761a] transition-colors">Akustikdecken & Schallschutz</Link>
          </nav>
        </div>

        {/* Spalte 3: Navigation & Infos */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Unternehmen
          </h3>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/" className="hover:text-[#fd761a] transition-colors">Startseite</Link>
            <Link href="/portfolio" className="hover:text-[#fd761a] transition-colors">Referenzen & Portfolio</Link>
            <Link href="/faq" className="hover:text-[#fd761a] transition-colors">Häufige Fragen (FAQ)</Link>
            <Link href="/karriere" className="hover:text-[#fd761a] transition-colors">Karriere & Stellenangebote</Link>
            <Link href="/kontakt" className="hover:text-[#fd761a] transition-colors">Kontakt & Angebot</Link>
          </nav>
        </div>

        {/* Spalte 4: Kontakt & Öffnungszeiten */}
        <div className="flex flex-col gap-4 text-sm">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Direktkontakt
          </h3>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-white uppercase text-xs tracking-wider">Anschrift:</p>
            <p className="text-slate-400">Baustraße 123, 01067 Dresden</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-white uppercase text-xs tracking-wider">Erreichbarkeit:</p>
            <a href="tel:+4915161559335" className="hover:text-[#fd761a] transition-colors">Tel: +49 (0) 151 61559335</a>
            <a href="mailto:info@vptrokenbau.de" className="hover:text-[#fd761a] transition-colors">info@vptrokenbau.de</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-white uppercase text-xs tracking-wider">Geschäftszeiten:</p>
            <p className="text-slate-400">Mo. - Fr.: 07:00 - 18:00 Uhr</p>
          </div>
        </div>
      </div>

      {/* Fußzeile (Legal & Copyright) */}
      <div className="bg-[#050b14] border-t border-slate-900 py-6 px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} VpTrockenbau GmbH. Alle Rechte vorbehalten.
          </div>
          <nav className="flex gap-6">
            <Link href="/impressum" className="hover:text-[#fd761a] transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#fd761a] transition-colors">Datenschutzerklärung</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
