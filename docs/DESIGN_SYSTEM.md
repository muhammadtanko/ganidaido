# Gani da Ido — Design System

**Status:** Draft v1.0
**Scope:** Visual language and interaction principles for the Gani da Ido platform (internal officer/verifier tools, admin console, and public accountability dashboard).
**This document defines the system, not final screens.** It is the shared vocabulary designers and engineers build from.

---

## 1. Design Principles

Three words drove every decision below: **intuitive, simple, premium enterprise.** Translated into concrete commitments:

| Principle | What it means here | What it rules out |
|---|---|---|
| **Intuitive** | A field officer who has never used the system should be able to submit a monthly update without training. | Clever but unlabeled icons, hidden gestures, jargon-only labels. |
| **Simple** | Every screen does one job. Density is earned (internal power screens), never defaulted. | Dashboards that show everything at once "just in case." |
| **Premium enterprise** | Earned through restraint and consistency — tight spacing rules, one disciplined accent color, zero decorative flourish — not through visual richness. | Gradients, heavy shadows, multiple competing accent colors, stock-photo illustration. |

A fourth, unspoken principle sits underneath all of it: **trust is the actual brand attribute.** This platform exists to make citizens believe a number about public spending is real. Every visual decision should be judged against that bar before "does this look expensive."

---

## 2. Color System

### 2.1 Neutral scale (base UI)

A slightly warm, desaturated slate — not pure gray — used for all backgrounds, borders, and body text.

| Token | Hex | Usage |
|---|---|---|
| `neutral-50` | `#F8F9FB` | Page background (light) |
| `neutral-100` | `#F1F3F6` | Subtle fills, table stripe |
| `neutral-200` | `#E3E7ED` | Default borders, dividers |
| `neutral-300` | `#CBD2DC` | Disabled borders, placeholder icons |
| `neutral-400` | `#9AA5B4` | Placeholder text, disabled text |
| `neutral-500` | `#6B7585` | Secondary/muted text |
| `neutral-600` | `#4C5564` | Body text (dark mode secondary) |
| `neutral-700` | `#363D4A` | Body text (light mode primary) |
| `neutral-800` | `#232933` | Headings, high-emphasis text |
| `neutral-900` | `#121620` | Dark mode page background |

### 2.2 Accent (brand) — Deep Blue

One accent, used for primary actions, active/selected states, links, and "in progress / in review" status. Never used for decoration.

| Token | Hex | Usage |
|---|---|---|
| `accent-50` | `#EEF3FC` | Selected-row fill, hover tint |
| `accent-100` | `#DCE8F9` | Badge background (light) |
| `accent-300` | `#8DB3EA` | Icon on dark surfaces |
| `accent-500` | `#2563C7` | **Primary** — buttons, links, focus ring |
| `accent-700` | `#153E80` | Hover/active state, dark-mode primary text |

### 2.3 Semantic palette (status & verification)

Five hues, reused consistently everywhere a status appears. **Color is never the sole carrier of meaning** — every semantic color is always paired with an icon and a text label (critical for colorblind users and for low-literacy field contexts).

| Meaning | Hue | Hex (500) | Used for |
|---|---|---|---|
| Neutral / inactive | Gray | `#6B7585` | Draft, Verification Pending, no data |
| In progress | Blue (= accent) | `#2563C7` | In Review, Ongoing |
| Attention / partial | Amber | `#D97706` | Partly Verified, Delayed, Open feedback |
| Positive / confirmed | Green | `#15803D` | Approved, Verified, Completed |
| Negative / blocked | Red | `#D92D2D` | Rejected, Not Verified, Abandoned/Stalled, Safeguarding flag (internal only) |

Each semantic hue gets a 3-step scale (`-100` soft fill, `-500` text/icon, `-700` strong/emphasis) so it can render as a soft badge or a strong alert in either theme. Dark mode uses the same hues shifted brighter/lighter (e.g. green text on dark background uses `#4ADE80`, not `#15803D`, to hold contrast) — see §8.

**Rule:** `Approved` and `Published` are visually related (both "good") but distinguishable — `Approved` renders as an **outline** green badge, `Published` as a **filled** green badge, since Published is the final, public-facing state and should read as more final.

---

## 3. Typography

| Role | Typeface | Why |
|---|---|---|
| **Display** (H1–H3, dashboard hero numbers) | Space Grotesk | Geometric, distinctive, gives the brand character on headlines without sacrificing legibility. Open-source, pairs cleanly with the body face. |
| **UI / Body** (everything else: forms, tables, nav, buttons) | Inter | Neutral, exhaustively tested at small sizes, excellent language coverage (future Hausa-ready). |
| **Data** (Project IDs, amounts, dates in tables) | IBM Plex Mono | Tabular alignment for scanning numbers/IDs; signals "this is precise, auditable data" at a glance. |

