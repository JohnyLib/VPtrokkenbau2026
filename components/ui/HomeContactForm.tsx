"use client";

import { useState } from 'react';
import { Mail, Phone, Upload } from 'lucide-react';
import { SuccessPopup } from '@/components/ui/SuccessPopup';

export function HomeContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Gewerblicher Innenausbau',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Bitte füllen Sie Name und E-Mail aus.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: 'Projekt-Anfrage mit Dokument-Upload (simuliert) über das Startseiten-Ausschreibungsformular.',
          formType: 'contact'
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsPopupOpen(true);
        setFormData({
          name: '',
          email: '',
          service: 'Gewerblicher Innenausbau',
        });
      } else {
        alert('Fehler beim Senden: ' + (data.error || 'Bitte versuchen Sie es später noch einmal.'));
      }
    } catch (err) {
      console.error(err);
      alert('Verbindungsfehler beim Senden.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#f5f3f4] border-2 border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-[#091426] uppercase tracking-tight">Kontakt & Ausschreibung</h2>
            <p className="text-[#45474c] text-sm leading-relaxed">
              Senden Sie uns Ihre Projektunterlagen für eine präzise Kalkulation. Wir bearbeiten Anfragen für Gewerbe- und Großprojekte in Dresden und Umland mit höchster Priorität.
            </p>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <div className="flex items-start gap-3 text-[#091426] font-bold text-sm uppercase">
                <Mail className="w-5 h-5 text-[#fd761a] mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@vptrockenbau.de" className="hover:text-[#fd761a] transition-colors">info@vptrockenbau.de</a>
                  <a href="mailto:perevalovvasilii@gmail.com" className="text-xs text-[#45474c] lowercase font-semibold hover:text-[#fd761a] transition-colors">perevalovvasilii@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#091426] font-bold text-sm uppercase">
                <Phone className="w-5 h-5 text-[#fd761a]" />
                <a href="tel:+4915161559335" className="hover:text-[#fd761a] transition-colors">+49 (0) 151 61559335</a>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 bg-white border border-[#091426] p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="home-name" className="font-bold text-sm text-[#091426] uppercase">Name / Firma *</label>
                  <input
                    id="home-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-2 focus:ring-[#fd761a]/20 outline-none transition-all"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="home-email" className="font-bold text-sm text-[#091426] uppercase">E-Mail *</label>
                  <input
                    id="home-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-2 focus:ring-[#fd761a]/20 outline-none transition-all"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="home-service" className="font-bold text-sm text-[#091426] uppercase">Projektart</label>
                <div className="relative">
                  <select
                    id="home-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#fd761a] focus:ring-2 focus:ring-[#fd761a]/20 outline-none appearance-none rounded-none"
                  >
                    <option>Gewerblicher Innenausbau</option>
                    <option>Wohnungsbau (Großprojekt)</option>
                    <option>Spezial-Akustikbau</option>
                    <option>Sonstiges</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#091426]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-sm text-[#091426] uppercase">Upload (Pläne / LV)</span>
                <div className="border-2 border-dashed border-[#091426] bg-[#f5f3f4] hover:bg-[#eae7e9] transition-colors p-8 text-center cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-[#091426]" />
                  <span className="text-[#45474c] text-sm mt-2">Dateien hier ablegen oder klicken zum Auswählen</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#1e293b] text-white font-bold uppercase py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] transition-all hover:bg-[#fd761a] active:translate-y-1 mt-4 disabled:opacity-50 min-h-[58px]"
              >
                {isLoading ? 'Senden...' : 'Anfrage Senden'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}
