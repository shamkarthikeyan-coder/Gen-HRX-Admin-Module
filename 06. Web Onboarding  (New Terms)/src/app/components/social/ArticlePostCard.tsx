import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThumbsUp, MessageCircle, Share2, Bookmark, Clock, X } from 'lucide-react';
import { FileText, CheckFat, HandsClapping, SketchLogo, TrendUp, Megaphone } from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import { PostOptionsMenu } from './PostOptionsMenu';
import { ProfileBadge, type BadgeType } from './ProfileBadge';

interface Badge {
  type: BadgeType;
  title: string;
  description: string;
}

interface ArticlePostCardProps {
  post: {
    id: string;
    author: string;
    avatar: string;
    role?: string;
    time: string;
    articleTitle: string;
    articleExcerpt: string;
    articleImage?: string;
    readTime?: string;
    likes: number;
    comments: number;
    shares: number;
    verified?: boolean;
    badges?: Badge[];
  };
  onUserClick?: () => void;
  onPostClick?: () => void;
  onSave?: (postId: string) => void;
  onDismiss?: () => void;
}

const reactions = [
  { type: 'check', icon: CheckFat, label: 'noted', color: 'text-purple-600' },
  { type: 'applause', icon: HandsClapping, label: 'acclaim', color: 'text-purple-600' },
  { type: 'gem', icon: SketchLogo, label: 'gem', color: 'text-purple-600' },
  { type: 'trending', icon: TrendUp, label: 'ROI', color: 'text-purple-600' },
  { type: 'announce', icon: Megaphone, label: 'Announce', color: 'text-purple-600' },
];

