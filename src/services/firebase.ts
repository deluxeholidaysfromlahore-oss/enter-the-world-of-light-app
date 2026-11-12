import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  doc,
  getDocFromServer,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  UserAccount,
  UserProfileData,
  FavoriteRecord,
  LearningProgressRecord,
  WatchHistoryRecord,
} from '../types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: The app will break without specifying the firestoreDatabaseId
const firestoreDatabaseId =
  (firebaseConfig as any).firestoreDatabaseId ||
  'ai-studio-entertheworldofl-94a7d0a1-b800-40fb-bb96-0aedd26257d9';

// Lightweight Firestore connection optimized for memory safety in browser
export const db = getFirestore(app, firestoreDatabaseId);
export const auth = getAuth(app);

// -----------------------------------------------------------------------------
// Hardened Firestore Error Handling (as specified by skill)
// -----------------------------------------------------------------------------
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo:
        currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// -----------------------------------------------------------------------------
// Boot Connection Test (as specified by skill)
// -----------------------------------------------------------------------------
export async function testConnection(): Promise<boolean> {
  try {
    const fetchPromise = getDocFromServer(doc(db, 'test', 'connection'));
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('the client is offline or initial connection check timed out')), 4000)
    );
    await Promise.race([fetchPromise, timeoutPromise]);
    return true;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline / check configuration.');
      return false;
    }
    // Permission denied or document not found still proves active connection to Firestore!
    return true;
  }
}

// Auto-run connection test on module load
testConnection().catch((err) => console.log('Init connection check finished:', err?.message));

// -----------------------------------------------------------------------------
// Authentication Services
// -----------------------------------------------------------------------------
export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  await syncUserProfile(result.user);
  return result.user;
}

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  await syncUserProfile(result.user);
  return result.user;
}

export async function registerWithEmail(
  email: string,
  pass: string,
  name: string
): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  await syncUserProfile(result.user, name);
  return result.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// -----------------------------------------------------------------------------
// Firestore User & Profile Synchronization
// -----------------------------------------------------------------------------
export async function syncUserProfile(user: User, customName?: string) {
  const userRef = doc(db, 'users', user.uid);
  const profileRef = doc(db, 'profiles', user.uid);

  const displayName = customName || user.displayName || user.email?.split('@')[0] || 'Learner';

  try {
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      const newAccount: UserAccount = {
        uid: user.uid,
        email: user.email || '',
        displayName,
        photoURL: user.photoURL || '',
        role: user.email === 'deluxeholidaysfromlahore@gmail.com' ? 'admin' : 'user',
        xp: 120,
        streak: 1,
        createdAt: new Date().toISOString(),
      };
      await setDoc(userRef, newAccount);
    }

    const existingProfile = await getDoc(profileRef);
    if (!existingProfile.exists()) {
      const newProfile: UserProfileData = {
        uid: user.uid,
        displayName,
        bio: 'Explorer of Light & Laughter',
        avatar: user.photoURL || '',
        preferredLanguage: 'both',
        ageGroup: 'all',
        badges: ['badge-welcome'],
        updatedAt: new Date().toISOString(),
      };
      await setDoc(profileRef, newProfile);
    }
  } catch (err) {
    console.warn('User profile sync notice:', err);
  }
}

// -----------------------------------------------------------------------------
// Favorites Service
// -----------------------------------------------------------------------------
export async function getFavorites(userId: string): Promise<FavoriteRecord[]> {
  const path = 'favorites';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as FavoriteRecord);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function addFavorite(
  userId: string,
  contentId: string,
  contentType: string,
  title: string
): Promise<void> {
  const id = `${userId}_${contentId}`;
  const path = `favorites/${id}`;
  try {
    const record: FavoriteRecord = {
      id,
      userId,
      contentId,
      contentType,
      title,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'favorites', id), record);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function removeFavorite(userId: string, contentId: string): Promise<void> {
  const id = `${userId}_${contentId}`;
  const path = `favorites/${id}`;
  try {
    await deleteDoc(doc(db, 'favorites', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// -----------------------------------------------------------------------------
// Learning Progress Service
// -----------------------------------------------------------------------------
export async function saveProgress(
  userId: string,
  moduleType: string,
  moduleId: string,
  score: number = 0,
  xpEarned: number = 0,
  scrollProgress: number = 0
): Promise<void> {
  const id = `${userId}_${moduleType}_${moduleId}`;
  const path = `progress/${id}`;
  try {
    const record: LearningProgressRecord = {
      id,
      userId,
      moduleType,
      moduleId,
      score,
      xpEarned,
      completed: true,
      scrollProgress,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'progress', id), record, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// -----------------------------------------------------------------------------
// Watch History Service
// -----------------------------------------------------------------------------
export async function logWatchHistory(
  userId: string,
  videoId: string,
  title: string,
  watchedSeconds: number = 0,
  completed: boolean = false
): Promise<void> {
  const id = `${userId}_${videoId}`;
  const path = `watchHistory/${id}`;
  try {
    const record: WatchHistoryRecord = {
      id,
      userId,
      videoId,
      title,
      watchedSeconds,
      completed,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'watchHistory', id), record, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// -----------------------------------------------------------------------------
// Learning History & Streaks Service
// -----------------------------------------------------------------------------
export async function logLearningHistory(
  userId: string,
  itemId: string,
  title: string
): Promise<void> {
  const id = `${userId}_${itemId}`;
  const path = `learningHistory/${id}`;
  try {
    await setDoc(
      doc(db, 'learningHistory', id),
      {
        id,
        userId,
        itemId,
        title,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateStreakRecord(
  userId: string,
  streakCount: number
): Promise<void> {
  const id = `streak_${userId}`;
  const path = `streaks/${id}`;
  try {
    await setDoc(
      doc(db, 'streaks', id),
      {
        id,
        userId,
        value: streakCount,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// -----------------------------------------------------------------------------
// Kids Mode & Parental Controls Service
// -----------------------------------------------------------------------------
export async function getParentControls(parentId: string) {
  const id = `controls_${parentId}`;
  const path = `parentControls/${id}`;
  try {
    const snap = await getDoc(doc(db, 'parentControls', id));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveParentControls(
  parentId: string,
  dailyScreenTimeLimit: number,
  pinCode?: string
): Promise<void> {
  const id = `controls_${parentId}`;
  const path = `parentControls/${id}`;
  try {
    await setDoc(
      doc(db, 'parentControls', id),
      {
        id,
        parentId,
        dailyScreenTimeLimit,
        pinCode: pinCode || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// -----------------------------------------------------------------------------
// Admin Settings Service
// -----------------------------------------------------------------------------
export async function getAdminSettings(): Promise<Record<string, string>> {
  const path = 'adminSettings';
  try {
    const snap = await getDocs(collection(db, path));
    const result: Record<string, string> = {};
    snap.docs.forEach((d) => {
      const data = d.data();
      if (data.key && data.value) {
        result[data.key] = data.value;
      }
    });
    return result;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

