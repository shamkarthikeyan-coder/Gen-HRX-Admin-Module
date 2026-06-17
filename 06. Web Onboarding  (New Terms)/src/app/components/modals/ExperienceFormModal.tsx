import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Briefcase, Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExperienceData) => void;
  initialData?: ExperienceData;
  mode: 'add' | 'edit';
}

export interface ExperienceData {
  id?: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export function ExperienceFormModal({ isOpen, onClose, onSave, initialData, mode }: ExperienceFormModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState<ExperienceData>(
    initialData || {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal - Centered for web like Instagram */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`relative w-full max-w-md max-h-[85vh] rounded-2xl overflow-hidden ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}
          >
            {/* Header */}
            <div className={`sticky top-0 z-10 px-5 py-4 border-b ${isDark ? 'bg-[#1a1d29] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {mode === 'add' ? 'Add Experience' : 'Edit Experience'}
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
                {/* Job Title */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Senior HR Director"
                      required
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Company *
                  </label>
                  <div className="relative">
                    <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. TechCorp Inc."
                      required
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                {/* Current Position Toggle */}
                <div className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <label className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    I currently work here
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isCurrent: !formData.isCurrent, endDate: !formData.isCurrent ? '' : formData.endDate })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${formData.isCurrent ? 'bg-gradient-to-r from-purple-600 to-orange-500' : isDark ? 'bg-slate-700' : 'bg-slate-300'}`}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: formData.isCurrent ? '22px' : '2px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Start Date */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="month"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                {/* End Date */}
                {!formData.isCurrent && (
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      End Date *
                    </label>
                    <div className="relative">
                      <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      <input
                        type="month"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required={!formData.isCurrent}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    </div>
                  </div>
                )}

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
                    {mode === 'add' ? 'Add Experience' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
