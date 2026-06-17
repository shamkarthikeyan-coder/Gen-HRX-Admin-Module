# GenHRX - Visual Flow Diagrams

## 📱 Complete User Journey

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         NEW USER ONBOARDING FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

╔═══════════════════════════════════════════════════════════════════════════╗
║                           SCREEN 1: SPLASH                                 ║
║  ┌─────────────────────────────────────────────────────────────────┐      ║
║  │  🎨 Hero Image (Carousel - 3 slides)                            │      ║
║  │  ┌─────────────────────────────────────────────────────────┐    │      ║
║  │  │ • Real Answers, No Noise                                │    │      ║
║  │  │ • Confessional Corner                                   │    │      ║
║  │  │ • Smart Benchmarks                                      │    │      ║
║  │  └─────────────────────────────────────────────────────────┘    │      ║
║  │                                                                  │      ║
║  │  genHRX Logo                                                     │      ║
║  │  "The Confidential Knowledge Network for HR"                    │      ║
║  │                                                                  │      ║
║  │  ┌──────────────────────────┐  ┌──────────────────────────┐    │      ║
║  │  │  Join the Community  →   │  │      Log In              │    │      ║
║  │  └──────────────────────────┘  └──────────────────────────┘    │      ║
║  └─────────────────────────────────────────────────────────────────┘      ║
╚═══════════════════════════════════════════════════════════════════════════╝
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
            "Join the Community"              "Log In"
                    │                               │
                    ▼                               ▼
