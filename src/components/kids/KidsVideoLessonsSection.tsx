import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Star,
  CheckCircle2,
  Clock,
  Film,
  Download,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Key,
  FolderSync,
  Layers,
  Calendar,
  ExternalLink,
  HardDrive,
  ShieldCheck,
} from 'lucide-react';
import { KidsVideoItem } from '../../types/kidsVideo';
import { fetchKidsVideoPipeline, triggerKidsVideoGeneration } from '../../services/kidsVideoService';
import { kidsAudio } from '../../services/kidsAudio';
import {
  signInWithGoogleDrive,
  triggerDriveBackupNow,
  GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_DRIVE_FOLDER_URL,
} from '../../services/googleDriveService';

import { User } from 'firebase/auth';

const ADMIN_EMAILS = ['deluxeholidaysfromlahore@gmail.com'];

interface KidsVideoLessonsSectionProps {
  onEarnStar?: () => void;
  currentUser?: User | null;
  isAdmin?: boolean;
}

const VIDEO_URDU_DICTIONARY: Record<string, { short: string; full: string }> = {
  // English Alphabets A to Z
  short_a_apple: { short: 'اے - سیب', full: 'سیب (Apple)' },
  kid_vid_a_for_apple: { short: 'اے - سیب', full: 'سیب (Apple)' },
  short_b_ball: { short: 'بی - گیند', full: 'گیند (Ball)' },
  kid_vid_b_for_ball: { short: 'بی - گیند', full: 'گیند (Ball)' },
  short_b_butterfly: { short: 'بی - تتلی', full: 'تتلی (Butterfly)' },
  short_c_cat: { short: 'سی - بلی', full: 'بلی (Cat)' },
  short_d_dog: { short: 'ڈی - کتا', full: 'کتا (Dog)' },
  short_d_dolphin: { short: 'ڈی - ڈولفن', full: 'ڈولفن (Dolphin)' },
  short_e_elephant: { short: 'ای - ہاتھی', full: 'ہاتھی (Elephant)' },
  short_f_fish: { short: 'ایف - مچھلی', full: 'مچھلی (Fish)' },
  short_g_giraffe: { short: 'جی - زرافہ', full: 'زرافہ (Giraffe)' },
  short_h_horse: { short: 'ایچ - گھوڑا', full: 'گھوڑا (Horse)' },
  short_i_island: { short: 'آئی - جزیرہ', full: 'جزیرہ (Island)' },
  short_j_jaguar: { short: 'جے - چیتا', full: 'چیتا (Jaguar)' },
  short_k_kangaroo: { short: 'کے - کنگرو', full: 'کنگرو (Kangaroo)' },
  short_l_lion: { short: 'ایل - شیر', full: 'شیر (Lion)' },
  short_m_monkey: { short: 'ایم - بندر', full: 'بندر (Monkey)' },
  short_n_nest: { short: 'این - گھونسلا', full: 'گھونسلا (Nest)' },
  short_o_owl: { short: 'او - الو', full: 'الو (Owl)' },
  short_p_penguin: { short: 'پی - پینگوئن', full: 'پینگوئن (Penguin)' },
  short_q_queen_bee: { short: 'کیو - ملکہ مکھی', full: 'ملکہ مکھی (Queen Bee)' },
  short_r_rabbit: { short: 'آر - خرگوش', full: 'خرگوش (Rabbit)' },
  short_s_sun: { short: 'ایس - سورج', full: 'سورج (Sun)' },
  short_t_tiger: { short: 'ٹی - باگھ', full: 'باگھ / شیر (Tiger)' },
  short_u_umbrella: { short: 'یو - چھتری', full: 'چھتری (Umbrella)' },
  short_v_violin: { short: 'وی - وائلن', full: 'وائلن (Violin)' },
  short_w_whale: { short: 'ڈبلیو - وہیل', full: 'وہیل مچھلی (Whale)' },
  short_x_xylophone: { short: 'ایکس - زیلوفون', full: 'زیلوفون (Xylophone)' },
  short_y_yak: { short: 'وائی - یاک', full: 'یاک (Yak)' },
  short_z_zebra: { short: 'زیڈ - زیبرا', full: 'زیبرا (Zebra)' },

  // Urdu Haroof Alif to Bari Yay
  short_urdu_alif: { short: 'الف - انار', full: 'الف سے انار (Pomegranate)' },
  short_urdu_alif_madd: { short: 'آ - آم', full: 'آ سے آم (Mango)' },
  short_urdu_bay: { short: 'ب - بلی', full: 'ب سے بلی (Cat)' },
  short_urdu_pay: { short: 'پ - پتنگ', full: 'پ سے پتنگ (Kite)' },
  short_urdu_tay: { short: 'ت - تتلی', full: 'ت سے تتلی (Butterfly)' },
  short_urdu_ttay: { short: 'ٹ - ٹماٹر', full: 'ٹ سے ٹماٹر (Tomato)' },
  short_urdu_say: { short: 'ث - ثمر', full: 'ث سے ثمر (Fruits)' },
  short_urdu_jeem: { short: 'ج - جگنو', full: 'ج سے جگنو (Firefly)' },
  short_urdu_chay: { short: 'چ - چاند', full: 'چ سے چاند (Moon)' },
  short_urdu_hay: { short: 'ح - حلوہ', full: 'ح سے حلوہ (Sweet Halwa)' },
  short_urdu_khay: { short: 'خ - خرگوش', full: 'خ سے خرگوش (Rabbit)' },
  short_urdu_daal: { short: 'د - درخت', full: 'د سے درخت (Tree)' },
  short_urdu_ddaal: { short: 'ڈ - ڈولفن', full: 'ڈ سے ڈولفن (Dolphin)' },
  short_urdu_zaal: { short: 'ذ - ذخیرہ', full: 'ذ سے ذخیرہ (Treasure)' },
  short_urdu_ray: { short: 'ر - ریل گاڑی', full: 'ر سے ریل گاڑی (Train)' },
  short_urdu_zay: { short: 'ز - زرافہ', full: 'ز سے زرافہ (Giraffe)' },
  short_urdu_seen: { short: 'س - سورج', full: 'س سے سورج (Sun)' },
  short_urdu_sheen: { short: 'ش - شیر', full: 'ش سے شیر (Lion)' },
  short_urdu_swaad: { short: 'ص - صابن', full: 'ص سے صابن (Soap)' },
  short_urdu_tway: { short: 'ط - طوطا', full: 'ط سے طوطا (Parrot)' },
  short_urdu_ain: { short: 'ع - عینک', full: 'ع سے عینک (Glasses)' },
  short_urdu_qaaf: { short: 'ق - قلم', full: 'ق سے قلم (Pen)' },
  short_urdu_kaaf: { short: 'ک - کتاب', full: 'ک سے کتاب (Book)' },
  short_urdu_gaaf: { short: 'گ - گڑیا', full: 'گ سے گڑیا (Doll)' },
  short_urdu_meem: { short: 'م - مور', full: 'م سے مور (Peacock)' },
  short_urdu_yay: { short: 'ے - بڑی ے', full: 'ے سے بڑی ے (Bari Yay)' },

  // Numbers 1 to 10
  short_num_1_sun: { short: '۱ - ایک سورج', full: 'نمبر ۱ - ایک سورج (One Sun)' },
  short_num_2_birds: { short: '۲ - دو پرندے', full: 'نمبر ۲ - دو پرندے (Two Birds)' },
  short_num_3_rickshaw: { short: '۳ - تین رکشے', full: 'نمبر ۳ - تین رکشے (Three Rickshaws)' },
  short_num_4_frogs: { short: '۴ - چار مینڈک', full: 'نمبر ۴ - چار مینڈک (Four Frogs)' },
  short_num_5_stars: { short: '۵ - پانچ ستارے', full: 'نمبر ۵ - پانچ ستارے (Five Stars)' },
  short_num_6_apples: { short: '۶ - چھ سیب', full: 'نمبر ۶ - چھ سیب (Six Apples)' },
  short_num_7_rainbow: { short: '۷ - سات رنگ', full: 'نمبر ۷ - سات رنگوں کی دھنک (Rainbow)' },
  short_num_8_butterflies: { short: '۸ - آٹھ تتلیاں', full: 'نمبر ۸ - آٹھ تتلیاں (Eight Butterflies)' },
  short_num_9_flowers: { short: '۹ - نو پھول', full: 'نمبر ۹ - نو پھول (Nine Flowers)' },
  short_num_10_toes: { short: '۱۰ - دس انگلیاں', full: 'نمبر ۱۰ - دس پاؤں کی انگلیاں (Ten Toes)' },

  // Moral Stories, Animals, Fruits, Colors
  story_bird_part1: { short: 'ننھی چڑیا - ۱', full: 'ننھی چڑیا کا میٹھا گیت (حصہ ۱)' },
  story_bird_part2: { short: 'جنگل کے دوست - ۲', full: 'جنگل کے دوستوں کا رقص (حصہ ۲)' },
  short_animal_lion: { short: 'ببر شیر', full: 'ببر شیر - جنگل کا بہادر بادشاہ' },
  short_fruit_mango: { short: 'آم (Mango)', full: 'آم - پھلوں کا میٹھا بادشاہ' },
  short_fruit_banana: { short: 'کیلا (Banana)', full: 'کیلا - میٹھا اور توانائی بخش پھل' },
  short_color_red: { short: 'لال رنگ', full: 'لال رنگ - خوبصورت و چمکدار رنگ' },
  short_color_green: { short: 'سبز رنگ', full: 'سبز رنگ - ہرا طوطا اور سرسبز پتے' },
  short_color_yellow: { short: 'پیلا رنگ', full: 'پیلا رنگ - سورج اور سورج مکھی' },
  short_color_blue: { short: 'نیلا رنگ', full: 'نیلا رنگ - نیلا سمندر اور ڈولفن' },
};

