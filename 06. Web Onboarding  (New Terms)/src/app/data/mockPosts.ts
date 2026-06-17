import headshot1 from 'figma:asset/dca76a06cc92dc5c2e73113f57369fb14407620e.png';
import headshot2 from 'figma:asset/50db71a7670c8de4e6dbfb0e1261acaf41cbc3ec.png';
import headshot3 from 'figma:asset/f145c362155ef9e5e5f20dda37ad560846bcd35a.png';

export const mockArticleParleys = [
  {
    id: 'article-1',
    author: 'Jennifer Martinez',
    avatar: headshot3,
    role: 'VP of People Operations',
    time: '1d',
    articleTitle: 'Hybrid Work Success: 5 Policies That Actually Work in 2026',
    articleExcerpt: 'After two years of trial and error with hybrid work policies, we\'ve finally cracked the code. Here\'s what we learned from implementing hybrid work at a 500+...',
    articleImage: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80',
    readTime: '5 min read',
    likes: 124,
    comments: 38,
    shares: 0,
    verified: true,
    type: 'article',
    badges: [
      {
        type: 'verified' as const,
        title: 'Verified Professional',
        description: 'Identity verified by Parley'
      },
      {
        type: 'thought-leader' as const,
        title: 'Thought Leader',
        description: 'Published 100 high-value parleys or articles'
      },
      {
        type: 'strategy-architect' as const,
        title: 'Strategy Architect',
        description: 'Created 50 All Hands contributing to strategic HR discussions'
      }
    ]
  },
  {
    id: 'article-2',
    author: 'David Kim',
    avatar: headshot1,
    role: 'Chief People Officer • TechVentures',
    time: '2d',
    articleTitle: 'The Future of Performance Reviews: Why We Ditched Annual Reviews',
    articleExcerpt: 'Traditional annual performance reviews are broken. Here\'s how we transformed our performance management system to focus on continuous feedback and growth...',
    articleImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    readTime: '7 min read',
    likes: 289,
    comments: 67,
    shares: 45,
    verified: true,
    type: 'article',
    badges: [
      {
        type: 'verified' as const,
        title: 'Verified Professional',
        description: 'Identity verified by Parley'
      },
      {
        type: 'thought-leader' as const,
        title: 'Thought Leader',
        description: 'Published 100 high-value parleys or articles'
      },
      {
        type: 'innovator' as const,
        title: 'Innovator',
        description: 'Shares fresh perspectives and innovative HR solutions'
      },
      {
        type: 'executive-insider' as const,
        title: 'Executive Insider',
        description: 'Has C-suite or VP-level experience'
      }
    ]
  },
  {
    id: 'article-3',
    author: 'Rachel Foster',
    avatar: headshot3,
    role: 'Head of Talent Development • GlobalCorp',
    time: '3d',
    articleTitle: 'Building a Learning Culture: From Theory to Practice',
    articleExcerpt: 'Everyone talks about learning cultures, but few companies actually build them successfully. Here are the 7 key strategies that transformed our L&D approach...',
    articleImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    readTime: '6 min read',
    likes: 456,
    comments: 92,
    shares: 78,
    verified: true,
    type: 'article',
    badges: [
      {
        type: 'verified' as const,
        title: 'Verified Professional',
        description: 'Identity verified by Parley'
      },
      {
        type: 'knowledge-contributor' as const,
        title: 'Knowledge Contributor',
        description: 'Published 25 parleys or articles with valuable HR insights'
      },
      {
        type: 'community-strategist' as const,
        title: 'Community Strategist',
        description: 'Created 100 All Hands with active community participation'
      }
    ]
  }
];

