// Builds a member's full profile for the admin detail page. The GenHRX member app collects a rich
// profile (headline, bio, experience, education, certifications, interests); the admin store only
// stores the moderation-relevant fields. When a user carries an explicit `profile`, we use it as-is;
// otherwise we DERIVE a complete, plausible profile deterministically from the user's id + role +
// activity, so every account opens to a full profile (never a half-empty page).

import type { Certification, Education, Experience, User, UserProfile } from "@/data/types";

const TITLES: Record<User["role"], string[]> = {
  // Individual contributors and specialists.
  "hr-practitioner": [
    "HR Business Partner",
    "HR Generalist",
    "Talent Acquisition Specialist",
    "People Operations Specialist",
    "Recruiter",
    "Compensation Analyst",
    "Employee Relations Specialist",
    "Learning & Development Specialist",
  ],
  // Managers and above.
  "hr-leader": [
    "Senior HR Director",
    "Head of Talent",
    "HR Manager",
    "VP of People",
    "Chief People Officer",
    "Director of People Operations",
    "Head of Total Rewards",
    "DEI Lead",
  ],
  // Others interested in HR — adjacent roles and the HR-curious.
  "friends-of-hr": [
    "People & Culture Enthusiast",
    "Founder",
    "Operations Manager",
    "Workplace Consultant",
    "Org Design Researcher",
    "HR Tech Advocate",
    "Career Coach",
    "Future of Work Writer",
  ],
  vendor: [
    "Founder & CEO",
    "Head of Partnerships",
    "VP of Sales",
    "Customer Success Lead",
    "Product Marketing Lead",
  ],
  admin: ["Platform Administrator", "Trust & Safety Lead"],
};
const COMPANIES = [
  "Northwind",
  "TechCorp",
  "Brightpath",
  "Acme HR",
  "Lumen Labs",
  "Vertex Group",
  "Cedar & Co",
  "Orion Talent",
  "BluePeak",
  "Meridian",
];
const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Chicago, IL",
  "Seattle, WA",
  "Boston, MA",
  "Denver, CO",
  "Remote",
];
const INDUSTRIES = [
  "Technology / SaaS",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Professional Services",
];
const ORG_SIZES = [
  "51–200 employees",
  "201–500 employees",
  "501–1000 employees",
  "1001–5000 employees",
  "5000+ employees",
];
const INTERESTS = [
  "Performance Management",
  "Remote Work",
  "DEI",
  "Compensation",
  "Talent Acquisition",
  "Employee Retention",
  "HR Tech",
  "Leadership Development",
  "Workplace Culture",
  "People Analytics",
  "Benefits",
  "Compliance",
];
const BIOS = [
  "Passionate about building inclusive workplaces and data-driven HR strategies.",
  "Helping people-first teams scale culture without losing what makes them work.",
  "Focused on fair, transparent performance and compensation practices.",
  "Believer in evidence over instinct — bringing analytics to people decisions.",
  "Building the kind of workplace I'd want to be part of, one policy at a time.",
];
const DEGREES = [
  "Master's in Human Resources",
  "MBA",
  "Bachelor's in Business Administration",
  "Master's in Organizational Psychology",
  "Bachelor's in Communications",
];
const INSTITUTIONS = [
  "Stanford University",
  "UC Berkeley",
  "New York University",
  "University of Michigan",
  "Cornell ILR School",
  "UCLA",
];
const CERTS: { name: string; issuer: string }[] = [
  { name: "SHRM-SCP", issuer: "Society for Human Resource Management" },
  { name: "SPHR", issuer: "HR Certification Institute" },
  { name: "PHR", issuer: "HR Certification Institute" },
  { name: "CIPD Level 7", issuer: "Chartered Institute of Personnel and Development" },
];
const EXP_DATES = [
  { start: "Jan 2021", end: "Present" },
  { start: "Mar 2020", end: "Present" },
  { start: "Aug 2019", end: "Present" },
];
const PREV_EXP_DATES = [
  { start: "Jun 2016", end: "Dec 2020" },
  { start: "Feb 2015", end: "Feb 2020" },
  { start: "Sep 2014", end: "Jul 2019" },
];

function hash(seed: string): number {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}
const at = <T,>(arr: T[], i: number) => arr[i % arr.length];

function handle(name: string): string {
  return "@" + name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

/** The user's explicit profile if seeded, otherwise a deterministic, complete derived one. */
export function deriveProfile(user: User): UserProfile {
  if (user.profile) return user.profile;

  const h = hash(user.id);
  const titles = TITLES[user.role];
  const title = at(titles, h);
  const prevTitle = at(titles, h + 3);
  const company = at(COMPANIES, h);
  const prevCompany = at(COMPANIES, h + 4);
  const location = at(LOCATIONS, h);
  const cur = at(EXP_DATES, h);
  const prev = at(PREV_EXP_DATES, h);

  const experience: Experience[] = [
    { id: `${user.id}-exp-1`, title, company, startDate: cur.start, endDate: "Present", isCurrent: true },
    {
      id: `${user.id}-exp-2`,
      title: prevTitle,
      company: prevCompany,
      startDate: prev.start,
      endDate: prev.end,
      isCurrent: false,
    },
  ];
  const education: Education[] = [
    { id: `${user.id}-edu-1`, degree: at(DEGREES, h), institution: at(INSTITUTIONS, h), year: "2015 - 2017" },
    { id: `${user.id}-edu-2`, degree: at(DEGREES, h + 2), institution: at(INSTITUTIONS, h + 3), year: "2011 - 2015" },
  ];
  // 1–2 certifications.
  const certCount = 1 + (h % 2);
  const certifications: Certification[] = Array.from({ length: certCount }, (_, i) => {
    const c = at(CERTS, h + i);
    return { id: `${user.id}-cert-${i}`, name: c.name, issuer: c.issuer, year: `${2018 + ((h + i) % 6)}` };
  });
  // 6 distinct skills / areas of expertise.
  const interests = Array.from({ length: 6 }, (_, i) => at(INTERESTS, h + i));

  return {
    username: handle(user.name),
    headline: `${title} @ ${company}`,
    company,
    location,
    bio: at(BIOS, h),
    industry: at(INDUSTRIES, h),
    organizationSize: at(ORG_SIZES, h),
    interests,
    experience,
    education,
    certifications,
    posts: user.activity.parleys + user.activity.articles + user.activity.takes,
  };
}
