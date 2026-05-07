"use client";

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none"
        >
          <div className="max-w-[700px] mx-auto bg-[#091426] border-2 border-[#eae7e9] shadow-[4px_4px_0px_0px_#fd761a] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto">
            <div className="text-white">
              <h3 className="font-bold text-lg uppercase leading-tight">Bereit für Ihr Projekt?</h3>
              <p className="text-[#a5b4ca] text-sm font-medium">Holen Sie sich jetzt ein unverbindliches Angebot.</p>
            </div>
            
            <Link 
              href="/kontakt" 
              className="bg-[#fd761a] text-white px-6 py-3 font-bold uppercase hover:bg-white hover:text-[#091426] transition-colors border-2 border-transparent hover:border-[#091426] flex items-center gap-2 whitespace-nowrap shadow-[2px_2px_0px_0px_#fd761a] hover:shadow-[2px_2px_0px_0px_#091426] w-full sm:w-auto justify-center"
            >
              <FileText className="w-5 h-5" />
              <span>Angebot anfordern</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
