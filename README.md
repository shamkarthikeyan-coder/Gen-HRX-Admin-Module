# GenHRX · Admin Console — Desktop Prototype

A working, desktop-optimized prototype of the GenHRX Admin Console, scaffolded
from the **Admin CTA Functional Specs (CTAs 1–18)**. It covers Content
Moderation, User Account Management, and Vendor & Marketplace Administration.

> **No backend.** This is a pure front-end prototype. All data lives in an
> in-memory store seeded at startup (`src/data/seed.ts`). Every CTA mutates that
> store locally — there are no APIs, no database, and nothing to deploy. Use
> **Reset demo** (top bar) to restore the seed at any time.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS v4** with the provided design tokens (`src/styles/theme.css`)
- **sonner** for toasts, **lucide-react** for icons
- shadcn-style UI primitives, hand-built on the theme tokens (no Radix dependency)

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + production build), `npm run preview`,
`npm run typecheck`.

## What's wired up

Each CTA is implemented as a local-state action in `src/store/AppStore.tsx`,
surfaced through a feature page. Actions commit atomically (entity change +
moderation record + audit entry + domain event + notification in one update),
mirroring the spec's "single transaction" guarantee.

| CTAs | Surface | Page |
| --- | --- | --- |
| 1–5 | General moderation queue (review, dismiss, remove, warn, escalate) | `src/pages/ModerationQueue.tsx` |
| 6–8 | Decision Rooms (review, hide/unhide, remove w/ appeal) | `src/pages/DecisionRooms.tsx` |
| 9–13 | User accounts (search/inspect, warn, suspend, ban, lift) | `src/pages/Users.tsx` |
| 14–15 | Vendor subscriptions (activate / deactivate, graceful degrade) | `src/pages/Vendors.tsx` |
| 16–18 | Sponsored placements (create, reorder, remove) | `src/pages/Placements.tsx` |
| — | Immutable audit log, moderation records, domain events, notifications | `src/pages/AuditLog.tsx` |

> The app lands on the **Moderation Queue** (`/`), the spec's actual admin entry
> surface. There is no metrics dashboard — Platform Analytics & Reporting
> (CTAs 19–30) is out of scope for this build.

## Spec fidelity baked into the prototype

- **Error codes** from the TRD (e.g. `409 USER_ALREADY_SUSPENDED`,
  `400 MODERATION_REASON_TOO_SHORT`, `400 BAN_CONFIRMATION_INVALID`) are raised
  by store guards and shown as toasts (`src/lib/errors.ts`, `src/lib/runAction.ts`).
- **Reason fields** enforce the 10–500 char rule with a live counter.
- **Ban** requires the exact case-sensitive token `CONFIRM`.
- **Suspension** uses a single-active-suspension invariant and preset durations.
- **Atomic rollback** is demonstrable: toggle *Simulate a hide write failure*
  (Decision Rooms) — the action fails and nothing changes.
- **Async notifications** are dispatched to a simulated queue (bell menu),
  flipping `queued → delivered`, with an occasional non-blocking `delayed` hop.
- **Open questions / gaps** are surfaced inline as callouts: **OQ-1** suspension
  durations, **OQ-2** admin role hierarchy (escalate is status-only), **G-3**
  vendor subscription UI, **G-4** Decision Room force-close.

## Project structure

```text
src/
  data/      types.ts, seed.ts          # domain model + seed (the "database")
  store/     AppStore.tsx               # in-memory store; all 18 CTA actions
  lib/       cn, errors, format, runAction
  components/
    ui/      button, badge, card, dialog, table, tabs, input, textarea,
             label, reason-field, empty-state, spec-note
    shared/  page, badges, ContentBlock
    layout/  AppShell, Sidebar, Topbar
  pages/     Dashboard, ModerationQueue, DecisionRooms, Users, Vendors,
             Placements, AuditLog
  styles/    fonts.css, tailwind.css, theme.css, index.css
```

## Notable scope notes

The behaviors blocked on open questions are stubbed honestly rather than guessed:
escalation changes flag status only (no role routing — **OQ-2**), suspension
durations are placeholder presets (**OQ-1**), and Decision Room *force-close*
(**G-4**) is called out but not implemented, matching the spec.
