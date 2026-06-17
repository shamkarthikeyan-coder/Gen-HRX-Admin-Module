import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, Shield, Eye, EyeOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { ProfileContextData } from './ProfileContextSetup';

interface MaskedIdentitySetupProps {
  profileData: ProfileContextData;
  onContinue: (maskedIdentity: MaskedIdentityData) => void;
  onBack: () => void;
}

export interface MaskedIdentityData {
  alias: string;
  enableByDefault: boolean;
}

// Generate professional alias based on profile context
const generateAlias = (profileData: ProfileContextData): string => {
  const { jobTitle, industry, organizationSize } = profileData;
  
  // Extract role level from job title
  let roleLevel = 'HR Professional';
  const lowerTitle = jobTitle.toLowerCase();
  
  if (lowerTitle.includes('chief') || lowerTitle.includes('chro')) {
    roleLevel = 'CHRO';
  } else if (lowerTitle.includes('vp') || lowerTitle.includes('vice president')) {
    roleLevel = 'VP of HR';
  } else if (lowerTitle.includes('director')) {
    roleLevel = 'HR Director';
  } else if (lowerTitle.includes('manager')) {
    roleLevel = 'HR Manager';
  } else if (lowerTitle.includes('partner') || lowerTitle.includes('hrbp')) {
    roleLevel = 'HR Business Partner';
  } else if (lowerTitle.includes('specialist') || lowerTitle.includes('coordinator')) {
    roleLevel = 'HR Specialist';
  }
  
  // Clean industry name
  const industryName = industry.replace('/', ' & ');
  
  // Use organization size as-is
  const sizeLabel = organizationSize === '5000+' ? '5000+ employees' : `${organizationSize} employees`;
  
  return `${roleLevel} in ${industryName}, ${sizeLabel}`;
};

export function MaskedIdentitySetup({ profileData, onContinue, onBack }: MaskedIdentitySetupProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [alias, setAlias] = useState(generateAlias(profileData));
  const [enableByDefault, setEnableByDefault] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const handleRegenerateAlias = () => {
    // Generate slight variations
    const variations = [
      generateAlias(profileData),
      `${profileData.jobTitle.split(' ')[0]} Professional in ${profileData.industry}`,
      `HR Leader at ${profileData.organizationSize} org in ${profileData.industry}`,
    ];
    const newAlias = variations[Math.floor(Math.random() * variations.length)];
    setAlias(newAlias);
    toast.success('New alias generated');
  };

  const handleContinue = () => {
    if (!alias.trim()) {
      toast.error('Please generate or enter an alias');
      return;
    }
    toast.success('Confidential persona created!');
    onContinue({ alias, enableByDefault });
  };

  return (
    <div className={`h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'} flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'} px-6 pt-8 pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <button
          onClick={onBack}
          className={`p-2 -ml-2 mb-4 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className={`px-3 py-1 rounded-full ${isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
              <span className="text-xs font-semibold">CONFESSIONAL CORNER</span>
            </div>
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Create your Confidential Persona
          </h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            This is how you'll appear when asking sensitive questions
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-6 max-w-md mx-auto">
          {/* What This Does */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${isDark ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}
          >
            <div className="flex items-start gap-3">
              <Shield className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  How it works
                </h4>
                <p className={`text-xs ${isDark ? 'text-blue-200' : 'text-blue-800'}`}>
                  Your alias strips personal identifiers but keeps professional context (role + industry + company size) so answers remain relevant. Your real identity is never revealed.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Generated Alias */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Confidential Alias
            </label>
            
            <div className={`p-5 rounded-2xl border-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'}`}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-2xl shrink-0">
                  🎭
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {alias}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    This is how you'll appear in Confessional Corner
                  </p>
                </div>
              </div>

              <button
                onClick={handleRegenerateAlias}
                className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${
                  isDark 
                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Alias
              </button>
            </div>

            {/* Preview Toggle */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`w-full mt-3 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                isDark 
                  ? 'text-purple-400 hover:bg-slate-800' 
                  : 'text-purple-600 hover:bg-slate-50'
              }`}
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide' : 'Preview'} how others will see you
            </button>

            {/* Preview */}
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mt-3 p-4 rounded-xl border ${isDark ? 'bg-slate-700/30 border-slate-600' : 'bg-slate-50 border-slate-200'}`}
              >
                <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  PREVIEW - Confessional Parley
                </p>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xl shrink-0">
                      🎭
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {alias}
                        </p>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                          Anonymous
                        </span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        2m ago
                      </p>
                      <p className={`text-sm mt-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        How do you handle a CEO who constantly undermines HR decisions? Need advice...
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Enable by Default Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Enable Safe-Sharing Mode by default
                </h4>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Start every parley anonymously. You can toggle it off anytime for public parleys.
                </p>
              </div>
              <button
                onClick={() => setEnableByDefault(!enableByDefault)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  enableByDefault 
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500' 
                    : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: enableByDefault ? '26px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              What you can do with your masked identity:
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Ask sensitive questions about compensation, politics, or difficult situations
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Share honest feedback without fear of retaliation
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Still get relevant advice based on your professional context
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Switch between your real identity and masked persona anytime
                </p>
              </div>
            </div>
          </motion.div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-4 rounded-xl border ${isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'}`}
          >
            <div className="flex items-start gap-3">
              <Shield className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Your privacy is protected
                </h4>
                <p className={`text-xs ${isDark ? 'text-green-200' : 'text-green-800'}`}>
                  GenHRX never reveals your real identity in anonymous posts. Not even to moderators. Your personal info is encrypted and stored separately from your anonymous content.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className={`px-6 py-6 border-t ${isDark ? 'bg-[#1a1d29] border-slate-800' : 'bg-white border-slate-200'}`}>
        <Button
          onClick={handleContinue}
          disabled={!alias.trim()}
          className={`w-full h-14 font-bold text-base rounded-2xl transition-all ${
            alias.trim()
              ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:shadow-xl'
              : isDark
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Complete Setup
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className={`text-center text-sm mt-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          You can always update your masked identity in settings
        </p>
      </div>
    </div>
  );
}