import { KidsLearnItem } from '../types/kids';

// All 26 English Alphabets A-Z with phonics, 3-4 simple child-friendly sentences, and example words
export const KIDS_ENGLISH_ALPHABETS: KidsLearnItem[] = [
  {
    id: 'eng-a',
    title: 'A / a — Apple',
    titleUrdu: 'حرف A — ایپل (سیب)',
    pronunciation: '/æ/ sound as in Apple',
    emoji: '🍎',
    category: 'English',
    letterCase: 'Aa',
    exampleWords: ['Apple', 'Ant', 'Airplane', 'Alligator'],
    sentences: [
      'A is for sweet red Apple.',
      'The busy little ant walks in line.',
      'An airplane flies high in the blue sky.',
      'An apple a day brings a big cheerful smile!'
    ],
    description: 'A is for Apple! Crisp, sweet, and red. Ant marches politely. Airplane zooms high in the clouds.',
    descriptionUrdu: 'A سے بنتا ہے ایپل یعنی سیب، اینٹ یعنی چیونٹی اور ایروپلین یعنی ہوائی جہاز!',
    funFact: 'Apples float on water because 25% of their volume is fresh air!',
    funFactUrdu: 'سیب پانی پر تیرتے ہیں کیونکہ ان میں پچیس فیصد ہوا ہوتی ہے!'
  },
  {
    id: 'eng-b',
    title: 'B / b — Butterfly',
    titleUrdu: 'حرف B — بٹر فلائی (تتلی)',
    pronunciation: '/b/ sound as in Butterfly',
    emoji: '🦋',
    category: 'English',
    letterCase: 'Bb',
    exampleWords: ['Butterfly', 'Ball', 'Bear', 'Banana'],
    sentences: [
      'B is for Butterfly dancing on petals.',
      'Bounce the colorful round ball.',
      'A sweet brown bear loves yummy honey.',
      'Peel a yellow banana for breakfast.'
    ],
    description: 'B is for Butterfly, gentle Bear, bouncing Ball, and sweet yellow Banana!',
    descriptionUrdu: 'B سے بنتی ہے خوبصورت تتلی اور اچھلتی ہوئی گیند!',
    funFact: 'Butterflies taste sweet flower nectar with their tiny feet!',
    funFactUrdu: 'تتلیاں اپنے ننھے پاؤں سے ذائقہ چکھتی ہیں!'
  },
  {
    id: 'eng-c',
    title: 'C / c — Cat',
    titleUrdu: 'حرف C — کیٹ (بلی)',
    pronunciation: '/k/ sound as in Cat',
    emoji: '🐱',
    category: 'English',
    letterCase: 'Cc',
    exampleWords: ['Cat', 'Car', 'Cake', 'Camel'],
    sentences: [
      'C is for cute little Cat.',
      'The kitten drinks warm milk happily.',
      'We drive a safe shiny car.',
      'Blow the candles on the birthday cake!'
    ],
    description: 'C is for Cat, shiny Car, sweet Cake, and desert Camel!',
    descriptionUrdu: 'C سے بنتی ہے پیاری بلی اور تیز رفتار کار!',
    funFact: 'Cats can rotate their soft ears 180 degrees to hear tiny sounds!',
    funFactUrdu: 'بلیاں اپنے کان 180 درجے تک گھما سکتی ہیں!'
  },
  {
    id: 'eng-d',
    title: 'D / d — Dolphin',
    titleUrdu: 'حرف D — ڈولفن',
    pronunciation: '/d/ sound as in Dolphin',
    emoji: '🐬',
    category: 'English',
    letterCase: 'Dd',
    exampleWords: ['Dolphin', 'Dog', 'Duck', 'Drum'],
    sentences: [
      'D is for Dolphin swimming in the sea.',
      'Playful puppies wag their tails.',
      'The yellow duck quacks at the pond.',
      'Tap the drum to make happy music!'
    ],
    description: 'D is for Dolphin, loyal Dog, quacking Duck, and joyful Drum!',
    descriptionUrdu: 'D سے بنتی ہے سمندر کی ڈولفن اور وفادار کتا!',
    funFact: 'Dolphins sleep with one eye open to stay safe and aware!',
    funFactUrdu: 'ڈولفن حفاظت کے لیے ایک آنکھ کھول کر سوتی ہے!'
  },
  {
    id: 'eng-e',
    title: 'E / e — Elephant',
    titleUrdu: 'حرف E — ایلیفینٹ (ہاتھی)',
    pronunciation: '/e/ sound as in Elephant',
    emoji: '🐘',
    category: 'English',
    letterCase: 'Ee',
    exampleWords: ['Elephant', 'Eagle', 'Earth', 'Egg'],
    sentences: [
      'E is for Elephant with a long playful trunk.',
      'The royal eagle glides above mountain peaks.',
      'Planet Earth is our green and blue home.',
      'Eat a warm boiled egg for strong muscles.'
    ],
    description: 'E is for Elephant, majestic Eagle, beautiful Earth, and healthy Egg!',
    descriptionUrdu: 'E سے بنتا ہے ہاتھی اور ہماری خوبصورت زمین!',
    funFact: 'An elephant trunk has over 40,000 muscles and can pick up a single peanut!',
    funFactUrdu: 'ہاتھی کی سونڈ میں 40 ہزار سے زائد پٹھے ہوتے ہیں!'
  },
  {
    id: 'eng-f',
    title: 'F / f — Fish',
    titleUrdu: 'حرف F — فِش (مچھلی)',
    pronunciation: '/f/ sound as in Fish',
    emoji: '🐟',
    category: 'English',
    letterCase: 'Ff',
    exampleWords: ['Fish', 'Flower', 'Frog', 'Fox'],
    sentences: [
      'F is for silver Fish gliding in clear water.',
      'Bright flowers bloom in the sunshine.',
      'A friendly frog hops across lily pads.',
      'The clever fox rests under the tree.'
    ],
    description: 'F is for Fish, fragrant Flower, jumping Frog, and swift Fox!',
    descriptionUrdu: 'F سے بنتی ہے پانی میں تیرتی مچھلی اور مسکراتا پھول!',
    funFact: 'Most fish sleep with their eyes open because they do not have eyelids!',
    funFactUrdu: 'مچھلیوں کے پپوٹے نہیں ہوتے اس لیے وہ آنکھیں کھلی رکھ کر آرام کرتی ہیں!'
  },
  {
    id: 'eng-g',
    title: 'G / g — Giraffe',
    titleUrdu: 'حرف G — جراف (زرافہ)',
    pronunciation: '/dʒ/ and /g/ sound as in Giraffe & Garden',
    emoji: '🦒',
    category: 'English',
    letterCase: 'Gg',
    exampleWords: ['Giraffe', 'Garden', 'Grapes', 'Gold'],
    sentences: [
      'G is for tall Giraffe reaching high acacia leaves.',
      'Walk softly in the blossoming green garden.',
      'Sweet purple grapes make delicious snacks.',
      'The morning sun shines like bright warm gold.'
    ],
    description: 'G is for gentle Giraffe, green Garden, juicy Grapes, and glittering Gold!',
    descriptionUrdu: 'G سے بنتا ہے لمبی گردن والا زرافہ اور ہرابھرا باغ!',
    funFact: 'A giraffe tongue is blue-black and can be up to 45 centimeters long!',
    funFactUrdu: 'زرافے کی زبان 45 سینٹی میٹر لمبی ہوتی ہے!'
  },
  {
    id: 'eng-h',
    title: 'H / h — Horse',
    titleUrdu: 'حرف H — ہارس (گھوڑا)',
    pronunciation: '/h/ sound as in Horse',
    emoji: '🐴',
    category: 'English',
    letterCase: 'Hh',
    exampleWords: ['Horse', 'Heart', 'House', 'Honey'],
    sentences: [
      'H is for Horse galloping across the meadow.',
      'Keep a loving and truthful heart.',
      'Our house is filled with laughter.',
      'Sweet golden honey is made by bees.'
    ],
    description: 'H is for Horse, kind Heart, cozy House, and sweet Honey!',
    descriptionUrdu: 'H سے بنتا ہے گھوڑا اور محبت بھرا دل!',
    funFact: 'Horses can sleep both standing up and lying down in a safe barn!',
    funFactUrdu: 'گھوڑے کھڑے ہو کر بھی سو سکتے ہیں!'
  },
  {
    id: 'eng-i',
    title: 'I / i — Island',
    titleUrdu: 'حرف I — آئی لینڈ (جزیرہ)',
    pronunciation: '/aɪ/ and /ɪ/ sound as in Island & Igloo',
    emoji: '🏝️',
    category: 'English',
    letterCase: 'Ii',
    exampleWords: ['Island', 'Ice', 'Igloo', 'Ivy'],
    sentences: [
      'I is for tropical Island surrounded by blue sea.',
      'Clear cold ice melts in the warm sun.',
      'An igloo stays surprisingly warm inside.',
      'Green ivy climbs gently up garden walls.'
    ],
    description: 'I is for Island, sparkling Ice, cozy Igloo, and green Ivy!',
    descriptionUrdu: 'I سے بنتا ہے جزیرہ اور برف کا گولا!',
    funFact: 'An island is completely surrounded by water on all sides!',
    funFactUrdu: 'جزیرہ چاروں طرف سے پانی میں گھرا ہوتا ہے!'
  },
  {
    id: 'eng-j',
    title: 'J / j — Jaguar',
    titleUrdu: 'حرف J — جیگوار',
    pronunciation: '/dʒ/ sound as in Jaguar',
    emoji: '🐆',
    category: 'English',
    letterCase: 'Jj',
    exampleWords: ['Jaguar', 'Juice', 'Jungle', 'Joy'],
    sentences: [
      'J is for spotted Jaguar resting on a branch.',
      'Drink fresh orange juice for breakfast.',
      'The green jungle is full of wonder.',
      'Share joy and smiles with your friends.'
    ],
    description: 'J is for swift Jaguar, refreshing Juice, lush Jungle, and pure Joy!',
    descriptionUrdu: 'J سے بنتا ہے چیتا (جیگوار) اور فرحت بخش جوس!',
    funFact: 'Unlike most big cats, jaguars love swimming in forest rivers!',
    funFactUrdu: 'جیگوار کو ندیوں میں تیرنا بہت پسند ہوتا ہے!'
  },
  {
    id: 'eng-k',
    title: 'K / k — Kangaroo',
    titleUrdu: 'حرف K — کینگرو',
    pronunciation: '/k/ sound as in Kangaroo',
    emoji: '🦘',
    category: 'English',
    letterCase: 'Kk',
    exampleWords: ['Kangaroo', 'Kite', 'Koala', 'King'],
    sentences: [
      'K is for Kangaroo hopping with high leaps.',
      'Fly a high red kite on a windy afternoon.',
      'A fluffy koala hugs eucalyptus branches.',
      'A wise king is just, peaceful, and kind.'
    ],
    description: 'K is for leaping Kangaroo, flying Kite, cuddly Koala, and kind King!',
    descriptionUrdu: 'K سے بنتا ہے کینگرو اور ہوا میں اڑتی پتنگ!',
    funFact: 'Mother kangaroos carry their baby joeys in a warm snug pouch!',
    funFactUrdu: 'کینگرو اپنے بچے کو اپنے پیٹ کی تھیلی میں رکھتا ہے!'
  },
  {
    id: 'eng-l',
    title: 'L / l — Lion',
    titleUrdu: 'حرف L — لائن (شیر)',
    pronunciation: '/l/ sound as in Lion',
    emoji: '🦁',
    category: 'English',
    letterCase: 'Ll',
    exampleWords: ['Lion', 'Light', 'Leaf', 'Lemon'],
    sentences: [
      'L is for Lion, the brave king of the plains.',
      'Turn on the light of knowledge in your mind.',
      'A green leaf catches morning dew.',
      'Squeeze sour lemon into cool lemonade.'
    ],
    description: 'L is for majestic Lion, shining Light, green Leaf, and fresh Lemon!',
    descriptionUrdu: 'L سے بنتا ہے بہادر شیر اور علم کی روشنی!',
    funFact: 'A lion roar can be heard across the savanna up to 8 kilometers away!',
    funFactUrdu: 'شیر کی دھاڑ آٹھ کلومیٹر دور تک گونجتی ہے!'
  },
  {
    id: 'eng-m',
    title: 'M / m — Monkey',
    titleUrdu: 'حرف M — منکی (بندر)',
    pronunciation: '/m/ sound as in Monkey',
    emoji: '🐵',
    category: 'English',
    letterCase: 'Mm',
    exampleWords: ['Monkey', 'Moon', 'Mango', 'Mountain'],
    sentences: [
      'M is for Monkey swinging from tree to tree.',
      'The silver moon lights up the quiet night.',
      'Sweet juicy mango is the king of summer fruits.',
      'Climb the mountain with brave steps.'
    ],
    description: 'M is for playful Monkey, silver Moon, sweet Mango, and tall Mountain!',
    descriptionUrdu: 'M سے بنتا ہے بندر، چمکتا چاند اور رسیلا آم!',
    funFact: 'Monkeys peel bananas from the bottom end so they don’t bruise the fruit!',
    funFactUrdu: 'بندر کیلے کو نیچے سے چھیلتے ہیں!'
  },
  {
    id: 'eng-n',
    title: 'N / n — Nest',
    titleUrdu: 'حرف N — نیسٹ (گھونسلا)',
    pronunciation: '/n/ sound as in Nest',
    emoji: '🪺',
    category: 'English',
    letterCase: 'Nn',
    exampleWords: ['Nest', 'Night', 'Nature', 'Nut'],
    sentences: [
      'N is for cozy Nest lined with soft feathers.',
      'The starry night is calm and peaceful.',
      'Protect green nature and plant trees.',
      'Crack a crunchy nut for a healthy snack.'
    ],
    description: 'N is for cozy bird Nest, peaceful Night, green Nature, and tasty Nut!',
    descriptionUrdu: 'N سے بنتا ہے چڑیا کا گھونسلا اور پرسکون رات!',
    funFact: 'Tailorbirds use their beaks like needles to stitch leaves into nests!',
    funFactUrdu: 'درزی چڑیا پتوں کو سی کر اپنا خوبصورت گھونسلا بناتی ہے!'
  },
  {
    id: 'eng-o',
    title: 'O / o — Owl',
    titleUrdu: 'حرف O — آؤل (الو)',
    pronunciation: '/aʊ/ and /ɒ/ sound as in Owl & Orange',
    emoji: '🦉',
    category: 'English',
    letterCase: 'Oo',
    exampleWords: ['Owl', 'Orange', 'Ocean', 'Ostrich'],
    sentences: [
      'O is for wise Owl awake in the moonlight.',
      'Peel an orange full of sweet vitamin C.',
      'The blue ocean holds countless friendly fish.',
      'The ostrich runs as fast as a racing car.'
    ],
    description: 'O is for wise Owl, juicy Orange, deep blue Ocean, and swift Ostrich!',
    descriptionUrdu: 'O سے بنتا ہے سمجھدار الو اور رسیلا مالٹا!',
    funFact: 'Owls have soft feathers that let them fly in total silence!',
    funFactUrdu: 'الو کے پر اتنے نرم ہوتے ہیں کہ وہ مکمل خاموشی سے اڑ سکتا ہے!'
  },
  {
    id: 'eng-p',
    title: 'P / p — Penguin',
    titleUrdu: 'حرف P — پینگوئن',
    pronunciation: '/p/ sound as in Penguin',
    emoji: '🐧',
    category: 'English',
    letterCase: 'Pp',
    exampleWords: ['Penguin', 'Panda', 'Parrot', 'Peach'],
    sentences: [
      'P is for Penguin waddling on snowy ice.',
      'A fluffy panda munches green bamboo.',
      'The green parrot mimics funny words.',
      'A ripe peach tastes sweet and fragrant.'
    ],
    description: 'P is for playful Penguin, gentle Panda, colorful Parrot, and sweet Peach!',
    descriptionUrdu: 'P سے بنتا ہے پینگوئن، پانڈا اور بولنے والا طوطا!',
    funFact: 'Penguins slide on their bellies across the ice like happy little sleds!',
    funFactUrdu: 'پینگوئن برف پر اپنے پیٹ کے بل پھسل کر مزے لیتے ہیں!'
  },
  {
    id: 'eng-q',
    title: 'Q / q — Queen Bee',
    titleUrdu: 'حرف Q — کوئین بی (ملکہ مکھی)',
    pronunciation: '/kw/ sound as in Queen',
    emoji: '👑',
    category: 'English',
    letterCase: 'Qq',
    exampleWords: ['Queen', 'Quiet', 'Quick', 'Quilt'],
    sentences: [
      'Q is for Queen bee leading the buzzing hive.',
      'Be quiet like a mouse in the library.',
      'A quick rabbit darts through the tall grass.',
      'Wrap up in a warm colorful quilt on chilly days.'
    ],
    description: 'Q is for royal Queen, peaceful Quiet, speedy Quick, and cozy Quilt!',
    descriptionUrdu: 'Q سے بنتی ہے ملکہ مکھی اور پرسکون خاموشی!',
    funFact: 'A queen bee can lay up to 2,000 eggs every single day during spring!',
    funFactUrdu: 'ملکہ مکھی بہار کے موسم میں روزانہ دو ہزار انڈے دے سکتی ہے!'
  },
  {
    id: 'eng-r',
    title: 'R / r — Rabbit',
    titleUrdu: 'حرف R — ریبٹ (خرگوش)',
    pronunciation: '/r/ sound as in Rabbit',
    emoji: '🐰',
    category: 'English',
    letterCase: 'Rr',
    exampleWords: ['Rabbit', 'Rainbow', 'Rain', 'Rose'],
    sentences: [
      'R is for fluffy Rabbit nibbling orange carrots.',
      'Look at the seven colors of the rainbow.',
      'Fresh rain makes green fields dance with joy.',
      'The red rose smells sweet in the garden.'
    ],
    description: 'R is for hopping Rabbit, seven-color Rainbow, refreshing Rain, and scented Rose!',
    descriptionUrdu: 'R سے بنتا ہے پیارا خرگوش اور قوسِ قزح!',
    funFact: 'When rabbits are extremely happy, they do a joyful twirl called a binky!',
    funFactUrdu: 'جب خرگوش خوش ہوتے ہیں تو وہ ہوا میں اچھل کر گھومتے ہیں!'
  },
  {
    id: 'eng-s',
    title: 'S / s — Sun',
    titleUrdu: 'حرف S — سن (سورج)',
    pronunciation: '/s/ sound as in Sun',
    emoji: '☀️',
    category: 'English',
    letterCase: 'Ss',
    exampleWords: ['Sun', 'Star', 'Swan', 'Smile'],
    sentences: [
      'S is for warm Sun shining over hills.',
      'Count sparkling stars in the midnight sky.',
      'A graceful white swan glides along the lake.',
      'Give everyone a kind and welcoming smile.'
    ],
    description: 'S is for golden Sun, twinkling Star, graceful Swan, and cheerful Smile!',
    descriptionUrdu: 'S سے بنتا ہے چمکتا سورج اور جگمگاتے ستارے!',
    funFact: 'Sunlight takes about 8 minutes and 20 seconds to travel all the way to Earth!',
    funFactUrdu: 'سورج کی روشنی کو زمین تک پہنچنے میں آٹھ منٹ بیس سیکنڈ لگتے ہیں!'
  },
  {
    id: 'eng-t',
    title: 'T / t — Tiger',
    titleUrdu: 'حرف T — ٹائیگر (شیر / چیتا)',
    pronunciation: '/t/ sound as in Tiger',
    emoji: '🐅',
    category: 'English',
    letterCase: 'Tt',
    exampleWords: ['Tiger', 'Tree', 'Turtle', 'Train'],
    sentences: [
      'T is for Tiger with bold orange and black stripes.',
      'Plant a strong shady tree for the future.',
      'A wise old turtle walks slowly and safely.',
      'The train chugs along winding iron tracks.'
    ],
    description: 'T is for strong Tiger, shady Tree, patient Turtle, and speeding Train!',
    descriptionUrdu: 'T سے بنتا ہے طاقتور ٹائیگر اور ٹھنڈی چھاؤں والا درخت!',
    funFact: 'No two tigers in the entire world have the same pattern of stripes!',
    funFactUrdu: 'دنیا میں کسی دو ٹائیگرز کی دھاریاں ایک جیسی نہیں ہوتیں!'
  },
  {
    id: 'eng-u',
    title: 'U / u — Umbrella',
    titleUrdu: 'حرف U — امبریلا (چھتری)',
    pronunciation: '/ʌ/ sound as in Umbrella',
    emoji: '☂️',
    category: 'English',
    letterCase: 'Uu',
    exampleWords: ['Umbrella', 'Unicorn', 'Urdu', 'Up'],
    sentences: [
      'U is for colorful Umbrella in the rain.',
      'A magical unicorn prances through storybooks.',
      'Urdu is a sweet and poetic language.',
      'Look up at the fluffy white clouds.'
    ],
    description: 'U is for sheltering Umbrella, fantasy Unicorn, beautiful Urdu, and soaring Up!',
    descriptionUrdu: 'U سے بنتی ہے بارش کی چھتری اور خوبصورت اردو زبان!',
    funFact: 'The first umbrellas were invented over 4,000 years ago to provide shade from the sun!',
    funFactUrdu: 'پہلی چھتری چار ہزار سال پہلے دھوپ سے بچاؤ کے لیے بنائی گئی تھی!'
  },
  {
    id: 'eng-v',
    title: 'V / v — Violin',
    titleUrdu: 'حرف V — وائلن (بےلا)',
    pronunciation: '/v/ sound as in Violin',
    emoji: '🎻',
    category: 'English',
    letterCase: 'Vv',
    exampleWords: ['Violin', 'Valley', 'Vegetables', 'Voice'],
    sentences: [
      'V is for Violin playing melodious tunes.',
      'The green valley is carpeted with flowers.',
      'Eat crunchy fresh vegetables for strong bones.',
      'Speak with a gentle and polite voice.'
    ],
    description: 'V is for sweet-toned Violin, scenic Valley, healthy Vegetables, and kind Voice!',
    descriptionUrdu: 'V سے بنتا ہے وائلن اور صحت بخش سبزیاں!',
    funFact: 'Playing the violin exercises both sides of the brain simultaneously!',
    funFactUrdu: 'وائلن بجانے سے دماغ کے دونوں حصے ایک ساتھ متحرک ہوتے ہیں!'
  },
  {
    id: 'eng-w',
    title: 'W / w — Whale',
    titleUrdu: 'حرف W — وہیل (سمندری دیو)',
    pronunciation: '/w/ sound as in Whale',
    emoji: '🐋',
    category: 'English',
    letterCase: 'Ww',
    exampleWords: ['Whale', 'Water', 'Wind', 'Watch'],
    sentences: [
      'W is for blue Whale, the gentlest giant of the sea.',
      'Drink clean fresh water every single day.',
      'The cool evening wind whispers in the leaves.',
      'A ticking watch helps us learn punctuality.'
    ],
    description: 'W is for majestic Whale, life-giving Water, breezy Wind, and shiny Watch!',
    descriptionUrdu: 'W سے بنتی ہے سمندر کی دیوقامت وہیل اور میٹھا پانی!',
    funFact: 'The blue whale heart is as large as a small car and beats slowly!',
    funFactUrdu: 'بلیو وہیل کا دل ایک چھوٹی کار جتنا بڑا ہوتا ہے!'
  },
  {
    id: 'eng-x',
    title: 'X / x — Xylophone',
    titleUrdu: 'حرف X — زائیلوفون (ساز)',
    pronunciation: '/z/ and /ks/ sound as in Xylophone & Fox',
    emoji: '🎵',
    category: 'English',
    letterCase: 'Xx',
    exampleWords: ['Xylophone', 'X-ray', 'Fox', 'Box'],
    sentences: [
      'X is for Xylophone with cheerful rainbow bars.',
      'An X-ray helps doctors see our strong bones.',
      'A clever orange fox tip-toes in the woods.',
      'Open the toy box to share blocks with friends.'
    ],
    description: 'X is for musical Xylophone, helpful X-ray, clever Fox, and wooden Box!',
    descriptionUrdu: 'X سے بنتا ہے رنگ برنگا زائیلوفون اور ایکس رے!',
    funFact: 'The word xylophone comes from ancient words meaning "wooden sound"!',
    funFactUrdu: 'زائیلوفون کا مطلب لکڑی سے پیدا ہونے والی میٹھی آواز ہے!'
  },
  {
    id: 'eng-y',
    title: 'Y / y — Yak',
    titleUrdu: 'حرف Y — یاک (پہاڑی بیل)',
    pronunciation: '/j/ sound as in Yak & Yellow',
    emoji: '🐂',
    category: 'English',
    letterCase: 'Yy',
    exampleWords: ['Yak', 'Yellow', 'Yogurt', 'Yo-yo'],
    sentences: [
      'Y is for furry Yak climbing chilly mountain peaks.',
      'Bright yellow sunflowers turn towards the sun.',
      'Creamy yogurt is packed with good bacteria.',
      'Spin the yo-yo up and down on its string.'
    ],
    description: 'Y is for hardy Yak, sunny Yellow, nutritious Yogurt, and spinning Yo-yo!',
    descriptionUrdu: 'Y سے بنتا ہے یاک اور چمکتا پیلا رنگ!',
    funFact: 'Yaks have dense woolly coats that protect them in freezing snowstorms!',
    funFactUrdu: 'یاک کے گھنے بال اسے سخت ترین سردی اور برف سے بچاتے ہیں!'
  },
  {
    id: 'eng-z',
    title: 'Z / z — Zebra',
    titleUrdu: 'حرف Z — زیبرا',
    pronunciation: '/z/ sound as in Zebra',
    emoji: '🦓',
    category: 'English',
    letterCase: 'Zz',
    exampleWords: ['Zebra', 'Zoo', 'Zigzag', 'Zero'],
    sentences: [
      'Z is for Zebra with stunning black and white stripes.',
      'We visit friendly animals at the leafy zoo.',
      'Follow the playful zigzag path through the garden.',
      'Zero is the magic starting point of numbers.'
    ],
    description: 'Z is for striped Zebra, animal Zoo, fun Zigzag, and foundational Zero!',
    descriptionUrdu: 'Z سے بنتا ہے دھاری دار زیبرا اور چڑیا گھر!',
    funFact: 'Zebra stripes help confuse biting flies and keep them cool under the hot sun!',
    funFactUrdu: 'زیبرا کی دھاریاں کیڑے مکوڑوں کو دور بھگاتی ہیں!'
  }
];

