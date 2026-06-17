import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Shield, Sparkles, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Logo } from '../Logo';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedBackground } from '../AnimatedBackground';
import communityImage1 from 'figma:asset/eb8563b1f4356c6c897f7599ada8b9e47ac362bf.png';
import communityImage2 from 'figma:asset/aace94756944375a69cbb16cf0a50c99ffd75bd5.png';
import communityImage3 from 'figma:asset/b1acdd4c052b878daad702d1a7df872858f17bb0.png';
import genhrxLogo from 'figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png';

interface SplashScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

const features = [
  {
    icon: Users,
    title: '50,000+ HR Professionals',
    description: 'Join a thriving community of verified practitioners, leaders, and influencers',
  },
  {
    icon: Shield,
    title: 'Verified Anonymity',
    description: 'Ask sensitive questions with confidence. Your identity is protected.',
  },
  {
    icon: Sparkles,
    title: 'Real-Time Insights',
    description: 'Access benchmarks, best practices, and peer-to-peer guidance instantly',
  },
];

export function SplashScreen({ onLogin, onSignup }: SplashScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} relative overflow-hidden`}>
      {/* Animated Background */}
      <AnimatedBackground variant={isDark ? 'dark' : 'light'} intensity="normal" />

      {/* Dot Pattern Layer with Motion and Pulse */}
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

      {/* Diagonal Lines Pattern with Motion and Pulse */}
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

      {/* Pulsing Wave Effect Across Grid */}
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

      {/* Main Container */}
      <div className="relative z-10 h-screen flex flex-col lg:flex-row">
        
        {/* LEFT SIDE - Community & Visual */}
        <div className={`flex-1 flex flex-col justify-center items-center p-8 lg:p-16 relative ${
          isDark ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/30' : 'bg-gradient-to-br from-slate-50/80 to-purple-50/50'
        } backdrop-blur-sm`}>
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mb-12"
          >
            <Logo variant="vertical" size="xl" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-center mt-4 text-sm font-semibold tracking-wide ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              The Confidential Knowledge Network for HR
            </motion.p>
          </motion.div>

          {/* Community Images Grid */}
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              {/* Overlapping Polaroid-style Images */}
              <div className="relative h-96 flex items-center justify-center">
                
                {/* Image 1 - Back Left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: -8,
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    opacity: { delay: 0.6 },
                    scale: { delay: 0.6, type: 'spring' },
                    rotate: { delay: 0.6 },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: -5, 
                    zIndex: 50,
                    transition: { duration: 0.3 }
                  }}
                  className={`absolute left-0 top-8 w-72 ${
                    isDark ? 'bg-slate-800' : 'bg-white'
                  } p-4 rounded-2xl shadow-2xl cursor-pointer group`}
                  style={{ zIndex: 10 }}
                >
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={communityImage2}
                      alt="Collaboration"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 text-white">
                        <h4 className="font-bold text-lg">Together</h4>
                        <p className="text-xs text-white/80">We Build Better</p>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Collaboration First</span>
                  </div>
                </motion.div>

                {/* Image 2 - Center Front (Featured) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1.1,
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    opacity: { delay: 0.8 },
                    scale: { delay: 0.8, type: 'spring' },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 0,
                    zIndex: 60,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative w-80 ${
                    isDark ? 'bg-slate-800' : 'bg-white'
                  } p-4 rounded-2xl shadow-2xl cursor-pointer group border-2 ${
                    isDark ? 'border-purple-500/30' : 'border-purple-200'
                  }`}
                  style={{ zIndex: 30 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <div className="relative overflow-hidden rounded-xl mb-3">
                      <img
                        src={communityImage1}
                        alt="HR Community"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 text-white">
                          <h3 className="font-bold text-xl mb-1">One Community</h3>
                          <p className="text-sm text-white/90">United in Excellence</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-bold">Featured</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Image 3 - Back Right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 8,
                    y: [0, -12, 0],
                  }}
                  transition={{ 
                    opacity: { delay: 1 },
                    scale: { delay: 1, type: 'spring' },
                    rotate: { delay: 1 },
                    y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 5,
                    zIndex: 50,
                    transition: { duration: 0.3 }
                  }}
                  className={`absolute right-0 top-8 w-72 ${
                    isDark ? 'bg-slate-800' : 'bg-white'
                  } p-4 rounded-2xl shadow-2xl cursor-pointer group`}
                  style={{ zIndex: 10 }}
                >
                  <div className="relative overflow-hidden rounded-xl mb-3">
                    <img
                      src={communityImage3}
                      alt="Unity"
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 text-white">
                        <h4 className="font-bold text-lg">Stronger</h4>
                        <p className="text-xs text-white/80">Growing Together</p>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Innovation Hub</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Powered by genHRX */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                powered by
              </span>
              <img 
                src={genhrxLogo} 
                alt="genHRX" 
                className="h-5 w-5"
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - CTAs & Actions */}
        <div className={`flex-1 flex flex-col justify-center items-center p-8 lg:p-16 relative`}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-full max-w-md"
          >
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12 text-center lg:text-left"
            >
              <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Welcome to{' '}
                <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                  Parley
                </span>
              </h1>
              <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your trusted space for confidential HR knowledge sharing
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isHovered = hoveredFeature === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className={`relative flex items-center gap-3 p-3 rounded-2xl transition-all duration-500 cursor-pointer group overflow-hidden ${
                      isHovered
                        ? isDark
                          ? 'bg-slate-800/70 shadow-lg shadow-purple-500/10'
                          : 'bg-white/80 shadow-lg shadow-purple-200/40'
                        : isDark
                        ? 'bg-slate-900/30 shadow-sm shadow-black/5'
                        : 'bg-white/40 shadow-sm shadow-slate-200/30'
                    } ${isDark ? 'border border-slate-700/30' : 'border border-slate-200/40'} backdrop-blur-md`}
                  >
                    {/* Gradient Border Glow on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(249, 115, 22, 0.15))`,
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                      }}
                    />

                    {/* Icon Container */}
                    <motion.div
                      animate={{ 
                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ 
                        rotate: { duration: 0.4 },
                        scale: { duration: 0.2 }
                      }}
                      className="relative shrink-0"
                    >
                      {/* Subtle Glow Effect */}
                      <motion.div
                        animate={{
                          opacity: isHovered ? 0.3 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-600 to-orange-500 rounded-xl blur-md"
                      />
                      
                      <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-purple-600 via-purple-500 to-orange-500 shadow-md">
                        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 relative z-10">
                      <h3 className={`text-sm font-bold mb-0.5 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-xs leading-snug transition-colors ${
                        isDark ? 'text-slate-500' : 'text-slate-600'
                      }`}>
                        {feature.description}
                      </p>
                    </div>

                    {/* Arrow Indicator */}
                    <motion.div
                      animate={{
                        x: isHovered ? 3 : 0,
                        opacity: isHovered ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <ArrowRight className={`w-3 h-3 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={onSignup}
                  className="w-full h-14 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/30"
                >
                  <span className="flex items-center justify-center w-full">
                    Join the Community
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={onLogin}
                  variant="outline"
                  className={`w-full h-14 font-semibold text-lg rounded-2xl border-2 transition-all ${
                    isDark
                      ? 'border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600'
                      : 'border-slate-300 text-slate-900 hover:bg-slate-100 hover:border-slate-400'
                  }`}
                >
                  I Already Have an Account
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 space-y-3"
            >
              <p className={`text-xs text-center lg:text-left ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                By continuing, you agree to our{' '}
                <button className={`text-xs font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'} hover:underline`}>
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className={`text-xs font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'} hover:underline`}>
                  Privacy Policy
                </button>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Bottom Gradient */}
      <div className={`lg:hidden absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${
        isDark ? 'from-[#0f1117] to-transparent' : 'from-white to-transparent'
      } pointer-events-none`} />
    </div>
  );
}