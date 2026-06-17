import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, Target, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { Logo } from '../Logo';

interface InterestTagsScreenProps {
  onContinue: (tags: string[]) => void;
  onBack: () => void;
}

const expertiseTags = [
  { id: 'er', label: 'Employee Relations (ER)', emoji: '🤝', color: 'purple' },
  { id: 'comp-benefits', label: 'Compensation & Benefits', emoji: '💰', color: 'green' },
  { id: 'talent', label: 'Talent Acquisition', emoji: '🎯', color: 'blue' },
  { id: 'hr-tech', label: 'HR Tech & Systems', emoji: '⚡', color: 'orange' },
  { id: 'compliance', label: 'Compliance & Legal', emoji: '⚖️', color: 'red' },
  { id: 'learning', label: 'Learning & Development', emoji: '📚', color: 'indigo' },
  { id: 'culture-dei', label: 'Culture & DEI', emoji: '🌈', color: 'pink' },
  { id: 'performance', label: 'Performance Management', emoji: '📊', color: 'teal' },
  { id: 'workforce-planning', label: 'Workforce Planning', emoji: '📈', color: 'cyan' },
  { id: 'employee-experience', label: 'Employee Experience', emoji: '✨', color: 'violet' },
];

const colorMap: Record<string, string> = {
  purple: 'border-purple-500 bg-purple-500/10 text-purple-300',
  green: 'border-green-500 bg-green-500/10 text-green-300',
  blue: 'border-blue-500 bg-blue-500/10 text-blue-300',
  orange: 'border-orange-500 bg-orange-500/10 text-orange-300',
  red: 'border-red-500 bg-red-500/10 text-red-300',
  indigo: 'border-indigo-500 bg-indigo-500/10 text-indigo-300',
  pink: 'border-pink-500 bg-pink-500/10 text-pink-300',
  teal: 'border-teal-500 bg-teal-500/10 text-teal-300',
  cyan: 'border-cyan-500 bg-cyan-500/10 text-cyan-300',
  violet: 'border-violet-500 bg-violet-500/10 text-violet-300',
};

const colorMapLight: Record<string, string> = {
  purple: 'border-purple-500 bg-purple-50 text-purple-700',
  green: 'border-green-500 bg-green-50 text-green-700',
  blue: 'border-blue-500 bg-blue-50 text-blue-700',
  orange: 'border-orange-500 bg-orange-50 text-orange-700',
  red: 'border-red-500 bg-red-50 text-red-700',
  indigo: 'border-indigo-500 bg-indigo-50 text-indigo-700',
  pink: 'border-pink-500 bg-pink-50 text-pink-700',
  teal: 'border-teal-500 bg-teal-50 text-teal-700',
  cyan: 'border-cyan-500 bg-cyan-50 text-cyan-700',
  violet: 'border-violet-500 bg-violet-50 text-violet-700',
};

export function InterestTagsScreen({ onContinue, onBack }: InterestTagsScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleContinue = () => {
    if (selectedTags.length < 3) {
      toast.error('Please select at least 3 focus areas');
      return;
    }
    toast.success('Great! Your feed will be personalized');
    onContinue(selectedTags);
  };

  const handleSkip = () => {
    toast.info('You can add focus areas later from your profile settings');
    onContinue(selectedTags); // Continue with whatever tags are selected (even if less than 3)
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-purple-900/20 to-orange-900/20' : 'from-purple-100/30 to-orange-100/30'}`} />
      </div>

      {/* Main Container - Centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          
          {/* Header with Logo */}
          <div className="mb-8">
            {/* Logo - Centered */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center"
            >
              <Logo variant="horizontal" className="h-10" />
            </motion.div>

            {/* Title with Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={onBack}
                  className={`inline-flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Back</span>
                </button>
                
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex-1 text-center`}>
                  What are your focus areas?
                </h1>
                
                {/* Spacer to balance layout */}
                <div className="w-[88px]"></div>
              </div>
              <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'} text-center`}>
                Select at least 3 to personalize your feed and match with mentors
              </p>
            </motion.div>
          </div>

          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-8 rounded-3xl border-2 ${
              isDark 
                ? 'bg-slate-900/50 border-slate-800 backdrop-blur-xl' 
                : 'bg-white border-slate-200 shadow-xl'
            }`}
          >
            {/* Tags Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {expertiseTags.map((tag, index) => {
                const isSelected = selectedTags.includes(tag.id);
                const colors = isDark ? colorMap[tag.color] : colorMapLight[tag.color];

                return (
                  <motion.button
                    key={tag.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleTag(tag.id)}
                    className={`p-4 rounded-2xl text-left transition-all border-2 ${
                      isSelected
                        ? colors
                        : isDark
                        ? 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tag.emoji}</span>
                        <span className={`font-semibold text-sm ${isSelected ? '' : isDark ? 'text-white' : 'text-slate-900'}`}>
                          {tag.label}
                        </span>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Assurance Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-xl mb-6 ${
                isDark 
                  ? 'bg-purple-500/10 border border-purple-500/30' 
                  : 'bg-purple-50 border border-purple-200'
              }`}
            >
              <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'} text-center`}>
                💡 Don't worry! You can add more focus areas later from your profile settings.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleSkip}
                className={`flex-1 h-14 rounded-2xl font-bold text-base transition-all ${
                  isDark 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-2 border-slate-700' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-300'
                }`}
              >
                Skip for now
              </Button>
              <Button
                type="button"
                onClick={handleContinue}
                disabled={selectedTags.length < 3}
                className={`flex-1 h-14 rounded-2xl font-bold text-base transition-all ${
                  selectedTags.length >= 3
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-xl'
                    : isDark
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}