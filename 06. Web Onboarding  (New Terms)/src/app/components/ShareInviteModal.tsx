import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Copy, Mail, MessageCircle, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ShareInviteModalProps {
  roomTitle: string;
  roomId: number;
  onClose: () => void;
}

export function ShareInviteModal({ roomTitle, roomId, onClose }: ShareInviteModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [emailInput, setEmailInput] = useState('');
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://genhrx.com/decision-room/${roomId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (emailInput.trim()) {
      // Handle email invite
      setEmailInput('');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className={`mx-auto max-w-2xl rounded-t-3xl ${
          isDark ? 'bg-[#242833]' : 'bg-white'
        } px-6 pb-8 pt-4 shadow-2xl`}>
          {/* Drag Handle */}
          <div className="flex justify-center mb-4">
            <div className={`w-12 h-1.5 rounded-full ${
              isDark ? 'bg-slate-600' : 'bg-slate-300'
            }`} />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Share & Invite
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Share this All Hands to gather insights
            </p>
          </div>

          {/* Room Title Card */}
          <div className={`p-5 rounded-2xl mb-6 ${
            isDark 
              ? 'bg-purple-900/20 border border-purple-500/20' 
              : 'bg-purple-50 border border-purple-100'
          }`}>
            <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {roomTitle}
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Share this decision room to gather insights
            </p>
          </div>

          {/* Share Link */}
          <div className="mb-6">
            <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Share Link
            </h3>
            <div className="flex items-center gap-3">
              <div className={`flex-1 px-4 py-3 rounded-xl border ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 text-slate-300' 
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <p className="text-sm truncate">{shareUrl}</p>
              </div>
              <button
                onClick={handleCopy}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Share Via */}
          <div className="mb-6">
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Share via
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Email */}
              <button className={`p-6 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-blue-600" />
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Email
                  </span>
                </div>
              </button>

              {/* Message */}
              <button className={`p-6 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Message
                  </span>
                </div>
              </button>

              {/* More */}
              <button className={`p-6 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                    <Share2 className="w-7 h-7 text-purple-600" />
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    More
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Invite by Email */}
          <div>
            <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Invite by Email
            </h3>
            <div className="flex items-center gap-3 mb-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="colleague@company.com"
                className={`flex-1 px-4 py-3 rounded-xl border outline-none transition-colors ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-400'
                }`}
              />
              <button
                onClick={handleSendInvite}
                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                  emailInput.trim()
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : isDark
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                disabled={!emailInput.trim()}
              >
                Send
              </button>
            </div>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              They'll receive an invitation to join this room
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}