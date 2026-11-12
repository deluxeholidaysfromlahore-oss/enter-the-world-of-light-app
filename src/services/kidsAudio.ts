/**
 * Kids Light World Multi-Language Audio & Real Sound Effects Engine
 * 
 * Supports:
 * 1. Multi-Language Speech Synthesis (English, Urdu, Hindi, Arabic, Spanish, French)
 * 2. Realistic Animal Sound Effects (Lion, Cat, Dog, Cow, Duck, Elephant, Sheep, Horse, Bird, Rooster, Frog, Monkey, etc.)
 * 3. Dedicated Game Audio (Sudoku, Maze, Jigsaw, Word Search, Balloons, Memory Cards, etc.)
 * 4. Future-Proof Smart Item Audio Engine (Auto-detects animals and plays realistic sounds + multilingual name pronunciation)
 */

export type KidsVoiceLang = 'en' | 'ur' | 'hi' | 'ar' | 'es' | 'fr';

export interface KidsLanguageConfig {
  code: KidsVoiceLang;
  name: string;
  nativeName: string;
  flag: string;
  speechLocale: string;
  sampleGreeting: string;
}

export const KIDS_SUPPORTED_LANGUAGES: KidsLanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    speechLocale: 'en-US',
    sampleGreeting: 'Hello little wonder! Welcome to Kids Light World!',
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    speechLocale: 'ur-PK',
    sampleGreeting: 'خوش آمدید! روشنی اور علم کی خوبصورت دنیا میں۔',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    speechLocale: 'hi-IN',
    sampleGreeting: 'नमस्ते प्यारे बच्चे! सीखने और खेलने की अनोखी दुनिया में आपका स्वागत है।',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    speechLocale: 'ar-SA',
    sampleGreeting: 'مرحباً بك يا بطل! أهلاً بك في عالم النور والمعرفة.',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    speechLocale: 'es-ES',
    sampleGreeting: '¡Hola pequeño explorador! ¡Bienvenido al mundo de luz y alegría!',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    speechLocale: 'fr-FR',
    sampleGreeting: 'Bonjour petit champion! Bienvenue dans le monde de la lumière!',
  },
];

// Multilingual Animal Dictionary
interface AnimalData {
  names: { [key in KidsVoiceLang]?: string };
  soundKey: string;
}

const ANIMAL_DICTIONARY: { [key: string]: AnimalData } = {
  lion: {
    names: { en: 'Lion', ur: 'شیر', hi: 'शेर', ar: 'أسد', es: 'León', fr: 'Lion' },
    soundKey: 'lion',
  },
  tiger: {
    names: { en: 'Tiger', ur: 'چیتا', hi: 'बाघ', ar: 'نمر', es: 'Tigre', fr: 'Tigre' },
    soundKey: 'lion',
  },
  cat: {
    names: { en: 'Cat', ur: 'بلی', hi: 'बिल्ली', ar: 'قطة', es: 'Gato', fr: 'Chat' },
    soundKey: 'cat',
  },
  dog: {
    names: { en: 'Dog', ur: 'کتا', hi: 'कुत्ता', ar: 'كلب', es: 'Perro', fr: 'Chien' },
    soundKey: 'dog',
  },
  cow: {
    names: { en: 'Cow', ur: 'گائے', hi: 'गाय', ar: 'بقرة', es: 'Vaca', fr: 'Vache' },
    soundKey: 'cow',
  },
  elephant: {
    names: { en: 'Elephant', ur: 'ہاتھی', hi: 'हाथी', ar: 'فيل', es: 'Elefante', fr: 'Éléphant' },
    soundKey: 'elephant',
  },
  duck: {
    names: { en: 'Duck', ur: 'بطخ', hi: 'बतख', ar: 'بطة', es: 'Pato', fr: 'Canard' },
    soundKey: 'duck',
  },
  sheep: {
    names: { en: 'Sheep', ur: 'بھیڑ', hi: 'भेड़', ar: 'خروف', es: 'Oveja', fr: 'Mouton' },
    soundKey: 'sheep',
  },
  horse: {
    names: { en: 'Horse', ur: 'گھوڑا', hi: 'घोड़ा', ar: 'حصان', es: 'Caballo', fr: 'Cheval' },
    soundKey: 'horse',
  },
  bird: {
    names: { en: 'Bird', ur: 'چڑیا', hi: 'चिड़िया', ar: 'طائر', es: 'Pájaro', fr: 'Oiseau' },
    soundKey: 'bird',
  },
  rooster: {
    names: { en: 'Rooster', ur: 'مرغ', hi: 'मुर्गा', ar: 'ديك', es: 'Gallo', fr: 'Coq' },
    soundKey: 'rooster',
  },
  frog: {
    names: { en: 'Frog', ur: 'مینڈک', hi: 'मेंढक', ar: 'ضفدع', es: 'Rana', fr: 'Grenouille' },
    soundKey: 'frog',
  },
  monkey: {
    names: { en: 'Monkey', ur: 'بندر', hi: 'बंदर', ar: 'قرد', es: 'Mono', fr: 'Singe' },
    soundKey: 'monkey',
  },
  rabbit: {
    names: { en: 'Rabbit', ur: 'خرگوش', hi: 'खरगोश', ar: 'أرنب', es: 'Conejo', fr: 'Lapin' },
    soundKey: 'rabbit',
  },
  butterfly: {
    names: { en: 'Butterfly', ur: 'تتلی', hi: 'तितली', ar: 'فراشة', es: 'Mariposa', fr: 'Papillon' },
    soundKey: 'bird',
  },
  bee: {
    names: { en: 'Honey Bee', ur: 'شہد کی مکھی', hi: 'मधुमक्खी', ar: 'نحلة', es: 'Abeja', fr: 'Abeille' },
    soundKey: 'bee',
  },
  dolphin: {
    names: { en: 'Dolphin', ur: 'ڈولفن', hi: 'डॉल्फ़िन', ar: 'دلفين', es: 'Delfín', fr: 'Dauphin' },
    soundKey: 'bird',
  },
};

