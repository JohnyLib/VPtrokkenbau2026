"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full z-50 bg-[#f8fafc] border-b-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] h-20 transition-all">
      <div className="flex justify-between items-center h-full px-4 md:px-8 max-w-[1440px] mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#091426] uppercase">
          VPTrokkenbau
        </Link>
        <button className="md:hidden p-2 text-[#091426]" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6" />
        </button>
        <nav className={`absolute md:static top-20 left-0 w-full md:w-auto bg-[#f8fafc] md:bg-transparent border-b-2 md:border-none border-[#091426] p-4 md:p-0 flex-col md:flex-row gap-6 md:items-center transition-all ${isOpen ? 'flex flex-col shadow-[4px_4px_0px_0px_#091426]' : 'hidden md:flex'}`}>
          <Link href="/leistungen" className="font-bold uppercase tracking-tight text-sm text-slate-700 hover:text-white hover:bg-orange-600 md:px-3 md:py-2 transition-colors">Leistungen</Link>
          <Link href="/portfolio" className="font-bold uppercase tracking-tight text-sm text-slate-700 hover:text-white hover:bg-orange-600 md:px-3 md:py-2 transition-colors">Portfolio</Link>
          <Link href="/karriere" className="font-bold uppercase tracking-tight text-sm text-slate-700 hover:text-white hover:bg-orange-600 md:px-3 md:py-2 transition-colors">Karriere</Link>
          <Link href="/faq" className="font-bold uppercase tracking-tight text-sm text-slate-700 hover:text-white hover:bg-orange-600 md:px-3 md:py-2 transition-colors">FAQ</Link>
          <Link href="/rechtliches" className="font-bold uppercase tracking-tight text-sm text-slate-700 hover:text-white hover:bg-orange-600 md:px-3 md:py-2 transition-colors">Rechtliches</Link>
          <Link href="/kontakt" className="bg-[#091426] text-white font-bold uppercase text-sm px-6 py-3 md:border-2 md:border-[#091426] hover:bg-orange-600 hover:shadow-[4px_4px_0px_0px_#091426] md:hover:-translate-y-1 md:hover:-translate-x-1 transition-all md:ml-4 inline-block text-center mt-2 md:mt-0">Angebot Anfordern</Link>
        </nav>
      </div>
    </header>
  )
}
