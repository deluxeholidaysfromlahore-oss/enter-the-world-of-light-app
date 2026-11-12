import { BrandLink, ContentItem, QuizItem, DailyActivity, Badge } from '../types';

export const BRAND_LINKS: BrandLink[] = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@EntertheWorldofLight',
    icon: 'Youtube',
    color: '#EF4444',
    description: 'Official video releases, animations & educational series',
  },
  {
    name: 'Blog',
    url: 'https://entertheworldoflightandlaughter.blogspot.com',
    icon: 'BookOpen',
    color: '#F59E0B',
    description: 'In-depth essays, literary reflections & study notes',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/entertheworldoflight',
    icon: 'Instagram',
    color: '#EC4899',
    description: 'Daily visual cards, behind-the-scenes & mini reels',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/EntertheWorldofLight',
    icon: 'Facebook',
    color: '#3B82F6',
    description: 'Community discussions, updates & family learning events',
  },
  {
    name: 'Pinterest',
    url: 'https://ca.pinterest.com/EntertheWorldofLight',
    icon: 'Pin',
    color: '#DC2626',
    description: 'Curated educational infographics, activity sheets & art',
  },
  {
    name: 'Threads',
    url: 'https://www.threads.com/@entertheworldoflight',
    icon: 'AtSign',
    color: '#1E293B',
    description: 'Bite-sized thoughts, daily poetry lines & lively dialogue',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/Entertheworldpk',
    icon: 'Twitter',
    color: '#0F172A',
    description: 'Real-time updates, quotes & thought-provoking prompts',
  },
  {
    name: 'WhatsApp Channel',
    url: 'https://whatsapp.com/channel/0029VasZV4a60eBd8TwfTg1f',
    icon: 'MessageCircle',
    color: '#10B981',
    description: 'Instant morning quotes, poetry drops & learning alerts',
  },
];

export const FEATURED_COLLECTIONS = [
  {
    id: 'col-1',
    title: 'The Golden Treasury of Urdu Shayari',
    titleUrdu: 'اردو شاعری کا سنہری خزانہ',
    description: 'Timeless couplets from Iqbal, Ghalib, Faiz, and modern voices with rich English context.',
    itemsCount: 48,
    category: 'Poetry',
    gradient: 'from-amber-600 to-amber-900',
    accentColor: '#D97706',
  },
  {
    id: 'col-2',
    title: 'Curious Minds: The Wonders of Our Cosmos',
    titleUrdu: 'کائنات کے پوشیدہ راز',
    description: 'Illustrated journey through solar systems, black holes, and the mysteries of time.',
    itemsCount: 24,
    category: 'Science',
    gradient: 'from-sky-600 to-indigo-950',
    accentColor: '#0284C7',
  },
  {
    id: 'col-3',
    title: 'Panchatantra & Aesop: Timeless Moral Fables',
    titleUrdu: 'سبق آموز اخلاقی کہانیاں',
    description: 'Heartwarming stories of animals and wisdom that teach values, courage, and empathy.',
    itemsCount: 36,
    category: 'Stories',
    gradient: 'from-emerald-600 to-teal-950',
    accentColor: '#059669',
  },
  {
    id: 'col-4',
    title: 'Mastering Everyday English Conversation',
    titleUrdu: 'روانی سے انگریزی بول چال',
    description: 'Practical daily vocabulary, idioms, dialogue scenarios, and pronunciation guides.',
    itemsCount: 30,
    category: 'English',
    gradient: 'from-blue-600 to-slate-900',
    accentColor: '#2563EB',
  },
];

