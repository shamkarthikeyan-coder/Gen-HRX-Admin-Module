import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { toast } from 'sonner';

interface ForgotPasswordScreenProps {
  onSendResetLink: (email: string) => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordScreen({ onSendResetLink, onBackToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Password reset link sent to your email');
      onSendResetLink(email);
    }
  };

  const isValidEmail = email.includes('@') && email.includes('.');

  const renderContent = () => (
    <>
      {/* Icon and Title - Top */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="mb-4">
            <Logo 
              className={`${isMobileView ? 'w-24 h-24' : 'w-32 h-32'} mx-auto rounded-[10px]`} 
            />
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`${isMobileView ? 'text-3xl' : 'text-4xl'} font-bold ${isMobileView ? 'text-white' : 'text-slate-900'} mb-1.5`}
          >
            Reset Password
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`${isMobileView ? 'text-white/90' : 'text-slate-600'} text-sm font-medium px-4`}
          >
            Enter your email and we'll send you a verification code to reset your password
          </motion.p>
        </motion.div>
      </div>

      {/* Form Section */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          {/* Email Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="your.name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-14 px-5 text-base ${
                isMobileView
                  ? 'bg-white/95 border-2 border-white/20 focus:border-white backdrop-blur-sm'
                  : 'bg-white border-2 border-slate-200 focus:border-purple-600'
              } rounded-2xl focus:ring-0 focus:outline-none placeholder:text-slate-400 transition-all`}
              required
            />

            <Button
              type="submit"
              disabled={!isValidEmail}
              className={`w-full h-14 ${
                isMobileView
                  ? 'bg-white text-purple-600 hover:bg-white/90'
                  : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white'
              } text-base font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg`}
            >
              Send Reset Code
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          {/* Info Box */}
          <div className={`${
            isMobileView
              ? 'bg-white/10 backdrop-blur-sm border border-white/20'
              : 'bg-purple-50 border border-purple-100'
          } rounded-2xl p-4`}>
            <p className={`${isMobileView ? 'text-white/90' : 'text-slate-700'} text-sm text-center`}>
              We'll send a verification code to your email. Use this code to reset your password securely.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className={`text-sm ${isMobileView ? 'text-white/90' : 'text-slate-600'}`}>
              Remember your password?{' '}
              <button
                onClick={onBackToLogin}
                className={`font-bold ${isMobileView ? 'text-white' : 'text-purple-600'} underline hover:no-underline transition-all`}
              >
                Log in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );

  // Mobile View (< 768px)
  if (isMobileView) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 overflow-hidden relative">
        {/* Status bar safe area */}
        <div className="h-12 bg-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-14 left-6 z-10">
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Back</span>
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-48px)] flex flex-col justify-center px-6 overflow-y-auto">
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
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 overflow-hidden relative"
      >
        {/* Back Button - Web */}
        <div className="absolute top-6 left-6">
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-slate-600 hover:text-purple-600 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Back</span>
          </button>
        </div>

        <div className="mt-8">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
}