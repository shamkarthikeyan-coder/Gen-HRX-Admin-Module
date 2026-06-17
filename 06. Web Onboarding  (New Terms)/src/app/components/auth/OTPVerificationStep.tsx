import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';

interface OTPVerificationStepProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  otpError: string;
  setOtpError: (error: string) => void;
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  email: string;
  resendCountdown: number;
  isLoading: boolean;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onOtpPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export function OTPVerificationStep({
  otp,
  otpError,
  otpInputRefs,
  email,
  resendCountdown,
  isLoading,
  onVerify,
  onResend,
  onBack,
  onOtpChange,
  onOtpKeyDown,
  onOtpPaste,
}: OTPVerificationStepProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      key="otp"
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

      <div className={`p-6 rounded-2xl ${
        isDark 
          ? 'bg-slate-900/50 border border-slate-800/50' 
          : 'bg-slate-50/80 border border-slate-200/50'
      } backdrop-blur-sm space-y-4`}>
        {/* OTP Input - 6 digits */}
        <div>
          <label className={`block text-sm font-semibold mb-4 text-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Enter 6-digit code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpInputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => onOtpChange(index, e.target.value)}
                onKeyDown={(e) => onOtpKeyDown(index, e)}
                onPaste={index === 0 ? onOtpPaste : undefined}
                className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 ${
                  isDark 
                    ? `bg-slate-800 text-white ${otpError ? 'border-red-500' : 'border-slate-700 focus:border-purple-500'}` 
                    : `bg-white text-slate-900 ${otpError ? 'border-red-500' : 'border-slate-300 focus:border-purple-600'}`
                } focus:outline-none transition-colors`}
              />
            ))}
          </div>
          {otpError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center mt-2"
            >
              {otpError}
            </motion.p>
          )}
        </div>

        {/* Resend Code */}
        <div className="text-center">
          {resendCountdown > 0 ? (
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Resend code in {resendCountdown}s
            </p>
          ) : (
            <button
              onClick={onResend}
              disabled={isLoading}
              className={`text-sm font-semibold ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} transition-colors disabled:opacity-50`}
            >
              Resend Code
            </button>
          )}
        </div>

        <p className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          For demo: Use <span className="font-mono font-semibold">123456</span> or <span className="font-mono font-semibold">000000</span>
        </p>
      </div>
    </motion.div>
  );
}