import {
  KidsNotificationItem,
  KidsSavedItem,
  KidsRecentItem,
  KidsContinueItem,
  KidsSectionType,
} from '../types/kids';

const STORAGE_KEYS = {
  FAVORITES: 'kids_favorites_items',
  SAVED: 'kids_saved_items',
  RECENT: 'kids_recent_items',
  CONTINUE: 'kids_continue_items',
  NOTIFICATIONS: 'kids_notifications_items',
};

const INITIAL_NOTIFICATIONS: KidsNotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Story Added! 🦄',
    titleUrdu: 'نئی سبق آموز کہانی شامل ہوئی!',
    message: 'Listen to "The Brave Little Firefly’s Lantern" with audio narration.',
    messageUrdu: 'سنیں "بہادر جگنو کی ننھی لالٹین" آواز اور خوبصورت سبق کے ساتھ۔',
    type: 'story',
    read: false,
    timestamp: 'Today',
    icon: '✨',
  },
  {
    id: 'notif-2',
    title: 'Daily Wonder Quest Ready! ☀️',
    titleUrdu: 'آج کا تعلیمی مشن تیار ہے!',
    message: 'Complete 5 mini missions to earn bonus stars and grow your streak.',
    messageUrdu: 'پانچ آسان مشنز مکمل کر کے اضافی ستارے کمائیں۔',
    type: 'quest',
    read: false,
    timestamp: 'Today',
    icon: '🎯',
  },
  {
    id: 'notif-3',
    title: 'Practice Reminder ✍️',
    titleUrdu: 'خوش خطی اور ٹریسنگ کی مشق',
    message: 'Trace Urdu Haroof (الف، ب، پ) and English ABC letters today.',
    messageUrdu: 'آج حروف تہجی اور اے بی سی ٹریس کرنے کی مشق کریں۔',
    type: 'practice',
    read: true,
    timestamp: 'Yesterday',
    icon: '✏️',
  },
  {
    id: 'notif-4',
    title: 'Parent Safe Mode Active 🛡️',
    titleUrdu: 'والدین کا محفوظ کنٹرول فعال ہے',
    message: 'Kids Light World is running in 100% child-safe distraction-free mode.',
    messageUrdu: 'کڈز لائٹ ورلڈ مکمل محفوظ اور اشتہارات سے پاک ماحول میں فعال ہے۔',
    type: 'parent',
    read: true,
    timestamp: '2 days ago',
    icon: '🛡️',
  },
];

const INITIAL_CONTINUE: KidsContinueItem[] = [
  {
    id: 'cont-1',
    contentId: 'eng-b',
    title: 'Letter B — Butterfly',
    titleUrdu: 'حرف B — تتلی',
    category: 'English',
    section: 'learn',
    progressPercent: 75,
    lastVisited: 'Today',
    emoji: '🦋',
  },
  {
    id: 'cont-2',
    contentId: 'prc-urd-alif',
    title: 'Tracing Alif (الف)',
    titleUrdu: 'الف کی خوش خطی',
    category: 'Practice',
    section: 'practice',
    progressPercent: 60,
    lastVisited: 'Today',
    emoji: '✍️',
  },
  {
    id: 'cont-3',
    contentId: 'story-firefly',
    title: "The Brave Little Firefly's Lantern",
    titleUrdu: 'بہادر جگنو کی ننھی لالٹین',
    category: 'Stories',
    section: 'stories',
    progressPercent: 40,
    lastVisited: 'Yesterday',
    emoji: '✨',
  },
];

class KidsStorageService {
  // --- FAVORITES ---
  public getFavorites(): KidsSavedItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public isFavorite(contentId: string): boolean {
    const list = this.getFavorites();
    return list.some((item) => item.contentId === contentId);
  }

  public toggleFavorite(item: Omit<KidsSavedItem, 'dateSaved' | 'id'>): boolean {
    try {
      const list = this.getFavorites();
      const existingIdx = list.findIndex((i) => i.contentId === item.contentId);
      let isFavNow = false;

      if (existingIdx >= 0) {
        list.splice(existingIdx, 1);
        isFavNow = false;
      } else {
        list.unshift({
          ...item,
          id: `fav-${Date.now()}`,
          dateSaved: new Date().toLocaleDateString(),
          isFavorite: true,
        });
        isFavNow = true;
      }

      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
      return isFavNow;
    } catch {
      return false;
    }
  }

  // --- SAVED / BOOKMARKS ---
  public getSaved(): KidsSavedItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public isSaved(contentId: string): boolean {
    const list = this.getSaved();
    return list.some((item) => item.contentId === contentId);
  }