export const LEARN_ITEMS: ContentItem[] = [
  {
    id: 'learn-1',
    title: 'Urdu Alphabet & Phonetics Mastery',
    titleUrdu: 'حروفِ تہجی اور صوتیات',
    category: 'Urdu',
    subcategory: 'Basics',
    description: 'Learn the 36 letters of the Urdu alphabet, letter joining rules, and native pronunciations.',
    level: 'Beginner',
    readTime: '15 lessons',
    duration: '2h 15m',
    tags: ['Harf', 'Pronunciation', 'Script'],
    gradient: 'from-emerald-500 to-emerald-700',
    isFeatured: true,
    contentBody: 'In this module, you will discover the unique calligraphic strokes of the Nastaliq script and listen to authentic audio samples for every letter.',
  },
  {
    id: 'learn-2',
    title: 'The Great Solar System Expedition',
    titleUrdu: 'ہمارا نظامِ شمسی',
    category: 'Science',
    subcategory: 'Astronomy',
    description: 'Travel from Mercury to Neptune. Understand orbital speeds, moon systems, and planetary rings.',
    level: 'All Ages',
    readTime: '12 lessons',
    duration: '1h 45m',
    tags: ['Planets', 'Space', 'Gravity'],
    gradient: 'from-sky-500 to-blue-800',
    isFeatured: true,
    contentBody: 'The solar system is estimated to be over 4.6 billion years old. The sun accounts for 99.86% of the mass in the entire solar system.',
  },
  {
    id: 'learn-3',
    title: 'Mental Math Superpowers: Vedic & Fast Math',
    titleUrdu: 'ذہنی ریاضی اور تیز حساب',
    category: 'Math',
    subcategory: 'Arithmetic',
    description: 'Multiply double digits in seconds, calculate percentages effortlessly, and conquer fractions.',
    level: 'Intermediate',
    readTime: '18 lessons',
    duration: '3h 10m',
    tags: ['Fast Math', 'Multiplication', 'Tricks'],
    gradient: 'from-amber-500 to-orange-700',
    contentBody: 'Learn the criss-cross multiplication method and base-100 complement calculations.',
  },
  {
    id: 'learn-4',
    title: 'Vocabulary Builder: 500 High-Frequency English Words',
    titleUrdu: 'انگریزی الفاظ کا ذخیرہ',
    category: 'English',
    subcategory: 'Vocabulary',
    description: 'Expand your lexical toolkit with root words, prefixes, synonyms, and context sentences.',
    level: 'Beginner',
    readTime: '25 lessons',
    duration: '4h 00m',
    tags: ['Vocabulary', 'Roots', 'Sentences'],
    gradient: 'from-indigo-500 to-indigo-800',
    contentBody: 'Each lesson focuses on 20 words organized by situational themes like nature, emotions, and academic discussions.',
  },
  {
    id: 'learn-5',
    title: 'Young Explorers: Animal Kingdom Wonders',
    titleUrdu: 'جانوروں کی دلچسپ دنیا',
    category: 'Kids',
    subcategory: 'Zoology',
    description: 'Discover how bats navigate in darkness, why chameleons shift colors, and how bees dance.',
    level: 'Beginner',
    readTime: '10 lessons',
    duration: '1h 20m',
    tags: ['Wildlife', 'Habitats', 'Fun Facts'],
    gradient: 'from-lime-500 to-green-700',
    contentBody: 'Fun, illustrated cards crafted specifically for younger learners with simple explanations and engaging quizzes.',
  },
  {
    id: 'learn-6',
    title: 'World Geography & Cultural Heritage',
    titleUrdu: 'دنیا کے عجائبات اور تہذیبیں',
    category: 'General Knowledge',
    subcategory: 'Geography',
    description: 'Explore world capitals, famous landmarks, major rivers, and legendary civilizations of antiquity.',
    level: 'Intermediate',
    readTime: '14 lessons',
    duration: '2h 30m',
    tags: ['Capitals', 'Landmarks', 'Cultures'],
    gradient: 'from-teal-500 to-cyan-800',
    contentBody: 'Take virtual tours of ancient monuments and test your memory on flags and capital cities across all continents.',
  },
];

