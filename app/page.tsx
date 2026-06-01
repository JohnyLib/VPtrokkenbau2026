import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'VpTrockenbau | Trockenbau & Innenausbau Dresden',
  description: 'Ihr Spezialist für Trockenbau, Spachtelarbeiten (Q1–Q4), Gipskartonmontage und Akustikbau in Dresden & Sachsen. Jetzt kostenloses Angebot anfordern!',
  alternates: {
    canonical: 'https://vptrockenbau.de',
  },
};

export default function Home() {
  return <HomeClient />;
}
