import { motion } from 'motion/react';
import { ChevronRight, X, User, Bell, Shield, Eye, MessageSquare, Tag, Hash, Share2, UserX, VolumeX, Sliders, CreditCard, Accessibility, Globe, FileText, HelpCircle, LogOut, Moon, Sun, Smartphone, CheckCircle, Lock, Heart, BarChart3, Clock, Archive, Settings as SettingsIcon, Zap, Award, Users, AtSign, Briefcase, Building2, MapPin, Mail, Edit3, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { EditFieldModal } from './EditFieldModal';

interface SettingsPageProps {
  onClose: () => void;
}

type SettingsSection = 
  | 'name' | 'email' | 'bio' | 'location' | 'jobTitle' | 'company' | 'industry'
  | 'verification' | 'saved' | 'activity' | 'archive'
  | 'general' | 'appearance' | 'notifications' | 'language' | 'accessibility'
  | 'privacy' | 'privateAccount' | 'content' | 'restricted' | 'muted'
  | 'messages' | 'tags' | 'comments' | 'sharing'
  | 'creator' | 'professional' | 'subscriptions'
  | 'terms' | 'help' | 'about';

type SettingsView = 'main' | 'profile' | 'app' | 'notifications' | 'privacy' | 'messages' | 'tags' | 'comments' | 'sharing' | 'restricted' | 'muted' | 'content' | 'subscriptions' | 'accessibility' | 'language' | 'saved' | 'activity' | 'verification' | 'creator' | 'terms';

type ModalType = 'editName' | 'editEmail' | 'editBio' | 'editJobTitle' | 'editCompany' | 'editIndustry' | 'editLocation' | null;

export function SettingsPage({ onClose }: SettingsPageProps) {
  const { isDark, toggleTheme } = useTheme();
  const { userData, updateUserData } = useUser();
  const [activeSection, setActiveSection] = useState<SettingsSection>('name');
  const [editingField, setEditingField] = useState<SettingsSection | null>(null);
  const [editValue, setEditValue] = useState('');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Mobile state management
  const [currentView, setCurrentView] = useState<SettingsView>('main');
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Toggle states
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [allowSharing, setAllowSharing] = useState(true);

  // Safety check for userData
  const safeUserData = userData || {
    name: '',
    email: '',
    bio: '',
    location: '',
    jobTitle: '',
    company: '',
    industry: '',
  };

  // Detect viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleEdit = (field: SettingsSection, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSaveEdit = () => {
    if (!editingField) return;
    
    const fieldMap: Record<string, string> = {
      'name': 'name',
      'email': 'email',
      'bio': 'bio',
      'location': 'location',
      'jobTitle': 'jobTitle',
      'company': 'company',
      'industry': 'industry',
    };

    const key = fieldMap[editingField];
    if (key) {
      updateUserData({ [key]: editValue });
    }
    setEditingField(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleBackNavigation = () => {
    if (currentView === 'main') {
      onClose();
    } else {
      setCurrentView('main');
    }
  };

  // Sidebar navigation items
  const sidebarItems = [
    {
      group: 'Account',
      items: [
        { id: 'name' as SettingsSection, icon: User, label: 'Name', editable: true },
        { id: 'email' as SettingsSection, icon: Mail, label: 'Email', editable: true },
        { id: 'bio' as SettingsSection, icon: Edit3, label: 'Bio', editable: true },
        { id: 'location' as SettingsSection, icon: MapPin, label: 'Location', editable: true },
        { id: 'jobTitle' as SettingsSection, icon: Briefcase, label: 'Job Title', editable: true },
        { id: 'company' as SettingsSection, icon: Building2, label: 'Company', editable: true },
        { id: 'industry' as SettingsSection, icon: AtSign, label: 'Industry', editable: true },
        { id: 'verification' as SettingsSection, icon: CheckCircle, label: 'Verification' },
        { id: 'saved' as SettingsSection, icon: Heart, label: 'Saved Posts' },
        { id: 'activity' as SettingsSection, icon: BarChart3, label: 'Your Activity' },
        { id: 'archive' as SettingsSection, icon: Archive, label: 'Archive' },
      ]
    },
    {
      group: 'App Settings',
      items: [
        { id: 'general' as SettingsSection, icon: SettingsIcon, label: 'General' },
        { id: 'appearance' as SettingsSection, icon: isDark ? Sun : Moon, label: 'Appearance', toggle: true },
        { id: 'notifications' as SettingsSection, icon: Bell, label: 'Notifications' },
        { id: 'language' as SettingsSection, icon: Globe, label: 'Language' },
        { id: 'accessibility' as SettingsSection, icon: Accessibility, label: 'Accessibility' },
      ]
    },
    {
      group: 'Privacy & Security',
      items: [
        { id: 'privacy' as SettingsSection, icon: Shield, label: 'Account Privacy' },
        { id: 'privateAccount' as SettingsSection, icon: Lock, label: 'Private Account', toggle: true },
        { id: 'content' as SettingsSection, icon: Eye, label: 'Content Preferences' },
        { id: 'restricted' as SettingsSection, icon: UserX, label: 'Restricted Accounts' },
        { id: 'muted' as SettingsSection, icon: VolumeX, label: 'Muted Accounts' },
      ]
    },
    {
      group: 'Interactions',
      items: [
        { id: 'messages' as SettingsSection, icon: MessageSquare, label: 'Messages and Replies' },
        { id: 'tags' as SettingsSection, icon: Tag, label: 'Tags and Mentions' },
        { id: 'comments' as SettingsSection, icon: Hash, label: 'Comments' },
        { id: 'sharing' as SettingsSection, icon: Share2, label: 'Sharing and Reuse' },
      ]
    },
    {
      group: 'For Creators',
      items: [
        { id: 'creator' as SettingsSection, icon: Zap, label: 'Creator Tools' },
        { id: 'professional' as SettingsSection, icon: Award, label: 'Professional Dashboard' },
        { id: 'subscriptions' as SettingsSection, icon: CreditCard, label: 'Subscriptions' },
      ]
    },
    {
      group: 'About',
      items: [
        { id: 'terms' as SettingsSection, icon: FileText, label: 'Terms and Policies' },
        { id: 'help' as SettingsSection, icon: HelpCircle, label: 'Help Center' },
        { id: 'about' as SettingsSection, icon: Smartphone, label: 'About genHRX' },
      ]
    },
  ];

  const SidebarItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
    const handleClick = () => {
      if (item.toggle) {
        if (item.id === 'appearance') {
          toggleTheme();
        } else if (item.id === 'privateAccount') {
          setPrivateAccount(!privateAccount);
        }
      } else {
        setActiveSection(item.id);
        if (editingField) {
          setEditingField(null);
          setEditValue('');
        }
      }
    };

    const getToggleValue = () => {
      if (item.id === 'appearance') return isDark;
      if (item.id === 'privateAccount') return privateAccount;
      return false;
    };

    return (
      <button
        onClick={handleClick}
        className={`w-full px-4 py-2.5 flex items-center gap-3 transition-colors ${
          isActive 
            ? isDark 
              ? 'bg-slate-800 text-white' 
              : 'bg-slate-100 text-slate-900'
            : isDark 
              ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium flex-1 text-left truncate">{item.label}</span>
        {item.toggle && (
          <div className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
            getToggleValue() 
              ? 'bg-gradient-to-r from-purple-600 to-orange-500' 
              : isDark ? 'bg-slate-700' : 'bg-slate-300'
          }`}>
            <motion.div
              className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md"
              animate={{ left: getToggleValue() ? '18px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        )}
      </button>
    );
  };

  const renderEditForm = () => {
    if (!editingField) return null;

    const fieldConfig: Record<string, { title: string; placeholder: string; type: 'input' | 'textarea' }> = {
      name: { title: 'Edit Name', placeholder: 'Enter your name', type: 'input' },
      email: { title: 'Edit Email', placeholder: 'Enter your email', type: 'input' },
      bio: { title: 'Edit Bio', placeholder: 'Tell us about yourself...', type: 'textarea' },
      location: { title: 'Edit Location', placeholder: 'e.g. San Francisco, CA', type: 'input' },
      jobTitle: { title: 'Edit Job Title', placeholder: 'e.g. Senior HR Director', type: 'input' },
      company: { title: 'Edit Company', placeholder: 'e.g. Tech Corp', type: 'input' },
      industry: { title: 'Edit Industry', placeholder: 'e.g. Technology', type: 'input' },
    };

    const config = fieldConfig[editingField];
    if (!config) return null;

    return (
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {config.title}
        </h2>
        <div className="space-y-4">
          {config.type === 'input' ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={config.placeholder}
              autoFocus
              className={`w-full px-4 py-3 rounded-xl border ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          ) : (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={config.placeholder}
              autoFocus
              rows={6}
              className={`w-full px-4 py-3 rounded-xl border resize-none ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          )}
          <div className="flex gap-3">
            <button
              onClick={handleCancelEdit}
              className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                isDark 
                  ? 'bg-slate-800 text-white hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 transition-opacity"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (editingField) {
      return renderEditForm();
    }

    const contentMap: Record<SettingsSection, () => JSX.Element> = {
      name: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Name</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {safeUserData.name || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editName')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Name
          </button>
        </div>
      ),
      email: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Email</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {safeUserData.email || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editEmail')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Email
          </button>
        </div>
      ),
      bio: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Bio</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'} whitespace-pre-wrap`}>
            {safeUserData.bio || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editBio')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Bio
          </button>
        </div>
      ),
      location: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Location</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {safeUserData.location || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editLocation')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Location
          </button>
        </div>
      ),
      jobTitle: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Job Title</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {safeUserData.jobTitle || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editJobTitle')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Job Title
          </button>
        </div>
      ),
      company: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Company</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {safeUserData.company || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editCompany')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Company
          </button>
        </div>
      ),
      industry: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Industry</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {safeUserData.industry || 'Not set'}
          </p>
          <button
            onClick={() => setActiveModal('editIndustry')}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isDark 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            Edit Industry
          </button>
        </div>
      ),
      verification: () => (
        <div className="p-6">
          <div className={`p-6 rounded-xl mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-purple-50'}`}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-purple-900'}`}>
                  Get Verified
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-purple-800'}`}>
                  Verify your HR professional status to unlock exclusive features and build trust in the community.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <FileText className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Verification Requirements</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>What you need to know</p>
                </div>
              </div>
            </button>
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <Shield className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Submit Verification</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Start the verification process</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      ),
      saved: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Saved Posts</h2>
          <div className={`p-12 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">No saved posts yet</p>
            <p className="text-sm mt-2">Save posts to view them later</p>
          </div>
        </div>
      ),
      activity: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Your Activity</h2>
          <div className="space-y-3">
            {[
              { icon: Clock, title: 'Time Spent', subtitle: 'View your daily usage' },
              { icon: BarChart3, title: 'Interactions', subtitle: 'Likes, comments, shares' },
              { icon: Eye, title: 'Posts Viewed', subtitle: 'Content you\'ve seen' },
              { icon: Users, title: 'Accounts Visited', subtitle: 'Profiles you\'ve viewed' },
            ].map((item, i) => (
              <button key={i} className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      archive: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Archive</h2>
          <div className={`p-12 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <Archive className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">No archived posts</p>
            <p className="text-sm mt-2">Archive posts to hide them from your profile</p>
          </div>
        </div>
      ),
      general: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>General Settings</h2>
          <div className="space-y-3">
            {[
              { icon: Smartphone, title: 'Data Usage', subtitle: 'Manage cellular data' },
              { icon: Archive, title: 'Storage', subtitle: 'Clear cache and data' },
              { icon: Bell, title: 'Sound', subtitle: 'Notification sounds', toggle: true },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                </div>
                {item.toggle && (
                  <div className={`relative w-11 h-6 rounded-full transition-colors bg-gradient-to-r from-purple-600 to-orange-500`}>
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: '22px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      notifications: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Notifications</h2>
          <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-3">
              <Bell className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Push Notifications</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Enable push notifications</p>
              </div>
              <div 
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  notificationsEnabled 
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500' 
                    : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: notificationsEnabled ? '22px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          </div>
          <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Activity Notifications</h3>
          <div className="space-y-3">
            {[
              { icon: Heart, title: 'Likes', subtitle: 'When someone likes your post' },
              { icon: MessageSquare, title: 'Comments', subtitle: 'When someone comments on your post' },
              { icon: Users, title: 'New Followers', subtitle: 'When someone follows you' },
              { icon: Tag, title: 'Mentions', subtitle: 'When someone mentions you' },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                </div>
                <div className={`relative w-11 h-6 rounded-full transition-colors bg-gradient-to-r from-purple-600 to-orange-500`}>
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ left: '22px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      language: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Language</h2>
          <div className="space-y-2">
            {['English (US)', 'Spanish', 'French', 'German'].map((lang, i) => (
              <button 
                key={i}
                className={`w-full p-4 rounded-xl text-left transition-colors flex items-center gap-3 ${
                  i === 0 
                    ? isDark ? 'bg-slate-800' : 'bg-slate-100'
                    : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                }`}
              >
                <Globe className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <span className={`text-sm font-medium flex-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{lang}</span>
                {i === 0 && <Check className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />}
              </button>
            ))}
          </div>
        </div>
      ),
      accessibility: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Accessibility</h2>
          <div className="space-y-3">
            {[
              { icon: Accessibility, title: 'Screen Reader', subtitle: 'Optimize for screen readers', toggle: true, value: false },
              { icon: Eye, title: 'Text Size', subtitle: 'Adjust text size' },
              { icon: Sliders, title: 'Reduce Motion', subtitle: 'Minimize animations', toggle: true, value: false },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                </div>
                {item.toggle && (
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${
                    item.value 
                      ? 'bg-gradient-to-r from-purple-600 to-orange-500' 
                      : isDark ? 'bg-slate-700' : 'bg-slate-300'
                  }`}>
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: item.value ? '22px' : '2px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      privacy: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Account Privacy</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Control who can see your content and interact with you on genHRX.
          </p>
          <div className="space-y-3">
            {[
              { icon: Eye, title: 'Story Privacy', subtitle: 'Control who can see your stories' },
              { icon: Users, title: 'Close Friends', subtitle: 'Share with close friends only' },
              { icon: Globe, title: 'Profile Visibility', subtitle: 'Control who can find you' },
              { icon: BarChart3, title: 'Activity Status', subtitle: 'Show when you\'re active', toggle: true },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                </div>
                {item.toggle && (
                  <div className={`relative w-11 h-6 rounded-full transition-colors bg-gradient-to-r from-purple-600 to-orange-500`}>
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: '22px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      content: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Content Preferences</h2>
          <div className="space-y-3">
            {[
              { icon: Eye, title: 'Sensitive Content', subtitle: 'Control sensitive content' },
              { icon: Sliders, title: 'Content Filtering', subtitle: 'Filter specific topics' },
              { icon: BarChart3, title: 'Trending Content', subtitle: 'Show trending posts', toggle: true },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                </div>
                {item.toggle && (
                  <div className={`relative w-11 h-6 rounded-full transition-colors bg-gradient-to-r from-purple-600 to-orange-500`}>
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{ left: '22px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      restricted: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Restricted Accounts</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Restrict accounts to limit interactions without blocking them.
          </p>
          <div className={`p-12 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <UserX className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">No restricted accounts</p>
          </div>
        </div>
      ),
      muted: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Muted Accounts</h2>
          <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            You won't see posts from muted accounts in your feed.
          </p>
          <div className={`p-12 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <VolumeX className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">No muted accounts</p>
          </div>
        </div>
      ),
      messages: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Messages and Replies</h2>
          <div className="space-y-3">
            {[
              { icon: MessageSquare, title: 'Message Requests', subtitle: 'Everyone' },
              { icon: Users, title: 'Allow Messages From', subtitle: 'Everyone' },
              { icon: Bell, title: 'Message Notifications', subtitle: 'All messages' },
            ].map((item, i) => (
              <button key={i} className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      tags: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tags and Mentions</h2>
          <div className="space-y-3">
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <Tag className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Allow Tags From</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Everyone</p>
                </div>
              </div>
            </button>
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <Hash className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Allow Mentions From</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Everyone</p>
                </div>
              </div>
            </button>
            <div className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Eye className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Manual Approval</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Approve tags before they appear</p>
              </div>
              <div className={`relative w-11 h-6 rounded-full transition-colors ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}>
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      comments: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Comments</h2>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <MessageSquare className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Allow Comments</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>People can comment on your posts</p>
              </div>
              <div 
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  allowComments 
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500' 
                    : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
                onClick={() => setAllowComments(!allowComments)}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: allowComments ? '22px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <Users className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Allow Comments From</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Everyone</p>
                </div>
              </div>
            </button>
            <div className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Shield className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Hide Offensive Comments</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Automatically hide</p>
              </div>
              <div className={`relative w-11 h-6 rounded-full transition-colors bg-gradient-to-r from-purple-600 to-orange-500`}>
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: '22px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <VolumeX className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Block Comments From</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Manage blocked users</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      ),
      sharing: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Sharing and Reuse</h2>
          <div className="space-y-3">
            <div className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Share2 className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Allow Sharing</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>People can share your posts</p>
              </div>
              <div 
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  allowSharing 
                    ? 'bg-gradient-to-r from-purple-600 to-orange-500' 
                    : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
                onClick={() => setAllowSharing(!allowSharing)}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: allowSharing ? '22px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
            <div className={`p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <Globe className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Allow Remixing</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Others can remix your content</p>
              </div>
              <div className={`relative w-11 h-6 rounded-full transition-colors ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}>
                <motion.div
                  className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{ left: '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
            <button className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
              <div className="flex items-center gap-3">
                <FileText className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Download Settings</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Control who can download</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      ),
      creator: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Creator Tools</h2>
          <div className="space-y-3">
            {[
              { icon: BarChart3, title: 'Analytics', subtitle: 'View your performance' },
              { icon: BarChart3, title: 'Insights', subtitle: 'Audience insights' },
              { icon: Award, title: 'Creator Programs', subtitle: 'Monetization options' },
            ].map((item, i) => (
              <button key={i} className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      professional: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Professional Dashboard</h2>
          <div className={`p-8 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <Award className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">Coming Soon</p>
            <p className="text-sm mt-2">Manage your professional presence</p>
          </div>
        </div>
      ),
      subscriptions: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Subscriptions</h2>
          <div className={`p-12 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <CreditCard className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">No active subscriptions</p>
          </div>
        </div>
      ),
      terms: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Terms and Policies</h2>
          <div className="space-y-3">
            {[
              { icon: FileText, title: 'Terms of Service', subtitle: 'Last updated: Jan 2026' },
              { icon: Shield, title: 'Privacy Policy', subtitle: 'How we protect your data' },
              { icon: FileText, title: 'Community Guidelines', subtitle: 'Rules and standards' },
              { icon: Globe, title: 'Cookie Policy', subtitle: 'How we use cookies' },
            ].map((item, i) => (
              <button key={i} className={`w-full p-4 rounded-xl text-left transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</p>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ),
      help: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Help Center</h2>
          <div className={`p-8 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            <HelpCircle className="w-16 h-16 mx-auto mb-4" />
            <p className="text-base font-medium">Need help?</p>
            <p className="text-sm mt-2">Visit our help center for support</p>
            <button className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90 transition-opacity">
              Visit Help Center
            </button>
          </div>
        </div>
      ),
      about: () => (
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>About genHRX</h2>
          <div className={`p-8 rounded-xl text-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>genHRX</h3>
            <p className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Version 1.0.0</p>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>© 2026 genHRX. All rights reserved.</p>
          </div>
        </div>
      ),
      appearance: () => null,
      privateAccount: () => null,
    };

    return contentMap[activeSection]?.() || null;
  };

  // Mobile view rendering (original stacked navigation)
  if (isMobileView) {
    const renderHeader = (title: string) => (
      <div className={`shrink-0 z-10 ${isDark ? 'bg-[#1a1d29]/95' : 'bg-slate-50/95'} backdrop-blur-sm px-5 py-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackNavigation}
            className={`p-2 rounded-xl ${isDark ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-900'}`}
          >
            {currentView === 'main' ? <X className="w-6 h-6" /> : <ChevronRight className="w-6 h-6 rotate-180" />}
          </button>
          <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
          <div className="w-10"></div>
        </div>
      </div>
    );

    const SettingItem = ({ 
      icon: Icon, 
      title, 
      subtitle, 
      onClick, 
      showChevron = true,
      badge,
      toggle,
      toggleValue,
      onToggle
    }: { 
      icon: any; 
      title: string; 
      subtitle?: string; 
      onClick?: () => void;
      showChevron?: boolean;
      badge?: string;
      toggle?: boolean;
      toggleValue?: boolean;
      onToggle?: () => void;
    }) => (
      <button
        onClick={toggle ? onToggle : onClick}
        className={`w-full p-4 flex items-center gap-3 ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} transition-colors`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <Icon className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
        </div>
        <div className="flex-1 text-left">
          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</p>
          {subtitle && <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>{subtitle}</p>}
        </div>
        {badge && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
            {badge}
          </span>
        )}
        {toggle && (
          <div className={`relative w-11 h-6 rounded-full transition-colors ${toggleValue ? 'bg-gradient-to-r from-purple-600 to-orange-500' : isDark ? 'bg-slate-700' : 'bg-slate-300'}`}>
            <motion.div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ left: toggleValue ? '22px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </div>
        )}
        {showChevron && !toggle && <ChevronRight className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />}
      </button>
    );

    const SectionHeader = ({ title }: { title: string }) => (
      <div className={`px-5 py-2 ${isDark ? 'bg-slate-900/50' : 'bg-slate-100/50'}`}>
        <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{title}</p>
      </div>
    );

    return (
      <div className={`absolute inset-0 z-50 flex flex-col overflow-hidden w-full h-full ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
        {/* Status bar safe area */}
        <div className={`h-12 shrink-0 ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}></div>

        {currentView === 'main' && (
          <>
            {renderHeader('Settings')}
            <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
              <div className="pb-24">
                {/* Account Section */}
                <SectionHeader title="Account" />
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem
                    icon={User}
                    title="Profile Settings"
                    subtitle="Edit your personal information"
                    onClick={() => setCurrentView('profile')}
                  />
                  <SettingItem
                    icon={CheckCircle}
                    title="Verification"
                    subtitle="Get verified as an HR professional"
                    onClick={() => setCurrentView('verification')}
                    badge="New"
                  />
                  <SettingItem
                    icon={Heart}
                    title="Saved Posts"
                    subtitle="View your saved content"
                    onClick={() => setCurrentView('saved')}
                  />
                  <SettingItem
                    icon={BarChart3}
                    title="Your Activity"
                    subtitle="View and manage your activity"
                    onClick={() => setCurrentView('activity')}
                  />
                  <SettingItem
                    icon={Archive}
                    title="Archive"
                    subtitle="Review archived posts"
                    onClick={() => {}}
                  />
                </div>

                {/* App Settings */}
                <SectionHeader title="App Settings" />
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem
                    icon={SettingsIcon}
                    title="General"
                    subtitle="App preferences and settings"
                    onClick={() => setCurrentView('app')}
                  />
                  <SettingItem
                    icon={isDark ? Sun : Moon}
                    title="Appearance"
                    subtitle={isDark ? 'Dark mode' : 'Light mode'}
                    toggle={true}
                    toggleValue={isDark}
                    onToggle={toggleTheme}
                  />
                  <SettingItem
                    icon={Bell}
                    title="Notifications"
                    subtitle="Manage notification preferences"
                    onClick={() => setCurrentView('notifications')}
                  />
                  <SettingItem
                    icon={Globe}
                    title="Language"
                    subtitle="English (US)"
                    onClick={() => setCurrentView('language')}
                  />
                  <SettingItem
                    icon={Accessibility}
                    title="Accessibility"
                    subtitle="Screen reader and display options"
                    onClick={() => setCurrentView('accessibility')}
                  />
                </div>

                {/* Privacy & Security */}
                <SectionHeader title="Privacy & Security" />
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem
                    icon={Shield}
                    title="Account Privacy"
                    subtitle="Control who can see your content"
                    onClick={() => setCurrentView('privacy')}
                  />
                  <SettingItem
                    icon={Lock}
                    title="Private Account"
                    subtitle="Only approved followers can see your posts"
                    toggle={true}
                    toggleValue={privateAccount}
                    onToggle={() => setPrivateAccount(!privateAccount)}
                  />
                  <SettingItem
                    icon={Eye}
                    title="Content Preferences"
                    subtitle="Manage what you see"
                    onClick={() => setCurrentView('content')}
                  />
                  <SettingItem
                    icon={UserX}
                    title="Restricted Accounts"
                    subtitle="Manage restricted users"
                    onClick={() => setCurrentView('restricted')}
                  />
                  <SettingItem
                    icon={VolumeX}
                    title="Muted Accounts"
                    subtitle="Accounts you've muted"
                    onClick={() => setCurrentView('muted')}
                  />
                </div>

                {/* Interactions */}
                <SectionHeader title="Interactions" />
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem
                    icon={MessageSquare}
                    title="Messages and Replies"
                    subtitle="Control who can message you"
                    onClick={() => setCurrentView('messages')}
                  />
                  <SettingItem
                    icon={Tag}
                    title="Tags and Mentions"
                    subtitle="Manage tags and mentions"
                    onClick={() => setCurrentView('tags')}
                  />
                  <SettingItem
                    icon={Hash}
                    title="Comments"
                    subtitle="Control who can comment"
                    onClick={() => setCurrentView('comments')}
                  />
                  <SettingItem
                    icon={Share2}
                    title="Sharing and Reuse"
                    subtitle="Control content sharing"
                    onClick={() => setCurrentView('sharing')}
                  />
                </div>

                {/* Creator Tools */}
                <SectionHeader title="For Creators" />
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem
                    icon={Zap}
                    title="Creator Tools"
                    subtitle="Analytics and insights"
                    onClick={() => setCurrentView('creator')}
                  />
                  <SettingItem
                    icon={Award}
                    title="Professional Dashboard"
                    subtitle="Manage your professional presence"
                    onClick={() => {}}
                  />
                  <SettingItem
                    icon={CreditCard}
                    title="Subscriptions"
                    subtitle="Manage your subscriptions"
                    onClick={() => setCurrentView('subscriptions')}
                  />
                </div>

                {/* About */}
                <SectionHeader title="About" />
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem
                    icon={FileText}
                    title="Terms and Policies"
                    subtitle="Legal information"
                    onClick={() => setCurrentView('terms')}
                  />
                  <SettingItem
                    icon={HelpCircle}
                    title="Help Center"
                    subtitle="Get help and support"
                    onClick={() => {}}
                  />
                  <SettingItem
                    icon={Smartphone}
                    title="About genHRX"
                    subtitle="Version 1.0.0"
                    showChevron={false}
                  />
                </div>

                {/* Logout */}
                <div className="px-5 py-4">
                  <button className={`w-full p-4 rounded-xl font-semibold text-sm ${isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'} transition-colors flex items-center justify-center gap-2`}>
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'profile' && (
          <>
            {renderHeader('Profile Settings')}
            <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-[#1a1d29]' : 'bg-slate-50'}`}>
              <div className="pb-24">
                <div className={`${isDark ? 'bg-slate-800/50' : 'bg-white border-b border-slate-200'}`}>
                  <SettingItem icon={User} title="Name" subtitle={safeUserData.name || 'Add your name'} onClick={() => setActiveModal('editName')} />
                  <SettingItem icon={Mail} title="Email" subtitle={safeUserData.email || 'Update your email address'} onClick={() => setActiveModal('editEmail')} />
                  <SettingItem icon={Edit3} title="Bio" subtitle={safeUserData.bio || 'Add a bio'} onClick={() => setActiveModal('editBio')} />
                  <SettingItem icon={MapPin} title="Location" subtitle={safeUserData.location || 'Set your location'} onClick={() => setActiveModal('editLocation')} />
                  <SettingItem icon={Briefcase} title="Job Title" subtitle={safeUserData.jobTitle || 'Add your job title'} onClick={() => setActiveModal('editJobTitle')} />
                  <SettingItem icon={Building2} title="Company" subtitle={safeUserData.company || 'Add your company'} onClick={() => setActiveModal('editCompany')} />
                  <SettingItem icon={AtSign} title="Industry" subtitle={safeUserData.industry || 'Add your industry'} onClick={() => setActiveModal('editIndustry')} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other mobile views follow the same pattern... */}
        
        {/* Edit Modals for Mobile */}
        <EditFieldModal
          isOpen={activeModal === 'editName'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ name: value });
            setActiveModal(null);
          }}
          title="Edit Name"
          initialValue={safeUserData.name || ''}
          placeholder="Enter your name"
          icon={User}
        />

        <EditFieldModal
          isOpen={activeModal === 'editEmail'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ email: value });
            setActiveModal(null);
          }}
          title="Edit Email"
          initialValue={safeUserData.email || ''}
          placeholder="Enter your email"
          type="email"
          icon={Mail}
        />

        <EditFieldModal
          isOpen={activeModal === 'editBio'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ bio: value });
            setActiveModal(null);
          }}
          title="Edit Bio"
          initialValue={safeUserData.bio || ''}
          placeholder="Tell us about yourself..."
          type="textarea"
          icon={Edit3}
        />

        <EditFieldModal
          isOpen={activeModal === 'editJobTitle'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ jobTitle: value });
            setActiveModal(null);
          }}
          title="Edit Job Title"
          initialValue={safeUserData.jobTitle || ''}
          placeholder="e.g. Senior HR Director"
          icon={Briefcase}
        />

        <EditFieldModal
          isOpen={activeModal === 'editCompany'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ company: value });
            setActiveModal(null);
          }}
          title="Edit Company"
          initialValue={safeUserData.company || ''}
          placeholder="e.g. Tech Corp"
          icon={Building2}
        />

        <EditFieldModal
          isOpen={activeModal === 'editIndustry'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ industry: value });
            setActiveModal(null);
          }}
          title="Edit Industry"
          initialValue={safeUserData.industry || ''}
          placeholder="e.g. Technology"
          icon={AtSign}
        />

        <EditFieldModal
          isOpen={activeModal === 'editLocation'}
          onClose={() => setActiveModal(null)}
          onSave={(value) => {
            updateUserData({ location: value });
            setActiveModal(null);
          }}
          title="Edit Location"
          initialValue={safeUserData.location || ''}
          placeholder="e.g. San Francisco, CA"
          icon={MapPin}
        />
      </div>
    );
  }

  // Web view rendering (sidebar + content)
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDark ? 'bg-black/50' : 'bg-black/30'} backdrop-blur-sm`}>
      <div className={`w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex ${isDark ? 'bg-[#1a1d29]' : 'bg-white'}`}>
        {/* Sidebar */}
        <div className={`w-80 border-r ${isDark ? 'border-slate-800 bg-[#1a1d29]' : 'border-slate-200 bg-slate-50'} flex flex-col`}>
          {/* Sidebar Header */}
          <div className={`px-6 py-5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'} flex items-center justify-between`}>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Settings</h1>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto">
            {sidebarItems.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className={`px-6 py-3 ${isDark ? 'bg-slate-900/30' : 'bg-slate-100'}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    {group.group}
                  </p>
                </div>
                <div className="py-1">
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      isActive={activeSection === item.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className={`p-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <button className={`w-full p-3 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} relative`}>
          {renderContent()}
          
          {/* Edit Modals for Web */}
          <EditFieldModal
            isOpen={activeModal === 'editName'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ name: value });
              setActiveModal(null);
            }}
            title="Edit Name"
            initialValue={safeUserData.name || ''}
            placeholder="Enter your name"
            icon={User}
          />

          <EditFieldModal
            isOpen={activeModal === 'editEmail'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ email: value });
              setActiveModal(null);
            }}
            title="Edit Email"
            initialValue={safeUserData.email || ''}
            placeholder="Enter your email"
            type="email"
            icon={Mail}
          />

          <EditFieldModal
            isOpen={activeModal === 'editBio'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ bio: value });
              setActiveModal(null);
            }}
            title="Edit Bio"
            initialValue={safeUserData.bio || ''}
            placeholder="Tell us about yourself..."
            type="textarea"
            icon={Edit3}
          />

          <EditFieldModal
            isOpen={activeModal === 'editJobTitle'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ jobTitle: value });
              setActiveModal(null);
            }}
            title="Edit Job Title"
            initialValue={safeUserData.jobTitle || ''}
            placeholder="e.g. Senior HR Director"
            icon={Briefcase}
          />

          <EditFieldModal
            isOpen={activeModal === 'editCompany'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ company: value });
              setActiveModal(null);
            }}
            title="Edit Company"
            initialValue={safeUserData.company || ''}
            placeholder="e.g. Tech Corp"
            icon={Building2}
          />

          <EditFieldModal
            isOpen={activeModal === 'editIndustry'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ industry: value });
              setActiveModal(null);
            }}
            title="Edit Industry"
            initialValue={safeUserData.industry || ''}
            placeholder="e.g. Technology"
            icon={AtSign}
          />

          <EditFieldModal
            isOpen={activeModal === 'editLocation'}
            onClose={() => setActiveModal(null)}
            onSave={(value) => {
              updateUserData({ location: value });
              setActiveModal(null);
            }}
            title="Edit Location"
            initialValue={safeUserData.location || ''}
            placeholder="e.g. San Francisco, CA"
            icon={MapPin}
          />
        </div>
      </div>
    </div>
  );
}
