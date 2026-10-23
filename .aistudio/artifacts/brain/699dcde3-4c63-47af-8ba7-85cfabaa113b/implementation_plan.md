# Engineering Dispatches (Blog) & Services Architecture (Pricing) Views

Add two dedicated, deeply interactive views to the portfolio:
1. **Blog (Technical Dispatches)**: An editorial publication showcasing deep-dive engineering monographs, category filters, and an interactive full-article reader.
2. **Pricing (Engagements & Advisory)**: Structured transparent engineering tiers (Architectural Advisory, Production Sprint, Full-Cycle Enterprise Build) with an interactive scope inquiry workflow and FAQs.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following core design choices were confirmed during Phase 1:
> - **Pricing Structure**: 3 distinct engagement tiers:
>   - *Tier 01: Architectural Advisory & Audit* (1-week deep dive, latency/system profiling)
>   - *Tier 02: Production Sprint Delivery* (2–3 week accelerated MVP/module implementation)
>   - *Tier 03: Full-Cycle Enterprise System Build* (Turnkey autonomous architecture & SLA)
> - **Blog Structure**: Editorial dispatch catalogue with live category filtering (`Distributed Systems`, `Multimodal AI`, `RAG & Search`, `Architecture`) and an interactive full-article reader view with technical diagrams, formatted code, and citation footnotes.

## 1. Overview & Core Concept

- **What It Does**:
  - Extends the portfolio into a comprehensive engineering studio platform by giving prospective clients and hiring teams direct access to Himanshu's technical thinking (Blog) and engagement model (Pricing).
  - Maintains full consistency with the broadsheet editorial aesthetic (EB Garamond, Hanken Grotesk, obsidian dark mode, live IST clocks, and tactile UI feedback).
- **Target Audience**: CTOs, Engineering VPs, technical founders, and enterprise partners seeking senior systems & AI leadership.
- **Key Value**: Bridges the gap between viewing past projects and initiating concrete technical engagements or learning from production case studies.

## 2. User Experience & Visual Design

### A. Blog / Technical Dispatches View (`BlogView.tsx`)
- **Editorial Masthead**: Clean publication header with issue number, volume date, and live filter pills (`All Dispatches`, `Multimodal AI`, `Distributed Systems`, `RAG & Vector Search`, `Engineering Leadership`).
- **Featured Lead Article & Grid Layout**:
  - *Lead Article*: Prominent split showcase featuring "Sub-400ms Voice Orchestration: Taming Audio Buffers over WebRTC" with reading time, publication date, and key takeaways.
  - *Secondary Grid*: 3 in-depth technical essays covering deterministic multi-agent swarms, hybrid dense-sparse vector search, and LLM inference economics.
- **Interactive Full-Article Reader Modal**:
  - Clicking any dispatch opens a dedicated reading view with balanced measure (`68ch`), code blocks with copy action, architectural callouts, and author bio. Supports Escape key and instant close.

### B. Pricing / Engineering Engagements View (`PricingView.tsx`)
- **Tiered Engagement Matrix**:
  - **Tier 01: Architectural Advisory & Audit** ($3,500)
    - 5-day intensive audit, bottleneck analysis, latency profiling, and executive systems monograph.
  - **Tier 02: Production Sprint Delivery** ($8,500 / 2–3 weeks)
    - High-velocity build of core AI agents, WebSockets/WebRTC pipelines, or backend microservices.
  - **Tier 03: Full-Cycle Enterprise System Build** ($18,500+)
    - Turnkey distributed architecture, fine-tuning, automated testing, SLA guarantees, and team handoff.
- **Interactive Scope Dispatcher**:
  - Clicking "Select Tier" opens a pre-configured contact inquiry directly linked to the user's selected tier.
- **Engagement Invariants & FAQ**:
  - Clear, straightforward answers on IP ownership, code custody, timeline commitments, and milestone schedules.

## 3. Technical Architecture & State Flow

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│  State: activeTab ('work' | 'engineering' | 'experience' | 'blog' |    │
│                    'pricing' | 'about')                                │
│  Hash Routing: #work | #engineering-ai | #blog | #pricing | #about     │
└──────────────┬───────────────────────────────┬─────────────────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────────────┐
│         <BlogView />         │ │           <PricingView />            │
│ - Category filter state      │ │ - 3 Curated Tier Cards               │
│ - Selected article state     │ │ - Interactive Tier Selector          │
│ - Full Article Reader Dialog │ │ - Deliverables & Tech Specs Grid     │
│ - Copy link & Share toast    │ │ - FAQ Accordion with instant expand  │
└──────────────────────────────┘ └──────────────────────────────────────┘
               │                               │
               ▼                               ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Global Shared Shell                            │
│  - <Header />: Updated with "Dispatches" and "Pricing" tabs            │
│  - <Footer />: Synced footer navigation & copyright columns            │
│  - Dark Mode & Focus Reading Mode compatibility across all views       │
└────────────────────────────────────────────────────────────────────────┘
```

## 4. Step-by-Step Implementation Steps

1. **`src/types.ts`**:
   - Add `'blog' | 'pricing'` to `TabType`.
   - Define `DispatchArticle` interface (id, title, excerpt, content, category, readTime, date, tags).
   - Define `PricingTier` interface (id, title, price, cadence, subtitle, features, idealFor, highlight).

2. **`src/views/BlogView.tsx`**:
   - Create the editorial blog view with real technical monographs, category filter tabs, search filter, and full-screen reading dialog with code syntax blocks.

3. **`src/views/PricingView.tsx`**:
   - Create the pricing view with 3 transparent tiers, deliverables checklists, enterprise FAQ accordion, and inquiry action buttons.

4. **`src/components/Header.tsx` & `src/components/Footer.tsx`**:
   - Add `Dispatches (Blog)` and `Pricing` navigation tabs to the header desktop menu and mobile drawer.
   - Update footer navigation columns to include links to Dispatches and Pricing.

5. **`src/App.tsx`**:
   - Update hash routing to handle `#blog` and `#pricing`.
   - Render `<BlogView />` and `<PricingView />` conditionally within the smooth broadsheet transition container.

## 5. Verification Plan

1. **Navigation & Deep Linking**:
   - Verify clicking "Dispatches" and "Pricing" in the Header loads the respective views.
   - Verify URL hashes `#blog` and `#pricing` resolve correctly on reload.
2. **Interactive Functionality**:
   - Test category filtering on the Blog page.
   - Test opening, reading, and closing full articles in the reading modal (including Esc key).
   - Test clicking "Initiate Engagement" on each pricing tier to verify it pre-selects the tier and navigates to the contact workflow.
3. **Dark Mode & Reading Mode**:
   - Verify both Blog and Pricing render beautifully in dark obsidian mode.
4. **Compile & Lint Verification**:
   - Run `lint_applet` and `compile_applet` to confirm zero errors.
