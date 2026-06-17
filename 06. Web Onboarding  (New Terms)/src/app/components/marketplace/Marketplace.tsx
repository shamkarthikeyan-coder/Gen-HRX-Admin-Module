import { useTheme } from '../../context/ThemeContext';
import { Bell, Search, Sparkles, X, ArrowRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface ProductCard {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  isVerified: boolean;
}

interface MarketplaceProps {
  onLogout?: () => void;
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile') => void;
  onCreatePost?: () => void;
  onVendorClick?: (vendor: ProductCard) => void;
}

const categories = ['All', 'Verified', 'HRMS', 'Payroll', 'Recruitment', 'Benefits', 'Performance', 'Learning & Development', 'Onboarding', 'Time & Attendance', 'Analytics', 'Compliance'];

const placeholderTexts = [
  'Describe what you\'re looking for -',
  'Find the perfect HRMS solution -',
  'Search for payroll tools -',
  'Looking for recruitment software?',
  'Need help with performance management?',
  'Explore learning & development tools -',
];

const marketplaceProducts: ProductCard[] = [
  { id: '1', name: 'TalentFlow Pro', category: 'HRMS', icon: 'T', color: 'bg-orange-50', isVerified: true },
  { id: '2', name: 'OmniHR Suite', category: 'HRMS', icon: 'O', color: 'bg-blue-50', isVerified: true },
  { id: '3', name: 'PeopleNest', category: 'HRMS', icon: 'P', color: 'bg-indigo-50', isVerified: true },
  { id: '4', name: 'Salaryfy', category: 'Payroll', icon: 'S', color: 'bg-cyan-50', isVerified: true },
  { id: '5', name: 'RecruiteXpert', category: 'Recruitment', icon: 'R', color: 'bg-green-50', isVerified: true },
  { id: '6', name: 'BenefitsHub', category: 'Benefits', icon: 'B', color: 'bg-purple-50', isVerified: true },
  { id: '7', name: 'PerformMax', category: 'Performance', icon: 'P', color: 'bg-pink-50', isVerified: false },
  { id: '8', name: 'LearnFlow', category: 'Learning', icon: 'L', color: 'bg-yellow-50', isVerified: true },
  { id: '9', name: 'TimeTracker Pro', category: 'Time Tracking', icon: 'T', color: 'bg-rose-50', isVerified: true },
  { id: '10', name: 'OnboardEase', category: 'Onboarding', icon: 'O', color: 'bg-teal-50', isVerified: false },
  { id: '11', name: 'PayrollGenius', category: 'Payroll', icon: 'P', color: 'bg-amber-50', isVerified: true },
  { id: '12', name: 'SkillBridge', category: 'Learning', icon: 'S', color: 'bg-lime-50', isVerified: true },
  { id: '13', name: 'ReviewCycle', category: 'Performance', icon: 'R', color: 'bg-emerald-50', isVerified: true },
  { id: '14', name: 'BenefitsPro', category: 'Benefits', icon: 'B', color: 'bg-violet-50', isVerified: false },
  { id: '15', name: 'TalentAcquire', category: 'Recruitment', icon: 'T', color: 'bg-fuchsia-50', isVerified: true },
  { id: '16', name: 'LeadershipHub', category: 'Learning', icon: 'L', color: 'bg-sky-50', isVerified: true },
  { id: '17', name: 'Organizer360', category: 'HRMS', icon: 'O', color: 'bg-orange-50', isVerified: true },
  { id: '18', name: 'PeopleFirst', category: 'HRMS', icon: 'P', color: 'bg-blue-50', isVerified: false },
];

export function Marketplace({ onLogout, onNavigate, onCreatePost, onVendorClick }: MarketplaceProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  // Rotate placeholder text every 3 seconds
  useEffect(() => {
    if (!isSearchExpanded) return;
    
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isSearchExpanded]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return marketplaceProducts;
    
    const query = searchQuery.toLowerCase();
    return marketplaceProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      {/* Left Sidebar */}
      <LeftSidebar
        onCreatePost={() => onCreatePost?.()}
        onLogout={() => onLogout?.()}
        userAvatar={LOGGED_IN_USER_AVATAR}
        activeTab="marketplace"
        onNavigate={(tab) => onNavigate?.(tab)}
      />

      <div className="ml-[72px]">
        <div className={`min-h-screen flex items-start justify-center ${isDark ? 'bg-[#0f1117]' : 'bg-slate-50'}`}>
          {/* Fixed-width Mobile Canvas */}
          <div className="w-full max-w-[680px] min-h-screen" style={{ backgroundColor: isDark ? '#1a1d29' : '#ffffff' }}>
            {/* Header */}
            <div className={`sticky top-0 z-30 border-b ${
              isDark ? 'border-slate-800 bg-[#1a1d29]' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="w-10" /> {/* Spacer for centering */}
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Marketplace
                </h1>
                <button className="relative w-10 h-10 flex items-center justify-center">
                  
                  
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-4">
              {!isSearchExpanded ? (
                <div 
                  onClick={() => setIsSearchExpanded(true)}
                  className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all ${
                    isDark ? 'bg-slate-800/50' : 'bg-purple-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base mb-0.5 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      What do you need help with?
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      I'm struggling with...
                    </p>
                  </div>
                  <Search className="w-6 h-6 text-purple-600 shrink-0" />
                </div>
              ) : (
                <div className={`rounded-3xl p-6 border-2 border-purple-500 ${
                  isDark ? 'bg-slate-800/50' : 'bg-white'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      What do you need help with?
                    </h2>
                    <button 
                      onClick={() => {
                        setIsSearchExpanded(false);
                        setSearchQuery('');
                      }}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
                      }`}
                    >
                      <X className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Search className={`w-6 h-6 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={placeholderTexts[currentPlaceholderIndex]}
                      autoFocus
                      className={`flex-1 outline-none text-base ${
                        isDark 
                          ? 'bg-transparent text-white placeholder:text-slate-400' 
                          : 'bg-transparent text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <button className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                    isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    <span className="font-semibold">Find Solutions</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Category Filters */}
            <div className="px-4 pb-4">
              <div 
                className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                } as React.CSSProperties}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse Directory Section 1 */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Browse Full Directory
                </h2>
                <button className="text-purple-600 font-semibold text-sm">
                  See All
                </button>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {filteredProducts.slice(0, 6).map((product, index) => {
                  const iconColors = {
                    'T': { bg: 'bg-orange-200', border: 'border-orange-300', text: 'text-orange-600' },
                    'O': { bg: 'bg-blue-200', border: 'border-blue-300', text: 'text-blue-600' },
                    'P': { bg: 'bg-indigo-200', border: 'border-indigo-300', text: 'text-indigo-600' },
                    'S': { bg: 'bg-cyan-200', border: 'border-cyan-300', text: 'text-cyan-600' },
                    'R': { bg: 'bg-green-200', border: 'border-green-300', text: 'text-green-600' },
                    'B': { bg: 'bg-purple-200', border: 'border-purple-300', text: 'text-purple-600' },
                    'L': { bg: 'bg-yellow-200', border: 'border-yellow-300', text: 'text-yellow-600' },
                  }[product.icon] || { bg: 'bg-slate-200', border: 'border-slate-300', text: 'text-slate-600' };
                  
                  return (
                  <div
                    key={`section1-${product.id}-${index}`}
                    onClick={() => onVendorClick?.(product)}
                    className={`${product.color} rounded-3xl p-6 flex flex-col items-center justify-center min-w-[140px] shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95`}
                  >
                    <div className="relative mb-3">
                      <div className={`w-16 h-16 rounded-full ${iconColors.bg} border-2 ${iconColors.border} flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${iconColors.text}`}>
                          {product.icon}
                        </span>
                      </div>
                      {product.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 12 12">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-center text-sm mb-2 text-slate-900">
                      {product.name}
                    </h3>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                      {product.category}
                    </span>
                  </div>
                );
                })}
              </div>
            </div>

            {/* Browse Directory Section 2 */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Browse Full Directory
                </h2>
                <button className="text-purple-600 font-semibold text-sm">
                  See All
                </button>
              </div>
              
              <div 
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                } as React.CSSProperties}
              >
                {filteredProducts.slice(6, 12).map((product, index) => {
                  const iconColors = {
                    'T': { bg: 'bg-orange-200', border: 'border-orange-300', text: 'text-orange-600' },
                    'O': { bg: 'bg-blue-200', border: 'border-blue-300', text: 'text-blue-600' },
                    'P': { bg: 'bg-indigo-200', border: 'border-indigo-300', text: 'text-indigo-600' },
                    'S': { bg: 'bg-cyan-200', border: 'border-cyan-300', text: 'text-cyan-600' },
                    'R': { bg: 'bg-green-200', border: 'border-green-300', text: 'text-green-600' },
                    'B': { bg: 'bg-purple-200', border: 'border-purple-300', text: 'text-purple-600' },
                    'L': { bg: 'bg-yellow-200', border: 'border-yellow-300', text: 'text-yellow-600' },
                  }[product.icon] || { bg: 'bg-slate-200', border: 'border-slate-300', text: 'text-slate-600' };
                  
                  return (
                  <div
                    key={`section2-${product.id}-${index}`}
                    onClick={() => onVendorClick?.(product)}
                    className={`${product.color} rounded-3xl p-6 flex flex-col items-center justify-center min-w-[140px] shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95`}
                  >
                    <div className="relative mb-3">
                      <div className={`w-16 h-16 rounded-full ${iconColors.bg} border-2 ${iconColors.border} flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${iconColors.text}`}>
                          {product.icon}
                        </span>
                      </div>
                      {product.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 12 12">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-center text-sm mb-2 text-slate-900">
                      {product.name}
                    </h3>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                      {product.category}
                    </span>
                  </div>
                );
                })}
              </div>
            </div>

            {/* Browse Directory Section 3 */}
            <div className="px-4 py-4 pb-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Browse Full Directory
                </h2>
                <button className="text-purple-600 font-semibold text-sm">
                  See All
                </button>
              </div>
              
              <div 
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                } as React.CSSProperties}
              >
                {filteredProducts.slice(12, 18).map((product, index) => {
                  const iconColors = {
                    'T': { bg: 'bg-orange-200', border: 'border-orange-300', text: 'text-orange-600' },
                    'O': { bg: 'bg-blue-200', border: 'border-blue-300', text: 'text-blue-600' },
                    'P': { bg: 'bg-indigo-200', border: 'border-indigo-300', text: 'text-indigo-600' },
                    'S': { bg: 'bg-cyan-200', border: 'border-cyan-300', text: 'text-cyan-600' },
                    'R': { bg: 'bg-green-200', border: 'border-green-300', text: 'text-green-600' },
                    'B': { bg: 'bg-purple-200', border: 'border-purple-300', text: 'text-purple-600' },
                    'L': { bg: 'bg-yellow-200', border: 'border-yellow-300', text: 'text-yellow-600' },
                  }[product.icon] || { bg: 'bg-slate-200', border: 'border-slate-300', text: 'text-slate-600' };
                  
                  return (
                  <div
                    key={`section3-${product.id}-${index}`}
                    onClick={() => onVendorClick?.(product)}
                    className={`${product.color} rounded-3xl p-6 flex flex-col items-center justify-center min-w-[140px] shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95`}
                  >
                    <div className="relative mb-3">
                      <div className={`w-16 h-16 rounded-full ${iconColors.bg} border-2 ${iconColors.border} flex items-center justify-center`}>
                        <span className={`text-2xl font-bold ${iconColors.text}`}>
                          {product.icon}
                        </span>
                      </div>
                      {product.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center border-2 border-white">
                          <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 12 12">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-center text-sm mb-2 text-slate-900">
                      {product.name}
                    </h3>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700">
                      {product.category}
                    </span>
                  </div>
                );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}