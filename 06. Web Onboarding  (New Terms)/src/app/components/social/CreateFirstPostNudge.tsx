import image_24b99c7353b7431c0ef7f99e4b461b079b3a2365 from 'figma:asset/24b99c7353b7431c0ef7f99e4b461b079b3a2365.png'
import { motion } from 'motion/react';
import { PenSquare, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CreateFirstPostNudgeProps {
  onCreatePost: () => void;
  userName?: string;
}

export function CreateFirstPostNudge({ onCreatePost, userName }: CreateFirstPostNudgeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl overflow-hidden mb-6 ${
        isDark ? 'bg-[#242833] border border-[#363b4e]' : 'bg-white border border-slate-200'
      }`}
    >
      <div className="relative p-8 text-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10" />
        
        <div className="relative">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden"
          >
            <ImageWithFallback 
              src={image_24b99c7353b7431c0ef7f99e4b461b079b3a2365}
              alt="People Parley Logo"
              className="w-10 h-10 object-contain"
            />
          </motion.div>

          {/* Title */}
          <h2 className={`text-2xl font-bold mb-3 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Welcome to People Parley{userName ? `, ${userName.split(' ')[0]}` : ''}! 👋
          </h2>

          {/* Description */}
          <p className={`text-base mb-6 max-w-md mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Share your first thought, ask a question, or start a conversation with fellow HR professionals.
          </p>

          {/* CTA Button */}
          <button
            onClick={onCreatePost}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Create Your First Post
          </button>

          {/* Encouraging Text */}
          <p className={`text-sm mt-4 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Don't worry, you can always edit or delete it later
          </p>
        </div>
      </div>
    </motion.div>
  );
}