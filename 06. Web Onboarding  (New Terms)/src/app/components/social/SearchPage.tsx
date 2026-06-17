import { useState } from 'react';
import { Search, ArrowLeft, TrendingUp, Clock, X, Hash, Users, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

import avatar1 from 'figma:asset/64a2721f5e2f4413f02de48fac47b6bc5b106008.png';
import avatar2 from 'figma:asset/8b30d7bf487869ad5becc9eb29ba0fa7831e5232.png';
import avatar3 from 'figma:asset/92a98459b2a10c6942e7b03217548da1522cef29.png';
import avatar4 from 'figma:asset/e91c075fb702228a10b42e603ed8cb09100347cb.png';
import avatar5 from 'figma:asset/64d0e1c979e627ec8cf8a48b4384eacc404cf291.png';
import avatar6 from 'figma:asset/f976fb3c6f58297cde273d2b693868a38a4bad2a.png';

const postImage1 = 'https://images.unsplash.com/photo-1633718505538-65b4d3d09cec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMG1lZXRpbmd8ZW58MXx8fHwxNzY2Mzk2NTYwfDA&ixlib=rb-4.1.0&q=80&w=1080';
const postImage2 = 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhdGElMjBhbmFseXRpY3N8ZW58MXx8fHwxNzY2MzI4NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080';

interface SearchPageProps {
  onBack: () => void;
  onUserClick: (userId: number) => void;
  onPostClick: (postId: number) => void;
  userExperienceMode?: 'first-time' | 'experienced';
}

const trendingTopics = [
  { tag: 'CompensationBenchmark', posts: '12.5K', trend: '+23%', category: 'Trending' },
  { tag: 'RemoteWork2024', posts: '8.3K', trend: '+18%', category: 'Trending' },
  { tag: 'PerformanceReviews', posts: '6.2K', trend: '+45%', category: 'Hot' },
  { tag: 'HiringFreeze', posts: '5.8K', trend: '+12%', category: 'Trending' },
  { tag: 'DEIInitiatives', posts: '4.9K', trend: '+8%', category: 'HR Policy' },
  { tag: 'EmployeeRetention', posts: '4.1K', trend: '+15%', category: 'Strategy' },
  { tag: 'TalentAcquisition', posts: '3.7K', trend: '+20%', category: 'Recruiting' },
  { tag: 'WorkLifeBalance', posts: '3.2K', trend: '+10%', category: 'Culture' },
  { tag: 'HybridWorkModel', posts: '2.9K', trend: '+25%', category: 'Trending' },
  { tag: 'EmployeeWellness', posts: '2.6K', trend: '+14%', category: 'Culture' },
];

const recentSearches = [
  'PTO policies for remote teams',
  'Compensation bands tech',
  'Manager training programs',
  'Exit interview best practices',
];

const mockSearchResults = [
  {
    id: 101,
    author: 'Sarah Chen',
    role: 'VP of People @ SaaS Unicorn',
    avatar: avatar1,
    time: '3h ago',
    content: 'Just wrapped our Q1 compensation review. Here\'s what we learned about the market right now 📊\n\n💰 Base salaries: +8% YoY\n🎯 Performance bonuses: Restructured for clarity\n📈 Equity: More transparent communication\n\nThe biggest surprise? Transparency beats percentiles every time.',
    image: postImage2,
    likes: 234,
    comments: 56,
    shares: 42,
    verified: true,
    userId: 1,
  },
  {
    id: 102,
    author: 'Marcus Thompson',
    role: 'CHRO @ Enterprise Co',
    avatar: avatar2,
    time: '5h ago',
    content: 'Real talk about retention in 2024:\n\n❌ NOT about ping pong tables\n❌ NOT about free snacks\n\n✅ Career pathing clarity\n✅ Manager training\n✅ Fair compensation\n✅ Psychological safety\n\nThe basics still win. Every. Single. Time.',
    image: postImage1,
    likes: 421,
    comments: 89,
    shares: 156,
    verified: true,
    userId: 2,
  },
];

const suggestedPeople = [
  { id: 1, name: 'Sarah Chen', title: 'VP of People @ SaaS Unicorn', avatar: avatar1, followers: '8.2K', verified: true },
  { id: 2, name: 'Marcus Thompson', title: 'CHRO @ Enterprise Co', avatar: avatar2, followers: '15.4K', verified: true },
  { id: 3, name: 'Priya Sharma', title: 'Director of TA @ Tech Ltd', avatar: avatar3, followers: '4.5K', verified: true },
  { id: 4, name: 'Jennifer Park', title: 'Head of People Ops @ Startup', avatar: avatar4, followers: '3.1K', verified: true },
  { id: 5, name: 'Rachel Martinez', title: 'VP of Talent @ FinTech', avatar: avatar5, followers: '9.8K', verified: true },
  { id: 6, name: 'Michael Chen', title: 'CHRO @ Healthcare Inc', avatar: avatar6, followers: '12.3K', verified: true },
];

// Helper function to get profession-based badge styles
const getProfessionBadge = (title: string) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('chro') || lowerTitle.includes('chief')) {
    return {
      gradient: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600',
      border: 'border-amber-300',
      icon: (
        <svg className="w-3 h-3 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    };
  }
  
  if (lowerTitle.includes('vp') || lowerTitle.includes('vice president')) {
    return {
      gradient: 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600',
      border: 'border-purple-400',
      icon: (
        <svg className="w-3 h-3 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    };
  }
  
  if (lowerTitle.includes('director')) {
    return {
      gradient: 'bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600',
      border: 'border-teal-400',
      icon: (
        <svg className="w-3 h-3 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    };
  }
  
  if (lowerTitle.includes('head of') || lowerTitle.includes('manager')) {
    return {
      gradient: 'bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-600',
      border: 'border-rose-400',
      icon: (
        <svg className="w-3 h-3 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    };
  }
  
  return {
    gradient: 'bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600',
    border: 'border-violet-400',
    icon: (
      <svg className="w-3 h-3 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )
  };
};

export function SearchPage({ onBack, onUserClick, onPostClick, userExperienceMode = 'experienced' }: SearchPageProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'top' | 'latest' | 'people' | 'posts'>('top');
  const [recentSearchList, setRecentSearchList] = useState(userExperienceMode === 'first-time' ? [] : recentSearches);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearchList.includes(query)) {
      setRecentSearchList([query, ...recentSearchList.slice(0, 4)]);
    }
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearchList(recentSearchList.filter(s => s !== search));
  };

  const clearAllSearches = () => {
    setRecentSearchList([]);
  };

  return (
    <div className={`absolute inset-0 z-50 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} overflow-hidden w-full`}>
      <div className="flex flex-col h-full">
        {/* Fixed Search Header */}
        <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'} border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          {/* Top Bar */}
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={onBack}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
            </button>
            
            {/* Search Input */}
            <div className={`flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Search className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search genHRX"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`p-1 rounded-full ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}
                >
                  <X className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          {searchQuery && (
            <div className="flex items-center gap-1 px-4 pb-2">
              {(['top', 'latest', 'people', 'posts'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                      : isDark
                      ? 'text-slate-400 hover:bg-slate-800'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {!searchQuery ? (
            <>
              {/* Recent Searches */}
              {recentSearchList.length > 0 && (
                <div className="px-4 py-3 border-b border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Recent</h3>
                    <button
                      onClick={clearAllSearches}
                      className={`text-xs font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearchList.map((search, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                      >
                        <button
                          onClick={() => handleSearch(search)}
                          className="flex items-center gap-3 flex-1 text-left"
                        >
                          <Clock className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                          <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{search}</span>
                        </button>
                        <button
                          onClick={() => removeRecentSearch(search)}
                          className={`p-1 rounded-full ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'}`}
                        >
                          <X className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Topics */}
              <div className="px-4 py-3">
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Top 10 Trending in HR
                </h3>
                <div className="space-y-1">
                  {trendingTopics.map((topic, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleSearch(`#${topic.tag}`)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-2 rounded-lg transition-colors text-left ${
                        isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Hash className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                            <span className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {topic.tag}
                            </span>
                          </div>
                          <p className={`text-xs ml-5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                            {topic.posts} posts
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            topic.category === 'Hot'
                              ? 'bg-red-500/20 text-red-400'
                              : topic.category === 'Trending'
                              ? 'bg-purple-500/20 text-purple-400'
                              : isDark
                              ? 'bg-slate-700 text-slate-400'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {topic.trend}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Suggested People */}
              <div className="px-4 py-3 border-t border-slate-800">
                <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>People to follow</h3>
                <div className="space-y-3">
                  {suggestedPeople.map((person) => (
                    <div
                      key={person.id}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                    >
                      <button
                        onClick={() => onUserClick(person.id)}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className="relative">
                          <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
                          {person.verified && (() => {
                            const badge = getProfessionBadge(person.title);
                            return (
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${isDark ? 'border-slate-900' : 'border-white'} ${badge.border} shadow-lg ${badge.gradient}`}>
                                {badge.icon}
                              </div>
                            );
                          })()}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {person.name}
                          </h4>
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {person.title}
                          </p>
                        </div>
                      </button>
                      <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white text-sm font-medium hover:from-purple-700 hover:to-orange-600 transition-all">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={`px-4 py-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Search results for "{searchQuery}"
              </p>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                Results will appear here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
