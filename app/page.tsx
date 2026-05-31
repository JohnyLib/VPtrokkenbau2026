"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PencilRuler, Layers, PaintRoller, AudioWaveform, ArrowRight, CheckCircle2, Star, ShieldCheck, Clock, Award, Hammer, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { HomeContactForm } from '@/components/ui/HomeContactForm';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 max-w-[1280px] mx-auto px-4 md:px-8">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px] pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-8 z-10 p-4"
        >
          <span className="text-sm font-bold uppercase text-[#2563eb] tracking-widest bg-[#eae7e9] border border-[#091426] px-3 py-1 self-start shadow-[2px_2px_0px_0px_#091426]">
            Ihr Trockenbau-Spezialist in Dresden
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#091426] border-l-8 border-[#2563eb] pl-6 leading-tight tracking-tight uppercase">
            Präzision im Trockenbau & Innenausbau Dresden
          </h1>
          <p className="text-lg text-[#45474c] max-w-xl">
            Ihr zertifizierter Fachpartner für erstklassige Spachtelarbeiten (Q1-Q4), professionelle Gipskartonmontage, Fugenverspachtelung und Akustikbau im Großraum Dresden und ganz Sachsen.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link href="/kontakt" className="bg-[#1e293b] text-white font-bold uppercase px-6 sm:px-8 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#2563eb] hover:text-white transition-all inline-flex items-center gap-2 group active:translate-y-1 active:shadow-[2px_2px_0px_0px_#091426] text-xs sm:text-sm md:text-base text-center justify-center w-full sm:w-auto">
              <span>Ausschreibung einreichen</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="relative h-[400px] lg:h-[600px] border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] bg-[#eae7e9] overflow-hidden group"
        >
          <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Exklusive Trockenbau- und Spachtelarbeiten in Dresden" fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 bg-[#2563eb] text-[#091426] font-bold uppercase px-4 py-2 border-t-2 border-r-2 border-[#091426]">
            Qualitätsstufe Q4 Dresden
          </div>
        </motion.div>
      </section>

      {/* Leistungen */}
      <section className="pt-16" id="leistungen">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-3xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2 self-start tracking-tight">Leistungen</h2>
          <p className="text-base text-[#45474c]">Strukturelle Exzellenz in jedem Gewerk.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: PencilRuler, title: 'Trockenbau', desc: 'Komplexe Deckensysteme, Trennwände und raumbildende Ausbauten nach strengsten DIN-Normen.' },
            { icon: Layers, title: 'Spachtelarbeiten', desc: 'Präzisions-Oberflächen von Q1 (Grundverspachtelung) bis Q4 (Premium-Glätte) für anspruchsvollste Architekturen.' },
            { icon: PaintRoller, title: 'Fugenverspachtelung', desc: 'Nahtlose Übergänge und rissfreie Verbindungen für eine dauerhaft homogene Oberflächenstruktur.' },
            { icon: AudioWaveform, title: 'Akustikbau', desc: 'Schallschutz- und Raumakustiksysteme für funktionale und ruhige gewerbliche Umgebungen.' }
          ].map((s, i) => (
            <div key={i} className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col gap-4 hover:bg-[#f5f3f4] transition-colors">
              <div className="w-12 h-12 bg-[#1e293b] flex items-center justify-center border border-[#091426]">
                <s.icon className="text-[#2563eb] w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#091426] uppercase">{s.title}</h3>
              <p className="text-[#45474c]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Vorschau */}
      <section className="pt-16" id="portfolio">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2 self-start tracking-tight">Referenzen</h2>
            <p className="text-base text-[#45474c]">Zuletzt abgeschlossene Großprojekte in Dresden.</p>
          </div>
          <Link href="/portfolio" className="bg-white text-[#091426] font-bold uppercase px-6 py-3 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#1e293b] hover:text-white transition-all inline-flex items-center gap-2 group">
            Alle Projekte ansehen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Modern Office Complex Dresden",
              category: "Gewerbe",
              img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"
            },
            {
              title: "Exklusive Villa Radebeul",
              category: "Privat",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
            },
            {
              title: "Einkaufszentrum Altmarkt",
              category: "Gewerbe",
              img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
            }
          ].map((p, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={i} 
              className="border border-[#091426] bg-white shadow-[4px_4px_0px_0px_#091426] flex flex-col group block cursor-pointer"
            >
              <div className="h-48 border-b border-[#091426] relative overflow-hidden">
                <Image src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-2 right-2 bg-[#2563eb] text-white px-2 py-1 text-xs font-bold uppercase border border-[#091426]">
                  {p.category}
                </div>
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-bold text-[#091426] uppercase leading-tight group-hover:text-[#2563eb] transition-colors">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="pt-16" id="ueber-uns">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-[#1e293b] text-white p-8 md:p-12 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#2563eb] mb-6 uppercase tracking-tight">Über Uns</h2>
            <p className="text-lg mb-6 leading-relaxed">
              VpTrockenbau steht für kompromisslose Qualität im regionalen Trockenbau im Großraum Dresden. Mit jahrelanger Erfahrung in der Umsetzung komplexer Bauvorhaben verbinden wir sächsisches Handwerk mit modernster Systemtechnik.
            </p>
            <p className="text-[#bcc7de]">
              Unser Team aus spezialisierten Fachkräften garantiert eine Ausführung, die architektonische Visionen in dauerhafte, präzise Realität verwandelt.
            </p>
          </div>
          <div className="lg:col-span-7 h-[400px] lg:h-auto border border-[#091426] shadow-[4px_4px_0px_0px_#091426] relative">
            <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" alt="Exzellente Trockenbaupläne und Baustellen-Organisation in Dresden" fill sizes="(max-width: 1024px) 100vw, 60vw" loading="lazy" className="object-cover grayscale" />
          </div>
        </div>
      </section>

      {/* Warum VpTrockenbau */}
      <section className="pt-16" id="vorteile">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-3xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2 self-start tracking-tight">Warum VpTrockenbau?</h2>
          <p className="text-base text-[#45474c]">Qualität, Richtlinienkonformität und absolute Zuverlässigkeit.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: 'Zertifizierte Qualität',
              desc: 'Wir führen Spachtelarbeiten in allen Qualitätsstufen aus – von der Grundspachtelung (Q1) bis zur streiflichtfreien Premium-Fläche (Q4).'
            },
            {
              icon: ShieldCheck,
              title: 'Gipskartonmontage',
              desc: 'Präziser Verlegung hochwertiger Gipskartonplatten auf stabilen Ständerwerken, ideal für Trennwände, Decken und Wandverkleidungen.'
            },
            {
              icon: Clock,
              title: 'Absolute Termintreue',
              desc: 'Pünktliche Fertigstellung aller Gewerke durch effiziente Projektplanung und erfahrene Vorarbeiter vor Ort in Dresden.'
            },
            {
              icon: Hammer,
              title: 'Meisterliches Handwerk',
              desc: 'Kombination aus sächsischem Handwerksstolz, langjähriger Erfahrung im Gewerbebau und modernster Trockenbau-Systemtechnik.'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col gap-4 hover:bg-[#f5f3f4] transition-colors group">
              <div className="w-12 h-12 bg-[#091426] flex items-center justify-center border border-[#091426] group-hover:bg-[#2563eb] transition-colors">
                <item.icon className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#091426] uppercase">{item.title}</h3>
              <p className="text-[#45474c] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Einzugsgebiet */}
      <section className="pt-16" id="einzugsgebiet">
        <div className="bg-[#1e293b] text-white p-8 md:p-12 border border-[#091426] shadow-[4px_4px_0px_0px_#091426]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block bg-[#2563eb] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider border border-[#091426]">Regionaler Partner</div>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-none">
                Unser Einzugsgebiet<br/>in Sachsen
              </h2>
              <p className="text-slate-300">
                Als lokaler Trockenbau-Fachbetrieb sind wir in ganz Dresden und im sächsischen Umland schnell für Sie vor Ort. Wir übernehmen Projekte im privaten und gewerblichen Bereich.
              </p>
              <div className="flex items-center gap-2 text-[#2563eb] font-bold text-sm uppercase tracking-wider">
                <MapPin className="w-5 h-5" />
                <span>Einsatzort Dresden & Umkreis</span>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { title: 'Dresden Altstadt', zip: '01067' },
                { title: 'Dresden Neustadt', zip: '01097' },
                { title: 'Dresden Blasewitz', zip: '01309' },
                { title: 'Dresden Plauen', zip: '01187' },
                { title: 'Radebeul', zip: '01445' },
                { title: 'Freital', zip: '01705' },
                { title: 'Pirna', zip: '01796' },
                { title: 'Meißen', zip: '01662' },
                { title: 'Radeberg', zip: '01454' },
                { title: 'Coswig', zip: '01640' },
                { title: 'Heidenau', zip: '01809' },
                { title: 'Radeburg', zip: '01471' }
              ].map((loc, i) => (
                <div key={i} className="bg-[#091426] border border-slate-800 p-4 flex flex-col gap-1 hover:border-[#2563eb] transition-colors">
                  <span className="text-white font-bold text-sm sm:text-base leading-tight">{loc.title}</span>
                  <span className="text-slate-500 text-xs font-mono">PLZ: {loc.zip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kundenbewertungen */}
      <section className="pt-16" id="bewertungen">
        <div className="flex flex-col gap-4 mb-8">
          <h2 className="text-3xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2 self-start tracking-tight">Kundenstimmen</h2>
          <p className="text-base text-[#45474c]">Das sagen Architekten, Bauherren und Partner in Dresden über uns.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Victor Antonov',
              role: 'CEO - Victan LTD',
              text: 'VpTrockenbau hat bei unserem Wohnbauprojekt die kompletten Gipskarton- und Spachtelarbeiten (Q3) ausgeführt. Über 80 Wohneinheiten wurden in perfekter handwerklicher Qualität und absolut fristgerecht beplankt und verspachtelt. Ein hervorragender Partner für Generalunternehmer!',
              project: 'Wohnpark Dresden'
            },
            {
              name: 'Dipl.-Ing. Marcus Lehmann',
              role: 'Bauleiter - SachsenBau GmbH',
              text: 'Beim gewerblichen Ausbau unseres Bürokomplexes hat VpTrockenbau den gesamten Innenausbau inklusive der Akustikdecken übernommen. Die passgenaue Montage der Ständerwerke und die präzise Fugenverspachtelung haben uns vollauf überzeugt.',
              project: 'Bürokomplex Neustadt'
            },
            {
              name: 'Elena Richter',
              role: 'Projektsteuerung - Elbland Wohnbau GmbH',
              text: 'Hervorragende Zusammenarbeit bei der anspruchsvollen Altbausanierung in Blasewitz. Die kniffligen Spachtelarbeiten (Q4) an schiefen Wänden und Holzbalkendecken wurden makellos gelöst. Die Malervorbereitung war perfekt.',
              project: 'Altbausanierung Blasewitz'
            }
          ].map((review, i) => (
            <div key={i} className="bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-[#2563eb]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-[#45474c] text-sm italic leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#eae7e9] flex flex-col">
                <span className="font-bold text-[#091426] uppercase text-sm">{review.name}</span>
                <span className="text-xs text-slate-500">{review.role}</span>
                <span className="text-xs text-[#2563eb] font-semibold mt-1 uppercase tracking-wider">{review.project}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form / Contact */}
      <section className="pt-16 pb-16" id="kontakt">
        <HomeContactForm />
      </section>
    </div>
  );
}
