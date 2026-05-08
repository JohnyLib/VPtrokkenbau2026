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
  FileText,
  Menu,
  ChevronLeft,
  Settings,
  Grid
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
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'project-form' | 'submissions'>('overview');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  const [submittingProject, setSubmittingProject] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Mobile sidebar menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search references & submissions Query
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
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
        setActiveTab('portfolio'); // Return back to the grid view
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

  // Populate form for editing and switch to form tab
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
    setActiveTab('project-form'); // Open dedicated form tab
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

  // Search & Filter Submissions
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

  // Search & Filter Projects (For Grid View)
  const filteredProjects = projects.filter(p => {
    const matchCategory = projectCategoryFilter === 'all' || p.category.toLowerCase() === projectCategoryFilter.toLowerCase();
    const matchSearch = projectSearchQuery === '' ||
      p.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(projectSearchQuery.toLowerCase())) ||
      p.q.toLowerCase().includes(projectSearchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const unreadCount = submissions.filter(sub => sub.status === 'new').length;
  const recentSubmissions = submissions.slice(0, 3); // Get top 3 for overview feed

  return (
    <div className="w-full bg-[#f1f5f9] min-h-screen text-slate-800 font-sans flex flex-col md:flex-row relative">
      
      {/* MOBILE HEADER BAR */}
      <div className="md:hidden w-full bg-[#091426] text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50 shadow">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#fd761a] rounded-lg flex items-center justify-center font-black text-white text-sm">VP</div>
          <span className="font-extrabold uppercase tracking-tight text-sm">VP<span className="text-[#fd761a]">Trockenbau</span></span>
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 bg-slate-800 rounded-lg text-slate-200 border border-slate-700"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* PERSISTENT LEFT SIDEBAR */}
      <aside className={`w-full md:w-[280px] bg-[#091426] text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800 md:sticky md:top-0 md:h-screen z-40 transition-all duration-300 absolute md:static ${mobileMenuOpen ? 'top-[52px] h-[calc(100vh-52px)] opacity-100' : 'top-0 h-0 overflow-hidden md:h-screen md:opacity-100 opacity-0'}`}>
        
        {/* Upper Brand Info */}
        <div className="p-6 border-b border-slate-800/60 hidden md:block">
          <div className="flex items-center gap-3.5 mb-2">
            <div className="w-9 h-9 bg-[#fd761a] rounded-xl flex items-center justify-center font-black text-white text-base shadow shadow-orange-500/20">
              VP
            </div>
            <div>
              <h1 className="text-md font-bold uppercase text-white tracking-tight leading-none">
                VP<span className="text-[#fd761a]">Trockenbau</span>
              </h1>
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                Management Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pl-0.5">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Verbunden mit Supabase</span>
          </div>
        </div>

        {/* Navigation Item Tabs */}
        <nav className="p-4 flex-1 flex flex-col gap-1 mt-4">
          <button
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            className={`w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'overview' ? 'bg-[#fd761a] text-white shadow-md' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-100'}`}
          >
            <Layout className="w-4.5 h-4.5 shrink-0" />
            <span>Dashboard-Übersicht</span>
          </button>

          <button
            onClick={() => { setActiveTab('portfolio'); setProjectCategoryFilter('all'); setMobileMenuOpen(false); }}
            className={`w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'portfolio' ? 'bg-[#fd761a] text-white shadow-md' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-100'}`}
          >
            <Grid className="w-4.5 h-4.5 shrink-0" />
            <span>Referenzen-Katalog</span>
          </button>

          <button
            onClick={() => { clearForm(); setActiveTab('project-form'); setMobileMenuOpen(false); }}
            className={`w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-3 cursor-pointer ${activeTab === 'project-form' ? 'bg-[#fd761a] text-white shadow-md' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-100'}`}
          >
            <PlusCircle className="w-4.5 h-4.5 shrink-0" />
            <span>{editingProjectId ? 'Projekt bearbeiten' : 'Neues Projekt'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('submissions'); setMobileMenuOpen(false); }}
            className={`w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${activeTab === 'submissions' ? 'bg-[#fd761a] text-white shadow-md' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-100'}`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4.5 h-4.5 shrink-0" />
              <span>Kunden-Eingänge</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#091426] shadow">
                {unreadCount}
              </span>
            )}
          </button>
        </nav>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-slate-800/60 flex flex-col gap-3.5 bg-slate-950/20">
          <div className="flex items-center gap-3 px-1.5">
            <div className="w-8 h-8 bg-slate-800 border border-slate-700 text-slate-300 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0">
              VP
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block truncate leading-none mb-1">Vasilii Perevalov</span>
              <span className="text-[9px] font-medium text-slate-500 block truncate">Administrator</span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2.5 bg-slate-800 hover:bg-red-600/10 hover:text-red-400 text-slate-400 font-bold uppercase text-[10px] tracking-widest rounded-xl transition-all border border-slate-700 hover:border-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Abmelden
          </button>
        </div>
      </aside>

      {/* DYNAMIC CONTENT CONTAINER (RIGHT PANE) */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        
        {/* TOP COMPONENT HEADER BAR */}
        <header className="bg-white border-b border-slate-200/80 px-6 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 hidden md:flex shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">DRESDEN HEHQ</span>
            <h2 className="text-lg font-extrabold text-[#091426] tracking-tight">
              {activeTab === 'overview' && '📊 Dashboard & Übersicht'}
              {activeTab === 'portfolio' && '📁 Referenzen-Katalog Grid'}
              {activeTab === 'project-form' && (editingProjectId ? '🛠️ Projekt-Daten bearbeiten' : '➕ Neues Portfolio-Projekt verfassen')}
              {activeTab === 'submissions' && '✉️ Kundenservice Nachrichten-Zentrale'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://vptrokenbau.de" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-[#fd761a] font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-200 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4" /> Live Webseite öffnen <ExternalLink className="w-3 h-3" />
            </a>
            
            <button 
              onClick={() => { fetchProjects(); fetchSubmissions(); }}
              className="p-2 text-slate-500 hover:text-[#091426] bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all"
              title="Aktualisieren"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* CORE WORKSPACE INNER CONTENT */}
        <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6">
          
          {/* RLS ALERT WARNING */}
          {serviceRoleWarning && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3.5 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Sicherheits-Einschränkung aktiv (Kein Secret Key)</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                  Das System läuft im Lese-Modus, da kein Administrationsschlüssel in der `.env.local` Datei hinterlegt wurde. Eingänge können gelesen, aber Portfolio-Referenzen können nicht gespeichert werden.
                </p>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
              
              {/* Hello Welcome message block */}
              <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-black text-[#091426] tracking-tight">Hallo Vasilii! 👋</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Hier ist die Übersicht über das VpTrockenbau Dresden Portal. Alle Angaben sind in Echtzeit synchronisiert.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('project-form')}
                  className="px-5 py-2.5 bg-[#fd761a] hover:bg-[#091426] text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow shadow-orange-500/10 transition-all flex items-center gap-1.5 cursor-pointer relative z-10"
                >
                  <Plus className="w-4.5 h-4.5" /> Neues Projekt anlegen
                </button>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-orange-500/5 to-transparent pointer-events-none hidden sm:block" />
              </div>

              {/* High-Fidelity Overview Statistics Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Projects Stats */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Aktive Referenzen</span>
                    <span className="text-xs text-emerald-500 bg-emerald-50 font-black px-2 py-0.5 rounded-full border border-emerald-100">Live</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#091426] leading-none">{projects.length}</span>
                    <span className="text-xs font-bold text-slate-400">Projekte</span>
                  </div>
                  {/* Decorative sparkline graph */}
                  <div className="mt-4 h-8 w-full flex items-end gap-1">
                    {[3, 4, 2, 5, 4, 6, 8, 7, 9, 8, 10, projects.length].map((val, idx) => (
                      <div key={idx} className="bg-[#fd761a]/15 group-hover:bg-[#fd761a]/30 rounded-t-sm flex-1 transition-colors" style={{ height: `${(val / 10) * 100}%` }} />
                    ))}
                  </div>
                </div>

                {/* Unread stats */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ungelesen</span>
                    {unreadCount > 0 ? (
                      <span className="text-xs text-red-500 bg-red-50 font-black px-2 py-0.5 rounded-full border border-red-100 animate-pulse">Neu</span>
                    ) : (
                      <span className="text-xs text-slate-400 bg-slate-50 font-black px-2 py-0.5 rounded-full border border-slate-100">Erledigt</span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-red-600 leading-none">{unreadCount}</span>
                    <span className="text-xs font-bold text-slate-400">Nachrichten</span>
                  </div>
                  {/* Decorative sparkline graph */}
                  <div className="mt-4 h-8 w-full flex items-end gap-1">
                    {[10, 8, 5, 7, 3, 4, 2, 3, 5, 4, 1, unreadCount].map((val, idx) => (
                      <div key={idx} className="bg-red-500/10 group-hover:bg-red-500/25 rounded-t-sm flex-1 transition-colors" style={{ height: `${(val / 10) * 100}%` }} />
                    ))}
                  </div>
                </div>

                {/* Submissions Stats */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Gesamteingänge</span>
                    <span className="text-xs text-slate-500 bg-slate-50 font-black px-2 py-0.5 rounded-full border border-slate-200">Datenbank</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#091426] leading-none">{submissions.length}</span>
                    <span className="text-xs font-bold text-slate-400">Kontakte</span>
                  </div>
                  {/* Decorative sparkline graph */}
                  <div className="mt-4 h-8 w-full flex items-end gap-1">
                    {[5, 7, 6, 9, 10, 12, 11, 14, 13, 15, 16, submissions.length].map((val, idx) => (
                      <div key={idx} className="bg-slate-300/40 group-hover:bg-slate-400/50 rounded-t-sm flex-1 transition-colors" style={{ height: `${(val / 20) * 100}%` }} />
                    ))}
                  </div>
                </div>

              </div>

              {/* Lower Section: Recent Messages Feed & Quick Links panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent submissions brief stream */}
                <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#091426] uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                      Letzte ungelöste Eingänge
                    </h4>
                    {loadingSubmissions ? (
                      <div className="flex justify-center py-10">
                        <RefreshCw className="w-6 h-6 text-[#fd761a] animate-spin" />
                      </div>
                    ) : submissions.filter(s => s.status === 'new').length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs italic flex flex-col items-center gap-2">
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                        <span>Keine neuen ungelesenen Nachrichten vorhanden! Tolle Arbeit.</span>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {submissions.filter(s => s.status === 'new').slice(0, 3).map((sub) => (
                          <div 
                            key={sub.id} 
                            onClick={() => { setSelectedSubmission(sub); setActiveTab('submissions'); }}
                            className="p-3.5 border border-slate-100 rounded-xl hover:border-[#fd761a]/30 hover:bg-slate-50 transition-all cursor-pointer flex justify-between items-center gap-3"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-xs text-[#091426]">{sub.name}</span>
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                                  {sub.form_type === 'callback' ? '📞 Rückruf' : (sub.form_type === 'career' ? '💼 Karriere' : '✉️ Kontakt')}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-semibold truncate max-w-[250px]">{sub.email}</p>
                            </div>
                            <span className="text-[10px] font-bold text-[#fd761a] flex items-center gap-1 shrink-0 uppercase">
                              Öffnen <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveTab('submissions')}
                    className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-wider transition-colors mt-4"
                  >
                    Alle Nachrichten einsehen
                  </button>
                </div>

                {/* Quick actions Panel widget */}
                <div className="lg:col-span-5 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#091426] uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                      Schnellzugriff & Verknüpfungen
                    </h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setActiveTab('project-form')}
                        className="w-full p-3 bg-slate-50 hover:bg-[#fd761a]/5 text-slate-700 hover:text-[#fd761a] rounded-xl border border-slate-100 hover:border-[#fd761a]/20 transition-all text-left text-xs font-bold flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#fd761a] flex items-center justify-center">
                          <Plus className="w-4.5 h-4.5" />
                        </div>
                        <span>Neues Portfolio-Projekt anlegen</span>
                      </button>

                      <button 
                        onClick={() => { setActiveTab('portfolio'); setProjectCategoryFilter('all'); }}
                        className="w-full p-3 bg-slate-50 hover:bg-[#fd761a]/5 text-slate-700 hover:text-[#fd761a] rounded-xl border border-slate-100 hover:border-[#fd761a]/20 transition-all text-left text-xs font-bold flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#fd761a] flex items-center justify-center">
                          <FolderOpen className="w-4.5 h-4.5" />
                        </div>
                        <span>Referenzen-Katalog sortieren & verwalten</span>
                      </button>

                      <a 
                        href="https://vptrokenbau.de" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full p-3 bg-slate-50 hover:bg-[#fd761a]/5 text-slate-700 hover:text-[#fd761a] rounded-xl border border-slate-100 hover:border-[#fd761a]/20 transition-all text-left text-xs font-bold flex items-center gap-3 cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#fd761a] flex items-center justify-center">
                          <ExternalLink className="w-4.5 h-4.5" />
                        </div>
                        <span>VP Trockenbau Hauptseite öffnen</span>
                      </a>
                    </div>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-3.5 mt-4 text-[11px] leading-relaxed text-slate-500 font-medium">
                    👋 **Tipp:** Wenn neue Nachrichten eintreffen, leuchtet das Badge neben **Kunden-Eingänge** im linken Menü rot auf.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO MAIN GRID OVERVIEW */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
              
              {/* Grid Filter Bar Header */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-extrabold uppercase text-slate-400 shrink-0">Filtern:</span>
                  <div className="flex flex-wrap gap-1">
                    {(['all', 'Gewerbe', 'Privat', 'Industrie', 'Gesundheit'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProjectCategoryFilter(cat)}
                        className={`px-3.5 py-1.5 text-xs font-extrabold uppercase rounded-lg border transition-all cursor-pointer ${projectCategoryFilter === cat ? 'bg-[#fd761a] text-white border-[#fd761a] shadow-sm shadow-orange-500/10' : 'bg-slate-50 text-slate-500 border-slate-200/60 hover:text-slate-800'}`}
                      >
                        {cat === 'all' ? 'Alle Referenzen' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text search for portfolio */}
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Suchen nach Titel, Ort, Stufe..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl text-xs font-semibold outline-none transition-all"
                  />
                  {projectSearchQuery && (
                    <button onClick={() => setProjectSearchQuery('')} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-red-500">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid content references */}
              {loadingProjects ? (
                <div className="flex flex-col items-center justify-center p-20 gap-3 text-slate-400 bg-white border border-slate-100 rounded-3xl">
                  <RefreshCw className="w-8 h-8 text-[#fd761a] animate-spin" />
                  <p className="font-bold uppercase text-[10px] tracking-widest">Lade Referenz-Katalog...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center text-slate-400 flex flex-col items-center gap-3 shadow-sm">
                  <FolderOpen className="w-12 h-12 text-slate-200" />
                  <div>Keine Referenzen mit den gewählten Filterkriterien gefunden.</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((p) => {
                    const hasValidImages = p.images && p.images.length > 0;
                    const coverImg = hasValidImages ? p.images[0] : null;

                    return (
                      <div key={p.id} className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between">
                        
                        {/* Upper image with custom tag overlays */}
                        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                          {coverImg ? (
                            <Image src={coverImg} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 350px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xs uppercase bg-slate-50">Kein Bild</div>
                          )}
                          
                          {/* Top gradient overlay */}
                          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                          
                          {/* Left upper category tags */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            <span className="text-[9px] font-black uppercase tracking-wider bg-orange-600 text-white px-2 py-0.5 rounded-md border border-orange-500 shadow-sm">
                              {p.category}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-wider bg-[#091426] text-white px-2 py-0.5 rounded-md border border-slate-800 shadow-sm">
                              {p.q}
                            </span>
                          </div>

                          {/* Right upper Order shifter control overlay */}
                          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <button 
                              onClick={() => reorderProject(p, 'up')}
                              className="p-1.5 bg-white hover:bg-[#fd761a] hover:text-white border border-slate-200 rounded-lg text-slate-600 shadow transition-colors cursor-pointer"
                              title="Reihenfolge nach oben verschieben"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => reorderProject(p, 'down')}
                              className="p-1.5 bg-white hover:bg-[#fd761a] hover:text-white border border-slate-200 rounded-lg text-slate-600 shadow transition-colors cursor-pointer"
                              title="Reihenfolge nach unten verschieben"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Card metadata body content details */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-extrabold text-sm sm:text-base text-[#091426] uppercase line-clamp-1 group-hover:text-[#fd761a] transition-colors">{p.title}</h3>
                              <span className="text-[10px] text-slate-400 font-extrabold shrink-0 uppercase tracking-widest mt-0.5">#{p.order_index}</span>
                            </div>

                            {/* Construction metrics */}
                            <div className="grid grid-cols-3 gap-2.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5 mb-4 text-[10px] font-bold text-slate-500">
                              <div className="text-center border-r border-slate-200/50">
                                <span className="block text-slate-400 uppercase text-[8px] mb-0.5 font-black">Fläche</span>
                                <span className="text-[#091426] font-black">{p.area || '-'}</span>
                              </div>
                              <div className="text-center border-r border-slate-200/50">
                                <span className="block text-slate-400 uppercase text-[8px] mb-0.5 font-black">Dauer</span>
                                <span className="text-[#091426] font-black">{p.duration || '-'}</span>
                              </div>
                              <div className="text-center">
                                <span className="block text-slate-400 uppercase text-[8px] mb-0.5 font-black">Ort</span>
                                <span className="text-[#091426] font-black truncate block">{p.location || 'Dresden'}</span>
                              </div>
                            </div>

                            {p.client && (
                              <p className="text-[11px] font-semibold text-slate-400 mb-4 flex items-center gap-1">
                                <span className="text-slate-300">Auftraggeber:</span> 
                                <strong className="text-slate-600">{p.client}</strong>
                              </p>
                            )}
                          </div>

                          {/* Quick active triggers footer */}
                          <div className="flex gap-2 border-t border-slate-100 pt-4 mt-auto">
                            <button 
                              onClick={() => startEditProject(p)}
                              className="flex-1 py-2 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-600 hover:text-amber-700 text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" /> Bearbeiten
                            </button>
                            <button 
                              onClick={() => deleteProject(p.id, p.title)}
                              className="px-3.5 py-2 bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-red-400 text-red-500 hover:text-red-600 text-xs font-bold rounded-xl transition-all flex items-center justify-center cursor-pointer"
                              title="Löschen"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DEDICATED FULL WIDTH PROJECT FORM */}
          {activeTab === 'project-form' && (
            <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-3 duration-200 space-y-6">
              
              {/* Back navigation header */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTab('portfolio')}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Zurück zum Grid
                </button>
                <span className="text-xs text-slate-400">/</span>
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{editingProjectId ? 'Projekt bearbeiten' : 'Neues Projekt verfassen'}</span>
              </div>

              {/* Main edit card container */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 sm:p-8">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-lg font-black text-[#091426] uppercase tracking-wide">
                    {editingProjectId ? '✏️ Projektdetails aktualisieren' : '➕ Neues Referenz-Projekt anlegen'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Geben Sie die Details Ihres Bauprojekts ein. Alle Pflichtfelder sind mit einem Stern markiert.</p>
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  
                  {/* Step 1: Core credentials */}
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 space-y-4">
                    <div className="text-[10px] font-black text-[#fd761a] uppercase tracking-widest flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 bg-orange-100 text-[#fd761a] rounded-lg flex items-center justify-center text-[10px] font-black">1</span>
                      Basis-Informationen des Bauvorhabens
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-slate-700" htmlFor="title">Projekttitel *</label>
                      <input id="title" type="text" required value={formData.title} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] focus:ring-1 focus:ring-[#fd761a] rounded-xl p-3 text-xs font-semibold outline-none transition-all placeholder:text-slate-400" placeholder="z.B. Innenausbau Einkaufszentrum Dresden" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700" htmlFor="category">Gewerk / Kategorie *</label>
                        <select id="category" value={formData.category} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-3 text-xs font-bold outline-none cursor-pointer">
                          <option value="Gewerbe">🏢 Gewerbebau / Büro</option>
                          <option value="Privat">🏠 Privatbau / Wohnung</option>
                          <option value="Industrie">🏭 Industrie / Lagerhallen</option>
                          <option value="Gesundheit">🏥 Gesundheit / Klinik</option>
                          <option value="Gastgewerbe">🏨 Gastronomie / Hotel</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1" htmlFor="q">
                          Spachtel-Qualitätsstufe *
                        </label>
                        <select id="q" value={formData.q} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-3 text-xs font-bold outline-none cursor-pointer">
                          <option value="Q1">Q1 (Einfache Verspachtelung für Fliesen)</option>
                          <option value="Q2">Q2 (Standardverspachtelung für Raufaser)</option>
                          <option value="Q3">Q3 (Erhöhte Anforderungen für feine Tapeten)</option>
                          <option value="Q4">Q4 (Höchste Qualitätsstufe für glatte Streiflichtwände)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Dimensions */}
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 space-y-4">
                    <div className="text-[10px] font-black text-[#fd761a] uppercase tracking-widest flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 bg-orange-100 text-[#fd761a] rounded-lg flex items-center justify-center text-[10px] font-black">2</span>
                      Technische Abmessungen & Termine
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700" htmlFor="area">Projekt-Gesamtfläche *</label>
                        <input id="area" type="text" required value={formData.area} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-3 text-xs font-semibold outline-none" placeholder="z.B. 1.200 m²" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700" htmlFor="duration">Durchführungszeit / Dauer *</label>
                        <input id="duration" type="text" required value={formData.duration} onChange={handleFormChange} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-3 text-xs font-semibold outline-none" placeholder="z.B. 6 Wochen" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700" htmlFor="client">Auftraggeber (Kunde)</label>
                        <input id="client" type="text" value={formData.client} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none" placeholder="z.B. Hochtief GmbH" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700" htmlFor="location">Einsatzort (Stadt / Stadtteil)</label>
                        <input id="location" type="text" value={formData.location} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none" placeholder="z.B. Dresden Altstadt" />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-extrabold text-slate-700" htmlFor="order_index">Sortierindex (Reihenfolge)</label>
                        <input id="order_index" type="number" value={formData.order_index} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Media */}
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 space-y-4">
                    <div className="text-[10px] font-black text-[#fd761a] uppercase tracking-widest flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 bg-orange-100 text-[#fd761a] rounded-lg flex items-center justify-center text-[10px] font-black">3</span>
                      Visualisierungen, Bilder & Kundenmeinung
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-slate-700" htmlFor="testimonial">Kundenbewertung / O-Ton (optional)</label>
                      <textarea id="testimonial" value={formData.testimonial} onChange={handleFormChange} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none min-h-[80px]" placeholder="z.B. 'Exzellente Trockenbauwände, absolut sauber gespachtelt...'" />
                    </div>

                    {/* Image uploads preview */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold text-slate-700">Hochgeladene Referenzfotos ({formData.images.length})</label>
                      {formData.images.length > 0 ? (
                        <div className="flex flex-wrap gap-3 p-3 bg-white border border-slate-100 rounded-xl">
                          {formData.images.map((img, idx) => (
                            <div key={idx} className="relative w-20 h-16 border border-slate-200 rounded-lg overflow-hidden shrink-0 group shadow-sm">
                              <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
                              <button 
                                type="button" 
                                onClick={() => removeImage(idx)} 
                                className="absolute inset-0 bg-red-600/95 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer rounded-lg"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Noch keine Projektabbildungen vorhanden. Bitte laden Sie Fotos hoch.</span>
                      )}
                    </div>

                    {/* File Dropzone */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-6 relative border-2 border-dashed border-slate-200 hover:border-[#fd761a] bg-white rounded-2xl flex flex-col items-center justify-center p-5 text-center cursor-pointer min-h-[110px] transition-all">
                        <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploadingImage} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                        {uploadingImage ? (
                          <div className="flex flex-col items-center gap-1.5">
                            <RefreshCw className="w-6 h-6 text-[#fd761a] animate-spin" />
                            <span className="text-[11px] font-black text-slate-500 uppercase">Foto wird hochgeladen...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#fd761a]">
                            <FileUp className="w-6 h-6 text-slate-400" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Bild von Festplatte wählen</span>
                          </div>
                        )}
                      </div>

                      <div className="sm:col-span-6 flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">Oder über direkte Bild-URL:</span>
                        <input type="text" placeholder="https://..." value={imageInput} onChange={(e) => setImageInput(e.target.value)} className="w-full bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl p-2.5 text-xs outline-none" />
                        <button type="button" onClick={addImageUrl} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold uppercase text-slate-700 tracking-wider rounded-xl transition-colors cursor-pointer">
                          URL hinzufügen
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Submission panels controls */}
                  <div className="flex gap-4 border-t border-slate-100 pt-6">
                    <button type="submit" disabled={submittingProject} className="flex-1 py-3.5 bg-[#fd761a] hover:bg-[#091426] text-white font-extrabold uppercase text-xs tracking-wider rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-orange-500/10 hover:shadow-md">
                      {submittingProject ? <RefreshCw className="w-4.5 h-4.5 animate-spin" /> : <Sparkles className="w-4.5 h-4.5" />}
                      {editingProjectId ? 'Projektänderungen sichern' : 'Referenzprojekt veröffentlichen'}
                    </button>
                    <button type="button" onClick={() => { clearForm(); setActiveTab('portfolio'); }} className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold uppercase text-xs tracking-wider rounded-2xl transition-all">
                      Abbrechen & Schließen
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}

          {/* TAB 4: CLIENT SUBMISSIONS DUAL PANE CENTER */}
          {activeTab === 'submissions' && (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col lg:flex-row h-[780px] animate-in fade-in slide-in-from-bottom-3 duration-200">
              
              {/* Left Column Pane: Message Ticketing scroll list */}
              <div className="w-full lg:w-[420px] shrink-0 border-r border-slate-100 flex flex-col h-full bg-[#f8fafc]">
                
                {/* Upper search & Filter bar inside pane */}
                <div className="p-4 border-b border-slate-100 bg-white space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Posteingang filtern..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#fd761a] rounded-xl text-xs font-semibold outline-none transition-all"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Filters selector scroll lists inside panel */}
                  <div className="flex gap-2 overflow-x-auto pb-1 select-none">
                    {(['all', 'new', 'read', 'archived'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setSubmissionFilter(st)}
                        className={`px-3 py-1 bg-white hover:bg-slate-50 border rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${submissionFilter === st ? 'border-[#fd761a] text-[#fd761a] bg-orange-50/20' : 'border-slate-200 text-slate-400'}`}
                      >
                        {st === 'all' ? 'Alle' : (st === 'new' ? 'Neu 🔴' : (st === 'read' ? 'Gelesen' : 'Archiv'))}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vertical scroll list of submissions */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                  {loadingSubmissions ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-2 text-slate-400">
                      <RefreshCw className="w-6 h-6 text-[#fd761a] animate-spin" />
                      <span className="text-[10px] font-bold uppercase">Lade Posteingang...</span>
                    </div>
                  ) : filteredSubmissions.length === 0 ? (
                    <div className="text-center text-slate-400 text-xs italic py-16 flex flex-col items-center gap-2">
                      <Inbox className="w-8 h-8 text-slate-200" />
                      <span>Keine passenden Anfragen vorhanden.</span>
                    </div>
                  ) : (
                    filteredSubmissions.map((sub) => {
                      const isSelected = selectedSubmission && selectedSubmission.id === sub.id;
                      const isNew = sub.status === 'new';
                      const isArchived = sub.status === 'archived';
                      const formattedDate = sub.created_at ? new Date(sub.created_at).toLocaleString('de-DE', { dateStyle: 'short' }) : '-';

                      return (
                        <div 
                          key={sub.id}
                          onClick={() => setSelectedSubmission(sub)}
                          className={`p-3.5 border rounded-xl cursor-pointer transition-all flex flex-col justify-between gap-1.5 ${isSelected ? 'bg-[#fd761a]/10 border-[#fd761a]/50 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                {sub.form_type === 'career' ? '💼 Karriere' : (sub.form_type === 'callback' ? '📞 Rückruf' : '✉️ Kontakt')}
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> {formattedDate}</span>
                            </div>

                            <h4 className="font-bold text-xs text-[#091426] truncate flex items-center gap-1.5">
                              {isNew && <span className="w-2 h-2 bg-[#fd761a] rounded-full shrink-0" />}
                              {sub.name}
                            </h4>
                            <p className="text-[10px] font-medium text-slate-400 truncate mt-0.5">{sub.email}</p>
                          </div>

                          {sub.message && (
                            <p className="text-[10px] font-semibold text-slate-500 line-clamp-2 bg-slate-50 border border-slate-100 rounded-lg p-2 leading-relaxed">
                              {sub.message}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column Pane: Submission full content detail reader panel */}
              <div className="flex-1 flex flex-col h-full bg-white relative">
                {selectedSubmission ? (
                  <div className="p-6 md:p-8 flex flex-col h-full justify-between overflow-y-auto">
                    
                    {/* Header profile info */}
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm uppercase shrink-0 border border-slate-200/50">
                            {selectedSubmission.name.substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-black text-[#091426] uppercase">{selectedSubmission.name}</h3>
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mt-0.5">
                              Eingang: {selectedSubmission.created_at ? new Date(selectedSubmission.created_at).toLocaleString('de-DE', { dateStyle: 'full', timeStyle: 'short' }) : 'Unbekannt'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-black uppercase tracking-widest bg-orange-50 text-[#fd761a] px-2.5 py-1 rounded-md border border-orange-200">
                            {selectedSubmission.form_type === 'career' ? 'Karriere' : (selectedSubmission.form_type === 'callback' ? 'Rückrufanforderung' : 'Kontakt')}
                          </span>
                        </div>
                      </div>

                      {/* Contact fields details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1.5">
                          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">E-Mail-Adresse:</span>
                          <a href={`mailto:${selectedSubmission.email}`} className="text-slate-800 hover:text-[#fd761a] font-extrabold text-xs sm:text-sm flex items-center gap-2 truncate">
                            <Mail className="w-4 h-4 text-slate-400 shrink-0" /> {selectedSubmission.email}
                          </a>
                        </div>
                        
                        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col gap-1.5">
                          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Telefonnummer:</span>
                          {selectedSubmission.phone ? (
                            <a href={`tel:${selectedSubmission.phone}`} className="text-slate-800 hover:text-[#fd761a] font-extrabold text-xs sm:text-sm flex items-center gap-2 truncate">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0" /> {selectedSubmission.phone}
                            </a>
                          ) : (
                            <span className="text-slate-400 italic text-xs">Keine Angabe</span>
                          )}
                        </div>

                        {selectedSubmission.service && (
                          <div className="bg-[#fd761a]/5 border border-[#fd761a]/10 p-3.5 rounded-xl flex flex-col gap-1.5 sm:col-span-2">
                            <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Gewünschte Leistung / Gewerk:</span>
                            <span className="text-[#091426] font-extrabold text-xs uppercase flex items-center gap-2">
                              🛠️ {selectedSubmission.service}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Message content view */}
                      <div>
                        <span className="text-[10px] uppercase font-black text-slate-400 block mb-2 tracking-wider">Kundennachricht:</span>
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-wrap text-slate-700 max-h-[220px] overflow-y-auto">
                          {selectedSubmission.message || 'Keine Nachricht übermittelt.'}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons triggers */}
                    <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6 justify-between items-center mt-6">
                      
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href={`mailto:${selectedSubmission.email}?subject=Ihre Anfrage bei VpTrockenbau`} 
                          className="px-4 py-2 bg-[#091426] hover:bg-[#fd761a] text-white text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Mail className="w-4 h-4" /> E-Mail schreiben
                        </a>
                        
                        {selectedSubmission.phone && (
                          <a 
                            href={`tel:${selectedSubmission.phone}`} 
                            className="px-4 py-2 bg-orange-50 hover:bg-[#fd761a]/10 text-[#fd761a] text-xs font-bold uppercase rounded-xl transition-all border border-orange-200/50 flex items-center gap-1.5"
                          >
                            <Phone className="w-4 h-4" /> Anrufen
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.status === 'new' && (
                          <button 
                            onClick={() => updateSubmissionStatus(selectedSubmission.id, 'read')}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm shadow-emerald-500/10"
                          >
                            <Check className="w-4 h-4" /> Gelesen
                          </button>
                        )}
                        
                        {selectedSubmission.status !== 'archived' ? (
                          <button 
                            onClick={() => updateSubmissionStatus(selectedSubmission.id, 'archived')}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                          >
                            <Archive className="w-4 h-4" /> Archivieren
                          </button>
                        ) : (
                          <button 
                            onClick={() => updateSubmissionStatus(selectedSubmission.id, 'new')}
                            className="px-4 py-2 bg-slate-100 hover:bg-[#fd761a] hover:text-white text-slate-600 text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-4 h-4" /> Reaktivieren
                          </button>
                        )}

                        <button 
                          onClick={() => deleteSubmission(selectedSubmission.id)}
                          className="px-4 py-2 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white border border-red-100 hover:border-red-600 text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" /> Löschen
                        </button>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center gap-3">
                    <Inbox className="w-12 h-12 text-slate-200" />
                    <div className="max-w-xs text-xs font-semibold leading-normal">
                      Wählen Sie ein Ticket oder eine Nachricht aus der linken Spalte aus, um die vollständigen Kontaktdaten und Anfragen einzusehen.
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export const dynamic = 'force-dynamic';
