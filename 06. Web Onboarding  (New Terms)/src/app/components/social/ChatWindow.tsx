import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Minus, MoreHorizontal, Send, Smile, Paperclip, Image as ImageIcon, MailOpen, BellOff, AlertTriangle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface ChatWindowProps {
  message: {
    id: string;
    avatar: string;
    name: string;
    isOnline: boolean;
    isCompany?: boolean;
    imageUrl?: string;
  };
  onClose: () => void;
  position: number; // Index for positioning multiple windows
}

const mockChatHistory: Record<string, ChatMessage[]> = {
  '1': [
    { id: 'c1', text: 'Hey! I saw your post about the DEIB workshop', sender: 'other', timestamp: '10:30 AM' },
    { id: 'c2', text: 'That idea sounds great! When are you planning to host it?', sender: 'other', timestamp: '10:31 AM' },
    { id: 'c3', text: 'Thanks! I was thinking sometime next month', sender: 'user', timestamp: '10:35 AM' },
    { id: 'c4', text: 'Would love to collaborate on this', sender: 'user', timestamp: '10:35 AM' },
  ],
  '2': [
    { id: 'c1', text: 'Can we discuss the new hiring metrics?', sender: 'user', timestamp: '9:15 AM' },
    { id: 'c2', text: 'Sure! I have some thoughts on the time-to-hire KPI', sender: 'other', timestamp: '9:20 AM' },
    { id: 'c3', text: 'Perfect, let\'s schedule a quick call', sender: 'user', timestamp: '9:22 AM' },
  ],
  '4': [
    { id: 'c1', text: 'The onboarding checklist is perfect', sender: 'other', timestamp: 'Yesterday' },
    { id: 'c2', text: 'I\'ve shared it with the team', sender: 'other', timestamp: 'Yesterday' },
    { id: 'c3', text: 'Awesome! Let me know if you need any adjustments', sender: 'user', timestamp: 'Yesterday' },
  ],
};

export function ChatWindow({ message, onClose, position }: ChatWindowProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  const chatHistory = mockChatHistory[message.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setShowOptionsMenu(false);
      }
    };

    if (showOptionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptionsMenu]);

  const handleMarkAsUnread = () => {
    // In a real app, this would mark the conversation as unread
    console.log('Mark as unread:', message.id);
    setShowOptionsMenu(false);
  };

  const handleMute = () => {
    // In a real app, this would mute the conversation
    console.log('Mute conversation:', message.id);
    setShowOptionsMenu(false);
  };

  const handleReportBlock = () => {
    // In a real app, this would open a report/block dialog
    console.log('Report/Block:', message.id);
    setShowOptionsMenu(false);
  };

  const handleDeleteConversation = () => {
    // In a real app, this would delete the conversation
    console.log('Delete conversation:', message.id);
    setShowOptionsMenu(false);
    onClose();
  };

  const handleSend = () => {
    if (inputText.trim()) {
      // In a real app, this would send the message
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Calculate position from right (accounting for messaging panel at right: 24px + 360px)
  const rightOffset = 24 + 360 + 12 + (position * 360); // 24px margin + 360px panel + 12px gap + position offset

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`fixed bottom-0 z-[9998] rounded-t-xl shadow-2xl overflow-hidden ${
        isDark ? 'bg-[#1d2226]' : 'bg-white'
      }`}
      style={{
        right: `${rightOffset}px`,
        width: '340px',
        height: isMinimized ? 'auto' : '500px',
      }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        isDark ? 'border-[#38434f]' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm overflow-hidden ${
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
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1d2226] rounded-full"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-sm truncate ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {message.name}
            </h3>
            {message.isOnline && (
              <p className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                Active now
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            className={`p-1.5 rounded hover:bg-slate-700 transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className={`p-1.5 rounded hover:bg-slate-700 transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Minus className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded hover:bg-slate-700 transition-colors ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <div className="flex flex-col h-[calc(100%-64px)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className={`text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs mt-1">Start a conversation!</p>
                </div>
              </div>
            ) : (
              <>
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-purple-600 to-purple-700 text-white'
                          : isDark
                          ? 'bg-[#38434f] text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' 
                          ? 'text-purple-200' 
                          : isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className={`border-t p-3 ${isDark ? 'border-[#38434f]' : 'border-slate-200'}`}>
            <div className={`flex items-end gap-2 p-2 rounded-lg ${
              isDark ? 'bg-[#38434f]' : 'bg-slate-50'
            }`}>
              <div className="flex items-center gap-1">
                <button className={`p-1.5 rounded transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}>
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className={`p-1.5 rounded transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}>
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button className={`p-1.5 rounded transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}>
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write a message..."
                className={`flex-1 bg-transparent outline-none text-sm px-2 py-1 ${
                  isDark ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'
                }`}
              />

              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className={`p-2 rounded transition-colors ${
                  inputText.trim()
                    ? 'text-purple-600 hover:text-purple-700'
                    : isDark ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Options Menu */}
      {showOptionsMenu && (
        <div
          ref={optionsMenuRef}
          className={`absolute top-14 right-2 z-10 rounded-lg border shadow-xl overflow-hidden min-w-[200px] ${
            isDark ? 'bg-[#38434f] border-[#4c566a]' : 'bg-white border-slate-200'
          }`}
        >
          <button
            onClick={handleMarkAsUnread}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              isDark ? 'text-slate-200 hover:bg-[#4c566a]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MailOpen className="w-4 h-4" />
            <span>Mark as Unread</span>
          </button>
          <button
            onClick={handleMute}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              isDark ? 'text-slate-200 hover:bg-[#4c566a]' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BellOff className="w-4 h-4" />
            <span>Mute</span>
          </button>
          <button
            onClick={handleReportBlock}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              isDark ? 'text-orange-400 hover:bg-[#4c566a]' : 'text-orange-600 hover:bg-orange-50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Report/Block</span>
          </button>
          <div className={`h-px ${
            isDark ? 'bg-[#4c566a]' : 'bg-slate-200'
          }`} />
          <button
            onClick={handleDeleteConversation}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              isDark ? 'text-red-400 hover:bg-[#4c566a]' : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Conversation</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}