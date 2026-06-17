import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ThumbsUp, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronLeft, EyeOff, Flag, UserMinus, Send, Link as LinkIcon, ShieldCheck, Star, Target, Flame } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../Logo';
import { SaveToCollectionModal } from './SaveToCollectionModal';
import { toast } from 'sonner';

// Import avatars
import avatar1 from 'figma:asset/64a2721f5e2f4413f02de48fac47b6bc5b106008.png';
import avatar2 from 'figma:asset/8b30d7bf487869ad5becc9eb29ba0fa7831e5232.png';
import avatar3 from 'figma:asset/92a98459b2a10c6942e7b03217548da1522cef29.png';

const postImage2 = 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhdGElMjBhbmFseXRpY3N8ZW58MXx8fHwxNzY2MzI4NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080';

interface PostDetailViewProps {
  postId: number;
  onClose: () => void;
  onOpenProfile: (userId: number) => void;
}

type ReactionType = 'upvote' | 'credible' | 'valuable' | 'insightful' | 'trending';

const reactions = [
  { type: 'upvote' as ReactionType, icon: ThumbsUp, label: 'Upvote', color: 'text-purple-500' },
  { type: 'credible' as ReactionType, icon: ShieldCheck, label: 'Credible', color: 'text-green-500' },
  { type: 'valuable' as ReactionType, icon: Star, label: 'Valuable', color: 'text-blue-500' },
  { type: 'insightful' as ReactionType, icon: Target, label: 'Insightful', color: 'text-orange-500' },
  { type: 'trending' as ReactionType, icon: Flame, label: 'Trending', color: 'text-red-500' },
];

// Mock post data
const mockPost = {
  id: 1,
  author: 'Sarah Chen',
  role: 'VP of People @ SaaS',
  avatar: avatar1,
  time: '2h ago',
  content: 'Just wrapped our Q1 compensation review. Here\'s what we learned about the market right now 📊\n\n💰 Base salaries: +8% YoY\n🎯 Performance bonuses: Restructured for clarity\n📈 Equity: More transparent communication\n\nThe biggest surprise? Transparency beats percentiles every time. Context is everything in comp discussions.',
  image: postImage2,
  likes: 234,
  comments: 56,
  shares: 42,
  verified: true,
  userId: 1,
};

// Mock comments
const mockComments = [
  { id: 1, author: 'Jennifer Martinez', avatar: avatar3, role: 'Senior HR Manager', time: '1h ago', content: 'This is exactly what we needed to hear! Transparency has been a game changer for us too.', likes: 12 },
  { id: 2, author: 'Michael Chen', avatar: avatar2, role: 'Director of People Ops', time: '45m ago', content: 'How did you handle pushback from leadership on the transparency piece?', likes: 8 },
  { id: 3, author: 'HR Professional', avatar: '👤', role: 'Compensation Analyst', time: '30m ago', content: 'The 8% YoY is interesting. What industries are you benchmarking against?', likes: 5 },
];

