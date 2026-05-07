"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, X, MapPin, Building2, Quote } from 'lucide-react';
import { useState, useMemo } from 'react';

const projects = [
  {
    title: "Modern Office Complex Dresden",
    category: "Gewerbe",
    q: "Q4 (Höchste)",
    area: "12.500 m²",
    duration: "8 Monate",
    client: "Immobilienfonds Dresden Ost",
    location: "Dresden Neustadt",
    testimonial: "Höchste Präzision bei den komplexen Spachtelarbeiten, genau wie von den Architekten vorgegeben. Das Team von VPTrokkenbau hat unsere Erwartungen bei diesem Revitalisierungsprojekt übertroffen.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Exklusive Villa Radebeul",
    category: "Privat",
    q: "Q4",
    area: "850 m²",
    duration: "3 Monate",
    client: "Privatbauherr R.",
    location: "Radebeul, Oberlößnitz",
    testimonial: "Absolute Spitzenklasse. Die nahtlosen Übergänge und die Qualität der Oberflächen sind ein Traum. Zuverlässig, sauber und perfekt in der Ausführung.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687980-ce46efb21919?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18efc2069?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Luftfahrtindustrie Radebeul",
    category: "Industrie",
    q: "Q2 (Akustik)",
    area: "5.000 m²",
    duration: "4 Wochen",
    client: "AeroTech Sachsen GmbH",
    location: "Radebeul Industriegebiet",
    testimonial: "Die anspruchsvollen akustischen Vorgaben in den Produktionshallen wurden exzellent umgesetzt. Beeindruckendes Arbeitstempo ohne Kompromisse bei der Sicherheit.",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565514020179-026b92b84eb6?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Einkaufszentrum Altmarkt",
    category: "Gewerbe",
    q: "Q3",
    area: "22.000 m²",
    duration: "14 Monate",
    client: "Retail Management Plus",
    location: "Dresden Altstadt",
    testimonial: "Ein verlässlicher Partner bei unserem bisher größten Umbauprojekt. Die Flexibilität bei Nachtarbeiten und die Koordination mit anderen Gewerken waren vorbildlich.",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Medizinzentrum Prohlis",
    category: "Gesundheit",
    q: "Q3 (Hygiene)",
    area: "3.200 m²",
    duration: "5 Monate",
    client: "Gesundheitsnetzwerk Dresden",
    location: "Dresden Prohlis",
    testimonial: "Strenge Hygieneanforderungen und spezielle Strahlenschutzwände wurden gemäß den Klinikanforderungen makellos installiert.",
    images: [
      "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Boutique Hotel Elbufer",
    category: "Gastgewerbe",
    q: "Q4 (Design)",
    area: "4.500 m²",
    duration: "6 Monate",
    client: "Riverside Hotels",
    location: "Dresden Loschwitz",
    testimonial: "Dank der meisterhaften Deckenkonstruktionen und runden Wandelemente erstrahlt unsere Lobby in perfektem Licht. Ein fantastisches Ergebnis.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

function ProjectCard({ p, index, onClick }: { p: any, index: number, onClick: () => void }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % p.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + p.images.length) % p.images.length);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="border-2 border-[#091426] bg-white shadow-[4px_4px_0px_0px_#091426] flex flex-col group hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#fd761a] transition-all duration-300 cursor-pointer"
    >
      <div className="h-56 border-b-2 border-[#091426] relative overflow-hidden bg-[#eae7e9] group/slider">
        <AnimatePresence initial={false}>
          {p.images.map((img: string, imgIndex: number) => (
            imgIndex === currentImage && (
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image src={img} alt={`${p.title} - Bild ${imgIndex + 1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {p.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1 border border-[#091426] text-[#091426] opacity-0 group-hover/slider:opacity-100 hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] z-10" aria-label="Vorheriges Bild">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1 border border-[#091426] text-[#091426] opacity-0 group-hover/slider:opacity-100 hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] z-10" aria-label="Nächstes Bild">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 bg-white/80 px-2 py-1 border border-[#091426]">
              {p.images.map((_: any, dotIndex: number) => (
                <div key={dotIndex} className={`w-2 h-2 rounded-full ${dotIndex === currentImage ? 'bg-[#fd761a]' : 'bg-[#091426]/50'}`} />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-3 right-3 bg-[#fd761a] text-white px-3 py-1.5 text-xs font-bold uppercase border border-[#091426] shadow-[2px_2px_0px_0px_#091426] z-10">
          {p.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#091426] mb-5 uppercase leading-tight group-hover:text-[#fd761a] transition-colors">{p.title}</h3>
        <div className="mt-auto pt-5 border-t border-[#c5c6cd]">
          <table className="w-full text-left text-sm font-medium">
            <tbody className="divide-y divide-[#eae7e9]">
              <tr className="h-10"><td className="text-[#45474c]">Qualitätsstufe:</td><td className="font-bold text-[#091426] text-right">{p.q}</td></tr>
              <tr className="h-10"><td className="text-[#45474c]">Fläche:</td><td className="font-bold text-[#091426] text-right">{p.area}</td></tr>
              <tr className="h-10"><td className="text-[#45474c]">Dauer:</td><td className="font-bold text-[#091426] text-right">{p.duration}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ p, onClose }: { p: any, onClose: () => void }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % p.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + p.images.length) % p.images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#091426]/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-2 border-[#091426] shadow-[8px_8px_0px_0px_#fd761a] w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-white/90 p-2 border border-[#091426] text-[#091426] hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] z-20"
          aria-label="Schließen"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-[#091426]">
          <div className="relative flex-grow bg-[#eae7e9] min-h-[300px] group/modalSlider overflow-hidden">
            <AnimatePresence initial={false}>
              {p.images.map((img: string, imgIndex: number) => (
                imgIndex === currentImage && (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image src={img} alt={`${p.title} - Bild ${imgIndex + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="object-cover" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {p.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 border border-[#091426] text-[#091426] hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] z-10" aria-label="Vorheriges Bild">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 border border-[#091426] text-[#091426] hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] z-10" aria-label="Nächstes Bild">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <div className="absolute top-4 left-4 bg-[#fd761a] text-white px-4 py-2 text-sm font-bold uppercase border border-[#091426] shadow-[2px_2px_0px_0px_#091426] z-10">
              {p.category}
            </div>
          </div>
          
          {/* Thumbnails Gallery */}
          {p.images.length > 1 && (
            <div className="bg-white p-4 border-t-2 border-[#091426]">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {p.images.map((img: string, idx: number) => (
                  <button 
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImage(idx); }}
                    className={`relative w-24 h-16 shrink-0 border-2 overflow-hidden transition-all ${idx === currentImage ? 'border-[#fd761a] shadow-[2px_2px_0px_0px_#fd761a] scale-105' : 'border-[#091426] hover:border-[#fd761a] opacity-60 hover:opacity-100 hover:shadow-[2px_2px_0px_0px_#091426]'} cursor-pointer`}
                    aria-label={`Gehe zu Bild ${idx + 1}`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="96px" loading="lazy" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
          <h2 className="text-3xl font-bold text-[#091426] mb-6 uppercase border-l-4 border-[#fd761a] pl-4 leading-tight pr-8">{p.title}</h2>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 text-sm md:text-base border-y-2 border-[#eae7e9] py-6">
            <div>
              <span className="block text-[#45474c] mb-1 font-medium">Qualitätsstufe:</span>
              <span className="font-bold text-[#091426]">{p.q}</span>
            </div>
            <div>
              <span className="block text-[#45474c] mb-1 font-medium">Fläche:</span>
              <span className="font-bold text-[#091426]">{p.area}</span>
            </div>
            <div>
              <span className="block text-[#45474c] mb-1 font-medium">Dauer:</span>
              <span className="font-bold text-[#091426]">{p.duration}</span>
            </div>
            {p.location && (
              <div>
                <span className="block text-[#45474c] mb-1 font-medium">Standort:</span>
                <span className="font-bold text-[#091426] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#fd761a] inline" /> {p.location}
                </span>
              </div>
            )}
          </div>

          <div className="flex-grow flex flex-col justify-center">
            {p.testimonial && (
              <div className="bg-[#fbf8fa] border-l-4 border-[#091426] p-6 relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#eae7e9] -z-0" />
                <p className="text-[#091426] italic relative z-10 mb-4 leading-relaxed font-medium">
                  {p.testimonial}
                </p>
                {p.client && (
                  <div className="flex items-center gap-2 font-bold text-[#45474c] uppercase text-sm border-t border-[#eae7e9] pt-4">
                    <Building2 className="w-4 h-4 text-[#fd761a]" />
                    {p.client}
                  </div>
                )}
              </div>
            )}

            {!p.testimonial && p.client && (
               <div className="flex items-center gap-2 font-bold text-[#45474c] uppercase mt-auto">
                 <Building2 className="w-5 h-5 text-[#fd761a]" />
                 Auftraggeber: {p.client}
               </div>
            )}
          </div>

          {/* Map placeholder */}
          {p.location && (
             <div className="mt-8 border-2 border-[#091426] p-4 bg-white relative">
                 <div className="flex items-center justify-center h-32 bg-[#eae7e9] border border-[#c5c6cd]">
                     <div className="text-center font-medium text-[#45474c] flex flex-col items-center gap-2">
                        <MapPin className="w-6 h-6" />
                        <span>Kartenansicht: {p.location}</span>
                     </div>
                 </div>
             </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}

const steps = [
  { num: '01', title: 'Beratung & Aufmaß', desc: 'Vor-Ort-Begehung in Dresden/Umland, Erfassung der räumlichen Gegebenheiten und technische Beratung zu Materialien und Brandschutzvorgaben.' },
  { num: '02', title: 'Kalkulation & Angebot', desc: 'Erstellung eines detaillierten, transparenten Leistungsverzeichnisses mit verbindlichen Preisen und Terminplänen.' },
  { num: '03', title: 'Logistik & Einrichtung', desc: 'Just-in-Time Materiallieferung und professionelle Baustelleneinrichtung zur Gewährleistung eines reibungslosen Ablaufs.' },
  { num: '04', title: 'Ausführung', desc: 'Fachgerechte Montage der Ständerwerke, Beplankung und Spachtelarbeiten (Q1-Q4) durch unsere zertifizierten Teams.', highlight: true },
  { num: '05', title: 'Abnahme & Doku', desc: 'Gemeinsame Qualitätskontrolle, Übergabe der brandschutztechnischen Dokumentationen und besenreine Hinterlassung.' }
];

export function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [activeQuality, setActiveQuality] = useState("Alle");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = ["Alle", ...Array.from(new Set(projects.map(p => p.category)))];
  const qualities = ["Alle", "Q2", "Q3", "Q4"];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCategory = activeCategory === "Alle" || p.category === activeCategory;
      const matchQuality = activeQuality === "Alle" || p.q.includes(activeQuality);
      return matchCategory && matchQuality;
    });
  }, [activeCategory, activeQuality]);

  return (
    <div className="flex flex-col gap-16 max-w-[1280px] mx-auto px-4 md:px-8 py-12 w-full">
      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-2 border-[#091426] bg-white p-8 md:p-12 shadow-[4px_4px_0px_0px_#091426] flex flex-col lg:flex-row items-center gap-12"
      >
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase border-l-8 border-[#fd761a] pl-4 tracking-tight">
            Unsere Referenzen
          </h1>
          <p className="text-lg text-[#45474c] max-w-2xl leading-relaxed">
            Entdecken Sie unsere herausragenden Projekte im Großraum Dresden. Von modernen Bürokomplexen bis hin zu luxuriösen Villen – VPTrokkenbau steht für höchste Qualität, Termintreue und architektonische Exzellenz im Trockenbau.
          </p>
          <div className="pt-4">
            <Link href="/kontakt" className="bg-[#1e293b] text-white font-bold uppercase px-8 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#fd761a] transition-all inline-flex items-center gap-2 group active:translate-y-1">
              Projekt anfragen <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full min-h-[350px] border-2 border-[#091426] overflow-hidden relative shadow-[4px_4px_0px_0px_#091426]">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" fill sizes="(max-width: 1024px) 100vw, 50vw" priority alt="Hero Referenzen" className="object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" />
        </div>
      </motion.section>

      {/* Grid */}
      <section>
        <div className="flex flex-col gap-4 mb-10">
          <h2 className="text-3xl font-bold text-[#091426] border-b-2 border-[#091426] pb-2 uppercase tracking-tight inline-block self-start">Ausgewählte Projekte</h2>
          <p className="text-[#45474c] text-lg">Eine Auswahl unserer erfolgreich abgeschlossenen Bauvorhaben in Sachsen. Nutzen Sie die Filter, um nach spezifischen Anforderungen zu suchen.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white p-6 border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] mb-10">
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-sm font-bold text-[#091426] uppercase">Kategorie:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 font-bold text-sm uppercase transition-colors border-2 ${activeCategory === c ? 'border-[#091426] bg-[#091426] text-white shadow-[2px_2px_0px_0px_#fd761a]' : 'border-[#091426] bg-white text-[#091426] hover:bg-[#eae7e9]'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-[2px] h-12 bg-[#eae7e9] mx-2"></div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <span className="text-sm font-bold text-[#091426] uppercase">Qualitätsstufe:</span>
            <div className="flex flex-wrap gap-2">
              {qualities.map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveQuality(q)}
                  className={`px-4 py-2 font-bold text-sm uppercase transition-colors border-2 ${activeQuality === q ? 'border-[#091426] bg-[#091426] text-white shadow-[2px_2px_0px_0px_#fd761a]' : 'border-[#091426] bg-white text-[#091426] hover:bg-[#eae7e9]'}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white border-2 border-[#091426] p-8 text-center text-[#45474c] shadow-[4px_4px_0px_0px_#091426]">
             <p className="text-lg">Keine Projekte mit den gewählten Kriterien gefunden.</p>
             <button onClick={() => {setActiveCategory("Alle"); setActiveQuality("Alle");}} className="mt-4 text-[#fd761a] font-bold uppercase hover:underline">Filter zurücksetzen</button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.title} p={p} index={i} onClick={() => setSelectedProject(p)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal p={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Ablauf */}
      <section className="bg-white border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#eae7e9] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
        <h2 className="text-3xl font-bold text-[#091426] mb-10 uppercase tracking-tight border-b-2 border-[#091426] pb-2 inline-block relative z-10">Unser Projektablauf</h2>
        
        <div className="relative pl-8 md:pl-10 flex flex-col gap-10 max-w-4xl z-10">
          <div className="absolute left-[15px] md:left-[19px] top-4 bottom-4 w-[2px] bg-[#091426]"></div>
          
          {steps.map((s, i) => (
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               key={i} 
               className="relative"
             >
                <div className={`absolute -left-10 md:-left-12 top-0 w-10 h-10 flex items-center justify-center font-bold text-sm border-2 border-[#091426] ${s.highlight ? 'bg-[#fd761a] text-white shadow-[2px_2px_0px_0px_#091426]' : 'bg-white text-[#091426] shadow-[2px_2px_0px_0px_#091426]'} z-10 transition-colors`}>
                    {s.num}
                </div>
                <div className="pl-6 md:pl-8 bg-transparent">
                    <h4 className="text-xl font-bold text-[#091426] mb-2 uppercase">{s.title}</h4>
                    <p className="text-[#45474c] leading-relaxed max-w-2xl">{s.desc}</p>
                </div>
             </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
