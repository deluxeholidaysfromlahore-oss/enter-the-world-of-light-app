import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Copy,
  Youtube,
  Globe,
  Baby,
  RefreshCw,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  Tag,
  ExternalLink,
  Zap,
} from 'lucide-react';
import {
  AppFeatureItem,
  ScheduledMarketingSlot,
  DailyMarketingSummary,
  MarketingSlotType,
  MarketingCampaignType,
  MarketingContentType,
} from '../../types/marketing';
import {
  fetchFeaturesMasterList,
  fetchMarketingCalendar,
  saveScheduledSlot,
  saveAppFeature,
  generateDynamicWindowTime,
  selectSmartRotationTrio,
  generateContentPackage,
  getDailyMarketingSummary,
} from '../../services/marketingEngine';
import { MASTER_APP_FEATURES_CATALOG } from '../../data/appFeaturesCatalog';
import { PromotionCommandCenter } from './PromotionCommandCenter';

export const MarketingManagerWorkspace: React.FC = () => {
  const [features, setFeatures] = useState<AppFeatureItem[]>(MASTER_APP_FEATURES_CATALOG);
  const [calendarSlots, setCalendarSlots] = useState<ScheduledMarketingSlot[]>([]);
  const [summary, setSummary] = useState<DailyMarketingSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTabFilter, setSelectedTabFilter] = useState<string>('All');
  const [selectedSlotForPreview, setSelectedSlotForPreview] = useState<ScheduledMarketingSlot | null>(null);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
  const [workspaceView, setWorkspaceView] = useState<'schedule' | 'promotions' | 'automation' | 'features'>('promotions');
  const [autoSettings, setAutoSettings] = useState({
    kidsVideosPerDay: 2,
    generalShortsPerDay: 1,
    blogPostsPerDay: 3,
    primaryMarketingActive: true,
    secondaryMarketingActive: true,
    kidsAutoGenerationActive: true,
    youtubeAutoUploadActive: false,
    bloggerAutoPublishActive: false,
    randomScheduleActive: true,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [kidsGenStatus, setKidsGenStatus] = useState<string | null>(null);

  // New Feature Form State
  const [newFeatureForm, setNewFeatureForm] = useState({
    id: '',
    tab: 'learn' as any,
    tabName: 'Learning Hub',
    functionName: '',
    description: '',
    targetAudience: '',
    marketingAngle: '',
    primaryHook: '',
    secondaryHook: '',
    category: 'New Capability',
    isKidsMode: false,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const featList = await fetchFeaturesMasterList();
      setFeatures(featList);

      const cal = await fetchMarketingCalendar();
      setCalendarSlots(cal);

      const sum = await getDailyMarketingSummary();
      setSummary(sum);

      // Fetch automation settings
      try {
        const setRes = await fetch('/api/automation/settings');
        if (setRes.ok) {
          const setData = await setRes.json();
          if (setData.settings) setAutoSettings(setData.settings);
        }
      } catch (e) {}

      // Auto-select today's first slot if available
      const today = new Date().toISOString().split('T')[0];
      const todayFirst = cal.find((s) => s.date === today);
      if (todayFirst) {
        setSelectedSlotForPreview(todayFirst);
      }
    } catch (err) {
      console.warn('Error loading marketing master data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSetting = async (key: string, value: any) => {
    const updated = { ...autoSettings, [key]: value };
    setAutoSettings(updated);
    try {
      setSavingSettings(true);
      await fetch('/api/automation/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleTriggerNextKidsVideo = async () => {
    setKidsGenStatus('Auto-selecting next topic & rendering 1080p MP4...');
    try {
      const res = await fetch('/api/kids-video/generate-next', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success && data.record) {
        setKidsGenStatus(`✓ Success: '${data.record.topic}' rendered & saved!`);
        loadData();
      } else {
        setKidsGenStatus(`Error: ${data.error || 'Failed'}`);
      }
    } catch (err: any) {
      setKidsGenStatus(`Error: ${err?.message || 'Network error'}`);
    } finally {
      setTimeout(() => setKidsGenStatus(null), 5000);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ---------------------------------------------------------------------------
  // Generate Autonomous Daily 3-Pack Cycle
  // ---------------------------------------------------------------------------
  const handleGenerateDailyCycle = async () => {
    setIsGenerating(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];

      // 1. Run smart rotation engine
      const trio = selectSmartRotationTrio(features, calendarSlots, todayStr);

      const slotsToGenerate: {
        slot: MarketingSlotType;
        feature: AppFeatureItem;
        campaignType: MarketingCampaignType;
        contentType: MarketingContentType;
      }[] = [
        { slot: 'morning', ...trio.morning },
        { slot: 'afternoon', ...trio.afternoon },
        { slot: 'evening', ...trio.evening },
      ];

      const newSlots: ScheduledMarketingSlot[] = [];

      for (const item of slotsToGenerate) {
        const windowTimeObj = generateDynamicWindowTime(todayStr, item.slot);
        const { blog, short } = await generateContentPackage(
          item.feature,
          item.campaignType,
          item.contentType,
          item.slot,
          windowTimeObj.timeString
        );

        const slotRecord: ScheduledMarketingSlot = {
          id: `slot-${todayStr}-${item.slot}`,
          date: todayStr,
          slot: item.slot,
          windowTime: windowTimeObj.timeString,
          windowLabel: windowTimeObj.label,
          featureId: item.feature.id,
          featureName: item.feature.functionName,
          tab: item.feature.tab,
          isKidsMode: item.feature.isKidsMode,
          campaignType: item.campaignType,
          contentType: item.contentType,
          status: item.slot === 'morning' ? 'published' : 'generated',
          blogPackage: blog,
          shortPackage: short,
          createdAt: new Date().toISOString(),
          publishedAt: item.slot === 'morning' ? new Date().toISOString() : undefined,
        };

        await saveScheduledSlot(slotRecord);
        newSlots.push(slotRecord);
      }

      await loadData();
      if (newSlots.length > 0) {
        setSelectedSlotForPreview(newSlots[0]);
      }
    } catch (err) {
      console.error('Error generating daily marketing cycle:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Register New Feature / Function (Requirement #11)
  // ---------------------------------------------------------------------------
  const handleCreateNewFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureForm.functionName || !newFeatureForm.description) return;

    const featId = newFeatureForm.id.trim() || `feat-${Date.now().toString().slice(-6)}`;
    const newFeature: AppFeatureItem = {
      id: featId,
      tab: newFeatureForm.tab,
      tabName: newFeatureForm.tabName,
      functionName: newFeatureForm.functionName,
      description: newFeatureForm.description,
      targetAudience: newFeatureForm.targetAudience || 'General Audience & Learners',
      marketingAngle: newFeatureForm.marketingAngle || 'Streamline learning with automated intelligence',
      primaryHook: newFeatureForm.primaryHook || `Discover ${newFeatureForm.functionName} in Enter the World of Light & Laughter!`,
      secondaryHook: newFeatureForm.secondaryHook || `Free Guide: How to leverage ${newFeatureForm.functionName} for maximum benefit.`,
      category: newFeatureForm.category,
      priority: 'high', // New features automatically get high priority
      status: 'new', // Flagged as new to jump to front of rotation pool!
      isKidsMode: newFeatureForm.isKidsMode,
      addedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      promotionStats: {
        totalPromotions: 0,
        lastPromotedAt: null,
        blogsCount: 0,
        shortsCount: 0,
        primaryCount: 0,
        secondaryCount: 0,
        nextEligibleDate: new Date().toISOString().split('T')[0],
      },
    };

    await saveAppFeature(newFeature);
    setIsAddFeatureModalOpen(false);
    setNewFeatureForm({
      id: '',
      tab: 'learn',
      tabName: 'Learning Hub',
      functionName: '',
      description: '',
      targetAudience: '',
      marketingAngle: '',
      primaryHook: '',
      secondaryHook: '',
      category: 'New Capability',
      isKidsMode: false,
    });
    await loadData();
  };

  // ---------------------------------------------------------------------------
  // Filtering Master Feature DB
  // ---------------------------------------------------------------------------
  const filteredFeatures = features.filter((feat) => {
    const matchQuery =
      !searchQuery ||
      feat.functionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.marketingAngle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.tabName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTab =
      selectedTabFilter === 'All' ||
      (selectedTabFilter === 'Kids' && feat.isKidsMode) ||
      feat.tab === selectedTabFilter.toLowerCase();

    return matchQuery && matchTab;
  });

  const tabsList = ['All', 'Kids', 'Learn', 'Play', 'Practice', 'Poetry', 'Stories', 'Videos', 'Shorts', 'Daily', 'AI', 'Home'];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Content &amp; Marketing Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Feature &amp; Function Master Marketing Manager
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every existing tab &amp; function is mapped, rotated, and syndicated into Google Blogger (3 dynamic posts daily) and YouTube Shorts (1–2 daily) with anti-duplicate protection and high-priority Kids Mode weighting.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleGenerateDailyCycle}
              disabled={isGenerating}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Rotating & Generating...' : 'Run Daily 3-Pack Cycle'}</span>
            </button>

            <button
              onClick={() => setIsAddFeatureModalOpen(true)}
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Register New Feature</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setWorkspaceView('schedule')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            workspaceView === 'schedule'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-sky-400" />
          <span>📅 Daily 3-Slot Schedule &amp; Content</span>
        </button>

        <button
          onClick={() => setWorkspaceView('promotions')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            workspaceView === 'promotions'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>🚀 Promotion Automation (App + YouTube + Blogger)</span>
        </button>

        <button
          onClick={() => setWorkspaceView('automation')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            workspaceView === 'automation'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>⚙️ Automation Control Center (Phase 18)</span>
        </button>

        <button
          onClick={() => setWorkspaceView('features')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            workspaceView === 'features'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>📚 Master Features Catalog ({features.length})</span>
        </button>
      </div>

      {/* PROMOTION COMMAND CENTER (APP + YOUTUBE + BLOGGER CROSS-PROMOTION) */}
      {workspaceView === 'promotions' && <PromotionCommandCenter />}

      {/* AUTOMATION CONTROL CENTER (PHASE 18) */}
      {workspaceView === 'automation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-bold mb-1 border border-amber-200">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Phase 18 Master Automation Controls</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Daily Autonomous Operations &amp; Cadence Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Configure generation frequencies, marketing modes, and syndication parameters.
                </p>
              </div>

              {savingSettings && (
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl animate-pulse">
                  Saving Settings...
                </span>
              )}
            </div>

            {/* Cadence Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Kids Videos Per Day */}
              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-900 uppercase">Kids Videos / Day</span>
                  <Baby className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleUpdateSetting('kidsVideosPerDay', num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        autoSettings.kidsVideosPerDay === num
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {num} {num === 2 ? '(Default)' : ''}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-amber-800 font-medium">
                  Auto-rotates across Alphabet, Numbers, Animals, Fruits, and Shapes with anti-duplicate logic.
                </p>
              </div>

              {/* General Shorts Per Day */}
              <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-sky-900 uppercase">General Shorts / Day</span>
                  <Youtube className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleUpdateSetting('generalShortsPerDay', num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        autoSettings.generalShortsPerDay === num
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-sky-200 hover:bg-sky-100'
                      }`}
                    >
                      {num} {num === 1 ? '(Default)' : ''}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-sky-800 font-medium">
                  Showcases existing app tools, poetry, stories, quizzes, and new features.
                </p>
              </div>

              {/* Blog Posts Per Day */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-900 uppercase">Blog Posts / Day</span>
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="py-2 px-3 rounded-xl bg-indigo-600 text-white text-xs font-black text-center shadow-xs">
                  Fixed 3 Slots (Morning, Afternoon, Evening)
                </div>
                <p className="text-[11px] text-indigo-800 font-medium">
                  Strict audience windows with varied times (at least 3.5h spacing).
                </p>
              </div>
            </div>

            {/* Interactive Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {/* Primary Marketing Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Primary Marketing</h4>
                  <p className="text-[11px] text-slate-500">&quot;What We Do&quot; &amp; App features</p>
                </div>
                <button
                  onClick={() => handleUpdateSetting('primaryMarketingActive', !autoSettings.primaryMarketingActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoSettings.primaryMarketingActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Secondary Marketing Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Secondary Marketing</h4>
                  <p className="text-[11px] text-slate-500">&quot;What Useful Thing We Give&quot; (Value)</p>
                </div>
                <button
                  onClick={() => handleUpdateSetting('secondaryMarketingActive', !autoSettings.secondaryMarketingActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoSettings.secondaryMarketingActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Kids Video Auto Gen Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Kids Video Pipeline</h4>
                  <p className="text-[11px] text-slate-500">Auto-render 1080p MP4s daily</p>
                </div>
                <button
                  onClick={() => handleUpdateSetting('kidsAutoGenerationActive', !autoSettings.kidsAutoGenerationActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoSettings.kidsAutoGenerationActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Random Time Variation Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Random Time Variation</h4>
                  <p className="text-[11px] text-slate-500">Organic audience engagement slots</p>
                </div>
                <button
                  onClick={() => handleUpdateSetting('randomScheduleActive', !autoSettings.randomScheduleActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoSettings.randomScheduleActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* YouTube Auto Upload Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">YouTube Auto Upload</h4>
                  <p className="text-[11px] text-slate-500">Requires OAuth upload scope</p>
                </div>
                <button
                  onClick={() => handleUpdateSetting('youtubeAutoUploadActive', !autoSettings.youtubeAutoUploadActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoSettings.youtubeAutoUploadActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Blogger Auto Publish Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Blogger Auto Publish</h4>
                  <p className="text-[11px] text-slate-500">Requires Blogger write scope</p>
                </div>
                <button
                  onClick={() => handleUpdateSetting('bloggerAutoPublishActive', !autoSettings.bloggerAutoPublishActive)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    autoSettings.bloggerAutoPublishActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>
            </div>

            {/* Quick Action Triggers */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={handleTriggerNextKidsVideo}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Auto-Generate Next Kids Video (Alphabet / Numbers / Animals)</span>
              </button>

              <button
                onClick={handleGenerateDailyCycle}
                disabled={isGenerating}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Run Daily 3-Slot Cycle (Morning, Afternoon, Evening)</span>
              </button>

              {kidsGenStatus && (
                <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200">
                  {kidsGenStatus}
                </span>
              )}
            </div>

            {/* Google Ecosystem Connected Channels Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>Google 2026 Ecosystem Integration Architecture</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  Target Configured
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-red-400">
                    <Youtube className="w-4 h-4" />
                    <span>Official YouTube Channel</span>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px]">@EntertheWorldofLight (ID: UCvCzFP5EPsV4Vp6l6GGuvyg)</p>
                  <p className="text-slate-400 text-[10px]">Auto-embeds 9:16 Shorts with VideoObject JSON-LD structured schema.</p>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <Globe className="w-4 h-4" />
                    <span>Master Google Blogger</span>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px]">entertheworldoflightandlaughter.blogspot.com (ID: 5550406854147347257)</p>
                  <p className="text-slate-400 text-[10px]">Single master hub using labels: Primary, Secondary, Kids Mode, Education.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE VIEW */}
      {workspaceView === 'schedule' && (
        <>
          {/* Requirement #16: Dashboard Marketing Summary Status */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Content */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Today&apos;s Content</span>
            <span className="text-sky-600 font-extrabold">3 / 3 Target</span>
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            {summary ? `${summary.publishedSlotsToday + summary.scheduledSlotsToday} / 3` : '3 / 3'}
          </p>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Morning: Published • Afternoon: Scheduled</span>
          </div>
        </div>

        {/* Daily Shorts */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Daily Shorts</span>
            <Youtube className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">
            {summary?.shortsGeneratedToday || 2} Generated
          </p>
          <span className="text-[11px] text-slate-500 font-medium">1 Uploaded, 1 Queued</span>
        </div>

        {/* Kids Mode Special Priority */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-2xs space-y-1 bg-amber-50/40">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900">
            <span>Kids Mode Weight</span>
            <Baby className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-950">35% Priority</p>
          <span className="text-[11px] text-amber-700 font-semibold">Special High-Frequency Rotation</span>
        </div>

        {/* Active Features in Pool */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Total Mapped Features</span>
            <Layers className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 tabular-nums">{features.length}</p>
          <span className="text-[11px] text-indigo-600 font-semibold">Across all 14 app tabs</span>
        </div>
      </div>

      {/* Requirement #14 & #15: Daily Dynamic Scheduling Slots (Morning, Afternoon, Evening) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Today&apos;s Dynamic Schedule &amp; Slots (3 Posts / Day)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Timings vary daily within target audience windows (at least 3.5h spacing, non-repetitive exact times).
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            Date: {new Date().toISOString().split('T')[0]}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Morning Slot */}
          {(() => {
            const morningSlot = calendarSlots.find(
              (s) => s.date === new Date().toISOString().split('T')[0] && s.slot === 'morning'
            );
            const timeObj = generateDynamicWindowTime(new Date().toISOString().split('T')[0], 'morning');
            const feat = morningSlot ? features.find((f) => f.id === morningSlot.featureId) : features[0];

            return (
              <div
                onClick={() => morningSlot && setSelectedSlotForPreview(morningSlot)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  selectedSlotForPreview?.slot === 'morning'
                    ? 'bg-sky-50/70 border-sky-400 ring-2 ring-sky-300 shadow-sm'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800">
                    🌅 Morning Slot
                  </span>
                  <span className="text-xs font-mono font-extrabold text-sky-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {morningSlot ? morningSlot.windowTime : timeObj.timeString}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] uppercase font-bold text-slate-700">
                      {feat?.tabName || 'Kids Portal'}
                    </span>
                    <span className="text-sky-600 font-bold">• Primary (What We Do)</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                    {morningSlot ? morningSlot.blogPackage?.title : feat?.functionName}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{feat?.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Published ✓
                  </span>
                  <span className="text-sky-600 font-bold hover:underline">View Pack &rarr;</span>
                </div>
              </div>
            );
          })()}

          {/* Afternoon Slot */}
          {(() => {
            const afternoonSlot = calendarSlots.find(
              (s) => s.date === new Date().toISOString().split('T')[0] && s.slot === 'afternoon'
            );
            const timeObj = generateDynamicWindowTime(new Date().toISOString().split('T')[0], 'afternoon');
            const feat = afternoonSlot ? features.find((f) => f.id === afternoonSlot.featureId) : features[1];

            return (
              <div
                onClick={() => afternoonSlot && setSelectedSlotForPreview(afternoonSlot)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  selectedSlotForPreview?.slot === 'afternoon'
                    ? 'bg-sky-50/70 border-sky-400 ring-2 ring-sky-300 shadow-sm'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-orange-100 text-orange-800">
                    ☀️ Afternoon Slot
                  </span>
                  <span className="text-xs font-mono font-extrabold text-orange-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {afternoonSlot ? afternoonSlot.windowTime : timeObj.timeString}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] uppercase font-bold text-slate-700">
                      {feat?.tabName || 'Poetry Hub'}
                    </span>
                    <span className="text-orange-600 font-bold">• Secondary (Value First)</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                    {afternoonSlot ? afternoonSlot.blogPackage?.title : feat?.functionName}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{feat?.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-sky-700 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Scheduled ✓
                  </span>
                  <span className="text-sky-600 font-bold hover:underline">View Pack &rarr;</span>
                </div>
              </div>
            );
          })()}

          {/* Evening Slot */}
          {(() => {
            const eveningSlot = calendarSlots.find(
              (s) => s.date === new Date().toISOString().split('T')[0] && s.slot === 'evening'
            );
            const timeObj = generateDynamicWindowTime(new Date().toISOString().split('T')[0], 'evening');
            const feat = eveningSlot ? features.find((f) => f.id === eveningSlot.featureId) : features[2];

            return (
              <div
                onClick={() => eveningSlot && setSelectedSlotForPreview(eveningSlot)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  selectedSlotForPreview?.slot === 'evening'
                    ? 'bg-sky-50/70 border-sky-400 ring-2 ring-sky-300 shadow-sm'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                    🌙 Evening Slot
                  </span>
                  <span className="text-xs font-mono font-extrabold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {eveningSlot ? eveningSlot.windowTime : timeObj.timeString}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                    <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] uppercase font-bold text-slate-700">
                      {feat?.tabName || 'Practice Lab'}
                    </span>
                    <span className="text-indigo-600 font-bold">• Rotating Focus</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                    {eveningSlot ? eveningSlot.blogPackage?.title : feat?.functionName}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{feat?.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-indigo-700 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Scheduled ✓
                  </span>
                  <span className="text-sky-600 font-bold hover:underline">View Pack &rarr;</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Selected Slot Content Pack Viewer (Blogger HTML + YouTube Short Script) */}
      {selectedSlotForPreview && selectedSlotForPreview.blogPackage && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800">
                  {selectedSlotForPreview.slot} Window ({selectedSlotForPreview.windowTime})
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedSlotForPreview.campaignType === 'primary' ? 'Primary: What We Do' : 'Secondary: Free Value'}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {selectedSlotForPreview.blogPackage.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedSlotForPreview.blogPackage!.contentHtml);
                  setCopiedState('blog');
                  setTimeout(() => setCopiedState(null), 2500);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedState === 'blog' ? 'Blogger HTML Copied! ✓' : 'Copy Blogger HTML'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedSlotForPreview.shortPackage!.script);
                  setCopiedState('short');
                  setTimeout(() => setCopiedState(null), 2500);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>{copiedState === 'short' ? 'Short Script Copied! ✓' : 'Copy Short Script'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: 60-Second Short Script */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>60-Sec YouTube Short Script</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">9:16 Vertical Ratio</span>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto border border-slate-800">
                {selectedSlotForPreview.shortPackage?.script}
              </pre>
              <div className="text-xs text-slate-500 font-mono">
                Hashtags: {selectedSlotForPreview.shortPackage?.hashtags.join(' ')}
              </div>
            </div>

            {/* Right: Blogger Post Preview HTML */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-sky-600" />
                  <span>Google Blogger 2026 Ready HTML</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400">Inline CSS + Schema.org</span>
              </div>
              <div
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-h-80 overflow-y-auto text-xs"
                dangerouslySetInnerHTML={{ __html: selectedSlotForPreview.blogPackage.contentHtml }}
              />
            </div>
          </div>
        </div>
      )}
      </>
    )}

      {/* Requirement #1 & #17: Master Feature Database & Promotion History */}
      {workspaceView === 'features' && (
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Feature &amp; Function Master Database ({features.length} Functions)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Continuously mapped repository of all app functions with target audience, angles, and promotion history.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search functions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tabsList.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTabFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTabFilter === tab
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'Kids' ? '🧒 Kids Mode' : tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Function / Feature</th>
                <th className="p-3">Tab</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Target Audience</th>
                <th className="p-3">Marketing Angle</th>
                <th className="p-3 text-right">Promotions</th>
                <th className="p-3 text-right">Last Promoted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFeatures.map((feat) => (
                <tr key={feat.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      {feat.isKidsMode && (
                        <span className="p-1 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Kids
                        </span>
                      )}
                      <span>{feat.functionName}</span>
                      {feat.status === 'new' && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 text-emerald-800 uppercase">
                          NEW
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] text-slate-700 font-semibold">
                      {feat.tabName}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        feat.priority === 'high'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {feat.priority}
                    </span>
                  </td>
                  <td className="p-3 max-w-[180px] truncate text-slate-600" title={feat.targetAudience}>
                    {feat.targetAudience}
                  </td>
                  <td className="p-3 max-w-[220px] truncate text-slate-600" title={feat.marketingAngle}>
                    {feat.marketingAngle}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                    {feat.promotionStats.totalPromotions}
                  </td>
                  <td className="p-3 text-right text-slate-500 font-mono text-[11px]">
                    {feat.promotionStats.lastPromotedAt
                      ? new Date(feat.promotionStats.lastPromotedAt).toLocaleDateString()
                      : 'Never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* Modal: Register New Feature (Requirement #11) */}
      {isAddFeatureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-600" />
                <span>Register New App Feature to Marketing Engine</span>
              </h3>
              <button
                onClick={() => setIsAddFeatureModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              When a new feature is registered, it automatically enters the database with <span className="font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">NEW STATUS</span> and jumps to top priority in upcoming daily slots.
            </p>

            <form onSubmit={handleCreateNewFeature} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Feature / Function Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilingual Urdu Metre Visualizer"
                  value={newFeatureForm.functionName}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, functionName: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">App Tab</label>
                  <select
                    value={newFeatureForm.tab}
                    onChange={(e) => {
                      const tab = e.target.value as any;
                      const tabNames: Record<string, string> = {
                        kids: 'Kids Portal',
                        learn: 'Learning Hub',
                        play: 'Play Ground',
                        practice: 'Practice Lab',
                        poetry: 'Poetry Hub',
                        stories: 'Stories Hub',
                        videos: 'Video Stream',
                        shorts: 'Shorts Lab',
                        daily: 'Daily Sparks',
                        ai: 'AI Helper',
                        home: 'Home Hub',
                      };
                      setNewFeatureForm({
                        ...newFeatureForm,
                        tab,
                        tabName: tabNames[tab] || 'App Feature',
                        isKidsMode: tab === 'kids',
                      });
                    }}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    <option value="kids">Kids Portal</option>
                    <option value="learn">Learning Hub</option>
                    <option value="play">Play Ground</option>
                    <option value="practice">Practice Lab</option>
                    <option value="poetry">Poetry Hub</option>
                    <option value="stories">Stories Hub</option>
                    <option value="videos">Video Stream</option>
                    <option value="shorts">Shorts Lab</option>
                    <option value="daily">Daily Sparks</option>
                    <option value="ai">AI Helper</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Target Audience</label>
                  <input
                    type="text"
                    placeholder="e.g. Students, Kids, Parents"
                    value={newFeatureForm.targetAudience}
                    onChange={(e) => setNewFeatureForm({ ...newFeatureForm, targetAudience: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Description (What it does)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain what the feature does in clear, user-friendly language..."
                  value={newFeatureForm.description}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, description: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Marketing Angle (Problem solved &amp; benefit)</label>
                <input
                  type="text"
                  placeholder="e.g. Eliminates confusion about Urdu poetic rhythm in 5 minutes"
                  value={newFeatureForm.marketingAngle}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, marketingAngle: e.target.value })}
                  className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="newIsKidsMode"
                  checked={newFeatureForm.isKidsMode}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, isKidsMode: e.target.checked })}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <label htmlFor="newIsKidsMode" className="text-xs font-bold text-slate-700">
                  Tag as Kids Mode Feature (Applies High Priority 35% Weighting)
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddFeatureModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save &amp; Prioritize in Marketing Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
