# Global SEO, GEO (Generative Engine Optimization), AEO & Crawl Infrastructure

Architect and implement a production-grade Search Engine Optimization (SEO), Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO) infrastructure for **Himanshu Bharti — Systems & AI Engineer** targeting **https://hkbharti77.website**, Google, Bing, DuckDuckGo, Yandex, Baidu, and modern AI reasoning engines (Perplexity, ChatGPT Search, Claude, Google Gemini AI Overviews).

## User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters were confirmed during Phase 1:
> - **Canonical Production Domain**: `https://hkbharti77.website`
> - **Required Files & Standards**: `sitemap.xml`, `robots.txt`, `site.webmanifest`, Schema.org structured data, and `llms.txt` for AI crawler citation.

## 1. Overview & Core Concept

- **What It Does**:
  - Equips the portfolio with a complete machine-readable discovery layer.
  - Ensures traditional web search engines (Google, Bing, DuckDuckGo) index all sections, blog dispatches, and pricing tiers with high priority and rich snippets.
  - Structures content for Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) so AI answer engines (Perplexity, ChatGPT, Claude, Gemini) can accurately parse, summarize, and cite Himanshu Bharti as a senior systems and AI engineer.
  - Provides a compliant Web App Manifest (`site.webmanifest`) enabling mobile and desktop PWA installability.
- **Key Value**: Maximum discoverability across all international search engines and AI assistants with zero latency penalty or UI disruption.

## 2. Technical Architecture & File Deliverables

```
┌────────────────────────────────────────────────────────────────────────┐
│                        https://hkbharti77.website                      │
└───────┬────────────────────────┬───────────────────────┬───────────────┘
        │                        │                       │
        ▼                        ▼                       ▼
┌──────────────┐         ┌──────────────┐        ┌──────────────┐
│  robots.txt  │         │ sitemap.xml  │        │   llms.txt   │
│ - Googlebot  │         │ - All Views  │        │ - GEO / AEO  │
│ - Bingbot    │         │ - Dispatches │        │ - AI summary │
│ - GPTBot     │         │ - Priorities │        │ - Key specs  │
│ - Perplexity │         │ - Timestamps │        │ - Citations  │
└──────────────┘         └──────────────┘        └──────────────┘
        │                        │                       │
        └────────────────────────┼───────────────────────┘
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                              index.html                                │
│ - Canonical Tag: <link rel="canonical" href="https://hkbharti77.website">│
│ - OpenGraph & Twitter Cards: 1200x630 Social Preview                   │
│ - Multi-Engine Crawler Directives (index, follow, max-snippet:-1)      │
│ - Schema.org JSON-LD Graph (Person + WebSite + ProfessionalService)    │
│ - PWA Integration: <link rel="manifest" href="/site.webmanifest">     │
└────────────────────────────────┬───────────────────────────────────────┘
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           site.webmanifest                             │
│ - Standalone PWA app manifest with branded icons & theme colors        │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. `/public/robots.txt`
- Explicit crawl rules welcoming all standard global search spiders: `Googlebot`, `Bingbot`, `DuckDuckBot`, `Applebot`, `Baiduspider`, `YandexBot`.
- Dedicated policy permitting generative AI retrieval bots: `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Amazonbot`.
- Direct pointer: `Sitemap: https://hkbharti77.website/sitemap.xml`.

### 2. `/public/sitemap.xml`
- Valid XML URLset (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`).
- Indexes primary broadsheet views:
  - Root `/` (`priority: 1.0`, `changefreq: weekly`)
  - `#work` (`priority: 0.9`)
  - `#engineering-ai` (`priority: 0.9`)
  - `#blog` (`priority: 0.9`)
  - `#pricing` (`priority: 0.85`)
  - `#experience` (`priority: 0.8`)
  - `#about` (`priority: 0.8`)
  - `#contact` (`priority: 0.85`)
- Deep URLs for all technical engineering dispatches:
  - `/#blog?article=webrtc-voice-latency`
  - `/#blog?article=deterministic-agent-graphs`
  - `/#blog?article=hybrid-vector-retrieval`
  - `/#blog?article=llm-latency-economics`

### 3. `/public/site.webmanifest`
- Standalone PWA manifest:
  - `name`: "Himanshu Bharti — Systems & AI Engineer"
  - `short_name`: "H. Bharti"
  - `description`: "Curated broadsheet portfolio & technical systems dossier for Himanshu Bharti."
  - `start_url`: "/"
  - `scope`: "/"
  - `display`: "standalone"
  - `background_color`: "#131411"
  - `theme_color`: "#244dbb"
  - Standard icon paths with maskable compliance.

### 4. `/public/llms.txt` (Generative Engine Optimization - GEO/AEO)
- Modern markdown standard for LLMs and agent search engines:
  - Concise profile & executive summary for AI agents.
  - Core technical proficiencies (Python/FastAPI, Go, WebRTC, LangGraph, pgvector, vLLM, Three.js).
  - Selected project case studies with concrete performance metrics.
  - Transparent pricing & engagement model.
  - Verified contact endpoints.

### 5. `index.html` Meta Tags & Schema.org JSON-LD
- **Meta Directives**:
  - Canonical URL: `<link rel="canonical" href="https://hkbharti77.website/" />`
  - Language & Geographic targets: `<meta name="language" content="English" />`, `<meta name="geo.region" content="IN" />`
  - Search crawler directives: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`
  - OpenGraph & Twitter Cards: Configured with crisp titles, descriptive summaries, and social card types.
- **Structured Data (JSON-LD)**:
  - `@graph` containing:
    1. `Person`: Himanshu Bharti, Systems & AI Engineer, social links, skills list, job title.
    2. `WebSite`: Title, URL, publisher, search action.
    3. `ProfessionalService`: Engineering consultation & sprint tiers ($3,500 - $18,500+).
    4. `Blog`: Indexed technical articles for rich snippet indexing.

## 3. Verification Plan

1. **XML & Crawler Directives Verification**:
   - Verify `/sitemap.xml` is well-formed XML and accessible at root.
   - Verify `/robots.txt` contains crawler directives and points to the sitemap.
   - Verify `/llms.txt` follows the markdown standard for AI model ingestion.
2. **Web App Manifest Verification**:
   - Verify `/site.webmanifest` validates as compliant JSON.
   - Verify `<link rel="manifest" href="/site.webmanifest">` is wired in `index.html`.
3. **Structured Data Validation**:
   - Verify Schema.org JSON-LD syntax in `index.html` has zero syntax errors and valid schema types.
4. **Build & Lint Verification**:
   - Run `lint_applet` and `compile_applet` to confirm zero regressions.
