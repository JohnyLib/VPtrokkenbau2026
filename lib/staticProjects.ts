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
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
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
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
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
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
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
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ]
  }
];
