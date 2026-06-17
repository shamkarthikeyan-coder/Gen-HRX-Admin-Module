# Kapwa — Product Design Style Guide & Redesign Direction

**Product:** Kapwa — HR Operations Platform
**Surface scope:** Admin console, document/article reading, content creation, decision rooms
**Baseline:** Live brand primary `#8C2DBA`, restrained purple system, system sans-serif stack
**Modes:** Light (default) + Dark

---

## 1. Design Direction

Kapwa should read as a **calm, premium, high-trust HR operations system** — closer to a financial or legal tool than a consumer app. The interface leads with **typography, whitespace, and a disciplined neutral canvas**, using a single restrained purple as the one source of emphasis rather than decoration. Purple marks *intent* — what is interactive, selected, or branded — and never floods full surfaces, so the product feels intentional instead of styled. Reading surfaces (articles, policies, decisions) get an **editorial treatment**: a single comfortable measure, generous line height, and quiet chrome that disappears around the content. Dashboards and workflows stay **compact and dense-but-legible**, organized by clear hierarchy and grouping rather than boxes-within-boxes. The result is a workspace that feels trustworthy, focused, and unmistakably professional — no loud gradients, no glow, no playful flourishes.

---

## 2. Brand Personality

| Keyword | What it means in the UI |
|---|---|
| **Trustworthy** | Predictable patterns, visible status, no surprises, confirmation on destructive acts |
| **Calm** | Muted canvas, soft shadows, restrained color, generous spacing |
| **Editorial** | Reading-first document pages, refined type scale, comfortable measure |
| **Precise** | Tabular numbers, aligned grids, consistent 4px rhythm |
| **Discreet** | Privacy/classification surfaced clearly; quiet chrome; emphasis only where it earns it |
| **Premium** | Detail in spacing, type, and elevation — not in effects |

---

## 3. Color System

Purple is reserved for **brand, interaction, and selection**. Neutrals carry the UI. Status colors are used as **small tinted signals**, not full-bleed fills.

### 3.1 Core tokens

| Token | Light | Dark | Notes |
|---|---|---|---|
| **Primary** | `#8C2DBA` | `#A855F7` | Brand + interactive accent |
| **Primary hover** | `#771FA0` | `#B558DE` | |
| **Primary active** | `#5E1980` | `#9333EA` | Pressed state |
| **Background** (app canvas) | `#F8F7FB` | `#0F0D14` | Faint cool/lavender tint, never pure gray |
| **Surface** (cards, panels) | `#FFFFFF` | `#17151E` | |
| **Elevated surface** (menus, modals, popovers) | `#FFFFFF` | `#201D2A` | In light mode, elevation = shadow, not color |
| **Border** (component edges) | `#E5E2EC` | `#2A2733` | Visible but quiet |
| **Divider** (in-surface separators) | `#EFEDF4` | `#211E29` | Lighter than border |
| **Heading text** | `#0F172A` | `#F8FAFC` | |
| **Body text** | `#334155` | `#C7CBD6` | Comfortable for long reading |
| **Muted text** (meta, labels, placeholders) | `#64748B` | `#8B90A0` | |

### 3.2 Status colors

Use the **base** for icons/borders/text, the **tint** for badge/banner backgrounds, and the **on-tint** color for text on the tint.

| Status | Base (Light) | Tint (Light) | Base (Dark) | Tint (Dark) |
|---|---|---|---|---|
| **Success** | `#16A34A` | `#ECFDF5` | `#34D399` | `#0E2A20` |
| **Warning** | `#F59E0B` | `#FFF7ED` | `#FBBF24` | `#2A2110` |
| **Error** | `#DC2626` | `#FEF2F2` | `#F87171` | `#2C1414` |
| **Info** | `#2563EB` | `#EFF4FF` | `#60A5FA` | `#11203A` |

> Emerald `#059669`, blue `#3B82F6`, orange `#F97316`, and pink `#EC4899` are **reserved for data-viz / category accents only** — never for primary chrome.

### 3.3 Purple ramp (for tints, hovers, selection)

