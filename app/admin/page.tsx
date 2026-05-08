"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FolderOpen, 
  Mail, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  FileUp, 
  Check, 
  Archive, 
  Eye, 
  Phone, 
  ExternalLink, 
  MapPin, 
  Clock, 
  Sparkles,
  RefreshCw,
  X,
  PlusCircle,
  AlertTriangle,
  Inbox,
  ArrowUp,
  ArrowDown,
  Search,
  CheckCircle,
  HelpCircle,
  Briefcase,
  ChevronRight,
  User,
  Layout,
  MessageSquare,
  FileText
} from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  q: string;
  area: string;
  duration: string;
  client?: string;
  location?: string;
  testimonial?: string;
  images: string[];
  order_index: number;
  created_at?: string;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  form_type: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'submissions'>('portfolio');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [submittingProject, setSubmittingProject] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Search Submission Query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Service role check banner state
  const [serviceRoleWarning, setServiceRoleWarning] = useState(false);

  // Filter Submissions
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [submissionTypeFilter, setSubmissionTypeFilter] = useState<'all' | 'contact' | 'callback' | 'career'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Form project state (Handles BOTH create and edit)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Gewerbe',
    q: 'Q4',
    area: '',
    duration: '',
    client: '',
    location: '',
    testimonial: '',
    images: [] as string[],
    order_index: 0
  });
  
  // Image URL input field state
  const [imageInput, setImageInput] = useState('');

  // Fetch portfolio and submissions on load
  useEffect(() => {
    fetchProjects();
    fetchSubmissions();
  }, []);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const res = await fetch('/api/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
        setServiceRoleWarning(false);
      } else if (res.status === 401) {
        router.push('/admin/login');
      } else {
        setServiceRoleWarning(true);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setServiceRoleWarning(true);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm('Möchten Sie sich wirklich abmelden?')) return;
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Upload file handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    const file = files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/portfolio/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, data.url]
        }));
      } else {
        alert('Fehler beim Upload: ' + (data.error || 'Bitte prüfen Sie die Supabase-Einstellungen.'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Verbindungsfehler beim Hochladen.');
    } finally {
      setUploadingImage(false);
    }
  };

  const addImageUrl = () => {
    if (!imageInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageInput.trim()]
    }));
    setImageInput('');
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index)
    }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'order_index' ? parseInt(value) || 0 : value
    }));
  };

  const clearForm = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      category: 'Gewerbe',
      q: 'Q4',
      area: '',
      duration: '',
      client: '',
      location: '',
      testimonial: '',
      images: [],
      order_index: projects.length + 1
    });
    setImageInput('');
  };

  // Submit project (Save or Update)
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.q || !formData.area || !formData.duration) {
      alert('Bitte füllen Sie alle Pflichtfelder aus (Titel, Kategorie, Qualitätsstufe, Fläche, Dauer).');
      return;
    }

    setSubmittingProject(true);
    try {
      const isEditing = !!editingProjectId;
      const url = '/api/portfolio';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { id: editingProjectId, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        clearForm();
        fetchProjects();
        alert(isEditing ? '🎉 Projekt erfolgreich aktualisiert!' : '🎉 Neues Projekt erfolgreich veröffentlicht!');
      } else {
        alert('Fehler beim Speichern: ' + (data.error || 'Serverfehler.'));
      }
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Speicher-Verbindungsfehler.');
    } finally {
      setSubmittingProject(false);
    }
  };

  // Populate form for editing
  const startEditProject = (p: PortfolioProject) => {
    setEditingProjectId(p.id);
    setFormData({
      title: p.title,
      category: p.category,
      q: p.q,
      area: p.area,
      duration: p.duration,
      client: p.client || '',
      location: p.location || '',
      testimonial: p.testimonial || '',
      images: p.images || [],
      order_index: p.order_index || 0
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick reordering function
  const reorderProject = async (p: PortfolioProject, direction: 'up' | 'down') => {
    const change = direction === 'up' ? -1 : 1;
    const newIndex = Math.max(0, p.order_index + change);
    if (newIndex === p.order_index) return;

    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: p.id,
          title: p.title,
          category: p.category,
          q: p.q,
          area: p.area,
          duration: p.duration,
          client: p.client,
          location: p.location,
          testimonial: p.testimonial,
          images: p.images,
          order_index: newIndex
        }),
      });

      if (res.ok) {
        fetchProjects();
      }
    } catch (err) {
      console.error('Error reordering project:', err);
    }
  };

  // Delete project
  const deleteProject = async (id: string, name: string) => {
    if (!confirm(`⚠️ Möchten Sie das Projekt "${name}" wirklich für immer löschen? Diese Aktion kann nicht rückgängig gemacht werden.`)) return;

    try {
      const res = await fetch(`/api/portfolio?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        fetchProjects();
        alert('Projekt erfolgreich gelöscht!');
      } else {
        alert('Fehler beim Löschen: ' + (data.error || 'Zugriff verweigert.'));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Fehler beim Löschen.');
    }
  };

  // Patch submission status
  const updateSubmissionStatus = async (id: string, status: 'new' | 'read' | 'archived') => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(prev => 
          prev.map(sub => sub.id === id ? { ...sub, status } : sub)
        );
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission(prev => prev ? { ...prev, status } : null);
        }
      } else {
        alert('Status-Update fehlgeschlagen: ' + (data.error || 'Keine Berechtigung.'));
      }
    } catch (err) {
      console.error('Error patching status:', err);
    }
  };

  // Delete submission
  const deleteSubmission = async (id: string) => {
    if (!confirm('⚠️ Möchten Sie diese Kundenanfrage wirklich dauerhaft aus der Datenbank löschen?')) return;

    try {
      const res = await fetch(`/api/submissions?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        setSelectedSubmission(null);
        alert('Nachricht erfolgreich gelöscht.');
      } else {
        alert('Löschen fehlgeschlagen: ' + (data.error || 'Keine Berechtigung.'));
      }
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
  };

  // Filter & Search logic
  const filteredSubmissions = submissions.filter(sub => {
    const matchStatus = submissionFilter === 'all' || sub.status === submissionFilter;
    const matchType = submissionTypeFilter === 'all' || sub.form_type === submissionTypeFilter;
    const matchSearch = searchQuery === '' || 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (sub.message && sub.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.service && sub.service.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchStatus && matchType && matchSearch;
  });

  const unreadCount = submissions.filter(sub => sub.status === 'new').length;

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      
      {/* Upper Navigation Header bar */}
      <header className="sticky top-0 z-40 bg-[#091426] text-white border-b border-slate-800 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#fd761a] rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md tracking-wider">
              VP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold uppercase tracking-tight">
                  VP<span className="text-[#fd761a]">Trockenbau</span>
                </h1>
                <span className="bg-slate-800 text-[10px] font-black uppercase text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                  Manager 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Angemeldet als Administrator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a 
              href="https://vptrokenbau.de" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold uppercase tracking-wider rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> Webseite ansehen
            </a>

            <button 
              onClick={() => { fetchProjects(); fetchSubmissions(); }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-all"
              title="Daten neu laden"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
        
        {/* RLS / Service Role Warning Banner */}
        {serviceRoleWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Eingeschränkter Schreibschutz-Modus</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Der administrative Verbindungsschlüssel (<code className="bg-amber-100/50 px-1 py-0.5 rounded text-amber-800 font-mono text-[10px]">SUPABASE_SERVICE_ROLE_KEY</code>) fehlt in Ihren Server-Variablen. Sie können Daten einsehen, Änderungen können jedoch temporär nicht in die Datenbank zurückgeschrieben werden.
              </p>
            </div>
          </div>
        )}

        {/* Quick Premium Stats Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full translate-x-8 -translate-y-8 opacity-40 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Veröffentlichte Projekte</span>
              <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-[#fd761a]">
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-[#091426] block leading-none">{projects.length}</span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">Einträge im Online-Portfolio</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full translate-x-8 -translate-y-8 opacity-40 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-500">Neue Kundenanfragen</span>
              <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                <Mail className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <span className="text-3xl font-black text-red-600 block leading-none">{unreadCount}</span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">Ungelesene Posteingänge</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full translate-x-8 -translate-y-8 opacity-40 group-hover:scale-110 transition-transform duration-300" />
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Erledigte Anfragen</span>
              <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-emerald-600 block leading-none">{submissions.length - unreadCount}</span>
            <span className="text-xs font-medium text-slate-500 mt-1 block">Gelesene und archivierte Kontakte</span>
          </div>
        </div>

        {/* Tab Selection Area */}
        <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-sm flex gap-2">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 sm:flex-initial px-6 py-3.5 font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${activeTab === 'portfolio' ? 'bg-[#fd761a] text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <Briefcase className="w-4 h-4" /> Referenz-Projekte
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex-1 sm:flex-initial px-6 py-3.5 font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 relative ${activeTab === 'submissions' ? 'bg-[#fd761a] text-white shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
          >
            <MessageSquare className="w-4 h-4" /> Kunden-Eingänge
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: PORTFOLIO MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Step-by-Step Form Project */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  {editingProjectId ? <Edit2 className="w-4 h-4 text-[#fd761a]" /> : <Plus className="w-4 h-4 text-[#fd761a]" />}
                  {editingProjectId ? 'Projekt bearbeiten' : 'Neues Projekt hinzufügen'}
                </h2>
                {editingProjectId && (
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-amber-200">
                    Modus: Bearbeiten
                  </span>
                )}
              </div>

              <form onSubmit={handleProjectSubmit} className="flex flex-col gap-6">
                
                {/* Visual Step 1: Core details */}
                <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 space-y-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <span className="w-4 h-4 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-[9px] font-black">1</span>
                    Basis-Informationen
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700" htmlFor="title">Projekttitel (z.B. Schulbau oder Bürokomplex) *</label>
                    <input id="title" type="text" required value={formData.title} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] focus:ring-1 focus:ring-[#fd761a] rounded-xl p-2.5 text-xs font-semibold outline-none transition-all placeholder:text-slate-400" placeholder="z.B. Modernes Bürocenter Dresden" />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="category">Bereich *</label>
                      <select id="category" value={formData.category} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-2.5 text-xs font-bold outline-none cursor-pointer">
                        <option value="Gewerbe">🏢 Gewerbe</option>
                        <option value="Privat">🏠 Privat</option>
                        <option value="Industrie">🏭 Industrie</option>
                        <option value="Gesundheit">🏥 Gesundheit</option>
                        <option value="Gastgewerbe">🏨 Gastgewerbe</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5 relative group">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1" htmlFor="q">
                        Qualitätsstufe * 
                        <span title="Q1-Q4 Hilfe">
                          <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                        </span>
                      </label>
                      <select id="q" value={formData.q} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-2.5 text-xs font-bold outline-none cursor-pointer">
                        <option value="Q1">Q1 (Einfach)</option>
                        <option value="Q2">Q2 (Standard)</option>
                        <option value="Q3">Q3 (Erhöht)</option>
                        <option value="Q4">Q4 (Höchste / Premium)</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 leading-normal italic pl-5">
                    💡 **Q4** ist die höchste, makellose Qualitätsstufe für streiflichtfreie, edle Spachteloberflächen.
                  </div>
                </div>

                {/* Visual Step 2: Technical info */}
                <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 space-y-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <span className="w-4 h-4 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-[9px] font-black">2</span>
                    Technische Details
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="area">Projekt-Fläche *</label>
                      <input id="area" type="text" required value={formData.area} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-2.5 text-xs font-semibold outline-none" placeholder="z.B. 450 m²" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="duration">Arbeitszeit / Dauer *</label>
                      <input id="duration" type="text" required value={formData.duration} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-2.5 text-xs font-semibold outline-none" placeholder="z.B. 3 Wochen" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="client">Auftraggeber (Kunde)</label>
                      <input id="client" type="text" value={formData.client} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-semibold outline-none" placeholder="z.B. Wohnungsbau GmbH" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="location">Einsatzort (Standort)</label>
                      <input id="location" type="text" value={formData.location} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-semibold outline-none" placeholder="z.B. Dresden Neustadt" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="order_index">Reihenfolge (Index)</label>
                      <input id="order_index" type="number" value={formData.order_index} onChange={handleFormChange} className="w-24 bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none" />
                    </div>
                  </div>
                </div>

                {/* Visual Step 3: Media and Testimonial */}
                <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 space-y-4">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <span className="w-4 h-4 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center text-[9px] font-black">3</span>
                    Bilder & Feedback
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700" htmlFor="testimonial">Kundenbewertung / Zitat (optional)</label>
                    <textarea id="testimonial" value={formData.testimonial} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-semibold outline-none min-h-[70px]" placeholder="z.B. 'Hervorragende Qualität und pünktliche Fertigstellung...'" />
                  </div>

                  {/* Thumbnail list display */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-slate-700">Hochgeladene Bilder ({formData.images.length})</label>
                    {formData.images.length > 0 ? (
                      <div className="flex flex-wrap gap-2.5 p-2 bg-white border border-slate-100 rounded-xl">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative w-16 h-12 border border-slate-200 rounded-lg overflow-hidden shrink-0 group">
                            <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                            <button type="button" onClick={() => removeImage(idx)} className="absolute inset-0 bg-red-600/90 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Noch keine Bilder hinzugefügt.</span>
                    )}
                  </div>

                  {/* Modern Dropzone Box File Upload */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-6 relative border-2 border-dashed border-slate-200 hover:border-[#fd761a] bg-white rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer min-h-[90px] transition-all">
                      <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                      {uploadingImage ? (
                        <div className="flex flex-col items-center gap-1.5">
                          <RefreshCw className="w-5 h-5 text-[#fd761a] animate-spin" />
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Lade hoch...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#fd761a]">
                          <FileUp className="w-5 h-5 text-slate-400" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Bild vom PC</span>
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-6 flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Oder über URL hinzufügen:</span>
                      <input type="text" placeholder="https://..." value={imageInput} onChange={(e) => setImageInput(e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-[10px] outline-none" />
                      <button type="button" onClick={addImageUrl} className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-[10px] font-black uppercase text-slate-700 tracking-wider rounded-lg transition-colors cursor-pointer">
                        Hinzufügen
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form submit action buttons */}
                <div className="flex gap-3 border-t border-slate-100 pt-5">
                  <button type="submit" disabled={submittingProject} className="flex-1 py-3 bg-[#fd761a] hover:bg-[#091426] text-white font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow shadow-orange-500/10 hover:shadow-lg">
                    {submittingProject ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {editingProjectId ? 'Projekt aktualisieren' : 'Projekt veröffentlichen'}
                  </button>
                  {editingProjectId && (
                    <button type="button" onClick={clearForm} className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold uppercase text-xs tracking-wider rounded-xl transition-all">
                      Abbrechen
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Box: Clean, Beautiful References List Grid with tactile ordering */}
            <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-4 mb-6">
                Veröffentlichte Referenzen ({projects.length})
              </h2>

              {loadingProjects ? (
                <div className="flex flex-col items-center justify-center p-16 gap-3 text-slate-400">
                  <RefreshCw className="w-8 h-8 text-[#fd761a] animate-spin" />
                  <p className="font-bold uppercase text-[10px] tracking-widest">Lade Portfolio-Projekte...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="border-2 border-dashed border-slate-100 rounded-2xl p-16 text-center text-slate-400 flex flex-col items-center gap-3">
                  <FolderOpen className="w-10 h-10 text-slate-200" />
                  <div>Bisher wurden noch keine Referenzen angelegt. Nutzen Sie das Formular links!</div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 max-h-[780px] overflow-y-auto pr-1">
                  {projects.map((p) => {
                    const hasValidImages = p.images && p.images.length > 0;
                    const thumb = hasValidImages ? p.images[0] : null;
                    
                    return (
                      <div key={p.id} className="border border-slate-100 p-4 bg-[#f8fafc] rounded-xl flex gap-4 hover:border-slate-200 hover:bg-[#f1f5f9] transition-all group">
                        
                        {/* Tactile ordering controller triggers */}
                        <div className="flex flex-col justify-center gap-1 shrink-0">
                          <button 
                            onClick={() => reorderProject(p, 'up')}
                            className="p-1.5 bg-white hover:bg-[#fd761a] hover:text-white border border-slate-200 rounded-lg transition-all cursor-pointer text-slate-500"
                            title="Nach oben verschieben"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => reorderProject(p, 'down')}
                            className="p-1.5 bg-white hover:bg-[#fd761a] hover:text-white border border-slate-200 rounded-lg transition-all cursor-pointer text-slate-500"
                            title="Nach unten verschieben"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Project cover preview thumbnail */}
                        <div className="w-24 h-16 relative bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          {thumb ? (
                            <Image src={thumb} alt={p.title} fill className="object-cover" sizes="96px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase">Kein Bild</div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0 flex justify-between items-center gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <h3 className="font-bold text-sm text-[#091426] truncate">{p.title}</h3>
                              <span className="text-[9px] font-black uppercase bg-amber-50 text-[#fd761a] px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                                {p.category}
                              </span>
                              <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                                {p.q}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium truncate">
                              📍 {p.location || 'Ohne Standort'} | 📐 {p.area} | ⏱️ {p.duration}
                            </p>
                            <span className="text-[9px] text-slate-400 font-bold block mt-1 uppercase">
                              Sortierreihenfolge auf Webseite: <strong className="text-slate-600">{p.order_index}</strong>
                            </span>
                          </div>

                          <div className="flex gap-2 shrink-0">
                            <button onClick={() => startEditProject(p)} className="p-2 bg-white hover:bg-amber-500 border border-slate-200 hover:border-amber-500 text-slate-600 hover:text-white transition-all cursor-pointer rounded-lg shadow-sm" title="Bearbeiten">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteProject(p.id, p.title)} className="p-2 bg-white hover:bg-red-600 border border-slate-200 hover:border-red-600 text-red-500 hover:text-white transition-all cursor-pointer rounded-lg shadow-sm" title="Löschen">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: FORMS SUBMISSION INBOX */}
        {activeTab === 'submissions' && (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-4 mb-6">
              Kunden-Eingänge (E-Mails & Anfragen)
            </h2>

            {/* Advanced Filters & Real-time Inbox search bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-[#f8fafc] border border-slate-100 rounded-xl p-5 mb-8">
              
              {/* Category selector filter */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Nachrichten-Status:</span>
                <div className="flex flex-wrap gap-1">
                  {(['all', 'new', 'read', 'archived'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setSubmissionFilter(status)}
                      className={`px-3.5 py-2 text-xs font-bold uppercase rounded-lg transition-all border cursor-pointer ${submissionFilter === status ? 'bg-[#091426] text-white border-[#091426] shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'}`}
                    >
                      {status === 'all' ? 'Alle' : (status === 'new' ? 'Neu 🔴' : (status === 'read' ? 'Gelesen' : 'Archiviert'))}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form type selector filter */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Formular-Typ:</span>
                <div className="flex flex-wrap gap-1">
                  {(['all', 'contact', 'callback', 'career'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSubmissionTypeFilter(type)}
                      className={`px-3.5 py-2 text-xs font-bold uppercase rounded-lg transition-all border cursor-pointer ${submissionTypeFilter === type ? 'bg-[#091426] text-white border-[#091426] shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:text-slate-800'}`}
                    >
                      {type === 'all' ? 'Alle' : (type === 'contact' ? 'Kontakt' : (type === 'callback' ? 'Rückruf' : 'Karriere'))}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text search input */}
              <div className="lg:col-span-4 flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Inhalt filtern:</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Name, Gewerk, E-Mail suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl pl-10 pr-10 py-2 text-xs font-semibold outline-none transition-all"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Inbox ticket grid list */}
            {loadingSubmissions ? (
              <div className="flex flex-col items-center justify-center p-16 gap-3 text-slate-400">
                <RefreshCw className="w-8 h-8 text-[#fd761a] animate-spin" />
                <p className="font-bold uppercase text-[10px] tracking-widest">Lade Nachrichten...</p>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="border-2 border-dashed border-slate-100 rounded-2xl p-16 text-center text-slate-400 flex flex-col items-center gap-3">
                <Inbox className="w-10 h-10 text-slate-200" />
                <div>Keine Nachrichten mit diesen Filterkriterien vorhanden.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubmissions.map((sub) => {
                  const subDate = sub.created_at ? new Date(sub.created_at).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) : 'Unbekannt';
                  const isNew = sub.status === 'new';
                  const isArchived = sub.status === 'archived';
                  
                  return (
                    <div 
                      key={sub.id} 
                      onClick={() => setSelectedSubmission(sub)}
                      className={`border border-slate-100 p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all bg-white hover:border-[#fd761a]/30 hover:shadow-md relative ${isNew ? 'ring-1 ring-[#fd761a]/20 border-l-4 border-l-[#fd761a]' : ''}`}
                    >
                      <div>
                        {/* Upper info badges */}
                        <div className="flex items-center justify-between gap-2 mb-3.5">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                            {sub.form_type === 'career' ? '💼 Karriere' : (sub.form_type === 'callback' ? '📞 Rückruf' : '✉️ Kontakt')}
                          </span>
                          
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${isNew ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : (isArchived ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-emerald-50 text-emerald-600 border-emerald-100')}`}>
                            {isNew ? 'Neu 🔴' : (isArchived ? 'Archiv' : 'Gelesen')}
                          </span>
                        </div>

                        {/* Sender info */}
                        <h3 className="font-bold text-base text-slate-900 truncate mb-0.5">{sub.name}</h3>
                        <p className="text-xs font-semibold text-slate-400 truncate mb-4">{sub.email}</p>

                        {/* Content text snippet preview */}
                        {sub.message && (
                          <p className="text-xs font-medium text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed mb-4">
                            {sub.message}
                          </p>
                        )}
                      </div>

                      {/* Info footer line inside ticket */}
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mt-auto border-t border-slate-50 pt-3.5">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-300" /> {subDate}</span>
                        <span className="text-[#fd761a] hover:underline flex items-center gap-1 text-[10px] uppercase">
                          Öffnen <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Expanded Sliding Details Tray Modal for Submissions */}
      {selectedSubmission && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091426]/70 backdrop-blur-sm"
          onClick={() => setSelectedSubmission(null)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative border border-slate-100 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close modal button */}
            <button 
              onClick={() => setSelectedSubmission(null)} 
              className="absolute top-4 right-4 p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full transition-all cursor-pointer border border-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Sub title categories */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest bg-amber-50 text-[#fd761a] px-3 py-1 rounded-lg border border-amber-200">
                {selectedSubmission.form_type === 'career' ? 'Karriere-Bewerbung' : (selectedSubmission.form_type === 'callback' ? 'Rückrufanforderung' : 'Direkte Kontaktanfrage')}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedSubmission.created_at ? new Date(selectedSubmission.created_at).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' }) : 'Unbekannt'}
              </span>
            </div>

            {/* Customer name */}
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-6 border-b border-slate-100 pb-4">
              {selectedSubmission.name}
            </h2>

            {/* Detailed properties fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-1.5 bg-[#f8fafc] border border-slate-100 p-3 rounded-xl">
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">E-Mail-Adresse:</span>
                <a href={`mailto:${selectedSubmission.email}`} className="text-slate-800 hover:text-[#fd761a] font-bold text-sm flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" /> {selectedSubmission.email}
                </a>
              </div>
              
              <div className="flex flex-col gap-1.5 bg-[#f8fafc] border border-slate-100 p-3 rounded-xl">
                <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Telefonnummer:</span>
                {selectedSubmission.phone ? (
                  <a href={`tel:${selectedSubmission.phone}`} className="text-slate-800 hover:text-[#fd761a] font-bold text-sm flex items-center gap-2 truncate">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" /> {selectedSubmission.phone}
                  </a>
                ) : (
                  <span className="text-slate-400 italic text-xs">Keine Angabe</span>
                )}
              </div>

              {selectedSubmission.service && (
                <div className="flex flex-col gap-1.5 bg-[#f8fafc] border border-slate-100 p-3 rounded-xl sm:col-span-2">
                  <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Anfrage Gewerk / Gewünschte Leistung:</span>
                  <span className="text-[#091426] font-bold text-xs uppercase flex items-center gap-2">
                    🛠️ {selectedSubmission.service}
                  </span>
                </div>
              )}
            </div>

            {/* Message payload content block */}
            <div className="mb-8">
              <span className="text-[10px] uppercase font-black text-slate-400 block mb-2 tracking-wider">Übermittelte Nachricht:</span>
              <p className="bg-[#f8fafc] border border-slate-100 p-4 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-wrap text-slate-700 max-h-[200px] overflow-y-auto">
                {selectedSubmission.message || 'Keine Textnachricht übermittelt.'}
              </p>
            </div>

            {/* Ticket actions panel */}
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6 justify-between items-center">
              
              {/* Communication direct actions */}
              <div className="flex flex-wrap gap-2">
                <a 
                  href={`mailto:${selectedSubmission.email}?subject=Ihre Anfrage bei VpTrockenbau`} 
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" /> E-Mail schreiben
                </a>
                
                {selectedSubmission.phone && (
                  <a 
                    href={`tel:${selectedSubmission.phone}`} 
                    className="px-4 py-2 bg-[#fd761a] hover:bg-[#091426] text-white text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" /> Anrufen
                  </a>
                )}
              </div>

              {/* State updates actions */}
              <div className="flex flex-wrap gap-2">
                {selectedSubmission.status === 'new' && (
                  <button 
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'read')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Als gelesen markieren
                  </button>
                )}
                
                {selectedSubmission.status !== 'archived' ? (
                  <button 
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'archived')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Archive className="w-4 h-4" /> Archivieren
                  </button>
                ) : (
                  <button 
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'new')}
                    className="px-4 py-2 bg-slate-100 hover:bg-[#fd761a] hover:text-white text-slate-600 text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Reaktivieren
                  </button>
                )}

                <button 
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                  className="px-4 py-2 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white border border-red-100 hover:border-red-600 text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Löschen
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';