  public toggleSaved(item: Omit<KidsSavedItem, 'dateSaved' | 'id'>): boolean {
    try {
      const list = this.getSaved();
      const existingIdx = list.findIndex((i) => i.contentId === item.contentId);
      let isSavedNow = false;

      if (existingIdx >= 0) {
        list.splice(existingIdx, 1);
        isSavedNow = false;
      } else {
        list.unshift({
          ...item,
          id: `save-${Date.now()}`,
          dateSaved: new Date().toLocaleDateString(),
          isSaved: true,
        });
        isSavedNow = true;
      }

      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(list));
      return isSavedNow;
    } catch {
      return false;
    }
  }

  // --- RECENTLY VIEWED ---
  public getRecentlyViewed(): KidsRecentItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RECENT);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public addRecentlyViewed(item: Omit<KidsRecentItem, 'id' | 'lastVisited'>): void {
    try {
      let list = this.getRecentlyViewed();
      // Remove duplicate if already exists
      list = list.filter((i) => i.contentId !== item.contentId);
      // Insert to front
      list.unshift({
        ...item,
        id: `rec-${Date.now()}`,
        lastVisited: 'Just now',
      });
      // Limit to 6 items
      if (list.length > 6) {
        list = list.slice(0, 6);
      }
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(list));
    } catch {}
  }

  // --- CONTINUE LEARNING ---
  public getContinueLearning(): KidsContinueItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTINUE);
      return data ? JSON.parse(data) : INITIAL_CONTINUE;
    } catch {
      return INITIAL_CONTINUE;
    }
  }

  public updateContinueLearning(item: Omit<KidsContinueItem, 'id' | 'lastVisited'>): void {
    try {
      let list = this.getContinueLearning();
      const idx = list.findIndex((i) => i.contentId === item.contentId);
      if (idx >= 0) {
        list[idx] = {
          ...list[idx],
          progressPercent: item.progressPercent,
          lastVisited: 'Just now',
        };
      } else {
        list.unshift({
          ...item,
          id: `cont-${Date.now()}`,
          lastVisited: 'Just now',
        });
      }
      if (list.length > 6) {
        list = list.slice(0, 6);
      }
      localStorage.setItem(STORAGE_KEYS.CONTINUE, JSON.stringify(list));
    } catch {}
  }

  // --- NOTIFICATIONS ---
  public getNotifications(): KidsNotificationItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  public markNotificationAsRead(id: string): KidsNotificationItem[] {
    try {
      const list = this.getNotifications().map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      return list;
    } catch {
      return [];
    }
  }

  public markAllNotificationsAsRead(): KidsNotificationItem[] {
    try {
      const list = this.getNotifications().map((n) => ({ ...n, read: true }));
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      return list;
    } catch {
      return [];
    }
  }

  public clearNotification(id: string): KidsNotificationItem[] {
    try {
      const list = this.getNotifications().filter((n) => n.id !== id);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
      return list;
    } catch {
      return [];
    }
  }

  // --- CLAIMED REWARDS & ANTI-EXPLOIT TRACKING ---
  public isLearned(itemId: string): boolean {
    try {
      const data = localStorage.getItem('kids_learned_items');
      const list: string[] = data ? JSON.parse(data) : [];
      return list.includes(itemId);
    } catch {
      return false;
    }
  }

  public markLearned(itemId: string): boolean {
    try {
      const data = localStorage.getItem('kids_learned_items');
      const list: string[] = data ? JSON.parse(data) : [];
      if (!list.includes(itemId)) {
        list.push(itemId);
        localStorage.setItem('kids_learned_items', JSON.stringify(list));
        return true; // Newly learned
      }
      return false; // Already learned
    } catch {
      return false;
    }
  }

  public isStoryClaimed(storyId: string): boolean {
    try {
      const data = localStorage.getItem('kids_story_rewards');
      const list: string[] = data ? JSON.parse(data) : [];
      return list.includes(storyId);
    } catch {
      return false;
    }
  }

  public markStoryClaimed(storyId: string): boolean {
    try {
      const data = localStorage.getItem('kids_story_rewards');
      const list: string[] = data ? JSON.parse(data) : [];
      if (!list.includes(storyId)) {
        list.push(storyId);
        localStorage.setItem('kids_story_rewards', JSON.stringify(list));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public isHabitDone(habitId: string): boolean {
    try {
      const today = new Date().toDateString();
      const data = localStorage.getItem(`kids_habits_${today}`);
      const list: string[] = data ? JSON.parse(data) : [];
      return list.includes(habitId);
    } catch {
      return false;
    }
  }

  public markHabitDone(habitId: string): boolean {
    try {
      const today = new Date().toDateString();
      const data = localStorage.getItem(`kids_habits_${today}`);
      const list: string[] = data ? JSON.parse(data) : [];
      if (!list.includes(habitId)) {
        list.push(habitId);
        localStorage.setItem(`kids_habits_${today}`, JSON.stringify(list));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public isQuestClaimedToday(): boolean {
    try {
      const today = new Date().toDateString();
      const savedDate = localStorage.getItem('kids_quest_claimed_date');
      return savedDate === today;
    } catch {
      return false;
    }
  }

  public markQuestClaimedToday(): boolean {
    try {
      const today = new Date().toDateString();
      localStorage.setItem('kids_quest_claimed_date', today);
      return true;
    } catch {
      return false;
    }
  }
}

export const kidsStorage = new KidsStorageService();
