import { useState, useEffect } from 'react';
import { Search, TrendingUp, X, Clock, Users, ArrowRight, ThumbsUp, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { LOGGED_IN_USER_AVATAR } from '../constants/userData';
import { useTheme } from '../context/ThemeContext';
import { LeftSidebar } from './social/LeftSidebar';
import { PostCard } from './social/PostCard';
import { CreatePostModal } from './social/CreatePostModal';
import { ProfileCompletionBanner } from './social/ProfileCompletionBanner';
import { CreateFirstPostNudge } from './social/CreateFirstPostNudge';
import { VideoPostCard } from './social/VideoPostCard';
import { LinkPostCard } from './social/LinkPostCard';
import { ArticlePostCard } from './social/ArticlePostCard';
import { SponsoredAdCard } from './social/SponsoredAdCard';
import { SuggestedGroupsCard } from './social/SuggestedGroupsCard';
import { SuggestedPeopleCard } from './social/SuggestedPeopleCard';
import { TextPostDetailModal } from './social/TextPostDetailModal';
import { SaveToCollectionModal } from './social/SaveToCollectionModal';
import { ReactionPicker } from './social/ReactionPicker';
import { ProfileScreen } from './social/ProfileScreen';
import { IntentContextBar } from './social/IntentContextBar';
import { PostDetailModal } from './social/PostDetailModal';
import { DecisionRooms } from './DecisionRooms';
import { mockHRParleys, mockArticleParleys } from '../data/mockPosts';
import { 
  mockVideoParleys, 
  mockLinkParleys, 
  mockSponsoredAds, 
  mockSuggestedGroups, 
  mockSuggestedPeople 
} from '../data/mockFeedData';

interface UserData {
  role: string;
  email: string;
  authMethod: string;
  profile: {
    fullName: string;
    jobTitle: string;
    industry: string;
    organizationSize: string;
    location: string;
  } | null;
  interestTags: string[];
  isVerified: boolean;
}

interface FavoritedIntent {
  id: string;
  text: string;
  lastViewed: Date;
}

interface HomeFeedProps {
  userData: UserData;
  onLogout: () => void;
  onBackToProfileSetup?: () => void;
  onNavigate?: (view: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings') => void;
}

export function HomeFeed({ userData, onLogout, onBackToProfileSetup, onNavigate }: HomeFeedProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [showProfileBanner, setShowProfileBanner] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  
  // Navigation state - track which tab is active (home, decisionRooms, or profile)
  const [activeView, setActiveView] = useState<'home' | 'decisionRooms' | 'marketplace' | 'profile'>('home');
  
  // Save to collection modal state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savePostId, setSavePostId] = useState<string | null>(null);
  
  // Feed mode state
  const [feedMode, setFeedMode] = useState<'explore' | 'search'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  
  // Favorited intents state
  const [favoritedIntents, setFavoritedIntents] = useState<FavoritedIntent[]>([]);
  
  // Dynamic placeholder state
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  
  // Reaction picker state
  const [hoveredRoomIndex, setHoveredRoomIndex] = useState<number | null>(null);
  
  // Carousel tracking state
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeTrendingIndex, setActiveTrendingIndex] = useState(0);
  
  // Profile screen state
  const [showProfileScreen, setShowProfileScreen] = useState(false);
  
  const searchPlaceholders = [
    'How do I create a more inclusive workplace culture?',
    'What\'s the best way to manage underperforming employees?',
    'How should I handle difficult conversations with leadership?',
    'Need help building an effective remote work policy...',
    'What strategies work best for improving employee retention?',
    'How do I navigate tricky compensation negotiations?'
  ];

  // Trending topics for search mode
  const trendingTopics = [
    'Performance Management',
    'Remote Work Policies',
    'Salary Benchmarking',
    'DEI Initiatives',
    'Employee Retention',
    'HR Technology',
    'Talent Acquisition',
    'Leadership Development',
    'Workplace Culture',
    'Compensation Strategy',
  ];

  // Check if profile is incomplete (only step 1 fields)
  useEffect(() => {
    const isProfileIncomplete = !userData.profile?.fullName || !userData.profile?.jobTitle;
    const dismissed = localStorage.getItem('genhrx_profile_banner_dismissed') === 'true';
    setShowProfileBanner(isProfileIncomplete && !dismissed);
  }, [userData.profile]);

  // Load user posts from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('genhrx_user_posts');
    if (savedPosts) {
      setUserPosts(JSON.parse(savedPosts));
    }
  }, []);

  // Rotate placeholder text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [searchPlaceholders.length]);

  const handleCreatePost = (post: any) => {
    const newPost = {
      id: Date.now().toString(),
      author: userData.profile?.fullName || 'You',
      avatar: userData.profile?.fullName?.charAt(0) || 'U',
      role: userData.profile?.jobTitle || 'HR Professional',
      time: 'Just now',
      content: post.content,
      image: post.image,
      likes: 0,
      comments: 0,
      shares: 0,
      verified: userData.isVerified,
      tags: post.tags,
      privacy: post.privacy,
    };

    const updatedPosts = [newPost, ...userPosts];
    setUserPosts(updatedPosts);
    localStorage.setItem('genhrx_user_posts', JSON.stringify(updatedPosts));
    setShowCreateModal(false);
  };

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    setShowProfileBanner(false);
    localStorage.setItem('genhrx_profile_banner_dismissed', 'true');
  };

  const handleCompleteProfile = () => {
    if (onBackToProfileSetup) {
      onBackToProfileSetup();
    }
  };

  const allPosts = [...userPosts, ...mockHRParleys];
  const isFirstTimeUser = userPosts.length === 0;

  // Helper function to check if post has media
  const hasMedia = (post: any) => {
    return post.image || post.videoUrl || post.type === 'video' || post.type === 'poll' || post.type === 'link' || post.poll || post.link;
  };

  // Filter posts based on search query
  const getFilteredPosts = () => {
    if (!activeSearchQuery) return [];
    
    const query = activeSearchQuery.toLowerCase();
    const allPostsData = [...userPosts, ...mockHRParleys];
    
    // Split query into keywords for more flexible matching
    const keywords = query.split(' ').filter(word => word.length > 2); // Filter out short words like "a", "to", etc.
    
    return allPostsData.filter(post => {
      // Check if any keyword matches
      const matchesKeyword = keywords.some(keyword => {
        const contentMatch = post.content?.toLowerCase().includes(keyword);
        const authorMatch = post.author?.toLowerCase().includes(keyword);
        const roleMatch = post.role?.toLowerCase().includes(keyword);
        const tagsMatch = post.tags?.some((tag: string) => tag.toLowerCase().includes(keyword));
        
        return contentMatch || authorMatch || roleMatch || tagsMatch;
      });
      
      // Also check for exact phrase match
      const exactMatch = 
        post.content?.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query) ||
        post.role?.toLowerCase().includes(query) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(query));
      
      return matchesKeyword || exactMatch;
    });
  };

  const filteredPosts = getFilteredPosts();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveSearchQuery(searchQuery.trim());
      // Scroll to top to show the focus view
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTrendingClick = (topic: string) => {
    setSearchQuery(topic);
    setActiveSearchQuery(topic);
    // Scroll to top to show the focus view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveSearchQuery('');
  };

  // Handle room carousel scroll
  const handleRoomScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 420 + 16; // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveRoomIndex(newIndex);
  };

  // Handle trending topics carousel scroll
  const handleTrendingScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 256 + 12; // card width (w-64 = 256px) + gap (gap-3 = 12px)
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveTrendingIndex(newIndex);
  };

  // Handle save to collection
  const handleSavePost = (postId: string) => {
    setSavePostId(postId);
    setShowSaveModal(true);
  };

  return (
    <>
      <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
        {/* Left Sidebar */}
        <LeftSidebar
          onCreatePost={() => setShowCreateModal(true)}
          onLogout={onLogout}
          userAvatar={LOGGED_IN_USER_AVATAR}
          activeTab={activeView}
          onNavigate={(tab) => {
            if (tab === 'marketplace' && onNavigate) {
              // Navigate to marketplace in parent App component
              onNavigate('marketplace');
            } else if (tab === 'settings' && onNavigate) {
              // Navigate to settings in parent App component
              onNavigate('settings');
            } else {
              setActiveView(tab);
            }
          }}
          onProfileClick={() => setShowProfileScreen(true)}
        />

      {/* Conditional Rendering Based on Active View */}
      {activeView === 'decisionRooms' ? (
        <div className="ml-60">
          <DecisionRooms />
        </div>
      ) : activeView === 'profile' ? (
        <div className="ml-[72px]">
          <ProfileScreen 
            onBack={() => setActiveView('home')}
            userData={userData}
          />
        </div>
      ) : (
        <>
          {/* Main Feed */}
          <div className="ml-60">
            <div className="max-w-2xl mx-auto pb-12">
              {/* Instagram-style Tab Toggle - Sticky */}
              <div className={`sticky top-0 z-30 border-b ${
                isDark ? 'bg-[#1a1d29] border-[#363b4e]' : 'bg-white border-slate-200'
              }`}>
                <div className="flex">
                  <button
                    onClick={() => {
                      setFeedMode('explore');
                      clearSearch();
                    }}
                    className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                      feedMode === 'explore'
                        ? isDark ? 'text-white' : 'text-slate-900'
                        : isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Current
                    {feedMode === 'explore' && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500`} />
                    )}
                  </button>
                  <button
                    onClick={() => setFeedMode('search')}
                    className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                      feedMode === 'search'
                        ? isDark ? 'text-white' : 'text-slate-900'
                        : isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Focus
                    {feedMode === 'search' && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500`} />
                    )}
                  </button>
                </div>
              </div>

              <div className={`px-4 pt-6 ${
                isDark ? '' : 'bg-white/50'
              }`}>
                {/* EXPLORE FEED MODE */}
                {feedMode === 'explore' && (
                  <>
                    {/* Profile Completion Banner */}
                    {showProfileBanner && !bannerDismissed && (
                      <div className="mb-4">
                        <ProfileCompletionBanner
                          onComplete={handleCompleteProfile}
                          onDismiss={handleDismissBanner}
                        />
                      </div>
                    )}

                    {/* Create First Post Nudge */}
                    {isFirstTimeUser && (
                      <div className="mb-4">
                        <CreateFirstPostNudge
                          onCreatePost={() => setShowCreateModal(true)}
                          userName={userData.profile?.fullName}
                        />
                      </div>
                    )}

                    {/* Posts Feed */}
                    <div className="space-y-4">
                      {/* Initial posts */}
                      <div className={`rounded-2xl overflow-hidden border ${
                        isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                      }`}>
                        <PostCard
                          post={mockHRParleys[0]}
                          onUserClick={() => console.log('User clicked:', mockHRParleys[0].author)}
                          onPostClick={() => setSelectedPost(mockHRParleys[0])}
                          onComment={() => console.log('Comment on:', mockHRParleys[0].id)}
                          onSave={handleSavePost}
                        />
                      </div>

                      <div className={`rounded-2xl overflow-hidden border ${
                        isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                      }`}>
                        <VideoPostCard 
                          post={mockVideoParleys[0]} 
                          onPostClick={() => setSelectedPost(mockVideoParleys[0])} 
                          onSave={handleSavePost}
                        />
                      </div>

                      <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                        <LinkPostCard 
                          post={mockLinkParleys[0]} 
                          onPostClick={() => setSelectedPost(mockLinkParleys[0])} 
                          onSave={handleSavePost}
                        />
                      </div>

                      {/* Article Post 1 */}
                      <div className={`rounded-2xl overflow-visible border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                        <ArticlePostCard 
                          post={mockArticleParleys[0]} 
                          onPostClick={() => setSelectedPost(mockArticleParleys[0])} 
                          onSave={handleSavePost}
                        />
                      </div>

                      <div className={`rounded-2xl overflow-hidden border ${
                        isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                      }`}>
                        <PostCard
                          post={mockHRParleys[1]}
                          onUserClick={() => console.log('User clicked:', mockHRParleys[1].author)}
                          onPostClick={() => setSelectedPost(mockHRParleys[1])}
                          onComment={() => console.log('Comment on:', mockHRParleys[1].id)}
                          onSave={handleSavePost}
                        />
                      </div>

                      {/* Sponsored Ad */}
                      <div className={`rounded-2xl overflow-hidden border ${
                        isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                      }`}>
                        <SponsoredAdCard 
                          ad={mockSponsoredAds[0]} 
                          onSave={handleSavePost}
                        />
                      </div>

                      {/* Suggested Groups Card */}
                      <SuggestedGroupsCard groups={mockSuggestedGroups} />

                      {/* More regular posts */}
                      {mockHRParleys.slice(2, 4).map((post) => (
                        <div key={post.id} className={`rounded-2xl overflow-hidden border ${
                          isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                        }`}>
                          <PostCard
                            post={post}
                            onUserClick={() => console.log('User clicked:', post.author)}
                            onPostClick={() => setSelectedPost(post)}
                            onComment={() => console.log('Comment on:', post.id)}
                            onSave={handleSavePost}
                          />
                        </div>
                      ))}

                      {/* Another Link Post */}
                      <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                        <LinkPostCard post={mockLinkParleys[1]} onPostClick={() => setSelectedPost(mockLinkParleys[1])} onSave={handleSavePost} />
                      </div>

                      {/* Video Post */}
                      <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                        <VideoPostCard post={mockVideoParleys[1]} onPostClick={() => setSelectedPost(mockVideoParleys[1])} onSave={handleSavePost} />
                      </div>

                      {/* Remaining regular posts */}
                      {mockHRParleys.slice(4).map((post) => (
                        <div key={post.id} className={`rounded-2xl overflow-hidden border ${
                          isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                        }`}>
                          <PostCard
                            post={post}
                            onUserClick={() => console.log('User clicked:', post.author)}
                            onPostClick={() => setSelectedPost(post)}
                            onComment={() => console.log('Comment on:', post.id)}
                            onSave={handleSavePost}
                          />
                        </div>
                      ))}

                      {/* Final Link Post */}
                      <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                        <LinkPostCard post={mockLinkParleys[2]} onPostClick={() => setSelectedPost(mockLinkParleys[2])} onSave={handleSavePost} />
                      </div>
                    </div>
                  </>
                )}

                {/* SEARCH FEED MODE */}
                {feedMode === 'search' && (
                  <>
                    {/* Welcome Header */}
                    {!activeSearchQuery && (
                      <div className="text-center mb-8">
                        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Welcome to genHRX
                        </h1>
                        <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          A place to think through real HR decisions
                        </p>
                      </div>
                    )}

                    {/* Main Search Card */}
                    {!activeSearchQuery && (
                      <div className={`rounded-3xl border-2 p-6 mb-8 ${
                        isDark 
                          ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/40' 
                          : 'bg-gradient-to-br from-purple-50/60 to-pink-50/50 border-purple-300'
                      }`}>
                        <h2 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'} text-center text-[18px]`}>
                          What do you need help with today?
                        </h2>
                        
                        {/* Input Surface */}
                        <div className="relative">
                          {/* Search Icon */}
                          <Search className="absolute left-0 top-1 w-5 h-5 text-slate-400 pointer-events-none" />

                          {/* Textarea with native placeholder */}
                          <textarea
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            rows={2}
                            placeholder={searchPlaceholders[currentPlaceholder]}
                            className={`w-full bg-transparent border-0 resize-none text-sm focus:outline-none pt-1 pl-8 min-h-[56px] ${
                              isDark
                                ? 'text-white placeholder:text-slate-400'
                                : 'text-slate-900 placeholder:text-slate-400'
                            }`}
                            style={{ WebkitAppearance: 'none', boxShadow: 'none' }}
                          />
                        </div>

                        {/* CTA */}
                        {searchQuery.trim().length >= 3 && (
                          <div className="flex justify-center mt-4">
                            <button
                              type="button"
                              onClick={handleSearch}
                              className="px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2
                                         bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                                         hover:from-purple-700 hover:to-indigo-700 transition-all"
                            >
                              Go
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Active Search Query Badge */}
                    {/* Hidden when showing results - IntentContextBar replaces this */}
                    {/* {activeSearchQuery && (
                      <div className="mb-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                          isDark ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
                        }`}>
                          <span className={`text-sm font-medium ${
                            isDark ? 'text-purple-300' : 'text-purple-700'
                          }`}>
                            Searching: {activeSearchQuery}
                          </span>
                          <button
                            onClick={clearSearch}
                            className={`p-1 rounded-full transition-colors ${
                              isDark ? 'hover:bg-purple-500/30' : 'hover:bg-purple-100'
                            }`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )} */}

                    {/* Trending Topics Section */}
                    {!activeSearchQuery && (
                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`} />
                          <h3 className={`text-sm font-bold uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                            Trending Topics in HR
                          </h3>
                        </div>
                        
                        {/* Horizontal Scrollable Cards */}
                        <div className="relative mb-4">
                          <div
                            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
                            onScroll={handleTrendingScroll}
                          >
                            {[
                              {
                                text: 'Managing underperforming employees',
                                bgColor: isDark ? 'bg-blue-950/30' : 'bg-blue-50/80',
                                borderColor: isDark ? 'border-blue-900/20' : 'border-blue-100',
                                hoverBorder: isDark ? 'hover:border-blue-800/40' : 'hover:border-blue-200'
                              },
                              {
                                text: 'Workplace policy compliance',
                                bgColor: isDark ? 'bg-purple-950/30' : 'bg-purple-50/80',
                                borderColor: isDark ? 'border-purple-900/20' : 'border-purple-100',
                                hoverBorder: isDark ? 'hover:border-purple-800/40' : 'hover:border-purple-200'
                              },
                              {
                                text: 'Competitive salary benchmarking',
                                bgColor: isDark ? 'bg-emerald-950/30' : 'bg-emerald-50/80',
                                borderColor: isDark ? 'border-emerald-900/20' : 'border-emerald-100',
                                hoverBorder: isDark ? 'hover:border-emerald-800/40' : 'hover:border-emerald-200'
                              },
                              {
                                text: 'Handling difficult leadership',
                                bgColor: isDark ? 'bg-pink-950/30' : 'bg-pink-50/80',
                                borderColor: isDark ? 'border-pink-900/20' : 'border-pink-100',
                                hoverBorder: isDark ? 'hover:border-pink-800/40' : 'hover:border-pink-200'
                              },
                              {
                                text: 'HRIS system selection',
                                bgColor: isDark ? 'bg-amber-950/30' : 'bg-amber-50/80',
                                borderColor: isDark ? 'border-amber-900/20' : 'border-amber-100',
                                hoverBorder: isDark ? 'hover:border-amber-800/40' : 'hover:border-amber-200'
                              },
                              {
                                text: 'Navigating ethical conflicts',
                                bgColor: isDark ? 'bg-cyan-950/30' : 'bg-cyan-50/80',
                                borderColor: isDark ? 'border-cyan-900/20' : 'border-cyan-100',
                                hoverBorder: isDark ? 'hover:border-cyan-800/40' : 'hover:border-cyan-200'
                              }
                            ].map((topic, index) => (
                              <button
                                key={index}
                                onClick={() => handleTrendingClick(topic.text)}
                                className={`flex-shrink-0 w-64 px-6 py-5 rounded-3xl text-left border transition-all snap-start ${topic.bgColor} ${topic.borderColor} ${topic.hoverBorder} ${
                                  isDark ? 'text-white' : 'text-slate-900'
                                }`}
                              ><span className="text-base font-semibold leading-snug">{topic.text}</span></button>
                            ))}
                          </div>
                        </div>

                        {/* Carousel Dots */}
                        <div className="flex justify-center gap-1.5">
                          {[0, 1, 2, 3, 4, 5].map((idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                idx === activeTrendingIndex 
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                                  : isDark ? 'bg-slate-700' : 'bg-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Active Rooms Section */}
                    {!activeSearchQuery && (
                      <div className="mb-8">
                        <h3 className={`text-base font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          3 active rooms happening now
                        </h3>
                        
                        {/* Horizontal Scrollable Room Cards */}
                        <div className="relative mb-4">
                          <div
                            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
                            onScroll={handleRoomScroll}
                          >
                            {[
                              {
                                title: 'Performance review calibration: managing grade inflation?',
                                description: 'Calibrate performance reviews to ensure fairness and consistency.',
                                timeLeft: '2h left',
                                participants: 12,
                                responses: 5,
                                likes: 57,
                                shares: 4
                              },
                              {
                                title: 'Hybrid work policy: Finding the right balance?',
                                description: 'Discuss effective hybrid work policies for modern teams.',
                                timeLeft: '45m left',
                                participants: 8,
                                responses: 12,
                                likes: 43,
                                shares: 7
                              },
                              {
                                title: 'Salary transparency: How much to share?',
                                description: 'Navigate the complex topic of salary transparency in your organization.',
                                timeLeft: '1h left',
                                participants: 15,
                                responses: 18,
                                likes: 89,
                                shares: 12
                              }
                            ].map((room, index) => (
                              <div
                                key={index}
                                className={`flex-shrink-0 w-[420px] p-6 rounded-3xl border snap-start ${
                                  isDark
                                    ? 'bg-[#242833] border-[#363b4e]'
                                    : 'bg-white border-slate-200'
                                }`}
                              >
                                {/* Header with Title and Active Badge */}
                                <div className="flex items-start justify-between mb-3">
                                  <h4 className={`font-bold leading-snug flex-1 pr-3 ${ isDark ? 'text-white' : 'text-slate-900' } text-[16px]`}>
                                    {room.title}
                                  </h4>
                                  <span className="flex-shrink-0 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                                    Active
                                  </span>
                                </div>

                                {/* Description */}
                                <p className={`text-sm mb-4 leading-relaxed ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  {room.description}
                                </p>

                                {/* Time, Participants, and Responses Row */}
                                <div className={`flex items-center gap-2 mb-4 text-sm ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                  <Clock className="w-4 h-4 text-emerald-500" />
                                  <span className="text-emerald-500 font-medium">{room.timeLeft}</span>
                                  <span className="mx-0.5">·</span>
                                  <Users className="w-4 h-4" />
                                  <span>{room.participants}</span>
                                  <span className="mx-0.5">·</span>
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{room.responses} responses</span>
                                </div>

                                {/* Engagement Row */}
                                <div className="flex items-center justify-between pt-4 border-t ${
                                  isDark ? 'border-[#363b4e]' : 'border-slate-200'
                                }">
                                  <div className="flex items-center gap-4">
                                    {/* Likes with Reaction Picker */}
                                    <div 
                                      className="relative"
                                      onMouseEnter={() => setHoveredRoomIndex(index)}
                                      onMouseLeave={() => setHoveredRoomIndex(null)}
                                    >
                                      <button className={`flex items-center gap-2 transition-colors ${
                                        isDark 
                                          ? 'text-slate-400 hover:text-purple-400' 
                                          : 'text-slate-500 hover:text-purple-600'
                                      }`}>
                                        <ThumbsUp className="w-5 h-5" />
                                        <span className="text-sm font-medium">{room.likes}</span>
                                      </button>
                                      
                                      {/* Show Reaction Picker on Hover */}
                                      {hoveredRoomIndex === index && (
                                        <ReactionPicker onReact={(type) => {
                                          console.log(`Reacted with ${type} on room ${index}`);
                                          setHoveredRoomIndex(null);
                                        }} />
                                      )}
                                    </div>

                                    {/* Shares */}
                                    <button className={`flex items-center gap-2 transition-colors ${
                                      isDark 
                                        ? 'text-slate-400 hover:text-purple-400' 
                                        : 'text-slate-500 hover:text-purple-600'
                                    }`}>
                                      <Share2 className="w-5 h-5" />
                                      <span className="text-sm font-medium">{room.shares}</span>
                                    </button>
                                  </div>

                                  {/* Bookmark */}
                                  <button className={`transition-colors ${
                                    isDark 
                                      ? 'text-slate-400 hover:text-purple-400' 
                                      : 'text-slate-500 hover:text-purple-600'
                                  }`}>
                                    <Bookmark className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Carousel Dots */}
                        <div className="flex justify-center gap-1.5">
                          {[0, 1, 2].map((idx) => (
                            <div
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                idx === activeRoomIndex
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                                  : isDark ? 'bg-slate-700' : 'bg-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Profile Completion Banner */}
                    {!activeSearchQuery && showProfileBanner && !bannerDismissed && (
                      <div className={`rounded-3xl border-2 p-8 ${
                        isDark 
                          ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-500/40' 
                          : 'bg-gradient-to-br from-purple-50 border border-purple-300'
                      }`}
                      >
                        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}
                        >
                          Complete your profile for better advice
                        </h3>
                        <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                        >
                          Add your role, experience, and company size to get relevant perspectives.
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={handleCompleteProfile}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-purple-600 transition-all"
                          >
                            Update profile
                          </button>
                          <button
                            onClick={handleDismissBanner}
                            className={`px-6 py-3 font-semibold rounded-2xl transition-colors ${
                              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Search Results */}
                    {activeSearchQuery && (
                      <>
                        {/* Intent Context Bar */}
                        <IntentContextBar
                          intentText={activeSearchQuery}
                          onClear={clearSearch}
                          onFavorite={() => {
                            const existingFav = favoritedIntents.find(f => f.text === activeSearchQuery);
                            if (existingFav) {
                              // Remove from favorites
                              setFavoritedIntents(favoritedIntents.filter(f => f.id !== existingFav.id));
                            } else {
                              // Add to favorites
                              const newFav: FavoritedIntent = {
                                id: `fav-${Date.now()}`,
                                text: activeSearchQuery,
                                lastViewed: new Date()
                              };
                              setFavoritedIntents([...favoritedIntents, newFav]);
                            }
                          }}
                          isFavorited={favoritedIntents.some(f => f.text === activeSearchQuery)}
                        />

                        {/* Community Conversations Section */}
                        <div className="space-y-4">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Community Conversations
                          </h3>

                          {filteredPosts.length > 0 ? (
                            <>
                              {/* Regular posts */}
                              {filteredPosts.slice(0, 2).map((post) => (
                                <div key={post.id} className={`rounded-2xl overflow-hidden border ${
                                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                                }`}>
                                  <PostCard
                                    post={post}
                                    onUserClick={() => console.log('User clicked:', post.author)}
                                    onPostClick={() => setSelectedPost(post)}
                                    onComment={() => console.log('Comment on:', post.id)}
                                  />
                                </div>
                              ))}

                              {/* Video Post */}
                              {mockVideoParleys.length > 0 && (
                                <div className={`rounded-2xl overflow-hidden border ${
                                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                                }`}>
                                  <VideoPostCard post={mockVideoParleys[0]} onPostClick={() => setSelectedPost(mockVideoParleys[0])} />
                                </div>
                              )}

                              {/* More regular posts */}
                              {filteredPosts.slice(2, 3).map((post) => (
                                <div key={post.id} className={`rounded-2xl overflow-hidden border ${
                                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                                }`}>
                                  <PostCard
                                    post={post}
                                    onUserClick={() => console.log('User clicked:', post.author)}
                                    onPostClick={() => setSelectedPost(post)}
                                    onComment={() => console.log('Comment on:', post.id)}
                                  />
                                </div>
                              ))}

                              {/* Link Post */}
                              {mockLinkParleys.length > 0 && (
                                <div className={`rounded-2xl overflow-hidden border ${
                                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                                }`}>
                                  <LinkPostCard post={mockLinkParleys[0]} onPostClick={() => setSelectedPost(mockLinkParleys[0])} />
                                </div>
                              )}

                              {/* Suggested People Card */}
                              <SuggestedPeopleCard people={mockSuggestedPeople} />

                              {/* Suggested Groups Card */}
                              <SuggestedGroupsCard groups={mockSuggestedGroups} />

                              {/* More regular posts */}
                              {filteredPosts.slice(3, 5).map((post) => (
                                <div key={post.id} className={`rounded-2xl overflow-hidden border ${
                                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                                }`}>
                                  <PostCard
                                    post={post}
                                    onUserClick={() => console.log('User clicked:', post.author)}
                                    onPostClick={() => setSelectedPost(post)}
                                    onComment={() => console.log('Comment on:', post.id)}
                                  />
                                </div>
                              ))}

                              {/* Another Link Post */}
                              {mockLinkParleys.length > 1 && (
                                <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                                  <LinkPostCard post={mockLinkParleys[1]} onPostClick={() => setSelectedPost(mockLinkParleys[1])} onSave={handleSavePost} />
                                </div>
                              )}

                              {/* Another Video Post */}
                              {mockVideoParleys.length > 1 && (
                                <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                                  <VideoPostCard post={mockVideoParleys[1]} onPostClick={() => setSelectedPost(mockVideoParleys[1])} onSave={handleSavePost} />
                                </div>
                              )}

                              {/* Remaining regular posts */}
                              {filteredPosts.slice(5).map((post) => (
                                <div key={post.id} className={`rounded-2xl overflow-hidden border ${
                                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                                }`}>
                                  <PostCard
                                    post={post}
                                    onUserClick={() => console.log('User clicked:', post.author)}
                                    onPostClick={() => setSelectedPost(post)}
                                    onComment={() => console.log('Comment on:', post.id)}
                                  />
                                </div>
                              ))}

                              {/* Final Link Post */}
                              {mockLinkParleys.length > 2 && (
                                <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'}`}>
                                  <LinkPostCard post={mockLinkParleys[2]} onPostClick={() => setSelectedPost(mockLinkParleys[2])} onSave={handleSavePost} />
                                </div>
                              )}
                            </>
                          ) : (
                            <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${
                              isDark ? 'border-slate-700' : 'border-slate-200'
                            }`}>
                              <Search className={`w-12 h-12 mx-auto mb-4 ${
                                isDark ? 'text-slate-600' : 'text-slate-300'
                              }`} />
                              <h3 className={`text-lg font-semibold mb-2 ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                No conversations yet
                              </h3>
                              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Be the first to start a conversation about "{activeSearchQuery}"
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePost}
        userAvatar={userData.profile?.fullName?.charAt(0)}
        userName={userData.profile?.fullName}
      />

      {/* Post Detail Modals - Conditional based on post type */}
      {selectedPost && hasMedia(selectedPost) && (
        <PostDetailModal
          isOpen={selectedPost !== null}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}

      {selectedPost && !hasMedia(selectedPost) && (
        <TextPostDetailModal
          isOpen={selectedPost !== null}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}

      {/* Save to Collection Modal */}
      <SaveToCollectionModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        postId={savePostId}
      />
    </>
  );
}