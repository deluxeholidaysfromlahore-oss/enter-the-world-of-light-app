import React, { useState, useEffect } from 'react';
import { Video, Play, ExternalLink, Sparkles, Clock, Eye, Radio, RefreshCw, AlertCircle } from 'lucide-react';
import { ContentItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { VIDEOS_ITEMS } from '../../data/mockData';
import { fetchYouTubeVideos } from '../../services/contentService';

interface VideosScreenProps {
  onSelectVideo: (item: ContentItem) => void;
}

export const VideosScreen: React.FC<VideosScreenProps> = ({ onSelectVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [videoList, setVideoList] = useState<ContentItem[]>(VIDEOS_ITEMS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [channelId, setChannelId] = useState<string>('UCvCzFP5EPsV4Vp6l6GGuvyg');
  const [promoVideos, setPromoVideos] = useState<any[]>([]);
  const [activePromoModal, setActivePromoModal] = useState<any | null>(null);

  const loadVideos = async () => {
    setIsLoading(true);
    try {
      const result = await fetchYouTubeVideos(false);
      if (result.items && result.items.length > 0) {
        setVideoList(result.items);
        setIsLive(result.source === 'live');
        setChannelId(result.channelId);
      } else {
        setVideoList(VIDEOS_ITEMS);
        setIsLive(false);
      }

      // Load dedicated App Promotion videos (Strictly separated from Kids Mode)
      const pRes = await fetch('/api/promo-video/pipeline');
      if (pRes.ok) {
        const pData = await pRes.json();
        if (pData.items) setPromoVideos(pData.items);
      }
    } catch {
      setVideoList(VIDEOS_ITEMS);
      setIsLive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const categories = [
    'All',
    'Latest',
    'Educational',
    'Kids',
    'Poetry',
    'Entertainment',
  ];

  const filteredVideos =
    selectedCategory === 'All'
      ? videoList
      : videoList.filter(
          (v) =>
            v.category?.toLowerCase() === selectedCategory.toLowerCase() ||
            (v.tags && v.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase()))
        );

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <SectionHeader
            kicker="Visual Broadcasts"
            title="Video Gallery"
            titleUrdu="ویڈیو نگارخانہ"
            description="Original animated rhymes, astronomical documentaries, and Urdu philosophical discourses."
            className="mb-0"
          />
          {/* Live vs Curated Feed Status Pill */}
          <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Channel Feed Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Curated Studio Catalogue (Fallback Active)
              </span>
            )}
            <button
              onClick={loadVideos}
              title="Refresh video list"
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <a
          href={`https://www.youtube.com/channel/${channelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 self-start sm:self-end transition-colors shrink-0 shadow-xs"
        >
          <span>YouTube Channel</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-colors min-h-[40px] cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dedicated App Promotion Shorts Section (Completely Separated from Kids Mode) */}
      {promoVideos.length > 0 && (
        <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 p-6 rounded-3xl border-2 border-sky-300 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-600 text-white rounded-full text-xs font-black uppercase tracking-wider mb-1">
                <span>🚀 App Promotion Shorts</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Official App Feature Broadcasts (1080x1920 MP4)
              </h3>
              <p className="text-xs text-slate-600 font-bold">
                Promoting Kids Mode, Literature, Poetry, and Interactive Learning features.
              </p>
            </div>
            <span className="text-xs font-black px-3 py-1 bg-sky-100 text-sky-900 rounded-xl">
              {promoVideos.length} Promo{promoVideos.length === 1 ? '' : 's'} Ready
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {promoVideos.map((pvid) => (
              <div
                key={pvid.contentId}
                onClick={() => setActivePromoModal(pvid)}
                className="group bg-white rounded-2xl border-2 border-sky-200 hover:border-sky-500 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[9/16] bg-slate-900 overflow-hidden">
                  <img
                    src={pvid.thumbnailUrl}
                    alt={pvid.topic}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    {pvid.durationSeconds}s
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-black text-slate-900 line-clamp-1">{pvid.topic}</h4>
                  <p className="text-[10px] font-bold text-sky-700">{pvid.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Direct App Promo Video Player */}
      {activePromoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md max-h-[95vh] bg-slate-900 text-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
              <span className="text-xs font-black text-sky-400">
                🚀 {activePromoModal.topic}
              </span>
              <button
                onClick={() => setActivePromoModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[9/16] w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                key={activePromoModal.contentId}
                src={activePromoModal.videoUrl}
                preload="metadata"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-medium">1080x1920 HD • Sound on 🔊</span>
              <a
                href={`/api/download/video?file=${activePromoModal.videoUrl.split('/').pop()}`}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl shadow-xs"
              >
                Download MP4
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="aspect-video w-full bg-slate-200" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Videos Grid */}
      {!isLoading && filteredVideos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onSelectVideo(vid)}
              className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 hover:border-sky-400 hover:shadow-xl transition-all cursor-pointer overflow-hidden text-left"
            >
              {/* Thumbnail Canvas */}
              <div
                className={`relative aspect-video w-full ${
                  vid.imageUrl || vid.thumbnailUrl
                    ? 'bg-slate-900'
                    : `bg-gradient-to-tr ${vid.gradient || 'from-sky-700 to-indigo-900'}`
                } p-4 sm:p-5 flex flex-col justify-between text-white overflow-hidden`}
              >
                {/* Real YouTube Thumbnail Image if present */}
                {(vid.imageUrl || vid.thumbnailUrl) && (
                  <img
                    src={vid.imageUrl || vid.thumbnailUrl}
                    alt={vid.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    loading="lazy"
                  />
                )}

                <div className="flex items-center justify-between z-10 relative">
                  <span className="text-xs sm:text-sm font-bold bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                    {vid.category || 'Video'}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold bg-black/70 px-2.5 py-1 rounded backdrop-blur-xs">
                    {vid.duration || 'Video'}
                  </span>
                </div>

                {/* Center Play Icon Hover Effect */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                <div className="z-10 relative">
                  {vid.titleUrdu && (
                    <p className="font-urdu text-base font-bold text-amber-200 text-right drop-shadow-md">
                      {vid.titleUrdu}
                    </p>
                  )}
                </div>
              </div>

              {/* Video Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span>{vid.views || 'Official Upload'}</span>
                    <span aria-hidden="true">·</span>
                    <span>World of Light</span>
                  </div>
                  <span className="font-extrabold text-sky-600 group-hover:text-sky-700">Watch</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredVideos.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No videos found for this category</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Try switching to "All" to browse all uploaded broadcasts and educational videos.
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-6 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-sky-700 transition-colors"
          >
            Show All Videos
          </button>
        </div>
      )}
    </div>
  );
};
