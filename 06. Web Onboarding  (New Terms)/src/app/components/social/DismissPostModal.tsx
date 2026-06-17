import { useTheme } from '../../context/ThemeContext';
import { EyeOff, Flag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface DismissPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDismissReason: (reason: 'not-interested' | 'not-appropriate') => void;
  onUndo: () => void;
}

export function DismissPostModal({ isOpen, onClose, onDismissReason, onUndo }: DismissPostModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className={`fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl rounded-t-3xl shadow-2xl overflow-hidden ${
              isDark ? 'bg-[#1a1d28]' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4">
              <button
                onClick={onClose}
                className={`absolute top-6 right-6 p-1.5 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-700 text-slate-400' 
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Why did you dismiss this post?
              </h2>
              <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Help us improve your feed
              </p>
            </div>

            {/* Options */}
            <div className="px-6 pb-4 space-y-3">
              {/* Not Interested */}
              <button
                onClick={() => onDismissReason('not-interested')}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                  isDark 
                    ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <EyeOff className="w-6 h-6" />
                <span className="text-base font-medium">Not interested</span>
              </button>

              {/* Not Appropriate */}
              <button
                onClick={() => onDismissReason('not-appropriate')}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                  isDark 
                    ? 'bg-red-900/20 hover:bg-red-900/30 text-red-400' 
                    : 'bg-red-50 hover:bg-red-100 text-red-600'
                }`}
              >
                <Flag className="w-6 h-6" />
                <span className="text-base font-medium">Not Appropriate for genHRX</span>
              </button>
            </div>

            {/* Undo Button */}
            <div className="px-6 pb-6">
              <button
                onClick={onUndo}
                className="w-full py-4 rounded-2xl font-semibold text-white text-base bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 transition-all shadow-lg"
              >
                Undo
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}