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
  Search
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

  // Fetch portfolio and submissions
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
        alert('Fehler beim Upload: ' + (data.error || 'Prüfen Sie Ihr Supabase Dashboard auf Storage Richtlinien.'));
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload-Verbindungsfehler.');
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
      alert('Bitte füllen Sie alle Pflichtfelder aus.');
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
        alert(isEditing ? 'Projekt erfolgreich aktualisiert!' : 'Projekt erfolgreich hinzugefügt!');
      } else {
        alert('Fehler beim Speichern: ' + (data.error || 'Prüfen Sie Ihre Serverkonfiguration.'));
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
        // Refresh project list to reflect changes immediately
        fetchProjects();
      }
    } catch (err) {
      console.error('Error reordering project:', err);
    }
  };

  // Delete project
  const deleteProject = async (id: string, name: string) => {
    if (!confirm(`Möchten Sie das Projekt "${name}" wirklich unwiderruflich löschen?`)) return;

    try {
      const res = await fetch(`/api/portfolio?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        fetchProjects();
        alert('Projekt erfolgreich gelöscht!');
      } else {
        alert('Fehler beim Löschen: ' + (data.error || 'Bitte prüfen Sie Ihre Zugriffsrechte.'));
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Verbindungsfehler beim Löschen.');
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
    if (!confirm('Möchten Sie diese Nachricht wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/submissions?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(prev => prev.filter(sub => sub.id !== id));
        setSelectedSubmission(null);
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
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 min-h-screen">
      {/* Top Banner */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border-4 border-[#091426] shadow-[6px_6px_0px_0px_#091426] p-6 md:p-8 relative">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#fd761a] border-2 border-[#091426] shadow-[2px_2px_0px_0px_#091426] flex items-center justify-center text-white font-bold text-xl uppercase">
            VP
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#091426] uppercase tracking-tight">
              VP<span className="text-[#fd761a]">Trockenbau</span> Dashboard
            </h1>
            <p className="text-xs font-bold text-[#45474c] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse inline-block" />
              Sicher verbunden mit Supabase
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => { fetchProjects(); fetchSubmissions(); }}
            className="p-3 border-2 border-[#091426] bg-[#fbf8fa] hover:bg-[#eae7e9] shadow-[2px_2px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center justify-center"
            title="Daten neu laden"
          >
            <RefreshCw className="w-5 h-5 text-[#091426]" />
          </button>
          
          <button 
            onClick={handleLogout}
            className="px-5 py-3 border-2 border-[#091426] bg-[#1e293b] hover:bg-[#fd761a] text-white font-bold uppercase shadow-[4px_4px_0px_0px_#091426] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center gap-2 text-sm"
          >
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      </header>

      {/* RLS/Service Role Warning Banner */}
      {serviceRoleWarning && (
        <div className="bg-[#fff9db] border-4 border-[#e0a800] text-[#091426] p-6 shadow-[6px_6px_0px_0px_#091426] flex flex-col md:flex-row items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-[#fd761a] shrink-0" />
          <div className="flex-1">
            <h3 className="font-black text-lg uppercase tracking-tight mb-1">Dienst-Rolle (Service Role Key) fehlt</h3>
            <p className="text-sm leading-relaxed text-[#45474c] font-medium">
              Es wurde kein <strong className="text-[#091426]">SUPABASE_SERVICE_ROLE_KEY</strong> in Ihrer <code className="bg-white/80 px-1 py-0.5 border border-[#eae7e9]">.env.local</code>-Datei konfiguriert oder das Laden schlug fehl. 
              Ohne diesen Schlüssel wird der Zugriff durch Row-Level-Security (RLS) verwehrt. 
              Sie können das Dashboard im schreibgeschützten Modus betrachten, können jedoch keine Daten speichern oder Formulare einsehen.
            </p>
            <div className="mt-3 text-xs font-bold uppercase text-[#091426]">
              👉 Holen Sie sich Ihren Schlüssel aus dem Supabase Dashboard unter: <strong>Project Settings &gt; API &gt; service_role (secret)</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Premium Statistics Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#fffbeb] border-4 border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-6 relative overflow-hidden group hover:shadow-[6px_6px_0px_0px_#fd761a] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#fef3c7] rounded-full translate-x-8 -translate-y-8 opacity-50 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#45474c] block mb-1">Referenzen</span>
          <span className="text-4xl font-black text-[#091426] block leading-none">{projects.length}</span>
          <span className="text-[11px] font-bold text-[#45474c] mt-2 block">Veröffentlichte Projekte</span>
        </div>

        <div className="bg-[#fef2f2] border-4 border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-6 relative overflow-hidden group hover:shadow-[6px_6px_0px_0px_#dc2626] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#fee2e2] rounded-full translate-x-8 -translate-y-8 opacity-50 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block mb-1">Neue Eingänge</span>
          <span className="text-4xl font-black text-[#091426] block leading-none">{unreadCount}</span>
          <span className="text-[11px] font-bold text-red-700 mt-2 block">Ungelesene Kundenanfragen</span>
        </div>

        <div className="bg-[#f0fdf4] border-4 border-[#091426] shadow-[4px_4px_0px_0px_#091426] p-6 relative overflow-hidden group hover:shadow-[6px_6px_0px_0px_#16a34a] transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#dcfce7] rounded-full translate-x-8 -translate-y-8 opacity-50 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 block mb-1">Erledigt</span>
          <span className="text-4xl font-black text-[#091426] block leading-none">{submissions.length - unreadCount}</span>
          <span className="text-[11px] font-bold text-emerald-800 mt-2 block">Gelesene und archivierte Kontakte</span>
        </div>
      </div>

      {/* Sub-Header Tabs */}
      <div className="flex gap-4 border-b-4 border-[#091426]">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-6 py-4 font-black uppercase text-sm md:text-base tracking-wider border-2 border-b-0 border-[#091426] cursor-pointer flex items-center gap-2 transition-all -mb-[4px] relative z-10 ${activeTab === 'portfolio' ? 'bg-[#fd761a] text-white border-b-white py-5 shadow-[4px_-2px_0px_0px_#091426]' : 'bg-white text-[#091426] hover:bg-[#eae7e9]'}`}
        >
          <FolderOpen className="w-5 h-5" /> Portfolio-Projekte
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-6 py-4 font-black uppercase text-sm md:text-base tracking-wider border-2 border-b-0 border-[#091426] cursor-pointer flex items-center gap-2 transition-all -mb-[4px] relative z-10 ${activeTab === 'submissions' ? 'bg-[#fd761a] text-white border-b-white py-5 shadow-[4px_-2px_0px_0px_#091426]' : 'bg-white text-[#091426] hover:bg-[#eae7e9]'}`}
        >
          <Mail className="w-5 h-5" /> Formular-Eingänge
          {unreadCount > 0 && (
            <span className="bg-[#091426] text-white px-2 py-0.5 rounded-full text-xs font-bold border border-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Area: Portfolio Manager */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Form Project */}
          <div className="lg:col-span-5 bg-white border-4 border-[#091426] shadow-[6px_6px_0px_0px_#091426] p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#fd761a]" />
            <h2 className="text-xl font-black text-[#091426] uppercase tracking-tight mb-6 pb-2 border-b-2 border-[#091426] flex items-center gap-2">
              {editingProjectId ? <Sparkles className="w-5 h-5 text-[#fd761a] animate-bounce" /> : <PlusCircle className="w-5 h-5 text-[#fd761a]" />}
              {editingProjectId ? 'Projekt bearbeiten' : 'Neues Projekt anlegen'}
            </h2>

            <form onSubmit={handleProjectSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="title">Titel des Projekts *</label>
                <input id="title" type="text" required value={formData.title} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white focus:ring-2 focus:ring-[#fd761a]/20 focus:border-[#fd761a]" placeholder="z.B. Bürogebäude Albertplatz" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="category">Kategorie *</label>
                  <select id="category" value={formData.category} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white rounded-none">
                    <option value="Gewerbe">Gewerbe</option>
                    <option value="Privat">Privat</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Gesundheit">Gesundheit</option>
                    <option value="Gastgewerbe">Gastgewerbe</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="q">Qualitätsstufe *</label>
                  <select id="q" value={formData.q} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white rounded-none">
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q2 (Akustik)">Q2 (Akustik)</option>
                    <option value="Q3">Q3</option>
                    <option value="Q3 (Hygiene)">Q3 (Hygiene)</option>
                    <option value="Q4">Q4</option>
                    <option value="Q4 (Höchste)">Q4 (Höchste)</option>
                    <option value="Q4 (Design)">Q4 (Design)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="area">Fläche *</label>
                  <input id="area" type="text" required value={formData.area} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white focus:border-[#fd761a]" placeholder="z.B. 1.200 m²" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="duration">Dauer *</label>
                  <input id="duration" type="text" required value={formData.duration} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white focus:border-[#fd761a]" placeholder="z.B. 4 Monate" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="client">Auftraggeber</label>
                  <input id="client" type="text" value={formData.client} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white" placeholder="z.B. Bau AG Dresden" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="location">Standort</label>
                  <input id="location" type="text" value={formData.location} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white" placeholder="z.B. Dresden Neustadt" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="testimonial">Kundenmeinung (Testimonial)</label>
                <textarea id="testimonial" value={formData.testimonial} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white min-h-[80px]" placeholder="Optionale Empfehlung oder Kundenbewertung..." />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#091426] uppercase" htmlFor="order_index">Sortierindex (Reihenfolge)</label>
                <input id="order_index" type="number" value={formData.order_index} onChange={handleFormChange} className="border-2 border-[#091426] bg-[#fbf8fa] p-2.5 outline-none font-medium focus:bg-white w-24" />
              </div>

              {/* Images Manager */}
              <div className="border-t-2 border-dashed border-[#eae7e9] pt-4 mt-1 flex flex-col gap-4">
                <label className="text-xs font-bold text-[#091426] uppercase">Projekt-Bilder ({formData.images.length})</label>
                
                {/* Images list thumbnail list */}
                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 p-2 bg-[#f5f3f4] border border-[#091426]">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-12 border border-[#091426] bg-white group">
                        <Image src={img} alt={`Thumb ${idx}`} fill sizes="64px" className="object-cover" />
                        <button type="button" onClick={() => removeImage(idx)} className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 border border-[#091426] shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload Area */}
                  <div className="relative border-2 border-dashed border-[#091426] hover:bg-[#fbf8fa] cursor-pointer flex flex-col items-center justify-center p-3 text-center min-h-[90px] transition-colors">
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-1">
                        <RefreshCw className="w-5 h-5 text-[#fd761a] animate-spin" />
                        <span className="text-[10px] font-bold uppercase">Lade hoch...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-[#091426] hover:text-[#fd761a]">
                        <FileUp className="w-5 h-5 text-[#091426]" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Bild hochladen</span>
                      </div>
                    )}
                  </div>

                  {/* Direct Image URL input */}
                  <div className="flex flex-col gap-1.5 justify-between">
                    <input type="text" placeholder="https://..." value={imageInput} onChange={(e) => setImageInput(e.target.value)} className="border border-[#091426] bg-[#fbf8fa] p-1.5 text-xs outline-none focus:bg-white" />
                    <button type="button" onClick={addImageUrl} className="w-full py-2 bg-[#eae7e9] hover:bg-[#091426] hover:text-white border border-[#091426] text-xs font-bold uppercase transition-colors cursor-pointer">
                      URL hinzufügen
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 border-t-2 border-[#091426] pt-5 mt-2">
                <button type="submit" disabled={submittingProject} className="flex-1 py-4 bg-[#fd761a] hover:bg-[#091426] text-white font-black uppercase text-xs tracking-wider border-2 border-[#091426] shadow-[3px_3px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-center min-h-[50px] flex items-center justify-center gap-2">
                  {submittingProject && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {editingProjectId ? 'Änderungen speichern' : 'Projekt veröffentlichen'}
                </button>
                {editingProjectId && (
                  <button type="button" onClick={clearForm} className="px-4 bg-white hover:bg-[#eae7e9] text-[#091426] font-black uppercase text-xs tracking-wider border-2 border-[#091426] shadow-[3px_3px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer">
                    Abbrechen
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Panel: Projects List Grid with Reordering */}
          <div className="lg:col-span-7 bg-white border-4 border-[#091426] shadow-[6px_6px_0px_0px_#091426] p-6">
            <h2 className="text-xl font-black text-[#091426] uppercase tracking-tight mb-6 pb-2 border-b-2 border-[#091426]">
              Aktuelle Referenzen ({projects.length})
            </h2>

            {loadingProjects ? (
              <div className="flex flex-col items-center justify-center p-12 gap-3 text-[#45474c]">
                <RefreshCw className="w-8 h-8 text-[#fd761a] animate-spin" />
                <p className="font-bold uppercase text-xs">Lade Projekte...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="border-2 border-dashed border-[#091426] p-12 text-center text-[#45474c]">
                Keine Projekte im System gefunden.
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[750px] overflow-y-auto pr-1">
                {projects.map((p) => {
                  const hasValidImages = p.images && p.images.length > 0;
                  const thumb = hasValidImages ? p.images[0] : null;
                  
                  return (
                    <div key={p.id || p.title} className="border-2 border-[#091426] p-4 bg-[#fbf8fa] shadow-[3px_3px_0px_0px_#091426] flex gap-4 hover:shadow-[4px_4px_0px_0px_#fd761a] hover:-translate-y-0.5 transition-all">
                      
                      {/* Left: Move up/down controllers */}
                      <div className="flex flex-col justify-center gap-1 shrink-0">
                        <button 
                          onClick={() => reorderProject(p, 'up')}
                          className="p-1 border border-[#091426] bg-white hover:bg-[#fd761a] hover:text-white transition-all cursor-pointer flex items-center justify-center rounded-sm"
                          title="Nach oben verschieben"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => reorderProject(p, 'down')}
                          className="p-1 border border-[#091426] bg-white hover:bg-[#fd761a] hover:text-white transition-all cursor-pointer flex items-center justify-center rounded-sm"
                          title="Nach unten verschieben"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Project Thumbnail Image */}
                      <div className="w-24 h-18 relative bg-[#eae7e9] border border-[#091426] overflow-hidden shrink-0">
                        {thumb ? (
                          <Image src={thumb} alt={p.title} fill className="object-cover" sizes="96px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-[#45474c] uppercase">Kein Bild</div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-black text-sm uppercase truncate text-[#091426]">{p.title}</h3>
                          <span className="text-[10px] font-extrabold uppercase bg-[#fd761a] text-white px-1.5 py-0.5 border border-[#091426]">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#45474c] mb-2 truncate">
                          {p.location || 'Ohne Standort'} | {p.q} | {p.area} | Reihenfolge: <strong>{p.order_index}</strong>
                        </p>
                        
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => startEditProject(p)} className="p-1.5 border border-[#091426] bg-white hover:bg-teal-50 text-[#091426] hover:text-[#fd761a] transition-all cursor-pointer rounded-sm" title="Bearbeiten">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProject(p.id, p.title)} className="p-1.5 border border-[#091426] bg-white hover:bg-red-50 text-red-600 hover:text-red-800 transition-all cursor-pointer rounded-sm" title="Löschen">
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

      {/* Tab Area: Submissions Inbox */}
      {activeTab === 'submissions' && (
        <div className="bg-white border-4 border-[#091426] shadow-[6px_6px_0px_0px_#091426] p-6 min-h-[500px]">
          {/* Filtering & Search Control Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-[#fbf8fa] border-2 border-[#091426] p-5 mb-6">
            <div className="flex flex-wrap gap-5 items-center flex-1">
              
              {/* Status Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase text-[#45474c] tracking-wider">Status Filter:</span>
                <div className="flex flex-wrap gap-1">
                  {(['all', 'new', 'read', 'archived'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setSubmissionFilter(status)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase border-2 transition-all cursor-pointer ${submissionFilter === status ? 'bg-[#091426] text-white border-[#091426]' : 'bg-white text-[#091426] border-[#091426]/30 hover:border-[#091426]'}`}
                    >
                      {status === 'all' ? 'Alle' : (status === 'new' ? 'Neu 🔴' : (status === 'read' ? 'Gelesen' : 'Archiviert'))}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block w-[1px] h-10 bg-[#eae7e9]" />

              {/* Form type Filter */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black uppercase text-[#45474c] tracking-wider">Formulartyp Filter:</span>
                <div className="flex flex-wrap gap-1">
                  {(['all', 'contact', 'callback', 'career'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSubmissionTypeFilter(type)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase border-2 transition-all cursor-pointer ${submissionTypeFilter === type ? 'bg-[#091426] text-white border-[#091426]' : 'bg-white text-[#091426] border-[#091426]/30 hover:border-[#091426]'}`}
                    >
                      {type === 'all' ? 'Alle' : (type === 'contact' ? 'Kontakt' : (type === 'callback' ? 'Rückruf' : 'Karriere'))}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Search & Refresh */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 w-full lg:w-auto">
              <div className="flex flex-col gap-1.5 flex-1 sm:w-64">
                <span className="text-[10px] font-black uppercase text-[#45474c] tracking-wider">Inhalten Suchen:</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#091426]">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Name, E-Mail, Text..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border-2 border-[#091426] outline-none text-xs font-bold tracking-tight focus:border-[#fd761a]"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#45474c] hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <button 
                onClick={fetchSubmissions}
                className="px-4 py-2.5 bg-white hover:bg-[#eae7e9] border-2 border-[#091426] text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Aktualisieren
              </button>
            </div>
          </div>

          {/* Submissions list container */}
          {loadingSubmissions ? (
            <div className="flex flex-col items-center justify-center p-16 gap-3 text-[#45474c]">
              <RefreshCw className="w-8 h-8 text-[#fd761a] animate-spin" />
              <p className="font-bold uppercase text-xs">Lade Nachrichten...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="border-2 border-dashed border-[#091426] p-16 text-center text-[#45474c] flex flex-col items-center gap-3">
              <Inbox className="w-10 h-10 text-[#c5c6cd]" />
              <div>Keine Nachrichten mit den ausgewählten Kriterien gefunden.</div>
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
                    className={`border-2 border-[#091426] p-5 flex flex-col justify-between bg-[#fbf8fa] shadow-[3px_3px_0px_0px_#091426] hover:shadow-[4px_4px_0px_0px_#fd761a] hover:-translate-y-0.5 transition-all cursor-pointer relative ${isNew ? 'bg-amber-50/40 border-l-4 border-l-amber-500' : ''}`}
                  >
                    <div>
                      {/* Top labels */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#45474c] bg-[#eae7e9] px-2 py-0.5 border border-[#091426]/10">
                          {sub.form_type === 'career' ? '💼 Karriere' : (sub.form_type === 'callback' ? '📞 Rückruf' : '✉️ Kontakt')}
                        </span>
                        
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 border ${isNew ? 'bg-red-50 text-red-600 border-red-200' : (isArchived ? 'bg-[#eae7e9] text-[#1e293b] border-[#091426]/20' : 'bg-white text-emerald-600 border-emerald-200')}`}>
                          {isNew ? 'Neu 🔴' : (isArchived ? 'Archiviert' : 'Gelesen')}
                        </span>
                      </div>

                      {/* Header details */}
                      <h3 className="font-black text-base text-[#091426] uppercase truncate mb-1">{sub.name}</h3>
                      <p className="text-xs font-semibold text-[#45474c] truncate mb-4">{sub.email}</p>

                      {/* Message snippet */}
                      {sub.message && (
                        <p className="text-xs font-medium text-[#45474c] line-clamp-3 bg-white p-2.5 border border-[#eae7e9] leading-relaxed mb-4">
                          {sub.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold text-[#45474c] mt-auto border-t border-[#eae7e9] pt-3">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {subDate}</span>
                      <span className="text-[#fd761a] hover:underline flex items-center gap-1 text-[10px] uppercase">
                        Anzeigen <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Expanded Submission Detail Popup Modal */}
      {selectedSubmission && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#091426]/90 backdrop-blur-sm"
          onClick={() => setSelectedSubmission(null)}
        >
          <div 
            className="bg-white border-4 border-[#091426] shadow-[8px_8px_0px_0px_#fd761a] w-full max-w-2xl p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button 
              onClick={() => setSelectedSubmission(null)} 
              className="absolute top-4 right-4 bg-white/90 p-1.5 border-2 border-[#091426] text-[#091426] hover:bg-[#fd761a] hover:text-white transition-all shadow-[2px_2px_0px_0px_#091426] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sub details */}
            <div className="flex items-center gap-3.5 mb-5">
              <span className="text-xs font-black uppercase tracking-widest bg-[#fd761a] text-white px-3 py-1 border-2 border-[#091426] shadow-[2px_2px_0px_0px_#091426]">
                {selectedSubmission.form_type === 'career' ? 'Karriere-Bewerbung' : (selectedSubmission.form_type === 'callback' ? 'Rückrufanforderung' : 'Kontaktanfrage')}
              </span>
              <span className="text-xs font-bold text-[#45474c]">
                {selectedSubmission.created_at ? new Date(selectedSubmission.created_at).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' }) : 'Unbekannt'}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-[#091426] uppercase mb-6 pb-2 border-b-2 border-[#091426]">
              {selectedSubmission.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm font-semibold border-b border-[#eae7e9] pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-[#45474c]">E-Mail-Adresse:</span>
                <a href={`mailto:${selectedSubmission.email}`} className="text-[#fd761a] hover:underline flex items-center gap-1 bg-[#fbf8fa] p-2 border border-[#eae7e9] truncate">
                  <Mail className="w-4 h-4 shrink-0" /> {selectedSubmission.email}
                </a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-[#45474c]">Telefonnummer:</span>
                {selectedSubmission.phone ? (
                  <a href={`tel:${selectedSubmission.phone}`} className="text-[#fd761a] hover:underline flex items-center gap-1 bg-[#fbf8fa] p-2 border border-[#eae7e9] truncate">
                    <Phone className="w-4 h-4 shrink-0" /> {selectedSubmission.phone}
                  </a>
                ) : (
                  <span className="text-[#45474c] italic bg-[#fbf8fa] p-2 border border-[#eae7e9]">Nicht angegeben</span>
                )}
              </div>

              {selectedSubmission.service && (
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <span className="text-[10px] uppercase font-bold text-[#45474c]">Gewerk / Gewünschte Leistung:</span>
                  <span className="bg-[#fbf8fa] p-2 border border-[#eae7e9] text-[#091426] font-extrabold uppercase text-xs">
                    🛠️ {selectedSubmission.service}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <span className="text-[10px] uppercase font-bold text-[#45474c] block mb-2">Nachricht:</span>
              <p className="bg-[#f5f3f4] border-2 border-[#091426] p-4 text-sm font-medium leading-relaxed whitespace-pre-wrap text-[#1b1b1d] max-h-[220px] overflow-y-auto">
                {selectedSubmission.message || 'Keine Nachricht übermittelt.'}
              </p>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-wrap gap-3 border-t-2 border-[#091426] pt-6 justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {selectedSubmission.status === 'new' && (
                  <button 
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'read')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase border-2 border-[#091426] shadow-[2px_2px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Als gelesen markieren
                  </button>
                )}
                {selectedSubmission.status !== 'archived' ? (
                  <button 
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'archived')}
                    className="px-4 py-2 bg-[#eae7e9] hover:bg-[#091426] hover:text-white text-[#091426] text-xs font-bold uppercase border-2 border-[#091426] shadow-[2px_2px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Archive className="w-4 h-4" /> Archivieren
                  </button>
                ) : (
                  <button 
                    onClick={() => updateSubmissionStatus(selectedSubmission.id, 'new')}
                    className="px-4 py-2 bg-[#eae7e9] hover:bg-[#fd761a] hover:text-white text-[#091426] text-xs font-bold uppercase border-2 border-[#091426] shadow-[2px_2px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" /> Als ungelesen markieren
                  </button>
                )}
              </div>

              <button 
                onClick={() => deleteSubmission(selectedSubmission.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase border-2 border-[#091426] shadow-[2px_2px_0px_0px_#091426] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export const dynamic = 'force-dynamic';
