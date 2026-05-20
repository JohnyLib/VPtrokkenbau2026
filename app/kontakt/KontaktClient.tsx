"use client";

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { SuccessPopup } from '@/components/ui/SuccessPopup';

export function KontaktClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Trockenbau',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Bitte füllen Sie alle Pflichtfelder (*) aus.');
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
          ...formData,
          formType: 'contact'
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsPopupOpen(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Trockenbau',
          message: ''
        });
        // Clear privacy checkbox if present
        const privacyCheck = document.getElementById('privacy') as HTMLInputElement;
        if (privacyCheck) privacyCheck.checked = false;
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
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-12 flex flex-col gap-12">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#091426] uppercase tracking-tight">Kontaktieren Sie uns</h1>
        <p className="text-lg text-[#45474c]">
          Wir sind Ihr zuverlässiger Partner für Trockenbau-Projekte in Dresden und Ostsachsen. Nutzen Sie unser Kontaktformular oder rufen Sie uns direkt an.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#091426] uppercase border-b-2 border-[#091426] pb-2">Standort Dresden</h3>
            
            <div className="flex gap-4 items-start">
              <MapPin className="w-6 h-6 text-[#2563eb] shrink-0" />
              <div>
                <strong className="block text-[#091426] uppercase text-sm">Adresse</strong>
                <span className="text-[#45474c]">Königsbrücker Landstraße 54<br />01109 Dresden<br />Deutschland</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="w-6 h-6 text-[#2563eb] shrink-0" />
              <div>
                <strong className="block text-[#091426] uppercase text-sm">Telefon</strong>
                <a href="tel:+4915161559335" className="text-[#45474c] hover:text-[#2563eb] transition-colors">+49 (0) 151 61559335</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="w-6 h-6 text-[#2563eb] shrink-0" />
              <div className="flex flex-col gap-1">
                <strong className="block text-[#091426] uppercase text-sm">E-Mail</strong>
                <a href="mailto:info@vptrockenbau.de" className="text-[#45474c] hover:text-[#2563eb] transition-colors">info@vptrockenbau.de</a>
                <a href="mailto:perevalovvasilii@gmail.com" className="text-xs text-[#45474c] font-semibold hover:text-[#2563eb] transition-colors lowercase">perevalovvasilii@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="w-6 h-6 text-[#2563eb] shrink-0" />
              <div>
                <strong className="block text-[#091426] uppercase text-sm">Öffnungszeiten</strong>
                <span className="text-[#45474c]">Mo. - Fr.: 07:00 - 18:00 Uhr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white border border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-8 md:p-12">
          <h2 className="text-2xl font-bold text-[#091426] uppercase mb-6">Schreiben Sie uns</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="name">Name / Firma *</label>
                <input id="name" required value={formData.name} onChange={handleChange} autoComplete="name" className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="email">E-Mail *</label>
                <input id="email" required value={formData.email} onChange={handleChange} autoComplete="email" className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all" type="email" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="phone">Telefon</label>
                <input id="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all" type="tel" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="service">Gewerk</label>
                <div className="relative">
                  <select id="service" value={formData.service} onChange={handleChange} className="w-full border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none appearance-none rounded-none transition-all">
                    <option>Trockenbau</option>
                    <option>Spachtelarbeiten (Q1-Q4)</option>
                    <option>Gipskartonmontage</option>
                    <option>Akustikbau</option>
                    <option>Dachausbau</option>
                    <option>Sonstiges</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#091426]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-[#091426] uppercase" htmlFor="message">Ihre Nachricht *</label>
              <textarea id="message" required value={formData.message} onChange={handleChange} className="border border-[#091426] bg-[#fbf8fa] p-3 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none min-h-[150px] resize-y transition-all"></textarea>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" id="privacy" required className="mt-1 w-4 h-4 accent-[#2563eb]" />
              <label htmlFor="privacy" className="text-sm text-[#45474c] cursor-pointer selection:bg-[#2563eb]/25">
                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert und verarbeitet werden dürfen. *
              </label>
            </div>

            <button type="submit" disabled={isLoading} className="bg-[#1e293b] text-white font-bold uppercase py-4 border border-[#091426] shadow-[4px_4px_0px_0px_#091426] hover:bg-[#2563eb] active:translate-y-1 transition-all mt-4 w-full md:w-auto md:px-12 self-start disabled:opacity-50 min-h-[58px]">
              {isLoading ? 'Senden...' : 'Nachricht Senden'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="w-full h-[400px] border border-[#091426] shadow-[4px_4px_0px_0px_#091426] bg-[#eae7e9] flex items-center justify-center p-8 text-center text-[#45474c]">
         <p>Hier könnte eine interaktive Karte von Dresden (z.B. Google Maps) eingebunden werden.<br/>Aus Datenschutzgründen derzeit als statischer Platzhalter.</p>
      </div>

      <SuccessPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
