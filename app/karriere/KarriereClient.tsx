"use client";

import Image from 'next/image';
import { HardHat, Banknote, Users, TrendingUp } from 'lucide-react';
import { useState, useRef } from 'react';
import { SuccessPopup } from '@/components/ui/SuccessPopup';

export function KarriereClient() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleApplyClick = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Bitte füllen Sie beide Felder aus.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          message: 'Bewerbungs-Rückrufanforderung über die Karriere-Seite.',
          formType: 'career'
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsPopupOpen(true);
        setName('');
        setPhone('');
      } else {
        alert('Fehler beim Senden: ' + (data.error || 'Bitte versuchen Sie es später noch einmal.'));
      }
    } catch (err) {
      console.error(err);
      alert('Verbindungsfehler beim Senden.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-16 max-w-[1280px] mx-auto px-4 md:px-8 py-8 w-full">
      {/* Hero */}
      <section className="border border-[#091426] bg-white p-8 md:p-12 shadow-[4px_4px_0px_0px_#091426] flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Werden Sie Teil unseres Teams</h1>
          <p className="text-lg text-[#45474c] max-w-xl">Wir bauen auf Qualität, Präzision und starke Teams. Als expandierendes Unternehmen im hochwertigen Trockenbau suchen wir engagierte Fachkräfte, die unser Handwerk teilen.</p>
          <button onClick={handleApplyClick} className="inline-flex bg-[#091426] text-white font-bold px-8 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] uppercase hover:bg-[#2563eb] transition-all hover:-translate-y-1">Offene Stellen ansehen</button>
        </div>
        <div className="flex-1 w-full relative h-[300px] md:h-[400px] border border-[#091426] bg-[#eae7e9]">
           <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" fill sizes="(max-width: 768px) 100vw, 50vw" priority alt="Team" className="object-cover grayscale" />
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full">
        <h2 className="text-3xl font-bold text-[#091426] mb-8 uppercase border-b-2 border-[#091426] pb-2 inline-block">Warum VpTrockenbau?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <HardHat className="w-10 h-10 text-[#2563eb] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Top Equipment</h3>
             <p className="text-[#45474c] text-sm">Wir investieren kontinuierlich in modernstes Werkzeug und hochwertige Maschinen für effizientes und sicheres Arbeiten.</p>
          </div>
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <Banknote className="w-10 h-10 text-[#2563eb] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Faire Bezahlung</h3>
             <p className="text-[#45474c] text-sm">Ihre Leistung wird bei uns geschätzt. Wir bieten übertarifliche Bezahlung, Bonuszahlungen bei Projektabschluss und absolut pünktliche Gehaltsüberweisungen.</p>
          </div>
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <Users className="w-10 h-10 text-[#2563eb] mb-4" />
             <h3 className="text-xl font-bold text-[#091426] mb-2 uppercase">Zusammenhalt</h3>
             <p className="text-[#45474c] text-sm">Flache Hierarchien, ein familiäres Betriebsklima und regelmäßige Teamevents schweißen uns zusammen. Bei uns sind Sie keine Nummer, sondern Teil der Crew.</p>
          </div>
          <div className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col hover:bg-[#f5f3f4] transition-colors">
             <TrendingUp className="w-10 h-10 text-[#2563eb] mb-4" />
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
                <button onClick={handleApplyClick} className="bg-[#091426] text-white font-bold px-6 py-3 border border-[#091426] uppercase whitespace-nowrap hover:bg-[#2563eb] transition-colors mt-4 md:mt-0 shadow-[4px_4px_0px_0px_#2563eb] hover:translate-y-1 hover:shadow-none">Jetzt Bewerben</button>
             </div>
           ))}
        </div>
      </section>

      {/* Form */}
      <section ref={formRef} className="bg-[#eae7e9] border border-[#091426] p-8 md:p-12 shadow-[4px_4px_0px_0px_#091426] text-center mb-8 w-full">
         <h2 className="text-3xl font-bold text-[#091426] mb-4 uppercase tracking-tight">Kein langes Anschreiben nötig</h2>
         <p className="text-lg text-[#45474c] mb-8 max-w-2xl mx-auto">Hinterlassen Sie einfach Ihre Kontaktdaten und wir rufen Sie zurück. Unkompliziert und direkt.</p>
         <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-5 text-left">
           <div className="flex flex-col gap-1.5">
             <label htmlFor="karriere-name" className="font-bold text-sm text-[#091426] uppercase">Ihr Name *</label>
             <input
               ref={nameInputRef}
               id="karriere-name"
               type="text"
               required
               value={name}
               onChange={(e) => setName(e.target.value)}
               autoComplete="name"
               placeholder="z.B. Max Mustermann"
               className="w-full bg-white border border-[#091426] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all"
             />
           </div>
           
           <div className="flex flex-col gap-1.5">
             <label htmlFor="karriere-phone" className="font-bold text-sm text-[#091426] uppercase">Telefonnummer *</label>
             <input
               id="karriere-phone"
               type="tel"
               required
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               autoComplete="tel"
               placeholder="z.B. +49 170 1234567"
               className="w-full bg-white border border-[#091426] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all"
             />
           </div>

           <button
             type="submit"
             disabled={isLoading}
             className="w-full bg-[#2563eb] text-white font-bold px-6 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] uppercase mt-2 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#091426] active:translate-y-0 active:shadow-[4px_4px_0px_0px_#091426] transition-all disabled:opacity-50 min-h-[58px] text-center"
           >
             {isLoading ? 'Wird gesendet...' : 'Rückruf Anfordern'}
           </button>
         </form>
      </section>

      <SuccessPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="Bewerbung eingegangen!" message="Vielen Dank für Ihr Interesse! Wir haben Ihre Anfrage erhalten und werden uns in Kürze telefonisch bei Ihnen melden." />
    </div>
  );
}
