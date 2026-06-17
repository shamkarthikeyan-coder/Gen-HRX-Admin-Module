import { useTheme } from '../../context/ThemeContext';
import { ThumbsUp, MessageCircle, Share2, Play, Bookmark } from 'lucide-react';
import { VideoCamera, CheckFat, HandsClapping, SketchLogo, TrendUp, Megaphone } from '@phosphor-icons/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PostOptionsMenu } from './PostOptionsMenu';

interface VideoPostCardProps {
  post: {
    id: string;
    type: string;
    author: string;
    avatar: string;
    role: string;
    time: string;
    content: string;
    videoUrl: string;
    videoThumbnail: string;
    duration: string;
    likes: number;
    comments: number;
    shares: number;
    verified?: boolean;
  };
  onPostClick?: () => void;
  onSave?: (postId: string) => void;
}

const reactions = [
  { type: 'check', icon: CheckFat, label: 'noted', color: 'text-purple-600' },
  { type: 'applause', icon: HandsClapping, label: 'acclaim', color: 'text-purple-600' },
  { type: 'gem', icon: SketchLogo, label: 'gem', color: 'text-purple-600' },
  { type: 'trending', icon: TrendUp, label: 'ROI', color: 'text-purple-600' },
  { type: 'announce', icon: Megaphone, label: 'Announce', color: 'text-purple-600' },
];

export function VideoPostCard({ post, onPostClick, onSave }: VideoPostCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleReaction = (type: string) => {
    setReaction(reaction === type ? null : type);
    setShowReactions(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(post.id);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#242833]' : 'bg-white'} px-6 py-6 relative`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-lg shrink-0 overflow-hidden">
          {typeof post.avatar === 'string' && (post.avatar.startsWith('http') || post.avatar.startsWith('data:') || post.avatar.startsWith('figma:')) ? (
            <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-sm">
              {post.author.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {post.author}
            </h3>
            {post.verified && (
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-600">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{post.role}</span>
            <span className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>·</span>
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{post.time}</span>
          </div>
        </div>
        
        {/* Take Tag and Three Dots Menu */}
        <div className="flex items-center gap-2">
          {/* Take Tag */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
            isDark ? 'bg-[#363b4e]' : 'bg-slate-100'
          } shrink-0`}>
            <VideoCamera className="w-4 h-4 text-blue-500" weight="fill" />
            <span className={`text-sm font-semibold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>Take</span>
          </div>
          
          <PostOptionsMenu authorName={post.author} postId={post.id} />
        </div>
      </div>

      {/* Content */}
      <div className="mb-4 cursor-pointer" onClick={onPostClick}>
        <p className={`text-[17px] leading-[1.6] whitespace-pre-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {post.content}
        </p>
      </div>

      {/* Video */}
      <div className="mb-3 relative group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
        {!isPlaying ? (
          <>
            <img
              src={post.videoThumbnail}
              alt="Video thumbnail"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white transition-colors">
                <Play className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-white text-xs font-semibold">
              {post.duration}
            </div>
          </>
        ) : (
          <video
            src={post.videoUrl}
            controls
            autoPlay
            className="w-full h-auto"
          />
        )}
      </div>

      {/* Actions */}
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

        <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'
        }`}>
          <MessageCircle className="w-6 h-6" />
          <span className="text-base font-medium">{post.comments}</span>
        </button>

        <div className="relative">
          <button
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'
            }`}
            onMouseEnter={() => setShowShareTooltip(true)}
            onMouseLeave={() => setShowShareTooltip(false)}
          >
            <Share2 className="w-6 h-6" />
            <span className="text-base font-medium">{post.shares}</span>
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