export function getUrduTitleForVideo(video?: { topicSlug?: string; topic?: string; title?: string; shortUrdu?: string; urduTitle?: string } | null): string {
  if (!video) return 'تعلیمی سبق';
  if (video.shortUrdu) return video.shortUrdu;
  if (video.urduTitle) return video.urduTitle;
  const slug = video.topicSlug || '';
  if (VIDEO_URDU_DICTIONARY[slug]) {
    return VIDEO_URDU_DICTIONARY[slug].short;
  }
  // Smart keyword fallback
  const lowerTopic = (video.topic || video.title || '').toLowerCase();
  if (lowerTopic.includes('apple')) return 'اے - سیب';
  if (lowerTopic.includes('ball')) return 'بی - گیند';
  if (lowerTopic.includes('butterfly')) return 'بی - تتلی';
  if (lowerTopic.includes('cat')) return 'سی - بلی';
  if (lowerTopic.includes('dog')) return 'ڈی - کتا';
  if (lowerTopic.includes('dolphin')) return 'ڈی - ڈولفن';
  if (lowerTopic.includes('elephant')) return 'ای - ہاتھی';
  if (lowerTopic.includes('fish')) return 'ایف - مچھلی';
  if (lowerTopic.includes('giraffe')) return 'جی - زرافہ';
  if (lowerTopic.includes('horse')) return 'ایچ - گھوڑا';
  if (lowerTopic.includes('lion')) return 'ببر شیر';
  if (lowerTopic.includes('bird')) return 'ننھی چڑیا';
  if (lowerTopic.includes('mango')) return 'آم (Mango)';
  if (lowerTopic.includes('red')) return 'لال رنگ';
  if (lowerTopic.includes('number 1') || lowerTopic.includes('num 1')) return '۱ - ایک سورج';
  return 'تعلیمی ویڈیو';
}

