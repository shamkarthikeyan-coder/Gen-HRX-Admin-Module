import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import logoIcon from 'figma:asset/99dbe374287a3d7d378f8cba7e6d2a8e3a3c94f4.png';
import { toast } from 'sonner';

interface SignupScreenProps {
  onNext: (data: SignupData) => void;
  onSocialSignup: (provider: 'google' | 'microsoft' | 'linkedin') => void;
  onSwitchToLogin: () => void;
}

export interface SignupData {
  type: 'email' | 'phone' | 'invite';
  value: string;
  inviteCode?: string;
}

export function SignupScreen({ onNext, onSocialSignup, onSwitchToLogin }: SignupScreenProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Verification code sent to your email');
      onNext({ type: 'email', value: email });
    }
  };

  const handleSocialSignup = (provider: 'google' | 'microsoft' | 'linkedin') => {
    const providerNames = {
      google: 'Google',
      microsoft: 'Microsoft',
      linkedin: 'LinkedIn'
    };
    toast.success(`Creating your account with ${providerNames[provider]}...`);
    onSocialSignup(provider);
  };

  const isValidEmail = email.includes('@') && email.includes('.');

  return (
    <>
      {/* Mobile Version (< 768px) */}
      <div className="md:hidden h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 overflow-hidden relative">
        {/* Status bar safe area */}
        <div className="h-12 bg-transparent"></div>

        {/* Content */}
        <div className="h-[calc(100%-48px)] flex flex-col justify-center px-6">
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
                <img src={logoIcon} alt="genHRX" className="w-24 h-24 mx-auto rounded-[10px]" />
              </div>

              {/* Brand Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-bold text-white mb-1.5"
              >
                genHRX
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-white/90 text-sm font-medium"
              >
                Your confidential HR community
              </motion.p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-3"
            >
              {/* Social Login Buttons */}
              <SocialButton
                icon={<GoogleIcon />}
                label="Continue with Google"
                onClick={() => handleSocialSignup('google')}
              />

              <SocialButton
                icon={<LinkedInIcon />}
                label="Continue with LinkedIn"
                onClick={() => handleSocialSignup('linkedin')}
              />

              {/* Divider */}
              <div className="text-center py-2">
                <span className="text-sm text-white/80 font-medium">or with email</span>
              </div>

              {/* Email Input */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="your.name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-5 text-base bg-white/95 border-2 border-white/20 rounded-2xl focus:border-white focus:ring-0 focus:outline-none placeholder:text-slate-400 transition-all backdrop-blur-sm"
                  required
                />

                <Button
                  type="submit"
                  disabled={!isValidEmail}
                  className="w-full h-14 bg-white text-purple-600 hover:bg-white/90 text-base font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center pt-2">
                <p className="text-sm text-white/90">
                  Already have an account?{' '}
                  <button
                    onClick={onSwitchToLogin}
                    className="font-bold text-white underline hover:no-underline transition-all"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Web Version (>= 768px) */}
      <div className="hidden md:flex h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex"
        >
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-orange-500 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.4 }}
              className="text-center relative z-10"
            >
              {/* Logo */}
              <div className="mb-6">
                <img src={logoIcon} alt="genHRX" className="w-32 h-32 mx-auto rounded-[10px] shadow-2xl" />
              </div>

              {/* Brand Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-5xl font-bold mb-3"
              >
                genHRX
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white/90 text-lg font-medium mb-8"
              >
                Your confidential HR community
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-4 text-left max-w-sm mx-auto"
              >
                {[
                  '🤝 Connect with HR professionals',
                  '💼 Share insights & best practices',
                  '🔒 Confidential & secure platform',
                  '🚀 Advance your HR career'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90">
                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
            {/* Mobile logo for md screens */}
            <div className="lg:hidden text-center mb-8">
              <img src={logoIcon} alt="genHRX" className="w-20 h-20 mx-auto rounded-[10px] mb-4" />
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to genHRX</h1>
              <p className="text-slate-600">Your confidential HR community</p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="hidden lg:block text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
              <p className="hidden lg:block text-slate-600 mb-8">Join thousands of HR professionals</p>

              <div className="space-y-4">
                {/* Social Login Buttons */}
                <SocialButton
                  icon={<GoogleIcon />}
                  label="Continue with Google"
                  onClick={() => handleSocialSignup('google')}
                  variant="web"
                />

                <SocialButton
                  icon={<LinkedInIcon />}
                  label="Continue with LinkedIn"
                  onClick={() => handleSocialSignup('linkedin')}
                  variant="web"
                />

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500 font-medium">or with email</span>
                  </div>
                </div>

                {/* Email Input */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Work Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 px-4 text-base bg-white border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-0 focus:outline-none placeholder:text-slate-400 transition-all"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={!isValidEmail}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white text-base font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>

                {/* Footer */}
                <div className="text-center pt-4">
                  <p className="text-sm text-slate-600">
                    Already have an account?{' '}
                    <button
                      onClick={onSwitchToLogin}
                      className="font-bold text-purple-600 hover:text-purple-700 hover:underline transition-all"
                    >
                      Log in
                    </button>
                  </p>
                </div>

                {/* Terms */}
                <p className="text-xs text-slate-500 text-center pt-4">
                  By continuing, you agree to our{' '}
                  <a href="#" className="text-purple-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function SocialButton({ 
  icon, 
  label, 
  onClick,
  variant = 'mobile'
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  variant?: 'mobile' | 'web';
}) {
  if (variant === 'web') {
    return (
      <button
        onClick={onClick}
        className="w-full h-12 px-4 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-sm"
      >
        {icon}
        <span className="font-semibold text-base text-slate-700">{label}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full h-14 px-5 bg-white/95 backdrop-blur-sm border-2 border-white/20 hover:bg-white rounded-2xl flex items-center gap-3 transition-all active:scale-[0.98] shadow-md"
    >
      {icon}
      <span className="font-semibold text-base text-slate-900">{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}
