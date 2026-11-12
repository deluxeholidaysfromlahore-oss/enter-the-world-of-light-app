import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Lightbulb,
  RotateCcw,
  Loader2,
  BookOpen,
  HelpCircle,
  Feather,
  Globe,
  Share2,
  CheckCircle2,
  Link2,
  Folder,
} from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';
import { queryGeminiAI } from '../../services/contentService';
import { ScreenType } from '../../types';
import { GOOGLE_DRIVE_FOLDER_ID, GOOGLE_DRIVE_FOLDER_URL } from '../../services/googleDriveService';

interface AIAssistantScreenProps {
  isKidsMode?: boolean;
  onNavigate?: (screen: ScreenType) => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({ isKidsMode = false, onNavigate }) => {
  const [messages, setMessages] = useState<
    { id?: string; sender: 'ai' | 'user'; text: string; time: string; urdu?: string; linkedFromChat?: string }[]
  >([
    {
      sender: 'ai',
      text: isKidsMode
        ? "Salam & Hello little star! 🌟 I'm Sunny, your friendly guide in the World of Light & Laughter! What fun story or question would you like to explore today?"
        : "Salam & Greetings! I am your Light & Laughter Assistant powered by Google Gemini (Chat #13). How can I assist your learning today? Ask me about classical Urdu poetry, science wonders, story morals, or grammar practice. I am linked with Blogger Chat (#15).",
      urdu: 'خوش آمدید! میں آپ کا ہوشمند تعلیمی رہنما (چیٹ 13) ہوں۔ آج آپ کون سا موضوع دریافت کرنا چاہتے ہیں؟',
      time: 'Just now',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'general' | 'poetry' | 'quiz' | 'blogger'>('general');
  const [transferToast, setTransferToast] = useState<string | null>(null);

  // 1. Load persistent chat history from backend for Chat #13
  useEffect(() => {
    fetch('/api/chat/messages/13')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
        }
      })
      .catch((err) => console.warn('Could not load Chat 13 backend history:', err));
  }, []);

  const suggestedPrompts = isKidsMode
    ? [
        'Why is the sky blue during the day?',
        'Tell me a short bedtime story about a kind deer',
        'Teach me 3 fun animal names in Urdu with sounds',
        'Give me a joyful riddle to guess!',
      ]
    : activeMode === 'blogger'
    ? [
        'Workflow 1: Mirza Ghalib Classical Poetry Hub (Shorts series + Blogger Page HTML)',
        'Workflow 2: 60-Sec Wisdom Short #1 (Urdu couplet with English Tashreeh + Blogger Post)',
        'Workflow 1: Allama Iqbal Khudi Series (App deep link + Firestore save + Blogger Page)',
        'Workflow 2: Kids Moral Short on Kindness (Stories module link + Blogger Post)',
      ]
    : [
        'Explain why Allama Iqbal chose the Falcon (Shaheen) as a symbol.',
        'Write a gentle Urdu couplet about hope (امید) with English translation.',
        'Create a 5-question science quiz on our Solar System with answers.',
        'What is the moral lesson behind the story of the Oak and the Bamboo?',
      ];

  const handleSend = async () => {
    const textToSend = inputVal.trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    // Save user message to backend
    fetch('/api/chat/messages/13', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userMsg),
    }).catch(() => {});