### Type scale

| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| `display-lg` | 32 / 40 (28/36 mobile) | 600 | Dashboard page title |
| `display-sm` | 24 / 32 | 600 | Section headers |
| `heading` | 20 / 28 | 600 | Card/panel titles |
| `heading-sm` | 16 / 24 | 600 | Table section headers, form group labels |
| `body-lg` | 16 / 24 | 400 | Primary reading text |
| `body` | 14 / 20 | 400 | Default UI text (forms, tables, nav) — the workhorse size |
| `caption` | 12 / 16 | 500 | Timestamps, helper text, badge labels |
| `data` | 14 / 20 | 500 (mono, tabular-nums) | Amounts, IDs, dates in tables |

---

## 4. Spacing & Layout

4px base unit. Using only this scale everywhere is what makes the system feel "considered" rather than ad hoc.

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`

- **Form fields:** 8px internal padding, 16px between fields, 24px between field groups.
- **Cards:** 24px internal padding (16px on mobile).
- **Page margins:** 24px mobile, 48px tablet, 64px desktop.

### Breakpoints

| Name | Range | Behavior |
|---|---|---|
| Base | 0–599px | Single column, stacked cards, tables collapse to row-cards |
| Tablet | 600–959px | 2-column stat grids, tables gain horizontal scroll |
| Desktop | 960–1279px | Full data tables, sidebar nav visible |
| Wide | 1280px+ | Max content width capped at 1440px, centered — never stretch tables edge-to-edge on large monitors |

---

## 5. Shape & Elevation

- **Radius:** soft, moderate rounding — `sm` 6px (inputs, badges, small buttons), `md` 10px (cards, buttons, modals), `full` (avatars, pill badges only). Never sharp, never heavily rounded.
- **Surface elevation (cards, panels, page sections):** flat, separated by a 1px `neutral-200` (light) / `neutral-700` (dark) border. No shadow. This is what keeps the data-dense internal screens feeling crisp rather than "app-like."
- **Floating elevation (modals, dropdowns, toasts, tooltips):** the one exception — these sit *above* content, not beside it, so they get a subtle shadow (`0 8px 24px rgba(18,22,32,0.12)`) in addition to a border, so they read as detached from the page.

---

## 6. Iconography & Illustration

- **Icon style:** line icons only, 1.5px stroke, 20px default / 24px for primary nav and empty-state icons. Recommend an open-source, consistent-stroke family (e.g. Phosphor or Lucide) so coverage is broad and additions stay visually consistent.
- **No decorative illustration** inside working screens (tables, forms, dashboards).
- **Exception — empty states only:** one simple, single-color line illustration (using `neutral-300`/`accent-300`, never multi-color) for states like "No projects registered yet" or "No feedback received." This is the system's one permitted moment of warmth, reserved specifically for softening first-run and empty experiences for public/new users — never used in dense internal workflows.

---

## 7. Motion

Subtle, fast, purposeful — motion should feel like confirmation, not decoration.

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 120ms | Hover states, button press |
| `duration-base` | 180ms | Panel expand/collapse, tab switch |
| `easing-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | All transitions |

- **Loading:** skeleton placeholders (neutral-100/200 shimmer), never spinners for table/dashboard content.
- **Respect `prefers-reduced-motion`:** all transitions collapse to instant state changes if the OS setting requests it — non-negotiable given low-bandwidth, often older devices.

---

## 8. Dark Mode

Dark mode is a full parallel system, not an inverted filter.

| Surface | Light | Dark |
|---|---|---|
| Page background | `neutral-50` | `#0B0D11` |
| Card/panel background | `#FFFFFF` | `#15181D` (one step lighter than page bg, not darker) |
| Border | `neutral-200` | `neutral-700`-equivalent, lightened for visibility: `#2A313D` |
| Primary text | `neutral-800` | `#F1F3F6` |
| Secondary text | `neutral-500` | `#9AA5B4` |

Semantic colors (green/amber/red/blue/gray) each need a **dark-mode-specific text/icon value** — brighter and slightly desaturated from their light-mode `-500` value — so they hold WCAG AA contrast against the dark surfaces above. This must be verified with a contrast checker per hue at implementation time, not assumed.

---

## 9. Trust & Verification Visual Language

This is the system's signature pattern — it exists in no generic design system and is the most important thing to get right.

**Rule:** any figure or status derived from field verification is always shown with a **badge**: colored pill + icon + text label, never color alone, never bare text.

| Status | Badge | Icon | Color |
|---|---|---|---|
| Verified | Filled pill | Check-in-circle | Green |
| Partly Verified | Filled pill | Half-check / exclamation | Amber |
| Not Verified | Filled pill | X-in-circle | Red |
| Verification Pending | Outline pill | Clock | Gray |

