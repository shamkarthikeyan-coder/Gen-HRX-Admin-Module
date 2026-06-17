import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Image as ImageIcon, BarChart3, Tag, Globe, Lock, Users, Send
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
  userAvatar?: string;
  userName?: string;
}

export function CreatePostModal({ isOpen, onClose, onSubmit, userAvatar, userName }: CreatePostModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'connections' | 'private'>('public');
  const [postAs, setPostAs] = useState<'individual' | 'company'>('individual');
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const [showPostAsMenu, setShowPostAsMenu] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    onSubmit({
      content,
      image: imagePreview,
      poll: showPoll ? pollOptions.filter(opt => opt.trim()) : null,
      tags,
      privacy,
      postAs,
    });
    
    // Reset form
    setContent('');
    setImagePreview(null);
    setShowPoll(false);
    setPollOptions(['', '']);
    setTags([]);
    setPrivacy('public');
    setPostAs('individual');
    onClose();
  };

  const privacyOptions = [
    { value: 'public', icon: Globe, label: 'Public', desc: 'Anyone can see this post' },
    { value: 'connections', icon: Users, label: 'Connections', desc: 'Only your connections' },
    { value: 'private', icon: Lock, label: 'Private', desc: 'Only you can see this' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl ${
            isDark ? 'bg-[#242833]' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className={`border-b px-6 py-4 flex items-center justify-between ${
            isDark ? 'border-[#363b4e]' : 'border-slate-200'
          }`}>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Create Parley
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-4">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                {userAvatar || 'U'}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {userName || 'User'}
                </p>
                
                {/* Post As Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowPostAsMenu(!showPostAsMenu)}
                    className={`text-sm px-3 py-1 rounded-full border ${
                      isDark ? 'border-slate-600 text-slate-400' : 'border-slate-300 text-slate-600'
                    } hover:border-purple-500 transition-colors`}
                  >
                    {postAs === 'individual' ? 'Posting as Individual' : 'Posting as Company'}
                  </button>
                  
                  {showPostAsMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowPostAsMenu(false)}></div>
                      <div className={`absolute top-full left-0 mt-1 w-64 rounded-xl shadow-xl z-20 overflow-hidden ${
                        isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'
                      }`}>
                        <button
                          onClick={() => { setPostAs('individual'); setShowPostAsMenu(false); }}
                          className={`w-full px-4 py-3 text-left ${
                            isDark ? 'hover:bg-[#363b4e] text-slate-300' : 'hover:bg-slate-50 text-slate-700'
                          } ${postAs === 'individual' ? 'bg-purple-500/10 text-purple-500' : ''}`}
                        >
                          <div className="font-medium">Individual</div>
                          <div className="text-xs opacity-70">Post as yourself</div>
                        </button>
                        <button
                          onClick={() => { setPostAs('company'); setShowPostAsMenu(false); }}
                          className={`w-full px-4 py-3 text-left ${
                            isDark ? 'hover:bg-[#363b4e] text-slate-300' : 'hover:bg-slate-50 text-slate-700'
                          } ${postAs === 'company' ? 'bg-purple-500/10 text-purple-500' : ''}`}
                        >
                          <div className="font-medium">Company</div>
                          <div className="text-xs opacity-70">Post on behalf of your organization</div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Text Content */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className={`w-full min-h-[150px] p-4 rounded-xl resize-none focus:outline-none ${
                isDark
                  ? 'bg-[#1a1d29] text-white placeholder-slate-500'
                  : 'bg-slate-50 text-slate-900 placeholder-slate-400'
              }`}
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mt-4 rounded-xl overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-cover" />
                <button
                  onClick={() => setImagePreview(null)}
                  className="absolute top-2 right-2 p-2 bg-slate-900/80 rounded-full text-white hover:bg-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Poll Options */}
            {showPoll && (
              <div className="mt-4 space-y-2">
                <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Poll Options
                </p>
                {pollOptions.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...pollOptions];
                      newOptions[index] = e.target.value;
                      setPollOptions(newOptions);
                    }}
                    placeholder={`Option ${index + 1}`}
                    className={`w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark
                        ? 'bg-[#1a1d29] text-white placeholder-slate-500'
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                ))}
                {pollOptions.length < 4 && (
                  <button
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-sm text-purple-500 hover:text-purple-600"
                  >
                    + Add option
                  </button>
                )}
              </div>
            )}

            {/* Tags */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                      isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add tags..."
                  className={`flex-1 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark
                      ? 'bg-[#1a1d29] text-white placeholder-slate-500'
                      : 'bg-slate-50 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  <Tag className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-4 border-t ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                  title="Add image"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowPoll(!showPoll)}
                  className={`p-2 rounded-full transition-colors ${
                    showPoll ? 'bg-purple-500/20 text-purple-500' : ''
                  } ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
                  title="Add poll"
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>

              {/* Privacy Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                    isDark ? 'border-slate-600 text-slate-400' : 'border-slate-300 text-slate-600'
                  } hover:border-purple-500 transition-colors`}
                >
                  {privacyOptions.find(opt => opt.value === privacy)?.icon && (
                    (() => {
                      const Icon = privacyOptions.find(opt => opt.value === privacy)!.icon;
                      return <Icon className="w-4 h-4" />;
                    })()
                  )}
                  <span className="text-sm">{privacyOptions.find(opt => opt.value === privacy)?.label}</span>
                </button>

                {showPrivacyMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowPrivacyMenu(false)}></div>
                    <div className={`absolute bottom-full right-0 mb-2 w-72 rounded-xl shadow-xl z-20 overflow-hidden ${
                      isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'
                    }`}>
                      {privacyOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => { setPrivacy(option.value as any); setShowPrivacyMenu(false); }}
                            className={`w-full px-4 py-3 text-left flex items-start gap-3 ${
                              isDark ? 'hover:bg-[#363b4e] text-slate-300' : 'hover:bg-slate-50 text-slate-700'
                            } ${privacy === option.value ? 'bg-purple-500/10 text-purple-500' : ''}`}
                          >
                            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs opacity-70">{option.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                content.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-lg'
                  : isDark
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              Post
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}