import React, { createContext, useContext, useState, useEffect } from 'react';

export interface KidsThemeGradient {
  id: string;
  name: string;
  nameUrdu: string;
  gradient: string; // Tailwind gradient class
  fromHex: string;
  toHex: string;
  softBg: string; // Very soft page background
  patternDot: string; // Subtle dot color
  accentBorder: string; // Tailwind border
  accentBg: string; // Tailwind bg for primary buttons
  accentText: string; // Tailwind text
  ringColor: string; // Focus ring
}

export const KIDS_THEME_GRADIENTS: KidsThemeGradient[] = [
  // 1. Ocean Blue to Deep Royal (User Image Row 1, Col 4)
  {
    id: 'ocean-blue',
    name: 'Ocean Sky',
    nameUrdu: 'نیلا سمندر',
    gradient: 'from-sky-500 via-blue-600 to-indigo-800',
    fromHex: '#38bdf8',
    toHex: '#1e3a8a',
    softBg: '#f0f9ff',
    patternDot: '#bae6fd',
    accentBorder: 'border-sky-300',
    accentBg: 'bg-sky-600 hover:bg-sky-700',
    accentText: 'text-sky-950',
    ringColor: 'ring-sky-300',
  },
  // 2. Sunset Gold to Vibrant Pink (User Image Row 1, Col 2)
  {
    id: 'sunset-peach-pink',
    name: 'Peach Rose',
    nameUrdu: 'گلابی شفق',
    gradient: 'from-amber-300 via-rose-500 to-pink-600',
    fromHex: '#fcd34d',
    toHex: '#db2777',
    softBg: '#fff1f2',
    patternDot: '#fbcfe8',
    accentBorder: 'border-rose-300',
    accentBg: 'bg-rose-600 hover:bg-rose-700',
    accentText: 'text-rose-950',
    ringColor: 'ring-rose-300',
  },
  // 3. Mint to Emerald Teal (User Image Row 1, Col 3)
  {
    id: 'mint-teal',
    name: 'Emerald Mint',
    nameUrdu: 'زمردی ہریالی',
    gradient: 'from-emerald-400 via-teal-500 to-teal-800',
    fromHex: '#34d399',
    toHex: '#115e59',
    softBg: '#f0fdf4',
    patternDot: '#a7f3d0',
    accentBorder: 'border-emerald-300',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700',
    accentText: 'text-emerald-950',
    ringColor: 'ring-emerald-300',
  },
  // 4. Violet to Bright Fuchsia (User Image Row 2, Col 1)
  {
    id: 'violet-pink',
    name: 'Magic Purple',
    nameUrdu: 'جادوئی جامنی',
    gradient: 'from-purple-500 via-fuchsia-600 to-pink-600',
    fromHex: '#a855f7',
    toHex: '#db2777',
    softBg: '#faf5ff',
    patternDot: '#e9d5ff',
    accentBorder: 'border-purple-300',
    accentBg: 'bg-purple-600 hover:bg-purple-700',
    accentText: 'text-purple-950',
    ringColor: 'ring-purple-300',
  },
  // 5. Electric Aqua Cyan (User Image Row 2, Col 5)
  {
    id: 'aqua-cyan',
    name: 'Electric Aqua',
    nameUrdu: 'فیروزی لہریں',
    gradient: 'from-cyan-400 via-sky-500 to-blue-600',
    fromHex: '#22d3ee',
    toHex: '#0284c7',
    softBg: '#ecfeff',
    patternDot: '#a5f3fc',
    accentBorder: 'border-cyan-300',
    accentBg: 'bg-cyan-600 hover:bg-cyan-700',
    accentText: 'text-cyan-950',
    ringColor: 'ring-cyan-300',
  },
  // 6. Ice Periwinkle to Lavender (User Image Row 1, Col 5)
  {
    id: 'ice-periwinkle',
    name: 'Ice Periwinkle',
    nameUrdu: 'برفانی نیلم',
    gradient: 'from-blue-300 via-indigo-400 to-indigo-700',
    fromHex: '#93c5fd',
    toHex: '#4338ca',
    softBg: '#eef2ff',
    patternDot: '#c7d2fe',
    accentBorder: 'border-indigo-200',
    accentBg: 'bg-indigo-600 hover:bg-indigo-700',
    accentText: 'text-indigo-950',
    ringColor: 'ring-indigo-300',
  },
  // 7. Lime Spring to Green (User Image Row 2, Col 2)
  {
    id: 'lime-spring',
    name: 'Spring Lime',
    nameUrdu: 'تازہ بہار',
    gradient: 'from-lime-400 via-green-500 to-emerald-700',
    fromHex: '#a3e635',
    toHex: '#047857',
    softBg: '#f7fee7',
    patternDot: '#d9f99d',
    accentBorder: 'border-lime-300',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700',
    accentText: 'text-emerald-950',
    ringColor: 'ring-lime-300',
  },
  // 8. Warm Honey Mango (User Image Row 2, Col 3)
  {
    id: 'honey-mango',
    name: 'Golden Mango',
    nameUrdu: 'سنہری آم',
    gradient: 'from-amber-300 via-yellow-500 to-amber-600',
    fromHex: '#fde047',
    toHex: '#d97706',
    softBg: '#fffbeb',
    patternDot: '#fde68a',
    accentBorder: 'border-amber-300',
    accentBg: 'bg-amber-600 hover:bg-amber-700',
    accentText: 'text-amber-950',
    ringColor: 'ring-amber-300',
  },
  // 9. Coral Sunset Tangerine (User Image Row 2, Col 4)
  {
    id: 'coral-sunset',
    name: 'Sunset Coral',
    nameUrdu: 'غروبِ آفتاب',
    gradient: 'from-orange-400 via-rose-500 to-red-600',
    fromHex: '#fb923c',
    toHex: '#dc2626',
    softBg: '#fff7ed',
    patternDot: '#fed7aa',
    accentBorder: 'border-orange-300',
    accentBg: 'bg-rose-600 hover:bg-rose-700',
    accentText: 'text-rose-950',
    ringColor: 'ring-orange-300',
  },
  // 10. Crimson Strawberry Coral (User Image Row 1, Col 1)
  {
    id: 'strawberry-coral',
    name: 'Strawberry Ruby',
    nameUrdu: 'سرخ یاقوت',
    gradient: 'from-rose-400 via-red-500 to-rose-700',
    fromHex: '#fb7185',
    toHex: '#be123c',
    softBg: '#fff1f2',
    patternDot: '#fecdd3',
    accentBorder: 'border-rose-300',
    accentBg: 'bg-red-600 hover:bg-red-700',
    accentText: 'text-red-950',
    ringColor: 'ring-rose-300',
  },
];

