import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

interface EditFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  initialValue: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'textarea';
  icon?: React.ComponentType<{ className?: string }>;
}

export function EditFieldModal({
  isOpen,
  onClose,
  onSave,
  title,
  initialValue,
  placeholder,
  type = 'text',
  icon: Icon,
}: EditFieldModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center md:items-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`relative w-full md:max-w-md max-h-[85vh] rounded-t-3xl md:rounded-3xl overflow-hidden ${
              isDark ? 'bg-[#1a1d29]' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div
              className={`sticky top-0 z-10 px-5 py-4 border-b ${
                isDark ? 'bg-[#1a1d29] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-xl ${
                    isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-5">
              <div className="relative">
                {Icon && (
                  <Icon
                    className={`absolute left-3 ${
                      type === 'textarea' ? 'top-3' : 'top-1/2 -translate-y-1/2'
                    } w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                  />
                )}
                {type === 'textarea' ? (
                  <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    rows={5}
                    className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                ) : (
                  <input
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 rounded-xl border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`w-full mt-4 py-3 rounded-xl font-semibold text-sm ${
                  isDark
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90'
                    : 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90'
                } transition-opacity`}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
