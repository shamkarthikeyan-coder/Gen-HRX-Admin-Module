import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { 
  MapPin, Edit2, Grid3x3, FileText, BarChart3, Settings, ArrowLeft, MoreVertical, Plus
} from 'lucide-react';
import { Button } from '../ui/button';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface ServiceVendorProfileEmptyProps {
  onBack?: () => void;
}

export function ServiceVendorProfileEmpty({ onBack }: ServiceVendorProfileEmptyProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'posts' | 'services' | 'analytics'>('posts');

  const vendorData = {
    companyName: 'My Company',
    tagline: '',
    bio: '',
    verified: false,
    location: '',
    stats: {
      posts: 0,
      followers: 0,
      following: 0,
    },
  };

  const tabs = [
    { id: 'posts' as const, icon: Grid3x3 },
    { id: 'services' as const, icon: FileText },
    { id: 'analytics' as const, icon: BarChart3 },
  ];

  return (
    <>
      <LeftSidebar
        onCreatePost={() => {}}
        onLogout={() => {}}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="profile"
        onNavigate={() => {}}
        onProfileClick={() => {}}
      />

      <div className="ml-[72px]">
        <div className={`min-h-screen flex items-start justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
          {/* Fixed-width Mobile Canvas */}
          <div className="w-full max-w-[600px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#f5f5f5' }}>
            
            {/* Header Navigation */}
            <div className={`fixed top-0 w-full max-w-[600px] h-14 flex items-center justify-center px-4 z-10 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`} style={{ left: 'calc(50% + 36px)', transform: 'translateX(-50%)' }}>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {vendorData.companyName}
              </span>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-14"></div>

            {/* Default Gray Banner - Edge to Edge with Buttons */}
            <div className={`relative h-52 ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}>
              {/* Edit Button - Top Right */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors">
                <Edit2 className="w-5 h-5 text-white" />
              </button>
              
              {/* Add Cover Photo hint */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-12 h-12 text-white/50 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-sm text-white/70">Add Cover Photo</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
              {/* Company Logo - Centered and Overlapping Banner */}
              <div className="relative -mt-16 mb-3 flex justify-center">
                <div className="relative">
                  <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${isDark ? 'border-[#1a1d29] bg-slate-700' : 'border-white bg-slate-300'}`}>
                    {/* Default letter logo */}
                    <span className={`text-5xl font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>?</span>
                  </div>
                  {/* Add button */}
                  <button className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-purple-600 hover:bg-purple-700 border-4 border-[#1a1d29] flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Company Info - Centered with prompt to complete */}
              <div className="text-center mb-6 px-3">
                <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {vendorData.companyName}
                </h1>
                <p className={`text-sm mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Add your tagline
                </p>
                <p className={`text-sm max-w-sm mx-auto ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Tell people about your company
                </p>
              </div>

              {/* Stats Grid - 3 Rounded Boxes with zeros */}
              <div className="grid grid-cols-3 gap-2 mb-6 px-3">
                <div className={`text-center py-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    0
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Posts
                  </div>
                </div>
                <div className={`text-center py-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    0
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Followers
                  </div>
                </div>
                <div className={`text-center py-4 rounded-2xl ${isDark ? 'bg-[#252838]' : 'bg-slate-50'}`}>
                  <div className={`text-2xl font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    0
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Following
                  </div>
                </div>
              </div>

              {/* Edit Profile Button - Full Width */}
              <div className="px-3 mb-6">
                <Button 
                  className="w-full h-11 font-semibold bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white border-0"
                >
                  Complete Your Profile
                </Button>
              </div>

              {/* Tabs - Centered */}
              <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="grid grid-cols-3">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative flex items-center justify-center py-3"
                      >
                        <Icon className={`w-6 h-6 ${
                          isActive 
                            ? isDark ? 'text-slate-900' : 'text-slate-900'
                            : isDark 
                              ? 'text-slate-500' 
                              : 'text-slate-400'
                        }`} strokeWidth={isActive ? 2.5 : 2} />
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content - Getting started prompts */}
              <div className="py-16">
                {activeTab === 'posts' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center px-6"
                  >
                    <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                      isDark ? 'bg-purple-500/10' : 'bg-purple-100'
                    }`}>
                      <Grid3x3 className="w-10 h-10 text-purple-600" strokeWidth={2} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Share Your First Post
                    </h3>
                    <p className={`text-sm max-w-xs mx-auto mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Introduce your company and services to<br />the Parley community
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
                      Create Your First Post
                    </Button>
                  </motion.div>
                )}

                {activeTab === 'services' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center px-6"
                  >
                    <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                      isDark ? 'bg-purple-500/10' : 'bg-purple-100'
                    }`}>
                      <FileText className="w-10 h-10 text-purple-600" strokeWidth={2} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Add Your Services
                    </h3>
                    <p className={`text-sm max-w-xs mx-auto mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      List the HR services you offer so<br />professionals can find you
                    </p>
                    <Button className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white">
                      Add Services
                    </Button>
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center px-6"
                  >
                    <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                      isDark ? 'bg-purple-500/10' : 'bg-purple-100'
                    }`}>
                      <BarChart3 className="w-10 h-10 text-purple-600" strokeWidth={2} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Track Your Growth
                    </h3>
                    <p className={`text-sm max-w-xs mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Analytics will appear once you start<br />posting and engaging
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
