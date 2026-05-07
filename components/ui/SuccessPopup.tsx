"use client";

import { Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessPopup({ isOpen, onClose, title = "Vielen Dank!", message = "Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns so schnell wie möglich bei Ihnen melden." }: SuccessPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#091426]/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative bg-white border-4 border-[#091426] p-8 md:p-10 shadow-[8px_8px_0px_0px_#091426] max-w-md w-full text-center flex flex-col items-center gap-6 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#091426] hover:text-[#fd761a] p-1 border border-transparent hover:border-[#091426] transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Checkmark Icon Container */}
            <div className="w-16 h-16 bg-[#fd761a]/10 border-2 border-[#fd761a] rounded-full flex items-center justify-center text-[#fd761a] shadow-[4px_4px_0px_0px_#091426]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#091426] uppercase tracking-tight">{title}</h3>
              <p className="text-[#45474c] leading-relaxed font-medium">{message}</p>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-[#091426] text-white font-black py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#fd761a] uppercase hover:bg-[#fd761a] hover:shadow-none hover:translate-y-1 transition-all mt-2"
            >
              Schließen
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
