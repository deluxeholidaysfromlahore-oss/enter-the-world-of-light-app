import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Heart,
  Bookmark,
  Calendar,
  MapPin,
  ArrowRight,
  Maximize2,
  Filter,
} from 'lucide-react';
import { ContentItem } from '../../types';
import {
  DirectoryProfile,
  DirectoryCategory,
  PoetEraType,
} from '../../types/directory';

interface CategoryDirectoryProps {
  /** List of profiles (e.g. Poets, Story Traditions) */
  profiles: DirectoryProfile[];
  /** Optional initially active profile ID */
  initialProfileId?: string;
  /** Section Kicker */
  sectionKicker?: string;
  /** Main Section Title */
  sectionTitle?: string;
  /** Urdu Section Title */
  sectionTitleUrdu?: string;
  /** Callback to trigger full-screen ReaderModal */
  onOpenReaderModal?: (item: ContentItem) => void;
  /** Callback for toggling favorites */
  onFavorite?: (item: ContentItem) => void;
  /** Current favorite states map */
  favorites?: Record<string, boolean>;
  /** Optional custom container CSS classes */
  className?: string;
}

export const CategoryDirectory: React.FC<CategoryDirectoryProps> = ({
  profiles,
  initialProfileId,
  sectionKicker = 'INDEX OF POETS',
  sectionTitle = 'Selected Poetry of Hundreds of Poets',
  sectionTitleUrdu = 'منتخب شعراء کا اشاریہ و دیوان',
  onOpenReaderModal,
  onFavorite,
  favorites = {},
  className = '',
}) => {
  // Navigation State:
  // selectedProfileId: null means showing the Rekhta-style Index of Poets list
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    initialProfileId || null
  );

  // Active Category inside a selected profile
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  // Active Subcategory (e.g., Bang-e-Dara, Bal-e-Jibril)
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);

  // Active Content Item for In-Place Reader
  const [activeReaderItem, setActiveReaderItem] = useState<ContentItem | null>(null);

  // Index Controls (Rekhta Filter System)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<PoetEraType | 'all'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  // Reader Preferences
  const [readerFontSize, setReaderFontSize] = useState<'normal' | 'large' | 'huge'>('large');
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedId, setBookmarkedId] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  // Alphabet characters for A-Z bar
  const alphabet = useMemo(
    () => [
      'ALL',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
    []
  );

  // Filtered profiles for Index
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // 1. Era filter
      if (selectedEra !== 'all' && p.era !== selectedEra) {
        return false;
      }

      // 2. Alphabet filter
      if (selectedLetter !== 'ALL') {
        const firstChar = p.name.trim().toUpperCase().charAt(0);
        if (firstChar !== selectedLetter) {
          return false;
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchNameUrdu = p.nameUrdu?.toLowerCase().includes(q);
        const matchLocation = p.location?.toLowerCase().includes(q);
        const matchIntro = p.introduction.toLowerCase().includes(q);
        const matchCategory = p.categories.some(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.titleUrdu?.toLowerCase().includes(q) ||
            c.items?.some((it) => it.title.toLowerCase().includes(q))
        );
        return matchName || matchNameUrdu || matchLocation || matchIntro || matchCategory;
      }

      return true;
    });
  }, [profiles, selectedEra, selectedLetter, searchQuery]);

  // Current selected profile
  const currentProfile = useMemo(() => {
    if (!selectedProfileId) return null;
    return profiles.find((p) => p.id === selectedProfileId) || null;
  }, [profiles, selectedProfileId]);

  // Current active category inside the selected profile
  const activeCategory = useMemo(() => {
    if (!currentProfile || !activeCategoryId) return null;
    return currentProfile.categories.find((c) => c.id === activeCategoryId) || null;
  }, [currentProfile, activeCategoryId]);

  // Current active subcategory
  const activeSubcategory = useMemo(() => {
    if (!activeCategory || !activeCategory.subcategories) return null;
    if (activeSubcategoryId) {
      return activeCategory.subcategories.find((s) => s.id === activeSubcategoryId) || null;
    }
    return activeCategory.subcategories[0] || null;
  }, [activeCategory, activeSubcategoryId]);

  // Current items for category view
  const currentCategoryItems = useMemo(() => {
    if (!activeCategory) return [];
    if (activeCategory.subcategories && activeCategory.subcategories.length > 0) {
      return activeSubcategory ? activeSubcategory.items : [];
    }
    return activeCategory.items || [];
  }, [activeCategory, activeSubcategory]);

  // Navigation Handlers
  const handleOpenProfile = (profileId: string, initialCategoryKey?: string) => {
    setSelectedProfileId(profileId);
    setActiveReaderItem(null);

    const profile = profiles.find((p) => p.id === profileId);
    if (profile && initialCategoryKey) {
      const targetCat = profile.categories.find(
        (c) => c.key === initialCategoryKey || c.id.toLowerCase().includes(initialCategoryKey)
      );
      if (targetCat) {
        setActiveCategoryId(targetCat.id);
        setActiveSubcategoryId(targetCat.subcategories?.[0]?.id || null);
        return;
      }
    }

    setActiveCategoryId(null);
    setActiveSubcategoryId(null);
  };

  const handleOpenCategory = (categoryId: string) => {
    const cat = currentProfile?.categories.find((c) => c.id === categoryId);
    setActiveCategoryId(categoryId);
    setActiveSubcategoryId(cat?.subcategories?.[0]?.id || null);
    setActiveReaderItem(null);
  };

  const handleBackToIndex = () => {
    setSelectedProfileId(null);
    setActiveCategoryId(null);
    setActiveSubcategoryId(null);
    setActiveReaderItem(null);
  };

  const handleBackToProfileCard = () => {
    setActiveCategoryId(null);
    setActiveSubcategoryId(null);
    setActiveReaderItem(null);
  };

  const handleOpenReader = (item: ContentItem) => {
    setActiveReaderItem(item);
  };

  const handleBackToCategory = () => {
    setActiveReaderItem(null);
  };

  // Copy helper
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Share helper
  const handleShare = async (title: string, body: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: body,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    handleCopyText(`${title}\n\n${body}`, 'share');
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  // Helper to get distinct category text color
  const getCategoryTextColor = (key?: string) => {
    switch (key) {
      case 'poetry':
        return 'text-amber-800 hover:text-amber-950 border-amber-300';
      case 'poems':
        return 'text-emerald-800 hover:text-emerald-950 border-emerald-300';
      case 'books':
        return 'text-purple-800 hover:text-purple-950 border-purple-300';
      case 'themes':
        return 'text-sky-800 hover:text-sky-950 border-sky-300';
      case 'naat':
        return 'text-teal-800 hover:text-teal-950 border-teal-300';
      case 'sher':
        return 'text-rose-800 hover:text-rose-950 border-rose-300';
      case 'prose':
      default:
        return 'text-stone-800 hover:text-stone-950 border-stone-300';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* ========================================================
          CASE A: INDEX OF POETS LIST (REKHTA DIRECTORY SCREEN)
          ======================================================== */}
      {!selectedProfileId && (
        <div className="w-full bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
          {/* Top Title Banner */}
          <div className="p-6 sm:p-8 border-b border-stone-200/80 bg-stone-50/50">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-stone-900">
                  {sectionKicker}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                  {sectionTitle}
                </p>
              </div>
              <p className="font-urdu text-xl sm:text-2xl font-bold text-stone-700 text-right">
                {sectionTitleUrdu}
              </p>
            </div>

            {/* Rekhta Era Filter Tabs */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 border-b border-stone-200/60">
              {[
                { label: 'ALL POETS', value: 'all' },
                { label: 'CLASSICAL', value: 'classical' },
                { label: 'MODERN', value: 'modern' },
                { label: 'WOMEN POETS', value: 'women' },
                { label: 'PROGRESSIVE', value: 'progressive' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setSelectedEra(tab.value as PoetEraType | 'all');
                    setSelectedLetter('ALL');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap border-b-2 -mb-[1px] ${
                    selectedEra === tab.value
                      ? 'border-sky-600 text-sky-700'
                      : 'border-transparent text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div className="mt-4 relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search poet by name, era, takhallus, or city (e.g. Iqbal, Ghalib, Lahore)..."
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all min-h-[42px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* A-Z Alphabet Strip (Matching Rekhta Screenshot) */}
            <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-1 text-xs font-bold text-stone-600">
              {alphabet.map((letter) => {
                const isActive = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-rose-600 text-white font-extrabold shadow-2xs'
                        : 'hover:bg-stone-200/80 hover:text-stone-900'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Poets Directory List */}
          <div className="divide-y divide-stone-100">
            {filteredProfiles.length === 0 ? (
              <div className="py-20 text-center text-stone-500 text-sm">
                No poets match your current filters.
                <div className="mt-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedEra('all');
                      setSelectedLetter('ALL');
                    }}
                    className="text-xs font-bold text-sky-700 hover:underline cursor-pointer"
                  >
                    Clear search and reset filters
                  </button>
                </div>
              </div>
            ) : (
              filteredProfiles.map((poet) => (
                <div
                  key={poet.id}
                  className="p-5 sm:p-7 hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-5 group"
                >
                  {/* Left: Avatar Thumbnail */}
                  <div
                    onClick={() => handleOpenProfile(poet.id)}
                    className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs cursor-pointer group-hover:ring-2 group-hover:ring-sky-500/40 transition-all"
                  >
                    {poet.imageUrl ? (
                      <img
                        src={poet.imageUrl}
                        alt={poet.imageAlt || poet.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    {/* CSS Fallback Monogram */}
                    <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-stone-100 text-stone-700 font-serif font-bold text-lg">
                      <span>{poet.name.charAt(0)}</span>
                    </div>
                  </div>

                  {/* Middle / Main Details - Protected from Text Overflow */}
                  <div className="flex-1 min-w-0 space-y-1.5 w-full">
                    {/* Poet Name & Urdu Script */}
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3
                        onClick={() => handleOpenProfile(poet.id)}
                        className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-sky-700 transition-colors cursor-pointer tracking-tight"
                      >
                        {poet.name}
                      </h3>
                      {poet.nameUrdu && (
                        <span className="font-urdu text-lg sm:text-xl font-bold text-stone-700 text-right leading-relaxed">
                          {poet.nameUrdu}
                        </span>
                      )}
                    </div>

                    {/* Dates & Location */}
                    <div className="flex items-center gap-4 text-xs text-stone-500 flex-wrap">
                      {poet.dates && (
                        <span className="flex items-center gap-1.5 font-mono tabular-nums">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{poet.dates}</span>
                        </span>
                      )}
                      {poet.location && (
                        <span className="flex items-center gap-1 text-sky-600 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-sky-500" />
                          <span>{poet.location}</span>
                        </span>
                      )}
                    </div>

                    {/* Short Description (Safe line clamp without overflow) */}
                    {poet.introduction && (
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed break-words pt-0.5">
                        {poet.introduction}
                      </p>
                    )}

                    {/* ========================================================
                        CRITICAL REKHTA INTERACTIVE CATEGORY DOTS
                        (As shown in rekhta.org_poets-1.png)
                        When hovered, turns bright blue (#0284c7) with pointer!
                        When clicked, opens that poet's category works!
                        ======================================================== */}
                    <div className="pt-2 flex items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-stone-700 uppercase tracking-wide flex-wrap">
                      {/* Sher Count Link */}
                      {poet.counts?.sher !== undefined && poet.counts.sher > 0 && (
                        <button
                          onClick={() => handleOpenProfile(poet.id, 'sher')}
                          className="hover:text-sky-600 cursor-pointer transition-colors duration-150 py-0.5 inline-flex items-center"
                          title={`View ${poet.counts.sher} Sher by ${poet.name}`}
                        >
                          <span>{poet.counts.sher} SHER</span>
                        </button>
                      )}

                      {poet.counts?.sher !== undefined && poet.counts.ghazal !== undefined && (
                        <span aria-hidden="true" className="text-stone-300">●</span>
                      )}

                      {/* Ghazal Count Link */}
                      {poet.counts?.ghazal !== undefined && poet.counts.ghazal > 0 && (
                        <button
                          onClick={() => handleOpenProfile(poet.id, 'poetry')}
                          className="hover:text-sky-600 cursor-pointer transition-colors duration-150 py-0.5 inline-flex items-center"
                          title={`View ${poet.counts.ghazal} Ghazals by ${poet.name}`}
                        >
                          <span>{poet.counts.ghazal} GHAZAL</span>
                        </button>
                      )}

                      {poet.counts?.ghazal !== undefined && poet.counts.ebook !== undefined && (
                        <span aria-hidden="true" className="text-stone-300">●</span>
                      )}

                      {/* E-Book Count Link (Exactly as zoomed in rekhta.org_poets-1.png!) */}
                      {poet.counts?.ebook !== undefined && poet.counts.ebook > 0 && (
                        <button
                          onClick={() => handleOpenProfile(poet.id, 'books')}
                          className="hover:text-sky-600 cursor-pointer transition-colors duration-150 py-0.5 inline-flex items-center font-bold"
                          title={`View ${poet.counts.ebook} E-Books / Collections by ${poet.name}`}
                        >
                          <span>{poet.counts.ebook} E-BOOK</span>
                        </button>
                      )}

                      {poet.counts?.nazm !== undefined && poet.counts.nazm > 0 && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">●</span>
                          <button
                            onClick={() => handleOpenProfile(poet.id, 'poems')}
                            className="hover:text-sky-600 cursor-pointer transition-colors duration-150 py-0.5 inline-flex items-center"
                            title={`View ${poet.counts.nazm} Nazms by ${poet.name}`}
                          >
                            <span>{poet.counts.nazm} NAZM</span>
                          </button>
                        </>
                      )}

                      {poet.counts?.theme !== undefined && poet.counts.theme > 0 && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">●</span>
                          <button
                            onClick={() => handleOpenProfile(poet.id, 'themes')}
                            className="hover:text-sky-600 cursor-pointer transition-colors duration-150 py-0.5 inline-flex items-center"
                            title={`View ${poet.counts.theme} Themes by ${poet.name}`}
                          >
                            <span>{poet.counts.theme} THEMES</span>
                          </button>
                        </>
                      )}

                      {poet.counts?.naat !== undefined && poet.counts.naat > 0 && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">●</span>
                          <button
                            onClick={() => handleOpenProfile(poet.id, 'naat')}
                            className="hover:text-sky-600 cursor-pointer transition-colors duration-150 py-0.5 inline-flex items-center"
                            title={`View ${poet.counts.naat} Naat & Hamd by ${poet.name}`}
                          >
                            <span>{poet.counts.naat} NAAT</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Button: Open Profile Card */}
                  <div className="shrink-0 self-center hidden md:block">
                    <button
                      onClick={() => handleOpenProfile(poet.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-900 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Explore Works</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          CASE B: USER-REQUESTED SINGLE-BOX POET PROFILE CARD
          (Level 1 of selected poet)
          ======================================================== */}
      {selectedProfileId && currentProfile && !activeCategoryId && (
        <div className="space-y-6">
          {/* Back to Index Button */}
          <button
            onClick={handleBackToIndex}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>← Back to Index of Poets</span>
          </button>

          {/* MAIN SCREEN COHESIVE FRAME (Single Unified Surface Color) */}
          <div className="w-full bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 space-y-8 overflow-hidden">
            {/* 1. Header Lockup: Square Image, Name, Dates, Intro */}
            <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-stone-100">
              {/* Square Image / Fallback Container */}
              <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs">
                {currentProfile.imageUrl ? (
                  <img
                    src={currentProfile.imageUrl}
                    alt={currentProfile.imageAlt || currentProfile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-stone-100 text-stone-700 font-serif font-bold text-xl">
                  <span>{currentProfile.name.charAt(0)}</span>
                </div>
              </div>

              {/* Poet Details - Overflow Safe */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                    {currentProfile.name}
                  </h2>
                  {currentProfile.nameUrdu && (
                    <span className="font-urdu text-2xl font-bold text-stone-800">
                      {currentProfile.nameUrdu}
                    </span>
                  )}
                </div>

                {/* Dates & Location */}
                <div className="flex items-center gap-3 text-xs sm:text-sm text-stone-500 font-mono tabular-nums flex-wrap">
                  {currentProfile.dates && <span>{currentProfile.dates}</span>}
                  {currentProfile.location && (
                    <>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-sky-600 font-medium font-sans">{currentProfile.location}</span>
                    </>
                  )}
                  {currentProfile.roleOrSubtitle && (
                    <>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="font-sans text-stone-600 font-medium">{currentProfile.roleOrSubtitle}</span>
                    </>
                  )}
                </div>

                {/* Short Intro Text (No text overflow, break-words) */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1 break-words">
                  {currentProfile.introduction}
                </p>

                {currentProfile.introductionUrdu && (
                  <p className="font-urdu text-base text-stone-700 leading-loose pt-0.5 text-right">
                    {currentProfile.introductionUrdu}
                  </p>
                )}
              </div>
            </div>

            {/* 2. CATEGORY TILES (As Requested by User:
                | POETRY | | POEMS | | BOOKS | | THEMES | (Click Me)
                No icons, text color distinct for each category, box background uniform and clean) */}
            <div>
              <div className="mb-3 text-xs uppercase tracking-wider font-bold text-stone-500">
                Browse Works by Category
              </div>

              {/* Category Grid: Responsive 1-2 on mobile, 2-3 on tablet, 2-4 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {currentProfile.categories.map((category) => {
                  const textColorClass = getCategoryTextColor(category.key);
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleOpenCategory(category.id)}
                      className="group p-4 sm:p-5 rounded-2xl bg-stone-50 hover:bg-stone-100/90 border border-stone-200/80 hover:border-stone-300 transition-all cursor-pointer text-left flex flex-col justify-between min-h-[105px] overflow-hidden"
                    >
                      <div className="space-y-1 w-full min-w-0">
                        {/* Category Title with Distinct Text Color */}
                        <div className={`text-xs sm:text-sm font-black uppercase tracking-wider break-words ${textColorClass}`}>
                          {category.title}
                        </div>
                        {category.titleUrdu && (
                          <div className="font-urdu text-sm font-bold text-stone-700 text-right leading-normal">
                            {category.titleUrdu}
                          </div>
                        )}
                      </div>

                      {/* Explicit "(Click to View)" or count indicator */}
                      <div className="pt-2.5 mt-1 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                        <span className="font-mono tabular-nums">{category.countLabel}</span>
                        <span className="text-sky-600 font-bold group-hover:translate-x-0.5 transition-transform">
                          (Click to View)
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CASE C: LEVEL 2 (CATEGORY / SUB-CATEGORY / WORKS LIST)
          ======================================================== */}
      {selectedProfileId && currentProfile && activeCategoryId && activeCategory && !activeReaderItem && (
        <div className="w-full bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 space-y-6 overflow-hidden">
          {/* Breadcrumb Navigation Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
            <button
              onClick={handleBackToProfileCard}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to {currentProfile.name}&rsquo;s Profile</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
              <button
                onClick={handleBackToIndex}
                className="hover:text-stone-900 cursor-pointer"
              >
                Poets Index
              </button>
              <span aria-hidden="true">/</span>
              <button
                onClick={handleBackToProfileCard}
                className="hover:text-stone-900 cursor-pointer"
              >
                {currentProfile.name}
              </button>
              <span aria-hidden="true">/</span>
              <strong className="text-stone-900 font-bold">{activeCategory.title}</strong>
            </div>
          </div>

          {/* Active Category Banner */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  {activeCategory.title}
                </h2>
                <span className="text-xs font-mono font-medium text-stone-600 px-2.5 py-0.5 bg-stone-100 rounded-md">
                  {activeCategory.countLabel}
                </span>
              </div>
              {activeCategory.description && (
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl break-words">
                  {activeCategory.description}
                </p>
              )}
            </div>

            {activeCategory.titleUrdu && (
              <span className="font-urdu text-xl sm:text-2xl font-bold text-stone-800 text-right leading-loose">
                {activeCategory.titleUrdu}
              </span>
            )}
          </div>

          {/* Subcategory / Books Tabs if applicable */}
          {activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-2 border-b border-stone-100">
              {activeCategory.subcategories.map((sub) => {
                const isSubActive = sub.id === activeSubcategory?.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubcategoryId(sub.id)}
                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-colors min-h-[40px] cursor-pointer flex items-center gap-2 ${
                      isSubActive
                        ? 'bg-stone-900 text-white shadow-2xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <span>{sub.title}</span>
                    {sub.countLabel && (
                      <span className={`text-xs opacity-75 font-mono ${isSubActive ? 'text-amber-200' : 'text-stone-500'}`}>
                        ({sub.items.length})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Works List with Fixed Overflow & Generous Nastaliq Line Heights */}
          <div className="space-y-3.5 pt-2">
            {currentCategoryItems.length === 0 ? (
              <div className="py-12 text-center text-stone-500 text-sm">
                No items listed under this category yet.
              </div>
            ) : (
              currentCategoryItems.map((item) => {
                const isFav = !!favorites[item.id];
                return (
                  <div
                    key={item.id}
                    className="group p-5 sm:p-6 rounded-2xl border border-stone-200/90 hover:border-sky-300 hover:shadow-xs transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden"
                  >
                    {/* Left Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h4
                          onClick={() => handleOpenReader(item)}
                          className="text-base sm:text-lg font-bold text-stone-900 hover:text-sky-700 transition-colors cursor-pointer break-words"
                        >
                          {item.title}
                        </h4>
                        {item.titleUrdu && (
                          <span className="font-urdu text-lg sm:text-xl font-bold text-stone-800 text-right leading-loose break-words">
                            {item.titleUrdu}
                          </span>
                        )}
                      </div>

                      {/* Couplet preview with generous Urdu line-height so dots never clip */}
                      {item.contentBodyUrdu ? (
                        <p
                          onClick={() => handleOpenReader(item)}
                          className="font-urdu text-lg sm:text-xl text-stone-800 leading-loose text-right line-clamp-2 cursor-pointer hover:text-sky-900 transition-colors py-1 break-words"
                        >
                          {item.contentBodyUrdu.split('\n').slice(0, 2).join(' / ')}
                        </p>
                      ) : item.description ? (
                        <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 break-words">
                          {item.description}
                        </p>
                      ) : null}

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 pt-1">
                        <span>{item.poetName || item.author || currentProfile.name}</span>
                        {item.subcategory && (
                          <>
                            <span aria-hidden="true" className="text-stone-300">·</span>
                            <span>{item.subcategory}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="shrink-0 flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                      {/* Copy */}
                      <button
                        onClick={() => {
                          const txt = `${item.titleUrdu ? item.titleUrdu + '\n' : ''}${
                            item.contentBodyUrdu || item.contentBody || item.description
                          }\n— ${item.poetName || item.author || currentProfile.name}`;
                          handleCopyText(txt, item.id);
                        }}
                        title="Copy couplet"
                        className="p-2 text-stone-400 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Favorite */}
                      {onFavorite && (
                        <button
                          onClick={() => onFavorite(item)}
                          title="Save verse"
                          className={`p-2 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer ${
                            isFav ? 'text-rose-500' : 'text-stone-400 hover:text-rose-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                      )}

                      {/* Dedicated Read Button */}
                      <button
                        onClick={() => handleOpenReader(item)}
                        className="px-3.5 py-2 text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Maximize to global modal */}
                      {onOpenReaderModal && (
                        <button
                          onClick={() => onOpenReaderModal(item)}
                          title="Open Full Screen Modal"
                          className="p-2 text-stone-400 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          CASE D: LEVEL 3 (FINAL CONTENT READER VIEW)
          ======================================================== */}
      {selectedProfileId && currentProfile && activeReaderItem && (
        <div className="w-full bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 space-y-6 overflow-hidden">
          {/* Top Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
            <button
              onClick={handleBackToCategory}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to {activeCategory?.title || 'List'}</span>
            </button>

            {/* Reader Action Controls */}
            <div className="flex items-center gap-2">
              {/* Font Size Toggle */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200/60">
                <button
                  onClick={() => setReaderFontSize('normal')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    readerFontSize === 'normal'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setReaderFontSize('large')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    readerFontSize === 'large'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => setReaderFontSize('huge')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    readerFontSize === 'huge'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  A++
                </button>
              </div>

              {/* Translation toggle if both Urdu & English present */}
              {activeReaderItem.contentBody && activeReaderItem.contentBodyUrdu && (
                <button
                  onClick={() => setShowTranslation((prev) => !prev)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                    showTranslation
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {showTranslation ? 'Hide Translation' : 'Show Translation'}
                </button>
              )}

              {/* Copy */}
              <button
                onClick={() => {
                  const fullText = `${activeReaderItem.title}\n\n${
                    activeReaderItem.contentBodyUrdu ? activeReaderItem.contentBodyUrdu + '\n\n' : ''
                  }${activeReaderItem.contentBody || ''}\n— ${
                    activeReaderItem.poetName || activeReaderItem.author || currentProfile.name
                  }`;
                  handleCopyText(fullText, activeReaderItem.id);
                }}
                title="Copy verse"
                className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-100 border border-stone-200/80 transition-colors cursor-pointer"
              >
                {copiedId === activeReaderItem.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              {/* Favorite */}
              {onFavorite && (
                <button
                  onClick={() => onFavorite(activeReaderItem)}
                  title="Favorite"
                  className="p-2 text-stone-500 hover:text-rose-500 rounded-xl hover:bg-stone-100 border border-stone-200/80 transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[activeReaderItem.id] ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>
              )}

              {/* Bookmark */}
              <button
                onClick={() => setBookmarkedId((prev) => (prev === activeReaderItem.id ? null : activeReaderItem.id))}
                title="Bookmark"
                className={`p-2 rounded-xl hover:bg-stone-100 border border-stone-200/80 transition-colors cursor-pointer ${
                  bookmarkedId === activeReaderItem.id
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-stone-500 hover:text-amber-600'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedId === activeReaderItem.id ? 'fill-amber-600' : ''
                  }`}
                />
              </button>

              {/* Share */}
              <button
                onClick={() =>
                  handleShare(
                    activeReaderItem.title,
                    activeReaderItem.contentBodyUrdu || activeReaderItem.contentBody || ''
                  )
                }
                title="Share"
                className="p-2 text-stone-500 hover:text-stone-900 rounded-xl hover:bg-stone-100 border border-stone-200/80 transition-colors cursor-pointer"
              >
                {shareSuccess ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2 max-w-3xl mx-auto text-center pt-2">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-500">
              {activeCategory?.title} {activeReaderItem.subcategory ? `· ${activeReaderItem.subcategory}` : ''}
            </div>

            {activeReaderItem.titleUrdu && (
              <h2 className="font-urdu text-3xl sm:text-4xl font-bold text-stone-900 leading-loose py-1">
                {activeReaderItem.titleUrdu}
              </h2>
            )}

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-800">
              {activeReaderItem.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              — {activeReaderItem.poetName || activeReaderItem.author || currentProfile.name}
            </p>
          </div>

          {/* Dedicated Reader Container with Zero Overflow */}
          <div className="max-w-3xl mx-auto bg-stone-50/70 p-7 sm:p-12 rounded-3xl border border-stone-200/90 shadow-2xs space-y-8 overflow-hidden">
            {/* Nastaliq text container with generous line height */}
            {activeReaderItem.contentBodyUrdu && (
              <div
                className={`font-urdu font-bold text-stone-950 text-right leading-[2.4] whitespace-pre-line dir-rtl py-2 break-words selection:bg-amber-200 selection:text-amber-950 ${
                  readerFontSize === 'normal'
                    ? 'text-2xl sm:text-3xl'
                    : readerFontSize === 'large'
                    ? 'text-3xl sm:text-4xl'
                    : 'text-4xl sm:text-5xl'
                }`}
              >
                {activeReaderItem.contentBodyUrdu}
              </div>
            )}

            {/* English translation / commentary */}
            {showTranslation && activeReaderItem.contentBody && (
              <div
                className={`pt-6 border-t border-stone-200/80 font-serif italic text-stone-700 leading-relaxed whitespace-pre-line break-words ${
                  readerFontSize === 'normal'
                    ? 'text-base sm:text-lg'
                    : readerFontSize === 'large'
                    ? 'text-lg sm:text-xl'
                    : 'text-xl sm:text-2xl'
                }`}
              >
                {activeReaderItem.contentBody}
              </div>
            )}
          </div>

          {/* Bottom Back Button */}
          <div className="max-w-3xl mx-auto pt-4 flex items-center justify-between text-xs text-stone-500">
            <button
              onClick={handleBackToCategory}
              className="font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to {activeCategory?.title}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