    try {
      const reply = await queryGeminiAI(textToSend, {
        isKidsMode,
        mode: activeMode,
      });

      const aiReply = {
        sender: 'ai' as const,
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);

      // Save AI reply to backend
      fetch('/api/chat/messages/13', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aiReply),
      }).catch(() => {});
    } catch (err: any) {
      const errorReply = {
        sender: 'ai' as const,
        text: "I experienced a brief connection hiccup reaching the Gemini API. Please make sure the service is online or try asking again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToBlogger = async (content: string) => {
    try {
      const firstLine = content.split('\n')[0].substring(0, 70);
      const res = await fetch('/api/chat/link/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromChat: '13',
          toChat: '15',
          topic: firstLine || 'Educational Concept from Chat #13',
          contentDraft: content,
        }),
      });
      if (res.ok) {
        setTransferToast('✓ Transferred to Blogger Chat (15)! Click Blogger tab to view.');
        setTimeout(() => setTransferToast(null), 5000);
      }
    } catch (e) {
      console.error('Failed to transfer context:', e);
    }
  };

  const handleResetChat = async () => {
    try {
      await fetch('/api/chat/clear/13', { method: 'POST' });
      setMessages([
        {
          sender: 'ai',
          text: 'Chat history reset. How can I help you explore today?',
          time: 'Just now',
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <SectionHeader
        kicker={isKidsMode ? "Kids Friendly Guide" : "Intelligent Learning & Cultural Companion (Chat #13)"}
        title="Light & Laughter AI Assistant"
        titleUrdu="ہوشمند تعلیمی معاون (چیٹ 13)"
        description={
          isKidsMode
            ? "Gentle, uplifting explanations and stories crafted specially for young inquisitive minds."
            : "Live contextual tutor powered by Google Gemini, trained to illuminate literary beauty and explain complex educational ideas. Linked with Blogger Chat #15."
        }
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
              onClick={() => onNavigate('blogger')}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700"
            >
              Open Blogger Chat (15) ↗
            </button>
          )}
        </div>
      )}

      {/* Interconnection & Google Drive Sync Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 rounded-2xl border border-sky-100 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-sky-800 bg-white/90 px-3 py-1.5 rounded-xl border border-sky-200/80 shadow-2xs">
            <Link2 className="w-3.5 h-3.5 text-sky-600" />
            <span>🔗 Linked with Chat #15 (Blogger Studio)</span>
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
              onClick={() => onNavigate('blogger')}
              className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-white px-3 py-1.5 rounded-xl border border-sky-200 transition-colors shadow-2xs"
            >
              Switch to Chat #15 ↗
            </button>
          )}

          <button
            onClick={handleResetChat}
            className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            title="Reset Chat 13 conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveMode('general')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeMode === 'general' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
            <span>General Learn</span>
          </button>
          <button
            onClick={() => setActiveMode('poetry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeMode === 'poetry' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-amber-500" />
            <span>Poetry & Urdu</span>
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeMode === 'quiz' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>Quiz Generator</span>
          </button>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('blogger');
              } else {
                setActiveMode('blogger');
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
              activeMode === 'blogger' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-700 bg-sky-50 hover:bg-sky-100'
            }`}
            title="Linked with Blogger Studio"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Blogger Chat (15) 🔗</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Gemini 3.8 Flash • Persistent Backend</span>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInputVal(prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 text-xs text-slate-600 hover:text-sky-600 font-medium whitespace-nowrap transition-colors shadow-xs"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[72vh] min-h-[440px] max-h-[660px]">
        {/* Chat Header */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-900">
                  {isKidsMode ? "Sunny (Kids Learning Guide)" : "Light & Laughter Guide"}
                </p>
                <span className="px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black">
                  Chat #13
                </span>
                <span className="text-[10px] text-sky-600 font-bold hidden sm:inline">
                  • 🔗 Linked to Chat #15
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Backend Synced & Persistent</p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white'
                    : 'bg-amber-400 text-amber-950'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-xs shadow-sm'
                    : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {m.urdu && (
                  <p className="font-urdu text-base text-amber-900 font-bold mb-1 dir-rtl text-right">
                    {m.urdu}
                  </p>
                )}
                <div className="whitespace-pre-line">{m.text}</div>

                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-100/60">
                  <span
                    className={`block text-[10px] ${
                      m.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>

                  {m.sender === 'ai' && (
                    <button
                      onClick={() => handleTransferToBlogger(m.text)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800 hover:bg-sky-50 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                      title="Send this response as draft context to Blogger Chat (15)"
                    >
                      <Link2 className="w-3 h-3" />
                      <span>Send to Blogger (15)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-amber-400 text-amber-950">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-2 text-slate-500 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                <span>Illuminating thoughts with Gemini...</span>
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
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              isKidsMode
                ? "Ask Sunny anything fun or curious..."
                : "Type your question in Urdu or English..."
            }
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputVal.trim() || isLoading}
            className="p-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white rounded-xl transition-all shrink-0 flex items-center justify-center cursor-pointer"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
