import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Camera, X, ArrowRight, ChevronLeft, Briefcase, Building2, 
  Users, MapPin, Target
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { Logo } from '../Logo';

interface ProfileContextSetupProps {
  userRole: 'practitioner' | 'leader' | 'provider' | 'friends';
  email: string;
  onContinue: (profileData: ProfileContextData) => void;
  onBack: () => void;
}

export interface ProfileContextData {
  profilePicture?: string;
  fullName: string;
  bio?: string;
  jobTitle?: string;
  yearsOfExperience?: string;
  currentCompany?: string;
  organizationSize?: string;
  location?: string;
  specializations?: string[];
}

// Mock data
const organizationSizes = [
  { value: '<50', label: 'Under 50 employees' },
  { value: '51-200', label: '51 - 200 employees' },
  { value: '201-500', label: '201 - 500 employees' },
  { value: '501-1000', label: '501 - 1,000 employees' },
  { value: '1000-5000', label: '1,000 - 5,000 employees' },
  { value: '5000+', label: '5,000+ employees' },
];

const experienceRanges = [
  '0-2 years',
  '3-5 years',
  '6-10 years',
  '11-15 years',
  '16-20 years',
  '20+ years',
];

const specializationOptions = [
  'Talent Acquisition',
  'Compensation & Benefits',
  'Learning & Development',
  'Employee Relations',
  'HR Analytics',
  'Diversity & Inclusion',
  'Performance Management',
  'HR Technology',
  'Workforce Planning',
  'Organizational Development',
  'HR Operations',
  'Total Rewards',
];

// Mock location suggestions
const locationSuggestions = [
  'San Francisco, CA, USA',
  'New York, NY, USA',
  'Austin, TX, USA',
  'Seattle, WA, USA',
  'Los Angeles, CA, USA',
  'Chicago, IL, USA',
  'Boston, MA, USA',
  'London, UK',
  'Toronto, ON, Canada',
  'Berlin, Germany',
];

