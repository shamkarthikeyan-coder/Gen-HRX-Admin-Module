import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SplashScreen } from './components/auth/SplashScreen';
import { AuthenticationScreen } from './components/auth/AuthenticationScreen';
import { RoleSelectionScreen } from './components/auth/RoleSelectionScreen';
import { ProfileContextSetup } from './components/auth/ProfileContextSetup';
import { ServiceProviderOnboarding } from './components/auth/ServiceProviderOnboarding';
import { InterestTagsScreen } from './components/auth/InterestTagsScreen';
import { HomeFeed } from './components/HomeFeed';
import { DemoNavigationPanel } from './components/DemoNavigationPanel';
import { DecisionRooms } from './components/DecisionRooms';
import { FloatingMessagesButton } from './components/social/FloatingMessagesButton';
import { MessagingPanel } from './components/social/MessagingPanel';
import { ServiceVendorProfileEmpty } from './components/profiles/ServiceVendorProfileEmpty';
import { ServiceVendorProfileFull } from './components/profiles/ServiceVendorProfileFull';
import { UserProfile } from './components/profiles/UserProfile';
import { Marketplace } from './components/marketplace/Marketplace';
import { MyMarketplaceListing } from './components/marketplace/MyMarketplaceListing';
import { CreateListingForm } from './components/marketplace/CreateListingForm';
import { ListingPreview } from './components/marketplace/ListingPreview';
import { VendorDetailSubscribed } from './components/marketplace/VendorDetailSubscribed';
import { VendorDetailUnsubscribedOwner } from './components/marketplace/VendorDetailUnsubscribedOwner';
import { VendorDetailUnsubscribedPublic } from './components/marketplace/VendorDetailUnsubscribedPublic';
import { Settings } from './components/Settings';
import { LOGGED_IN_USER_AVATAR } from './constants/userData';

type UserRole = 'practitioner' | 'leader' | 'provider' | 'friends';

type AuthStep = 
  | 'splash'
  | 'authentication'
  | 'role-selection'
  | 'service-provider-welcome'
  | 'profile-setup'
  | 'interest-tags'
  | 'home'
  | 'decision-rooms'
  | 'marketplace'
  | 'user-profile'
  | 'service-vendor-profile-empty'
  | 'service-vendor-profile-full'
  | 'settings'
  | 'marketplace-listing-empty'
  | 'marketplace-listing-full'
  | 'create-listing-form'
  | 'listing-preview'
  | 'vendor-detail-subscribed'
  | 'vendor-detail-unsubscribed-owner'
  | 'vendor-detail-unsubscribed-public';

interface UserData {
  email: string;
  role: UserRole;
  authMethod: 'email' | 'linkedin' | 'google';
}

