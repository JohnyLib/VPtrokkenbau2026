import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Database, Key, Server, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | VpTrockenbau Dresden',
  description: 'Datenschutzerklärung und rechtliche Informationen zum Schutz Ihrer persönlichen Daten bei VpTrockenbau.',
  alternates: {
    canonical: 'https://vptrokenbau.de/datenschutz',
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function Datenschutz() {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-8">
      {/* Back Button */}
      <Link href="/" className="self-start text-[#091426] font-bold uppercase text-xs tracking-wider flex items-center gap-2 group hover:text-[#fd761a] transition-colors border border-[#091426] px-4 py-2 bg-white shadow-[2px_2px_0px_0px_#091426] hover:shadow-[4px_4px_0px_0px_#091426] hover:-translate-y-0.5 active:translate-y-0 transition-all">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Zurück zur Startseite
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 border-b-2 border-[#091426] pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Datenschutzerklärung</h1>
        <p className="text-sm text-[#45474c] uppercase font-mono tracking-widest">
          Informationen über die Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO
        </p>
      </div>

      {/* Intro section */}
      <div className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426] text-sm text-[#45474c] leading-relaxed space-y-4">
        <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#fd761a]" />
          <h2 className="text-lg font-bold text-[#091426] uppercase">1. Datenschutz auf einen Blick</h2>
        </div>
        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie darüber, welche Daten wir erheben, wie wir sie nutzen und welche Rechte Ihnen zustehen.
        </p>
        <p>
          <strong>Personenbezogene Daten</strong> sind alle Daten, mit denen Sie persönlich identifiziert werden können. Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Für die Nutzung einzelner Services (wie z.B. dem Ausschreibungs- oder Kontaktformular) können sich jedoch abweichende Regelungen ergeben.
        </p>
      </div>

      {/* Verantwortliche Stelle */}
      <div className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426] text-sm text-[#45474c] leading-relaxed space-y-4">
        <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3 mb-2">
          <Database className="w-5 h-5 text-[#fd761a]" />
          <h2 className="text-lg font-bold text-[#091426] uppercase">2. Verantwortliche Stelle</h2>
        </div>
        <p>
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <div className="bg-[#f5f3f4] border border-[#091426] p-4 text-[#091426] font-mono text-xs space-y-1.5">
          <p className="font-bold uppercase">VpTrockenbau GmbH</p>
          <p>Baustraße 123</p>
          <p>01067 Dresden</p>
          <p>Geschäftsführer: Vasilii Perevalov</p>
          <p>E-Mail: info@vptrokenbau.de</p>
          <p>Telefon: +49 (0) 151 61559335</p>
        </div>
        <p className="text-xs italic">
          Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
        </p>
      </div>

      {/* Hosting & Server Logs */}
      <div className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426] text-sm text-[#45474c] leading-relaxed space-y-4">
        <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3 mb-2">
          <Server className="w-5 h-5 text-[#fd761a]" />
          <h2 className="text-lg font-bold text-[#091426] uppercase">3. Hosting und Server-Logfiles</h2>
        </div>
        <p>
          Unsere Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei handelt es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden.
        </p>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten <strong>Server-Logfiles</strong>, die Ihr Browser automatisch an uns übermittelt. Dies sind:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Browsertyp und Browserversion</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL (die zuvor besuchte Seite)</li>
          <li>Hostname des zugreifenden Rechners (IP-Adresse)</li>
          <li>Uhrzeit der Serveranfrage</li>
        </ul>
        <p>
          Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Logfiles erfasst werden.
        </p>
      </div>

      {/* Form Data & Nodemailer */}
      <div className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426] text-sm text-[#45474c] leading-relaxed space-y-4">
        <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3 mb-2">
          <FileText className="w-5 h-5 text-[#fd761a]" />
          <h2 className="text-lg font-bold text-[#091426] uppercase">4. Datenerfassung über Formulare</h2>
        </div>
        <p>
          Wenn Sie uns per Kontakt- oder Bewerbungsformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, E-Mail-Adresse, optional Telefonnummer sowie hochgeladene Planungsdokumente oder Bewerbungsunterlagen) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
        </p>
        <p>
          Diese Daten verarbeiten wir zur Beantwortung Ihres Anliegens auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (sofern Ihre Anfrage der Durchführung eines Vertrages dient oder für vorvertragliche Maßnahmen erforderlich ist) oder auf Grundlage von <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (unser berechtigtes Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen).
        </p>
        <p>
          Die von Ihnen im Formular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
        </p>
      </div>

      {/* Rights of the Data Subject */}
      <div className="bg-white border border-[#091426] p-8 shadow-[4px_4px_0px_0px_#091426] text-sm text-[#45474c] leading-relaxed space-y-4">
        <div className="flex items-center gap-2 border-b border-[#eae7e9] pb-3 mb-2">
          <Key className="w-5 h-5 text-[#fd761a]" />
          <h2 className="text-lg font-bold text-[#091426] uppercase">5. Ihre Rechte (Betroffenenrechte)</h2>
        </div>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit folgende Rechte bezüglich Ihrer personenbezogenen Daten:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="border border-[#091426] p-4 bg-[#fbf8fa]">
            <p className="font-bold text-[#091426] uppercase text-xs tracking-wider mb-1">Recht auf Auskunft (Art. 15 DSGVO)</p>
            <p className="text-xs">Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob Sie betreffende personenbezogene Daten verarbeitet werden und Auskunft über diese Daten zu erhalten.</p>
          </div>
          <div className="border border-[#091426] p-4 bg-[#fbf8fa]">
            <p className="font-bold text-[#091426] uppercase text-xs tracking-wider mb-1">Recht auf Berichtigung (Art. 16 DSGVO)</p>
            <p className="text-xs">Sie haben das Recht, unverzüglich die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten Daten zu verlangen.</p>
          </div>
          <div className="border border-[#091426] p-4 bg-[#fbf8fa]">
            <p className="font-bold text-[#091426] uppercase text-xs tracking-wider mb-1">Recht auf Löschung (Art. 17 DSGVO)</p>
            <p className="text-xs">Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern keine gesetzliche Aufbewahrungspflicht dem entgegensteht.</p>
          </div>
          <div className="border border-[#091426] p-4 bg-[#fbf8fa]">
            <p className="font-bold text-[#091426] uppercase text-xs tracking-wider mb-1">Recht auf Widerspruch (Art. 21 DSGVO)</p>
            <p className="text-xs">Soweit Ihre Daten auf Grundlage von berechtigten Interessen verarbeitet werden, haben Sie das Recht, Widerspruch gegen die Verarbeitung einzulegen.</p>
          </div>
        </div>
        <p className="pt-2">
          Möchten Sie eines dieser Rechte ausüben oder haben Sie Fragen zum Thema Datenschutz, wenden Sie sich bitte einfach per E-Mail an <a href="mailto:info@vptrokenbau.de" className="text-[#fd761a] hover:underline font-bold">info@vptrokenbau.de</a>.
        </p>
        <p>
          Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Datenschutz-Aufsichtsbehörde zu (Sächsischer Datenschutzbeauftragter).
        </p>
      </div>
    </div>
  );
}
