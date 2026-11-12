import {
  KidsLearnCategory,
  KidsStoryItem,
  KidsPracticeItem,
  KidsGrowItem,
  KidsDailyQuestItem,
} from '../types/kids';
import { ALL_KIDS_LEARN_CATEGORIES } from './kidsExpandedLearn';
import { ALL_KIDS_STORIES } from './kidsStories';
import { ALL_KIDS_PRACTICE_ITEMS } from './kidsPracticeData';

// Re-export full rich educational collections
export const KIDS_LEARN_CATEGORIES: KidsLearnCategory[] = ALL_KIDS_LEARN_CATEGORIES;
export const KIDS_PRACTICE_ITEMS: KidsPracticeItem[] = ALL_KIDS_PRACTICE_ITEMS;
export const KIDS_STORIES_DATA: KidsStoryItem[] = ALL_KIDS_STORIES;

export const KIDS_GROW_DATA: KidsGrowItem[] = [
  {
    id: 'grow-feelings',
    title: 'Understanding My Big Feelings',
    titleUrdu: 'میرے جذبات اور احساسات',
    category: 'emotions',
    emoji: '😊',
    description: 'It is okay to feel happy, sad, angry, or excited. Taking a slow deep breath helps our heart feel calm!',
    descriptionUrdu: 'خوش ہونا، غصہ آنا یا اداس ہونا معمول کی بات ہے۔ لمبی سانس لینے سے دل پرسکون ہو جاتا ہے۔',
    tips: [
      'Take 3 slow deep breaths when upset 🌬️',
      'Talk with Mom or Dad about what made you feel that way 💬',
      'Draw your feelings on paper with colors 🎨'
    ],
    actionPrompt: 'Place your hand on your belly and take a gentle balloon breath! 🎈'
  },
  {
    id: 'grow-habits',
    title: 'Super Daily Habits',
    titleUrdu: 'شاندار روزمرہ عادات',
    category: 'habits',
    emoji: '🪥',
    description: 'Small good habits every day make you strong, smart, and cheerful!',
    descriptionUrdu: 'روزانہ دانت صاف کرنا، وقت پر سونا اور ہاتھ دھونا ہمیں صحت مند رکھتا ہے۔',
    tips: [
      'Brush teeth twice a day: morning & bedtime ✨',
      'Wash hands with soap before eating and after play 🧼',
      'Drink clean water and eat crunchy fresh fruits 🍎',
      'Say "Please" and "Thank You" with a smile 😊'
    ],
    actionPrompt: 'Let’s wash hands together with the 20-second bubbly song!'
  },
  {
    id: 'grow-kindness',
    title: 'Kindness & Helping Others',
    titleUrdu: 'ہمدردی اور دوسروں کی مدد',
    category: 'kindness',
    emoji: '🤝',
    description: 'A kind word is like a sunflower on a rainy day. Helping your friend makes everyone smile!',
    descriptionUrdu: 'میٹھی بات اور کسی کی مدد کرنا دلوں میں محبت پیدا کرتا ہے۔',
    tips: [
      'Share your favorite toy or color pencil 🖍️',
      'Help pick up toys when playtime is over 🧸',
      'Cheer up a friend who looks lonely or sad 💛'
    ],
    actionPrompt: 'Give someone at home a warm hug or a high five right now!'
  },
  {
    id: 'grow-safety',
    title: 'Personal Safety & Smart Rules',
    titleUrdu: 'حفاظت اور سمجھداری کے اصول',
    category: 'safety',
    emoji: '🛡️',
    description: 'Your body belongs to you. Always stay close to parents and tell a trusted adult if anything feels wrong.',
    descriptionUrdu: 'ہمیشہ اپنے امی ابو کے ساتھ رہیں اور کسی انجان شخص کی بات نہ مانیں۔',
    tips: [
      'Hold an adult hand when crossing streets 🚦',
      'Never go anywhere with strangers without asking parents 🚫',
      'Remember your parent telephone number or home address 📞'
    ],
    actionPrompt: 'Practice reciting your parent’s phone number or name!'
  }
];

export const KIDS_DAILY_QUESTS: KidsDailyQuestItem[] = [
  {
    id: 'quest-learn',
    title: 'Explore 1 Learn Topic',
    titleUrdu: 'ایک نیا سبق سیکھیں',
    section: 'learn',
    icon: '📚',
    stars: 2,
    completed: false
  },
  {
    id: 'quest-play',
    title: 'Win 1 Fun Minigame',
    titleUrdu: 'کوئی ایک دلچسپ گیم جیتیں',
    section: 'play',
    icon: '🎮',
    stars: 2,
    completed: false
  },
  {
    id: 'quest-practice',
    title: 'Trace 1 Letter or Number',
    titleUrdu: 'ایک حرف یا ہندسہ ٹریس کریں',
    section: 'practice',
    icon: '✏️',
    stars: 2,
    completed: false
  },
  {
    id: 'quest-story',
    title: 'Read & Listen to 1 Moral Story',
    titleUrdu: 'ایک سبق آموز کہانی سنیں',
    section: 'stories',
    icon: '✨',
    stars: 3,
    completed: false
  },
  {
    id: 'quest-think',
    title: 'Solve 1 Think Puzzle',
    titleUrdu: 'ایک ذہنی معمہ حل کریں',
    section: 'think',
    icon: '🧩',
    stars: 2,
    completed: false
  }
];