export const PLAY_QUIZZES: QuizItem[] = [
  {
    id: 'quiz-1',
    title: 'Planets & Cosmos Speed Quiz',
    category: 'Science',
    totalQuestions: 5,
    timeLimit: '2 mins',
    level: 'Medium',
    xpReward: 120,
    gradient: 'from-sky-600 to-indigo-700',
    questions: [
      {
        id: 'q1',
        question: 'Which planet is known as the "Morning Star" or "Evening Star"?',
        options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        correctIndex: 1,
        explanation: 'Venus is the brightest natural object in the night sky after the Moon and is often visible around sunrise and sunset.',
      },
      {
        id: 'q2',
        question: 'What is the largest planet in our solar system?',
        options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
        correctIndex: 2,
        explanation: 'Jupiter has a mass more than two and a half times that of all the other planets in the solar system combined.',
      },
      {
        id: 'q3',
        question: 'How long does sunlight take to reach Earth approximately?',
        options: ['8 seconds', '8 minutes', '8 hours', 'Instantaneous'],
        correctIndex: 1,
        explanation: 'Sunlight travels at roughly 300,000 km/s and takes about 8 minutes and 20 seconds to reach Earth.',
      },
    ],
  },
  {
    id: 'quiz-2',
    title: 'Urdu Adab & Poetry Quiz',
    category: 'Urdu',
    totalQuestions: 5,
    timeLimit: '3 mins',
    level: 'Advanced',
    xpReward: 150,
    gradient: 'from-amber-600 to-red-800',
    questions: [
      {
        id: 'uq1',
        question: 'Which legendary poet is known as "Shaair-e-Mashriq" (Poet of the East)?',
        questionUrdu: 'شاعرِ مشرق کس عظیم شاعر کو کہا جاتا ہے؟',
        options: ['Mirza Ghalib', 'Allama Muhammad Iqbal', 'Faiz Ahmed Faiz', 'Mir Taqi Mir'],
        correctIndex: 1,
        explanation: 'Allama Iqbal is celebrated worldwide as Shaair-e-Mashriq for his philosophical and awakening verses.',
      },
      {
        id: 'uq2',
        question: 'In Urdu poetic terminology, what is the two-line rhyming unit called?',
        questionUrdu: 'اردو شاعری میں دو مصرعوں پر مشتمل اکائی کو کیا کہتے ہیں؟',
        options: ['Misra', 'Sher', 'Qafiya', 'Radeef'],
        correctIndex: 1,
        explanation: 'A single line is a Misra (مصرع), and two rhyming lines make a complete Sher (شعر).',
      },
    ],
  },
  {
    id: 'quiz-3',
    title: 'Math Whiz: Mental Calculation Sprint',
    category: 'Math',
    totalQuestions: 5,
    timeLimit: '90 secs',
    level: 'Quick',
    xpReward: 100,
    gradient: 'from-emerald-600 to-teal-800',
    questions: [
      {
        id: 'mq1',
        question: 'What is 15% of 240?',
        options: ['24', '36', '42', '30'],
        correctIndex: 1,
        explanation: '10% of 240 is 24; 5% is 12. 24 + 12 = 36.',
      },
      {
        id: 'mq2',
        question: 'What is the square of 25?',
        options: ['525', '625', '725', '650'],
        correctIndex: 1,
        explanation: '25 multiplied by 25 equals 625.',
      },
    ],
  },
];

export const PRACTICE_MODULES = [
  {
    id: 'prac-1',
    title: 'English Spelling & Homophones Lab',
    category: 'Spelling',
    description: 'Disentangle confusing pairs: their/there/they’re, affect/effect, and principal/principle.',
    difficulty: 'Easy',
    cardCount: 25,
    icon: 'SpellCheck',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'prac-2',
    title: 'Urdu Imla & Writing Drills',
    titleUrdu: 'املا اور خوش خطی کی مشق',
    category: 'Urdu Practice',
    description: 'Master tricky letter connections: ح vs ہ, ت vs ط, and correct word endings.',
    difficulty: 'Medium',
    cardCount: 30,
    icon: 'PenTool',
    gradient: 'from-emerald-500 to-green-700',
  },
  {
    id: 'prac-3',
    title: 'Active Voice & Sentence Restructuring',
    category: 'Writing',
    description: 'Turn passive, muddy prose into punchy, clear sentences with direct verbs.',
    difficulty: 'Advanced',
    cardCount: 20,
    icon: 'Feather',
    gradient: 'from-purple-500 to-indigo-700',
  },
  {
    id: 'prac-4',
    title: 'Daily Math Word Problems',
    category: 'Daily Practice',
    description: 'Practical scenario problems involving grocery shopping, train timetables, and room areas.',
    difficulty: 'Medium',
    cardCount: 15,
    icon: 'Calculator',
    gradient: 'from-amber-500 to-amber-700',
  },
  {
    id: 'prac-5',
    title: 'Idioms & Figurative Language',
    category: 'Vocabulary',
    description: 'Understand metaphors, similes, and common cultural idioms with real-life usage examples.',
    difficulty: 'Medium',
    cardCount: 22,
    icon: 'BookMarked',
    gradient: 'from-rose-500 to-pink-700',
  },
  {
    id: 'prac-6',
    title: 'Urdu Muhavare (Idioms) in Action',
    titleUrdu: 'اردو محاورات اور روزمرہ',
    category: 'Urdu Practice',
    description: 'Learn the stories and proper conversational contexts behind classic Urdu idioms.',
    difficulty: 'Medium',
    cardCount: 28,
    icon: 'Sparkles',
    gradient: 'from-teal-500 to-teal-800',
  },
];

