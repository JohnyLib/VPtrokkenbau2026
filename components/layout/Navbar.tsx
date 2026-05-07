"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fbf8fa] border-b-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] h-20 transition-all">
      <div className="flex justify-between items-center h-full px-4 md:px-8 max-w-[1440px] mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#091426] uppercase">
          VP<span className="text-[#fd761a]">Trokkenbau</span>
        </Link>
        <button 
          className="md:hidden p-2 text-[#091426] hover:bg-[#eae7e9] border border-transparent active:border-[#091426] transition-all" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <nav className={`absolute md:static top-20 left-0 w-full md:w-auto bg-[#fbf8fa] md:bg-transparent border-b-2 md:border-none border-[#091426] p-6 md:p-0 flex flex-col md:flex-row gap-4 md:gap-6 md:items-center transition-all ${isOpen ? 'flex opacity-100 translate-y-0 shadow-[4px_4px_0px_0px_#091426]' : 'hidden md:flex'}`}>
          <Link 
            href="/leistungen" 
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto text-center md:text-left font-bold uppercase tracking-tight text-sm text-[#091426] border border-[#091426] bg-white px-4 py-3 md:p-0 md:border-none md:bg-transparent hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] md:shadow-none"
          >
            Leistungen
          </Link>
          <Link 
            href="/portfolio" 
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto text-center md:text-left font-bold uppercase tracking-tight text-sm text-[#091426] border border-[#091426] bg-white px-4 py-3 md:p-0 md:border-none md:bg-transparent hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] md:shadow-none"
          >
            Portfolio
          </Link>
          <Link 
            href="/karriere" 
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto text-center md:text-left font-bold uppercase tracking-tight text-sm text-[#091426] border border-[#091426] bg-white px-4 py-3 md:p-0 md:border-none md:bg-transparent hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] md:shadow-none"
          >
            Karriere
          </Link>
          <Link 
            href="/faq" 
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto text-center md:text-left font-bold uppercase tracking-tight text-sm text-[#091426] border border-[#091426] bg-white px-4 py-3 md:p-0 md:border-none md:bg-transparent hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] md:shadow-none"
          >
            FAQ
          </Link>
          <Link 
            href="/kontakt" 
            onClick={() => setIsOpen(false)}
            className="w-full md:w-auto bg-[#091426] text-white font-bold uppercase text-sm px-6 py-4 border-2 border-[#091426] hover:bg-[#fd761a] hover:text-white hover:shadow-[4px_4px_0px_0px_#091426] md:hover:-translate-y-1 md:hover:-translate-x-1 transition-all md:ml-4 inline-block text-center shadow-[2px_2px_0px_0px_#091426] md:shadow-none"
          >
            Angebot Anfordern
          </Link>
        </nav>
      </div>
    </header>
  )
}
