import { motion } from 'motion/react';
import { X, Users, UserPlus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

import avatar1 from 'figma:asset/64a2721f5e2f4413f02de48fac47b6bc5b106008.png';
import avatar2 from 'figma:asset/8b30d7bf487869ad5becc9eb29ba0fa7831e5232.png';
import avatar3 from 'figma:asset/92a98459b2a10c6942e7b03217548da1522cef29.png';
import avatar4 from 'figma:asset/e91c075fb702228a10b42e603ed8cb09100347cb.png';
import avatar5 from 'figma:asset/64d0e1c979e627ec8cf8a48b4384eacc404cf291.png';

interface ConnectionsPageProps {
  onClose: () => void;
  initialTab?: 'followers' | 'following' | 'groups';
  userExperienceMode?: 'first-time' | 'experienced';
}

export function ConnectionsPage({ onClose, initialTab = 'followers', userExperienceMode = 'experienced' }: ConnectionsPageProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'followers' | 'following' | 'groups'>(initialTab);

  // Mock followers data - only people following you
  const mockFollowers = userExperienceMode === 'first-time' ? [] : [
    { id: 1, name: 'Marcus Thompson', username: 'marcus_hr', role: 'CHRO @ Fortune 500', avatar: avatar3, verified: true },
    { id: 2, name: 'Priya Sharma', username: 'priya_talent', role: 'Head of Talent @ Startup', avatar: avatar2, verified: true },
    { id: 3, name: 'James Wilson', username: 'jwilson_hr', role: 'VP People Ops @ Tech', avatar: avatar4, verified: false },
    { id: 4, name: 'Linda Garcia', username: 'linda_people', role: 'People Director @ SaaS', avatar: avatar5, verified: true },
    { id: 5, name: 'David Lee', username: 'david_hrtech', role: 'HR Tech Consultant', avatar: avatar1, verified: false },
  ];

  // Mock following data - only people you follow
  const mockFollowing = userExperienceMode === 'first-time' ? [] : [
    { id: 1, name: 'Emily Rodriguez', username: 'emily_dei', role: 'DEI Specialist @ Enterprise', avatar: avatar1, verified: true },
    { id: 2, name: 'Michael Chen', username: 'michael_comp', role: 'Compensation Lead @ FinTech', avatar: avatar3, verified: false },
    { id: 3, name: 'Amanda Park', username: 'amanda_culture', role: 'Culture & Engagement @ Retail', avatar: avatar2, verified: true },
  ];

  // Mock groups data - only joined groups
  const mockGroups = userExperienceMode === 'first-time' ? [] : [
    { id: 1, name: 'Tech HR Leaders', members: 2547, posts: 1234, description: 'For HR professionals in the tech industry' },
    { id: 2, name: 'DEI Champions', members: 1893, posts: 892, description: 'Advancing diversity, equity, and inclusion' },
    { id: 3, name: 'Remote Work Revolution', members: 4512, posts: 3654, description: 'The future of distributed teams' },
  ];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'followers': return 'Followers';
      case 'following': return 'Following';
      case 'groups': return 'Groups';
      default: return 'Connections';
    }
  };

  return (
    <div className={`absolute inset-0 z-50 overflow-y-auto w-full h-full ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
      {/* Status Bar Safe Area */}
      <div className={`h-12 ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}></div>

      {/* Header */}
      <div className={`sticky top-12 z-10 ${isDark ? 'bg-[#1a1d29]/95' : 'bg-slate-50/95'} backdrop-blur-sm px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {getTabTitle()}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simple Text-Based Tabs like Profile */}
        <div className={`flex items-center border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            onClick={() => setActiveTab('followers')}
            className={`flex-1 py-3 text-xs font-semibold transition-all relative ${
              activeTab === 'followers'
                ? isDark ? 'text-white' : 'text-slate-900'
                : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Followers
            {activeTab === 'followers' && (
              <motion.div
                layoutId="connectionsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-3 text-xs font-semibold transition-all relative ${
              activeTab === 'following'
                ? isDark ? 'text-white' : 'text-slate-900'
                : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <motion.div
                layoutId="connectionsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-3 text-xs font-semibold transition-all relative ${
              activeTab === 'groups'
                ? isDark ? 'text-white' : 'text-slate-900'
                : isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Groups
            {activeTab === 'groups' && (
              <motion.div
                layoutId="connectionsTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-orange-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto pb-24">
        {/* Followers Tab */}
        {activeTab === 'followers' && (
          <div>
            {mockFollowers.length === 0 ? (
              <div className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center`}>
                  <Users className={`w-8 h-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  No Followers Yet
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Start connecting with HR professionals!
                </p>
              </div>
            ) : (
              mockFollowers.map((user) => (
                <div
                  key={user.id}
                  className={`px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'} ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {user.name}
                        </p>
                        {user.verified && (
                          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        @{user.username}
                      </p>
                      <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        {user.role}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle follow/unfollow
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                        isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                      }`}
                    >
                      Following
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Following Tab */}
        {activeTab === 'following' && (
          <div>
            {mockFollowing.length === 0 ? (
              <div className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center`}>
                  <UserPlus className={`w-8 h-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Not Following Anyone Yet
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Discover HR professionals to follow!
                </p>
              </div>
            ) : (
              mockFollowing.map((user) => (
                <div
                  key={user.id}
                  className={`px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'} ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'} transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {user.name}
                        </p>
                        {user.verified && (
                          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600 shrink-0">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        @{user.username}
                      </p>
                      <p className={`text-xs truncate ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        {user.role}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle follow/unfollow
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                        isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                      }`}
                    >
                      Following
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="px-5 py-4 space-y-3">
            {mockGroups.length === 0 ? (
              <div className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center`}>
                  <Users className={`w-8 h-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  No Groups Joined Yet
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Join groups to connect with like-minded HR professionals!
                </p>
              </div>
            ) : (
              mockGroups.map((group) => (
                <div
                  key={group.id}
                  className={`p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white border border-slate-200'} transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {group.name}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
                        {group.description}
                      </p>
                      <div className={`flex items-center gap-4 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        <span>{group.members.toLocaleString()} members</span>
                        <span>{group.posts.toLocaleString()} posts</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle leave group
                    }}
                    className={`w-full px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                    }`}
                  >
                    Joined
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
