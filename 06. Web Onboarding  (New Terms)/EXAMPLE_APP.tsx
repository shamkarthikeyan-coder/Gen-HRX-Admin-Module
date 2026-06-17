/**
 * GenHRX - Complete App Integration Example
 * 
 * This file demonstrates the complete authentication flow
 * from Splash Screen to Main App.
 * 
 * Copy this structure into your /src/app/App.tsx
 */

import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';

// ============================================================================
// AUTH FLOW COMPONENTS
// ============================================================================
import { SplashScreen } from './components/auth/SplashScreen';
import { RoleSelectionScreen } from './components/auth/RoleSelectionScreen';
import { AuthenticationScreen } from './components/auth/AuthenticationScreen';
import { ProfileContextSetup, ProfileContextData } from './components/auth/ProfileContextSetup';
import { InterestTagsScreen } from './components/auth/InterestTagsScreen';
import { MaskedIdentitySetup, MaskedIdentityData } from './components/auth/MaskedIdentitySetup';

// ============================================================================
// ONBOARDING COMPONENTS
// ============================================================================
import { WelcomeTourOverlay } from './components/onboarding/WelcomeTourOverlay';
import { FirstActionNudge } from './components/onboarding/FirstActionNudge';

// ============================================================================
// MAIN APP COMPONENTS (To be created/imported)
// ============================================================================
// import { HomeFeed } from './components/social/HomeFeed';
// import { SearchPage } from './components/social/SearchPage';
// import { PostDetailView } from './components/social/PostDetailView';
// import { ConnectionsPage } from './components/social/ConnectionsPage';
// import { CreatePostModal } from './components/social/CreatePostModal';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type AuthStep = 
  | 'splash'
  | 'role-selection'
  | 'authentication'
  | 'profile-setup'
  | 'interest-tags'
  | 'masked-identity'
  | 'welcome-tour'
  | 'first-action'
  | 'home';

type UserRole = 'practitioner' | 'leader' | 'influencer';
type AuthMethod = 'email' | 'linkedin' | 'google';

interface UserData {
  role: UserRole;
  email: string;
  authMethod: AuthMethod;
  profile: ProfileContextData | null;
  interestTags: string[];
  maskedIdentity: MaskedIdentityData | null;
  isVerified: boolean;
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  const [currentStep, setCurrentStep] = useState<AuthStep>('splash');
  const [userData, setUserData] = useState<UserData>({
    role: 'practitioner',
    email: '',
    authMethod: 'email',
    profile: null,
    interestTags: [],
    maskedIdentity: null,
    isVerified: false,
  });

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Check if user is returning
    const isOnboarded = localStorage.getItem('genhrx_user_onboarded');
    const authToken = localStorage.getItem('genhrx_auth_token');
    