┌───────────────────────────────┐    ┌───────────────────────────────┐
│  SCREEN 2: ROLE SELECTION     │    │  Direct to Authentication     │
│  ┌─────────────────────────┐  │    │  (for returning users)        │
│  │ Select Your Role:       │  │    └───────────────────────────────┘
│  │                         │  │
│  │ ☑ HR Practitioner       │  │
│  │ ☐ HR Leader             │  │
│  │ ☐ HR Influencer/Expert  │  │
│  │ ☐ Vendor (Waitlist)     │  │
│  │                         │  │
│  │   [Continue →]          │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    SCREEN 3: AUTHENTICATION                                │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  Work Email (Recommended)                                       │      │
│  │  ┌─────────────────────────────────────────────────────────┐    │      │
│  │  │  📧 you@company.com                                     │    │      │
│  │  └─────────────────────────────────────────────────────────┘    │      │
│  │  ✓ Verified domain - Instant access                            │      │
│  │                                                                  │      │
│  │  OR                                                              │      │
│  │                                                                  │      │
│  │  ┌────────────────────────────────────────┐                     │      │
│  │  │  in  Continue with LinkedIn (Recommended)│                    │      │
│  │  └────────────────────────────────────────┘                     │      │
│  │  ┌────────────────────────────────────────┐                     │      │
│  │  │  G   Continue with Google              │                     │      │
│  │  └────────────────────────────────────────┘                     │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│              SCREEN 4: PROFILE & CONTEXT SETUP (Step 1)                    │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  Progress: [████████░░] 50%                                     │      │
│  │                                                                  │      │
│  │  Full Name *          ┌──────────────────────────────┐          │      │
│  │                       │ Sarah Chen                   │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │  Job Title *          ┌──────────────────────────────┐          │      │
│  │                       │ Senior HR Director           │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │  Current Company *    ┌──────────────────────────────┐          │      │
│  │                       │ TechCorp Inc.                │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │  Organization Size *  ┌──────────────────────────────┐          │      │
│  │                       │ 501 - 1,000 employees ▼      │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │                               [Continue →]                      │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│              SCREEN 4: PROFILE & CONTEXT SETUP (Step 2)                    │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  Progress: [██████████] 100%                                    │      │
│  │                                                                  │      │
│  │  Industry *           ┌──────────────────────────────┐          │      │
│  │                       │ Technology/SaaS ▼            │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │  Location *           ┌──────────────────────────────┐          │      │
│  │                       │ San Francisco, CA            │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │  Years of Experience *┌──────────────────────────────┐          │      │
│  │                       │ 6-10 years ▼                 │          │      │
│  │                       └──────────────────────────────┘          │      │
│  │                                                                  │      │
│  │                               [Continue →]                      │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    SCREEN 5: INTEREST TAGS                                 │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  Select at least 3 focus areas                                  │      │
│  │  Selected: 3 tags ✓                                             │      │
│  │                                                                  │      │
│  │  ┌──────────────────┐ ┌──────────────────┐                      │      │
│  │  │ ☑ 🤝 Employee    │ │ ☑ 💰 Comp &      │                      │      │
│  │  │   Relations      │ │   Benefits       │                      │      │
│  │  └──────────────────┘ └──────────────────┘                      │      │
│  │                                                                  │      │
│  │  ┌──────────────────┐ ┌──────────────────┐                      │      │
│  │  │ ☑ 🎯 Talent      │ │ ☐ ⚡ HR Tech &   │                      │      │
│  │  │   Acquisition    │ │   Systems        │                      │      │
│  │  └──────────────────┘ └──────────────────┘                      │      │
│  │                                                                  │      │
│  │  ┌──────────────────┐ ┌──────────────────┐                      │      │
│  │  │ ☐ ⚖️ Compliance  │ │ ☐ 📚 Learning &  │                      │      │
│  │  │   & Legal        │ │   Development    │                      │      │
│  │  └──────────────────┘ └──────────────────┘                      │      │
│  │                                                                  │      │
│  │  ┌──────────────────┐ ┌──────────────────┐                      │      │
│  │  │ ☐ 🌈 Culture &   │ │ ☐ 📊 Performance │                      │      │
│  │  │   DEI            │ │   Management     │                      │      │
│  │  └──────────────────┘ └──────────────────┘                      │      │
│  │                                                                  │      │
│  │                               [Continue →]                      │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                   SCREEN 6: MASKED IDENTITY SETUP                          │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  🛡️ CONFESSIONAL CORNER                                        │      │
│  │                                                                  │      │
│  │  Create Your Confidential Persona                               │      │
│  │  This is how you appear when asking sensitive questions         │      │
│  │                                                                  │      │
│  │  ┌───────────────────────────────────────────────────────┐      │      │
│  │  │  Your Masked Identity:                                │      │      │
│  │  │                                                        │      │      │
│  │  │  "Senior HR Professional in Technology/SaaS,          │      │      │
│  │  │   501-1000 employees"                                 │      │      │
│  │  │                                                        │      │      │
│  │  │  [↻ Regenerate Alias]                                 │      │      │
│  │  └───────────────────────────────────────────────────────┘      │      │
│  │                                                                  │      │
│  │  ☑ Enable Safe-Sharing Mode by default                         │      │
│  │                                                                  │      │
│  │  Preview:                                                        │      │
│  │  ┌───────────────────────────────────────────────────────┐      │      │
│  │  │  🎭 Anonymous • 2h ago                                │      │      │
│  │  │  "How do I handle a CEO who undermines HR?"           │      │      │
│  │  │                                                        │      │      │
│  │  │  Posted by: Senior HR Professional in                 │      │      │
│  │  │  Technology/SaaS, 501-1000 employees                  │      │      │
│  │  └───────────────────────────────────────────────────────┘      │      │
│  │                                                                  │      │
│  │                         [Complete Setup →]                      │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                   SCREEN 7a: WELCOME TOUR OVERLAY                          │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  🎨 Full-screen hero image                                      │      │
│  │                                                                  │      │
│  │  Slide 1/3                                                       │      │
│  │  ━━━━━━━━━━                                                    │      │
│  │                                                                  │      │
│  │  Ask anything, anonymously                                       │      │
│  │                                                                  │      │
│  │  Post your toughest questions in our Confessional Corner.       │      │
│  │  Stay anonymous while getting real advice from verified HR      │      │
│  │  professionals.                                                  │      │
│  │                                                                  │      │
│  │  ● ○ ○                                                          │      │
│  │                                                                  │      │
│  │  [Next →]                                                        │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                  SCREEN 7b: FIRST ACTION NUDGE                             │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  ✨ You're All Set!                                             │      │
│  │                                                                  │      │
│  │  Welcome, Sarah!                                                 │      │
│  │  What would you like to do first?                               │      │
│  │                                                                  │      │
│  │  ┌──────────────────────────────────────────────────────┐       │      │
│  │  │  💬 Ask Your First Question                         │       │      │
│  │  │  Have a burning HR question? Ask anonymously        │       │      │
│  │  │  in the Confessional Corner                         │       │      │
│  │  │                           Post anonymously →        │       │      │
│  │  └──────────────────────────────────────────────────────┘       │      │
│  │                                                                  │      │
│  │  ┌──────────────────────────────────────────────────────┐       │      │
│  │  │  📖 Browse the Feed                                 │       │      │
│  │  │  Explore trending questions and answers from        │       │      │
│  │  │  your HR community                                  │       │      │
│  │  │                        See what's trending →        │       │      │
│  │  └──────────────────────────────────────────────────────┘       │      │
│  │                                                                  │      │
│  │  ┌──────────────────────────────────────────────────────┐       │      │
│  │  │  📊 View Benchmarks                                 │       │      │
│  │  │  See how your organization compares to peers        │       │      │
│  │  │  in your industry                                   │       │      │
│  │  │                           View insights →           │       │      │
│  │  └──────────────────────────────────────────────────────┘       │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                        SCREEN 8: HOME FEED                                 │
│  ┌─────────────────────────────────────────────────────────────────┐      │
│  │  🏠 Home  🔍 Search  ➕ Post  👤 Profile  💬 Messages           │      │
│  ├─────────────────────────────────────────────────────────────────┤      │
│  │  ✨ Complete Your Profile →                                     │      │
│  ├─────────────────────────────────────────────────────────────────┤      │
│  │  📌 TRENDING                                                     │      │
│  │  ┌───────────────────────────────────────────────────────┐      │      │
│  │  │  👤 Sarah Chen • VP of People • 2h ago               │      │      │
│  │  │  ✓ Verified                                          │      │      │
│  │  │                                                        │      │      │
│  │  │  Just wrapped our Q1 compensation review...          │      │      │
│  │  │                                                        │      │      │
│  │  │  💰 💬 234  🗨️ 56  📤 42  🔖                        │      │      │
│  │  └───────────────────────────────────────────────────────┘      │      │
│  │                                                                  │      │
│  │  ┌───────────────────────────────────────────────────────┐      │      │
│  │  │  🎭 Anonymous • HR Professional • 3h ago             │      │      │
│  │  │                                                        │      │      │
│  │  │  How do you handle a CEO who undermines HR?          │      │      │
│  │  │                                                        │      │      │
│  │  │  💰 289  🗨️ 94  📤 12  🔖                           │      │      │
│  │  └───────────────────────────────────────────────────────┘      │      │
│  └─────────────────────────────────────────────────────────────────┘      │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        APPLICATION STATE FLOW                            │
└─────────────────────────────────────────────────────────────────────────┘

