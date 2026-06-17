import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Search, Filter, Clock, Users, MessageCircle, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { SaveToCollectionModal } from './social/SaveToCollectionModal';
import { DecisionRoomDetail } from './DecisionRoomDetail';
import { LeftSidebar } from './social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../constants/userData';

interface DecisionRoomsProps {
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile') => void;
  onLogout?: () => void;
}

export function DecisionRooms({ onNavigate, onLogout }: DecisionRoomsProps = {}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All rooms');
  
  // Save to collection modal state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveRoomId, setSaveRoomId] = useState<string | null>(null);

  // Selected room for detail view
  const [selectedRoom, setSelectedRoom] = useState<typeof decisionRoomsData[0] | null>(null);

  // If a room is selected, show the detail view
  if (selectedRoom) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
        <DecisionRoomDetail
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      </div>
    );
  }

  const categories = [
    'HR Tech',
    'DEI',
    'Legal',
    'Performance',
    'Compensation',
    'Benefits',
    'Recruiting',
    'Culture'
  ];

  const decisionRoomsData = [
    {
      id: 1,
      title: 'Performance review calibration: managing grade inflation?',
      question: 'Should we recalibrate our performance review process to address grade inflation?',
      situation: 'Our recent performance review cycle shows 78% of employees rated as "exceeds expectations" or higher, up from 45% three years ago. This grade inflation makes it harder to identify top performers and creates compensation pressure.',
      description: 'Calibrate performance reviews to ensure fairness and consistency.',
      timeLeft: '2h left',
      responses: 3,
      groupType: 'Invite Only',
      createdBy: 'HR Director',
      timeRemaining: '2h',
      participants: 12,
      likes: 34,
      shares: 4,
      isActive: true,
      constraints: 'Must maintain employee morale, work within current budget constraints, and align with industry standards while differentiating performance.',
      options: [
        { id: 1, text: 'Implement forced ranking with distribution curves', percentage: 33, votes: 13 },
        { id: 2, text: 'Add calibration sessions with skip-level managers', percentage: 54, votes: 21 },
        { id: 3, text: 'Introduce more granular rating scale', percentage: 13, votes: 5 }
      ],
      peerInputs: [
        {
          id: 1,
          name: 'Sarah Chen',
          role: 'VP of People, Finance',
          time: '2h ago',
          avatar: '',
          initials: 'SC',
          color: '#E91E63'
        }
      ]
    },
    {
      id: 2,
      title: 'Executive compensation structure review',
      question: 'How should we restructure executive compensation to balance retention and performance?',
      situation: 'Current executive compensation is heavily weighted toward base salary (70%), with limited performance-based incentives. Market data shows our total compensation lags behind competitors by 15-20%, and we\'ve lost 3 senior leaders in the past 6 months.',
      description: 'Review and update the executive compensation structure.',
      timeLeft: '5h left',
      responses: 7,
      groupType: 'Invite Only',
      createdBy: 'Compensation Lead',
      timeRemaining: '5h',
      participants: 8,
      likes: 34,
      shares: 11,
      isActive: true,
      constraints: 'Must stay within board-approved budget, align with shareholder expectations, maintain internal equity, and meet regulatory compliance requirements.',
      options: [
        { id: 1, text: 'Shift to 50/30/20 (base/short-term/long-term) structure', percentage: 45, votes: 18 },
        { id: 2, text: 'Add retention bonuses with 3-year cliff vesting', percentage: 35, votes: 14 },
        { id: 3, text: 'Increase base salary and add performance multipliers', percentage: 20, votes: 8 }
      ],
      peerInputs: [
        {
          id: 1,
          name: 'Marcus Johnson',
          role: 'CFO',
          time: '1h ago',
          avatar: '',
          initials: 'MJ',
          color: '#9C27B0'
        },
        {
          id: 2,
          name: 'Lisa Park',
          role: 'Board Compensation Committee',
          time: '3h ago',
          avatar: '',
          initials: 'LP',
          color: '#FF5722'
        }
      ]
    },
    {
      id: 3,
      title: 'Sensitive HR matter - confidential discussion',
      question: 'How should we handle allegations of misconduct against a senior leader?',
      situation: 'Multiple employees have reported concerning behavior from a VP-level leader. The allegations include micromanagement, public criticism, and favoritism. This leader delivers strong results but has a 40% turnover rate in their department over 18 months.',
      description: 'Discuss a sensitive HR matter in a confidential setting.',
      timeLeft: '1d left',
      responses: 4,
      groupType: 'Confidential',
      createdBy: 'CHRO',
      timeRemaining: '1d',
      participants: 5,
      likes: 33,
      shares: 9,
      isActive: true,
      constraints: 'Must protect employee confidentiality, follow legal protocols, maintain business continuity, and preserve organizational trust.',
      options: [
        { id: 1, text: 'Launch immediate third-party investigation', percentage: 60, votes: 12 },
        { id: 2, text: 'Assign executive coach and monitor for 90 days', percentage: 25, votes: 5 },
        { id: 3, text: 'Lateral move to individual contributor role', percentage: 15, votes: 3 }
      ],
      peerInputs: [
        {
          id: 1,
          name: 'David Miller',
          role: 'Chief Legal Officer',
          time: '4h ago',
          avatar: '',
          initials: 'DM',
          color: '#2196F3'
        }
      ]
    },
    {
      id: 4,
      title: 'Hybrid work policy: Finding the right balance?',
      question: 'What should our long-term hybrid work policy be?',
      situation: 'Current policy requires 3 days in office, but compliance is at 65%. Employee surveys show 80% prefer 2 days or fewer, while leadership wants more in-person collaboration. Productivity metrics show no significant difference between remote and in-office days.',
      description: 'Discuss effective hybrid work policies for modern teams.',
      timeLeft: '3h left',
      responses: 15,
      groupType: 'Open',
      createdBy: 'VP Operations',
      timeRemaining: '3h',
      participants: 15,
      likes: 56,
      shares: 6,
      isActive: true,
      constraints: 'Must maintain team cohesion, honor existing office leases, support all job functions, and remain competitive for talent acquisition.',
      options: [
        { id: 1, text: 'Flexible 2-3 days with team anchor days', percentage: 55, votes: 33 },
        { id: 2, text: 'Role-based approach (different rules by function)', percentage: 30, votes: 18 },
        { id: 3, text: 'Fully remote with quarterly in-person gatherings', percentage: 15, votes: 9 }
      ],
      peerInputs: [
        {
          id: 1,
          name: 'Jennifer Lee',
          role: 'Engineering Director',
          time: '30m ago',
          avatar: '',
          initials: 'JL',
          color: '#4CAF50'
        },
        {
          id: 2,
          name: 'Robert Taylor',
          role: 'Sales VP',
          time: '1h ago',
          avatar: '',
          initials: 'RT',
          color: '#FF9800'
        }
      ]
    },
    {
      id: 5,
      title: 'Salary transparency: How much to share?',
      question: 'Should we publicly share salary ranges for all positions?',
      situation: 'New state laws require salary ranges in job postings. We\'re debating whether to go further with full internal transparency. Early analysis shows we have 12% pay gaps in similar roles, some justified by performance/tenure, others need correction.',
      description: 'Navigate the complex topic of salary transparency in your organization.',
      timeLeft: '6h left',
      responses: 22,
      groupType: 'Open',
      createdBy: 'DEI Director',
      timeRemaining: '6h',
      participants: 20,
      likes: 78,
      shares: 15,
      isActive: true,
      constraints: 'Must comply with legal requirements, address existing pay equity issues, manage employee expectations, and maintain competitive positioning.',
      options: [
        { id: 1, text: 'Full transparency with job level bands published internally', percentage: 40, votes: 44 },
        { id: 2, text: 'Share ranges only in job postings (legal minimum)', percentage: 35, votes: 38 },
        { id: 3, text: 'Transparent bands plus methodology for placement', percentage: 25, votes: 27 }
      ],
      peerInputs: [
        {
          id: 1,
          name: 'Amanda Wright',
          role: 'Compensation Manager',
          time: '15m ago',
          avatar: '',
          initials: 'AW',
          color: '#F44336'
        },
        {
          id: 2,
          name: 'Kevin Zhang',
          role: 'Employee Relations Lead',
          time: '2h ago',
          avatar: '',
          initials: 'KZ',
          color: '#673AB7'
        },
        {
          id: 3,
          name: 'Michelle Brown',
          role: 'Legal Counsel',
          time: '4h ago',
          avatar: '',
          initials: 'MB',
          color: '#00BCD4'
        }
      ]
    }
  ];

  const filterOptions = ['All rooms', 'Active rooms', 'Inactive rooms', 'Invite-only rooms'];

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setShowFilterOverlay(false);
  };

  return (
    <>
      <LeftSidebar
        onCreatePost={() => {}}
        onLogout={onLogout}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="decisionRooms"
        onNavigate={onNavigate}
        onProfileClick={() => {}}
      />

      <div className="ml-[72px]">
        <div className={`min-h-screen flex items-start justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
          {/* Fixed-width Mobile Canvas */}
          <div className="w-full max-w-[600px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#ffffff' }}>
            
            {/* Header */}
            <div className={`fixed top-0 w-full max-w-[600px] h-14 flex items-center justify-center px-4 z-10 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`} style={{ left: 'calc(50% + 36px)', transform: 'translateX(-50%)' }}>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'} text-[18px]`}>
                All Hands
              </span>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-14"></div>

            <div className="pb-6">
              {/* Sticky Search and Category Section */}
              <div className={`sticky top-14 z-40 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} px-4 pt-6 pb-4`}>
                {/* Search Bar */}
                <div className={`relative mb-4 rounded-2xl border ${
                  isDark ? 'bg-[#242833] border-[#363b4e]' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center px-4 py-3.5">
                    <Search className={`w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search All Hands..."
                      className={`flex-1 ml-3 bg-transparent outline-none text-base ${
                        isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                    <button
                      onClick={() => setShowFilterOverlay(true)}
                      className={`ml-2 p-1.5 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                      }`}
                    >
                      <Filter className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    </button>
                  </div>
                </div>

                {/* Category Pills */}
                <div className="overflow-x-auto scrollbar-hide -mr-4">
                  <div className="flex gap-2 pb-2 pr-4">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                        className={`flex-shrink-0 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                          category === selectedCategory
                            ? isDark
                              ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                              : 'bg-purple-100 text-purple-700 border border-purple-200'
                            : isDark
                            ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decision Room Cards - Scrollable Content */}
              <div className="px-4 space-y-4">{decisionRoomsData.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-5 rounded-2xl border transition-all hover:shadow-lg cursor-pointer ${
                      isDark
                        ? 'bg-[#242833] border-[#363b4e] hover:border-purple-500/30'
                        : 'bg-white/60 border-slate-200 hover:border-purple-200'
                    }`}
                  >
                    {/* Header with Title and Active Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`font-bold text-base leading-snug flex-1 pr-3 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {room.title}
                      </h3>
                      <span className="flex-shrink-0 px-3 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-semibold rounded-lg border border-emerald-500/20">
                        Active
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {room.description}
                    </p>

                    {/* Meta Information Row */}
                    <div className={`flex items-center gap-2 mb-4 text-sm flex-wrap ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{room.timeLeft}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{room.participants}</span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        <span>{room.responses} responses</span>
                      </div>
                    </div>

                    {/* Engagement Row */}
                    <div className={`flex items-center justify-between pt-4 border-t ${
                      isDark ? 'border-[#363b4e]' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-5">
                        {/* Likes */}
                        <button className={`flex items-center gap-2 transition-colors ${
                          isDark
                            ? 'text-slate-400 hover:text-purple-400'
                            : 'text-slate-500 hover:text-purple-600'
                        }`}>
                          <ThumbsUp className="w-5 h-5" />
                          <span className="text-sm font-medium">{room.likes}</span>
                        </button>

                        {/* Shares */}
                        <button className={`flex items-center gap-2 transition-colors ${
                          isDark
                            ? 'text-slate-400 hover:text-purple-400'
                            : 'text-slate-500 hover:text-purple-600'
                        }`}>
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm font-medium">{room.shares}</span>
                        </button>
                      </div>

                      {/* Bookmark */}
                      <button
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? 'text-slate-400 hover:bg-slate-700 hover:text-purple-400'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-purple-600'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSaveRoomId(room.id.toString());
                          setShowSaveModal(true);
                        }}
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Overlay - Bottom Sheet */}
      {showFilterOverlay && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setShowFilterOverlay(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className={`mx-auto max-w-2xl rounded-t-3xl ${
              isDark ? 'bg-[#242833]' : 'bg-white'
            } px-6 pb-8 pt-4`}>
              {/* Drag Handle */}
              <div className="flex justify-center mb-6">
                <div className={`w-12 h-1.5 rounded-full ${
                  isDark ? 'bg-slate-600' : 'bg-slate-300'
                }`} />
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Filter Rooms
              </h3>

              {/* Filter Options */}
              <div className="space-y-3">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-semibold text-base transition-all ${
                      selectedFilter === option
                        ? isDark
                          ? 'bg-purple-600/20 text-purple-400 border-2 border-purple-500'
                          : 'bg-purple-50 text-slate-900 border-2 border-purple-500'
                        : isDark
                        ? 'bg-slate-800/50 text-slate-300 border-2 border-transparent hover:bg-slate-700/50'
                        : 'bg-slate-50 text-slate-700 border-2 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Save to Collection Modal */}
      {showSaveModal && (
        <SaveToCollectionModal
          roomId={saveRoomId}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </>
  );
}