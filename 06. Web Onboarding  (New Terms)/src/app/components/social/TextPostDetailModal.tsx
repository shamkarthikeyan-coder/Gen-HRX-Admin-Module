import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ThumbsUp, MessageCircle, Share2, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Centered modal for text-only posts (LinkedIn style)
interface TextPostDetailModalProps {
  post: any;
  isOpen: boolean;
  onClose: () => void;
}

export function TextPostDetailModal({ post, isOpen, onClose }: TextPostDetailModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  // Mock comments for demo
  useEffect(() => {
    if (isOpen) {
      setComments([
        {
          id: '1',
          author: 'Jennifer Martinez',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
          role: 'Talent Acquisition Director',
          content: 'Great insights! This really resonates with our current approach.',
          time: '2h ago',
          likes: 12,
        },
        {
          id: '2',
          author: 'Michael Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          role: 'HR Business Partner',
          content: 'Thanks for sharing this. Would love to hear more about your experience.',
          time: '4h ago',
          likes: 8,
        },
        {
          id: '3',
          author: 'Sarah Wilson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          role: 'Chief People Officer',
          content: 'This is exactly what we need to implement in our organization!',
          time: '5h ago',
          likes: 15,
        },
      ]);
    }
  }, [isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmitComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'Y',
      role: 'HR Professional',
      content: comment,
      time: 'Just now',
      likes: 0,
    };

    setComments([...comments, newComment]);
    setComment('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80"
          onClick={onClose}
        />

        {/* Centered Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-2xl max-h-[90vh] mx-4 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col ${
            isDark ? 'bg-[#1a1d29]' : 'bg-white'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg ${
              isDark ? 'bg-[#242833] hover:bg-[#2d3142] text-white' : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Post Header */}
          <div className={`p-6 border-b ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-xl shrink-0 overflow-hidden">
                {typeof post.avatar === 'string' && (post.avatar.startsWith('http') || post.avatar.startsWith('data:') || post.avatar.startsWith('figma:')) ? (
                  <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white">{post.avatar}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {post.author}
                  </h3>
                  {post.verified && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {post.role}
                </p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {post.time}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Post Text */}
            <div className="p-6">
              <p className={`text-lg leading-relaxed whitespace-pre-wrap ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {post.content}
              </p>
            </div>

            {/* Stats */}
            <div className={`px-6 py-3 border-y ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
              <div className={`flex items-center justify-between text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>{(post.likes || 0).toLocaleString()} likes</span>
                <span>{comments.length} comments</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`px-6 py-3 border-b ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
              <div className="flex items-center justify-around">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    liked
                      ? 'text-purple-500'
                      : isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">Like</span>
                </button>

                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                }`}>
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>

                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                }`}>
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="p-6 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-sm shrink-0 overflow-hidden">
                    {typeof c.avatar === 'string' && c.avatar.startsWith('http') ? (
                      <img src={c.avatar} alt={c.author} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white">{c.avatar}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-[#242833]' : 'bg-slate-100'}`}>
                      <div className="flex items-center gap-2">
                        <h5 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {c.author}
                        </h5>
                      </div>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {c.role}
                      </p>
                      <p className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                        {c.content}
                      </p>
                    </div>
                    <div className={`flex items-center gap-4 mt-2 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      <span>{c.time}</span>
                      <button className={`font-semibold ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-700'}`}>
                        Like
                      </button>
                      <button className={`font-semibold ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-700'}`}>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Input - Fixed at Bottom */}
          <div className={`p-4 border-t ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-sm shrink-0">
                <span className="text-white">Y</span>
              </div>
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
                className={`flex-1 px-4 py-2 rounded-full border text-sm transition-colors ${
                  isDark
                    ? 'bg-[#242833] border-[#363b4e] text-white placeholder-slate-500 focus:border-purple-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                } outline-none`}
              />
              {comment.trim() && (
                <button
                  onClick={handleSubmitComment}
                  className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
