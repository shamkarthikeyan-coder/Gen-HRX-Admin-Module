import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

interface EditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  initialValue: string;
  placeholder: string;
  type?: 'input' | 'textarea' | 'email';
  icon?: any;
}

export function EditFieldModal({
  isOpen,
  onClose,
  onSave,
  title,
  initialValue,
  placeholder,
  type = 'input',
  icon: Icon,
}: EditFieldModalProps) {
  const { isDark } = useTheme();
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-black/40'} backdrop-blur-sm`}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`relative w-full rounded-t-3xl ${
              isDark ? 'bg-[#1a1d29]' : 'bg-white'
            } shadow-2xl max-h-[80vh] overflow-hidden`}
          >
            {/* Header */}
            <div className={`px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-slate-800' : 'bg-slate-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                    </div>
                  )}
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-xl ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                  <X className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              {type === 'textarea' ? (
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  rows={6}
                  className={`w-full px-4 py-3 rounded-xl border resize-none ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              ) : (
                <input
                  type={type === 'email' ? 'email' : 'text'}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  autoFocus
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    isDark
                      ? 'bg-slate-800 text-white hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
