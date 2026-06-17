import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Shield, 
  Activity, 
  Settings as SettingsIcon, 
  Sun, 
  Bell, 
  Globe, 
  Accessibility,
  Key,
  Lock,
  Filter,
  Mail,
  AtSign,
  MessageCircle,
  Share2,
  HelpCircle,
  FileText,
  ChevronRight,
  Store
} from 'lucide-react';
import { LeftSidebar } from './social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../constants/userData';

interface SettingsProps {
  onLogout?: () => void;
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings') => void;
  onCreatePost?: () => void;
  onMarketplaceListing?: () => void;
}

export function Settings({ onLogout, onNavigate, onCreatePost, onMarketplaceListing }: SettingsProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const accountSettings = [
    {
      icon: Shield,
      iconBg: 'from-purple-500 to-pink-500',
      title: 'Verification',
      subtitle: 'Get verified as an HR professional',
      hasArrow: true,
    },
    {
      icon: Activity,
      iconBg: 'from-blue-500 to-cyan-500',
      title: 'Your Activity',
      subtitle: 'View and manage your activity',
      hasArrow: true,
    },
    {
      icon: Store,
      iconBg: 'from-slate-600 to-slate-700',
      title: 'Marketplace Listing',
      subtitle: null,
      hasArrow: true,
    },
  ];

  const appSettings = [
    {
      icon: SettingsIcon,
      iconBg: 'bg-slate-600',
      title: 'General',
      subtitle: 'App preferences and settings',
      hasArrow: true,
    },
    {
      icon: Sun,
      iconBg: 'from-purple-500 to-indigo-500',
      title: 'Appearance',
      subtitle: null,
      hasToggle: true,
    },
    {
      icon: Bell,
      iconBg: 'from-orange-500 to-red-500',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      hasArrow: true,
    },
    {
      icon: Globe,
      iconBg: 'from-green-500 to-emerald-500',
      title: 'Language',
      subtitle: 'English',
      hasArrow: true,
    },
    {
      icon: Accessibility,
      iconBg: 'from-cyan-500 to-blue-500',
      title: 'Accessibility',
      subtitle: 'Text size and motion controls',
      hasArrow: true,
    },
  ];

  const privacySettings = [
    {
      icon: Key,
      iconBg: 'from-orange-500 to-amber-500',
      title: 'Password & Security',
      subtitle: 'Manage password and login security',
      hasArrow: true,
    },
    {
      icon: Lock,
      iconBg: 'from-purple-500 to-pink-500',
      title: 'Account Privacy',
      subtitle: 'Control profile visibility and activity status',
      hasArrow: true,
    },
    {
      icon: Filter,
      iconBg: 'from-blue-500 to-indigo-500',
      title: 'Content Preferences',
      subtitle: 'Manage feed and sensitive content',
      hasArrow: true,
    },
  ];

  const interactionSettings = [
    {
      icon: Mail,
      iconBg: 'from-indigo-500 to-purple-500',
      title: 'Messages & Replies',
      subtitle: null,
      hasArrow: true,
    },
    {
      icon: AtSign,
      iconBg: 'from-pink-500 to-rose-500',
      title: 'Tags & Mentions',
      subtitle: null,
      hasArrow: true,
    },
    {
      icon: MessageCircle,
      iconBg: 'from-green-500 to-teal-500',
      title: 'Comments',
      subtitle: null,
      hasArrow: true,
    },
    {
      icon: Share2,
      iconBg: 'from-orange-500 to-red-500',
      title: 'Sharing & Reuse',
      subtitle: null,
      hasArrow: true,
    },
  ];

  const aboutSettings = [
    {
      icon: HelpCircle,
      iconBg: 'from-blue-500 to-cyan-500',
      title: 'Help and Feedback',
      subtitle: null,
      hasArrow: true,
    },
    {
      icon: FileText,
      iconBg: 'from-teal-500 to-cyan-500',
      title: 'Terms & Policies',
      subtitle: null,
      hasArrow: true,
      hasGlobe: true,
    },
    {
      icon: () => (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">P</span>
        </div>
      ),
      iconBg: 'from-purple-500 to-indigo-500',
      title: 'About Parley',
      subtitle: null,
      hasArrow: true,
    },
  ];

  const SettingItem = ({ item }: { item: any }) => {
    const Icon = item.icon;
    const isGradient = item.iconBg.includes('from-');

    const handleClick = () => {
      if (item.hasToggle) {
        toggleTheme();
      } else if (item.title === 'Marketplace Listing') {
        onMarketplaceListing?.();
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-4 px-4 py-4 transition-colors ${ 
          isDark 
            ? 'hover:bg-slate-800/50 active:bg-slate-800' 
            : 'hover:bg-slate-50 active:bg-slate-100'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
            isGradient ? `bg-gradient-to-br ${item.iconBg}` : item.iconBg
          }`}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        
        <div className="flex-1 min-w-0 text-left">
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {item.title}
          </div>
          {item.subtitle && (
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {item.subtitle}
            </div>
          )}
        </div>

        {item.hasToggle && (
          <div
            className={`w-12 h-7 rounded-full transition-colors relative ${
              isDark ? 'bg-purple-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                isDark ? 'right-1' : 'left-1'
              }`}
            >
              <Sun className="w-3 h-3 text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}

        {item.hasGlobe && (
          <Globe className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
        )}

        {item.hasArrow && (
          <ChevronRight className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
        )}
      </button>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className={`px-4 py-3 text-xs font-bold tracking-wider ${
      isDark ? 'text-slate-500' : 'text-slate-400'
    }`}>
      {title}
    </div>
  );

  return (
    <>
      {/* Left Sidebar */}
      <LeftSidebar
        onCreatePost={() => onCreatePost?.()}
        onLogout={() => onLogout?.()}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="home"
        onNavigate={(tab) => onNavigate?.(tab)}
      />

      <div className="ml-[72px]">
        <div className={`min-h-screen flex items-start justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
          {/* Fixed-width Mobile Canvas */}
          <div className="w-full max-w-[600px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#ffffff' }}>
            {/* Header */}
            <div className={`sticky top-0 z-30 border-b ${
              isDark ? 'border-slate-800 bg-[#1a1d29]' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-center px-4 py-4">
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Settings
                </h1>
              </div>
            </div>

            {/* Settings Content */}
            <div className="pb-8">
              {/* ACCOUNT Section */}
              <SectionHeader title="ACCOUNT" />
              <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {accountSettings.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index < accountSettings.length - 1
                        ? isDark
                          ? 'border-b border-slate-800'
                          : 'border-b border-slate-200'
                        : ''
                    }`}
                  >
                    <SettingItem item={item} />
                  </div>
                ))}
              </div>

              {/* APP SETTINGS Section */}
              <SectionHeader title="APP SETTINGS" />
              <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {appSettings.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index < appSettings.length - 1
                        ? isDark
                          ? 'border-b border-slate-800'
                          : 'border-b border-slate-200'
                        : ''
                    }`}
                  >
                    <SettingItem item={item} />
                  </div>
                ))}
              </div>

              {/* PRIVACY & SECURITY Section */}
              <SectionHeader title="PRIVACY & SECURITY" />
              <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {privacySettings.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index < privacySettings.length - 1
                        ? isDark
                          ? 'border-b border-slate-800'
                          : 'border-b border-slate-200'
                        : ''
                    }`}
                  >
                    <SettingItem item={item} />
                  </div>
                ))}
              </div>

              {/* INTERACTIONS Section */}
              <SectionHeader title="INTERACTIONS" />
              <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                {interactionSettings.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index < interactionSettings.length - 1
                        ? isDark
                          ? 'border-b border-slate-800'
                          : 'border-b border-slate-200'
                        : ''
                    }`}
                  >
                    <SettingItem item={item} />
                  </div>
                ))}
              </div>

              {/* ABOUT Section */}
              <SectionHeader title="ABOUT" />
              <div>
                {aboutSettings.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      index < aboutSettings.length - 1
                        ? isDark
                          ? 'border-b border-slate-800'
                          : 'border-b border-slate-200'
                        : ''
                    }`}
                  >
                    <SettingItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}