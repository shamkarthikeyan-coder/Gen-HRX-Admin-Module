import { motion } from 'motion/react';
import { Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTheme } from '../../context/ThemeContext';

interface PhoneVerificationStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  phoneTouched: boolean;
  setPhoneTouched: (touched: boolean) => void;
  isValidPhone: boolean;
  isLoading: boolean;
  onContinue: () => void;
  onBack: () => void;
}

export function PhoneVerificationStep({
  phone,
  setPhone,
  phoneTouched,
  setPhoneTouched,
  isValidPhone,
  isLoading,
  onContinue,
  onBack,
}: PhoneVerificationStepProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      key="phone"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-900/50 border border-slate-800/50' 
          : 'bg-slate-50/80 border border-slate-200/50'
      } backdrop-blur-sm space-y-4`}>
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Phone Number
          </label>
          <div className="relative">
            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              onBlur={() => setPhoneTouched(true)}
              placeholder="+1 (555) 123-4567"
              className={`pl-12 h-12 rounded-xl ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500' 
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
            {phoneTouched && isValidPhone && (
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
            We'll send a verification code to this number
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className={`flex-1 h-12 rounded-xl font-semibold ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Back
          </Button>
          <Button
            onClick={onContinue}
            disabled={!isValidPhone || isLoading}
            className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <>
                Send Code
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