Self-reported figures that have **not yet** been through this badge system are shown as plain text with a small "self-reported" caption underneath in `neutral-500` — the *absence* of a badge is itself meaningful and must never be confused with a gray "pending" badge (one is "not yet claimed as verified," the other is "actively queued for verification").

This same badge pattern is reused for the **publication workflow** (Draft/Review/Approved/Published/Rejected), so users learn one visual grammar for "what state is this record in" across the whole product.

---

## 10. Data Visualization

**Numbers-first.** The dashboard's job is to make a citizen or officer trust a figure instantly — not to impress with charts.

- Large, bold numerals (`display-sm` size, tabular-nums) are the primary element on every stat tile.
- Charts are secondary and minimal: small bar or line sparklines beneath the number, never standalone.
- Charts use **neutral + accent blue only** — reserve the semantic palette (green/amber/red/gray) strictly for status breakdowns (e.g. a bar chart of projects by verification result), never for arbitrary category coloring.
- No 3D, no gradients, no drop-shadows on chart elements.

---

## 11. Core Components (pattern inventory)

Not full specs — this is the component vocabulary to design next, in priority order:

1. **Stat tile** (dashboard) — numeral + label + optional sparkline + optional trend delta
2. **Status badge** (§9)
3. **Data table** — sticky header, sortable columns, row-to-card collapse on mobile, built-in filter bar
4. **Filter bar** — sector / project type / LGA / status / period, same component on every list screen
5. **Form fields** — text, currency (auto-formatted with thousands separators, NGN prefix), dropdown/select, date, file/evidence upload, percentage slider-or-input
6. **Card** — project summary card (public + internal variants, same component, different data density)
7. **Button** — primary (accent fill), secondary (outline), ghost (text-only), destructive (red outline, confirms before red fill)
8. **Modal / dialog** — confirmation and record-detail use cases
9. **Toast / inline alert** — success, error, warning, info — using the semantic palette
10. **Empty state** — icon/illustration + one-line message + primary action
11. **Navigation** — sidebar (internal roles), simple top nav (public dashboard) — same brand marks, different structure per §1 density principle

---

## 12. Accessibility Standards

Non-negotiable baseline, not aspirational:

- **WCAG 2.1 AA** minimum contrast for all text and meaningful icons, in both themes.
- **Color is never the sole signal** — every status/semantic use pairs color with icon and/or text (§9, §2.3).
- **Touch targets** minimum 44×44px — field officers are using this on mobile, often outdoors, often one-handed.
- **Visible focus state** on every interactive element: 2px accent outline, 2px offset — kept even though general motion is subtle, because keyboard/assistive-tech navigation must never be ambiguous.
- **Reduced motion respected** (§7).
- **No text baked into images or icons** — required both for accessibility and for future Hausa localization.

---

## 13. Localization Readiness

The platform must support future Hausa translation without a redesign:

- All UI strings externalized — no hard-coded copy in components.
- Layouts must tolerate **+30% text length** versus English without breaking (Hausa and translated labels tend to run longer).
- No fixed-width buttons/labels sized to exact English character counts.
- Numerals, currency formatting, and date formats are locale-aware tokens, not hard-coded.

---

## 14. Governance

- All values in this document (color hex, spacing, radius, type scale, motion durations) are **design tokens** — defined once, consumed everywhere. No screen should hand-pick a one-off color or spacing value.
- Any new component must be built from existing tokens before a new token is proposed.
- Any change to the semantic status-color mapping (§2.3, §9) requires re-checking contrast in both themes before shipping — this mapping is load-bearing for the product's trust claims, not a cosmetic choice.

---

## 15. Decisions Log (for traceability)

| Area | Decision |
|---|---|
| Visual direction | Restrained enterprise, trust-first — no named-product mimicry |
| Color source | Fresh neutral palette + single accent (deep blue) |
| Density | One adaptive system — dense internal, simplified public |
| Theme | Full light + dark parity |
| Shape | Soft/moderate radius (8–10px) |
| Typography | Inter (UI/body) + Space Grotesk (display/headlines) + IBM Plex Mono (data) |
| Icons | Line icons only; illustration limited to empty states |
| Motion | Subtle polished micro-interactions, reduced-motion aware |
| Elevation | Flat + hairline borders for surfaces; shadow reserved for floating elements |
| Trust cues | Badge + icon system for verified vs. self-reported data |
| Data viz | Numbers-first, charts secondary and minimal |

---
*This document defines the visual and interaction system for Gani da Ido. Pair with `PRD.md` for functional scope and the MVP module list the first component build should target.*
