# GOOGLE 2026 ECOSYSTEM MASTER CROSS-LINKING SPECIFICATION
### Project: Enter the World of Light & Laughter
### Applet ID: `94a7d0a1-b800-40fb-bb96-0aedd26257d9`
### Ecosystem: YouTube Channel + Google Blogger + AI Studio App + Google Analytics 4 + Google Search Console + Google Cloud Console

---

## 1. STRATEGIC GOAL & CLOSED-LOOP ARCHITECTURE
The objective of this architecture is to create a self-reinforcing traffic, ranking, and authority flywheel across 6 Google properties in 2026:

```
                      ┌──────────────────────────────────────┐
                      │    GOOGLE CLOUD CONSOLE (GCP)        │
                      │  APIs, OAuth 2.0, API Keys, Quotas   │
                      └──────────────────┬───────────────────┘
                                         │
                                         ▼
   ┌───────────────────────┐   Cross-Links & Embeds   ┌───────────────────────┐
   │    YOUTUBE CHANNEL    ├─────────────────────────►│    GOOGLE BLOGGER     │
   │ @EntertheWorldofLight │                          │  Pillar Pages & Posts │
   │ (Shorts + Longform)   │◄─────────────────────────┤ (SEO & Reader Hub)    │
   └───────────┬───────────┘                          └───────────┬───────────┘
               │                                                  │
               │ Deep Links (UTM)              Deep Links (UTM)   │
               ▼                                                  ▼
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                  AI STUDIO WEB APP (Core Destination)                   │
   │          Interactive Reader, Audio Recitations, Kids Mode, Quizzes        │
   └───────────────────────────────────┬──────────────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
                ▼                                             ▼
 ┌───────────────────────────────┐             ┌───────────────────────────────┐
 │   GOOGLE ANALYTICS 4 (GA4)    │             │  GOOGLE SEARCH CONSOLE (GSC)  │
 │ Realtime, Conversion Funnels, │◄───────────►│ Sitemaps, Indexing, CWV 2026, │
 │ Cross-Domain User Journeys    │             │ Google Discover Performance   │
 └───────────────────────────────┘             └───────────────────────────────┘
```

---

## 2. GOOGLE CLOUD CONSOLE (GCP) — APIs & CREDENTIALS CONFIGURATION

### 2.1. Project Initialization
- **Cloud Console URL**: `https://console.cloud.google.com/`
- **Project Selection**: Select the Firebase/AI Studio project or create a dedicated project:
  - Project ID: `ai-studio-entertheworldofl-94a7d0a1-b800-40fb-bb96-0aedd26257d9` (or dedicated project name)

### 2.2. APIs to Enable (APIs & Services > Library)
1. **Blogger API v3**:
   - Enables programmatically inserting/updating blog posts and static pages (`blogger.posts.insert`, `blogger.pages.insert`).
2. **YouTube Data API v3**:
   - Enables querying channel videos, playlists, shorts metadata, and sync verification (`youtube.videos.list`, `youtube.search.list`).
3. **Google Analytics Data API (v1beta) & Google Analytics Admin API**:
   - Enables reporting visitor counts, active reader metrics, and syndication performance directly inside the admin panel.
4. **Google Search Console API (Webmasters API v3)**:
   - Enables sitemap submission, crawl error auditing, and indexing requests.

### 2.3. OAuth 2.0 Consent Screen Setup
- **User Type**: External
- **App Name**: Enter the World of Light & Laughter
- **User Support Email**: `deluxeholidaysfromlahore@gmail.com`
- **Authorized Domains**:
  - `run.app`
  - `blogspot.com`
  - (Your custom domain if configured)
- **Scopes to Add**:
  - `https://www.googleapis.com/auth/blogger` (Manage Blogger account & content)
  - `https://www.googleapis.com/auth/youtube.readonly` (View YouTube channel stats & video data)
  - `https://www.googleapis.com/auth/analytics.readonly` (View GA4 reports)
  - `https://www.googleapis.com/auth/webmasters.readonly` (View Search Console data)

### 2.4. Credentials Setup (APIs & Services > Credentials)
1. **OAuth 2.0 Client ID**:
   - Application Type: **Web application**
   - Name: `WOL-Web-Client`
   - Authorized JavaScript Origins:
     - `https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app`
     - `https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app`
     - `http://localhost:3000`
   - Authorized Redirect URIs:
     - `https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/auth/callback`
     - `https://ais-pre-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/auth/callback`
2. **API Key (Browser / Restricted)**:
   - Restrict to: YouTube Data API v3 & Blogger API v3.
   - Application Restrictions: HTTP Referrers (`*.run.app/*`, `*.blogspot.com/*`).

---

## 3. GOOGLE ANALYTICS 4 (GA4) — UNIFIED MEASUREMENT

### 3.1. GA4 Property Setup
- **URL**: `https://analytics.google.com/`
- **Account Name**: `Enter the World of Light`
- **Property Name**: `World of Light - Global Ecosystem`
- **Industry Category**: Books & Literature / Arts & Entertainment / Education
- **Reporting Timezone**: Asia/Karachi (PKT, UTC+5)
- **Currency**: USD ($) or PKR (Rs)

