import { ArrowLeft, Store, CheckCircle, Star, Users, Plus } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface MyMarketplaceListingProps {
  hasListing?: boolean;
  onBack?: () => void;
  onCreateListing?: () => void;
  onLogout?: () => void;
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings') => void;
  onCreatePost?: () => void;
}

export function MyMarketplaceListing({ 
  hasListing = false, 
  onBack,
  onCreateListing, 
  onLogout, 
  onNavigate,
  onCreatePost 
}: MyMarketplaceListingProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {/* Left Sidebar */}
      <LeftSidebar
        onCreatePost={() => onCreatePost?.()}
        onLogout={() => onLogout?.()}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="settings"
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
              <div className="flex items-center gap-4 px-4 py-4">
                <button
                  onClick={onBack}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  My Marketplace Listing
                </h1>
              </div>
            </div>

            {/* Content */}
            {!hasListing ? (
              // Empty State
              <div className="flex flex-col items-center justify-center px-6 py-20">
                <div className="w-32 h-32 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-8">
                  <Store className="w-16 h-16 text-purple-600" strokeWidth={1.5} />
                </div>
                
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  No Listing Yet
                </h2>
                
                <p className={`text-center mb-8 max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Create your marketplace listing to showcase your services to potential clients and grow your business.
                </p>
                
                <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all" onClick={onCreateListing}>
                  <Plus className="w-5 h-5" />
                  Create Your First Listing
                </button>
              </div>
            ) : (
              // Active Listing State
              <div className="p-6 space-y-6">
                {/* Status Banner */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-700 dark:text-green-300">
                      Published & Live
                    </span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Updated Jan 15
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    TalentFlow Pro - AI Recruitment Platform
                  </h2>
                  <p className={`text-base mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Transform your hiring process with intelligent automation
                  </p>
                  
                  {/* Category Tag */}
                  <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-500/20 rounded-full">
                    <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                      Recruitment & Talent Acquisition
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div>
                  <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Description
                  </h3>
                  <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    TalentFlow Pro is a comprehensive AI-powered recruitment platform designed to streamline your entire hiring workflow. From intelligent candidate sourcing to automated screening and interview scheduling, our platform helps HR teams save time while finding the perfect candidates. Built with enterprise-grade security and seamless integrations with major ATS systems.
                  </p>
                </div>

                {/* Key Features Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-purple-600" />
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Key Features
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {[
                      'AI-powered candidate matching',
                      'Automated resume screening',
                      'Video interview scheduling',
                      'Real-time collaboration tools',
                      'Analytics & reporting dashboard',
                      'ATS integration',
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Ideal For
                    </h3>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <p className={`mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Growing startups (50-500 employees)
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Enterprise HR teams',
                        'Recruitment agencies',
                        'Talent acquisition specialists',
                      ].map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1.5 rounded-lg text-sm ${
                            isDark 
                              ? 'bg-slate-700 text-slate-300' 
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="pt-4">
                  <button className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                    isDark 
                      ? 'bg-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}>
                    Edit Listing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}