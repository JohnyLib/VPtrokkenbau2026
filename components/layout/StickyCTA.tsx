"use client";

import Link from 'next/link';
import { FileText, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      // Show CTA when scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none flex justify-center"
        >
          <div className="relative w-full max-w-[850px] bg-white border-4 border-[#091426] shadow-[8px_8px_0px_0px_#fd761a] p-6 flex flex-col md:flex-row items-center justify-between gap-5 pointer-events-auto transition-all duration-300 hover:shadow-[10px_10px_0px_0px_#091426]">
            
            {/* Urgent Status Badge */}
            <div className="absolute -top-3.5 left-4 bg-[#091426] text-white border-2 border-white px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#fd761a]">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="w-2 h-2 bg-emerald-500 rounded-full absolute" />
              <span className="pl-1 text-emerald-300">Freie Termine Q2 2026</span>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-3.5 -right-3.5 bg-white text-[#091426] border-2 border-[#091426] rounded-full p-1.5 shadow-[2px_2px_0px_0px_#091426] hover:bg-[#fd761a] hover:text-white transition-all hover:scale-110 active:scale-90 cursor-pointer flex items-center justify-center"
              title="Schließen"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Text content */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex w-12 h-12 bg-amber-50 border-2 border-[#091426] rounded-full items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#fd761a] animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-xl text-[#091426] uppercase leading-tight tracking-tight">
                  Bereit für Ihr Projekt?
                </h3>
                <p className="text-[#45474c] text-sm font-bold mt-1">
                  Holen Sie sich jetzt ein unverbindliches Angebot. <span className="text-[#fd761a] underline decoration-wavy">100% kostenfrei</span>
                </p>
              </div>
            </div>
            
            {/* Primary Action Button */}
            <Link 
              href="/kontakt" 
              className="bg-[#fd761a] hover:bg-[#091426] text-white font-extrabold uppercase px-8 py-4 border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:shadow-[4px_4px_0px_0px_#fd761a] active:translate-y-1 active:shadow-none transition-all w-full md:w-auto text-center flex items-center justify-center gap-2.5 text-sm tracking-wider cursor-pointer"
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