User Action → Component Handler → State Update → API Call → Backend
     ↑                                  │                        │
     │                                  │                        ▼
     │                                  │                   Response
     │                                  │                        │
     │                                  ▼                        ▼
     └──────────── UI Update ←─── State Update ←───── Data Processing
                        │
                        ▼
                  Toast Notification
```

---

## 🗄️ Data Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA                                │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐
│    USERS TABLE           │
├──────────────────────────┤
│  PII (Private):          │
│  • id                    │
│  • full_name             │
│  • email                 │
│  • current_company       │
├──────────────────────────┤
│  Context (Benchmarks):   │
│  • role                  │
│  • job_title             │
│  • organization_size     │
│  • industry              │
│  • location              │
│  • years_of_experience   │
├──────────────────────────┤
│  Masked Identity:        │
│  • masked_alias          │
│  • masked_mode_default   │
├──────────────────────────┤
│  Verification:           │
│  • verification_badge    │
│  • verification_method   │
│  • verification_date     │
└──────────────────────────┘
           │
           ├──── user_interests
           │     (tags for feed)
           │
           ├──── posts
           │     (user content)
           │
           ├──── comments
           │     (interactions)
           │
           ├──── connections
           │     (followers/following)
           │
           └──── collections
                 (saved posts)
```

---

