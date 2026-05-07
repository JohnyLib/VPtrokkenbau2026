import { PortfolioClient } from './PortfolioClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Referenzen Trockenbau | VPTrokkenbau Dresden',
  description: 'Entdecken Sie unsere erfolgreichen Trockenbau-Projekte in Dresden und Umgebung. Von modernen Bürokomplexen bis hin zu exklusiven Villen. Q4 Spachtelarbeiten ansehen.',
  alternates: {
    canonical: 'https://vptrokkenbau.de/portfolio',
  },
  openGraph: {
    title: 'Referenzen & Portfolio | VPTrokkenbau',
    description: 'Hochwertige Trockenbau-Projekte in Dresden. Überzeugen Sie sich von unserer Qualitätsstufe Q4.',
    url: 'https://vptrokkenbau.de/portfolio',
  },
};

export default function Portfolio() {
  return (
    <PortfolioClient />
  );
}
