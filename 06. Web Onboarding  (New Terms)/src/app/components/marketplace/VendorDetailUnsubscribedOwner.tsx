import { ArrowLeft, Globe, Lock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface VendorDetailUnsubscribedOwnerProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (tab: string) => void;
  onCreatePost: () => void;
  onSubscribe: () => void;
}

export function VendorDetailUnsubscribedOwner({ onBack, onLogout, onNavigate, onCreatePost, onSubscribe }: VendorDetailUnsubscribedOwnerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
      {/* Left Sidebar */}
      <LeftSidebar 
        activeTab="marketplace" 
        onTabChange={onNavigate}
        onCreatePost={onCreatePost}
        onLogout={onLogout}
        avatar={LOGGED_IN_USER_AVATAR}
      />

      {/* Main Content Area - Scrollable with centered layout */}
      <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
        <div className="flex items-start justify-center min-h-full">
          {/* Fixed-width centered container */}
          <div className="w-full max-w-[600px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#ffffff' }}>
            {/* Header */}
            <div className={`sticky top-0 z-10 ${isDark ? 'bg-[#1a1d29] border-[#363b4e]' : 'bg-white border-slate-200'} border-b`}>
              <div className="px-4 py-4 flex items-center gap-4">
                <button
                  onClick={onBack}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                >
                  <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-900'}`} />
                </button>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Vendor Details
                </h1>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-6">
              {/* Hero Card */}
              <div className={`rounded-2xl overflow-hidden mb-6 ${isDark ? 'bg-gradient-to-br from-orange-500/10 to-purple-500/10' : 'bg-gradient-to-br from-orange-50 to-purple-50'}`}>
                <div className="p-8">
                  {/* Logo & Title */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        T
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          TalentFlow Pro
                        </h2>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-semibold mb-3">
                        HRMS
                      </div>
                      <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Complete HR transformation for modern enterprises
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  About TalentFlow Pro
                </h3>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  TalentFlow Pro is an enterprise-grade HRMS platform that streamlines every aspect of human resource management. From onboarding to offboarding, we help organizations build better workplaces through intelligent automation, data-driven insights, and seamless integrations.
                </p>

                {/* Website Link */}
                <div className="flex items-start gap-3">
                  <Globe className={`w-5 h-5 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <div>
                    <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Website
                    </div>
                    <a 
                      href="https://talentflowpro.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      https://talentflowpro.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Locked Content Card */}
              <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <p className={`text-base mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Subscribe to add more details and publish full profile.
                  </p>
                  <button
                    onClick={onSubscribe}
                    className="px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition-colors"
                  >
                    Subscribe to Add More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}