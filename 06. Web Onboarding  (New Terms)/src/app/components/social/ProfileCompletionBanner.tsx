import { motion } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ProfileCompletionBannerProps {
  onComplete: () => void;
  onDismiss: () => void;
}

export function ProfileCompletionBanner({ onComplete, onDismiss }: ProfileCompletionBannerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative overflow-hidden rounded-2xl mb-4 ${
        isDark
          ? 'bg-gradient-to-r from-purple-900/40 to-orange-900/40 border border-purple-500/30'
          : 'bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl" />
      </div>

      <div className="relative p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`p-3 rounded-xl ${
            isDark ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Sparkles className={`w-6 h-6 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-1 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Hey there! Let's make your profile shine ✨
            </h3>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              You're almost there! Complete your profile to unlock the full GenHRX experience and connect with HR professionals like you.
            </p>
            
            <button
              onClick={onComplete}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
                isDark
                  ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                  : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
              }`}
            >
              Complete Profile
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onDismiss}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                : 'text-slate-500 hover:bg-white hover:text-slate-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
