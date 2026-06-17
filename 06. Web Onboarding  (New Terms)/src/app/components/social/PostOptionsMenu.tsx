import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MoreHorizontal, Bookmark, EyeOff, AlertCircle, UserX, Link2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DismissPostModal } from './DismissPostModal';
import { toast } from 'sonner';

interface PostOptionsMenuProps {
  authorName?: string;
  postId?: string;
  onReport?: () => void;
  onHide?: () => void;
  onDismiss?: () => void;
}

export function PostOptionsMenu({ authorName, postId, onReport, onHide, onDismiss }: PostOptionsMenuProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [showDismissModal, setShowDismissModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (action: string) => {
    console.log(`Action: ${action}`, postId);
    setIsOpen(false);
    // Handle different actions here
    if (action === 'report' && onReport) {
      onReport();
    }
    if (action === 'hide' && onHide) {
      onHide();
    }
    if (action === 'dismiss' && onDismiss) {
      onDismiss();
    }
  };

  const menuOptions = [
    { icon: Bookmark, label: 'Save post', action: 'save' },
    { icon: EyeOff, label: 'Hide post', action: 'hide' },
    { icon: AlertCircle, label: 'Report post', action: 'report', danger: true },
    { icon: UserX, label: `Unfollow ${authorName}`, action: 'unfollow' },
    { icon: Link2, label: 'Copy link', action: 'copy' },
    { icon: X, label: 'Dismiss', action: 'dismiss' },
  ];

  return (
    <div className="relative flex items-center gap-1" ref={menuRef}>
      {/* Three Dots Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`p-1.5 rounded-full transition-colors ${
          isDark 
            ? 'hover:bg-slate-700 text-slate-400' 
            : 'hover:bg-slate-100 text-slate-600'
        }`}
        aria-label="Post options"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {/* Close/X Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDismissModal(true);
        }}
        className={`p-1.5 rounded-full transition-colors ${
          isDark 
            ? 'hover:bg-slate-700 text-slate-400' 
            : 'hover:bg-slate-100 text-slate-600'
        }`}
        aria-label="Dismiss post"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full right-0 mt-2 w-56 rounded-xl shadow-lg border overflow-hidden z-50 ${
              isDark 
                ? 'bg-[#242833] border-[#363b4e]' 
                : 'bg-white border-slate-200'
            }`}
          >
            {menuOptions.map((option, index) => (
              <button
                key={option.action}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option.action);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  option.danger
                    ? 'text-red-500 hover:bg-red-500/10'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-700'
                    : 'text-slate-700 hover:bg-slate-50'
                } ${index !== menuOptions.length - 1 ? (isDark ? 'border-b border-[#363b4e]' : 'border-b border-slate-100') : ''}`}
              >
                <option.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dismiss Post Modal */}
      <DismissPostModal
        isOpen={showDismissModal}
        onClose={() => setShowDismissModal(false)}
        onDismissReason={(reason) => {
          console.log('Dismiss reason:', reason, postId);
          setShowDismissModal(false);
          
          // Show toast notification based on reason
          if (reason === 'not-interested') {
            toast.success('Post dismissed', {
              description: "We'll show you fewer posts like this",
              duration: 3000,
            });
          } else if (reason === 'not-appropriate') {
            toast.success('Post reported', {
              description: 'Thank you for helping keep genHRX professional',
              duration: 3000,
            });
          }
          
          if (onDismiss) {
            onDismiss();
          }
        }}
        onUndo={() => {
          console.log('Undo dismiss', postId);
          setShowDismissModal(false);
          toast.success('Post restored', {
            description: 'The post has been restored to your feed',
            duration: 3000,
          });
        }}
      />
    </div>
  );
}