import { useTheme } from '../../context/ThemeContext';
import { UserPlus, Check, X } from 'lucide-react';
import { useState } from 'react';

interface SuggestedPerson {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  mutualConnections: number;
  verified: boolean;
  following: boolean;
}

interface SuggestedPeopleCardProps {
  people: SuggestedPerson[];
}

export function SuggestedPeopleCard({ people }: SuggestedPeopleCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});
  const [dismissedPeople, setDismissedPeople] = useState<Set<string>>(new Set());

  const handleFollow = (id: string) => {
    setFollowingStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDismiss = (id: string) => {
    setDismissedPeople(prev => new Set([...prev, id]));
  };

  const visiblePeople = people.filter(person => !dismissedPeople.has(person.id));

  if (visiblePeople.length === 0) return null;

  return (
    <div className={`rounded-2xl overflow-hidden border ${
      isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
        <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          People you may know
        </h3>
      </div>

      {/* People Carousel */}
      <div className="px-4 py-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2">
          {visiblePeople.slice(0, 5).map((person) => (
            <div 
              key={person.id} 
              className={`flex-shrink-0 w-[280px] snap-start rounded-xl border p-4 ${
                isDark ? 'bg-[#1a1d29] border-[#363b4e]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative mb-3">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button
                    onClick={() => handleDismiss(person.id)}
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isDark ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-white hover:bg-slate-100 text-slate-600 shadow-sm'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {/* Name */}
                <div className="flex items-center gap-1 mb-1">
                  <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {person.name}
                  </h4>
                  {person.verified && (
                    <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </div>

                {/* Role & Company */}
                <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {person.role}
                </p>
                <p className={`text-xs mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {person.company}
                </p>

                {/* Mutual Connections */}
                <p className={`text-xs mb-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {person.mutualConnections} mutual connections
                </p>

                {/* Follow Button */}
                <button
                  onClick={() => handleFollow(person.id)}
                  className={`w-full py-2 rounded-lg text-xs font-semibold transition-all ${
                    followingStates[person.id]
                      ? isDark
                        ? 'bg-slate-700 text-white border border-slate-600'
                        : 'bg-slate-200 text-slate-700 border border-slate-300'
                      : 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                  }`}
                >
                  {followingStates[person.id] ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Check className="w-3 h-3" />
                      Following
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <UserPlus className="w-3 h-3" />
                      Follow
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* See All */}
      <div className={`p-3 border-t ${
        isDark ? 'border-[#363b4e]' : 'border-slate-200'
      }`}>
        <button className={`text-sm font-semibold w-full text-center py-1 ${
          isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
        }`}>
          See all recommendations
        </button>
      </div>
    </div>
  );
}