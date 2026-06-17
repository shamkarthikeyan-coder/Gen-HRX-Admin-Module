import { ArrowLeft, CheckCircle, Star, Users, Edit } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface ListingPreviewProps {
  listingData: any;
  onBack?: () => void;
  onPublish?: () => void;
  onEdit?: () => void;
  onLogout?: () => void;
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings') => void;
  onCreatePost?: () => void;
}

export function ListingPreview({ 
  listingData,
  onBack, 
  onPublish,
  onEdit,
  onLogout, 
  onNavigate,
  onCreatePost 
}: ListingPreviewProps) {
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
          <div className="w-full max-w-[600px] min-h-screen pb-24" style={{ backgroundColor: isDark ? '#1a1d29' : '#ffffff' }}>
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
                  Preview Listing
                </h1>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 space-y-6">
              {/* Preview Notice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Preview Mode
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      This is how your listing will appear to potential clients. Review carefully before publishing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Banner (Draft) */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                    Draft
                  </span>
                </div>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Not yet published
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  TechFlow Solutions
                </h2>
                <p className={`text-base mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {listingData.tagline}
                </p>
                
                {/* Category Tag */}
                <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-500/20 rounded-full">
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    {listingData.category === 'recruitment' && 'Recruitment & Talent Acquisition'}
                    {listingData.category === 'learning' && 'Learning & Development'}
                    {listingData.category === 'payroll' && 'Payroll & Benefits'}
                    {listingData.category === 'performance' && 'Performance Management'}
                    {listingData.category === 'engagement' && 'Employee Engagement'}
                    {listingData.category === 'analytics' && 'HR Analytics'}
                  </span>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Description
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {listingData.description}
                </p>
              </div>

              {/* Key Features Section */}
              {listingData.keyFeatures && listingData.keyFeatures.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-purple-600" />
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Key Features
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {listingData.keyFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* KPIs Section */}
              {listingData.kpis && listingData.kpis.length > 0 && (
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {listingData.kpis.map((kpi: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
                      >
                        <p className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {kpi.value}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {kpi.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Section */}
              {listingData.plans && listingData.plans.length > 0 && (
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Pricing Plans
                  </h3>
                  <div className="space-y-3">
                    {listingData.plans.map((plan: any, index: number) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {plan.name}
                          </h4>
                          <span className="text-lg font-bold text-purple-600">
                            {plan.price}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature: string, fIndex: number) => (
                            <li key={fIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal For Section */}
              {listingData.idealFor && listingData.idealFor.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-purple-600" />
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Ideal For
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {listingData.idealFor.map((item: string, index: number) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          isDark 
                            ? 'bg-slate-700 text-slate-300' 
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Info */}
              {(listingData.foundedYear || listingData.activeClients) && (
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Company Information
                  </h3>
                  <div className={`p-4 rounded-xl space-y-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    {listingData.foundedYear && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Founded {listingData.foundedYear}
                          </p>
                        </div>
                      </div>
                    )}
                    {listingData.activeClients && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Trusted by {listingData.activeClients} companies
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${
              isDark ? 'bg-[#1a1d29] border-slate-800' : 'bg-white border-slate-200'
            }`} style={{ marginLeft: '72px', maxWidth: '600px' }}>
              <div className="flex gap-3">
                <button
                  onClick={onEdit}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
                    isDark 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-300'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={onPublish}
                  className="flex-1 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
                >
                  Publish Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
