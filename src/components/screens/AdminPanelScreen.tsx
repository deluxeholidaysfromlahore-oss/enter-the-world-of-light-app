import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Video,
  Film,
  Feather,
  BookOpen,
  GraduationCap,
  HelpCircle,
  FolderKanban,
  Star,
  Calendar,
  Users,
  Bell,
  BarChart3,
  Bot,
  Palette,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Edit,
  Shield,
  ArrowUpRight,
  RefreshCw,
  Youtube,
  Database,
  Key,
  Globe,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { fetchIntegrationAudit } from '../../services/contentService';
import { IntegrationAuditReport } from '../../types';
import {
  fetchBloggerRecords,
  saveBloggerRecord,
  generateBloggerPageHtml,
  generateBloggerPostHtml,
} from '../../services/bloggerService';
import { BloggerItemRecord } from '../../types';
import { MarketingManagerWorkspace } from '../admin/MarketingManagerWorkspace';
import { SeoCommandCenter } from '../admin/SeoCommandCenter';

export const AdminPanelScreen: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('Auto SEO & Discovery');
  const [bloggerSubView, setBloggerSubView] = useState<'marketing' | 'classic'>('marketing');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [auditReport, setAuditReport] = useState<IntegrationAuditReport | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bloggerRecords, setBloggerRecords] = useState<BloggerItemRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadAudit = async () => {
    setIsVerifying(true);
    try {
      const data = await fetchIntegrationAudit();
      setAuditReport(data);
    } catch (e) {
      console.warn('Failed to load live audit:', e);
    } finally {
      setIsVerifying(false);
    }
  };

  const loadBlogger = async () => {
    try {
      const records = await fetchBloggerRecords();
      setBloggerRecords(records);
    } catch (e) {
      console.warn('Failed to load blogger records:', e);
    }
  };

  useEffect(() => {
    loadAudit();
    loadBlogger();
  }, []);

  const sections = [
    { label: 'Auto SEO & Discovery', icon: Sparkles },
    { label: 'Google Blogger Engine', icon: Globe },
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Integrations & APIs', icon: Key },
    { label: 'Content', icon: FileText },
    { label: 'Videos', icon: Video },
    { label: 'Shorts', icon: Film },
    { label: 'Poetry', icon: Feather },
    { label: 'Stories', icon: BookOpen },
    { label: 'Lessons', icon: GraduationCap },
    { label: 'Quizzes', icon: HelpCircle },
    { label: 'Collections', icon: FolderKanban },
    { label: 'Featured Content', icon: Star },
    { label: 'Daily Content', icon: Calendar },
    { label: 'Users', icon: Users },
    { label: 'Notifications', icon: Bell },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'AI Settings', icon: Bot },
    { label: 'Theme Settings', icon: Palette },
    { label: 'App Settings', icon: Settings },
  ];

  const contentRows = [
    {
      id: 'CNT-101',
      title: 'Sitaron Se Aage Jahan Aur Bhi Hain',
      section: 'Poetry',
      status: 'Published',
      language: 'Urdu / English',
      views: '14,200',
      date: 'Sep 24, 2026',
    },
    {
      id: 'CNT-102',
      title: 'The Great Solar System Expedition',
      section: 'Lessons',
      status: 'Published',
      language: 'English',
      views: '8,400',
      date: 'Sep 23, 2026',
    },
    {
      id: 'CNT-103',
      title: 'The Brave Little Firefly’s Lantern',
      section: 'Stories',
      status: 'Published',
      language: 'Bilingual',
      views: '19,800',
      date: 'Sep 21, 2026',
    },
    {
      id: 'CNT-104',
      title: 'Planets & Cosmos Speed Quiz',
      section: 'Quizzes',
      status: 'Draft',
      language: 'English',
      views: '—',
      date: 'Sep 25, 2026',
    },
    {
      id: 'CNT-105',
      title: 'Mental Math Hack: Multiply by 11',
      section: 'Shorts',
      status: 'Published',
      language: 'English',
      views: '32,100',
      date: 'Sep 20, 2026',
    },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Admin Notice */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              Platform Administration Console
            </h2>
            <p className="text-xs text-slate-400">
              Phase 1 Design Architecture • Ready for future Firebase / API bindings
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mobile/Tablet Horizontal Scrollable Module Bar (Visible below lg) */}
      <div className="lg:hidden bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1.5 flex items-center justify-between">
          <span>Admin Modules</span>
          <span className="text-sky-600 font-semibold">{activeSection}</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.label;

            return (
              <button
                key={sec.label}
                onClick={() => setActiveSection(sec.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Grid (Sidebar + Content Workspace) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desktop Sidebar Navigation (Hidden on mobile/tablet, shown on lg) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-3 rounded-3xl border border-slate-200/80 shadow-xs h-fit sticky top-36">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Management Modules
          </div>

          <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.label;

              return (
                <button
                  key={sec.label}
                  onClick={() => setActiveSection(sec.label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-sky-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Workspace Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Real API Activation & Verification Audit (MASTER IMPLEMENTATION AUDIT) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-600" />
                  <span>Real Backend & API Integration Audit</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Live verification status for Firebase, Firestore, Authentication, Gemini AI, and YouTube Data API.
                </p>
              </div>

              <button
                onClick={loadAudit}
                disabled={isVerifying}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin text-sky-600' : ''}`} />
                <span>{isVerifying ? 'Verifying Services...' : 'Run Live Audit'}</span>
              </button>
            </div>

            {auditReport && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Firebase Core */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Firebase Core</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {auditReport.services.firebase.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {auditReport.services.firebase.details}
                  </p>
                </div>

                {/* Cloud Firestore */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Cloud Firestore</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {auditReport.services.firestore.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {auditReport.services.firestore.details}
                  </p>
                </div>

                {/* Firebase Auth */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Firebase Auth</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {auditReport.services.authentication.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {auditReport.services.authentication.details}
                  </p>
                </div>

                {/* Gemini AI API */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Google Gemini API</span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        auditReport.services.gemini.status === 'CONNECTED'
                          ? 'text-emerald-700 bg-emerald-100/80'
                          : 'text-amber-700 bg-amber-100/80'
                      }`}
                    >
                      {auditReport.services.gemini.status === 'CONNECTED' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                      )}
                      {auditReport.services.gemini.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {auditReport.services.gemini.details}
                  </p>
                </div>

                {/* YouTube Data API */}
                <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5 text-rose-600" />
                      <span className="text-xs font-bold text-slate-800">YouTube Data API v3</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        auditReport.services.youtube.status === 'CONNECTED'
                          ? 'text-emerald-700 bg-emerald-100/80'
                          : 'text-amber-700 bg-amber-100/80'
                      }`}
                    >
                      {auditReport.services.youtube.status === 'CONNECTED' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-600" />
                      )}
                      {auditReport.services.youtube.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    {auditReport.services.youtube.details}
                  </p>
                  {auditReport.services.youtube.status !== 'CONNECTED' && (
                    <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 space-y-1">
                      <p className="font-semibold">Required Manual Step for Live YouTube Data API:</p>
                      <ol className="list-decimal list-inside space-y-0.5 text-[10px] text-amber-800">
                        <li>Open <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-900">Google Cloud Console</a> and create or select your own project (e.g. <code className="font-mono bg-white px-1 py-0.5 rounded font-bold">Enter the World of Light</code>). <em>Note: Do not use the internal sandbox project.</em></li>
                        <li>Enable "YouTube Data API v3" in APIs &amp; Services &gt; Library</li>
                        <li>Generate an API Key restricted to YouTube Data API v3</li>
                        <li>Add <code className="font-mono bg-white px-1 py-0.5 rounded">YOUTUBE_API_KEY</code> to the AI Studio Secrets</li>
                      </ol>
                    </div>
                  )}
                  {auditReport.services.youtube.status === 'CONNECTED' && (
                    <div className="p-2 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Live YouTube channel stream active and synchronized with caching protection.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Total Repository</span>
              <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">248</p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +12 this week
              </span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Urdu Shayari Titles</span>
              <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">64</p>
              <span className="text-[11px] text-amber-600 font-semibold">Classical & Modern</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Active Learners</span>
              <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">1,840</p>
              <span className="text-[11px] text-sky-600 font-semibold">92% Daily Streak</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Video Hours</span>
              <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">42.5h</p>
              <span className="text-[11px] text-purple-600 font-semibold">HD / 4K Mastered</span>
            </div>
          </div>

          {/* Auto SEO & Discovery Master Center */}
          {activeSection === 'Auto SEO & Discovery' ? (
            <SeoCommandCenter />
          ) : activeSection === 'Google Blogger Engine' ? (
            <div className="space-y-6">
              {/* Sub-view Switcher between Autonomous Marketing Engine and Classic Studio */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 w-fit">
                <button
                  onClick={() => setBloggerSubView('marketing')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                    bloggerSubView === 'marketing'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autonomous Marketing &amp; Master DB (3 Posts / Day)</span>
                </button>
                <button
                  onClick={() => setBloggerSubView('classic')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                    bloggerSubView === 'classic'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Manual Studio (Workflows 1 &amp; 2)</span>
                </button>
              </div>

              {bloggerSubView === 'marketing' ? (
                <MarketingManagerWorkspace />
              ) : (
                <div className="space-y-6">
                  {/* Dual Workflow Architecture Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Workflow 1 Card */}
                <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200/80 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
                      <Globe className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Workflow 1 (Pillar Hubs)</span>
                      <h4 className="text-sm font-extrabold text-slate-900">App + YouTube Shorts + Record Save + Blog Page</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Craft entire subject guides &amp; curriculum directory pages. Discuss shorts series, save persistent record in Firestore (<code className="font-mono text-[11px] bg-white px-1 py-0.5 rounded">bloggerPages</code>), and export permanent Google Blogger Static Page HTML with embedded players &amp; App links.
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-sky-800 bg-white/80 px-2 py-0.5 rounded-lg border border-sky-100">
                      Collection: /bloggerPages
                    </span>
                    <button
                      onClick={() => {
                        const sample = bloggerRecords.find((r) => r.type === 'page') || bloggerRecords[0];
                        if (sample) {
                          navigator.clipboard?.writeText(sample.contentHtml);
                          setCopiedId(sample.id);
                          setTimeout(() => setCopiedId(null), 2500);
                        }
                      }}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId?.includes('page') ? 'HTML Copied! ✓' : 'Copy Sample Page HTML'}</span>
                    </button>
                  </div>
                </div>

                {/* Workflow 2 Card */}
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200/80 rounded-3xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-red-600 text-white shadow-xs">
                      <Youtube className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">Workflow 2 (Micro Syndication)</span>
                      <h4 className="text-sm font-extrabold text-slate-900">YouTube Shorts + App + Blog Post</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Transform individual 60-second micro-learnings and rhymes into high-ranking Blogger Posts. Auto-embeds the responsive short, bilingual verses, educational takeaways, and calls-to-action to download/open the web app.
                  </p>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-red-800 bg-white/80 px-2 py-0.5 rounded-lg border border-rose-100">
                      Collection: /bloggerPosts
                    </span>
                    <button
                      onClick={() => {
                        const sample = bloggerRecords.find((r) => r.type === 'post') || bloggerRecords[1];
                        if (sample) {
                          navigator.clipboard?.writeText(sample.contentHtml);
                          setCopiedId(sample.id);
                          setTimeout(() => setCopiedId(null), 2500);
                        }
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId?.includes('post') ? 'HTML Copied! ✓' : 'Copy Sample Post HTML'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Blogger Synced Items Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-600" />
                      <span>Synchronized Blogger Publications</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Posts and Pages bridged between Cloud Firestore, YouTube Channel, and Google Blogger.
                    </p>
                  </div>

                  <button
                    onClick={loadBlogger}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Records</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold">
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Title &amp; Urdu Topic</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Labels</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {bloggerRecords.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block font-mono uppercase text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                item.type === 'page'
                                  ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}
                            >
                              Blog {item.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 max-w-sm">
                            <div className="font-bold text-slate-900 leading-snug">{item.title}</div>
                            {item.titleUrdu && (
                              <div className="font-urdu text-sm text-amber-700 font-semibold pt-0.5">
                                {item.titleUrdu}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-600">{item.category || 'General'}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {item.labels?.slice(0, 3).map((l) => (
                                <span key={l} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                  {l}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  navigator.clipboard?.writeText(item.contentHtml);
                                  setCopiedId(item.id);
                                  setTimeout(() => setCopiedId(null), 2500);
                                }}
                                className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold rounded-lg flex items-center gap-1 text-[11px] transition-colors"
                                title="Copy clean HTML for Google Blogger editor"
                              >
                                <Copy className="w-3 h-3" />
                                <span>{copiedId === item.id ? 'Copied! ✓' : 'Copy HTML'}</span>
                              </button>
                              {item.bloggerUrl && (
                                <a
                                  href={item.bloggerUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                                  title="View on Google Blogger"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : activeSection === 'Integrations & APIs' ? (
            /* Google Ecosystem 2026 Master Linking Hub */
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                      Google 2026 Ecosystem Flywheel
                    </span>
                    <h3 className="text-xl font-black mt-2 text-white">
                      Unified Cross-Linking &amp; Syndication Engine
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      Bridge YouTube Shorts, Google Blogger, AI Studio App, Google Analytics 4, and Search Console into an interconnected, closed-loop growth system.
                    </p>
                  </div>
                  <a
                    href="https://console.cloud.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-xl flex items-center gap-2 self-start md:self-auto transition-colors"
                  >
                    <span>Open Google Cloud Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 4 Core Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Google Cloud Console */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
                        <Key className="w-4 h-4" />
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">1. Google Cloud APIs</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-100">
                      Step 1
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    APIs to enable under <strong>APIs &amp; Services &gt; Library</strong>:
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Blogger API v3</strong> (Auto-posting &amp; directory sync)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>YouTube Data API v3</strong> (Channel metadata &amp; shorts sync)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Google Analytics Data API</strong> (Dashboard metrics)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Google Search Console API</strong> (Instant indexing requests)</span>
                    </li>
                  </ul>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <span className="font-bold text-slate-800">OAuth Scope Required:</span>
                    <code className="block font-mono bg-white p-1 rounded border border-slate-200 text-[10px] select-all">
                      https://www.googleapis.com/auth/blogger
                    </code>
                  </div>
                </div>

                {/* 2. Google Analytics 4 */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
                        <BarChart3 className="w-4 h-4" />
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">2. Google Analytics 4 (GA4)</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-100">
                      Step 2
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unify audience journeys across Blogger, YouTube, and the Web App with <strong>Cross-Domain Tracking</strong>.
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl space-y-1 text-amber-900">
                      <span className="font-bold">Cross-Domain Conditions to Add:</span>
                      <div className="font-mono text-[11px] space-y-0.5">
                        <div>1. Contains: <code className="bg-white px-1 py-0.5 rounded font-bold">blogspot.com</code></div>
                        <div>2. Contains: <code className="bg-white px-1 py-0.5 rounded font-bold">run.app</code></div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Insert Measurement ID in Blogger: <strong>Settings &gt; Google Analytics Measurement ID</strong>.
                    </p>
                  </div>
                </div>

                {/* 3. Google Search Console */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                        <Search className="w-4 h-4" />
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">3. Search Console &amp; Sitemaps</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                      Step 3
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Verify both properties in Google Search Console using the active Google Analytics tag:
                  </p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-mono text-[11px] text-slate-700">Blogger: sitemap.xml</span>
                      <button
                        onClick={() => navigator.clipboard?.writeText('atom.xml?redirect=false&start-index=1&max-results=500')}
                        className="text-sky-600 hover:text-sky-800 font-bold text-[11px] flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Atom Feed</span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-mono text-[11px] text-slate-700">Web App: /sitemap.xml</span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Ready</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Link Search Console to GA4 under <strong>GA4 Admin &gt; Product Links &gt; Search Console Links</strong>.
                  </p>
                </div>

                {/* 4. YouTube Channel Customization */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-red-100 text-red-700">
                        <Youtube className="w-4 h-4" />
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">4. YouTube Channel Linking</h4>
                    </div>
                    <span className="text-[10px] font-mono bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-100">
                      Step 4
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In <strong>studio.youtube.com &gt; Customization &gt; Basic Info</strong>, add clickable links:
                  </p>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div>
                      <span className="font-bold text-slate-800">1. Web App Link:</span>
                      <div className="font-mono text-[10px] text-slate-600 break-all select-all bg-white p-1 rounded mt-0.5 border border-slate-100">
                        https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/?utm_source=youtube&amp;utm_medium=bio
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">2. Blogger Link:</span>
                      <div className="font-mono text-[10px] text-slate-600 break-all select-all bg-white p-1 rounded mt-0.5 border border-slate-100">
                        https://entertheworldoflight.blogspot.com/?utm_source=youtube&amp;utm_medium=bio
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          /* Content Management Table */
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {activeSection} Directory
                </h3>
                <p className="text-xs text-slate-500">
                  Manage publications, drafts, metadata, and visibility.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter records..."
                    className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold">
                    <th className="py-3 px-4">Item ID</th>
                    <th className="py-3 px-4">Content Title</th>
                    <th className="py-3 px-4">Section</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Date Added</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {contentRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-slate-400">
                        {row.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                        {row.title}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{row.section}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            row.status === 'Published'
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.status === 'Published'
                                ? 'bg-emerald-500'
                                : 'bg-amber-500'
                            }`}
                          />
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono tabular-nums">{row.views}</td>
                      <td className="py-3.5 px-4 text-slate-500">{row.date}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            title="Edit Record"
                            className="p-1.5 text-slate-400 hover:text-sky-600 rounded-lg hover:bg-slate-100"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            title="Delete"
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing 5 of 248 records</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg">
                  Previous
                </button>
                <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg">
                  Next
                </button>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>

      {/* Add New Content Modal Preview */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Create New Content Entry
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Title (English)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Couplet of the Dawn"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  عنوان (اردو)
                </label>
                <input
                  type="text"
                  placeholder="مثلاً: صبح کی نوید"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-right font-urdu"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Section
                </label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Poetry</option>
                  <option>Stories</option>
                  <option>Lessons</option>
                  <option>Videos</option>
                  <option>Shorts</option>
                  <option>Quizzes</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Content Body / Couplets
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter the full text or verses..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-100 rounded-xl font-semibold text-slate-600 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSuccessMessage('Naya entry draft kamyabi se record ho gaya hai!');
                  setShowAddModal(false);
                  setTimeout(() => setSuccessMessage(null), 5000);
                }}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-semibold text-xs transition-colors"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