### 3.2. Data Stream & Measurement ID
- Stream Type: **Web**
- Stream Name: `WOL Multi-Platform Stream`
- Output: **Measurement ID** (Format: `G-XXXXXXXXXX`)

### 3.3. Cross-Domain Tracking Setup (Crucial for 2026 Flow)
Because users jump between Blogger (`*.blogspot.com`) and the AI Studio App (`*.run.app` or custom domain):
1. In GA4 Admin > **Data Streams** > Click Web Stream.
2. Under **Google tag**, click **Configure tag settings**.
3. Click **Configure your domains**.
4. Add condition:
   - Match type: `Contains` -> Value: `blogspot.com`
   - Match type: `Contains` -> Value: `run.app` (or custom domain)
5. Save. This preserves the same visitor Session ID without breaking attribution when clicking deep links!

### 3.4. Placing the GA4 Measurement Tag
1. **In Google Blogger**:
   - Go to `blogger.com` > **Settings** > **Basic** > **Google Analytics Measurement ID**.
   - Paste `G-XXXXXXXXXX` and Save.
2. **In Web App**:
   - Injected into `index.html` via global Google tag script or environment config (`VITE_GA_MEASUREMENT_ID`).

---

## 4. GOOGLE SEARCH CONSOLE (GSC) — INDEXING & DISCOVER ELIGIBILITY

### 4.1. Adding Properties
- **URL**: `https://search.google.com/search-console`
- **Add Property 1 (Web App)**:
  - URL Prefix: `https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/` (or custom domain)
- **Add Property 2 (Blogger)**:
  - URL Prefix: `https://entertheworldoflight.blogspot.com/`

### 4.2. Verification Methods
- Since you own the Google Account with Google Analytics, verification is **instant 1-click** using the GA4 tag!
- Secondary method: HTML Meta Tag in `<head>`.

### 4.3. Sitemaps Submission
1. **Blogger Sitemaps**:
   - Submit: `sitemap.xml`
   - Submit: `atom.xml?redirect=false&start-index=1&max-results=500`
2. **Web App Sitemaps**:
   - Submit: `sitemap.xml`

### 4.4. Linking Search Console to GA4
1. In GA4 > **Admin** > **Product Links** > **Search Console Links**.
2. Click **Link** and choose your verified Search Console property.
3. This brings Organic Google Search query data directly into GA4 reports!

---

## 5. YOUTUBE CHANNEL INTEGRATION (`@EntertheWorldofLight`)

### 5.1. Channel Customization
- **Channel ID**: `UCvCzFP5EPsV4Vp6l6GGuvyg`
- In `studio.youtube.com` > **Customization** > **Basic Info**:
  - **Links**:
    1. Title: *Official Web App & Interactive Reader* -> URL: `https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/?utm_source=youtube&utm_medium=channel_link&utm_campaign=bio`
    2. Title: *Blogger Literary & Poetry Hub* -> URL: `https://entertheworldoflight.blogspot.com/?utm_source=youtube&utm_medium=channel_link&utm_campaign=bio`

### 5.2. Video & Shorts Descriptions Template
Every single Short uploaded must include this standardized 2026 conversion snippet:
```
✨ Read full Urdu poetry, stories & interactive guides in our Web App:
👉 https://ais-dev-qw4kgkghab5s5tnujz2mi3-542015737009.asia-east1.run.app/?screen=poetry&utm_source=youtube&utm_medium=shorts&utm_campaign=ghalib_short1

📖 Read the complete In-Depth Analysis on our Blog:
👉 https://entertheworldoflight.blogspot.com/p/urdu-poetry-hub.html

Subscribe for daily wisdom, bilingual literature & kids learning:
@EntertheWorldofLight
```

---

## 6. GOOGLE BLOGGER (2026 SETTINGS CONFIGURATION)

1. **Blogger Settings > Crawlers and indexing**:
   - Enable Custom `robots.txt`: Yes
   - Enable Custom robots header tags: Yes
     - Home page: `all`, `noodp`
     - Archive and search pages: `noindex`, `nofollow`
     - Post and page tags: `all`, `noodp`
2. **Post Embeds**:
   - Embed YouTube Shorts using the 2026 Responsive Privacy Wrapper (`youtube-nocookie.com`, `loading="lazy"`, `aspect-ratio: 9/16`).
   - Every post includes JSON-LD structured data generated by `bloggerService.ts`.

---

## 7. UNIFIED UTM PARAMETER STANDARDS (2026)

| Origin | Destination | UTM Source | UTM Medium | UTM Campaign | Target Screen |
|---|---|---|---|---|---|
| YouTube Short | Web App | `youtube` | `shorts` | `short_{id}` | `?screen=poetry\|stories\|learn\|kids` |
| YouTube Channel Bio | Web App | `youtube` | `channel_link` | `bio` | `?screen=home` |
| Blogger Post | Web App | `blogger` | `syndication` | `post_{slug}` | `?screen=poetry\|stories` |
| Blogger Pillar Page | Web App | `blogger` | `pillar_guide` | `page_{slug}` | `?screen=explore` |
| Web App | YouTube Channel | `app` | `in_app_banner` | `app_to_yt` | `@EntertheWorldofLight` |
| Web App | Blogger | `app` | `reading_resource`| `app_to_blog`| `entertheworldoflight.blogspot.com` |
