import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Home, User, Lock, Target, Layers, Eye, Rocket, 
  CheckCircle, ChevronDown, ChevronUp, Settings, Sun, Moon, MessageSquare,
  Briefcase, ShoppingBag, Store, FileText, Package
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type AuthStep = 
  | 'splash'
  | 'role-selection'
  | 'authentication'
  | 'service-provider-welcome'
  | 'profile-setup'
  | 'interest-tags'
  | 'home'
  | 'decision-rooms'
  | 'marketplace'
  | 'user-profile'
  | 'service-vendor-profile-empty'
  | 'service-vendor-profile-full'
  | 'settings'
  | 'marketplace-listing-empty'
  | 'marketplace-listing-full'
  | 'create-listing-form'
  | 'listing-preview'
  | 'vendor-detail-subscribed'
  | 'vendor-detail-unsubscribed-owner'
  | 'vendor-detail-unsubscribed-public';

interface DemoNavigationPanelProps {
  currentStep: AuthStep;
  onNavigate: (step: AuthStep) => void;
}

interface NavigationItem {
  id: AuthStep;
  label: string;
  icon: React.ElementType;
  description: string;
  category: 'auth' | 'onboarding' | 'app';
  gradient?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'splash',
    label: 'Splash Screen',
    icon: Rocket,
    description: 'Welcome screen with login/signup',
    category: 'auth',
  },
  {
    id: 'authentication',
    label: 'Authentication',
    icon: Lock,
    description: 'Email/Social Login + OTP',
    category: 'auth',
  },
  {
    id: 'role-selection',
    label: 'Role Selection',
    icon: Target,
    description: 'Choose user role',
    category: 'auth',
  },
  {
    id: 'service-provider-welcome',
    label: 'HR Provider Welcome',
    icon: User,
    description: 'Welcome screen for HR providers',
    category: 'auth',
  },
  {
    id: 'profile-setup',
    label: 'Profile Setup',
    icon: User,
    description: 'Quick profile creation',
    category: 'onboarding',
  },
  {
    id: 'interest-tags',
    label: 'Interest Tags',
    icon: Layers,
    description: 'Select topics of interest',
    category: 'onboarding',
  },
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    description: 'Main application',
    category: 'app',
  },
  {
    id: 'decision-rooms',
    label: 'All Hands',
    icon: MessageSquare,
    description: 'Collaborative decision-making spaces',
    category: 'app',
    gradient: 'from-orange-500 to-pink-500',
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    icon: ShoppingBag,
    description: 'HR provider marketplace',
    category: 'app',
  },
  {
    id: 'user-profile',
    label: 'User Profile',
    icon: User,
    description: 'User profile with details',
    category: 'app',
  },
  {
    id: 'service-vendor-profile-empty',
    label: 'Service Vendor Profile (Empty)',
    icon: Briefcase,
    description: 'Just onboarded, no data yet',
    category: 'app',
  },
  {
    id: 'service-vendor-profile-full',
    label: 'Service Vendor Profile (Full)',
    icon: Briefcase,
    description: 'Fully fledged with complete data',
    category: 'app',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Application settings',
    category: 'app',
  },
  {
    id: 'marketplace-listing-empty',
    label: 'My Marketplace Listing (Empty)',
    icon: Store,
    description: 'No listing created yet',
    category: 'app',
  },
  {
    id: 'marketplace-listing-full',
    label: 'My Marketplace Listing (Active)',
    icon: FileText,
    description: 'Published listing with details',
    category: 'app',
  },
  {
    id: 'create-listing-form',
    label: 'Create Listing Form',
    icon: FileText,
    description: 'Form to create a new listing',
    category: 'app',
  },
  {
    id: 'listing-preview',
    label: 'Listing Preview',
    icon: FileText,
    description: 'Preview of the listing before publishing',
    category: 'app',
  },
  {
    id: 'vendor-detail-subscribed',
    label: 'Vendor Detail (Subscribed)',
    icon: FileText,
    description: 'Vendor details for subscribed users',
    category: 'app',
  },
  {
    id: 'vendor-detail-unsubscribed-owner',
    label: 'Vendor Detail (Unsubscribed - Owner)',
    icon: FileText,
    description: 'Vendor details for unsubscribed users (owner view)',
    category: 'app',
  },
  {
    id: 'vendor-detail-unsubscribed-public',
    label: 'Vendor Detail (Unsubscribed - Public)',
    icon: FileText,
    description: 'Vendor details for unsubscribed users (public view)',
    category: 'app',
  },
];

