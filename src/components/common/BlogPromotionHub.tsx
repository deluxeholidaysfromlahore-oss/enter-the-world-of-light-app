import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Sparkles,
  Feather,
  Brain,
  PenTool,
  ArrowUpRight,
  Globe,
  Share2,
  Check,
  TrendingUp,
  BookmarkCheck,
  Layers,
} from 'lucide-react';

interface SeoTopicChip {
  id: string;
  name: string;
  nameUrdu: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  seoKeywords: string[];
  primarySearchQuery: string;
  secondarySearchQuery: string;
}

const SEO_TOPICS: SeoTopicChip[] = [
  {
    id: 'urdu-tracing',
    name: 'Urdu Tracing',
    nameUrdu: 'اردو ٹریسنگ و حروف',
    icon: PenTool,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 hover:bg-amber-100/80',
    borderColor: 'border-amber-200/90 hover:border-amber-400',
    textColor: 'text-amber-800',
    description:
      'Printable dotted tracing sheets, stroke-order rules, Haroof-e-Tahajji phonics, and handwriting mastery for toddlers and beginners.',
    seoKeywords: ['#UrduTracing', '#HaroofETahajji', '#UrduPhonics', '#PreschoolWorksheets'],
    primarySearchQuery: 'Urdu+Tracing',
    secondarySearchQuery: 'Urdu+Tracing',
  },
  {
    id: 'classical-poetry',
    name: 'Classical Poetry',
    nameUrdu: 'کلاسیکی اردو شاعری',
    icon: Feather,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100/80',
    borderColor: 'border-purple-200/90 hover:border-purple-400',
    textColor: 'text-purple-800',
    description:
      "Deep literary commentary on Allama Iqbal's Khudi, Mirza Ghalib's timeless couplets, and Faiz Ahmad Faiz's progressive nazms.",
    seoKeywords: ['#AllamaIqbal', '#MirzaGhalib', '#FaizAhmadFaiz', '#UrduPoetry', '#Khudi'],
    primarySearchQuery: 'Classical+Poetry',
    secondarySearchQuery: 'Classical+Poetry',
  },
  {
    id: 'moral-stories',
    name: 'Moral Stories',
    nameUrdu: 'اخلاقی کہانیاں و سبق آموز قصے',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 hover:bg-emerald-100/80',
    borderColor: 'border-emerald-200/90 hover:border-emerald-400',
    textColor: 'text-emerald-800',
    description:
      'Value-driven narratives on honesty, gratitude, perseverance, and character-building tales designed for bilingual families.',
    seoKeywords: ['#MoralStories', '#KidsCharacterBuilding', '#IslamicWisdom', '#BedtimeStories'],
    primarySearchQuery: 'Moral+Stories',
    secondarySearchQuery: 'Moral+Stories',
  },
  {
    id: 'mind-gym',
    name: 'Mind Gym',
    nameUrdu: 'ذہنی ورزش و اسپیڈ میتھ',
    icon: Brain,
    color: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50 hover:bg-sky-100/80',
    borderColor: 'border-sky-200/90 hover:border-sky-400',
    textColor: 'text-sky-800',
    description:
      'Speed math calculation shortcuts, mental arithmetic drills, logical thinking puzzles, and neuro-agility workouts for sharp minds.',
    seoKeywords: ['#MindGym', '#SpeedMath', '#MentalArithmetic', '#BrainPuzzles', '#CognitiveAgility'],
    primarySearchQuery: 'Mind+Gym',
    secondarySearchQuery: 'Mind+Gym',
  },
];

const PRIMARY_BLOG = {
  name: 'Enter the World of Light & Laughter',
  nameUrdu: 'روشنی اور مسکراہٹوں کی دنیا (مین بلاگ)',
  url: 'https://entertheworldoflightandlaughter.blogspot.com',
  badge: 'Primary Publication',
  badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-300',
  summary:
    'Our flagship educational publication hosting step-by-step phonics guides, downloadable worksheets, moral video transcripts, and illustrated lessons.',
  stats: '150+ Curated Articles • 24/7 Educational Resources',
  tagline: 'Kids Learning, Phonics & Family Wisdom',
};

const SECONDARY_BLOG = {
  name: 'Light & Laughter Insights',
  nameUrdu: 'بصیرت و ادبی تجزیات (سیکنڈری بلاگ)',
  url: 'https://entertheworldoflightinsights.blogspot.com',
  badge: 'Insights & Literary Essays',
  badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
  summary:
    'Dedicated analytical portal featuring deep literary critique of classical Urdu poetry, intellectual essays, curriculum philosophy, and speed math research.',
  stats: 'In-Depth Analytical Essays • Cognitive Research',
  tagline: 'Philosophy, Literary Critique & Mind Gym',
};

