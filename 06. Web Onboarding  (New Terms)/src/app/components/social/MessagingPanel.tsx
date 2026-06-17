import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Search, MoreHorizontal, Edit, ChevronDown, ChevronUp, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatWindow } from './ChatWindow';

interface Message {
  id: string;
  avatar: string;
  name: string;
  preview: string;
  date: string;
  isOnline: boolean;
  unreadCount?: number;
  isCompany?: boolean;
  imageUrl?: string;
}

interface MessagingPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockMessages: Message[] = [
  {
    id: '1',
    avatar: 'M',
    name: 'Marcus Chen',
    preview: 'That DEIB workshop idea sounds great!',
    date: 'Feb 25',
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMGJ1c2luZXNzbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyMDI3MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '2',
    avatar: 'P',
    name: 'Priya Sharma',
    preview: 'You: Can we discuss the new hiring metrics?',
    date: 'Feb 25',
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1704927768421-bc9549b5097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjB3b21hbiUyMGJ1c2luZXNzd29tYW4lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIxMDY5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '3',
    avatar: 'T',
    name: 'TalentAcquisition Pro',
    preview: 'Sponsored · Unlock 50% off on our ATS platform...',
    date: 'Feb 24',
    isOnline: false,
    unreadCount: 1,
    isCompany: true,
    imageUrl: 'https://images.unsplash.com/photo-1762330463265-07c5ac9b98cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0bWVudCUyMHRhbGVudCUyMGFjcXVpc2l0aW9uJTIwbG9nb3xlbnwxfHx8fDE3NzIxMDY5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '4',
    avatar: 'K',
    name: 'Keisha Williams',
    preview: 'Keisha: The onboarding checklist is perfect',
    date: 'Feb 24',
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1763757321139-e7e4de128cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBibGFjayUyMHdvbWFuJTIwZXhlY3V0aXZlJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyMTA2OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '5',
    avatar: 'H',
    name: 'HR Tech Summit',
    preview: 'Sponsored · Join us for the future of People Analytics...',
    date: 'Feb 23',
    isOnline: false,
    isCompany: true,
    imageUrl: 'https://images.unsplash.com/photo-1686140386811-099f53c0dd54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMHN1bW1pdCUyMGxvZ298ZW58MXx8fHwxNzcyMTA2OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '6',
    avatar: 'D',
    name: 'David Okonkwo',
    preview: 'David: Absolutely agree with your point',
    date: 'Feb 22',
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1654467438795-496792a204e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBibGFjayUyMGJ1c2luZXNzbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyMDQ5MDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '7',
    avatar: 'L',
    name: 'Lisa Martinez',
    preview: 'You: Looking forward to collaborating',
    date: 'Feb 21',
    isOnline: false,
    imageUrl: 'https://images.unsplash.com/photo-1762341120551-6a021d18933a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYXRpbmElMjBidXNpbmVzc3dvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyMTA2OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: '8',
    avatar: 'J',
    name: 'James Park',
    preview: 'You: Thanks for the feedback!',
    date: 'Feb 20',
    isOnline: true,
    imageUrl: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcyMDY4NDMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function MessagingPanel({ isOpen, onClose }: MessagingPanelProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'focused' | 'other'>('focused');
  const [openChats, setOpenChats] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenChat = (messageId: string) => {
    if (!openChats.includes(messageId)) {
      setOpenChats(prev => [...prev, messageId]);
    }
  };

  const handleCloseChat = (messageId: string) => {
    setOpenChats(prev => prev.filter(id => id !== messageId));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`fixed bottom-0 right-6 z-[9999] shadow-2xl overflow-visible ${
          isDark ? 'bg-[#1d2226]' : 'bg-white'
        } ${isExpanded ? 'rounded-t-xl' : 'rounded-full'}`}
        style={{
          width: isExpanded ? '360px' : '320px',
          height: isExpanded ? '580px' : 'auto',
        }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 bg-gradient-to-r from-purple-600 to-orange-500 ${
          isExpanded ? 'py-3 border-b border-purple-700/30 rounded-t-xl' : 'py-2.5 rounded-full'
        } relative`}>
          <div className="flex items-center gap-3">
            {!isExpanded && (
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold border border-white/30">
                  U
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
            )}
            <h2 className="font-semibold text-white">
              Messaging
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-1.5 rounded text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-[10000]"
                      onClick={() => setShowDropdown(false)}
                    />
                    
                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute bottom-full right-0 mb-2 w-64 rounded-lg shadow-2xl border overflow-hidden z-[10001] ${
                        isDark ? 'bg-[#2d3339] border-[#38434f]' : 'bg-white border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => setShowDropdown(false)}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          isDark ? 'hover:bg-[#38434f] text-white' : 'hover:bg-slate-50 text-slate-900'
                        }`}
                      >
                        <div className="font-medium">Manage conversations</div>
                      </button>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          isDark ? 'hover:bg-[#38434f] text-white' : 'hover:bg-slate-50 text-slate-900'
                        }`}
                      >
                        <div className="font-medium">Messaging settings</div>
                      </button>
                      <button
                        onClick={() => setShowDropdown(false)}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          isDark ? 'hover:bg-[#38434f] text-white' : 'hover:bg-slate-50 text-slate-900'
                        }`}
                      >
                        <div className="font-medium">Set away message</div>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button className="p-1.5 rounded text-white/90 hover:text-white hover:bg-white/10 transition-colors">
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
            {isExpanded && (
              <button 
                onClick={onClose}
                className="p-1.5 rounded text-white/90 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="flex flex-col h-[calc(100%-64px)]">
            {/* Search Bar */}
            <div className="px-3 py-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded ${
                isDark ? 'bg-[#38434f]' : 'bg-slate-100'
              }`}>
                <Search className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  placeholder="Search messages"
                  className={`flex-1 bg-transparent outline-none text-sm ${
                    isDark ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'
                  }`}
                />
                <Menu className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#38434f] px-4">
              
              
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleOpenChat(message.id)}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-[#38434f]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold overflow-hidden ${
                      message.isCompany
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-br from-purple-600 to-orange-500 text-white'
                    }`}>
                      {message.imageUrl ? (
                        <img 
                          src={message.imageUrl} 
                          alt={message.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        message.avatar
                      )}
                    </div>
                    {message.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1d2226] rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-medium text-sm truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {message.name}
                      </h3>
                      <span className={`text-xs flex-shrink-0 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {message.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className={`text-sm truncate ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {message.preview}
                      </p>
                      {message.unreadCount && (
                        <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{message.unreadCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Chat Windows */}
      {openChats.map((chatId, index) => {
        const message = mockMessages.find(m => m.id === chatId);
        if (!message) return null;
        
        return (
          <ChatWindow
            key={chatId}
            message={message}
            onClose={() => handleCloseChat(chatId)}
            position={index}
          />
        );
      })}
    </AnimatePresence>
  );
}