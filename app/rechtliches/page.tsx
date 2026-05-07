import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum & Datenschutz | VPTrokkenbau Dresden',
  description: 'Rechtliche Informationen, Impressum und Datenschutzerklärung der VPTrokkenbau GmbH in Dresden.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://vptrokkenbau.de/rechtliches',
  },
};

export default function Rechtliches() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
      <aside className="hidden md:block md:col-span-3">
         <div className="sticky top-28 bg-white border border-[#091426] p-6 shadow-[4px_4px_0px_0px_#091426]">
            <h3 className="text-xl font-bold text-[#091426] mb-4 uppercase">Rechtliches</h3>
            <nav className="flex flex-col gap-2">
              <a href="#impressum" className="font-bold text-[#fd761a] bg-[#f5f3f4] px-4 py-3 border-l-4 border-[#fd761a]">Impressum</a>
              <a href="#datenschutz" className="font-bold text-[#45474c] hover:bg-[#f5f3f4] px-4 py-3 border-l-4 border-transparent hover:border-[#091426] transition-colors">Datenschutz</a>
              <a href="#agb" className="font-bold text-[#45474c] hover:bg-[#f5f3f4] px-4 py-3 border-l-4 border-transparent hover:border-[#091426] transition-colors">AGB</a>
            </nav>
         </div>
      </aside>
      <div className="md:col-span-9 flex flex-col gap-12">
        {/* Impressum */}
        <section id="impressum" className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426]">
          <h1 className="text-4xl font-extrabold text-[#091426] border-b-2 border-[#091426] pb-4 mb-8 uppercase tracking-tight">Impressum</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-[#1b1b1d] mb-2 uppercase">Angaben gemäß § 5 TMG</h2>
              <p className="text-[#45474c]"><strong>VPTrokkenbau GmbH</strong><br/>Baustraße 123<br/>01067 Dresden<br/>Deutschland</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1b1b1d] mb-2 uppercase">Vertreten durch:</h2>
              <p className="text-[#45474c]">Geschäftsführer: Max Mustermann</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1b1b1d] mb-2 uppercase">Kontakt</h2>
              <p className="text-[#45474c]">Telefon: +49 (0) 351 12345678<br/>Telefax: +49 (0) 351 12345679<br/>E-Mail: info@vptrokkenbau.de</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1b1b1d] mb-2 uppercase">Registereintrag</h2>
              <p className="text-[#45474c]">Eintragung im Handelsregister.<br/>Registergericht: Amtsgericht Dresden<br/>Registernummer: HRB 123456</p>
            </div>
            <div className="md:col-span-2 mt-4 pt-4 border-t border-[#c5c6cd]">
              <h2 className="text-xl font-bold text-[#1b1b1d] mb-2 uppercase">Umsatzsteuer-ID</h2>
              <p className="text-[#45474c]">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br/>DE 123 456 789</p>
            </div>
          </div>
        </section>

        {/* Datenschutz */}
        <section id="datenschutz" className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426]">
          <h1 className="text-4xl font-extrabold text-[#091426] border-b-2 border-[#091426] pb-4 mb-8 uppercase tracking-tight">Datenschutzerklärung</h1>
          <div className="flex flex-col gap-8 text-[#45474c]">
            <article>
              <h2 className="text-2xl font-bold text-[#1b1b1d] mb-4 uppercase">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-bold text-[#1b1b1d] mb-2">Allgemeine Hinweise</h3>
              <p className="mb-4">Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
              <div className="bg-[#f5f3f4] p-6 border border-[#091426]">
                <h4 className="font-bold text-[#1b1b1d] mb-2 uppercase text-sm">Wer ist verantwortlich für die Datenerfassung?</h4>
                <p className="mb-4">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.</p>
                <h4 className="font-bold text-[#1b1b1d] mb-2 uppercase text-sm">Wie erfassen wir Ihre Daten?</h4>
                <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Andere Daten werden automatisch erfasst.</p>
              </div>
            </article>
            <article>
              <h2 className="text-2xl font-bold text-[#1b1b1d] mb-4 uppercase">2. Hosting</h2>
              <p className="mb-4">Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Externes Hosting GmbH, Musterstadt.</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}
