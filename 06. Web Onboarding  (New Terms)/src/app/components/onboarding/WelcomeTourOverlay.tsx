import { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';
import heroImage1 from 'figma:asset/3067d428ee29fc49c06400a8384fad6ca1b547a9.png';
import heroImage2 from 'figma:asset/9ee5033b8dcc93b463de700842c0884837e0aa46.png';
import heroImage3 from 'figma:asset/1dfde2bc73cd8828d37aa7ad0fcca7b2be45ebea.png';
import { toast } from 'sonner';

interface WelcomeTourOverlayProps {
  onComplete: () => void;
}

const tourSteps = [
  {
    image: heroImage1,
    title: 'Ask anything, anonymously',
    description: 'Post your toughest questions in our Confessional Corner. Stay anonymous while getting real advice from verified HR professionals.',
    gradient: 'from-purple-600/95 to-purple-800/95',
  },
  {
    image: heroImage2,
    title: 'Connect with your peers',
    description: 'Engage with thousands of HR professionals. Share insights, comment on posts, and build your network in a trusted community.',
    gradient: 'from-orange-600/95 to-orange-800/95',
  },
  {
    image: heroImage3,
    title: 'Know your market value',
    description: 'Access real-time salary benchmarks and policy comparisons from companies just like yours. Make data-driven decisions with confidence.',
    gradient: 'from-purple-600/95 to-orange-600/95',
  },
];

export function WelcomeTourOverlay({ onComplete }: WelcomeTourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('Welcome to genHRX! Start exploring the community');
      onComplete();
    }
  };

  const handleSkip = () => {
    toast('You can view the tour again from settings');
    onComplete();
  };

  const current = tourSteps[currentStep];

  return (
    <div className="absolute inset-0 z-[100] overflow-hidden w-full">
      <div className="absolute inset-0 bg-slate-950 flex flex-col overflow-hidden w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full flex flex-col"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${current.gradient}`} />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Status bar safe area */}
              <div className="h-12 shrink-0"></div>

              {/* Header with Close Button */}
              <div className="flex justify-between items-center px-6 pt-4 shrink-0">
                <div className="w-10"></div>
                <button
                  onClick={handleSkip}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Close tour"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col justify-end px-6 pb-6 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="shrink-0"
                >
                  <div className="mb-6">
                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                      {current.title}
                    </h1>
                    <p className="text-lg text-white/90 leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mb-6 shrink-0">
                    {tourSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index === currentStep
                            ? 'w-8 bg-white'
                            : 'w-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    onClick={handleNext}
                    className="w-full h-14 bg-white text-purple-600 hover:bg-white/90 font-bold text-base rounded-2xl shadow-xl shrink-0"
                  >
                    {currentStep === tourSteps.length - 1 ? (
                      <>
                        Get Started
                        <Check className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Bottom safe area */}
              <div className="h-6 shrink-0"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
