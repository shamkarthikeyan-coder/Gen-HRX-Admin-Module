import { useState } from 'react';
import { ArrowLeft, Plus, X, Upload, Sparkles, DollarSign, Building, Users as UsersIcon, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LeftSidebar } from '../social/LeftSidebar';
import { LOGGED_IN_USER_AVATAR } from '../../constants/userData';

interface CreateListingFormProps {
  onBack?: () => void;
  onComplete?: (listingData: any) => void;
  onLogout?: () => void;
  onNavigate?: (tab: 'home' | 'decisionRooms' | 'marketplace' | 'profile' | 'settings') => void;
  onCreatePost?: () => void;
}

export function CreateListingForm({ 
  onBack, 
  onComplete, 
  onLogout, 
  onNavigate,
  onCreatePost 
}: CreateListingFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [keyFeatures, setKeyFeatures] = useState<string[]>([]);
  const [idealFor, setIdealFor] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [newIdealFor, setNewIdealFor] = useState('');

  // Step 2 state
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [kpis, setKpis] = useState<Array<{ value: string; label: string; unit: string }>>([]);
  const [newKpiValue, setNewKpiValue] = useState('');
  const [newKpiLabel, setNewKpiLabel] = useState('');
  const [newKpiUnit, setNewKpiUnit] = useState('Users');

  // Step 3 state
  const [pricingModel, setPricingModel] = useState('');
  const [plans, setPlans] = useState<Array<{ name: string; price: string; features: string[] }>>([]);
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanPrice, setNewPlanPrice] = useState('');
  const [newPlanFeatures, setNewPlanFeatures] = useState<string[]>([]);
  const [newPlanFeature, setNewPlanFeature] = useState('');

  // Step 4 state
  const [foundedYear, setFoundedYear] = useState('');
  const [activeClients, setActiveClients] = useState('');

  const addKeyFeature = () => {
    if (newFeature.trim()) {
      setKeyFeatures([...keyFeatures, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeKeyFeature = (index: number) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  const addIdealFor = () => {
    if (newIdealFor.trim()) {
      setIdealFor([...idealFor, newIdealFor.trim()]);
      setNewIdealFor('');
    }
  };

  const removeIdealFor = (index: number) => {
    setIdealFor(idealFor.filter((_, i) => i !== index));
  };

  const addKpi = () => {
    if (newKpiValue.trim() && newKpiLabel.trim()) {
      setKpis([...kpis, { value: newKpiValue.trim(), label: newKpiLabel.trim(), unit: newKpiUnit }]);
      setNewKpiValue('');
      setNewKpiLabel('');
      setNewKpiUnit('Users');
    }
  };

  const addPlanFeatureToNew = () => {
    if (newPlanFeature.trim()) {
      setNewPlanFeatures([...newPlanFeatures, newPlanFeature.trim()]);
      setNewPlanFeature('');
    }
  };

  const removePlanFeature = (index: number) => {
    setNewPlanFeatures(newPlanFeatures.filter((_, i) => i !== index));
  };

  const addPlan = () => {
    if (newPlanName.trim() && newPlanPrice.trim() && newPlanFeatures.length > 0) {
      setPlans([...plans, { name: newPlanName.trim(), price: newPlanPrice.trim(), features: newPlanFeatures }]);
      setNewPlanName('');
      setNewPlanPrice('');
      setNewPlanFeatures([]);
    }
  };

  const canContinueStep1 = tagline.trim() && description.trim() && category && keyFeatures.length >= 3 && idealFor.length >= 2;
  const canContinueStep2 = screenshots.length >= 1 && kpis.length >= 3;
  const canContinueStep3 = pricingModel && plans.length > 0;
  const canContinueStep4 = foundedYear.trim() && activeClients.trim();

  const handleContinue = () => {
    if (currentStep === 4) {
      // Complete and show preview
      const listingData = {
        tagline,
        description,
        category,
        keyFeatures,
        idealFor,
        screenshots,
        kpis,
        pricingModel,
        plans,
        foundedYear,
        activeClients,
      };
      onComplete?.(listingData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onBack?.();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

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
                  onClick={handleBack}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Create Listing
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="px-4 pb-4">
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4].map((step) => (
                    <button
                      key={step}
                      onClick={() => setCurrentStep(step)}
                      className={`h-1 flex-1 rounded-full transition-all cursor-pointer hover:h-1.5 ${
                        step <= currentStep
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                          : isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Step {currentStep} of 4
                </p>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6 pb-24">
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Listing For */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                    <p className="text-xs font-semibold text-purple-600 mb-1">LISTING FOR</p>
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      TechFlow Solutions
                    </p>
                  </div>

                  {/* Marketplace Tagline */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Marketplace Tagline *
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value.slice(0, 80))}
                      placeholder="One-line pitch for your service"
                      className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                      } outline-none`}
                    />
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {tagline.length}/80 characters
                    </p>
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Full Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                      placeholder="Detailed description of your service - tell customers what makes you unique"
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                      } outline-none`}
                    />
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {description.length}/500 characters
                    </p>
                  </div>

                  {/* Primary Category */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Primary Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500'
                      } outline-none`}
                    >
                      <option value="">Select a category</option>
                      <option value="recruitment">Recruitment & Talent Acquisition</option>
                      <option value="learning">Learning & Development</option>
                      <option value="payroll">Payroll & Benefits</option>
                      <option value="performance">Performance Management</option>
                      <option value="engagement">Employee Engagement</option>
                      <option value="analytics">HR Analytics</option>
                    </select>
                  </div>

                  {/* Key Features */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Key Features * (min. 3)
                    </label>
                    
                    {/* Added Features */}
                    {keyFeatures.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {keyFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                              isDark ? 'bg-slate-800' : 'bg-slate-50'
                            }`}
                          >
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                            <button
                              onClick={() => removeKeyFeature(index)}
                              className="p-1 text-slate-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Feature Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyFeature()}
                        placeholder="Add a key feature"
                        className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                        } outline-none`}
                      />
                      <button
                        onClick={addKeyFeature}
                        className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-shadow"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Ideal For */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Ideal For * (min. 2)
                    </label>
                    
                    {/* Added Items */}
                    {idealFor.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {idealFor.map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                              isDark ? 'bg-slate-800' : 'bg-slate-50'
                            }`}
                          >
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                            <button
                              onClick={() => removeIdealFor(index)}
                              className="p-1 text-slate-400 hover:text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Item Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newIdealFor}
                        onChange={(e) => setNewIdealFor(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addIdealFor()}
                        placeholder="e.g., Small businesses, Startups"
                        className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                        } outline-none`}
                      />
                      <button
                        onClick={addIdealFor}
                        className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-shadow"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Showcase & Credibility */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Section Header */}
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50 border-orange-200'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-5 h-5 text-orange-600" />
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Showcase & Credibility
                      </h3>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Add screenshots and key metrics to build trust
                    </p>
                  </div>

                  {/* Product Screenshots */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Product Screenshots * (min. 1)
                    </label>
                    <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Add 3-4 screenshots of your product dashboard, features, or interface
                    </p>

                    {/* Upload Area */}
                    <button
                      onClick={() => setScreenshots(['screenshot1.png'])}
                      className={`w-full p-8 rounded-xl border-2 border-dashed transition-colors ${
                        isDark 
                          ? 'border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400' 
                          : 'border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-600'
                      }`}
                    >
                      <Upload className="w-6 h-6 mx-auto mb-2" />
                      <p className="font-semibold">Click to upload images</p>
                    </button>

                    {screenshots.length > 0 && (
                      <p className={`text-sm mt-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        ✓ {screenshots.length} screenshot(s) uploaded
                      </p>
                    )}
                  </div>

                  {/* Key Performance Indicators */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Key Performance Indicators * (min. 3)
                    </label>
                    <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Add 3-6 impressive stats like "50K+ Active Users" or "99.9% Uptime"
                    </p>

                    {/* Added KPIs */}
                    {kpis.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {kpis.map((kpi, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
                          >
                            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {kpi.value} {kpi.label}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              Unit: {kpi.unit}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Stat Form */}
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Add Stat</h4>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={newKpiValue}
                          onChange={(e) => setNewKpiValue(e.target.value)}
                          placeholder="Value (e.g., 50K+)"
                          className={`px-4 py-3 rounded-xl border transition-colors ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                          } outline-none`}
                        />
                        <input
                          type="text"
                          value={newKpiLabel}
                          onChange={(e) => setNewKpiLabel(e.target.value)}
                          placeholder="Label (e.g., Active Users)"
                          className={`px-4 py-3 rounded-xl border transition-colors ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                          } outline-none`}
                        />
                      </div>

                      <select
                        value={newKpiUnit}
                        onChange={(e) => setNewKpiUnit(e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border transition-colors mb-3 ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' 
                            : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500'
                        } outline-none`}
                      >
                        <option value="Users">Users</option>
                        <option value="Companies">Companies</option>
                        <option value="Uptime">Uptime</option>
                        <option value="Revenue">Revenue</option>
                        <option value="Custom">Custom</option>
                      </select>

                      <button
                        onClick={addKpi}
                        className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                          isDark 
                            ? 'bg-slate-700 text-white hover:bg-slate-600' 
                            : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                        }`}
                      >
                        Add Stat
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing & Plans */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Section Header */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Pricing & Plans
                      </h3>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Define how you charge for your services
                    </p>
                  </div>

                  {/* Pricing Model */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Pricing Model *
                    </label>
                    <select
                      value={pricingModel}
                      onChange={(e) => setPricingModel(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500'
                      } outline-none`}
                    >
                      <option value="">Select pricing model</option>
                      <option value="subscription">Subscription-based</option>
                      <option value="one-time">One-time payment</option>
                      <option value="usage">Usage-based</option>
                      <option value="custom">Custom pricing</option>
                      <option value="freemium">Freemium</option>
                    </select>
                  </div>

                  {/* Added Plans */}
                  {plans.length > 0 && (
                    <div className="space-y-3">
                      {plans.map((plan, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                        >
                          <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {plan.name}
                          </p>
                          <p className={`text-sm mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                            {plan.price}
                          </p>
                          <ul className="space-y-1">
                            {plan.features.map((feature, fIndex) => (
                              <li key={fIndex} className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                • {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Plan Form */}
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Add Plan</h4>
                    
                    <input
                      type="text"
                      value={newPlanName}
                      onChange={(e) => setNewPlanName(e.target.value)}
                      placeholder="Plan name (e.g., Starter, Pro)"
                      className={`w-full px-4 py-3 rounded-xl border transition-colors mb-3 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                      } outline-none`}
                    />

                    <input
                      type="text"
                      value={newPlanPrice}
                      onChange={(e) => setNewPlanPrice(e.target.value)}
                      placeholder="Price (e.g., $8, $15, Custom)"
                      className={`w-full px-4 py-3 rounded-xl border transition-colors mb-3 ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                      } outline-none`}
                    />

                    <label className={`block text-xs font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Plan Features
                    </label>

                    {/* Added Features */}
                    {newPlanFeatures.length > 0 && (
                      <div className="mb-2 space-y-1">
                        {newPlanFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                              isDark ? 'bg-slate-700' : 'bg-white'
                            }`}
                          >
                            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feature}</span>
                            <button
                              onClick={() => removePlanFeature(index)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newPlanFeature}
                        onChange={(e) => setNewPlanFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addPlanFeatureToNew()}
                        placeholder="Feature description"
                        className={`flex-1 px-4 py-2 rounded-lg border transition-colors text-sm ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                        } outline-none`}
                      />
                      <button
                        onClick={addPlanFeatureToNew}
                        className="text-purple-600 font-semibold text-sm"
                      >
                        + Add Feature
                      </button>
                    </div>

                    <button
                      onClick={addPlan}
                      disabled={!newPlanName.trim() || !newPlanPrice.trim() || newPlanFeatures.length === 0}
                      className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                        !newPlanName.trim() || !newPlanPrice.trim() || newPlanFeatures.length === 0
                          ? isDark ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : isDark 
                            ? 'bg-slate-700 text-white hover:bg-slate-600' 
                            : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                      }`}
                    >
                      Add Plan
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Credibility Signals */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Section Header */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Building className="w-5 h-5 text-green-600" />
                      <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Credibility Signals
                      </h3>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      These KPIs build trust with buyers and increase profile visibility
                    </p>
                  </div>

                  {/* Founded Year */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Founded Year *
                    </label>
                    <input
                      type="text"
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      placeholder="e.g., 2018"
                      className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                      } outline-none`}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Shows as "Founded {foundedYear || '____'}" badge on your profile
                      </p>
                    </div>
                  </div>

                  {/* Active Clients */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Active Clients *
                    </label>
                    <input
                      type="text"
                      value={activeClients}
                      onChange={(e) => setActiveClients(e.target.value)}
                      placeholder="e.g., 2,500+ or 50-100"
                      className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                        isDark 
                          ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500' 
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500'
                      } outline-none`}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <UsersIcon className="w-4 h-4 text-purple-600" />
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Shows as "Trusted by {activeClients || '____'} companies" on your profile
                      </p>
                    </div>
                  </div>

                  {/* Auto-filled Info */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Auto-filled from Profile
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Location, Website, Email, Phone, and Team Size are automatically pulled from your vendor profile to keep information consistent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className={`fixed bottom-0 left-[72px] right-0 flex justify-center border-t ${
              isDark ? 'bg-[#0f1117] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`w-full max-w-[600px] p-4 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
                      isDark 
                        ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                        : 'bg-white text-slate-900 hover:bg-slate-50 border border-slate-300'
                    }`}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={
                      (currentStep === 1 && !canContinueStep1) ||
                      (currentStep === 2 && !canContinueStep2) ||
                      (currentStep === 3 && !canContinueStep3) ||
                      (currentStep === 4 && !canContinueStep4)
                    }
                    className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
                      ((currentStep === 1 && !canContinueStep1) ||
                       (currentStep === 2 && !canContinueStep2) ||
                       (currentStep === 3 && !canContinueStep3) ||
                       (currentStep === 4 && !canContinueStep4))
                        ? isDark 
                          ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {currentStep === 4 ? 'Preview & Publish' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}