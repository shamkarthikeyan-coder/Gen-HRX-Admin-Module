import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Building2, Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect } from 'react';

interface CertificationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CertificationData) => void;
  initialData?: CertificationData;
  mode: 'add' | 'edit';
}

export interface CertificationData {
  id?: string;
  name: string;
  organization: string;
  year: string;
}

export function CertificationFormModal({ isOpen, onClose, onSave, initialData, mode }: CertificationFormModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobileView, setIsMobileView] = useState(false);
  const [formData, setFormData] = useState<CertificationData>(
    initialData || {
      name: '',
      organization: '',
      year: '',
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
            {mode === 'add' ? 'Add Certification' : 'Edit Certification'}
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
          {/* Certification Name */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Certification Name *
            </label>
            <div className="relative">
              <Shield className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. SHRM-SCP"
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>

          {/* Organization */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Issuing Organization *
            </label>
            <div className="relative">
              <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Society for Human Resource Management"
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </div>

          {/* Year */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Year Obtained *
            </label>
            <div className="relative">
              <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. 2020"
                min="1950"
                max={new Date().getFullYear()}
                required
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
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
              {mode === 'add' ? 'Add Certification' : 'Save Changes'}
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
