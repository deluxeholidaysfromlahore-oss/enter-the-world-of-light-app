import { DirectoryProfile } from '../types/directory';

export const POETRY_PROFILES: DirectoryProfile[] = [
  {
    id: 'a-g-josh',
    name: 'A G Josh',
    nameUrdu: 'اے جی جوش',
    dates: '1928 - 2007',
    location: 'Lahore',
    era: 'modern',
    roleOrSubtitle: 'Modern Ghazal & Nazm Poet',
    introduction: 'Distinctive 20th century Urdu poet celebrated for classical meter and sensitive social observation in Lahore.',
    introductionUrdu: 'لاہور کے ممتاز شاعر جن کی غزلوں میں کلاسیکی رچاؤ اور دورِ جدید کے احساسات یکجا ہیں۔',
    counts: { sher: 7, ghazal: 18, ebook: 7, nazm: 4, theme: 6 },
    categories: [
      {
        id: 'agj-ghazal',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '18 ghazals',
        count: 18,
        description: 'Lyrical ghazals characterized by poignant introspection and musical meter.',
        tone: 'amber',
        items: [
          {
            id: 'agj-g-1',
            title: 'Safar Ki Dhoop Mein Saya Talash Karte Hain',
            titleUrdu: 'سفر کی دھوپ میں سایہ تلاش کرتے ہیں',
            category: 'Poetry',
            subcategory: 'Ghazal',
            author: 'A G Josh',
            poetName: 'اے جی جوش',
            description: 'Reflections on the restless human journey.',
            tags: ['Life', 'Journey'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `سفر کی دھوپ میں سایہ تلاش کرتے ہیں
ہم اہل شورشِ دنیا قرار پاتے ہیں

ہوا چلی تو بکھرنے لگے گلاب کے رنگ
چمن میں یاد کے پرچم لہو رلاتے ہیں`,
            contentBody: `We search for soothing shade amidst the journey's scorching glare;
Yet restless souls like us yearn only for peace beyond despair.`,
          },
        ],
      },
      {
        id: 'agj-sher',
        key: 'sher',
        title: 'SHER / ASHAR',
        titleUrdu: 'منتخب اشعار',
        countLabel: '7 sher',
        count: 7,
        description: 'Popular individual couplets.',
        tone: 'rose',
        items: [
          {
            id: 'agj-s-1',
            title: 'Chiragh Jalne Lage',
            titleUrdu: 'چراغ جلنے لگے جب شام کا ستارہ کھلا',
            category: 'Poetry',
            subcategory: 'Ashar',
            author: 'A G Josh',
            poetName: 'اے جی جوش',
            description: 'Couplet on twilight reflections.',
            tags: ['Twilight', 'Couplet'],
            gradient: 'from-rose-700 to-stone-900',
            contentBodyUrdu: `چراغ جلنے لگے جب شام کا ستارہ کھلا
کسی کے نام پہ پھر دل کا در دوبارہ کھلا`,
            contentBody: `The lamps began to flicker as the twilight star shone clear;
Once more upon a whispered name, the heart's closed door drew near.`,
          },
        ],
      },
      {
        id: 'agj-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و ای بکس',
        countLabel: '7 e-books',
        count: 7,
        description: 'Digitized anthologies and verse collections.',
        tone: 'purple',
        items: [
          {
            id: 'agj-b-1',
            title: 'Mata-e-Khayal (Collected Verse)',
            titleUrdu: 'متاعِ خیال — مجموعہ کلام',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'A G Josh',
            poetName: 'اے جی جوش',
            description: 'Anthology published in Lahore collecting mid-career ghazals.',
            tags: ['Anthology', 'Lahore'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `متاعِ خیال شاعر کے تیس سالہ فکری سفر کا نچوڑ ہے جس میں روایتی اور جدید موضوعات یکجا ہیں۔`,
            contentBody: `Mata-e-Khayal reflects three decades of lyrical meditation, harmonizing classical poise with modern urban angst.`,
          },
        ],
      },
    ],
  },
  {
    id: 'a-d-azhar',
    name: 'A. D. Azhar',
    nameUrdu: 'اے ڈی اظہر',
    dates: '1900 - 1974',
    location: 'Karachi',
    era: 'modern',
    roleOrSubtitle: 'Eminent Urdu Civil Servant & Classical Poet',
    introduction: 'Distinguished Urdu poet, scholar, and senior administrator known for philosophical depth and elegant Persianized diction.',
    introductionUrdu: 'معروف شاعر، دانشور اور اعلیٰ سول سرونٹ جن کے کلام میں علمی پختگی اور صوفیانہ فکرو تدبر نمایاں ہے۔',
    counts: { sher: 7, ghazal: 18, ebook: 1, nazm: 2, quote: 1 },
    categories: [
      {
        id: 'ada-ghazal',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '18 ghazals',
        count: 18,
        description: 'Classic philosophical ghazals balancing contemplation and spiritual poise.',
        tone: 'amber',
        items: [
          {
            id: 'ada-g-1',
            title: 'Ufaq Pe Jab Bhi Chamakti Hai Roshni',
            titleUrdu: 'افق پہ جب بھی چمکتی ہے روشنی',
            category: 'Poetry',
            subcategory: 'Ghazal',
            author: 'A. D. Azhar',
            poetName: 'اے ڈی اظہر',
            description: 'Philosophical verse on morning hope.',
            tags: ['Philosophy', 'Hope'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `افق پہ جب بھی چمکتی ہے روشنی کی لکیر
ہم اپنے دل کی اداسی مٹا کے دیکھتے ہیں`,
            contentBody: `Whenever the first streak of silver dawn glimmers upon the far horizon,
We brush aside the sorrow in our hearts to greet the new day.`,
          },
        ],
      },
      {
        id: 'ada-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و ای بکس',
        countLabel: '1 e-book',
        count: 1,
        description: 'Published collection of verse.',
        tone: 'purple',
        items: [
          {
            id: 'ada-b-1',
            title: 'Naqsh-e-Dawaam',
            titleUrdu: 'نقشِ دوام — دیوان',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'A. D. Azhar',
            poetName: 'اے ڈی اظہر',
            description: 'Complete collection of ghazals and quatrains.',
            tags: ['Diwan'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `نقشِ دوام میں اے ڈی اظہر کے تمام منتخب اشعار اور صوفیانہ مضامین شامل ہیں۔`,
            contentBody: `Naqsh-e-Dawaam compiles Azhar's collected works, emphasizing ethical fortitude and serene reflection.`,
          },
        ],
      },
    ],
  },
  {
    id: 'a-hameed',
    name: 'A. Hameed',
    nameUrdu: 'اے حمید',
    dates: '1928 - 2011',
    location: 'Lahore',
    era: 'modern',
    roleOrSubtitle: 'Master Novelist, Travel Writer & Literary Stylist',
    introduction: 'Popular short story writer, novelist, romantic prose stylist, and poet, revered for his atmospheric depictions of old Lahore and Amritsar.',
    introductionUrdu: 'اردو کے مایہ ناز ناول نگار، افسانہ نگار اور رومانی نثر نگار جن کی تحریروں نے نسلوں کو مسحور کیا۔',
    counts: { quote: 1, ebook: 83, theme: 12 },
    categories: [
      {
        id: 'ah-prose',
        key: 'prose',
        title: 'PROSE & SHORT STORIES',
        titleUrdu: 'افسانے و نثری شاہکار',
        countLabel: '83 works',
        count: 83,
        description: 'Nostalgic memoirs, rainy evening chronicles, and romantic novellas.',
        tone: 'slate',
        items: [
          {
            id: 'ah-p-1',
            title: 'Lahore Ki Barish (Rain in Lahore)',
            titleUrdu: 'لاہور کی بارش اور پرانی گلیاں',
            category: 'Stories',
            subcategory: 'Memoir',
            author: 'A. Hameed',
            poetName: 'اے حمید',
            description: 'Evocative romantic reflection on monsoon breezes in Mall Road and Anarkali.',
            tags: ['Lahore', 'Monsoon'],
            gradient: 'from-slate-700 to-stone-900',
            contentBodyUrdu: `لاہور کی بارشوں میں ایک عجیب طرح کا جادو ہوتا ہے، جیسے صدیوں پرانی محبتیں گلاب کے پتوں کی طرح دل کے دریچوں پر دوبارہ دستک دینے لگتی ہوں۔`,
            contentBody: `There is a quiet sorcery in the monsoons of Lahore; as if ancient affections return like drenched rose petals tapping gently against the heart's window panes.`,
          },
        ],
      },
    ],
  },
  {
    id: 'allama-iqbal',
    name: 'Allama Muhammad Iqbal',
    nameUrdu: 'علامہ محمد اقبال',
    dates: '1877 – 1938',
    location: 'Sialkot / Lahore',
    era: 'classical',
    roleOrSubtitle: 'Shaair-e-Mashriq • Poet-Philosopher of the East',
    introduction: 'Universal poet-philosopher whose rousing verses awakened selfhood (Khudi), courage, and visionary ambition across the globe.',
    introductionUrdu: 'حکیم الامت، مفکرِ اسلام اور شاعرِ مشرق جن کے کلام نے خودی، عزم اور روحانی بیداری کا لازوال پیغام دیا۔',
    counts: { sher: 350, ghazal: 124, nazm: 86, ebook: 12, theme: 24, naat: 38 },
    categories: [
      {
        id: 'iqbal-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '124 entries',
        count: 124,
        description: 'Classical metaphysical ghazals exploring destiny, divine love, and self-sovereignty.',
        tone: 'amber',
        items: [
          {
            id: 'iqbal-ghazal-1',
            title: 'Sitaron Se Aage Jahan Aur Bhi Hain',
            titleUrdu: 'ستاروں سے آگے جہاں اور بھی ہیں',
            category: 'Poetry',
            subcategory: 'Bal-e-Jibril',
            author: 'Allama Muhammad Iqbal',
            poetName: 'علامہ محمد اقبال',
            description: 'The monumental anthem of limitless human potential and spiritual transcendence.',
            tags: ['Khudi', 'Motivation', 'Bal-e-Jibril'],
            gradient: 'from-amber-600 to-amber-900',
            contentBodyUrdu: `ستاروں سے آگے جہاں اور بھی ہیں
ابھی عشق کے امتحاں اور بھی ہیں

تہی زندگی سے نہیں یہ فضائیں
یہاں سینکڑوں کارواں اور بھی ہیں

قناعت نہ کر عالمِ رنگ و بو پر
چمن اور بھی، آشیاں اور بھی ہیں

تو شاہیں ہے، پرواز ہے کام تیرا
ترے سامنے آسماں اور بھی ہیں`,
            contentBody: `Beyond the stars there are yet other realms;
Still further trials for love to conquer remain.

These infinite vaults of space are never void;
Hundreds of caravans traverse this boundless plain.

Content not yourself with this fleeting scent and hue;
Other gardens bloom, other sacred nests await.

You are the falcon; celestial flight is your sovereign nature;
Vaster horizons open endlessly before your flight.`,
          },
          {
            id: 'iqbal-ghazal-2',
            title: 'Kabhi Ae Haqeeqat-e-Muntazar',
            titleUrdu: 'کبھی اے حقیقتِ منتظر نظر آ لباسِ مجاز میں',
            category: 'Poetry',
            subcategory: 'Bang-e-Dara',
            author: 'Allama Muhammad Iqbal',
            poetName: 'علامہ محمد اقبال',
            description: 'Calling on transcendent Ultimate Truth to manifest in mortal realm.',
            tags: ['Tasawwuf', 'Bang-e-Dara'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `کبھی اے حقیقتِ منتظر نظر آ لباسِ مجاز میں
کہ ہزاروں سجدے تڑپ رہے ہیں مری جبینِ نیاز میں`,
            contentBody: `O Long-Awaited Truth, appear at last in mortal attire;
For thousands of restless prostrations tremble in my longing brow.`,
          },
        ],
      },
      {
        id: 'iqbal-nazms',
        key: 'poems',
        title: 'POEMS / NAZMAN',
        titleUrdu: 'نظمیں',
        countLabel: '86 entries',
        count: 86,
        description: 'Wake-up calls and masterpieces including Shikwa, Jawab-e-Shikwa, and Saqi Nama.',
        tone: 'emerald',
        items: [
          {
            id: 'iqbal-nazm-1',
            title: 'Khudi Ka Sirr-e-Pinhan',
            titleUrdu: 'خودی کا سرِ نہاں لا الہ الا اللہ',
            category: 'Poetry',
            subcategory: 'Zarb-e-Kaleem',
            author: 'Allama Muhammad Iqbal',
            poetName: 'علامہ محمد اقبال',
            description: 'The definitive philosophical proclamation defining human dignity.',
            tags: ['Khudi', 'Tawheed'],
            gradient: 'from-emerald-700 to-stone-900',
            contentBodyUrdu: `خودی کا سرِ نہاں لا الہ الا اللہ
خودی ہے تیغ، فساں لا الہ الا اللہ`,
            contentBody: `The hidden mystery of the Self is "There is no god but God";
The Self is the keen sword, and this truth is its whetstone.`,
          },
        ],
      },
      {
        id: 'iqbal-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و مجموعے',
        countLabel: '12 books',
        count: 12,
        description: 'Complete Urdu & Persian anthologies: Bang-e-Dara, Bal-e-Jibril, Zarb-e-Kaleem, Armughan-e-Hijaz.',
        tone: 'purple',
        subcategories: [
          {
            id: 'bang-e-dara',
            title: 'Bang-e-Dara (1924)',
            titleUrdu: 'بانگِ درا',
            description: 'The Call of the Marching Bell.',
            countLabel: '163 items',
            items: [
              {
                id: 'bd-1',
                title: 'Tarana-e-Milli',
                titleUrdu: 'ترانۂ ملی — چین و عرب ہمارا',
                category: 'Poetry',
                subcategory: 'Bang-e-Dara',
                author: 'Allama Muhammad Iqbal',
                poetName: 'علامہ محمد اقبال',
                description: 'Universal fraternity anthem.',
                tags: ['Anthem'],
                gradient: 'from-purple-700 to-indigo-950',
                contentBodyUrdu: `چین و عرب ہمارا، ہندوستاں ہمارا
مسلم ہیں ہم، وطن ہے سارا جہاں ہمارا`,
                contentBody: `Central Asia and Arabia are ours, the subcontinent is ours;
We are souls of faith; the entire universe is our home.`,
              },
            ],
          },
          {
            id: 'bal-e-jibril',
            title: 'Bal-e-Jibril (1935)',
            titleUrdu: 'بالِ جبریل',
            description: "Gabriel's Wing.",
            countLabel: '78 items',
            items: [
              {
                id: 'bj-1',
                title: 'Masjid-e-Qurtuba',
                titleUrdu: 'مسجدِ قرطبہ — سلسلۂ روز و شب',
                category: 'Poetry',
                subcategory: 'Bal-e-Jibril',
                author: 'Allama Muhammad Iqbal',
                poetName: 'علامہ محمد اقبال',
                description: 'Meditations composed in Spain on art, time, and love.',
                tags: ['Masterpiece'],
                gradient: 'from-purple-800 to-stone-950',
                contentBodyUrdu: `سلسلۂ روز و شب، نقش گرِ حادثات
سلسلۂ روز و شب، اصلِ حیات و ممات`,
                contentBody: `The sequence of day and night is the painter of all mortal events;
The sequence of day and night is the very crucible of life and death.`,
              },
            ],
          },
        ],
      },
      {
        id: 'iqbal-themes',
        key: 'themes',
        title: 'THEMES & TOPICS',
        titleUrdu: 'مضامین و موضوعات',
        countLabel: '24 topics',
        count: 24,
        description: 'Categorized study across fundamental concepts: Khudi, Ishq, Shaheen, Elm o Amal, and Inqilab.',
        tone: 'sky',
        items: [
          {
            id: 'tk-1',
            title: 'Khudi Ko Kar Buland Itna',
            titleUrdu: 'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے',
            category: 'Poetry',
            subcategory: 'Khudi',
            author: 'Allama Muhammad Iqbal',
            poetName: 'علامہ محمد اقبال',
            description: 'The most quoted couplet on self-determination.',
            tags: ['Khudi', 'Destiny'],
            gradient: 'from-sky-700 to-indigo-950',
            contentBodyUrdu: `خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے
خدا بندے سے خود پوچھے بتا تیری رضا کیا ہے!`,
            contentBody: `Elevate your inner Self to such celestial heights that before enacting any destiny,
God Himself shall ask the mortal: Tell Me, what is your desire!`,
          },
        ],
      },
      {
        id: 'iqbal-naat',
        key: 'naat',
        title: 'NAAT & HAMD',
        titleUrdu: 'نعت و حمد',
        countLabel: '38 entries',
        count: 38,
        description: 'Devotional verse and spiritual salutations.',
        tone: 'teal',
        items: [
          {
            id: 'iq-naat-1',
            title: 'Loh Bhi Tu Qalam Bhi Tu',
            titleUrdu: 'لوح بھی تو، قلم بھی تو، تیرا وجود الکتاب',
            category: 'Poetry',
            subcategory: 'Naat',
            author: 'Allama Muhammad Iqbal',
            poetName: 'علامہ محمد اقبال',
            description: 'Celebrated devotional verse from Bal-e-Jibril.',
            tags: ['Naat', 'Devotion'],
            gradient: 'from-teal-700 to-emerald-950',
            contentBodyUrdu: `لوح بھی تو، قلم بھی تو، تیرا وجود الکتاب
گنبدِ آبگینہ رنگ تیرے محیط میں حباب`,
            contentBody: `Thou art the Tablet, Thou art the Pen, Thy blessed existence is the Living Book;
The sapphire vault of the heavens is but a fragile bubble in Thy domain.`,
          },
        ],
      },
    ],
  },
  {
    id: 'mirza-ghalib',
    name: 'Mirza Asadullah Khan Ghalib',
    nameUrdu: 'مرزا اسد اللہ خان غالب',
    dates: '1797 – 1869',
    location: 'Agra / Delhi',
    era: 'classical',
    roleOrSubtitle: 'Najm-ud-Daula • Sovereign of Classical Urdu Ghazal',
    introduction: 'The quintessential master of Urdu poetry whose wit, paradox, and existential depth elevated the ghazal into universal art.',
    introductionUrdu: 'اردو کے عظیم ترین کلاسیکی شاعر جن کے کلام میں شوخی، فلسفہ اور زندگی کی حقیقتیں یکجا ہیں۔',
    counts: { sher: 280, ghazal: 234, ebook: 5, theme: 18, quote: 45 },
    categories: [
      {
        id: 'ghalib-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '234 entries',
        count: 234,
        description: 'Timeless verses exploring paradoxical human nature, yearning, and philosophical wit.',
        tone: 'amber',
        items: [
          {
            id: 'gh-1',
            title: 'Dil-e-Nadaan Tujhe Hua Kya Hai',
            titleUrdu: 'دلِ ناداں تجھے ہوا کیا ہے',
            category: 'Poetry',
            subcategory: 'Deewan-e-Ghalib',
            author: 'Mirza Asadullah Khan Ghalib',
            poetName: 'مرزا اسد اللہ خان غالب',
            description: 'Ghalib’s conversational dialogue with his own restless heart.',
            tags: ['Classic', 'Philosophy'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `دلِ ناداں تجھے ہوا کیا ہے
آخر اس درد کی دوا کیا ہے

ہم ہیں مشتاق اور وہ بیزار
یا الٰہی یہ ماجرا کیا ہے`,
            contentBody: `O foolish heart, what has come over you?
In the end, what cure is there for this ache?

We are consumed with devotion, and they remain indifferent;
O Divine Lord, what mysterious condition is this?`,
          },
          {
            id: 'gh-2',
            title: 'Hazaaron Khwahishein Aisi',
            titleUrdu: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے',
            category: 'Poetry',
            subcategory: 'Deewan-e-Ghalib',
            author: 'Mirza Asadullah Khan Ghalib',
            poetName: 'مرزا اسد اللہ خان غالب',
            description: 'The definitive meditation on infinite desire.',
            tags: ['Desire', 'Existential'],
            gradient: 'from-purple-700 to-amber-950',
            contentBodyUrdu: `ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے
بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے`,
            contentBody: `Thousands of desires, and each desire worth dying for;
Many of my yearnings were fulfilled, yet so few they still seem!`,
          },
        ],
      },
      {
        id: 'ghalib-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و دیوان',
        countLabel: '5 books',
        count: 5,
        description: 'Deewan-e-Ghalib, Kuliyat-e-Farsi, Ood-e-Hindi, and Urdu-e-Moalla.',
        tone: 'purple',
        items: [
          {
            id: 'dg-1',
            title: 'Deewan-e-Ghalib (Urdu)',
            titleUrdu: 'دیوانِ غالب — مکمل نسخہ',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'Mirza Asadullah Khan Ghalib',
            poetName: 'مرزا اسد اللہ خان غالب',
            description: 'The monumental core text of Urdu literature.',
            tags: ['Diwan'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `بس کہ دشوار ہے ہر کام کا آساں ہونا
آدمی کو بھی میسر نہیں انساں ہونا!`,
            contentBody: `So arduous is it for any human endeavor to prove effortless;
Even for mortal man, it is scarcely possible to achieve true humanity!`,
          },
        ],
      },
      {
        id: 'ghalib-themes',
        key: 'themes',
        title: 'THEMES & TOPICS',
        titleUrdu: 'مضامین و خیالات',
        countLabel: '18 topics',
        count: 18,
        description: 'Illusion of existence, irony, solitude, and the enigma of fate.',
        tone: 'sky',
        items: [
          {
            id: 'gt-1',
            title: 'Falsafa-e-Hasti',
            titleUrdu: 'ہستی کے مت فریب میں آ جائیو اسد',
            category: 'Poetry',
            subcategory: 'Themes',
            author: 'Mirza Asadullah Khan Ghalib',
            poetName: 'مرزا اسد اللہ خان غالب',
            description: 'Warning the ego against getting seduced by outer appearances.',
            tags: ['Illusion'],
            gradient: 'from-sky-700 to-stone-900',
            contentBodyUrdu: `ہستی کے مت فریب میں آ جائیو اسد
عالم تمام حلقۂ دامِ خیال ہے!`,
            contentBody: `Do not fall prey to the grand illusion of worldly existence, Asad;
For this entire cosmos is but a snare woven from mortal imagination!`,
          },
        ],
      },
      {
        id: 'ghalib-sher',
        key: 'sher',
        title: 'SHER / ASHAR',
        titleUrdu: 'منتخب اشعار',
        countLabel: '280 sher',
        count: 280,
        description: 'Most quoted couplets in everyday speech.',
        tone: 'rose',
        items: [
          {
            id: 'ga-1',
            title: 'Ishq Par Zor Nahin Hai',
            titleUrdu: 'عشق پر زور نہیں ہے یہ وہ آتش غالب',
            category: 'Poetry',
            subcategory: 'Ashar',
            author: 'Mirza Asadullah Khan Ghalib',
            poetName: 'مرزا اسد اللہ خان غالب',
            description: 'The sovereign nature of devotion.',
            tags: ['Love'],
            gradient: 'from-rose-700 to-stone-900',
            contentBodyUrdu: `عشق پر زور نہیں ہے یہ وہ آتش غالب
کہ لگائے نہ لگے اور بجھائے نہ بنے!`,
            contentBody: `No mortal has mastery over Love; this is such a flame, Ghalib,
Which cannot be lit at will, nor extinguished when once alight!`,
          },
        ],
      },
    ],
  },
  {
    id: 'faiz-ahmed-faiz',
    name: 'Faiz Ahmed Faiz',
    nameUrdu: 'فیض احمد فیض',
    dates: '1911 – 1984',
    location: 'Narowal / Lahore',
    era: 'progressive',
    roleOrSubtitle: 'Lenin Peace Prize Laureate • Voice of Resistance & Compassion',
    introduction: 'The progressive bard who combined the musical elegance of the ghazal with humanist resistance, justice, and quiet courage.',
    introductionUrdu: 'ترقی پسند تحریک کے عظیم جدید شاعر جن کے کلام نے رومانیت اور انقلابی شعور کو لازوال حسن بخشا۔',
    counts: { sher: 110, ghazal: 98, nazm: 64, ebook: 7, theme: 16 },
    categories: [
      {
        id: 'faiz-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '98 entries',
        count: 98,
        description: 'Tender yet socially conscious ghazals set to mesmerizing musical meters.',
        tone: 'amber',
        items: [
          {
            id: 'faiz-g-1',
            title: 'Gulon Mein Rang Bhare',
            titleUrdu: 'گلوں میں رنگ بھرے، بادِ نوبہار چلے',
            category: 'Poetry',
            subcategory: 'Dast-e-Saba',
            author: 'Faiz Ahmed Faiz',
            poetName: 'فیض احمد فیض',
            description: 'Written during imprisonment in Montgomery jail, calling on spring and freedom.',
            tags: ['Spring', 'Prison'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `گلوں میں رنگ بھرے، بادِ نوبہار چلے
چلے بھی آؤ کہ گلشن کا کاروبار چلے`,
            contentBody: `Let flowers fill with vibrant hues, let the fresh breeze of spring arrive;
Come to me now, beloved, so the garden's gentle commerce may resume.`,
          },
        ],
      },
      {
        id: 'faiz-nazms',
        key: 'poems',
        title: 'POEMS / NAZMAN',
        titleUrdu: 'نظمیں',
        countLabel: '64 entries',
        count: 64,
        description: 'Monumental resistance anthems: Hum Dekhenge, Bol Ke Lab Azaad Hain Tere.',
        tone: 'emerald',
        items: [
          {
            id: 'fn-1',
            title: 'Hum Dekhenge',
            titleUrdu: 'ہم دیکھیں گے — لازم ہے کہ ہم بھی دیکھیں گے',
            category: 'Poetry',
            subcategory: 'Resistance',
            author: 'Faiz Ahmed Faiz',
            poetName: 'فیض احمد فیض',
            description: 'The world-famous anthem of perseverance against injustice.',
            tags: ['Anthem'],
            gradient: 'from-emerald-700 to-slate-900',
            contentBodyUrdu: `ہم دیکھیں گے
لازم ہے کہ ہم بھی دیکھیں گے
وہ دن کہ جس کا وعدہ ہے
جو لوحِ ازل پہ لکھا ہے`,
            contentBody: `We shall witness!
It is destined that we too shall bear witness!
The promised dawn that was inscribed
Upon the eternal tablet of time.`,
          },
        ],
      },
      {
        id: 'faiz-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و مجموعے',
        countLabel: '7 books',
        count: 7,
        description: 'Naqsh-e-Faryadi, Dast-e-Saba, Zindan-Nama, Dast-e-Tah-e-Sang, Mere Dil Mere Musafir.',
        tone: 'purple',
        items: [
          {
            id: 'nfp-1',
            title: 'Naqsh-e-Faryadi (1941)',
            titleUrdu: 'نقشِ فریادی',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'Faiz Ahmed Faiz',
            poetName: 'فیض احمد فیض',
            description: 'Debut collection.',
            tags: ['First Collection'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `مجھ سے پہلی سی محبت مری محبوب نہ مانگ
اور بھی دکھ ہیں زمانے میں محبت کے سوا!`,
            contentBody: `Do not ask of me, my beloved, that selfsame love of past days;
There are other sorrows in this world besides love!`,
          },
        ],
      },
      {
        id: 'faiz-themes',
        key: 'themes',
        title: 'THEMES & TOPICS',
        titleUrdu: 'مضامین و موضوعات',
        countLabel: '16 topics',
        count: 16,
        description: 'Peace (Aman), Hope, Resistance, and Solidarity.',
        tone: 'sky',
        items: [
          {
            id: 'ft-1',
            title: 'Aao Ke Dast-e-Dua Uthaein',
            titleUrdu: 'آؤ کہ دستِ دعا اٹھائیں',
            category: 'Poetry',
            subcategory: 'Aman',
            author: 'Faiz Ahmed Faiz',
            poetName: 'فیض احمد فیض',
            description: 'Universal supplication for seekers of justice.',
            tags: ['Peace'],
            gradient: 'from-sky-700 to-stone-900',
            contentBodyUrdu: `آؤ کہ دستِ دعا اٹھائیں
ہم جنہیں رسمِ دعا یاد نہیں`,
            contentBody: `Come, let us raise our hands in prayer,
We who scarcely recall the customary ritual of prayer!`,
          },
        ],
      },
    ],
  },
  {
    id: 'ahmad-faraz',
    name: 'Ahmad Faraz',
    nameUrdu: 'احمد فراز',
    dates: '1931 – 2008',
    location: 'Kohat / Islamabad',
    era: 'modern',
    roleOrSubtitle: 'The Romantic Bard of Modern Urdu',
    introduction: 'Celebrated for lyrical romantic elegance and fierce resistance against tyranny and censorship.',
    introductionUrdu: 'اردو کے مقبول ترین رومانی اور مزاحمتی شاعر جن کی غزلیں کروڑوں دلوں کی دھڑکن ہیں۔',
    counts: { sher: 140, ghazal: 120, nazm: 52, ebook: 14, theme: 14 },
    categories: [
      {
        id: 'faraz-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'رومانی غزلیات',
        countLabel: '120 entries',
        count: 120,
        description: 'Popular melodies of modern Urdu romance.',
        tone: 'amber',
        items: [
          {
            id: 'af-g-1',
            title: 'Suna Hai Log Use Aankh Bhar Ke Dekhte Hain',
            titleUrdu: 'سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں',
            category: 'Poetry',
            subcategory: 'Ghazal',
            author: 'Ahmad Faraz',
            poetName: 'احمد فراز',
            description: 'One of the most famous romantic ghazals.',
            tags: ['Romance'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں
سو اس کے شہر میں کچھ دن ٹھہر کے دیکھتے ہیں`,
            contentBody: `I hear that people gaze upon her with unblinking wonder;
So let us dwell a few days in her city to see for ourselves.`,
          },
        ],
      },
      {
        id: 'faraz-poems',
        key: 'poems',
        title: 'POEMS / NAZMAN',
        titleUrdu: 'مزاحمتی نظمیں',
        countLabel: '52 entries',
        count: 52,
        description: 'Courageous poems written against injustice.',
        tone: 'emerald',
        items: [
          {
            id: 'af-r-1',
            title: 'Muhasra (The Siege)',
            titleUrdu: 'محاصرہ — مرا قلم مری حرمت کا پاسباں ہے',
            category: 'Poetry',
            subcategory: 'Resistance',
            author: 'Ahmad Faraz',
            poetName: 'احمد فراز',
            description: 'The poet declaring his pen cannot be coerced.',
            tags: ['Courage'],
            gradient: 'from-emerald-700 to-stone-900',
            contentBodyUrdu: `مرا قلم تو امانت ہے میرے لوگوں کی
مرا قلم تو عدالت ہے میرے ضمیر کی!`,
            contentBody: `My pen is a sacred trust held on behalf of my people;
My pen is the incorruptible tribunal of my conscience!`,
          },
        ],
      },
      {
        id: 'faraz-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و مجموعے',
        countLabel: '14 books',
        count: 14,
        description: 'Tanha Tanha, Dard-e-Aashob, Janan Janan, Shabe-Khoon.',
        tone: 'purple',
        items: [
          {
            id: 'jj-1',
            title: 'Janan Janan (1976)',
            titleUrdu: 'جاناں جاناں',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'Ahmad Faraz',
            poetName: 'احمد فراز',
            description: 'Mid-career masterpiece.',
            tags: ['Masterpiece'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `یہ عالم شوق کا دیکھا نہ جائے
وہ بت ہے یا خدا دیکھا نہ جائے!`,
            contentBody: `This overwhelming intensity of desire is beyond endurance;
Whether she is an idol or divine mystery cannot be discerned!`,
          },
        ],
      },
      {
        id: 'faraz-themes',
        key: 'themes',
        title: 'THEMES & TOPICS',
        titleUrdu: 'مضامین و کیفیات',
        countLabel: '14 topics',
        count: 14,
        description: 'Themes of Hijr (Separation), Wafa, and Dard.',
        tone: 'sky',
        items: [
          {
            id: 'fzh-1',
            title: 'Ab Ke Hum Bichde To',
            titleUrdu: 'اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں',
            category: 'Poetry',
            subcategory: 'Hijr',
            author: 'Ahmad Faraz',
            poetName: 'احمد فراز',
            description: 'Couplet on parting.',
            tags: ['Separation'],
            gradient: 'from-sky-700 to-stone-900',
            contentBodyUrdu: `اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں
جس طرح سوکھے ہوئے پھول کتابوں میں ملیں!`,
            contentBody: `If we part ways this time, we may perhaps meet only in dreams,
Just as pressed and dried blossoms are discovered forgotten inside books!`,
          },
        ],
      },
    ],
  },
  {
    id: 'mir-taqi-mir',
    name: 'Mir Taqi Mir',
    nameUrdu: 'میر تقی میر',
    dates: '1723 – 1810',
    location: 'Agra / Lucknow',
    era: 'classical',
    roleOrSubtitle: 'Khuda-e-Sukhan • The God of Urdu Poetry',
    introduction: 'The supreme pioneer of classical Urdu ghazal, famed for tender sadness, unmatched musical flow, and raw human pathos.',
    introductionUrdu: 'خدائے سخن جن کی غزلوں کی سادگی، موسیقیت اور سوز و گداز کو غالب اور اقبال سمیت تمام اساتذہ نے تسلیم کیا۔',
    counts: { sher: 320, ghazal: 190, ebook: 6, theme: 15 },
    categories: [
      {
        id: 'mir-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیاتِ میر',
        countLabel: '190 entries',
        count: 190,
        description: 'Sublime sad verses and timeless musical meters.',
        tone: 'amber',
        items: [
          {
            id: 'mir-g-1',
            title: 'Ibtada-e-Ishq Hai Rota Hai Kya',
            titleUrdu: 'ابتداۓ عشق ہے روتا ہے کیا',
            category: 'Poetry',
            subcategory: 'Kuliyat-e-Mir',
            author: 'Mir Taqi Mir',
            poetName: 'میر تقی میر',
            description: 'The golden opening to classical heartache.',
            tags: ['Classic', 'Mir'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `ابتداۓ عشق ہے روتا ہے کیا
آگے آگے دیکھیے ہوتا ہے کیا!`,
            contentBody: `This is merely the dawn of Love; why do you weep already?
Watch patiently as the journey unfolds ahead!`,
          },
        ],
      },
      {
        id: 'mir-sher',
        key: 'sher',
        title: 'SHER / ASHAR',
        titleUrdu: 'منتخب اشعار',
        countLabel: '320 sher',
        count: 320,
        description: 'Tender couplets that shaped Urdu literary tradition.',
        tone: 'rose',
        items: [
          {
            id: 'mir-s-1',
            title: 'Nazuki Uske Lab Ki Kya Kahiye',
            titleUrdu: 'نازکی اس کے لب کی کیا کہیے',
            category: 'Poetry',
            subcategory: 'Ashar',
            author: 'Mir Taqi Mir',
            poetName: 'میر تقی میر',
            description: 'Unrivaled comparison of delicate lips to rose petals.',
            tags: ['Beauty'],
            gradient: 'from-rose-700 to-stone-900',
            contentBodyUrdu: `نازکی اس کے لب کی کیا کہیے
پنکھڑی اک گلاب کی سی ہے!`,
            contentBody: `How can one describe the delicacy of her tender lips?
They are like the fragile petal of a fresh rose blossom!`,
          },
        ],
      },
    ],
  },
  {
    id: 'jaun-elia',
    name: 'Jaun Elia',
    nameUrdu: 'جون ایلیا',
    dates: '1931 – 2002',
    location: 'Amroha / Karachi',
    era: 'modern',
    roleOrSubtitle: 'Cult Icon of Existential Melancholy & Skepticism',
    introduction: 'Iconoclastic poet, polymath, and philosopher celebrated for searing nihilistic honesty, heartbreak, and dramatic recited cadence.',
    introductionUrdu: 'جدید اردو شاعری کے سب سے منفرد اور باغی لہجے کے شاعر جن کی بے باکی اور فلسفیانہ یاسیت نے دلوں کو ہلا دیا۔',
    counts: { sher: 180, ghazal: 110, nazm: 40, ebook: 5, theme: 20 },
    categories: [
      {
        id: 'jaun-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '110 entries',
        count: 110,
        description: 'Raw, unfiltered verses of disillusionment, memory, and existential angst.',
        tone: 'amber',
        items: [
          {
            id: 'je-g-1',
            title: 'Shayad (Perhaps)',
            titleUrdu: 'شاید کہ مجھ کو نکال کر دل سے',
            category: 'Poetry',
            subcategory: 'Shayad',
            author: 'Jaun Elia',
            poetName: 'جون ایلیا',
            description: 'Painful self-awareness and skepticism.',
            tags: ['Nihilism', 'Heartbreak'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `شاید کہ مجھ کو نکال کر دل سے
تم نے بھی سکون پایا نہ ہو گا!

حاصلِ کن ہے یہ جہانِ خراب
یہی ممکن تھا اتنی عجلت میں`,
            contentBody: `Perhaps after casting me out from your heart,
You too could find no serene peace!

This fractured universe is the hasty outcome of mortal chaos;
This was all that proved possible in such restless haste!`,
          },
        ],
      },
      {
        id: 'jaun-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و مجموعے',
        countLabel: '5 books',
        count: 5,
        description: 'Shayad, Yaani, Gumaan, Lekin, Goya.',
        tone: 'purple',
        items: [
          {
            id: 'je-b-1',
            title: 'Shayad (1991)',
            titleUrdu: 'شاید — پہلا مجموعہ',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'Jaun Elia',
            poetName: 'جون ایلیا',
            description: 'The monumental first collection with famous existential preface.',
            tags: ['Shayad'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `میں بھی بہت عجیب ہوں، اتنا عجیب ہوں کہ بس
خود کو تباہ کر لیا اور ملال بھی نہیں!`,
            contentBody: `I too am astonishingly strange, so strange that words fail;
I brought ruin upon myself, yet feel no shred of regret!`,
          },
        ],
      },
    ],
  },
  {
    id: 'parveen-shakir',
    name: 'Parveen Shakir',
    nameUrdu: 'پروین شاکر',
    dates: '1952 – 1994',
    location: 'Karachi / Islamabad',
    era: 'women',
    roleOrSubtitle: 'Fragrance of the Heart • Voice of Modern Feminine Sensitivity',
    introduction: 'Path-breaking Urdu poet who voiced feminine feelings, spontaneous love, professional dignity, and delicate beauty through Khushbu.',
    introductionUrdu: 'خوشبو کی شاعرہ جن کے کلام نے اردو شاعری میں نسائی احساسات اور نازک جذبوں کو سچی آواز بخشی۔',
    counts: { sher: 95, ghazal: 85, nazm: 48, ebook: 5, theme: 12 },
    categories: [
      {
        id: 'ps-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '85 entries',
        count: 85,
        description: 'Delicate verses capturing youthful innocence, fragrance, and yearning.',
        tone: 'amber',
        items: [
          {
            id: 'ps-g-1',
            title: 'Wo To Khushbu Hai Hawaon Mein Bikhar Jayega',
            titleUrdu: 'وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا',
            category: 'Poetry',
            subcategory: 'Khushbu',
            author: 'Parveen Shakir',
            poetName: 'پروین شاکر',
            description: 'Classic couplet on transient love.',
            tags: ['Fragrance', 'Love'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا
مسئلہ پھول کا ہے، پھول کدھر جائے گا!`,
            contentBody: `He is but fragrant perfume; he will drift freely upon the wind;
The sorrow belongs to the fragile flower—where shall the plucked petal go!`,
          },
        ],
      },
      {
        id: 'ps-books',
        key: 'books',
        title: 'BOOKS & COLLECTIONS',
        titleUrdu: 'کتب و مجموعے',
        countLabel: '5 books',
        count: 5,
        description: 'Khushbu, Sad-Barg, Khud-Kalami, Inkaar, Mah-e-Tamaam.',
        tone: 'purple',
        items: [
          {
            id: 'ps-b-1',
            title: 'Khushbu (1976)',
            titleUrdu: 'خوشبو — پہلا مجموعہ',
            category: 'Poetry',
            subcategory: 'Books',
            author: 'Parveen Shakir',
            poetName: 'پروین شاکر',
            description: 'Debut collection that won the Adamjee Literary Award.',
            tags: ['Khushbu'],
            gradient: 'from-purple-800 to-stone-900',
            contentBodyUrdu: `کو بہ کو پھیل گئی بات شناسائی کی
اس نے خوشبو کی طرح میری پذیرائی کی!`,
            contentBody: `From lane to lane spread the tender rumor of our acquaintance;
He welcomed my soul just as blossoming fragrance welcomes the breeze!`,
          },
        ],
      },
    ],
  },
  {
    id: 'habib-jalib',
    name: 'Habib Jalib',
    nameUrdu: 'حبیب جالب',
    dates: '1928 – 1993',
    location: 'Hoshiarpur / Lahore',
    era: 'progressive',
    roleOrSubtitle: 'Shaair-e-Awam • The Indomitable Poet of the Masses',
    introduction: 'Fearless people’s poet whose defiant street verses ("Main Nahi Manta") championed civil liberty, laborers, and democracy.',
    introductionUrdu: 'عوامی شاعر جن کی گرجدار آواز اور مزاحمتی نظموں نے آمریت اور ناانصافی کے ایوانوں کو لرزا دیا۔',
    counts: { sher: 60, ghazal: 45, nazm: 78, ebook: 4, theme: 10 },
    categories: [
      {
        id: 'jalib-nazm',
        key: 'poems',
        title: 'POEMS / NAZMAN',
        titleUrdu: 'عوامی و مزاحمتی نظمیں',
        countLabel: '78 entries',
        count: 78,
        description: 'Dastoor, Zulam Rahe Aur Aman Bhi Ho, and anthems of the working people.',
        tone: 'emerald',
        items: [
          {
            id: 'hj-n-1',
            title: 'Dastoor (Main Nahi Manta)',
            titleUrdu: 'دستور — ایسے دستور کو صبحِ بے نور کو میں نہیں مانتا',
            category: 'Poetry',
            subcategory: 'Dastoor',
            author: 'Habib Jalib',
            poetName: 'حبیب جالب',
            description: 'The definitive protest anthem rejected deceptive tyranny.',
            tags: ['Protest', 'Dastoor'],
            gradient: 'from-emerald-700 to-stone-900',
            contentBodyUrdu: `دیپ جس کا محلات ہی میں جلے
چند لوگوں کی خوشیوں کو لے کر چلے
وہ جو سائے میں ہر مصلحت کے پلے
ایسے دستور کو، صبحِ بے نور کو
میں نہیں مانتا، میں نہیں جانتا!`,
            contentBody: `A law whose lone lamp glimmers only in the palace of the rich,
Which caters solely to the pleasure of the select few,
Which breeds in the cowardly shadow of every compromise—
Such an unjust order, such a dawn bereft of light:
I refuse to accept, I refuse to acknowledge!`,
          },
        ],
      },
    ],
  },
  {
    id: 'bahadur-shah-zafar',
    name: 'Bahadur Shah Zafar',
    nameUrdu: 'بہادر شاہ ظفر',
    dates: '1775 – 1862',
    location: 'Delhi / Rangoon',
    era: 'classical',
    roleOrSubtitle: 'The Last Mughal Emperor & Melancholic Poet',
    introduction: 'The tragic final sovereign of Delhi who poured his exile and longing for his homeland into heartbreaking ghazals in Burma.',
    introductionUrdu: 'آخری مغل تاجدار جن کی شاعری میں زوالِ دہلی اور جلاوطنی کا درد دل دہلا دینے والے انداز میں ملتا ہے۔',
    counts: { sher: 140, ghazal: 80, ebook: 3, theme: 8 },
    categories: [
      {
        id: 'zafar-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '80 entries',
        count: 80,
        description: 'Exile laments from Rangoon and memories of the Red Fort.',
        tone: 'amber',
        items: [
          {
            id: 'bsz-g-1',
            title: 'Lagta Nahi Hai Dil Mera Ujde Dayar Mein',
            titleUrdu: 'لگتا نہیں ہے دل مرا اجڑے دیار میں',
            category: 'Poetry',
            subcategory: 'Kulliyat-e-Zafar',
            author: 'Bahadur Shah Zafar',
            poetName: 'بہادر شاہ ظفر',
            description: 'Immortal elegy of exile from Rangoon.',
            tags: ['Exile', 'Delhi'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `لگتا نہیں ہے دل مرا اجڑے دیار میں
کس کی بنی ہے عالمِ ناپائیدار میں

کتنا ہے بد نصیب ظفرؔ دفن کے لیے
دو گز زمین بھی نہ ملی کوئے یار میں!`,
            contentBody: `My desolate heart finds no solace in this ruined land;
Who has ever achieved lasting contentment in this transient realm?

How unfortunate is Zafar, that even for his final rest,
He could not secure two yards of earth in the soil of his beloved home!`,
          },
        ],
      },
    ],
  },
  {
    id: 'momin-khan-momin',
    name: 'Momin Khan Momin',
    nameUrdu: 'مومن خان مومن',
    dates: '1800 – 1851',
    location: 'Delhi',
    era: 'classical',
    roleOrSubtitle: 'Master of Subtle Romance & Astrological Insight',
    introduction: 'Classical contemporary of Ghalib famed for sublime romantic intimacy and musical modesty.',
    introductionUrdu: 'غالب کے عظیم ہم عصر جن کے ایک شعر پر غالب نے اپنا پورا دیوان نچھاور کرنے کی تمنا ظاہر کی تھی۔',
    counts: { sher: 110, ghazal: 70, ebook: 2, theme: 6 },
    categories: [
      {
        id: 'momin-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '70 entries',
        count: 70,
        description: 'Exquisite verses on fidelity and silent companionship.',
        tone: 'amber',
        items: [
          {
            id: 'mkm-g-1',
            title: 'Tum Mere Paas Hote Ho Gooya',
            titleUrdu: 'تم مرے پاس ہوتے ہو گویا جب کوئی دوسرا نہیں ہوتا',
            category: 'Poetry',
            subcategory: 'Diwan-e-Momin',
            author: 'Momin Khan Momin',
            poetName: 'مومن خان مومن',
            description: 'The couplet Ghalib prized above all his own works.',
            tags: ['Love', 'Famous'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `تم مرے پاس ہوتے ہو گویا
جب کوئی دوسرا نہیں ہوتا!`,
            contentBody: `It feels as though you are tenderly near me,
Precisely when no other living soul is around!`,
          },
        ],
      },
    ],
  },
  {
    id: 'nasir-kazmi',
    name: 'Nasir Kazmi',
    nameUrdu: 'ناصر کاظمی',
    dates: '1925 – 1972',
    location: 'Ambala / Lahore',
    era: 'modern',
    roleOrSubtitle: 'The Melodious Singer of Twilight & Nostalgia',
    introduction: 'Post-partition master of short meter, autumn melancholies, nocturnal streets, and gentle musical pathos.',
    introductionUrdu: 'جدید غزل کو میر تقی میر کا دردمند لہجہ اور چھوٹی بحروں کی دلفریب موسیقی دینے والے عظیم شاعر۔',
    counts: { sher: 90, ghazal: 65, ebook: 4, theme: 10 },
    categories: [
      {
        id: 'nasir-ghazals',
        key: 'poetry',
        title: 'POETRY & GHAZALS',
        titleUrdu: 'غزلیات',
        countLabel: '65 entries',
        count: 65,
        description: 'Barg-e-Nai, Deewan, and Pehli Barish.',
        tone: 'amber',
        items: [
          {
            id: 'nk-g-1',
            title: 'Dil Mein Ek Lehr Si Uthi Hai Abhi',
            titleUrdu: 'دل میں اک لہر سی اٹھی ہے ابھی',
            category: 'Poetry',
            subcategory: 'Deewan',
            author: 'Nasir Kazmi',
            poetName: 'ناصر کاظمی',
            description: 'Sudden surge of memory in the quiet of evening.',
            tags: ['Memory'],
            gradient: 'from-amber-700 to-stone-900',
            contentBodyUrdu: `دل میں اک لہر سی اٹھی ہے ابھی
کوئی تازہ ہوا چلی ہے ابھی

شور برپا ہے خانۂ دل میں
کوئی دیوار سی گری ہے ابھی!`,
            contentBody: `A sudden ripple has stirred within my heart just now;
A fresh, nostalgic breeze has drifted past just now.

A deafening tremor echoes inside the chamber of the heart;
It feels as though an ancient wall collapsed just now!`,
          },
        ],
      },
    ],
  },
  {
    id: 'sahir-ludhianvi',
    name: 'Sahir Ludhianvi',
    nameUrdu: 'ساحر لدھیانوی',
    dates: '1921 – 1980',
    location: 'Ludhiana / Mumbai',
    era: 'progressive',
    roleOrSubtitle: 'Poet of Humanity, Romance & Progressive Cinema',
    introduction: 'Visionary poet of Talkhiyan and Indian cinema whose verses challenged war, exploitation, and hypocritical monuments.',
    introductionUrdu: 'تلخیاں کے خالق اور اردو کے انقلابی نغمہ نگار جن کے قلم نے تاج محل سے لے کر امنِ عالم تک پر انمٹ کلام لکھا۔',
    counts: { sher: 85, ghazal: 55, nazm: 60, ebook: 4, theme: 14 },
    categories: [
      {
        id: 'sahir-nazm',
        key: 'poems',
        title: 'POEMS / NAZMAN',
        titleUrdu: 'نظمیں',
        countLabel: '60 entries',
        count: 60,
        description: 'Taj Mahal, Parchhaiyan, and anti-war epics.',
        tone: 'emerald',
        items: [
          {
            id: 'sl-n-1',
            title: 'Taj Mahal (Ek Shahenshah Ne Daulat Ka Sahara Le Kar)',
            titleUrdu: 'تاج محل — اک شہنشاہ نے دولت کا سہارا لے کر',
            category: 'Poetry',
            subcategory: 'Talkhiyan',
            author: 'Sahir Ludhianvi',
            poetName: 'ساحر لدھیانوی',
            description: 'Famous critique of imperial opulence mocking poor lovers.',
            tags: ['Taj Mahal', 'Progressive'],
            gradient: 'from-emerald-700 to-stone-900',
            contentBodyUrdu: `اک شہنشاہ نے دولت کا سہارا لے کر
ہم غریبوں کی محبت کا اڑایا ہے مذاق!

میری محبوب! کہیں اور ملا کر مجھ سے!`,
            contentBody: `An emperor, taking pride in his imperial hoard,
Has made a mocking spectacle of poor lovers' hearts!

My beloved, let us meet somewhere far away from here!`,
          },
        ],
      },
    ],
  },
];

export const STORIES_PROFILES: DirectoryProfile[] = [
  {
    id: 'fables-tradition',
    name: 'Panchatantra & Aesop Fables',
    nameUrdu: 'پنچ تنتر و ایسپ کی سبق آموز کہانیاں',
    dates: 'Ancient Era – Present',
    location: 'World Heritage',
    era: 'classical',
    roleOrSubtitle: 'Universal Moral Story Traditions for All Ages',
    introduction: 'Timeless allegorical stories where animal kingdoms illuminate moral courage, critical thinking, true friendship, and empathy.',
    introductionUrdu: 'جانوروں کی زبانی کہی گئی وہ لافانی کہانیاں جو بچوں اور بڑوں کو حکمت اور دانائی سکھاتی ہیں۔',
    counts: { sher: 0, ghazal: 0, nazm: 0, ebook: 5, theme: 18 },
    categories: [
      {
        id: 'fables-animals',
        key: 'themes',
        title: 'ANIMAL ALLEGORIES & WISDOM',
        titleUrdu: 'جانوروں کے قصے اور دانائی',
        countLabel: '54 fables',
        count: 54,
        description: 'Clever hares, wise tortoises, and royal lions demonstrating that wit triumphs over brute strength.',
        tone: 'emerald',
        items: [
          {
            id: 'st-pancha-1',
            title: 'The Loyal Mongoose & The Serpent',
            titleUrdu: 'وفادار نیولا اور کالا ناگ',
            category: 'Stories',
            subcategory: 'Panchatantra',
            author: 'Panchatantra Tradition',
            description: 'The cautionary tale against hasty judgments made in anger.',
            tags: ['Wisdom', 'Patience'],
            gradient: 'from-emerald-700 to-stone-900',
            contentBodyUrdu: `ایک دیہات میں ایک وفادار نیولا رہتا تھا جو اپنے مالک کے بچے کی حفاظت کرتا تھا۔ ایک روز ناگ آیا تو اس نے بچے کی جان بچائی۔
سبق: کبھی بھی غصے اور جلد بازی میں حقیقت جانے بغیر کوئی قدم مت اٹھاؤ۔`,
            contentBody: `In a quiet village lived a devoted mongoose who saved an infant from a venomous snake.
Moral: Never make irreversible decisions in hasty anger without investigating the whole truth.`,
          },
        ],
      },
    ],
  },
];

export const KNOWLEDGE_PROFILES: DirectoryProfile[] = [
  {
    id: 'cosmos-science',
    name: 'Cosmos & Celestial Astronomy',
    nameUrdu: 'علمِ فلکیات اور کائنات کے اسرار',
    dates: 'Modern Astrophysics',
    location: 'Observable Universe',
    era: 'modern',
    roleOrSubtitle: 'Planets • Stars • Galaxies • Spacetime',
    introduction: 'An encyclopedic, beautifully organized journey from solar systems and planetary geology to black holes and the cosmic web.',
    introductionUrdu: 'نظامِ شمسی، ستاروں کے جنم، بلیک ہولز اور کائنات کے رازوں پر مشتمل سائنسی سفر۔',
    counts: { ebook: 3, theme: 22 },
    categories: [
      {
        id: 'astro-solar',
        key: 'themes',
        title: 'SOLAR SYSTEM & PLANETS',
        titleUrdu: 'نظامِ شمسی اور سیارچے',
        countLabel: '18 modules',
        count: 18,
        description: 'From scorching Mercury and ringed Saturn to Kuiper belt dwarf worlds.',
        tone: 'sky',
        items: [
          {
            id: 'as-1',
            title: 'Saturn: The Lord of Planetary Rings',
            titleUrdu: 'زحل — برفانی چھلوں کا بادشاہ',
            category: 'General Knowledge',
            subcategory: 'Astronomy',
            author: 'Science Team',
            description: 'How Saturn’s rings formed from crushed icy comets and moonlets.',
            tags: ['Saturn', 'Space'],
            gradient: 'from-sky-700 to-indigo-950',
            contentBodyUrdu: `زحل ہمارے نظامِ شمسی کا دوسرا سب سے بڑا سیارہ ہے جس کے گرد اربوں برفیلے ٹکڑوں پر مشتمل شاندار چھلے موجود ہیں۔`,
            contentBody: `Saturn is the second largest planet in the solar system, crowned with dazzling rings made of billions of icy fragments, rock, and dust.`,
          },
        ],
      },
    ],
  },
];