export const mockHRParleys = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: headshot3,
    role: 'VP of People Operations • TechCorp',
    time: '2h ago',
    content: 'Just wrapped up our Q1 employee engagement survey results. 87% satisfaction rate! 📊\n\nKey takeaway: Flexible work arrangements and mental health support were the top-rated benefits. Investing in people truly pays off.',
    likes: 234,
    comments: 45,
    shares: 12,
    verified: true,
    trending: true,
    badges: [
      {
        type: 'verified' as const,
        title: 'Verified Professional',
        description: 'Identity verified by Parley'
      },
      {
        type: 'strategy-architect' as const,
        title: 'Strategy Architect',
        description: 'Created 50 All Hands contributing to strategic HR discussions'
      },
      {
        type: 'decision-catalyst' as const,
        title: 'Decision Catalyst',
        description: 'Created 10 All Hands driving meaningful discussions'
      },
      {
        type: 'community-strategist' as const,
        title: 'Community Strategist',
        description: 'Created 100 All Hands with active community participation'
      },
      {
        type: 'knowledge-contributor' as const,
        title: 'Knowledge Contributor',
        description: 'Published 25 parleys or articles with valuable HR insights'
      },
      {
        type: 'thought-leader' as const,
        title: 'Thought Leader',
        description: 'Published 100 high-value parleys or articles'
      },
      {
        type: 'innovator' as const,
        title: 'Innovator',
        description: 'Shares fresh perspectives and innovative HR solutions'
      },
      {
        type: 'executive-insider' as const,
        title: 'Executive Insider',
        description: 'Has C-suite or VP-level experience'
      }
    ]
  },
  {
    id: '2',
    author: 'Marcus Williams',
    avatar: headshot2,
    role: 'Talent Acquisition Lead • StartupHub',
    time: '4h ago',
    content: 'Hot take: Stop asking candidates "Where do you see yourself in 5 years?"\n\nInstead, ask:\n✅ "What skills are you excited to develop?"\n✅ "What kind of impact do you want to make?"\n✅ "What energizes you at work?"\n\nLet\'s focus on growth, not predictions.',
    likes: 567,
    comments: 89,
    shares: 34,
    verified: true,
    badges: [
      {
        type: 'verified' as const,
        title: 'Verified Professional',
        description: 'Identity verified by Parley'
      },
      {
        type: 'innovator' as const,
        title: 'Innovator',
        description: 'Shares fresh perspectives and innovative HR solutions'
      },
      {
        type: 'thought-leader' as const,
        title: 'Thought Leader',
        description: 'Published 100 high-value parleys or articles'
      }
    ]
  },
  {
    id: '3',
    author: 'Anonymous HR Professional',
    avatar: '🎭',
    role: 'Senior HR Manager',
    time: '5h ago',
    content: 'Confession: I\'m tired of leadership saying "people are our greatest asset" while cutting L&D budgets and refusing to address toxic managers.\n\nActions speak louder than mission statements.',
    likes: 892,
    comments: 156,
    shares: 67,
    confessional: true,
    anonymous: true,
  },
  {
    id: '4',
    author: 'Priya Patel',
    avatar: headshot3,
    role: 'Learning & Development Director • GlobalTech',
    time: '6h ago',
    content: 'Excited to share our new Leadership Development Program launching next month! 🚀\n\nWe\'re focusing on:\n• Emotional Intelligence\n• Inclusive Leadership\n• Change Management\n• Coaching Skills\n\nInvesting $2M in developing 200+ future leaders across the organization.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    likes: 345,
    comments: 67,
    shares: 23,
    verified: true,
    badges: [
      {
        type: 'verified' as const,
        title: 'Verified Professional',
        description: 'Identity verified by Parley'
      },
      {
        type: 'innovator' as const,
        title: 'Innovator',
        description: 'Shares fresh perspectives and innovative HR solutions'
      },
      {
        type: 'knowledge-contributor' as const,
        title: 'Knowledge Contributor',
        description: 'Published 25 parleys or articles with valuable HR insights'
      }
    ]
  },
  {
    id: '5',
    author: 'James Rodriguez',
    avatar: headshot1,
    role: 'HRIS Specialist • DataDriven Inc',
    time: '8h ago',
    content: 'Quick poll for my HR tech friends:\n\nWhat\'s your biggest pain point with your current HRIS?',
    likes: 123,
    comments: 78,
    shares: 5,
    type: 'poll',
  },
  {
    id: '6',
    author: 'Emma Thompson',
    avatar: headshot3,
    role: 'Employment Law Attorney • HR Legal Partners',
    time: '10h ago',
    content: '⚠️ Important update on remote work policies:\n\nNew DOL guidance clarifies that employers must reimburse remote employees for necessary business expenses in certain jurisdictions.\n\nMake sure your remote work policy is compliant!',
    link: {
      title: 'DOL Issues New Guidance on Remote Work Expense Reimbursement',
      description: 'Latest updates on employer obligations for remote workers...',
      url: 'dol.gov/guidance/remote-work',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    },
    likes: 456,
    comments: 92,
    shares: 145,
    verified: true,
    trending: true,
  },
  {
    id: '7',
    author: 'Diverse Hiring Collective',
    avatar: '🌈',
    role: 'DEI Advocacy Group',
    time: '12h ago',
    content: 'Reminder: Diversity isn\'t just about hiring.\n\nIt\'s about:\n✨ Inclusive onboarding\n✨ Equitable advancement opportunities\n✨ Psychological safety\n✨ Pay equity\n✨ Authentic belonging\n\nHiring diverse talent is step one. Retention is the real work.',
    likes: 1234,
    comments: 234,
    shares: 456,
    verified: true,
  },
  {
    id: '8',
    author: 'Michael Chang',
    avatar: headshot1,
    role: 'Compensation & Benefits Manager • FinTech Solutions',
    time: '1d ago',
    content: 'Benchmarking data just came in for our industry:\n\n📈 Average salary increases: 4.2%\n💰 Bonus pools: Down 8% from last year\n🏥 Healthcare costs: Up 6.5%\n\nTime to have some tough conversations with leadership about staying competitive.',
    likes: 234,
    comments: 56,
    shares: 18,
  },
];