function App() {
  const [currentStep, setCurrentStep] = useState<AuthStep>('splash');
  const [userData, setUserData] = useState<UserData>({
    email: '',
    role: 'practitioner',
    authMethod: 'email',
  });
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [listingData, setListingData] = useState<any>(null);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  // ============================================================================
  // SPLASH SCREEN HANDLERS
  // ============================================================================
  const handleLogin = () => {
    // Check if returning user
    const isOnboarded = localStorage.getItem('genhrx_user_onboarded');
    if (isOnboarded === 'true') {
      setCurrentStep('home');
    } else {
      // For users who want to login, go to authentication first
      setCurrentStep('authentication');
    }
  };

  const handleSignup = () => {
    // For new users, go to authentication first
    setCurrentStep('authentication');
  };

  // ============================================================================
  // AUTHENTICATION HANDLERS
  // ============================================================================
  const handleAuthentication = (email: string, method: 'email' | 'linkedin' | 'google') => {
    setUserData(prev => ({
      ...prev,
      email,
      authMethod: method,
    }));
    // After authentication, go to role selection
    setCurrentStep('role-selection');
  };

  // ============================================================================
  // ROLE SELECTION HANDLER
  // ============================================================================
  const handleRoleSelected = (role: UserRole) => {
    console.log('Role selected:', role);
    setUserData(prev => ({ ...prev, role }));
    // After role selection, go to profile setup
    if (role === 'provider') {
      setCurrentStep('service-provider-welcome');
    } else {
      setCurrentStep('profile-setup');
    }
  };

  // ============================================================================
  // HR PROVIDER WELCOME HANDLER
  // ============================================================================
  const handleServiceProviderWelcome = () => {
    // Mark user as onboarded and go directly to home
    localStorage.setItem('genhrx_user_onboarded', 'true');
    setCurrentStep('home');
  };

  // ============================================================================
  // PROFILE SETUP HANDLER
  // ============================================================================
  const handleProfileSetup = () => {
    setCurrentStep('interest-tags');
  };

  // ============================================================================
  // INTEREST TAGS HANDLER
  // ============================================================================
  const handleInterestTagsComplete = () => {
    // Mark user as onboarded
    localStorage.setItem('genhrx_user_onboarded', 'true');
    setCurrentStep('home');
  };

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <ThemeProvider>
      <div className={currentStep === 'home' || currentStep === 'decision-rooms' || currentStep === 'marketplace' || currentStep === 'user-profile' || currentStep === 'service-vendor-profile-empty' || currentStep === 'service-vendor-profile-full' || currentStep === 'settings' || currentStep === 'marketplace-listing-empty' || currentStep === 'marketplace-listing-full' || currentStep === 'create-listing-form' || currentStep === 'listing-preview' ? '' : 'h-screen overflow-hidden'}>
        
        {/* STEP 1: SPLASH SCREEN */}
        {currentStep === 'splash' && (
          <SplashScreen
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        )}

        {/* STEP 2: AUTHENTICATION (Email/Social Login + OTP) */}
        {currentStep === 'authentication' && (
          <AuthenticationScreen
            onContinue={handleAuthentication}
            onBack={() => setCurrentStep('splash')}
          />
        )}

        {/* STEP 3: ROLE SELECTION */}
        {currentStep === 'role-selection' && (
          <RoleSelectionScreen
            onRoleSelected={handleRoleSelected}
            onBack={() => setCurrentStep('authentication')}
          />
        )}

        {/* STEP 4: HR PROVIDER WELCOME */}
        {currentStep === 'service-provider-welcome' && (
          <ServiceProviderOnboarding
            onContinue={handleServiceProviderWelcome}
            onBack={() => setCurrentStep('role-selection')}
          />
        )}

        {/* STEP 5: PROFILE & CONTEXT SETUP */}
        {currentStep === 'profile-setup' && (
          <ProfileContextSetup
            userRole={userData.role}
            email={userData.email}
            onContinue={handleProfileSetup}
            onBack={() => setCurrentStep('role-selection')}
          />
        )}

        {/* STEP 6: INTEREST TAGS */}
        {currentStep === 'interest-tags' && (
          <InterestTagsScreen
            userRole={userData.role}
            onContinue={handleInterestTagsComplete}
            onBack={() => setCurrentStep('profile-setup')}
          />
        )}

        {/* STEP 7: HOME */}
        {currentStep === 'home' && (
          <HomeFeed
            userData={{
              role: userData.role,
              email: userData.email,
              authMethod: userData.authMethod,
              profile: null,
              interestTags: [],
              isVerified: false,
            }}
            onLogout={() => setCurrentStep('splash')}
            onBackToProfileSetup={() => setCurrentStep('profile-setup')}
            onNavigate={(view) => {
              if (view === 'marketplace') setCurrentStep('marketplace');
              else if (view === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (view === 'profile') setCurrentStep('user-profile');
              else if (view === 'settings') setCurrentStep('settings');
            }}
          />
        )}

        {/* STEP 8: DECISION ROOMS */}
        {currentStep === 'decision-rooms' && (
          <DecisionRooms 
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onLogout={() => setCurrentStep('splash')}
          />
        )}

        {/* STEP 9: MARKETPLACE */}
        {currentStep === 'marketplace' && (
          <Marketplace
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley from marketplace
            }}
            onVendorClick={(vendor) => {
              setSelectedVendor(vendor);
              setCurrentStep('vendor-detail-subscribed');
            }}
          />
        )}

        {/* STEP 10: USER PROFILE */}
        {currentStep === 'user-profile' && (
          <UserProfile onNavigate={(tab) => {
            if (tab === 'home') setCurrentStep('home');
            else if (tab === 'decision-rooms') setCurrentStep('decision-rooms');
            else if (tab === 'marketplace') setCurrentStep('marketplace');
            else if (tab === 'profile') setCurrentStep('user-profile');
            else if (tab === 'settings') setCurrentStep('settings');
          }} />
        )}

        {/* STEP 11: SERVICE VENDOR PROFILE (EMPTY) */}
        {currentStep === 'service-vendor-profile-empty' && (
          <ServiceVendorProfileEmpty />
        )}

        {/* STEP 12: SERVICE VENDOR PROFILE (FULL) */}
        {currentStep === 'service-vendor-profile-full' && (
          <ServiceVendorProfileFull />
        )}

        {/* STEP 13: SETTINGS */}
        {currentStep === 'settings' && (
          <Settings 
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley from settings
            }}
            onMarketplaceListing={() => setCurrentStep('marketplace-listing-empty')}
          />
        )}

        {/* STEP 14: MARKETPLACE LISTING (EMPTY) */}
        {currentStep === 'marketplace-listing-empty' && (
          <MyMarketplaceListing 
            hasListing={false}
            onBack={() => setCurrentStep('settings')}
            onCreateListing={() => setCurrentStep('create-listing-form')}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
          />
        )}

        {/* STEP 15: MARKETPLACE LISTING (FULL) */}
        {currentStep === 'marketplace-listing-full' && (
          <MyMarketplaceListing 
            hasListing={true}
            onBack={() => setCurrentStep('settings')}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
          />
        )}

        {/* STEP 16: CREATE LISTING FORM */}
        {currentStep === 'create-listing-form' && (
          <CreateListingForm
            onBack={() => setCurrentStep('marketplace-listing-empty')}
            onComplete={(data) => {
              setListingData(data);
              setCurrentStep('listing-preview');
            }}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
          />
        )}

        {/* STEP 17: LISTING PREVIEW */}
        {currentStep === 'listing-preview' && listingData && (
          <ListingPreview
            listingData={listingData}
            onBack={() => setCurrentStep('create-listing-form')}
            onEdit={() => setCurrentStep('create-listing-form')}
            onPublish={() => setCurrentStep('marketplace-listing-full')}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
          />
        )}

        {/* STEP 18: VENDOR DETAIL (SUBSCRIBED) */}
        {currentStep === 'vendor-detail-subscribed' && (
          <VendorDetailSubscribed
            vendor={selectedVendor}
            onBack={() => setCurrentStep('marketplace')}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
          />
        )}

        {/* STEP 19: VENDOR DETAIL (UNSUBSCRIBED - OWNER) */}
        {currentStep === 'vendor-detail-unsubscribed-owner' && (
          <VendorDetailUnsubscribedOwner
            onBack={() => setCurrentStep('marketplace')}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
            onSubscribe={() => {
              // Handle subscribe action
              console.log('Subscribe clicked');
            }}
          />
        )}

        {/* STEP 20: VENDOR DETAIL (UNSUBSCRIBED - PUBLIC) */}
        {currentStep === 'vendor-detail-unsubscribed-public' && (
          <VendorDetailUnsubscribedPublic
            onBack={() => setCurrentStep('marketplace')}
            onLogout={() => setCurrentStep('splash')}
            onNavigate={(tab) => {
              if (tab === 'home') setCurrentStep('home');
              else if (tab === 'decisionRooms') setCurrentStep('decision-rooms');
              else if (tab === 'marketplace') setCurrentStep('marketplace');
              else if (tab === 'profile') setCurrentStep('user-profile');
              else if (tab === 'settings') setCurrentStep('settings');
            }}
            onCreatePost={() => {
              // Handle create parley
            }}
          />
        )}
      </div>

      {/* Demo Navigation Panel - Fixed Position */}
      <DemoNavigationPanel
        currentStep={currentStep}
        onNavigate={setCurrentStep}
      />

      {/* GLOBAL PERSISTENT UI - Mounted Once, Always Present */}
      {/* Floating Messages Button - Show only when logged in AND messaging is closed */}
      {(currentStep === 'home' || currentStep === 'decision-rooms' || currentStep === 'marketplace' || currentStep === 'user-profile' || currentStep === 'service-vendor-profile-empty' || currentStep === 'service-vendor-profile-full') && !isMessagingOpen && (
        <FloatingMessagesButton
          onClick={() => setIsMessagingOpen(true)}
          badge={3}
          userAvatar={LOGGED_IN_USER_AVATAR}
        />
      )}

      {/* Messaging Panel - Show only when opened */}
      {isMessagingOpen && (
        <MessagingPanel
          isOpen={isMessagingOpen}
          onClose={() => setIsMessagingOpen(false)}
        />
      )}
    </ThemeProvider>
  );
}

export default App;