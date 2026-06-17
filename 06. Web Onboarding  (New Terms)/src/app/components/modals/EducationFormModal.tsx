import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, Building2, Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

interface EducationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EducationData) => void;
  initialData?: EducationData;
  mode: 'add' | 'edit';
}

export interface EducationData {
  id?: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export function EducationFormModal({ isOpen, onClose, onSave, initialData, mode }: EducationFormModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobileView, setIsMobileView] = useState(false);
  const [formData, setFormData] = useState<EducationData>(
    initialData || {
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
    }
  );

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className={`${isMobileView ? 'w-full max-h-[85vh]' : 'w-full max-w-md max-h-[80vh]'} ${
      isMobileView ? 'rounded-t-3xl' : 'rounded-3xl'
    } overflow-hidden ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 px-5 py-4 border-b ${isDark ? 'bg-[#1a1d29] border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {mode === 'add' ? 'Add Education' : 'Edit Education'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(85vh-80px)]">
        <div className="p-5 space-y-4">
          {/* Degree */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Degree *
            </label>
            <div className="relative">
              <GraduationCap className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="e.g. Master's in Human Resources"
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>

          {/* Institution */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Institution *
            </label>
            <div className="relative">
              <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. Stanford University"
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>

          {/* Years Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Start Year */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Start Year *
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="number"
                  value={formData.startYear}
                  onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                  placeholder="2015"
                  min="1950"
                  max={new Date().getFullYear()}
                  required
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
            </div>

            {/* End Year */}
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                End Year *
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="number"
                  value={formData.endYear}
                  onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                  placeholder="2017"
                  min="1950"
                  max={new Date().getFullYear() + 10}
                  required
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl font-semibold ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg transition-all"
            >
              {mode === 'add' ? 'Add Education' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

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
            initial={{ y: isMobileView ? '100%' : 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isMobileView ? '100%' : 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative"
          >
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
