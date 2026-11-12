import urllib.parse

def make_logo_svg(title_text="Enter the World of Light & Laughter", subtitle_text="Interactive Web App & Kids Learning Hub"):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420" width="100%" height="auto">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0369a1"/>
      <stop offset="40%" stop-color="#0284c7"/>
      <stop offset="80%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="800" height="420" rx="24" fill="url(#bgGrad)"/>
  
  <g opacity="0.12">
    <circle cx="700" cy="80" r="140" fill="#ffffff"/>
    <circle cx="100" cy="360" r="100" fill="#ffffff"/>
  </g>

  <!-- Sun Logo Icon -->
  <g transform="translate(400, 140)" filter="url(#shadow)">
    <!-- Rays -->
    <g stroke="#fde047" stroke-width="5" stroke-linecap="round" opacity="0.95">
      <line x1="0" y1="-80" x2="0" y2="-65"/>
      <line x1="0" y1="65" x2="0" y2="80"/>
      <line x1="-80" y1="0" x2="-65" y2="0"/>
      <line x1="65" y1="0" x2="80" y2="0"/>
      <line x1="-56" y1="-56" x2="-45" y2="-45"/>
      <line x1="45" y1="45" x2="56" y2="56"/>
      <line x1="-56" y1="56" x2="-45" y2="45"/>
      <line x1="45" y1="-45" x2="56" y2="-56"/>
    </g>
    <!-- Corona -->
    <circle cx="0" cy="0" r="48" fill="url(#sunGrad)"/>
    <circle cx="0" cy="0" r="40" fill="#fbbf24"/>
    <!-- Book Wings -->
    <path d="M-28 14 C-16 4 -4 5 0 10 C4 5 16 4 28 14 C20 25 8 24 0 20 C-8 24 -20 25 -28 14 Z" fill="#ffffff" opacity="0.98"/>
    <!-- Smile Arc -->
    <path d="M-14 -2 C-10 6 10 6 14 -2" stroke="#0f172a" stroke-width="4" stroke-linecap="round" fill="none"/>
    <!-- Sparkles -->
    <circle cx="0" cy="-20" r="4" fill="#ffffff"/>
    <circle cx="-16" cy="-12" r="2.5" fill="#ffffff"/>
    <circle cx="16" cy="-12" r="2.5" fill="#ffffff"/>
  </g>

  <!-- App Badge -->
  <rect x="250" y="240" width="300" height="32" rx="16" fill="#0f172a" opacity="0.85"/>
  <text x="400" y="261" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="1">✨ OFFICIAL WEB APPLICATION</text>

  <!-- Title -->
  <text x="400" y="315" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#shadow)">{title_text}</text>

  <!-- Subtitle -->
  <text x="400" y="352" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#fef08a" text-anchor="middle">{subtitle_text}</text>

  <!-- Tagline -->
  <text x="400" y="385" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#e0f2fe" text-anchor="middle">Learn • Play • Practice • Read • Listen • Explore</text>
</svg>'''
    return "data:image/svg+xml;utf8," + urllib.parse.quote(svg)

print("SVG data URI generated, length:", len(make_logo_svg()))