export type GameSoundType =
  | 'tap'
  | 'success'
  | 'retry'
  | 'celebration'
  | 'footstep'
  | 'wall_bump'
  | 'tile_slide'
  | 'card_flip'
  | 'balloon_pop'
  | 'word_found'
  | 'difference_found'
  | 'sudoku_place'
  | 'bell_ring';

class KidsAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private activeVoiceLang: KidsVoiceLang = 'en';

  constructor() {
    // Load saved preferences
    try {
      const savedMute = localStorage.getItem('kids_sound_muted');
      if (savedMute !== null) {
        this.isMuted = JSON.parse(savedMute);
      }

      const savedLang = localStorage.getItem('kids_voice_lang') as KidsVoiceLang;
      if (savedLang && KIDS_SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
        this.activeVoiceLang = savedLang;
      }
    } catch {
      this.isMuted = false;
      this.activeVoiceLang = 'en';
    }
  }

  // Mute control
  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      localStorage.setItem('kids_sound_muted', JSON.stringify(muted));
    } catch {}
    if (muted && this.currentAudioElement) {
      this.currentAudioElement.pause();
    }
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Language management
  public getVoiceLanguage(): KidsVoiceLang {
    return this.activeVoiceLang;
  }

  public setVoiceLanguage(lang: KidsVoiceLang): void {
    this.activeVoiceLang = lang;
    try {
      localStorage.setItem('kids_voice_lang', lang);
    } catch {}

    // Provide friendly instant voice sample in that new language
    const langConfig = KIDS_SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    if (langConfig) {
      this.speakWord(langConfig.sampleGreeting, lang);
    }
  }

  private getAudioContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  /* -------------------------------------------------------------------------
     REALISTIC ANIMAL SOUNDS (Synthesized with Acoustic Models)
  ------------------------------------------------------------------------- */
  public playAnimalSound(animalKey: string): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const lower = animalKey.toLowerCase();

    // 1. Lion / Tiger Roar (Deep resonant harmonic roar)
    if (lower.includes('lion') || lower.includes('tiger')) {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(130, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.7);

      osc2.frequency.setValueAtTime(65, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.7);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.76);
      osc2.stop(ctx.currentTime + 0.76);
      return;
    }

    // 2. Cat Meow (Pitch glide up then gentle drop)
    if (lower.includes('cat') || lower.includes('kitten')) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.25);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.66);
      return;
    }

    // 3. Dog Bark (Double "Woof Woof" acoustic envelope)
    if (lower.includes('dog') || lower.includes('puppy')) {
      [0, 0.22].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + offset + 0.14);

        gain.gain.setValueAtTime(0.01, ctx.currentTime + offset);
        gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.16);
      });
      return;
    }

    // 4. Cow Moo (Low harmonic formant "Moooo")
    if (lower.includes('cow')) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(155, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(125, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.86);
      return;
    }

    // 5. Duck Quack (Double nasal quack)
    if (lower.includes('duck')) {
      [0, 0.18].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(290, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(210, ctx.currentTime + offset + 0.12);

        gain.gain.setValueAtTime(0.01, ctx.currentTime + offset);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.13);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.14);
      });
      return;
    }

    // 6. Elephant Trumpet (High brassy harmonic fanfare)
    if (lower.includes('elephant')) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(680, ctx.currentTime + 0.25);
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.66);
      return;
    }

    // 7. Sheep Bleat ("Baaa-aaa")
    if (lower.includes('sheep') || lower.includes('lamb') || lower.includes('goat')) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      // vibrato
      osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.3);
      osc.frequency.linearRampToValueAtTime(270, ctx.currentTime + 0.45);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.56);
      return;
    }

    // 8. Horse Neigh / Whinny
    if (lower.includes('horse')) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(620, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.65);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.71);
      return;
    }

    // 9. Bird Chirp (Dual bright sweet tweet)
    if (lower.includes('bird') || lower.includes('sparrow') || lower.includes('butterfly')) {
      [0, 0.14].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1800, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + offset + 0.09);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.11);
      });
      return;
    }

    // 10. Rooster Crow ("Cock-a-doodle-doo")
    if (lower.includes('rooster') || lower.includes('cock')) {
      const pitches = [400, 520, 480, 680];
      let t = ctx.currentTime;
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        const dur = idx === 3 ? 0.35 : 0.12;

        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.02);
        t += dur + 0.02;
      });
      return;
    }

    // 11. Frog Ribbit (Low dual croak)
    if (lower.includes('frog')) {
      [0, 0.18].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(110, ctx.currentTime + offset);
        osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + offset + 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.13);
      });
      return;
    }

    // 12. Monkey Chatter
    if (lower.includes('monkey')) {
      [0, 0.1, 0.22].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + offset + 0.06);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.08);
      });
      return;
    }

    // 13. Bee Buzz
    if (lower.includes('bee')) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(260, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.41);
      return;
    }

    // Default cute pop
    this.playPopSound();
  }

  /* -------------------------------------------------------------------------
     GAME ACTIONS AUDIO ENGINE
  ------------------------------------------------------------------------- */
  public playGameSound(sound: GameSoundType): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    switch (sound) {
      case 'tap':
      case 'footstep':
        this.playPopSound();
        break;

      case 'wall_bump': {
        // Soft bump thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.13);
        break;
      }

      case 'tile_slide': {
        // Wooden tile click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
        break;
      }

      case 'balloon_pop': {
        // Sharp bubble pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.09);
        break;
      }

      case 'card_flip': {
        // Quick swoosh flip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
        break;
      }

      case 'difference_found':
      case 'word_found':
      case 'success':
        this.playRewardChime();
        break;

      case 'retry':
        this.playGentleRetrySound();
        break;

      case 'celebration':
        this.playCelebrationFanfare();
        break;

      case 'sudoku_place':
      case 'bell_ring': {
        // Pure bell chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.36);
        break;
      }
    }
  }

  // Stop all active speech and media playback immediately
  public stopAllAudio(): void {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {}
      this.currentAudioElement = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  /* -------------------------------------------------------------------------
     MULTILINGUAL SPEECH SYNTHESIS ENGINE
  ------------------------------------------------------------------------- */
  public speakWord(text: string, lang?: KidsVoiceLang): Promise<void> {
    return new Promise((resolve) => {
      if (this.isMuted) {
        resolve();
        return;
      }

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        resolve();
        return;
      }

      try {
        this.stopAllAudio();
        const targetLang = lang || this.activeVoiceLang;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.88; // Cheerful, clear child-friendly rate
        utterance.pitch = 1.12; // Friendly warm pitch

        const langConfig = KIDS_SUPPORTED_LANGUAGES.find((l) => l.code === targetLang);
        utterance.lang = langConfig ? langConfig.speechLocale : 'en-US';

        // Select best matching voice for target language
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0 && langConfig) {
          // Priority 1: Exact locale match (e.g. 'ur-PK', 'hi-IN', 'ar-SA', 'es-ES', 'fr-FR', 'en-US')
          let bestVoice = voices.find(
            (v) => v.lang.toLowerCase() === langConfig.speechLocale.toLowerCase()
          );
          // Priority 2: Prefix match on language code (e.g. 'ur', 'hi', 'ar', 'es', 'fr', 'en')
          if (!bestVoice) {
            bestVoice = voices.find((v) =>
              v.lang.toLowerCase().startsWith(langConfig.code.toLowerCase())
            );
          }
          if (bestVoice) {
            utterance.voice = bestVoice;
          }
        }

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        window.speechSynthesis.speak(utterance);
      } catch {
        resolve();
      }
    });
  }

  /* -------------------------------------------------------------------------
     FUTURE-PROOF SMART ITEM AUDIO (Auto-detects animals and multi-language name)
  ------------------------------------------------------------------------- */
  public async playItemAudio(item: {
    id?: string;
    title?: string;
    titleUrdu?: string;
    emoji?: string;
    category?: string;
    description?: string;
    pronunciation?: string;
  }): Promise<void> {
    if (this.isMuted) return;

    this.stopAllAudio();

    const fullText = `${item.title || ''} ${item.category || ''} ${item.emoji || ''}`.toLowerCase();

    // Check if item is an animal
    let detectedAnimalKey: string | null = null;
    for (const key of Object.keys(ANIMAL_DICTIONARY)) {
      if (fullText.includes(key)) {
        detectedAnimalKey = key;
        break;
      }
    }

    if (detectedAnimalKey) {
      // 1. Play real animal sound immediately!
      this.playAnimalSound(ANIMAL_DICTIONARY[detectedAnimalKey].soundKey);

      // 2. Speak animal name in current selected language
      const namesObj = ANIMAL_DICTIONARY[detectedAnimalKey].names;
      const targetName =
        namesObj[this.activeVoiceLang] ||
        (this.activeVoiceLang === 'ur' ? item.titleUrdu : item.title) ||
        namesObj.en ||
        detectedAnimalKey;

      // Give 0.45s pause so the animal sound finishes before name pronunciation
      setTimeout(() => {
        this.speakWord(targetName, this.activeVoiceLang);
      }, 450);
      return;
    }

    // Non-animal item (Alphabet, Number, Science, Space, Food, etc.)
    // Speak voice cleanly without unwanted beep
    let textToSpeak = item.title || '';
    if (this.activeVoiceLang === 'ur' && item.titleUrdu) {
      textToSpeak = item.titleUrdu;
    } else if (item.pronunciation && this.activeVoiceLang === 'en') {
      textToSpeak = `${item.title}. ${item.pronunciation}`;
    }
    await this.speakWord(textToSpeak, this.activeVoiceLang);
  }

  /* -------------------------------------------------------------------------
     LEGACY SHORTCUT CHIMES (Maintained for full backward compatibility)
  ------------------------------------------------------------------------- */
  public playPopSound(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
  }

  public playRewardChime(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.36);
    });
  }

  public playGentleRetrySound(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [349.23, 311.13]; // F4, Eb4 soft descend
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.23);
    });
  }

  public playCelebrationFanfare(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, d: 0.12 }, // C
      { f: 659.25, d: 0.12 }, // E
      { f: 783.99, d: 0.12 }, // G
      { f: 1046.5, d: 0.35 }, // High C
    ];

    let currTime = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, currTime);

      gain.gain.setValueAtTime(0, currTime);
      gain.gain.linearRampToValueAtTime(0.3, currTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, currTime + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(currTime);
      osc.stop(currTime + note.d + 0.05);

      currTime += note.d + 0.02;
    });
  }

  private activeOscillators: OscillatorNode[] = [];

  public stopCurrentMelody(): void {
    try {
      this.activeOscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {}
      });
      this.activeOscillators = [];
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }

  public playNasheedMelody(notes: { f: number; d: number }[]): void {
    if (this.isMuted) return;
    this.stopCurrentMelody();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    let currTime = ctx.currentTime + 0.05;

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm acoustic sine + triangle blend
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, currTime);

      gain.gain.setValueAtTime(0, currTime);
      gain.gain.linearRampToValueAtTime(0.2, currTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, currTime + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(currTime);
      osc.stop(currTime + note.d + 0.06);

      this.activeOscillators.push(osc);
      currTime += note.d + 0.03;
    });
  }

  public playMusicNote(freq: number, type: OscillatorType = 'triangle'): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.62);
  }

  /**
   * Traditional Islamic Duff (Acoustic Frame Drum) gentle rhythm
   * Soft, organic low-frequency thumps and rim strikes without synthetic harshness
   */
  public playDafRhythm(beatsCount: number = 8, tempoMs: number = 480): void {
    if (this.isMuted) return;
    this.stopCurrentMelody();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    let currTime = ctx.currentTime + 0.05;

    for (let i = 0; i < beatsCount; i++) {
      const isDum = i % 4 === 0 || i % 4 === 2; // Low resonant center strike (Dum)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (isDum) {
        // Dum: warm 75Hz tone dropping to 45Hz
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, currTime);
        osc.frequency.exponentialRampToValueAtTime(45, currTime + 0.25);

        gain.gain.setValueAtTime(0.22, currTime);
        gain.gain.exponentialRampToValueAtTime(0.001, currTime + 0.32);
      } else {
        // Tak: soft gentle rim tap (~280Hz)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, currTime);
        osc.frequency.exponentialRampToValueAtTime(120, currTime + 0.12);

        gain.gain.setValueAtTime(0.09, currTime);
        gain.gain.exponentialRampToValueAtTime(0.001, currTime + 0.15);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(currTime);
      osc.stop(currTime + (isDum ? 0.35 : 0.18));
      this.activeOscillators.push(osc);

      currTime += tempoMs / 1000;
    }
  }
}

export const kidsAudio = new KidsAudioEngine();