export function PostDetailView({ postId, onClose, onOpenProfile }: PostDetailViewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<ReactionType | null>(null);
  const [saved, setSaved] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState('');
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [savedCollections, setSavedCollections] = useState<string[]>([]);

  const post = mockPost;

  const handleReaction = (type: ReactionType) => {
    const wasRemoved = reaction === type;
    setReaction(wasRemoved ? null : type);
    setShowReactions(false);
    
    if (!wasRemoved) {
      const reactionLabel = reactions.find(r => r.type === type)?.label;
      toast.success(`Marked as ${reactionLabel}!`);
    }
  };

  const toggleCommentLike = (commentId: number) => {
    setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const handleToggleCollection = (collectionId: string) => {
    setSavedCollections(prev => 
      prev.includes(collectionId) ? prev.filter(id => id !== collectionId) : [...prev, collectionId]
    );
  };

  const handleCloseSaveModal = () => {
    setShowSaveModal(false);
    if (savedCollections.length > 0) {
      setSaved(true);
      toast.success('Post saved!');
    } else {
      setSaved(false);
    }
  };

  return (
    <div className={`absolute inset-0 z-[70] ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'} flex flex-col w-full`}>
      {/* Status bar safe area */}
      <div className={`h-12 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} shrink-0`}></div>

      {/* Header */}
      <div className={`${isDark ? 'bg-[#1a1d29] border-[#363b4e]' : 'bg-white border-slate-200'} border-b shrink-0`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className={`p-2 -ml-2 rounded-lg ${isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'} transition-colors`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <Logo variant="horizontal" size="sm" />
          
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'} transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'} transition-colors`}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
          {/* Post Content */}
          <div className={`${isDark ? 'bg-[#242833]' : 'bg-white'} border-b ${isDark ? 'border-[#363b4e]' : 'border-slate-200'} px-4 py-4`}>
            {/* Author Info */}
            <div className="flex items-start gap-3 mb-3">
              <button 
                onClick={() => onOpenProfile(post.userId)}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shrink-0 overflow-hidden"
              >
                <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenProfile(post.userId)}
                    className={`font-bold text-sm hover:underline ${isDark ? 'text-white' : 'text-slate-900'}`}
                  >
                    {post.author}
                  </button>
                  {post.verified && (
                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{post.role}</p>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{post.time}</p>
              </div>
            </div>

            {/* Content */}
            <p className={`text-sm leading-relaxed mb-3 whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              {post.content}
            </p>

            {/* Image */}
            {post.image && (
              <div className="mb-3 rounded-xl overflow-hidden -mx-4">
                <img src={post.image} alt="Post content" className="w-full object-cover max-h-96" />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-2">
              <div className="relative">
                <button
                  onClick={() => setShowReactions(!showReactions)}
                  onMouseEnter={() => setShowReactions(true)}
                  className={`flex items-center gap-2 transition-colors ${
                    reaction ? reactions.find(r => r.type === reaction)?.color : isDark ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'
                  }`}
                >
                  {reaction ? (
                    (() => {
                      const ReactionIcon = reactions.find(r => r.type === reaction)?.icon;
                      return ReactionIcon ? (
                        <motion.div key={reaction} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                          <ReactionIcon className="w-5 h-5 fill-current" />
                        </motion.div>
                      ) : <ThumbsUp className="w-5 h-5" />;
                    })()
                  ) : <ThumbsUp className="w-5 h-5" />}
                  <span className="text-sm font-medium">{post.likes + (reaction ? 1 : 0)}</span>
                </button>

                <AnimatePresence>
                  {showReactions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      onMouseLeave={() => setShowReactions(false)}
                      className={`absolute bottom-full left-0 mb-2 flex gap-1 p-2 rounded-xl shadow-xl ${isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'}`}
                    >
                      {reactions.map((r, index) => {
                        const Icon = r.icon;
                        return (
                          <motion.button
                            key={r.type}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleReaction(r.type)}
                            whileHover={{ scale: 1.3, y: -4 }}
                            className={`p-2 rounded-lg ${reaction === r.type ? 'bg-slate-100 dark:bg-slate-700' : ''}`}
                          >
                            <Icon className={`w-6 h-6 ${r.color}`} />
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className={`flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'}`}>
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{mockComments.length}</span>
              </button>
              <button className={`flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'}`}>
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
              <button onClick={handleSave} className={`flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'} ml-auto`}>
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-purple-600 text-purple-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'} px-4 py-4`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Comments ({mockComments.length})
            </h3>

            <div className="space-y-4 mb-20">
              {mockComments.map((commentItem) => (
                <div key={commentItem.id}>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shrink-0 overflow-hidden">
                      {typeof commentItem.avatar === 'string' && commentItem.avatar.startsWith('figma:') ? (
                        <img src={commentItem.avatar} alt={commentItem.author} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm">{commentItem.avatar}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`${isDark ? 'bg-[#2d3142]' : 'bg-white'} rounded-2xl px-4 py-3`}>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {commentItem.author}
                            </h4>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{commentItem.role}</p>
                          </div>
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{commentItem.time}</span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{commentItem.content}</p>
                      </div>

                      <div className="flex items-center gap-4 px-4 mt-2">
                        <button 
                          onClick={() => toggleCommentLike(commentItem.id)}
                          className={`text-xs font-medium ${commentLikes[commentItem.id] ? isDark ? 'text-purple-400' : 'text-purple-600' : isDark ? 'text-slate-400' : 'text-slate-600'}`}
                        >
                          {commentLikes[commentItem.id] ? '❤️' : 'Like'} · {commentItem.likes + (commentLikes[commentItem.id] ? 1 : 0)}
                        </button>
                        <button className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className={`${isDark ? 'bg-[#242833]/95 border-[#363b4e]' : 'bg-white/95 border-slate-200'} border-t backdrop-blur-xl shrink-0`}>
        <div className="px-4 py-3">
          <div className={`flex gap-3 p-3 rounded-xl ${isDark ? 'bg-[#2d3142]' : 'bg-slate-50'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 shrink-0 overflow-hidden">
              <img src={avatar1} alt="You" className="w-full h-full object-cover" />
            </div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
            />
            <button disabled={!comment} className={`p-2 rounded-lg ${comment ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white' : isDark ? 'bg-slate-700 text-slate-500' : 'bg-slate-200 text-slate-400'}`}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <SaveToCollectionModal
        isOpen={showSaveModal}
        onClose={handleCloseSaveModal}
        postId={post.id}
        savedCollections={savedCollections}
        onToggleCollection={handleToggleCollection}
        onCreateCollection={() => {}}
      />
    </div>
  );
}