const categoryLabels = {
  auth: 'Authentication Flow',
  onboarding: 'Onboarding Flow',
  app: 'Main Application',
};

export function DemoNavigationPanel({ currentStep, onNavigate }: DemoNavigationPanelProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    auth: true,
    onboarding: true,
    app: true,
  });

  // Draggable position state - default top-right
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('demo-nav-position');
    if (saved) {
      return JSON.parse(saved);
    }
    return { top: 24, right: 24 }; // Default top-right corner
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Save position to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('demo-nav-position', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (position.left ?? window.innerWidth - position.right! - 64),
      y: e.clientY - (position.top ?? window.innerHeight - position.bottom! - 64),
    });
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const x = e.clientX - dragStart.x;
      const y = e.clientY - dragStart.y;

      // Calculate position from top-left
      const newPosition = {
        top: Math.max(0, Math.min(y, window.innerHeight - 64)),
        left: Math.max(0, Math.min(x, window.innerWidth - 64)),
      };

      setPosition(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleNavigate = (step: AuthStep) => {
    onNavigate(step);
    setIsOpen(false);
  };

  const groupedItems = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          // Only trigger onClick if not dragging
          if (!isDragging) {
            setIsOpen(!isOpen);
          }
        }}
        style={{
          top: position.top !== undefined ? `${position.top}px` : undefined,
          left: position.left !== undefined ? `${position.left}px` : undefined,
          right: position.right !== undefined ? `${position.right}px` : undefined,
          bottom: position.bottom !== undefined ? `${position.bottom}px` : undefined,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className={`fixed z-[10000] p-4 rounded-full shadow-2xl backdrop-blur-xl border-2 transition-all ${
          isDark 
            ? 'bg-slate-800/90 border-purple-500/50 text-white hover:border-purple-400' 
            : 'bg-white/90 border-purple-300 text-slate-900 hover:border-purple-500'
        }`}
        whileHover={{ scale: isDragging ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative">
          <Settings className={`w-6 h-6 ${isDragging ? '' : 'animate-spin-slow'}`} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full animate-pulse" />
        </div>
      </motion.button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 bottom-0 w-full max-w-md z-[9999] shadow-2xl ${
                isDark ? 'bg-slate-900' : 'bg-white'
              }`}
            >
              {/* Header */}
              <div className={`p-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg flex items-center justify-center">
                      <Menu className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Demo Navigation
                      </h2>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Quick jump to any screen
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Theme Toggle Button */}
                    <motion.button
                      onClick={toggleTheme}
                      className={`p-2 rounded-lg transition-all ${
                        isDark 
                          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                      {isDark ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </motion.button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Current Screen Indicator */}
                <div className={`mt-4 p-3 rounded-xl ${
                  isDark ? 'bg-purple-500/10 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full animate-pulse" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                      Current: {navigationItems.find(item => item.id === currentStep)?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="overflow-y-auto h-[calc(100vh-180px)] p-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className={`w-full flex items-center justify-between mb-3 p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </span>
                      {expandedCategories[category] ? (
                        <ChevronUp className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      ) : (
                        <ChevronDown className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      )}
                    </button>

                    {/* Category Items */}
                    <AnimatePresence>
                      {expandedCategories[category] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2"
                        >
                          {items.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentStep === item.id;

                            return (
                              <motion.button
                                key={item.id}
                                onClick={() => handleNavigate(item.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                                  isActive
                                    ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white border-transparent shadow-lg'
                                    : isDark
                                    ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-300 hover:bg-slate-800'
                                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-lg ${
                                    isActive
                                      ? 'bg-white/20'
                                      : isDark
                                      ? 'bg-slate-700'
                                      : 'bg-white'
                                  }`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-sm">
                                        {item.label}
                                      </h3>
                                      {isActive && (
                                        <CheckCircle className="w-4 h-4" />
                                      )}
                                    </div>
                                    <p className={`text-xs ${
                                      isActive
                                        ? 'text-white/80'
                                        : isDark
                                        ? 'text-slate-500'
                                        : 'text-slate-500'
                                    }`}>
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={`p-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  💡 Tip: Use this panel to quickly test different screens
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}