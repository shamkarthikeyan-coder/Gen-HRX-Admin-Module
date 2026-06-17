import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ThumbsUp, MessageCircle, Share2, Bookmark, X,
  Heart, Lightbulb, TrendingUp, Link as LinkIcon, Send, Scale, Brain
} from 'lucide-react';
import { ChatCircle, VideoCamera, CheckFat, HandsClapping, SketchLogo, TrendUp, Megaphone } from '@phosphor-icons/react';
import { useTheme } from '../../context/ThemeContext';
import { PostOptionsMenu } from './PostOptionsMenu';
import { ProfileBadge, type BadgeType } from './ProfileBadge';

interface Badge {
  type: BadgeType;
  title: string;
  description: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  role?: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  verified?: boolean;
  confessional?: boolean;
  trending?: boolean;
  anonymous?: boolean;
  badges?: Badge[];
  link?: {
    title: string;
    description: string;
    url: string;
    thumbnail?: string;
  };
  type?: 'text' | 'image' | 'video' | 'poll' | 'carousel' | 'benchmark';
}

interface PostCardProps {
  post: Post;
  onUserClick?: () => void;
  onPostClick?: () => void;
  onComment?: () => void;
  onDismiss?: () => void;
  onSave?: (postId: string) => void;
}

const reactions = [
  { type: 'check', icon: CheckFat, label: 'noted', color: 'text-purple-600' },
  { type: 'applause', icon: HandsClapping, label: 'acclaim', color: 'text-purple-600' },
  { type: 'gem', icon: SketchLogo, label: 'gem', color: 'text-purple-600' },
  { type: 'trending', icon: TrendUp, label: 'ROI', color: 'text-purple-600' },
  { type: 'announce', icon: Megaphone, label: 'Announce', color: 'text-purple-600' },
];

