import Image from 'next/image';
import { HardHat, Banknote, Users, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Karriere & Jobs im Trockenbau | VPTrokkenbau Dresden',
  description: 'Werden Sie Teil unseres Teams. Wir suchen Trockenbauer, Vorarbeiter und Poliere im Großraum Dresden. Top Konditionen und Weiterbildungsmöglichkeiten.',
  alternates: {
    canonical: 'https://vptrokkenbau.de/karriere',
  },
  openGraph: {
    title: 'Karriere & Jobs | VPTrokkenbau',
    description: 'Bewerben Sie sich jetzt in wenigen Klicks. Professioneller Trockenbau in Dresden sucht Verstärkung.',
    url: 'https://vptrokkenbau.de/karriere',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'VPTrokkenbau Karriere Team',
      },
    ],
  },
};

export default function Karriere() {
  return (
    <div className="flex flex-col gap-16 max-w-[1280px] mx-auto px-4 md:px-8 py-8 w-full">
      {/* Hero */}
      <section className="border border-[#091426] bg-white p-8 md:p-12 shadow-[4px_4px_0px_0px_#091426] flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Werden Sie Teil unseres Teams</h1>
          <p className="text-lg text-[#45474c] max-w-xl">Wir bauen auf Qualität, Präzision und starke Teams. Als expandierendes Unternehmen im hochwertigen Trockenbau suchen wir engagierte Fachkräfte, die unser Handwerk teilen.</p>
          <a href="#jobs" className="inline-flex bg-[#091426] text-white font-bold px-8 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] uppercase hover:bg-[#fd761a] transition-all hover:-translate-y-1">Offene Stellen ansehen</a>
        </div>
        <div className="flex-1 w-full relative h-[300px] md:h-[400px] border border-[#091426] bg-[#eae7e9]">
           <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80" fill sizes="(max-width: 768px) 100vw, 50vw" priority alt="Team" className="object-cover grayscale" />
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full">
        <h2 className="text-3xl font-bold text-[#091426] mb-8 uppercase border-b-2 border-[#091426] pb-2 inline-block">Warum VPTrokkenbau?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <HardHat className="w-10 h-10 text-[#fd761a] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Top Equipment</h3>
             <p className="text-[#45474c] text-sm">Wir investieren kontinuierlich in modernstes Werkzeug und hochwertige Maschinen für effizientes und sicheres Arbeiten.</p>
          </div>
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <Banknote className="w-10 h-10 text-[#fd761a] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Faire Bezahlung</h3>
             <p className="text-[#45474c] text-sm">Ihre Leistung wird bei uns geschätzt. Wir bieten übertarifliche Bezahlung, Bonuszahlungen bei Projektabschluss und absolut pünktliche Gehaltsüberweisungen.</p>
          </div>
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <Users className="w-10 h-10 text-[#fd761a] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Zusammenhalt</h3>
             <p className="text-[#45474c] text-sm">Flache Hierarchien, ein familiäres Betriebsklima und regelmäßige Teamevents schweißen uns zusammen. Bei uns sind Sie keine Nummer, sondern Teil der Crew.</p>
          </div>
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <TrendingUp className="w-10 h-10 text-[#fd761a] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Aufstieg</h3>
             <p className="text-[#45474c] text-sm">Wir fördern Weiterbildungen und bieten klare Perspektiven vom Gesellen bis zum Bauleiter in einem expandierenden Unternehmen.</p>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="w-full">
        <h2 className="text-3xl font-bold text-[#091426] mb-8 uppercase border-b-2 border-[#091426] pb-2 inline-block">Offene Stellen</h2>
        <div className="flex flex-col gap-6">
           {[
             { title: 'Erfahrener Trockenbauer (m/w/d)', desc: 'Selbstständige Ausführung von hochwertigen Trockenbauarbeiten nach Plan.' },
             { title: 'Vorarbeiter / Polier Trockenbau (m/w/d)', desc: 'Teamführung, Baustellenorganisation und Qualitätskontrolle vor Ort.' }
           ].map((u, i) => (
             <div key={i} className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-white text-[#091426] px-2 py-1 text-xs font-bold uppercase border border-[#091426] shadow-[2px_2px_0px_0px_#091426]">Vollzeit</span>
                    <span className="bg-white text-[#091426] px-2 py-1 text-xs font-bold uppercase border border-[#091426] shadow-[2px_2px_0px_0px_#091426]">Dresden & Umland</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#091426] uppercase">{u.title}</h3>
                  <p className="text-[#45474c] mt-1">{u.desc}</p>
                </div>
                <button className="bg-[#091426] text-white font-bold px-6 py-3 border border-[#091426] uppercase whitespace-nowrap hover:bg-[#fd761a] transition-colors mt-4 md:mt-0 shadow-[4px_4px_0px_0px_#fd761a] hover:translate-y-1 hover:shadow-none">Jetzt Bewerben</button>
             </div>
           ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#eae7e9] border border-[#091426] p-8 md:p-12 shadow-[4px_4px_0px_0px_#091426] text-center mb-8 w-full">
         <h2 className="text-3xl font-bold text-[#091426] mb-4 uppercase tracking-tight">Kein langes Anschreiben nötig</h2>
         <p className="text-lg text-[#45474c] mb-6 max-w-2xl mx-auto">Hinterlassen Sie einfach Ihre Kontaktdaten und wir rufen Sie zurück. Unkompliziert und direkt.</p>
         <form className="max-w-md mx-auto flex flex-col gap-4">
           <input type="text" placeholder="Ihr Name" className="w-full bg-white border border-[#091426] p-3 focus:border-[#fd761a] focus:outline-none" />
           <input type="tel" placeholder="Telefonnummer" className="w-full bg-white border border-[#091426] p-3 focus:border-[#fd761a] focus:outline-none" />
           <button type="button" className="w-full bg-[#fd761a] text-white font-bold px-6 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] uppercase mt-2 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#091426] transition-all">Rückruf Anfordern</button>
         </form>
      </section>
    </div>
  )
}