export const POETRY_ITEMS: ContentItem[] = [
  {
    id: 'poet-1',
    title: 'Sitaron Se Aage Jahan Aur Bhi Hain',
    titleUrdu: 'ستاروں سے آگے جہاں اور بھی ہیں',
    category: 'Poetry',
    subcategory: 'Urdu',
    author: 'Allama Muhammad Iqbal',
    poetName: 'علامہ محمد اقبال',
    description: 'An uplifting ode to infinite human curiosity and ambition.',
    descriptionUrdu: 'امید، عزم اور انسانی وسعتوں کا لافانی ترانہ۔',
    tags: ['Inspirational', 'Urdu', 'Motivation', 'Iqbal'],
    gradient: 'from-amber-600 to-stone-900',
    isFeatured: true,
    contentBodyUrdu: `ستاروں سے آگے جہاں اور بھی ہیں
ابھی عشق کے امتحاں اور بھی ہیں

تہی زندگی سے نہیں یہ فضائیں
یہاں سینکڑوں کارواں اور بھی ہیں

قناعت نہ کر عالمِ رنگ و بو پر
چمن اور بھی، آشیاں اور بھی ہیں

تو شاہیں ہے، پرواز ہے کام تیرا
ترے سامنے آسماں اور بھی ہیں`,
    contentBody: `Beyond the stars there are yet other worlds;
There are still further trials for love to endure.

These open skies are not bereft of life;
There are hundreds of caravans traversing here still.

Do not be content with this mere realm of color and scent;
There are other gardens, other nests yet to build.

You are a falcon; flight is your sovereign purpose;
Before you lie ever vaster horizons of sky.`,
  },
  {
    id: 'poet-2',
    title: 'Dil-e-Nadaan Tujhe Hua Kya Hai',
    titleUrdu: 'دلِ ناداں تجھے ہوا کیا ہے',
    category: 'Poetry',
    subcategory: 'Urdu',
    author: 'Mirza Asadullah Khan Ghalib',
    poetName: 'مرزا اسد اللہ خان غالب',
    description: 'Ghalib’s philosophical dialogue with his own restless heart.',
    descriptionUrdu: 'غالب کی اپنے بے قرار دل سے فلسفیانہ گفتگو۔',
    tags: ['Shayari', 'Life', 'Ghalib', 'Classic'],
    gradient: 'from-slate-700 to-indigo-950',
    isFeatured: true,
    contentBodyUrdu: `دلِ ناداں تجھے ہوا کیا ہے
آخر اس درد کی دوا کیا ہے

ہم ہیں مشتاق اور وہ بیزار
یا الٰہی یہ ماجرا کیا ہے

ہم کو ان سے وفا کی ہے امید
جو نہیں جانتے وفا کیا ہے`,
    contentBody: `O innocent heart, what has befallen you?
In the end, what is the remedy for this ache?

We are full of longing, and they remain aloof;
O divine Lord, what mystery is this state?

We expect fidelity from those very souls
Who do not even know what fidelity means.`,
  },
  {
    id: 'poet-3',
    title: 'The Road Not Taken',
    category: 'Poetry',
    subcategory: 'English',
    author: 'Robert Frost',
    description: 'A quiet meditation on life choices, individuality, and destiny.',
    tags: ['Life', 'Inspirational', 'English', 'Classic'],
    gradient: 'from-emerald-700 to-slate-900',
    contentBody: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;

Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same...

I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`,
  },
  {
    id: 'poet-4',
    title: 'Hum Dekhenge (We Shall Witness)',
    titleUrdu: 'ہم دیکھیں گے',
    category: 'Poetry',
    subcategory: 'Urdu',
    author: 'Faiz Ahmed Faiz',
    poetName: 'فیض احمد فیض',
    description: 'A world-famous anthem of hope, justice, and dawn after the night.',
    descriptionUrdu: 'امید، عدل اور سحر کا تاریخی ترانہ۔',
    tags: ['Motivation', 'Hope', 'Faiz', 'Urdu'],
    gradient: 'from-rose-700 to-neutral-900',
    contentBodyUrdu: `لازم ہے کہ ہم بھی دیکھیں گے
وہ دن کہ جس کا وعدہ ہے
جو لوحِ ازل میں لکھا ہے

جب ظلم و ستم کے کوہِ گراں
روئی کی طرح اڑ جائیں گے
ہم محکوموں کے پاؤں تلے
جب دھرتی دھڑ دھڑ دھڑکے گی`,
    contentBody: `It is inevitable that we too shall see,
The day that has been promised,
Written upon eternity's tablet.

When the heavy mountains of cruelty and tyranny
Shall blow away like tufts of cotton,
And beneath the feet of us, the oppressed,
The earth will throb with life.`,
  },
  {
    id: 'poet-5',
    title: 'Ode to a Joyful Morning',
    category: 'Poetry',
    subcategory: 'English',
    author: 'Enter the World of Light',
    description: 'A modern celebration of morning sunlight, fresh hopes, and kindness.',
    tags: ['Nature', 'Love', 'Friendship', 'English'],
    gradient: 'from-amber-500 to-sky-700',
    contentBody: `The amber dawn unlocks the east,
A quiet feast of gentle grace,
The silver dew upon the leaf
Invites the light to every place.

Walk softly on the breathing earth,
Give laughter where the shadows fall;
For kindness is our truest hearth,
And love the morning song for all.`,
  },
];

export const STORIES_ITEMS: ContentItem[] = [
  {
    id: 'story-1',
    title: 'The Brave Little Firefly’s Lantern',
    titleUrdu: 'بہادر جگنو کی ننھی لالٹین',
    category: 'Kids Stories',
    subcategory: 'Moral Stories',
    author: 'Story Studio',
    readTime: '4 min read',
    description: 'How tiny Pip the firefly guided a lost fawn through the deep whispering forest.',
    descriptionUrdu: 'کس طرح ننھے جگنو نے گھنے جنگل میں کھوئے ہوئے ہرن کے بچے کو راستہ دکھایا۔',
    tags: ['Kindness', 'Courage', 'Animals', 'Bedtime'],
    gradient: 'from-amber-400 to-orange-600',
    isFeatured: true,
    contentBody: `Deep inside the Emerald Forest, night came like a velvet blanket sprinkled with diamond stars. Most animals scurried into their cozy hollows. 

Little Pip was smaller than the other fireflies. While his brothers could flash in bright pulses, Pip’s light was a soft, steady golden glow.

"Pip, you are too gentle to lead," teased the older beetles. But Pip smiled and polished his wings.

Suddenly, a soft cry echoed near the weeping willow. A tiny fawn named Champa had wandered away from her mother and could not find the trail across the mossy rocks. The shadows looked like giant monsters to her frightened eyes.

Pip flew down, landing gently on Champa's nose. "Do not be afraid, little friend," Pip whispered. "A small light is enough to take one step. And one step after another leads you home."

Pip hovered two feet ahead, illuminating the smooth stones and safe bridges of roots. With courage in her heart, Champa followed the golden lantern until she heard her mother’s joyful whinny.

From that night on, the animals learned: greatness is not measured by the loudness of your flare, but by the warmth with which you light the path for others.`,
  },
  {
    id: 'story-2',
    title: 'The Fisherman and the Golden Pearl of Truth',
    titleUrdu: 'ماہی گیر اور سچائی کا چمکتا موتی',
    category: 'Moral Stories',
    subcategory: 'Urdu Stories',
    author: 'Eastern Folklore',
    readTime: '6 min read',
    description: 'An honest boatman refuses a mountain of counterfeit gold and earns royal trust.',
    descriptionUrdu: 'ایک دیانت دار ماہی گیر جس نے جھوٹے خزانے کے بدلے سچائی کا دامن نہ چھوڑا۔',
    tags: ['Honesty', 'Integrity', 'Wisdom'],
    gradient: 'from-blue-600 to-teal-800',
    isFeatured: true,
    contentBody: `On the shores of the sapphire river lived Baba Qasim, an old fisherman whose net caught few fish but whose words were as pure as morning springs.

One windy afternoon, his net pulled up a locked iron chest. Inside rested a pearl that glowed with the luminescence of the full moon, inscribed with the royal seal of Sultan Mansoor.

His neighbors gasped. "Sell it in the grand bazaar! You will live like an emperor for seven generations!"

Baba Qasim shook his head gently. "What does not belong to me by honest toil can never truly be mine. Wealth without honor is just heavy gravel."

Walking three days on foot, he reached the royal palace and placed the chest before the Sultan. The viziers were astonished. The pearl had been lost during a royal naval voyage five years prior.

The Sultan smiled: "Today I have found something infinitely rarer than this pearl—I have found a heart that cannot be bought." Baba Qasim was appointed treasurer of the empire's charity foundations.`,
  },
  {
    id: 'story-3',
    title: 'The Clockmaker’s Granddaughter and the Gear of Patience',
    category: 'English Stories',
    subcategory: 'Bedtime Stories',
    readTime: '5 min read',
    description: 'Zara learns that the most intricate music boxes only sing when every tooth is calibrated with care.',
    tags: ['Patience', 'Craftsmanship', 'Family'],
    gradient: 'from-rose-500 to-purple-800',
    contentBody: `In a narrow cobblestone lane in Old Lahore, Master Dawood crafted astronomical clocks and music boxes. Zara wanted to finish her first wooden sparrow clock in one evening.

"Grandfather, the hands keep jamming!" she cried in frustration.

Dawood sat beside her, gently passing a magnifying glass. "Look closely at the brass gear, Zara. The tooth is tilted by half a millimeter. You cannot rush the song of time. When you rush, you force pieces together; when you listen, pieces find their true harmony."

Together they sanded the microscopic bevel. When Zara wound the key at midnight, the sparrow emerged and sang a crystalline melody that filled the workshop with sheer delight.`,
  },
];

