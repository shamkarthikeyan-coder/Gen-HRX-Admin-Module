import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import logoIcon from 'figma:asset/99dbe374287a3d7d378f8cba7e6d2a8e3a3c94f4.png';
import { toast } from 'sonner';

interface OTPVerificationProps {
  contact: string;
  type: 'email' | 'phone';
  onVerify: (otp: string) => void;
  onResend: () => void;
}

export function OTPVerification({ contact, type, onVerify, onResend }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    const allFilled = otp.every(digit => digit !== '');
    setIsComplete(allFilled);
  }, [otp]);

  useEffect(() => {
    // Auto-focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      toast.success('Verification successful!');
      onVerify(otp.join(''));
    }
  };

  const handleResend = () => {
    toast.success(`New verification code sent to ${type === 'email' ? 'your email' : 'your phone'}`);
    setCountdown(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  const renderContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Logo with Shield */}
      <div className="flex justify-center">
        <div className="relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          >
            <img src={logoIcon} alt="genHRX" className={`${isMobileView ? 'w-24 h-24' : 'w-32 h-32'} mx-auto`} />
            
            {/* Animated Shield Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
              className={`absolute -bottom-1 -right-1 ${isMobileView ? 'w-10 h-10' : 'w-12 h-12'} bg-white rounded-full flex items-center justify-center shadow-lg`}
            >
              <div className={`${isMobileView ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-purple-600 to-orange-600 rounded-full flex items-center justify-center`}>
                <ShieldCheck className={`${isMobileView ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center space-y-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`${isMobileView ? 'text-3xl' : 'text-4xl'} font-bold ${isMobileView ? 'text-white' : 'text-slate-900'}`}
        >
          Verify your {type}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`${isMobileView ? 'text-white/90' : 'text-slate-600'} text-base`}
        >
          Enter the 6-digit code sent to<br />
          <span className="font-bold">{contact}</span>
        </motion.p>
      </div>

      {/* OTP Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`${isMobileView ? 'w-12 h-14' : 'w-16 h-16'} text-center ${isMobileView ? 'text-xl' : 'text-2xl'} font-bold border-2 rounded-xl transition-all ${
                    digit 
                      ? isMobileView
                        ? 'border-white bg-white text-purple-600 shadow-lg'
                        : 'border-purple-600 bg-white text-purple-600 shadow-lg'
                      : isMobileView
                      ? 'border-white/40 bg-white/20 text-white placeholder:text-white/50'
                      : 'border-slate-300 bg-white text-slate-900'
                  } ${
                    isMobileView 
                      ? 'focus:border-white focus:bg-white focus:text-purple-600' 
                      : 'focus:border-purple-600 focus:bg-white focus:text-purple-600'
                  } focus:ring-0 focus:outline-none`}
                />
              </motion.div>
            ))}
          </div>

          {/* Verify Button */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Button
                  type="submit"
                  className={`w-full h-14 ${
                    isMobileView
                      ? 'bg-white text-purple-600 hover:bg-white/90'
                      : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white'
                  } text-base font-bold rounded-2xl shadow-lg`}
                >
                  Verify Code
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Resend Code */}
        <div className="text-center mt-6">
          {countdown > 0 ? (
            <p className={`text-sm ${isMobileView ? 'text-white/80' : 'text-slate-600'}`}>
              Didn't receive the code?{' '}
              <span className={`font-bold ${isMobileView ? 'text-white' : 'text-purple-600'}`}>Resend in {countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className={`text-sm font-bold ${
                isMobileView ? 'text-white' : 'text-purple-600'
              } underline hover:no-underline transition-all`}
            >
              Resend verification code
            </button>
          )}
        </div>
      </motion.div>

      {/* Bottom Spacing for keyboard */}
      <div className="h-8"></div>
    </motion.div>
  );

  // Mobile View (< 768px)
  if (isMobileView) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 overflow-y-auto">
        {/* Status bar safe area */}
        <div className="h-12 bg-transparent shrink-0"></div>

        {/* Content - Scrollable when keyboard appears */}
        <div className="min-h-[calc(100%-48px)] flex flex-col px-6 py-8">
          {renderContent()}
        </div>
      </div>
    );
  }

  // Web View (>= 768px)
  return (
    <div className="h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 flex items-center justify-center p-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
