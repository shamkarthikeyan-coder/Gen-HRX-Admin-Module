import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check,
  HandsClapping,
  Diamond,
  TrendUp,
  Megaphone,
  Article,
  Briefcase,
  type Icon
} from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';

export type BadgeType = 
  | 'verified'
  | 'innovator' 
  | 'decision-catalyst'
  | 'strategy-architect'
  | 'community-strategist'
  | 'knowledge-contributor'
  | 'thought-leader'
  | 'executive-insider';

interface ProfileBadgeProps {
  type: BadgeType;
  title: string;
  description: string;
}

const badgeConfig: Record<BadgeType, { icon: Icon; bgColor: string; iconColor: string }> = {
  'verified': {
    icon: Check,
    bgColor: 'bg-purple-600',
    iconColor: 'text-white'
  },
  'innovator': {
    icon: HandsClapping,
    bgColor: 'bg-orange-500',
    iconColor: 'text-white'
  },
  'decision-catalyst': {
    icon: Diamond,
    bgColor: 'bg-blue-500',
    iconColor: 'text-white'
  },
  'strategy-architect': {
    icon: TrendUp,
    bgColor: 'bg-purple-600',
    iconColor: 'text-white'
  },
  'community-strategist': {
    icon: Megaphone,
    bgColor: 'bg-purple-600',
    iconColor: 'text-white'
  },
  'knowledge-contributor': {
    icon: Article,
    bgColor: 'bg-orange-600',
    iconColor: 'text-white'
  },
  'thought-leader': {
    icon: Article,
    bgColor: 'bg-cyan-500',
    iconColor: 'text-white'
  },
  'executive-insider': {
    icon: Briefcase,
    bgColor: 'bg-indigo-600',
    iconColor: 'text-white'
  }
};

export function ProfileBadge({ type, title, description }: ProfileBadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showTooltip, setShowTooltip] = useState(false);
  
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Badge Icon */}
      <div className={`w-5 h-5 rounded-full ${config.bgColor} flex items-center justify-center cursor-pointer`}>
        <Icon className={`w-3 h-3 ${config.iconColor}`} />
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-max max-w-xs"
          >
            <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-lg shadow-xl border ${isDark ? 'border-slate-700' : 'border-slate-200'} p-3`}>
              <div className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {title}
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {description}
              </div>
            </div>
            {/* Tooltip arrow */}
            <div 
              className={`absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rotate-45 ${isDark ? 'bg-slate-800 border-l border-t border-slate-700' : 'bg-white border-l border-t border-slate-200'}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}