export const VIDEOS_ITEMS: ContentItem[] = [
  {
    id: 'vid-1',
    title: 'Urdu Rhymes & Melodies for Young Learners',
    titleUrdu: 'بچوں کے خوبصورت ترانے اور نظمیں',
    category: 'Kids',
    duration: '14:20',
    views: '45.2K',
    readTime: 'Video',
    tags: ['Kids', 'Urdu Rhymes', 'Sing Along'],
    gradient: 'from-emerald-500 to-teal-700',
    isFeatured: true,
    description: 'Animated catchy educational songs teaching numbers, colors, and courtesies in clear Urdu.',
    author: 'Enter the World of Light',
  },
  {
    id: 'vid-2',
    title: 'Why Do We Dream? The Science of Sleep Explained',
    titleUrdu: 'ہم خواب کیوں دیکھتے ہیں؟',
    category: 'Educational',
    duration: '09:45',
    views: '88.1K',
    readTime: 'Video',
    tags: ['Science', 'Brain', 'Biology'],
    gradient: 'from-sky-600 to-indigo-800',
    isFeatured: true,
    description: 'Dive into REM sleep, neuron firings, and memory consolidation in an engaging animated format.',
    author: 'Enter the World of Light',
  },
  {
    id: 'vid-3',
    title: 'Allama Iqbal’s Message to Youth (Shaheen Concept)',
    titleUrdu: 'نوجوانوں کے نام اقبال کا پیغام',
    category: 'Poetry',
    duration: '18:10',
    views: '124K',
    readTime: 'Video',
    tags: ['Iqbal', 'Youth', 'Philosophy'],
    gradient: 'from-amber-600 to-yellow-800',
    description: 'An insightful audio-visual breakdown of Iqbal’s metaphor of the high-flying falcon.',
    author: 'Enter the World of Light',
  },
  {
    id: 'vid-4',
    title: 'Mind-Blowing Optical Illusions & How Your Brain Sees',
    titleUrdu: 'بصری دھوکے اور دماغ کے کرشمے',
    category: 'Entertainment',
    duration: '07:30',
    views: '62.4K',
    readTime: 'Video',
    tags: ['Fun', 'Puzzles', 'Brain Tricks'],
    gradient: 'from-purple-600 to-pink-700',
    description: 'Interactive visual tests that challenge your perception of color, motion, and depth.',
    author: 'Enter the World of Light',
  },
  {
    id: 'vid-5',
    title: 'Mastering 10 Daily English Idioms for Fluent Speaking',
    titleUrdu: 'روزمرہ انگریزی بول چال کے ۱۰ محاورے',
    category: 'Latest',
    duration: '11:15',
    views: '32.9K',
    readTime: 'Video',
    tags: ['English', 'Fluency', 'Communication'],
    gradient: 'from-blue-600 to-slate-800',
    description: 'Speak like a native speaker with contextual dialogue examples and pronunciation tips.',
    author: 'Enter the World of Light',
  },
];

