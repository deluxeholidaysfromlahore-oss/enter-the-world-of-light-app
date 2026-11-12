import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHATS_STORAGE_DIR = path.resolve(process.cwd(), 'public/storage/chats');
const CHAT_13_FILE = path.join(CHATS_STORAGE_DIR, 'chat_13.json');
const CHAT_15_FILE = path.join(CHATS_STORAGE_DIR, 'chat_15.json');
const LINKED_CONTEXT_FILE = path.join(CHATS_STORAGE_DIR, 'linked_context.json');

// Ensure directory exists
try {
  if (!fs.existsSync(CHATS_STORAGE_DIR)) {
    fs.mkdirSync(CHATS_STORAGE_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('[ChatStorage] Directory creation note:', e);
}

export interface StoredChatMessage {
  id: string;
  chatId: '13' | '15';
  sender: 'user' | 'ai';
  text: string;
  urdu?: string;
  time: string;
  timestamp: number;
  linkedFromChat?: '13' | '15';
  workflow?: 'page' | 'post' | 'general' | 'poetry' | 'quiz';
  generatedRecord?: any;
}

export interface LinkedChatContext {
  lastUpdated: string;
  activeTopic: string;
  sharedDraft?: string;
  sharedPayload?: any;
  sourceChatId?: '13' | '15';
  crossReferences: {
    chat13MessageId?: string;
    chat15RecordId?: string;
    summary: string;
    timestamp: string;
  }[];
}

// Initial seed messages
const SEED_CHAT_13: StoredChatMessage[] = [
  {
    id: 'msg-13-init',
    chatId: '13',
    sender: 'ai',
    text: 'Welcome! I am your Light & Laughter AI Learning Companion (Chat #13). Ask me anything in Urdu or English about literature, science, or learning concepts. I am also linked directly with Blogger Studio (Chat #15) and synchronized with Google Drive folder "Ai Studio - Kids Mode Data Save" (1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4).',
    urdu: 'خوش آمدید! میں آپ کا ہوشمند تعلیمی معاون (چیٹ نمبر 13) ہوں۔ یہ چیٹ بلاگر اسٹوڈیو (چیٹ 15) اور گوگل ڈرائیو کے ساتھ مربوط ہے۔',
    time: '09:00 AM',
    timestamp: Date.now() - 100000,
    workflow: 'general',
  },
];

const SEED_CHAT_15: StoredChatMessage[] = [
  {
    id: 'msg-15-init',
    chatId: '15',
    sender: 'ai',
    text: 'Welcome to Google Blogger & Shorts Studio (Chat #15)! This chat is linked with AI Assistant (Chat #13) and configured for Google Drive folder "Ai Studio - Kids Mode Data Save" (https://drive.google.com/drive/folders/1xF20AGja1DPmxS1NV1sXWOt84LLi3wN4?usp=drive_link). Tell me what educational topic or YouTube Short you want to synthesize into an SEO-ready Google Blogger post.',
    urdu: 'خوش آمدید! یہ گوگل بلاگر اور شارٹس اسٹوڈیو (چیٹ نمبر 15) ہے۔ یہ چیٹ تعلیمی معاون (چیٹ 13) اور کڈز موڈ ڈرائیو کے ساتھ جڑی ہوئی ہے۔',
    time: '09:05 AM',
    timestamp: Date.now() - 50000,
    workflow: 'post',
  },
];

function getFilePath(chatId: string): string {
  return chatId === '15' ? CHAT_15_FILE : CHAT_13_FILE;
}

// Auto-seed files on startup if not present
try {
  if (!fs.existsSync(CHAT_13_FILE)) {
    fs.writeFileSync(CHAT_13_FILE, JSON.stringify(SEED_CHAT_13, null, 2), 'utf-8');
  }
  if (!fs.existsSync(CHAT_15_FILE)) {
    fs.writeFileSync(CHAT_15_FILE, JSON.stringify(SEED_CHAT_15, null, 2), 'utf-8');
  }
} catch (e) {
  console.warn('[ChatStorage] Error initializing seed files:', e);
}

export function getChatHistory(chatId: string): StoredChatMessage[] {
  const filePath = getFilePath(chatId);
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.error(`[ChatStorage] Error reading chat_${chatId}:`, err);
  }

  // Fallback to seed
  const seed = chatId === '15' ? SEED_CHAT_15 : SEED_CHAT_13;
  saveChatHistory(chatId, seed);
  return seed;
}

export function saveChatHistory(chatId: string, messages: StoredChatMessage[]): void {
  const filePath = getFilePath(chatId);
  try {
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[ChatStorage] Error writing chat_${chatId}:`, err);
  }
}

export function appendChatMessage(chatId: '13' | '15', message: Omit<StoredChatMessage, 'id' | 'timestamp'>): StoredChatMessage {
  const history = getChatHistory(chatId);
  const newMsg: StoredChatMessage = {
    id: `msg-${chatId}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    timestamp: Date.now(),
    ...message,
  };
  history.push(newMsg);
  // Keep last 150 messages per chat to prevent memory bloat
  const trimmed = history.slice(-150);
  saveChatHistory(chatId, trimmed);
  return newMsg;
}

export function clearChatHistory(chatId: string): void {
  const seed = chatId === '15' ? SEED_CHAT_15 : SEED_CHAT_13;
  saveChatHistory(chatId, seed);
}

export function getLinkedContext(): LinkedChatContext {
  try {
    if (fs.existsSync(LINKED_CONTEXT_FILE)) {
      return JSON.parse(fs.readFileSync(LINKED_CONTEXT_FILE, 'utf-8'));
    }
  } catch {}

  const defaultContext: LinkedChatContext = {
    lastUpdated: new Date().toISOString(),
    activeTopic: 'Urdu Haroof-e-Tahajji & Classical Poetry',
    crossReferences: [],
  };
  saveLinkedContext(defaultContext);
  return defaultContext;
}

export function saveLinkedContext(context: LinkedChatContext): void {
  try {
    fs.writeFileSync(LINKED_CONTEXT_FILE, JSON.stringify(context, null, 2), 'utf-8');
  } catch (err) {
    console.error('[ChatStorage] Error saving linked context:', err);
  }
}

export function transferContextBetweenChats(
  fromChat: '13' | '15',
  toChat: '13' | '15',
  topic: string,
  contentDraft: string,
  payload?: any
): { success: boolean; context: LinkedChatContext } {
  const context = getLinkedContext();
  context.lastUpdated = new Date().toISOString();
  context.activeTopic = topic;
  context.sharedDraft = contentDraft;
  context.sharedPayload = payload;
  context.sourceChatId = fromChat;

  context.crossReferences.unshift({
    summary: `Transfer from Chat #${fromChat} to Chat #${toChat}: ${topic}`,
    timestamp: new Date().toISOString(),
  });
  context.crossReferences = context.crossReferences.slice(0, 20);

  saveLinkedContext(context);

  // Auto-post a system message in the destination chat
  const note =
    fromChat === '13'
      ? `🔗 Linked Context received from AI Assistant (Chat #13):\n\nTopic: ${topic}\nContent: "${contentDraft.substring(0, 200)}..."`
      : `🔗 Linked Context received from Blogger Studio (Chat #15):\n\nArticle: ${topic}`;

  appendChatMessage(toChat, {
    chatId: toChat,
    sender: 'ai',
    text: note,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    linkedFromChat: fromChat,
  });

  return { success: true, context };
}
