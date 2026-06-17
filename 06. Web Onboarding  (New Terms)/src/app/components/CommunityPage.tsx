import { useState } from 'react';
import { ArrowLeft, Users, TrendingUp, Award, Sparkles, Crown, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

// Import avatars
import avatar1 from 'figma:asset/64a2721f5e2f4413f02de48fac47b6bc5b106008.png';
import avatar2 from 'figma:asset/8b30d7bf487869ad5becc9eb29ba0fa7831e5232.png';
import avatar3 from 'figma:asset/92a98459b2a10c6942e7b03217548da1522cef29.png';
import avatar4 from 'figma:asset/e91c075fb702228a10b42e603ed8cb09100347cb.png';
import avatar5 from 'figma:asset/64d0e1c979e627ec8cf8a48b4384eacc404cf291.png';
import avatar6 from 'figma:asset/f976fb3c6f58297cde273d2b693868a38a4bad2a.png';

interface CommunityPageProps {
  onBack: () => void;
  onUserClick: (userId: number) => void;
  userExperienceMode?: 'first-time' | 'experienced';
}

// Helper function to get profession-based badge styles
const getProfessionBadge = (title: string) => {
  const lowerTitle = title.toLowerCase();
  
  // C-Suite / CHRO - Premium Gold
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
  
  // VP Level - Premium Purple
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
  
  // Director Level - Premium Teal
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
  
  // Head of / Manager Level - Premium Rose
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
  
  // Default - Premium Violet
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

const topInfluencers = [
  { 
    id: 1, 
    name: 'Sarah Chen', 
    title: 'VP of People @ SaaS Unicorn', 
    avatar: avatar1, 
    followers: '8.2K', 
    parleys: 156,
    engagement: '94%',
    specialty: 'Compensation & Benefits',
    verified: true 
  },
  { 
    id: 2, 
    name: 'Marcus Thompson', 
    title: 'CHRO @ Enterprise Co', 
    avatar: avatar2, 
    followers: '15.4K', 
    parleys: 342,
    engagement: '97%',
    specialty: 'Organizational Design',
    verified: true 
  },
  { 
    id: 3, 
    name: 'Priya Sharma', 
    title: 'Director of TA @ Tech Ltd', 
    avatar: avatar3, 
    followers: '4.5K', 
    parleys: 89,
    engagement: '91%',
    specialty: 'Talent Acquisition',
    verified: true 
  },
];

const risingStars = [
  { 
    id: 4, 
    name: 'Jennifer Park', 
    title: 'Head of People Ops @ Startup', 
    avatar: avatar4, 
    followers: '3.1K', 
    parleys: 67,
    growth: '+245%',
    specialty: 'People Operations',
    verified: true 
  },
  { 
    id: 5, 
    name: 'Rachel Martinez', 
    title: 'VP of Talent @ FinTech', 
    avatar: avatar5, 
    followers: '9.8K', 
    parleys: 124,
    growth: '+189%',
    specialty: 'Executive Search',
    verified: true 
  },
  { 
    id: 6, 
    name: 'Michael Chen', 
    title: 'CHRO @ Healthcare Inc', 
    avatar: avatar6, 
    followers: '12.3K', 
    parleys: 287,
    growth: '+156%',
    specialty: 'DEI & Culture',
    verified: true 
  },
];

const communityStats = [
  { label: 'Active Members', value: '12.5K', icon: Users, trend: '+23%' },
  { label: 'Parleys This Week', value: '2.8K', icon: TrendingUp, trend: '+15%' },
  { label: 'Verified Experts', value: '1.2K', icon: Award, trend: '+8%' },
];

export function CommunityPage({ onBack, onUserClick, userExperienceMode = 'experienced' }: CommunityPageProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState<'influencers' | 'rising' | 'all'>('influencers');

  return (
    <div className={`absolute inset-0 z-50 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} overflow-hidden w-full`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'} border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3 px-4 py-4">
            <button
              onClick={onBack}
              className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
            </button>
            
            <div className="flex-1">
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Community
              </h1>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Connect with HR leaders & experts
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* Welcome Banner for First-Time Users */}
          {userExperienceMode === 'first-time' && (
            <div className="px-4 pt-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-gradient-to-r from-purple-900/50 to-orange-900/50 border border-purple-800' : 'bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-purple-600">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Welcome to the Community! 🎉
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Follow HR leaders, discover insights, and build your network. Start by following these top influencers!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Community Stats */}
          <div className="px-4 py-4">
            <div className="grid grid-cols-3 gap-3">
              {communityStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-3 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
                >
                  <div className="flex items-center justify-center mb-1">
                    <stat.icon className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className={`text-center text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-center text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                  <div className="text-center text-[10px] text-green-500 font-medium mt-0.5">
                    {stat.trend}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section Tabs */}
          <div className="px-4 pb-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSection('influencers')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === 'influencers'
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Crown className="w-4 h-4" />
                Top Influencers
              </button>
              <button
                onClick={() => setActiveSection('rising')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === 'rising'
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Rising Stars
              </button>
            </div>
          </div>

          {/* Top Influencers Section */}
          {activeSection === 'influencers' && (
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-amber-500" />
                <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Top HR Influencers
                </h2>
              </div>
              <div className="space-y-3">
                {topInfluencers.map((person, idx) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-xl transition-all ${
                      isDark ? 'bg-slate-800 hover:bg-slate-750' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Rank Badge */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        idx === 0 
                          ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-white'
                          : idx === 1
                          ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white'
                          : 'bg-gradient-to-br from-amber-600 to-orange-700 text-white'
                      }`}>
                        {idx + 1}
                      </div>

                      {/* Avatar & Info */}
                      <button
                        onClick={() => onUserClick(person.id)}
                        className="flex items-start gap-3 flex-1 text-left"
                      >
                        <div className="relative shrink-0">
                          <img 
                            src={person.avatar} 
                            alt={person.name} 
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-500/30" 
                          />
                          {person.verified && (() => {
                            const badge = getProfessionBadge(person.title);
                            return (
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${isDark ? 'border-slate-800' : 'border-white'} ${badge.border} shadow-lg ${badge.gradient}`}>
                                {badge.icon}
                              </div>
                            );
                          })()}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {person.name}
                          </h3>
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {person.title}
                          </p>
                          <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                          }`}>
                            <Target className="w-3 h-3" />
                            {person.specialty}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {person.followers}
                              </span> followers
                            </div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {person.parleys}
                              </span> parleys
                            </div>
                            <div className="text-xs text-green-500 font-medium">
                              {person.engagement} engagement
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Follow Button */}
                      <button className="shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white text-xs font-medium hover:from-purple-700 hover:to-orange-600 transition-all shadow-lg">
                        Follow
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Rising Stars Section */}
          {activeSection === 'rising' && (
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Rising Stars
                </h2>
              </div>
              <div className="space-y-3">
                {risingStars.map((person, idx) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-xl transition-all ${
                      isDark ? 'bg-slate-800 hover:bg-slate-750' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Growth Badge */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>

                      {/* Avatar & Info */}
                      <button
                        onClick={() => onUserClick(person.id)}
                        className="flex items-start gap-3 flex-1 text-left"
                      >
                        <div className="relative shrink-0">
                          <img 
                            src={person.avatar} 
                            alt={person.name} 
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-green-500/30" 
                          />
                          {person.verified && (() => {
                            const badge = getProfessionBadge(person.title);
                            return (
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${isDark ? 'border-slate-800' : 'border-white'} ${badge.border} shadow-lg ${badge.gradient}`}>
                                {badge.icon}
                              </div>
                            );
                          })()}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {person.name}
                          </h3>
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {person.title}
                          </p>
                          <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
                          }`}>
                            <Target className="w-3 h-3" />
                            {person.specialty}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {person.followers}
                              </span> followers
                            </div>
                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {person.parleys}
                              </span> parleys
                            </div>
                            <div className="flex items-center gap-1 text-xs text-green-500 font-medium">
                              <TrendingUp className="w-3 h-3" />
                              {person.growth}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Follow Button */}
                      <button className="shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white text-xs font-medium hover:from-purple-700 hover:to-orange-600 transition-all shadow-lg">
                        Follow
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Spacing for Navigation */}
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
}