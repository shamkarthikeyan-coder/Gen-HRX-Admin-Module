import image_087e9c7ad041c63ad345a286c0d5362ae60cd371 from 'figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png'
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function Logo({ variant = 'horizontal', size = 'md', className = '', showText = true }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  const horizontalSizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  const textSizeMap = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
    xl: 'h-10',
  };

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.img 
          src="figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png" 
          alt="genHRX" 
          className={`${sizeMap[size]}`}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
        />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <motion.img 
          src={image_087e9c7ad041c63ad345a286c0d5362ae60cd371}
          alt="People Parley" 
          className={`${sizeMap[size]}`}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
        />
        {showText && (
          <motion.div
            className={`${textSizeMap[size]} font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            People Parley
          </motion.div>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.img 
        src="figma:asset/087e9c7ad041c63ad345a286c0d5362ae60cd371.png"
        alt="People Parley" 
        className={`${sizeMap[size]}`}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
      />
      {showText && (
        <motion.div
          className={`${textSizeMap[size]} font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          People Parley
        </motion.div>
      )}
    </div>
  );
}