interface KidsThemeContextType {
  currentTheme: KidsThemeGradient;
  themeIndex: number;
  nextTheme: () => void;
  selectTheme: (index: number) => void;
  allThemes: KidsThemeGradient[];
}

const KidsThemeContext = createContext<KidsThemeContextType>({
  currentTheme: KIDS_THEME_GRADIENTS[0],
  themeIndex: 0,
  nextTheme: () => {},
  selectTheme: () => {},
  allThemes: KIDS_THEME_GRADIENTS,
});

export const KidsThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kids_theme_index');
      return saved ? parseInt(saved, 10) % KIDS_THEME_GRADIENTS.length : 0;
    } catch {
      return 0;
    }
  });

  // Rotate every 3 minutes (180,000 ms) automatically
  useEffect(() => {
    const ROTATION_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes
    const timer = setInterval(() => {
      setThemeIndex((prev) => {
        const next = (prev + 1) % KIDS_THEME_GRADIENTS.length;
        try {
          localStorage.setItem('kids_theme_index', next.toString());
        } catch {}
        return next;
      });
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const nextTheme = () => {
    setThemeIndex((prev) => {
      const next = (prev + 1) % KIDS_THEME_GRADIENTS.length;
      try {
        localStorage.setItem('kids_theme_index', next.toString());
      } catch {}
      return next;
    });
  };

  const selectTheme = (index: number) => {
    const safeIdx = index % KIDS_THEME_GRADIENTS.length;
    setThemeIndex(safeIdx);
    try {
      localStorage.setItem('kids_theme_index', safeIdx.toString());
    } catch {}
  };

  const currentTheme = KIDS_THEME_GRADIENTS[themeIndex] || KIDS_THEME_GRADIENTS[0];

  return (
    <KidsThemeContext.Provider
      value={{
        currentTheme,
        themeIndex,
        nextTheme,
        selectTheme,
        allThemes: KIDS_THEME_GRADIENTS,
      }}
    >
      {children}
    </KidsThemeContext.Provider>
  );
};

export const useKidsTheme = () => useContext(KidsThemeContext);
