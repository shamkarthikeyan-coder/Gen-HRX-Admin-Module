import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, TrendingUp, Lightbulb, Building2, CheckCircle2, Briefcase, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { AnimatedBackground } from '../AnimatedBackground';
import { Logo } from '../Logo';

interface RoleSelectionScreenProps {
  onRoleSelected: (role: 'practitioner' | 'leader' | 'provider' | 'friends') => void;
  onBack: () => void;
}

const roles = [
  {
    id: 'practitioner' as const,
    icon: Users,
    title: 'HR Practitioner',
    description: 'Individual contributor or specialist',
    features: ['Ask questions anonymously', 'Get peer-to-peer advice', 'Access benchmarks'],
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'leader' as const,
    icon: TrendingUp,
    title: 'HR Leader',
    description: 'Manager and above',
    features: ['Share strategic insights', 'Lead discussions', 'Exclusive leader network'],
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    id: 'provider' as const,
    icon: Briefcase,
    title: 'HR Provider',
    description: 'Consultant, Vendor, or Solution Provider',
    features: ['Showcase expertise', 'Connect with HR professionals', 'Share industry insights'],
  },
  {
    id: 'friends' as const,
    icon: Heart,
    title: 'Friends of HR',
    description: 'Others interested in HR',
    features: ['Learn about HR', 'Network with professionals', 'Stay informed'],
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-500/10 to-teal-500/10',
  },
];

export function RoleSelectionScreen({ onRoleSelected, onBack }: RoleSelectionScreenProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedRole, setSelectedRole] = useState<typeof roles[number]['id'] | null>(null);
  const [hoveredRole, setHoveredRole] = useState<typeof roles[number]['id'] | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      toast.success(`Welcome, ${roles.find(r => r.id === selectedRole)?.title}!`);
      onRoleSelected(selectedRole);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f1117]' : 'bg-white'} flex items-center justify-center relative overflow-hidden`}>
      {/* Animated Background */}
      <AnimatedBackground variant={isDark ? 'dark' : 'light'} intensity="subtle" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-12">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Choose your role
            </h1>
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
              Help us personalize your experience. You can always change this later.
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              const isHovered = hoveredRole === role.id;

              return (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(role.id)}
                  onHoverStart={() => setHoveredRole(role.id)}
                  onHoverEnd={() => setHoveredRole(null)}
                  className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
                    isSelected
                      ? isDark
                        ? 'bg-slate-800 border-2 border-purple-500 shadow-2xl shadow-purple-500/20'
                        : 'bg-white border-2 border-purple-500 shadow-2xl shadow-purple-500/20'
                      : isDark
                      ? 'bg-slate-900/80 border-2 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-2 border-slate-200 hover:border-slate-300 shadow-lg'
                  }`}
                >
                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 ${
                    isHovered || isSelected ? 'shadow-lg' : ''
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {role.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {role.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isSelected 
                            ? 'text-purple-500' 
                            : isDark ? 'text-slate-600' : 'text-slate-400'
                        }`} />
                        <span className={`text-xs ${
                          isSelected 
                            ? isDark ? 'text-slate-300' : 'text-slate-700'
                            : isDark ? 'text-slate-500' : 'text-slate-600'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Gradient Overlay */}
                  {(isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${role.bgGradient} rounded-2xl pointer-events-none`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full max-w-md"
            >
              <Button
                onClick={handleContinue}
                disabled={!selectedRole}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>

            <button
              onClick={onBack}
              className={`text-sm font-semibold ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              } transition-colors`}
            >
              ← Back to home
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}