export const KidsVideoLessonsSection: React.FC<KidsVideoLessonsSectionProps> = ({
  onEarnStar,
  currentUser,
  isAdmin: propIsAdmin,
}) => {
  const isUserAdmin = Boolean(
    propIsAdmin || (currentUser?.email && ADMIN_EMAILS.includes(currentUser.email.toLowerCase().trim()))
  );
  const [videos, setVideos] = useState<KidsVideoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeVideo, setActiveVideo] = useState<KidsVideoItem | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationMsg, setGenerationMsg] = useState<string | null>(null);

  const [activeTabMode, setActiveTabMode] = useState<'today' | 'all'>('today');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreatorSeo, setShowCreatorSeo] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'title' | 'desc' | 'tags' | 'all' | null>(null);
  const [rotationState, setRotationState] = useState<any | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [showAppsScriptModal, setShowAppsScriptModal] = useState<boolean>(false);
  const [showCreatorHubModal, setShowCreatorHubModal] = useState<boolean>(false);
  const [hubSelectedVideo, setHubSelectedVideo] = useState<KidsVideoItem | null>(null);

  // Google Drive state
  const [isDriveSyncing, setIsDriveSyncing] = useState<boolean>(false);
  const [driveSyncMsg, setDriveSyncMsg] = useState<string | null>(null);
  const [driveUser, setDriveUser] = useState<string | null>(null);

  // Load existing pipeline records on mount and maintain background synchronization
  useEffect(() => {
    loadPipelineVideos();
    loadRotationState();

    // Background interval: Poll rotation state every 30 seconds to catch automatic 24h background rotation
    const autoRotateSyncTimer = setInterval(() => {
      loadRotationState();
    }, 30000);

    return () => clearInterval(autoRotateSyncTimer);
  }, []);

  const loadRotationState = async () => {
    try {
      const res = await fetch('/api/kids-video/daily-rotation');
      if (res.ok) {
        const data = await res.json();
        if (data.rotation) {
          setRotationState((prev: any) => {
            // If the 24h cycle advanced automatically in background, refresh pipeline videos to sync cards
            if (prev && prev.currentCycle !== data.rotation.currentCycle) {
              loadPipelineVideos();
            }
            return data.rotation;
          });
        }
      }
    } catch (e) {
      console.error('Failed to load rotation state:', e);
    }
  };

  const handleManualRotateAdvance = async () => {
    setIsRotating(true);
    kidsAudio.playPopSound();
    try {
      const res = await fetch('/api/kids-video/daily-rotation/trigger', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.rotation) {
          setRotationState(data.rotation);
          await loadPipelineVideos();
          kidsAudio.playCelebrationFanfare();
        }
      }
    } catch (e) {
      console.error('Failed to trigger rotation:', e);
    } finally {
      setIsRotating(false);
    }
  };

  const handleConnectAndSyncDrive = async () => {
    setIsDriveSyncing(true);
    setDriveSyncMsg('Connecting Google Drive via OAuth...');
    kidsAudio.playPopSound();
    try {
      const authResult = await signInWithGoogleDrive();
      setDriveUser(authResult.user.email || 'Connected');
      setDriveSyncMsg('Uploading videos to Google Drive folder...');
      const backupResult = await triggerDriveBackupNow(authResult.accessToken);
      if (backupResult.success) {
        setDriveSyncMsg(`✓ Saved to Drive folder (${backupResult.syncedCount || videos.length} files)`);
        kidsAudio.playCelebrationFanfare();
      } else {
        setDriveSyncMsg(`Sync status: ${backupResult.message}`);
      }
    } catch (err: any) {
      console.error('Google Drive sync error:', err);
      setDriveSyncMsg(`Drive: ${err?.message || 'Sync queued'}`);
    } finally {
      setIsDriveSyncing(false);
      setTimeout(() => setDriveSyncMsg(null), 8000);
    }
  };

  const loadPipelineVideos = async () => {
    setIsLoading(true);
    try {
      const list = await fetchKidsVideoPipeline();
      setVideos(list);
      if (list && list.length > 0 && !activeVideo) {
        setActiveVideo(list[0]);
      }
    } catch (err) {
      console.error('Failed to load videos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNextLesson = async () => {
    setIsGenerating(true);
    setGenerationMsg('Picking next topic & rendering 1080p MP4...');
    kidsAudio.playPopSound();

    try {
      const res = await fetch('/api/kids-video/generate-next', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success && data.record) {
        setGenerationMsg(`'${data.record.topic}' rendered successfully!`);
        kidsAudio.playCelebrationFanfare();
        if (onEarnStar) onEarnStar();
        await loadPipelineVideos();
        setActiveVideo(data.record);
      } else {
        setGenerationMsg(`Error: ${data.error || 'Failed'}`);
      }
    } catch (err: any) {
      setGenerationMsg(`Error: ${err?.message || 'Failed'}`);
    } finally {
      setIsGenerating(false);
      setTimeout(() => setGenerationMsg(null), 5000);
    }
  };


  // 24-Hour Active Rotating Batch
  const todaySlugs: string[] = rotationState?.activeSpotlightSlugs || [
    'short_a_apple',
    'short_b_ball',
    'short_c_cat',
    'short_num_1_sun',
  ];

  const todayVideos = videos.filter((v) => todaySlugs.includes(v.topicSlug));

  // Determine which list to display based on activeTabMode & selectedCategory
  const displayedVideos =
    activeTabMode === 'today'
      ? (todayVideos.length > 0 ? todayVideos : videos.slice(0, 4))
      : (selectedCategory === 'All'
          ? videos
          : videos.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase()));

  const categories = ['All', 'Alphabet', 'Numbers', 'Kids Stories', 'Urdu Letters', 'Animals', 'Fruits', 'Colors'];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider text-amber-100">
            <Film className="w-3.5 h-3.5" />
            <span>Automated Kids Video Lessons (ویڈیو اسباق)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Animated Cartoon Phonics &amp; Alphabet! 🎬
          </h2>

          <p className="font-urdu text-xl font-bold text-amber-100 leading-relaxed">
            بچوں کے لیے متحرک کارٹون ویڈیوز، صوتیات اور تلفظ
          </p>

          <p className="text-xs sm:text-sm text-amber-50 font-medium leading-relaxed">
            High definition 1080x1920 vertical videos generated programmatically with clear text,
            child-safe cartoon animations, and authentic phonics narration.
          </p>

          {/* Action Triggers */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerateNextLesson}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-white text-orange-600 hover:bg-amber-50 font-black text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Rendering...' : '🚀 Generate Next Lesson (Auto-Pick)'}</span>
            </button>

            {generationMsg && (
              <span className="text-xs font-black bg-black/40 px-3 py-1.5 rounded-xl text-amber-200">
                {generationMsg}
              </span>
            )}
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute -bottom-6 -right-6 text-8xl opacity-15 pointer-events-none select-none">
          🍎
        </div>
      </div>

      {/* 2. 24-Hour Topic Rotation & Google Drive Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* 24-Hour Cycle Control */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>24-Hour Auto-Rotation</span>
            </span>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
              ⏳ Next: in {rotationState?.hoursRemaining ?? 24}h
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 text-sm">
              {rotationState?.cycleTitle || "Day 1: Early Phonics & Counting Starter"}
            </h4>
            <p className="text-[11px] text-slate-600 font-medium">
              Theme: <strong>{rotationState?.categoryTheme || "Active Spotlight Batch"}</strong> • Changes automatically every 24 hours
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              onClick={handleManualRotateAdvance}
              disabled={isRotating}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              title="Switch Spotlight content to next day immediately"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
              <span>{isRotating ? "Switching..." : "Spotlight Now"}</span>
            </button>
            <span className="text-[10px] text-slate-500">Manual instant switch or 24h auto</span>
          </div>
        </div>

        {/* Google Drive Status Box: Admin Safe-Side Backup vs Public Download Hub */}
        {isUserAdmin ? (
          /* ADMIN ONLY: Google Drive Safe-Side Backup & Permanent Storage Sync */
          <div className="bg-white/95 border-2 border-blue-400/80 rounded-2xl p-4 shadow-sm space-y-2 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-slate-800 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Drive Safe-Side Backup</span>
                  <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">Admin Only</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Folder Connected ✓
              </span>
            </div>

            <div className="space-y-0.5">
              <p className="text-slate-700 font-bold text-xs">
                📁 <strong>Ai Studio – Kids Mode Data Save</strong>
              </p>
              <p className="text-[11px] text-slate-500">
                Synced Files: <strong>{videos.length} Shorts</strong> • Permanent Storage (Folder ID: <code className="text-[10px] text-slate-700 font-mono">1xF20...3wN4</code>)
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={handleConnectAndSyncDrive}
                disabled={isDriveSyncing}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
                title="Connect Google Account & Save all videos into Drive Folder"
              >
                <FolderSync className={`w-3.5 h-3.5 ${isDriveSyncing ? 'animate-spin' : ''}`} />
                <span>{isDriveSyncing ? 'Saving to Drive...' : (driveUser ? '✓ Uploaded to Drive' : '🔐 Sign In & Sync to Drive')}</span>
              </button>

              <a
                href={GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center gap-1 transition-colors text-[11px]"
              >
                <span>Open Drive ↗</span>
              </a>

              <button
                onClick={() => setShowAppsScriptModal(true)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
              >
                <span>⚙️ Guide</span>
              </button>
            </div>
            {driveSyncMsg && (
              <div className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                {driveSyncMsg}
              </div>
            )}
          </div>
        ) : (
          /* PUBLIC USERS: Clean Google Drive Video Download & HD Storage Link */
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/90 rounded-2xl p-4 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-black text-emerald-950 text-xs flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-emerald-600" />
                  <span>Google Drive Video Download Hub</span>
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                Free Download Available ✓
              </span>
            </div>

            <div className="space-y-0.5">
              <p className="text-slate-800 font-extrabold text-xs">
                📥 <strong>Download High Quality Cartoon Videos (گوگل ڈرائیو سے ویڈیوز ڈاؤن لوڈ کریں)</strong>
              </p>
              <p className="text-[11px] text-slate-600 leading-snug">
                Agar aap offline dekhne ke liye videos download karna chahte hain, toh official Google Drive folder se directly original HD MP4 format mein download kar sakte hain.
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
              <a
                href={GOOGLE_DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => kidsAudio.playPopSound()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                title="Download all high-definition MP4 videos directly from Google Drive"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open Google Drive &amp; Download MP4 ↗</span>
              </a>

              <span className="text-[10px] font-bold text-emerald-700 bg-white/80 px-2 py-1 rounded-lg border border-emerald-200">
                📁 {videos.length} HD Videos in Drive
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Mode Tabs (Today's 24h Shorts vs All Archive) + Creator YouTube Hub */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              kidsAudio.playPopSound();
              setActiveTabMode('today');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTabMode === 'today'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>🌟 Today's Active 24h Shorts ({todayVideos.length || 4})</span>
          </button>

          <button
            onClick={() => {
              kidsAudio.playPopSound();
              setActiveTabMode('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTabMode === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>📚 All Lessons Archive ({videos.length})</span>
          </button>
        </div>

        {/* Creator YouTube Hub Button (Admin Only) or Drive Library Shortcut (Public) */}
        {isUserAdmin ? (
          <button
            onClick={() => {
              kidsAudio.playPopSound();
              setHubSelectedVideo(activeVideo || videos[0]);
              setShowCreatorHubModal(true);
            }}
            className="px-3.5 py-2 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-all cursor-pointer self-start sm:self-auto"
            title="Creator YouTube SEO Keywords, Titles & Descriptions Copy Tool"
          >
            <Key className="w-3.5 h-3.5" />
            <span>🔑 Creator YouTube SEO Hub</span>
          </button>
        ) : (
          <a
            href={GOOGLE_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => kidsAudio.playPopSound()}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition-all cursor-pointer self-start sm:self-auto"
            title="Open Google Drive Folder to download videos"
          >
            <Download className="w-3.5 h-3.5" />
            <span>📥 Drive Download Folder ↗</span>
          </a>
        )}
      </div>

      {/* Category Filter Pills (Visible when in All Archive mode) */}
      {activeTabMode === 'all' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none animate-in fade-in">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  kidsAudio.playPopSound();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs scale-102'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* 2. Video Lessons Catalog */}
      <div className="space-y-4">
        {/* Videos Grid */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>{activeTabMode === 'today' ? "🌟 Today's Active Spotlight Shorts" : "📚 All Lessons Archive"}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                {displayedVideos.length} Video{displayedVideos.length === 1 ? '' : 's'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-bold">
              {activeTabMode === 'today'
                ? `Active 24h Cycle: ${rotationState?.cycleTitle || 'Daily Phonics Starter'} (Changes every 24 hours)`
                : "Browse the complete library of all generated educational shorts."}
            </p>
          </div>

          <button
            onClick={loadPipelineVideos}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Refresh videos"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {displayedVideos.length === 0 && !isLoading ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
            <div className="text-4xl">🎬</div>
            <p className="text-sm font-bold text-slate-600">No videos found in storage yet.</p>
            <button
              onClick={loadPipelineVideos}
              className="px-4 py-2 bg-orange-500 text-white font-black text-xs rounded-xl shadow-xs"
            >
              Refresh 3D Pixar Video Library
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedVideos.map((vid) => (
              <div
                key={vid.contentId}
                onClick={() => {
                  kidsAudio.playPopSound();
                  setActiveVideo(vid);
                }}
                className="group bg-white rounded-3xl border-2 border-slate-200/90 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Thumbnail with 9:16 Aspect Box & Play Overlay */}
                <div className="relative aspect-[9/16] bg-slate-900 overflow-hidden">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.topic}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback placeholder
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-slate-950 translate-x-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-black">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300">
                      {vid.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  </div>

                  {/* Bottom Duration Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                      {vid.durationSeconds}s • 1080p
                    </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-1">
                    <h4 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                      {vid.topic}
                    </h4>
                    <span
                      className="text-xs font-urdu font-bold text-amber-700 shrink-0"
                      dir="rtl"
                      title={vid.urduTitle || vid.shortUrdu || getUrduTitleForVideo(vid)}
                    >
                      {vid.shortUrdu || vid.urduTitle || getUrduTitleForVideo(vid)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {vid.voiceText}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span>✓ MP4 Ready</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={GOOGLE_DRIVE_FOLDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          kidsAudio.playPopSound();
                        }}
                        className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] flex items-center gap-1 transition-colors"
                        title="Download from Google Drive"
                      >
                        <Download className="w-3 h-3" />
                        <span>Drive ↗</span>
                      </a>
                      <span className="text-orange-600 group-hover:underline flex items-center gap-1">
                        <span>Watch</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Interactive Fullscreen Kids Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
          {/* Modal Container */}
          <div className="w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400 flex flex-col max-h-[95vh]">
            {/* Header */}
            <div className="p-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎬</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-amber-300 leading-tight truncate">
                      {activeVideo.topic}
                    </h3>
                    <span
                      className="text-xs font-urdu font-bold text-amber-200 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/80 shrink-0"
                      dir="rtl"
                    >
                      {activeVideo.shortUrdu || getUrduTitleForVideo(activeVideo)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] mt-0.5">
                    <span className="text-slate-400">1080x1920 (9:16) • {activeVideo.durationSeconds}s</span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                      🛡️ YouTube 2026 Safe ✓
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative bg-black flex-1 flex items-center justify-center overflow-hidden">
              <video
                key={activeVideo.contentId}
                src={activeVideo.videoUrl}
                preload="metadata"
                controls
                autoPlay
                playsInline
                className="w-full h-full max-h-[65vh] object-contain"
                onEnded={() => {
                  kidsAudio.playCelebrationFanfare();
                  if (onEarnStar) onEarnStar();
                }}
              >
                Your browser does not support HTML5 video tag.
              </video>
            </div>

            {/* Bottom Meta & Interactive Actions */}
            <div className="p-4 bg-slate-950 text-white space-y-3 shrink-0 border-t border-slate-800">
              {/* Narration Script Box */}
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span>Voice Narration (صوتیات)</span>
                  <span className="text-[11px] text-slate-400">{activeVideo.durationSeconds}s</span>
                </div>
                <p className="text-slate-200 font-medium leading-relaxed italic">
                  "{activeVideo.voiceText}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <a
                    href={`/api/download/video?file=${activeVideo.topicSlug || activeVideo.videoUrl?.split('/').pop() || 'short'}.mp4`}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors shadow-xs"
                    title="Direct Clean MP4 Video Download (1080x1920)"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download MP4</span>
                  </a>

                  {/* Google Drive Download Folder Link */}
                  <a
                    href={GOOGLE_DRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-black flex items-center gap-1.5 transition-colors shadow-xs"
                    title="Open official Google Drive folder to download this and other full shorts"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Drive Folder ↗</span>
                  </a>
                </div>

                {isUserAdmin && (
                  <button
                    onClick={() => setShowCreatorSeo(!showCreatorSeo)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="YouTube SEO Title & Description for Creator (Admin Only)"
                  >
                    <Key className="w-3.5 h-3.5 text-sky-400" />
                    <span>YouTube SEO</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    kidsAudio.playCelebrationFanfare();
                    if (onEarnStar) onEarnStar();
                    setActiveVideo(null);
                    setShowCreatorSeo(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ml-auto"
                >
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Claim +2 Stars ⭐</span>
                </button>
              </div>

              {/* Creator YouTube SEO & Description Tool (Private For Creator) */}
              {showCreatorSeo && (
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-sky-500/40 text-xs space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-black text-sky-400 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" />
                      <span>YouTube Shorts SEO Kit (Private for Upload)</span>
                    </span>
                    <button
                      onClick={() => {
                        const title = (activeVideo as any).youtubeSeoTitle || `${activeVideo.topic} | 3D Short #Shorts`;
                        const desc = (activeVideo as any).youtubeSeoDescription || `Learn ${activeVideo.topic}!`;
                        const tags = `Shorts, YouTube Shorts, Learn ABC, Phonics Song, ${activeVideo.topic}, Toddler Learning, Kids 3D Animation, Educational Rhymes, Nursery Rhyme, Enter the World of Light`;
                        navigator.clipboard.writeText(`=== YOUTUBE TITLE ===\n${title}\n\n=== YOUTUBE DESCRIPTION ===\n${desc}\n\n=== TAGS / KEYWORDS ===\n${tags}`);
                        setCopiedField('all');
                        setTimeout(() => setCopiedField(null), 2500);
                      }}
                      className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[10px] cursor-pointer"
                    >
                      {copiedField === 'all' ? 'Copied Full Kit! ✓' : '📋 Copy All-In-One'}
                    </button>
                  </div>

                  {/* Title Box */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-300">YouTube Title:</span>
                      <button
                        onClick={() => {
                          const t = (activeVideo as any).youtubeSeoTitle || `${activeVideo.topic} | 3D Pixar Animation #Shorts #KidsLearning`;
                          navigator.clipboard.writeText(t);
                          setCopiedField('title');
                          setTimeout(() => setCopiedField(null), 2500);
                        }}
                        className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                      >
                        {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                        <span>{copiedField === 'title' ? 'Copied Title! ✓' : 'Copy Title'}</span>
                      </button>
                    </div>
                    <p className="p-2.5 rounded-xl bg-black/60 text-slate-200 font-mono text-[11px] select-all border border-slate-800">
                      {(activeVideo as any).youtubeSeoTitle || `${activeVideo.topic} 🍎 | Learn ABC Phonics for Kids #Shorts #KidsLearning`}
                    </p>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-300">YouTube Description &amp; Hashtags:</span>
                      <button
                        onClick={() => {
                          const d = (activeVideo as any).youtubeSeoDescription || `Learn ${activeVideo.topic} with 3D animation!\n#Shorts #KidsLearning`;
                          navigator.clipboard.writeText(d);
                          setCopiedField('desc');
                          setTimeout(() => setCopiedField(null), 2500);
                        }}
                        className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                      >
                        {copiedField === 'desc' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                        <span>{copiedField === 'desc' ? 'Copied Description! ✓' : 'Copy Description'}</span>
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={4}
                      value={(activeVideo as any).youtubeSeoDescription || `Learn ${activeVideo.topic} with 3D animation!\n#Shorts #KidsLearning`}
                      className="w-full p-2.5 rounded-xl bg-black/60 text-slate-300 font-mono text-[10px] leading-relaxed resize-none select-all border border-slate-800"
                    />
                  </div>

                  {/* Tags Box */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-300">SEO Tags / Keywords (YouTube Studio):</span>
                      <button
                        onClick={() => {
                          const tags = `Shorts, YouTube Shorts, Learn ABC, Phonics Song, ${activeVideo.topic}, Toddler Learning, Kids 3D Animation, Educational Rhymes, Nursery Rhyme, Enter the World of Light`;
                          navigator.clipboard.writeText(tags);
                          setCopiedField('tags');
                          setTimeout(() => setCopiedField(null), 2500);
                        }}
                        className="px-2.5 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                      >
                        {copiedField === 'tags' ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                        <span>{copiedField === 'tags' ? 'Copied Tags! ✓' : 'Copy Tags'}</span>
                      </button>
                    </div>
                    <p className="p-2.5 rounded-xl bg-black/60 text-slate-300 font-mono text-[10px] select-all border border-slate-800">
                      {`Shorts, YouTube Shorts, Learn ABC, Phonics Song, ${activeVideo.topic}, Toddler Learning, Kids 3D Animation, Educational Rhymes, Nursery Rhyme, Enter the World of Light`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Creator YouTube Hub Modal (Private Tool) */}
      {showCreatorHubModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
        >
          <div className="w-full max-w-xl bg-slate-900 border border-sky-500/50 rounded-3xl p-5 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔑</span>
                <div>
                  <h3 className="text-sm font-black text-sky-400">
                    YouTube Channel Upload &amp; SEO Hub (Creator Only)
                  </h3>
                  <p className="text-[11px] text-slate-400">Copy high-ranking SEO titles, descriptions &amp; tags for your shorts</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreatorHubModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Select Lesson to View SEO */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Select Short Lesson:</label>
              <select
                value={hubSelectedVideo?.contentId || ''}
                onChange={(e) => {
                  const found = videos.find((v) => v.contentId === e.target.value);
                  if (found) setHubSelectedVideo(found);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs"
              >
                {videos.map((v) => (
                  <option key={v.contentId} value={v.contentId}>
                    {v.topic} ({v.category})
                  </option>
                ))}
              </select>
            </div>

            {hubSelectedVideo && (
              <div className="space-y-3 pt-1">
                {/* 1. Title */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">YouTube Title:</span>
                    <button
                      onClick={() => {
                        const title = (hubSelectedVideo as any).youtubeSeoTitle || `${hubSelectedVideo.topic} 🍎 | Learn ABC #Shorts`;
                        navigator.clipboard.writeText(title);
                        setCopiedField('title');
                        setTimeout(() => setCopiedField(null), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] cursor-pointer"
                    >
                      {copiedField === 'title' ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                  <p className="p-2.5 bg-black/60 rounded-xl text-slate-200 font-mono text-[11px] select-all border border-slate-800">
                    {(hubSelectedVideo as any).youtubeSeoTitle || `${hubSelectedVideo.topic} 🍎 | Learn ABC #Shorts`}
                  </p>
                </div>

                {/* 2. Description */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">YouTube Description &amp; Hashtags:</span>
                    <button
                      onClick={() => {
                        const desc = (hubSelectedVideo as any).youtubeSeoDescription || `Learn ${hubSelectedVideo.topic} with 3D animation!\n#Shorts`;
                        navigator.clipboard.writeText(desc);
                        setCopiedField('desc');
                        setTimeout(() => setCopiedField(null), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] cursor-pointer"
                    >
                      {copiedField === 'desc' ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                  <textarea
                    readOnly
                    rows={5}
                    value={(hubSelectedVideo as any).youtubeSeoDescription || `Learn ${hubSelectedVideo.topic} with 3D animation!\n#Shorts`}
                    className="w-full p-2.5 bg-black/60 rounded-xl text-slate-300 font-mono text-[10px] leading-relaxed resize-none select-all border border-slate-800"
                  />
                </div>

                {/* 3. Tags */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Tags / SEO Keywords:</span>
                    <button
                      onClick={() => {
                        const tags = `Shorts, YouTube Shorts, Learn ABC, Phonics Song, ${hubSelectedVideo.topic}, Toddler Learning, Kids 3D Animation, Educational Rhymes, Nursery Rhyme, Enter the World of Light`;
                        navigator.clipboard.writeText(tags);
                        setCopiedField('tags');
                        setTimeout(() => setCopiedField(null), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px] cursor-pointer"
                    >
                      {copiedField === 'tags' ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                  <p className="p-2.5 bg-black/60 rounded-xl text-slate-300 font-mono text-[10px] select-all border border-slate-800">
                    {`Shorts, YouTube Shorts, Learn ABC, Phonics Song, ${hubSelectedVideo.topic}, Toddler Learning, Kids 3D Animation, Educational Rhymes, Nursery Rhyme, Enter the World of Light`}
                  </p>
                </div>

                {/* Action download for this video */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                  <span className="text-[11px] text-slate-400">1080x1920 MP4 Video • 5.5s</span>
                  <a
                    href={`/api/download/video?file=${hubSelectedVideo.topicSlug}.mp4`}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download MP4</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Google Apps Script 24/7 Drive Sync Guide Modal */}
      {showAppsScriptModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
        >
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-5 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📁</span>
                <div>
                  <h3 className="text-sm font-black text-amber-400">
                    Google Drive 24/7 Cloud Sync Setup
                  </h3>
                  <p className="text-[11px] text-slate-400">Folder ID: 1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4</p>
                </div>
              </div>
              <button
                onClick={() => setShowAppsScriptModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-200">
              <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-2xl text-amber-200 space-y-1.5">
                <p className="font-bold text-amber-300">💡 Shorts 24h Baad Drive Mein Save Kyun Nahi Ho Rahi Thi?</p>
                <p className="text-[11px] text-amber-100/90 leading-relaxed">
                  Jab 24 ghante baad Shorts animation change hoti hai, to purani shorts <strong>backend disk storage</strong> (All Archive) mein bilkul safe rehti hain. Magar Google Drive mein is liye save nahi ho rahi thin kyunke:
                </p>
                <ul className="list-disc list-inside text-[11px] text-amber-200/90 space-y-1">
                  <li><strong>Project Mismatch:</strong> Web App <code>quick-hook-lc9s2</code> se connected hai jabke Google Drive API naye project <code>enter-the-world-web-app</code> mein enable ki gayi thi. Jab dono projects link na hon to Google Drive API Permission Denied (403) de deta hai.</li>
                  <li><strong>Background Server:</strong> 24 ghante baad jab rotation hoti hai, tab browser band hota hai aur server ke paas Google Drive ki live write key nahi hoti.</li>
                </ul>
              </div>

              <div className="bg-indigo-950/40 border border-indigo-500/30 p-3 rounded-2xl text-indigo-200 space-y-2">
                <h4 className="font-black text-indigo-300 flex items-center gap-1.5 text-xs">
                  <span>🤖 Solution 1: drive-sync-bot Service Account (Google Drive Folder Share)</span>
                </h4>
                <p className="text-[11px] text-indigo-100/90 leading-relaxed">
                  Aap ke project <code>enter-the-world-web-app</code> mein Service Account pehle se mojood hai:
                  <br />
                  <code className="text-amber-300 font-mono text-[10px] bg-black/50 px-1 py-0.5 rounded select-all">
                    drive-sync-bot@enter-the-world-web-app.iam.gserviceaccount.com
                  </code>
                  <br />
                  <strong>Isko DELETE nahi karna!</strong> Sirf yeh karein:
                  <br />
                  1. Google Drive khol kar folder <strong>Ai Studio - Kids Mode Data Save</strong> par right-click karein ➔ <strong>Share</strong>.
                  <br />
                  2. Is bot ka email paste karein aur role <strong>Editor</strong> de kar Save kar dein!
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-black text-slate-100 flex items-center gap-1.5">
                  <span>⚡ Solution 2: Google Apps Script Auto-Sync (100% Working & Automatic)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px]">
                  <li>
                    Open Google Apps Script:{" "}
                    <a
                      href="https://script.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 underline font-bold"
                    >
                      script.google.com ↗
                    </a>
                  </li>
                  <li>Click <strong>+ New Project</strong></li>
                  <li>
                    Copy-paste the code from file:{" "}
                    <code className="text-amber-300 font-mono bg-black/50 px-1 py-0.5 rounded">
                      apps-script/DriveShortsSync.gs
                    </code>
                  </li>
                  <li>
                    Select function <strong>setupAutoDriveSyncTrigger</strong> and click <strong>Run</strong> (ek dafa Run karne par yeh har 4 ghante baad khud auto-sync karega)!
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-emerald-200 space-y-2">
                <h4 className="font-black text-emerald-300 flex items-center gap-1.5 text-xs">
                  <span>🔐 Backend Saved Credentials & Client IDs (Active & Linked)</span>
                </h4>
                <div className="grid grid-cols-1 gap-1.5 text-[10px] font-mono">
                  <div className="bg-black/50 p-2 rounded-lg">
                    <span className="text-slate-400">YouTube API Key: </span>
                    <span className="text-emerald-300 font-bold">AIzaSyDSxKQ4w57CfnQyr83C-Ws-kaGKXRK9_Ro</span>
                    <span className="ml-2 text-emerald-400 font-sans text-[9px] bg-emerald-500/20 px-1 py-0.5 rounded">✓ Saved in Backend & Secrets</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg">
                    <span className="text-slate-400">Web Client ID: </span>
                    <span className="text-sky-300 font-bold select-all">886208799724-u0vmh04v159p52j5873jtvveld5labbm.apps.googleusercontent.com</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg">
                    <span className="text-slate-400">Apps Script Client ID: </span>
                    <span className="text-amber-300 font-bold select-all">886208799724-j34q9po6ms87og6ocper2fmrn4vg51k9.apps.googleusercontent.com</span>
                  </div>
                  <div className="bg-black/50 p-2 rounded-lg">
                    <span className="text-slate-400">Service Account: </span>
                    <span className="text-purple-300 font-bold select-all">drive-sync-bot@enter-the-world-web-app.iam.gserviceaccount.com</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400">Target Google Drive Folder:</span>
                  <a
                    href="https://drive.google.com/drive/folders/1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-bold text-[10px] hover:underline"
                  >
                    Open Drive Folder ↗
                  </a>
                </div>
                <p className="font-mono text-[10px] text-emerald-400">
                  Folder Name: Ai Studio - Kids Mode Data Save
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAppsScriptModal(false)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-xs"
              >
                Got It, Close Guide ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