    if (isOnboarded === 'true' && authToken) {
      // Returning user - load their data and go to home
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      // In production: Fetch user data from backend
      // const response = await api.getCurrentUser();
      // setUserData(response.data);
      setCurrentStep('home');
    } catch (error) {
      console.error('Failed to load user data:', error);
      // If error, start fresh
      localStorage.clear();
      setCurrentStep('splash');
    }
  };

  // ============================================================================
  // SPLASH SCREEN HANDLERS
  // ============================================================================

  const handleLogin = () => {
    const isOnboarded = localStorage.getItem('genhrx_user_onboarded');
    
    if (isOnboarded === 'true') {
      setCurrentStep('home');
    } else {
      // New user using login - skip role selection
      setCurrentStep('authentication');
    }
  };

  const handleSignup = () => {
    setCurrentStep('role-selection');
  };

  // ============================================================================
  // ROLE SELECTION HANDLER
  // ============================================================================

  const handleRoleSelected = (role: UserRole) => {
    console.log('Role selected:', role);
    setUserData({ ...userData, role });
    setCurrentStep('authentication');
  };

  // ============================================================================
  // AUTHENTICATION HANDLER
  // ============================================================================

  const handleAuthentication = async (email: string, method: AuthMethod) => {
    console.log('Authentication:', email, method);
    
    // Update user data
    setUserData({ ...userData, email, authMethod: method });
    
    try {
      // In production: Send to backend for verification
      // const response = await api.verifyEmail({ email, role: userData.role });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email is from verified domain
      const domain = email.split('@')[1]?.toLowerCase();
      const verifiedDomains = ['workday.com', 'adp.com', 'paylocity.com'];
      const isVerified = verifiedDomains.includes(domain || '');
      
      setUserData(prev => ({ ...prev, isVerified }));
      
      // Proceed to profile setup
      setCurrentStep('profile-setup');
      
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (toast notification already shown in component)
    }
  };

  // ============================================================================
  // PROFILE SETUP HANDLER
  // ============================================================================

  const handleProfileSetup = async (profileData: ProfileContextData) => {
    console.log('Profile data:', profileData);
    
    setUserData({ ...userData, profile: profileData });
    
    try {
      // In production: Save to backend
      // await api.saveProfile({
      //   ...profileData,
      //   email: userData.email,
      //   role: userData.role
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentStep('interest-tags');
      
    } catch (error) {
      console.error('Profile save error:', error);
      // Error handling (toast shown in component)
    }
  };

  // ============================================================================
  // INTEREST TAGS HANDLER
  // ============================================================================

  const handleInterestTags = async (tags: string[]) => {
    console.log('Interest tags:', tags);
    
    setUserData({ ...userData, interestTags: tags });
    
    try {
      // In production: Save to backend
      // await api.saveInterests({ userId: userData.id, tags });
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentStep('masked-identity');
      
    } catch (error) {
      console.error('Interest tags save error:', error);
    }
  };

  // ============================================================================
  // MASKED IDENTITY HANDLER
  // ============================================================================

  const handleMaskedIdentity = async (maskedData: MaskedIdentityData) => {
    console.log('Masked identity:', maskedData);
    
    setUserData({ ...userData, maskedIdentity: maskedData });
    
    try {
      // In production: Complete onboarding on backend
      // const response = await api.completeOnboarding({
      //   ...userData,
      //   maskedIdentity: maskedData,
      //   onboardingCompleted: true,
      //   onboardingDate: new Date()
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mark as onboarded locally
      localStorage.setItem('genhrx_user_onboarded', 'true');
      localStorage.setItem('genhrx_user_role', userData.role);
      localStorage.setItem('genhrx_masked_mode_default', maskedData.enableByDefault.toString());
      
      // In production: Save auth token
      // localStorage.setItem('genhrx_auth_token', response.accessToken);
      localStorage.setItem('genhrx_auth_token', 'demo_token_' + Date.now());
      
      // Show welcome tour for new users
      setCurrentStep('welcome-tour');
      
    } catch (error) {
      console.error('Onboarding completion error:', error);
    }
  };

  // ============================================================================
  // WELCOME TOUR HANDLER
  // ============================================================================

  const handleWelcomeTourComplete = () => {
    console.log('Welcome tour completed');
    setCurrentStep('first-action');
  };

  // ============================================================================
  // FIRST ACTION HANDLER
  // ============================================================================

  const handleFirstAction = (action: 'post-question' | 'browse-feed' | 'view-benchmarks') => {
    console.log('First action:', action);
    
    // Track analytics
    // analytics.track('First Action Taken', { action, timestamp: new Date() });
    
    switch (action) {
      case 'post-question':
        // In production: Open CreatePostModal in anonymous mode
        // setShowCreatePostModal(true);
        // setAnonymousMode(true);
        setCurrentStep('home');
        break;
        
      case 'browse-feed':
        // Go to home feed
        setCurrentStep('home');
        break;
        
      case 'view-benchmarks':
        // In production: Navigate to benchmarks section
        // setActiveTab('benchmarks');
        setCurrentStep('home');
        break;
    }
  };

  // ============================================================================
  // LOGOUT HANDLER
  // ============================================================================

  const handleLogout = () => {
    // Clear all user data
    localStorage.clear();
    
    // Reset state
    setUserData({
      role: 'practitioner',
      email: '',
      authMethod: 'email',
      profile: null,
      interestTags: [],
      maskedIdentity: null,
      isVerified: false,
    });
    
    setCurrentStep('splash');
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <ThemeProvider>
      <div className="h-screen overflow-hidden">
        
        {/* ====================================================================
            STEP 1: SPLASH SCREEN
        ==================================================================== */}
        {currentStep === 'splash' && (
          <SplashScreen
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}

        {/* ====================================================================
            STEP 2: ROLE SELECTION
        ==================================================================== */}
        {currentStep === 'role-selection' && (
          <RoleSelectionScreen
            onRoleSelected={handleRoleSelected}
            onBack={() => setCurrentStep('splash')}
          />
        )}

        {/* ====================================================================
            STEP 3: AUTHENTICATION
        ==================================================================== */}
        {currentStep === 'authentication' && (
          <AuthenticationScreen
            userRole={userData.role}
            onContinue={handleAuthentication}
            onBack={() => {
              // If came from signup, go back to role selection
              // If came from login, go back to splash
              setCurrentStep('role-selection');
            }}
          />
        )}

        {/* ====================================================================
            STEP 4: PROFILE & CONTEXT SETUP
        ==================================================================== */}
        {currentStep === 'profile-setup' && (
          <ProfileContextSetup
            userRole={userData.role}
            email={userData.email}
            onContinue={handleProfileSetup}
            onBack={() => setCurrentStep('authentication')}
          />
        )}

        {/* ====================================================================
            STEP 5: INTEREST & EXPERTISE TAGS
        ==================================================================== */}
        {currentStep === 'interest-tags' && (
          <InterestTagsScreen
            onContinue={handleInterestTags}
            onBack={() => setCurrentStep('profile-setup')}
          />
        )}

        {/* ====================================================================
            STEP 6: MASKED IDENTITY SETUP
        ==================================================================== */}
        {currentStep === 'masked-identity' && userData.profile && (
          <MaskedIdentitySetup
            profileData={userData.profile}
            onContinue={handleMaskedIdentity}
            onBack={() => setCurrentStep('interest-tags')}
          />
        )}

        {/* ====================================================================
            STEP 7A: WELCOME TOUR OVERLAY
        ==================================================================== */}
        {currentStep === 'welcome-tour' && (
          <WelcomeTourOverlay
            onComplete={handleWelcomeTourComplete}
          />
        )}

        {/* ====================================================================
            STEP 7B: FIRST ACTION NUDGE
        ==================================================================== */}
        {currentStep === 'first-action' && userData.profile && (
          <FirstActionNudge
            userName={userData.profile.fullName}
            onAction={handleFirstAction}
          />
        )}

        {/* ====================================================================
            STEP 8: MAIN APP (HOME FEED)
        ==================================================================== */}
        {currentStep === 'home' && (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
            <div className="text-center p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🎉</span>
                </div>
                <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                  Welcome to GenHRX!
                </h1>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {userData.profile?.fullName}, you're all set. Start exploring the community!
                </p>
              </div>
              
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    Your Profile
                  </h3>
                  <div className="text-sm text-left space-y-1 text-slate-600 dark:text-slate-400">
                    <p><strong>Role:</strong> {userData.role}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Job Title:</strong> {userData.profile?.jobTitle}</p>
                    <p><strong>Industry:</strong> {userData.profile?.industry}</p>
                    <p><strong>Tags:</strong> {userData.interestTags.length} selected</p>
                    <p><strong>Masked Alias:</strong> {userData.maskedIdentity?.alias}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                  Logout & Return to Splash
                </button>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">
                This is a demo. Integrate your HomeFeed component here.
              </p>
            </div>
          </div>
        )}

        {/* ====================================================================
            TOAST NOTIFICATIONS
        ==================================================================== */}
        <Toaster 
          position="top-center"
          expand={false}
          richColors
          closeButton
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
