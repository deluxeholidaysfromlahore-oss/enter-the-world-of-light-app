import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import {
  BloggerItemRecord,
  BloggerContentType,
  BloggerWorkflowPayload,
} from '../types';

// Fallback / Initial Seed Templates for Google Blogger
export const SEED_BLOGGER_RECORDS: BloggerItemRecord[] = [
  {
    id: 'blogger-page-urdu-poetry-hub',
    type: 'page',
    title: 'The Treasury of Classical & Modern Urdu Poetry | Complete Guide',
    titleUrdu: 'اردو شاعری کا خزانہ اور عظیم شعراء کی تخلیقات',
    slug: 'urdu-poetry-hub-complete-guide',
    category: 'Poetry',
    labels: ['Urdu Poetry', 'Mirza Ghalib', 'Allama Iqbal', 'Faiz Ahmed Faiz', 'App Directory', 'YouTube Shorts'],
    youtubeShortId: '',
    relatedContentId: 'cat-poet-ghalib',
    summary: 'A permanent static directory page indexing classical and modern Urdu poetry masters with embedded YouTube micro-shorts and interactive reader links.',
    contentHtml: `
<div class="wol-blogger-page" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 820px; margin: auto; line-height: 1.8; color: #1e293b;">
  <div style="background: linear-gradient(135deg, #0284c7, #4338ca); padding: 36px 24px; border-radius: 24px; color: #ffffff; text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 28px; font-weight: 800; margin: 0 0 10px 0;">The Treasury of Urdu Poetry & Classical Verse</h1>
    <h2 style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 32px; color: #fde047; margin: 12px 0 16px 0; direction: rtl;">اردو شاعری کا خزانہ اور عظیم شعراء کی تخلیقات</h2>
    <p style="font-size: 15px; max-width: 640px; margin: auto; opacity: 0.95;">An authoritative pillar page from <strong>Enter the World of Light &amp; Laughter</strong> featuring Ghalib, Iqbal, Mir, Faiz, and bilingual educational verse.</p>
  </div>

  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; margin-bottom: 24px;">
    <h3 style="font-size: 20px; color: #0f172a; margin-top: 0;">🌟 Master Poets Index</h3>
    <ul style="padding-left: 20px; font-size: 15px;">
      <li><strong>Mirza Asadullah Khan Ghalib:</strong> Philosophical depth, paradox, and transcendental thought.</li>
      <li><strong>Allama Muhammad Iqbal:</strong> Selfhood (Khudi), spiritual awakening, and philosophical vision.</li>
      <li><strong>Faiz Ahmed Faiz:</strong> Modern lyricism, socio-cultural conscience, and romantic revolutionary meter.</li>
      <li><strong>Mir Taqi Mir:</strong> The master of subtle pathos, tender ghazal cadence, and emotional authenticity.</li>
    </ul>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/?screen=poetry" style="display: inline-block; background: #0284c7; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 12px;">Explore Interactive Poetry Reader in App &rarr;</a>
    </div>
  </div>
</div>
    `.trim(),
    status: 'published',
    bloggerUrl: 'https://entertheworldoflightandlaughter.blogspot.com/p/urdu-poetry-hub.html',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'blogger-post-short-mirza-ghalib',
    type: 'post',
    title: '60 Seconds of Wisdom: Ghalib on the Mystery of Existence | YouTube Short #1',
    titleUrdu: 'مرزا غالب کا فلسفہ ہستی: ایک منٹ کی حکمت',
    slug: 'ghalib-mystery-of-existence-short-1',
    category: 'Poetry Shorts',
    labels: ['YouTube Shorts', 'Mirza Ghalib', 'Philosophy', 'Urdu Poetry', 'Enter the World of Light'],
    youtubeShortId: '',
    relatedContentId: 'poet-ghalib-01',
    summary: 'A fast 60-second micro-learning blog post breaking down Ghalibs iconic couplet with video embed and Tashreeh.',
    contentHtml: `
<div class="wol-blogger-post" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 760px; margin: auto; line-height: 1.8; color: #1e293b;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold; text-transform: uppercase;">YouTube Shorts Series</span>
    <h1 style="font-size: 26px; color: #0f172a; margin: 12px 0;">60 Seconds of Radiance: Understanding Ghalib</h1>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 24px;">
    <p style="font-family: 'Noto Nastaliq Urdu', serif; font-size: 26px; color: #78350f; line-height: 2.2; margin: 0; direction: rtl;">
      ہستی کے مت فریب میں آ جائیو اسدؔ<br/>
      عالم تمام حلقۂ دامِ خیال ہے
    </p>
    <p style="font-size: 15px; color: #92400e; margin-top: 14px; font-style: italic;">
      "Do not be deceived by the illusion of mere existence, Asad;<br/>
      The entire universe is but the snare of thought."
    </p>
  </div>

  <p style="font-size: 16px;">This couplet teaches that our surface realities are deeply influenced by perception. When we change our inner mindset, our outer horizon transforms with light and joy.</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/?screen=shorts" style="display: inline-block; background: #dc2626; color: #ffffff; font-weight: bold; text-decoration: none; padding: 12px 28px; border-radius: 12px; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);">Watch More Shorts in the App &rarr;</a>
  </div>
</div>
    `.trim(),
    status: 'published',
    bloggerUrl: 'https://entertheworldoflightandlaughter.blogspot.com/2026/10/ghalib-philosophy-short.html',
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// -----------------------------------------------------------------------------
// Firestore Persistence Methods
// -----------------------------------------------------------------------------

export async function saveBloggerRecord(item: BloggerItemRecord): Promise<void> {
  const collectionName = item.type === 'page' ? 'bloggerPages' : 'bloggerPosts';
  try {
    const docRef = doc(db, collectionName, item.id);
    await setDoc(docRef, {
      ...item,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${item.id}`);
  }
}

export async function fetchBloggerRecords(type?: BloggerContentType): Promise<BloggerItemRecord[]> {
  const results: BloggerItemRecord[] = [];
  try {
    if (!type || type === 'page') {
      const pagesSnap = await getDocs(collection(db, 'bloggerPages'));
      pagesSnap.forEach((d) => results.push(d.data() as BloggerItemRecord));
    }
    if (!type || type === 'post') {
      const postsSnap = await getDocs(collection(db, 'bloggerPosts'));
      postsSnap.forEach((d) => results.push(d.data() as BloggerItemRecord));
    }
  } catch (err) {
    console.warn('Could not read from Firestore blogger collections, using seed dataset:', err);
  }

  if (results.length === 0) {
    return type
      ? SEED_BLOGGER_RECORDS.filter((r) => r.type === type)
      : SEED_BLOGGER_RECORDS;
  }

  return results;
}

export async function deleteBloggerRecord(id: string, type: BloggerContentType): Promise<void> {
  const collectionName = type === 'page' ? 'bloggerPages' : 'bloggerPosts';
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
  }
}

// -----------------------------------------------------------------------------
// Blogger Production HTML Builders
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Google 2026 + Google Blogger 2026 + YouTube 2026 Standards & Requirements
// -----------------------------------------------------------------------------
export const GOOGLE_BLOGGER_YOUTUBE_2026_SPECS = {
  googleSearch2026: {
    coreWebVitals: {
      inp: '< 200ms (zero blocking third-party scripts in post body)',
      cls: '0.0 (mandatory aspect-ratio: 9/16 for video embeds and fixed container widths)',
      lcp: '< 2.5s (lazy loading on iframes, lightweight inline CSS styles)',
    },
    helpfulContentEeat: 'Authentic bilingual Urdu/English explanations, Nastaliq typography, no thin programmatic slop',
    structuredData: 'Schema.org JSON-LD (VideoObject, Article/BlogPosting, BreadcrumbList)',
  },
  bloggerPlatform2026: {
    apiVersion: 'Blogger REST API v3',
    blogId: '5550406854147347257',
    oauthScope: 'https://www.googleapis.com/auth/blogger',
    endpoints: {
      insertPost: 'https://www.googleapis.com/blogger/v3/blogs/5550406854147347257/posts',
      insertPage: 'https://www.googleapis.com/blogger/v3/blogs/5550406854147347257/pages',
      getPost: 'https://www.googleapis.com/blogger/v3/blogs/5550406854147347257/posts/{postId}',
    },
    stylingRules: 'Strictly self-contained inline CSS styles or scoped wol- classes; zero reliance on theme-dependent external sheets; RTL support for Urdu Nastaliq',
  },
  youtubeShorts2026: {
    channel: '@EntertheWorldofLight',
    channelId: 'UCvCzFP5EPsV4Vp6l6GGuvyg',
    aspectRatio: '9:16 vertical ratio (responsive container with max-width: 360px)',
    embedDomain: 'https://www.youtube-nocookie.com (privacy-enhanced mode for COPPA & GDPR compliance)',
    iframeParams: 'loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen',
  },
};

const APP_BASE_URL = 'https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app';

/**
 * Generates Google 2026 Schema.org JSON-LD Structured Data
 */
export function generateSchemaJsonLd(payload: BloggerWorkflowPayload, type: 'article' | 'video'): string {
  const deepLink = `${APP_BASE_URL}/?screen=${payload.appModule}&utm_source=blogger&utm_medium=syndication&utm_campaign=wol_2026`;
  
  if (type === 'video' && payload.youtubeShortId) {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: payload.title,
      description: payload.contentBodyText?.slice(0, 160) || payload.title,
      thumbnailUrl: `https://i.ytimg.com/vi/${payload.youtubeShortId}/hqdefault.jpg`,
      uploadDate: new Date().toISOString(),
      embedUrl: `https://www.youtube-nocookie.com/embed/${payload.youtubeShortId}`,
      contentUrl: `https://www.youtube.com/shorts/${payload.youtubeShortId}`,
      publisher: {
        '@type': 'Organization',
        name: 'Enter the World of Light & Laughter',
        url: APP_BASE_URL,
      },
    }, null, 2);
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: payload.title,
    description: payload.contentBodyText?.slice(0, 160) || payload.title,
    author: {
      '@type': 'Organization',
      name: 'Enter the World of Light Editorial Board',
      url: APP_BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Enter the World of Light & Laughter',
      url: APP_BASE_URL,
    },
    mainEntityOfPage: deepLink,
    datePublished: new Date().toISOString(),
  }, null, 2);
}

/**
 * Workflow 1: App + YouTube Shorts + App Record Save + Blog Page
 * Builds a permanent, comprehensive Google Blogger Static Page (Hub / Directory / Curriculum)
 */
export function generateBloggerPageHtml(payload: BloggerWorkflowPayload): string {
  const deepLink = `${APP_BASE_URL}/?screen=${payload.appModule}&utm_source=blogger&utm_medium=syndication&utm_campaign=wol_2026`;
  const schemaMarkup = generateSchemaJsonLd(payload, payload.youtubeShortId ? 'video' : 'article');
  
  const videoEmbed = payload.youtubeShortId
    ? `
  <!-- YouTube Shorts Responsive 9:16 Privacy-Enhanced Embed (Google 2026 Standard) -->
  <div style="position: relative; width: 100%; max-width: 360px; aspect-ratio: 9/16; margin: 28px auto; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 30px rgba(0,0,0,0.22); background: #000000;">
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${payload.youtubeShortId}?modestbranding=1&rel=0" 
      title="${payload.title}" 
      loading="lazy" 
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  </div>`
    : '';

  return `
<!-- GOOGLE 2026 SCHEMA.ORG JSON-LD STRUCTURED DATA -->
<script type="application/ld+json">
${schemaMarkup}
</script>

<!-- GOOGLE BLOGGER STATIC PAGE TEMPLATE (2026 RESPONSIVE STANDARD) -->
<!-- Source: Enter the World of Light & Laughter (App + YouTube Shorts + App Record Save + Blog Page) -->
<div class="wol-blogger-page" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 840px; margin: 0 auto; color: #1e293b; line-height: 1.8; box-sizing: border-box;">
  
  <!-- Banner Header -->
  <header style="background: linear-gradient(135deg, #0284c7 0%, #312e81 100%); padding: 40px 28px; border-radius: 24px; color: #ffffff; text-align: center; margin-bottom: 32px; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.3);">
    <span style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">
      ${payload.category} Master Directory · Official App Guide
    </span>
    <h1 style="font-size: 28px; font-weight: 900; line-height: 1.3; margin: 0 0 12px 0;">${payload.title}</h1>
    ${
      payload.titleUrdu
        ? `<h2 style="font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; font-size: 30px; font-weight: 700; color: #fde047; margin: 10px 0 16px 0; direction: rtl; line-height: 2.2;">${payload.titleUrdu}</h2>`
        : ''
    }
    <p style="font-size: 16px; opacity: 0.95; max-width: 660px; margin: 0 auto;">
      Welcome to the official curriculum and topic hub powered by <strong>Enter the World of Light &amp; Laughter</strong>. Explore educational insights, multimedia shorts, and bilingual wisdom.
    </p>
  </header>

  <!-- YouTube Shorts Section if present -->
  ${videoEmbed}

  <!-- Core Content Body (Urdu & English) -->
  <main style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px 28px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
    ${
      payload.contentBodyUrdu
        ? `
    <section style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <h3 style="font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; font-size: 24px; color: #92400e; margin-top: 0; direction: rtl; text-align: right;">موضوع کا تعارف اور خلاصہ</h3>
      <div style="font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; font-size: 20px; line-height: 2.3; color: #451a03; direction: rtl; text-align: right; white-space: pre-line;">
        ${payload.contentBodyUrdu}
      </div>
    </section>`
        : ''
    }

    ${
      payload.contentBodyText
        ? `
    <section style="font-size: 16px; color: #334155; white-space: pre-line; margin-bottom: 24px;">
      ${payload.contentBodyText}
    </section>`
        : ''
    }

    <!-- Embedded Shorts Script & Takeaways -->
    ${
      payload.shortScript
        ? `
    <div style="background: #f1f5f9; border-left: 4px solid #0284c7; padding: 20px; border-radius: 12px; margin: 24px 0;">
      <h4 style="margin: 0 0 10px 0; font-size: 16px; color: #0f172a;">⚡ Micro-Learning Breakdown:</h4>
      <p style="margin: 6px 0; font-size: 14px;"><strong>Hook:</strong> ${payload.shortScript.hook}</p>
      <p style="margin: 6px 0; font-size: 14px;"><strong>Core Concept:</strong> ${payload.shortScript.body}</p>
      <p style="margin: 6px 0; font-size: 14px;"><strong>Action Step:</strong> ${payload.shortScript.callToAction}</p>
    </div>`
        : ''
    }

    <!-- Call to Action Banner linking to App -->
    <div style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 2px dashed #cbd5e1; border-radius: 16px; padding: 24px; text-align: center; margin-top: 32px;">
      <h3 style="font-size: 20px; color: #0f172a; margin: 0 0 8px 0;">Interactive Reader Available</h3>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Open this module directly in the web app for bilingual audio, interactive flashcards, quizzes, and personalized bookmarks.</p>
      <a href="${deepLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #0284c7; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 12px; box-shadow: 0 4px 12px rgba(2,132,199,0.3); transition: background 0.2s;">
        Open in Enter the World of Light App &rarr;
      </a>
    </div>
  </main>

  <!-- Footer Tag Cloud -->
  <footer style="text-align: center; padding: 16px; font-size: 13px; color: #94a3b8;">
    <p>Labels: ${payload.labels.join(', ')}</p>
    <p>&copy; Enter the World of Light &amp; Laughter · Educational &amp; Cultural Platform</p>
  </footer>
</div>
`.trim();
}

/**
 * Workflow 2: YouTube Shorts + App + Blog Post
 * Builds a dynamic, fast-converting Google Blogger Blog Post centered on a single YouTube Short
 */
export function generateBloggerPostHtml(payload: BloggerWorkflowPayload): string {
  const deepLink = `${APP_BASE_URL}/?screen=${payload.appModule}&utm_source=blogger&utm_medium=syndication&utm_campaign=wol_2026`;
  const schemaMarkup = generateSchemaJsonLd(payload, 'video');
  
  const videoEmbed = payload.youtubeShortId
    ? `
  <!-- YouTube Shorts Responsive 9:16 Privacy-Enhanced Embed (Google 2026 Standard) -->
  <div style="position: relative; width: 100%; max-width: 360px; aspect-ratio: 9/16; margin: 24px auto; border-radius: 20px; overflow: hidden; box-shadow: 0 12px 28px rgba(0,0,0,0.3); background: #000000;">
    <iframe 
      src="https://www.youtube-nocookie.com/embed/${payload.youtubeShortId}?autoplay=0&modestbranding=1&rel=0" 
      title="${payload.title}" 
      loading="lazy"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen>
    </iframe>
  </div>`
    : '';

  return `
<!-- GOOGLE 2026 SCHEMA.ORG JSON-LD STRUCTURED DATA -->
<script type="application/ld+json">
${schemaMarkup}
</script>

<!-- GOOGLE BLOGGER BLOG POST TEMPLATE (2026 RESPONSIVE STANDARD) -->
<!-- Source: Enter the World of Light & Laughter (YouTube Shorts + App + Blog Post) -->
<div class="wol-blogger-post" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 760px; margin: 0 auto; color: #1e293b; line-height: 1.8; box-sizing: border-box;">

  <!-- Post Header -->
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="display: inline-block; background: #fee2e2; color: #dc2626; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 4px 14px; border-radius: 9999px; margin-bottom: 12px;">
      ▶ YouTube Shorts Series · ${payload.category}
    </span>
    <h1 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 10px 0; line-height: 1.3;">
      ${payload.title}
    </h1>
    ${
      payload.titleUrdu
        ? `<h2 style="font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; font-size: 26px; color: #b45309; margin: 8px 0 16px 0; direction: rtl; line-height: 2.2;">${payload.titleUrdu}</h2>`
        : ''
    }
  </div>

  <!-- Responsive YouTube Short Player -->
  ${videoEmbed}

  <!-- Bilingual Text Body -->
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 28px; margin: 24px 0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
    ${
      payload.contentBodyUrdu
        ? `
    <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 16px; padding: 22px; margin-bottom: 20px;">
      <p style="font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif; font-size: 22px; line-height: 2.3; color: #78350f; direction: rtl; text-align: right; margin: 0;">
        ${payload.contentBodyUrdu}
      </p>
    </div>`
        : ''
    }

    ${
      payload.contentBodyText
        ? `
    <div style="font-size: 16px; color: #334155; white-space: pre-line; margin-bottom: 20px;">
      ${payload.contentBodyText}
    </div>`
        : ''
    }

    <!-- Call to Action Card -->
    <div style="background: #0f172a; color: #ffffff; border-radius: 16px; padding: 24px; text-align: center; margin-top: 24px;">
      <h3 style="font-size: 18px; font-weight: 700; color: #38bdf8; margin: 0 0 8px 0;">Enjoyed this Short?</h3>
      <p style="font-size: 14px; color: #cbd5e1; margin: 0 0 16px 0;">Discover hundreds of full stories, poetry recitations, learning games, and kids educational modules in our live web platform.</p>
      <a href="${deepLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #dc2626; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 10px; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);">
        Launch Enter the World of Light App &rarr;
      </a>
    </div>
  </div>

  <!-- Post Tags & Channel Link -->
  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 13px; color: #64748b;">
    <span>Channel: <a href="https://www.youtube.com/@EntertheWorldofLight" target="_blank" rel="noopener noreferrer" style="color: #dc2626; text-decoration: none; font-weight: bold;">@EntertheWorldofLight</a></span>
    <span>Tags: ${payload.labels.slice(0, 4).join(', ')}</span>
  </div>
</div>
`.trim();
}
