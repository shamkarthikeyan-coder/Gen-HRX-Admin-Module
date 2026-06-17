import { Button } from '../ui/button';
import { MessageSquare, BookOpen, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'motion/react';

interface FirstActionNudgeProps {
  userName: string;
  onAction: (action: 'post-question' | 'browse-feed' | 'view-benchmarks') => void;
}

export function FirstActionNudge({ userName, onAction }: FirstActionNudgeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const actions = [
    {
      id: 'post-question' as const,
      title: 'Ask Your First Question',
      description: 'Have a burning HR question? Ask anonymously in the Confessional Corner',
      icon: MessageSquare,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      cta: 'Post anonymously',
    },
    {
      id: 'browse-feed' as const,
      title: 'Browse the Feed',
      description: 'Explore trending questions and answers from your HR community',
      icon: BookOpen,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      cta: 'See what\'s trending',
    },
    {
      id: 'view-benchmarks' as const,
      title: 'View Benchmarks',
      description: 'See how your organization compares to peers in your industry',
      icon: TrendingUp,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      cta: 'View insights',
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'} relative overflow-hidden`}>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 shadow-lg ${
              isDark ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'
            }`}>
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-sm">You're All Set!</span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Welcome, {userName.split(' ')[0]}! 👋
            </h1>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              What would you like to do first?
            </p>
          </motion.div>

          {/* Flash Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAction(action.id)}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-800/80 backdrop-blur-xl border-2 border-slate-700 hover:border-slate-600' 
                      : 'bg-white border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-2xl'
                  }`}
                >
                  {/* Gradient Accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Card Content */}
                  <div className="relative p-6 flex flex-col h-full min-h-[280px]">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {action.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm mb-6 flex-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {action.description}
                    </p>

                    {/* CTA */}
                    <div className={`flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${action.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                      {action.cta}
                      <ArrowRight className={`w-4 h-4 ${action.color === 'purple' ? 'text-purple-600' : action.color === 'blue' ? 'text-blue-600' : 'text-orange-600'}`} />
                    </div>
                  </div>

                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tips */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`rounded-2xl p-6 border-2 max-w-2xl mx-auto ${
              isDark 
                ? 'bg-blue-500/10 border-blue-500/30 backdrop-blur-xl' 
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                  Pro Tip
                </p>
                <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
                  Toggle between your real identity and masked persona anytime. Your masked identity keeps you anonymous while preserving professional context.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}