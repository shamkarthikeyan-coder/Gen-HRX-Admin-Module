import { ThumbsUp, Heart, Lightbulb, Scale, Brain } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ReactionPickerProps {
  onReact: (type: string) => void;
}

export function ReactionPicker({ onReact }: ReactionPickerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const reactions = [
    { type: 'like', icon: ThumbsUp, label: 'Like' },
    { type: 'love', icon: Heart, label: 'Love' },
    { type: 'insightful', icon: Lightbulb, label: 'Insightful' },
    { type: 'balanced', icon: Scale, label: 'Balanced' },
    { type: 'thoughtful', icon: Brain, label: 'Thoughtful' }
  ];

  return (
    <div className={`absolute bottom-full left-0 mb-2 px-4 py-3 rounded-2xl border shadow-2xl flex items-center gap-2 ${
      isDark 
        ? 'bg-[#2a2f3e] border-[#3d4354]' 
        : 'bg-white border-slate-200'
    }`}>
      {reactions.map((reaction) => {
        const Icon = reaction.icon;
        return (
          <button
            key={reaction.type}
            onClick={(e) => {
              e.stopPropagation();
              onReact(reaction.type);
            }}
            className="group relative p-2 transition-transform hover:scale-125 active:scale-110"
            aria-label={reaction.label}
          >
            <Icon className="w-6 h-6 text-purple-600 transition-all group-hover:text-purple-500" strokeWidth={2.5} />
            
            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
              isDark ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'
            }`}>
              {reaction.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
