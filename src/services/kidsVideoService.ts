import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { KidsVideoItem } from '../types/kidsVideo';

const COLLECTION_NAME = 'kids_video_pipeline';

/**
 * Loads the list of all kids videos from backend and syncs with Firestore
 */
export async function fetchKidsVideoPipeline(): Promise<KidsVideoItem[]> {
  try {
    // 1. Fetch from server endpoint first (which reads the persistent storage manifest)
    const res = await fetch('/api/kids-video/pipeline');
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        // Sync items to Firestore in background
        syncVideosToFirestore(data.items).catch(() => {});
        return data.items;
      }
    }
  } catch (err) {
    console.warn('[KidsVideoService] Could not reach /api/kids-video/pipeline, attempting Firestore fallback...', err);
  }

  // 2. Fallback to Firestore if server route is not ready
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('creationDate', 'desc'));
    const snap = await getDocs(q);
    const list: KidsVideoItem[] = [];
    snap.forEach((d) => {
      list.push(d.data() as KidsVideoItem);
    });
    if (list.length > 0) return list;
  } catch (err) {
    console.warn('[KidsVideoService] Firestore fetch fallback notice:', err);
  }

  return [];
}

/**
 * Synchronizes video records to Firestore kids_video_pipeline collection
 */
export async function syncVideosToFirestore(items: KidsVideoItem[]): Promise<void> {
  for (const item of items) {
    try {
      const docRef = doc(db, COLLECTION_NAME, item.contentId);
      await setDoc(docRef, item, { merge: true });
    } catch (err) {
      console.warn(`[KidsVideoService] Could not sync doc ${item.contentId} to Firestore:`, err);
    }
  }
}

/**
 * Triggers video generation for a topic (with duplicate check)
 */
export async function triggerKidsVideoGeneration(
  topic = 'A for Apple',
  category = 'Alphabet',
  forceRegenerate = false
): Promise<{ success: boolean; record?: KidsVideoItem; error?: string }> {
  try {
    const res = await fetch('/api/kids-video/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        category,
        forceRegenerate,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, error: data.error || 'Video generation failed' };
    }

    // Save newly created record to Firestore
    if (data.record) {
      try {
        const docRef = doc(db, COLLECTION_NAME, data.record.contentId);
        await setDoc(docRef, data.record, { merge: true });
      } catch (firestoreErr) {
        console.warn('[KidsVideoService] Firestore save notice:', firestoreErr);
      }
    }

    return { success: true, record: data.record };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error triggering video generation' };
  }
}
