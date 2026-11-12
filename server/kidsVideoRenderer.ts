import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface KidsVideoPipelineRecord {
  contentId: string;
  category: string;
  topic: string;
  topicSlug: string;
  targetAge: string;
  language: 'en' | 'ur' | 'bilingual';
  durationSeconds: number;
  script: {
    hook: string;
    body: string;
    phonics: string;
    outro: string;
  };
  voiceText: string;
  scenes: {
    sceneNumber: number;
    title: string;
    visualType: string;
    duration: number;
    subtitles: string;
    displayWord: string;
    displayUrdu?: string;
  }[];
  status:
    | 'queued'
    | 'generating_script'
    | 'generating_audio'
    | 'rendering_video'
    | 'completed'
    | 'failed'
    | 'youtube_uploaded'
    | 'blog_published';
  videoUrl: string;
  audioUrl: string;
  thumbnailUrl: string;
  creationDate: string;
  completedAt?: string;
  youtubeStatus: 'draft' | 'queued' | 'uploaded';
  youtubeVideoId?: string | null;
  youtubeUrl?: string | null;
  blogStatus: 'draft' | 'queued' | 'published';
  blogPostId?: string | null;
  blogUrl?: string | null;
  errorMessage?: string | null;
  retryCount: number;
}

export interface TopicConfig {
  id: string;
  topic: string;
  topicSlug: string;
  category: string;
  letterOrNumber: string;
  primaryWord: string;
  wordUrdu: string;
  phonicsSound: string;
  visualEmoji: string;
  primaryColor: string;
  secondaryColor: string;
  voiceScript: string;
  educationalFact: string;
}

export const KIDS_TOPICS_DATABASE: TopicConfig[] = [
  {
    id: 'KID-VID-001',
    topic: 'A for Apple',
    topicSlug: 'a_for_apple',
    category: 'Alphabet',
    letterOrNumber: 'A',
    primaryWord: 'APPLE',
    wordUrdu: 'سیب (Apple)',
    phonicsSound: '/æ/ /æ/ Apple',
    visualEmoji: '🍎',
    primaryColor: '#ef4444',
    secondaryColor: '#f59e0b',
    voiceScript: 'A is for Apple! A shiny, sweet, red apple! Apple starts with the letter A. Can you say Apple? A... Apple! Great job, little star!',
    educationalFact: 'Apples grow on trees and are packed with healthy vitamins!',
  },
  {
    id: 'KID-VID-002',
    topic: 'B for Ball',
    topicSlug: 'b_for_ball',
    category: 'Alphabet',
    letterOrNumber: 'B',
    primaryWord: 'BALL',
    wordUrdu: 'گیند (Ball)',
    phonicsSound: '/b/ /b/ Ball',
    visualEmoji: '⚽',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    voiceScript: 'B is for Ball! A bouncy, round, colorful ball! Boing, boing, boing! Ball starts with the letter B. Can you bounce like a ball? B... Ball! Fantastic!',
    educationalFact: 'Balls bounce and roll, making outdoor games active and fun!',
  },
  {
    id: 'KID-VID-003',
    topic: 'C for Cat',
    topicSlug: 'c_for_cat',
    category: 'Alphabet',
    letterOrNumber: 'C',
    primaryWord: 'CAT',
    wordUrdu: 'بلی (Cat)',
    phonicsSound: '/k/ /k/ Cat',
    visualEmoji: '🐱',
    primaryColor: '#f97316',
    secondaryColor: '#fbbf24',
    voiceScript: 'C is for Cat! A soft, cute, furry cat! Meow, meow! Cat starts with the letter C. Can you say meow? C... Cat! You are so smart!',
    educationalFact: 'Cats are playful, purr when happy, and have super hearing!',
  },
  {
    id: 'KID-VID-004',
    topic: 'D for Duck',
    topicSlug: 'd_for_duck',
    category: 'Alphabet',
    letterOrNumber: 'D',
    primaryWord: 'DUCK',
    wordUrdu: 'بطخ (Duck)',
    phonicsSound: '/d/ /d/ Duck',
    visualEmoji: '🦆',
    primaryColor: '#eab308',
    secondaryColor: '#06b6d4',
    voiceScript: 'D is for Duck! A cheerful yellow duck swimming on the pond! Quack, quack! Duck starts with the letter D. Quack like a duck! D... Duck! Wonderful!',
    educationalFact: 'Ducks have waterproof feathers to stay dry and cozy while swimming!',
  },
  {
    id: 'KID-VID-005',
    topic: 'Number 1 - One Bright Sun',
    topicSlug: 'number_1_sun',
    category: 'Numbers',
    letterOrNumber: '1',
    primaryWord: 'ONE',
    wordUrdu: 'ایک (One)',
    phonicsSound: 'Number 1',
    visualEmoji: '☀️',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    voiceScript: 'Look up! It is Number 1! One bright shining sun in the sky! Show me one finger! 1! Number 1 is for One! Great counting!',
    educationalFact: 'The Sun gives warmth and light to all living things on Earth!',
  },
  {
    id: 'KID-VID-006',
    topic: 'Number 2 - Two Happy Birds',
    topicSlug: 'number_2_birds',
    category: 'Numbers',
    letterOrNumber: '2',
    primaryWord: 'TWO',
    wordUrdu: 'دو (Two)',
    phonicsSound: 'Number 2',
    visualEmoji: '🐦',
    primaryColor: '#0284c7',
    secondaryColor: '#38bdf8',
    voiceScript: 'Here comes Number 2! One, Two! Two little birds singing a happy song on a branch! Tweet, tweet! Show me two fingers! Number 2! Wonderful!',
    educationalFact: 'Birds build cozy nests using twigs to keep their little eggs safe!',
  },
];

