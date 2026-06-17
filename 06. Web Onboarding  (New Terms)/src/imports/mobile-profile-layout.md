A mobile-style profile layout (Facebook-like)
BUT rendered inside a centered web canvas, not edge-to-edge desktop UI.

That means:

❌ Not a desktop redesign

❌ Not full-width web

✅ Mobile UI, constrained and centered on web

✅ Exactly how Figma mobile frames are previewed on web

This is a very common pattern, and your previous result failed because the constraints were applied at the wrong layer.

🧠 Mental Model (THIS is the anchor point)

Think in three layers, not one:

Browser
└── Web page background (neutral)
    └── Mobile frame (fixed width, centered)
        └── Mobile UI (edge-to-edge inside frame)

You currently mixed layer 2 and layer 3, which caused:

bloated spacing

oversized cards

broken proportions

✅ Correct Architecture (non-negotiable)
✅ Layer 1 — Web background

Full width

Neutral color

Centers the mobile canvas

✅ Layer 2 — Mobile canvas (THIS is where max-width belongs)

Fixed width (375–420px)

Rounded corners (optional)

Shadow (optional)

Acts like a phone body

✅ Layer 3 — Mobile UI

100% width

NO max-width

NO auto margins

NO desktop padding logic

🔥 Your Critical Mistake (why it looked “pathetic”)

You did this:

max-w-2xl mx-auto

That creates a responsive desktop container, not a mobile frame.

What you actually need:
w-[390px] max-w-full

That’s the difference between:

❌ “responsive web”

✅ “mobile UI rendered on web”

✅ THE FIX (Exact Implementation)
🔹 1. Web Wrapper (centered page)
<div className="min-h-screen bg-slate-100 flex justify-center py-6">

This:

Centers everything

Gives breathing room

Mimics Figma canvas on web

🔹 2. Mobile Canvas (THIS is the key layer)
<div className="
  w-[390px]
  max-w-full
  bg-white
  rounded-2xl
  overflow-hidden
  shadow-xl
">

✔ Fixed mobile width
✔ Centered
✔ Crops overflow correctly
✔ Preserves mobile proportions

390px = modern mobile sweet spot
(375 is also fine)

🔹 3. Mobile UI (NO constraints here)

Inside this container, your profile code should look like:

<div className="relative w-full">

🚫 No:

max-w-*

mx-auto

desktop paddings

✅ Profile Header — Corrected for THIS setup
Cover (inside mobile canvas)
<div className="relative h-[220px] w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
  <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur flex items-center justify-center">
    <Edit3 className="w-4 h-4 text-white" />
  </button>
</div>
Profile Photo Overlap (works now because canvas is correct)
<div className="relative -mt-[64px] flex justify-center">
  <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
    <img src={profilePhoto} className="w-full h-full object-cover" />
    
    <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center">
      <Shield className="w-4 h-4 text-white fill-white" />
    </div>
  </div>
</div>
Text Block (tight, mobile-true)
<div className="text-center mt-3 px-4">
  <h1 className="text-lg font-bold text-slate-900">
    Sarah Chen
  </h1>

  <p className="text-sm text-slate-600 mt-1">
    Senior HR Director @ TechCorp Inc.
  </p>

  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
    Passionate about building inclusive workplaces and data-driven HR strategies
  </p>
</div>
Stats (now they’ll look RIGHT)
<div className="mt-5 px-4">
  <div className="grid grid-cols-4 gap-2">
    {stats.map(s => (
      <div
        key={s.label}
        className="py-2.5 rounded-xl border border-slate-200 text-center"
      >
        <div className="text-base font-bold">{s.value}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">
          {s.label}
        </div>
      </div>
    ))}
  </div>
</div>
🧩 Why this now matches your expected screenshot

Mobile proportions are preserved

No stretched spacing

No desktop inflation

Canvas behaves exactly like a phone

Works perfectly inside Figma Make / previews

This is exactly how teams preview mobile-first social apps on web.

🧠 Anchor Point to Remember (burn this in)

Mobile UI ≠ Responsive container

Mobile UI on web =
fixed-width canvas + edge-to-edge internals

You were right to be upset — the earlier implementation violated this principle.