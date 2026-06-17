import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, FileText, Shield, Settings, ArrowRight, 
  Globe, Mail, Phone, Users, MapPin, ChevronDown, Check 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/button';
import { AnimatedBackground } from '../AnimatedBackground';
import { Logo } from '../Logo';
import logoIcon from 'figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png';
import logoTextLight from 'figma:asset/b8fb40227e77e34949d5969fa9ffd282d98ce335.png';
import logoTextDark from 'figma:asset/faa83b27593f711b950a2fd1fc9d872ff183df3d.png';

interface ServiceProviderOnboardingProps {
  onContinue: () => void;
  onBack: () => void;
}

const setupSteps = [
  {
    icon: Building2,
    label: 'Company profile',
  },
  {
    icon: FileText,
    label: 'Services offered',
  },
  {
    icon: Shield,
    label: 'Credibility signals',
  },
  {
    icon: Settings,
    label: 'Visibility settings',
  },
];

const serviceCategories = [
  'Benefits Administration',
  'HR Consulting',
  'Training & Development',
  'Compliance & Legal',
  'Performance Management',
  'Employee Relations',
];

const teamSizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501+ employees',
];

const regionOptions = [
  'North America',
  'South America',
  'Europe',
  'Asia Pacific',
  'Middle East',
  'Africa',
  'Global',
];

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Government',
  'Non-profit',
];

const geographicCoverageOptions = [
  'Local',
  'Regional',
  'National',
  'International',
  'Global',
];

const contactMethodOptions = [
  'Email',
  'Phone',
  'Video call',
  'In-person meeting',
];