| Step | Hex | Use |
|---|---|---|
| 50 | `#FAF1FF` | Faintest hover/selected wash |
| 100 | `#F3E8FF` | Selected nav, subtle fills |
| 200 | `#EDE9FE` | Secondary-button hover, chips |
| 300 | `#D8C5EC` | Subtle borders on purple surfaces |
| 400 | `#B558DE` | Accent / dark-mode primary hover |
| 500 | `#8C2DBA` | **Primary** |
| 600 | `#771FA0` | Primary hover |
| 700 | `#5E1980` | Primary active |
| 900 | `#2E0C40` | Deep accent, dark-mode purple surfaces |

### 3.4 Focus ring

- Light: `0 0 0 3px rgba(140, 45, 186, 0.32)`
- Dark: `0 0 0 3px rgba(168, 85, 247, 0.45)`

> **Dark-mode primary buttons:** pair a `#8C2DBA` fill with white text (passes AA, keeps brand) **or** use `#A855F7` fill with near-black text (`#1A1420`). Reserve `#A855F7`/`#B558DE` for text, icons, links, and active states on dark.

---

## 4. Typography

Keep the existing **system sans stack** for all UI. Add an **optional editorial serif** for long-form document body only, to deepen the reading experience without introducing webfonts elsewhere.

- **UI font family:** system sans
- **Fallback stack:**
  `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
- **Optional reading font (document body only):** `"Source Serif 4", "Newsreader", Georgia, Cambria, "Times New Roman", serif`
- **Numerals:** `font-variant-numeric: tabular-nums` for tables, metrics, IDs

### Type scale

| Role | Size | Line height | Weight | Tracking |
|---|---|---|---|---|
| Page title (H1) | 24px / 1.5rem | 1.25 | 600 | −0.01em |
| Section title (H2) | 18px / 1.125rem | 1.30 | 600 | −0.005em |
| Subsection / card title (H3) | 15px / 0.9375rem | 1.4 | 600 | 0 |
| **Body (UI default)** | 14px / 0.875rem | 1.55 | 400 | 0 |
| Reading body (documents) | 16px / 1rem | 1.70 | 400 | 0 |
| Small / meta | 12px / 0.75rem | 1.4 | 500 | +0.04em (uppercase labels) |
| Button text | 14px / 0.875rem | 1.0 | 500 | +0.01em |

### Weights

| Weight | Value | Use |
|---|---|---|
| Regular | 400 | Body, reading |
| Medium | 500 | Buttons, meta labels, emphasis in body |
| Semibold | 600 | All headings, key numbers |
| Bold | 700 | Sparingly — alerts, critical figures only |

**Hierarchy rule:** express levels with **size + weight + color (muted vs. body vs. heading)** — at most 3 levels per view. Avoid using borders/boxes to create hierarchy.

---

## 5. Spacing System (4px scale)

| Token | px | Typical use |
|---|---|---|
| `space-0` | 0 | Reset |
| `space-1` | 4 | Icon ↔ label gap, chip padding |
| `space-2` | 8 | Tight stacks, input inner padding |
| `space-3` | 12 | Control padding, list-row gaps |
| `space-4` | 16 | Default element gap, card inner padding (compact) |
| `space-5` | 20 | Card inner padding (standard) |
| `space-6` | 24 | Section gaps, grid gutters |
| `space-8` | 32 | Block separation |
| `space-10` | 40 | Major section separation |
| `space-12` | 48 | Page section breaks |
| `space-16` | 64 | Page top/bottom padding (desktop) |
| `space-20` | 80 | Hero/empty-state breathing room |
| `space-24` | 96 | Reading-page vertical rhythm |

**Density defaults:** card padding `20px`, page gutters `24px`, table row height `48px`, control height `36px`.

---

## 6. Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-xs` | 4px | Tags, chips, micro-labels |
| `radius-sm` | 6px | Inputs, small buttons |
| `radius-md` | 8px | **Buttons, menus, inputs (default)** |
| `radius-lg` | 12px | Cards, panels |
| `radius-xl` | 16px | Modals, large surfaces, drawers |
| `radius-full` | 9999px | Pills, avatars, toggles |

Restrained on purpose — no pill-shaped cards, no 20px+ rounding on containers.

---

## 7. Shadow System

Soft, low-spread, **cool slate-tinted** — elevation, never glow. Apply shadows only where elevation is meaningful (hovered cards, menus, modals).

