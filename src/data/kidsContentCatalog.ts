export interface KidsCatalogTopic {
  id: string;
  topic: string;
  topicSlug: string;
  category:
    | 'Alphabet'
    | 'Numbers'
    | 'Animals'
    | 'Fruits'
    | 'Vegetables'
    | 'Colors'
    | 'Shapes'
    | 'Vehicles'
    | 'Birds'
    | 'Body Parts'
    | 'Opposites'
    | 'Days'
    | 'Months'
    | 'Basic Words'
    | 'Phonics'
    | 'Stories'
    | 'Activities';
  letterOrNumber?: string;
  primaryWord: string;
  wordUrdu: string;
  phonicsSound: string;
  visualEmoji: string;
  primaryColor: string;
  secondaryColor: string;
  targetAge: string;
  voiceScript: string;
  educationalFact: string;
}

export const MASTER_KIDS_CONTENT_CATALOG: KidsCatalogTopic[] = [
  // =========================================================================
  // 1. ALPHABET A-Z (Phonics, Letter Recognition, Spelling)
  // =========================================================================
  {
    id: 'kid-alpha-a',
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
    targetAge: '2-4 years',
    voiceScript: 'A is for Apple! A shiny, sweet, red apple! Apple starts with the letter A. Can you say Apple? A... Apple! Great job, little star!',
    educationalFact: 'Apples grow on trees and come in red, green, and yellow colors!',
  },
  {
    id: 'kid-alpha-b',
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
    targetAge: '2-4 years',
    voiceScript: 'B is for Ball! A bouncy, round, colorful ball! Boing, boing, boing! Ball starts with the letter B. Can you bounce like a ball? B... Ball! Fantastic!',
    educationalFact: 'Balls are round spheres that bounce, roll, and bring active joy to playtime!',
  },
  {
    id: 'kid-alpha-c',
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
    targetAge: '2-4 years',
    voiceScript: 'C is for Cat! A soft, cute, furry cat! Meow, meow! Cat starts with the letter C. Can you say meow? C... Cat! You are so smart!',
    educationalFact: 'Cats can hear sounds four times farther away than humans!',
  },
  {
    id: 'kid-alpha-d',
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
    targetAge: '2-4 years',
    voiceScript: 'D is for Duck! A cheerful yellow duck swimming on the pond! Quack, quack! Duck starts with the letter D. Quack like a duck! D... Duck! Wonderful!',
    educationalFact: 'Ducks have waterproof feathers that keep them warm and dry while swimming!',
  },
  {
    id: 'kid-alpha-e',
    topic: 'E for Elephant',
    topicSlug: 'e_for_elephant',
    category: 'Alphabet',
    letterOrNumber: 'E',
    primaryWord: 'ELEPHANT',
    wordUrdu: 'ہاتھی (Elephant)',
    phonicsSound: '/e/ /e/ Elephant',
    visualEmoji: '🐘',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    targetAge: '2-4 years',
    voiceScript: 'E is for Elephant! A friendly, giant elephant with big ears and a long trunk! Pawoo! Elephant starts with the letter E. Can you say Elephant? E... Elephant! Super!',
    educationalFact: 'Elephants are the largest land animals and love spraying water with their trunks!',
  },
  {
    id: 'kid-alpha-f',
    topic: 'F for Fish',
    topicSlug: 'f_for_fish',
    category: 'Alphabet',
    letterOrNumber: 'F',
    primaryWord: 'FISH',
    wordUrdu: 'مچھلی (Fish)',
    phonicsSound: '/f/ /f/ Fish',
    visualEmoji: '🐠',
    primaryColor: '#06b6d4',
    secondaryColor: '#3b82f6',
    targetAge: '2-4 years',
    voiceScript: 'F is for Fish! A sparkling, colorful fish swimming in the deep blue ocean! Splish, splash! Fish starts with the letter F. Swim like a fish! F... Fish! Great job!',
    educationalFact: 'Fish breathe underwater using special organs called gills!',
  },
  {
    id: 'kid-alpha-g',
    topic: 'G for Grapes',
    topicSlug: 'g_for_grapes',
    category: 'Alphabet',
    letterOrNumber: 'G',
    primaryWord: 'GRAPES',
    wordUrdu: 'انگور (Grapes)',
    phonicsSound: '/g/ /g/ Grapes',
    visualEmoji: '🍇',
    primaryColor: '#9333ea',
    secondaryColor: '#a855f7',
    targetAge: '2-4 years',
    voiceScript: 'G is for Grapes! Juicy, sweet purple grapes growing in pretty bunches! Yummy, yummy! Grapes start with the letter G. G... Grapes! You are a champion!',
    educationalFact: 'Grapes can be purple, red, or green, and they are packed with healthy vitamins!',
  },
  {
    id: 'kid-alpha-h',
    topic: 'H for Horse',
    topicSlug: 'h_for_horse',
    category: 'Alphabet',
    letterOrNumber: 'H',
    primaryWord: 'HORSE',
    wordUrdu: 'گھوڑا (Horse)',
    phonicsSound: '/h/ /h/ Horse',
    visualEmoji: '🐴',
    primaryColor: '#b45309',
    secondaryColor: '#f59e0b',
    targetAge: '2-4 years',
    voiceScript: 'H is for Horse! A strong, galloping horse running across the green meadows! Neigh! Horse starts with the letter H. Gallop, gallop! H... Horse! Brilliant!',
    educationalFact: 'Horses can run very fast shortly after being born and can sleep both lying down and standing up!',
  },

  // =========================================================================
  // 2. NUMBERS (Early Math & Counting)
  // =========================================================================
  {
    id: 'kid-num-1',
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
    targetAge: '2-4 years',
    voiceScript: 'Look up! It is Number 1! One bright shining sun in the sky! Show me one finger! 1! Number 1 is for One! Great counting!',
    educationalFact: 'The Sun gives warmth and light to all living things on Earth!',
  },
  {
    id: 'kid-num-2',
    topic: 'Number 2 - Two Cute Little Birds',
    topicSlug: 'number_2_birds',
    category: 'Numbers',
    letterOrNumber: '2',
    primaryWord: 'TWO',
    wordUrdu: 'دو (Two)',
    phonicsSound: 'Number 2',
    visualEmoji: '🐦',
    primaryColor: '#0284c7',
    secondaryColor: '#38bdf8',
    targetAge: '2-4 years',
    voiceScript: 'Here comes Number 2! One, Two! Two little birds singing a happy song on a branch! Tweet, tweet! Show me two fingers! Number 2! Wonderful!',
    educationalFact: 'Birds build cozy nests using twigs, moss, and leaves to protect their eggs!',
  },
  {
    id: 'kid-num-3',
    topic: 'Number 3 - Three Little Stars',
    topicSlug: 'number_3_stars',
    category: 'Numbers',
    letterOrNumber: '3',
    primaryWord: 'THREE',
    wordUrdu: 'تین (Three)',
    phonicsSound: 'Number 3',
    visualEmoji: '⭐',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ec4899',
    targetAge: '2-4 years',
    voiceScript: 'Count with me: One, Two, Three! Three twinkling gold stars lighting up the night! Twinkle, twinkle! That is Number 3! Awesome job!',
    educationalFact: 'Stars are giant glowing balls of warm gas far away in the universe!',
  },

  // =========================================================================
  // 3. ANIMALS (Kindness & Biodiversity)
  // =========================================================================
  {
    id: 'kid-anim-lion',
    topic: 'The Gentle Lion King',
    topicSlug: 'animal_gentle_lion',
    category: 'Animals',
    primaryWord: 'LION',
    wordUrdu: 'ببر شیر (Lion)',
    phonicsSound: 'Roar! Lion',
    visualEmoji: '🦁',
    primaryColor: '#d97706',
    secondaryColor: '#f59e0b',
    targetAge: '3-6 years',
    voiceScript: 'Meet the Lion! The king of the jungle with a majestic golden mane! Roar! Lions are brave and protect their families. Can you give a gentle roar? Lion! Super brave!',
    educationalFact: 'Lions live in family groups called prides and rest together in shady spots!',
  },
  {
    id: 'kid-anim-bunny',
    topic: 'The Bouncy Little Bunny',
    topicSlug: 'animal_bouncy_bunny',
    category: 'Animals',
    primaryWord: 'BUNNY',
    wordUrdu: 'خرگوش (Rabbit)',
    phonicsSound: 'Hop, Hop! Bunny',
    visualEmoji: '🐰',
    primaryColor: '#ec4899',
    secondaryColor: '#f472b6',
    targetAge: '2-5 years',
    voiceScript: 'Hop, hop, hop! Here comes a friendly little Bunny! Bunnies have long soft ears and love crunchy orange carrots! Hop with the bunny! Hop, hop! Bunny! So cute!',
    educationalFact: 'Bunnies can turn their ears 180 degrees to listen in all directions!',
  },

  // =========================================================================
  // 4. FRUITS & VEGETABLES (Healthy Habits)
  // =========================================================================
  {
    id: 'kid-fruit-mango',
    topic: 'Sweet King Mango',
    topicSlug: 'fruit_sweet_mango',
    category: 'Fruits',
    primaryWord: 'MANGO',
    wordUrdu: 'آم (Mango)',
    phonicsSound: 'Mmm Mango',
    visualEmoji: '🥭',
    primaryColor: '#f59e0b',
    secondaryColor: '#eab308',
    targetAge: '2-6 years',
    voiceScript: 'Mmm! It is Mango! The sweet, golden King of Fruits! Juicy, sunny, and delicious! Eating fresh fruit keeps us strong and energetic. Can you say Mango? Mango! Delicious!',
    educationalFact: 'Mangoes are loved around the world and are the national fruit of Pakistan!',
  },
  {
    id: 'kid-veg-carrot',
    topic: 'Crunchy Orange Carrot',
    topicSlug: 'veg_crunchy_carrot',
    category: 'Vegetables',
    primaryWord: 'CARROT',
    wordUrdu: 'گاجر (Carrot)',
    phonicsSound: 'Crunch! Carrot',
    visualEmoji: '🥕',
    primaryColor: '#ea580c',
    secondaryColor: '#22c55e',
    targetAge: '2-6 years',
    voiceScript: 'Crunch, crunch! It is an orange Carrot! Carrots grow under the soil and are super healthy for bright, sparkling eyes. Crunch like a bunny! Carrot! Great health!',
    educationalFact: 'Carrots have Vitamin A which helps us see clearly and stay healthy!',
  },

  // =========================================================================
  // 5. COLORS & SHAPES (Visual Intelligence)
  // =========================================================================
  {
    id: 'kid-color-blue',
    topic: 'The Color Ocean Blue',
    topicSlug: 'color_ocean_blue',
    category: 'Colors',
    primaryWord: 'BLUE',
    wordUrdu: 'نیلا (Blue)',
    phonicsSound: 'Color Blue',
    visualEmoji: '🌊',
    primaryColor: '#0284c7',
    secondaryColor: '#38bdf8',
    targetAge: '2-5 years',
    voiceScript: 'Look all around: What color is the vast ocean and the clear daytime sky? It is Blue! Gentle, calming Blue! Can you find something Blue around you? Blue! Excellent!',
    educationalFact: 'Blue is the most popular favorite color in the world!',
  },
  {
    id: 'kid-shape-circle',
    topic: 'The Smiling Happy Circle',
    topicSlug: 'shape_smiling_circle',
    category: 'Shapes',
    primaryWord: 'CIRCLE',
    wordUrdu: 'دائرہ (Circle)',
    phonicsSound: 'Round Circle',
    visualEmoji: '⭕',
    primaryColor: '#ec4899',
    secondaryColor: '#f43f5e',
    targetAge: '2-5 years',
    voiceScript: 'Round and round we go! It is a Circle! A circle has no sharp corners, just a smooth round curve! Like a coin, a clock, or a wheel! Draw a circle in the air! Circle! Perfect!',
    educationalFact: 'Wheels on cars, bicycles, and trains are circles so they can roll smoothly!',
  },

  // =========================================================================
  // 6. VEHICLES (Exploration & Movement)
  // =========================================================================
  {
    id: 'kid-veh-train',
    topic: 'The Cheerful Train Ride',
    topicSlug: 'vehicle_cheerful_train',
    category: 'Vehicles',
    primaryWord: 'TRAIN',
    wordUrdu: 'ریل گاڑی (Train)',
    phonicsSound: 'Choo Choo! Train',
    visualEmoji: '🚂',
    primaryColor: '#ef4444',
    secondaryColor: '#3b82f6',
    targetAge: '2-6 years',
    voiceScript: 'Choo, choo! Chugga, chugga, chugga, chugga! Here comes the train rolling down the track! The train carries happy travelers across cities and mountains! Choo choo! Train! All aboard!',
    educationalFact: 'Trains travel on steel railway tracks and can carry hundreds of people together!',
  },
];
