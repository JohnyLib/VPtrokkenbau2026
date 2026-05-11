import { KarriereClient } from './KarriereClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Karriere & Jobs im Trockenbau | VpTrockenbau Dresden',
  description: 'Werden Sie Teil unseres Teams. Wir suchen Trockenbauer, Vorarbeiter und Poliere im Großraum Dresden. Top Konditionen und Weiterbildungsmöglichkeiten.',
  alternates: {
    canonical: 'https://vptrockenbau.de/karriere',
  },
  openGraph: {
    title: 'Karriere & Jobs | VpTrockenbau',
    description: 'Bewerben Sie sich jetzt in wenigen Klicks. Professioneller Trockenbau in Dresden sucht Verstärkung.',
    url: 'https://vptrockenbau.de/karriere',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'VpTrockenbau Karriere Team',
      },
    ],
  },
};

export default function Karriere() {
  return <KarriereClient />;
}
