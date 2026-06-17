import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { motion } from 'motion/react';

interface DomainValidationProps {
  email: string;
  onValidated: (isWorkEmail: boolean, domain: string) => void;
}

// Mock domain validation - in real app, this would hit an API
const validateDomain = async (email: string): Promise<{ isWorkEmail: boolean; domain: string; company?: string }> => {
  const domain = email.split('@')[1];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Common personal email domains
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];
  
  if (personalDomains.includes(domain)) {
    return { isWorkEmail: false, domain };
  }
  
  // Mock work domains
  const workDomains: { [key: string]: string } = {
    'microsoft.com': 'Microsoft',
    'google.com': 'Google',
    'amazon.com': 'Amazon',
    'apple.com': 'Apple',
    'meta.com': 'Meta',
  };
  
  if (workDomains[domain]) {
    return { isWorkEmail: true, domain, company: workDomains[domain] };
  }
  
  // Assume other domains are work emails
  return { isWorkEmail: true, domain, company: domain.split('.')[0] };
};

export function DomainValidation({ email, onValidated }: DomainValidationProps) {
  const [status, setStatus] = useState<'validating' | 'work' | 'personal'>('validating');
  const [domain, setDomain] = useState('');
  const [company, setCompany] = useState('');
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

  useEffect(() => {
    const validate = async () => {
      const result = await validateDomain(email);
      setDomain(result.domain);
      setCompany(result.company || '');
      setStatus(result.isWorkEmail ? 'work' : 'personal');
    };
    validate();
  }, [email]);

  const handleContinue = () => {
    onValidated(status === 'work', domain);
  };

  const renderContent = () => (
    <div className="text-center">
      {status === 'validating' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${isMobileView ? 'w-20 h-20' : 'w-24 h-24'} ${
            isMobileView ? 'bg-white/20 backdrop-blur-sm' : 'bg-blue-100'
          } rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Loader2 className={`${isMobileView ? 'w-10 h-10 text-white' : 'w-12 h-12 text-blue-600'} animate-spin`} />
          </div>
          <h2 className={`${isMobileView ? 'text-3xl' : 'text-4xl'} font-bold ${
            isMobileView ? 'text-white' : 'text-slate-900'
          } mb-2`}>
            Validating Your Domain
          </h2>
          <p className={`${isMobileView ? 'text-white/90' : 'text-slate-600'} text-base`}>
            Checking {email.split('@')[1]}...
          </p>
        </motion.div>
      )}

      {status === 'work' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${isMobileView ? 'w-20 h-20' : 'w-24 h-24'} ${
            isMobileView ? 'bg-white/20 backdrop-blur-sm' : 'bg-green-100'
          } rounded-full flex items-center justify-center mx-auto mb-6`}>
            <CheckCircle className={`${isMobileView ? 'w-10 h-10 text-white' : 'w-12 h-12 text-green-600'}`} />
          </div>
          <h2 className={`${isMobileView ? 'text-3xl' : 'text-4xl'} font-bold ${
            isMobileView ? 'text-white' : 'text-slate-900'
          } mb-2`}>
            Work Email Verified!
          </h2>
          <p className={`${isMobileView ? 'text-white/90' : 'text-slate-600'} mb-6 text-base`}>
            {company && `${company} - `}{domain} is a recognized work domain
          </p>
          
          <Card className={`p-6 mb-6 ${
            isMobileView 
              ? 'bg-white/20 backdrop-blur-sm border-2 border-white/40' 
              : 'bg-green-50 border-2 border-green-200'
          }`}>
            <div className="flex items-start gap-3">
              <CheckCircle className={`w-5 h-5 ${
                isMobileView ? 'text-white' : 'text-green-600'
              } mt-0.5 flex-shrink-0`} />
              <div className="text-left">
                <p className={`font-medium ${
                  isMobileView ? 'text-white' : 'text-green-900'
                } text-sm mb-1`}>
                  Instant Verification
                </p>
                <p className={`text-xs ${
                  isMobileView ? 'text-white/90' : 'text-green-700'
                }`}>
                  Your account will be verified immediately and you'll get full access to the Confessional Corner
                </p>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleContinue}
            className={`w-full h-14 text-base font-bold rounded-2xl shadow-lg ${
              isMobileView
                ? 'bg-white text-green-600 hover:bg-white/90'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            Continue to Profile Setup
          </Button>
        </motion.div>
      )}

      {status === 'personal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${isMobileView ? 'w-20 h-20' : 'w-24 h-24'} ${
            isMobileView ? 'bg-white/20 backdrop-blur-sm' : 'bg-amber-100'
          } rounded-full flex items-center justify-center mx-auto mb-6`}>
            <AlertCircle className={`${isMobileView ? 'w-10 h-10 text-white' : 'w-12 h-12 text-amber-600'}`} />
          </div>
          <h2 className={`${isMobileView ? 'text-3xl' : 'text-4xl'} font-bold ${
            isMobileView ? 'text-white' : 'text-slate-900'
          } mb-2`}>
            Personal Email Detected
          </h2>
          <p className={`${isMobileView ? 'text-white/90' : 'text-slate-600'} mb-6 text-base`}>
            {domain} appears to be a personal email domain
          </p>
          
          <Card className={`p-6 mb-6 ${
            isMobileView 
              ? 'bg-white/20 backdrop-blur-sm border-2 border-white/40' 
              : 'bg-amber-50 border-2 border-amber-200'
          }`}>
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 ${
                isMobileView ? 'text-white' : 'text-amber-600'
              } mt-0.5 flex-shrink-0`} />
              <div className="text-left">
                <p className={`font-medium ${
                  isMobileView ? 'text-white' : 'text-amber-900'
                } text-sm mb-1`}>
                  Manual Verification Required
                </p>
                <p className={`text-xs ${
                  isMobileView ? 'text-white/90' : 'text-amber-700'
                } mb-3`}>
                  You'll need to verify your HR professional status through:
                </p>
                <ul className={`text-xs ${
                  isMobileView ? 'text-white/90' : 'text-amber-700'
                } space-y-1`}>
                  <li>• LinkedIn profile verification</li>
                  <li>• Upload of work credentials</li>
                  <li>• Invitation from verified member</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              className={`w-full h-14 text-base font-bold rounded-2xl shadow-lg ${
                isMobileView
                  ? 'bg-white text-purple-600 hover:bg-white/90'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Continue with Personal Email
            </Button>
            <Button
              variant="outline"
              className={`w-full h-14 text-base font-semibold rounded-2xl ${
                isMobileView
                  ? 'bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30'
                  : 'border-2 border-slate-300 text-slate-900 hover:bg-slate-100'
              }`}
              onClick={() => window.location.reload()}
            >
              Use Work Email Instead
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );

  // Mobile View (< 768px)
  if (isMobileView) {
    return (
      <div className="h-full bg-gradient-to-br from-purple-700 via-purple-600 to-orange-600 overflow-y-auto">
        {/* Status bar safe area */}
        <div className="h-12 bg-transparent shrink-0"></div>

        {/* Content - Centered */}
        <div className="min-h-[calc(100%-48px)] flex flex-col justify-center px-6 py-8">
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
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
