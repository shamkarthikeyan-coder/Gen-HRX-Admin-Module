import { X, Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface IntentContextBarProps {
  intentText: string;
  onClear: () => void;
  onFavorite: () => void;
  isFavorited: boolean;
}

export function IntentContextBar({ intentText, onClear, onFavorite, isFavorited }: IntentContextBarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`sticky top-[57px] z-20 -mx-4 px-4 py-4 mb-6 border-b ${
      isDark 
        ? 'bg-[#1a1d29] border-[#363b4e]' 
        : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex-1 mr-4">
          <div className="text-xs font-bold uppercase tracking-wide text-purple-600 mb-1">
            CURRENT FOCUS
          </div>
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {intentText}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorited
                ? 'text-yellow-500 hover:text-yellow-600'
                : isDark 
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-yellow-500' 
                  : 'hover:bg-slate-100 text-slate-600 hover:text-yellow-500'
            }`}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClear}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'hover:bg-slate-700 text-slate-400' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
            aria-label="Clear focus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
