import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Share2, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, UserCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ShareInviteModal } from './ShareInviteModal';
import { AddInputModal } from './AddInputModal';

interface DecisionRoomDetailProps {
  room: {
    id: number;
    title: string;
    question: string;
    situation: string;
    responses: number;
    groupType: string;
    createdBy: string;
    timeRemaining: string;
    constraints: string;
    options: {
      id: number;
      text: string;
      percentage: number;
      votes: number;
    }[];
    peerInputs: {
      id: number;
      name: string;
      role: string;
      time: string;
      avatar: string;
      initials: string;
      color: string;
    }[];
  };
  onClose: () => void;
}

interface PeerInput {
  id: number;
  author: string;
  role: string;
  initials: string;
  color: string;
  time: string;
  content: string;
  upvotes: number;
  downvotes: number;
  tags: string[];
  replies: {
    initials: string;
    color: string;
  }[];
  isAnonymous: boolean;
  bgColor: string;
}

export function DecisionRoomDetail({ room, onClose }: DecisionRoomDetailProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [constraintsExpanded, setConstraintsExpanded] = useState(true);
  const [optionsExpanded, setOptionsExpanded] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddInputModal, setShowAddInputModal] = useState(false);
  const [votedInputs, setVotedInputs] = useState<Record<number, 'up' | 'down' | null>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [optionVotes, setOptionVotes] = useState<Record<number, number>>({});

  // Handle option voting (poll)
  const handleOptionVote = (optionId: number) => {
    if (selectedOption === optionId) {
      // Unvote
      setSelectedOption(null);
      setOptionVotes(prev => ({
        ...prev,
        [optionId]: (prev[optionId] || 0) - 1
      }));
    } else {
      // Remove vote from previous option if exists
      if (selectedOption !== null) {
        setOptionVotes(prev => ({
          ...prev,
          [selectedOption]: (prev[selectedOption] || 0) - 1
        }));
      }
      // Add vote to new option
      setSelectedOption(optionId);
      setOptionVotes(prev => ({
        ...prev,
        [optionId]: (prev[optionId] || 0) + 1
      }));
    }
  };

  // Calculate updated vote data
  const getOptionVoteData = (option: { id: number; votes: number; percentage: number }) => {
    const additionalVotes = optionVotes[option.id] || 0;
    const newVotes = option.votes + additionalVotes;
    
    // Recalculate total votes
    const totalVotes = room.options.reduce((sum, opt) => {
      return sum + opt.votes + (optionVotes[opt.id] || 0);
    }, 0);
    
    const newPercentage = totalVotes > 0 ? Math.round((newVotes / totalVotes) * 100) : 0;
    
    return { votes: newVotes, percentage: newPercentage };
  };

  // Handle voting
  const handleVote = (inputId: number, voteType: 'up' | 'down') => {
    setVotedInputs(prev => ({
      ...prev,
      [inputId]: prev[inputId] === voteType ? null : voteType
    }));
  };

  // Handle reply
  const handleReply = (inputId: number) => {
    console.log('Reply to input:', inputId);
    // TODO: Implement reply functionality
  };

  // Handle view replies
  const handleViewReplies = (inputId: number) => {
    console.log('View replies for input:', inputId);
    // TODO: Implement view replies functionality
  };

  // Mock peer inputs data matching the reference design
  const peerInputs: PeerInput[] = [
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'VP of People, Finance',
      initials: 'SC',
      color: '#E91E63',
      time: '2h ago',
      content: 'We faced similar grade inflation last year. What worked for us was implementing calibration sessions across departments before finalizing ratings. It created healthy debate and forced managers to justify their ratings with specific examples.',
      upvotes: 8,
      downvotes: 1,
      tags: ['Handled this before', 'People-first lens'],
      replies: [
        { initials: 'MW', color: '#9C27B0' },
        { initials: 'CW', color: '#00BCD4' }
      ],
      isAnonymous: false,
      bgColor: isDark ? 'bg-purple-900/10' : 'bg-purple-50/50'
    },
    {
      id: 2,
      author: 'Alex Kumar',
      role: 'Talent Lead, Innovation Labs',
      initials: 'AK',
      color: '#FF9800',
      time: '1h ago',
      content: 'Be careful with forced ranking - it can damage psychological safety and team collaboration. Consider a "achievement levels" approach instead where you define clear criteria for each level and managers must provide evidence.',
      upvotes: 12,
      downvotes: 2,
      tags: ['Risk alert', 'People-first lens'],
      replies: [
        { initials: 'TC', color: '#4CAF50' },
        { initials: 'JP', color: '#2196F3' }
      ],
      isAnonymous: false,
      bgColor: isDark ? 'bg-pink-900/10' : 'bg-pink-50/50'
    },
    {
      id: 3,
      author: 'Anonymous',
      role: 'Senior HR Manager',
      initials: 'A',
      color: '#9E9E9E',
      time: '30m ago',
      content: 'Don\'t forget the legal implications. If grade inflation is real, your performance data won\'t hold up in wrongful termination cases. Document your calibration process thoroughly.',
      upvotes: 15,
      downvotes: 0,
      tags: ['Legal consideration'],
      replies: [],
      isAnonymous: true,
      bgColor: isDark ? 'bg-slate-800/30' : 'bg-slate-50/50'
    }
  ];

  const renderPeerInput = (input: PeerInput) => (
    <div key={input.id} className={`p-5 rounded-2xl ${input.bgColor}`}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
            input.isAnonymous ? 'opacity-60' : ''
          }`}
          style={{ backgroundColor: input.color }}
        >
          {input.isAnonymous ? <UserCircle className="w-7 h-7" /> : input.initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {input.author}
              </h4>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {input.role}
              </p>
            </div>
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {input.time}
            </span>
          </div>

          {/* Content */}
          <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {input.content}
          </p>

          {/* Tags */}
          {input.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {input.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    tag === 'Risk alert'
                      ? isDark
                        ? 'bg-red-900/30 text-red-400 border border-red-500/30'
                        : 'bg-red-50 text-red-700 border border-red-200'
                      : tag === 'Legal consideration'
                      ? isDark
                        ? 'bg-orange-900/30 text-orange-400 border border-orange-500/30'
                        : 'bg-orange-50 text-orange-700 border border-orange-200'
                      : tag === 'People-first lens'
                      ? isDark
                        ? 'bg-purple-900/30 text-purple-400 border border-purple-500/30'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                      : isDark
                      ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleVote(input.id, 'up')}
              className={`flex items-center gap-1.5 transition-colors ${
                votedInputs[input.id] === 'up'
                  ? 'text-purple-600'
                  : isDark
                  ? 'text-slate-400 hover:text-purple-400'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              <ThumbsUp className={`w-5 h-5 ${votedInputs[input.id] === 'up' ? 'fill-current' : ''}`} />
              <span className="text-sm font-semibold">{input.upvotes + (votedInputs[input.id] === 'up' ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => handleVote(input.id, 'down')}
              className={`flex items-center gap-1.5 transition-colors ${
                votedInputs[input.id] === 'down'
                  ? 'text-orange-600'
                  : isDark
                  ? 'text-slate-400 hover:text-orange-400'
                  : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              <ThumbsDown className={`w-5 h-5 ${votedInputs[input.id] === 'down' ? 'fill-current' : ''}`} />
              <span className="text-sm font-semibold">{input.downvotes + (votedInputs[input.id] === 'down' ? 1 : 0)}</span>
            </button>

            {/* Reply Avatars */}
            {input.replies.length > 0 && (
              <>
                <span className={`${isDark ? 'text-slate-600' : 'text-slate-300'}`}>•</span>
                <button
                  onClick={() => handleViewReplies(input.id)}
                  className="flex items-center gap-1 transition-opacity hover:opacity-80"
                >
                  <div className="flex -space-x-2">
                    {input.replies.map((reply, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                        style={{ backgroundColor: reply.color }}
                      >
                        {reply.initials}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-purple-600 ml-1">
                    {input.replies.length} {input.replies.length === 1 ? 'reply' : 'replies'}
                  </span>
                </button>
              </>
            )}

            <span className={`${isDark ? 'text-slate-600' : 'text-slate-300'}`}>•</span>

            <button
              onClick={() => handleReply(input.id)}
              className={`text-sm font-semibold transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-purple-400'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`max-w-2xl mx-auto flex flex-col h-full ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-40 backdrop-blur-xl ${
        isDark ? 'bg-[#1a1d29]/90' : 'bg-white/90'
      } px-4 py-4 border-b ${
        isDark ? 'border-[#363b4e]' : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`} />
          </button>
          <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            All Hands
          </h1>
          <button
            onClick={() => setShowShareModal(true)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 pb-28">
          {/* Title */}
          <div>
            <h2 className={`text-2xl font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {room.title}
            </h2>

            {/* Question in Purple */}
            <p className="text-lg font-semibold text-purple-600 leading-snug">
              {room.question}
            </p>
          </div>

          {/* Situation */}
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              SITUATION
            </h3>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {room.situation}
            </p>
          </div>

          {/* Meta Info Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Responses */}
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                RESPONSES
              </h3>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {room.responses}
              </p>
            </div>

            {/* Group Type */}
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                GROUP TYPE
              </h3>
              <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {room.groupType}
              </p>
            </div>

            {/* Created By */}
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                CREATED BY
              </h3>
              <p className="text-xl font-bold text-purple-600">
                {room.createdBy}
              </p>
            </div>

            {/* Time Remaining */}
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                TIME REMAINING
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {room.timeRemaining}
                </p>
              </div>
            </div>
          </div>

          {/* Constraints */}
          <div>
            <button
              onClick={() => setConstraintsExpanded(!constraintsExpanded)}
              className="w-full flex items-center justify-between mb-3"
            >
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                CONSTRAINTS
              </h3>
              {constraintsExpanded ? (
                <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              )}
            </button>
            <AnimatePresence>
              {constraintsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className={`text-base leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {room.constraints}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options Considered */}
          <div>
            <button
              onClick={() => setOptionsExpanded(!optionsExpanded)}
              className="w-full flex items-center justify-between mb-3"
            >
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                OPTIONS CONSIDERED
              </h3>
              {optionsExpanded ? (
                <ChevronUp className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              )}
            </button>
            <AnimatePresence>
              {optionsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-5">
                    {room.options.map((option, index) => {
                      const { votes, percentage } = getOptionVoteData(option);
                      const isSelected = selectedOption === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionVote(option.id)}
                          className={`w-full text-left transition-all rounded-xl p-4 -mx-4 ${
                            isSelected
                              ? isDark
                                ? 'bg-purple-900/20 border-2 border-purple-600'
                                : 'bg-purple-50 border-2 border-purple-600'
                              : 'border-2 border-transparent hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <p className={`text-base flex-1 pr-4 ${
                              isSelected
                                ? isDark ? 'text-white font-medium' : 'text-slate-900 font-medium'
                                : isDark ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              <span className="font-semibold">{index + 1}. </span>
                              {option.text}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className={`text-xl font-bold ${
                                isSelected
                                  ? 'text-purple-600'
                                  : isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                {percentage}%
                              </span>
                              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                ({votes} {votes === 1 ? 'vote' : 'votes'})
                              </span>
                            </div>
                          </div>
                          {/* Progress Bar */}
                          <div className={`w-full h-2.5 rounded-full overflow-hidden ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                          }`}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.5 }}
                              className={`h-full rounded-full ${
                                isSelected
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                                  : isDark ? 'bg-slate-500' : 'bg-slate-600'
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Peer Inputs Section */}
          <div>
            <h3 className={`text-xl font-bold mb-5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Peer Inputs
            </h3>

            {/* Peer Inputs List */}
            <div className="space-y-4 mb-6">
              {peerInputs.map((input) => renderPeerInput(input))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className={`sticky bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-3 ${
        isDark
          ? 'bg-gradient-to-t from-[#1a1d29] via-[#1a1d29]/90 to-transparent'
          : 'bg-gradient-to-t from-white via-white/90 to-transparent'
      }`}>
        <button
          onClick={() => setShowAddInputModal(true)}
          className="w-full py-5 font-semibold flex items-center justify-center gap-2
                     rounded-2xl shadow-xl transition-all
                     bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="w-5 h-5" />
          Add Input
        </button>
      </div>

      {/* Share & Invite Modal */}
      {showShareModal && (
        <ShareInviteModal
          roomTitle={room.title}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Add Input Modal */}
      {showAddInputModal && (
        <AddInputModal
          onClose={() => setShowAddInputModal(false)}
          onSubmit={(input) => {
            console.log('New input:', input);
            setShowAddInputModal(false);
          }}
        />
      )}
    </div>
  );
}