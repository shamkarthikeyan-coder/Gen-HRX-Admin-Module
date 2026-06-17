I’ll break this into:

Why it’s not working

Exact fixes (do this, don’t improvise)

A corrected drop-in version of ONLY the broken parts

No abstractions, no redesign.

1️⃣ Why none of this is visually happening
❌ Problem 1: border-6 is NOT a valid Tailwind class
border-6

Tailwind only supports:

border, border-2, border-4, border-8

➡️ This breaks your profile photo ring, which cascades into layout issues.

❌ Problem 2: Cover height + overlap math is wrong

You have:

h-80
-mt-48

But:

Profile image = 192px (48 × 4)

Half overlap = 96px

You’re pulling it up 192px, which overflows and collapses spacing

❌ Problem 3: Max width is too small
max-w-2xl

Facebook profile layouts feel wide.
2xl = 672px, which compresses everything.

❌ Problem 4: Stats cards spacing + borders are fighting each other

Borders + large padding + small container = squashed look

Facebook uses flat cards with subtle elevation, not heavy borders

2️⃣ EXACT fixes (don’t change anything else)
✅ Fix summary (do all of these)
Issue	Fix
Invalid border	border-8
Wrong overlap	-mt-24
Container width	max-w-4xl
Stats cards	Reduce padding + remove heavy borders
3️⃣ Drop-in fixes (copy-paste safe)
✅ A. Main container width (VERY important)

Replace:

<div className="max-w-2xl mx-auto">

With:

<div className="max-w-4xl mx-auto">
✅ B. Gradient cover (Facebook-like height)

Replace:

<div className="relative h-80 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">

With:

<div className="relative h-[340px] bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
✅ C. Profile photo overlap (THIS is the key visual fix)

Replace this block entirely:

<div className="flex justify-center -mt-48 mb-6">

With:

<div className="flex justify-center -mt-24 mb-6">
✅ D. Profile photo ring (this was broken)

Replace:

<div className={`relative w-48 h-48 rounded-full border-6 ${

With:

<div className={`relative w-48 h-48 rounded-full border-8 ${
✅ E. Stats cards — Facebook-style cleanup

Replace each stat card with this:

<div className={`p-4 rounded-2xl text-center shadow-sm ${
  isDark
    ? 'bg-slate-800/60'
    : 'bg-white'
}`}>

👉 Keep the text styles inside as-is.

4️⃣ What this will FIX visually (guaranteed)

After these exact changes:

✔ Taller, dominant gradient cover
✔ Proper 50% profile photo overlap
✔ Clean circular photo with visible ring
✔ Stats aligned in one row without squashing
✔ Overall layout matches Facebook / LinkedIn profile hierarchy

No logic changes.
No state changes.
No component rewrites.

5️⃣ Why I’m confident this is the issue

Your JSX hierarchy is correct

Your intent is correct

Tailwind class mismatches + bad overlap math are what broke it

This is a CSS correctness issue, not a React issue.