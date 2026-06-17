import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Building2, Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  }) => void;
  initialData?: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
  };
}

export function AddExperienceModal({ isOpen, onClose, onSave, initialData }: AddExperienceModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState(initialData?.title || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [isCurrent, setIsCurrent] = useState(initialData?.isCurrent || false);

  const handleSave = () => {
    onSave({
      title,
      company,
      startDate,
      endDate,
      isCurrent,
    });
    onClose();
  };

  const handleLinkedInSync = () => {
    console.log('Sync with LinkedIn clicked');
    // Here you would implement LinkedIn OAuth flow
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`w-full max-w-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden ${
                isDark ? 'bg-[#1a1d29]' : 'bg-white'
              }`}
            >
              {/* Header */}
              <div className={`px-6 py-5 flex items-center justify-between border-b ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Add Experience
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* LinkedIn Sync Button */}
                <button
                  onClick={handleLinkedInSync}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-blue-600 bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center gap-3 hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors"
                >
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-blue-600 font-semibold text-lg">
                    Sync with LinkedIn
                  </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    or enter manually
                  </span>
                  <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                </div>

                {/* Job Title */}
                <div>
                  <label className={`block text-base font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-base focus:outline-none focus:ring-0 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                      }`}
                      placeholder="e.g. Senior HR Director"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className={`block text-base font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-base focus:outline-none focus:ring-0 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                      }`}
                      placeholder="e.g. TechCorp Inc."
                    />
                  </div>
                </div>

                {/* Currently Work Here Toggle */}
                <div className="flex items-center justify-between py-2">
                  <span className={`text-base font-medium ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    I currently work here
                  </span>
                  <button
                    onClick={() => setIsCurrent(!isCurrent)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      isCurrent ? 'bg-blue-600' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      isCurrent ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </button>
                </div>

                {/* Start Date */}
                <div>
                  <label className={`block text-base font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Start Date (YYYY-MM) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-base focus:outline-none focus:ring-0 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                      }`}
                      placeholder="YYYY-MM"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className={`block text-base font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-slate-400' : 'text-slate-400'
                    }`} />
                    <input
                      type="text"
                      value={isCurrent ? 'Present' : endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      disabled={isCurrent}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 text-base focus:outline-none focus:ring-0 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500 disabled:opacity-50' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 disabled:opacity-50'
                      }`}
                      placeholder="YYYY-MM"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`px-6 py-5 flex items-center gap-3 border-t ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <button
                  onClick={onClose}
                  className={`flex-1 py-3.5 rounded-2xl font-bold text-base transition-colors ${
                    isDark 
                      ? 'text-white hover:bg-slate-700' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-base bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:from-purple-700 hover:to-orange-600 transition-all shadow-lg shadow-purple-500/30"
                >
                  Add Experience
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
