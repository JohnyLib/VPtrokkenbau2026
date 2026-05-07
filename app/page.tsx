"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PencilRuler, Layers, PaintRoller, AudioWaveform, ArrowRight, Mail, Phone, Upload } from 'lucide-react';
import { motion } from 'motion/react';

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
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#091426] border-l-8 border-[#fd761a] pl-6 leading-tight tracking-tight uppercase">
            Präzision im Trockenbau & Innenausbau
          </h1>
          <p className="text-lg text-[#45474c] max-w-xl">
            Meisterhafte Spachtelarbeiten (Q1-Q4) und Fugenverspachtelung für gewerbliche und private High-End-Projekte. Absolute Termintreue und strukturelle Integrität.
          </p>
          <div className="mt-4">
            <Link href="/kontakt" className="bg-[#1e293b] text-white font-bold uppercase px-6 sm:px-8 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#fd761a] hover:text-white transition-all inline-flex items-center gap-2 group active:translate-y-1 active:shadow-[2px_2px_0px_0px_#091426] text-xs sm:text-sm md:text-base text-center justify-center w-full sm:w-auto">
              <span className="hidden sm:inline">Ausschreibung einreichen (Dresden & Umgebung)</span>
              <span className="sm:hidden">Ausschreibung einreichen</span>
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
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Construction interior" fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 bg-[#fd761a] text-[#091426] font-bold uppercase px-4 py-2 border-t-2 border-r-2 border-[#091426]">
            Qualitätsstufe Q4
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
                <s.icon className="text-[#fd761a] w-6 h-6" />
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
          <Link href="/portfolio" className="bg-[#white] text-[#091426] font-bold uppercase px-6 py-3 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#1e293b] hover:text-white transition-all inline-flex items-center gap-2 group">
            Alle Projekte ansehen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Modern Office Complex Dresden",
              category: "Gewerbe",
              img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
            },
            {
              title: "Exklusive Villa Radebeul",
              category: "Privat",
              img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
            },
            {
              title: "Einkaufszentrum Altmarkt",
              category: "Gewerbe",
              img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80"
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
                <div className="absolute top-2 right-2 bg-[#fd761a] text-white px-2 py-1 text-xs font-bold uppercase border border-[#091426]">
                  {p.category}
                </div>
              </div>
              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-bold text-[#091426] uppercase leading-tight group-hover:text-[#fd761a] transition-colors">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="pt-16" id="ueber-uns">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-[#1e293b] text-white p-8 md:p-12 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#fd761a] mb-6 uppercase tracking-tight">Über Uns</h2>
            <p className="text-lg mb-6 leading-relaxed">
              VPTrokkenbau steht für kompromisslose Qualität im regionalen Trockenbau im Großraum Dresden. Mit jahrelanger Erfahrung in der Umsetzung komplexer Bauvorhaben verbinden wir sächsisches Handwerk mit modernster Systemtechnik.
            </p>
            <p className="text-[#bcc7de]">
              Unser Team aus spezialisierten Fachkräften garantiert eine Ausführung, die architektonische Visionen in dauerhafte, präzise Realität verwandelt.
            </p>
          </div>
          <div className="lg:col-span-7 h-[400px] lg:h-auto border border-[#091426] shadow-[4px_4px_0px_0px_#091426] relative">
            <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" alt="Construction plans" fill sizes="(max-width: 1024px) 100vw, 60vw" loading="lazy" className="object-cover grayscale" />
          </div>
        </div>
      </section>

      {/* Form / Contact */}
      <section className="pt-16 pb-16" id="kontakt">
        <div className="bg-[#f5f3f4] border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-[#091426] uppercase tracking-tight">Kontakt & Ausschreibung</h2>
              <p className="text-[#45474c]">Senden Sie uns Ihre Projektunterlagen für eine präzise Kalkulation. Wir bearbeiten Anfragen für Gewerbe- und Großprojekte in Dresden und Umland mit höchster Priorität.</p>
              <div className="mt-auto flex flex-col gap-4 pt-8">
                <div className="flex items-center gap-3 text-[#091426] font-bold text-sm uppercase">
                  <Mail className="w-5 h-5 text-[#fd761a]" /> info@vptrokkenbau.de
                </div>
                <div className="flex items-center gap-3 text-[#091426] font-bold text-sm uppercase">
                  <Phone className="w-5 h-5 text-[#fd761a]" /> +49 (0) 123 456 789
                </div>
              </div>
            </div>
            <div className="md:w-2/3 bg-white border border-[#091426] p-8">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-[#091426] uppercase">Name / Firma</label>
                    <input className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm text-[#091426] uppercase">E-Mail</label>
                    <input className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none" type="email" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#091426] uppercase">Projektart</label>
                  <select className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-0 outline-none appearance-none rounded-none">
                    <option>Gewerblicher Innenausbau</option>
                    <option>Wohnungsbau (Großprojekt)</option>
                    <option>Spezial-Akustikbau</option>
                    <option>Sonstiges</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm text-[#091426] uppercase">Upload (Pläne / LV)</label>
                  <div className="border-2 border-dashed border-[#091426] bg-[#f5f3f4] hover:bg-[#eae7e9] transition-colors p-8 text-center cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-[#091426]" />
                    <span className="text-[#45474c] text-sm mt-2">Dateien hier ablegen oder klicken zum Auswählen</span>
                  </div>
                </div>
                <button type="button" className="bg-[#1e293b] text-white font-bold uppercase py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] transition-all hover:bg-[#fd761a] active:translate-y-1 mt-4">
                  Anfrage Senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