| Token | Light | Dark |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(15,23,42,0.04)` | `0 1px 2px rgba(0,0,0,0.40)` |
| `shadow-sm` | `0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)` | `0 1px 3px rgba(0,0,0,0.50)` |
| `shadow-md` | `0 4px 12px rgba(15,23,42,0.08)` | `0 6px 16px rgba(0,0,0,0.55)` |
| `shadow-lg` | `0 12px 32px rgba(15,23,42,0.10)` | `0 16px 40px rgba(0,0,0,0.60)` |

> No purple-tinted shadows, no `box-shadow` glows, no neon.

---

## 8. Buttons

Height `36px` (default), `32px` (sm), `44px` (lg). Radius `8px`. Text 14px / 500. One **primary** action per view.

| Variant | Fill | Text | Border | Hover | Active |
|---|---|---|---|---|---|
| **Primary** | `#8C2DBA` | `#FFFFFF` | none | `#771FA0` | `#5E1980` |
| **Secondary** (tonal/outline) | `#FFFFFF` | `#334155` | `#E5E2EC` | bg `#F5F3FF`, border `#D8C5EC` | bg `#EDE9FE` |
| **Ghost** (low emphasis) | transparent | `#5E1980` | none | bg `#F5F3FF` | bg `#EDE9FE` |
| **Destructive** | `#DC2626` | `#FFFFFF` | none | `#B91C1C` | `#991B1B` |

Rules:
- Solid primary is the **only** filled-purple element by default.
- Destructive actions always require confirmation and are placed apart from safe actions.
- Disabled: 40% opacity, no shadow, `cursor: not-allowed`.
- Every button shows the focus ring (§3.4) on keyboard focus.

---

## 9. Card Patterns

Three distinct card languages — keep them visually separable so users always know which mode they're in.

### Dashboard cards (metrics / queues)
- Surface `#FFFFFF`, border `#E5E2EC`, `radius-lg` (12px), padding `20px`, `shadow-xs`.
- Layout: uppercase muted label (12px) → large value (24–28px, 600, tabular) → optional delta/hint (12px muted).
- At most **one** accent: a small tinted icon chip or a single colored figure. No full-color card backgrounds.
- Hover (if clickable): border → `#D8C5EC`, `shadow-sm`.

### Document cards (library / lists)
- Editorial. Title 15–16px / 600 heading-color → 2-line excerpt (body, clamped) → meta row (author · date · status pill).
- `radius-lg`, padding `20px`, flat with border by default; hover lifts to `shadow-sm`.
- Optional **3px left status/classification bar** (e.g., purple = published, amber = draft, slate = archived).
- Generous vertical spacing; treat as content, not as a control.

### Feed cards (decision rooms / activity)
- Conversational and compact. Avatar + name + relative timestamp on one line → content → inline action row.
- **Flat**: border or divider-separated stream, `radius-md`, no shadow — keeps long streams calm.
- Moderation/destructive actions are visually grouped and de-emphasized until hover/focus.
- System events (joined, status changed) render as quiet inline dividers, not cards.

---

## 10. Layout Guidance

### Left sidebar
- Fixed width **248px**; collapsible to a **64px** icon rail.
- Surface slightly distinct from canvas (light: `#FFFFFF` or `#FBFAFD`; dark: `#141220`).
- Grouped nav with small uppercase muted section labels; items 36px tall, icon 16–18px.
- **Active item:** lavender fill `#F3E8FF` + primary text `#5E1980` + 2px left accent bar. No heavy highlight.
- Footer: environment/account context in muted 12px.

### Top bar
- Height **56–64px**, surface `#FFFFFF`, bottom `divider`, sticky.
- Left: page context / breadcrumb. Center-left: global search (⌘K). Right: notifications, help, admin avatar.
- Quiet — no colored header band, no large logo lockup. Search and identity are the only emphasis.

### Dashboard home
- Centered max width **1200–1280px**, 12-col grid, 24px gutters.
- Row 1: short greeting + **3–6 metric cards**. Row 2: 2-column — primary work queues (left, wider ~8 col) and recent activity / audit (right, ~4 col).
- Lead with what needs action; group related modules; cap cards per row. Section titles (18px/600) separate zones.