export const SHORTS_ITEMS: ContentItem[] = [
  {
    id: 'short-1',
    title: 'Quick Urdu Riddle: Can You Guess This Fruit?',
    titleUrdu: 'آج کی دلچسپ پہیلی',
    category: 'Kids',
    duration: '0:45',
    views: '112K',
    tags: ['Riddle', 'Quick Fun'],
    gradient: 'from-amber-500 via-rose-500 to-indigo-800',
    description: 'سبز ہے کوٹ، اندر ہے لال، کالے موتیوں کا جال! بتاؤ کیا؟ (Answer: Tarbooz / Watermelon!)',
    author: 'Enter the World of Light',
  },
  {
    id: 'short-2',
    title: 'Did You Know Honey Never Spoils?',
    category: 'Educational',
    duration: '0:55',
    views: '240K',
    tags: ['Science Fact', 'Nature'],
    gradient: 'from-yellow-500 via-amber-600 to-emerald-800',
    description: 'Archaeologists found 3,000-year-old honey pots in Egyptian tombs that are still perfectly edible!',
    author: 'Enter the World of Light',
  },
  {
    id: 'short-3',
    title: 'Ghalib in 60 Seconds: The Essence of Ishq',
    titleUrdu: 'غالب کا ایک لازوال شعر',
    category: 'Poetry',
    duration: '0:58',
    views: '95K',
    tags: ['Ghalib', 'Shayari'],
    gradient: 'from-slate-800 via-purple-900 to-amber-700',
    description: 'عشق پر زور نہیں ہے یہ وہ آتش غالب — کہ لگائے نہ لگے اور بجھائے نہ بنے۔',
    author: 'Enter the World of Light',
  },
  {
    id: 'short-4',
    title: 'Mental Math Hack: Multiply Any Number by 11',
    category: 'Latest',
    duration: '0:42',
    views: '185K',
    tags: ['Math Hack', 'Short'],
    gradient: 'from-emerald-600 via-teal-600 to-blue-900',
    description: 'Separate the two digits, add them together, place the sum in the middle. E.g., 35 x 11 = 385!',
    author: 'Enter the World of Light',
  },
];

