import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { 
  MapPin, Edit2, Grid3x3, Bookmark, Briefcase, ArrowLeft, Settings, Plus, Folders, FileText, ThumbsUp, MessageSquare, Building2, GraduationCap, Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';
import { CollectionDetailView } from '../social/CollectionDetailView';
import { EditProfileModal } from './EditProfileModal';
import { AddExperienceModal } from './AddExperienceModal';

interface UserProfileProps {
  onBack?: () => void;
  onNavigate?: (tab: string) => void;
}

export function UserProfile({ onBack, onNavigate }: UserProfileProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'posts' | 'services' | 'saved'>('posts');
  const [selectedCollection, setSelectedCollection] = useState<typeof savedCollections[0] | null>(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddExperienceModalOpen, setIsAddExperienceModalOpen] = useState(false);

  const userData = {
    username: '@sarahchen_hr',
    name: 'Sarah Chen',
    title: 'Senior HR Director @ genHRX',
    bio: 'Passionate about building inclusive workplaces and data-driven HR strategies',
    location: 'San Francisco, CA',
    stats: {
      posts: 42,
      followers: 156,
      following: 89,
    },
  };

  const tabs = [
    { id: 'posts' as const, icon: Grid3x3 },
    { id: 'services' as const, icon: Briefcase },
    { id: 'saved' as const, icon: Bookmark },
  ];

  // Mock decision cards data
  const decisions = [
    {
      id: 1,
      title: 'Should we implement a 4-day work week pilot program?',
      inputs: 8,
      timeLeft: '48h left',
    },
    {
      id: 2,
      title: 'Remote work policy: Full flexibility vs structured hybrid?',
      inputs: 15,
      timeLeft: '72h left',
    },
    {
      id: 3,
      title: 'Performance review calibration: managing grade inflation?',
      inputs: 12,
      timeLeft: '24h left',
    },
    {
      id: 4,
      title: 'Which wellness benefits should we prioritize in 2026?',
      inputs: 9,
      timeLeft: '96h left',
    },
  ];

  // Mock posts data - Grid of different post types
  const mockPosts = [
    {
      type: 'decision',
      title: 'Should we implement a 4-day work week pilot program?',
      inputs: 8,
      timeLeft: '48h left',
      status: 'open'
    },
    {
      type: 'decision',
      title: 'Remote work policy: Full flexibility vs structured hybrid?',
      inputs: 15,
      timeLeft: '72h left',
      status: 'open'
    },
    {
      type: 'decision',
      title: 'Performance review calibration: managing grade inflation?',
      inputs: 22,
      timeLeft: null,
      status: 'Closed'
    },
    {
      type: 'decision',
      title: 'Which wellness benefits should we prioritize in 2026?',
      inputs: 18,
      timeLeft: null,
      status: 'Closed'
    },
    {
      type: 'post',
      content: 'Just wrapped up our Q1 performance reviews with a new approach: manager and peer...',
      likes: 67,
      comments: 23,
      timeAgo: '1d'
    },
    {
      type: 'post',
      content: 'Hot take: Exit interviews are too late. We started doing "stay interviews" every 6 months—askin...',
      likes: 89,
      comments: 31,
      timeAgo: '1d'
    },
    {
      type: 'article',
      image: 'https://images.unsplash.com/photo-1739287088753-73a9b8b771bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG9mZmljZSUyMG1lZXRpbmclMjB0ZWFtd29ya3xlbnwxfHx8fDE3NzIxOTAyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Building Trust in Remote Teams: Lesso...',
      timeAgo: '3d'
    }
  ];

  // Saved collections data
  const savedCollections = [
    { 
      id: 1, 
      name: 'HR Best Practices', 
      pins: 12, 
      timeAgo: '2w',
      items: [
        { type: 'text', content: 'The future of remote work is here. How are you adapting your HR policies?' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwYnJhaW5zdG9ybWluZ3xlbnwxfHx8fDE3NzI0MjU0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwa2V5bm90ZSUyMHNwZWFrZXIlMjBhdWRpZW5jZXxlbnwxfHx8fDE3NzI0MjU0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcyNDAxNjkyfDA&ixlib=rb-4.1.0&q=80&w=1080' }
      ],
      posts: [
        {
          id: '1',
          author: {
            name: 'Alex Thompson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            title: 'VP of HR @ TechCorp',
            isVerified: true
          },
          content: 'The future of remote work is here. How are you adapting your HR policies? We\'ve implemented a hybrid model that gives employees flexibility while maintaining team cohesion.',
          image: 'https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwYnJhaW5zdG9ybWluZ3xlbnwxfHx8fDE3NzI0MjU0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          likes: 234,
          comments: 45,
          timeAgo: '2d',
          type: 'article' as const
        },
        {
          id: '2',
          author: {
            name: 'Maria Garcia',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            title: 'CHRO @ StartupCo',
            isVerified: true
          },
          content: 'Best practices for employee onboarding in 2026: Focus on culture, not just process. Our new approach has increased retention by 40%.',
          likes: 189,
          comments: 32,
          timeAgo: '4d',
          type: 'text' as const
        }
      ]
    },
    { 
      id: 2, 
      name: 'Remote Work', 
      pins: 3, 
      timeAgo: '1w',
      items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1629893250402-bc171e8bbe4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXB0b3AlMjByZW1vdGUlMjB3b3JrfGVufDF8fHx8MTc3MjQyNTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkZXNrJTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjQyNTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'text', content: 'What are the biggest challenges you face with managing remote teams?' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyNDI1NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      ],
      posts: [
        {
          id: '3',
          author: {
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            title: 'Remote Work Consultant',
            isVerified: false
          },
          content: 'What are the biggest challenges you face with managing remote teams? Let\'s discuss strategies for maintaining productivity and team connection.',
          image: 'https://images.unsplash.com/photo-1629893250402-bc171e8bbe4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBsYXB0b3AlMjByZW1vdGUlMjB3b3JrfGVufDF8fHx8MTc3MjQyNTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
          likes: 156,
          comments: 78,
          timeAgo: '1w',
          type: 'article' as const
        }
      ]
    },
    { 
      id: 3, 
      name: 'Performance Management', 
      pins: 15, 
      timeAgo: '3d',
      items: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NzIzNTIzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwYnJhaW5zdG9ybWluZ3xlbnwxfHx8fDE3NzI0MjU0OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkZXNrJTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MjQyNTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzcyNDAxNjkyfDA&ixlib=rb-4.1.0&q=80&w=1080' }
      ],
      posts: [
        {
          id: '4',
          author: {
            name: 'Sarah Chen',
            avatar: LOGGED_IN_USER_AVATAR,
            title: 'Senior HR Director @ genHRX',
            isVerified: true
          },
          content: 'Just wrapped up our Q1 performance reviews with a new approach: manager and peer feedback combined with self-assessment. The results have been incredible for team development.',
          image: 'https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjb21wdXRlciUyMHNjcmVlbnxlbnwxfHx8fDE3NzIzNTIzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
          likes: 312,
          comments: 89,
          timeAgo: '3d',
          type: 'article' as const
        },
        {
          id: '5',
          author: {
            name: 'David Kim',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            title: 'Performance Coach',
            isVerified: true
          },
          content: 'Performance review calibration: managing grade inflation. Here are 5 strategies that actually work.',
          likes: 267,
          comments: 54,
          timeAgo: '5d',
          type: 'text' as const
        }
      ]
    },
    { 
      id: 4, 
      name: 'Leadership Development', 
      pins: 8, 
      timeAgo: '5d',
      items: [
        { type: 'text', content: 'Key strategies for developing future leaders in your organization' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1711993429175-83f6a2f5b848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwZHVvfGVufDF8fHx8MTc3MjQyNTQ5NHww&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyNDI1NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
        { type: 'text', content: 'Leadership is not about being in charge. It is about taking care of those in your charge.' }
      ],
      posts: [
        {
          id: '6',
          author: {
            name: 'Lisa Anderson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
            title: 'Leadership Coach & Consultant',
            isVerified: true
          },
          content: 'Key strategies for developing future leaders in your organization: Start with identifying high-potential employees early and create personalized development paths.',
          image: 'https://images.unsplash.com/photo-1711993429175-83f6a2f5b848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwZHVvfGVufDF8fHx8MTc3MjQyNTQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
          likes: 198,
          comments: 41,
          timeAgo: '5d',
          type: 'article' as const
        }
      ]
    }
  ];

  return (
    <>
      <LeftSidebar
        onCreatePost={() => {}}
        onLogout={() => {}}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="profile"
        onNavigate={onNavigate}
        onProfileClick={() => {}}
      />

      {/* Show Collection Detail View if a collection is selected */}
      {selectedCollection && (
        <CollectionDetailView
          collection={selectedCollection}
          onBack={() => setSelectedCollection(null)}
          onEdit={() => {}}
          onSettings={() => {}}
          onUnsave={() => {}}
          isSaved={() => true}
        />
      )}

      {/* Show Profile View if no collection is selected */}
      {!selectedCollection && (
      <div className="ml-[72px]">
        <div className={`min-h-screen flex items-start justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
          {/* Fixed-width Mobile Canvas */}
          <div className="w-full max-w-[600px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#ffffff' }}>
            {/* Top Bar with Username */}
            <div className={`h-14 flex items-center justify-center px-4 relative ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
              <button onClick={onBack} className={`absolute left-4 w-10 h-10 flex items-center justify-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                
              </button>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {userData.username}
              </span>
            </div>

            {/* Gradient Banner - Edge to Edge */}
            <div className="relative h-48 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors">
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Profile Content */}
            <div className={`px-4 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
              {/* Profile Photo - Centered and Overlapping Banner */}
              <div className="relative -mt-16 mb-4 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500">
                    <div className={`w-full h-full rounded-full overflow-hidden border-4 ${isDark ? 'border-[#1a1d29]' : 'border-white'}`}>
                      <img 
                        src={LOGGED_IN_USER_AVATAR} 
                        alt={userData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Pink indicator dot */}
                  <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 border-4 border-[#1a1d29]"></div>
                </div>
              </div>

              {/* User Info - Centered */}
              <div className="text-center mb-6">
                <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {userData.name}
                </h1>
                <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {userData.title}
                </p>
                <p className={`text-sm max-w-xs mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {userData.bio}
                </p>
              </div>

              {/* Stats Grid - 3 Columns */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className={`text-center rounded-2xl p-4 ${
                  isDark ? 'bg-slate-800/30' : 'bg-slate-50'
                }`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {userData.stats.posts}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Posts
                  </div>
                </div>
                <div className={`text-center rounded-2xl p-4 ${
                  isDark ? 'bg-slate-800/30' : 'bg-slate-50'
                }`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {userData.stats.followers}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Followers
                  </div>
                </div>
                <div className={`text-center rounded-2xl p-4 ${
                  isDark ? 'bg-slate-800/30' : 'bg-slate-50'
                }`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {userData.stats.following}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Following
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="grid grid-cols-3">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex items-center justify-center py-3"
                      >
                        <Icon className={`w-6 h-6 ${
                          isActive 
                            ? 'text-orange-500' 
                            : isDark 
                              ? 'text-slate-500' 
                              : 'text-slate-400'
                        }`} />
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="pb-6">
                {activeTab === 'posts' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 gap-3 pt-3"
                  >
                    {mockPosts.map((post, idx) => {
                      if (post.type === 'decision') {
                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border ${
                              isDark 
                                ? 'bg-purple-950/20 border-purple-900/30' 
                                : 'bg-purple-50 border-purple-100'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-3">
                              <Folders className="w-4 h-4 text-purple-600" />
                              <span className="text-xs font-semibold text-purple-600">Decision</span>
                            </div>
                            <h3 className={`text-sm font-bold leading-snug mb-12 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {post.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {post.inputs} inputs
                              </span>
                              <span className={`text-xs font-semibold ${
                                post.timeLeft ? 'text-green-600' : isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}>
                                {post.timeLeft || post.status}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      
                      if (post.type === 'post') {
                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-2xl border ${
                              isDark 
                                ? 'bg-slate-800/30 border-slate-800' 
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-3">
                              <FileText className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                              <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Post</span>
                            </div>
                            <p className={`text-sm leading-snug mb-12 line-clamp-3 ${
                              isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              {post.content}
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <ThumbsUp className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                  {post.likes}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                  {post.comments}
                                </span>
                              </div>
                              <span className={`ml-auto text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                {post.timeAgo}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      
                      if (post.type === 'article') {
                        return (
                          <div
                            key={idx}
                            className={`rounded-2xl border overflow-hidden ${
                              isDark 
                                ? 'bg-slate-800/30 border-slate-800' 
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="relative h-40">
                              <img 
                                src={post.image}
                                alt="Article"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-white/95 backdrop-blur-sm flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-orange-600" />
                                <span className="text-xs font-semibold text-orange-600">Article</span>
                              </div>
                              <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                                <span className="text-xs font-semibold text-white">{post.timeAgo}</span>
                              </div>
                            </div>
                            <div className="p-3">
                              <h3 className={`text-sm font-bold line-clamp-2 ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                {post.title}
                              </h3>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </motion.div>
                )}

                {activeTab === 'services' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-5 space-y-4"
                  >
                    {/* Professional Experience */}
                    <div className={`rounded-2xl border ${
                      isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDark ? 'bg-blue-500/10' : 'bg-blue-50'
                          }`}>
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Professional Experience
                            </h3>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Your work history and roles
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsEditProfileModalOpen(true)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Experience Items */}
                      <div className="p-4 space-y-4">
                        {/* Current Role */}
                        <div className="flex gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-100'
                          }`}>
                            <Building2 className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Senior HR Director
                              </h4>
                              <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                                Current
                              </span>
                            </div>
                            <p className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              TechCorp Inc.
                            </p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Jan 2020 - Present • 5 years
                            </p>
                          </div>
                        </div>

                        {/* Previous Role */}
                        <div className="flex gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-100'
                          }`}>
                            <Building2 className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              HR Manager
                            </h4>
                            <p className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              StartupCo
                            </p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Jun 2017 - Dec 2019 • 2.5 years
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div className={`rounded-2xl border ${
                      isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDark ? 'bg-purple-500/10' : 'bg-purple-50'
                          }`}>
                            <GraduationCap className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Education
                            </h3>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Your academic background
                            </p>
                          </div>
                        </div>
                        <button className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Education Items */}
                      <div className="p-4 space-y-4">
                        {/* Master's Degree */}
                        <div className="flex gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-100'
                          }`}>
                            <GraduationCap className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Master's in Human Resources
                            </h4>
                            <p className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Stanford University
                            </p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              2015 - 2017
                            </p>
                          </div>
                        </div>

                        {/* Bachelor's Degree */}
                        <div className="flex gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-100'
                          }`}>
                            <GraduationCap className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Bachelor's in Business Administration
                            </h4>
                            <p className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              UC Berkeley
                            </p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              2011 - 2015
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className={`rounded-2xl border ${
                      isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      {/* Header */}
                      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDark ? 'bg-orange-500/10' : 'bg-orange-50'
                          }`}>
                            <Shield className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Certifications
                            </h3>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Professional certifications
                            </p>
                          </div>
                        </div>
                        <button className={`w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Certification Item */}
                      <div className="p-4">
                        <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          SHRM-SCP
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Society for Human Resource Management • 2020
                        </p>
                      </div>
                    </div>

                    {/* LinkedIn Sync Banner */}
                    <div className={`relative rounded-2xl overflow-hidden ${
                      isDark 
                        ? 'bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent border border-blue-500/20' 
                        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-blue-200/50'
                    }`}>
                      {/* Background pattern overlay */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                      }}></div>
                      
                      <div className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                            isDark 
                              ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/20' 
                              : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30'
                          }`}>
                            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Sync with LinkedIn
                            </h3>
                            <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Import your professional experience, skills, and endorsements to complete your profile.
                            </p>
                            <button className={`group relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden ${
                              isDark 
                                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30'
                            }`}>
                              <span className="relative z-10 flex items-center gap-2">
                                Connect LinkedIn
                                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'saved' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-5"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Collections
                      </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* New Collection Card */}
                      <button 
                        className={`rounded-2xl overflow-hidden border-2 border-dashed transition-colors ${
                        isDark 
                          ? 'bg-slate-800/30 border-slate-700 hover:border-slate-600' 
                          : 'bg-white border-slate-300 hover:border-slate-400'
                      }`}>
                        <div className="aspect-square flex items-center justify-center">
                          <div className="text-center">
                            <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                              isDark ? 'bg-slate-700' : 'bg-slate-100'
                            }`}>
                              <Plus className={`w-8 h-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                            </div>
                            <span className={`text-sm font-semibold ${
                              isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              New Collection
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Existing Collections */}
                      {savedCollections.map((collection) => (
                        <button
                          key={collection.id}
                          onClick={() => setSelectedCollection(collection)}
                          className={`rounded-2xl overflow-hidden text-left transition-transform hover:scale-[1.02] ${
                            isDark ? 'bg-slate-800/30' : 'bg-white'
                          }`}
                        >
                          {/* Mixed Content Grid - Text and Images */}
                          <div className="grid grid-cols-2 gap-0.5">
                            {collection.items.slice(0, 4).map((item, itemIdx) => {
                              if (item.type === 'text') {
                                return (
                                  <div 
                                    key={itemIdx} 
                                    className={`relative aspect-square flex items-center justify-center p-1.5 ${
                                      isDark ? 'bg-slate-700' : 'bg-slate-100'
                                    }`}
                                  >
                                    <p className={`text-center text-[10px] font-bold leading-tight line-clamp-4 ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                      {item.content}
                                    </p>
                                  </div>
                                );
                              }
                              return (
                                <div key={itemIdx} className="relative aspect-square">
                                  <img 
                                    src={item.url}
                                    alt="Collection item"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              );
                            })}
                          </div>
                          {/* Collection Info */}
                          <div className="p-3">
                            <h3 className={`text-sm font-bold mb-2 line-clamp-2 ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {collection.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {collection.pins} Pins • {collection.timeAgo}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      
      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onSave={(data) => {
          console.log('Profile updated:', data);
          // Here you would typically update the userData state or make an API call
          setIsEditProfileModalOpen(false);
        }}
        initialData={{
          name: userData.name,
          title: userData.title,
          bio: userData.bio,
          location: userData.location,
          experiences: [
            {
              id: 'exp-1',
              title: 'Senior HR Director',
              company: 'TechCorp Inc.',
              startDate: 'Jan 2020',
              endDate: 'Present',
              isCurrent: true
            },
            {
              id: 'exp-2',
              title: 'HR Manager',
              company: 'StartupCo',
              startDate: 'Jun 2017',
              endDate: 'Dec 2019',
              isCurrent: false
            }
          ],
          education: [
            {
              id: 'edu-1',
              degree: 'Master\'s in Human Resources',
              institution: 'Stanford University',
              year: '2015 - 2017'
            },
            {
              id: 'edu-2',
              degree: 'Bachelor\'s in Business Administration',
              institution: 'UC Berkeley',
              year: '2011 - 2015'
            }
          ]
        }}
      />

      {/* Add Experience Modal */}
      <AddExperienceModal
        isOpen={isAddExperienceModalOpen}
        onClose={() => setIsAddExperienceModalOpen(false)}
        onSave={(data) => {
          console.log('Experience added:', data);
          // Here you would typically update the userData state or make an API call
          setIsAddExperienceModalOpen(false);
        }}
      />
    </>
  );
}