import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Copy,
  CheckCircle2,
  Clock,
  Youtube,
  Globe,
  Share2,
  TrendingUp,
  ShieldCheck,
  Film,
  ExternalLink,
  Tag,
  BarChart3,
  MousePointerClick,
  BookOpen,
  Layers,
  ChevronRight,
  Eye,
  ThumbsUp,
} from 'lucide-react';
import {
  fetchPromotionOverview,
  generateDailyPromotionPackApi,
  fetchPromotionRecords,
  updateRecordPerformanceApi,
  fetchEvergreenPages,
  PromotionOverviewResponse,
} from '../../services/promotionService';

export const PromotionCommandCenter: React.FC = () => {
  const [overview, setOverview] = useState<PromotionOverviewResponse | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [evergreenPages, setEvergreenPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'today_slots' | 'records' | 'leaderboard' | 'evergreen' | 'traffic'>('today_slots');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const ov = await fetchPromotionOverview();
      setOverview(ov);

      const recs = await fetchPromotionRecords();
      setRecords(recs);

      const pages = await fetchEvergreenPages();
      setEvergreenPages(pages);

      // Default select first of today or first available
      const today = new Date().toISOString().split('T')[0];
      const todayRec = recs.find((r) => r.publishDate === today) || recs[0];
      if (todayRec) setSelectedRecord(todayRec);
    } catch (e) {
      console.error('Failed to load promotion data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGeneratePack = async () => {
    setIsGenerating(true);
    try {
      await generateDailyPromotionPackApi();
      await loadData();
    } catch (e) {
      console.error('Generate pack error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleAddMockMetric = async (contentId: string, metric: 'views' | 'likes' | 'appClicks') => {
    const rec = records.find((r) => r.contentId === contentId);
    if (!rec) return;
    const currentVal = rec.performance?.[metric] || 0;
    const inc = metric === 'views' ? 50 : metric === 'likes' ? 5 : 2;
    await updateRecordPerformanceApi(contentId, { [metric]: currentVal + inc });
    await loadData();
  };

  if (isLoading && !overview) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
        <RefreshCw className="w-8 h-8 text-sky-500 animate-spin mx-auto mb-3" />
        <p className="text-slate-600 font-bold text-sm">Loading Promotion Triad System...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Promotion Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Cross-Promotion Loop (App ↔ YouTube ↔ Blogger)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Autonomous Promotion &amp; Audience Acquisition Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Separated from Kids Mode educational lessons. Generates 2–3 distinct promotional Shorts daily with controlled non-fixed time windows, topic rotation, YouTube 2026 profile funneling, and Google-approved Blogger articles.
            </p>
          </div>

          <button
            onClick={handleGeneratePack}
            disabled={isGenerating}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 shrink-0"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating 3-Pack...' : 'Generate Today’s 3-Pack Promotion'}</span>
          </button>
        </div>

        {/* Status Indicators Pill Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Kids Content Isolation</span>
            <span className="text-xs font-extrabold text-emerald-300">✓ Strictly in /storage/kids_videos</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Promo Content Separation</span>
            <span className="text-xs font-extrabold text-sky-300">✓ Distinct in /storage/promo_videos</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Anti-Duplicate Shield</span>
            <span className="text-xs font-extrabold text-amber-300">✓ No consecutive repeat topics</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Publishing Times</span>
            <span className="text-xs font-extrabold text-purple-300">✓ Dynamic Controlled Windows</span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('today_slots')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubTab === 'today_slots'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span>Today’s 3 Slots &amp; Controlled Times</span>
        </button>

        <button
          onClick={() => setActiveSubTab('records')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubTab === 'records'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Film className="w-3.5 h-3.5 text-indigo-400" />
          <span>All Promotion Records ({records.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubTab === 'leaderboard'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Category Performance &amp; AI Recommender</span>
        </button>

        <button
          onClick={() => setActiveSubTab('evergreen')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubTab === 'evergreen'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Blogger Evergreen Pages ({evergreenPages.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('traffic')}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            activeSubTab === 'traffic'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <MousePointerClick className="w-3.5 h-3.5 text-purple-400" />
          <span>Cross-Promotion Traffic UTM Analytics</span>
        </button>
      </div>

      {/* VIEW 1: TODAY'S SLOTS */}
      {activeSubTab === 'today_slots' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slots List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>Today’s Dynamic Schedule ({overview?.todayDate})</span>
            </h3>

            <div className="space-y-3">
              {overview?.todaySlots.map((slotItem, index) => {
                const rec = slotItem.assignedRecord;
                const isSelected = selectedRecord?.contentId === rec?.contentId;

                return (
                  <div
                    key={slotItem.slot}
                    onClick={() => rec && setSelectedRecord(rec)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50/70 border-sky-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                        Slot {index + 1}: {slotItem.slot}
                      </span>
                      <span className="text-xs font-black text-slate-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {slotItem.calculatedTime}
                      </span>
                    </div>

                    {rec ? (
                      <div>
                        <h4 className="text-xs font-black text-slate-900 line-clamp-1">{rec.topic}</h4>
                        <span className="text-[11px] text-sky-700 font-bold block mt-0.5">{rec.category}</span>
                        <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                          <span>👁️ {rec.performance?.views || 0}</span>
                          <span>👍 {rec.performance?.likes || 0}</span>
                          <span>🚀 {rec.performance?.appClicks || 0} App Clicks</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic py-2">
                        No short scheduled yet. Click "Generate Today’s 3-Pack" above.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Topic Rotation Cooldown Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-black text-amber-900 uppercase">Topic Rotation Intelligence</h4>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                {overview?.cooldownPolicy}. Topics are dynamically selected from 16 categories, alternating between Kids Learning Tips, Easy English, Urdu Phonics, Science, and App Features.
              </p>
            </div>
          </div>

          {/* Detailed Preview Card for Selected Record */}
          <div className="lg:col-span-2 space-y-5">
            {selectedRecord ? (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-full text-[11px] font-black uppercase">
                      {selectedRecord.category} • {selectedRecord.campaignType.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1">{selectedRecord.videoTitle}</h3>
                    {selectedRecord.topicUrdu && (
                      <p className="font-urdu text-base text-amber-900 mt-0.5 direction-rtl">{selectedRecord.topicUrdu}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleAddMockMetric(selectedRecord.contentId, 'views')}
                      className="text-xs font-bold px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                      title="Simulate +50 Views"
                    >
                      +50 Views
                    </button>
                    <button
                      onClick={() => handleAddMockMetric(selectedRecord.contentId, 'appClicks')}
                      className="text-xs font-bold px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl cursor-pointer"
                      title="Simulate +2 App Clicks"
                    >
                      +2 App Clicks
                    </button>
                  </div>
                </div>

                {/* Video Asset Preview & Player */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-[9/16] relative shadow-md">
                      <video
                        src={selectedRecord.videoUrl}
                        preload="none"
                        controls
                        poster={selectedRecord.thumbnailUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-4">
                    {/* YouTube SEO Block (2026 Policy Compliant) */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                          <Youtube className="w-4 h-4 text-red-600" />
                          <span>YouTube SEO &amp; Description (2026 Rules)</span>
                        </span>
                        <button
                          onClick={() => copyToClipboard(selectedRecord.description, 'yt_desc')}
                          className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === 'yt_desc' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'yt_desc' ? 'Copied!' : 'Copy Description'}</span>
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {selectedRecord.description}
                      </div>

                      <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl text-[11px] text-red-900 space-y-1">
                        <strong>YouTube 2026 Rule Active:</strong> Links in Shorts descriptions/comments are non-clickable. This description instructs viewers to tap the <strong>Channel Profile Link</strong> directly to launch the app!
                      </div>
                    </div>

                    {/* Funnel: Related Content Target */}
                    <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-3.5 text-xs text-indigo-950 space-y-1">
                      <span className="font-extrabold block">🔗 YouTube Content Funnel:</span>
                      <p className="text-[11px]">
                        Short → Related Playlist: <strong>{selectedRecord.relatedYouTubeContent?.title}</strong> → Channel Profile → App
                      </p>
                    </div>
                  </div>
                </div>

                {/* Blogger Article Preview (Approved Primary / Secondary Code) */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-orange-600" />
                        <span>Blogger {selectedRecord.campaignType.toUpperCase()} Post (Google-Approved)</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Contains strong indexing signal, 9:16 vertical short embed, Nastaliq RTL, and Schema VideoObject.
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(selectedRecord.bloggerArticle.contentHtml, 'blogger_html')}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'blogger_html' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedKey === 'blogger_html' ? 'Copied HTML!' : 'Copy Blogger HTML'}</span>
                    </button>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-mono max-h-48 overflow-y-auto whitespace-pre-wrap">
                    {selectedRecord.bloggerArticle.contentHtml}
                  </div>
                </div>

                {/* Tracked App Deep Link */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <div>
                    <span className="text-xs font-black text-emerald-900 block">UTM-Tracked App Destination</span>
                    <span className="text-[11px] text-emerald-700 font-mono break-all">{selectedRecord.utmAppUrl}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedRecord.utmAppUrl, 'utm_link')}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedKey === 'utm_link' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'utm_link' ? 'Copied!' : 'Copy App Link'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
                Select a slot on the left to inspect and copy metadata.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: ALL PROMOTION RECORDS */}
      {activeSubTab === 'records' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900">All Promotional Records Archive</h3>
            <span className="text-xs font-bold text-slate-500">{records.length} Total Promotional Shorts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-black text-[10px]">
                  <th className="py-3 px-3">Date &amp; Time</th>
                  <th className="py-3 px-3">Topic &amp; Title</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Views</th>
                  <th className="py-3 px-3">Likes</th>
                  <th className="py-3 px-3">App Clicks</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((r) => (
                  <tr key={r.contentId} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {r.publishDate}
                      <span className="block text-[10px] text-slate-400">{r.scheduledTimeStr}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 max-w-xs truncate">
                      {r.topic}
                    </td>
                    <td className="py-3 px-3 text-sky-700 font-bold whitespace-nowrap">{r.category}</td>
                    <td className="py-3 px-3 uppercase text-[10px] font-black">
                      <span className={`px-2 py-0.5 rounded-full ${r.campaignType === 'primary' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-800'}`}>
                        {r.campaignType}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">{r.performance?.views || 0}</td>
                    <td className="py-3 px-3 font-mono">{r.performance?.likes || 0}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">{r.performance?.appClicks || 0}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => copyToClipboard(r.bloggerArticle.contentHtml, `r_blog_${r.contentId}`)}
                        className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 cursor-pointer"
                        title="Copy Blogger HTML"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: CATEGORY LEADERBOARD & AI RECOMMENDER */}
      {activeSubTab === 'leaderboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Category Performance Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-500">
              The AI engine ranks categories by conversion efficiency (App clicks × 10 + Likes × 2 + Views/50) to prioritize high-performing themes in future rotation cycles.
            </p>

            <div className="space-y-2.5">
              {overview?.categoryLeaderboard?.map((cat, idx) => (
                <div key={cat.category} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-black text-slate-900 block">{cat.category}</span>
                      <span className="text-[11px] text-slate-500">
                        {cat.totalViews} views • {cat.totalLikes} likes
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-700 block">{cat.totalClicks} App Visits</span>
                    <span className="text-[10px] text-slate-400 font-mono">Score: {cat.efficiencyScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 border border-indigo-800 shadow-sm space-y-4">
            <h3 className="text-base font-black flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Intelligent Rotation Guidelines</span>
            </h3>
            <ul className="text-xs text-slate-200 space-y-3 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Consecutive Day Repeats:</strong> Topics presented today are cooled down and will not appear tomorrow in the same form.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Fresh Angle Re-entry:</strong> When a topic is revisited after its cooldown window, it must feature a novel hook, educational takeaway, and visual concept.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>YouTube Monetization Safety:</strong> Avoid mass-produced boilerplates. Each 60-second Short has unique phrasing and genuine educational value.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Non-Clickable Shorts Link Workaround:</strong> Channel Profile link serves as the primary clickable destination, leading directly into the web app.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* VIEW 4: EVERGREEN BLOGGER PAGES */}
      {activeSubTab === 'evergreen' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Blogger Evergreen Pages (Permanent Knowledge Pillars)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Unlike daily blog posts, these are evergreen static pages for high-authority SEO backlinks on Blogger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {evergreenPages.map((page) => (
              <div key={page.pageId} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded-full">
                    {page.category} Page
                  </span>
                  <h4 className="text-sm font-black text-slate-900">{page.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{page.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Slug: {page.slug}</span>
                  <button
                    onClick={() => copyToClipboard(page.contentHtml, `page_${page.pageId}`)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === `page_${page.pageId}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `page_${page.pageId}` ? 'Copied!' : 'Copy Page HTML'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: TRAFFIC UTM ANALYTICS */}
      {activeSubTab === 'traffic' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-purple-600" />
                <span>Cross-Promotion Funnel Analytics</span>
              </h3>
              <p className="text-xs text-slate-500">
                Track which Shorts, channel links, and blog posts bring the most active users to the Web App.
              </p>
            </div>
            <span className="text-xs font-black text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              {overview?.trafficAnalytics?.totalClicksTracked || 0} Total Clicks Tracked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-900 uppercase">Traffic by Acquisition Source</span>
              <div className="space-y-1.5 text-xs text-slate-700">
                {Object.entries(overview?.trafficAnalytics?.bySource || {}).map(([src, count]) => (
                  <div key={src} className="flex justify-between py-1 border-b border-slate-200/60 font-mono">
                    <span className="capitalize">{src}</span>
                    <span className="font-bold">{count} visits</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-900 uppercase">Traffic by Campaign</span>
              <div className="space-y-1.5 text-xs text-slate-700">
                {Object.entries(overview?.trafficAnalytics?.byCampaign || {}).map(([cmp, count]) => (
                  <div key={cmp} className="flex justify-between py-1 border-b border-slate-200/60 font-mono">
                    <span className="truncate max-w-[200px]">{cmp}</span>
                    <span className="font-bold">{count} visits</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
