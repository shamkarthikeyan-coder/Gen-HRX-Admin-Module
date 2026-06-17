import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { 
  MapPin, Edit2, Grid3x3, FileText, BarChart3, Settings, ArrowLeft, MoreVertical, ExternalLink, Star
} from 'lucide-react';
import { Button } from '../ui/button';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface ServiceVendorProfileFullProps {
  onBack?: () => void;
}

export function ServiceVendorProfileFull({ onBack }: ServiceVendorProfileFullProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'posts' | 'services' | 'analytics'>('posts');

  const vendorData = {
    companyName: 'TechHR Solutions',
    tagline: 'Enterprise HR solutions for modern workplaces',
    bio: 'Transforming HR operations with AI-powered tools and data-driven insights. Trusted by 500+ companies worldwide.',
    verified: true,
    location: 'North America',
    website: 'techhr.io',
    stats: {
      posts: 28,
      followers: 342,
      following: 156,
    },
  };

  const services = [
    {
      id: 1,
      title: 'HR Analytics Platform',
      description: 'Comprehensive analytics dashboard for workforce insights',
      price: 'Starting at $499/mo',
      rating: 4.8,
      reviews: 127,
    },
    {
      id: 2,
      title: 'Talent Acquisition Suite',
      description: 'AI-powered recruiting and applicant tracking system',
      price: 'Starting at $899/mo',
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 3,
      title: 'Performance Management',
      description: 'Goal setting, reviews, and continuous feedback tools',
      price: 'Starting at $699/mo',
      rating: 4.7,
      reviews: 98,
    },
  ];

  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
      likes: 234,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop',
      likes: 189,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop',
      likes: 312,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      likes: 276,
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop',
      likes: 198,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=400&fit=crop',
      likes: 421,
    },
  ];

  const tabs = [
    { id: 'posts' as const, icon: Grid3x3 },
    { id: 'services' as const, icon: FileText },
    { id: 'analytics' as const, icon: BarChart3 },
  ];

  return (
    <>
      <LeftSidebar
        onCreatePost={() => {}}
        onLogout={() => {}}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="profile"
        onNavigate={() => {}}
        onProfileClick={() => {}}
      />

      <div className="ml-[72px]">
        <div className={`min-h-screen flex items-start justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
          {/* Fixed-width Mobile Canvas */}
          <div className="w-full max-w-[600px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#f5f5f5' }}>
            
            {/* Header Navigation */}
            <div className={`fixed top-0 w-full max-w-[600px] h-14 flex items-center justify-center px-4 z-10 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`} style={{ left: 'calc(50% + 36px)', transform: 'translateX(-50%)' }}>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {vendorData.companyName}
              </span>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-14"></div>

            {/* Gradient Banner - Edge to Edge with Buttons */}
            <div className="relative h-52 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">
              {/* Edit Button - Top Right */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors">
                <Edit2 className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Profile Content */}
            <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
              {/* Company Logo - Centered and Overlapping Banner */}
              <div className="relative -mt-16 mb-3 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500">
                    <div className={`w-full h-full rounded-full overflow-hidden border-4 flex items-center justify-center ${isDark ? 'border-[#1a1d29] bg-gradient-to-br from-purple-600 to-purple-500' : 'border-white bg-gradient-to-br from-purple-600 to-purple-500'}`}>
                      {/* Company letter logo */}
                      <span className="text-5xl font-bold text-white">T</span>
                    </div>
                  </div>
                  {/* Verified badge */}
                  <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 border-4 border-[#1a1d29] flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Company Info - Centered */}
              <div className="text-center mb-6 px-3">
                <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {vendorData.companyName}
                </h1>
                <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {vendorData.tagline}
                </p>
                <p className={`text-sm max-w-sm mx-auto mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {vendorData.bio}
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{vendorData.location}</span>
                  </div>
                  <a href={`https://${vendorData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
                    <ExternalLink className="w-4 h-4" />
                    <span>{vendorData.website}</span>
                  </a>
                </div>
              </div>

              {/* Stats Grid - 3 Rounded Boxes */}
              <div className="grid grid-cols-3 gap-2 mb-6 px-3">
                <div className={`text-center py-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {vendorData.stats.posts}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Posts
                  </div>
                </div>
                <div className={`text-center py-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {vendorData.stats.followers}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Followers
                  </div>
                </div>
                <div className={`text-center py-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {vendorData.stats.following}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Following
                  </div>
                </div>
              </div>

              {/* Edit Profile Button - Full Width */}
              <div className="px-3 mb-6">
                <Button 
                  className={`w-full h-11 font-semibold ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-0 shadow-sm'
                  }`}
                >
                  Edit Profile
                </Button>
              </div>

              {/* Tabs - Centered */}
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
                            ? isDark ? 'text-white' : 'text-slate-900'
                            : isDark 
                              ? 'text-slate-500' 
                              : 'text-slate-400'
                        }`} strokeWidth={isActive ? 2.5 : 2} />
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="pb-8">
                {activeTab === 'posts' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-3 gap-1 pt-1"
                  >
                    {posts.map((post) => (
                      <div key={post.id} className="aspect-square relative group cursor-pointer">
                        <img 
                          src={post.image} 
                          alt="Post"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex items-center gap-1 text-white font-semibold">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'services' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 space-y-3"
                  >
                    {services.map((service) => (
                      <div key={service.id} className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {service.title}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {service.rating}
                            </span>
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-purple-600">
                            {service.price}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            {service.reviews} reviews
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 space-y-4"
                  >
                    {/* Header */}
                    <div>
                      <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Analytics Overview
                      </h2>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Last 30 days
                      </p>
                    </div>

                    {/* Key Metrics Grid - 2x2 */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Total Saves */}
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                        <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Total Saves
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          1,247
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-semibold text-green-500">↑ 12%</span>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>vs last month</span>
                        </div>
                      </div>

                      {/* Total Reactions */}
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                        <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Total Reactions
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          3,842
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-semibold text-green-500">↑ 24%</span>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>vs last month</span>
                        </div>
                      </div>

                      {/* Total Comments */}
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                        <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Total Comments
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          892
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-semibold text-green-500">↑ 18%</span>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>vs last month</span>
                        </div>
                      </div>

                      {/* Total Shares */}
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                        <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Total Shares
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          436
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs font-semibold text-green-500">↑ 8%</span>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>vs last month</span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Views Chart */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Profile Views
                        </h3>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          8,932 total
                        </span>
                      </div>
                      
                      {/* Simple Bar Chart */}
                      <div className="space-y-3">
                        {[
                          { day: 'Mon', value: 85 },
                          { day: 'Tue', value: 92 },
                          { day: 'Wed', value: 78 },
                          { day: 'Thu', value: 95 },
                          { day: 'Fri', value: 88 },
                          { day: 'Sat', value: 65 },
                          { day: 'Sun', value: 72 },
                        ].map((item, index) => (
                          <div key={item.day} className="flex items-center gap-3">
                            <span className={`text-xs w-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {item.day}
                            </span>
                            <div className="flex-1 h-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500"
                                style={{ width: `${item.value}%` }}
                              />
                            </div>
                            <span className={`text-xs w-12 text-right font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {Math.round((item.value / 100) * 8932)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Follower Growth */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                      <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Follower Growth
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>New Followers</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>+89</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Unfollows</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>-12</span>
                        </div>
                        <div className={`pt-3 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Net Growth</span>
                            <span className="font-bold text-green-500">+77</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Top Performing Posts */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                      <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Top Performing Posts
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img src={posts[5].image} alt="Top post" className="w-14 h-14 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              HR Analytics Platform Demo
                            </div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              421 reactions • 89 comments • 34 shares
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <img src={posts[2].image} alt="Top post" className="w-14 h-14 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              New Feature Launch: AI Insights
                            </div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              312 reactions • 67 comments • 28 shares
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <img src={posts[3].image} alt="Top post" className="w-14 h-14 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Customer Success Story
                            </div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              276 reactions • 54 comments • 19 shares
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Engagement Breakdown */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                      <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Engagement Breakdown
                      </h3>
                      <div className="space-y-3">
                        {[
                          { type: 'Likes', count: 2847, percentage: 74, color: 'from-pink-500 to-rose-500' },
                          { type: 'Love', count: 621, percentage: 16, color: 'from-red-500 to-pink-500' },
                          { type: 'Insightful', count: 289, percentage: 7, color: 'from-blue-500 to-cyan-500' },
                          { type: 'Celebrate', count: 85, percentage: 3, color: 'from-yellow-500 to-orange-500' },
                        ].map((reaction) => (
                          <div key={reaction.type}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {reaction.type}
                              </span>
                              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {reaction.count}
                              </span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${reaction.color} rounded-full`}
                                style={{ width: `${reaction.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best Time to Post */}
                    <div className={`p-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                      <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Best Time to Post
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Tuesday, 10:00 AM
                            </div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              Highest engagement rate
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-purple-500">32%</div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>avg. rate</div>
                          </div>
                        </div>
                        <div className={`pt-3 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                          <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            💡 Post during weekday mornings for best results
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}