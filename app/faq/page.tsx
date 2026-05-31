import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'FAQ Trockenbau & Spachtelarbeiten Dresden | VpTrockenbau',
  description: 'Häufige Fragen zu Trockenbau, Q1–Q4 Spachtelarbeiten, Gipskartonmontage, Kosten und Projektplanung in Dresden — beantwortet von Ihrem Fachbetrieb VpTrockenbau.',
  alternates: {
    canonical: 'https://vptrockenbau.de/faq',
  },
  openGraph: {
    title: 'FAQ Trockenbau | VpTrockenbau Dresden',
    description: 'Fragen und Antworten zu Trockenbau, Spachtelarbeiten Q1–Q4, Gipskartonmontage und Innenausbau in Dresden.',
    url: 'https://vptrockenbau.de/faq',
    images: [{ url: 'https://vptrockenbau.de/og-image.png', width: 1200, height: 630, alt: 'FAQ Trockenbau VpTrockenbau Dresden' }],
  },
};

export default function FAQ() {
  const faqs = [
    {
      category: 'Leistungen & Qualitätsstandards',
      questions: [
        {
          q: 'Was bedeuten die Qualitätsstufen Q1 bis Q4 im Trockenbau?',
          a: 'Die Qualitätsstufen definieren die Güte der gespachtelten Oberfläche. Q1 ist die Grundverspachtelung, ausreichend für Fliesen. Q2 ist der Standard für raufaserartige Tapeten nach DIN. Q3 bietet eine feinere Oberfläche für matte Anstriche, während Q4 eine vollflächige Sonderverspachtelung ist, die höchste Ansprüche an Ebenheit für glänzende oder anspruchsvolle Tapeten/Malerarbeiten erfüllt.'
        },
        {
          q: 'Welche Arten von Gipskartonplatten und Systemen verwenden Sie?',
          a: 'Wir arbeiten ausschließlich mit zertifizierten Markenherstellern (wie Knauf, Rigips oder Siniat) zusammen. Je nach Einsatzbereich nutzen wir Standard-Bauplatten für Trennwände, imprägnierte (grüne) Feuchtraumplatten für Badezimmer, schallschützende Akustikplatten oder hochbelastbare Hartgipsplatten.'
        },
        {
          q: 'Was zeichnet guten Akustikbau aus?',
          a: 'Ein guter Akustikbau reduziert Nachhallzeiten und steuert die Schallreflektion. Durch spezielle Lochplatten, Akustikdecken und Schallabsorber können wir die Raumakustik maßgeschneidert auf Ihre Bedürfnisse (z.B. in Großraumbüros oder Konferenzräumen) anpassen.'
        },
        {
          q: 'Bieten Sie auch Brandschutz-Trockenbaulösungen an?',
          a: 'Ja, Brandschutz ist ein wichtiger Bestandteil unserer Leistungen. Wir errichten Brandschutzwände und Schachtkonstruktionen mit zertifizierten Systemen gemäß DIN 4102 und EN 13501. Unsere Fachkräfte sind in der Planung und Ausführung brandschutztechnischer Trockenbaukonstruktionen für Gewerbe und Industrie geschult.'
        },
        {
          q: 'Was ist beim Dachausbau mit Trockenbau zu beachten?',
          a: 'Beim Dachausbau kommt es auf die korrekte Dampfsperre, eine lückenlose Wärmedämmung und eine präzise Beplankung der Dachschrägen an. Wir planen und realisieren den gesamten Innenausbau von Dachgeschossen — von der Sparrendämmung über die Ständerwerke bis zur fertigen Q3- oder Q4-Spachtelung.'
        }
      ]
    },
    {
      category: 'Ablauf & Projektplanung',
      questions: [
        {
          q: 'In welchem Umkreis um Dresden sind Sie tätig?',
          a: 'Unser Schwerpunkt liegt im Großraum Dresden sowie in ganz Ostsachsen. Wir sind regelmäßig in Radebeul, Freital, Pirna, Meißen, Radeberg und Coswig tätig. Für größere gewerbliche Trockenbauprojekte sind wir nach Absprache auch bundesweit tätig.'
        },
        {
          q: 'Wie läuft eine typische Anfrage ab?',
          a: 'Nachdem Sie uns über unser Kontaktformular oder telefonisch kontaktiert haben, sichten wir Ihre Pläne (LV). Anschließend vereinbaren wir ggf. einen Vor-Ort-Termin zur exakten Aufmaßerstellung. Daraufhin erhalten Sie von uns ein detailliertes und verbindliches Angebot.'
        },
        {
          q: 'Können Sie auch Großprojekte termingerecht abwickeln?',
          a: 'Absolut. VpTrockenbau ist auf komplexe gewerbliche Innenausbauten spezialisiert. Durch unsere langjährige Erfahrung, qualifiziertes Personal und effiziente Logistik garantieren wir Ihnen höchste Termintreue, selbst bei engen Zeitplänen und parallelen Gewerken.'
        },
        {
          q: 'Wie lange dauert eine typische Trockenbaumaßnahme?',
          a: 'Die Dauer hängt stark von Umfang und Komplexität ab. Eine einzelne Trennwand in Standardqualität kann an einem Tag abgeschlossen sein. Ein gewerblicher Innenausbau über mehrere Stockwerke mit Q4-Spachtelung kann mehrere Wochen in Anspruch nehmen. Wir erstellen zu jedem Projekt einen detaillierten Terminplan.'
        }
      ]
    },
    {
      category: 'Kosten & Angebote',
      questions: [
        {
          q: 'Wie werden Trockenbauarbeiten berechnet?',
          a: 'Trockenbauleistungen werden üblicherweise nach Quadratmeter (m²) abgerechnet. Der Preis hängt von der gewählten Qualitätsstufe (Q1–Q4), der Art des Systems (einfache Trennwand, Doppelständerwerk, Akustikdecke) und dem Materialaufwand ab. Wir erstellen Ihnen gerne ein unverbindliches, transparentes Angebot.'
        },
        {
          q: 'Erstellen Sie kostenlose Angebote?',
          a: 'Ja, die Angebotserstellung ist für Sie vollkommen kostenlos und unverbindlich. Nach Einreichung Ihrer Ausschreibungsunterlagen oder einer kurzen Projektbeschreibung erhalten Sie von uns zeitnah ein detailliertes Angebot mit Einzelpositionen nach Aufmaß.'
        },
        {
          q: 'Arbeiten Sie auch als Nachunternehmer für Generalunternehmer?',
          a: 'Ja, ein Großteil unserer Aufträge kommt von Generalunternehmern, Bauträgern und Architekten, die uns als verlässlichen Nachunternehmer für Trockenbau- und Spachtelleistungen einsetzen. Wir sind geübt im reibungslosen Zusammenspiel mit anderen Gewerken auf der Baustelle.'
        }
      ]
    }
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Startseite', 'item': 'https://vptrockenbau.de' },
      { '@type': 'ListItem', 'position': 2, 'name': 'FAQ', 'item': 'https://vptrockenbau.de/faq' }
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.flatMap(group => group.questions.map(faq => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a
      }
    })))
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-12">
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="flex flex-col gap-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Häufig gestellte Fragen (FAQ)</h1>
        <p className="text-lg text-[#45474c]">
          Finden Sie schnelle Antworten auf die wichtigsten Fragen rund um unsere Trockenbau-Leistungen, Qualitätsstandards und unseren Service im Raum Dresden.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {faqs.map((group, i) => (
          <div key={i} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2 inline-block self-start">
              {group.category}
            </h2>
            <div className="flex flex-col gap-4">
              {group.questions.map((faq, j) => (
                <details key={j} className="group bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 font-bold text-lg text-[#091426] cursor-pointer uppercase hover:bg-[#f5f3f4] transition-colors">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 bg-[#1e293b] p-1 text-white border border-[#091426] group-open:bg-[#2563eb] transition-colors">
                      <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" />
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-[#45474c] border-t border-transparent group-open:border-[#c5c6cd] mt-2 group-open:mt-0">
                    <div className="pt-4 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1e293b] p-8 md:p-12 text-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold uppercase mb-2 text-[#2563eb]">Ihre Frage war nicht dabei?</h3>
          <p className="text-[#bcc7de]">Kontaktieren Sie uns direkt. Unser Dresdner Team berät Sie gerne unverbindlich zu Ihrem Bauvorhaben.</p>
        </div>
        <Link href="/kontakt" className="bg-white text-[#091426] font-bold uppercase px-8 py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#2563eb] hover:text-white transition-all active:translate-y-1 whitespace-nowrap">
          Zum Kontaktformular
        </Link>
      </div>
    </div>
  );
}