// Complete Urdu Haroof sequence (Alif to Yay) in Nastaliq with full details
export const KIDS_URDU_HAROOF: KidsLearnItem[] = [
  {
    id: 'urd-alif',
    title: 'الف — انار (Alif)',
    titleUrdu: 'الف — انار',
    pronunciation: 'Alif /ا/',
    emoji: '🍎',
    category: 'Urdu',
    exampleWords: ['انار', 'انگور', 'اونٹ', 'استاد'],
    sentences: [
      'الف سے انار، میٹھا اور رس بھرا۔',
      'الف سے انگور کے گچھے بیل پر جھولتے ہیں۔',
      'الف سیدھی اور خوبصورت لکیر کی طرح کھڑا ہوتا ہے۔'
    ],
    description: 'الف اردو حروفِ تہجی کا پہلا اور اہم ترین حرف ہے۔ الف سے انار، انگور اور اونٹ!',
    descriptionUrdu: 'الف بالکل سیدھا ہوتا ہے۔ الف سے انار، انگور، اونٹ اور استاد!',
    funFact: 'اردو دائیں سے بائیں خوبصورت نستعلیق خط میں لکھی جاتی ہے۔',
    funFactUrdu: 'الف پر مد (آ) لگائیں تو آم اور آگ بنتا ہے!'
  },
  {
    id: 'urd-alif-madd',
    title: 'آ — آم (Alif Madd)',
    titleUrdu: 'آ — آم',
    pronunciation: 'Alif Madd /آ/',
    emoji: '🥭',
    category: 'Urdu',
    exampleWords: ['آم', 'آنکھ', 'آسمان', 'آگ'],
    sentences: [
      'آ سے آم، پھلوں کا میٹھا بادشاہ۔',
      'آ سے آنکھ، جس سے ہم دنیا کے رنگ دیکھتے ہیں۔',
      'آسمان پر چمکتا سورج روشنی پھیلاتا ہے۔'
    ],
    description: 'الف کے اوپر مد لگائیں تو آ بنتا ہے، جس سے آم اور آنکھ بنتی ہے!',
    descriptionUrdu: 'آ سے بنتا ہے گرمیوں کا رسیلا آم اور نیلا آسمان!',
    funFact: 'آم پاکستان کا قومی اور سب سے پسندیدہ پھل ہے!',
    funFactUrdu: 'آم دنیا بھر میں اپنی مٹھاس کے لیے مشہور ہے!'
  },
  {
    id: 'urd-bay',
    title: 'ب — بلی (Bay)',
    titleUrdu: 'ب — بلی',
    pronunciation: 'Bay /ب/',
    emoji: '🐱',
    category: 'Urdu',
    exampleWords: ['بلی', 'بکری', 'بستہ', 'بارش'],
    sentences: [
      'ب سے بلی، میانو میانو کرنے والی۔',
      'ب سے بستہ، جس میں ہم اپنی کتابیں رکھتے ہیں۔',
      'ب کے نیچے ایک چمکتا نقطہ ہوتا ہے۔'
    ],
    description: 'ب کی شکل کشتی جیسی ہے اور اس کے نیچے ایک نقطہ سجایا جاتا ہے۔',
    descriptionUrdu: 'ب سے بلی، بکری اور اسکول کا بستہ!',
    funFact: 'کشتی کے نیچے ایک نقطہ ہو تو یہ بے (ب) بنتی ہے!',
    funFactUrdu: 'بے کے خاندان میں پ، ت، ٹ اور ث بھی شامل ہیں!'
  },
  {
    id: 'urd-pay',
    title: 'پ — پتنگ (Pay)',
    titleUrdu: 'پ — پتنگ',
    pronunciation: 'Pay /پ/',
    emoji: '🪁',
    category: 'Urdu',
    exampleWords: ['پتنگ', 'پانی', 'پنکھا', 'پودا'],
    sentences: [
      'پ سے پتنگ، نیلے آسمان پر اڑنے والی۔',
      'پ سے پانی، صاف اور شفاف زندگی کی علامت۔',
      'پ کے نیچے تین نقطے ہوتے ہیں۔'
    ],
    description: 'پ کی شکل کشتی جیسی ہے اور نیچے تین تارے جیسے نقطے ہوتے ہیں۔',
    descriptionUrdu: 'پ سے پتنگ، ٹھنڈا پانی اور ہرا بھرا پودا!',
    funFact: 'تین نقطے مل کر پے کی پیاری اور ملائم آواز بناتے ہیں!',
    funFactUrdu: 'پودے ہمارے لیے آکسیجن تیار کرتے ہیں!'
  },
  {
    id: 'urd-tay',
    title: 'ت — تتلی (Tay)',
    titleUrdu: 'ت — تتلی',
    pronunciation: 'Tay /ت/',
    emoji: '🦋',
    category: 'Urdu',
    exampleWords: ['تتلی', 'تارا', 'تربوز', 'تصویر'],
    sentences: [
      'ت سے تتلی، پھولوں پر منڈلانے والی۔',
      'ت سے تارا، رات کو چمکنے والا۔',
      'ت کے اوپر دو مسکراتے نقطے ہوتے ہیں۔'
    ],
    description: 'ت کی شکل کشتی کی طرح ہے جس کے اوپر دو خوبصورت نقطے ہوتے ہیں۔',
    descriptionUrdu: 'ت سے تتلی اور آسمان پر چمکتا تارا!',
    funFact: 'ت کے اوپر دو نقطے مسکراتی ہوئی دو آنکھوں جیسے لگتے ہیں!',
    funFactUrdu: 'تربوز گرمیوں میں پیاس بجھانے والا میٹھا پھل ہے!'
  },
  {
    id: 'urd-ttay',
    title: 'ٹ — ٹماٹر (Ttay)',
    titleUrdu: 'ٹ — ٹماٹر',
    pronunciation: 'Ttay /ٹ/',
    emoji: '🍅',
    category: 'Urdu',
    exampleWords: ['ٹماٹر', 'ٹوپی', 'ٹرین', 'ٹوکری'],
    sentences: [
      'ٹ سے ٹماٹر، لال اور رس بھرا۔',
      'ٹ سے ٹوپی، سر پر سجانے والی۔',
      'ٹ کے اوپر ایک چھوٹی پیاری طوئے (ط) ہوتی ہے۔'
    ],
    description: 'ٹ کی آواز ذرا بھاری ہوتی ہے اور اس کے اوپر چھوٹی طوئے بنی ہوتی ہے۔',
    descriptionUrdu: 'ٹ سے ٹماٹر، گرمیوں کی ٹوپی اور چھک چھک چلتی ٹرین!',
    funFact: 'اردو میں ٹین، ٹماٹر اور ٹوپی جیسے الفاظ حرف ٹ سے شروع ہوتے ہیں!',
    funFactUrdu: 'ٹماٹر پھل اور سبزی دونوں میں شمار ہوتا ہے!'
  },
  {
    id: 'urd-say',
    title: 'ث — ثمر (Say)',
    titleUrdu: 'ث — ثمر (پھل)',
    pronunciation: 'Say /ث/',
    emoji: '🍇',
    category: 'Urdu',
    exampleWords: ['ثمر', 'ثاقب', 'ثابت'],
    sentences: [
      'ث سے ثمر، یعنی میٹھے اور لذیذ پھل۔',
      'محنت کا ثمر ہمیشہ میٹھا ہوتا ہے۔',
      'ث کے اوپر تین نقطے ایک دوسرے کے اوپر سجتے ہیں۔'
    ],
    description: 'ث سے مراد ثمر یعنی پھل ہے۔ اس کے اوپر تین نقطے ہوتے ہیں۔',
    descriptionUrdu: 'ث سے ثمر یعنی باغ کے تازہ اور لذیذ پھل!',
    funFact: 'ثمر کا مطلب عربی اور اردو میں اچھے کام کا میٹھا بدلہ بھی ہے!',
    funFactUrdu: 'ث کے اوپر تین نقطے تیکون کی طرح سجتے ہیں!'
  },
  {
    id: 'urd-jeem',
    title: 'ج — جگنو (Jeem)',
    titleUrdu: 'ج — جگنو',
    pronunciation: 'Jeem /ج/',
    emoji: '✨',
    category: 'Urdu',
    exampleWords: ['جگنو', 'جہاز', 'جنگل', 'جوتا'],
    sentences: [
      'ج سے جگنو، رات کو روشنی چمکانے والا۔',
      'ج سے جہاز، بادلوں کے اوپر اڑنے والا۔',
      'ج کے پیٹ کے اندر ایک چمکتا نقطہ ہوتا ہے۔'
    ],
    description: 'جیم کا گول پیٹ ہوتا ہے اور اس کے اندر ایک پیارا نقطہ جگمگاتا ہے۔',
    descriptionUrdu: 'ج سے جگنو، ہوائی جہاز اور ہرا بھرا جنگل!',
    funFact: 'جگنو اپنے جسم کے اندر کیمیکل روشنی پیدا کرتے ہیں جو کبھی گرم نہیں ہوتی!',
    funFactUrdu: 'جیم کے پیٹ میں ایک نقطہ ہوتا ہے!'
  },
  {
    id: 'urd-chay',
    title: 'چ — چاند (Chay)',
    titleUrdu: 'چ — چاند',
    pronunciation: 'Chay /چ/',
    emoji: '🌙',
    category: 'Urdu',
    exampleWords: ['چاند', 'چڑیا', 'چابی', 'چائے'],
    sentences: [
      'چ سے چاند، رات کا خوبصورت ساتھی۔',
      'چ سے چڑیا، صبح سویرے چہچہانے والی۔',
      'چ کے پیٹ میں تین نقطے ہوتے ہیں۔'
    ],
    description: 'چ کی شکل جیم جیسی ہے لیکن اس کے پیٹ میں تین نقطے ہوتے ہیں۔',
    descriptionUrdu: 'چ سے چمکتا چاند اور گھونسلے کی ننھی چڑیا!',
    funFact: 'چاند زمین کے گرد 27 دنوں میں ایک چکر پورا کرتا ہے!',
    funFactUrdu: 'چڑیاں ہمارے ماحولیاتی نظام کے لیے بہت اہم ہیں!'
  },
  {
    id: 'urd-hay',
    title: 'ح — حقہ / حلوہ (Hay)',
    titleUrdu: 'ح — حلوہ',
    pronunciation: 'Hay /ح/',
    emoji: '🍯',
    category: 'Urdu',
    exampleWords: ['حلوہ', 'حوض', 'حویلی', 'حفاظت'],
    sentences: [
      'ح سے حلوہ، گرم اور میٹھا لذیذ۔',
      'ح سے حفاظت، بڑوں کے سائے میں محفوظ رہنا۔',
      'ح پر کوئی نقطہ نہیں ہوتا، یہ بالکل صاف ہوتا ہے۔'
    ],
    description: 'ح بالکل نقطوں سے خالی اور خوبصورت گول پیٹ والا ہوتا ہے۔',
    descriptionUrdu: 'ح سے حلوہ اور حویلی!',
    funFact: 'حلق سے ادا ہونے والے حروف میں ح خاص مقام رکھتا ہے!',
    funFactUrdu: 'ح کے اندر یا باہر کوئی نقطہ نہیں ہوتا!'
  },
  {
    id: 'urd-khay',
    title: 'خ — خرگوش (Khay)',
    titleUrdu: 'خ — خرگوش',
    pronunciation: 'Khay /خ/',
    emoji: '🐰',
    category: 'Urdu',
    exampleWords: ['خرگوش', 'خربوزہ', 'خط', 'خوشی'],
    sentences: [
      'خ سے خرگوش، چست اور تیز دوڑنے والا۔',
      'خ سے خربوزہ، گرمیوں کا میٹھا پھل۔',
      'خ کے سر پر ایک چمکتا نقطہ تاج کی طرح ہوتا ہے۔'
    ],
    description: 'خ کے سر پر ایک نقطہ ہوتا ہے اور اس سے خرگوش اور خربوزہ بنتا ہے۔',
    descriptionUrdu: 'خ سے پیارا خرگوش اور میٹھا خربوزہ!',
    funFact: 'خرگوش کے کان بہت حساس ہوتے ہیں اور ہر سمت گھوم سکتے ہیں!',
    funFactUrdu: 'خ کے سر کا نقطہ اسے ح اور ج سے الگ کرتا ہے!'
  },
  {
    id: 'urd-daal',
    title: 'د — درخت (Daal)',
    titleUrdu: 'د — درخت',
    pronunciation: 'Daal /د/',
    emoji: '🌳',
    category: 'Urdu',
    exampleWords: ['درخت', 'دودھ', 'دوات', 'دوست'],
    sentences: [
      'د سے درخت، جو ہمیں ٹھنڈی چھاؤں اور پھل دیتا ہے۔',
      'د سے دودھ، پینے سے بچے طاقتور اور چست بنتے ہیں۔',
      'د بالکل جھکا ہوا محراب کی طرح ہوتا ہے۔'
    ],
    description: 'د سے درخت، صحت بخش دودھ اور پیارا دوست بنتا ہے۔',
    descriptionUrdu: 'د سے سایہ دار درخت اور سچا دوست!',
    funFact: 'ایک بڑا درخت سال بھر میں کئی لوگوں کے لیے آکسیجن مہیا کرتا ہے!',
    funFactUrdu: 'دال کا خاندان د، ڈ، اور ذ پر مشتمل ہے!'
  },
  {
    id: 'urd-ddaal',
    title: 'ڈ — ڈولفن (Ddaal)',
    titleUrdu: 'ڈ — ڈولفن / ڈبہ',
    pronunciation: 'Ddaal /ڈ/',
    emoji: '🐬',
    category: 'Urdu',
    exampleWords: ['ڈولفن', 'ڈبہ', 'ڈاکیہ', 'ڈول'],
    sentences: [
      'ڈ سے ڈولفن، سمندر میں کرتب دکھانے والی۔',
      'ڈ سے ڈاکیہ، ہمارے لیے خط اور خوشیاں لانے والا۔',
      'ڈ کے اوپر چھوٹی طوئے بنی ہوتی ہے۔'
    ],
    description: 'ڈال کے اوپر چھوٹی طوئے ہوتی ہے جس سے اس کی آواز گونجدار بنتی ہے۔',
    descriptionUrdu: 'ڈ سے سمندری ڈولفن اور ڈاکیہ!',
    funFact: 'ڈولفن انسانوں کی دوست اور بے حد ذہین سمندری مخلوق ہے!',
    funFactUrdu: 'ڈولفن سیٹیوں کے ذریعے آپس میں باتیں کرتی ہے!'
  },
  {
    id: 'urd-zaal',
    title: 'ذ — ذخیرہ (Zaal)',
    titleUrdu: 'ذ — ذخیرہ',
    pronunciation: 'Zaal /ذ/',
    emoji: '💎',
    category: 'Urdu',
    exampleWords: ['ذخیرہ', 'ذہین', 'ذائقہ'],
    sentences: [
      'ذ سے ذخیرہ، علم اور معلومات کا خزانہ۔',
      'ذ سے ذہین، محنتی اور چست بچہ۔',
      'ذ کے اوپر ایک نقطہ جگمگاتا ہے۔'
    ],
    description: 'ذ کے اوپر ایک نقطہ ہوتا ہے اور اس سے ذخیرہ اور ذہین بنتا ہے۔',
    descriptionUrdu: 'ذ سے علم کا ذخیرہ اور لذیذ ذائقہ!',
    funFact: 'کتابیں پڑھنے سے ہمارے دماغ میں الفاظ کا شاندار ذخیرہ بنتا ہے!',
    funFactUrdu: 'ذہانت محنت اور توجہ سے بڑھتی ہے!'
  },
  {
    id: 'urd-ray',
    title: 'ر — ریل گاڑی (Ray)',
    titleUrdu: 'ر — ریل گاڑی',
    pronunciation: 'Ray /ر/',
    emoji: '🚂',
    category: 'Urdu',
    exampleWords: ['ریل گاڑی', 'راستہ', 'روشنی', 'رنگ'],
    sentences: [
      'ر سے ریل گاڑی، پٹڑی پر دوڑنے والی۔',
      'ر سے روشنی، اندھیروں کو دور بھگانے والی۔',
      'ر سے رنگ، جو دنیا کو خوبصورت بناتے ہیں۔'
    ],
    description: 'ر کی شکل چھوٹی ڈھلوان جیسی ہے جس پر کوئی نقطہ نہیں ہوتا۔',
    descriptionUrdu: 'ر سے ریل گاڑی اور قوسِ قزح کے رنگ!',
    funFact: 'دنیا کی پہلی مسافر ٹرین 1825 میں چلی تھی!',
    funFactUrdu: 'ر کے خاندان میں ر، ڑ، ز اور ژ شامل ہیں!'
  },
  {
    id: 'urd-seen',
    title: 'س — سورج (Seen)',
    titleUrdu: 'س — سورج',
    pronunciation: 'Seen /س/',
    emoji: '☀️',
    category: 'Urdu',
    exampleWords: ['سورج', 'سیب', 'ستارہ', 'سمندر'],
    sentences: [
      'س سے سورج، صبح کو دنیا کو جگانے والا۔',
      'س سے سیب، صحت بخش اور میٹھا پھل۔',
      'س کے دو دندانے اور ایک پیارا گول پیالہ ہوتا ہے۔'
    ],
    description: 'س کے دو چھوٹے دندانے اور نیچے ایک بڑا گول پیالہ ہوتا ہے۔',
    descriptionUrdu: 'س سے چمکتا سورج اور میٹھا سیب!',
    funFact: 'سورج ہماری زمین کے لیے روشنی اور توانائی کا بنیادی ذریعہ ہے!',
    funFactUrdu: 'سین پر کوئی نقطہ نہیں ہوتا!'
  },
  {
    id: 'urd-sheen',
    title: 'ش — شیر (Sheen)',
    titleUrdu: 'ش — شیر',
    pronunciation: 'Sheen /ش/',
    emoji: '🦁',
    category: 'Urdu',
    exampleWords: ['شیر', 'شہد', 'شاخ', 'شام'],
    sentences: [
      'ش سے شیر، جنگل کا دلیر بادشاہ۔',
      'ش سے شہد، مکھیوں کا میٹھا تحفہ۔',
      'ش کے اوپر تین نقطے جگمگاتے ہیں۔'
    ],
    description: 'ش کے دو دندانے ہوتے ہیں اور اوپر تین نقطے چمکتے ہیں۔',
    descriptionUrdu: 'ش سے بہادر شیر اور شفا بخش شہد!',
    funFact: 'شہد کبھی خراب نہیں ہوتا اور ہزاروں سال محفوظ رہ سکتا ہے!',
    funFactUrdu: 'ش کے تین نقطے اسے س سے الگ بناتے ہیں!'
  },
  {
    id: 'urd-meem',
    title: 'م — مور (Meem)',
    titleUrdu: 'م — مور',
    pronunciation: 'Meem /م/',
    emoji: '🦚',
    category: 'Urdu',
    exampleWords: ['مور', 'مچھلی', 'ماں', 'مسکراہٹ'],
    sentences: [
      'م سے مور، بارش میں پر پھیلا کر ناچنے والا۔',
      'م سے ماں، جس کی گود میں سچی جنت ہے۔',
      'م سے مسکراہٹ، جو ہر اداسی کو دور کرتی ہے۔'
    ],
    description: 'م ایک خوبصورت گول دائرے اور نیچے اترتی ہوئی لکیر سے بنتا ہے۔',
    descriptionUrdu: 'م سے رنگین پروں والا مور اور پیاری ماں!',
    funFact: 'مور کے پروں میں قدرتی رنگوں کی روشنی جھلکتی ہے!',
    funFactUrdu: 'ماں کی خدمت انسان کے لیے سب سے بڑی نیکی ہے!'
  },
  {
    id: 'urd-noon',
    title: 'ن — ناشپاتی (Noon)',
    titleUrdu: 'ن — ناشپاتی / ندی',
    pronunciation: 'Noon /ن/',
    emoji: '🍐',
    category: 'Urdu',
    exampleWords: ['ناشپاتی', 'ندی', 'نیکی', 'نماز'],
    sentences: [
      'ن سے ناشپاتی، رس بھری اور ذائقے دار۔',
      'ن سے ندی، پہاڑوں سے بہتا شفاف پانی۔',
      'ن کے گول پیالے کے بیچ میں ایک نقطہ ہوتا ہے۔'
    ],
    description: 'ن کا گول گہرا پیالہ ہوتا ہے اور اندر ایک نقطہ موتی کی طرح چمکتا ہے۔',
    descriptionUrdu: 'ن سے میٹھی ناشپاتی اور بہتی ہوئی ندی!',
    funFact: 'ناشپاتی میں وٹامنز اور فائبر کی وافر مقدار پائی جاتی ہے!',
    funFactUrdu: 'نون جب جملے کے آخر میں بغیر نقطے کے آئے تو اسے نون غنہ کہتے ہیں!'
  },
  {
    id: 'urd-yay',
    title: 'ی — یکہ (Yay)',
    titleUrdu: 'ی — یکہ',
    pronunciation: 'Yay /ی/ اور /ے/',
    emoji: '🛺',
    category: 'Urdu',
    exampleWords: ['یکہ', 'یادگار', 'یاسمین', 'یقین'],
    sentences: [
      'ی سے یکہ، پرانے وقتوں کی پیاری سواری۔',
      'ی سے یاسمین کا مہکتا ہوا سفید پھول۔',
      'ی چھوٹی اور بڑی دو شکلوں میں آتی ہے۔'
    ],
    description: 'ی اردو حروفِ تہجی کا آخری اور دلکش حرف ہے جو چھوٹی ی اور بڑی ے میں لکھا جاتا ہے۔',
    descriptionUrdu: 'ی سے یکہ اور خوشبودار یاسمین کا پھول!',
    funFact: 'یاسمین (چمبیلی) پاکستان کا قومی پھول ہے!',
    funFactUrdu: 'چھوٹی ی اور بڑی ے اردو کے خوبصورت لہجے کو مکمل کرتے ہیں!'
  }
];