export function PostCard({ post, onUserClick, onPostClick, onComment, onDismiss, onSave }: PostCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showMoreBadges, setShowMoreBadges] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleReaction = (type: string) => {
    setReaction(reaction === type ? null : type);
    setShowReactions(false);
  };

  const handleShare = (method: string) => {
    console.log('Sharing via:', method);
    setShowShareMenu(false);
  };

  const handleSave = () => {
    const newSavedState = !saved;
    setSaved(newSavedState);
    
    // Show toast
    setToastMessage(newSavedState ? 'Saved to collection' : 'Removed from collection');
    setShowSaveToast(true);
    
    // Auto-hide toast after 1.5 seconds
    setTimeout(() => {
      setShowSaveToast(false);
    }, 1500);
    
    if (onSave) {
      onSave(post.id);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#242833]' : 'bg-white'} px-6 py-6 relative`}>
      {/* Save Toast Notification */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`px-4 py-2 rounded-full shadow-lg ${isDark ? 'bg-slate-800' : 'bg-slate-900'}`}>
              <span className="text-white text-sm font-medium">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <button 
          onClick={onUserClick}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-lg shrink-0 overflow-hidden"
          disabled={post.anonymous}
        >
          {typeof post.avatar === 'string' && post.avatar.length > 3 ? (
            <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-semibold">{post.avatar}</span>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={onUserClick}
              disabled={post.anonymous}
              className={`font-bold text-lg ${!post.anonymous ? 'hover:underline cursor-pointer' : 'cursor-default'} ${isDark ? 'text-white' : 'text-slate-900'}`}
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
            {/* Other badges after name and verified tick - filter out 'verified' badge */}
            {post.badges && post.badges.filter(badge => badge.type !== 'verified').length > 0 && (() => {
              const visibleBadges = post.badges.filter(badge => badge.type !== 'verified').slice(0, 5);
              const remainingBadges = post.badges.filter(badge => badge.type !== 'verified').slice(5);
              
              return (
                <div className="flex items-center gap-1.5">
                  {visibleBadges.map((badge, index) => (
                    <ProfileBadge key={index} type={badge.type} title={badge.title} description={badge.description} />
                  ))}
                  {remainingBadges.length > 0 && (
                    <div 
                      className="relative"
                      onMouseEnter={() => setShowMoreBadges(true)}
                      onMouseLeave={() => setShowMoreBadges(false)}
                    >
                      <div className={`px-2 py-0.5 rounded-full text-xs font-semibold cursor-pointer ${
                        isDark ? 'bg-[#363b4e] text-slate-300' : 'bg-slate-200 text-slate-700'
                      }`}>
                        +{remainingBadges.length} more
                      </div>
                      
                      {/* Hover tooltip with remaining badges */}
                      <AnimatePresence>
                        {showMoreBadges && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute top-full left-0 mt-2 p-3 rounded-lg shadow-xl z-50 min-w-[280px] ${
                              isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'
                            }`}
                          >
                            <div className="space-y-2">
                              {remainingBadges.map((badge, index) => (
                                <div key={index} className="flex items-start gap-3">
                                  <ProfileBadge 
                                    type={badge.type} 
                                    title={badge.title} 
                                    description={badge.description}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-semibold text-sm mb-0.5 ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                      {badge.title}
                                    </div>
                                    <div className={`text-xs ${
                                      isDark ? 'text-slate-400' : 'text-slate-600'
                                    }`}>
                                      {badge.description}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {post.role && (
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{post.role}</span>
            )}
            {post.role && <span className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>·</span>}
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{post.time}</span>
            {post.confessional && (
              <>
                <span className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>·</span>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-600 text-xs font-semibold rounded">
                  Confessional
                </span>
              </>
            )}
            {post.trending && (
              <>
                <span className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>·</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-600 text-xs font-semibold rounded flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* Post Type Tags and Three Dots Menu */}
        <div className="relative flex items-center gap-2">
          {/* Parley Tag for text/image posts */}
          {(post.type === 'text' || post.type === 'image' || !post.type) && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isDark ? 'bg-[#363b4e]' : 'bg-slate-100'
            } shrink-0`}>
              <ChatCircle className="w-4 h-4 text-blue-500" weight="fill" />
              <span className={`text-sm font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Parley</span>
            </div>
          )}
          
          {/* Take Tag for video posts */}
          {post.type === 'video' && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isDark ? 'bg-[#363b4e]' : 'bg-slate-100'
            } shrink-0`}>
              <VideoCamera className="w-4 h-4 text-blue-500" weight="fill" />
              <span className={`text-sm font-semibold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Take</span>
            </div>
          )}
          
          <PostOptionsMenu
            onReport={() => console.log('Report post')}
            onHide={() => console.log('Hide post')}
            onDismiss={onDismiss}
          />
        </div>
      </div>

      {/* Content - Clickable to open post detail */}
      <div onClick={onPostClick} className="cursor-pointer">
        <p className={`text-[17px] leading-[1.6] mb-4 whitespace-pre-line ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {post.content.replace(/\\n/g, '\n')}
        </p>

        {/* Image */}
        {post.image && (
          <div className="mb-4 overflow-hidden rounded-xl">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full object-cover max-h-96"
            />
          </div>
        )}

        {/* Link Preview */}
        {post.link && (
          <div className={`mb-4 rounded-xl overflow-hidden border ${isDark ? 'border-[#363b4e] bg-[#2d3142]' : 'border-slate-200 bg-slate-50'}`}>
            {post.link.thumbnail && (
              <img src={post.link.thumbnail} alt={post.link.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-3">
              <div className="flex items-start gap-2 mb-1">
                <LinkIcon className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.link.title}</h4>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-2`}>{post.link.description}</p>
              <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{post.link.url}</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions with Reactions */}
      <div className="flex items-center gap-1 pt-2">
        {/* Like with Reaction Picker */}
        <div className="relative">
          <button
            onClick={() => setShowReactions(!showReactions)}
            onMouseEnter={() => setShowReactions(true)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              reaction 
                ? reactions.find(r => r.type === reaction)?.color
                : isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'
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
                    <ReactionIcon className="w-6 h-6 fill-current" />
                  </motion.div>
                ) : <ThumbsUp className="w-6 h-6" />;
              })()
            ) : (
              <ThumbsUp className="w-6 h-6" />
            )}
            <span className="text-base font-medium">{post.likes + (reaction ? 1 : 0)}</span>
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
                        className={`p-2.5 rounded-full transition-all relative ${
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

        <button 
          onClick={onComment}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-base font-medium">{post.comments}</span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            onMouseEnter={() => setShowShareTooltip(true)}
            onMouseLeave={() => setShowShareTooltip(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Share2 className="w-6 h-6" />
            <span className="text-base font-medium">{post.shares}</span>
          </button>

          {/* Share Menu */}
          {showShareMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)}></div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute bottom-full left-0 mb-2 w-56 rounded-xl shadow-xl z-50 overflow-hidden ${
                  isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'
                }`}
              >
                <button 
                  onClick={() => handleShare('link')}
                  className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${isDark ? 'hover:bg-[#363b4e] text-slate-300' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <LinkIcon className="w-4 h-4" />
                  Copy link
                </button>
                <div className={`h-px ${isDark ? 'bg-[#363b4e]' : 'bg-slate-200'}`}></div>
                <button 
                  onClick={() => handleShare('message')}
                  className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${isDark ? 'hover:bg-[#363b4e] text-slate-300' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <Send className="w-4 h-4" />
                  Share via message
                </button>
              </motion.div>
            </>
          )}

          {/* Share Tooltip */}
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
        
        <motion.button
          onClick={handleSave}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'} ml-auto`}
          whileTap={{ scale: 0.85 }}
          animate={saved ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Bookmark className={`w-6 h-6 transition-all duration-200 ${saved ? 'fill-purple-600 text-purple-600' : ''}`} />
        </motion.button>
      </div>
    </div>
  );
}