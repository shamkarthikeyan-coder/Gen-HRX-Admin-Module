import { motion } from 'motion/react';
import { Mail, CheckCircle2, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTheme } from '../../context/ThemeContext';

interface EmailVerificationStepProps {
  email: string;
  setEmail: (email: string) => void;
  emailTouched: boolean;
  setEmailTouched: (touched: boolean) => void;
  isValidEmail: boolean;
  isLoading: boolean;
  onContinue: () => void;
  onBack: () => void;
}

export function EmailVerificationStep({
  email,
  setEmail,
  emailTouched,
  setEmailTouched,
  isValidEmail,
  isLoading,
  onContinue,
  onBack,
}: EmailVerificationStepProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      key="email"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      {/* Email Input Section */}
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-900/50 border border-slate-800/50' 
          : 'bg-slate-50/80 border border-slate-200/50'
      } backdrop-blur-sm space-y-4`}>
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Email Address
          </label>
          <div className="relative">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="you@company.com"
              className={`pl-12 h-12 rounded-xl ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
            {emailTouched && isValidEmail && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </motion.div>
            )}
          </div>
          <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            We'll send a verification code to this email
          </p>
        </div>

        {/* Continue Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onContinue}
            disabled={!isValidEmail || isLoading}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending code...
              </div>
            ) : (
              <>
                Send verification code
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Info Box */}
      <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
          💡 <strong>Why do we need your email?</strong> We'll send you a one-time code to verify your identity and keep your account secure.
        </p>
      </div>
    </motion.div>
  );
}
