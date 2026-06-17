import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Upload, X } from 'lucide-react';
import { motion } from 'motion/react';

interface AddInputModalProps {
  onClose: () => void;
  onSubmit: (input: {
    content: string;
    tags: string[];
    postAs: 'yourself' | 'anonymous';
  }) => void;
}

export function AddInputModal({ onClose, onSubmit }: AddInputModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [inputText, setInputText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [postAs, setPostAs] = useState<'yourself' | 'anonymous'>('yourself');

  const maxChars = 700;

  const availableTags = [
    'Handled this before',
    'Need expert input',
    'Risk alert',
    'People-first lens',
    'Legal compliance'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      onSubmit({
        content: inputText,
        tags: selectedTags,
        postAs: postAs
      });
      onClose();
    }
  };

  const isSubmitDisabled = !inputText.trim();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto"
      >
        <div className={`mx-auto max-w-2xl rounded-t-3xl ${
          isDark ? 'bg-[#242833]' : 'bg-white'
        } shadow-2xl`}>
          {/* Header */}
          <div className={`sticky top-0 z-10 px-6 py-4 border-b ${ isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200' } rounded-t-[12px] rounded-b-[0px]`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Add Input
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
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Input Field */}
            <div>
              <label className={`block text-base font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Your Input <span className="text-red-500">*</span>
              </label>
              <textarea
                value={inputText}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setInputText(e.target.value);
                  }
                }}
                placeholder="Share your experience, advice, or perspective..."
                className={`w-full px-4 py-3 rounded-2xl border-2 resize-none outline-none transition-colors ${
                  isDark
                    ? 'bg-[#1a1d29] border-[#363b4e] text-white placeholder:text-slate-500 focus:border-purple-500'
                    : 'bg-white border-purple-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400'
                }`}
                rows={8}
              />
              <div className={`flex items-center justify-between mt-2 text-sm ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                <span>Max {maxChars} characters</span>
                <span>{inputText.length}/{maxChars}</span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className={`block text-base font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? isDark
                          ? 'bg-purple-900/30 text-purple-400 border-2 border-purple-500'
                          : 'bg-purple-100 text-purple-700 border-2 border-purple-400'
                        : isDark
                        ? 'bg-slate-800 text-slate-400 border-2 border-slate-700 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 border-2 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Post as */}
            <div>
              <label className={`block text-base font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Post as
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Yourself */}
                <button
                  onClick={() => setPostAs('yourself')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    postAs === 'yourself'
                      ? isDark
                        ? 'bg-purple-900/20 border-purple-500 text-white'
                        : 'bg-purple-50 border-purple-400 text-slate-900'
                      : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className={`font-bold text-base mb-1 ${
                    postAs === 'yourself'
                      ? isDark ? 'text-white' : 'text-slate-900'
                      : isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Yourself
                  </div>
                  <div className={`text-sm ${
                    postAs === 'yourself'
                      ? isDark ? 'text-purple-400' : 'text-purple-700'
                      : isDark ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    Your name will be visible
                  </div>
                </button>

                {/* Anonymous */}
                <button
                  onClick={() => setPostAs('anonymous')}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    postAs === 'anonymous'
                      ? isDark
                        ? 'bg-purple-900/20 border-purple-500 text-white'
                        : 'bg-purple-50 border-purple-400 text-slate-900'
                      : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className={`font-bold text-base mb-1 ${
                    postAs === 'anonymous'
                      ? isDark ? 'text-white' : 'text-slate-900'
                      : isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Anonymous
                  </div>
                  <div className={`text-sm ${
                    postAs === 'anonymous'
                      ? isDark ? 'text-purple-400' : 'text-purple-700'
                      : isDark ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    Your identity will be hidden
                  </div>
                </button>
              </div>
            </div>

            {/* Attachments */}
            <div className="pb-6">
              <label className={`block text-base font-semibold mb-3 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Attachments <span className={`font-normal ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>(Optional)</span>
              </label>
              <button className={`w-full py-4 rounded-2xl border-2 border-dashed transition-all ${
                isDark
                  ? 'border-slate-700 hover:border-purple-500 hover:bg-purple-900/10'
                  : 'border-slate-300 hover:border-purple-400 hover:bg-purple-50'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <Upload className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                  <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Upload files
                  </span>
                </div>
              </button>
            </div>

            {/* Extra padding for fixed button */}
            <div className="h-20"></div>
          </div>

          {/* Fixed Submit Button */}
          <div className={`sticky bottom-0 border-t ${
            isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
          }`}>
            <div className="px-6 py-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
                  isSubmitDisabled
                    ? isDark
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                }`}
              >
                Submit Input
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}