export const BlogPromotionHub: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('urdu-tracing');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const selectedTopic = SEO_TOPICS.find((t) => t.id === selectedTopicId) || SEO_TOPICS[0];

  const handleCopy = (url: string, label: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(label);
      setTimeout(() => setCopiedLink(null), 2500);
    });
  };

  return (
    <section
      aria-label="Official Blogger Publications & SEO Hub"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 mt-16 mb-4"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800 p-6 sm:p-10">
        {/* Subtle decorative background glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold tracking-wide uppercase mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Official Blogger Network • بلاگ نیٹ ورک</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Official Publications & Deep-Dive Archives
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Explore our twin Blogger publications for printable tracing worksheets, in-depth literary commentary on classical Urdu poetry, moral character-building guides, and speed math drills.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PRIMARY_BLOG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>Visit Primary Blog</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={SECONDARY_BLOG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>Read Insights</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Two Featured Blog Showcase Cards */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          {/* Primary Blog Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-amber-500/30 p-6 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {PRIMARY_BLOG.badge}
                </span>
                <button
                  onClick={() => handleCopy(PRIMARY_BLOG.url, 'Primary')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
                  title="Copy link"
                >
                  {copiedLink === 'Primary' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {PRIMARY_BLOG.name}
              </h3>
              <p className="text-xs text-amber-200/80 font-medium mt-1 font-arabic">
                {PRIMARY_BLOG.nameUrdu}
              </p>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {PRIMARY_BLOG.summary}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-mono bg-slate-950/70 px-2.5 py-1 rounded-md text-amber-300/90 border border-slate-800 truncate max-w-full">
                  entertheworldoflightandlaughter.blogspot.com
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-300">{PRIMARY_BLOG.stats}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={PRIMARY_BLOG.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-md"
              >
                <span>Open Primary Blog</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Secondary Blog Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-indigo-500/30 p-6 flex flex-col justify-between hover:border-indigo-400/60 transition-all shadow-xl group">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-400/10 text-indigo-300 border border-indigo-400/30">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  {SECONDARY_BLOG.badge}
                </span>
                <button
                  onClick={() => handleCopy(SECONDARY_BLOG.url, 'Secondary')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors"
                  title="Copy link"
                >
                  {copiedLink === 'Secondary' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                {SECONDARY_BLOG.name}
              </h3>
              <p className="text-xs text-indigo-200/80 font-medium mt-1 font-arabic">
                {SECONDARY_BLOG.nameUrdu}
              </p>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {SECONDARY_BLOG.summary}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-mono bg-slate-950/70 px-2.5 py-1 rounded-md text-indigo-300/90 border border-slate-800 truncate max-w-full">
                  entertheworldoflightinsights.blogspot.com
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-slate-300">{SECONDARY_BLOG.stats}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SECONDARY_BLOG.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm transition-all shadow-md"
              >
                <span>Open Insights Blog</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* SEO Topic Chips Section */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Trending SEO Topic Hubs
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Select a specialty topic to view articles and jump directly to curated archives on both publications:
              </p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700/80 shrink-0">
              4 Pillar Topics
            </span>
          </div>

          {/* Interactive Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {SEO_TOPICS.map((topic) => {
              const Icon = topic.icon;
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/95 border-sky-400 shadow-lg shadow-sky-500/10 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${topic.color} text-white shadow-sm`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <BookmarkCheck className="w-4 h-4 text-sky-400 shrink-0" />
                    )}
                  </div>
                  <span className="font-extrabold text-sm text-white tracking-tight">
                    {topic.name}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 font-arabic">
                    {topic.nameUrdu}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Topic Detailed Actions Box */}
          <div className="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Topic In Focus:
                </span>
                <span className="font-bold text-white text-sm sm:text-base">
                  {selectedTopic.name} &bull; {selectedTopic.nameUrdu}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedTopic.description}
              </p>
              {/* Hashtag pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {selectedTopic.seoKeywords.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-sky-300/90 border border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Jump Buttons to Both Blogs for this Topic */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <a
                href={`${PRIMARY_BLOG.url}/search?q=${selectedTopic.primarySearchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Read on Primary Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`${SECONDARY_BLOG.url}/search?q=${selectedTopic.secondarySearchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
              >
                <span>Read on Insights Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
