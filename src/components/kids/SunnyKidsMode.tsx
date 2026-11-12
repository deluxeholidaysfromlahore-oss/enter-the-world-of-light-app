import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  Volume2,
  HelpCircle,
  BookOpen,
  Compass,
  Smile,
  RefreshCw,
} from 'lucide-react';
import { queryGeminiAI } from '../../services/contentService';
import { kidsAudio } from '../../services/kidsAudio';
import { KidsAudioButton } from './KidsAudioButton';

export const SunnyKidsMode: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: 'sunny' | 'child'; text: string; time: string }[]
  >([
    {
      sender: 'sunny',
      text: "Salam & Hello little star! ☀️ I am Sunny, your joyful learning guide! Pick a question below or ask me anything fun about animals, stars, or words!",
      time: 'Just now',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<
    'teach' | 'quiz' | 'story' | 'practice' | 'explore'
  >('teach');

  const modePrompts = {
    teach: [
      'Why is the sky blue in the day? 🌈',
      'How do little plants drink water? 🌱',
      'Why do cats purr when happy? 🐱',
    ],
    quiz: [
      'Ask me a fun riddle with animals! 🦁',
      'Give me a 3-question color and shape quiz! 🔺',
      'Test my counting skills with fruits! 🍎',
    ],
    story: [
      'Tell me a 2-minute happy bedtime fable ✨',
      'Tell a story of a brave little bird 🐦',
      'Tell a story about sharing toys with friends 🧸',
    ],
    practice: [
      'Teach me 3 lovely Urdu words for kindness 💛',
      'Help me practice English ABC sounds 🔤',
      'Teach me how to count from 1 to 5 in Urdu 🔢',
    ],
    explore: [
      'What are Saturn’s rings made of? 🪐',
      'How deep is the deepest ocean trench? 🌊',
      'How big were dinosaurs compared to houses? 🦖',
    ],
  };

  const handleSendPrompt = async (text: string) => {
    const textToSend = text.trim();
    if (!textToSend || isLoading) return;

    kidsAudio.playPopSound();
    const childMsg = {
      sender: 'child' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, childMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const reply = await queryGeminiAI(textToSend, {
        isKidsMode: true,
        mode: activeMode === 'quiz' ? 'quiz' : 'general',
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'sunny',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      kidsAudio.playRewardChime();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'sunny',
          text: "Oops! My cloud drifted a bit. Remember, every little bird learns to fly step by step! Try asking me again!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      kidsAudio.playGentleRetrySound();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-sky-200 space-y-5 max-w-3xl mx-auto">
      {/* Sunny Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-3xl bg-sky-500 text-white flex items-center justify-center text-3xl shadow-md animate-bounce">
            ☀️
          </div>
          <div>
            <h3 className="text-xl font-black text-sky-950 flex items-center gap-2">
              <span>Sunny — Your Kids AI Guide</span>
              <Sparkles className="w-4 h-4 text-sky-500" />
            </h3>
            <p className="text-xs font-bold text-sky-700">
              Child-Safe • Encouraging • Bilingual English & Urdu
            </p>
          </div>
        </div>

        <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-[11px] font-black text-emerald-800">
          🛡️ Safe Mode ON
        </div>
      </div>

      {/* 5 Sunny Modes in Soft Blue */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'teach', label: 'Teach Me 🌈' },
          { id: 'quiz', label: 'Ask a Quiz 🎯' },
          { id: 'story', label: 'Tell a Story ✨' },
          { id: 'practice', label: 'Practice Mode 📝' },
          { id: 'explore', label: 'Let’s Explore 🚀' },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActiveMode(m.id as any);
              kidsAudio.playPopSound();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              activeMode === m.id
                ? 'bg-sky-600 text-white shadow-sm scale-102 ring-2 ring-sky-200'
                : 'bg-sky-50 text-sky-900 hover:bg-sky-100'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Suggested Quick Starters */}
      <div className="flex flex-wrap gap-2">
        {modePrompts[activeMode].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendPrompt(prompt)}
            disabled={isLoading}
            className="px-3 py-1.5 bg-white hover:bg-sky-50 border-2 border-sky-100 text-sky-950 text-xs font-bold rounded-2xl text-left shadow-sm active:scale-95 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="space-y-4 max-h-[380px] overflow-y-auto p-4 bg-sky-50/40 rounded-2xl border border-sky-100">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'child' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-4 rounded-3xl max-w-[85%] text-xs sm:text-sm font-medium shadow-sm space-y-2 ${
                m.sender === 'child'
                  ? 'bg-sky-600 text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border-2 border-sky-200 rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[10px] font-bold opacity-75">
                <span>{m.sender === 'child' ? 'You' : 'Sunny ☀️'}</span>
                <span>{m.time}</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

              {m.sender === 'sunny' && (
                <div className="pt-1">
                  <KidsAudioButton
                    textToSpeak={m.text}
                    lang="en"
                    label="Listen to Sunny"
                    size="sm"
                    className="bg-sky-50 text-sky-900 border-sky-200"
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-sky-200 w-fit text-xs font-bold text-sky-800">
            <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
            <span>Sunny is thinking up a wonderful answer...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendPrompt(inputVal);
          }}
          placeholder="Ask Sunny a gentle question..."
          className="flex-1 px-4 py-3 bg-white border-2 border-sky-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-inner"
        />
        <button
          onClick={() => handleSendPrompt(inputVal)}
          disabled={!inputVal.trim() || isLoading}
          className="px-5 py-3 bg-sky-600 hover:bg-sky-700 active:scale-95 disabled:opacity-50 text-white rounded-2xl shadow-md transition-all flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
