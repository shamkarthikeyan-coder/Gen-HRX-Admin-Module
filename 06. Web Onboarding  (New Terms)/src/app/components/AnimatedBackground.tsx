import { motion } from 'motion/react';

// Hexagon component for honeycomb pattern
function Hexagon({ delay = 0, index }: { delay?: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute"
      style={{
        width: '80px',
        height: '80px',
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
      }}
    >
      <div 
        className="w-full h-full border-2 border-purple-400/30"
        style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(249, 115, 22, 0.05))',
        }}
      />
    </motion.div>
  );
}

// Network node component
function NetworkNode({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-orange-400"
      style={{ left: x, top: y }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Floating particle component
function FloatingParticle({ delay, duration }: { delay: number; duration: number }) {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gradient-to-br from-purple-300 to-orange-300"
      style={{ left: `${randomX}%`, top: `${randomY}%` }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0, 0.6, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

interface AnimatedBackgroundProps {
  variant?: 'dark' | 'light';
  intensity?: 'subtle' | 'normal' | 'vibrant';
}

export function AnimatedBackground({ variant = 'dark', intensity = 'normal' }: AnimatedBackgroundProps) {
  const isDark = variant === 'dark';
  
  // Adjust opacity based on intensity
  const opacityMultiplier = intensity === 'subtle' ? 0.5 : intensity === 'vibrant' ? 1.5 : 1;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ opacity: opacityMultiplier }}
      />

      {/* Honeycomb Grid Pattern */}
      <div className="absolute inset-0 opacity-20" style={{ opacity: 0.2 * opacityMultiplier }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const xOffset = row % 2 === 0 ? 0 : 40;
          
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${col * 80 + xOffset}px`,
                top: `${row * 70}px`,
              }}
            >
              <Hexagon delay={i * 0.1} index={i} />
            </div>
          );
        })}
      </div>

      {/* Network Nodes and Connections */}
      <div className="absolute inset-0" style={{ opacity: opacityMultiplier }}>
        {/* Nodes */}
        <NetworkNode x="15%" y="20%" delay={0} />
        <NetworkNode x="85%" y="25%" delay={0.5} />
        <NetworkNode x="25%" y="70%" delay={1} />
        <NetworkNode x="75%" y="75%" delay={1.5} />
        <NetworkNode x="50%" y="45%" delay={2} />
        <NetworkNode x="40%" y="15%" delay={2.5} />
        <NetworkNode x="60%" y="85%" delay={3} />
        
        {/* Connection Lines - SVG for better control */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="15%" y1="20%" x2="50%" y2="45%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.line
            x1="85%" y1="25%" x2="50%" y2="45%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
          <motion.line
            x1="25%" y1="70%" x2="50%" y2="45%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
          <motion.line
            x1="75%" y1="75%" x2="50%" y2="45%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 3 }}
          />
          <motion.line
            x1="40%" y1="15%" x2="50%" y2="45%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
          />
          <motion.line
            x1="60%" y1="85%" x2="50%" y2="45%"
            stroke="url(#gradient1)"
            strokeWidth="1"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
          />
          
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Particles */}
      <div style={{ opacity: 0.8 * opacityMultiplier }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} duration={4 + Math.random() * 2} />
        ))}
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10" style={{ opacity: 0.1 * opacityMultiplier }}>
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
}
