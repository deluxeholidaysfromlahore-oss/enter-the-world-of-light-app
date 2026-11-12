import {
  SeoKeyword,
  GscQueryInsight,
  CrossPromotionTriad,
  SeoChangeLog,
  SeoAuditSummary,
  PageSeoMetadata,
} from '../types/seo';

// -----------------------------------------------------------------------------
// SEO Service - Client-Side API Bridge
// -----------------------------------------------------------------------------

export async function fetchSeoOverview(): Promise<SeoAuditSummary> {
  const res = await fetch('/api/seo/overview');
  if (!res.ok) throw new Error('Failed to fetch SEO overview');
  return res.json();
}

export async function fetchSeoKeywords(params?: {
  audience?: string;
  category?: string;
  status?: string;
  q?: string;
}): Promise<SeoKeyword[]> {
  const query = new URLSearchParams();
  if (params?.audience) query.set('audience', params.audience);
  if (params?.category) query.set('category', params.category);
  if (params?.status) query.set('status', params.status);
  if (params?.q) query.set('q', params.q);

  const res = await fetch(`/api/seo/keywords?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch keywords');
  const data = await res.json();
  return data.keywords || [];
}

export async function saveSeoKeyword(kw: Partial<SeoKeyword>): Promise<SeoKeyword> {
  const res = await fetch('/api/seo/keywords', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kw),
  });
  if (!res.ok) throw new Error('Failed to save keyword');
  const data = await res.json();
  return data.keyword;
}

export async function deleteSeoKeyword(id: string): Promise<boolean> {
  const res = await fetch(`/api/seo/keywords/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete keyword');
  const data = await res.json();
  return data.success;
}

export async function triggerDiscoveryCycle(): Promise<{
  success: boolean;
  message: string;
  newKeywordsAdded: number;
  keywordsUpgraded: number;
  changesLogged: number;
  geminiAnalysisSummary?: string;
}> {
  const res = await fetch('/api/seo/run-discovery-cycle', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to execute discovery cycle');
  return res.json();
}

export async function fetchGscInsights(): Promise<GscQueryInsight[]> {
  const res = await fetch('/api/seo/gsc-insights');
  if (!res.ok) throw new Error('Failed to fetch GSC insights');
  const data = await res.json();
  return data.insights || [];
}

export async function fetchCrossPromotionTriads(): Promise<CrossPromotionTriad[]> {
  const res = await fetch('/api/seo/cross-promotion');
  if (!res.ok) throw new Error('Failed to fetch cross-promotion matrix');
  const data = await res.json();
  return data.triads || [];
}

export async function saveCrossPromotionTriad(triad: Partial<CrossPromotionTriad>): Promise<boolean> {
  const res = await fetch('/api/seo/cross-promotion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(triad),
  });
  if (!res.ok) throw new Error('Failed to save cross-promotion triad');
  const data = await res.json();
  return data.success;
}

export async function fetchSeoChangeHistory(): Promise<SeoChangeLog[]> {
  const res = await fetch('/api/seo/change-history');
  if (!res.ok) throw new Error('Failed to fetch SEO change history');
  const data = await res.json();
  return data.logs || [];
}

export async function fetchPageMetadata(slug: string): Promise<PageSeoMetadata> {
  const res = await fetch(`/api/seo/page-metadata/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch page metadata');
  const data = await res.json();
  return data.metadata;
}

// -----------------------------------------------------------------------------
// Dynamic Client-Side Document Head SEO Manager (DOM Synchronization)
// -----------------------------------------------------------------------------
export async function applyClientHeadSEO(slug: string): Promise<void> {
  try {
    const meta = await fetchPageMetadata(slug);
    if (!meta) return;

    // 1. Update Title
    if (meta.title) {
      document.title = meta.title;
    }

    // 2. Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.metaDescription);

    // 3. Update Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', meta.canonicalUrl);

    // 4. Update OpenGraph Tags
    const setMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('og:title', meta.ogTitle || meta.title);
    setMetaTag('og:description', meta.ogDescription || meta.metaDescription);
    setMetaTag('og:url', meta.canonicalUrl);
    setMetaTag('og:type', meta.ogType || 'website');

    // 5. Update Schema.org JSON-LD structured data
    let jsonLdScript = document.querySelector('script#seo-structured-data');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      jsonLdScript.setAttribute('id', 'seo-structured-data');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(meta.structuredDataJsonLd);
  } catch (err) {
    console.debug('[SEO Service] Passive DOM head sync handled:', err);
  }
}