export const DAILY_ACTIVITIES: DailyActivity[] = [
  {
    id: 'daily-1',
    type: 'learning',
    title: "Today's Micro-Lesson",
    titleUrdu: 'آج کا سبق',
    subtitle: 'Why the sky turns orange-red during sunset (Rayleigh scattering)',
    content: 'Blue light has shorter wavelengths and scatters first; at sunset, sunlight travels through more atmosphere so only the longer red wavelengths reach our eyes.',
    contentUrdu: 'غروبِ آفتاب کے وقت نیلی روشنی فضا کے ذرات سے بکھر جاتی ہے اور لمبی طولِ موج والی سرخ و سنہری شعاعیں ہماری آنکھوں تک پہنچتی ہیں۔',
    completed: true,
    xp: 50,
  },
  {
    id: 'daily-2',
    type: 'quiz',
    title: "Today's Quick Quiz",
    titleUrdu: 'آج کا کوئز',
    subtitle: 'Which organ produces insulin in the human body?',
    content: 'Options: A) Liver  B) Pancreas  C) Kidney  D) Spleen. (Correct: Pancreas!)',
    completed: false,
    xp: 60,
  },
  {
    id: 'daily-3',
    type: 'poetry',
    title: "Today's Couplet of Light",
    titleUrdu: 'آج کا منتخب شعر',
    subtitle: 'Allama Iqbal on inner radiance',
    authorOrSource: 'Allama Iqbal',
    contentUrdu: `اپنے من میں ڈوب کر پا جا سراغِ زندگی
تو اگر میرا نہیں بنتا نہ بن، اپنا تو بن!`,
    content: `Plunge deep into your own inner consciousness to discover the secret trace of life;
If you cannot become mine, so be it—at least become your own!`,
    completed: true,
    xp: 40,
  },
  {
    id: 'daily-4',
    type: 'quote',
    title: "Today's Golden Quote",
    titleUrdu: 'آج کا دانائی کا قول',
    subtitle: 'Wisdom on learning and practice',
    authorOrSource: 'Rumi',
    content: '"Live life as if everything is rigged in your favor. When you let light in, sorrow turns to understanding."',
    contentUrdu: 'روشنی کی طرف رخ کرو تو سائے ہمیشہ تمہارے پیچھے رہیں گے۔',
    completed: false,
    xp: 30,
  },
  {
    id: 'daily-5',
    type: 'story',
    title: "Today's 2-Minute Parable",
    titleUrdu: 'آج کی مختصر کہانی',
    subtitle: 'The Oak and the Bamboo',
    content: 'When the tempest arrived, the rigid oak snapped, but the humble bamboo bowed with the wind and rose taller when the storm passed.',
    completed: false,
    xp: 50,
  },
  {
    id: 'daily-6',
    type: 'challenge',
    title: "Today's Practice Challenge",
    titleUrdu: 'آج کا عملی چیلنج',
    subtitle: 'Learn 3 new Urdu words with their English contextual meanings',
    content: '1. Tabassum (تبسم - Gentle Smile)  2. Fikr (فکر - Thoughtful Concern)  3. Umeed (امید - Resilient Hope). Use them in conversation today!',
    completed: false,
    xp: 75,
  },
];

