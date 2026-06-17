import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { AnimatedBackground } from '../AnimatedBackground';
import { Logo } from '../Logo';
import { OTPVerificationStep } from './OTPVerificationStep';
import { EmailVerificationStep } from './EmailVerificationStep';
import linkedinIcon from 'figma:asset/c1b6835979faf1706827026279615dbbdec09756.png';
import googleIcon from 'figma:asset/ecd8e9f76bdac00aee6269a5ff28632c5d5d2b29.png';

interface AuthenticationScreenProps {
  onContinue: (email: string, method: 'email' | 'linkedin' | 'google') => void;
  onBack: () => void;
}

// Mock verified domains
const verifiedDomains = [
  'workday.com', 'adp.com', 'paylocity.com', 'bamboohr.com', 'namely.com',
  'gusto.com', 'zenefits.com', 'rippling.com', 'lattice.com', 'cultureamp.com'
];

export function AuthenticationScreen({ onContinue, onBack }: AuthenticationScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [authStep, setAuthStep] = useState<'auth' | 'email' | 'otp'>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'linkedin' | 'google'>('email');
  const [needsEmail, setNeedsEmail] = useState(false); // For social logins without email
  
  // OTP states
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email validation
  const isValidEmail = email.includes('@') && email.includes('.');
  const emailDomain = email.split('@')[1]?.toLowerCase();
  const isVerifiedDomain = verifiedDomains.includes(emailDomain || '');
  const isGenericEmail = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(emailDomain || '');
  
  const showEmailValidation = emailTouched && email.length > 0;

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleEmailVerification = async () => {
    if (!isValidEmail) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Move to OTP step
    setAuthStep('otp');
    setResendCountdown(30);
    toast.success(`OTP sent to ${email}`);
  };

  const handleSocialLogin = async (provider: 'linkedin' | 'google') => {
    setIsLoading(true);
    setLoginMethod(provider);
    toast.success(`Connecting with ${provider === 'linkedin' ? 'LinkedIn' : 'Google'}...`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Simulate: Check if social login returned email
    // For demo: 50% chance of needing email
    const hasEmail = Math.random() > 0.5;
    
    if (!hasEmail) {
      // Email not found from social login - need to ask for it
      setNeedsEmail(true);
      setAuthStep('email');
      toast.info('Please provide your work email to continue');
    } else {
      // Simulate email from social login
      setEmail(`user@${provider}.example.com`);
      // Move to OTP step
      setAuthStep('otp');
      setResendCountdown(30);
      toast.success(`OTP sent to your email`);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      // Trigger verification automatically
      const otpCode = newOtp.join('');
      if (otpCode === '123456' || otpCode === '000000') {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          toast.success('Email verified successfully! 🎉');
          onContinue(email, loginMethod);
        }, 800);
      } else {
        setOtpError('Invalid code. Try 123456 or 000000');
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('');
    
    while (newOtp.length < 6) {
      newOtp.push('');
    }
    
    setOtp(newOtp);
    setOtpError('');
    
    // Focus last filled input or last input
    const lastFilledIndex = Math.min(pastedData.length, 5);
    otpInputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate OTP verification (in real app, verify with backend)
    const isValid = otpString === '123456' || otpString === '000000'; // Mock validation
    
    if (isValid) {
      toast.success('Email verified successfully! 🎉');
      onContinue(email, loginMethod);
    } else {
      setOtpError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    }
    
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    setResendCountdown(30);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    toast.success('New OTP sent!');
    otpInputRefs.current[0]?.focus();
  };

  const handleBackFromEmail = () => {
    setAuthStep('auth');
    setEmail('');
    setEmailTouched(false);
  };

  const handleBackFromOtp = () => {
    // Go back to email step if it was triggered by social login
    if (needsEmail) {
      setAuthStep('email');
    } else {
      setAuthStep('auth');
    }
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setResendCountdown(0);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} flex items-center justify-center relative overflow-hidden`}>
      {/* Animated Background */}
      <AnimatedBackground variant={isDark ? 'dark' : 'light'} intensity="normal" />

      {/* Pulsing Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(147, 51, 234, 0.4)' : 'rgba(147, 51, 234, 0.15)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            backgroundPosition: { duration: 20, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              ${isDark ? 'rgba(249, 115, 22, 0.1)' : 'rgba(249, 115, 22, 0.08)'} 35px,
              ${isDark ? 'rgba(249, 115, 22, 0.1)' : 'rgba(249, 115, 22, 0.08)'} 36px
            )`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            backgroundPosition: { duration: 15, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 },
          }}
        />
      </div>

      {/* Pulsing Wave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${
              isDark ? 'rgba(147, 51, 234, 0.15)' : 'rgba(147, 51, 234, 0.08)'
            }, transparent 50%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [0.8, 2.5, 0.8],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main Container - Centered */}
      <div className="relative z-10 w-full max-w-md px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="vertical" size="lg" />
          </div>

          {/* Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={authStep}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-8"
            >
              {authStep === 'auth' && (
                <>
                  <h2 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {mode === 'login' ? 'Welcome back! 👋' : 'Ready to join? 🚀'}
                  </h2>
                  <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {mode === 'login' 
                      ? "Great to see you again! Let's pick up where you left off." 
                      : "You're moments away from connecting with thousands of HR professionals like you."
                    }
                  </p>
                </>
              )}
              {authStep === 'email' && (
                <>
                  <h2 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Verify your email 📧
                  </h2>
                  <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    We'll send you a verification code to confirm your identity
                  </p>
                </>
              )}
              {authStep === 'otp' && (
                <>
                  <h2 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Enter verification code 🔐
                  </h2>
                  <p className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    We sent a 6-digit code to {email}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Auth Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {/* STEP 1: Email/Social Authentication */}
              {authStep === 'auth' && (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Social Login Section */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        setIsLoading(true);
                        setLoginMethod('linkedin');
                        toast.success('Connecting with LinkedIn...');
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setIsLoading(false);
                        setEmail('user@linkedin.example.com');
                        setAuthStep('otp');
                        setResendCountdown(30);
                        toast.success('OTP sent to your email');
                      }}
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#0077B5] hover:bg-[#006399] text-white font-semibold flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-50"
                    >
                      <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5 rounded-[2px]" />
                      Continue with LinkedIn
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        setIsLoading(true);
                        setLoginMethod('google');
                        toast.success('Connecting with Google...');
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setIsLoading(false);
                        setEmail('user@google.example.com');
                        setAuthStep('otp');
                        setResendCountdown(30);
                        toast.success('OTP sent to your email');
                      }}
                      disabled={isLoading}
                      className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all shadow-lg disabled:opacity-50 ${
                        isDark 
                          ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200'
                      }`}
                    >
                      <img src={googleIcon} alt="Google" className="w-5 h-5" />
                      Continue with Google
                    </motion.button>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className={`absolute inset-0 flex items-center`}>
                      <div className={`w-full border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className={`px-4 text-xs font-medium ${isDark ? 'bg-[#0f1117] text-slate-500' : 'bg-white text-slate-500'}`}>
                        OR USE YOUR EMAIL
                      </span>
                    </div>
                  </div>

                  {/* Email Form Section */}
                  <div className={`p-6 rounded-2xl ${
                    isDark 
                      ? 'bg-slate-900/50 border border-slate-800/50' 
                      : 'bg-slate-50/80 border border-slate-200/50'
                  } backdrop-blur-sm space-y-4`}>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Your work email
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
                        {showEmailValidation && isValidEmail && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Password Input (only for login) */}
                    {mode === 'login' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Password
                        </label>
                        <div className="relative">
                          <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={`pl-12 pr-12 h-12 rounded-xl ${
                              isDark 
                                ? 'bg-slate-800 border-slate-700 text-white' 
                                : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        
                        <div className="flex justify-end mt-2">
                          <button className={`text-xs font-semibold ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                            Forgot password?
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Continue Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleEmailVerification}
                        disabled={!isValidEmail || isLoading}
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Just a moment...
                          </div>
                        ) : (
                          <>
                            {mode === 'login' ? 'Log me in' : 'Create my account'}
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Email Verification */}
              {authStep === 'email' && (
                <EmailVerificationStep
                  email={email}
                  setEmail={setEmail}
                  emailTouched={emailTouched}
                  setEmailTouched={setEmailTouched}
                  isValidEmail={isValidEmail}
                  isLoading={isLoading}
                  onContinue={handleEmailVerification}
                  onBack={handleBackFromEmail}
                />
              )}

              {/* STEP 3: OTP Verification */}
              {authStep === 'otp' && (
                <OTPVerificationStep
                  otp={otp}
                  setOtp={setOtp}
                  otpError={otpError}
                  setOtpError={setOtpError}
                  otpInputRefs={otpInputRefs}
                  email={email}
                  resendCountdown={resendCountdown}
                  isLoading={isLoading}
                  onVerify={handleVerifyOtp}
                  onResend={handleResendOtp}
                  onBack={handleBackFromOtp}
                  onOtpChange={handleOtpChange}
                  onOtpKeyDown={handleOtpKeyDown}
                  onOtpPaste={handleOtpPaste}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}