### Document reading page
- Single centered column, **measure ~680–720px**, reading body 16px / 1.7 (optional serif).
- Sticky lightweight right rail: metadata (author, last updated, version), **privacy/classification badge**, table of contents.
- Chrome recedes: muted top bar, no sidebar emphasis, ample top/bottom space (`space-24`). Distraction-free.

### Content creation flow
- Focused mode: **collapse the sidebar**, two-pane (editor left / preview or guidance right) or stepped wizard.
- Persistent **autosave status**, a single sticky footer with one primary CTA + secondary "Save draft".
- Lots of whitespace, one decision at a time, progress indicator for multi-step. No competing CTAs.

### Decision room flow
- Workspace header: topic, participants (avatars), **status pill**, **privacy badge**, room actions.
- Center: the decision thread/feed (feed cards, §9). Right rail: participants, current decision state, and **moderation actions** (hide/remove) clearly separated and confirmation-gated.
- Real-time but calm: status changes as quiet inline events; destructive moderation never sits beside routine replies.

---

## 11. UX Recommendations — Reduce Clutter, Improve Hierarchy

1. **One primary action per screen.** Everything else is secondary or ghost.
2. **Hierarchy via type, not boxes.** Use size/weight/color (3 levels max); replace nested card borders with whitespace + dividers.
3. **Ration the purple.** Color only interactive, selected, or brand elements. A mostly-neutral screen with one purple action reads as premium.
4. **Status as small tinted pills**, not full-color rows or backgrounds.
5. **Tables:** no zebra striping; row hover, sticky header, tabular numerals, 48px rows, right-aligned numbers.
6. **Consistent 4px rhythm** and grid alignment everywhere — inconsistency reads as cheap.
7. **Muted meta + uppercase micro-labels** for secondary info so primary content stays dominant.
8. **Privacy & classification are first-class:** a consistent badge on every document and room.
9. **Shadows only for true elevation** (menus, modals, hovered/clickable cards) — flat by default.
10. **Empty states** present a single clear next action, not decoration.
11. **Separate the three modes** (dashboard / creation / reading) by layout and card language so context is never ambiguous.

---

## 12. Design Prompt for Implementation

> **Build/redesign Kapwa, an HR operations platform, as a calm, premium, high-trust B2B SaaS product.** Use a mostly-neutral canvas (light `#F8F7FB` / surfaces `#FFFFFF`; dark `#0F0D14` / surfaces `#17151E`) with a **single restrained purple** brand color `#8C2DBA` (hover `#771FA0`, active `#5E1980`; dark-mode accent `#A855F7`). Purple appears **only** on interactive, selected, and brand elements — never as full-surface fills, gradients, or glows. Type: system sans stack; scale = page title 24/600, section 18/600, card 15/600, body 14/400 (1.55), meta 12/500 uppercase, button 14/500; document-reading pages use a 16px/1.7 single ~700px column with an optional serif. Spacing on a strict 4px scale (card padding 20, gutters 24, rows 48, controls 36px). Radius: 8px controls, 12px cards, 16px modals. Shadows: soft, cool, low-spread, elevation-only. Buttons: solid-purple primary (one per screen), tonal/outline secondary, ghost, red destructive (`#DC2626`, confirmation-gated). Status colors used as small tinted pills (success `#16A34A`, warning `#F59E0B`, error `#DC2626`, info `#2563EB`). Layout: 248px collapsible sidebar (active item = `#F3E8FF` fill + `#5E1980` text + left accent), quiet 56–64px sticky top bar with ⌘K search, dashboard on a 1200–1280px 12-col grid (metrics row + queues/activity), distraction-free document reader with a metadata + privacy rail, focused creation flow (collapsed nav, autosave, single sticky CTA), and a decision-room workspace (thread + participant/decision rail with separated, confirmation-gated moderation). **Prioritize hierarchy, readability, privacy, and workflow clarity. No loud gradients, glows, playful cards, or generic AI-startup visuals.** Ship light- and dark-mode tokens per the Kapwa color system.

---

*Token names map cleanly onto the existing Tailwind v4 theme (`src/styles/theme.css`): `--primary`, `--background`, `--card`, `--popover`, `--border`, `--muted-foreground`, `--sidebar*`, etc. The values above can be dropped in as the `:root` / `.dark` token set.*