export const USER_BADGES: Badge[] = [
  {
    id: 'badge-1',
    title: 'Torchbearer of Light',
    description: 'Completed 7 days uninterrupted daily streak',
    icon: 'Flame',
    isUnlocked: true,
    unlockedAt: 'Sep 22, 2026',
  },
  {
    id: 'badge-2',
    title: 'Little Polyglot',
    description: 'Learned 50 words across English and Urdu',
    icon: 'Languages',
    isUnlocked: true,
    unlockedAt: 'Sep 20, 2026',
  },
  {
    id: 'badge-3',
    title: 'Cosmic Navigator',
    description: 'Aced all 5 space and science quizzes with 100% score',
    icon: 'Compass',
    isUnlocked: true,
    unlockedAt: 'Sep 18, 2026',
  },
  {
    id: 'badge-4',
    title: 'Adab Scholar',
    description: 'Explored 25 classical Urdu couplets and ghazals',
    icon: 'Feather',
    isUnlocked: true,
    unlockedAt: 'Sep 15, 2026',
  },
  {
    id: 'badge-5',
    title: 'Grand Master of Puzzles',
    description: 'Solve 10 logic games in under 3 minutes each',
    icon: 'Trophy',
    isUnlocked: false,
  },
  {
    id: 'badge-6',
    title: 'Kind Heart Storyteller',
    description: 'Listen to and reflect upon 20 moral stories',
    icon: 'HeartHandshake',
    isUnlocked: false,
  },
];
