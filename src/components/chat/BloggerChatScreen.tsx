import React, { useState, useEffect } from 'react';
import {
  Globe,
  Film,
  Database,
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  Eye,
  FileCode,
  BookOpen,
  ArrowRight,
  RefreshCw,
  FolderPlus,
  ExternalLink,
  Bot,
  User,
  ShieldCheck,
  Link2,
  CheckCircle2,
  Folder,
  RotateCcw,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import {
  BloggerItemRecord,
  BloggerWorkflowPayload,
  BloggerContentType,
  ScreenType,
} from '../../types';
import {
  saveBloggerRecord,
  fetchBloggerRecords,
  generateBloggerPageHtml,
  generateBloggerPostHtml,
  GOOGLE_BLOGGER_YOUTUBE_2026_SPECS,
} from '../../services/bloggerService';
import { queryGeminiAI } from '../../services/contentService';
import { GOOGLE_DRIVE_FOLDER_ID, GOOGLE_DRIVE_FOLDER_URL } from '../../services/googleDriveService';

interface BloggerChatScreenProps {
  onNavigate?: (screen: ScreenType) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  workflow?: 'page' | 'post';
  generatedRecord?: BloggerItemRecord;
  isSaved?: boolean;
  linkedFromChat?: '13' | '15';
}

export const BloggerChatScreen: React.FC<BloggerChatScreenProps> = ({ onNavigate }) => {
  const [workflowMode, setWorkflowMode] = useState<'page' | 'post'>('page');
  const [appModule, setAppModule] = useState<'poetry' | 'stories' | 'learn' | 'kids' | 'explore'>('poetry');
  const [shortVideoId, setShortVideoId] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [savedRecords, setSavedRecords] = useState<BloggerItemRecord[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<BloggerItemRecord | null>(null);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [transferToast, setTransferToast] = useState<string | null>(null);

  // Load existing saved records from Firestore on mount
  useEffect(() => {
    fetchBloggerRecords()
      .then((records) => setSavedRecords(records))
      .catch((e) => console.warn('Could not load saved records:', e));
  }, []);

  // 1. Load persistent chat history from backend for Chat #15
  useEffect(() => {
    fetch('/api/chat/messages/15')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
        } else {
          // Fallback initial welcome
          setMessages([
            {
              id: 'msg-welcome',
              sender: 'ai',
              time: 'Just now',
              text: `Assalam-o-Alaikum! Main aapka Google Blogger & YouTube Shorts Syndication Engine (Chat 15) hoon.\n\nYeh chat poori application ke database, YouTube Shorts aur Blogger ke sath 100% interconnected hai.\n\n🔗 **Linked With Chat #13**: AI Assistant (Chat #13) se koi bhi topic ya draft yahan transfer ho sakta hai aur yahan se wahan bhej sakte hain.\n📁 **Google Drive Folder**: Ai Studio - Kids Mode Data Save (Folder ID: ${GOOGLE_DRIVE_FOLDER_ID})\n\n1️⃣ **Workflow 1: App + YouTube Shorts + App Record Save + Blog Page**\n• Isme poori static Directory / Curriculum Hub page banegi.\n• Firestore record (/bloggerPages) save hoga, aur Google 2026 HTML page banega.\n\n2️⃣ **Workflow 2: YouTube Shorts + App + Blog Post**\n• Isme daily 60-second micro-learning Short script aur post tayyar hogi.`,
            },
          ]);
        }
      })
      .catch((err) => {
        console.warn('Could not load Chat 15 backend history:', err);
      });
  }, []);

  const handleSendPrompt = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputVal).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      workflow: workflowMode,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputVal('');
    setIsLoading(true);

    // Save user message to backend (Chat #15)
    fetch('/api/chat/messages/15', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userMessage),
    }).catch(() => {});

    try {
      const isPage = workflowMode === 'page';
      const promptInstruction = `
User Workflow: ${isPage ? 'Workflow 1 (App + YouTube Shorts + App Record Save + Blog Page)' : 'Workflow 2 (YouTube Shorts + App + Blog Post)'}
Selected App Module: ${appModule}
Provided YouTube Short ID: ${shortVideoId || 'None provided (use placeholder or suggested ID)'}
Creator Query: "${textToSend}"

Please respond in Roman Urdu for explanations, with beautiful Urdu Nastaliq quotes where applicable.
Then output a complete ready-to-save Google 2026 syndication record with:
1. Title (English & Urdu)
2. 60-Second Short Script (Hook, Body, CTA)
3. Blog Body (Bilingual English & Urdu Tashreeh)
4. Deep link to app module (${appModule})
`;

      const aiText = await queryGeminiAI(promptInstruction, {
        mode: isPage ? 'blogger_page' : 'blogger_post',
      });

      // Construct a high-grade BloggerItemRecord
      const recordId = `blogger-${isPage ? 'page' : 'post'}-${Date.now().toString(36)}`;
      const cleanTitle = textToSend.slice(0, 60);

      const workflowPayload: BloggerWorkflowPayload = {
        workflowType: isPage ? 'app_shorts_record_page' : 'shorts_app_post',
        title: `${cleanTitle} | World of Light Official ${isPage ? 'Guide' : 'Short'}`,
        titleUrdu: isPage ? 'اردو ادب اور حکمت کا جامع رہبر' : 'ایک منٹ کی حکمت اور بصیرت',
        category: appModule.toUpperCase(),
        appModule,
        youtubeShortId: shortVideoId || (isPage ? 'UCvCzFP5EPsV4Vp6l6GGuvyg' : ''),
        shortScript: {
          hook: 'Kya aap jaante hain ke is sher me zindagi ka sabse bara raaz chupa hai?',
          body: textToSend.slice(0, 180),
          callToAction: 'Puri tasreeh aur audio sunne ke liye description me diye gaye app link par click karein!',
        },
        contentBodyText: aiText,
        contentBodyUrdu: 'ہستی کے مت فریب میں آ جائیو اسدؔ — عالم تمام حلقۂ دامِ خیال ہے',
        labels: ['YouTube Shorts', 'Google Blogger', 'Enter the World of Light', appModule],
        status: 'published',
      };

      const generatedHtml = isPage
        ? generateBloggerPageHtml(workflowPayload)
        : generateBloggerPostHtml(workflowPayload);

      const generatedRecord: BloggerItemRecord = {
        id: recordId,
        type: isPage ? 'page' : 'post',
        title: workflowPayload.title,
        titleUrdu: workflowPayload.titleUrdu,
        slug: recordId,
        category: workflowPayload.category,
        labels: workflowPayload.labels,
        youtubeShortId: workflowPayload.youtubeShortId,
        summary: cleanTitle,
        contentHtml: generatedHtml,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        workflow: workflowMode,
        generatedRecord,
        isSaved: false,
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Save AI message to backend (Chat #15)
      fetch('/api/chat/messages/15', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'ai',
          text: aiText,
          workflow: workflowMode,
          generatedRecord,
        }),
      }).catch(() => {});
    } catch (err: any) {
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: `Maazrat! Response generate karne me masla aaya: ${err?.message || 'Server timeout'}. Barahe meherbani dobara koshish karein.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToAssistant = async (content: string, record?: BloggerItemRecord) => {
    try {
      const topic = record?.title || content.split('\n')[0].substring(0, 70);
      const res = await fetch('/api/chat/link/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromChat: '15',
          toChat: '13',
          topic: topic || 'Blogger & Shorts Studio Draft',
          contentDraft: content,
          payload: record || null,
        }),
      });
      if (res.ok) {
        setTransferToast('✓ Transferred to AI Assistant (Chat #13)! Click AI Helper to view.');
        setTimeout(() => setTransferToast(null), 5000);
      }
    } catch (e) {
      console.error('Failed to transfer context:', e);
    }
  };

  const handleResetChat = async () => {
    try {
      await fetch('/api/chat/clear/15', { method: 'POST' });
      setMessages([
        {
          id: 'msg-reset',
          sender: 'ai',
          time: 'Just now',
          text: 'Blogger Studio (Chat #15) history has been reset. How can I assist you with your YouTube Shorts or Google Blogger content today?',
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveToFirestore = async (msgId: string, record: BloggerItemRecord) => {
    setIsSaving(record.id);
    try {
      await saveBloggerRecord(record);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, isSaved: true } : m))
      );
      setSavedRecords((prev) => [record, ...prev.filter((r) => r.id !== record.id)]);
    } catch (e) {
      console.error('Error saving record to Firestore:', e);
    } finally {
      setIsSaving(null);
    }
  };

  const handleCopyHtml = (record: BloggerItemRecord) => {
    if (record.contentHtml) {
      navigator.clipboard.writeText(record.contentHtml);
      setCopiedId(record.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <SectionHeader
        kicker="Chat 15 · Google Blogger 2026 Syndication Engine"
        title="Blogger Studio & YouTube Shorts Chat"
        titleUrdu="گوگل بلاگر اور یوٹیوب شارٹس کا ذہین مرکز (چیٹ 15)"
        description="Aapki poori application ke sath backend linked intelligent chat: YouTube Shorts planning, Firestore cloud database record saving, aur 2026 Google Blogger HTML auto-generation. Linked with AI Assistant (Chat #13)."
      />

      {/* Transfer Alert Toast */}
      {transferToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{transferToast}</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('ai')}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700"
            >
              Open AI Assistant (13) ↗
            </button>
          )}
        </div>
      )}

      {/* Interconnection & Google Drive Sync Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 rounded-2xl border border-sky-100 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-sky-800 bg-white/90 px-3 py-1.5 rounded-xl border border-sky-200/80 shadow-2xs">
            <Link2 className="w-3.5 h-3.5 text-sky-600" />
            <span>🔗 Linked with Chat #13 (AI Assistant)</span>
          </div>

          <a
            href={GOOGLE_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-white/90 hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/80 shadow-2xs transition-colors"
            title="Open Google Drive Backup Folder"
          >
            <Folder className="w-3.5 h-3.5 text-emerald-600" />
            <span>📁 Drive: Ai Studio - Kids Mode Data Save ({GOOGLE_DRIVE_FOLDER_ID.substring(0, 8)}...) ↗</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <button
              onClick={() => onNavigate('ai')}
              className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-white px-3 py-1.5 rounded-xl border border-sky-200 transition-colors shadow-2xs"
            >
              Switch to Chat #13 ↗
            </button>
          )}

          <button
            onClick={handleResetChat}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            title="Reset Chat 15 conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Workflow Mode Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Workflow Selection:</span>
            <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
              {workflowMode === 'page'
                ? 'Workflow 1: App + YouTube Shorts + App Record Save + Blog Page'
                : 'Workflow 2: YouTube Shorts + App + Blog Post'}
            </h3>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl shrink-0">
            <button
              onClick={() => setWorkflowMode('page')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                workflowMode === 'page'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Workflow 1 (Blog Page)</span>
            </button>
            <button
              onClick={() => setWorkflowMode('post')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                workflowMode === 'post'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Workflow 2 (Blog Post)</span>
            </button>
          </div>
        </div>

        {/* Configuration Bar (App Module Link + YouTube Short ID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium shrink-0">App Module Link:</span>
            <select
              value={appModule}
              onChange={(e) => setAppModule(e.target.value as any)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:border-sky-500"
            >
              <option value="poetry">Poetry Reader (/poetry)</option>
              <option value="stories">Stories Library (/stories)</option>
              <option value="learn">Interactive Lessons (/learn)</option>
              <option value="kids">Kids Mode (/kids)</option>
              <option value="explore">Explore Discovery (/explore)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium shrink-0">YouTube Short ID:</span>
            <input
              type="text"
              value={shortVideoId}
              onChange={(e) => setShortVideoId(e.target.value)}
              placeholder="e.g. dQw4w9WgXcQ (Optional)"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Suggested Fast Prompts in Roman Urdu */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          {
            w: 'page',
            label: 'Poetry Hub: Mirza Ghalib Classical Directory Page',
            prompt: 'Ghalib ki classical ghazaliyat aur falsafay par 3 YouTube Shorts series plan karo, Poetry module se link karo, Firestore me save karo, aur poora Blogger Page HTML tayyar karo.',
          },
          {
            w: 'page',
            label: 'Allama Iqbal: Falsafa-e-Khudi Pillar Page',
            prompt: 'Allama Iqbal ki Shaheen aur Khudi par Shorts concept banao, Learn screen se deep link karo, aur Google 2026 compliant Blogger Page banao.',
          },
          {
            w: 'post',
            label: '60-Sec Short #1: Hasti Ke Mat Fareb Me Aa Jaiyo Asad',
            prompt: 'Ghalib ke mashhoor sher "Hasti ke mat fareb me aa jaiyo Asad" par 60 second YouTube Short script, roman urdu tashreeh, aur Blogger Post HTML banao.',
          },
          {
            w: 'post',
            label: 'Kids Moral Short: The Oak and the Bamboo',
            prompt: 'Bacchon ke lie ek shandar 60-second animated short script banao aur Stories screen se link karke Blogger Post HTML output do.',
          },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              setWorkflowMode(item.w as any);
              handleSendPrompt(item.prompt);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-sky-300 text-xs text-slate-700 hover:text-sky-600 font-medium whitespace-nowrap shadow-2xs transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[72vh] min-h-[460px] max-h-[680px]">
        {/* Chat Stream Header */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Google Blogger 2026 &amp; YouTube Shorts Syndicator
              </p>
              <p className="text-[10px] text-slate-400">
                Linked to Firestore ({workflowMode === 'page' ? '/bloggerPages' : '/bloggerPosts'}) &amp; YouTube Channel (@EntertheWorldofLight)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Backend Ready
            </span>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white'
                    : 'bg-gradient-to-br from-indigo-500 to-sky-600 text-white'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{m.text}</div>

                {/* If AI provided a generated Blogger Record */}
                {m.generatedRecord && (
                  <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/80 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 rounded-b-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-bold text-[10px] uppercase">
                          {m.generatedRecord.type === 'page' ? 'Blogger Static Page' : 'Blogger Post'}
                        </span>
                        <span className="text-slate-400 text-[10px] font-mono">
                          ID: {m.generatedRecord.id}
                        </span>
                      </div>

                      {m.isSaved ? (
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved to App Record
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSaveToFirestore(m.id, m.generatedRecord!)}
                          disabled={isSaving === m.generatedRecord.id}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          {isSaving === m.generatedRecord.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Database className="w-3 h-3" />
                          )}
                          <span>Save to App Record</span>
                        </button>
                      )}
                    </div>

                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl space-y-1">
                      <p className="font-bold text-slate-900 text-xs">{m.generatedRecord.title}</p>
                      {m.generatedRecord.titleUrdu && (
                        <p className="font-urdu text-sm text-amber-900 dir-rtl text-right">
                          {m.generatedRecord.titleUrdu}
                        </p>
                      )}
                    </div>

                    {/* Action Bar for Generated HTML */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => handleCopyHtml(m.generatedRecord!)}
                        className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        {copiedId === m.generatedRecord.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Blogger HTML Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy 2026 Blogger HTML</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setPreviewItem(m.generatedRecord!)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Live Preview</span>
                      </button>

                      {onNavigate && (
                        <button
                          onClick={() => onNavigate(appModule)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Linked App Section</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100/60">
                  <span
                    className={`block text-[10px] ${
                      m.sender === 'user' ? 'text-sky-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>

                  {m.sender === 'ai' && (
                    <button
                      onClick={() => handleTransferToAssistant(m.text, m.generatedRecord)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800 hover:bg-sky-50 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                      title="Send this response as context to AI Assistant (Chat #13)"
                    >
                      <Link2 className="w-3 h-3" />
                      <span>Send to AI Assistant (13)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 bg-indigo-600 text-white shadow-xs">
                <Globe className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-2.5 text-slate-600 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                <span>Google Blogger aur YouTube Shorts content generate ho raha hai...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            placeholder="Roman Urdu me likhein (maslan: Ghalib Shorts aur Blog Page banao)..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
          <button
            onClick={() => handleSendPrompt()}
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl transition-all shrink-0 flex items-center justify-center shadow-xs"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Live Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase">
                  Google Blogger 2026 Preview
                </span>
                <h3 className="text-sm font-bold text-slate-900">{previewItem.title}</h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
              <div
                className="bg-white p-6 rounded-2xl shadow-xs"
                dangerouslySetInnerHTML={{ __html: previewItem.contentHtml }}
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Type: <strong>{previewItem.type.toUpperCase()}</strong> | Status: <strong>{previewItem.status}</strong>
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(previewItem.contentHtml);
                  setCopiedId(previewItem.id);
                  setTimeout(() => setCopiedId(null), 2500);
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                {copiedId === previewItem.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === previewItem.id ? 'Copied!' : 'Copy Blogger HTML'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
