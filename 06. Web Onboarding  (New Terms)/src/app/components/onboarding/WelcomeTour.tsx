import { useState } from 'react';
import { Button } from '../ui/button';
import { 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Users, 
  ArrowRight,
  Check
} from 'lucide-react';

interface WelcomeTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const tourSteps = [
  {
    icon: Shield,
    color: 'from-purple-500 to-purple-600',
    title: 'Verified Anonymity',
    description: 'Ask sensitive questions anonymously while maintaining professional context. Your identity is protected, but your expertise is recognized.',
    feature: 'Post anonymously in Confessional Corner',
  },
  {
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600',
    title: 'Real HR Answers',
    description: 'Get verified peer-to-peer guidance from experienced HR professionals who understand your context and challenges.',
    feature: 'Connect with verified HR professionals',
  },
  {
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    title: 'Smart Benchmarks',
    description: 'Compare your policies, compensation, and practices against peers in your industry and company size in real-time.',
    feature: 'Access live benchmark data',
  },
  {
    icon: Users,
    color: 'from-amber-500 to-amber-600',
    title: 'Personalized Feed',
    description: 'Your feed is tailored to your industry, role, and interests. See only the most relevant discussions and insights.',
    feature: 'Curated content just for you',
  },
];

export function WelcomeTour({ onComplete, onSkip }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tourSteps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === tourSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col text-white overflow-hidden">
      {/* Skip Button */}
      <div className="flex justify-end mb-4 shrink-0">
        <button
          onClick={onSkip}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          Skip Tour
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-2 mb-8 shrink-0">
        {tourSteps.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index === currentStep
                ? 'bg-white'
                : index < currentStep
                ? 'bg-white/60'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="text-center">
          <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
            <Icon className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl font-bold mb-3">{step.title}</h1>
          <p className="text-slate-300 text-base mb-6 leading-relaxed px-2">
            {step.description}
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-sm">{step.feature}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-3 shrink-0 mt-6">
        <Button
          onClick={handleNext}
          className="w-full bg-white text-slate-900 hover:bg-slate-100"
        >
          {isLastStep ? "Let's Get Started" : 'Next'}
          {!isLastStep && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>

        {currentStep > 0 && (
          <Button
            onClick={handlePrevious}
            variant="ghost"
            className="w-full text-white hover:bg-white/10"
          >
            Previous
          </Button>
        )}
      </div>

      {/* Step Counter */}
      <div className="text-center mt-3 text-sm text-slate-400 shrink-0">
        {currentStep + 1} of {tourSteps.length}
      </div>
    </div>
  );
}
