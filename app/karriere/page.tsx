import { KarriereClient } from './KarriereClient';
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
  return <KarriereClient />;
}
