import { useTheme } from '../../context/ThemeContext';
import { Users, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface SuggestedGroup {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  members: number;
  posts: string;
  description: string;
  category: string;
  joined: boolean;
}

interface SuggestedGroupsCardProps {
  groups: SuggestedGroup[];
}

export function SuggestedGroupsCard({ groups }: SuggestedGroupsCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [joinedGroups, setJoinedGroups] = useState<Record<string, boolean>>({});

  const handleJoin = (id: string) => {
    setJoinedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatMembers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className={`rounded-2xl overflow-hidden border ${
      isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
    }`}>
      {/* Header removed - no title needed */}
      
      {/* Groups List */}
      <div className="divide-y divide-inherit">
        {groups.slice(0, 3).map((group) => (
          null
        ))}
      </div>

      {/* See All */}
      
    </div>
  );
}