export function ArticlePostCard({ post, onUserClick, onPostClick, onSave, onDismiss }: ArticlePostCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleReaction = (type: string) => {
    setReaction(reaction === type ? null : type);
    setShowReactions(false);
  };

  const handleSave = () => {
    const newSavedState = !saved;
    setSaved(newSavedState);
    
    setToastMessage(newSavedState ? 'Saved to collection' : 'Removed from collection');
    setShowSaveToast(true);
    
    setTimeout(() => {
      setShowSaveToast(false);
    }, 1500);
    
    if (onSave) {
      onSave(post.id);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#242833]' : 'bg-white'} relative overflow-visible`}>
      {/* Save Toast Notification */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`px-4 py-2 rounded-lg shadow-lg ${
              isDark ? 'bg-slate-700 text-white' : 'bg-slate-900 text-white'
            }`}>
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button onClick={onUserClick} className="shrink-0">
            {typeof post.avatar === 'string' && post.avatar.startsWith('http') ? (
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : typeof post.avatar === 'string' && post.avatar.length <= 2 ? (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                {post.avatar}
              </div>
            ) : (
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={onUserClick}
                className={`font-bold text-base hover:underline truncate ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {post.author}
              </button>
              {post.verified && (
                <svg className="w-4 h-4 text-purple-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
              {/* Other badges after name and verified tick - filter out 'verified' badge */}
              {post.badges && post.badges.filter(badge => badge.type !== 'verified').length > 0 && (
                <div className="flex items-center gap-1.5">
                  {post.badges
                    .filter(badge => badge.type !== 'verified')
                    .map((badge, index) => (
                      <ProfileBadge key={index} type={badge.type} title={badge.title} description={badge.description} />
                    ))}
                </div>
              )}
            </div>
            {post.role && (
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} truncate`}>
                {post.role} · {post.time}
              </p>
            )}
          </div>
        </div>
        
        {/* Article Badge, Close and Three Dots Menu */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {/* Article Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10">
            <FileText className="w-4 h-4 text-orange-500" weight="fill" />
            <span className="text-sm font-semibold text-white">Article</span>
          </div>
          
          {/* Close Button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
              }`}
            >
              <X className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            </button>
          )}
          
          {/* Three Dots Menu */}
          <PostOptionsMenu
            onReport={() => console.log('Report article')}
            onHide={() => console.log('Hide article')}
            onDismiss={onDismiss}
          />
        </div>
      </div>

      {/* Article Image */}
      {post.articleImage && (
        <div className="w-full aspect-[16/9] overflow-hidden">
          <img
            src={post.articleImage}
            alt={post.articleTitle}
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
            onClick={onPostClick}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="px-4 pt-4 pb-3">
        <h2 
          className={`text-2xl font-bold mb-3 leading-tight cursor-pointer hover:underline ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          onClick={onPostClick}
        >
          {post.articleTitle}
        </h2>
        
        <p className={`text-base mb-3 line-clamp-2 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {post.articleExcerpt}
        </p>

        {/* Read Time */}
        {post.readTime && (
          <div className={`flex items-center gap-2 text-sm ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={`px-4 pb-4 flex items-center justify-between border-t ${
        isDark ? 'border-slate-700' : 'border-slate-200'
      } pt-3 mt-1`}>
        <div className="flex items-center gap-6 relative">
          {/* Like with Reaction Picker */}
          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              onMouseEnter={() => setShowReactions(true)}
              className={`flex items-center gap-2 transition-colors ${
                reaction 
                  ? reactions.find(r => r.type === reaction)?.color
                  : isDark ? 'text-slate-400 hover:text-purple-600' : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              {reaction ? (
                (() => {
                  const ReactionIcon = reactions.find(r => r.type === reaction)?.icon;
                  return ReactionIcon ? (
                    <motion.div
                      key={reaction}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <ReactionIcon className="w-5 h-5" weight="fill" />
                    </motion.div>
                  ) : <ThumbsUp className="w-5 h-5" />;
                })()
              ) : (
                <ThumbsUp className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{post.likes + (reaction ? 1 : 0)}</span>
            </button>

            {/* Reaction Picker */}
            <AnimatePresence>
              {showReactions && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseLeave={() => setShowReactions(false)}
                  className={`absolute bottom-full left-0 mb-2 flex gap-1 p-2 rounded-full shadow-xl z-50 ${
                    isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'
                  }`}
                >
                  {reactions.map((r, index) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.type} className="relative">
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleReaction(r.type)}
                          onMouseEnter={() => setHoveredReaction(r.type)}
                          onMouseLeave={() => setHoveredReaction(null)}
                          whileHover={{ scale: 1.3, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-2.5 rounded-full transition-all ${ 
                            reaction === r.type 
                              ? isDark ? 'bg-slate-700' : 'bg-slate-100' 
                              : ''
                          }`}
                        >
                          <Icon className="w-7 h-7 text-purple-600" weight="duotone" />
                        </motion.button>
                        
                        {/* LinkedIn-style Tooltip */}
                        <AnimatePresence>
                          {hoveredReaction === r.type && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap z-[60]"
                            >
                              <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg">
                                {r.label}
                              </div>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900"></div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Comment */}
          <button
            onClick={onPostClick}
            className="flex items-center gap-2 group"
          >
            <MessageCircle
              className={`w-5 h-5 ${
                isDark
                  ? 'text-slate-400 group-hover:text-purple-600'
                  : 'text-slate-600 group-hover:text-purple-600'
              }`}
            />
            <span className={`text-sm font-medium ${
              isDark
                ? 'text-slate-400 group-hover:text-purple-600'
                : 'text-slate-600 group-hover:text-purple-600'
            }`}>
              {post.comments}
            </span>
          </button>

          {/* Share */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 group"
              onMouseEnter={() => setShowShareTooltip(true)}
              onMouseLeave={() => setShowShareTooltip(false)}
            >
              <Share2
                className={`w-5 h-5 ${
                  isDark
                    ? 'text-slate-400 group-hover:text-purple-600'
                    : 'text-slate-600 group-hover:text-purple-600'
                }`}
              />
              <span className={`text-sm font-medium ${
                isDark
                  ? 'text-slate-400 group-hover:text-purple-600'
                  : 'text-slate-600 group-hover:text-purple-600'
              }`}>
                {post.shares}
              </span>
            </button>
            
            {/* Ripple Tooltip */}
            <AnimatePresence>
              {showShareTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none whitespace-nowrap z-[60]"
                >
                  <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg">
                    Ripple
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bookmark */}
        <button
          onClick={handleSave}
          className="p-2 -mr-2"
        >
          <Bookmark
            className={`w-5 h-5 transition-colors ${
              saved
                ? 'text-purple-600 fill-purple-600'
                : isDark
                ? 'text-slate-400 hover:text-purple-600'
                : 'text-slate-600 hover:text-purple-600'
            }`}
          />
        </button>
      </div>
    </div>
  );
}