export function ServiceProviderOnboarding({ onContinue, onBack }: ServiceProviderOnboardingProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    website: '',
    email: '',
    phone: '',
    teamSize: '',
    primaryRegion: '',
    serviceCategories: [] as string[],
    industriesServed: '',
    geographicCoverage: '',
    preferredContactMethod: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.includes(category)
        ? prev.serviceCategories.filter(c => c !== category)
        : [...prev.serviceCategories, category],
    }));
  };

  const handleStep1Continue = () => {
    setCurrentStep(2);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleCompleteSetup = () => {
    // Save form data if needed
    console.log('HR Provider Form Data:', formData);
    onContinue();
  };

  if (!showForm) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} flex items-center justify-center relative overflow-hidden`}>
        {/* Animated Background */}
        <AnimatedBackground variant={isDark ? 'dark' : 'light'} intensity="subtle" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-md px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex justify-start mb-8">
              <Logo size="sm" />
            </div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                <Building2 className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Welcome Text */}
            <div className="text-center space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                Welcome to Parley
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                You're joining as a
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                Service Vendor
              </motion.p>
            </div>

            {/* Setup Steps Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-2xl p-6 ${
                isDark 
                  ? 'bg-purple-500/10 border border-purple-500/20' 
                  : 'bg-purple-50 border border-purple-100'
              }`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Next, we'll set up:
              </h3>
              
              <div className="space-y-4">
                {setupSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark ? 'bg-purple-500/20' : 'bg-white'
                      }`}>
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className={`text-base ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {step.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Time estimate */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className={`text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
            >
              This will take approximately 5 minutes
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-3"
            >
              <Button
                onClick={() => setShowForm(true)}
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
              >
                Start Setup
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} relative overflow-hidden`}>
      {/* Animated Background */}
      <AnimatedBackground variant={isDark ? 'dark' : 'light'} intensity="subtle" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto h-screen flex flex-col">
        {/* Fixed Header Section */}
        <div className={`shrink-0 px-6 pt-8 pb-4 border-b ${
          isDark 
            ? 'bg-[#0f1117]/95 border-slate-800 backdrop-blur-xl' 
            : 'bg-white/95 border-slate-200 backdrop-blur-xl'
        }`}>
          <div className="mb-6 flex items-center gap-1">
            <motion.img 
              src={logoIcon} 
              alt="Parley" 
              className="h-12 w-12"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
            />
            <motion.img
              src={isDark ? logoTextLight : logoTextDark}
              alt="People Parley"
              className="h-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <motion.div
                key="header-step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {/* Header */}
                <div>
                  <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Company Profile
                  </h1>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Step 1 of 2
                  </p>
                </div>

                {/* Progress Bar */}
                <div className={`h-1 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} flex cursor-pointer`}>
                  <div 
                    className="h-full w-1/2 rounded-l-full bg-gradient-to-r from-purple-600 to-pink-600"
                    onClick={() => setCurrentStep(1)}
                  />
                  <div 
                    className="h-full w-1/2 rounded-r-full hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors"
                    onClick={() => setCurrentStep(2)}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="header-step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Header */}
                <div>
                  <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Services & Settings
                  </h1>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Step 2 of 2
                  </p>
                </div>

                {/* Progress Bar */}
                <div className={`h-1 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scrollable Content */}
        <div 
          className={`flex-1 overflow-y-auto px-6 py-6 scrollbar-hide ${
            isDark ? 'bg-[#0f1117]' : 'bg-white'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="pb-6"
                >
                  {/* Form Fields */}
                  <div className="space-y-5">
                    {/* Company Name */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Company name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="e.g., Acme HR Solutions"
                          className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        />
                      </div>
                    </div>

                    {/* Company Description */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Company description <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className={`absolute left-3 top-3 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <textarea
                          value={formData.companyDescription}
                          onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                          placeholder="Briefly describe your company"
                          rows={3}
                          className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors resize-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        />
                      </div>
                    </div>

                    {/* Website */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Website <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Globe className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="yourcompany.com"
                          className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="contact@yourcompany.com"
                          className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 123 456 7890"
                          className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-colors ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        />
                      </div>
                    </div>

                    {/* Team Size */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Team size <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Users className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <select
                          value={formData.teamSize}
                          onChange={(e) => handleInputChange('teamSize', e.target.value)}
                          className={`w-full pl-11 pr-10 py-3 rounded-lg border transition-colors appearance-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        >
                          <option value="">Select team size</option>
                          {teamSizeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      </div>
                    </div>

                    {/* Primary Region */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Primary region <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <select
                          value={formData.primaryRegion}
                          onChange={(e) => handleInputChange('primaryRegion', e.target.value)}
                          className={`w-full pl-11 pr-10 py-3 rounded-lg border transition-colors appearance-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        >
                          <option value="">Select region</option>
                          {regionOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="pb-6"
                >
                  {/* Form Fields */}
                  <div className="space-y-5">
                    {/* Service Categories */}
                    <div>
                      <label className={`text-sm font-medium mb-3 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Service categories <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {serviceCategories.map(category => (
                          <button
                            key={category}
                            onClick={() => handleServiceCategoryToggle(category)}
                            className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                              formData.serviceCategories.includes(category)
                                ? 'border-purple-500 bg-purple-500/10'
                                : isDark
                                ? 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                              formData.serviceCategories.includes(category)
                                ? 'bg-purple-600 border-purple-600'
                                : isDark
                                ? 'border-slate-600'
                                : 'border-slate-300'
                            }`}>
                              {formData.serviceCategories.includes(category) && (
                                <Check className="w-3.5 h-3.5 text-white" />
                              )}
                            </div>
                            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {category}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Industries Served */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Industries served <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <select
                          value={formData.industriesServed}
                          onChange={(e) => handleInputChange('industriesServed', e.target.value)}
                          className={`w-full pl-11 pr-10 py-3 rounded-lg border transition-colors appearance-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        >
                          <option value="">Select primary industry</option>
                          {industryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      </div>
                    </div>

                    {/* Geographic Coverage */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Geographic coverage <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <select
                          value={formData.geographicCoverage}
                          onChange={(e) => handleInputChange('geographicCoverage', e.target.value)}
                          className={`w-full pl-11 pr-10 py-3 rounded-lg border transition-colors appearance-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        >
                          <option value="">Select service area</option>
                          {geographicCoverageOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      </div>
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className={`text-sm font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Preferred contact method <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <select
                          value={formData.preferredContactMethod}
                          onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                          className={`w-full pl-11 pr-10 py-3 rounded-lg border transition-colors appearance-none ${
                            isDark 
                              ? 'bg-slate-900/50 border-slate-700 text-white focus:border-purple-500' 
                              : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        >
                          <option value="">Select preference</option>
                          {contactMethodOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Fixed Footer with Buttons */}
        <div className={`shrink-0 px-6 py-4 border-t ${
          isDark 
            ? 'bg-slate-900/95 border-slate-800 backdrop-blur-xl' 
            : 'bg-white/95 border-slate-200 backdrop-blur-xl'
        }`}>
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <motion.div
                key="footer-step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Button
                  onClick={handleStep1Continue}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="footer-step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3"
              >
                <Button
                  onClick={handleStep2Back}
                  variant="outline"
                  className={`flex-1 h-12 text-base font-semibold ${
                    isDark 
                      ? 'border-slate-700 text-white hover:bg-slate-800' 
                      : 'border-slate-300 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleCompleteSetup}
                  className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
                >
                  Complete Setup
                  <Check className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}