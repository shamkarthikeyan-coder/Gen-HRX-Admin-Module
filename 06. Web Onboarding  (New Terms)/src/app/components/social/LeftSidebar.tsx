import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import {
  Home, MessageSquare, ShoppingBag, BookOpen, Bell, User, Settings, LogOut, PlusSquare, FileText, MessageSquarePlus, Plus
} from 'lucide-react';
import parleyLogo from 'figma:asset/bee821e430229fb1beeaaf766cc85d1667d7436c.png';
import parleyLogoIcon from 'figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png';

interface LeftSidebarProps {
  onCreatePost: () => void;
  onLogout: () => void;
  userAvatar?: string;
  activeTab?: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings';
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings') => void;
  onProfileClick?: () => void;
}

export function LeftSidebar({ onCreatePost, onLogout, userAvatar, activeTab = 'home', onNavigate, onProfileClick }: LeftSidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Top navigation items - centered
  const topNavItems = [
    { icon: Home, label: 'Home', active: activeTab === 'home', tab: 'home' as const },
    { icon: MessageSquare, label: 'All Hands', active: activeTab === 'decisionRooms', tab: 'decisionRooms' as const },
    { icon: ShoppingBag, label: 'Marketplace', active: activeTab === 'marketplace', tab: 'marketplace' as const },
    { icon: BookOpen, label: 'The Hold', active: false },
  ];

  // Bottom navigation items
  const bottomNavItems = [
    { icon: User, label: 'Profile', tab: 'profile' as const, active: activeTab === 'profile' },
    { icon: Settings, label: 'Settings', tab: 'settings' as const, active: activeTab === 'settings' },
    { icon: Bell, label: 'Signals', badge: 12 },
  ];

  // Create menu options
  const createOptions = [
    { 
      icon: PlusSquare, 
      label: 'Create Parley', 
      gradient: 'from-purple-500 to-pink-500',
      onClick: () => {
        onCreatePost();
        setIsCreateMenuOpen(false);
      }
    },
    { 
      icon: FileText, 
      label: 'Create Article', 
      gradient: 'from-blue-500 to-cyan-500',
      onClick: () => {
        // TODO: Handle article creation
        setIsCreateMenuOpen(false);
      }
    },
    { 
      icon: MessageSquarePlus, 
      label: 'Create All Hands', 
      gradient: 'from-orange-500 to-purple-500',
      onClick: () => {
        setIsCreateMenuOpen(false);
        // TODO: Navigate to create All Hands
      }
    },
  ];

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`h-screen border-r transition-all duration-300 ${
        isExpanded ? 'w-60' : 'w-[72px]'
      } ${
        isDark ? 'bg-[#1a1d29] border-[#363b4e]' : 'bg-white border-slate-200'
      } flex flex-col fixed left-0 top-0 z-40`}
    >
      {/* Logo */}
      <div className={`border-b border-inherit flex items-center justify-center ${isExpanded ? 'p-6' : 'py-5 px-3'}`}>
        <img 
          src={isExpanded ? parleyLogo : parleyLogoIcon} 
          alt="Parley" 
          className={`transition-all duration-300 ${isExpanded ? 'h-14' : 'h-10'} w-auto object-contain`}
        />
      </div>

      {/* Top Navigation Items - Centered */}
      <nav className="flex-1 px-3 overflow-y-auto flex flex-col justify-center">
        <div className="space-y-2">
          {topNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.active;
            
            return (
              <button
                key={index}
                onClick={() => {
                  if (item.tab && onNavigate) {
                    onNavigate(item.tab);
                  }
                }}
                disabled={!item.tab}
                className={`w-full flex items-center ${isExpanded ? 'gap-4 justify-start px-4' : 'justify-center px-3'} py-3 rounded-xl transition-all relative ${
                  isActive
                    ? isDark
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'bg-purple-100 text-purple-600'
                    : isDark
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                } ${!item.tab ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="relative shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {isExpanded && (
                  <span
                    className={`font-medium whitespace-nowrap overflow-hidden ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Create Button - Separated */}
        <div 
          className="mt-8 relative"
          onMouseEnter={() => setIsCreateMenuOpen(true)}
          onMouseLeave={() => setIsCreateMenuOpen(false)}
        >
          <button
            className={`w-full flex items-center ${isExpanded ? 'justify-center gap-3' : 'justify-center'} px-4 py-3.5 rounded-xl transition-all relative ${
              isCreateMenuOpen
                ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white shadow-lg'
                : isDark
                ? 'bg-gradient-to-r from-purple-600/90 via-pink-500/90 to-orange-500/90 text-white hover:from-purple-600 hover:via-pink-500 hover:to-orange-500 shadow-md'
                : 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:shadow-lg shadow-md'
            }`}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            {isExpanded && <span className="font-semibold">The Lighthouse</span>}
          </button>

          {/* Hover Menu */}
          <AnimatePresence>
            {isCreateMenuOpen && (
              <>
                {/* Compact Hover Menu - Right next to button */}
                {createPortal(
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30
                    }}
                    onMouseEnter={() => setIsCreateMenuOpen(true)}
                    onMouseLeave={() => setIsCreateMenuOpen(false)}
                    className={`fixed ${isExpanded ? 'left-60' : 'left-20'} top-1/2 -translate-y-1/2 z-[60] ${ 
                      isDark ? 'bg-[#1e2130]' : 'bg-white'
                    } shadow-2xl backdrop-blur-xl ${ 
                      isDark ? 'bg-opacity-98' : 'bg-opacity-98'
                    } border-y border-r ${
                      isDark ? 'border-[#363b4e]' : 'border-slate-200'
                    } rounded-r-2xl overflow-hidden`}
                  >
                    <div className="py-2 pr-2">
                      {createOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.06 }}
                          >
                            <button
                              onClick={option.onClick}
                              className={`w-full flex items-center gap-3 pl-4 pr-6 py-3 transition-all group relative overflow-hidden ${
                                isDark
                                  ? 'hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-transparent text-slate-300'
                                  : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent text-slate-700'
                              }`}
                            >
                              {/* Gradient accent bar */}
                              <div 
                                className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                              />
                              
                              {/* Icon with gradient background on hover */}
                              <div className={`relative p-2.5 rounded-xl transition-all ${
                                isDark
                                  ? 'bg-slate-800/50 group-hover:bg-gradient-to-br group-hover:' + option.gradient
                                  : 'bg-slate-100 group-hover:bg-gradient-to-br group-hover:' + option.gradient
                              }`}>
                                <Icon 
                                  className={`w-4 h-4 transition-colors ${
                                    isDark 
                                      ? 'text-slate-400 group-hover:text-white' 
                                      : 'text-slate-600 group-hover:text-white'
                                  }`} 
                                  strokeWidth={2} 
                                />
                              </div>
                              
                              {/* Label */}
                              <span className={`font-medium text-sm whitespace-nowrap transition-colors ${
                                isDark
                                  ? 'group-hover:text-purple-300'
                                  : 'group-hover:text-purple-700'
                              }`}>
                                {option.label}
                              </span>
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>,
                  document.body
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Bottom Navigation Items */}
      <div className="px-3 pb-3">
        <div className="space-y-1 mb-3">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.active;
            
            return (
              <button
                key={index}
                onClick={() => {
                  if (item.tab && onNavigate) {
                    onNavigate(item.tab);
                  }
                }}
                disabled={!item.tab}
                className={`w-full flex items-center ${isExpanded ? 'gap-4 justify-start px-4' : 'justify-center px-3'} py-3 rounded-xl transition-all relative ${
                  isActive
                    ? isDark
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-900'
                    : isDark
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                } ${!item.tab ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="relative shrink-0">
                  {item.label === 'Profile' && userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt="Profile" 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  )}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{item.badge > 9 ? '9+' : item.badge}</span>
                    </div>
                  )}
                </div>
                {isExpanded && (
                  <span className="font-medium whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <div className="pt-3 border-t border-inherit">
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${isExpanded ? 'gap-4 justify-start px-4' : 'justify-center px-3'} py-3 rounded-xl transition-all ${
              isDark
                ? 'text-slate-400 hover:bg-red-500/10 hover:text-red-400'
                : 'text-slate-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <LogOut className="w-6 h-6 shrink-0" />
            {isExpanded && (
              <span className="font-medium whitespace-nowrap overflow-hidden">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}