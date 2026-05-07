import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t-2 border-slate-700 mt-auto w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-lg font-bold text-white uppercase tracking-widest text-[#091426]">
        <Link href="/" className="text-white">VPTrokkenbau</Link>
      </div>
      <nav className="flex flex-wrap justify-center gap-6">
        <Link href="/karriere" className="text-xs uppercase tracking-widest text-slate-400 hover:text-orange-500 underline transition-colors">Karriere</Link>
      </nav>
      <div className="text-slate-400 text-xs uppercase tracking-widest text-center mt-4 md:mt-0">
        © 2024 VPTrokkenbau GmbH. Alle Rechte vorbehalten.
      </div>
    </footer>
  )
}
