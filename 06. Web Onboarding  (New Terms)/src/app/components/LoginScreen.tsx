import { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: (email: string, password: string, rememberDevice: boolean) => void;
  onSwitchToSignup: () => void;
  onSocialLogin: (provider: 'google' | 'microsoft' | 'linkedin') => void;
  onForgotPassword?: () => void;
}

export function LoginScreen({ onLogin, onSwitchToSignup, onSocialLogin, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    toast.success('Welcome back! Logging you in...');
    onLogin(email, password, false);
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft' | 'linkedin') => {
    const providerNames = {
      google: 'Google',
      microsoft: 'Microsoft',
      linkedin: 'LinkedIn'
    };
    toast.success(`Signing in with ${providerNames[provider]}...`);
    onSocialLogin(provider);
  };

  const isValid = email.includes('@') && email.includes('.') && password.length >= 6;

  const renderContent = () => (
    <div>
      {/* Welcome Illustration - Top */}
      <div className="mb-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="mb-4">
            <Logo className={`${isMobileView ? 'w-24 h-24' : 'w-32 h-32'} mx-auto rounded-[10px]`} />
          </div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`${isMobileView ? 'text-3xl' : 'text-4xl'} font-bold ${isMobileView ? 'text-white' : 'text-slate-900'} mb-1.5`}
          >
            Welcome back
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`${isMobileView ? 'text-white/90' : 'text-slate-600'} text-sm font-medium`}
          >
            Sign in to your genHRX account
          </motion.p>
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-3"
      >
        {/* Social Login Buttons */}
        <SocialButton
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          }
          label="Continue with Google"
          onClick={() => handleSocialLogin('google')}
          isMobile={isMobileView}
        />

        <SocialButton
          icon={
            <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          }
          label="Continue with LinkedIn"
          onClick={() => handleSocialLogin('linkedin')}
          isMobile={isMobileView}
        />

        {/* Divider */}
        <div className="text-center py-2">
          <span className={`text-sm ${isMobileView ? 'text-white/80' : 'text-slate-600'} font-medium`}>or with email</span>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
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

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-14 px-5 pr-12 text-base ${
                isMobileView 
                  ? 'bg-white/95 border-2 border-white/20 focus:border-white backdrop-blur-sm' 
                  : 'bg-white border-2 border-slate-200 focus:border-purple-600'
              } rounded-2xl focus:ring-0 focus:outline-none placeholder:text-slate-400 transition-all`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className={`text-sm font-semibold ${
                isMobileView ? 'text-white/90 hover:text-white' : 'text-purple-600 hover:text-purple-700'
              } transition-all`}
              onClick={onForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className={`w-full h-14 ${
              isMobileView
                ? 'bg-white text-purple-600 hover:bg-white/90'
                : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white'
            } text-base font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg`}
          >
            Sign In
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className={`text-sm ${isMobileView ? 'text-white/90' : 'text-slate-600'}`}>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className={`font-bold ${isMobileView ? 'text-white' : 'text-purple-600'} underline hover:no-underline transition-all`}
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );

  // Mobile View (< 768px)
  if (isMobileView) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 overflow-hidden relative">
        {/* Status bar safe area */}
        <div className="h-12 bg-transparent"></div>

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
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}

function SocialButton({ 
  icon, 
  label, 
  onClick, 
  isMobile 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  isMobile: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-14 px-5 ${
        isMobile 
          ? 'bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:bg-white' 
          : 'bg-white border-2 border-slate-200 hover:border-purple-600'
      } rounded-2xl flex items-center gap-3 transition-all active:scale-[0.98] shadow-md`}
    >
      {icon}
      <span className="font-semibold text-base text-slate-900">{label}</span>
    </button>
  );
}