const STORAGE_DIR = path.resolve(process.cwd(), 'public/storage/kids_videos');
const MANIFEST_PATH = path.join(STORAGE_DIR, 'pipeline_manifest.json');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export function getLocalManifest(): KidsVideoPipelineRecord[] {
  try {
    if (fs.existsSync(MANIFEST_PATH)) {
      const data = fs.readFileSync(MANIFEST_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading pipeline_manifest.json:', err);
  }
  return [];
}

export function saveLocalManifest(records: KidsVideoPipelineRecord[]): void {
  try {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving pipeline_manifest.json:', err);
  }
}

export function getNextEligibleTopic(): TopicConfig {
  const manifest = getLocalManifest();
  const completedSlugs = new Set(
    manifest.filter((item) => item.status === 'completed').map((item) => item.topicSlug)
  );

  const candidate = KIDS_TOPICS_DATABASE.find((topic) => !completedSlugs.has(topic.topicSlug));
  return candidate || KIDS_TOPICS_DATABASE[1];
}

async function fetchTtsAudio(text: string, outputPath: string): Promise<void> {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=en&client=tw-ob`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });

  if (!res.ok) {
    throw new Error(`TTS service responded with HTTP ${res.status}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(arrayBuffer));
}

// =============================================================================
// HIGH-FIDELITY 3D VECTOR GRAPHICS ENGINE (NO MISSING EMOJIS, 100% VECTOR 3D)
// =============================================================================

/**
 * Draws a gorgeous, shiny 3D Cartoon Apple with Anime Eyes, Smile & Leaf
 */
function render3DApple(scaleX: number, scaleY: number, bounceY: number, time: number): string {
  const blinkCycle = time % 3.2;
  const isBlinking = blinkCycle > 2.95 && blinkCycle < 3.1;
  const eyeHeight = isBlinking ? 4 : 44;

  const mouthOpen = 24 + 14 * Math.sin(time * 8);

  return `
    <g transform="translate(540, ${bounceY}) scale(${scaleX}, ${scaleY})">
      <!-- Ground Shadow (Contraction with height) -->
      <ellipse cx="0" cy="270" rx="${220 * scaleX}" ry="${32 * scaleY}" fill="#0f172a" opacity="0.22" filter="url(#dropShadow)" />

      <!-- Curved Woody Stalk -->
      <path d="M 0 -150 C 15 -210, 45 -250, 75 -265 C 60 -265, 20 -220, -12 -150 Z" fill="url(#stalkWood)" filter="url(#dropShadow)" />

      <!-- Glossy Green Leaf with Vein -->
      <g transform="translate(25, -200) rotate(${15 + Math.sin(time * 5) * 8})">
        <path d="M 0 0 C 60 -80, 160 -60, 190 10 C 130 50, 50 30, 0 0 Z" fill="url(#leafGreen)" filter="url(#dropShadow)" />
        <!-- Leaf Vein Rib -->
        <path d="M 0 0 Q 90 -20 185 10" stroke="#86efac" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75" />
      </g>

      <!-- 3D Apple Main Body -->
      <path d="M 0 -130 C 70 -195, 220 -175, 235 -40 C 245 90, 180 230, 45 250 C 15 254, -15 254, -45 250 C -180 230, -245 90, -235 -40 C -220 -175, -70 -195, 0 -130 Z"
            fill="url(#appleRedGrad)" filter="url(#dropShadow)" />

      <!-- 3D Apple Specular Highlights (Glossy 3D Sheen) -->
      <path d="M -130 -110 C -60 -150, 40 -140, 80 -100 C 60 -80, -20 -80, -110 -60 Z"
            fill="#ffffff" opacity="0.45" filter="url(#softGlow)" />
      <ellipse cx="-110" cy="-30" rx="35" ry="75" transform="rotate(-25 -110 -30)" fill="#ffffff" opacity="0.25" />

      <!-- Cheerful Anime Eyes -->
      <!-- Left Eye -->
      <g transform="translate(-75, 20)">
        <ellipse cx="0" cy="0" rx="28" ry="${eyeHeight}" fill="#ffffff" filter="url(#dropShadow)" />
        ${!isBlinking ? `
          <ellipse cx="4" cy="2" rx="19" ry="24" fill="#0f172a" />
          <circle cx="9" cy="-4" r="8" fill="#ffffff" />
          <circle cx="1" cy="9" r="4" fill="#38bdf8" />
        ` : `
          <path d="M -22 0 Q 0 -12 22 0" stroke="#0f172a" stroke-width="6" stroke-linecap="round" fill="none" />
        `}
      </g>

      <!-- Right Eye -->
      <g transform="translate(75, 20)">
        <ellipse cx="0" cy="0" rx="28" ry="${eyeHeight}" fill="#ffffff" filter="url(#dropShadow)" />
        ${!isBlinking ? `
          <ellipse cx="4" cy="2" rx="19" ry="24" fill="#0f172a" />
          <circle cx="9" cy="-4" r="8" fill="#ffffff" />
          <circle cx="1" cy="9" r="4" fill="#38bdf8" />
        ` : `
          <path d="M -22 0 Q 0 -12 22 0" stroke="#0f172a" stroke-width="6" stroke-linecap="round" fill="none" />
        `}
      </g>

      <!-- Rosy Cheeks -->
      <ellipse cx="-125" cy="55" rx="32" ry="18" fill="url(#blushPink)" opacity="0.75" />
      <ellipse cx="125" cy="55" rx="32" ry="18" fill="url(#blushPink)" opacity="0.75" />

      <!-- Smiling Open Mouth with Tongue -->
      <g transform="translate(0, 95)">
        <path d="M -50 -10 Q 0 ${mouthOpen} 50 -10 Z" fill="#7f1d1d" stroke="#450a0a" stroke-width="5" />
        <path d="M -28 6 Q 0 ${mouthOpen - 2} 28 6 Q 0 0 -28 6 Z" fill="#f43f5e" />
        <!-- Cute Little Tooth -->
        <rect x="-14" y="-10" width="28" height="12" rx="4" fill="#ffffff" />
      </g>

      <!-- Cute Bouncy Hands -->
      <g transform="translate(-230, 40) rotate(${15 + Math.sin(time * 9) * 18})">
        <circle cx="0" cy="0" r="38" fill="#ffffff" filter="url(#dropShadow)" />
        <circle cx="-16" cy="-12" r="14" fill="#ffffff" />
      </g>
      <g transform="translate(230, 40) rotate(${-15 - Math.sin(time * 9) * 18})">
        <circle cx="0" cy="0" r="38" fill="#ffffff" filter="url(#dropShadow)" />
        <circle cx="16" cy="-12" r="14" fill="#ffffff" />
      </g>
    </g>
  `;
}

/**
 * Draws a vibrant 3D Bouncy Sports/Beach Ball with curved spherical panels & dynamic impact!
 */
function render3DBall(scaleX: number, scaleY: number, bounceY: number, time: number): string {
  const rotationDeg = (time * 140) % 360;

  return `
    <g transform="translate(540, ${bounceY})">
      <!-- Ground Shadow (Expands on impact) -->
      <ellipse cx="0" cy="240" rx="${220 * scaleX}" ry="${35 * scaleY}" fill="#0f172a" opacity="0.25" filter="url(#dropShadow)" />

      <!-- Ball Sphere with Squash & Stretch + Spin -->
      <g transform="scale(${scaleX}, ${scaleY}) rotate(${rotationDeg})">
        <!-- Outer Sphere Clip -->
        <g clip-path="url(#ballClip)">
          <!-- Base Sphere Fill -->
          <circle cx="0" cy="0" r="210" fill="url(#ballSphereGrad)" filter="url(#dropShadow)" />

          <!-- Dynamic Curved 3D Panels (Beach/Sports Multi-Color) -->
          <!-- Panel 1: Sunny Yellow -->
          <path d="M 0 -210 C 130 -160 190 -40 210 0 C 130 -30 60 -120 0 -210 Z" fill="url(#ballYellow)" />
          
          <!-- Panel 2: Vibrant Coral Red -->
          <path d="M 210 0 C 190 120 100 190 0 210 C 60 130 140 60 210 0 Z" fill="url(#ballRed)" />

          <!-- Panel 3: Royal Blue -->
          <path d="M 0 210 C -120 190 -190 100 -210 0 C -130 50 -60 140 0 210 Z" fill="url(#ballBlue)" />

          <!-- Panel 4: Emerald Green -->
          <path d="M -210 0 C -190 -120 -100 -190 0 -210 C -50 -130 -130 -50 -210 0 Z" fill="url(#ballGreen)" />

          <!-- 3D Center Hub Badge -->
          <circle cx="0" cy="0" r="55" fill="#ffffff" filter="url(#dropShadow)" />
          <circle cx="0" cy="0" r="42" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4" />
          <path d="M -18 -8 L 0 -26 L 18 -8 L 12 18 L -12 18 Z" fill="#0f172a" />

          <!-- Curved Seam Lines (Spherical 3D Perspective) -->
          <path d="M 0 -210 Q 55 0 0 210" stroke="#ffffff" stroke-width="12" fill="none" opacity="0.9" />
          <path d="M -210 0 Q 0 55 210 0" stroke="#ffffff" stroke-width="12" fill="none" opacity="0.9" />
          <circle cx="0" cy="0" r="210" stroke="#ffffff" stroke-width="10" fill="none" opacity="0.9" />
        </g>

        <!-- Spherical 3D Specular Highlight Arc (Stationary Highlight) -->
        <ellipse cx="-75" cy="-85" rx="85" ry="48" transform="rotate(-30 -75 -85)" fill="#ffffff" opacity="0.5" filter="url(#softGlow)" />
        <circle cx="-100" cy="-100" r="22" fill="#ffffff" opacity="0.8" />
      </g>

      <!-- Impact Bounce Particles (Triggered near bottom) -->
      ${scaleX > 1.05 ? `
        <g transform="translate(0, 190)">
          <text x="-160" y="0" font-size="50">✨</text>
          <text x="140" y="-10" font-size="55">🌟</text>
          <text x="-90" y="25" font-size="45">⭐</text>
          <text x="80" y="25" font-size="45">✨</text>
          <circle cx="0" cy="0" r="160" fill="none" stroke="#f59e0b" stroke-width="6" opacity="0.6" />
        </g>
      ` : ''}

      <!-- Comic "BOING!" Sound Badge -->
      <g transform="translate(230, -120) rotate(12)">
        <polygon points="-60,-25 -10,-35 40,-45 25,-10 65,0 15,20 30,50 -20,25 -55,40 -35,5" fill="#fef08a" stroke="#ea580c" stroke-width="6" filter="url(#dropShadow)" />
        <text x="0" y="8" font-family="'Nunito', sans-serif" font-size="28" font-weight="900" fill="#c2410c" text-anchor="middle">BOING!</text>
      </g>
    </g>
  `;
}

/**
 * Draws a 3D Toy Spelling Block (A, B, C, etc.) with wood/plastic bevel
 */
function renderSpellingBlock(char: string, index: number, total: number, isFirst: boolean, color: string): string {
  const blockWidth = 115;
  const blockSpacing = 16;
  const totalW = total * (blockWidth + blockSpacing);
  const startX = -totalW / 2 + blockWidth / 2;
  const bx = startX + index * (blockWidth + blockSpacing);

  return `
    <g transform="translate(${bx}, 0)">
      <!-- 3D Block Extrusion (Shadow Base) -->
      <rect x="-56" y="-50" width="112" height="112" rx="24" fill="#0f172a" opacity="0.25" filter="url(#dropShadow)" />
      <rect x="-56" y="-56" width="112" height="112" rx="24" fill="${isFirst ? '#b91c1c' : '#94a3b8'}" />
      
      <!-- Front Face -->
      <rect x="-56" y="-62" width="112" height="106" rx="24" fill="${isFirst ? color : '#f8fafc'}" stroke="#ffffff" stroke-width="5" />
      
      <!-- Embossed Letter -->
      <text x="0" y="16" font-family="'Nunito', sans-serif" font-size="76" font-weight="900" fill="${isFirst ? '#ffffff' : '#1e293b'}" text-anchor="middle" filter="url(#dropShadow)">${char}</text>
      
      <!-- Top Bevel Highlight -->
      <line x1="-36" y1="-54" x2="36" y2="-54" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.7" />
    </g>
  `;
}

/**
 * Main Frame Renderer
 */
function renderSvgFrameForTopic(
  topicConfig: TopicConfig,
  frameIndex: number,
  totalFrames: number,
  fps: number
): string {
  const t = frameIndex / fps;

  const cloud1X = (80 + t * 24) % 1200 - 100;
  const cloud2X = (920 - t * 18) % 1200 - 100;

  const letter = topicConfig.letterOrNumber;
  const word = topicConfig.primaryWord;
  const isApple = topicConfig.topicSlug.includes('apple');
  const isBall = topicConfig.topicSlug.includes('ball');

  let sceneSvg = '';
  let subtitleText = '';
  let urduSubtitle = topicConfig.wordUrdu;

  if (t < 4.5) {
    // SCENE 1: GIANT 3D CANDY LETTER INTRO (PIXAR REEL STYLE)
    const letterBounceY = 920 - Math.abs(Math.sin(t * 3.8)) * 140;
    const letterScale = 1 + 0.08 * Math.sin(t * 7.5);
    subtitleText = `${letter} is for ${word}!`;

    sceneSvg = `
      <!-- Sparkle Burst Ring -->
      <g transform="translate(540, ${letterBounceY})">
        <circle cx="0" cy="0" r="320" fill="url(#sparkleGlow)" opacity="0.65" />
        <g transform="rotate(${t * 60})">
          <text x="-240" y="-180" font-size="70">✨</text>
          <text x="220" y="-190" font-size="80">🌟</text>
          <text x="-220" y="240" font-size="75">⭐</text>
          <text x="210" y="230" font-size="70">✨</text>
        </g>
      </g>

      <!-- Giant 3D Candy-Pop Letter -->
      <g transform="translate(540, ${letterBounceY}) scale(${letterScale})">
        <!-- 3D Extrusion Layers (4 Steps for Deep Volume) -->
        <text x="0" y="165" font-family="'Nunito', sans-serif" font-weight="900" font-size="460" fill="#0f172a" opacity="0.28" text-anchor="middle">${letter}</text>
        <text x="0" y="152" font-family="'Nunito', sans-serif" font-weight="900" font-size="460" fill="#9a3412" text-anchor="middle">${letter}</text>
        <text x="0" y="140" font-family="'Nunito', sans-serif" font-weight="900" font-size="460" fill="${topicConfig.secondaryColor}" text-anchor="middle">${letter}</text>
        <text x="0" y="125" font-family="'Nunito', sans-serif" font-weight="900" font-size="460" fill="url(#letterGrad)" text-anchor="middle" filter="url(#dropShadow)">${letter}</text>
        
        <!-- Glossy Specular Bevel Line on Letter -->
        <text x="-12" y="115" font-family="'Nunito', sans-serif" font-weight="900" font-size="460" fill="#ffffff" opacity="0.4" text-anchor="middle">${letter}</text>

        <!-- Cute Anime Eyes ON the Letter -->
        <g transform="translate(0, 15)">
          <ellipse cx="-60" cy="0" rx="20" ry="28" fill="#ffffff" filter="url(#dropShadow)" />
          <ellipse cx="-57" cy="0" rx="14" ry="20" fill="#0f172a" />
          <circle cx="-53" cy="-5" r="6" fill="#ffffff" />

          <ellipse cx="60" cy="0" rx="20" ry="28" fill="#ffffff" filter="url(#dropShadow)" />
          <ellipse cx="63" cy="0" rx="14" ry="20" fill="#0f172a" />
          <circle cx="67" cy="-5" r="6" fill="#ffffff" />

          <!-- Smiling Mouth on Letter -->
          <path d="M -30 40 Q 0 65 30 40" stroke="#0f172a" stroke-width="8" stroke-linecap="round" fill="none" />
        </g>
      </g>

      <!-- Welcome Badge -->
      <g transform="translate(540, 1420)">
        <rect x="-350" y="-55" width="700" height="110" rx="55" fill="#ffffff" stroke="#f59e0b" stroke-width="6" filter="url(#dropShadow)" />
        <text x="0" y="18" font-family="'Nunito', sans-serif" font-size="50" font-weight="900" fill="#0284c7" text-anchor="middle">Let's Learn Letter ${letter}! 🎈</text>
      </g>
    `;
  } else if (t < 11.5) {
    // SCENE 2: ULTRA-PROFESSIONAL CHARACTER BOUNCE & 3D SPELLING
    const localT = t - 4.5;
    const bounceHeight = 120;
    const bounceFreq = 3.6;

    // Realistic Sine Bounce + Squash & Stretch
    const sinVal = Math.sin(localT * bounceFreq);
    const absSin = Math.abs(sinVal);
    const objBounceY = 880 - absSin * bounceHeight;

    let scaleX = 1;
    let scaleY = 1;
    if (absSin < 0.18) {
      // Landing Impact Squash
      scaleX = 1.15;
      scaleY = 0.85;
    } else {
      // Rising Stretch
      scaleX = 0.92;
      scaleY = 1.08;
    }

    subtitleText = `${letter} is for ${word}!`;

    const chars = word.split('');
    const blocksSvg = chars
      .map((ch, idx) => renderSpellingBlock(ch, idx, chars.length, idx === 0, topicConfig.primaryColor))
      .join('');

    let mascotSvg = '';
    if (isApple) {
      mascotSvg = render3DApple(scaleX, scaleY, objBounceY, t);
    } else if (isBall) {
      mascotSvg = render3DBall(scaleX, scaleY, objBounceY, t);
    } else {
      // High-grade generic animated character with big eyes
      mascotSvg = `
        <g transform="translate(540, ${objBounceY}) scale(${scaleX}, ${scaleY})">
          <ellipse cx="0" cy="240" rx="200" ry="30" fill="#0f172a" opacity="0.2" />
          <circle cx="0" cy="0" r="190" fill="${topicConfig.primaryColor}" filter="url(#dropShadow)" />
          <circle cx="-60" cy="-20" r="35" fill="#ffffff" />
          <circle cx="-55" cy="-20" r="22" fill="#0f172a" />
          <circle cx="-50" cy="-26" r="9" fill="#ffffff" />
          <circle cx="60" cy="-20" r="35" fill="#ffffff" />
          <circle cx="65" cy="-20" r="22" fill="#0f172a" />
          <circle cx="70" cy="-26" r="9" fill="#ffffff" />
          <path d="M -40 50 Q 0 90 40 50 Z" fill="#ffffff" />
        </g>
      `;
    }

    sceneSvg = `
      <!-- Top Left: Mini Letter Badge -->
      <g transform="translate(210, 480)">
        <circle cx="0" cy="0" r="115" fill="#fef08a" stroke="#f59e0b" stroke-width="12" filter="url(#dropShadow)" />
        <text x="0" y="55" font-family="'Nunito', sans-serif" font-size="160" font-weight="900" fill="${topicConfig.primaryColor}" text-anchor="middle">${letter}</text>
      </g>

      <!-- Top Right: Phonics Audio Sound Badge -->
      <g transform="translate(740, 480)">
        <rect x="-240" y="-55" width="480" height="110" rx="40" fill="#ffffff" stroke="#38bdf8" stroke-width="8" filter="url(#dropShadow)" />
        <text x="-160" y="16" font-size="52">🔊</text>
        <text x="25" y="14" font-family="'Nunito', sans-serif" font-size="38" font-weight="900" fill="#0369a1" text-anchor="middle">${topicConfig.phonicsSound}</text>
      </g>

      <!-- Center Mascot Character -->
      ${mascotSvg}

      <!-- Bottom 3D Toy Spelling Blocks -->
      <g transform="translate(540, 1420)">
        ${blocksSvg}
      </g>
    `;
  } else if (t < 15.5) {
    // SCENE 3: LETTER + CHARACTER DUO CALLOUT
    const localT = t - 11.5;
    const duoY = 880 - Math.abs(Math.sin(localT * 4)) * 60;
    subtitleText = `Can you say ${word}? ${letter}... ${word}!`;

    let miniMascot = '';
    if (isApple) {
      miniMascot = `
        <g transform="scale(0.55)">
          <path d="M 0 -130 C 70 -195, 220 -175, 235 -40 C 245 90, 180 230, 45 250 C 15 254, -15 254, -45 250 C -180 230, -245 90, -235 -40 C -220 -175, -70 -195, 0 -130 Z" fill="url(#appleRedGrad)" filter="url(#dropShadow)" />
          <path d="M 0 -150 C 15 -210, 45 -250, 75 -265 C 60 -265, 20 -220, -12 -150 Z" fill="url(#stalkWood)" />
          <path d="M 25 -200 C 70 -260, 140 -240, 160 -190 C 110 -160, 50 -170, 25 -200 Z" fill="url(#leafGreen)" />
          <circle cx="-60" cy="10" r="25" fill="#ffffff" /><circle cx="-55" cy="10" r="16" fill="#0f172a" /><circle cx="-50" cy="5" r="7" fill="#ffffff" />
          <circle cx="60" cy="10" r="25" fill="#ffffff" /><circle cx="65" cy="10" r="16" fill="#0f172a" /><circle cx="70" cy="5" r="7" fill="#ffffff" />
          <path d="M -35 60 Q 0 95 35 60 Z" fill="#7f1d1d" />
        </g>
      `;
    } else {
      miniMascot = `
        <g transform="scale(0.65)">
          <circle cx="0" cy="0" r="150" fill="url(#ballSphereGrad)" filter="url(#dropShadow)" />
          <path d="M 0 -150 C 90 -110 140 -30 150 0 C 90 -20 40 -80 0 -150 Z" fill="url(#ballYellow)" />
          <path d="M 150 0 C 140 90 70 140 0 150 C 40 90 100 40 150 0 Z" fill="url(#ballRed)" />
          <path d="M 0 150 C -90 140 -140 70 -150 0 C -90 40 -40 100 0 150 Z" fill="url(#ballBlue)" />
          <circle cx="0" cy="0" r="35" fill="#ffffff" />
          <ellipse cx="-45" cy="-55" rx="55" ry="30" transform="rotate(-30 -45 -55)" fill="#ffffff" opacity="0.5" />
        </g>
      `;
    }

    sceneSvg = `
      <!-- Left: 3D Giant Letter -->
      <g transform="translate(320, ${duoY})">
        <text x="0" y="140" font-family="'Nunito', sans-serif" font-weight="900" font-size="360" fill="${topicConfig.secondaryColor}" text-anchor="middle">${letter}</text>
        <text x="0" y="125" font-family="'Nunito', sans-serif" font-weight="900" font-size="360" fill="url(#letterGrad)" text-anchor="middle" filter="url(#dropShadow)">${letter}</text>
      </g>

      <!-- Center Plus Sign -->
      <g transform="translate(540, 880)">
        <circle cx="0" cy="0" r="50" fill="#ffffff" filter="url(#dropShadow)" />
        <text x="0" y="22" font-family="'Nunito', sans-serif" font-size="75" font-weight="900" fill="#f59e0b" text-anchor="middle">+</text>
      </g>

      <!-- Right: Character Mascot -->
      <g transform="translate(760, ${duoY})">
        ${miniMascot}
      </g>

      <!-- Big Loud Callout Banner -->
      <g transform="translate(540, 1420)">
        <rect x="-380" y="-60" width="760" height="120" rx="60" fill="${topicConfig.primaryColor}" filter="url(#dropShadow)" />
        <text x="0" y="20" font-family="'Nunito', sans-serif" font-size="54" font-weight="900" fill="#ffffff" text-anchor="middle">Say It Loud: ${word}! 📢</text>
      </g>
    `;
  } else {
    // SCENE 4: ULTRA CELEBRATION STARBURST & OUTRO
    subtitleText = `Awesome Job! You Learned ${word}!`;

    sceneSvg = `
      <!-- Giant Sunburst Rays Rotating -->
      <g transform="translate(540, 780)">
        <circle cx="0" cy="0" r="360" fill="url(#sparkleGlow)" opacity="0.7" />
        
        <circle cx="0" cy="0" r="320" fill="#ffffff" stroke="${topicConfig.primaryColor}" stroke-width="16" filter="url(#dropShadow)" />
        <text x="0" y="-70" font-family="'Nunito', sans-serif" font-size="75" font-weight="900" fill="${topicConfig.secondaryColor}" text-anchor="middle">AWESOME!</text>
        <text x="0" y="20" font-family="'Nunito', sans-serif" font-size="54" font-weight="800" fill="#0369a1" text-anchor="middle">You Learned</text>
        <text x="0" y="125" font-family="'Nunito', sans-serif" font-size="85" font-weight="900" fill="${topicConfig.primaryColor}" text-anchor="middle">${letter} for ${word}</text>
      </g>

      <!-- 5 Golden Trophy Stars -->
      <g transform="translate(540, 1260)">
        <text x="-280" y="0" font-size="90">⭐</text>
        <text x="-140" y="-30" font-size="105">⭐</text>
        <text x="0" y="-50" font-size="120">🌟</text>
        <text x="140" y="-30" font-size="105">⭐</text>
        <text x="280" y="0" font-size="90">⭐</text>
      </g>

      <!-- Channel Brand Badge -->
      <g transform="translate(540, 1470)">
        <rect x="-420" y="-50" width="840" height="100" rx="50" fill="#0f172a" filter="url(#dropShadow)" />
        <text x="0" y="16" font-family="'Nunito', sans-serif" font-size="38" font-weight="900" fill="#fde047" text-anchor="middle">Enter the World of Light &amp; Laughter</text>
      </g>
    `;
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <!-- Background Sky Gradient -->
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="35%" stop-color="#38bdf8" />
      <stop offset="70%" stop-color="#bae6fd" />
      <stop offset="100%" stop-color="#fef08a" />
    </linearGradient>

    <!-- 3D Apple Gradients -->
    <radialGradient id="appleRedGrad" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#ff6b6b" />
      <stop offset="30%" stop-color="#ef4444" />
      <stop offset="70%" stop-color="#dc2626" />
      <stop offset="100%" stop-color="#7f1d1d" />
    </radialGradient>
    <linearGradient id="leafGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <linearGradient id="stalkWood" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b45309" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
    <radialGradient id="blushPink" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f472b6" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0" />
    </radialGradient>

    <!-- 3D Ball Gradients -->
    <clipPath id="ballClip">
      <circle cx="0" cy="0" r="210" />
    </clipPath>
    <radialGradient id="ballSphereGrad" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="45%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#64748b" />
    </radialGradient>
    <linearGradient id="ballYellow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="ballRed" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f87171" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="ballBlue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="ballGreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>

    <!-- 3D Candy Letter Gradient -->
    <linearGradient id="letterGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${topicConfig.primaryColor}" />
      <stop offset="100%" stop-color="${topicConfig.secondaryColor}" />
    </linearGradient>

    <radialGradient id="sparkleGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
    </radialGradient>

    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.2" />
    </filter>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>

  <!-- Sky Canvas Background -->
  <rect width="1080" height="1920" fill="url(#skyGrad)" />

  <!-- Soft Green Grass Hill at Bottom -->
  <path d="M -100 1780 Q 540 1680 1180 1780 L 1180 1920 L -100 1920 Z" fill="#86efac" />
  <path d="M -100 1830 Q 540 1730 1180 1830 L 1180 1920 L -100 1920 Z" fill="#4ade80" />

  <!-- Floating Parallax Clouds -->
  <g fill="#ffffff" opacity="0.75">
    <ellipse cx="${cloud1X}" cy="240" rx="180" ry="70" />
    <ellipse cx="${cloud1X + 80}" cy="210" rx="140" ry="90" />
    <ellipse cx="${cloud2X}" cy="380" rx="160" ry="60" />
    <ellipse cx="${cloud2X - 60}" cy="350" rx="120" ry="75" />
  </g>

  <!-- Top App Brand Pill -->
  <g transform="translate(540, 130)">
    <rect x="-380" y="-55" width="760" height="110" rx="55" fill="#ffffff" filter="url(#dropShadow)" />
    <text x="-280" y="16" font-size="44">🌈</text>
    <text x="30" y="14" font-family="'Nunito', sans-serif" font-size="38" font-weight="900" fill="#0369a1" text-anchor="middle">Enter the World of Light</text>
    <text x="310" y="16" font-size="44">✨</text>
  </g>

  <!-- Lesson Badge -->
  <g transform="translate(540, 270)">
    <rect x="-320" y="-45" width="640" height="90" rx="30" fill="#fef08a" stroke="#f59e0b" stroke-width="6" />
    <text x="0" y="14" font-family="'Nunito', sans-serif" font-size="36" font-weight="900" fill="#9a3412" text-anchor="middle">${topicConfig.category.toUpperCase()} • ${topicConfig.topic.toUpperCase()}</text>
  </g>

  ${sceneSvg}

  <!-- Universal Child-Readable Subtitles -->
  <g transform="translate(540, 1680)">
    <rect x="-480" y="-95" width="960" height="190" rx="45" fill="#0f172a" opacity="0.95" filter="url(#dropShadow)" />
    <text x="0" y="-12" font-family="'Nunito', sans-serif" font-size="52" font-weight="900" fill="#fde047" text-anchor="middle">${subtitleText}</text>
    <text x="0" y="55" font-family="'Noto Nastaliq Urdu', sans-serif" font-size="40" font-weight="700" fill="#ffffff" text-anchor="middle">${urduSubtitle}</text>
  </g>

  <!-- Progress Bar at Base -->
  <rect x="0" y="1905" width="1080" height="15" fill="#0f172a" opacity="0.2" />
  <rect x="0" y="1905" width="${(frameIndex / totalFrames) * 1080}" height="15" fill="#f59e0b" />
</svg>
  `.trim();
}

/**
 * Main Video Generator for Kids Pipeline: Generates 1080x1920 (9:16) MP4 + MP3 Audio + Thumbnail
 */
export async function generateKidsVideo(
  topic = 'A for Apple',
  category = 'Alphabet',
  forceRegenerate = false
): Promise<KidsVideoPipelineRecord> {
  const topicSlug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

  let topicConfig = KIDS_TOPICS_DATABASE.find((c) => c.topicSlug === topicSlug || c.topic.toLowerCase() === topic.toLowerCase());
  if (!topicConfig) {
    const letter = topic.charAt(0).toUpperCase();
    const word = topic.replace(/^[A-Z0-9]\s+(for\s+)?/i, '').toUpperCase() || 'STAR';
    topicConfig = {
      id: `KID-VID-${Date.now()}`,
      topic,
      topicSlug,
      category,
      letterOrNumber: letter,
      primaryWord: word,
      wordUrdu: topic,
      phonicsSound: `Sound of ${letter}`,
      visualEmoji: '⭐',
      primaryColor: '#0284c7',
      secondaryColor: '#f59e0b',
      voiceScript: `${topic}! Can you say ${word}? Great job, little star!`,
      educationalFact: `Learning ${topic} helps develop bright language and thinking skills!`,
    };
  }

  const contentId = topicConfig.id;

  const existingManifest = getLocalManifest();
  const existingItem = existingManifest.find((item) => item.topicSlug === topicSlug && item.status === 'completed');

  if (existingItem && !forceRegenerate) {
    const videoExists = fs.existsSync(path.join(process.cwd(), 'public', existingItem.videoUrl));
    if (videoExists) {
      console.log(`[KidsVideoRenderer] Duplicate prevention: Topic '${topic}' already generated.`);
      return existingItem;
    }
  }

  console.log(`[KidsVideoRenderer] Starting high-fidelity render for: '${topicConfig.topic}' (${topicConfig.category})...`);

  const mp4Filename = `kid_vid_${topicSlug}.mp4`;
  const mp3Filename = `kid_vid_${topicSlug}.mp3`;
  const thumbFilename = `kid_vid_${topicSlug}_thumb.jpg`;

  const finalMp4Path = path.join(STORAGE_DIR, mp4Filename);
  const finalMp3Path = path.join(STORAGE_DIR, mp3Filename);
  const finalThumbPath = path.join(STORAGE_DIR, thumbFilename);

  const tempDir = path.resolve(process.cwd(), `tmp_render_${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });

  try {
    console.log(`[KidsVideoRenderer] 1/4 Synthesizing voice MP3 for '${topicConfig.primaryWord}'...`);
    await fetchTtsAudio(topicConfig.voiceScript, finalMp3Path);

    let durationSeconds = 16;
    try {
      const { stdout } = await execAsync(
        `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${finalMp3Path}"`
      );
      const parsedDuration = parseFloat(stdout.trim());
      if (!isNaN(parsedDuration) && parsedDuration > 0) {
        durationSeconds = Math.max(14, Math.ceil(parsedDuration + 3));
      }
    } catch {
      durationSeconds = 16;
    }

    const fps = 24;
    const totalFrames = durationSeconds * fps;
    console.log(`[KidsVideoRenderer] 2/4 Rendering ${totalFrames} frames (${durationSeconds}s @ 24fps, 1080x1920)...`);

    for (let i = 0; i < totalFrames; i++) {
      const frameSvg = renderSvgFrameForTopic(topicConfig, i, totalFrames, fps);
      const frameFilename = `frame_${String(i).padStart(4, '0')}.svg`;
      fs.writeFileSync(path.join(tempDir, frameFilename), frameSvg, 'utf-8');
    }

    console.log('[KidsVideoRenderer] 3/4 Compiling H.264 MP4 with FFmpeg...');
    const ffmpegCommand = `ffmpeg -y -framerate ${fps} -i "${tempDir}/frame_%04d.svg" -i "${finalMp3Path}" -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 -c:a aac -b:a 192k -shortest "${finalMp4Path}"`;
    await execAsync(ffmpegCommand);

    console.log('[KidsVideoRenderer] 4/4 Extracting HD Thumbnail...');
    const thumbCommand = `ffmpeg -y -ss 00:00:07 -i "${finalMp4Path}" -vframes 1 -q:v 2 "${finalThumbPath}"`;
    await execAsync(thumbCommand);

    fs.rmSync(tempDir, { recursive: true, force: true });

    const completedRecord: KidsVideoPipelineRecord = {
      contentId,
      category: topicConfig.category,
      topic: topicConfig.topic,
      topicSlug,
      targetAge: '2-5 years',
      language: 'en',
      durationSeconds,
      script: {
        hook: `${topicConfig.letterOrNumber} is for ${topicConfig.primaryWord}!`,
        body: topicConfig.voiceScript,
        phonics: topicConfig.phonicsSound,
        outro: 'Awesome job, little star! Keep shining with Light & Laughter!',
      },
      voiceText: topicConfig.voiceScript,
      scenes: [
        {
          sceneNumber: 1,
          title: `${topicConfig.letterOrNumber} 3D Introduction`,
          visualType: 'candy_letter',
          duration: 4.5,
          subtitles: `${topicConfig.letterOrNumber} is for ${topicConfig.primaryWord}!`,
          displayWord: topicConfig.letterOrNumber,
          displayUrdu: topicConfig.wordUrdu,
        },
        {
          sceneNumber: 2,
          title: `Phonics & 3D Character Bounce`,
          visualType: '3d_character_bounce',
          duration: 7,
          subtitles: topicConfig.voiceScript,
          displayWord: topicConfig.primaryWord,
          displayUrdu: topicConfig.wordUrdu,
        },
        {
          sceneNumber: 3,
          title: 'Letter & Word Callout Duo',
          visualType: 'phonics_duo',
          duration: 4,
          subtitles: `Can you say ${topicConfig.primaryWord}?`,
          displayWord: topicConfig.primaryWord,
          displayUrdu: topicConfig.wordUrdu,
        },
        {
          sceneNumber: 4,
          title: '5 Stars Celebration & Outro',
          visualType: 'celebration',
          duration: 3.5,
          subtitles: 'Awesome Job! Keep Shining!',
          displayWord: 'Super Star',
          displayUrdu: 'بہت خوب!',
        },
      ],
      status: 'completed',
      videoUrl: `/storage/kids_videos/${mp4Filename}`,
      audioUrl: `/storage/kids_videos/${mp3Filename}`,
      thumbnailUrl: `/storage/kids_videos/${thumbFilename}`,
      creationDate: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      youtubeStatus: 'draft',
      youtubeVideoId: null,
      youtubeUrl: null,
      blogStatus: 'draft',
      blogPostId: null,
      blogUrl: null,
      errorMessage: null,
      retryCount: 0,
    };

    const updatedManifest = existingManifest.filter((item) => item.contentId !== contentId && item.topicSlug !== topicSlug);
    updatedManifest.unshift(completedRecord);
    saveLocalManifest(updatedManifest);

    console.log(`[KidsVideoRenderer] High-fidelity video generated: ${finalMp4Path}`);
    return completedRecord;
  } catch (error: any) {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    console.error('[KidsVideoRenderer] Failed to render high-fidelity video:', error);
    throw error;
  }
}
