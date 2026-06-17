import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, Edit3, Grid3x3, Briefcase, User, MoreVertical, Shield, MessageSquare, ThumbsUp, Folders, FileText, X, Linkedin, Bookmark, Plus, CheckCircle2, Upload, Check, Settings, Trash2, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import genhrxLogo from 'figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png';
import linkedinIcon from 'figma:asset/bf297275fc9e31937bf0ba44d810019348d6abb4.png';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';
import { EditBannerModal } from './EditBannerModal';
import { SaveToCollectionModal } from './SaveToCollectionModal';

interface ProfileScreenProps {
  onBack: () => void;
  userData: {
    role: string;
    email: string;
    profile: {
      fullName: string;
      jobTitle: string;
      industry: string;
      organizationSize: string;
      location: string;
    } | null;
  };
}

export function ProfileScreen({ onBack, userData }: ProfileScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Mock saved collections data - Define before state to avoid reference error
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
      ]
    }
  ];
  
  const [activeTab, setActiveTab] = useState<'posts' | 'work' | 'saved'>('posts');
  const [showLinkedInBanner, setShowLinkedInBanner] = useState(true);
  const [showConnectionsModal, setShowConnectionsModal] = useState(false);
  const [connectionsTab, setConnectionsTab] = useState<'followers' | 'following' | 'groups'>('followers');
  const [showEditBannerModal, setShowEditBannerModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState('gradient-1');
  const [currentBanner, setCurrentBanner] = useState('gradient-1');
  const [showSaveToCollectionModal, setShowSaveToCollectionModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [showCollectionSettings, setShowCollectionSettings] = useState(false);
  const [showEditCollectionName, setShowEditCollectionName] = useState(false);
  const [editingCollectionName, setEditingCollectionName] = useState('');
  const [collections, setCollections] = useState(savedCollections);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set(['post-1', 'post-2', 'post-3', 'post-4']));

  // Mock user data with userData integration
  const profileData = {
    name: userData.profile?.fullName || 'Sarah Chen',
    username: '@sarahchen_hr',
    title: userData.profile?.jobTitle || 'Senior HR Director',
    company: 'genHRX',
    bio: 'Passionate about building inclusive workplaces and data-driven HR strategies',
    stats: {
      posts: 42,
      followers: 156,
      following: 89,
      groups: 3
    },
    isVerified: true
  };

  const profilePhoto = LOGGED_IN_USER_AVATAR;

  // Banner helper functions
  const getBannerStyle = (bannerId: string) => {
    const gradients: { [key: string]: string } = {
      'gradient-1': 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500',
      'gradient-2': 'bg-gradient-to-r from-cyan-500 to-blue-500',
      'gradient-3': 'bg-gradient-to-r from-pink-600 via-red-500 to-orange-500',
      'gradient-4': 'bg-gradient-to-r from-purple-600 to-purple-400',
      'gradient-5': 'bg-gradient-to-r from-green-500 to-emerald-600',
      'gradient-6': 'bg-gradient-to-r from-slate-700 to-slate-500'
    };
    return gradients[bannerId] || gradients['gradient-1'];
  };

  const getBannerImage = (bannerId: string) => {
    const photos: { [key: string]: string } = {
      'photo-1': 'https://images.unsplash.com/photo-1739298061707-cefee19941b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBtZWV0aW5nJTIwdGVhbXdvcmslMjBjb2xsYWJvcmF0aW9uJTIwYm9hcmR8ZW58MXx8fHwxNzcyNDI1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'photo-2': 'https://images.unsplash.com/photo-1769251971680-005dfa536f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMG5pZ2h0JTIwbGlnaHRzJTIwYXJlYSUyMGJvdW50aWZ1bCB0cmF2ZWxzfGVufDF8fHx8MTc3MjQyNTAwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      'photo-3': 'https://images.unsplash.com/photo-1758691736933-bb0f88fe2e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBoYWxsd2F5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNDI1MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'photo-4': 'https://images.unsplash.com/photo-1718982085789-8b7ffc6bc436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB3aW5kb3dzfGVufDF8fHx8MTc3MjQyNTAwOXww&ixlib=rb-4.1.0&q=80&w=1080'
    };
    return photos[bannerId];
  };

  // Mock followers data
  const mockFollowers = [
    {
      id: 1,
      name: 'Marcus Thompson',
      username: '@marcus_hr',
      title: 'CHRO @ Fortune 500',
      avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHN1aXQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzIxNzY2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isVerified: true,
      isFollowing: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      username: '@priya_talent',
      title: 'Head of Talent @ Startup',
      avatar: 'https://images.unsplash.com/photo-1770058428154-9eee8a6a1fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwc21pbGluZyUyMGhlYWRzaG90fGVufDF8fHx8MTc3MjE5MzczMHww&ixlib=rb-4.1.0&q=80&w=1080',
      isVerified: true,
      isFollowing: true
    },
    {
      id: 3,
      name: 'James Wilson',
      username: '@jwilson_hr',
      title: 'VP People Ops @ Tech',
      avatar: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtYW4lMjBwcm9mZXNzaW9uYWwlMjBwaG90b3xlbnwxfHx8fDE3NzIxOTM3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isVerified: false,
      isFollowing: true
    },
    {
      id: 4,
      name: 'Linda Garcia',
      username: '@linda_people',
      title: 'People Director @ SaaS',
      avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcyMTI4NTA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      isVerified: true,
      isFollowing: true
    },
    {
      id: 5,
      name: 'David Lee',
      username: '@david_hrtech',
      title: 'HR Tech Consultant',
      avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGJ1c2luZXNzJTIwcGVyc29ufGVufDF8fHx8MTc3MjExMjA2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      isVerified: false,
      isFollowing: true
    }
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

  return (
    <div className={`min-h-screen flex justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-100'}`}>
      <div className={`w-full max-w-2xl min-h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
        <div className={`sticky top-0 z-30 flex items-center px-4 py-3 border-b ${
          isDark ? 'border-slate-800 bg-[#1a1d29]' : 'border-slate-200 bg-white'
        }`}>
          <button onClick={onBack} className="shrink-0">
            <ChevronLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
          </button>
          <h2 className={`flex-1 text-lg font-semibold text-center ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {profileData.username}
          </h2>
          <div className="w-6 shrink-0"></div>
        </div>

        <div className={`relative h-[220px] w-full ${!getBannerImage(currentBanner) ? getBannerStyle(currentBanner) : ''}`}>
          {getBannerImage(currentBanner) && (
            <img 
              src={getBannerImage(currentBanner)} 
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
          )}
          <button 
            onClick={() => setShowEditBannerModal(true)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur flex items-center justify-center hover:bg-black/40 transition-colors z-10"
          >
            <Edit3 className="w-4 h-4 text-white" />
          </button>
          
          <div className="absolute bottom-[-64px] left-1/2 -translate-x-1/2 z-40">
            <div className="relative">
              <div className={`relative w-40 h-40 rounded-full border-4 ${
                isDark ? 'border-[#1a1d29]' : 'border-white'
              } shadow-lg overflow-hidden bg-white`}>
                <img 
                  src={profilePhoto} 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {profileData.isVerified && (
                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white fill-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`relative w-full pt-28 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
          <div className="text-center mt-1 px-4">
            <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {profileData.name}
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {profileData.title} @ {profileData.company}
            </p>
            <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {profileData.bio}
            </p>
          </div>

          <div className="mt-5 px-4">
            <div className="grid grid-cols-3 gap-2">
              <div className={`py-2.5 rounded-xl border text-center ${
                isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-white'
              }`}>
                <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {profileData.stats.posts}
                </div>
                <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Posts
                </div>
              </div>
              <button
                onClick={() => {
                  setConnectionsTab('followers');
                  setShowConnectionsModal(true);
                }}
                className={`py-2.5 rounded-xl border text-center transition-colors ${
                  isDark ? 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/60' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {profileData.stats.followers}
                </div>
                <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Followers
                </div>
              </button>
              <div className={`py-2.5 rounded-xl border text-center ${
                isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-white'
              }`}>
                <div className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {profileData.stats.following}
                </div>
                <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Following
                </div>
              </div>
            </div>
          </div>

          <div className={`flex items-center border-b mt-5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-4 relative transition-colors ${
                activeTab === 'posts'
                  ? isDark ? 'text-white' : 'text-slate-900'
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Grid3x3 className="w-6 h-6 mx-auto" />
              {activeTab === 'posts' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`flex-1 py-4 relative transition-colors ${
                activeTab === 'work'
                  ? isDark ? 'text-white' : 'text-slate-900'
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Briefcase className="w-6 h-6 mx-auto" />
              {activeTab === 'work' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-4 relative transition-colors ${
                activeTab === 'saved'
                  ? isDark ? 'text-white' : 'text-slate-900'
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <Bookmark className="w-6 h-6 mx-auto" />
              {activeTab === 'saved' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500" />
              )}
            </button>
          </div>

          {activeTab === 'posts' && (
            <div className="px-3 pb-8 pt-3">
              <div className="grid grid-cols-2 gap-3">
                {mockPosts.map((post, idx) => {
                  if (post.type === 'decision') {
                    return (
                      <div key={idx} className={`p-4 rounded-2xl border ${
                        isDark 
                          ? 'bg-purple-950/20 border-purple-900/30' 
                          : 'bg-purple-50 border-purple-100'
                      }`}>
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
                      <div key={idx} className={`p-4 rounded-2xl border ${
                        isDark 
                          ? 'bg-slate-800/30 border-slate-800' 
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center gap-1.5 mb-3">
                          <FileText className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                          <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Parley</span>
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
                      <div key={idx} className={`rounded-2xl border overflow-hidden ${
                        isDark 
                          ? 'bg-slate-800/30 border-slate-800' 
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="relative h-40">
                          <img 
                            src={post.image}
                            alt="Article"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white flex items-center gap-1 shadow-sm">
                            <FileText className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-xs font-semibold text-orange-500">Article</span>
                          </div>
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                            <span className="text-xs font-semibold text-white">{post.timeAgo}</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}</div>
            </div>
          )}

          {activeTab === 'work' && (
            <div className="px-4 pb-8 pt-5">
              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  About
                </h2>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Passionate about building inclusive workplaces and data-driven HR strategies. With over 10 years of experience in HR leadership, I specialize in talent acquisition, employee engagement, and organizational development.
                </p>
              </div>

              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Experience
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-purple-600">TC</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Senior HR Director
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        TechCorp Inc.
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        2020 - Present · 4 years
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-blue-600">IS</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        HR Manager
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        InnovateSoft
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        2017 - 2020 · 3 years
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Talent Acquisition',
                    'Employee Engagement',
                    'Performance Management',
                    'HR Analytics',
                    'Organizational Development',
                    'Diversity & Inclusion',
                    'Compensation & Benefits',
                    'HR Technology'
                  ].map((skill, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-purple-950/20 text-purple-400' 
                          : 'bg-purple-50 text-purple-600'
                      }`}
                    >
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Education
                </h2>
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-orange-600">SU</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Master of Business Administration
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Stanford University
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      2015 - 2017
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Certifications
                </h2>
                <div className="space-y-2">
                  {[
                    'SHRM-SCP (Senior Certified Professional)',
                    'Certified Diversity Professional (CDP)',
                    'HR Analytics Certificate'
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {showLinkedInBanner && (
                <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-4 overflow-hidden shadow-lg">
                  <button 
                    onClick={() => setShowLinkedInBanner(false)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="flex items-center gap-4 pr-6">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <Linkedin className="w-7 h-7 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white mb-0.5">
                        Sync with LinkedIn
                      </h3>
                      <p className="text-xs text-white/85 leading-relaxed">
                        Import your experience, skills & certifications instantly
                      </p>
                    </div>
                    <button className="shrink-0 px-4 py-2 rounded-xl bg-white text-blue-600 font-semibold text-sm hover:bg-white/95 transition-colors shadow-sm">
                      Connect
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="px-4 pb-8 pt-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Collections
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* New Collection Card */}
                <button 
                  onClick={() => setShowSaveToCollectionModal(true)}
                  className={`rounded-2xl overflow-hidden border-2 border-dashed transition-colors ${
                  isDark 
                    ? 'bg-slate-800/30 border-slate-700 hover:border-slate-600' 
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}>
                  <div className="aspect-square flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        isDark ? 'bg-slate-700' : 'bg-slate-100'
                      }">
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
                {collections.map((collection) => (
                  <div key={collection.id} className={`rounded-2xl overflow-hidden ${
                    isDark ? 'bg-slate-800/30' : 'bg-white'
                  }`}>
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
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`py-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center justify-center gap-2">
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                powered by
              </span>
              <img 
                src={genhrxLogo} 
                alt="genHRX" 
                className="h-5 w-5"
              />
              <span className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                genHRX
              </span>
            </div>
          </div>
        </div>
        
        {showConnectionsModal && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowConnectionsModal(false)}
            />
            
            <div className={`fixed inset-x-0 top-0 bottom-0 z-50 max-w-2xl mx-auto ${
              isDark ? 'bg-[#1a1d29]' : 'bg-white'
            }`}>
              <div className={`flex items-center justify-between px-5 py-4 border-b ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Followers
                </h2>
                <button 
                  onClick={() => setShowConnectionsModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
                </button>
              </div>

              <div className={`flex items-center border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <button
                  onClick={() => setConnectionsTab('followers')}
                  className={`flex-1 py-4 text-center relative transition-colors ${
                    connectionsTab === 'followers'
                      ? isDark ? 'text-white' : 'text-slate-900'
                      : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <span className="text-base font-semibold">Followers</span>
                  {connectionsTab === 'followers' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-orange-500" />
                  )}
                </button>
                <button
                  onClick={() => setConnectionsTab('following')}
                  className={`flex-1 py-4 text-center relative transition-colors ${
                    connectionsTab === 'following'
                      ? isDark ? 'text-white' : 'text-slate-900'
                      : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <span className="text-base font-semibold">Following</span>
                  {connectionsTab === 'following' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-orange-500" />
                  )}
                </button>
                
              </div>

              <div className="overflow-y-auto" style={{ height: 'calc(100vh - 130px)' }}>
                {mockFollowers.map((follower) => (
                  <div key={follower.id} className={`flex items-center gap-3 px-5 py-4 border-b ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={follower.avatar}
                        alt={follower.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className={`text-base font-bold truncate ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {follower.name}
                        </h3>
                        {follower.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-purple-600 fill-purple-600 shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {follower.username}
                      </p>
                      <p className={`text-sm truncate ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        {follower.title}
                      </p>
                    </div>
                    <button className={`px-4 py-2 rounded-xl font-semibold text-sm shrink-0 ${
                      isDark 
                        ? 'bg-slate-800 text-white hover:bg-slate-700' 
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                    } transition-colors`}>
                      Following
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {showEditBannerModal && (
          <EditBannerModal
            show={showEditBannerModal}
            onClose={() => setShowEditBannerModal(false)}
            selectedBanner={selectedBanner}
            onSelectBanner={setSelectedBanner}
            onSave={() => setCurrentBanner(selectedBanner)}
          />
        )}
        
        {showSaveToCollectionModal && (
          <SaveToCollectionModal
            isOpen={showSaveToCollectionModal}
            onClose={() => setShowSaveToCollectionModal(false)}
          />
        )}
      </div>
    </div>
  );
}