export function ProfileContextSetup({ onContinue, onBack }: ProfileContextSetupProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  // Form data
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [organizationSize, setOrganizationSize] = useState('');
  const [location, setLocation] = useState('');
  const [specializations, setSpecializations] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        toast.success('Profile picture uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return fullName.trim().length > 0;
    }
    return true; // Steps 2 and 3 are optional
  };

  const handleContinue = () => {
    if (step < totalSteps) {
      if (step === 1 && !isStepValid()) {
        toast.error('Please enter your name');
        return;
      }
      setStep(step + 1);
    } else {
      // Final step - submit
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    const profileData: ProfileContextData = {
      profilePicture,
      fullName: fullName.trim(),
      bio: bio.trim() || undefined,
      jobTitle: jobTitle.trim() || undefined,
      yearsOfExperience: yearsOfExperience || undefined,
      currentCompany: currentCompany.trim() || undefined,
      organizationSize: organizationSize || undefined,
      location: location.trim() || undefined,
      specializations: specializations.length > 0 ? specializations : undefined,
    };
    toast.success('Profile created! Setting up your feed...');
    onContinue(profileData);
  };

  const handleSkip = () => {
    // From step 2 or 3, skip directly to home
    toast.info('You can complete this later in your profile settings');
    completeOnboarding();
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setLocationQuery(loc);
    setShowLocationSuggestions(false);
  };

  const toggleSpecialization = (spec: string) => {
    const current = specializations;
    if (current.includes(spec)) {
      setSpecializations(current.filter(s => s !== spec));
    } else {
      if (current.length < 5) {
        setSpecializations([...current, spec]);
      } else {
        toast.error('You can select up to 5 specializations');
      }
    }
  };

  // Location autocomplete filtering
  const filteredLocations = locationSuggestions.filter(loc =>
    loc.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Set Up Your Profile';
      case 2: return 'Professional Information';
      case 3: return 'Location & Specializations';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return 'Let\'s start with the basics';
      case 2: return 'Tell us about your professional background';
      case 3: return 'Where are you located and what are your specializations?';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} relative overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-purple-900/20 to-orange-900/20' : 'from-purple-100/30 to-orange-100/30'}`} />
      </div>

      {/* Main Container - Centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          
          {/* Header with Logo */}
          <div className="mb-8">
            {/* Logo - Centered */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center"
            >
              <Logo variant="horizontal" size="md" showText={false} />
            </motion.div>

            {/* Title and Description - Centered */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button and Title Row */}
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={handleBack}
                  className={`inline-flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">Back</span>
                </button>
                
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} flex-1 text-center`}>
                  {getStepTitle()}
                </h1>
                
                {/* Spacer to balance layout */}
                <div className="w-[88px]"></div>
              </div>
              
              <p className={`text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {getStepDescription()}
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="flex gap-2 mt-6 max-w-md mx-auto">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    index < step
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500'
                      : isDark ? 'bg-slate-700' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl shadow-2xl overflow-hidden ${
              isDark 
                ? 'bg-slate-900/50 border border-slate-800/50' 
                : 'bg-white border border-slate-200'
            } backdrop-blur-xl`}
          >
            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* STEP 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div
                          className={`w-32 h-32 rounded-full overflow-hidden ${
                            isDark ? 'bg-slate-800' : 'bg-slate-100'
                          } flex items-center justify-center border-2 ${
                            isDark ? 'border-slate-700' : 'border-slate-300'
                          }`}
                        >
                          {profilePicture ? (
                            <img
                              src={profilePicture}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className={`w-16 h-16 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 p-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                          <Camera className="w-5 h-5" />
                        </button>
                        {profilePicture && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfilePicture('');
                              toast.success('Profile picture removed');
                            }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className={`text-sm mt-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Upload your profile picture (optional)
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Name *
                      </label>
                      <div className="relative">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <Input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          className={`pl-12 h-14 ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                              : 'bg-white border-slate-300 focus:border-purple-500'
                          } border-2 rounded-xl focus:ring-0 focus:outline-none`}
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        A bit about you (optional)
                      </label>
                      <textarea
                        placeholder="Tell us what makes you unique..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        maxLength={500}
                        className={`w-full p-4 ${
                          isDark 
                            ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                            : 'bg-white border-slate-300 focus:border-purple-500'
                        } border-2 rounded-xl focus:ring-0 focus:outline-none resize-none`}
                      />
                      <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'} mt-1 text-right`}>
                        {bio.length}/500
                      </p>
                    </div>

                    {/* Continue Button */}
                    <Button
                      type="button"
                      onClick={handleContinue}
                      disabled={!isStepValid()}
                      className={`w-full h-14 rounded-xl font-semibold text-white transition-all ${
                        isStepValid()
                          ? 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 shadow-lg hover:shadow-xl'
                          : isDark
                          ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </Button>
                  </motion.div>
                )}

                {/* STEP 2: Professional Information */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Job Title */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Job Title
                      </label>
                      <div className="relative">
                        <Briefcase className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <Input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="Senior HR Director"
                          className={`pl-12 h-14 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'} border-2 rounded-xl focus:ring-0 focus:outline-none focus:border-purple-500`}
                        />
                      </div>
                    </div>

                    {/* Years of Experience */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Years of Experience
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {experienceRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setYearsOfExperience(range)}
                            className={`p-4 rounded-xl text-sm font-medium transition-all ${
                              yearsOfExperience === range
                                ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg'
                                : isDark
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Current Company */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Current Company
                      </label>
                      <div className="relative">
                        <Building2 className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <Input
                          type="text"
                          value={currentCompany}
                          onChange={(e) => setCurrentCompany(e.target.value)}
                          placeholder="Google, Microsoft, Apple..."
                          className={`pl-12 h-14 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'} border-2 rounded-xl focus:ring-0 focus:outline-none focus:border-purple-500`}
                        />
                      </div>
                    </div>

                    {/* Organization Size */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Organization Size
                      </label>
                      <div className="relative">
                        <Users className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <select
                          value={organizationSize}
                          onChange={(e) => setOrganizationSize(e.target.value)}
                          className={`w-full pl-12 pr-4 h-14 rounded-xl border-2 appearance-none cursor-pointer ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-white' 
                              : 'bg-white border-slate-300 text-slate-900'
                          } focus:outline-none focus:ring-0 focus:border-purple-500`}
                        >
                          <option value="">Select company size</option>
                          {organizationSizes.map((size) => (
                            <option key={size.value} value={size.value}>
                              {size.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Assurance Message */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`p-4 rounded-xl ${
                        isDark 
                          ? 'bg-purple-500/10 border border-purple-500/30' 
                          : 'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'} text-center`}>
                        💡 Don't worry! You can add more details later from your profile settings.
                      </p>
                    </motion.div>

                    {/* Buttons Row */}
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={handleSkip}
                        className={`flex-1 h-14 rounded-xl font-semibold transition-all ${
                          isDark 
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-2 border-slate-700' 
                            : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-300'
                        }`}
                      >
                        Skip for now
                      </Button>
                      <Button
                        type="button"
                        onClick={handleContinue}
                        className="flex-1 h-14 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
                      >
                        Continue
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Location & Specializations */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Location with Autocomplete */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <Input
                          type="text"
                          value={locationQuery || location}
                          onChange={(e) => {
                            setLocationQuery(e.target.value);
                            setLocation(e.target.value);
                            setShowLocationSuggestions(true);
                          }}
                          onFocus={() => setShowLocationSuggestions(true)}
                          placeholder="San Francisco, CA or United States"
                          className={`pl-12 h-14 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'} border-2 rounded-xl focus:ring-0 focus:outline-none focus:border-purple-500`}
                        />
                        
                        {/* Location Suggestions Dropdown */}
                        {showLocationSuggestions && filteredLocations.length > 0 && (
                          <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-lg max-h-48 overflow-y-auto z-20 ${
                            isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                          }`}>
                            {filteredLocations.map((loc) => (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => handleLocationSelect(loc)}
                                className={`w-full text-left px-4 py-3 transition-colors ${
                                  isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-slate-400" />
                                  {loc}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Specializations */}
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Your HR Specializations
                        <span className={`text-xs font-normal ml-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                          (Select up to 5)
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {specializationOptions.map((spec) => (
                          <button
                            key={spec}
                            type="button"
                            onClick={() => toggleSpecialization(spec)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all text-left ${
                              specializations.includes(spec)
                                ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg'
                                : isDark
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              {spec}
                            </div>
                          </button>
                        ))}
                      </div>
                      {specializations.length > 0 && (
                        <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                          {specializations.length}/5 selected
                        </p>
                      )}
                    </div>

                    {/* Assurance Message */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`p-4 rounded-xl ${
                        isDark 
                          ? 'bg-purple-500/10 border border-purple-500/30' 
                          : 'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'} text-center`}>
                        💡 Don't worry! You can add more details later from your profile settings.
                      </p>
                    </motion.div>

                    {/* Buttons Row */}
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={handleSkip}
                        className={`flex-1 h-14 rounded-xl font-semibold transition-all ${
                          isDark 
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-2 border-slate-700' 
                            : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-300'
                        }`}
                      >
                        Skip for now
                      </Button>
                      <Button
                        type="button"
                        onClick={handleContinue}
                        className="flex-1 h-14 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all"
                      >
                        Complete Setup
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Footer */}
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'} text-center mt-6`}>
            Welcome to genHRX! We're excited to have you here 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
