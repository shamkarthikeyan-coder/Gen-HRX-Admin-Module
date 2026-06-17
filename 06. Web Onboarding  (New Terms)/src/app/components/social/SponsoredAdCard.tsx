import { useTheme } from '../../context/ThemeContext';
import { ThumbsUp, MessageCircle, Share2, ExternalLink, Bookmark, Heart, Lightbulb, Scale, Brain } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PostOptionsMenu } from './PostOptionsMenu';

interface SponsoredAdCardProps {
  ad: {
    id: string;
    type: string;
    sponsor: string;
    avatar: string;
    tagline: string;
    content: string;
    image: string;
    ctaText: string;
    ctaUrl: string;
    likes: number;
    sponsored: boolean;
  };
  onSave?: (postId: string) => void;
}

const reactions = [
  { type: 'like', icon: ThumbsUp, label: 'Like', color: 'text-purple-600' },
  { type: 'love', icon: Heart, label: 'Love', color: 'text-purple-600' },
  { type: 'insightful', icon: Lightbulb, label: 'Insightful', color: 'text-purple-600' },
  { type: 'balanced', icon: Scale, label: 'Balanced', color: 'text-purple-600' },
  { type: 'thoughtful', icon: Brain, label: 'Thoughtful', color: 'text-purple-600' },
];

export function SponsoredAdCard({ ad, onSave }: SponsoredAdCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleReaction = (type: string) => {
    setReaction(reaction === type ? null : type);
    setShowReactions(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(ad.id);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#242833]' : 'bg-white'} px-6 py-6 relative`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-lg shrink-0 overflow-hidden">
          {typeof ad.avatar === 'string' && (ad.avatar.startsWith('http') || ad.avatar.startsWith('data:') || ad.avatar.startsWith('figma:')) ? (
            <img src={ad.avatar} alt={ad.sponsor} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-semibold">{ad.avatar}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {ad.sponsor}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{ad.tagline}</span>
            <span className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>·</span>
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Sponsored</span>
          </div>
        </div>
        <PostOptionsMenu authorName={ad.sponsor} postId={ad.id} />
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className={`text-[17px] leading-[1.6] whitespace-pre-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {ad.content}
        </p>
      </div>

      {/* Image */}
      {ad.image && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={ad.image}
            alt="Ad content"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* CTA Button */}
      <div className="mb-4">
        <button className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          {ad.ctaText}
          <ExternalLink className="w-4 h-4" />
        </button>
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
            <span className="text-base font-medium">{ad.likes + (reaction ? 1 : 0)}</span>
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
                className={`absolute bottom-full left-0 mb-2 flex gap-1 p-2 rounded-xl shadow-xl ${
                  isDark ? 'bg-[#2d3142] border border-[#363b4e]' : 'bg-white border border-slate-200'
                }`}
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
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg transition-all ${
                        reaction === r.type ? 'bg-slate-100 dark:bg-slate-700' : ''
                      }`}
                      title={r.label}
                    >
                      <Icon className={`w-6 h-6 ${r.color}`} />
                    </motion.button>
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
          <span className="text-base font-medium">Comment</span>
        </button>

        <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isDark ? 'text-slate-400 hover:bg-slate-700/50' : 'text-slate-600 hover:bg-slate-100'
        }`}>
          <Share2 className="w-6 h-6" />
          <span className="text-base font-medium">Share</span>
        </button>

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