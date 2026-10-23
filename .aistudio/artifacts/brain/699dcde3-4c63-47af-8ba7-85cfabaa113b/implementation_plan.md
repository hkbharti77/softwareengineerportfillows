# CSS-Based Dark Mode Theme & Dynamic Header Toggle

Implement an inverted editorial broadsheet Dark Mode theme ("Deep Obsidian & Warm Cream") utilizing Tailwind CSS variables and add a dynamic, persistent theme toggle control in the primary navigation bar.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and aesthetic choices were confirmed during Phase 1:
> - **Visual Palette**: Deep obsidian paper (`#131411`) with warm cream typography (`#f2f0e6`), parchment muted variants (`#b0af9f`), and glowing terracotta accents (`#ff8543`).
> - **Persistence & Initialization**: Synchronized with `localStorage` (key: `theme`) with automatic fallback to system OS `prefers-color-scheme: dark`.

## 1. Overview & Core Concept

- **What It Does**: Provides an eye-pleasing, low-luminance editorial broadsheet reading environment that inverts the light paper and charcoal ink palette into rich obsidian surfaces and warm cream typography, while maintaining the portfolio's typography hierarchy and 3D WebGL hero lighting balance.
- **Target Audience**: Technical recruiters, engineering managers, and visitors browsing case studies in low-light environments.
- **Key Value**: Enhances long-form readability, reduces eye strain, and demonstrates frontend design craft with zero layout shifts or palette clashes.

## 2. User Experience & Visual Design

- **Toggle Placement & Affordance**:
  - Desktop: Positioned in the header utility action cluster adjacent to the Focus/Reading Mode toggle. Uses a sleek, single-line icon + text button showing Sun/Moon icons with accessible tooltips (`Toggle Dark Theme (Alt+T)`).
  - Mobile: Integrated into the mobile slide-down drawer with clear active state feedback.
- **Visual Palette Inversion (`.dark`)**:
  - `--color-surface` & `--color-background`: `#fbf9f3` (Warm Paper) $\rightarrow$ `#131411` (Deep Obsidian)
  - `--color-on-surface`: `#1b1c18` (Charcoal Ink) $\rightarrow$ `#f2f0e6` (Warm Cream)
  - `--color-on-surface-variant`: `#434653` $\rightarrow$ `#b0af9f` (Muted Parchment)
  - `--color-surface-container`: `#efeee7` $\rightarrow$ `#1c1d19`
  - `--color-surface-container-low`: `#f5f4ed` $\rightarrow$ `#181915`
  - `--color-surface-container-high`: `#e9e8e2` $\rightarrow$ `#232420`
  - `--color-surface-container-highest`: `#e4e3dc` $\rightarrow$ `#2d2e29`
  - `--color-surface-container-lowest`: `#ffffff` $\rightarrow$ `#0c0d0a`
  - `--color-surface-variant`: `#e4e3dc` $\rightarrow$ `#282a24`
  - `--color-inverse-surface`: `#30312d` $\rightarrow$ `#f2f0e6`
  - `--color-inverse-on-surface`: `#f2f1ea` $\rightarrow$ `#131411`
  - `--color-primary`: `#244dbb` $\rightarrow$ `#5c85fa` (Optical compensation for dark backgrounds)
  - `--color-secondary-container`: `#fc8546` $\rightarrow$ `#ff8543` (Luminous terracotta)
  - `--color-tertiary`: `#3d5c4f` $\rightarrow$ `#68a88f` (Luminous sage green)
- **Three.js Canvas Ambient Harmony**:
  - Hero 3D WebGL scene checks the dark mode state to subtly adjust clearColor and ambient lighting intensity so the chrome sphere and amber glass retain their refractive depth.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: CSS Variables Override vs Class Duplication**:
  - *Chosen Approach*: Define standard CSS custom property overrides under `.dark` in `src/index.css`.
  - *Why*: Tailwind v4 compiles classes like `bg-surface`, `text-on-surface`, and `border-surface-variant` directly to `var(--color-surface)`, etc. Overriding these custom properties under `.dark` guarantees 100% theme coverage across all views (Work, Engineering & AI, Experience, About, modals) with zero duplicated utility classes.
- **Decision 2: Theme Initialization Strategy**:
  - *Chosen Approach*: Inline initialization script in `index.html` plus React state in `App.tsx`.
  - *Why*: Checking `localStorage` or `window.matchMedia('(prefers-color-scheme: dark)')` directly before the initial React render prevents "flash of unstyled content" (FOUC).

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  State: isDarkMode (boolean) ◄──► localStorage('theme') │
│  Listener: window.matchMedia('prefers-color-scheme')   │
└───────────┬────────────────────────────────┬───────────┘
            │                                │
            ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐
│     <Header />        │        │   <html class="dark"> │
│  - Sun/Moon Button    │        │  - CSS Custom Props   │
│  - Mobile Drawer item │        │  - Color Inversion    │
└───────────────────────┘        └───────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│               Global Views & Components                │
│  - WorkView, EngineeringView, ExperienceView, AboutView│
│  - HeroThreeCanvas (Ambient dark adaptation)           │
│  - ResumeModal & Interactive Blueprint Stepper         │
└────────────────────────────────────────────────────────┘
```

### Proposed Changes

1. **`src/index.css`**:
   - Add `.dark` selector block with inverted obsidian/cream theme tokens.
   - Configure smooth CSS color transitions and `color-scheme: dark` support.

2. **`index.html`**:
   - Add early theme detection snippet in `<head>` to prevent flash of light theme when reloading in dark mode.

3. **`src/components/Header.tsx`**:
   - Add `isDarkMode: boolean` and `onToggleDarkMode: () => void` props.
   - Render theme toggle button with `Sun` and `Moon` icons from `lucide-react`.
   - Include theme toggle in both desktop header and mobile drawer.

4. **`src/App.tsx`**:
   - Initialize and manage `isDarkMode` state with `localStorage` and system media query sync.
   - Pass props to `<Header />`.
   - Update document class list (`document.documentElement.classList.toggle('dark', isDarkMode)`).

5. **`src/components/HeroThreeCanvas.tsx`**:
   - Detect active theme mode to optimize background gradient and ambient light tone.

## 5. Verification Plan

1. **Theme Switch Verification**:
   - Toggle dark mode via header button and confirm instant, seamless inversion of all surfaces, borders, cards, and typography.
   - Toggle via mobile navigation drawer.
2. **Persistence & FOUC Verification**:
   - Reload the page while in dark mode and confirm zero flashing of light paper palette.
   - Test `localStorage` sync and system OS color scheme fallback.
3. **Build & Typecheck**:
   - Run `lint_applet` and `compile_applet` to confirm zero lint or compilation errors.