## 🔒 Privacy & Anonymity Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    DUAL POSTING MODE SYSTEM                              │
└─────────────────────────────────────────────────────────────────────────┘

User Creates Post
      │
      ▼
   ┌─────────────────────┐
   │  Select Post Mode   │
   └─────────────────────┘
            │
     ┌──────┴──────┐
     │             │
     ▼             ▼
┌─────────┐   ┌─────────────┐
│ REAL    │   │  MASKED     │
│ MODE    │   │  MODE       │
└─────────┘   └─────────────┘
     │             │
     ▼             ▼
┌─────────┐   ┌─────────────────────────────────┐
│ Shows:  │   │ Shows:                          │
│ ✓ Name  │   │ ✓ Masked Alias                  │
│ ✓ Title │   │ ✓ Professional Context          │
│ ✓ Badge │   │   (Role + Industry + Size)      │
└─────────┘   │                                 │
              │ Hides:                          │
              │ ✗ Name                          │
              │ ✗ Company                       │
              │ ✗ Email                         │
              │                                 │
              │ ✓ "Verified Professional" Badge │
              └─────────────────────────────────┘
```

---

## 📊 Component Dependency Tree

```
App.tsx
│
├── ThemeProvider (Context)
│
├── SplashScreen
│   └── Logo
│
├── RoleSelectionScreen
│   └── Button
│
├── AuthenticationScreen
│   ├── Input
│   └── Button
│
├── ProfileContextSetup
│   ├── Input
│   └── Button
│
├── InterestTagsScreen
│   └── Button
│
├── MaskedIdentitySetup
│   └── Button
│
├── WelcomeTourOverlay
│   └── Button
│
├── FirstActionNudge
│   └── Button
│
└── HomeFeed (Main App)
    ├── ProfileCompletionBanner
    ├── SearchPage
    │   └── UserProfileCard
    ├── PostDetailView
    │   └── SaveToCollectionModal
    ├── ConnectionsPage
    ├── CreatePostModal
    │   ├── AvatarEditorModal
    │   └── Textarea
    └── ProfilePage
        ├── AvatarEditorModal
        ├── BannerEditorModal
        ├── ExperienceFormModal
        ├── EducationFormModal
        └── CertificationFormModal
```

---

## 🎨 Design System Visual

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         COLOR PALETTE                                    │
└─────────────────────────────────────────────────────────────────────────┘

Primary Gradient:     [███████] → [███████]
                      Purple-600   Orange-500
                      #9333EA      #F97316

Dark Mode:
  Background:         [███████] #1a1d29
  Secondary:          [███████] #242833
  Tertiary:           [███████] #2d3142
  Border:             [███████] #363b4e

Light Mode:
  Background:         [███████] #ffffff
  Secondary:          [███████] #f8fafc
  Border:             [███████] #e2e8f0

Accent Colors:
  Success:            [███████] Green-500
  Error:              [███████] Red-500
  Warning:            [███████] Orange-500
  Info:               [███████] Blue-500
```

---

*This visual guide provides a complete overview of the GenHRX user experience flow.*
