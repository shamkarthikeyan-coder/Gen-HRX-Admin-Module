import { useState, useRef } from 'react';
import { User, Camera, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';

interface ProfileSetupFormProps {
  onComplete: (profileData: ProfileData) => void;
  onCancel?: () => void;
  isEditMode?: boolean;
}

export interface ProfileData {
  profilePicture?: string;
  name: string;
  bio?: string;
}

export function ProfileSetupForm({ onComplete }: ProfileSetupFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        toast.success('Profile picture uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = () => {
    return name.trim().length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please enter your name');
      return;
    }

    const profileData: ProfileData = {
      profilePicture,
      name: name.trim(),
      bio: bio.trim() || undefined,
    };

    toast.success('Profile created successfully!');
    onComplete(profileData);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-purple-50 via-white to-orange-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md ${
          isDark 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-slate-200'
        } rounded-3xl shadow-2xl border-2 p-8`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Set Up Your Profile
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Let's get to know you better
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'
              } border-2 flex items-center justify-center overflow-hidden`}>
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User className={`w-16 h-16 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
              {profilePicture && (
                <button
                  type="button"
                  onClick={() => {
                    setProfilePicture('');
                    toast.success('Profile picture removed');
                  }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-xs mt-2`}>
              Upload profile picture (optional)
            </p>
          </div>

          {/* Name */}
          <div>
            <label className={`${isDark ? 'text-white' : 'text-slate-700'} text-sm font-semibold mb-2 block`}>
              Name *
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-12 ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                  : 'bg-white border-slate-300 focus:border-purple-500'
              } border-2 rounded-xl focus:ring-0 focus:outline-none`}
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className={`${isDark ? 'text-white' : 'text-slate-700'} text-sm font-semibold mb-2 block`}>
              A bit about yourself (optional)
            </label>
            <textarea
              placeholder="Tell us what makes you unique..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={500}
              className={`w-full p-3 ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500' 
                  : 'bg-white border-slate-300 focus:border-purple-500'
              } border-2 rounded-xl focus:ring-0 focus:outline-none resize-none`}
            />
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'} mt-1 text-right`}>
              {bio.length}/500
            </p>
          </div>

          {/* Assurance Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-xl ${
              isDark 
                ? 'bg-purple-500/10 border border-purple-500/30' 
                : 'bg-purple-50 border border-purple-200'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'} text-center`}>
              💡 Don't worry! You can add more details like job title, company, and specializations later from your profile settings.
            </p>
          </motion.div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full h-12 rounded-xl font-semibold text-white transition-all ${
              isFormValid()
                ? 'bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 shadow-lg hover:shadow-xl'
                : isDark
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </Button>
        </form>

        {/* Footer */}
        <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'} text-center mt-6`}>
          Welcome to genHRX! We're excited to have you here 🎉
        </p>
      </motion.div>
    </div>
  );
}
