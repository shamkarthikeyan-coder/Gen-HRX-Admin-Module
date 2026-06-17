import { useTheme } from '../../context/ThemeContext';
import { ThumbsUp, MessageCircle, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PostOptionsMenu } from './PostOptionsMenu';

interface PollOption {
  id: number;
  text: string;
  votes: number;
  percentage: number;
}

interface PollPostCardProps {
  post: {
    id: string;
    type: string;
    author: string;
    avatar: string;
    role: string;
    time: string;
    content: string;
    poll: {
      question: string;
      options: PollOption[];
      totalVotes: number;
      endsIn: string;
      hasVoted: boolean;
      votedOption?: number;
    };
    likes: number;
    comments: number;
    shares: number;
    verified?: boolean;
  };
  onPostClick?: () => void;
}

export function PollPostCard({ post, onPostClick }: PollPostCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [liked, setLiked] = useState(false);
  const [hasVoted, setHasVoted] = useState(post.poll.hasVoted);
  const [selectedOption, setSelectedOption] = useState<number | null>(post.poll.votedOption || null);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleVote = (optionId: number) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      setHasVoted(true);
    }
  };

  return (
    <div className={`border-b ${
      isDark ? 'border-[#363b4e]' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-xl shrink-0 overflow-hidden">
            {typeof post.avatar === 'string' && (post.avatar.startsWith('http') || post.avatar.startsWith('data:') || post.avatar.startsWith('figma:')) ? (
              <img src={post.avatar} alt={post.author} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white">{post.avatar}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {post.author}
              </h3>
              {post.verified && (
                <Check className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {post.role}
            </p>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {post.time}
            </p>
          </div>
          <PostOptionsMenu authorName={post.author} postId={post.id} />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3 cursor-pointer" onClick={onPostClick}>
        <p className={`text-sm whitespace-pre-wrap ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          {post.content}
        </p>
      </div>

      {/* Poll */}
      <div className="px-4 pb-4">
        <div className={`p-4 rounded-xl border ${
          isDark ? 'bg-[#1a1d29] border-[#363b4e]' : 'bg-slate-50 border-slate-200'
        }`}>
          <h4 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {post.poll.question}
          </h4>
          <div className="space-y-2">
            {post.poll.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const showResults = hasVoted;

              return (
                <button
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                  disabled={hasVoted}
                  className={`w-full text-left relative overflow-hidden rounded-lg border transition-all ${
                    isSelected
                      ? 'border-purple-500'
                      : isDark
                      ? 'border-[#363b4e] hover:border-slate-500'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {showResults && (
                    <div
                      className={`absolute inset-0 ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20'
                          : isDark
                          ? 'bg-slate-700/30'
                          : 'bg-slate-200/50'
                      }`}
                      style={{ width: `${option.percentage}%` }}
                    />
                  )}
                  <div className="relative px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {showResults && isSelected && (
                        <Check className="w-4 h-4 text-purple-500" />
                      )}
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {option.text}
                      </span>
                    </div>
                    {showResults && (
                      <span className={`text-sm font-semibold ${isSelected ? 'text-purple-500' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {option.percentage}%
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className={`mt-3 text-xs flex items-center justify-between ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}>
            <span>{post.poll.totalVotes.toLocaleString()} votes</span>
            <span>Ends in {post.poll.endsIn}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`px-4 pb-2 flex items-center justify-between text-sm ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <span>{post.likes.toLocaleString()} likes</span>
        <div className="flex items-center gap-3">
          <span>{post.comments} comments</span>
          <span>{post.shares} shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className={`px-4 py-3 border-t ${isDark ? 'border-[#363b4e]' : 'border-slate-200'}`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              liked
                ? 'text-purple-500'
                : isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">Like</span>
          </button>

          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
            isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
          }`}>
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <div className="relative">
            <button
              onMouseEnter={() => setShowShareTooltip(true)}
              onMouseLeave={() => setShowShareTooltip(false)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
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
      </div>
    </div>
  );
}