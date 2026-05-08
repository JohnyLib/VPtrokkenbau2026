export interface PortfolioProject {
  id?: string;
  title: string;
  category: string;
  q: string;
  area: string;
  duration: string;
  client?: string;
  location?: string;
  testimonial?: string;
  images: string[];
  order_index?: number;
  created_at?: string;
}

export const staticProjects: PortfolioProject[] = [
  {
    title: "Modern Office Complex Dresden",
    category: "Gewerbe",
    q: "Q4 (Höchste)",
    area: "12.500 m²",
    duration: "8 Monate",
    client: "Immobilienfonds Dresden Ost",
    location: "Dresden Neustadt",
    testimonial: "Höchste Präzision bei den komplexen Spachtelarbeiten, genau wie von den Architekten vorgegeben. Das Team von VpTrockenbau hat unsere Erwartungen bei diesem Revitalisierungsprojekt übertroffen.",
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
