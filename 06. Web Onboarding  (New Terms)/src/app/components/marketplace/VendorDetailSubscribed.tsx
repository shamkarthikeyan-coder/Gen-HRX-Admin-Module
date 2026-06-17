import { ArrowLeft, Globe, Users, MapPin, Shield, Zap, CheckCircle2, BarChart3, Award, Calendar, TrendingUp, Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';
import { useState } from 'react';

interface VendorDetailSubscribedProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (tab: string) => void;
  onCreatePost: () => void;
  vendor?: {
    id: string;
    name: string;
    category: string;
    icon: string;
    color: string;
    isVerified: boolean;
  };
}

export function VendorDetailSubscribed({ onBack, onLogout, onNavigate, onCreatePost, vendor }: VendorDetailSubscribedProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Use vendor data or fallback to default (TalentFlow Pro)
  const vendorName = vendor?.name || 'TalentFlow Pro';
  const vendorIcon = vendor?.icon || 'T';
  const vendorCategory = vendor?.category || 'HRMS';
  const vendorIsVerified = vendor?.isVerified !== undefined ? vendor.isVerified : true;

  // State for review modal
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
      {/* Left Sidebar */}
      <LeftSidebar 
        activeTab="marketplace" 
        onTabChange={onNavigate}
        onCreatePost={onCreatePost}
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
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center shrink-0">
                      <span className="text-2xl font-bold bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent">
                        {vendorIcon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {vendorName}
                        </h2>
                        {vendorIsVerified && (
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-semibold mb-3">
                        {vendorCategory}
                      </div>
                      <p className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Complete HR transformation for modern enterprises
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
                      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center mb-3">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        50K+
                      </div>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Active Users
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
                      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center mb-3">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        25+
                      </div>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Countries
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
                      <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center mb-3">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        99.9%
                      </div>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Uptime
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Screenshots */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Product Screenshots
                </h3>
                
                {/* Browser Mockup */}
                <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
                  <div className={`px-4 py-3 flex items-center gap-2 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className={`flex-1 px-3 py-1 rounded text-xs ${isDark ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-600'}`}>
                      https://talentflowpro.com
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Mock UI */}
                    <div className="space-y-4">
                      <div className={`h-3 w-32 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 rounded-lg bg-purple-200"></div>
                        <div className="h-24 rounded-lg bg-blue-200"></div>
                        <div className="h-24 rounded-lg bg-green-200"></div>
                      </div>
                      <div className={`h-2 w-full rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                      <div className={`h-2 w-3/4 rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {['Dashboard', 'Employees', 'Analytics', 'Settings'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark 
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* About Section */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  About {vendorName}
                </h3>
                <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {vendorName} is an enterprise-grade {vendorCategory} platform that streamlines every aspect of human resource management. From onboarding to offboarding, we help organizations build better workplaces through intelligent automation, data-driven insights, and seamless integrations.
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

              {/* Key Features */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Key Features
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    'Automated Payroll Processing',
                    'Performance Management',
                    'Time & Attendance Tracking',
                    'Benefits Administration',
                    'Compliance Management',
                    'Advanced Analytics & Reporting',
                    'Mobile App (iOS & Android)',
                    'API Integrations'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews & Ratings */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Reviews & Ratings
                </h3>
                
                {/* Rating Summary */}
                <div className="mb-6">
                  <div className="flex items-center gap-8">
                    {/* Average Rating */}
                    <div className="text-center">
                      <div className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        4.3
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= 4
                                ? 'fill-orange-500 text-orange-500'
                                : star === 5
                                ? 'fill-orange-500/30 text-orange-500/30'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        124 Reviews
                      </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="flex-1 space-y-2">
                      {[
                        { stars: 5, count: 78, percentage: 63 },
                        { stars: 4, count: 32, percentage: 26 },
                        { stars: 3, count: 10, percentage: 8 },
                        { stars: 2, count: 3, percentage: 2 },
                        { stars: 1, count: 1, percentage: 1 },
                      ].map(({ stars, count, percentage }) => (
                        <div key={stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              {stars}
                            </span>
                            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                          </div>
                          <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className={`text-xs w-8 text-right ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Horizontal Scrolling Reviews */}
                <div className="mb-6">
                  <div className="relative">
                    {/* Scroll Container */}
                    <div className="overflow-x-auto scrollbar-hide pb-4">
                      <div className="flex gap-4">
                        {[
                          {
                            name: 'Sarah Johnson',
                            role: 'HR Leader',
                            avatar: 'SJ',
                            rating: 5,
                            time: '2d',
                            review: 'Absolutely transformative for our HR operations. The automation features saved us countless hours, and the analytics dashboard provides insights we never had before.',
                          },
                          {
                            name: 'Michael Chen',
                            role: 'HR Professional',
                            avatar: 'MC',
                            rating: 4,
                            time: '1w',
                            review: 'Great platform overall. The interface is intuitive and the support team is responsive. Would love to see more customization options for reporting.',
                          },
                          {
                            name: 'Emily Rodriguez',
                            role: 'HR Leader',
                            avatar: 'ER',
                            rating: 5,
                            time: '2w',
                            review: 'Best investment we made this year. Seamless integration with our existing tools and the mobile app makes it easy to manage everything on the go.',
                          },
                          {
                            name: 'David Park',
                            role: 'HR Professional',
                            avatar: 'DP',
                            rating: 4,
                            time: '3w',
                            review: 'Solid platform with comprehensive features. The learning curve was minimal and our team adapted quickly. Performance tracking is especially impressive.',
                          },
                        ].map((review, index) => (
                          <div
                            key={index}
                            className={`flex-shrink-0 w-80 rounded-xl p-5 border ${
                              isDark
                                ? 'bg-slate-800/50 border-slate-700'
                                : 'bg-white border-slate-200'
                            } hover:shadow-lg transition-shadow`}
                          >
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                {review.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  {review.name}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {review.role}
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                                    ·
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {review.time}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'fill-orange-500 text-orange-500'
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Review Text */}
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              {review.review}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white dark:from-[#242833] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Write Review CTA */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold hover:shadow-lg transition-shadow px-[202px] py-[12px]"
                  >
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Pricing Plans */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Pricing Plans
                  </h3>
                </div>
                <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Per Employee/Month
                </p>

                <div className="space-y-4">
                  {/* Starter Plan */}
                  <div className={`rounded-xl p-6 border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
                    <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Starter
                    </h4>
                    <div className="text-3xl font-bold text-purple-600 mb-4">
                      $8
                    </div>
                    <div className="space-y-2">
                      {[
                        'Up to 50 employees',
                        'Core HR features',
                        'Email support'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth Plan - Popular */}
                  <div className={`rounded-xl p-6 border-2 relative ${isDark ? 'border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-purple-500/10' : 'border-orange-200 bg-gradient-to-br from-orange-50 to-purple-50'}`}>
                    <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                      POPULAR
                    </div>
                    <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Growth
                    </h4>
                    <div className="text-3xl font-bold text-purple-600 mb-4">
                      $15
                    </div>
                    <div className="space-y-2">
                      {[
                        'Up to 200 employees',
                        'All Starter features',
                        'Performance management',
                        'Priority support'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enterprise Plan */}
                  <div className={`rounded-xl p-6 border ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-200 bg-slate-50'}`}>
                    <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Enterprise
                    </h4>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-4">
                      Custom
                    </div>
                    <div className="space-y-2">
                      {[
                        'Unlimited employees',
                        'All Growth features',
                        'Custom integrations',
                        'Dedicated account manager'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ideal For */}
              <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Ideal For
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Mid-size companies',
                    'Enterprise organizations',
                    'Multi-location businesses',
                    'Remote teams',
                    'Scaling startups'
                  ].map((tag, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Information */}
              <div className={`rounded-2xl p-6 ${isDark ? 'bg-[#242833]' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Company Information
                </h3>
                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                    <div>
                      <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Location
                      </div>
                      <div className={`text-base font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        San Francisco, CA
                      </div>
                    </div>
                  </div>

                  {/* Founded */}
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                    <div>
                      <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Founded
                      </div>
                      <div className={`text-base font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        2018
                      </div>
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="flex items-start gap-3">
                    <Users className={`w-5 h-5 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                    <div>
                      <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Team Size
                      </div>
                      <div className={`text-base font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        150-200
                      </div>
                    </div>
                  </div>

                  {/* Active Clients */}
                  <div className="flex items-start gap-3">
                    <TrendingUp className={`w-5 h-5 mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                    <div>
                      <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Active Clients
                      </div>
                      <div className={`text-base font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        2,500+
                      </div>
                    </div>
                  </div>

                  {/* Website */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}